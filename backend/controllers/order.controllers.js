const Order = require('../models/Order');
const User = require('../models/User');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const billingProcess = async(req,res) =>{

    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const order = new Order(req.body);
        await order.save();
        res.status(200).json({message:"Added order details",order})
    }catch(error){
        res.status(500).json({message:"Error while adding order details"});
    }
}

const getAOrder = async(req,res) =>{
    const {id} = req.params;
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found!"});
        }
        const order = await Order.findById(id)
        .populate('order_items.productId');
        if(!order){
            return res.status(404).json({message:"Order details not found"});
        }
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message:"Error while fetching order details"})
    }
}

const getUserOrder = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"});

        }
        const orders = await Order.find({ user_id: req.user.id })
        .populate('order_items.productId', 'name price description')
        .sort({ createdAt: -1 });
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({message:"Error while fetching user orders"});
    }
}

const getAllOrders = async(req,res) =>{
    try{
        const orders = await Order.find({});
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({message:"Error while fetching orders"})
    }
}
const makePayment = async (req, res) => {
    try {
        const { products } = req.body; // Assume products are sent in the request body

        // Map products to the format Stripe requires for line items
        const line_items = products.map(product => ({
            price_data: {
                currency: 'usd', // Set your currency
                product_data: {
                    name: product.name, // Dynamic product name
                },
                unit_amount: product.price * 100, // Convert price to cents
            },
            quantity: product.quantity,
        }));

        // Create a checkout session with dynamic products
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:5173/checkout/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
        // console.log('Stripe session created:', session);  // Log session creation
        return res.json(session);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing the payment.");
    }
};


  const verifyPayment = async(req,res) =>{
    const { sessionId } = req.params;

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if payment was successful
    if (session.payment_status === 'paid') {
      // Respond with payment status
      res.json({ paymentStatus: 'paid' });
    } else {
      // Respond with failed payment status
      res.json({ paymentStatus: 'failed' });
    }
  } catch (error) {
    console.error('Error verifying payment status:', error);
    res.status(500).send('Server Error');
  }
  }
module.exports = {
    billingProcess,
    getAOrder,
    getUserOrder,
    getAllOrders,
    // paymentIndegration
    makePayment,
    // webhook,
    verifyPayment
}




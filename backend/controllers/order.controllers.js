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
        const order = await Order.findById(id);
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
const paymentIndegration = async(req,res) =>{
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount * 100, // Convert amount to cents (Stripe requires smallest currency unit)
            currency: 'usd',
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentId: paymentIntent.id, // Transaction ID
            status: paymentIntent.status, // Status (requires confirmation on frontend)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment failed' });
    }
}
module.exports = {
    billingProcess,
    getAOrder,
    getUserOrder,
    getAllOrders,
    paymentIndegration
}




const User = require('../models/User');
const Product = require('../models/Product');



const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const isExistsProduct = user.cart.cartItems.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (isExistsProduct !== -1) {
        // If product exists in cart, update its quantity
        user.cart.cartItems[isExistsProduct].quantity += quantity;
      } else {
        // Add new product to cart
        user.cart.cartItems.push({ productId, quantity });
      }
  
      // Recalculate total price
      let total = 0;
      for (const item of user.cart.cartItems) {
        const productInCart = await Product.findById(item.productId); // Ensure price is fetched
        total += Math.round(productInCart.price) * item.quantity;
      }
      user.cart.totalPrice = total;
  
      await user.save();
  
      // Populate cart items before responding
      const populatedUser = await User.findById(req.user.id).populate(
        "cart.cartItems.productId"
      );
  
      res.status(200).json({
        message: "Product added to cart",
        cart: populatedUser.cart,
      });
    } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ message: "Error adding product to cart" });
    }
  };
  

const getCart = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).populate("cart.cartItems.productId");
        let total = 0;
        user.cart.cartItems.forEach(item => total += Math.round(item.productId.price) * item.quantity);
        user.cart.totalPrice = total;
        await user.save()
        res.status(200).json(user.cart);
    }catch(error){
        res.status(500).json({message:"Error to get cart",error})
    }
}

const resetCart = async (req,res) =>{
    try{
        const user = await User.findById(req.user.id);
        user.cart.cartItems = [];
        user.cart.totalPrice = 0;
        await user.save()
        res.status(200).json({message:"Successfully remove cart",user})
    }catch(error){
        res.status(500).json({message:"Error to reset cart"})
    }
}

const removeAProductInCart = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(req.user.id).populate(
        "cart.cartItems.productId"
      );
  
      if (!user.cart.cartItems || user.cart.cartItems.length === 0) {
        return res.status(404).json({ message: "Cart is empty or product not in cart" });
      }
  
      // Filter the product from the cart
      const newCart = user.cart.cartItems.filter(
        (item) => item.productId._id.toString() !== id
      );
  
      user.cart.cartItems = newCart;
  
      // Recalculate total price
      let total = 0;
      user.cart.cartItems.forEach((item) => {
        total += Math.round(item.productId.price) * item.quantity;
      });
      user.cart.totalPrice = total;
  
      await user.save();
  
      // Populate cart items again before sending response
      const updatedUser = await User.findById(req.user.id).populate(
        "cart.cartItems.productId"
      );
  
      res.status(200).json({
        message: "Removed product from cart",
        cart: updatedUser.cart,
      });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).json({ message: "Error removing product from cart" });
    }
  };
  
  const incrementCartQuantity = async (req,res) =>{
    const { id } = req.params;
  
    try {
      const user = await User.findById(req.user.id).populate(
        "cart.cartItems.productId"
      );
  
      if (!user.cart.cartItems || user.cart.cartItems.length === 0) {
        return res.status(404).json({ message: "Cart is empty or product not in cart" });
      }
  
      // Filter the product from the cart
      const cartProduct = user.cart.cartItems.filter(
        (item) => item.productId._id.toString() === id
      );
    //   console.log("Increment Cart Data : ",cartProduct)
      if(cartProduct[0].quantity > 1){
          cartProduct[0].quantity -= 1;
        }
        console.log(cartProduct[0].quantity)
      
      
      // Recalculate total price
      let total = 0;
      user.cart.cartItems.forEach((item) => {
        total += Math.round(item.productId.price) * item.quantity;
      });
      user.cart.totalPrice = total;
  
      await user.save();
  
      // Populate cart items again before sending response
      const updatedUser = await User.findById(req.user.id).populate(
        "cart.cartItems.productId"
      );
  
      res.status(200).json({
        message: "Increment cart quantity",
        cart: updatedUser.cart,
      });
    } catch (error) {
      console.error("Error increment cart quantity:", error);
      res.status(500).json({ message: "Error increment cart quantity" });
    }
  }
  const decrementCartQuantity = async (req,res) =>{
    const { id } = req.params;
  
    try {
      const user = await User.findById(req.user.id).populate(
        "cart.cartItems.productId"
      );
  
      if (!user.cart.cartItems || user.cart.cartItems.length === 0) {
        return res.status(404).json({ message: "Cart is empty or product not in cart" });
      }
  
      // Filter the product from the cart
      const cartProduct = user.cart.cartItems.filter(
        (item) => item.productId._id.toString() === id
      );
    //   console.log("Increment Cart Data : ",cartProduct)
      
        cartProduct[0].quantity += 1;
        
        console.log(cartProduct[0].quantity)
      
      
      // Recalculate total price
      let total = 0;
      user.cart.cartItems.forEach((item) => {
        total += Math.round(item.productId.price) * item.quantity;
      });
      user.cart.totalPrice = total;
  
      await user.save();
  
      // Populate cart items again before sending response
      const updatedUser = await User.findById(req.user.id).populate(
        "cart.cartItems.productId"
      );
  
      res.status(200).json({
        message: "Decrement cart quantity",
        cart: updatedUser.cart,
      });
    } catch (error) {
      console.error("Error Decrement cart quantity:", error);
      res.status(500).json({ message: "Error Decrement cart quantity" });
    }
  }

module.exports = {
    addToCart,
    getCart,
    resetCart,
    removeAProductInCart,
    incrementCartQuantity,
    decrementCartQuantity
}
const User = require("../models/User");
const Product = require("../models/Product");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User fetch successfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while fetching user details", error });
  }
};

const updateUserDetails = async (req, res) => {
  // const { email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // const isUserExists = await User.findOne({ email: email });
    // if (isUserExists && email !== user.email) {
    //   return res
    //     .status(400)
    //     .json({ message: "User is already exists, use another email address" });
    // }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ message: "User update successfully", user: updatedUser });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error while updating user", error });
  }
};

const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.address.push(req.body);
    await user.save();
    res.status(200).json({ message: "Added address successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error while add address" });
  }
};

const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { street, city, state, zip, country } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).josn({ message: "User not found!" });
    }

    // const updatedAddress = await User.findByIdAndUpdate()
    const addressIndex = user.address.findIndex(
      (item) => item._id.toString() === id
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found!" });
    }
    user.address[addressIndex] = req.body;
    await user.save();
    res
      .status(200)
      .json({ message: "Update address successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error while updating address" });
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const addressIndex = user.address.findIndex(
      (item) => item._id.toString() === id
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found!" });
    } else {
      const newAddresses = user.address.filter(
        (item) => item._id.toString() !== id
      );
      console.log(newAddresses);
      user.address = newAddresses;
      await user.save();
      res
        .status(200)
        .json({
          message: "Delete address successfully",
          user,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Error while deleting address" });
  }
};

const addToWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const isAlready =  user.wishlist.findIndex(
      (item) => item.productId.toString() === id
    );
    
    if (isAlready === -1) {
      user.wishlist.push({ productId: id });
      await user.save();
    res
      .status(200)
      .json({ message: "Product added in wishlist", wishlist: user.wishlist });
    } else {
      user.wishlist = user.wishlist.filter(
        (item) => item.productId.toString() !== id
      );
      await user.save();
    res
      .status(200)
      .json({ message: "Product removed in wishlist", wishlist: user.wishlist });
      
    }
    
  } catch (error) {
    res.status(500).json({ message: "Error while adding wishlist",error });
  }
};

const viewWishlist = async(req,res) =>{
  try{
    const user = await User.findById(req.user.id).populate('wishlist.productId');
    if(!user){
      return res.status(404).json({message:"User not found!"});
    }
    res.status(200).json({wishlist:user.wishlist})
  }catch(error){
    res.status(500).json({message:"Error while fetching wishlist",error})
  }
}

const deleteWishlist = async(req,res)=>{
  const {id} = req.params;
  try{
    const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message:"User not found!"})
    }
    user.wishlist = user.wishlist.filter(item => item.productId.toString() !== id);
    await user.save()
    res.status(200).json({wishlist:user.wishlist})
  }catch(error){
    res.status(500).json({message:"Error while deleting wishlist product",error})
  }
}

const uploadUserImage = async(req,res) =>{
  try{
     // Cloudinary configuration
     cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 300, height: 300, crop: 'fill', gravity: 'face' } // Optional: Resize and crop
      ],
    });

    // Remove file from local storage
    fs.unlinkSync(filePath);
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        image:result.secure_url
      },
      {new:true}
    );
    if(!user){
      return res.status(404).json({message:"User not found!"})
    }
    res.status(200).json({
      message: 'Profile image updated successfully',
      user,
    });

  }catch(err){
    console.log(err);
  }
}
const deleteUserImage = async(req,res) =>{
  try{
    const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message:"User not found!"})
    }
    user.image ='';
    await user.save();
    res.status(200).json({message:"Delete the user profile image",user})
  }catch(err){
    console.log(err);
  }
}
module.exports = {
  getUserDetails,
  updateUserDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  viewWishlist,
  deleteWishlist,
  uploadUserImage,
  deleteUserImage
};

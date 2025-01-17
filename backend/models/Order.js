const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    
})
const orderSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    order_items:[orderItemSchema],
    shipping_address:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        street:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        zip:{
            type:Number,
            required:true
        },
    },
    total_price:{
        type:Number,
        required:true,
        default:0
    },
    order_status:{
        type:String,
        enum:['pending','shipped','delivered','cancelled'],
        default:'pending'
    },
    payment_method:{
        type:String,
        enum:['online','cod'],
        required:true
    },
    deliveredAt:{
        type:Date
    },
    payment_result:{
        trans_id:String,
        paidAt:String
    },
 
},
{
    timestamps:true
});



module.exports = mongoose.model('Order',orderSchema);

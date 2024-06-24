import mongoose from "mongoose";
const { Schema } = mongoose;

const singleProduct = Schema({
    name : {type:String, required:true},
    quantity : {type:Number, required:true},
    price : {type:String, required:true},
    product : {
        type : mongoose.Schema.ObjectId,
        ref : 'Product',
        required : true
    }
})

const orderSchema = new Schema({
    total : {
        type : Number,
        required : [true, "Total Harus Diisi"]
    },
    status : {
        type : String,
        enum : ["pending", "failed","success"],
        default : "pending"
    },
    itemDetail : [singleProduct],
    user : {
        type : Schema.ObjectId,
        ref : 'User',
        required : true
    },
    firstname : {
        type : String,
        required : [true, "Nama Depan Harus Diisi"]
    },
    lastname : {
        type : String,
        required : [true, "Nama Belakang Harus Diisi"]
    },
    phone : {
        type : String,
        required : [true, "Nomor Telpon Harus Diisi"]
    },
    email : {
        type : String,
        required : [true, "Email Harus Diisi"]
    }
});

const Order = mongoose.model("Order",orderSchema)
export default Order

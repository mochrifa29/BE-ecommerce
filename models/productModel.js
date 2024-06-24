import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name product harus diisi"],
    unique: [true, "Name sudah digunakan, silahkan buat yang lain"],
  },
  price: {
    type: Number,
    required: [true, "Price harus diisi"],
  },
  description: {
    type: String,
    required: [true, "Description harus diisi"],
  },
  image: {
    type: String,
    default: null,
  },
  category : {
    type: String,
    required: [true, "Category product harus diisi"],
    enum : ["sepatu", "kemeja", "baju", "celana"]
  },
  stock : {
    type: Number,
    default : null
  }
});

const Product = mongoose.model("Product",productSchema)
export default Product

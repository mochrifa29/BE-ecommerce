import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js"
import Order from "../models/orderModel.js"

export const createOrder = asyncHandler(async (req, res) => {

  const {email,firstname,lastname,phone,cartItem} = req.body

  if (!cartItem || cartItem.length < 1) {
     res.status(400)
     throw new Error("Keranjang masih kosong")
  }

  let orderItem = []
  let total = 0

  for (const cart of cartItem) {
    const productData = await Product.findOne({_id : cart.product})

    if (!productData) {
      res.status(404)
      throw new Error("Id Product tidak ditemukan")
    }
    const {name,price,_id} = productData

    //detail product
    const singleProduct = {
      quantity : cart.quantity,
      name,
      price,
      product : _id
    }
    orderItem =[...orderItem,singleProduct]

    total += cart.quantity * price
    
  }

  const order = await Order.create({
    itemDetail : orderItem,
    total,
    firstname,
    lastname,
    email,
    phone,
    user : req.user.id
  })

    return res.status(201).json({
      total,
      count : orderItem.length,
      order,
      message : "Berhasil Order Product",
    })
});

export const allOrder = asyncHandler(async (req, res) => {
    const order = await Order.find()
    return res.status(201).json({
      order,
      message : "Berhasil Tampil Semua Order Product",
    })
});

export const detailOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    return res.status(201).json({
      order,
      message : "Berhasil Tampil Detail Order Product",
    })
});

export const currentUserOrder = asyncHandler(async (req, res) => {

  const order = await Order.find({'user' : req.user.id})
    
    return res.status(201).json({
      order,
      message : "Berhasil Tampil Current User Order Product",
    })
});







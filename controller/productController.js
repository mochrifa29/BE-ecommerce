import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary"
import streamifier from "streamifier"

export const createProduct = asyncHandler(async (req, res) => {

  
    const file = req.file

    if (!file) {
        res.status(400)
        throw new Error("Image belum di upload")
    }

    const filename = file.filename
    const pathFile = `/public/uploads/${filename}`

     const product = await Product.create({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : pathFile,
        stock : req.body.stock
    })

    return res.status(201).json({
      message : "Berhasil tambah Product",
      data: product
    })
});


export const allProduct = asyncHandler(async (req, res) => {
    // const data = await Product.find()

    const queryObject = {...req.query}

    //untuk mengabaikan req page,limit
    const excludeField = ["page","limit","name"]
    excludeField.forEach(element => delete queryObject[element]);

    let query

    if (req.query.name) {
      query = Product.find({
        name : {$regex: req.query.name, $options:'i'}
      })
    }else{
      query = Product.find(queryObject)
    }

    //Pagination
    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 30
    const skipData = (page - 1) * limitData

    query = query.skip(skipData).limit(limitData)

    let countProduct = await Product.countDocuments()
    if (req.query.page) {
      if (skipData >= countProduct) {
        res.status(404)
        throw new Error("This Page Doest Exist")
      }
    }

    const data = await query

    return res.status(200).json({
      message: "Berhasil tampil semua Product",
      data,
      count : countProduct
    })
});


export const detailProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id 
    const productData = await Product.findById(paramsId)

    if (!productData) {
      res.status(404)
      throw new Error("Id tidak ditemukan")
    }

    return res.status(200).json({
      message : "Detail product berahasil ditampilkan",
      data : productData
    })
});


export const updateProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id
    const updateProduct = await Product.findByIdAndUpdate(paramsId,req.body,{
      runValidators: false,
      new:true
    })

    return res.status(201).json({
      message : "Update product berhasil",
      data : updateProduct
    })
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id
    await Product.findByIdAndDelete(paramsId)

    res.status(201).json({
      message : "Delete product berhasil"
    })
});

export const Fileupload = asyncHandler(async (req, res) => {
    
  const stream = cloudinary.uploader.upload_stream({
    folder : 'uploads',
    allowed_formats : ['jpg','png']
  }, 
  function(err,result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message : "Gagal upload gambar",
        error :err
      })
    }

    res.json({
      message : "Gambar berhasil di upload",
      url : result.secure_url
    })
  })

  streamifier.createReadStream(req.file.buffer).pipe(stream)

});




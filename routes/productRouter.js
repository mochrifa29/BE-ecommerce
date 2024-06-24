import express from 'express'
import { protectMiddleware, ownerMiddleware } from '../middlewares/authMiddleware.js';
import { createProduct, detailProduct, deleteProduct, updateProduct, allProduct, Fileupload } from '../controller/productController.js';
import { upload } from '../utils/uploadHandler.js';

const router = express.Router(); 

//CRUD
//Create Product
//post/api/v1/product
//midlleware owner
router.post('/create',protectMiddleware,ownerMiddleware,upload.single('image'),createProduct)

//All product
//get/api/v1/product
router.get('/',allProduct)

//Delete product
//delete/api/v1/product/:id
//midlleware owner
router.delete('/delete/:id',protectMiddleware,ownerMiddleware,deleteProduct)

//Detail product
//get/api/v1/product/:id
//midlleware owner
router.get('/detail/:id',protectMiddleware,ownerMiddleware,detailProduct)

//Update product
//put/api/v1/product/:id
//midlleware owner
router.put('/update/:id',updateProduct)

//File Upload product
//get/api/v1/product
//midlleware owner
router.post('/file-upload',protectMiddleware, ownerMiddleware, upload.single('image') ,Fileupload)

export default router
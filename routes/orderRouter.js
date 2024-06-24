import express from 'express'
import { protectMiddleware, ownerMiddleware } from '../middlewares/authMiddleware.js';
import { allOrder, detailOrder, currentUserOrder,createOrder } from '../controller/orderController.js';

const router = express.Router(); 

//get /api/v1/order
//cuma diakses user role admin
router.get('/',protectMiddleware,ownerMiddleware,allOrder)

//post /api/v1/order
//cuma diakses user auth
router.post('/create',protectMiddleware,createOrder)

//get /api/v1/order/detail/:id
//cuma diakses user role admin
router.get('/detail/:id',protectMiddleware,ownerMiddleware,detailOrder)


//get /api/v1/order
//cuma diakses user auth
router.get('/current/user',protectMiddleware,currentUserOrder)



export default router
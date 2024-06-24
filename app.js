import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { notFound,errorHandler } from './middlewares/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'

dotenv.config()
const app = express()
const port = 3000

import authRouter from './routes/authRouter.js'
import productRouter from './routes/productRouter.js'
import orderRouter from './routes/orderRouter.js'

//Middleware (supaya bisa memasukan data json di reques body nya)
app.use(express.json())
app.use(helmet())
app.use(ExpressMongoSanitize())

app.use(cookieParser())
//supaya bisa masukan inputanya ke url encode di dalam post man nya
app.use(express.urlencoded({extended:true}))

app.use(express.static('./public'))


//Parent Router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)

app.use(notFound)
app.use(errorHandler)

//Server
app.listen(port, () => {
  console.log(`Aplikasi berjalan di port port ${port}`)
})

//Connection DB
mongoose.connect(process.env.DATABASE,{

}).then(() => {
    console.log('Database Connect');
}).catch((err) => {
    console.log('Database No Connect');
})

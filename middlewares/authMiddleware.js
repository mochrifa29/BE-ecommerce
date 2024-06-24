import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

export const protectMiddleware = asyncHandler(async(req,res,next) => {
    let token;

    token = req.cookies.jwt
    if (token) {
        try {
            //membandingkan token dengan jwt secret
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized fail")
        }
    }else{
          res.status(401);
          throw new Error("Not Authorized, No Token");
    }
})

export const ownerMiddleware = (req,res,next) => {
    if (req.user && req.user.role == "owner" ) {
        next()
    }else{
        res.status(401)
        throw Error("Not Autorized as Owner")
    }
}
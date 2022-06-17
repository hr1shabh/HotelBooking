import User from "../models/User.js"
import bcrypt from "bcryptjs"
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken"

export const register = async(req,res,next) =>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("User has been created")
    }catch(err){
        console.log(err);
        next(err)
    }
}

//JWT - hide user info and send it as a cookie
export const login = async(req,res,next) =>{
    try{
        const user = await User.findOne({username: req.body.username}) //getting the user from DB
        if(!user) return next(createError(404, "User Not Found")) //in case user not found
        const isPassword = await bcrypt.compare(req.body.password, user.password) //comparing password
        if(!isPassword) return next(createError(400, "wrong password or username")) //for case of not matching

        //if password is correct - new token will be created
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT) // we will hash this info

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json({...otherDetails});
    }catch(err){
        next(err)
    }
}
import jwt from "jsonwebtoken";
import {createError} from "./error.js";

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token){ //if no token is found
        return next(createError(401, "You are not authenticated !!"));
    }
    //if token is found we need to verify if its valid or not with the help of JWT
    jwt.verify(token, process.env.JWT, (err, user) =>{
        if(err) return next(createError(403, "Token is not valid"));
        req.user = user;
        next();

    })
}


export const verifyUser = (req,res,next) =>{
    verifyToken(req,res,next, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            return next(createError(403, "You are not authorized"));
        }
    })
}

export const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,next, () =>{
        if(req.user.isAdmin){ // means the person who is logged in (as per cookies) is whether admin or not
            next();
        }
        else{
            return next(createError(403, "You are not authorized"));
        }
    })
}
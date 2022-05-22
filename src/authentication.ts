import User from "./core/entity/User"
import { sign, SignOptions,verify } from 'jsonwebtoken';
import { json, Request, response, Response, NextFunction } from "express";


class Authenticete{
    public jwt: any
    public secret_key: string

    constructor(){
        this.jwt = require("jsonwebtoken")
        this.secret_key = "4wqunGuEAu"
    }

    public teste(){
        console.log(this.jwt)
    }

    public sing_token(user:User):any{
        return this.jwt.sign({"userId": user.getId(),
                              "name": user.getName()},
                            this.secret_key,{expiresIn: 300})
    }

    public loggin_required( req: Request, res: Response,next:NextFunction ){ 
        const token = req.header('x-access-token')
        if (!token) return res.status(401).json({auth:false,"message":"no token provide"})
        
        
        this.jwt.verify(token,this.secret_key,(err:any,decoded:any)=>{
            if (err){
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token'})
            }
            console.log(decoded.userId);
            
            req.body.userId = decoded.userId
            next()
        })
    }

}

export const auth = new Authenticete()
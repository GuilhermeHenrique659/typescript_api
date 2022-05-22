import User from "./core/entity/User"
import { sign, SignOptions,verify } from 'jsonwebtoken';
import { json, Request, response, Response, NextFunction } from "express";

const secret_key = "4wqunGuEAu"
const blackList: Array<any> = []

class Authenticete{
    public jwt: any

    constructor(){
        this.jwt = require("jsonwebtoken")
   
    }

    public teste(){
        console.log(this.jwt)
    }

    public sing_token(user:User):any{
        return this.jwt.sign({"userId": user.getId(),
                              "name": user.getName()},
                            secret_key,{expiresIn: 1000})
    }

    public loggin_required( req: Request, res: Response,next:NextFunction ){ 
        const token = req.header('x-access-token')
        if (!token) return res.status(401).json({auth:false,"message":"no token provide"})
        console.log(blackList.findIndex(item => item === token));
        
        if (blackList.findIndex(item => item === token)!== -1) return res.status(401).json({auth:false, "message":"token in blacklist"})
        
        verify(token,secret_key,(err:any,decoded:any)=>{
            if (err){
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token'})
            }
            console.log(decoded.userId);
            
            req.body.userId = decoded.userId
            next()
        })
    }

    public logout(token:any):void{        
        blackList.push(token)
        console.log(blackList);
        
    }

}

export default new Authenticete()
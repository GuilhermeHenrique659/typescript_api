import { json, Request, response, Response } from "express";
import { auth } from "../authentication";
import User from "../core/entity/User";
import repositorys from "../core/repository/repositoryFactory";
import { RepositoryError } from "../core/repository/userRepository";

export default class UserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const users = new User(
            req.body.name, req.body.email, req.body.password, req.body.age,req.body.id
        )
        try{
            let result = await repositorys.getUser().store(users)
            return res.json({ "message": "user save witch success"})
        }catch (err){
            if(err instanceof RepositoryError)
                return res.json({ "message": err.message})
            else
                return res.json({"message": "user dont save"})
        }
    }
    public async find_all(req: Request, res: Response): Promise<Response> {
        try {
            let list_of_user: Array<User> = await repositorys.getUser().find_all()
            const data: Array<object> = []
            list_of_user.forEach(user => {
                data.push(user.change_for_json())
            })
            auth.teste()
            return res.json(data)
        } catch (error) {
            return res.json({ "message": "erro in find users" })
        }

    }

    public async login(req: Request, res: Response): Promise<Response>{
        let user:User
        try{
            user = await repositorys.getUser().find_by_email(req.body.email)
            console.log(user);
            
            if (user.getPassword() === req.body.password){
                return res.json({ auth: true, token: auth.sing_token(user) })
            }else{
                return res.status(401).json({"message":"invalid password"})
            }
        }catch(err){
            if(err instanceof RepositoryError)
                return res.status(401).json({"message":"user don't found"})
            else
                return res.status(401).json({"message":"something is wrong"})
        }
    }


    public async delete(req: Request, res: Response): Promise<Response> {

        let id:number = req.body.id
        try{
            repositorys.getUser().delete(id)
            return res.json({"message":"user deleted with success"})
        }catch(error){
            if(error instanceof RepositoryError)
                return res.json({"message":error.message})
            else
                return res.json({"message": "user dont deleted"})
        }
    }
}
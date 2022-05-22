import User from "../entity/User";
import { server } from "../../server";
import { QueryFailedError } from "typeorm";

export  class RepositoryError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "Erro de Repositorio"
    }
}

export default class UserRepository {
    public async store(user: User): Promise<any>  {
        await server.db.manager.save('User', user).catch(err => {
                if(err instanceof QueryFailedError )
                    throw new RepositoryError("Email already exist")
        })
        
    }

    public async find_by_email(user_email:string): Promise<any> {
        let user = await server.db.manager.findOneBy("User",{email:user_email})
        if (!user){
            throw new RepositoryError("User don't found")
        }
        return user
    }

    public find_all(): Array<User> | any {
        try {
            return server.db.manager.find('User')
        } catch (error) {
            return error
        }
    }
    public async delete(id: number): Promise<any|void>{
        server.db.manager.delete("User",id).catch(err => {
            if (err instanceof QueryFailedError)
                throw new RepositoryError("user dont found")
        })
    }
}
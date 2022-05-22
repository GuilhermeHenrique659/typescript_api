import UserRepository from "./userRepository";

class Repositorys{
    private user:UserRepository

    public constructor(){
        this.user = new UserRepository
    }

    public getUser(): UserRepository {
        return this.user;
    }

    public setUser(user: UserRepository): void {
        this.user = user;
    }

}

const repositorys = new Repositorys()
export default repositorys
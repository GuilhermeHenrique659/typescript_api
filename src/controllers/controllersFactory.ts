import UserController from "./userController";

class Controllers {
    private user: UserController

    public constructor() {
        this.user = new UserController
    }

    public getUser(): UserController {
        return this.user;
    }

    public setUser(user: UserController): void {
        this.user = user;
    }

}

const controller = new Controllers()
export default controller
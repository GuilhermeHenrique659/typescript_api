import { Router } from "express";
import authentication from "./authentication";
import controller from "./controllers/controllersFactory";

const routes = Router()

routes.post("/store_user", controller.getUser().create)
routes.get("/users",authentication.loggin_required, controller.getUser().find_all)
routes.post("/delete_user/", authentication.loggin_required, controller.getUser().delete)
routes.post("/login",controller.getUser().login)
routes.post("/logout", authentication.loggin_required, controller.getUser().logout)

export default routes
import { Router } from "express";
import { auth } from "./authentication";
import controller from "./controllers/controllersFactory";

const routes = Router()

routes.post("/store_user", controller.getUser().create)
routes.get("/users", controller.getUser().find_all)
routes.post("/delete_user/", auth.teste, controller.getUser().delete)
routes.post("/login",controller.getUser().login)

export default routes
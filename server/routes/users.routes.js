import UserController from "../controllers/users.controller.js";
import {Router} from "express"
import{authenticate} from "../config/jwt.config.js"

const router = Router()

// Authenticated route
router.get("/api/users", authenticate, UserController.ReadAll);



router.route("/user")
    .post(UserController.create)
    .get(UserController.ReadAll)


router.route("/user/:id")
    .get(UserController.ReadOne)
    .put(UserController.update)
    .delete(UserController.DeleteOne)

router.route("/register")
    .post(UserController.register)

router.route("/login")
    .post(UserController.login)

export default router



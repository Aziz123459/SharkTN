import UserController from "../controllers/users.controller.js";
import {Router} from "express"
import{authenticate} from "../config/jwt.config.js"
// inside of user.routes.js






const router = Router()

router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);

// Authenticated route
router.get("/api/users", authenticate, UserController.ReadAll);



router.route("/user")
    .post(UserController.create)
    .get(UserController.ReadAll)


router.route("/user/:id")
    .get(UserController.ReadOne)
    .put(UserController.update)
    .delete(UserController.DeleteOne)

export default router



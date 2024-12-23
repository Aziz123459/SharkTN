import UserController from "../controllers/users.controller.js";
import {Router} from "express"

// inside of user.routes.js
const Users = require('../controllers/users.controller.js');
const { authenticate } = require('../config/jwt.config.js');
module.exports = app => {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, UserController.ReadAll);
}



const router = Router()

router.route("/user")
    .post(UserController.create)
    .get(UserController.ReadAll)


router.route("/user/:id")
    .get(UserController.ReadOne)
    .put(UserController.update)
    .delete(UserController.DeleteOne)

export default router



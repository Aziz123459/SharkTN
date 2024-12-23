import UserController from "../controllers/users.controller.js";
import {Router} from "express"

// inside of user.routes.js
const Users = require('../controllers/users.controller.js');
const { authenticate } = require('../config/jwt.config.js');
module.exports = app => {
  app.post("/api/register", Users.register);
  app.post("/api/login", Users.login);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, Users.getAll);
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



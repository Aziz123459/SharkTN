import UserController from "../controllers/users.controller.js";
import {Router} from "express"
import StartupController from "../controllers/startup.controller.js";
import InvestorController from "../controllers/investor.controller.js";

const router = Router()

// Authenticated route
router.get("/api/users", UserController.ReadAll);

router.get('/startups/all',StartupController.getAllStartups);

router.get('/investors/all',InvestorController.getAllInvestors );

router.route("/user")
    // .post(UserController.create)
    .get(UserController.ReadAll)

router.route("/user/:id")
    .get(UserController.ReadOne)
    .put(UserController.update)
    .delete(UserController.DeleteOne)

router.route("/profile/:id")
    .get(UserController.ReadOne)
    .patch(UserController.update)
    .delete(UserController.DeleteOne)

router.route("/startup")
    .get(StartupController.ReadAll)

router.route("/startup/:id")
    .get(StartupController.ReadOne)
    .patch(StartupController.update)
    .delete(StartupController.DeleteOne)

router.route("/startup/user/:id")
    .get(StartupController.FindStartupByUserId)

router.route("/investor/user/:id")
    .get(InvestorController.FindInverstorByUserId)

router.route("/investor")
    .get(InvestorController.ReadAll)

router.route("/investor/:id")
    .get(InvestorController.ReadOne)
    .patch(InvestorController.update)
    .delete(InvestorController.DeleteOne)

router.route("/register")
    .post(UserController.register)

router.route("/register/startup")
    .post (StartupController.create)

router.route("/register/investor")
    .post(InvestorController.create)

router.route("/login")
    .post(UserController.login)

router.route("/logout")
    .get(UserController.logout)


export default router



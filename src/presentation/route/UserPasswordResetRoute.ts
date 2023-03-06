import { Router } from "express";
import UserPasswordResetController from "../controller/UserPasswordResetController";

const router = Router();
const userController = new UserPasswordResetController();

router.post("/user/forgot-password", userController.create);
router.post("/user/password-reset/:token", userController.passwordReset);

export default router;

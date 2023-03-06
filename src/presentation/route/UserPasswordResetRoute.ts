import { Router } from "express";
import UserPasswordResetController from "../controller/UserPasswordResetController";

const router = Router();
const userController = new UserPasswordResetController();

router.post("/user/forgot-password", userController.create);

export default router;

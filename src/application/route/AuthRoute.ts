import { Router } from "express";
import AuthController from "../../presentation/controller/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/auth/sign-in", authController.signIn);
router.post("/auth/refresh-token", authController.refreshToken);
router.post("/auth/revoke-refresh-token", authController.revokeRefreshToken);

export default router;

import { Router } from "express";
import UserController from "../../presentation/controller/UserController";

const router = Router();
const userController = new UserController();

router.get("/user", userController.find);
router.get("/user/:id", userController.findById);
router.post("/user", userController.create);
router.put("/user", userController.update);
router.delete("/user/:id", userController.delete);

export default router;

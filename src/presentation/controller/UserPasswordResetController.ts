import { Request, Response } from "express";
import { createUserPasswordResetApplication } from "../../application/factory/CreateApplication";
import { PasswordResetDTO } from "../../domain/dto/PasswordResetDTO";

export default class UserController {
    async create(req: Request, res: Response) {
        try {
            const userPasswordResetApplication =
                createUserPasswordResetApplication;
            const email = req.body.email.trim();
            const data = await userPasswordResetApplication.create(email);
            return res.status(201).send(data);
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
    async passwordReset(req: Request, res: Response) {
        try {
            const userPasswordResetApplication =
                createUserPasswordResetApplication;
            const passwordResetDTO = new PasswordResetDTO();
            passwordResetDTO.token = req.params.token.trim();
            passwordResetDTO.password = req.body.password.trim();
            passwordResetDTO.confirmPassword = req.body.confirmPassword.trim();
            await userPasswordResetApplication.passwordReset(passwordResetDTO);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
}

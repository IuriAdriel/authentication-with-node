import { Request, Response } from "express";
import { createUserPasswordResetApplication } from "../../application/factory/CreateApplication";

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
}

import { Request, Response } from "express";
import { createAuthApplication } from "../../application/factory/CreateApplication";

export default class AuthController {
    async signIn(req: Request, res: Response) {
        try {
            const authApplication = createAuthApplication;
            return res.status(200).json(await authApplication.signIn(req));
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
    async refreshToken(req: Request, res: Response) {
        try {
            const authApplication = createAuthApplication;
            return res
                .status(200)
                .json(await authApplication.refreshToken(req));
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
    async revokeRefreshToken(req: Request, res: Response) {
        try {
            const authApplication = createAuthApplication;
            const id = Number(req.body.id);
            await authApplication.revokeRefreshToken(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
}

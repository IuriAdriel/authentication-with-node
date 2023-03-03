import { Request, Response } from "express";
import { createUserApplication } from "../../application/factory/CreateApplication";
import UserFilter from "../../domain/filter/UserFilter";
import { User } from "../../domain/entity/User";
import Pagination from "../../util/data/Pagination";

export default class UserController {
    async findById(req: Request, res: Response) {
        try {
            const userApplication = createUserApplication;
            const id = Number(req.params.id);
            const user = await userApplication.findById(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
    async create(req: Request, res: Response) {
        try {
            const userApplication = createUserApplication;
            const user: User = new User();
            user.name = req.body.name.trim();
            user.email = req.body.email.trim();
            user.age = Number(req.body.age);
            user.password = req.body.password.trim();
            const publicUser = await userApplication.create(user);
            return res.status(201).send(publicUser);
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const userApplication = createUserApplication;
            const user: User = new User();
            user.id = Number(req.body.id);
            user.name = req.body.name.trim();
            user.email = req.body.email.trim();
            user.age = Number(req.body.age);
            const publicUser = await userApplication.update(user);
            return res.send(publicUser);
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const userApplication = createUserApplication;
            const id = Number(req.params.id);
            await userApplication.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
    async find(req: Request, res: Response) {
        try {
            const userApplication = createUserApplication;
            const userFilter = new UserFilter();
            userFilter.name = req.query.name ?? "";
            userFilter.email = req.query.email ?? "";
            userFilter.setPerPage(req.query.perPage);
            userFilter.setPage(req.query.page);
            const [users, count] = await userApplication.find(userFilter);
            const meta = {
                ...Pagination.create(
                    userFilter.perPage,
                    userFilter.page,
                    count
                ),
                name: userFilter.name,
                email: userFilter.email,
            };
            return res.json({ data: users, meta });
        } catch (error) {
            return res.status(500).send(`${error}`);
        }
    }
}

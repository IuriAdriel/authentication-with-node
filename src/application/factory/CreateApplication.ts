import AuthApplication from "../controller/AuthApplication";
import UserApplication from "../controller/UserApplication";
import { createUserService, createRefreshTokenService } from "./CreateService";

export const createAuthApplication = new AuthApplication(
    createUserService,
    createRefreshTokenService
);

export const createUserApplication = new UserApplication(createUserService);

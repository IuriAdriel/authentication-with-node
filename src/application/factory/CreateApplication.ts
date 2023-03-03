import AuthApplication from "../AuthApplication";
import UserApplication from "../UserApplication";
import { createUserService, createRefreshTokenService } from "./CreateService";

export const createAuthApplication = new AuthApplication(
    createUserService,
    createRefreshTokenService
);

export const createUserApplication = new UserApplication(createUserService);

import AuthApplication from "../AuthApplication";
import UserApplication from "../UserApplication";
import UserPasswordResetApplication from "../UserPasswordResetApplication";
import {
    createUserService,
    createRefreshTokenService,
    createUserPasswordResetService,
} from "./CreateService";

export const createAuthApplication = new AuthApplication(
    createUserService,
    createRefreshTokenService
);
export const createUserApplication = new UserApplication(createUserService);
export const createUserPasswordResetApplication =
    new UserPasswordResetApplication(
        createUserPasswordResetService,
        createUserService
    );

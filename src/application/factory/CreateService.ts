import RefreshTokenService from "../../domain/service/RefreshTokenService";
import UserPasswordResetService from "../../domain/service/UserPasswordResetService";
import UserService from "../../domain/service/UserService";
import { RefreshTokenRepository } from "../../infra/repository/RefreshTokenRepository";
import { UserPasswordResetRepository } from "../../infra/repository/UserPasswordResetRepository";
import { UserRepository } from "../../infra/repository/UserRepository";

export const createUserService = new UserService(new UserRepository());
export const createRefreshTokenService = new RefreshTokenService(
    new RefreshTokenRepository()
);
export const createUserPasswordResetService = new UserPasswordResetService(
    new UserPasswordResetRepository()
);

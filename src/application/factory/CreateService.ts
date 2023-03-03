import RefreshTokenService from "../../domain/service/RefreshTokenService";
import UserService from "../../domain/service/UserService";
import { RefreshTokenRepository } from "../../infra/repository/RefreshTokenRepository";
import { UserRepository } from "../../infra/repository/UserRepository";

export const createUserService = new UserService(new UserRepository());
export const createRefreshTokenService = new RefreshTokenService(
    new RefreshTokenRepository()
);

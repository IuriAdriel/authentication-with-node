import { Request } from "express";
import { RefreshToken } from "../../domain/entity/RefreshToken";
import { User } from "../../domain/entity/User";
import { IRefreshTokenService } from "../../domain/service/interface/IRefreshTokenService";
import { IUserService } from "../../domain/service/interface/IUserService";
import TokenJwt from "../../infra/auth/TokenJwt";

export default class AuthApplication {
    constructor(
        private readonly userService: IUserService,
        private readonly refreshTokenService: IRefreshTokenService
    ) {}
    async signIn(req: Request) {
        const user = await this.verifyPassword(
            req.body.email,
            req.body.password
        );
        const refreshToken = await this.createRefreshToken(user);
        const accessToken = TokenJwt.generate(user);
        const exp = TokenJwt.extractExpFromToken(accessToken);
        const refreshTokenResponse = this.buildRefreshTokenResponse(
            accessToken,
            refreshToken.key,
            exp
        );
        return refreshTokenResponse;
    }
    private async verifyPassword(
        email: string,
        password: string
    ): Promise<User> {
        return await this.userService.passwordVerify(email, password);
    }
    private async createRefreshToken(user: User): Promise<RefreshToken> {
        const refreshToken = new RefreshToken();
        refreshToken.user = user;
        return await this.refreshTokenService.create(refreshToken);
    }
    async refreshToken(req: Request) {
        const refreshToken = await this.verifyRefreshToken(req.body.key);
        this.validRefreshToken(refreshToken);
        const accessToken = TokenJwt.generate(refreshToken.user);
        const exp = TokenJwt.extractExpFromToken(accessToken);
        this.refreshTokenService.update(refreshToken);
        const refreshTokenResponse = this.buildRefreshTokenResponse(
            accessToken,
            refreshToken.key,
            exp
        );
        return refreshTokenResponse;
    }
    private async verifyRefreshToken(key: string) {
        const refreshToken = await this.refreshTokenService.findByKey(key);
        if (!refreshToken) {
            throw new Error("Token inválido.");
        }
        return await this.refreshTokenService.findByKey(key);
    }
    private validRefreshToken(refreshToken: RefreshToken) {
        const now = new Date();
        if (now > refreshToken.expirationAt) {
            throw new Error("Token expirou.");
        }
        if (!refreshToken.active) {
            throw new Error("Token inválido.");
        }
    }
    private buildRefreshTokenResponse(
        accessToken: string,
        refreshToken: string,
        exp: Date
    ) {
        return {
            accessToken,
            refreshToken: refreshToken,
            exp,
        };
    }
    async revokeRefreshToken(id: number) {
        const refreshTokens = await this.refreshTokenService.findByUser(id);
        for (const refreshToken of refreshTokens) {
            await this.refreshTokenService.inactivate(refreshToken.id);
        }
        return refreshTokens;
    }
}

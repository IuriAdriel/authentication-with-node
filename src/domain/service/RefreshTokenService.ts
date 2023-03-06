import { IRefreshTokenService } from "./interface/IRefreshTokenService";
import { IRefreshTokenRepository } from "../../infra/repository/interface/IRefreshTokenRepository";
import { RefreshToken } from "../entity/RefreshToken";
import TokenJwt from "../../infra/auth/TokenJwt";
import RefreshTokenRule from "../rule/RefreshTokenRule";

export default class RefreshTokenService implements IRefreshTokenService {
    constructor(private readonly repository: IRefreshTokenRepository) {}

    async findById(id: number): Promise<RefreshToken> {
        if (id > 0) {
            const refreshToken = await this.repository.findById(id);
            return refreshToken;
        }
        return null;
    }
    async create(refreshToken: RefreshToken): Promise<RefreshToken> {
        refreshToken.key = TokenJwt.generateRefreshToken();
        refreshToken.expirationAt = RefreshTokenRule.defatulExpirationTime();
        refreshToken.active = true;
        refreshToken.deleted = false;
        await this.repository.create(refreshToken);
        return refreshToken;
    }
    async update(refreshToken: RefreshToken): Promise<RefreshToken> {
        refreshToken.expirationAt = RefreshTokenRule.defatulExpirationTime();
        await this.repository.update(refreshToken);
        return refreshToken;
    }
    async delete(id: number): Promise<void> {
        const refreshToken = await this.findById(id);
        if (refreshToken) {
            await this.repository.delete(refreshToken);
        }
    }
    async findByKey(key: string): Promise<RefreshToken> {
        const refreshToken = await this.repository.findByKey(key);
        return refreshToken;
    }
    async exists(id: number): Promise<boolean> {
        if (id > 0) {
            return await this.repository.exists(id);
        }
        return false;
    }
    async findByUser(userId: number): Promise<RefreshToken[]> {
        const refreshTokens = await this.repository.findByUser(userId);
        return refreshTokens;
    }
    async inactivate(id: number): Promise<void> {
        await this.repository.inactivate(id);
    }
}

import { RefreshToken } from "../../domain/entity/RefreshToken";
import BaseRepository from "./base/BaseRepository";
import { IRefreshTokenRepository } from "./interface/IRefreshTokenRepository";

export class RefreshTokenRepository
    extends BaseRepository<RefreshToken>
    implements IRefreshTokenRepository
{
    constructor() {
        super(RefreshToken.name);
    }
    async findByKey(key: string): Promise<RefreshToken | null> {
        const refreshToken = await this.repository.findOne({
            where: { key: key as any, deleted: false },
            relations: ["user"],
        });
        return refreshToken;
    }
    async findByUser(userId: number): Promise<RefreshToken[] | null> {
        const query = await this.repository.createQueryBuilder("refresh_token");
        query.select("refresh_token.id");
        query.where("refresh_token.deleted = :deleted", { deleted: false });
        query.andWhere("refresh_token.userId = :userId", { userId: userId });
        query.andWhere("refresh_token.active = :active", { active: true });
        return query.getMany();
    }
    async inactivate(id: number): Promise<void> {
        await this.updatePartial(id, { active: false });
    }
}

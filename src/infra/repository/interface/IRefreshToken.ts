import { RefreshToken } from "../../../domain/entity/RefreshToken";

export interface IRefreshTokenRepository extends IBaseRepository<RefreshToken> {
    findByKey(key: string): Promise<RefreshToken | null>;
    findByUser(userId: number): Promise<RefreshToken[] | null>;
    inactivate(id: number): Promise<void>;
}

import { RefreshToken } from "../../entity/RefreshToken";

export interface IRefreshTokenService {
    findById(id: number): Promise<RefreshToken>;
    create(entity: RefreshToken): Promise<RefreshToken | null>;
    update(entity: RefreshToken): Promise<RefreshToken | null>;
    delete(id: number): Promise<void>;
    exists(id: number): Promise<boolean>;
    findByKey(key: string): Promise<RefreshToken | null>;
    findByUser(userId: number): Promise<RefreshToken[] | null>;
    inactivate(id: number): Promise<void>;
}

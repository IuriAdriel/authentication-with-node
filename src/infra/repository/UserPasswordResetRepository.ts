import BaseRepository from "./base/BaseRepository";
import { UserPasswordReset } from "../../domain/entity/UserPasswordReset";
import { IUserPasswordResetRepository } from "./interface/IUserPasswordResetRepository";

export class UserPasswordResetRepository
    extends BaseRepository<UserPasswordReset>
    implements IUserPasswordResetRepository
{
    constructor() {
        super(UserPasswordReset.name);
    }
    async findByToken(token: string): Promise<UserPasswordReset> {
        const userPasswordReset = await this.repository.findOne({
            where: {
                token: token as any,
            },
            relations: ["user"],
        });
        return userPasswordReset;
    }
}

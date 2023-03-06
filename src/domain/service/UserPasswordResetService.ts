import { IUserPasswordResetRepository } from "../../infra/repository/interface/IUserPasswordResetRepository";
import DateTimeUtil from "../../util/date-time/dateTimeUtil";
import { CryptoLib } from "../../util/encrypt/CryptoLib";
import { User } from "../entity/User";
import { UserPasswordReset } from "../entity/UserPasswordReset";
import { IUserPasswordResetService } from "./interface/IUserPasswordResetService";

export default class UserPasswordResetService
    implements IUserPasswordResetService
{
    constructor(private readonly repository: IUserPasswordResetRepository) {}
    async create(user: User): Promise<UserPasswordReset> {
        const userPasswordReset = new UserPasswordReset();
        userPasswordReset.expirationAt = DateTimeUtil.nowSummingHours(1);
        userPasswordReset.token = CryptoLib.generateCustomRandomKey(user.email);
        userPasswordReset.user = user;
        return await this.repository.create(userPasswordReset);
    }
    async findByToken(token: string): Promise<UserPasswordReset> {
        const userPasswordReset = await this.repository.findByToken(token);
        return userPasswordReset;
    }
}

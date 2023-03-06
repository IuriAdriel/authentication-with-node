import { User } from "../../entity/User";
import { UserPasswordReset } from "../../entity/UserPasswordReset";

export interface IUserPasswordResetService {
    create(user: User): Promise<UserPasswordReset>;
}

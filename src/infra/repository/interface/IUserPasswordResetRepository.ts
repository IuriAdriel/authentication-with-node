import { UserPasswordReset } from "../../../domain/entity/UserPasswordReset";

export interface IUserPasswordResetRepository
    extends IBaseRepository<UserPasswordReset> {
    findByToken(email: string): Promise<UserPasswordReset | null>;
}

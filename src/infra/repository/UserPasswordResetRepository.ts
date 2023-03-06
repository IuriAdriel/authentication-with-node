import BaseRepository from "./base/BaseRepository";
import UserFilter from "../../domain/filter/UserFilter";
import { UserPasswordReset } from "../../domain/entity/UserPasswordReset";
import { IUserPasswordResetRepository } from "./interface/IUserPasswordResetRepository";

export class UserPasswordResetRepository
    extends BaseRepository<UserPasswordReset>
    implements IUserPasswordResetRepository
{
    constructor() {
        super(UserPasswordReset.name);
    }
}

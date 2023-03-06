import * as dotenv from "dotenv";
import { UserPasswordReset } from "../domain/entity/UserPasswordReset";
dotenv.config();
import { IUserPasswordResetService } from "../domain/service/interface/IUserPasswordResetService";
import { IUserService } from "../domain/service/interface/IUserService";

export default class UserPasswordResetApplication {
    constructor(
        private readonly userPasswordResetService: IUserPasswordResetService,
        private readonly userService: IUserService
    ) {}
    async create(email: string) {
        const user = await this.userService.findByEmail(email);
        let userPasswordReset: UserPasswordReset = null;

        if (user) {
            userPasswordReset = await this.userPasswordResetService.create(
                user
            );
            const url = this.buildUrl(userPasswordReset.token);
            // aqui deve enviar um e-mail
            return { url };
        }

        return null;
    }
    private buildUrl(token: string): string {
        return `${process.env.BASE_URL}/user/password-reset/${token}`;
    }
}

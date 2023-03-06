import * as dotenv from "dotenv";
import { PasswordResetDTO } from "../domain/dto/PasswordResetDTO";
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
            // TODO
            // aqui deve enviar um e-mail
            return { url };
        }

        return null;
    }
    private buildUrl(token: string): string {
        return `${process.env.BASE_URL}/user/password-reset/${token}`;
    }
    async passwordReset(passwordResetDTO: PasswordResetDTO) {
        const userPasswordReset =
            await this.userPasswordResetService.findByToken(
                passwordResetDTO.token
            );
        if (!userPasswordReset) {
            throw new Error("Operação inválida.");
        }
        const now = new Date();
        if (userPasswordReset.used || userPasswordReset.expirationAt < now) {
            throw new Error("Token para alteração de senha expirou.");
        }
        if (!passwordResetDTO.confirmPasswordIsEqual()) {
            throw new Error("Senha e confirmação de senha não são iguais.");
        }
        this.userService.updatePassword(
            userPasswordReset.user.id,
            passwordResetDTO.password
        );
    }
}

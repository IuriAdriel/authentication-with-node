export class PasswordResetDTO {
    token: string;
    password: string;
    confirmPassword: string;
    confirmPasswordIsEqual() {
        return this.password == this.confirmPassword;
    }
}

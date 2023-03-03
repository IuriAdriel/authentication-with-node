import { User } from "../entity/User";
import * as Validator from "validatorjs";
import { validate } from "../../util/validator/ValidatorJsLib";
import { IUserService } from "../service/interface/IUserService";

export class UserValidator {
    constructor(private readonly service: IUserService) {
        Validator.registerAsync(
            "email_exists",
            async function (value, attribute, req, passes) {
                const user = await service.findByEmail(String(value));
                if (user && attribute && Number(attribute) != user.id) {
                    passes(false, "E-mail já cadastrado na base de dados.");
                } else {
                    passes();
                }
            },
            ""
        );
        Validator.registerAsync(
            "user_exists",
            async function (value, attribute, req, passes) {
                const exist = await service.exists(Number(value));
                if (!exist) {
                    passes(false, "Usuário não encontrado.");
                } else {
                    passes();
                }
            },
            ""
        );
    }
    async validateCreate(user: User) {
        const rules = {
            name: "required|min:2|max:100",
            email: `required|max:100|email|email_exists:${user.id}`,
        };
        let customMessages = {
            "required.name": "O nome deve ser preenchido.",
            "min.name": "O nome deve ter pelo menos 2 caracteres.",
            "max.name": "O nome deve ter no máximo 100 caracteres.",
            "required.email": "O e-mail deve ser preenchido.",
            "email.email": "O e-mail deve ter um formato válido.",
            "max.email": "O e-mail deve ter no máximo 100 caracteres.",
        };
        await validate(user, rules, customMessages);
    }
    async validatePassword(user: User) {
        const rules = {
            password: "required|min:5|max:15",
        };
        const customMessages = {
            "required.password": "A senha deve ser preenchida",
            "min.password": "A senha deve ter pelo menos 5 caracteres.",
            "max.password": "A senha deve ter no máximo 15 caracteres.",
        };
        await validate(user, rules, customMessages);
    }
    async validateUserExists(user: User) {
        const rules = {
            id: "user_exists",
        };
        await validate(user, rules);
    }
    async validateEmail(email: string) {
        const data = {
            email: email,
        };
        const rules = {
            email: "required|max:100|email",
        };
        const customMessages = {
            "required.email": "O e-mail deve ser preenchido.",
            "email.email": "O e-mail deve ter um formato válido.",
            "max.email": "O e-mail deve ter no máximo 100 caracteres.",
        };
        await validate(data, rules, customMessages);
    }
}

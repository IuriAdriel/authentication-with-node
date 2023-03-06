import { User } from "../entity/User";
import { IUserRepository } from "../../infra/repository/interface/IUserRepository";
import { UserValidator } from "../validator/UserValidator";
import { IUserService } from "./interface/IUserService";
import { CryptoLib } from "../../util/encrypt/CryptoLib";
import UserFilter from "../filter/UserFilter";

export default class UserService implements IUserService {
    userValidator: UserValidator;
    constructor(private readonly repository: IUserRepository) {
        this.userValidator = new UserValidator(this);
    }
    async findById(id: number): Promise<User> {
        if (id > 0) {
            const user = await this.repository.findById(id);
            return user;
        }
        return null;
    }
    async findByIdPublic(id: number) {
        if (id > 0) {
            const user = await this.repository.findById(id);
            if (user) {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
            return null;
        }
        return null;
    }
    async create(user: User): Promise<User> {
        await this.userValidator.validateCreate(user);
        await this.userValidator.validatePassword(user.password);
        user.password = CryptoLib.encrypt(user.password.trim());
        await this.repository.create(user);
        return user;
    }
    async update(user: User): Promise<User> {
        await this.userValidator.validateCreate(user);
        await this.userValidator.validateUserExists(user);
        await this.repository.update(user);
        return user;
    }
    async delete(id: number): Promise<void> {
        const user = await this.findById(id);
        if (user) {
            await this.repository.delete(user);
        }
    }
    async find(userFilter: UserFilter): Promise<[User[], number]> {
        const users = await this.repository.findWithFilter(userFilter);
        return users;
    }
    async findByEmail(email: string): Promise<User> {
        await this.userValidator.validateEmail(email);
        const user = await this.repository.findByEmail(email);
        return user;
    }
    async updateAge(id: number, age: number): Promise<void> {
        if (await this.exists(id)) {
            await this.repository.updateAge(id, age);
        } else {
            throw new Error(
                `Não foi possível atualizar a idade pois a entidade com id ${id} não foi encontrada`
            );
        }
    }
    async exists(id: number): Promise<boolean> {
        if (id > 0) {
            return await this.repository.exists(id);
        }
        return false;
    }
    async passwordVerify(email: string, password: string): Promise<User> {
        const user = await this.repository.findByEmail(email);
        if (user && user.password === CryptoLib.encrypt(password)) {
            return user;
        }
        throw new Error("Dados incorretos.");
    }
    async updatePassword(id: number, password: string): Promise<void> {
        await this.userValidator.validatePassword(password);
        password = CryptoLib.encrypt(password.trim());
        if (await this.exists(id)) {
            await this.repository.updatePartial(id, { password });
        } else {
            throw new Error(
                `Não foi possível atualizar a senha pois a entidade com id ${id} não foi encontrada`
            );
        }
    }
}

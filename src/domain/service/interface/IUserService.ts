import UserFilter from "../../filter/UserFilter";
import { User } from "../../entity/User";

export interface IUserService {
    findById(id: number): Promise<User>;
    findByIdPublic(id: number): Promise<any>;
    create(entity: User): Promise<User | null>;
    update(entity: User): Promise<User | null>;
    delete(id: number): Promise<void>;
    exists(id: number): Promise<boolean>;
    find(userFilter: UserFilter): Promise<[User[], number] | null>;
    findByEmail(email: string): Promise<User | null>;
    updateAge(id: number, age: number): Promise<void>;
    passwordVerify(email: string, password: string): Promise<User>;
}

import UserFilter from "../../../domain/filter/UserFilter";
import { User } from "../../../domain/entity/User";

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
    updateAge(id: number, age: number): Promise<void>;
    findWithFilter(userFilter: UserFilter): Promise<[User[], number]>;
}

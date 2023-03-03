import { User } from "../../../domain/entity/User";
import UserFilter from "../../../domain/filter/UserFilter";
import { IUserRepository } from "../interface/IUserRepository";

export default class MockUserRepository
    implements IUserRepository, IBaseRepository<User>
{
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);
        return user || null;
    }
    updateAge(id: number, age: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findWithFilter(userFilter: UserFilter): Promise<[User[], number]> {
        throw new Error("Method not implemented.");
    }
    find(filter: any): Promise<[User[], number]> {
        throw new Error("Method not implemented.");
    }
    update(entity: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updatePartial(id: number, entityPartial: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(entity: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async exists(id: number): Promise<boolean> {
        const user = this.users.find((user) => user.id === id);
        return user ? true : false;
    }
    private users: User[] = [
        {
            id: 1,
            name: "John Snow",
            email: "john@example.com",
            password: "44234242342",
            age: 20,
            deleted: false,
        },
        {
            id: 2,
            name: "Jane",
            email: "jane@example.com",
            password: "42423423423432",
            age: 30,
            deleted: false,
        },
    ];

    async findById(id: number): Promise<User | null> {
        const user = this.users.find((user) => user.id === id);
        return user || null;
    }

    async create(user: User): Promise<User | null> {
        user.id = this.users.length + 1;
        this.users.push(user);
        return user;
    }
}

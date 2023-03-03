import { User } from "../../domain/entity/User";
import BaseRepository from "./base/BaseRepository";
import { Like } from "typeorm";
import { IUserRepository } from "./interface/IUserRepository";
import UserFilter from "../../domain/filter/UserFilter";

export class UserRepository
    extends BaseRepository<User>
    implements IUserRepository
{
    constructor() {
        super(User.name);
    }
    async findByEmail(email: String): Promise<User | null> {
        const user = await this.repository.findOneBy({ email: email as any });
        return user;
    }
    async updateAge(id: number, age: number): Promise<void> {
        await this.updatePartial(id, { age: age });
    }
    public async findWithFilter(
        userFilter: UserFilter
    ): Promise<[User[], number]> {
        const query = this.repository.createQueryBuilder("user");
        query.select(["user.id", "user.name", "user.email"]);
        query.where("user.deleted = :deleted", { deleted: false });
        if (userFilter.name && userFilter.name.trim()) {
            query.andWhere(`user.name ILIKE :name`, {
                name: `%${userFilter.name}%`,
            });
        }
        if (userFilter.email && userFilter.email.trim()) {
            query.andWhere(`user.email ILIKE :email`, {
                email: `%${userFilter.email}%`,
            });
        }
        const users = await query
            .take(userFilter.perPage)
            .skip(userFilter.skip())
            .getManyAndCount();

        return users;
    }
}

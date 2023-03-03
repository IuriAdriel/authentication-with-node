import { User } from "../domain/entity/User";
import { IUserService } from "../domain/service/interface/IUserService";
import UserFilter from "../domain/filter/UserFilter";

export default class UserApplication {
    constructor(private readonly userService: IUserService) {}
    async findById(id: number) {
        const user = await this.userService.findByIdPublic(id);
        return user;
    }
    async create(user: User) {
        await this.userService.create(user);
        const publicUser = await this.userService.findByIdPublic(user.id);
        return publicUser;
    }
    async update(user: User) {
        await this.userService.update(user);
        const publicUser = await this.userService.findByIdPublic(user.id);
        return publicUser;
    }
    async delete(id: number) {
        await this.userService.delete(id);
    }
    async find(userFilter: UserFilter) {
        return await this.userService.find(userFilter);
    }
}

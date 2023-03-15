import { container } from "tsyringe";
import { IUserRepository } from "../repository/interface/IUserRepository";
import { IUserService } from "../../domain/service/interface/IUserService";
import { UserRepository } from "../repository/UserRepository";
import UserService from "../../domain/service/UserService";

container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository,
});

container.register<IUserService>("IUserService", {
    useClass: UserService,
});

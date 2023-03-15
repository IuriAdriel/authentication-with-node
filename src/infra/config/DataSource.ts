import "reflect-metadata";
import { DataSource } from "typeorm";
import { Mood } from "../../domain/entity/Mood";
import { RefreshToken } from "../../domain/entity/RefreshToken";
import { User } from "../../domain/entity/User";
import { UserPasswordReset } from "../../domain/entity/UserPasswordReset";
import DbConfig from "./DbConfig";

const dbConfig = new DbConfig();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Mood, User, UserPasswordReset, RefreshToken],
    migrations: [],
    subscribers: [],
});

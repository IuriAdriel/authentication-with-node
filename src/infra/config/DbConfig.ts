import * as dotenv from "dotenv";
dotenv.config();

class DbConfig {
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;

    constructor() {
        this.HOST = process.env.DB_HOST;
        this.PORT = Number(process.env.DB_PORT);
        this.USERNAME = process.env.DB_USERNAME;
        this.PASSWORD = process.env.DB_PASSWORD;
        this.DATABASE = process.env.DB_DATABASE;
    }
}

export default DbConfig;

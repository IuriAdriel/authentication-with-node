import { User } from "../../domain/entity/User";
import * as dotenv from "dotenv";
dotenv.config();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
import jwt_decode from "jwt-decode";

export default class TokenJwt {
    static generate(user: User): string {
        const expiresIn = "1h";
        const secret = process.env.SECRET_KEY;
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
        };
        return String(jwt.sign(payload, secret, { expiresIn }));
    }
    static generateRefreshToken(): string {
        let randomKey = crypto.randomBytes(48).toString("hex");
        const now = String(new Date().getTime());
        const md5Now = crypto
            .createHash("md5")
            .update(`${now}${crypto.randomBytes(20).toString("hex")}`)
            .digest("hex");
        const refreshToken = `${md5Now}${randomKey}`;
        return refreshToken;
    }
    static verify = (token: string): boolean => {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            return true;
        } catch (err) {
            return false;
        }
    };
    static extractExpFromToken = (accessToken: string) => {
        const { exp } = jwt_decode(accessToken) as any;
        let dateExp = new Date(Number(exp) * 1000);
        dateExp = new Date(dateExp.setUTCHours(dateExp.getUTCHours() - 3));
        return dateExp;
    };
}

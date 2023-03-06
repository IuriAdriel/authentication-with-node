import * as crypto from "crypto";
import * as dotenv from "dotenv";
dotenv.config();

export class CryptoLib {
    static encrypt(text: string) {
        const customSalt = process.env.SALT_KEY;
        return crypto
            .createHash("sha256")
            .update(`${text}${customSalt}`)
            .digest("hex");
    }
    static generateCustomRandomKey(customValue1: string) {
        let randomKey = crypto.randomBytes(48).toString("hex");
        const now = String(new Date().getTime());
        const md5Now = crypto
            .createHash("md5")
            .update(`${now}${customValue1}`)
            .digest("hex");
        const refreshToken = `${md5Now}${randomKey}`;
        return refreshToken;
    }
}

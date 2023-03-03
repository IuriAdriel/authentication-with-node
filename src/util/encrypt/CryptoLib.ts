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
}

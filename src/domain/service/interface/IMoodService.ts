import { Mood } from "../../entity/Mood";

export interface IMoodService {
    create(mood: Mood): Promise<Mood>;
    findById(token: number): Promise<Mood | null>;
}

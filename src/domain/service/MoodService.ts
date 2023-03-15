import { IMoodRepository } from "../../infra/repository/interface/IMoodRepository";
import { Mood } from "../entity/Mood";
import { IMoodService } from "./interface/IMoodService";

export default class MoodService implements IMoodService {
    constructor(private readonly repository: IMoodRepository) {}

    async create(mood: Mood): Promise<Mood> {
        return await this.repository.create(mood);
    }

    async findById(id: number): Promise<Mood> {
        const mood = await this.repository.findById(id);
        return mood;
    }
}

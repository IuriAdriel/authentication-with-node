import { Mood } from "../../domain/entity/Mood";
import BaseRepository from "./base/BaseRepository";
import { IMoodRepository } from "./interface/IMoodRepository";

export class MoodRepository
    extends BaseRepository<Mood>
    implements IMoodRepository
{
    constructor() {
        super(Mood.name);
    }
}

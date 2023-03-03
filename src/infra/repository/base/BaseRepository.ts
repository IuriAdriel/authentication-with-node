import { Repository } from "typeorm";
import { AppDataSource } from "../../config/DataSource";

export default abstract class BaseRepository<T> implements IBaseRepository<T> {
    public repository: Repository<T>;

    constructor(typeEntity: string) {
        this.repository = AppDataSource.getRepository<T>(typeEntity);
    }

    public async findById(id: number): Promise<T | null> {
        const entity = await this.repository.findOneBy({ id: id } as any);
        return entity;
    }

    public async find(filterOptions: any): Promise<[T[], number] | null> {
        const entities = await this.repository.findAndCount(filterOptions);
        return entities;
    }

    public async create(entity: T): Promise<T | null> {
        const entityCreated = await this.repository.save(entity);
        return entityCreated;
    }

    public async update(entity: T): Promise<T | null> {
        const entityUpdated = await this.repository.save(entity);
        return entityUpdated;
    }

    public async updatePartial(id: number, entityPartial: any): Promise<void> {
        await this.repository.update(id, entityPartial);
    }

    public async delete(entity: T): Promise<void> {
        await this.repository.remove(entity);
    }

    async exists(id: number): Promise<boolean> {
        const user = await this.repository.findOne({
            where: { id } as any,
            select: { id } as any,
        });
        if (user) {
            return true;
        }
        return false;
    }
}

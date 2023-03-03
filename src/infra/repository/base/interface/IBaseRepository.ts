interface IBaseRepository<T> {
    findById(id: number): Promise<T>;
    find(filter: any): Promise<[T[], number] | null>;
    create(entity: T): Promise<T | null>;
    update(entity: T): Promise<T | null>;
    updatePartial(id: number, entityPartial: any): Promise<void>;
    delete(entity: T): Promise<void>;
    exists(id: number): Promise<boolean>;
}

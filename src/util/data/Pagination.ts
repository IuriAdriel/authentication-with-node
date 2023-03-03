export default class Pagination {
    static create(perPage: number, page: number, count: number) {
        return {
            perPage: perPage,
            total: count,
            page: page,
            lastPage: Math.ceil(count / perPage),
        };
    }
}

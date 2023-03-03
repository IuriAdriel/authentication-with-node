export default class BaseFilter {
    perPage: number = 10;
    page: number = 1;

    setPerPage(perPage: Number | undefined) {
        if (perPage) {
            this.perPage = Number(perPage);
        }
    }

    setPage(page: Number | undefined) {
        if (page) {
            this.page = Number(page);
        }
    }
    skip() {
        return (this.page - 1) * this.perPage;
    }
}

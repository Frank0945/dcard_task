export interface IListTask {
    page: number;
    direction?: "asc" | "desc";
    status?: "open" | "in progress" | "done";
}
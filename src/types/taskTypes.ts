export interface IListTask {
    page: number;
    order?: "asc" | "desc";
    label?: "open" | "in progress" | "done";
    q?: string;
}
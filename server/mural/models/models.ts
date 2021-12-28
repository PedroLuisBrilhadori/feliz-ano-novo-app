export interface PostModel {
    id: string;
    title: string;
    message: string;
    date: Date;
    author?: string;
    to?: string;
}

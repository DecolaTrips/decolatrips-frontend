import { User } from "../classes/user";

export interface UserResponse {
    content: User[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;

}
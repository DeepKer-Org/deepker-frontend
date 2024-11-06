export interface LoginResponse {
    message: string;
    token: string;
};

export interface User {
    user_id: string;
    username: string;
    roles: string[];
}
export interface UsersResponse {
    users: User[];
    totalCount: number;
}

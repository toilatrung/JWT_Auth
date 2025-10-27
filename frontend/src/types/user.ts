export interface User {
    id: string;
    username: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    roles: string[];
    createdAt: string;
    updatedAt: string;
}
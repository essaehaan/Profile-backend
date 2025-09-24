export type UserRole = 'admin' | 'user';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
}

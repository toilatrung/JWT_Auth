import type { User } from "./user";

export interface AuthStore {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    clearState: () => void;

    signUp: (
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string
    ) => Promise<void>;

    logIn: (email: string, password: string) => Promise<void>;

    logOut: () => Promise<void>;

    fetchCurrentUser: () => Promise<void>;
}
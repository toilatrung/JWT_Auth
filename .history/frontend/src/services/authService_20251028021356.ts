import api from "@/lib/axios";

export const authService = {
    signUp: async (
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string
    ) => {
        try {
            const res = await api.post(
                "/auth/signup",
                { username, password, email, firstName, lastName },
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            console.error("Signup failed:", error);
            throw new Error("Unable to sign up. Please try again.");
        }
    },

    logIn: async (email: string, password: string) => {
        try {
            const res = await api.post(
                "/auth/login",
                { email, password },
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Unable to log in. Please check your credentials.");
        }
    },

    logOut: async () => {
        try {
            const res = await api.post(
                "/auth/logout",
                {},
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            console.error("Logout failed:", error);
            throw new Error("Unable to log out. Please try again later.");
        }
    },

    fetchCurrentUser: async () => {
        try {
            const res = await api.get("/auth/me", { withCredentials: true });
            return res.data;
        } catch (error) {
            console.error("Fetching current user failed:", error);
            throw new Error("Unable to fetch user data. Please try again.");
        }
    },
};
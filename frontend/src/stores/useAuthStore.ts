import {create} from "zustand";
import {toast} from "sonner";
import { authService } from "@/services/authService";
import type { AuthStore } from "@/types/store";

export const useAuthStore = create<AuthStore>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => set({accessToken: null, user: null, loading: false}),

    signUp: async (username, password, email, firstName, lastName) => {
        try {
            set({loading: true});
            // Simulate API call
            await authService.signUp(username, password, email, firstName, lastName);

            toast.success("Sign up successful!");
        } catch (error) {
            console.error("Sign Up Error:", error);
            toast.error("Failed to sign up. Please try again.");
        } finally {
            set({loading: false});
        }
    },

    logIn: async (email, password) => {
        try {
            set({loading: true});
            // Simulate API call
            const data = await authService.logIn(email, password);
            set({accessToken: data.accessToken, user: data.user});
            toast.success("Log in successful!");
        } catch (error) {
            console.error("Log In Error:", error);
            toast.error("Failed to log in. Please check your credentials.");
            throw error; // Re-throw the error so the component's catch block can handle it
        } finally {
            set({loading: false});
        }
    },

    logOut: async () => {
        try {
            get().clearState();
            await authService.logOut();
            toast.success("Log out successful!");
        } catch (error) {
            console.error("Log Out Error:", error);
            toast.error("Failed to log out. Please try again.");
        } finally {
            set({loading: false});
        }
    },

    fetchCurrentUser: async () => {
        try {
            set({loading: true});
            const data = await authService.fetchCurrentUser();
            set({user: data.user, accessToken: data.accessToken});
        } catch (error) {
            console.error("Fetch Current User Error:", error);
            set({user: null, accessToken: null});
            toast.error("Failed to fetch user data. Please try again.");
        } finally {
            set({loading: false});
        }
    },
}));
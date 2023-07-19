import { account, databases } from "@/appwrite";
import { AppwriteException, ID, Models, Query } from "appwrite";
import { create } from "zustand";

interface UserState {
  user: any;
  setUser : (user: any) =>void;
  register: (
    email: string,
    password: string,
    name: string,
    image?: File | null
  ) => Promise<Models.User<Models.Preferences>>;
  logIn: (
    email: string,
    password: string,
  ) => Promise<string | Models.Session>;
  getUserData: () => Promise<Models.User<Models.Preferences>>;
  logout: () => Promise<{}>;
}

export const useUserStore = create<UserState>()((set) => ({
  user: {},
  setUser: (user: any) => set({user}),

  getUserData : async () => {
    try {
      const data = await account.get();
      set({user: data});
      return data;
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  },

  register: async (
    email: string,
    password: string,
    name: string,
  ) => {
    let file: Image | undefined;
    try {
      const result = await account.create("unique()", email, password, name);
      return result;
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  },

  logIn: async (email: string, password: string) => {
    try {
      const result = await account.createEmailSession(email, password);
      return result
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  },

  logout : async () => {
    try {
      const result = account.deleteSession("current")
      set({user:{}});
      return result;
    } catch (error: unknown) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  },
}));
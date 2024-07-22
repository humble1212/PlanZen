import conf from "../appwrite/conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return userAccount;
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }
  async logoutUser() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async resetPasswords({ password }) {
    try {
      await this.account.updatePassword(password);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const authService = new AuthService();
export default authService;

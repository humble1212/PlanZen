import { Client, Account, Databases } from "appwrite";
import conf from "./conf/conf";

const client = new Client();

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const DATABASE_ID = conf.appwriteDatabaseId;
export const INCOME_COLLECTION_ID = conf.appwriteIncomeCollectionId;
export const BUDGET_COLLECTION_ID = conf.appwriteBudgetCollectionId;
export const EXPENSES_COLLECTION_ID = conf.appwriteExpenseCollectionId;

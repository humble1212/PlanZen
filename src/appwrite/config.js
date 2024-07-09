// src/appwrite/config.js
import conf from "./conf/conf";
import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { ID } from "appwrite";

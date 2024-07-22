// src/appwrite/config.js
import conf from "./conf/conf";
import { Client, Databases, Storage, Query, ID, Account } from "appwrite";

export const account = new Account(Client);
export { ID } from "appwrite";
export class Service {
  client = new Client();
  databases;
  bucket;
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client);
  }

  async fetchEvent(userId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId
      );
    } catch (error) {
      console.log("Failed to fetch :: fetchEvents()", error);
      return false;
    }
  }

  async getEvents(queries = [Query.equal("status", "active")]) {
    try {
      const events = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      return events.documents;
    } catch (error) {
      console.log("Failed to fetch :: fetchEvents()", error);
      return false;
    }
  }

  async createEvent({ id, ...eventData }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id || ID.unique(),
        { ...eventData }
      );
      return response;
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  }

  async updateEvent(eventId, updatedEventData) {
    try {
      const { ...cleanedData } = updatedEventData;
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        eventId, // This is the correct usage of the eventId
        cleanedData
      );
    } catch (error) {
      console.error("Failed to update :: updateEvent()", error);
    }
  }

  async deleteEvent(eventId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        eventId
      );
      return true;
    } catch (error) {
      console.log("Failed to delete :: deleteEvent()", error);
      return false;
    }
  }

  async uploadImage(file) {
    try {
      const response = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      const fileUrl = this.bucket.getFileView(
        conf.appwriteBucketId,
        response.$id
      );
      return fileUrl;
    } catch (error) {
      console.error("Failed to upload :: uploadImage()", error);
    }
  }

  async updateUserProfile(userData) {
    try {
      console.log("Updating user profile with data:", userData); // Add this log
      const result = await this.account.updatePrefs(userData);
      console.log("Update result:", result); // Add this log
      return result;
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  }

  async getCurrentUser() {
    try {
      const account = await this.account.get();
      const prefs = await this.account.getPrefs();
      return { ...account, ...prefs };
    } catch (error) {
      console.error("getCurrentUser error:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Failed to delete :: deleteFile()", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).hash;
  }

  getFileView(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;

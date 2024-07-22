const conf = {
  appwriteUrl: String(import.meta.env.VITE_APP_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APP_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID),
  appwriteBudgetCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_BUDGET_COLLECTION_ID
  ),
  appwriteIncomeCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_INCOME_COLLECTION_ID
  ),
  appwriteExpenseCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_EXPENSES_COLLECTION_ID
  ),
  appwriteHabitCollectionId: String(
    import.meta.env.VITE_APP_APPWRITE_HABIT_COLLECTION_ID
  ),
};

export default conf;

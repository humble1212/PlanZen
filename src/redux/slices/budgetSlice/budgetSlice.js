import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  databases,
  DATABASE_ID,
  BUDGET_COLLECTION_ID,
} from "../../../appwrite/budgetService";
import { ID } from "appwrite";

export const fetchBudgets = createAsyncThunk(
  "budget/fetchBudgets",
  async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      BUDGET_COLLECTION_ID
    );
    return response.documents;
  }
);

export const addBudgetItem = createAsyncThunk(
  "budget/addBudgetItem",
  async (budgetItem) => {
    const { userId, ...budgetData } = budgetItem;

    // Convert Date objects to ISO strings
    const formattedBudgetData = {
      ...budgetData,
      startDate: budgetData.startDate.toISOString(),
      endDate: budgetData.endDate.toISOString(),
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      BUDGET_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        ...formattedBudgetData,
      }
    );
    return response;
  }
);

export const updateBudget = createAsyncThunk(
  "budget/updateBudget",
  async (budgetItem) => {
    const { userId, ...budgetData } = budgetItem;
    const formattedBudgetData = {
      userId,
      ...budgetData,
    };
    await databases.updateDocument(
      DATABASE_ID,
      BUDGET_COLLECTION_ID,
      budgetItem.$id,
      formattedBudgetData
    );
  }
);

export const deleteBudget = createAsyncThunk(
  "budget/deleteBudget",
  async (budgetItemId) => {
    await databases.deleteDocument(
      DATABASE_ID,
      BUDGET_COLLECTION_ID,
      budgetItemId
    );
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    deleteBudgetItem: (state, action) => {
      state.items = state.items.filter((item) => item.$id !== action.payload);
    },
    updateBudgetItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.$id === action.payload.$id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    clearBudgetItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBudgetItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { deleteBudgetItem, updateBudgetItem, clearBudgetItems } =
  budgetSlice.actions;

export default budgetSlice.reducer;

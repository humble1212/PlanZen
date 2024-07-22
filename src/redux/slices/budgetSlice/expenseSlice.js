import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  databases,
  DATABASE_ID,
  EXPENSES_COLLECTION_ID,
} from "../../../appwrite/budgetService";
import { ID } from "appwrite";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      EXPENSES_COLLECTION_ID
    );
    return response.documents;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseItems) => {
    const response = await databases.createDocument(
      DATABASE_ID,
      EXPENSES_COLLECTION_ID,
      ID.unique(),
      expenseItems
    );
    return response;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (expenseId) => {
    await databases.deleteDocument(
      DATABASE_ID,
      EXPENSES_COLLECTION_ID,
      expenseId
    );
    return expenseId;
  }
);

export const editExpense = createAsyncThunk(
  "expenses/editExpense",
  async (expenseData) => {
    const { $id, ...updateData } = expenseData;
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        $id,
        updateData
      );
      return response;
    } catch (error) {
      console.error("Error updating expense:", error);
      throw error;
    }
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    // Add expense
    addExpense: (state, action) => {
      state.items.push(action.payload);
    },
    // Remove expense
    removeExpense: (state, action) => {
      const index = state.items.findIndex(
        (expense) => expense.id === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    // Update expense
    updateExpense: (state, action) => {
      const index = state.items.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    // Clear all expenses
    clearExpenses: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add expense
      .addCase(editExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (expense) => expense.$id === action.payload.$id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { removeExpense, updateExpense, clearExpenses } =
  expensesSlice.actions;
export default expensesSlice.reducer;

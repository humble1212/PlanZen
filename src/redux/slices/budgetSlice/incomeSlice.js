import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  databases,
  DATABASE_ID,
  INCOME_COLLECTION_ID,
} from "../../../appwrite/budgetService";
import { ID } from "appwrite";

export const fetchIncome = createAsyncThunk("income/fetchIncome", async () => {
  const response = await databases.listDocuments(
    DATABASE_ID,
    INCOME_COLLECTION_ID
  );
  return response.documents;
});

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (incomeData, { rejectWithValue }) => {
    try {
      // Remove any fields that shouldn't be sent to the database
      const { ...validData } = incomeData;

      const response = await databases.createDocument(
        DATABASE_ID,
        INCOME_COLLECTION_ID,
        ID.unique(),
        {
          ...validData,
          amount: parseFloat(validData.amount) || 0,
          date: validData.date
            ? new Date(validData.date).toISOString()
            : new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error("Error in addIncome:", error);
      return rejectWithValue(error.message || "Failed to add income");
    }
  }
);

export const editIncome = createAsyncThunk(
  "income/editIncome",
  async (incomeData, { rejectWithValue }) => {
    try {
      // Remove any fields that shouldn't be sent to the database
      const {
        $id,

        ...validData
      } = incomeData;

      const transformedData = {
        ...validData,
        amount: parseFloat(validData.amount) || 0,
        date: validData.date
          ? new Date(validData.date).toISOString()
          : new Date().toISOString(),
      };

      const response = await databases.updateDocument(
        DATABASE_ID,
        INCOME_COLLECTION_ID,
        $id,
        transformedData
      );
      return response;
    } catch (error) {
      console.error("Error in editIncome:", error);
      return rejectWithValue(error.message || "Failed to edit income");
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (incomeId, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        INCOME_COLLECTION_ID,
        incomeId
      );
      return incomeId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete income");
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    addIncome: (state, action) => {
      state.items.push(action.payload);
    },
    removeIncome: (state, action) => {
      const index = state.items.findIndex(
        (income) => income.$id === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    updateIncome: (state, action) => {
      const index = state.items.findIndex(
        (income) => income.$id === action.payload.$id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editIncome.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (income) => income.$id === action.payload.$id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (income) => income.$id !== action.payload
        );
      });
  },
});

export default incomeSlice.reducer;

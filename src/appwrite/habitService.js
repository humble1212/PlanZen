// src/redux/habitSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conf from "./conf/conf";
import { databases } from "./budgetService";
import { ID } from "appwrite";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const response = await databases.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteHabitCollectionId
  );
  return response.documents;
});

export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habitData) => {
    try {
      const response = await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteHabitCollectionId,
        ID.unique(),
        { ...habitData }
      );
      console.log("Create habit response:", response);
      return response;
    } catch (error) {
      console.error("Error creating habit:", error);
      throw error;
    }
  }
);

const habitSlice = createSlice({
  name: "habits",
  initialState: {
    habits: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Add habit
    addHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    // Remove habit
    removeHabit: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.$id === action.payload
      );
      if (index >= 0) {
        state.habits.splice(index, 1);
      }
    },
    // Update habit
    updateHabit: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.$id === action.payload.id
      );
      if (index >= 0) {
        state.habits[index] = { ...state.habits[index], ...action.payload };
      } else {
        console.error(`Habit not found with id: ${action.payload.id}`);
      }
    },
    markHabitAsCompleted: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.$id === action.payload.habitId
      );
      if (index >= 0) {
        state.habits[index].completed = action.payload.completed;
      } else {
        console.error(`Habit not found with id: ${action.payload.habitId}`);
      }
    },

    extraReducers: (builder) => {
      builder
        .addCase(fetchHabits.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchHabits.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.habits = action.payload;
        })
        .addCase(fetchHabits.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(createHabit.fulfilled, (state, action) => {
          state.habits.push(action.payload);
        })

        .addCase(createHabit.fulfilled, (state, action) => {
          state.habits.push(action.payload);
        });
    },
  },
});

export const { addHabit, removeHabit, updateHabit, markHabitAsCompleted } =
  habitSlice.actions;
export default habitSlice.reducer;

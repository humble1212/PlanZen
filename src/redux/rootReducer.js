// src/redux/rootReducer.js

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import calendarReducer from "./slices/calendarSlice";
import budgetReducer from "./slices/budgetSlice/budgetSlice";
import incomeReducer from "./slices/budgetSlice/incomeSlice";
import expensesReducer from "./slices/budgetSlice/expenseSlice";
import habitReducer from "../appwrite/habitService";

const rootReducer = combineReducers({
  auth: authReducer,
  events: calendarReducer,
  budget: budgetReducer,
  income: incomeReducer,
  expenses: expensesReducer,
  habits: habitReducer,
  // ... other reducers
});

export default rootReducer;

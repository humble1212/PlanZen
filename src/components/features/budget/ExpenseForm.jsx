/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  deleteExpense,
  editExpense,
  fetchExpenses,
} from "../../../redux/slices/budgetSlice/expenseSlice"; // Adjust the import path as needed
import {
  FaDollarSign,
  FaCalendarAlt,
  FaList,
  FaRegCreditCard,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import moment from "moment";
import "./Budget.css";

// ExpenseForm Component

const ExpenseTracker = ({ categories }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData?.$id);
  const budgetId = useSelector((state) => state.budget.items?.$id);
  const totalIncome = useSelector((state) =>
    state.income.items.reduce((sum, income) => sum + income.amount, 0)
  );

  const handleFormSubmit = async (data) => {
    try {
      await dispatch(addExpense({ userId, ...data })).unwrap();
      toast.success("Successfully added expense");
      reset();
    } catch (error) {
      console.error("Failed to add expense:", error.message);
      toast.error("Failed to add expense");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-inherit shadow-lg rounded-lg w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
          Available Income: ${totalIncome.toFixed(2)}
        </h3>
      </div>
      <input type="hidden" {...register("budgetId")} value={budgetId} />

      <FormField
        label="Category"
        icon={<FaList />}
        errors={errors.category}
        required>
        <select
          {...register("category", { required: "Category is required" })}
          className="pl-10 block w-full rounded-md bg-inherit border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 dark:text-white py-2">
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Subcategory">
        <input
          {...register("subcategory")}
          className="pl-3 py-1 block w-full rounded-md bg-inherit border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 dark:text-white"
          placeholder="Optional subcategory"
        />
      </FormField>

      <FormField
        label="Amount"
        icon={<FaDollarSign />}
        errors={errors.amount}
        required>
        <input
          type="number"
          step="0.01"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: { value: 0.01, message: "Amount must be greater than 0" },
          })}
          className="pl-10 py-1 block w-full rounded-md bg-inherit border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 dark:text-white"
          placeholder="0.00"
        />
      </FormField>

      <FormField
        label="Date"
        icon={<FaCalendarAlt />}
        errors={errors.date}
        required>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="pl-10 py-1 block w-full rounded-md bg-inherit border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 dark:text-white"
        />
      </FormField>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="isRecurring"
          {...register("isRecurring")}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="isRecurring"
          className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Recurring Expense
        </label>
      </div>

      <FormField label="Description">
        <textarea
          {...register("description")}
          rows={3}
          className="pl-3 py-2 block w-full rounded-md bg-inherit border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 dark:text-white"
          placeholder="Add any additional details about the expense"
        />
      </FormField>

      <FormField label="Payment Method" icon={<FaRegCreditCard />}>
        <input
          {...register("paymentMethod")}
          className="pl-10 py-2 block w-full rounded-md bg-inherit border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 dark:text-white"
          placeholder="e.g., Credit Card, Cash, Bank Transfer"
        />
      </FormField>

      <button
        type="submit"
        className="w-full flex justify-center py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
        Add Expense
      </button>
    </form>
  );
};

const EditExpenseForm = ({ expense, onCancel }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: expense,
  });

  const handleFormSubmit = async (data) => {
    try {
      const updatedExpense = {
        $id: expense.$id,
        category: data.category,
        amount: parseFloat(data.amount),
        date: data.date,
        // Include other fields as necessary
      };
      await dispatch(editExpense(updatedExpense)).unwrap();
      toast.success("Expense updated successfully");
      onCancel();
    } catch (error) {
      console.error("Failed to update expense:", error);
      toast.error("Failed to update expense: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormField
        label="Category"
        icon={<FaList />}
        errors={errors.category}
        required>
        <input
          {...register("category", { required: "Category is required" })}
          className="pl-10 block w-full rounded-md bg-inherit border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </FormField>

      <FormField
        label="Amount"
        icon={<FaDollarSign />}
        errors={errors.amount}
        required>
        <input
          type="number"
          step="0.01"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0.01, message: "Amount must be greater than 0" },
          })}
          className="pl-10 block w-full bg-inherit border rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </FormField>

      <FormField
        label="Date"
        icon={<FaCalendarAlt />}
        errors={errors.date}
        required>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="pl-10 block w-full rounded-md bg-inherit border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </FormField>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save Changes
        </button>
      </div>
    </form>
  );
};

// FormField Component
const FormField = ({ label, icon, errors, children, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative rounded-md shadow-sm">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      {children}
    </div>
    {errors && (
      <span className="text-red-500 text-xs mt-1">{errors.message}</span>
    )}
  </div>
);

// ExpenseList Component
const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleDelete = async (expenseId) => {
    try {
      await dispatch(deleteExpense(expenseId)).unwrap();
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <div className="p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-600">No expense records available.</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li
              key={expense.$id}
              className="flex justify-between items-center p-4 bg-inherit border border-gray-500 my-2 rounded-md shadow-sm">
              {editingExpense && editingExpense.$id === expense.$id ? (
                <EditExpenseForm
                  expense={expense}
                  onCancel={() => setEditingExpense(null)}
                />
              ) : (
                <>
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {expense.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      {moment(expense.date).format("LL")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {expense.subcategory}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-700">
                      ${expense.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      {expense.paymentMethod}
                    </p>
                    <p className="text-sm text-gray-500">
                      {expense.isRecurring ? "Recurring" : "One-time"}
                    </p>
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.$id)}
                        className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main Component
const ExpenseForm = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div className="flex w-full space-x-4">
      <div className="flex-1">
        <ExpenseTracker
          categories={["Food", "Transport", "Utilities", "Entertainment"]}
          budgetId={1}
        />
      </div>
      <div className="flex-1">
        <ExpenseList />
      </div>
    </div>
  );
};

export default ExpenseForm;

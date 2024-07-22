/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCalendarAlt, FaDollarSign, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncome,
  deleteIncome,
  editIncome,
  fetchIncome,
} from "../../../redux/slices/budgetSlice/incomeSlice";
import { toast } from "react-toastify";
import moment from "moment";

// IncomeTracker Component
const IncomeTracker = ({ onEditIncome, resetEditingIncome }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const userId = useSelector((state) => state.auth.userData?.$id);
  const budgetId = useSelector((state) => state.budget.items?.$id);

  const handleFormSubmit = async (data) => {
    try {
      const incomeData = {
        userId,
        budgetId,
        source: data.source,
        amount: parseFloat(data.amount) || 0,
        frequency: data.frequency,
        date: data.date,
        description: data.description,
      };

      if (onEditIncome && onEditIncome.$id) {
        incomeData.$id = onEditIncome.$id;
        await dispatch(editIncome(incomeData)).unwrap();
        toast.success("Income updated successfully!");
      } else {
        await dispatch(addIncome(incomeData)).unwrap();
        toast.success("Income added successfully!");
      }

      reset();
      resetEditingIncome();
      dispatch(fetchIncome()); // Fetch updated income list
    } catch (error) {
      console.error("Failed to save income:", error);
      toast.error(
        "Failed to save income: " + (error.message || "Unknown error")
      );
    }
  };

  useEffect(() => {
    if (onEditIncome) {
      reset({
        ...onEditIncome,
        amount: parseFloat(onEditIncome.amount) || 0,
        date: onEditIncome.date
          ? moment(onEditIncome.date).format("YYYY-MM-DD")
          : "",
      });
    }
  }, [onEditIncome, reset]);

  const handleCancelEdit = () => {
    reset();
    resetEditingIncome();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-3/4 space-y-4 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {onEditIncome ? "Edit Income" : "Track Income"}
      </h2>

      <div>
        <label
          htmlFor="source"
          className="block text-sm font-medium text-gray-700">
          Income Source
        </label>
        <input
          {...register("source", { required: "Income source is required" })}
          className="mt-1 block w-full bg-inherit rounded-md border border-gray-300 shadow-sm focus:outline-none p-2"
          placeholder="e.g., Salary, Freelance, Investment"
        />
        {errors.source && (
          <span className="text-red-500 text-xs mt-1">
            {errors.source.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaDollarSign className="text-gray-400" />
          </div>
          <input
            type="number"
            step="0.01"
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              min: { value: 0.01, message: "Amount must be greater than 0" },
            })}
            className="pl-10 block w-full bg-inherit rounded-md border border-gray-300 shadow-sm focus:outline-none p-2"
            placeholder="0.00"
          />
        </div>
        {errors.amount && (
          <span className="text-red-500 text-xs mt-1">
            {errors.amount.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="frequency"
          className="block text-sm font-medium text-gray-700">
          Frequency
        </label>
        <select
          {...register("frequency", { required: "Frequency is required" })}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-inherit shadow-sm focus:outline-none p-2">
          <option value="">Select frequency</option>
          <option value="once">One-time</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
        </select>
        {errors.frequency && (
          <span className="text-red-500 text-xs mt-1">
            {errors.frequency.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaCalendarAlt className="text-gray-400" />
          </div>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="pl-10 block w-full rounded-md bg-inherit border border-gray-300 shadow-sm focus:outline-none p-1"
          />
        </div>
        {errors.date && (
          <span className="text-red-500 text-xs mt-1">
            {errors.date.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1 block w-full rounded-md bg-inherit border border-gray-300 shadow-sm focus:outline-none indent-2 py-2"
          placeholder="Add any additional details about the income"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center h-12 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          {onEditIncome ? "Update Income" : "Add Income"}
        </button>
        {onEditIncome && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="flex-1 flex items-center justify-center h-12 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

// IncomeList Component
export const IncomeList = ({ onEdit, editingId, resetEdit }) => {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.income.items);
  const status = useSelector((state) => state.income.status);
  const error = useSelector((state) => state.income.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIncome());
    }
  }, [status, dispatch]);

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to delete this income entry?")) {
      await dispatch(deleteIncome(id)).unwrap();
      dispatch(fetchIncome());
      resetEdit();
    }
  };

  const handleEdit = (income) => {
    onEdit(income);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Income List</h2>
      {incomes.length === 0 ? (
        <p className="text-gray-600">No income records available.</p>
      ) : (
        <ul className="space-y-2 overflow-scroll">
          {incomes.map((income) => (
            <li
              key={income.$id}
              className="w-full flex justify-between items-center p-4 rounded-md shadow-sm border my-1">
              {editingId === income.$id ? (
                <div>Editing...</div>
              ) : (
                <>
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {income.source}
                    </p>
                    <p className="text-sm text-gray-500">
                      {moment(income.date).format("LL")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-700">
                      ${parseFloat(income.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{income.frequency}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(income)}
                      className="p-2 text-blue-500 hover:text-blue-600">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleRemove(income.$id)}
                      className="p-2 text-red-500 hover:text-red-600">
                      <FaTrash />
                    </button>
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
const IncomeForm = () => {
  const [editingIncome, setEditingIncome] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (income) => {
    setEditingIncome(income);
    setEditingId(income.$id);
  };

  const resetEditingIncome = () => {
    setEditingIncome(null);
    setEditingId(null);
  };

  return (
    <div className="flex w-full space-x-2">
      <div className="flex-1 flex items-center justify-center">
        <IncomeTracker
          onEditIncome={editingIncome}
          resetEditingIncome={resetEditingIncome}
        />
      </div>
      <div className="flex-1">
        <IncomeList
          onEdit={handleEdit}
          editingId={editingId}
          resetEdit={resetEditingIncome}
        />
      </div>
    </div>
  );
};

export default IncomeForm;

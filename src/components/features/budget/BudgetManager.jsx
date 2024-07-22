/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBudgets,
  updateBudget,
  deleteBudget,
  addBudgetItem,
} from "../../../redux/slices/budgetSlice/budgetSlice";
import { FixedSizeList as List } from "react-window";
import { FileEdit, Plus } from "lucide-react";

import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import moment from "moment";
import Budgetform from "./Budgetform";

const BudgetManager = ({ balance }) => {
  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budget.items);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  const handleBudgetSelect = (budgetId) => {
    setSelectedBudgetId(budgetId);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleUpdateBudget = (updatedBudget) => {
    dispatch(updateBudget(updatedBudget));
    setIsEditing(false);
  };

  const handleCreateBudget = (newBudget) => {
    dispatch(addBudgetItem(newBudget));
    setIsCreating(false);
  };

  const handleDeleteBudget = (budgetId) => {
    dispatch(deleteBudget(budgetId));
    setSelectedBudgetId(null);
  };

  const BudgetListItem = ({ index, style }) => {
    const budget = budgets[index];
    return (
      <div
        style={style}
        className={`p-3 rounded cursor-pointer ${
          selectedBudgetId === budget.$id
            ? " border-l-4 border-blue-500"
            : " hover:bg-gray-200 hover:text-black"
        }`}
        onClick={() => handleBudgetSelect(budget.$id)}>
        <h3 className="font-semibold">{budget.name}</h3>
        <p className="text-sm text-gray-600">
          {moment(budget.startDate).format("MMM D")} -{" "}
          {moment(budget.endDate).format("MMM D, YYYY")}
        </p>
        <p className="text-sm text-gray-600">Total: ${budget.total}</p>
      </div>
    );
  };

  const BudgetList = () => (
    <>
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-semibold">Budget List</h2>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          onClick={() => setIsCreating(true)}>
          <Plus className="inline-block mr-1" size={16} /> New Budget
        </button>
      </div>
      {budgets.length === 0 ? (
        <p>No budgets created yet. Create a new budget to get started!</p>
      ) : (
        <List
          height={400}
          itemCount={budgets.length}
          itemSize={80}
          width={300}
          className="space-y-2 w-full capitalize">
          {BudgetListItem}
        </List>
      )}
    </>
  );

  return (
    <div className="flex space-x-8">
      <div className="w-1/3">
        <BudgetList handleDeleteBudget={handleDeleteBudget} />
      </div>
      <div className="w-2/3">
        {isCreating ? (
          <Budgetform
            onSubmit={handleCreateBudget}
            onCancel={() => setIsCreating(false)}
            balance={balance}
          />
        ) : isEditing ? (
          <Budgetform
            budgetId={selectedBudgetId}
            onSubmit={handleUpdateBudget}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <BudgetDetail
            budget={budgets.find((b) => b.$id === selectedBudgetId)}
            onDelete={handleDeleteBudget}
          />
        )}
      </div>
    </div>
  );
};

const Card = ({ children, className }) => (
  <div
    className={`bg-inherit shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
);

const CardFooter = ({ children }) => (
  <div className="px-6 py-4 bg-inherit border-t border-gray-200">
    {children}
  </div>
);

const Button = ({ children, variant = "default", onClick }) => {
  const baseClasses =
    "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    outline:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

const BudgetDetail = ({ budget, onEdit, onDelete }) => {
  if (!budget) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent>
          <p className="text-gray-500 text-center">
            Select a budget to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  const calculateTotal = (items) => {
    return items
      .reduce((total, item) => {
        const amount =
          typeof item === "object"
            ? parseFloat(item.amount) || 0
            : parseFloat(item) || 0;
        return total + amount;
      }, 0)
      .toFixed(2);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderList = (items, title, emptyMessage) => {
    const total = calculateTotal(items);

    return (
      <div className="mb-4 ">
        <h3 className="text-lg font-semibold mb-2 pb-1 border-b border-gray-300 ">
          {title}
        </h3>
        {items && items.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-sm text-gray-700 ">
                {typeof item === "object" ? (
                  <>
                    {item.name}:{" "}
                    {item.amount ? formatCurrency(item.amount) : "N/A"}
                  </>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">{emptyMessage}</p>
        )}
        {items && items.length > 0 && (
          <p className="text-right font-semibold mt-2">
            Total: {formatCurrency(total)}
          </p>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-h-welHgt overflow-scroll max-w-2xl mx-auto capitalize">
      <CardHeader>
        <h2 className="text-2xl font-bold">{budget.name}</h2>
        <p className="text-sm text-gray-500">
          {format(new Date(budget.startDate), "MMMM d, yyyy")} -{" "}
          {format(new Date(budget.endDate), "MMMM d, yyyy")}
        </p>
        <h2 className="text-sm font-bold">
          Allocated Amount: ${budget.budgetAmount}
        </h2>
      </CardHeader>
      <CardContent>
        {renderList(
          budget.savingsGoals,
          "Savings Goals",
          "No savings goals available"
        )}
        {renderList(
          budget.budgetCategories,
          "Budget Categories",
          "No budget categories available"
        )}
        {renderList(budget.debts, "Debts to Pay", "No debts listed")}
        {renderList(budget.budgetSettings, "Settings", "default settings")}
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="text-xs text-gray-500">
            <p>Created: {format(new Date(budget.$createdAt), "PPpp")}</p>
            <p>Updated: {format(new Date(budget.$updatedAt), "PPpp")}</p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onEdit(budget.$id)}>
              <FileEdit className="w-4 h-4 inline-block mr-2" /> Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(budget.$id)}>
              <Trash2 className="w-4 h-4 inline-block mr-2" /> Delete
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BudgetManager;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Activity } from "lucide-react";
import BudgetManager from "./BudgetManager";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import { fetchIncome } from "../../../redux/slices/budgetSlice/incomeSlice";
import { fetchExpenses } from "../../../redux/slices/budgetSlice/expenseSlice";
import { fetchBudgets } from "../../../redux/slices/budgetSlice/budgetSlice";

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white border rounded-lg shadow p-6 flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <p className="text-2xl font-bold mb-2">
      ${typeof value === "number" ? value.toFixed(2) : "0.00"}
    </p>
    {trend !== undefined && (
      <p className={`text-xs ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
        {trend > 0 ? (
          <TrendingUp className="inline h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="inline h-4 w-4 mr-1" />
        )}
        {Math.abs(trend)}% from last month
      </p>
    )}
  </div>
);

const Budget = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("budgets");

  const incomeItems = useSelector((state) => state.income.items);
  const expenseItems = useSelector((state) => state.expenses.items);
  const budgets = useSelector((state) => state.budget.items);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalDebts, setTotalDebts] = useState(0);

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpenses());
    dispatch(fetchBudgets());
  }, [dispatch]);

  useEffect(() => {
    setTotalIncome(
      incomeItems.reduce((sum, item) => sum + parseFloat(item.amount), 0)
    );
  }, [incomeItems]);

  useEffect(() => {
    setTotalExpenses(
      expenseItems.reduce((sum, item) => sum + parseFloat(item.amount), 0)
    );
  }, [expenseItems]);

  useEffect(() => {
    if (budgets.length > 0) {
      const latestBudget = budgets[budgets.length - 1];
      setTotalSavings(
        latestBudget.savingsGoals.reduce(
          (sum, goal) => sum + parseFloat(goal.targetAmount),
          0
        )
      );
      setTotalDebts(
        latestBudget.debts.reduce(
          (sum, debt) => sum + parseFloat(debt.amount),
          0
        )
      );
    }
  }, [budgets]);

  const balance = totalIncome - totalExpenses;

  const pieChartData = [
    { name: "Income", value: totalIncome, color: "#10B981" },
    { name: "Expenses", value: totalExpenses, color: "#EF4444" },
    { name: "Savings", value: totalSavings, color: "#3B82F6" },
    { name: "Debts", value: totalDebts, color: "#F59E0B" },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">${data.value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Budget Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Income"
          value={totalIncome}
          icon={DollarSign}
          trend={5}
        />
        <StatCard
          title="Total Expenses"
          value={totalExpenses}
          icon={TrendingDown}
          trend={-2}
        />
        <StatCard title="Balance" value={balance} icon={Activity} />
        <div className="bg-white border rounded-lg shadow p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Budget Overview
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value">
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm text-gray-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Total Budget: $
              {(
                totalIncome +
                totalExpenses +
                totalSavings +
                totalDebts
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          {["budgets", "income", "expenses"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 px-6 focus:outline-none transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 font-medium text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === "budgets" && <BudgetManager balance={balance} />}
          {activeTab === "income" && <IncomeForm />}
          {activeTab === "expenses" && <ExpenseForm />}
        </div>
      </div>
    </div>
  );
};

export default Budget;

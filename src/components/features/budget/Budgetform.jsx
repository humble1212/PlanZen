/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { addBudgetItem } from "../../../redux/slices/budgetSlice/budgetSlice";

// Custom components
const Input = React.forwardRef(({ label, ...props }, ref) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      ref={ref}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
));
Input.displayName = "Input";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "flex item-center justify-start px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

const Switch = React.forwardRef(
  ({ label, defaultChecked = false, onChange, ...props }, ref) => {
    const [checked, setChecked] = useState(defaultChecked);

    const toggleSwitch = () => {
      const newChecked = !checked;
      setChecked(newChecked);
      if (onChange) {
        onChange(newChecked);
      }
    };

    return (
      <div className="flex items-center space-x-4">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            checked ? "bg-blue-600" : "bg-gray-200"
          }`}
          onClick={toggleSwitch}
          ref={ref}
          {...props}>
          <span className="sr-only">Toggle switch</span>
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

const Select = React.forwardRef(({ label, options, ...props }, ref) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      ref={ref}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
));
Select.displayName = "Select";

const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const CardFooter = ({ children }) => (
  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2">
    {children}
  </div>
);

const Tabs = ({ children }) => <div className="mb-6">{children}</div>;

const TabsList = ({ children }) => (
  <div className="flex border-b border-gray-200">{children}</div>
);

const TabsTrigger = ({ children, isActive, onClick }) => (
  <button
    type="button"
    className={`px-4 py-2 font-medium text-sm focus:outline-none ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-500 hover:text-gray-700"
    }`}
    onClick={onClick}>
    {children}
  </button>
);

const TabsContent = ({ children, isActive }) => (
  <div className={`py-4 ${isActive ? "block" : "hidden"}`}>{children}</div>
);

const BudgetForm = ({ onCancel, balance }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData?.$id);
  const { control, handleSubmit, register, reset, watch } = useForm({
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      currency: "USD",
      savingsGoals: [],
      debts: [],
      budgetCategories: [],
      budgetSettings: {
        alertThreshold: 0,
        overBudgetNotification: false,
        savingsReminderFrequency: "",
        autoCategorizationRules: "",
      },
      useExistingBalance: true,
      budgetAmount: balance,
    },
  });

  const [activeTab, setActiveTab] = useState("basic");

  const useExistingBalance = watch("useExistingBalance");

  const {
    fields: savingsGoalsFields,
    append: appendSavingsGoal,
    remove: removeSavingsGoal,
  } = useFieldArray({ control, name: "savingsGoals" });
  const {
    fields: debtsFields,
    append: appendDebt,
    remove: removeDebt,
  } = useFieldArray({ control, name: "debts" });
  const {
    fields: categoriesFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({ control, name: "budgetCategories" });

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        userId,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        currency: data.currency,
        savingsGoals: data.savingsGoals.map(
          (goal) => `${goal.name}: ${goal.targetAmount}`
        ),
        debts: data.debts.map((debt) => `${debt.name}: ${debt.amount}`),
        budgetCategories: data.budgetCategories.map(
          (category) => `${category.name}: ${category.allocatedAmount}`
        ),
        budgetAmount: data.useExistingBalance ? balance : data.budgetAmount,
        budgetSettings: Object.entries(data.budgetSettings).map(
          ([key, value]) => `${key}: ${value}`
        ),
      };

      await dispatch(addBudgetItem(formattedData)).unwrap();
      toast.success("Budget created successfully!");
      onCancel();
    } catch (error) {
      toast.error(`Error creating budget: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Create New Budget</h2>
        </CardHeader>
        <CardContent>
          <Tabs>
            <TabsList>
              <TabsTrigger
                isActive={activeTab === "basic"}
                onClick={() => setActiveTab("basic")}>
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                isActive={activeTab === "categories"}
                onClick={() => setActiveTab("categories")}>
                Categories
              </TabsTrigger>
              <TabsTrigger
                isActive={activeTab === "goals"}
                onClick={() => setActiveTab("goals")}>
                Goals & Debts
              </TabsTrigger>
              <TabsTrigger
                isActive={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}>
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent isActive={activeTab === "basic"}>
              <div className="space-y-4">
                <Input
                  label="Budget Name"
                  {...register("name")}
                  placeholder="Enter budget name"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        customInput={<Input label="Start Date" />}
                        className="p-2"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        customInput={<Input label="End Date" />}
                        className="p-2"
                      />
                    )}
                  />
                </div>
                <Select
                  label="Currency"
                  {...register("currency")}
                  options={["USD", "EUR", "GBP", "JPY", "AUD", "CAD"]}
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Amount
                  </label>
                  <div className="flex items-center space-x-4">
                    <Controller
                      name="useExistingBalance"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          label={`Use available funds: $${balance}`}
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {!useExistingBalance && (
                      <Input
                        {...register("budgetAmount", { valueAsNumber: true })}
                        type="number"
                        placeholder="Enter budget amount"
                      />
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent isActive={activeTab === "categories"}>
              <div className="space-y-4">
                {categoriesFields.map((item, index) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <Input
                      {...register(`budgetCategories.${index}.name`)}
                      placeholder="Category Name"
                    />
                    <Input
                      {...register(
                        `budgetCategories.${index}.allocatedAmount`,
                        { valueAsNumber: true }
                      )}
                      type="number"
                      placeholder="Amount"
                    />
                    <Button
                      type="button"
                      onClick={() => removeCategory(index)}
                      variant="outline">
                      <FaMinus />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => appendCategory({})}
                  variant="outline">
                  <FaPlus className="mr-2" /> Add Category
                </Button>
              </div>
            </TabsContent>

            <TabsContent isActive={activeTab === "goals"}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Savings Goals</h3>
                  {savingsGoalsFields.map((item, index) => (
                    <div key={item.id} className="flex gap-2 items-center">
                      <Input
                        {...register(`savingsGoals.${index}.name`)}
                        placeholder="Savings Goal Name"
                      />
                      <Input
                        {...register(`savingsGoals.${index}.targetAmount`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Target Amount"
                      />
                      <Button
                        type="button"
                        onClick={() => removeSavingsGoal(index)}
                        variant="outline">
                        <FaMinus />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => appendSavingsGoal({})}
                    variant="outline">
                    <FaPlus className="mr-2" /> Add Savings Goal
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Debts</h3>
                  {debtsFields.map((item, index) => (
                    <div key={item.id} className="flex gap-2 items-center">
                      <Input
                        {...register(`debts.${index}.name`)}
                        placeholder="Debt Name"
                      />
                      <Input
                        {...register(`debts.${index}.amount`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Amount"
                      />
                      <Button
                        type="button"
                        onClick={() => removeDebt(index)}
                        variant="outline">
                        <FaMinus />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => appendDebt({})}
                    variant="outline">
                    <FaPlus className="mr-2" /> Add Debt
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent isActive={activeTab === "settings"}>
              <div className="space-y-4">
                <Input
                  label="Alert Threshold (%)"
                  type="number"
                  {...register("budgetSettings.Threshold", {
                    valueAsNumber: true,
                  })}
                />
                <Controller
                  name="budgetSettings.Warning"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      label="Over Budget Notification"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Input
                  label="Savings Reminder Frequency"
                  {...register("budgetSettings.Reminder")}
                  placeholder="e.g., Weekly, Monthly"
                />
                <Input
                  label="Auto Categorization Rules"
                  {...register("budgetSettings.Categorization")}
                  placeholder="Enter rules"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button type="button" onClick={() => reset()} variant="outline">
            Reset
          </Button>
          <Button type="submit">Create Budget</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BudgetForm;

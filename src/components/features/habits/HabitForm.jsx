/* eslint-disable react/prop-types */
// HabitForm.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlus,
  FaSpinner,
  FaInfoCircle,
  FaCalendarAlt,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import { createHabit } from "../../../appwrite/habitService";
import { toast } from "react-toastify";

const HabitForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData?.$id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      frequency: "daily",
      startDate: "",
      endDate: "",
      reminderTime: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const habitData = {
        ...data,
        userId,
        streak: 0,
        longestStreak: 0,
        lastCompletedAt: null,
      };
      await dispatch(createHabit(habitData)).unwrap();
      toast.success("Habit created successfully!");
      reset();
    } catch (err) {
      toast.error("Failed to create habit:", err);
      setError("Failed to create habit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create New Habit
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <CustomInput
              label="Habit Name"
              name="name"
              register={register}
              required
              error={errors.name}
              icon={<FaEdit />}
            />
            <CustomSelect
              label="Frequency"
              name="frequency"
              register={register}
              options={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
              icon={<FaCalendarAlt />}
            />
          </div>
          <CustomInput
            label="Description"
            name="description"
            register={register}
            as="textarea"
            icon={<FaInfoCircle />}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <CustomInput
              label="Start Date"
              name="startDate"
              type="date"
              register={register}
              required
              error={errors.startDate}
              icon={<FaCalendarAlt />}
            />
            <CustomInput
              label="End Date (Optional)"
              name="endDate"
              type="date"
              register={register}
              icon={<FaCalendarAlt />}
            />
          </div>
          <CustomInput
            label="Reminder Time (Optional)"
            name="reminderTime"
            type="time"
            register={register}
            icon={<FaClock />}
          />
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <CustomButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaPlus className="mr-2" />
            )}
            {isLoading ? "Adding..." : "Add Habit"}
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

// CustomInput.jsx

const CustomInput = ({
  label,
  name,
  register,
  required,
  error,
  as = "input",
  type = "text",
  icon,
  ...rest
}) => {
  const Component = as;
  return (
    <div className="relative mb-6">
      <label
        className="block text-gray-700 text-sm font-semibold mb-2"
        htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <Component
          id={name}
          className={`shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${
            error ? "border-red-500" : ""
          }`}
          {...register(name, { required })}
          type={type}
          {...rest}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs italic mt-2">{error.message}</p>
      )}
    </div>
  );
};

const CustomSelect = ({ label, name, register, options, icon, ...rest }) => {
  return (
    <div className="relative mb-6">
      <label
        className="block text-gray-700 text-sm font-semibold mb-2"
        htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200"
          {...register(name)}
          {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      </div>
    </div>
  );
};

const CustomButton = ({ children, ...props }) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 flex items-center justify-center w-full"
      {...props}>
      {children}
    </button>
  );
};

export default HabitForm;

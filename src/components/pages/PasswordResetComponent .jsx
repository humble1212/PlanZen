/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  KeyIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/slices/authSlice";

const InputField = ({
  label,
  id,
  type,
  register,
  errors,
  showPassword,
  togglePassword,
}) => (
  <div className="mb-6 relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-500 mb-2">
      {label}
    </label>
    <div className="flex">
      <input
        type={showPassword ? "text" : type}
        id={id}
        {...register(id)}
        className="flex-grow px-4 py-2 bg-inherit border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="px-4 py-2 bg-inherit border border-l-0 border-gray-300 rounded-r-md text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
    {errors[id] && (
      <p className="mt-2 text-sm text-red-600">{errors[id].message}</p>
    )}
  </div>
);

const Button = ({ onClick, type, className, children }) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${className}`}>
    {children}
  </button>
);

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (pass) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length > 7) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
        return "Weak";
      case 1:
        return "Fair";
      case 2:
        return "Good";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Weak";
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-blue-500";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-gray-700">
          Password Strength
        </span>
        <span className="text-xs font-medium text-gray-700">
          {getStrengthLabel(strength)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getStrengthColor(strength)}`}
          style={{ width: `${(strength / 4) * 100}%` }}></div>
      </div>
    </div>
  );
};

const PasswordResetComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const password = watch("password");

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setValue("password", password);
    setValue("confirmPassword", password);
  };

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const resultAction = await dispatch(
        resetPassword({ password: data.password })
      );
      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset successful! You can now log in.");
        navigate("/Login");
      } else {
        if (resultAction.payload) {
          toast.error(`Password reset failed: ${resultAction.payload}`);
        } else {
          toast.error("Password reset failed");
        }
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
    clearForm();
  };

  const clearForm = () => {
    reset({
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <LockClosedIcon className="w-16 h-16 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="New Password"
          id="password"
          type="password"
          register={register}
          errors={errors}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <PasswordStrengthIndicator password={password} />
        <InputField
          label="Confirm New Password"
          id="confirmPassword"
          type="password"
          register={register}
          errors={errors}
          showPassword={showConfirmPassword}
          togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        <Button
          type="button"
          onClick={generatePassword}
          className="bg-green-600 text-white hover:bg-green-700 focus:ring-green-500">
          <KeyIcon className="h-5 w-5 inline-block mr-2" />
          Generate Strong Password
        </Button>
        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={clearForm}
            className="flex-1 bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500">
            <XCircleIcon className="h-5 w-5 inline-block mr-2" />
            Clear Form
          </Button>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500">
            Cancel
          </Button>
        </div>
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
          Reset Password
        </Button>
      </form>
    </motion.div>
  );
};

export default PasswordResetComponent;

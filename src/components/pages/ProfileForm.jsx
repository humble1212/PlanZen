/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
} from "react-icons/fa";
import { useTheme } from "../../appContext/appContext";
import { useState } from "react"; // Add this import
import { toast } from "react-toastify";

const ProfileForm = ({ onSubmit, initialData }) => {
  const { themeMode } = useTheme();
  const [submitError, setSubmitError] = useState(null); // Add this state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const onSubmitForm = async (data) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
      toast.success("Profile updated successfully!"); // Add this toast notification
    } catch (error) {
      toast.error("Error submitting form:", error);

      setSubmitError(
        error.message || "An error occurred while updating the profile"
      );
    }
  };

  const InputField = ({ name, label, type, icon, rules, ...rest }) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          {...register(name, rules)}
          className={`block w-full indent-10 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
            errors[name] ? "border-red-500" : ""
          }`}
          {...rest}
        />
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div
        className={` shadow-md rounded-lg p-6 + ${
          themeMode === "light" ? "bg-white" : "bg-inherit"
        }`}>
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            name="name"
            label="Name"
            type="text"
            icon={<FaUser className="text-gray-400" />}
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
              maxLength: {
                value: 50,
                message: "Name must not exceed 50 characters",
              },
            }}
          />

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaVenusMars className="text-gray-400" />
              </div>
              <select
                {...register("gender", { required: "Please select a gender" })}
                className={`block w-full pl-10 h-10 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.gender ? "border-red-500" : ""
                }`}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">
                {errors.gender.message}
              </p>
            )}
          </div>

          <InputField
            name="email"
            label="Email"
            type="email"
            icon={<FaEnvelope className="text-gray-400" />}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            }}
          />

          <InputField
            name="contact"
            label="Contact"
            type="tel"
            icon={<FaPhone className="text-gray-400" />}
            rules={{
              required: "Contact number is required",
              pattern: {
                value: /^\+?[0-9]{1,3}?[-. ]?[0-9]{1,14}$/,
                message: "Invalid number",
              },
            }}
          />

          <InputField
            name="location"
            label="Location"
            type="text"
            icon={<FaMapMarkerAlt className="text-gray-400" />}
            rules={{
              required: "Location is required",
              minLength: {
                value: 3,
                message: "Location must be at least 3 characters long",
              },
              maxLength: {
                value: 50,
                message: "Location must not exceed 50 characters",
              },
            }}
          />

          <div className="mb-4 col-span-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              {...register("bio", {
                minLength: {
                  value: 10,
                  message: "Bio must be at least 10 characters long",
                },
                maxLength: {
                  value: 250,
                  message: "Bio must not exceed 250 characters",
                },
              })}
              rows={4}
              className={`block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none p-2 ${
                errors.bio ? "border-red-500" : ""
              }`}
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Update Profile
          </button>
        </div>

        {submitError && (
          <p className="mt-2 text-sm text-red-600">{submitError}</p>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;

/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { BiCalendar, BiCheck, BiUserCircle } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "../../../appContext/appContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CATEGORIES = [
  "Academics",
  "Appointment",
  "Work Schedule",
  "Religious Activity",
  "Personal Routines",
  "Project Schedule",
];

const REPEAT_OPTIONS = [
  "No repeat",
  "Every day",
  "Working days",
  "Weekend only",
];

const FORM_SECTIONS = [
  { id: "details", label: "Details", icon: BiCheck },
  { id: "date", label: "Date & Reminder", icon: BiCalendar },
  { id: "location", label: "Location & More", icon: BiUserCircle },
];

function EventForm({ event, onSubmit, onCancel }) {
  const [activeSection, setActiveSection] = useState("details");
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === "dark";
  const userId = useSelector((state) => state.auth.userData?.$id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: event?.title || "",
      category: event?.category || "Academics",
      description: event?.description || "",
      start: event?.start ? new Date(event.start) : null,
      end: event?.end ? new Date(event.end) : null,
      location: event?.location || "",
      repeatOption: event?.repeatOption || "No repeat",
    },
  });

  const submitEvent = async (data) => {
    try {
      const eventData = {
        userId,
        ...data,
        start: data.start.toISOString(),
        end: data.end.toISOString(),
        status: "active",
      };

      if (event) {
        await onSubmit({ id: event.$id, ...eventData });
      } else {
        await onSubmit(eventData);
      }
      onCancel();
    } catch (error) {
      console.error("Failed to submit event:", error);
    }
  };

  const nextSection = (e) => {
    e.preventDefault(); // Prevent form submission
    const currentIndex = FORM_SECTIONS.findIndex(
      (section) => section.id === activeSection
    );
    const nextIndex = (currentIndex + 1) % FORM_SECTIONS.length;
    setActiveSection(FORM_SECTIONS[nextIndex].id);
  };

  return (
    <form
      onSubmit={handleSubmit(submitEvent)}
      className={`rounded-lg shadow-lg p-2 min-w-max transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}>
      <div className="mb-6 flex justify-between items-center gap-2">
        <h1 className="text-2xl font-bold">
          {event ? "Edit Event" : "Add New Event"}
        </h1>
        <button
          type="button"
          className={`hover:text-red-500 transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
          onClick={onCancel}>
          <IoMdClose size={28} />
        </button>
      </div>

      <div className="flex justify-between mb-6 gap-2">
        {FORM_SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveSection(id)}
            className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === id
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : `${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500 hover:text-white`
            }`}>
            <Icon className="mr-2" size={20} />
            {label}
          </button>
        ))}
      </div>

      <div
        className={`rounded-lg p-2 mb-4 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-100"
        }`}>
        {activeSection === "details" && (
          <div className="space-y-4">
            <InputField
              id="title"
              label="Title"
              placeholder="Add title"
              register={register}
              errors={errors}
              required
              isDarkMode={isDarkMode}
            />
            <SelectField
              id="category"
              label="Category"
              options={CATEGORIES}
              register={register}
              isDarkMode={isDarkMode}
            />
            <TextAreaField
              id="description"
              label="Description"
              placeholder="Event description"
              register={register}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        {activeSection === "date" && (
          <div className="space-y-4">
            <DateTimePickerField
              name="start"
              label="Start Date"
              control={control}
              errors={errors}
              isDarkMode={isDarkMode}
            />
            <DateTimePickerField
              name="end"
              label="End Date"
              control={control}
              errors={errors}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        {activeSection === "location" && (
          <div className="space-y-6">
            <InputField
              id="location"
              label="Where will this event take place?"
              placeholder="Add event venue"
              register={register}
              isDarkMode={isDarkMode}
            />
            <SelectField
              id="repeatOption"
              label="Choose Repeat Option"
              options={REPEAT_OPTIONS}
              register={register}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className={`w-1/3 py-3 px-4 rounded-md transition-colors duration-300 font-medium ${
            isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}>
          Cancel
        </button>
        {activeSection === "location" ? (
          <button
            type="submit"
            className="w-1/3 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium shadow-md">
            {event ? "Update Event" : "Submit Event"}
          </button>
        ) : (
          <button
            type="button"
            className={`w-1/3 py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center font-medium ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={nextSection}>
            Next <BsArrowRight className="ml-2" size={20} />
          </button>
        )}
      </div>
    </form>
  );
}

function InputField({
  id,
  label,
  type = "text",
  placeholder,
  register,
  errors,
  required,
  isDarkMode,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id, { required: required && `${label} is required` })}
        className={`w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      />
      {errors?.[id] && (
        <span className="text-red-500 text-sm mt-1">{errors[id].message}</span>
      )}
    </div>
  );
}

function DateTimePickerField({ name, label, control, errors, isDarkMode }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className={`w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

function SelectField({ id, label, options, register, isDarkMode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select
        {...register(id)}
        className={`w-full p-3 rounded-md border focus:outline-none transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}>
        {options.map((item) => (
          <option key={item} value={item} className="py-1">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ id, label, placeholder, register, isDarkMode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        {...register(id)}
        placeholder={placeholder}
        className={`w-full h-20 p-3 rounded-md border focus:outline-none transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      />
    </div>
  );
}

export default EventForm;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose, MdAlarm } from "react-icons/md";

const ReminderModal = ({ event, onSave, onClose }) => {
  const [reminderDate, setReminderDate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (event.reminder) {
      setReminderDate(new Date(event.reminder));
    }
  }, [event]);

  const handleSave = () => {
    const now = moment();
    const eventStart = moment(event.start);

    if (eventStart.isBefore(now)) {
      setError("This event is already due. Cannot set a reminder.");
      return;
    }

    if (!reminderDate) {
      setError("Please select a reminder time.");
      return;
    }

    const reminderMoment = moment(reminderDate);

    if (reminderMoment.isAfter(eventStart)) {
      setError("Reminder time cannot be after the event start time.");
      return;
    }

    onSave(reminderMoment.toISOString());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Set Reminder</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800">
            <MdClose size={24} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Event: {event.title}</p>
          <p className="text-sm text-gray-600">
            Starts: {moment(event.start).format("LLLL")}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Set reminder for:
          </label>
          <DatePicker
            selected={reminderDate}
            onChange={(date) => setReminderDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            maxDate={new Date(event.start)}
            minDate={new Date()}
            minTime={new Date()}
            maxTime={new Date(event.start)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
            <MdAlarm className="mr-2" />
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;

/* eslint-disable react/prop-types */
import { FaCheck, FaTimes } from "react-icons/fa";

function HabitCard({ habit }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{"habit.name"}</h2>
      <p className="text-gray-600 mb-2">{habit.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Streak: {habit.streak} days
        </span>
        <div>
          <button className="bg-green-500 text-white p-2 rounded-full mr-2">
            <FaCheck />
          </button>
          <button className="bg-red-500 text-white p-2 rounded-full">
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitCard;

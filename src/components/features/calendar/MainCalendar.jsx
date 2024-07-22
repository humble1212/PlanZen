/* eslint-disable react/prop-types */

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo, useState } from "react";
import { LuListFilter } from "react-icons/lu";
import { GrAdd } from "react-icons/gr";
import { useTheme } from "../../../appContext/appContext";

const localizer = momentLocalizer(moment);

function MainCalendar({ events, onEventSelect, onSelectSlot, setIsFormOpen }) {
  const [currentView, setCurrentView] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("start");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showSort, setShowSort] = useState(false);
  const { themeMode } = useTheme();

  const viewOptions = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: moment().format("dddd, MMMM D"), value: "agenda" },
  ];

  const handleViewChange = (newView) => {
    if (["month", "week", "day", "agenda"].includes(newView)) {
      setCurrentView(newView);
    } else {
      console.error("Invalid view type:", newView);
    }
  };

  const handleToggleSort = () => {
    setShowSort(!showSort);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const formattedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const processedEvents = useMemo(() => {
    return formattedEvents
      .filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filterCategory === "all" || event.category === filterCategory)
      )
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else {
          return new Date(a[sortBy]) - new Date(b[sortBy]);
        }
      });
  }, [formattedEvents, searchTerm, filterCategory, sortBy]);

  return (
    <div
      className={`main--calender ${
        themeMode === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-800"
      }`}>
      <header className="w-full flex items-center justify-between py-4 px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="w-2/5 font-semibold flex items-center justify-start space-x-4">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleViewChange(option.value)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                currentView === option.value
                  ? "bg-blue-500 text-white dark:hover:text-black"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}>
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-end space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-64 h-10 px-4 rounded-full text-black bg-gray-100 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <button
            onClick={handleToggleSort}
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-50 transition-colors duration-200">
            <LuListFilter />
            <span>Filter</span>
          </button>
          <button
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
            <GrAdd className="text-white" />
            <span>Add Event</span>
          </button>
        </div>
      </header>

      {showSort && (
        <div className="absolute top-20 right-6 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-50 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Filter & Sort
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="sortBy"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort by
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                <option value="start">Start Date</option>
                <option value="end">End Date</option>
                <option value="title">Title</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="filterCategory"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Category
              </label>
              <select
                id="filterCategory"
                value={filterCategory}
                onChange={(e) => handleFilter(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                <option value="all">All Categories</option>
                <option value="Academics">Academics</option>
                <option value="Work Schedule">Work Schedule</option>
                <option value="Religious Activity">Religious Activity</option>
                <option value="Personal Routines">Personal Routines</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowSort(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Apply
            </button>
          </div>
        </div>
      )}

      <div
        className="calendar-container p-6"
        style={{
          height: "calc(100vh - 200px)",
          width: "100%",
        }}>
        <Calendar
          localizer={localizer}
          events={processedEvents}
          components={{ event: CustomEvent }}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={onEventSelect}
          onSelectSlot={onSelectSlot}
          selectable
          view={currentView}
          onView={handleViewChange}
          toolbar={false}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}

const CustomEvent = ({ event }) => {
  const { themeMode } = useTheme();
  const categoryColors = {
    Work: "blue",
    Personal: "green",
    Academics: "yellow",
    "Religious Activity": "purple",
    "Work Schedule": "red",
    "Personal Routines": "pink",
  };

  return (
    <div
      className={`custom-event ${
        themeMode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
      style={{
        borderLeft: `4px solid ${categoryColors[event.category] || "gray"}`,
      }}>
      <div className="custom-event-title">{event.title}</div>
      <div className="custom-event-time">
        {moment(event.start).format("HH:mm")}
      </div>
    </div>
  );
};
export default MainCalendar;

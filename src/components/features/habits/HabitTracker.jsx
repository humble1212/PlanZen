/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaPlus, FaTimes, FaSearch, FaSort, FaFilter } from "react-icons/fa";
import { fetchHabits } from "../../../appwrite/habitService";
import HabitForm from "./HabitForm";
import { toast } from "react-toastify";
import HabitCard from "./HabitCard";

const HabitTracker = () => {
  const dispatch = useDispatch();
  const { habits, status, error } = useSelector((state) => state.habits);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHabits());
    }
  }, [status, dispatch]);

  const filteredAndSortedHabits = useMemo(() => {
    return habits
      .filter(
        (habit) =>
          habit.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filterBy === "all" || habit.frequency === filterBy)
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "startDate")
          return new Date(a.startDate) - new Date(b.startDate);
        return 0;
      });
  }, [habits, searchTerm, filterBy, sortBy]);

  const habitEvents = useMemo(() => {
    return filteredAndSortedHabits.map((habit) => ({
      id: habit.$id,
      title: habit.name,
      start: habit.startDate,
      end: habit.endDate || undefined,
      extendedProps: {
        description: habit.description,
        frequency: habit.frequency,
        streak: habit.streak,
        reminderTime: habit.reminderTime,
      },
      className: `habit-event-${habit.frequency}`,
    }));
  }, [filteredAndSortedHabits]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    toast(
      `Habit: ${clickInfo.event.title}\nStreak: ${clickInfo.event.extendedProps.streak}`,
      { position: "bottom-right", autoClose: 3000 }
    );
  };

  const renderEventContent = (eventInfo) => (
    <div className="habit-event p-1 rounded-md text-xs">
      <div className="font-semibold truncate">{eventInfo.event.title}</div>
    </div>
  );

  const handleViewChange = (view) => {
    setCalendarView(view.view.type);
  };

  const activeHabits = useMemo(() => {
    const now = new Date();
    return habits.filter(
      (habit) =>
        new Date(habit.startDate) <= now &&
        (!habit.endDate || new Date(habit.endDate) >= now)
    );
  }, [habits]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 text-center font-bold text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">Habit Tracker</h1>
          <p className="text-xl">Active Habits: {activeHabits.length}</p>
        </div>
      </header>
      <HabitCard habit={habitEvents} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={() => setShowModal(true)}>
                <FaPlus className="mr-2" /> Add Habit
              </button>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search habits..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                  <select
                    className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Sort by Name</option>
                    <option value="startDate">Sort by Start Date</option>
                  </select>
                  <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                  <select
                    className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="all">All Frequencies</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-3/4">
                <div className="bg-gray-50 rounded-lg shadow-md p-6">
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right:
                        "dayGridMonth,timeGridWeek,timeGridDay,dayGridYear",
                    }}
                    initialView={calendarView}
                    events={habitEvents}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    height="auto"
                    aspectRatio={1.8}
                    viewDidMount={handleViewChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/4">
                <div className="bg-gray-50 rounded-lg shadow-md p-6">
                  <EventList events={habitEvents} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <HabitForm
          onSubmit={() => setShowModal(false)}
          initialDate={selectedDate}
        />
      </Modal>
    </div>
  );
};

const EventList = ({ events }) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Habits</h2>
      <div className="max-h-[calc(70vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-3">
          {sortedEvents.map((event) => (
            <li
              key={event.id}
              className={`p-3 rounded-lg ${event.className} text-white shadow-md transition duration-300 ease-in-out hover:shadow-lg`}>
              <div className="font-semibold text-lg">{event.title}</div>
              <div className="text-sm opacity-80">
                {new Date(event.start).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out">
            <FaTimes size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default HabitTracker;

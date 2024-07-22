/* eslint-disable react/prop-types */
import {
  FaCalendarAlt,
  FaDollarSign,
  FaComments,
  FaTasks,
  FaShoppingCart,
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import {
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  FaCog,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaUserCircle,
} from "react-icons/fa";
import { refreshEvents } from "../../redux/slices/calendarSlice";
import { TbUrgent } from "react-icons/tb";
import { MdOutlineRemoveDone, MdPendingActions } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { useTheme } from "../../appContext/appContext";
import { fetchBudgets } from "../../redux/slices/budgetSlice/budgetSlice";

const DashboardCard = ({ icon, title, children }) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  const { themeMode } = useTheme();

  return (
    <animated.div
      style={props}
      className={`${
        themeMode === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-300"
      } border shadow-md rounded-lg p-2 flex-1`}>
      <div className="flex items-center mb-4">
        <div className="text-2xl text-blue-500 mr-4">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </animated.div>
  );
};

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (val) => {
    setSelected(val);
    onChange(val);
    setIsOpen(false);
  };

  const { themeMode } = useTheme();

  return (
    <div className="relative inline-block text-left w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`${
          themeMode === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-300 text-black"
        } border rounded-md px-4 py-2 flex items-center justify-between w-full gap-2 text-sm`}>
        <span>{selected}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div
          className={`${
            themeMode === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-black"
          } absolute mt-2 w-full border rounded-md shadow-lg z-20 text-sm p-1`}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-4 py-2 hover:bg-gray-300 duration-300 cursor-pointer rounded-md font-bold">
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = ({ totalBudget, events }) => {
  const [currentDateTime, setCurrentDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [dateRange, setDateRange] = useState("Last 30 Days");

  const options = [
    { value: "Last 7 Days", label: "Last 7 Days" },
    { value: "Last 30 Days", label: "Last 30 Days" },
    { value: "This Month", label: "This Month" },
    { value: "Last Month", label: "Last Month" },
  ];

  const { themeMode } = useTheme();
  const userData = useSelector((state) => state.auth.userData);
  const totalEvents = events.length;

  return (
    <header
      className={`${
        themeMode === "dark"
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-300 text-black"
      } rounded-lg border shadow-md p-2 flex flex-col md:flex-row items-start md:items-center justify-between mx-2`}>
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center">
        <p className="mb-2 mx-2 md:mb-0 flex flex-col items-start gap-1">
          <strong className="text-3xl mb-2 md:mb-0">
            Welcome back, {userData.name}!
          </strong>
          <p className="flex items-center gap-2">
            <span className="text-xs">Last updated 5 minutes ago;</span>
            <div className="text-xs flex gap-1 items-center justify-center">
              <FaComments /> 25 comments;
            </div>
            <span className="text-xs flex gap-1 items-center justify-center">
              <FaTasks /> {totalEvents} tasks;
            </span>
            <span className="text-xs flex gap-1 items-center justify-center">
              <FaShoppingCart /> 3 items;
            </span>
            <span className="text-xs flex gap-1 items-center justify-center">
              <FaDollarSign /> ${totalBudget.toFixed(2)};
            </span>
          </p>
        </p>
        <div className="flex-1 flex items-center justify-center ml-0 md:ml-6 mt-2 md:mt-0">
          <FaCalendarAlt className="text-xl mr-2" />
          <p className="flex gap-2">
            <span>{currentDateTime.date}</span>
            <span>{currentDateTime.time}</span>
          </p>
          <div className="ml-6">
            <CustomSelect
              options={options}
              value={dateRange}
              onChange={(val) => setDateRange(val)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        <div className="relative mr-6">
          <FaSearch className="text-xl cursor-pointer" />
        </div>
        <div className="relative mr-6">
          <FaCog className="text-xl cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

const ChatMessage = ({ message, isSender }) => {
  const { themeMode } = useTheme();

  return (
    <div
      className={`w-full flex items-start ${
        isSender ? "justify-end" : "justify-start"
      } mb-4`}>
      {!isSender && (
        <div className="flex-shrink-0 mr-3">
          <FaUserCircle className="text-xl" />
        </div>
      )}
      <div
        className={`${
          themeMode === "dark"
            ? "bg-gray-700 border-gray-600"
            : "bg-white border-gray-300"
        } border p-3 rounded-lg max-w-xs ${isSender ? "bg-blue-500" : ""}`}>
        <p>{message}</p>
      </div>
      {isSender && (
        <div className="flex-shrink-0 ml-3">
          <FaUserCircle className="text-xl" />
        </div>
      )}
    </div>
  );
};

const ChatSection = () => {
  const sampleChats = [
    { user: "John Doe", message: "Hello, how are you?", isSender: false },
    {
      user: "You",
      message: "I am good, thank you! How about you?",
      isSender: true,
    },
    {
      user: "John Doe",
      message: "I am doing great, thanks for asking!",
      isSender: false,
    },
    { user: "You", message: "What’s up?", isSender: true },
  ];

  return (
    <div className="flex-1 shadow-lg rounded-lg p-6">
      <div className=" overflow-y-auto mb-2">
        {sampleChats.map((chat, index) => (
          <ChatMessage
            key={index}
            message={chat.message}
            isSender={chat.isSender}
          />
        ))}
      </div>
    </div>
  );
};

const EventItem = ({ event }) => {
  const { themeMode } = useTheme();

  return (
    <li
      className={`mb-2 flex items-center justify-between border p-1 rounded capitalize ${
        themeMode === "dark"
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-black"
      }`}>
      <div>
        <span className="font-semibold mr-1">
          {moment(event.start).format("LT")}
        </span>
        - {event.title}
      </div>
      <div className="flex items-center">
        {
          <span className="text-red-500 mr-1 p-1">
            {event.isUrgent ? <TbUrgent /> : <MdPendingActions />}
          </span>
        }
        {
          <span className="text-green-500 p-1 mr-2">
            {event.isCompleted ? <MdOutlineRemoveDone /> : <IoMdDoneAll />}
          </span>
        }
      </div>
    </li>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const budgets = useSelector((state) => state.budget.items);
  const [todayEvents, setTodayEvents] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const { themeMode } = useTheme();

  useEffect(() => {
    dispatch(refreshEvents());
    dispatch(fetchBudgets());
  }, [dispatch]);

  useEffect(() => {
    const today = moment().startOf("day");
    const filteredEvents = events
      .filter((event) => moment(event.start).isSame(today, "day"))
      .sort((a, b) => moment(a.start).diff(moment(b.start)));
    setTodayEvents(filteredEvents);
  }, [events]);

  useEffect(() => {
    if (budgets.length > 0) {
      const latestBudget = budgets[budgets.length - 1];
      const categories = latestBudget.budgetCategories || [];

      const newBudgetData = categories.map((cat) => ({
        name: cat.name,
        amount: parseFloat(cat.amount) || 0,
      }));

      setBudgetData(newBudgetData);
      setTotalBudget(parseFloat(latestBudget.budgetAmount) || 0);
    }
  }, [budgets]);

  const habitData = [
    { name: "Exercise", value: 90 },
    { name: "Reading", value: 75 },
    { name: "Meditation", value: 60 },
    { name: "Coding", value: 85 },
  ];

  return (
    <div
      className={`${
        themeMode === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      } min-h-full`}>
      <Header totalBudget={totalBudget} events={events} />
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <DashboardCard icon={<FaCalendarAlt />} title="Today's Schedule">
            {todayEvents.length > 0 ? (
              <ul className="list-none pl-0">
                {todayEvents.map((event) => (
                  <EventItem key={event.$id} event={event} />
                ))}
              </ul>
            ) : (
              <p>No events scheduled for today.</p>
            )}
          </DashboardCard>
          <DashboardCard icon={<FaDollarSign />} title="Budget Overview">
            <BarChart
              width={500}
              height={300}
              data={budgetData}
              layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </DashboardCard>
          <DashboardCard icon={<FaComments />} title="Recent Chats">
            <ChatSection />
          </DashboardCard>
          <DashboardCard icon={<FaTasks />} title="Habit Tracking Progress">
            <LineChart width={400} height={300} data={habitData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </DashboardCard>
          <DashboardCard icon={<FaShoppingCart />} title="Shopping List">
            <ul>
              <li>Milk</li>
              <li>Bread</li>
              <li>Eggs</li>
              <li>Cheese</li>
              <li>Vegetables</li>
              <li>Fruits</li>
            </ul>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

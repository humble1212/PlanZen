// src/routes/routes.jsx
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Dashboard from "../components/pages/Dashboard";
import Calendar from "../components/features/calendar/Calender";
import Budget from "../components/features/budget/Budget";
import HabitTracker from "../components/features/habits/HabitTracker";
import Shopping from "../components/features/shopping/Shopping";
import Chat from "../components/features/chats/Chats";
import { useSelector } from "react-redux";
import ErrorPage from "../components/pages/ErrorPage";
import Settings from "../components/pages/Settings";
import Profile from "../components/pages/Profile";
import ProfileForm from "../components/pages/ProfileForm";
import PasswordResetComponent from "../components/pages/PasswordResetComponent ";
import Support from "../components/pages/Support";
import LocateUs from "../components/pages/LocateUs";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const RouteComponent = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "PasswordResetComponent", element: <PasswordResetComponent /> },
      { path: "register", element: <Register /> },
      { path: "Support", element: <Support /> },
      { path: "LocateUs", element: <LocateUs /> },
      { path: "About", element: <About /> },
      { path: "Contact", element: <Contact /> },
      { path: "*", element: <ErrorPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "Dashboard", element: <Dashboard /> },
          { path: "calendar", element: <Calendar /> },
          { path: "budget", element: <Budget /> },
          { path: "HabitTracker", element: <HabitTracker /> },
          { path: "shopping", element: <Shopping /> },
          { path: "chat", element: <Chat /> },
          { path: "Settings", element: <Settings /> },
          {
            path: "Profile",
            element: <Profile />,
            children: [{ path: "edit", element: <ProfileForm /> }],
          },
        ],
      },
    ],
  },
]);

export default RouteComponent;

// src/routes/routes.jsx
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Dashboard from "../components/pages/Dashboard";
import Calendar from "../components/features/calendar/Calender";
import Budget from "../components/features/budget/Budget";
import Habits from "../components/features/habits/Habit";
import Shopping from "../components/features/shopping/Shopping";
import Chat from "../components/features/chats/Chats";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/selectors/authSelector";
import ErrorPage from "../components/pages/ErrorPage";
import Settings from "../components/pages/Settings";
import Profile from "../components/pages/Profile";
import ProfileForm from "../components/pages/ProfileForm";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const RouteComponent = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <ErrorPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "Dashboard", element: <Dashboard /> },
          { path: "calendar", element: <Calendar /> },
          { path: "budget", element: <Budget /> },
          { path: "habits", element: <Habits /> },
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

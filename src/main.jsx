import React from "react";
import "./Index.css";
import ReactDOM from "react-dom/client";
import "react-calendar/dist/Calendar.css";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import ErrorElement from "./pages/errorPage/ErrorElement";
import Contact from "./pages/contactPage/Contact";
import Services from "./pages/contactPage/Services";
import About from "./pages/contactPage/About";
import LoginForm from "./Auth/LoginForm";
import SignupForm from "./Auth/SignupForm";
import Settings from "./SetingsPage/Settings";
import ResetPassword from "./Auth/ResetPassword";
import Profile from "./ProfilePage/Profile";
import Layout from "./Layout";

import Dashboard from "./pages/dashBoard/Dashboard";
import Schedules from "./pages/schedulePage/Schedules";
import Habit from "./pages/habitPage/Habit";
import BudgetPage from "./pages/budgetPage/BudgetPage";
import Shopping from "./pages/shoppingPage/Shopping";
import ChatPage from "./pages/Chatpage/ChatPage";
import { Provider } from "react-redux";

import store from "./redux/store";
import Protected from "./Auth/Protected";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="/"
        element={
          <Protected authentication>
            <HomePage />
          </Protected>
        }>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Schedules" element={<Schedules />} />
        <Route path="habit" element={<Habit />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="ChatPage" element={<ChatPage />} />
      </Route>

      <Route
        path="Contact"
        element={
          <Protected authentication={false}>
            <Contact />
          </Protected>
        }
      />
      <Route
        path="About"
        element={
          <Protected authentication={false}>
            <About />
          </Protected>
        }
      />
      <Route
        path="Services"
        element={
          <Protected authentication={false}>
            <Services />
          </Protected>
        }
      />
      <Route
        path="LoginForm"
        element={
          <Protected authentication={false}>
            <LoginForm />
          </Protected>
        }
      />
      <Route
        path="SignupForm"
        element={
          <Protected authentication={false}>
            <SignupForm />
          </Protected>
        }
      />
      <Route
        path="Profile"
        element={
          <Protected authentication={true}>
            <Profile />
          </Protected>
        }
      />
      <Route
        path="Settings"
        element={
          <Protected authentication={true}>
            <Settings />
          </Protected>
        }
      />
      <Route
        path="ResetPassword"
        element={
          <Protected authentication={false}>
            <ResetPassword />
          </Protected>
        }
      />
      <Route
        path="*"
        element={
          <Protected authentication={false}>
            <ErrorElement />
          </Protected>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

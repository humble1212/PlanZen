/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaCheckSquare,
  FaComments,
  FaShoppingCart,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { useTheme } from "../../appContext/appContext";
import { Link, NavLink } from "react-router-dom";

const FeatureCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={` p-6 rounded-lg shadow-md transition-all duration-300 ${
        isHovered ? "transform -translate-y-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="text-4xl text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const AnimatedText = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
      {children}
    </div>
  );
};

const AnimatedSVG = () => {
  const { themeMode } = useTheme();

  return (
    <svg className="w-full h-64" viewBox="0 0 400 200">
      <circle
        cx="50"
        cy="100"
        r="20"
        fill={themeMode === "dark" ? "#60A5FA" : "#3B82F6"}>
        <animate
          attributeName="cx"
          from="50"
          to="350"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <rect
        x="0"
        y="150"
        width="50"
        height="50"
        fill={themeMode === "dark" ? "#3B82F6" : "#2563EB"}>
        <animate
          attributeName="width"
          values="50;100;50"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
      <path
        d="M200,20 Q230,60 260,20 T320,20"
        stroke={themeMode === "dark" ? "#2563EB" : "#1D4ED8"}
        strokeWidth="4"
        fill="none">
        <animate
          attributeName="d"
          values="M200,20 Q230,60 260,20 T320,20;M200,20 Q230,0 260,20 T320,20;M200,20 Q230,60 260,20 T320,20"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

const Footer = () => {
  const { themeMode } = useTheme();

  return (
    <footer
      className={`${
        themeMode === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-800 text-white"
      } py-12`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">PlanZen</h3>
            <p className="text-gray-400">
              Your all-in-one productivity solution
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-blue-400 transition-colors duration-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Dashboard"
                  className={({ isActive }) =>
                    `hover:text-blue-400 transition-colors duration-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }>
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Support"
                  className={({ isActive }) =>
                    `hover:text-blue-400 transition-colors duration-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }>
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Contact"
                  className={({ isActive }) =>
                    `hover:text-blue-400 transition-colors duration-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/Privacy"
                  className={({ isActive }) =>
                    `hover:text-blue-400 transition-colors duration-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }>
                  Terms of Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Privacy"
                  className={({ isActive }) =>
                    `hover:text-blue-400 transition-colors duration-300 ${
                      isActive ? "text-blue-400" : ""
                    }`
                  }>
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link
                to="https://twitter.com/planzen"
                className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <FaTwitter />
              </Link>
              <Link
                to="https://facebook.com/planzen"
                className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <FaFacebookF />
              </Link>
              <Link
                to="https://linkedin.com/company/planzen"
                className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <FaLinkedinIn />
              </Link>
              <Link
                to="https://github.com/planzen"
                className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 PlanZen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const { themeMode } = useTheme();

  return (
    <div
      className={`min-h-full ${
        themeMode === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">PlanZen</h1>
          <p className="mt-2">Your all-in-one productivity solution</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <AnimatedSVG />

        <AnimatedText>
          <h2 className="text-3xl font-semibold text-center mb-12">
            Key Features
          </h2>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaCalendarAlt />}
            title="Schedules"
            description="Organize your day with our intuitive scheduling system."
          />
          <FeatureCard
            icon={<FaChartLine />}
            title="Budget Management"
            description="Take control of your finances with our budget preparation and management tools."
          />
          <FeatureCard
            icon={<FaCheckSquare />}
            title="Habit Tracking"
            description="Build and maintain positive habits with our tracking and management feature."
          />
          <FeatureCard
            icon={<FaComments />}
            title="Chat Feature"
            description="Collaborate and communicate with team members in real-time."
          />
          <FeatureCard
            icon={<FaShoppingCart />}
            title="Shopping Lists"
            description="Create and manage your shopping lists with ease."
          />
        </div>

        <div className="mt-16 text-center">
          <AnimatedText>
            <a
              href="#"
              className={`${
                themeMode === "dark"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300`}>
              Get Started
            </a>
          </AnimatedText>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

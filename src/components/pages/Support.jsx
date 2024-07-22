/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import {
  FaDonate,
  FaTasks,
  FaChartLine,
  FaClipboardList,
  FaComments,
  FaShoppingCart,
} from "react-icons/fa";

const SupportOption = ({ icon: Icon, title, description }) => (
  <motion.div
    className="w-full sm:w-1/2 lg:w-1/3 p-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <Icon className="text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </motion.div>
);

const IllustrativeSVG = () => (
  <svg
    className="w-full h-64 mb-8"
    viewBox="0 0 400 200"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="200" fill="#f0f9ff" />
    <circle cx="200" cy="100" r="80" fill="#60a5fa" />
    <path
      d="M160 140 Q 200 180 240 140"
      stroke="#2563eb"
      strokeWidth="8"
      fill="none"
    />
    <circle cx="170" cy="80" r="15" fill="#1e40af" />
    <circle cx="230" cy="80" r="15" fill="#1e40af" />
  </svg>
);

const SupportUs = () => {
  const supportOptions = [
    {
      icon: FaTasks,
      title: "Features",
      description:
        "Help us add more features like habit tracking and budget management.",
      color: "text-blue-500",
    },
    {
      icon: FaChartLine,
      title: "Performance",
      description:
        "Support our efforts to optimize performance and user experience.",
      color: "text-green-500",
    },
    {
      icon: FaClipboardList,
      title: "Development",
      description: "Contribute to ongoing development and maintenance.",
      color: "text-red-500",
    },
    {
      icon: FaComments,
      title: "Community",
      description:
        "Join our community and provide feedback to shape the future of PlanZen.",
      color: "text-purple-500",
    },
    {
      icon: FaShoppingCart,
      title: "Merchandise",
      description: "Buy our merchandise to show your support.",
      color: "text-yellow-500",
    },
    {
      icon: FaDonate,
      title: "Donate",
      description: "Make a donation to help us keep PlanZen running.",
      color: "text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <motion.h1
          className="text-5xl font-bold text-center text-blue-600 mb-6"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}>
          Support PlanZen
        </motion.h1>

        <IllustrativeSVG />

        <motion.p
          className="text-xl text-gray-700 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}>
          Your support helps us continue to build and improve PlanZen, making it
          the best planning tool for everyone. Here are some ways you can
          support us:
        </motion.p>

        <div className="flex flex-wrap justify-center">
          {supportOptions.map((option, index) => (
            <SupportOption
              key={index}
              icon={(props) => (
                <option.icon
                  {...props}
                  className={`${props.className} ${option.color}`}
                />
              )}
              title={option.title}
              description={option.description}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SupportUs;

import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../../appContext/appContext";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-inherit border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-inherit border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-2 font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-3 py-2 bg-inherit border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Send Message
      </button>
    </form>
  );
};

const ContactInfo = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Contact Information</h3>
    <p className="flex items-center">
      <FaPhone className="mr-2" /> +1 (123) 456-7890
    </p>
    <p className="flex items-center">
      <FaEnvelope className="mr-2" /> contact@planzen.com
    </p>
    <p className="flex items-center">
      <FaMapMarkerAlt className="mr-2" /> 123 Productivity St, Organization
      City, PL 12345
    </p>
  </div>
);

const MapPlaceholder = () => (
  <div className="w-full h-64 border border-gray-300 flex items-center justify-center">
    <p className="text-gray-600">Map Placeholder</p>
  </div>
);

const Contact = () => {
  const { themeMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        themeMode === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2">Get in touch with the PlanZen team</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ContactForm />
            <ContactInfo />
          </div>
          <div className="space-y-8">
            <MapPlaceholder />
            <div
              className={`p-6 rounded-lg ${
                themeMode === "dark" ? "bg-gray-800" : "bg-white shadow-md"
              }`}>
              <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;

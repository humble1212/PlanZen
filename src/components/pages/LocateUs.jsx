/* eslint-disable react/prop-types */

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
const LocationInfo = ({ icon, title, content }) => (
  <div className="flex items-start space-x-3">
    <div className="text-blue-500 mt-1">{icon}</div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p>{content}</p>
    </div>
  </div>
);

const MapPlaceholder = () => (
  <div className="w-full h-96 border bg-inherit flex items-center justify-center rounded-lg">
    <p className="text-gray-600">Interactive Map Placeholder</p>
  </div>
);

const LocateUs = () => {
  return (
    <div className={`min-h-full p-2`}>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Locate Us</h1>
          <p className="mt-2">Find PlanZen offices and get directions</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Locations</h2>
            <div className={`p-6 rounded-lg space-y-4 border`}>
              <LocationInfo
                icon={<FaMapMarkerAlt />}
                title="Main Office"
                content="123 Productivity St, Organization City, PL 12345"
              />
              <LocationInfo
                icon={<FaPhone />}
                title="Phone"
                content="+1 (123) 456-7890"
              />
              <LocationInfo
                icon={<FaEnvelope />}
                title="Email"
                content="contact@planzen.com"
              />
              <LocationInfo
                icon={<FaClock />}
                title="Office Hours"
                content="Monday - Friday: 9:00 AM - 5:00 PM"
              />
            </div>
            <div className={`p-6 rounded-lg border`}>
              <h3 className="text-xl font-semibold mb-4">Getting Here</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>By Car: Parking available on Efficiency Avenue</li>
                <li>By Bus: Routes 42 and 57, stop at Productivity Street</li>
                <li>By Train: Central Station, 10-minute walk</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Map</h2>
            <MapPlaceholder />
            <p className="text-sm text-gray-600">
              Click on the map to get directions to our office from your
              location.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocateUs;

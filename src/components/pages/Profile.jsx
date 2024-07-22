/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaUpload, FaUser, FaEnvelope, FaVenusMars } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {
  fetchCurrentUser,
  updateUserProfile,
  uploadProfileImage,
} from "../../redux/slices/authSlice";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";
import ProfileForm from "./ProfileForm";
import { useTheme } from "../../appContext/appContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { themeMode } = useTheme();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      await dispatch(updateUserProfile(updatedData)).unwrap();
      setIsEditing(false);
      // Fetch the updated user data after successful update
      toast.success("update successfully");
      dispatch(fetchCurrentUser());
    } catch (error) {
      toast.success("Failed to update profile:", error);
    }
  };

  const handleEditProfile = () => setIsEditing(!isEditing);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await dispatch(uploadProfileImage(file)).unwrap();
        toast.success("image uploaded successfully");
        // Force a re-fetch of user data
        await dispatch(fetchCurrentUser()).unwrap();
      } catch (error) {
        toast.error("Failed to upload profile image:", error);
      }
    }
  };

  if (!userData)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div
      className={` min-h-full z-10 + ${
        themeMode === "light" ? "bg-gray-100" : "bg-inherit"
      }`}>
      <header className="bg-gradient-to-r from-blue-500 to-purple-600  py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">
            {`${userData.prefs.name || userData.name}'s`} Profile
          </h1>
          <p className="mt-2 text-xl">Manage your account and preferences</p>
        </div>
      </header>

      <main
        className={`container mx-auto my-8 p-6  md:gap-4 rounded-lg flex items-center + ${
          themeMode === "light" ? "bg-inherit" : "bg-inherit"
        }`}>
        <div className="flex flex-col md:flex-row gap-8 md:w-3/5">
          {/* Left sidebar */}
          <aside className="md:w-1/3">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={
                    userData.prefs.profileImage ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Avatar"
                  className={`w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setImageLoading(false)}
                />
                {imageLoading && <div>Loading...</div>}
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
                  <FaUpload />
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/jpeg, image/gif, image/png, image/jpg"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isLoading}
                  />
                </label>
              </div>
              <h2 className="text-2xl font-semibold mt-4">
                {userData.prefs.name || userData.name}
              </h2>
              <p className="text-gray-600 flex items-center justify-center mt-2">
                <FaLocationDot className="mr-2" /> {userData.location}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleEditProfile}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center">
                <BiEditAlt className="mr-2" /> Edit Profile
              </button>
              <NavLink
                to="/PasswordResetComponent"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition flex items-center justify-center">
                Change Password
              </NavLink>
              <button
                className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                onClick={() => {
                  /* handleDeleteAccount */
                }}>
                <MdDelete className="mr-2" /> Delete Account
              </button>
            </div>
          </aside>

          {/* Main content area */}
          <div className="md:w-2/3">
            {isEditing ? (
              <ProfileForm
                onSubmit={handleUpdateProfile}
                initialData={userData}
              />
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold border-b pb-2">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    icon={<FaUser />}
                    label="Name"
                    value={userData.prefs.name}
                  />
                  <InfoItem
                    icon={<FaEnvelope />}
                    label="Email"
                    value={userData.prefs.email}
                  />
                  <InfoItem
                    icon={<FaLocationPin />}
                    label="Location"
                    value={userData.prefs.location} // Note: accessing from prefs
                  />
                  <InfoItem
                    icon={<FaVenusMars />}
                    label="Gender"
                    value={userData.prefs.gender} // Note: accessing from prefs
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Bio</h4>
                  <p className="text-gray-700">
                    {userData.prefs.bio || "No bio available."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center md:ml-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </main>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-blue-500 mr-3">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default Profile;

// src/components/pages/Profile.jsx

import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/selectors/authSelector"; // Assuming you have a userActions file with a fetchUser action creator
import { FaLocationPin, FaUpload } from "react-icons/fa6";
import { deleteUser } from "../../redux/actions/authActions";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateForm, setUpdateForm] = useState(false);

  const handleDeleteAccount = (user) => {
    dispatch(deleteUser(user));
    alert("Account deleted successfully");
    navigate("/Login");
  };

  const handleEditProfile = () => {
    navigate(`/Profile/edit`);
    setUpdateForm(!updateForm);
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center z-50">
      <header className="h-1/4 w-full bg-gradient-to-b from-white to-blue-500 flex items-center justify-center text-3xl">
        <strong>Welcome, {user.name}</strong>
      </header>
      <div className=" w-full flex-1 flex relative ">
        <div className="absolute left-28 -top-24 z-10">
          <img
            src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
            alt="Avatar"
            className="w-48 h-48 object-cover rounded-full mb-2"
          />
        </div>
        <div className="w-1/4 h-full flex flex-col items-center justify-between border-r">
          <div className="w-full mt-28 p-2 flex flex-col items-center justify-center">
            <span className="text-2xl">{user.name}</span>
            <span className="w-full text-gray-400 text-sm flex items-center justify-center gap-2 mt-4">
              <FaLocationPin /> {user.location}
            </span>
          </div>
          <div className="w-full flex-1 p-2 flex-col border-slate-400 flex items-center justify-start">
            <div className="w-full h-auto flex flex-col gap-1 items-center justify-center p-2">
              <button
                type="button"
                className="w-3/4 h-12 p-2 gap-2 flex items-center justify-center bg-blue-600 text-white rounded-full"
                onClick={handleEditProfile}>
                <BiEditAlt /> Edit Profile
              </button>
              {/* change password  */}
              <NavLink
                to={"/ChangePassword"}
                className="w-3/4 h-12 p-2 gap-2 flex items-center justify-center border font-bold rounded-full">
                Change Password
              </NavLink>
            </div>
            <div className="w-full h-3/4 flex flex-col gap-1 items-center justify-between border-slate-300 border rounded-lg p-2">
              <div className="w-full h-auto flex flex-col gap-1 items-center justify-center p-2">
                <span className="text-xl">Premium Features</span>
                <span className="text-gray-400 text-sm">
                  Get access to exclusive features and benefits
                </span>
              </div>
              <NavLink
                to={"/Premium"}
                className="w-3/4 h-12 p-2 gap-2 flex items-center justify-center border font-bold rounded-full">
                Go Premium
              </NavLink>
              <span className="text-gray-400 text-sm">
                Purchase a subscription or plan for a 30-day trial
              </span>
            </div>
            <div className="w-full h-auto p-2 flex-1 flex-col border-slate-400 flex items-center justify-between ">
              <button
                className="w-3/4 h-12 p-2 gap-2 flex items-center justify-center bg-orange-600 text-white rounded-full"
                onClick={() => {
                  handleDeleteAccount();
                }}>
                <MdDelete className="text-xl" /> Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex h-full">
          <div className="flex-1 h-full flex flex-wrap">
            <div className="flex-1 p-4 text-sm text-gray-400 flex flex-col items-start justify-start gap-4 border-r">
              <div>
                <strong>Contact:</strong> {user.contact}
              </div>
              <div>
                <strong>Location:</strong> {user.location}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Gender:</strong> {user.gender}
              </div>
              {/* upload an image */}
              <div className=" flex gap-2 items-start justify-center  rounded-full my-2 bg-blue-200 text-black hover:opacity-50 active:translate-y-0.5 duration-300">
                <label
                  htmlFor="profileImage"
                  className="w-full h-11 p-2 gap-2 flex items-center justify-center ">
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                  />
                  <FaUpload /> Upload Image
                </label>
              </div>
            </div>
            <div className="flex-1 p-4 text-sm text-gray-400 flex flex-col items-start justify-start gap-4">
              <strong>Bio:</strong>
              <p>
                {user.bio}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
                ligula ac nisi faucibus ultricies. Donec condimentum enim vel
                neque facilisis, et pulvinar mauris consectetur. Aliquam erat
                volutpat. Donec tempus urna et nisl consectetur, vel consectetur
                arcu sagittis. Sed vel ligula ac nisi faucibus ultricies. Donec
                condimentum enim vel neque facilisis, et pulvinar mauris
                consectetur. Aliquam erat volutpat. Donec tempus urna et nisl
                consectetur, vel consectetur arcu sagittis. Sed vel ligula ac
                nisi faucibus ultricies. Donec condimentum enim vel neque
                facilisis, et pulvinar mauris consectetur. Aliquam erat
                volutpat. Donec tempus urna et nisl consectetur, vel consectetur
                arcu sagittis. Sed vel ligula ac nisi faucibus ultricies. Donec
                con
              </p>
            </div>
          </div>

          {updateForm ? (
            <div className="flex-1 flex items-center justify-center">
              <Outlet />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Profile;

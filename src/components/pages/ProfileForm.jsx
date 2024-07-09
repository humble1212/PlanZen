import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../redux/actions/userAction";

export default function ProfileForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      updateProfile(data.name, data.email, data.bio, data.location, data.gender)
    );
    navigate("/Profile");
  };

  return (
    <>
      <form
        className="w-3/4 flex flex-col items-start justify-center gap-2 px-4"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col items-start gap-1 capitalize text-sm">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: 3,
              maxLength: 50,
            })}
            className={`w-full h-11 indent-2 text-black border focus:outline-none rounded + ${
              errors.name && "border-red-500"
            }`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        {/* check for genders */}
        <div className="w-full flex flex-col items-start gap-1 rounded-md capitalize text-sm">
          <label htmlFor="gender">Gender:</label>
          <select
            {...register("gender", {
              required: {
                value: true,
                message: "please select a gender",
              },
            })}
            className={`w-full h-10 indent-2 text-black focus:outline-none border rounded-md + ${
              errors.gender && "border-red-500"
            }`}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col items-start gap-1 capitalize text-sm ">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: {
                value: true,
                message: "please check email address",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            className={`w-full h-10 indent-2 text-black focus:outline-none border rounded-md + ${
              errors.email && "border-red-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col items-start gap-1 capitalize text-sm">
          <label htmlFor="contact">Contact:</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            {...register("contact", {
              required: {
                value: true,
                message: "Please enter a valid contact number",
              },
              pattern: {
                value: /^\+?[0-9]{1,3}?[-. ]?[0-9]{1,14}$/,
                message: "Invalid number",
              },
            })}
            className={`w-full h-10 indent-2 text-black focus:outline-none  border rounded-md + ${
              errors.contact && "border-red-500"
            }`}
          />
          {errors.contact && (
            <p className="text-red-500">{errors.contact.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col items-start gap-1 capitalize text-sm">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            {...register("location", {
              required: {
                value: true,
                message: "Please enter a valid location",
              },
              minLength: 3,
              maxLength: 50,
            })}
            className={`w-full h-10 indent-2 text-black focus:outline-none border rounded-md + ${
              errors.location && "border-red-500"
            }`}
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col items-start gap-1 capitalize text-sm">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            {...register("bio", {
              required: {
                value: true,
                message: "Please enter your bio",
              },
              minLength: 10,
              maxLength: 250,
            })}
            className={`w-full h-20 indent-2 text-black focus:outline-none border rounded-md + ${
              errors.bio && "border-red-500"
            }`}
          />
          {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
        </div>
        <div className="w-full flex items-center justify-center gap-2 my-1">
          <button
            type="submit"
            className="w-1/2 h-10 bg-blue-500 text-white rounded-md">
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
}

import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../store/userSlice.js";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { user, loading, error } = useSelector((state) => state.user);
  const [signupError, setSignupError] = useState(null);

  const onSubmit = (data) => {
    setSignupError(null);
    try {
      if (data.password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email");
        return;
      }

      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);

      // avatar is an array (FileList)
      if (data.avatar?.[0]) {
        const file = data.avatar[0];
        if (file.size > 2 * 1024 * 1024) {
          alert("Avatar must be less than 2MB");
          return;
        }
        formData.append("avatar", file);
      }

      dispatch(registerUser(formData));
    } catch (error) {
      setSignupError(error || "Please enter all details");
    }
  };

  useEffect(() => {
    if (user) {
      reset();
      navigate("/home");
    }
  }, [navigate, user]);

  return (
    <div className="flex flex-col justify-center items-center w-100">
      <h1 className="text-2xl m-4">Signup</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 items-center">
        <Input
          label="FullName:"
          className="h-10 text-lg ml-4 bg-gray-100 w-70 rounded-lg shadow-md"
          {...register("fullName", { required: true })}
        />
        <Input
          label="Email:"
          type="email"
          className="h-10 text-lg ml-11 bg-gray-100 w-70 rounded-lg shadow-md"
          {...register("email", { required: true })}
        />
        <Input
          label="Username:"
          className="h-10 text-lg ml-2 bg-gray-100 w-70 rounded-lg shadow-md"
          {...register("username", { required: true })}
        />
        <Input
          label="Avatar:"
          type="file"
          accept="image/*"
          {...register("avatar")}
        />
        <Input
          label="Password:"
          type="password"
          className="h-10 text-lg ml-2 bg-gray-100 w-70 rounded-lg shadow-md"
          {...register("password", { required: true })}
        />
        {signupError && <p className="error">Please fill in all details</p>}
        <Button
          type="submit"
          disabled={loading}
          className="h-8 px-4 mx-auto flex items-center justify-center bg-blue-50 border-[0.1rem]">
          {loading ? "Registering user..." : "Register"}
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../store/userSlice.js";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, loading, error } = useSelector((state) => state.user);
  const [loginError, setLoginError] = useState(null);

  const onSubmit = (data) => {
    setLoginError(null);
    try {
      dispatch(loginUser(data));
    } catch (error) {
      setLoginError(error || "Please enter valid credentials");
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      navigate("/home"); // or wherever
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-100">
      <h1 className="text-2xl m-4">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 items-center">
        <Input
          label="Email:"
          className="h-10 text-lg ml-11 bg-gray-100 w-70 rounded-lg shadow-md"
          type="email"
          {...register("email")}
        />

        <Input
          label="Username:"
          {...register("username")}
          className="h-10 text-lg ml-2 bg-gray-100 w-70 rounded-lg shadow-md"
        />

        <Input
          label="Password:"
          type="password"
          {...register("password", { required: true })}
          className="h-10 text-lg ml-3 bg-gray-100 w-70 rounded-lg shadow-md"
        />

        {(errors.email || errors.password) && (
          <p>Please enter a valid username or password</p>
        )}

        <Button
          className="h-8 px-4 mx-auto flex items-center justify-center bg-blue-50 border-[0.1rem]"
          type="submit"
          disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

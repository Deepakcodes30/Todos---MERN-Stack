import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../store/userSlice.js";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { user, loading, error } = useSelector((state) => state.user);

  const onSubmit = (data) => {
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
  };

  useEffect(() => {
    if (user) {
      reset();
      navigate("/home");
    }
  }, [navigate, user]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="FullName" {...register("fullName", { required: true })} />
        <Input
          label="Email"
          type="email"
          {...register("email", { required: true })}
        />
        <Input label="Username" {...register("username", { required: true })} />
        <Input
          label="Avatar"
          type="file"
          accept="image/*"
          {...register("avatar")}
        />
        <Input
          label="Password"
          type="password"
          {...register("password", { required: true })}
        />
        {error && <p className="error">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Registering user..." : "Register"}
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
}

export default Signup;

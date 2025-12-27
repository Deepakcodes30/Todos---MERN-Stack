import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../store/userSlice.js";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { user, loading, error } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      navigate("/home"); // or wherever
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" type="email" {...register("email")} />

      <Input label="Username" {...register("username")} />

      <Input
        label="Password"
        type="password"
        {...register("password", { required: true })}
      />

      {error && <p className="error">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default Login;

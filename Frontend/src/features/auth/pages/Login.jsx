import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

import { useNavigate, Link } from "react-router";

const Login = () => {
  const { user, loading, handleLogin } = useAuth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(email, password);

    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Enter Email"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to={"/Register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;

// Next Time use React Hook Form
// react-hook-form

import React, { useState } from "react";
import "../styles/form.scss";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("User Login Successfully", res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setEmail("");
    setPassword("");
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Enter Email"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a className="" href="/register">
            Register
          </a>
        </p>
      </div>
    </main>
  );
};

export default Login;

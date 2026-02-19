import React from "react";
import "../styles/form.scss";

const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <input type="text" name="email" placeholder="Enter Email" />
          <input type="password" name="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;

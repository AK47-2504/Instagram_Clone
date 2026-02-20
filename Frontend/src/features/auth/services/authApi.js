import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function Register(username, email, password) {
  try {
    const response = await api.post(
      "/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log("User Registered Successfully", response.data);
  } catch (error) {
    console.log("Error registering user:", error);
  }
}

export async function Login(email, password) {
  try {
    const response = await api.post(
      "/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log("User Login Successfully", response.data);
  } catch (error) {
    console.log("Error logging in user:", error);
  }
}

export async function getCurrentUser() {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    console.log("Error fetching current user:", error);
  }
}


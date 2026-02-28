import AppRoutes from "./AppRoutes";
import "../src/features/shared/style.scss";
import { AuthProvider } from "./features/auth/authProvider";
import { PostContextProvider } from "./features/post/postProvider";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />{" "}
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;

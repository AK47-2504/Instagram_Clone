import AppRoutes from "./AppRoutes";
import "../src/features/shared/style.scss";
import { AuthProvider } from "./features/auth/authProvider";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />{" "}
    </AuthProvider>
  );
};

export default App;

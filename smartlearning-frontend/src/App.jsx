import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader";

function App() {
  const { loading } = useAuth();

  return (
    <>
      {loading && <Loader />} {/* ✅ show loader */}
      <AppRoutes />
    </>
  );
}

export default App;
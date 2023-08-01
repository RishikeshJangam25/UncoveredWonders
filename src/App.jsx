import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Explore from "./Pages/explore/Explore";
import Profile from "./Components/Profile/Profile";
import { useAuth } from "./context/AuthContext";

function App() {

  const ProtectedRoute = ({ element }) => {
    const { isLoggedIn } = useAuth();
    console.log('protectedroute ', isLoggedIn);
    return isLoggedIn != null ? element : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/explore" element={<Explore />} /> */}
      {/* <Route path="/create" component={Create} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route
        path="/explore"
        element={
          <ProtectedRoute element = {<Explore /> }
          />
        }
      />
    </Routes>
  );
}

export default App;

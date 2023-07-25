import "./App.css";

import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Explore from "./Pages/explore/Explore";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/user/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;

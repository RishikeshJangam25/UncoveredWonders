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
      {/* <Route path="/create" component={Create} /> */}
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/more" component={More} /> */}
    </Routes>
  );
}

export default App;

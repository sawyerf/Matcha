import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UserHome from "./pages/UserHome";
import MyProfile from "./pages/MyProfile";
import OtherProfile from "./pages/OtherProfile";
import { useState } from "react";

function App() {
  const [myProfileData, setMyProfileData] = useState(null);
  const [otherProfileData, setOtherProfileData] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/otherprofile"
          element={
            <OtherProfile
              myProfileData={myProfileData}
              otherProfileData={otherProfileData}
              setOtherProfileData={setOtherProfileData}
            />
          }
        />
        <Route
          path="/userhome"
          element={
            <UserHome
              myProfileData={myProfileData}
              otherProfileData={otherProfileData}
              setOtherProfileData={setOtherProfileData}
            />
          }
        />
        <Route
          path="/myprofile"
          element={
            <MyProfile
              myProfileData={myProfileData}
              setMyProfileData={setMyProfileData}
              otherProfileData={otherProfileData}
              setOtherProfileData={setOtherProfileData}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

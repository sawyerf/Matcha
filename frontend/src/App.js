import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UserHome from "./pages/UserHome";
import MyProfile from "./pages/MyProfile";
import OtherProfile from "./pages/OtherProfile";
import Message from "./pages/Message";
import { useState, useEffect } from "react";
import axios from "axios";
import UserMenu from "./components/UserMenu";
import socketIOClient from "socket.io-client";

function App() {
  const [myProfileData, setMyProfileData] = useState(null);
  const [otherProfileData, setOtherProfileData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayMenu, setDisplayMenu] = useState(false);
  const socket = socketIOClient("http://localhost:3000");

  useEffect(async () => {
    if (localStorage.getItem("token")) {
      const res = await axios.get("/profil/me");
      if ("error" in res.data) {
        console.log("Error: ", res.data.message);
      }
      res.data && setMyProfileData(res.data);
      socket.on("connect", () => {
        console.log("connect");
        socket.emit("token", localStorage.getItem("token"));
      });
      setDisplayMenu(true);
    }
  }, [localStorage.getItem("token")]);

  useEffect(async () => {
    if (errorMsg !== null) {
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  }, [errorMsg]);

  return (
    <div style={{ display: "flex" }}>
      <BrowserRouter>
        <UserMenu
          myProfileData={myProfileData}
          otherProfileData={otherProfileData}
          setOtherProfileData={setOtherProfileData}
          socket={socket}
          displayMenu={displayMenu}
          setDisplayMenu={setDisplayMenu}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/otherprofile"
            element={
              <OtherProfile
                otherProfileData={otherProfileData}
                setErrorMsg={setErrorMsg}
              />
            }
          />
          <Route
            path="/userhome"
            element={
              <UserHome
                setOtherProfileData={setOtherProfileData}
                setErrorMsg={setErrorMsg}
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
                setErrorMsg={setErrorMsg}
              />
            }
          />
          <Route
            path="/message"
            element={
              <Message
                otherProfileData={otherProfileData}
                setErrorMsg={setErrorMsg}
                socket={socket}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {errorMsg ? (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "40px",
              width: "200px",
              height: "50px",
              borderRadius: "8px",
              backgroundColor: "red",
              boxShadow: "5px 5px 5px darkred",
            }}
          >
            <p
              style={{
                color: "white",
                fontWeight: "600",
                margin: "5px",
                fontSize: "14px",
              }}
            >
              {errorMsg}
            </p>
          </div>
        ) : (
          ""
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

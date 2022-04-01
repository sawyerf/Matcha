import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgottenPassword from "./pages/ForgottenPassword";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UserHome from "./pages/UserHome";
import MyProfile from "./pages/MyProfile";
import OtherProfile from "./pages/OtherProfile";
import Message from "./pages/Message";
import { useState, useEffect } from "react";
import axios from "axios";
import UserMenu from "./components/UserMenu";
import { SocketContext, socket } from "./context/socket";

function App() {
  const [myProfileData, setMyProfileData] = useState(null);
  const [otherProfileData, setOtherProfileData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [refreshMatchList, setRefreshMatchList] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  useEffect(async () => {
    console.log(localStorage.getItem("token"));

    if (localStorage.getItem("token")) {
      setDisplayMenu(true);
      console.log(localStorage.getItem("token"));
      const res = await axios.get("/profil/me").catch(function (error) {
        console.log(error);
        setDisplayMenu(false);
      });
      res.data && setMyProfileData(res.data);
      console.log("connect");
      socket.emit("token", localStorage.getItem("token"));
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
        <SocketContext.Provider value={socket}>
          <UserMenu
            myProfileData={myProfileData}
            otherProfileData={otherProfileData}
            setOtherProfileData={setOtherProfileData}
            socket={socket}
            displayMenu={displayMenu}
            setDisplayMenu={setDisplayMenu}
            setNotifMessage={setNotifMessage}
            refreshMatchList={refreshMatchList}
            setErrorMsg={setErrorMsg}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login setErrorMsg={setErrorMsg} />}
            />
            <Route
              path="/register"
              element={<Register setErrorMsg={setErrorMsg} />}
            />
            <Route
              path="/forgottenpassword"
              element={<ForgottenPassword setErrorMsg={setErrorMsg} />}
            />
            <Route
              path="/otherprofile"
              element={
                <OtherProfile
                  otherProfileData={otherProfileData}
                  setErrorMsg={setErrorMsg}
                  setRefreshMatchList={setRefreshMatchList}
                  refreshMatchList={refreshMatchList}
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
                  myProfileData={myProfileData}
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
          ) : notifMessage ? (
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "40px",
                width: "200px",
                height: "50px",
                borderRadius: "8px",
                backgroundColor: "green",
                boxShadow: "5px 5px 5px darkgreen",
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
                {notifMessage}
              </p>
            </div>
          ) : (
            ""
          )}
        </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Disconnection from "@mui/icons-material/NoMeetingRoom";
import Match from "@mui/icons-material/Favorite";
import Notif from "@mui/icons-material/Notifications";
import UserMenuMatch from "./UserMenuMatch";
import UserMenuMessage from "./UserMenuMessage";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    position: "relative",
    backgroundColor: "white",
    width: "100vw",
    height: "250px",
  },
  topMenu: {
    height: "50px",
    background: "linear-gradient(135deg, #EB58A2, orange)",
    width: "100%",
    position: "relative",
  },
  topMenuText: {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "600",
    padding: "5px",
    border: "solid 1px black",
    borderRadius: "8px",
    cursor: "pointer",
    "&:hover, &:focus": {
      color: "white",
      borderColor: "white",
    },
  },
  matchCard: {
    width: "100px",
    height: "150px",
    backgroundColor: "red",
    marginBottom: "10px",
    position: "relative",
    cursor: "pointer",
  },
});

const UserMenu = ({
  myProfileData,
  otherProfileData,
  setOtherProfileData,
  socket,
  displayMenu,
  setDisplayMenu,
  setNotifMessage,
  refreshMatchList,
  setErrorMsg,
  setMessageToPush,
  messageToPush,
  setNotifToPush,
  notifToPush,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [matchDisplay, setMatchDisplay] = useState(true);
  const [notifDisplay, setNotifDisplay] = useState(false);

  function navigateToMyProfile() {
    navigate("/myprofile");
  }

  function navigateToUserHome() {
    if (myProfileData && myProfileData.images && myProfileData.images[0])
      navigate("/userhome");
    else setErrorMsg("Remplissez votre profil entièrement");
  }

  function logOut() {
    socket.disconnect();
    localStorage.setItem("token", "");
    navigate("/");
    setDisplayMenu(false);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setDisplayMenu(true);
      navigate("/myprofile");
    }
  }, [localStorage.getItem("token")]);

  const displayNotif = (notif) => {
    setNotifMessage(notif);
  };

  const sendLocation = (position) => {
    const res = axios
      .post("/profil/setlocation", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
      });
  };

  const sendZero = () => {
    const res = axios
      .post("/profil/setlocation", {
        latitude: 0,
        longitude: 0,
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
      });
  };

  useEffect(() => {
    socket.on("notif", (notif) => writeNotif(notif));
    socket.on("message", (msg) => writeMessage(msg));
    if (navigator.geolocation && localStorage.getItem("token")) {
      navigator.geolocation.getCurrentPosition(sendLocation, sendZero);
    }
  }, [socket]);

  useEffect(() => {
    if (messageToPush && myProfileData.username !== messageToPush.from) {
      let msgToPush = {
        content: {
          from: messageToPush.from,
          msg: `${messageToPush.from} texted : "${messageToPush.msg}"`,
        },
      };
      myProfileData &&
        myProfileData.notifs &&
        myProfileData.notifs.push(msgToPush);
    }
  }, [messageToPush]);

  useEffect(() => {
    if (notifToPush) {
      let msgToPush = {
        content: {
          from: notifToPush.from ? `${notifToPush.from}` : "",
          msg: `${notifToPush.msg}`,
        },
      };
      myProfileData &&
        myProfileData.notifs &&
        myProfileData.notifs.push(msgToPush);
    }
  }, [notifToPush]);

  const writeNotif = (notif) => {
    setNotifToPush(notif);
    displayNotif(notif.msg);
  };

  const writeMessage = (msg) => {
    setNotifMessage("Message de " + msg.from);
    setMessageToPush(msg);
  };

  const readNotif = () => {
    if (!notifDisplay) {
      const res = axios.get("/profil/readnotif", {}).catch((err) => {
        setErrorMsg(err.response.data.message);
      });
    } else if (notifDisplay) myProfileData.notifs = [];
    setNotifDisplay(!notifDisplay);
  };

  return (
    <div
      className={classes.root}
      style={{ display: displayMenu ? "" : "none" }}
    >
      <div className={classes.topMenu}>
        <Disconnection
          style={{
            position: "absolute",
            color: "#EEEEEE",
            borderRadius: "16px",
            background: "rgba(50, 50, 50, 0.2)",
            padding: "3px",
            right: "10px",
            top: "9px",
            cursor: "pointer",
          }}
          onClick={logOut}
        />
        <Notif
          style={{
            position: "absolute",
            borderRadius: "16px",
            background: "rgba(50, 50, 50, 0.2)",
            padding: "3px",
            right: "90px",
            top: "9px",
            cursor: "pointer",
            color:
              myProfileData && myProfileData.notifs.length > 0
                ? "red"
                : "#EEEEEE",
          }}
          onClick={() => readNotif()}
        />
        <div
          style={{
            border: "solid 1px lightgrey",
            width: "200px",
            height: "300px",
            backgroundColor: "white",
            position: "absolute",
            right: "0px",
            top: "50px",
            zIndex: "10",
            display: notifDisplay ? "" : "none",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              margin: "5px",
              marginBottom: "10px",
              paddingBottom: "5px",
              borderBottom: "solid 1px black",
              display: "flex",
            }}
          >
            <Notif
              style={{
                color: "#000000",
                borderRadius: "16px",
              }}
            />
            <p
              style={{
                fontWeight: "600",
                marginTop: "3px",
              }}
            >
              Notification Récentes
            </p>
          </div>
          {/* BOUCLE POUR AFFICHER LES NOTIFS */}
          {myProfileData &&
            myProfileData.notifs &&
            myProfileData.notifs.map((data, key) => {
              return (
                <p
                  key={key}
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    margin: "5px",
                    paddingBottom: "5px",
                    borderBottom: "solid 1px lightgray",
                  }}
                >
                  {data.type === "message"
                    ? `${data.content.from} texted : "${data.content.msg}"`
                    : data.content.msg}
                </p>
              );
            })}

          {/* FIN BOUCLE POUR AFFICHER LES NOTIFS */}
        </div>
        <Match
          style={{
            position: "absolute",
            color: "#EEEEEE",
            borderRadius: "16px",
            background: "rgba(50, 50, 50, 0.2)",
            padding: "3px",
            right: "50px",
            top: "9px",
            cursor: "pointer",
          }}
          onClick={navigateToUserHome}
        />
        <div
          style={{
            display: "flex",
            top: "9px",
            position: "absolute",
            left: "10px",
            cursor: "pointer",
          }}
          onClick={navigateToMyProfile}
        >
          <img
            style={{ height: "30px", width: "30px", borderRadius: "16px" }}
            src={
              myProfileData && myProfileData.images && myProfileData.images[0]
                ? myProfileData.images[0]
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFhQ-2EAoeS6qbmv4PeqGPsw7oa1uPmaVow&usqp=CAU"
            }
          />
          <p
            style={{
              marginLeft: "5px",
              marginTop: "8px",
              color: "white",
              fontSize: "10px",
              fontWeight: "600",
            }}
          >
            {myProfileData && myProfileData.username}
          </p>
        </div>
      </div>
      <div
        style={{
          height: `calc(100% - 60px)`,
        }}
      >
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <p
            style={{
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              paddingRight: "10px",
              paddingLeft: "10px",
              borderBottom: matchDisplay ? "solid 3px #EB58A2" : "",
            }}
            onClick={() => setMatchDisplay(!matchDisplay)}
          >
            Match
          </p>
          <p
            style={{
              paddingRight: "10px",
              paddingLeft: "10px",
              borderBottom: matchDisplay ? "" : "solid 3px #EB58A2",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
            onClick={() => setMatchDisplay(!matchDisplay)}
          >
            Message
          </p>
        </div>
        <UserMenuMatch
          matchDisplay={matchDisplay}
          otherProfileData={otherProfileData}
          setOtherProfileData={setOtherProfileData}
          refreshMatchList={refreshMatchList}
          setErrorMsg={setErrorMsg}
        />
        <UserMenuMessage
          matchDisplay={matchDisplay}
          otherProfileData={otherProfileData}
          setOtherProfileData={setOtherProfileData}
          setErrorMsg={setErrorMsg}
        />
      </div>
    </div>
  );
};

export default UserMenu;

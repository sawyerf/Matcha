import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Disconnection from "@mui/icons-material/NoMeetingRoom";
import Match from "@mui/icons-material/Favorite";
import UserMenuMatch from "./UserMenuMatch";
import UserMenuMessage from "./UserMenuMessage";
import { useState, useEffect, useContext } from "react";

const useStyles = makeStyles({
  root: {
    position: "relative",
    backgroundColor: "white",
    width: "250px",
    height: "100vh",
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
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [matchDisplay, setMatchDisplay] = useState(true);

  function navigateToMyProfile() {
    navigate("/myprofile");
  }

  function navigateToUserHome() {
    if (myProfileData.images[0]) navigate("/userhome");
    else setErrorMsg("Remplissez votre profil entièrement");
  }

  function logOut() {
    socket.disconnect();
    localStorage.setItem("token", "");
    navigate("/");
    setDisplayMenu(false);
  }

  useEffect(async () => {
    if (localStorage.getItem("token")) {
      setDisplayMenu(true);
      navigate("/myprofile");
    }
  }, [localStorage.getItem("token")]);

  const displayNotif = (notif) => {
    console.log(notif);
    setNotifMessage(notif);
  };

  useEffect(() => {
    socket.on("notif", (notif) => displayNotif(notif.msg));
    socket.on("message", (msg) => writeMessage(msg));
  }, [socket]);

  const writeMessage = (msg) => {
    setNotifMessage("Message de " + msg.from);
    setMessageToPush(msg);
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
              myProfileData && myProfileData.images
                ? myProfileData.images[0]
                : ""
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
        />
        <UserMenuMessage
          matchDisplay={matchDisplay}
          otherProfileData={otherProfileData}
          setOtherProfileData={setOtherProfileData}
        />
      </div>
    </div>
  );
};

export default UserMenu;

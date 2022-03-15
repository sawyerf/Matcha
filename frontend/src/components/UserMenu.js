import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Disconnection from "@mui/icons-material/NoMeetingRoom";
import Match from "@mui/icons-material/Favorite";
import UserMenuMatch from "./UserMenuMatch";
import { useState, useEffect } from "react";

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

const UserMenu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [matchDisplay, setMatchDisplay] = useState(true);

  function navigateToMyProfile() {
    navigate("/myprofile");
  }

  function navigateToUserHome() {
    navigate("/userhome");
  }

  function logOut() {
    localStorage.setItem("token", "");
    navigate("/");
  }

  return (
    <div className={classes.root}>
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
            src="https://media.istockphoto.com/photos/designer-is-picking-up-a-tie-for-light-jacket-picture-id1163491245"
            alt="ImageUser"
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
            Johnny
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
        <UserMenuMatch matchDisplay={matchDisplay} />
      </div>
    </div>
  );
};

export default UserMenu;

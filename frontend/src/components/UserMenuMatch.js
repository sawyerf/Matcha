import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";

const useStyles = makeStyles({
  matchCard: {
    width: "100px",
    height: "150px",
    backgroundColor: "red",
    marginBottom: "10px",
    position: "relative",
    cursor: "pointer",
  },
});

const UserMenuMatch = ({
  matchDisplay,
  otherProfileData,
  setOtherProfileData,
  refreshMatchList,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [matchList, setMatchList] = useState(null);

  useEffect(async () => {
    if (localStorage.getItem("token")) {
      let fullList = [];

      const resList = await axios.get("/users/bighistory");
      if ("error" in resList.data) {
        console.log("Error: ", resList.data.message);
      }
      resList.data.forEach((data) => {
        if (data.isMatchs === true) data.mlv = "m";
        else if (data.isLiker === true) data.mlv = "l";
        else if (data.isVisit === true) data.mlv = "v";
      });
      fullList = resList.data;

      setMatchList(fullList);
    }
  }, [refreshMatchList]);

  useEffect(async () => {
    if (localStorage.getItem("token")) {
      let fullList = [];

      const resList = await axios.get("/users/bighistory");
      if ("error" in resList.data) {
        console.log("Error: ", resList.data.message);
      }
      resList.data.forEach((data) => {
        if (data.isMatchs === true) data.mlv = "m";
        else if (data.isLiker === true) data.mlv = "l";
        else if (data.isVisit === true) data.mlv = "v";
      });
      fullList = resList.data;

      setMatchList(fullList);
    }
  }, [localStorage.getItem("token")]);

  const seeProfile = (data) => {
    setOtherProfileData(data);
    navigate("/otherprofile");
  };

  return (
    <div
      style={{
        margin: "17px",
        maxHeight: "calc(100% - 30px)",
        marginTop: "10px",
        display: matchDisplay ? "flex" : "none",
        justifyContent: "space-between",
        flexFlow: "wrap",
        overflowX: "hidden",
      }}
    >
      {matchList &&
        matchList.map((data, key) => {
          return (
            <div key={key} style={{ padding: "3px" }}>
              <div
                className={classes.matchCard}
                onClick={() => seeProfile(data)}
                style={{
                  boxShadow:
                    data.mlv === "m"
                      ? "0 0 5px red"
                      : data.mlv === "l"
                      ? "0 0 5px green"
                      : "0 0 5px blue",
                }}
              >
                <img
                  src={
                    data.images && data.images[0]
                      ? data.images[0]
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFhQ-2EAoeS6qbmv4PeqGPsw7oa1uPmaVow&usqp=CAU"
                  }
                  alt="ImageUser"
                  className={classes.matchCard}
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 50%",
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    left: "5px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  {data.username}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserMenuMatch;

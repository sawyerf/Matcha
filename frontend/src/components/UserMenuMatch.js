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

const UserMenuMatch = ({ matchDisplay }) => {
  const classes = useStyles();
  const [matchList, setMatchList] = useState(null);
  const [displayProfile, setDisplayProfile] = useState(false);

  useEffect(async () => {
    const res = await axios.get("http://localhost:3000/api/users/matchs", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    if ("error" in res.data) {
      console.log("Error: ", res.data.message);
    }
    setMatchList(res.data);
  }, []);

  return (
    <div
      style={{
        margin: "20px",
        marginTop: "10px",
        display: matchDisplay ? "flex" : "none",
        justifyContent: "space-between",
        flexFlow: "wrap",
        height: `calc(100% - 60px)`,
        overflow: "scroll",
      }}
    >
      {matchList &&
        matchList.map((data) => {
          return (
            <>
              <div
                className={classes.matchCard}
                onClick={() => setDisplayProfile(true)}
              >
                <img
                  src={data.images[0]}
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
              {displayProfile && (
                <Profile setDisplayProfile={setDisplayProfile} />
              )}
            </>
          );
        })}
    </div>
  );
};

export default UserMenuMatch;

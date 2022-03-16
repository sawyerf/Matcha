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
    const res = await axios.get("/users/matchs");
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
        overflowX: "hidden",
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

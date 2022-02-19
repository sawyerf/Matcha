import { useState } from "react";
import UserMenu from "../components/UserHome/UserMenu";
import Profile from "../components/Profile";
import { makeStyles, withTheme } from "@mui/styles";
import GreenHeart from "../components/Icons/GreenHeart";
import RedCross from "../components/Icons/RedCross";
import RightArrow from "../components/Icons/RightArrow";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "calc(100vw - 250px)",
    backgroundColor: "#F1F1F1",
    textAlign: "-webkit-center",
  },
  matchImage: {
    position: "relative",
    display: "inline-block",
    height: "500px",
    width: "100%",
    overflow: "hidden",
    cursor: "pointer",
  },
  matchCard: {
    display: "inline-block",
    backgroundColor: "white",
    width: "350px",
    overflow: "hidden",
    height: "500px",
    borderRadius: "8px",
    boxShadow: "1px 1px 1px 1px #9E9E9E",
    marginTop: "70px",
  },
});

const UserHome = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [displayProfile, setDisplayProfile] = useState(false);

  const refuseMatch = () => {
    console.log("Refuse Match");
  };

  const acceptMatch = () => {
    console.log("Accept Match");
  };

  const previousImg = () => {
    console.log("Previous Img");
  };

  const nextImg = () => {
    console.log("Next Img");
  };

  const reportUser = () => {
    console.log("reportUser");
  };

  const blockUser = () => {
    console.log("blockUser");
  };

  return (
    <div style={{ display: "flex" }}>
      <UserMenu />
      <div className={classes.root}>
        <div className={classes.matchCard}>
          <div style={{ display: "flex" }}>
            <div
              className={classes.matchImage}
              onClick={() => setDisplayProfile(true)}
            >
              <div
                style={{ zIndex: "2", position: "absolute", top: "200px" }}
                onClick={() => previousImg()}
              >
                <RightArrow rotate="rotate(180deg)" />
              </div>
              <img
                style={{ height: "500px" }}
                src="https://media.istockphoto.com/photos/designer-is-picking-up-a-tie-for-light-jacket-picture-id1163491245"
                alt="ImageUser"
              />
              <div
                style={{
                  zIndex: "2",
                  position: "absolute",
                  top: "200px",
                  right: "0",
                }}
                onClick={() => nextImg()}
              >
                <RightArrow />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "0px",
                  height: "30%",
                  width: "100%",
                  background:
                    "linear-gradient(0deg, black, black, transparent)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: "0px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", marginLeft: "10px" }}>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    Johnny
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontSize: "16px",
                      marginTop: "4px",
                      marginLeft: "10px",
                    }}
                  >
                    26
                  </p>
                </div>
                <p
                  style={{
                    display: "flex",
                    color: "white",
                    fontSize: "14px",
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                >
                  Nogent Le Rotrou (23km)
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div onClick={() => refuseMatch()}>
                    <RedCross />
                  </div>
                  <div onClick={() => acceptMatch()}>
                    <GreenHeart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "350px",
          }}
        >
          <div
            style={{
              marginTop: "5px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "solid 1px black",
              padding: "5px 17px",
              width: "fit-content",
              cursor: "pointer",
            }}
            onClick={() => reportUser()}
          >
            Report Utilisateur
          </div>
          <div
            style={{
              marginTop: "5px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "solid 1px black",
              padding: "5px 17px",
              width: "fit-content",
              cursor: "pointer",
            }}
            onClick={() => blockUser()}
          >
            Bloquer Utilisateur
          </div>
        </div>
        {displayProfile && <Profile />}
      </div>
    </div>
  );
};

export default UserHome;

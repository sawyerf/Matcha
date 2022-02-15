import { useState } from "react";
import UserMenu from "../components/UserHome/UserMenu";
import Profile from "../components/Profile";
import { makeStyles } from "@mui/styles";
import GreenHeart from "../components/Icons/GreenHeart";
import RedCross from "../components/Icons/RedCross";
import RightArrow from "../components/Icons/RightArrow";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "calc(100vw - 250px)",
    textAlign: "-webkit-center",
  },
  matchImage: {
    display: "inline-block",
    height: "400px",
    width: "100%",
    overflow: "hidden",
    marginTop: "20px",
    cursor: "pointer",
  },
  matchCard: {
    display: "inline-block",
    backgroundColor: "pink",
    width: "350px",
    overflow: "hidden",
    height: "510px",
    border: "solid 1px grey",
    borderRadius: "8px",
    boxShadow: "3px 3px #9E9E9E",
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
              style={{ position: "relative", top: "200px" }}
              onClick={() => previousImg()}
            >
              <RightArrow rotate="rotate(180deg)" />
            </div>
            <div
              className={classes.matchImage}
              onClick={() => setDisplayProfile(true)}
            >
              <img
                style={{ height: "400px" }}
                src="https://media.istockphoto.com/photos/designer-is-picking-up-a-tie-for-light-jacket-picture-id1163491245"
                alt="ImageUser"
              />
            </div>
            <div
              style={{ position: "relative", top: "200px" }}
              onClick={() => nextImg()}
            >
              <RightArrow />
            </div>
          </div>
          <div>
            <p>Johnny 26ans, Nogent Le Rotrou (23km)</p>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div onClick={() => refuseMatch()}>
                <RedCross />
              </div>
              <div onClick={() => acceptMatch()}>
                <GreenHeart />
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
              backgroundColor: "pink",
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
              backgroundColor: "pink",
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

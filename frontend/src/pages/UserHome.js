import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import Profile from "../components/Profile";
import { makeStyles, withTheme } from "@mui/styles";
import GreenHeart from "../components/Icons/GreenHeart";
import RedCross from "../components/Icons/RedCross";
import RightArrow from "../components/Icons/RightArrow";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    marginTop: "70px",
  },
});

const UserHome = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [displayProfile, setDisplayProfile] = useState(false);
  const [otherProfil, setOtherProfile] = useState(null);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [displayedImageNb, setDisplayedImageNb] = useState(0);
  const [matched, setMatched] = useState(false);

  const youMatch = async (liked) => {
    axios
      .all([
        await axios.post("/action/like", {
          username: otherProfil.username,
          islike: liked,
        }),
        await axios.get("/users/offer"),
      ])
      .then(
        axios.spread((data1, data2) => {
          console.log("data1", data1, "data2", data2);
          data2.data && setOtherProfile(data2.data.offers);
          setDisplayedImage(data2.data.offers.images[0]);
        })
      );
  };

  const previousImg = () => {
    if (displayedImageNb === 0) return;
    else setDisplayedImageNb(displayedImageNb - 1);
  };

  const nextImg = () => {
    if (displayedImageNb === otherProfil.images.length - 1) return;
    else setDisplayedImageNb(displayedImageNb + 1);
  };

  const reportUser = async () => {
    axios
      .all([
        await axios.post("/action/report", { username: otherProfil.username }),
        await axios.get("/users/offer"),
      ])
      .then(
        axios.spread((data1, data2) => {
          console.log("data1", data1, "data2", data2);
          data2.data && setOtherProfile(data2.data.offers);
          setDisplayedImage(data2.data.offers.images[0]);
        })
      );
  };

  const blockUser = async () => {
    axios
      .all([
        await axios.post("/action/block", { username: otherProfil.username }),
        await axios.get("/users/offer"),
      ])
      .then(
        axios.spread((data1, data2) => {
          console.log("data1", data1, "data2", data2);
          data2.data && setOtherProfile(data2.data.offers);
          setDisplayedImage(data2.data.offers.images[0]);
        })
      );
  };

  useEffect(async () => {
    const res = await axios.get("/users/offer");
    if ("error" in res.data) {
      console.log("Error: ", res.data.message);
    }
    res.data && setOtherProfile(res.data.offers);
    setDisplayedImage(res.data.offers.images[0]);
  }, []);

  useEffect(async () => {
    setDisplayedImage(otherProfil.images[displayedImageNb]);
    console.log(displayedImage);
  }, [displayedImageNb]);

  return (
    <div style={{ display: "flex" }}>
      <UserMenu />
      <div className={classes.root}>
        <div
          className={classes.matchCard}
          style={{
            boxShadow:
              otherProfil && otherProfil.isLike
                ? "50px 50px 50px pink, -50px -50px 50px pink"
                : "1px 1px 1px 1px #9E9E9E",
          }}
        >
          <div style={{ display: "flex" }}>
            <div className={classes.matchImage}>
              <div
                style={{ position: "absolute", top: "200px" }}
                onClick={() => previousImg()}
              >
                <RightArrow rotate="rotate(180deg)" />
              </div>
              <img
                src={displayedImage}
                alt="ImageUser"
                style={{
                  height: "500px",
                  width: "350px",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
                onClick={() => setDisplayProfile(true)}
              />
              <div
                style={{
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
                    {otherProfil && otherProfil.username}
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontSize: "16px",
                      marginTop: "4px",
                      marginLeft: "10px",
                    }}
                  >
                    {otherProfil && otherProfil.age}
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
                  à {otherProfil && otherProfil.distance}km de vous
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div onClick={() => youMatch(false)}>
                    <RedCross />
                  </div>
                  <div onClick={() => youMatch(true)}>
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
        {displayProfile && <Profile setDisplayProfile={setDisplayProfile} />}
      </div>
    </div>
  );
};

export default UserHome;

import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import RightArrow from "../components/Icons/RightArrow";
import { useNavigate } from "react-router-dom";
import RedCross from "../components/Icons/RedCross";
import GreenHeart from "../components/Icons/GreenHeart";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    backgroundColor: "#F1F1F1",
    textAlign: "center",
  },
  card: {
    width: "350px",
    borderRadius: "16px",
    marginTop: "20px",
    marginBottom: "20px",
    paddingTop: "20px",
    position: "relative",
    marginRight: "auto",
    marginLeft: "auto",
  },
  matchCard: {
    width: "350px",
    height: "500px",
  },
});

const OtherProfile = ({
  otherProfileData,
  setRefreshMatchList,
  refreshMatchList,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [displayedImage, setDisplayedImage] = useState(
    otherProfileData && otherProfileData.images && otherProfileData.images[0]
  );
  const [displayedImageNb, setDisplayedImageNb] = useState(0);

  const previousImg = () => {
    if (displayedImageNb === 0) return;
    else setDisplayedImageNb(displayedImageNb - 1);
  };

  const nextImg = () => {
    if (displayedImageNb === otherProfileData.images.length - 1) return;
    else setDisplayedImageNb(displayedImageNb + 1);
  };

  const unlikeMatch = async () => {
    await axios.post("/action/like", {
      username: otherProfileData.username,
      islike: false,
    });
    await setRefreshMatchList(!refreshMatchList);
    await navigate("/userhome");
  };

  const likeMatch = async () => {
    await axios.post("/action/like", {
      username: otherProfileData.username,
      islike: true,
    });
    await setRefreshMatchList(!refreshMatchList);
    await navigate("/userhome");
  };

  useEffect(() => {
    setDisplayedImage(
      otherProfileData &&
        otherProfileData.images &&
        otherProfileData.images[displayedImageNb]
    );
  }, [displayedImageNb]);

  useEffect(() => {
    if (otherProfileData) {
      otherProfileData &&
        otherProfileData.images &&
        otherProfileData.images[0] &&
        setDisplayedImage(otherProfileData.images[0]);
      axios.post("/users/visit", {
        username: otherProfileData.username,
      });
    }
    if (!otherProfileData) navigate("/userhome");
  }, [otherProfileData]);

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.root}>
        <div className={classes.card}>
          <div>
            <div>
              <div
                style={{
                  position: "relative",
                  marginBottom: "10px",
                  boxShadow: "1px 1px 1px 1px #9E9E9E",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{ position: "absolute", top: "170px", left: "20px" }}
                  onClick={() => previousImg()}
                >
                  <RightArrow rotate="rotate(180deg)" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    bottom: "0px",
                    zIndex: "10",
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
                      {otherProfileData && otherProfileData.username}
                    </p>
                    <p
                      style={{
                        color: "white",
                        fontSize: "16px",
                        marginTop: "4px",
                        marginLeft: "10px",
                      }}
                    >
                      {otherProfileData && otherProfileData.age}
                      {otherProfileData && otherProfileData.gender}
                      {" - "}
                      {otherProfileData &&
                      otherProfileData.sexuality === otherProfileData.gender
                        ? "Gay"
                        : otherProfileData &&
                          (otherProfileData.sexuality === "HF" ||
                            otherProfileData.sexuality === "FH")
                        ? "Bi"
                        : "Hétéro"}
                    </p>
                  </div>
                  <div style={{ display: "flex", marginLeft: "10px" }}>
                    <p
                      style={{
                        color: "white",
                        fontSize: "14px",
                        float: "left",
                        marginTop: "8px",
                      }}
                    >
                      à {otherProfileData && otherProfileData.distance}km de
                      vous
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div onClick={() => unlikeMatch()}>
                      <RedCross />
                    </div>
                    {otherProfileData && otherProfileData.mlv !== "m" ? (
                      <div onClick={() => likeMatch()}>
                        <GreenHeart />
                      </div>
                    ) : null}
                  </div>
                </div>

                <img
                  src={
                    otherProfileData &&
                    otherProfileData.images &&
                    otherProfileData.images[0]
                      ? displayedImage
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFhQ-2EAoeS6qbmv4PeqGPsw7oa1uPmaVow&usqp=CAU"
                  }
                  alt="ImageUser"
                  className={classes.matchCard}
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 50%",
                    borderRadius: "8px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    height: "30%",
                    width: "350px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(0deg, black, black, transparent)",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "170px",
                    right: "20px",
                  }}
                  onClick={() => nextImg()}
                >
                  <RightArrow />
                </div>
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  marginRight: "auto",
                  textAlign: "left",
                }}
              >
                <p style={{ marginBottom: "10px" }}>
                  Bio : {otherProfileData && otherProfileData.bio}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  Popularité : {otherProfileData && otherProfileData.popularity}
                </p>
                {otherProfileData && otherProfileData.isOnline === false ? (
                  <p style={{ marginBottom: "10px" }}>
                    Dernière visite :
                    {otherProfileData && otherProfileData.last_visit
                      ? otherProfileData.last_visit.substring(0, 10)
                      : " Jamais"}
                  </p>
                ) : (
                  <p style={{ marginBottom: "10px" }}>
                    Cet utilisateur est connecté
                  </p>
                )}
                <p style={{ marginBottom: "10px" }}>
                  {otherProfileData &&
                    otherProfileData.tags.replaceAll(",", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;

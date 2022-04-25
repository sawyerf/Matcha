import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import RightArrow from "../components/Icons/RightArrow";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "calc(100vw - 250px)",
    backgroundColor: "#F1F1F1",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    width: "550px",
    height: "70vh",
    borderRadius: "16px",
    marginTop: "70px",
    paddingTop: "20px",
    paddingBottom: "20px",
    position: "relative",
    marginRight: "auto",
    marginLeft: "auto",
  },
  matchCard: {
    width: "250px",
    height: "400px",
    marginLeft: "20px",
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
  console.log(otherProfileData);

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

  useEffect(async () => {
    setDisplayedImage(otherProfileData.images[displayedImageNb]);
  }, [displayedImageNb]);

  useEffect(async () => {
    otherProfileData &&
      otherProfileData.images &&
      otherProfileData.images[0] &&
      setDisplayedImage(otherProfileData.images[0]);
    axios.post("/users/visit", {
      username: otherProfileData.username,
    });
  }, [otherProfileData]);

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.root}>
        <div className={classes.card}>
          <h3 style={{ marginBottom: "20px" }}>
            Profil de {otherProfileData && otherProfileData.username}
          </h3>
          <div style={{ display: "flex" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: "170px", left: "20px" }}
                onClick={() => previousImg()}
              >
                <RightArrow rotate="rotate(180deg)" />
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
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "170px",
                  right: "0",
                }}
                onClick={() => nextImg()}
              >
                <RightArrow />
              </div>
            </div>
            <div
              style={{
                marginLeft: "30px",
                marginRight: "20px",
                textAlign: "left",
              }}
            >
              <p style={{ marginBottom: "10px" }}>
                Age : {otherProfileData && otherProfileData.age}
              </p>
              <p style={{ marginBottom: "10px" }}>
                Genre :{" "}
                {otherProfileData && otherProfileData.gender === "H"
                  ? "Homme"
                  : "Femme"}
              </p>
              <p style={{ marginBottom: "10px" }}>
                Recherche :{" "}
                {otherProfileData && otherProfileData.sexuality === "H"
                  ? "Homme"
                  : otherProfileData && otherProfileData.sexuality === "F"
                  ? "Femme"
                  : "Homme et Femme"}
              </p>
              <p style={{ marginBottom: "10px" }}>
                Distance : {otherProfileData && otherProfileData.distance}
              </p>
              <p style={{ marginBottom: "10px" }}>
                Popularité : {otherProfileData && otherProfileData.popularity}
              </p>
              <p style={{ marginBottom: "10px" }}>
                Bio : {otherProfileData && otherProfileData.bio}
              </p>
              {otherProfileData && otherProfileData.isOnline === false ? (
                <p style={{ marginBottom: "10px" }}>
                  Dernière visite :
                  {otherProfileData && otherProfileData.last_visit
                    ? otherProfileData.last_visit.substring(0, 10)
                    : "Jamais"}
                </p>
              ) : (
                <p style={{ marginBottom: "10px" }}>
                  Cet utilisateur est connecté
                </p>
              )}
              <p style={{ marginBottom: "10px" }}>
                {otherProfileData && otherProfileData.tags.replaceAll(",", " ")}
              </p>
              {otherProfileData.mlv !== "m" ? (
                ""
              ) : (
                <div
                  style={{
                    width: "70px",
                    height: "30px",
                    borderRadius: "8px",
                    backgroundColor: "red",
                    boxShadow: "5px 5px 5px darkred",
                    cursor: "pointer",
                  }}
                  onClick={() => unlikeMatch()}
                >
                  <p
                    style={{
                      color: "white",
                      fontWeight: "600",
                      marginLeft: "7px",
                      paddingTop: "5px",
                      fontSize: "18px",
                    }}
                  >
                    Unlike
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;

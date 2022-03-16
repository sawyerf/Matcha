import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import RightArrow from "../components/Icons/RightArrow";

const useStyles = makeStyles({
  root: {
    width: "calc(100vw - 250px)",
    backgroundColor: "#F1F1F1",
    textAlign: "-webkit-center",
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
  },
  matchCard: {
    width: "250px",
    height: "400px",
    marginLeft: "20px",
  },
});

const OtherProfile = ({
  myProfileData,
  otherProfileData,
  setOtherProfileData,
}) => {
  const classes = useStyles();
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
      <UserMenu
        myProfileData={myProfileData}
        otherProfileData={otherProfileData}
        setOtherProfileData={setOtherProfileData}
      />
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
              <p style={{ marginBottom: "10px" }}>
                {otherProfileData && otherProfileData.tags.replaceAll(",", " ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;

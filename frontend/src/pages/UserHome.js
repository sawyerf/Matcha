import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import Profile from "../components/Profile";
import { makeStyles, withTheme } from "@mui/styles";
import GreenHeart from "../components/Icons/GreenHeart";
import RedCross from "../components/Icons/RedCross";
import RightArrow from "../components/Icons/RightArrow";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "@mui/material/Slider";

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
    marginTop: "45px",
  },
});

const UserHome = ({ setOtherProfileData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [otherProfil, setOtherProfile] = useState(null);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [displayedImageNb, setDisplayedImageNb] = useState(0);
  const [matched, setMatched] = useState(false);
  const [age, setAge] = useState([18, 30]);
  const [popularity, setPopularity] = useState([0, 100]);
  const [distance, setDistance] = useState(30);
  const [tags, setTags] = useState("");
  const [preferenceList, setPreferenceList] = useState([]);
  const [indexPreferenceList, setIndexPreferenceList] = useState(0);

  const youMatch = async (liked) => {
    if (preferenceList && preferenceList.length - 1 > indexPreferenceList) {
      console.log("LIKE DANS LA PREFERENCE LIST");
      console.log(preferenceList.length);
      console.log(indexPreferenceList);
      console.log(preferenceList);
      await axios.post("/action/like", {
        username: otherProfil.username,
        islike: liked,
      });
      await setOtherProfile(preferenceList[indexPreferenceList + 1]);
      await setDisplayedImage(
        preferenceList[indexPreferenceList + 1].images[0]
      );
      await setIndexPreferenceList(indexPreferenceList + 1);
      await setDisplayedImageNb(0);
    } else {
      console.log("LIKE DANS LES OFFERS RANDOM");
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
            setDisplayedImageNb(0);
          })
        );
    }
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
          setDisplayedImageNb(0);
        })
      );
  };

  const searchPrefUser = async () => {
    const res = await axios.post("/users/search", {
      minAge: age[0],
      maxAge: age[1],
      minPopularity: popularity[0],
      maxPopularity: popularity[1],
      maxDistance: distance,
      tags: ["#gaming"],
    });
    console.log(res.data[0]);
    console.log(otherProfil);
    if (res.data[0] && preferenceList !== res.data) {
      console.log("NOUVELLE LISTE DE PREFERENCE");
      await setPreferenceList(res.data);
      await setIndexPreferenceList(0);
      await setOtherProfile(res.data[0]);
      await setDisplayedImage(res.data[0].images[0]);
      await setDisplayedImageNb(0);
    } else {
    }
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
          setDisplayedImageNb(0);
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
    setDisplayedImage(
      otherProfil && otherProfil.images && otherProfil.images[displayedImageNb]
    );
  }, [displayedImageNb]);

  const seeProfile = (data) => {
    setOtherProfileData(data);
    navigate("/otherprofile");
  };

  const handleChangeAge = (event, newValue) => {
    setAge(newValue);
  };

  const handleChangePopularity = (event, newValue) => {
    setPopularity(newValue);
  };

  const handleChangeDistance = (event, newValue) => {
    setDistance(newValue);
  };

  const handleChangeTags = (event) => {
    let tagsCpy = tags;
    if (event.target.checked === true) {
      if (tagsCpy !== "") tagsCpy += "," + event.target.id;
      else tagsCpy = event.target.id;
    } else {
      if (tagsCpy.includes("," + event.target.id))
        tagsCpy = tagsCpy.replace("," + event.target.id, "");
      else if (tagsCpy.includes(event.target.id))
        tagsCpy = tagsCpy.replace(event.target.id, "");
    }
    setTags(tagsCpy);
  };

  return (
    <div style={{ display: "flex" }}>
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
                onClick={() => seeProfile(otherProfil)}
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
              background: "linear-gradient(135deg, #EB58A2, orange)",
              borderRadius: "8px",
              border: "solid 1px white",
              padding: "5px 17px",
              width: "fit-content",
              cursor: "pointer",
            }}
            onClick={() => reportUser()}
          >
            <p style={{ color: "white" }}>Report Utilisateur</p>
          </div>
          <div
            style={{
              marginTop: "5px",
              background: "linear-gradient(135deg, #EB58A2, orange)",
              borderRadius: "8px",
              border: "solid 1px white",
              padding: "5px 17px",
              width: "fit-content",
              cursor: "pointer",
            }}
            onClick={() => blockUser()}
          >
            <p style={{ color: "white" }}>Bloquer Utilisateur</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <div style={{ float: "left", marginLeft: "20px" }}>
            <div style={{ display: "flex", width: "230px" }}>
              <p style={{ marginRight: "63px", marginTop: "4px" }}>Age</p>
              <Slider
                getAriaLabel={() => "Age"}
                value={age}
                min={18}
                max={100}
                size="small"
                onChange={handleChangeAge}
                valueLabelDisplay="auto"
              />
            </div>
            <div style={{ display: "flex", width: "230px" }}>
              <p style={{ marginRight: "20px", marginTop: "4px" }}>
                Popularité
              </p>
              <Slider
                getAriaLabel={() => "Popularity"}
                value={popularity}
                min={0}
                max={100}
                size="small"
                onChange={handleChangePopularity}
                valueLabelDisplay="auto"
              />
            </div>
            <div style={{ display: "flex", width: "230px" }}>
              <p style={{ marginRight: "30px", marginTop: "4px" }}>Distance</p>
              <Slider
                size="small"
                value={distance}
                aria-label="Distance"
                valueLabelDisplay="auto"
                onChange={handleChangeDistance}
                min={2}
              />
            </div>
          </div>
          <div style={{ marginTop: "12px", marginLeft: "15px" }}>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "330px",
                marginBottom: "5px",
              }}
            >
              <div>
                <input
                  checked={tags.includes("#music") ? true : false}
                  type="checkbox"
                  id="#music"
                  name="music"
                  value="music"
                  onChange={handleChangeTags}
                />
                <label htmlFor="music" style={{ marginLeft: "5px" }}>
                  Musique
                </label>
              </div>
              <div>
                <input
                  checked={tags.includes("#voyage") ? true : false}
                  type="checkbox"
                  id="#voyage"
                  name="voyage"
                  value="voyage"
                  onChange={handleChangeTags}
                />
                <label htmlFor="voyage" style={{ marginLeft: "5px" }}>
                  Voyage
                </label>
              </div>
              <div>
                <input
                  checked={tags.includes("#cuisine") ? true : false}
                  type="checkbox"
                  id="#cuisine"
                  name="cuisine"
                  value="cuisine"
                  onChange={handleChangeTags}
                />
                <label htmlFor="cuisine" style={{ marginLeft: "5px" }}>
                  Cuisine
                </label>
              </div>
            </div>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "330px",
                marginBottom: "5px",
              }}
            >
              <div>
                <input
                  checked={tags.includes("#programmation") ? true : false}
                  type="checkbox"
                  id="#programmation"
                  name="programmation"
                  value="programmation"
                  onChange={handleChangeTags}
                />
                <label htmlFor="programmation" style={{ marginLeft: "5px" }}>
                  Programmation
                </label>
              </div>
              <div style={{ marginLeft: "-57px" }}>
                <input
                  checked={tags.includes("#fitness") ? true : false}
                  type="checkbox"
                  id="#fitness"
                  name="fitness"
                  value="fitness"
                  onChange={handleChangeTags}
                />
                <label htmlFor="fitness" style={{ marginLeft: "5px" }}>
                  Fitness
                </label>
              </div>
              <div>
                <input
                  checked={tags.includes("#danse") ? true : false}
                  type="checkbox"
                  id="#danse"
                  name="danse"
                  value="danse"
                  onChange={handleChangeTags}
                />
                <label htmlFor="danse" style={{ marginLeft: "5px" }}>
                  Danse
                </label>
              </div>
            </div>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "330px",
              }}
            >
              <div>
                <input
                  checked={tags.includes("#gaming") ? true : false}
                  type="checkbox"
                  id="#gaming"
                  name="gaming"
                  value="gaming"
                  onChange={handleChangeTags}
                />
                <label htmlFor="gaming" style={{ marginLeft: "5px" }}>
                  Gaming
                </label>
              </div>
              <div style={{ marginLeft: "-17px" }}>
                <input
                  checked={tags.includes("#poney") ? true : false}
                  type="checkbox"
                  id="#poney"
                  name="poney"
                  value="poney"
                  onChange={handleChangeTags}
                />
                <label htmlFor="poney" style={{ marginLeft: "5px" }}>
                  Poney
                </label>
              </div>
              <div>
                <input
                  checked={tags.includes("#sport") ? true : false}
                  type="checkbox"
                  id="#sport"
                  name="sport"
                  value="sport"
                  onChange={handleChangeTags}
                />
                <label htmlFor="sport" style={{ marginLeft: "5px" }}>
                  Sport
                </label>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "30px",
              marginLeft: "10px",
              background: "linear-gradient(135deg, #EB58A2, orange)",
              borderRadius: "8px",
              border: "solid 1px white",
              padding: "5px 17px",
              width: "fit-content",
              cursor: "pointer",
              height: "fit-content",
            }}
            onClick={() => searchPrefUser()}
          >
            <p style={{ color: "white" }}>Rechercher</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

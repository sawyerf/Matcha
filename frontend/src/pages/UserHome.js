import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import GreenHeart from "../components/Icons/GreenHeart";
import RedCross from "../components/Icons/RedCross";
import RightArrow from "../components/Icons/RightArrow";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    backgroundColor: "#F1F1F1",
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
  select: {
    height: "40px",
    width: "180px",
  },
});

const UserHome = ({ setOtherProfileData, setErrorMsg }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [otherProfil, setOtherProfile] = useState(null);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [displayedImageNb, setDisplayedImageNb] = useState(0);
  const [age, setAge] = useState([18, 30]);
  const [popularity, setPopularity] = useState([0, 100]);
  const [distance, setDistance] = useState(30);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState(1);
  const [preferenceList, setPreferenceList] = useState([]);
  const [indexPreferenceList, setIndexPreferenceList] = useState(0);
  const [mounted, setMounted] = useState(false);

  const youMatch = async (liked) => {
    if (preferenceList && preferenceList.length - 1 > indexPreferenceList) {
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
          data2.data && setOtherProfile(data2.data.offers);
          setDisplayedImage(data2.data.offers.images[0]);
          setDisplayedImageNb(0);
        })
      );
  };

  const searchPrefUser = async () => {
    const res = await axios
      .post("/users/search", {
        minAge: age[0],
        maxAge: age[1],
        minPopularity: popularity[0],
        maxPopularity: popularity[1],
        maxDistance: distance,
        tags: tags,
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
      });
    if (res.data[0] && preferenceList !== res.data) {
      await setPreferenceList(res.data);
      await setIndexPreferenceList(0);
      await setOtherProfile(res.data[0]);
      await setDisplayedImage(res.data[0].images[0]);
      await setDisplayedImageNb(0);
      setErrorMsg(null);
    } else {
      setErrorMsg("Personne ne se trouve dans cette liste");
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
          data2.data && setOtherProfile(data2.data.offers);
          setDisplayedImage(data2.data.offers.images[0]);
          setDisplayedImageNb(0);
        })
      );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted === true) {
      async function fetchData() {
        const res = await axios.get("/users/offer").catch((err) => {
          setErrorMsg(err.response.data.message);
          if (err.response.data.message === "Bad Token") navigate("/");
        });
        res.data && setOtherProfile(res.data.offers);
        setDisplayedImage(res.data.offers.images[0]);
      }
      fetchData().catch();
    }
  }, [mounted, setErrorMsg, navigate]);

  useEffect(() => {
    setDisplayedImage(
      otherProfil && otherProfil.images && otherProfil.images[displayedImageNb]
    );
  }, [displayedImageNb, otherProfil]);

  const seeProfile = (data) => {
    setOtherProfileData(data);
    navigate("/otherprofile");
  };

  const handleChangeFilter = async (event) => {
    if (preferenceList && preferenceList[0]) {
      let prefListCpy = [];
      if (event.target.value === 1) {
        prefListCpy = await preferenceList.sort(function (a, b) {
          return a.age - b.age;
        });
      } else if (event.target.value === 2) {
        prefListCpy = await preferenceList.sort(function (a, b) {
          return b.popularity - a.popularity;
        });
      } else if (event.target.value === 3) {
        prefListCpy = await preferenceList.sort(function (a, b) {
          return a.distance - b.distance;
        });
      }
      await setPreferenceList(prefListCpy);
      await setOtherProfile(preferenceList[0]);
      await setDisplayedImage(preferenceList[0].images[0]);
      await setIndexPreferenceList(0);
      await setDisplayedImageNb(0);
      setFilter(event.target.value);
    } else setErrorMsg("Recherchez une liste d'abord");
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

  const handleChangeTags = async (event) => {
    let tagsCpy = tags;
    if (event.target.checked === true) {
      tagsCpy.push(event.target.id);
    } else {
      const index = tagsCpy.indexOf(event.target.id);
      if (index > -1) {
        tagsCpy.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setTags([...tagsCpy]);
  };

  return (
    <div style={{ display: "flex", textAlignLast: "center" }}>
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
            <div
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "225px",
                display: otherProfil ? "none" : "",
              }}
            >
              <DoNotDisturbIcon fontSize={"large"} />
            </div>
            <div
              className={classes.matchImage}
              style={{ display: otherProfil ? "" : "none" }}
            >
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
            marginRight: "auto",
            marginLeft: "auto",
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
              marginBottom: "20px",
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
              height: "fit-content",
            }}
            onClick={() => blockUser()}
          >
            <p style={{ color: "white" }}>Bloquer Utilisateur</p>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            marginTop: "10px",
            width: "fit-content",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              marginInline: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
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
            <div style={{ display: "flex" }}>
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
            <div style={{ display: "flex" }}>
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
          <div
            style={{
              marginInline: "20px",
              marginTop: "12px",
              marginBottom: "15px",
            }}
          >
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
                  checked={tags.indexOf("#music") !== -1 ? true : false}
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
                  checked={tags.indexOf("#voyage") !== -1 ? true : false}
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
                  checked={tags.indexOf("#cuisine") !== -1 ? true : false}
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
                  checked={tags.indexOf("#programmation") !== -1 ? true : false}
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
                  checked={tags.indexOf("#fitness") !== -1 ? true : false}
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
                  checked={tags.indexOf("#danse") !== -1 ? true : false}
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
                  checked={tags.indexOf("#gaming") !== -1 ? true : false}
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
                  checked={tags.indexOf("#poney") !== -1 ? true : false}
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
                  checked={tags.indexOf("#sport") !== -1 ? true : false}
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
          <div style={{ display: "flex", marginInline: "20px" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Filtrer par"
              value={filter}
              label="Filtrer par"
              className={classes.select}
              onChange={handleChangeFilter}
            >
              <MenuItem value={1}>Age</MenuItem>
              <MenuItem value={2}>Popularité</MenuItem>
              <MenuItem value={3}>Distance</MenuItem>
            </Select>
            <div
              style={{
                marginTop: "4px",
                marginLeft: "auto",
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
    </div>
  );
};

export default UserHome;

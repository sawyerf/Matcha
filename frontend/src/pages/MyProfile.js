import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    backgroundColor: "#F1F1F1",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    paddingTop: "20px",
    paddingBottom: "20px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "fit-content",
    marginTop: "20px",
  },
  textField: {
    width: "100%",
  },
  textFieldBio: {
    width: "80%",
  },
  input: {
    height: "40px",
  },
  inputBio: {},
  profilPlus: {
    border: "solid 1px #DDDDDD",
    borderRadius: "8px",
    width: "100px",
    height: "150px",
    backgroundColor: "white",
    marginBottom: "10px",
    position: "relative",
  },
  profilPicture: {
    borderRadius: "8px",
    width: "100px",
    height: "150px",
    backgroundColor: "white",
    marginBottom: "10px",
    position: "relative",
  },
});

const MyProfile = ({
  myProfileData,
  setMyProfileData,
  otherProfileData,
  setOtherProfileData,
  setErrorMsg,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailCpy, setEmailCpy] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState("");
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [image5, setImage5] = useState();
  let token = localStorage.getItem("token");

  const [imageToUpload1, setImageToUpload1] = useState();
  const [imageToUpload2, setImageToUpload2] = useState();
  const [imageToUpload3, setImageToUpload3] = useState();
  const [imageToUpload4, setImageToUpload4] = useState();
  const [imageToUpload5, setImageToUpload5] = useState();

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeOrientation = (event) => {
    setOrientation(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLongitude = (event) => {
    setLongitude(event.target.value);
  };

  const handleChangeLatitude = (event) => {
    setLatitude(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeBio = (event) => {
    setBio(event.target.value);
  };

  const handleChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangeOldPassword = (event) => {
    setOldPassword(event.target.value);
  };

  const deleteImg = async (image, setImage) => {
    const res = await axios.delete("/profil/image", {
      data: {
        image: image,
      },
    });
    setImage(null);
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

  const saveProfil = async () => {
    if (latitude && longitude) {
      const resPos = axios
        .post("/profil/setlocation", {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
        });
    }

    const res = await axios
      .all([
        axios.post("/profil/setinfo", {
          gender: gender === "Homme" ? "H" : "F",
          sexuality:
            orientation === "H??t??rosexuel" && gender === "Homme"
              ? "F"
              : orientation === "Homosexuel" && gender === "Homme"
              ? "H"
              : orientation === "H??t??rosexuel" && gender === "Femme"
              ? "H"
              : orientation === "Homosexuel" && gender === "Femme"
              ? "F"
              : "HF",
          tags: tags,
          bio: bio,
          firstname: firstName,
          lastname: lastName,
        }),
        email !== emailCpy
          ? axios.post("/profil/changemail", {
              new_mail: email,
            })
          : null,
        newPassword && oldPassword
          ? axios.post("/profil/changepassword", {
              old_password: oldPassword,
              new_password: newPassword,
            })
          : null,
      ])
      .then(
        axios.spread((data1, data2) => {
          setErrorMsg(null);
        })
      )
      .catch((err) => {
        setErrorMsg(err.response.data.message);
      });
  };

  useEffect(async () => {
    const res = await axios.get("/profil/me").catch((err) => {
      setErrorMsg(err.response.data.message);
      navigate("/");
    });
    res && res.data && res.data.email && setEmail(res.data.email);
    res && res.data && res.data.email && setEmailCpy(res.data.email);
    res && res.data && res.data.tags && setTags(res.data.tags);
    res && res.data && res.data.bio && setBio(res.data.bio);
    res && res.data && res.data.firstname && setFirstName(res.data.firstname);
    res && res.data && res.data.lastname && setLastName(res.data.lastname);
    res && res.data && res.data.latitude && setLatitude(res.data.latitude);
    res && res.data && res.data.longitude && setLongitude(res.data.longitude);
    res &&
      res.data &&
      res.data.gender &&
      setGender(
        res.data.gender === "H"
          ? "Homme"
          : res.data.gender === "F"
          ? "Femme"
          : ""
      );
    res &&
      res.data &&
      res.data.sexuality &&
      res.data.gender &&
      setOrientation(
        res.data.sexuality === "F" && res.data.gender === "H"
          ? "H??t??rosexuel"
          : res.data.sexuality === "F" && res.data.gender === "F"
          ? "Homosexuel"
          : res.data.sexuality === "H" && res.data.gender === "F"
          ? "H??t??rosexuel"
          : res.data.sexuality === "H" && res.data.gender === "H"
          ? "Homosexuel"
          : "Bisexuel"
      );
  }, []);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  useEffect(() => {
    if (
      myProfileData !== null &&
      myProfileData.images &&
      myProfileData.images[0]
    ) {
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      setImage5(null);
      myProfileData.images[0] && setImage1(myProfileData.images[0]);
      myProfileData.images[1] && setImage2(myProfileData.images[1]);
      myProfileData.images[2] && setImage3(myProfileData.images[2]);
      myProfileData.images[3] && setImage4(myProfileData.images[3]);
      myProfileData.images[4] && setImage5(myProfileData.images[4]);
    }
  }, [myProfileData]);

  useEffect(async () => {
    if (imageToUpload1) {
      const form = new FormData();
      form.append("file", imageToUpload1);
      const res = await axios.post("/profil/image", form).catch((err) => {
        setErrorMsg(err.response.data.message);
      });
      const res2 = await axios.get("/profil/me").catch(function (error) {});
      res2.data && setMyProfileData(res2.data);
    }
  }, [imageToUpload1]);

  useEffect(async () => {
    if (imageToUpload2) {
      const form = new FormData();
      form.append("file", imageToUpload2);
      const res = await axios.post("/profil/image", form).catch((err) => {
        setErrorMsg(err.response.data.message);
      });
      const res2 = await axios.get("/profil/me").catch(function (error) {});
      res2.data && setMyProfileData(res2.data);
    }
  }, [imageToUpload2]);

  useEffect(async () => {
    if (imageToUpload3) {
      const form = new FormData();
      form.append("file", imageToUpload3);
      const res = await axios.post("/profil/image", form).catch((err) => {
        setErrorMsg(err.response.data.message);
      });
      const res2 = await axios.get("/profil/me").catch(function (error) {});
      res2.data && setMyProfileData(res2.data);
    }
  }, [imageToUpload3]);

  useEffect(async () => {
    if (imageToUpload4) {
      const form = new FormData();
      form.append("file", imageToUpload4);
      const res = await axios.post("/profil/image", form).catch((err) => {
        setErrorMsg(err.response.data.message);
      });
      const res2 = await axios.get("/profil/me").catch(function (error) {});
      res2.data && setMyProfileData(res2.data);
    }
  }, [imageToUpload4]);

  useEffect(async () => {
    if (imageToUpload5) {
      const form = new FormData();
      form.append("file", imageToUpload5);
      const res = await axios.post("/profil/image", form).catch((err) => {
        setErrorMsg(err.response.data.message);
      });
      const res2 = await axios.get("/profil/me").catch(function (error) {});
      res2.data && setMyProfileData(res2.data);
    }
  }, [imageToUpload5]);

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.root}>
        <div className={classes.card}>
          <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
            <h3 style={{ marginBottom: "20px" }}>Modification du Profil</h3>
            <button onClick={() => saveProfil()}>Sauvegarder</button>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: "auto", marginRight: "10px" }}>
                <p
                  style={{
                    marginBottom: "5px",
                  }}
                >
                  Nom
                </p>
                <TextField
                  className={classes.textField}
                  placeholder="Nom"
                  type="text"
                  onChange={handleChangeLastName}
                  value={lastName} // mettre le nom actuelle
                  inputprops={{
                    className: classes.input,
                  }}
                />
              </div>
              <div style={{ marginRight: "auto" }}>
                <p style={{ marginBottom: "5px" }}>Pr??nom</p>
                <TextField
                  className={classes.textField}
                  placeholder="Pr??nom"
                  type="text"
                  onChange={handleChangeFirstName}
                  value={firstName} // mettre le nom actuelle
                  inputprops={{
                    className: classes.input,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "20px",
                width: "100%",
              }}
            >
              <div style={{ width: "100%" }}>
                <p style={{ marginBottom: "5px" }}>Addresse e-mail</p>
                <TextField
                  className={classes.textField}
                  placeholder="Addresse e-mail"
                  type="text"
                  onChange={handleChangeEmail}
                  value={email} // mettre le nom actuelle
                  inputprops={{
                    className: classes.input,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
              }}
            >
              <div style={{ marginLeft: "auto", marginRight: "10px" }}>
                <p style={{ marginBottom: "5px" }}>Nouveau mot de passe</p>
                <TextField
                  className={classes.textField}
                  placeholder="Nouveau mot de passe"
                  type="password"
                  onChange={handleChangeNewPassword}
                  inputprops={{
                    className: classes.input,
                  }}
                />
              </div>
              <div style={{ marginRight: "auto" }}>
                <p style={{ marginBottom: "5px" }}>Ancien mot de passe</p>
                <TextField
                  className={classes.textField}
                  placeholder="Ancien Mot de passe"
                  type="password"
                  onChange={handleChangeOldPassword}
                  inputprops={{
                    className: classes.input,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <div style={{ marginRight: "10px", width: "100%" }}>
                <p style={{ marginBottom: "5px" }}>Genre</p>
                <Select
                  value={gender}
                  label="Genre"
                  onChange={handleChangeGender}
                  className={classes.textField}
                  inputprops={{
                    className: classes.input,
                  }}
                >
                  <MenuItem value={"Homme"}>Homme</MenuItem>
                  <MenuItem value={"Femme"}>Femme</MenuItem>
                </Select>
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ marginBottom: "5px" }}>Orientation</p>
                <Select
                  value={orientation}
                  label="Orientation"
                  onChange={handleChangeOrientation}
                  className={classes.textField}
                >
                  <MenuItem value={"H??t??rosexuel"}>H??t??rosexuel</MenuItem>
                  <MenuItem value={"Homosexuel"}>Homosexuel</MenuItem>
                  <MenuItem value={"Bisexuel"}>Bisexuel</MenuItem>
                </Select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <div style={{ marginLeft: "auto", marginRight: "10px" }}>
                <p style={{ marginBottom: "5px" }}>Latitude</p>
                <TextField
                  className={classes.textField}
                  placeholder="Latitude"
                  type="number"
                  onChange={handleChangeLatitude}
                  value={latitude} // mettre le nom actuelle
                  inputprops={{
                    className: classes.input,
                  }}
                />
              </div>
              <div style={{ marginRight: "auto" }}>
                <p style={{ marginBottom: "5px" }}>Longitude</p>
                <TextField
                  className={classes.textField}
                  placeholder="Longitude"
                  type="number"
                  onChange={handleChangeLongitude}
                  value={longitude} // mettre le nom actuelle
                  inputprops={{
                    className: classes.input,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                justifyContent: "space-evenly",
              }}
            >
              <p style={{ marginBottom: "5px" }}>Bio</p>
              <TextField
                className={classes.textField}
                multiline
                rows={5}
                placeholder="Bio"
                type="text"
                onChange={handleChangeBio}
                defaultValue={bio} // mettre le nom actuelle
                inputprops={{
                  className: classes.inputBio,
                }}
              />
            </div>
            {/* -------------------------------------- TAGS ----------------------------------------------- */}
            <h4
              style={{
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Tags
            </h4>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  marginRight: "40px",
                  marginLeft: "auto",
                }}
              >
                <div style={{ marginBottom: "5px" }}>
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
                <div style={{ marginBottom: "5px" }}>
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
                <div style={{ marginBottom: "5px" }}>
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
                <div style={{ marginBottom: "5px" }}>
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
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  marginRight: "auto",
                }}
              >
                <div style={{ marginBottom: "5px" }}>
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
                <div style={{ marginBottom: "5px" }}>
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
                <div style={{ marginBottom: "5px" }}>
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
                <div style={{ marginBottom: "5px" }}>
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
                <div style={{ marginBottom: "5px" }}>
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
            </div>
            {/* ---------------------------------------- END TAGS ------------------------------------- */}
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "360px",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <div className={classes.profilPlus}>
                  {image1 ? (
                    <>
                      <img
                        src={image1}
                        alt="image1"
                        className={classes.profilPicture}
                        style={{
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                      />
                      <p
                        onClick={() => deleteImg(image1, setImage1)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          color: "red",
                          fontWeight: "600",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </p>{" "}
                    </>
                  ) : (
                    <label>
                      <input
                        type="file"
                        name="image1"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setImageToUpload1(event.target.files[0]);
                        }}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "35px",
                          left: "33px",
                          color: "#DDDDDD",
                          fontWeight: "600",
                          fontSize: "60px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </p>
                    </label>
                  )}
                </div>
                <div className={classes.profilPlus}>
                  {image2 ? (
                    <>
                      {" "}
                      <img
                        src={image2}
                        alt="image2"
                        className={classes.profilPicture}
                        style={{
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                      />
                      <p
                        onClick={() => deleteImg(image2, setImage2)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          color: "red",
                          fontWeight: "600",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </p>{" "}
                    </>
                  ) : (
                    <label>
                      <input
                        type="file"
                        name="image2"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setImageToUpload2(event.target.files[0]);
                        }}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "35px",
                          left: "33px",
                          color: "#DDDDDD",
                          fontWeight: "600",
                          fontSize: "60px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </p>
                    </label>
                  )}
                </div>
                <div className={classes.profilPlus}>
                  {image3 ? (
                    <>
                      <img
                        src={image3}
                        alt="image3"
                        className={classes.profilPicture}
                        style={{
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                      />
                      <p
                        onClick={() => deleteImg(image3, setImage3)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          color: "red",
                          fontWeight: "600",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </p>
                    </>
                  ) : (
                    <label>
                      <input
                        type="file"
                        name="image2"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setImageToUpload3(event.target.files[0]);
                        }}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "35px",
                          left: "33px",
                          color: "#DDDDDD",
                          fontWeight: "600",
                          fontSize: "60px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </p>
                    </label>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "360px",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <div className={classes.profilPlus}>
                  {image4 ? (
                    <>
                      <img
                        src={image4}
                        alt="image4"
                        className={classes.profilPicture}
                        style={{
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                      />
                      <p
                        onClick={() => deleteImg(image4, setImage4)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          color: "red",
                          fontWeight: "600",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </p>
                    </>
                  ) : (
                    <label>
                      <input
                        type="file"
                        name="image"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setImageToUpload4(event.target.files[0]);
                        }}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "35px",
                          left: "33px",
                          color: "#DDDDDD",
                          fontWeight: "600",
                          fontSize: "60px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </p>
                    </label>
                  )}
                </div>
                <div className={classes.profilPlus}>
                  {image5 ? (
                    <>
                      <img
                        src={image5}
                        alt="image5"
                        className={classes.profilPicture}
                        style={{
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                      />
                      <p
                        onClick={() => deleteImg(image5, setImage5)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          color: "red",
                          fontWeight: "600",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </p>
                    </>
                  ) : (
                    <label>
                      <input
                        type="file"
                        name="image5"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setImageToUpload5(event.target.files[0]);
                        }}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "35px",
                          left: "33px",
                          color: "#DDDDDD",
                          fontWeight: "600",
                          fontSize: "60px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </p>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

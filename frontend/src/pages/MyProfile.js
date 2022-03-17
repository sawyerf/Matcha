import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

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
    overflowY: "scroll",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  textField: {
    width: "200px",
    heigt: "40px",
  },
  input: {
    height: "40px",
  },
  textFieldBio: {
    width: "440px",
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
  const classes = useStyles();
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailCpy, setEmailCpy] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeOrientation = (event) => {
    setOrientation(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
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

  const deleteImg = () => {
    console.log("deleteImg");
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
    const res = await axios
      .all([
        axios.post("/profil/setinfo", {
          gender: gender === "Homme" ? "H" : "F",
          sexuality:
            orientation === "Hétérosexuel" && gender === "Homme"
              ? "F"
              : orientation === "Homosexuel" && gender === "Homme"
              ? "H"
              : orientation === "Hétérosexuel" && gender === "Femme"
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
        setErrorMsg("Remplissez tout les champs texte");
      });
  };

  useEffect(async () => {
    const res = await axios.get("/profil/me");
    if ("error" in res.data) {
      console.log("Error: ", res.data.message);
      setErrorMsg(res.data.message);
    }
    console.log(res.data);

    res.data.email && setEmail(res.data.email);
    res.data.email && setEmailCpy(res.data.email);
    res.data.tags && setTags(res.data.tags);
    res.data.bio && setBio(res.data.bio);
    res.data.firstname && setFirstName(res.data.firstname);
    res.data.lastname && setLastName(res.data.lastname);
    setGender(
      res.data.gender === "H" ? "Homme" : res.data.gender === "F" ? "Femme" : ""
    );
    setOrientation(
      res.data.sexuality === "F" && res.data.gender === "H"
        ? "Hétérosexuel"
        : res.data.sexuality === "F" && res.data.gender === "F"
        ? "Homosexuel"
        : res.data.sexuality === "H" && res.data.gender === "F"
        ? "Hétérosexuel"
        : res.data.sexuality === "H" && res.data.gender === "H"
        ? "Homosexuel"
        : "Bisexuel"
    );
  }, []);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  useEffect(async () => {
    let image;
    if (image1) image = image1;
    else if (image2) image = image2;
    else if (image3) image = image3;
    else if (image4) image = image4;
    else if (image5) image = image5;
    if (image) {
      const form = new FormData();
      form.append("file", image);
      const res = axios.post("/profil/image", form);
      if ("error" in res.data) {
        console.log("Error: ", res.data.message);
        setErrorMsg(res.data.message);
      }
    }
  }, [image1, image2, image3, image4, image5]);

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.root}>
        <div className={classes.card}>
          <h3 style={{ marginBottom: "20px" }}>Modification du Profil</h3>
          <button onClick={() => saveProfil()}>Sauvegarder</button>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <p style={{ marginBottom: "5px" }}>Nom</p>
              <TextField
                className={classes.textField}
                placeholder="Nom"
                type="text"
                onChange={handleChangeLastName}
                value={lastName} // mettre le nom actuelle
                InputProps={{
                  className: classes.input,
                }}
              />
            </div>
            <div>
              <p style={{ marginBottom: "5px" }}>Prénom</p>
              <TextField
                className={classes.textField}
                placeholder="Prénom"
                type="text"
                onChange={handleChangeFirstName}
                value={firstName} // mettre le nom actuelle
                InputProps={{
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
              width: "440px",
            }}
          >
            <div>
              <p style={{ marginBottom: "5px" }}>Addresse e-mail</p>
              <TextField
                className={classes.textFieldBio}
                placeholder="Addresse e-mail"
                type="text"
                onChange={handleChangeEmail}
                value={email} // mettre le nom actuelle
                InputProps={{
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
            <div>
              <p style={{ marginBottom: "5px" }}>Nouveau mot de passe</p>
              <TextField
                className={classes.textField}
                placeholder="Nouveau mot de passe"
                type="password"
                onChange={handleChangeNewPassword}
                InputProps={{
                  className: classes.input,
                }}
              />
            </div>
            <div>
              <p style={{ marginBottom: "5px" }}>Ancien mot de passe</p>
              <TextField
                className={classes.textField}
                placeholder="Ancien Mot de passe"
                type="password"
                onChange={handleChangeOldPassword}
                InputProps={{
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
            <div>
              <p style={{ marginBottom: "5px" }}>Genre</p>
              <Select
                value={gender}
                label="Genre"
                onChange={handleChangeGender}
                className={classes.textField}
                InputProps={{
                  className: classes.input,
                }}
              >
                <MenuItem value={"Homme"}>Homme</MenuItem>
                <MenuItem value={"Femme"}>Femme</MenuItem>
              </Select>
            </div>
            <div>
              <p style={{ marginBottom: "5px" }}>Orientation</p>
              <Select
                value={orientation}
                label="Orientation"
                onChange={handleChangeOrientation}
                className={classes.textField}
              >
                <MenuItem value={"Hétérosexuel"}>Hétérosexuel</MenuItem>
                <MenuItem value={"Homosexuel"}>Homosexuel</MenuItem>
                <MenuItem value={"Bisexuel"}>Bisexuel</MenuItem>
              </Select>
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
              className={classes.textFieldBio}
              multiline
              rows={5}
              placeholder="Bio"
              type="text"
              onChange={handleChangeBio}
              defaultValue={bio} // mettre le nom actuelle
              InputProps={{
                className: classes.inputBio,
              }}
            />
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "440px",
              }}
            >
              <div className={classes.profilPlus}>
                {image1 ? (
                  <>
                    {" "}
                    <img
                      src={URL.createObjectURL(image1)}
                      alt="image1"
                      className={classes.profilPicture}
                      style={{
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                      }}
                    />
                    <p
                      onClick={() => deleteImg()}
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
                        console.log(event.target.files[0]);
                        setImage1(event.target.files[0]);
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
                      src={URL.createObjectURL(image2)}
                      alt="image2"
                      className={classes.profilPicture}
                      style={{
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                      }}
                    />
                    <p
                      onClick={() => deleteImg()}
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
                        console.log(event.target.files[0]);
                        setImage2(event.target.files[0]);
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
                      src={URL.createObjectURL(image3)}
                      alt="image3"
                      className={classes.profilPicture}
                      style={{
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                      }}
                    />
                    <p
                      onClick={() => deleteImg()}
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
                        console.log(event.target.files[0]);
                        setImage3(event.target.files[0]);
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
                width: "440px",
              }}
            >
              <div className={classes.profilPlus}>
                {image4 ? (
                  <>
                    <img
                      src={URL.createObjectURL(image4)}
                      alt="image4"
                      className={classes.profilPicture}
                      style={{
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                      }}
                    />
                    <p
                      onClick={() => deleteImg()}
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
                        console.log(event.target.files[0]);
                        setImage4(event.target.files[0]);
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
                      src={URL.createObjectURL(image5)}
                      alt="image5"
                      className={classes.profilPicture}
                      style={{
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                      }}
                    />
                    <p
                      onClick={() => deleteImg()}
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
                        console.log(event.target.files[0]);
                        setImage5(event.target.files[0]);
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
          {/* -------------------------------------- TAGS ----------------------------------------------- */}
          <h4
            style={{
              marginBottom: "10px",
            }}
          >
            Tags
          </h4>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "440px",
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
          </div>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "440px",
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
            <div>
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
            <div>
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
          {/* ---------------------------------------- END TAGS ------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

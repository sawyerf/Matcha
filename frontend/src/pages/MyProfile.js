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
  profilPicture: {
    border: "solid 1px #DDDDDD",
    borderRadius: "8px",
    width: "100px",
    height: "150px",
    backgroundColor: "white",
    marginBottom: "10px",
    position: "relative",
  },
});

const MyProfile = () => {
  const classes = useStyles();
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState("");

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

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const deleteImg = () => {
    console.log("deleteImg");
  };

  const addImg = () => {
    console.log("addImg");
  };

  const handleChangeTags = (event) => {
    let tagsCpy = tags;
    if (event.target.checked === true) {
      if (tagsCpy !== "") tagsCpy += "," + event.target.id;
      else tagsCpy = event.target.id;
    } else {
      console.log("delte");
      if (tagsCpy.includes("," + event.target.id))
        tagsCpy = tagsCpy.replace("," + event.target.id, "");
      else if (tagsCpy.includes(event.target.id))
        tagsCpy = tagsCpy.replace(event.target.id, "");
    }
    setTags(tagsCpy);
    console.log(tags);
  };

  const saveProfil = () => {
    console.log(localStorage.getItem("token"));
    const res = axios.post(
      "http://localhost:3000/api/profil/setinfo",
      {
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
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    if ("error" in res.data) {
      console.log("Error: ", res.data.message);
    } else {
      console.log(res.data);
    }
  };

  useEffect(async () => {
    const res = await axios.get("http://localhost:3000/api/profil/me", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    if ("error" in res.data) {
      console.log("Error: ", res.data.message);
      //setError("Fail to connect `" + res.data.message + "`");
    }
    console.log(res.data);
    setEmail(res.data.email);
    setTags(res.data.tags);
    setBio(res.data.bio);
    setFirstName(res.data.firstname);
    setLastName(res.data.lastname);
    setGender(res.data.gender === "H" ? "Homme" : "Femme");
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

  return (
    <div style={{ display: "flex" }}>
      <UserMenu />
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
            }}
          >
            <div>
              <p style={{ marginBottom: "5px" }}>Addresse e-mail</p>
              <TextField
                className={classes.textField}
                placeholder="Addresse e-mail"
                type="text"
                onChange={handleChangeEmail}
                value={email} // mettre le nom actuelle
                InputProps={{
                  className: classes.input,
                }}
              />
            </div>
            <div>
              <p style={{ marginBottom: "5px" }}>Mot de passe</p>
              <TextField
                className={classes.textField}
                placeholder="Mot de passe"
                type="password"
                onChange={handleChangePassword}
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
              <div style={{ position: "relative" }}>
                <img
                  src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
                  alt="ImageUser"
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
              </div>
              <div>
                <div className={classes.profilPicture}>
                  <p
                    onClick={() => addImg()}
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
                </div>
              </div>
              <div>
                <div className={classes.profilPicture}>
                  <p
                    onClick={() => addImg()}
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
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "440px",
              }}
            >
              <div>
                {/* IMAGE EXISTE ? img : div + */}
                <div className={classes.profilPicture}>
                  <p
                    onClick={() => addImg()}
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
                </div>
              </div>
              <div>
                <div className={classes.profilPicture}>
                  <p
                    onClick={() => addImg()}
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
                </div>
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
              <label for="music" style={{ marginLeft: "5px" }}>
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
              <label for="voyage" style={{ marginLeft: "5px" }}>
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
              <label for="cuisine" style={{ marginLeft: "5px" }}>
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
              <label for="programmation" style={{ marginLeft: "5px" }}>
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
              <label for="gaming" style={{ marginLeft: "5px" }}>
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
              <label for="poney" style={{ marginLeft: "5px" }}>
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
              <label for="sport" style={{ marginLeft: "5px" }}>
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
              <label for="fitness" style={{ marginLeft: "5px" }}>
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
              <label for="danse" style={{ marginLeft: "5px" }}>
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

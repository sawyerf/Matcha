import { useState } from "react";
import UserMenu from "../components/UserMenu";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
});

const MyProfile = () => {
  const classes = useStyles();
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeOrientation = (event) => {
    setOrientation(event.target.value);
  };

  return (
    <div style={{ display: "flex" }}>
      <UserMenu />
      <div className={classes.root}>
        <div className={classes.card}>
          <h3 style={{ marginBottom: "20px" }}>Modification du Profil</h3>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <p style={{ marginBottom: "5px" }}>Nom</p>
              <TextField
                className={classes.textField}
                placeholder="Nom"
                type="text"
                defaultValue="" // mettre le nom actuelle
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
                defaultValue="" // mettre le nom actuelle
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
                defaultValue="" // mettre le nom actuelle
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
                <MenuItem value={1}>Homme</MenuItem>
                <MenuItem value={2}>Femme</MenuItem>
                <MenuItem value={3}>Autre</MenuItem>
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
                <MenuItem value={11}>Hétérosexuel</MenuItem>
                <MenuItem value={12}>Homosexuel</MenuItem>
                <MenuItem value={13}>Bisexuel</MenuItem>
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
              InputProps={{
                className: classes.inputBio,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

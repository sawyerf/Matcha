import UserMenu from "../components/UserHome/UserMenu";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width: "calc(100vw - 250px)",
    backgroundColor: "#F1F1F1",
    textAlign: "-webkit-center",
  },
});

const MyProfile = () => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <UserMenu />
      <div className={classes.root}>
        <h1>MyProfil</h1>
        <TextField
          className="input-form"
          id="outlined-password-input"
          placeholder="Yolo"
          type="password"
        />
      </div>
    </div>
  );
};

export default MyProfile;

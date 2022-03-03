import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    top: "0",
    right: "0",
    position: "absolute",
    backgroundColor: "rgba(80, 80, 80, 0.8)",
    width: "calc(100vw - 251px)",
    height: "100vh",
  },
  profilCard: {
    backgroundColor: "white",
    border: "solid 1px black",
    borderRadius: "8px",
    width: "80%",
    height: "80%",
    transform: "translateY(10%)",
  },
});

const Profile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.profilCard}></div>
    </div>
  );
};

export default Profile;

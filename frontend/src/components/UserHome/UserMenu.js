import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "../Icons/ArrowForwardIcon";

const useStyles = makeStyles({
  root: {
    position: "relative",
    backgroundColor: "pink",
    borderRight: "solid 2px black",
    width: "250px",
    height: "100vh",
  },
  bottomMenu: {
    position: "absolute",
    bottom: "30px",
    justifyContent: "center",
    marginLeft: "20px",
    width: "80%",
  },
  bottomMenuText: {
    fontSize: "16px",
    marginBottom: "10px",
    fontWeight: "600",
    border: "solid 1px black",
    borderRadius: "8px",
    padding: "5px",

    cursor: "pointer",
    "&:hover, &:focus": {
      color: "white",
      borderColor: "white",
    },
  },
  topMenu: {
    position: "absolute",
    top: "60px",
    justifyContent: "center",
    marginLeft: "20px",
    width: "80%",
  },
  topMenuText: {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "600",
    padding: "5px",
    border: "solid 1px black",
    borderRadius: "8px",
    cursor: "pointer",
    "&:hover, &:focus": {
      color: "white",
      borderColor: "white",
    },
  },
  arrowIcon: {
    marginLeft: "5px",
    marginTop: "5px",
    cursor: "pointer",
  },
});

const UserMenu = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  function navigateToMyProfile() {
    navigate("/myprofile");
  }

  function navigateToMatchList() {
    navigate("/matchlist");
  }

  function navigateToNotification() {
    navigate("/notification");
  }

  return (
    <div className={classes.root}>
      <div className={classes.arrowIcon} onClick={() => navigate(-1)}>
        <ArrowForwardIcon />
      </div>
      <div className={classes.topMenu}>
        <p className={classes.topMenuText} onClick={navigateToNotification}>
          Notifications
        </p>
        <p className={classes.topMenuText} onClick={navigateToMatchList}>
          Liste de match
        </p>
      </div>
      <div className={classes.bottomMenu}>
        <p className={classes.bottomMenuText} onClick={navigateToMyProfile}>
          Mon Profil
        </p>
        <p className={classes.bottomMenuText}>Déconnexion</p>
      </div>
    </div>
  );
};

export default UserMenu;

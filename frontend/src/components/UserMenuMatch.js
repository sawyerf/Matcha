import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Disconnection from "@mui/icons-material/NoMeetingRoom";
import Match from "@mui/icons-material/Favorite";
import { useState } from "react";

const useStyles = makeStyles({
  matchCard: {
    width: "100px",
    height: "150px",
    backgroundColor: "red",
    marginBottom: "10px",
    position: "relative",
    cursor: "pointer",
  },
});

const UserMenuMatch = ({ matchDisplay }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        margin: "20px",
        marginTop: "10px",
        display: matchDisplay ? "flex" : "none",
        justifyContent: "space-between",
        flexFlow: "wrap",
        height: `calc(100% - 60px)`,
        overflow: "scroll",
      }}
    >
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
      <div className={classes.matchCard}>
        <img
          src="https://static1.purepeople.com/articles/9/36/74/09/@/5297138-aymeric-bonnery-devoile-un-selfie-sur-in-950x0-2.jpg"
          alt="ImageUser"
          className={classes.matchCard}
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
          }}
        >
          Johnny
        </p>
      </div>
    </div>
  );
};

export default UserMenuMatch;

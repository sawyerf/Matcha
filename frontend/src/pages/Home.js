import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    width: "200px",
    height: "fit-content",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    padding: "5px",
    textAlign: "center",
    marginTop: "55px",
    border: "solid 1px white",
    fontSize: "30px",
  },
  buttonMdp: {
    width: "150px",
    height: "fit-content",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    padding: "5px",
    textAlign: "center",
    marginTop: "55px",
    fontSize: "16px",
    position: "absolute",
    left: "15px",
    bottom: "15px",
  },
});

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #EB58A2, orange)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "35vh",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div className={classes.button} onClick={() => navigate("/register")}>
          Register
        </div>
        <div className={classes.button} onClick={() => navigate("/login")}>
          Login
        </div>
        <div
          className={classes.buttonMdp}
          onClick={() => navigate("/forgottenpassword")}
        >
          Mot de passe oublié
        </div>
      </div>
    </div>
  );
};

export default Home;

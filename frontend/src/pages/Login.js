import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import Nav from "../components/Nav";
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

const Login = ({ setErrorMsg }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePasswd = (event) => {
    setPasswd(event.target.value);
  };

  const loginApi = async (username, passwd) => {
    const res = await axios
      .post("/auth/login", {
        username: username,
        password: passwd,
      })
      .catch((err) => {
        setErrorMsg("Identifiant/Mot de passe incorrect");
      });
    if (res && res.data && res.data.token) {
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      navigate("/myprofile");
    }
  };

  const handleSubmit = (event) => {
    loginApi(username, passwd);
    event.preventDefault();
  };

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
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            required
            id="outlined-input"
            type="text"
            label="Username"
            value={username}
            onChange={handleChangeUsername}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={passwd}
            onChange={handleChangePasswd}
          />
        </div>
        <div style={{ marginTop: "80px" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
      <div
        className={classes.buttonMdp}
        onClick={() => navigate("/forgottenpassword")}
      >
        Mot de passe oubli??
      </div>
    </div>
  );
};

export default Login;

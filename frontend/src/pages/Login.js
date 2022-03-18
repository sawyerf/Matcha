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
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [msgError, setError] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePasswd = (event) => {
    setPasswd(event.target.value);
  };

  const loginApi = async (username, passwd) => {
    const res = await axios.post("/auth/login", {
      username: username,
      password: passwd,
    });
    if ("error" in res.data) {
      console.log("Error: ", res.data.message);
      setError("Fail to connect `" + res.data.message + "`");
    } else {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("token");
        navigate("/myprofile");
      }
      setError("bg le mec");
    }
  };

  const handleSubmit = (event) => {
    console.log(username, passwd);
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
          marginTop: "35vh",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <p> {msgError} </p>

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
    </div>
  );
};

export default Login;

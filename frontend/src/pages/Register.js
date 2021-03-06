import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import "../styles/index.scss";

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
  registerForm: {
    width: "500px",
    height: "320px",
    borderRadius: "8px",
    border: "solid 1px white",
    paddingTop: "30px",
  },
});

const Register = ({ setErrorMsg }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangePasswd = (event) => {
    setPasswd(event.target.value);
  };

  const handleChangeAge = (event) => {
    setAge(event);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const registerApi = async (username, passwd) => {
    const res = await axios
      .post("/auth/register", {
        username: username,
        password: passwd,
        email: email,
        age: age,
        firstname: firstName,
        lastname: lastName,
      })
      .then(() => {
        setErrorMsg("");
        navigate("/login");
      })
      .catch((err) => {
        setErrorMsg("Fail to register");
      });
  };

  const handleSubmit = (event) => {
    registerApi(username, passwd);
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
          paddingTop: "22vh",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div className={classes.registerForm}>
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              className="input-form"
              id="outlined-input-username"
              type="text"
              label="Username"
              value={username}
              onChange={handleChangeUsername}
            />
            <TextField
              required
              className="input-form"
              id="outlined-input-email"
              type="text"
              label="Email"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <LocalizationProvider
              className="input-form"
              dateAdapter={AdapterDateFns}
            >
              <DatePicker
                label="Birth Date"
                value={age}
                onChange={handleChangeAge}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              className="input-form"
              id="outlined-password-input"
              label="Password"
              type="password"
              value={passwd}
              onChange={handleChangePasswd}
            />
          </div>
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              className="input-form"
              id="outlined-input-firstname"
              type="text"
              label="firstname"
              value={firstName}
              onChange={handleChangeFirstName}
            />
            <TextField
              required
              className="input-form"
              id="outlined-input-lastname"
              type="text"
              label="lastname"
              value={lastName}
              onChange={handleChangeLastName}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              className="input-form"
              variant="contained"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  /*return (
        <div className="register">
            <Nav />
            <h2> Register </h2>
            <RegisterForm />
        </div>
    );*/
};

export default Register;

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

const ForgottenPassword = ({ setErrorMsg }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    const res = axios
      .post("/no/askreset", {
        email: email,
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Cette adresse n'existe pas, le mail n'a pas été envoyé");
      });
    navigate("/login");
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
            label="Email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div style={{ marginTop: "80px" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgottenPassword;

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

const ResetPassword = ({ setErrorMsg }) => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    var result = /[^/]*$/.exec(window.location.href)[0];
    const res = axios
      .post(`/no/resetpass/${result}`, {
        new_password: password,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Error ! 1Majuscule, 1Car. spécial, 8Car. mini, 1 chiffre");
      });
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
            label="Password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div style={{ marginTop: "80px" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Changer Mot de passe{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

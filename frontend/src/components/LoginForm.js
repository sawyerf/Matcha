import { useState } from "react";
import axios from "axios";
// import FormControl from '@mui/material/FormControl';
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [msgError, setError] = useState("");
  const navigate = useNavigate();

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
    <Box className="box-form">
      <p> {msgError} </p>
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
      <Button variant="contained" onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;

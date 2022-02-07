import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';


const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [passwd, setPasswd] = useState('');
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState('');
    const [msgError, setError] = useState('');

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePasswd = (event) => {
        setPasswd(event.target.value);
    }

    const handleChangeAge = (event) => {
        setAge(event);
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const registerApi = async (username, passwd) => {
        const res = await axios.post('http://localhost:3000/api/auth/register', 
            {
                'username': username,
                'password': passwd,
                "email": email,
                "age": age
            }
        )
        if (res.status == 201) {
            setError('bg mon gars');
        }
        if ('error' in res.data) {
            console.log('Error: ', res.data.message);
            setError('Fail to connect `' + res.data.message + '`');
        } 
    }

    const handleSubmit = (event) => {
        console.log(username, passwd);
        registerApi(username, passwd);
        event.preventDefault();
    }

    return (
        <Box>
            <p> { msgError } </p>
            <TextField
                required
                id="outlined-input"
                type="text"
                label="Username"
                value={username}
                onChange={handleChangeUsername}
            />
            <TextField
                required
                id="outlined-input"
                type="text"
                label="email"
                value={email}
                onChange={handleChangeEmail}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Basic example"
                    value={age}
                    onChange={handleChangeAge}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                value={passwd}
                onChange={handleChangePasswd}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
            >Login</Button>
        </Box>
    );
};

export default RegisterForm;
import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import '../styles/index.scss'


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
        <Box className='box-form'>
            <p> { msgError } </p>
            <TextField
                required
                className='input-form'
                id="outlined-input"
                type="text"
                label="Username"
                value={username}
                onChange={handleChangeUsername}
            />
            <TextField
                required
                className='input-form'
                id="outlined-input"
                type="text"
                label="Email"
                value={email}
                onChange={handleChangeEmail}
            />
            <LocalizationProvider
                className='input-form'
                dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Birth Date"
                    value={age}
                    onChange={handleChangeAge}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <TextField
                className='input-form'
                id="outlined-password-input"
                label="Password"
                type="password"
                value={passwd}
                onChange={handleChangePasswd}
            />
            <Button
                className='input-form'
                variant="contained"
                onClick={handleSubmit}
            >Register</Button>
        </Box>
    );
};

export default RegisterForm;
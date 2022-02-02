import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [passwd, setPasswd] = useState('');

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePasswd = (event) => {
        setPasswd(event.target.value)
    }

    const loginApi = async (username, passwd) => {
        axios.post('http://localhost:3000/api/auth/login', 
            {
                'username': username,
                'passwd': passwd
            }
        )
    }

    const handleSubmit = (event) => {
        console.log(username, passwd);
        loginApi(username, passwd);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={username} onChange={handleChangeUsername} />
                <input type="text" value={passwd} onChange={handleChangePasswd} />
            </label>
            <input type="submit" value="login" onClick={handleSubmit} />
        </form>
    );
};

export default LoginForm;
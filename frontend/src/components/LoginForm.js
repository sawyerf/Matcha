// import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    // const [data, setData] = useState('hello');
    const get = async () => {
        const res = await axios.get('http://localhost:3000/api/auth/login');
        console.log(res);
        console.log('lol');
    };
    return (
        <div>
            <button onClick={get}>des barres</button>
        </div>
    );
};

export default LoginForm;
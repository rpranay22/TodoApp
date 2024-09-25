import axios from 'axios';
import bcryptjs from "bcryptjs";
import Coockies from "js-cookie";
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import './index.css';
function Login(props) {
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginSuccess, setIsLoginSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            uname: uname,
            password: password
        };

        axios.post('http://localhost:5000/api/get', data)
            .then(async response => {

                console.log(response);
                if (response.data.length === 0) {
                    setIsLoginSuccess(false)
                }
                else {
                    const pass = response.data[0].password;
                    const isPasswordMatched = await bcryptjs.compare(password, pass);
                    if (isPasswordMatched) {
                        setIsLoginSuccess(true)
                        Coockies.set("jwt_token", response.data[0].jwt_token);

                    }
                    else {

                    }
                }
                setUname('');
                setPassword('');
            })
            .catch(error => {
                console.error('There was an error sending the data!', error);
            });
    };

    return (
        isLoginSuccess ? <Navigate to="/home" replace={true} /> : (<div className="App">
            <center className='center'>
                <form onSubmit={handleSubmit}>
                    <div className='inp1'>
                        <label>
                            USERNAME
                        </label>

                        <input
                            type="text"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                            placeholder='USERNAME'
                        />
                    </div>
                    <div className='inp1'>
                        <label>
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='PASSWORD'
                        />
                    </div>
                    <button type="submit" className='lbtn'>Login</button>
                    <Link to="/signup" className='lbtns'>
                        <button className='lbtn'>SignUp</button></Link>
                    {
                        isLoginSuccess && <p className='err'>Incorrect Username or Password</p>
                    }
                </form>
            </center>
        </div>)
    );
}

export default Login;
import axios from 'axios';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';
const SignUp = () => {
    const [name, setName] = useState('');
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [userExist, setUserExist] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name,
            uname: uname,
            password: password,
            token: uuidv4()
        };

        axios.post('http://localhost:5000/api/data', data)
            .then(response => {
                console.log('Data sent successfully:', response);
                // Clear form fields
                setName('');
                setUname('');
                setPassword('')
            })
            .catch(error => {
                setUserExist(true)
                console.error('There was an error sending the data!', error);
            });
    };
    return <center className='center'>
        <form className='sup' onSubmit={handleSubmit}>
            <div className="ipz">
                <label htmlFor="name">YOUR NAME</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="ent"
                    placeholder="Your Name"
                />
            </div>
            <div className="ipz">
                <label htmlFor="username">USERNAME</label>
                <input
                    id="username"
                    type="text"
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                    required
                    className="ent"
                    placeholder="Username"
                />
            </div>
            <div className="ipz">
                <label htmlFor="password">PASSWORD</label>
                <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="ent"
                    placeholder="Password"
                />
            </div>
            <button type="submit" className="lbtn">
                SignUp
            </button>
            {
                userExist && <p className='err'>User already exists, try another username</p>
            }
        </form >
    </center >
}
export default SignUp
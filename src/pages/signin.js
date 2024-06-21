import '../style_sheets/signup.css';
import React, { useState } from "react";
import { auth } from '../scripts/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function SignIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function signIn(x){
        x.preventDefault();
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            console.log("Signed into " + userCredential.user.uid);
            navigate("/card_trading_game");
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div id="signUpBox">
            <form onSubmit={signIn}>
            <div id="signUp">
            <div id="already">Don't have an account? <a href="/card_trading_game/signup"><br></br>Sign Up</a></div>
                Email
                <input type="email" id="signUpInput" name="myInput" value={username} onChange={(e) => setUsername(e.target.value)}/>
                Password
                <input type="password" id="signUpInput" name="myInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button id="signUpButton" >SIGN IN</button>
            </div>
            </form>
        </div>
    );
};
import '../style_sheets/signup.css';
import React, { useState } from "react";
import { auth } from '../scripts/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function SignIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function signIn(x){
        x.preventDefault();
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div id="signUpBox">
            <form onSubmit={signIn}>
            <div id="signUp">
                Username
                <input id="signUpInput" name="myInput" value={username} onChange={(e) => setUsername(e.target.value)}/>
                Password
                <input type="password" id="signUpInput" name="myInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button id="signUpButton" >SIGN IN</button>
            </div>
            </form>
        </div>
    );
};
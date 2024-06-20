import '../style_sheets/signup.css';
import React, { useState } from "react";
import { auth } from '../scripts/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
 
export function SignUp(){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function signUp(x){
        x.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div id="signUpBox">
            <form onSubmit={signUp}>
            <div id="signUp">
                Email
                <input type="email" id="signUpInput" name="myInput" value={username} onChange={(e) => setEmail(e.target.value)}/>
                Username
                <input id="signUpInput" name="myInput" value={username} onChange={(e) => setUsername(e.target.value)}/>
                Password
                <input type="password" id="signUpInput" name="myInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button id="signUpButton" >SIGN UP</button>
            </div>
            </form>
        </div>
    );
};
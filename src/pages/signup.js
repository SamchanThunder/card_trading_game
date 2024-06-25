import '../style_sheets/signup.css';
import React, { useState } from "react";
import { auth, db } from '../scripts/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from "firebase/database";
import {  useNavigate  } from 'react-router-dom';
 
export function SignUp(){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function signUp(x){
        if(username.length > 12){
            alert("Username cannot surpass 12 characters.");
            return;
        }else if(username.length < 3){
            alert("Username needs to be at least 3 characters.");
            return;
        }
        x.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            set(ref(db, 'users/' + userCredential.user.uid), {
                username: username,
                won: 1000,
                cards: [],
                date: Date.now(),
            }) 
            console.log("Username is " + username);
            navigate("/card_trading_game");
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div id="signUpBox">
            <form onSubmit={signUp}>
            <div id="signUp">
                <div id="already">Already have an account? <a href="/card_trading_game/signin"><br></br>Sign In</a></div>
                Email
                <input type="email" id="signUpInput" name="myInput" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
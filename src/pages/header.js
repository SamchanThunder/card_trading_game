import Home from '../images/home.svg'
import Door from '../images/door.svg'
import { userSignOut } from '../scripts/authdetails';
import { auth, db } from '../scripts/firebase';
import { useState } from 'react';
import { Navigate } from '../scripts/navigate';
import { ref, get } from "firebase/database";

export function Header() {
    const [currentUsername, setCurrentUsername] = useState('');
    var user = auth.currentUser;
    const { newPage } = Navigate();

    function leaveAccount(){
        newPage("/card_trading_game");
        userSignOut(); 
        window.location.reload();
    }

    if (user != null){
        console.log("signed in!");
        retrieveUsername(user.uid);
        return (
            <div id="headerContainer">
                <div id="usernameDisplay">{currentUsername}</div>
                <header id="mainHeader">
                    <button id="headerButton2" onClick={leaveAccount}>
                        <img src={Door} id="headerHome" alt="Sign Out"/>
                    </button>
                    <button id="headerButton" onClick={() => newPage("/card_trading_game")}>
                        <img src={Home} id="headerHome" alt="Home"/>
                    </button>
                </header>
            </div>
        );
    }else{
        console.log("not logged in");
        return (
            <div id="headerContainer">
                <div id="usernameDisplay">NAME</div>
                <header id="mainHeader">
                    <button id="headerButton2" onClick={() => newPage("/card_trading_game/signup")}>Sign-Up</button>
                    <button id="headerButton2" onClick={() => newPage("/card_trading_game/signin")}>Sign-In</button>
                    <button id="headerButton"  onClick={() => newPage("/card_trading_game")}><img src={Home} id="headerHome" alt="Home"/></button>
                </header>
            </div>
        );
    }

    function retrieveUsername(uid) {
        const userRef = ref(db, 'users/' + uid);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const retrievedUsername = userData.username;
                    setCurrentUsername(retrievedUsername); // Update state with retrieved username
                    console.log("Retrieved username:", retrievedUsername);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error retrieving username:", error);
            });
    }
}
import Home from '../images/home.svg'
import Door from '../images/door.svg'
import Store from '../images/store.svg'
import Storage from '../images/storage.svg'
import Trade from '../images/trade.svg'
import Won from '../images/won.svg'
import { userSignOut } from '../scripts/authdetails';
import { auth, db } from '../scripts/firebase';
import { useState } from 'react';
import { Navigate } from '../scripts/navigate';
import { ref, get } from "firebase/database";

export function Header() {
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentWon, setWon] = useState('');
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
                <header id="leftHeader">
                    <div id="usernameDisplay">{currentUsername}</div>
                    <img src={Won} id="usernameDisplay" alt="Won"/><div id="wonDisplay">{currentWon}</div>
                </header>
                <header id="mainHeader">
                    <button id="headerButton" onClick={() => newPage("/card_trading_game")}>
                        <img src={Trade} id="headerHome" alt="Trade"/>
                    </button>
                    <button id="headerButton" onClick={() => newPage("/card_trading_game/market")}>
                        <img src={Store} id="headerHome" alt="Market"/>
                    </button>
                    <button id="headerButton" onClick={() => newPage("/card_trading_game/inventory")}>
                        <img src={Storage} id="headerHome" alt="Inventory"/>
                    </button>
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
                    const retrievedWon = userData.won;
                    setCurrentUsername(retrievedUsername); 
                    setWon(retrievedWon)
                    console.log("Retrieved username:", retrievedUsername, " Won: ", retrievedWon);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error retrieving username:", error);
            });
    }
}
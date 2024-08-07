import React, { useEffect } from 'react';
import Home from '../images/home.svg';
import Door from '../images/door.svg';
import Store from '../images/store.svg';
import Storage from '../images/storage.svg';
import Trade from '../images/trade.svg';
import Won from '../images/won.svg';
import Auction from '../images/auction.svg'
import { userSignOut } from '../scripts/authdetails';
import { auth, db } from '../scripts/firebase';
import { useState } from 'react';
import { Navigate } from '../scripts/navigate';
import { ref, get, update } from "firebase/database";

export function Header() {
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentWon, setWon] = useState('');
    const [loading, setLoading] = useState(true);
    var user = auth.currentUser;
    const { newPage } = Navigate();

    function leaveAccount(){
        setCurrentUsername('');
        setWon('');
        userSignOut(); 
        newPage("/card_trading_game");
        window.location.reload();
    }
    useEffect(() => {
        if (user) {
            retrieveUsername(user.uid);
        } else {
            setLoading(false); 
        }
    }, [user]);

    if (loading) {
        return <div><font color="white">Loading...</font></div>;
    }

    if (user != null){
        console.log("signed in!");
        return (
            <div id="headerContainer">
                <header id="leftHeader">
                    <div id="usernameDisplay">{currentUsername}</div>
                    <img src={Won} id="usernameDisplay" alt="Won"/><div id="wonDisplay">{currentWon}</div>
                </header>
                <header id="mainHeader">
                    <button id="headerButton" onClick={() => newPage("/card_trading_game/trade")}>
                        <img src={Trade} id="headerHome" alt="Trade"/>
                    </button>
                    <button id="headerButton" onClick={() => newPage("/card_trading_game/auction")}>
                        <img src={Auction} id="headerHome" alt="Auction"/>
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
                <div id="usernameDisplay">CARD TRADING GAME</div>
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

                    const retrievedDate = userData.date;
                    let currentTime = Date.now();
                    if(currentTime > retrievedDate + 1800000){
                        let remainder = Math.floor((currentTime - retrievedDate) / 1800000);
                        currentTime = currentTime - ((currentTime - retrievedDate) %  1800000);
                        console.log("Current time: " + currentTime + ", Past Time: " + retrievedDate + ", Remainder: " + remainder)
                        update(ref(db, 'users/' + user.uid), {
                            date: currentTime,
                            won: parseInt(retrievedWon) + (1000 * remainder),
                        }) 

                        const secondTime = snapshot.val();
                        const secondWon = secondTime.won;
                        setWon(secondWon);
                    } 



                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error retrieving username:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
}
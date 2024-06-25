import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import { auth, db } from '../scripts/firebase'; 
import { TradingUser } from "./tradingUser";
import '../style_sheets/trade.css';

export function Trade() {
    const [currentUID, setUID] = useState([]);
    const [currentWon, setWon] = useState([]);
    const [currentName, setName] = useState([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [showTradingUser, setShowTradingUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState({ uid: "", name: "", won: ""});; 

    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            retrieveData();
        }
    }, [user]);

    useEffect(() => {
        if (selectedUser.won !== "") {
            setShowTradingUser(true);
        } else {
            setShowTradingUser(false);
        }
    }, [selectedUser]);
    
    function retrieveData() {
        const userRef = ref(db, 'users/');
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const usersArray = [];
                    snapshot.forEach((childSnapshot) => {
                        const userData = {
                            uid: childSnapshot.key,
                            ...childSnapshot.val()
                        };
                        usersArray.push(userData);
                    });

                    setUID(usersArray.map(user => user.uid));
                    setWon(usersArray.map(user => user.won));
                    const namesArray = usersArray.map(user => user.username.toUpperCase());
                    setName(namesArray);
                    console.log("Names fetched:", namesArray);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error retrieving users:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        console.log("Current names:", currentName);
    }, [currentName]);

    function renderUsernames() {
        return currentName.map((name, index) => (
            <div className="listUsername" key={index}>{name}</div>
        ));
    }

    if (loading) {
        return <div><font color="white">Loading...</font></div>;
    }

    function enterTrade(x){
        x.preventDefault();
        let UID2 = "";
        let won2 = 0;
        let name2 = username.toUpperCase();
        if(currentName.includes(username.toUpperCase())){
            let indexTwo = currentName.indexOf(username.toUpperCase());
            UID2 = currentUID[indexTwo];
            won2 = currentWon[indexTwo];
            setSelectedUser({ uid: UID2, name: name2, won: won2});
        }else{
            alert("That user does not exist.");
        }
    }

    return (
        <div id="tradeBox">
            <div id="tradeItem">
                <form onSubmit={enterTrade}>
                    <div id="enterName">
                        Enter a username to trade with: <br />
                        <input id="tradeInput" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <button id="tradeButton" >TRADE</button>
                </form>
                <div id="displayNames">
                    <b><u>List of users:</u></b>
                    {renderUsernames()}
                </div>
            </div>
            <div id="tradeItem">
                <div id="tradeReq">Trade Requests:</div>
            </div>

            {showTradingUser && (
                <TradingUser uid2={selectedUser.uid} name2={selectedUser.name} won2={selectedUser.won} />
            )}
        </div>
    );
}

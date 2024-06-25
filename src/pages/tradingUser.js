import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import { auth, db } from '../scripts/firebase'; 
import '../style_sheets/trade.css';

export function TradingUser({uid2,name2,won2}){
    var user = auth.currentUser;
    const [currentCards, setCurrentCards] = useState([]);
    const [currentName, setName] = useState("");
    const [currentUID, setUID] = useState("");

    console.log("2: " + uid2 + name2 + won2);
    useEffect(() => {
    retrieveCard(user.uid);
    }, [])

    useEffect(() => {
        console.log("INFO:", currentCards, currentName, currentUID);
    }, [currentUID]);

    function retrieveCard(uid) {
        const userRef = ref(db, 'users/' + uid);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const retrievedCards = userData.cards;
                    retrievedCards.map(Number);
                    retrievedCards.sort(function(a, b) {
                        return a - b;
                      });
                    if(retrievedCards != null){
                        setCurrentCards(retrievedCards); 
                    }else{
                        setCurrentCards([]);
                    }
                    
                    const retrievedUsername = userData.username;

                    setName(retrievedUsername);
                    setUID(uid);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error retrieving username:", error);
            });
    }

    return(
        <div id="tradingBackground">
            123123
        </div>
    )
}
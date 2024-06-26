import '../style_sheets/market.css';
import React, { useState, useEffect } from "react";
import Pack from '../images/pack.png';
import { mythicCards } from '../scripts/cardDatabase';
import { auth, db } from '../scripts/firebase';
import { ref, get, update } from 'firebase/database';

export function Auction(){
    var user = auth.currentUser;
    const [currentCards, setCurrentCards] = useState([]);
    const [currentWon, setWon] = useState(0);

    useEffect(() => {
        retrieveCard(user.uid);
        }, [])

        function retrieveCard(uid) {
            const userRef = ref(db, 'users/' + uid);
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const rWon = userData.won;
                        console.log(rWon);
                        setWon(rWon);
                        const retrievedCards = userData.cards;
                        if(retrievedCards != null){
                            setCurrentCards(retrievedCards); 
                        }else{
                            setCurrentCards([]);
                        }
                        console.log("Won: " + currentWon);
                   
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error("Error retrieving username:", error);
                });
        }

        return(
            <div>
                
            </div>
        )
}
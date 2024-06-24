import '../style_sheets/storage.css';
import React, { useState, useEffect } from "react";
import { cards } from '../scripts/cardDatabase';
import { auth, db } from '../scripts/firebase';
import { ref, set, get, update } from 'firebase/database';

export function Storage(){
    var user = auth.currentUser;
    const [currentCards, setCurrentCards] = useState([]);

    useEffect(() => {
    retrieveCard(user.uid);
    }, [])

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
               
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error retrieving username:", error);
            });
    }
    return(
        <div id="storageBox">
            {currentCards.map((card, index) => (
                 <div class="storageItem"><img id="imgStorage" key={index} src={require(`../cardImages/${cards[card].image}`)}/><div id="storageText">{cards[card].name}</div></div>
            ))}
        </div>
    )
}
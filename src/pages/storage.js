import '../style_sheets/storage.css';
import React, { useState, useEffect } from "react";
import { cards } from '../scripts/cardDatabase';
import { auth, db } from '../scripts/firebase';
import { ref, set, get, update } from 'firebase/database';

export function Storage(){
    var user = auth.currentUser;
    const [currentCards, setCurrentCards] = useState([]);
    const [currentWon, setWon] = useState(0);
    const [showSell, setShowSell] = useState(false);
    const [sellCardName, setSellCardName] = useState("");
    const [sellCardPrice, setSellCardPrice] = useState("");

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
    function sellCard(cardName){
        setSellCardPrice(1000);
        setSellCardName(cardName);
        setShowSell(true);
    }

    function yesSell(){
        let tempArray = currentCards;
        let ind = tempArray.indexOf(sellCardName)
        tempArray.splice(ind, 1);
        setCurrentCards(tempArray);
        update(ref(db, 'users/' + user.uid), {
            cards: currentCards,
            won: currentWon + sellCardPrice,
        }) 
        window.location.reload();
    }

    function leaveSell(){
        setShowSell(false);
    }
    return(
        <div>
            <div id="storageBox">
                {currentCards.map((card, index) => (
                    <button class="storageItem" onClick={() => sellCard(card)}><img id="imgStorage" key={index} src={require(`../cardImages/${cards[card].image}`)}/><div id="storageText">{cards[card].name}</div></button>
                ))}
            </div>
            {showSell && (
                <div id="sellBackground">
                    Do you want to sell {cards[sellCardName].name} for {sellCardPrice} Won?
                    <div id="sellButtonDiv">
                        <button id="sellYes" onClick={yesSell}>YES</button>
                        <button id="sellNo" onClick={leaveSell}>NO</button>
                    </div>
                </div>
            )}
        </div>
    )
}
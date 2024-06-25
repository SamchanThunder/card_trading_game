import '../style_sheets/market.css';
import React, { useState, useEffect } from "react";
import Pack from '../images/pack.png';
import { cards, bronzeCards, silverCards, goldCards } from '../scripts/cardDatabase';
import { auth, db } from '../scripts/firebase';
import { ref, get, update } from 'firebase/database';

export function Market(){
    var user = auth.currentUser;
    const [currentCards, setCurrentCards] = useState([]);
    const [currentWon, setWon] = useState(0);
    const [showRollingCards, setShowRollingCards] = useState(false);
    const [cardName, setCardName] = useState(0);

    useEffect(() => {
    retrieveCard(user.uid);
    }, [])


    async  function rollBronze() {
        if(currentWon < 1000){
            alert("Not enough won. Think there is a mistake? Try refreshing the page.")
            return;
        }

        setShowRollingCards(true);

        const randomRarity = Math.floor(Math.random() * 100) + 1;
        //70% bronze, 25% silver, 5% gold
        setTimeout(async () => {            
            console.log("Rolled" + " Chance: " + randomRarity);
            let nameObj = "0";
            if(randomRarity <= 70){
                const cardsArray = Object.keys(bronzeCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(bronzeCards)[randomIndex]
            }else if(randomRarity <= 95){
                const cardsArray = Object.keys(silverCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(silverCards)[randomIndex]
            }else{
                const cardsArray = Object.keys(goldCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(goldCards)[randomIndex]
            }
            setCardName(nameObj);
            console.log(nameObj);

            let tempArray = currentCards;
            console.log(tempArray);
            tempArray.push(nameObj);
            setCurrentCards(tempArray);

            update(ref(db, 'users/' + user.uid), {
                cards: currentCards,
                won: currentWon - 1000,
            }) 
        }, 5000); 
    }

    async  function rollSilver() {
        if(currentWon < 5000){
            alert("Not enough won. Think there is a mistake? Try refreshing the page.")
            return;
        }

        setShowRollingCards(true);

        const randomRarity = Math.floor(Math.random() * 100) + 1;
        //10% bronze, 70% silver, 20% gold
        setTimeout(async () => {            
            console.log("Rolled" + " Chance: " + randomRarity);
            let nameObj = "0";
            if(randomRarity <= 70){
                const cardsArray = Object.keys(silverCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(silverCards)[randomIndex]
            }else if(randomRarity <= 80){
                const cardsArray = Object.keys(bronzeCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(bronzeCards)[randomIndex]
            }else{
                const cardsArray = Object.keys(goldCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(goldCards)[randomIndex]
            }
            setCardName(nameObj);
            console.log(nameObj);

            let tempArray = currentCards;
            console.log(tempArray);
            tempArray.push(nameObj);
            setCurrentCards(tempArray);

            update(ref(db, 'users/' + user.uid), {
                cards: currentCards,
                won: currentWon - 5000,
            }) 
        }, 5000); 
    }

    async  function rollGold() {
        if(currentWon < 15000){
            alert("Not enough won. Think there is a mistake? Try refreshing the page.")
            return;
        }

        setShowRollingCards(true);

        const randomRarity = Math.floor(Math.random() * 100) + 1;
        //30% silver, 70% gold
        setTimeout(async () => {            
            console.log("Rolled" + " Chance: " + randomRarity);
            let nameObj = "0";
            if(randomRarity <= 30){
                const cardsArray = Object.keys(silverCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(silverCards)[randomIndex]
            }else{
                const cardsArray = Object.keys(goldCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(goldCards)[randomIndex]
            }
            setCardName(nameObj);
            console.log(nameObj);

            let tempArray = currentCards;
            console.log(tempArray);
            tempArray.push(nameObj);
            setCurrentCards(tempArray);

            update(ref(db, 'users/' + user.uid), {
                cards: currentCards,
                won: currentWon - 15000,
            }) 
        }, 5000); 
    }

    function exit() {
        if(showRollingCards){
            setShowRollingCards(false); 
            setCardName(0);
            window.location.reload();
        }
    }

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
            <div id="marketBox1">
                <img src={Pack} id="marketItem1" alt="Bronze Pack"/>
                <img src={Pack} id="marketItem1" alt="Silver Pack"/>
                <img src={Pack} id="marketItem1" alt="Gold Pack"/>
            </div>
            <div id="marketBox2">
                <button id="marketButton1" onClick={rollBronze}>1000 WON</button>
                <button id="marketButton1" onClick={rollSilver}>5000 WON</button>
                <button id="marketButton1" onClick={rollGold}>15000 WON</button>
            </div>
            {showRollingCards && (<div id="rollingCards">
                <img src={require(`../cardImages/${cards[cardName].image}`)} id="chosenCard" alt="Bronze Pack" className="rotate-image"/>
                <div id="cardName">{cards[cardName].name + " (" + cards[cardName].rarity + ")"}</div>
                <button id="exitMarket" onClick={exit}>X</button>
            </div>)}
        </div>
    )
}
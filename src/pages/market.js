import '../style_sheets/market.css';
import React, { useState, useEffect } from "react";
import Pack from '../images/pack.png';
import commonPack from '../images/commonPack.png';
import rarePack from '../images/rarePack.png';
import epicPack from '../images/epicPack.png';
import legendaryPack from '../images/legendaryPack.png';
import { cards, commonCards, rareCards, epicCards, legendaryCards, mythicCards } from '../scripts/cardDatabase';
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


    async  function rollCommon() {
        if(currentWon < 1000){
            alert("Not enough won. Think there is a mistake? Try refreshing the page.")
            return;
        }

        setShowRollingCards(true);

        const randomRarity = Math.floor(Math.random() * 100) + 1;

        console.log("Rolled" + " Chance: " + randomRarity);
        let nameObj = "0";

        //70% common, 25% rare, 5% epic
        if(randomRarity <= 70){
            const cardsArray = Object.keys(commonCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(commonCards)[randomIndex]
        }else if(randomRarity <= 95){
            const cardsArray = Object.keys(rareCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(rareCards)[randomIndex]
        }else{
            const cardsArray = Object.keys(epicCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(epicCards)[randomIndex]
        }

        let tempArray = currentCards;
        console.log(tempArray);
        tempArray.push(nameObj);
        setCurrentCards(tempArray);

        update(ref(db, 'users/' + user.uid), {
            cards: currentCards,
            won: currentWon - 1000,
        }) 

        setTimeout(async () => {            
            setCardName(nameObj);
            console.log(nameObj);
        }, 5000); 
    }

    async  function rollRare() {
        if(currentWon < 10000){
            alert("Not enough won. Think there is a mistake? Try refreshing the page.")
            return;
        }

        setShowRollingCards(true);

        const randomRarity = Math.floor(Math.random() * 100) + 1;
        //15% common 70% rare 15% epic
        console.log("Rolled" + " Chance: " + randomRarity);
        let nameObj = "0";
        if(randomRarity <= 15){
            const cardsArray = Object.keys(commonCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(commonCards)[randomIndex]
        }else if(randomRarity <= 85){
            const cardsArray = Object.keys(rareCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(rareCards)[randomIndex]
        }else{
            const cardsArray = Object.keys(epicCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(epicCards)[randomIndex]
        }

        let tempArray = currentCards;
        console.log(tempArray);
        tempArray.push(nameObj);
        setCurrentCards(tempArray);

        update(ref(db, 'users/' + user.uid), {
            cards: currentCards,
            won: currentWon - 10000,
        }) 
        setTimeout(async () => {            
            setCardName(nameObj);
            console.log(nameObj);
        }, 5000); 
    }

    async function rollEpic() {
        if(currentWon < 25000){
            alert("Not enough won. Think there is a mistake? Try refreshing the page.")
            return;
        }

        setShowRollingCards(true);

        const randomRarity = Math.floor(Math.random() * 100) + 1;
        //20% rare, 70% epic 10% legendary
        console.log("Rolled" + " Chance: " + randomRarity);
        let nameObj = "0";
        if(randomRarity <= 20){
            const cardsArray = Object.keys(rareCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(rareCards)[randomIndex]
        }else if(randomRarity <= 90){
            const cardsArray = Object.keys(epicCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(epicCards)[randomIndex]
        }else{
            const cardsArray = Object.keys(legendaryCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(legendaryCards)[randomIndex]
        }

        let tempArray = currentCards;
        console.log(tempArray);
        tempArray.push(nameObj);
        setCurrentCards(tempArray);

        update(ref(db, 'users/' + user.uid), {
            cards: currentCards,
            won: currentWon - 25000,
        }) 
        setTimeout(async () => {            
            setCardName(nameObj);
            console.log(nameObj);
        }, 5000); 
    }

    async function rollLegendary() {
        if(currentWon < 100000){
            alert("Not enough won. Think there is a mistake? Try refreshing the page.")
            return;
        }

        setShowRollingCards(true);

        const randomRarity = Math.floor(Math.random() * 100) + 1;
        //20% epic, 80% legendary
        console.log("Rolled" + " Chance: " + randomRarity);
        let nameObj = "0";
        if(randomRarity <= 20){
            const cardsArray = Object.keys(epicCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(epicCards)[randomIndex]
        }else{
            const cardsArray = Object.keys(legendaryCards); 
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            nameObj = Object.keys(legendaryCards)[randomIndex]
        }

        let tempArray = currentCards;
        console.log(tempArray);
        tempArray.push(nameObj);
        setCurrentCards(tempArray);

        update(ref(db, 'users/' + user.uid), {
            cards: currentCards,
            won: currentWon - 100000,
        }) 
        setTimeout(async () => {            
            setCardName(nameObj);
            console.log(nameObj);
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
                <img src={commonPack} id="marketItem1" alt="Common Pack"/>
                <img src={rarePack} id="marketItem1" alt="Rare Pack"/>
                <img src={epicPack} id="marketItem1" alt="Epic Pack"/>
                <img src={legendaryPack} id="marketItem1" alt="Legendary Pack"/>
            </div>
            <div id="marketBox2">
                <button id="marketButton1" onClick={rollCommon}>1000 WON</button>
                <button id="marketButton1" onClick={rollRare}>10000 WON</button>
                <button id="marketButton1" onClick={rollEpic}>25000 WON</button>
                <button id="marketButton1" onClick={rollLegendary}>100000 WON</button>
            </div>
            {showRollingCards && (<div id="rollingCards">
                <img src={require(`../cardImages/${cards[cardName].image}`)} id="chosenCard" alt="Card Pack" className="rotate-image"/>
                <div id="cardName">{cards[cardName].name + " (" + cards[cardName].rarity + ")"}</div>
                <button id="exitMarket" onClick={exit}>X</button>
            </div>)}
        </div>
    )
}
import '../style_sheets/auction.css';
import React, { useState, useEffect } from "react";
import { cards, mythicCards } from '../scripts/cardDatabase';
import { auth, db } from '../scripts/firebase';
import { ref, get, update } from 'firebase/database';
import Pack from '../images/pack.png';

export function Auction(){
    var user = auth.currentUser;
    const [currentCards, setCurrentCards] = useState([]);
    const [currentWon, setWon] = useState(0);
    const [pastDate, setPastDate] = useState(0);
    const [price, setPrice] = useState(0);
    const [sellCard, setSellCard] = useState('0');
    const [cardLoad, setCardLoad] = useState(false);
    const [dateLoad, setDateLoad] = useState(false);

    useEffect(() => {
        retrieveCard(user.uid);
        }, []);
    useEffect(() => {
        getDate();
    }, [cardLoad]);
    useEffect(() => {
        if (dateLoad) {
            getCard();
        }
    }, [dateLoad])
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

                    setCardLoad(true);
                })
                .catch((error) => {
                    console.error("Error retrieving username:", error);
                });
        }

        function getDate(){
            const userRef = ref(db, 'FA/');
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();  
                        const pastDate = userData.Date;
                        const pastPrice = userData.Price;
                        const pastCard = userData.Card;
                        setPastDate(pastDate); 
                        setPrice(pastPrice);
                        setSellCard(pastCard);

                        setDateLoad(true);
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error("Error retrieving username:", error);
                })
        }

        function getCard(){
            const currentTime = Date.now();
            let nameObj = "0";
            if(currentTime <= pastDate + 86400000){
                return;
            }else{
                const randomPrice = Math.floor(Math.random() * 500001) + 500000;
                setPrice(randomPrice);
                const cardsArray = Object.keys(mythicCards); 
                const randomIndex = Math.floor(Math.random() * cardsArray.length);
                nameObj = Object.keys(mythicCards)[randomIndex]
                setSellCard(nameObj);
                
                 // Get the current date and time in UTC
                const now = new Date(currentTime);

                // Calculate the start of the current day in UTC
                const startOfDayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
                update(ref(db, 'FA/'), {
                    Date: startOfDayUTC,
                    Price: randomPrice,
                    Card: nameObj,
                });
            }
        }

        function buyCard(){
            if(currentWon >= price){
                let tempArray = currentCards;
                tempArray.push(sellCard);
                setCurrentCards(tempArray);
                update(ref(db, 'users/' + user.uid), {
                    cards: tempArray,
                    won: currentWon - price,
                }) 

                alert("You bought the card!");
                window.location.reload();
            }else{
                alert("You do not have enough won for that.");
            }
        }

        return(
            <div id="auctionBg">
                <img src={require(`../cardImages/${cards[sellCard].image}`)} id="imgAuction"></img>
                <div id="auctionName">{cards[sellCard].name}</div><br />
                <button id="auctionButton" onClick={buyCard}>Buy for {price} WON</button>
            </div>
        )
}
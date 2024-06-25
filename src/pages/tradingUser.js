import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import { auth, db } from '../scripts/firebase'; 
import { cards } from '../scripts/cardDatabase';
import '../style_sheets/trade.css';

export function TradingUser({uid2,name2,won2,cards2}){
    var user = auth.currentUser;
    const [cards1, setCurrentCards] = useState([]);
    const [name1, setName] = useState("");
    const [won1, setWon] = useState("");
    const [uid1, setUID] = useState("");
    const [tradeCard1, setTradeCard1] = useState([]);
    const [tradeCard2, setTradeCard2] = useState([]);

    console.log("INFO 2: ", uid2, name2, won2, cards2);
    useEffect(() => {
    retrieveCard(user.uid);
    }, [])

    useEffect(() => {
        console.log("INFO 1: ", uid1, name1, won1, cards1);
    }, [uid1]);

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
                    const rWon = userData.won;
                    setWon(rWon);
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

    function reloadPage(){
        window.location.reload();
    }

    function addCardOne(x){
        console.log(x);
    }

    function addCardTwo(x){
        console.log(x);
    }
    return (
        <div id="tradeBox">
            <div id="tradingBackground">
                <div id="tradingSide">
                    <div className="cardsContainer">
                        {cards1.map((card, index) => (
                            <button className="cardsButton" onClick={() => addCardOne(card)} key={index}>
                                <img id="cardsImg" src={require(`../cardImages/${cards[card].image}`)} alt={cards[card].name} />
                                <div id="cardsText">{cards[card].name + " (" +cards[card].rarity + ")"}</div>
                            </button>
                        ))}
                    </div>
                </div>
                <div id="tradingMiddle">
                    <button id="leaveTrade" onClick={reloadPage}>X</button>
                    <br />
                    Amount of Won You Offer:
                    <input id="inputWon"></input><br />
                    Amount of Won You Want:
                    <input id="inputWon"></input>
                    <button id="submitTrade">SEND REQUEST</button>
                </div>
                <div id="tradingSide">
                    <div className="cardsContainer">
                        {cards2.map((card, index) => (
                            <button className="cardsButton" onClick={() => addCardTwo(card)} key={index}>
                                <img id="cardsImg" src={require(`../cardImages/${cards[card].image}`)} alt={cards[card].name} />
                                <div id="cardsText">{cards[card].name + " (" +cards[card].rarity + ")"}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
     
}
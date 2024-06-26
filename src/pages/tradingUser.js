import { ref, get, set } from "firebase/database";
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
    //Keep track which buttons are selected
    const [tradeIndex1, setTradeIndex1] = useState([]);
    const [tradeIndex2, setTradeIndex2] = useState([]);
    //Keep track which cards are selected
    const [tradeCard1, setTradeCard1] = useState([]);
    const [tradeCard2, setTradeCard2] = useState([]);
    //Keep track of how much won offere/wanted
    const [tradeWon1, setTradeWon1] = useState(0);
    const [tradeWon2, setTradeWon2] = useState(0);
    //See if the recipient already has a trade sent
    const [yesTrade, setYesTrade] = useState(false);

    if(!Array.isArray(cards2)){
        cards2 = [];
    }

    useEffect(() => {
        retrieveCard(user.uid);
    }, [])

    useEffect(() => {
        console.log("INFO 1: ", uid1, name1, won1, cards1);
        console.log("INFO 2: ", uid2, name2, won2, cards2);
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

        const tradeUserRef = ref(db, 'trades/' + uid2);
        get(tradeUserRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setYesTrade(true);
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

    function addCardOne(index, cardName){
        setTradeIndex1((prevSelectedCards) => {
            if (prevSelectedCards.includes(index)) {
                let indexOfCard = tradeCard1.indexOf(cardName);
                let tempArray = [...tradeCard1];
                tempArray.splice(indexOfCard, 1)
                console.log(tempArray);
                setTradeCard1(tempArray);
                return prevSelectedCards.filter((id) => id !== index);
            } else {
                let tempArray = [...tradeCard1, cardName];
                console.log(tempArray);
                setTradeCard1(tempArray);
                return [...prevSelectedCards, index];
            }
        });
    }

    function addCardTwo(index, cardName){
        setTradeIndex2((prevSelectedCards) => {
            if (prevSelectedCards.includes(index)) {
                let indexOfCard = tradeCard2.indexOf(cardName);
                let tempArray = [...tradeCard2];
                tempArray.splice(indexOfCard, 1)
                console.log(tempArray);
                setTradeCard2(tempArray);
                return prevSelectedCards.filter((id) => id !== index);
            } else {
                let tempArray = [...tradeCard2, cardName];
                console.log(tempArray);
                setTradeCard2(tempArray);
                return [...prevSelectedCards, index];
            }
        });
    }

    function submitTrade(){
        if(tradeCard1.length === 0 && tradeCard2.length === 0 && tradeWon1 === 0 & tradeWon2 === 0){
            alert("What's a trade request without a trade?");
        }else if(parseInt(won1) < parseInt(tradeWon1)){
            alert("You do not have enough won for this trade.")
        }else if(parseInt(won2) < parseInt(tradeWon2)){
            alert("Recipient does not have enough won for this trade. He has " + won2 + " amount of won.")
        }else if(yesTrade === true){
            alert("The recipient already has a pending trade request. Tell the recipient to accept or decline that request first. A recipient cannot have more than one trade request because I did not want to think of the logic that is needed when the recipient has multiple trade requests. I created this website to practice ReactJS and Databases; I am not practicing how to make a very good trading system.")
        }else{
            set(ref(db, 'trades/' + uid2), {
                uid1: uid1,
                uid2: uid2,
                name1: name1,
                name2: name2,
                cards1: tradeCard1,
                cards2: tradeCard2,
                won1: tradeWon1,
                won2: tradeWon2,
            }) 
            alert("Trade request sent.");
            reloadPage();
        }
    }
    return (
        <div id="tradeBox">
            <div id="tradingBackground">
                <div id="tradingSide">
                    <div className="cardsContainer">
                        {cards1.map((card, index) => (
                            <button className="cardsButton" onClick={() => addCardOne(index, card)} key={index}  style={{backgroundColor: tradeIndex1.includes(index) ? 'rgb(138, 231, 138)' : 'white',}}>
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
                    <input type="number" id="inputWon" onChange={(e) => setTradeWon1(e.target.value)}></input><br />
                    Amount of Won You Want:
                    <input type="number" id="inputWon" onChange={(e) => setTradeWon2(e.target.value)}></input>
                    <button id="submitTrade" onClick={submitTrade}>SEND REQUEST</button>
                </div>
                <div id="tradingSide">
                    <div className="cardsContainer">
                        {cards2.map((card, index) => (
                            <button className="cardsButton" onClick={() => addCardTwo(index, card)} key={index} style={{backgroundColor: tradeIndex2.includes(index) ? 'rgb(138, 231, 138)' : 'white',}}>
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
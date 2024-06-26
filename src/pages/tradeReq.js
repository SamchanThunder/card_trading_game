import { ref, get, update, remove } from "firebase/database";
import { useState, useEffect } from "react";
import { auth, db } from '../scripts/firebase'; 
import { cards } from '../scripts/cardDatabase';
import '../style_sheets/trade.css';

export function TradeReq(){
    var user = auth.currentUser;
    const [cards1, setCards1] = useState([]);
    const [name1, setName1] = useState("");
    const [won1, setWon1] = useState("");
    const [uid1, setUID1] = useState("");

    //Current Users Data
    const [cards2, setCards2] = useState([]);
    const [name2, setName2] = useState("");
    const [won2, setWon2] = useState("");
    const [uid2, setUID2] = useState("");

    //Current Users Data
    const[currentCards1, setCurrentCards1] = useState([]);
    const[currentWon1, setCurrentWon1] = useState(0);

    //Other User Data
    const[currentCards2, setCurrentCards2] = useState([]);
    const[currentWon2, setCurrentWon2] = useState(0);

    useEffect(() =>{
        retrieveData();
    }, [])
    useEffect(() => {
        retrieveData2();
    }, [won2])

    function reloadPage(){
        window.location.reload();
    }

    function areAllElementsInArray(arr1, arr2) {
        return arr1.every(element => arr2.includes(element));
    }

    function modifyArray(arr1, arr2, arr3) {
        if (!Array.isArray(arr3)) {
            arr3 = [];
        }

        // Create a copy of arr3 to avoid mutating the original array
        const modifiedArr3 = [...arr3];
    
        // Remove elements of arr1 from modifiedArr3 (remove only one instance)
        arr1.forEach(element => {
            const indexToRemove = modifiedArr3.indexOf(element);
            if (indexToRemove !== -1) {
                modifiedArr3.splice(indexToRemove, 1);
            }
        });
    
        // Add elements of arr2 to modifiedArr3
        arr2.forEach(element => {
            modifiedArr3.push(element);
        });
    
        return modifiedArr3;
    }

    function retrieveData() {
            let tempUID = "";
            const tradeUserRef = ref(db, 'trades/' + user.uid);
            get(tradeUserRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();

                        const rName1 = userData.name1;
                        const rName2 = userData.name2;
                        const rUid1 = userData.uid1;
                        tempUID = userData.uid1;
                        const rUid2 = userData.uid2;
                        const rCards1 = userData.cards1 ? userData.cards1 : [];;
                        const rCards2 = userData.cards2 ? userData.cards2 : [];;
                        const rWon1 = userData.won1;
                        const rWon2 = userData.won2;

                        setName1(rName1);
                        setName2(rName2);
                        setUID1(rUid1);
                        setUID2(rUid2);
                        setCards1(rCards1);
                        setCards2(rCards2);
                        setWon1(rWon1);
                        setWon2(rWon2);
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error("Error retrieving username:", error);
                });
    }

    function retrieveData2(){
        const userRef1 = ref(db, 'users/' + user.uid);
            get(userRef1)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();

                        const rCard = userData.cards;
                        const rWon = userData.won;

                        setCurrentCards1(rCard);
                        setCurrentWon1(rWon);
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error("Error retrieving username:", error);
                });

            const userRef2 = ref(db, 'users/' + uid1);
            get(userRef2)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();

                        const rCard = userData.cards;
                        const rWon = userData.won;
                        setCurrentCards2(rCard);
                        setCurrentWon2(rWon);
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error("Error retrieving username:", error);
                });
    }

    function rejectTrade(){
        const tradeUserRef = ref(db, 'trades/' + user.uid);
        remove(tradeUserRef)
            .then(() => {
                reloadPage();
            })
    }

    function acceptTrade(){
        if(parseInt(currentWon1) < parseInt(won2)){
            alert("You do not have enough won.");
            return;
        }else if(parseInt(currentWon2) < parseInt(won1)){
            alert(name1 + " does not have enough won.");
            return;
        }else if(!areAllElementsInArray(cards2, currentCards1)){
            console.log(cards2)
            console.log(currentCards1)
            alert("You no longer have the cards to trade.");
            return;
        }else if(!areAllElementsInArray(cards1, currentCards2)){
            alert(name1 + " no longer has the cards to trade.");
            return;
        }else{
            let newCards = modifyArray(cards2, cards1, currentCards1);
            update(ref(db, 'users/' + user.uid), {
                cards: newCards,
                won: parseInt(currentWon1) - parseInt(won2) + parseInt(won1),
            }) 

            let newCards2 = modifyArray(cards1, cards2, currentCards2);
            update(ref(db, 'users/' + uid1), {
                cards: newCards2,
                won: parseInt(currentWon2) - parseInt(won1) + parseInt(won2),
            }) 
            alert("Trade accepted!");
            const tradeUserRef = ref(db, 'trades/' + user.uid);
            remove(tradeUserRef)
                .then(() => {
                    reloadPage();
                })
        }
    }
    return (
        <div id="tradeBox">
            <div id="tradingBackground">
                <div id="tradingSide">
                    <div id="reqTitleOffer"><u>Your Offer: </u></div>
                    <div className="cardsContainer">
                        {cards2.map((card, index) => (
                            <button className="cardsButton" key={index}>
                                <img id="cardsImg" src={require(`../cardImages/${cards[card].image}`)} alt={cards[card].name} />
                                <div id="cardsText">{cards[card].name + " (" +cards[card].rarity + ")"}</div>
                            </button>
                        ))}
                    </div>
                </div>
                <div id="tradingMiddle">
                    <button id="leaveTrade" onClick={reloadPage}>X</button>
                    <br />
                    Amount of Won {name1} Wants: <u>{won2}</u><br />
                    Amount of Won {name1} Gives: <u>{won1}</u>
                    <button id="submitTrade2" onClick={rejectTrade}>REJECT TRADE</button>
                    <button id="submitTrade1" onClick={acceptTrade}>ACCEPT TRADE</button>
                </div>
                <div id="tradingSide">
                <div id="reqTitleOffer"><u>{name1}'s Offer: </u></div>
                    <div className="cardsContainer">
                        {cards1.map((card, index) => (
                            <button className="cardsButton" key={index}>
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
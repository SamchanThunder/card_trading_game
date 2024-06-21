import Home from '../images/home.svg'
import Door from '../images/door.svg'
import { userSignOut } from '../scripts/authdetails';
import { auth } from '../scripts/firebase';
import { useNavigate } from 'react-router-dom';
import { Navigate } from '../scripts/navigate';

export function Header() {
    var user = auth.currentUser;
    const { newPage } = Navigate();

    function leaveAccount(){
        newPage("/card_trading_game");
        userSignOut(); 
        window.location.reload();
    }

    if (user != null){
        console.log("signed in!");
        return (
            <header id="mainHeader">
                <button id="headerButton" onClick={() => newPage("/card_trading_game")}><img src={Home} id="headerHome" alt="Home"/></button>
                <button id="headerButton2" onClick={leaveAccount}><img src={Door} id="headerHome" alt="Sign Out"/></button>
            </header>
        );
    }else{
        console.log("not logged in");
        return (
            <header id="mainHeader">
                <button id="headerButton"  onClick={() => newPage("/card_trading_game")}><img src={Home} id="headerHome" alt="Home"/></button>
                <button id="headerButton2" onClick={() => newPage("/card_trading_game/signin")}>Sign-In</button>
                <button id="headerButton2" onClick={() => newPage("/card_trading_game/signup")}>Sign-Up</button>
            </header>
        );
    }
}
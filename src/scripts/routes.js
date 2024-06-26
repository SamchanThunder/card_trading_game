import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header } from '../pages/header';
import { StartPage } from '../pages/startpage';
import { SignUp } from '../pages/signup.js'
import { SignIn } from '../pages/signin.js';
import { Market } from '../pages/market.js';
import { Storage } from '../pages/storage.js';
import { Trade } from '../pages/trade.js';
import { Auction } from '../pages/auction.js';
import { AuthProvider } from "../scripts/auth.js";

export function RouteFunction(){
    return(
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/card_trading_game" element={<StartPage />}/>
                    <Route path="/card_trading_game/signup" element={<SignUp/>}/>
                    <Route path="/card_trading_game/signin" element={<SignIn/>}/>
                    <Route path="/card_trading_game/market" element={<Market/>}/>
                    <Route path="/card_trading_game/inventory" element={<Storage/>}/>
                    <Route path="/card_trading_game/trade" element={<Trade/>}/>
                    <Route path="/card_trading_game/auction" element={<Auction/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}
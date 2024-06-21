import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header } from '../pages/header';
import { StartPage } from '../scripts/startpage';
import {SignUp} from '../pages/signup.js'
import {SignIn} from '../pages/signin.js';
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
                </Routes>
            </Router>
        </AuthProvider>
    )
}
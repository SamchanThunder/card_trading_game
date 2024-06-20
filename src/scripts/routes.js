import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { StartPage } from '../scripts/startpage';
import {SignUp} from '../pages/signup.js'
import {SignIn} from '../pages/signin.js';

export function RouteFunction(){
    return(
        <Router>
            <Routes>
                <Route path="/card_trading_game" element={<StartPage />}/>
                <Route path="/card_trading_game/signup" element={<SignUp/>}/>
                <Route path="/card_trading_game/signin" element={<SignIn/>}/>
            </Routes>
        </Router>
    )
}
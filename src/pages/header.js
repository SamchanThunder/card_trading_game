import Home from '../images/home.svg'
import { userSignOut } from '../scripts/authdetails';
export function Header() {
    return (
        <header id="mainHeader">
            <button id="headerButton"><img src={Home} id="headerHome" alt="Home" onClick={userSignOut}/></button>
        </header>
    );
}
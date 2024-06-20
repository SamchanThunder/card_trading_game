import Home from '../images/home.svg'
export function Header() {
    return (
        <header id="mainHeader">
            <button id="headerButton"><img src={Home} id="headerHome" alt="Home"/></button>
        </header>
    );
}
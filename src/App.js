import { RouteFunction } from './scripts/routes';
import { Header } from './pages/header';
import { AuthDetails } from './scripts/authdetails';
import {isMobile} from 'react-device-detect';
import './App.css';

function App() {
  if(isMobile){
    alert("This game is meant to be played on the computer. Turn your phone horizontal for best gameplay.")
  }
  return (
    <div>
      <RouteFunction />
      <AuthDetails />
    </div>
  );
}

export default App;

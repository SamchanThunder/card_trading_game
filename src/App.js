import { RouteFunction } from './scripts/routes';
import { Header } from './pages/header';
import { AuthDetails } from './scripts/authdetails';
import {isMobile} from 'react-device-detect';
import './App.css';

function App() {
  if(isMobile){
    alert("The game does not function on mobile. Please play it on your computer.")
  }
  return (
    <div>
      <RouteFunction />
      <AuthDetails />
    </div>
  );
}

export default App;

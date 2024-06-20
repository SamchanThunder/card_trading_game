import { RouteFunction } from './scripts/routes';
import { Header } from './pages/header';
import { AuthDetails } from './scripts/authdetails';
import './App.css';

function App() {

  return (
    <div>
      <Header />
      <RouteFunction />
      <AuthDetails />
    </div>
  );
}

export default App;

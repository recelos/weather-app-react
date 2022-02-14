import './App.css';
import React, {useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import SplashScreen from './components/entry-screen/SplashScreen';
import WeatherScreen from './components/WeatherScreen';


function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  return (
    <div className="App">      
      {showSplashScreen ?    
        <SplashScreen handleClick = {() => setShowSplashScreen(!showSplashScreen)}/>
      :
        <WeatherScreen handleExitClick = {() => setShowSplashScreen(!showSplashScreen)}/>
      }
    </div>
  );
}

export default App;

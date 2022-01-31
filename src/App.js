import './App.css';
import React, {useState} from 'react';
import SplashScreen from './entry-screen/SplashScreen';
import WeatherScreen from './WeatherScreen';


function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  return (
    <div className="App">      
      {showSplashScreen ?
        <SplashScreen handleClick = {() => setShowSplashScreen(false)}/>
      :
        <WeatherScreen handleExitClick = {() => setShowSplashScreen(true)}/>
      }
    </div>
  );
}

export default App;

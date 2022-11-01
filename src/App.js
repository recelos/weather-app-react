import "./App.css";
import React, { useState, useEffect } from "react";
import SplashScreen from "./components/entry-screen/SplashScreen";
import WeatherScreen from "./components/WeatherScreen";

export default function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator
    .geolocation
    .getCurrentPosition(success, error);

    console.log()

    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, [])

  return (
    <div className="App">
      {showSplashScreen && coords 
      ? <SplashScreen /> 
      : <WeatherScreen coords = {coords}/>}
    </div>
  );
  function success(pos) {
    setCoords(pos.coords);
  }
  function error(){
    let londonCoords = { 
      lat: 51.50853,
      lon: -0.12574
    };
    setCoords(londonCoords);
  }
}
import React from "react";
import "./SplashScreen.css";

function SplashScreen(){
    return(
        <div className="SplashScreen">
            <img 
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Emoji_u2600.svg/480px-Emoji_u2600.svg.png'} 
            className="SplashScreen-logo" 
            alt="logo" />
            <h1>Weather app</h1>
            <h4>powered by <a href="https://openweathermap.org/api" target="_blank">OpenWeather</a></h4>
        </div>        
    );
}

export default SplashScreen;
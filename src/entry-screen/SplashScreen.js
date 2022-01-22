import React from "react";
import ScrollDown from "./ScrollDown";
import "./SplashScreen.css";

function SplashScreen(){
    return(
        <div className="SplashScreen">
            <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Emoji_u2600.svg/480px-Emoji_u2600.svg.png'} 
            className="SplashScreen-logo" 
            alt="logo" />
            <h1>Weather app</h1>
            <h4>By <a href="https://github.com/recelos/" target="_blank">Jakub Grelowski</a></h4>
            <ScrollDown />
        </div>        
  );
}

export default SplashScreen;
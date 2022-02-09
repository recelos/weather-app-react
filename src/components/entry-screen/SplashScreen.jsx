import React from "react";
import "./SplashScreen.css";

function SplashScreen(props){
    return(
        <div className="SplashScreen">
            <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Emoji_u2600.svg/480px-Emoji_u2600.svg.png'} 
            className="SplashScreen-logo" 
            alt="logo" />
            <h1>Weather app</h1>
            <h4>by <a href="https://github.com/recelos/" target="_blank">Jakub Grelowski</a></h4>
            <button onClick={props.handleClick}> What's the weather like?</button>
        </div>        
    );
}

export default SplashScreen;
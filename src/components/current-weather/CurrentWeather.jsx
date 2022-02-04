import React from "react";
import "./CurrentWeather.css";

function CurrentWeather(props){
    const city  = props.city;
    const temp  = props.temperature;
    const desc  = props.description.charAt(0).toUpperCase() + props.description.slice(1); 
    const press = props.pressure;
    const imageSource = props.imageSource;
    const onClick = props.onClick;
    return(
            <div className="CurrentWeather" onClick={onClick}>
                <h1>{city}</h1>
                <img src={`../icons/${imageSource}.png`} alt={imageSource} /> <hr />
                <h4>{desc}</h4><hr />
                <h4>{temp}&deg;C</h4><hr />
                <h4>{press}hPa</h4>
                <img src={"../util/primary-20px.png"} alt=""/>
            </div>
    );
}
export default CurrentWeather;
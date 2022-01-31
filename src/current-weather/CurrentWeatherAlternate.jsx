import React from "react";
import "./CurrentWeather.css";

function CurrentWeatherAlternate(props){
    const city = props.city;
    const imageSource = props.imageSource;
    const hum = props.humidity;
    const sunrise = ((new Date(props.sunrise*1000).getHours() < 10) ? 
    '0' + new Date(props.sunrise*1000).getHours() 
    : new Date(props.sunrise*1000).getHours())
    + ":" + 
    ((new Date(props.sunrise*1000).getMinutes() < 10) ?
    '0' + new Date(props.sunrise*1000).getMinutes() 
    : new Date(props.sunrise*1000).getMinutes());

    const sunset = ((new Date(props.sunset*1000).getHours() < 10) ? 
    '0' + new Date(props.sunset*1000).getHours() 
    : new Date(props.sunset*1000).getHours())
    + ":" + 
    ((new Date(props.sunset*1000).getMinutes() < 10) ?
    '0' + new Date(props.sunset*1000).getMinutes() 
    : new Date(props.sunset*1000).getMinutes());

    const changeCurrentWeatherCard = props.onClick;

    return(
            <div className="CurrentWeather" onClick={changeCurrentWeatherCard}>
                <h1>{city}</h1>
                <img src={`../icons/${imageSource}.png`} alt={imageSource} /> <hr />
                <h4>Humidity: {hum}%</h4><hr />
                <h4>Sunrise: {sunrise}</h4><hr />
                <h4>Sunset: {sunset}</h4>
                <img src="../util/secondary-20px.png" />
            </div>
    );
}
export default CurrentWeatherAlternate;

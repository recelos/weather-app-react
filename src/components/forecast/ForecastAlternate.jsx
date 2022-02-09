import React from "react";
import "./Forecast.css"

function ForecastAlternate(props){
    const day           = props.day;
    const imageSource   = props.imageSource;
    const onClick       = props.onClick;
    const hum           = props.hum;

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

    return(
            <div style={{width:'14rem'}} className="Forecast" onClick={onClick}>
                <h2>{day}</h2>
                <img src={`../icons/${imageSource}.png`} alt={imageSource} /> <hr />
                <h4>Humidity: {hum}%</h4><hr />
                <h4>Sunrise: {sunrise}</h4><hr />
                <h4>Sunset: {sunset}</h4>
                <img src="../util/secondary-20px.png" />
            </div>
    );
}
export default ForecastAlternate;
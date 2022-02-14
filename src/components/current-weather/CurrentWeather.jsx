import React from "react";
import "./CurrentWeather.css";

function CurrentWeather(props){

    const city          = props.city;
    const temp          = props.temperature;
    const desc          = props.description.charAt(0).toUpperCase() + props.description.slice(1); 
    const press         = props.pressure;
    const imageSource   = props.imageSource;
    const hum           = props.humidity;
    const alternate     = props.alternate; 
    const onClick       = props.onClick;

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
            <div className="CurrentWeather" onClick={onClick}>
                <h1>{city}</h1>
                <img src={`../icons/${imageSource}.png`} alt={imageSource} /> <hr />
                <h4>{alternate ? `Humidity: ${hum}%` : desc}</h4><hr />
                <h4>{alternate ? `Sunrise: ${sunrise}` : `${temp}\u00B0C`}</h4><hr />
                <h4>{alternate ? `Sunset: ${sunset}` : `${press}hPa`}</h4>
                <img src={alternate ? "../util/secondary-20px.png" : "../util/primary-20px.png"} alt=""/>
            </div>
    );
}
export default CurrentWeather;
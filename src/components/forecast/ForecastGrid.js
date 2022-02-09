import React, {useEffect, useState} from "react";
import Forecast from "./Forecast";
import ForecastAlternate from "./ForecastAlternate";
import "./ForecastGrid.css";

function ForecastGrid(props){
    const [isAlternate, setIsAlternate] = useState([false, false, false, false, false]);

    const handleClick = (index) => {
        let newArray = [...isAlternate];
        newArray[index] = !newArray[index];
        setIsAlternate(newArray);
    }

    useEffect(() => {
        let newArray = [false, false, false, false, false];
        setIsAlternate(newArray);
    }, [props.forecast]);

    const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const forecasts = props.forecast.filter((element, i) => {
        return i > 0 && i < 7;
    });

    return(
        <div className="ForecastGrid">
                {forecasts.map((forecast, i)=>{
                    return(
                        !isAlternate[i] ? 
                        (
                            <Forecast
                                key = {i}
                                id = {i}
                                day = {weekday[new Date(forecast.dt*1000).getDay()]}
                                temp = {forecast.temp['day']}
                                desc = {forecast.weather[0].description}
                                press = {forecast.pressure}
                                imageSource = {forecast.weather[0].icon}
                                onClick = {() => handleClick(i)}
                            />
                        )
                        :
                        (
                            <ForecastAlternate
                                key = {i}
                                id = {i}
                                day = {weekday[new Date(forecast.dt*1000).getDay()]}
                                imageSource = {forecast.weather[0].icon}
                                hum = {forecast.humidity}
                                sunrise = {forecast.sunrise + props.timezone_offset}
                                sunset = {forecast.sunset + props.timezone_offset}
                                onClick = {() => handleClick(i)}
                            />
                        )
                    );
                })}
        </div>
    );
}

export default ForecastGrid;
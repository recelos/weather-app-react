import React, {useEffect, useState} from "react";
import Forecast from "./Forecast";
import "./ForecastGrid.css";

const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function ForecastGrid(props){
    const [isAlternate, setIsAlternate] = useState([false, false, false, false, false, false]);

    const handleClick = (index) => {
        let newArray = [...isAlternate];
        newArray[index] = !newArray[index];
        setIsAlternate(newArray);
    }

    useEffect(() => {
        let newArray = [false, false, false, false, false, false];
        setIsAlternate(newArray);
    }, [props.forecast]);
    

    const forecasts = props.forecast.filter((element, i) => {
        return i > 0 && i < 7;
    });

    return(
        <div className="ForecastGrid">
            {
                forecasts.map((forecast, i) => {
                    return(
                        <Forecast
                            key = {i}
                            id = {i}
                            day = {weekday[new Date(forecast.dt*1000).getDay()]}
                            temp = {forecast.temp['day']}
                            desc = {forecast.weather[0].description}
                            press = {forecast.pressure}
                            imageSource = {forecast.weather[0].icon}
                            hum = {forecast.humidity}
                            sunrise = {forecast.sunrise + props.timezone_offset}
                            sunset = {forecast.sunset + props.timezone_offset}
                            alternate = {isAlternate[i]}
                            onClick = {() => handleClick(i)}
                        />
                    )}
                )
            }
        </div>
    );
}
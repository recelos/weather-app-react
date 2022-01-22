import React, {useEffect, useState} from "react";
import Forecast from "./Forecast";
import {Container, Row, Col} from "react-bootstrap";
import ForecastAlternate from "./ForecastAlternate";

import "./ForecastGrid.css";

function ForecastGrid(props){

    const [isAlternate, setIsAlternate] = useState([false, false, false, false, false])


    const handleClick = (index) => {
        let newArray = [...isAlternate];
        newArray[index] = !newArray[index];
        setIsAlternate(newArray);
    }

    useEffect(() => {
        let newArray = [false,false,false,false,false];
        setIsAlternate(newArray);

    }, [props.forecast]);
    

    const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const forecasts = props.forecast.filter((element, i, array) => {
        return i > 0 && i < 6;
    });
    return(
            <div className="ForecastGrid">
                        {forecasts.map((forecast, index, arr)=>{
                            return(
                                    !isAlternate[index] ? 
                                    <Forecast
                                        key = {index}
                                        id = {index}
                                        day = {weekday[new Date(forecast.dt*1000).getDay()]}
                                        temp = {forecast.temp['day']}
                                        desc = {forecast.weather[0].description}
                                        press = {forecast.pressure}
                                        imageSource = {forecast.weather[0].icon}
                                        onClick = {() => handleClick(index)}
                                    />
                                    :
                                    <ForecastAlternate
                                        key = {index}
                                        id = {index}
                                        day = {weekday[new Date(forecast.dt*1000).getDay()]}
                                        imageSource = {forecast.weather[0].icon}
                                        hum = {forecast.humidity}
                                        sunrise = {forecast.sunrise + props.timezone_offset}
                                        sunset = {forecast.sunset + props.timezone_offset}
                                        onClick = {() => handleClick(index)}
                                    />
                        );
                    })}
            </div>
    );
}

export default ForecastGrid;
import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import CurrentWeather from './current-weather/CurrentWeather';
import CurrentWeatherAlternate from './current-weather/CurrentWeatherAlternate';
import ForecastGrid from './forecast/ForecastGrid';
import {IoIosExit} from 'react-icons/io'
import './WeatherScreen.css'


const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;


function WeatherScreen(props) {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [city, setCity] = useState('');
    const [isAlternateCurrentWeather, setIsAlternateCurrentWeather] = useState(false);
    
    useEffect(() => {
        async function fetchData(latitude, longitude){
            const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            if (currentWeatherResponse.status!==200) return;
            const currentWeatherJson = await currentWeatherResponse.json();
        
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely&appid=${apiKey}`);
            if (forecastResponse.status!==200) return;
            const forecastJson = await forecastResponse.json();
            console.log('fetched data')
    
            setCurrentWeather(currentWeatherJson);
            setForecast(forecastJson);
        }
    
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude, longitude} = position.coords;
            fetchData(latitude, longitude);
            }, () => {
            fetchData(51.50853,-0.12574);
            })
        }

        return () => {
            document.title = 'Weather app';
        }
    }, []);
    
    useEffect(() => {
        if(currentWeather===null) {
            document.title = "Loading..";
        } else {
            document.title = `Weather in ${currentWeather.name}`;
        }
        setIsAlternateCurrentWeather(false);
    }, [currentWeather]);
    
    const handleInput = function(event) {
        setCity(event.target.value);
    }
    
    
    const handleClick = () => {
        async function fetchData(){
            const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (currentWeatherResponse.status!==200) {
                alert('Please enter a valid location');
                return;
            };
            const currentWeatherJson = await currentWeatherResponse.json();

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherJson.coord.lat}&lon=${currentWeatherJson.coord.lon}&exclude=current,hourly,minutely&appid=${apiKey}`)
            if (forecastResponse.status!==200) {
                alert('Please enter a valid location');
                return;                
            };
            const forecastJson = await forecastResponse.json();

            console.log('fetched data');

            setCurrentWeather(currentWeatherJson);
            setForecast(forecastJson);
        }
        if(city === '') {
            alert('Please enter the city');
            return
        };
        fetchData();
    }
    
    
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleClick();
        }
    }
    
    return(
        <div className='WeatherScreen'>

            <IoIosExit
                className='icon' 
                onClick={props.handleExitClick} 
                style={{color:'#fff', position:'absolute', left:'20px', right:'0', width:'3rem', height:'3rem'}}  
                onMouseOver={({target})=>target.style.color="lightGrey"}
                onMouseOut={({target})=>target.style.color="white"}
                />


            {!isAlternateCurrentWeather ?
                (currentWeather &&
                    <CurrentWeather
                    city={currentWeather.name}
                    description={currentWeather.weather[0].description}
                    temperature={Math.round(parseFloat(currentWeather.main.temp) - 273.15)}
                    pressure={currentWeather.main.pressure}
                    imageSource={currentWeather.weather[0].icon}
                    onClick={() => setIsAlternateCurrentWeather(!isAlternateCurrentWeather)}  
                    />
                    )
                    :
                    (currentWeather && 
                    <CurrentWeatherAlternate
                    city={currentWeather.name}
                    description={currentWeather.weather[0].description}
                    imageSource={currentWeather.weather[0].icon}
                    humidity={currentWeather.main.humidity}
                    sunset={currentWeather.sys.sunset+currentWeather.timezone}
                    sunrise={currentWeather.sys.sunrise+currentWeather.timezone}
                    onClick={() => setIsAlternateCurrentWeather(!isAlternateCurrentWeather)}
                    />
                    )
                }


                <input className='input' placeholder='e.g. London' onInput={handleInput} onKeyPress={handleKeyPress} />
                <button className='btn' onClick={handleClick}>Submit</button>  
                {forecast &&
                <ForecastGrid 
                    forecast = {forecast.daily}
                    timezone_offset = {forecast.timezone_offset}
                />
            }
        </div>
    )
}
export default WeatherScreen;
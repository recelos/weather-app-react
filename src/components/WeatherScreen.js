import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import CurrentWeather from './current-weather/CurrentWeather';
import './current-weather/CurrentWeather.css'
import ForecastGrid from './forecast/ForecastGrid';
import './WeatherScreen.css'


const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;


function WeatherScreen(props) {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [city, setCity] = useState('');
    const [alternateCurrentWeather, setAlternateCurrentWeather] = useState(false);
    const [showComponents, setShowComponents] = useState(false);


    useEffect(() => {
        async function fetchData(latitude, longitude){
            const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            if (currentWeatherResponse.status!==200) return;
            const currentWeatherJson = await currentWeatherResponse.json();
        
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely&appid=${apiKey}`);
            if (forecastResponse.status!==200) return;
            const forecastJson = await forecastResponse.json();
            console.log('fetched data')

            setShowComponents(false);  
            
            setCurrentWeather(currentWeatherJson);
            setForecast(forecastJson);
            setShowComponents(true);


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
    setAlternateCurrentWeather(false);
    }, [currentWeather]);
    
    const handleInput = function(event) {
        setCity(event.target.value);
    }
    
    
    const handleClick = () => {
        async function fetchData(){
            const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (currentWeatherResponse.status!==200) {
                alert('Please enter a valid location.');
                return;
            };
            const currentWeatherJson = await currentWeatherResponse.json();

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherJson.coord.lat}&lon=${currentWeatherJson.coord.lon}&exclude=current,hourly,minutely&appid=${apiKey}`)
            if (forecastResponse.status!==200) {
                alert('Please enter a valid location.');
                return;                
            };
            const forecastJson = await forecastResponse.json();

            console.log('fetched data');
            setShowComponents(false);  


            setTimeout(() => {
                setCurrentWeather(currentWeatherJson);
                setForecast(forecastJson);

                setShowComponents(true);
            }, 500);
                

        }
        if(city === '') {
            alert('Please enter the city.');
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

                <div className='header' onClick={props.handleExitClick}>
                    <img 
                        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Emoji_u2600.svg/80px-Emoji_u2600.svg.png'} 
                        className="logo" 
                        alt="logo" />
                    <span>Weather app</span>
                </div>

                    {currentWeather &&
                    <CSSTransition
                        in={showComponents}
                        classNames="transition"
                        timeout={500}
                    >

                    <CurrentWeather
                        city={currentWeather.name}
                        description={currentWeather.weather[0].description}
                        temperature={Math.round(parseFloat(currentWeather.main.temp) - 273.15)}
                        pressure={currentWeather.main.pressure}
                        imageSource={currentWeather.weather[0].icon}
                        humidity={currentWeather.main.humidity}
                        sunset={currentWeather.sys.sunset+currentWeather.timezone}
                        sunrise={currentWeather.sys.sunrise+currentWeather.timezone}
                        alternate={alternateCurrentWeather}
                        onClick={() => setAlternateCurrentWeather(!alternateCurrentWeather)}     
                    />
                    </CSSTransition>
                    }

                <input className='input' placeholder='e.g. London' onInput={handleInput} onKeyPress={handleKeyPress} />
                <button className='btn' onClick={handleClick}>Submit</button>  
                {forecast &&
                <CSSTransition
                    in={showComponents}
                    classNames="transition"
                    timeout={500}
                >
                <ForecastGrid 
                    forecast = {forecast.daily}
                    timezone_offset = {forecast.timezone_offset}
                />
                </CSSTransition>
            }
        </div>
    )
}
export default WeatherScreen;
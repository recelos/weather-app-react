import './App.css';
import CurrentWeather from "./current-weather/CurrentWeather"
import CurrentWeatherAlternate from './current-weather/CurrentWeatherAlternate';
import React, {useState, useEffect} from 'react';
import SplashScreen from './entry-screen/SplashScreen';
import {batch, ScrollContainer, ScrollPage, Animator, Fade, StickyIn, ZoomOut, FadeIn, MoveIn, Sticky, MoveOut, ZoomIn, Zoom} from 'react-scroll-motion';
import ForecastGrid from './forecast/ForecastGrid';
const apiKey = process.env.REACT_APP_API_KEY;


function App() {
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

      setCurrentWeather(currentWeatherJson);

      setForecast(forecastJson);
    }

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude, longitude} = position.coords;
        fetchData(latitude, longitude);

      }, () => {
        fetchData(0,0);
      })
    }

  }, []);

  useEffect(() => {
    if(currentWeather===null) {
      document.title = "Loading.."
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
      const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'5ac551a55737eb30da07eae07eab3ae7'}`);
      if (currentWeatherResponse.status!==200) return;

      const currentWeatherJson = await currentWeatherResponse.json();
      setCurrentWeather(currentWeatherJson);
      console.log(currentWeatherJson);

      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherJson.coord.lat}&lon=${currentWeatherJson.coord.lon}&exclude=current,hourly,minutely&appid=${'5ac551a55737eb30da07eae07eab3ae7'}`)

      if(forecastResponse.status!==200) return;

      const forecastJson = await forecastResponse.json();
      setForecast(forecastJson);
    }

    if(city === '') return;

    fetchData();
  }


  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleClick();
    }
  }

  return (
    <div className="App">
       <ScrollContainer> 
        <ScrollPage page={0}>
          <Animator animation={batch(Sticky(), Fade(), ZoomOut(), MoveOut(0, -1000))}>
            <SplashScreen />
          </Animator>
        </ScrollPage>

        <ScrollPage page={1}>
          <Animator animation={batch(StickyIn(), FadeIn(), MoveIn(0, 800), ZoomOut())}>
            {!isAlternateCurrentWeather ?
              currentWeather &&
              <CurrentWeather
              city={currentWeather.name}
              description={currentWeather.weather[0].description}
              temperature={Math.round(parseFloat(currentWeather.main.temp) - 273.15)}
              pressure={currentWeather.main.pressure}
              imageSource={currentWeather.weather[0].icon}
              onClick={() => setIsAlternateCurrentWeather(!isAlternateCurrentWeather)}  
              />
              :
              currentWeather && 
              <CurrentWeatherAlternate
              city={currentWeather.name}
              description={currentWeather.weather[0].description}
              imageSource={currentWeather.weather[0].icon}
              humidity={currentWeather.main.humidity}
              sunset={currentWeather.sys.sunset+currentWeather.timezone}
              sunrise={currentWeather.sys.sunrise+currentWeather.timezone}
              onClick={() => setIsAlternateCurrentWeather(!isAlternateCurrentWeather)}
              />}
              <input className='input' placeholder='e.g. London' onInput={handleInput} onKeyPress={handleKeyPress} />
              <button className='btn' onClick={handleClick}>Submit</button>
            {forecast &&
            <ForecastGrid 
              forecast = {forecast.daily}
              timezone_offset = {forecast.timezone_offset}
              />}
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
}

export default App;

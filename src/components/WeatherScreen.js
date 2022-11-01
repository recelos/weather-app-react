import React, { useState, useEffect } from "react";
import { fetchCurrentWeatherData, fetchCurrentWeatherDataWithCoords, fetchForecastData } from "./DataFunctions.js";
import { CSSTransition } from "react-transition-group";
import CurrentWeather from "./current-weather/CurrentWeather";
import "./current-weather/CurrentWeather.css";
import ForecastGrid from "./forecast/ForecastGrid";
import "./WeatherScreen.css";

const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

function WeatherScreen(props) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [alternateCurrentWeather, setAlternateCurrentWeather] = useState(false);
  const [showComponents, setShowComponents] = useState(false);


  
  
  useEffect(() => {
    async function fetchData(){

      if(props.coords===null) return;

      let currentWeatherJson = await fetchCurrentWeatherDataWithCoords(props.coords.longitude, props.coords.latitude, apiKey);

      console.log(currentWeatherJson)

      let forecastJson = await fetchForecastData(
        currentWeatherJson.coord.lat,
        currentWeatherJson.coord.lon,
        apiKey
      );
  
      setTimeout(() => {
        setCurrentWeather(currentWeatherJson);
        setForecast(forecastJson);
        setShowComponents(true);
      }, 500);
    }
    console.log(props);

    fetchData();

    return () => {
      document.title = "Weather app";
    };
  }, [props]);

  useEffect(() => {
    if (currentWeather === null) {
      document.title = "Loading..";
    } else {
      document.title = `Weather in ${currentWeather.name}`;
    }
    setAlternateCurrentWeather(false);
  }, [currentWeather]);

  const handleInput = function (event) {
    setCity(event.target.value);
  };

  const handleClick = async () => {
    if (city === "") {
      alert("Please enter the city.");
      return;
    }
    let currentWeatherJson = await fetchCurrentWeatherData(city, apiKey);

    if (currentWeatherJson.cod === 404) {
      alert("Please enter a valid location");
      return;
    } else if (currentWeather.cod !== 200) {
      console.log(`error code = ${currentWeather.cod}`);
      console.log(`message = ${currentWeather.message}`);
      alert("An error has occured");
      return;
    }

    let forecastJson = await fetchForecastData(
      currentWeatherJson.coord.lat,
      currentWeatherJson.coord.lon,
      apiKey
    );

    setShowComponents(false);

    setTimeout(() => {
      setCurrentWeather(currentWeatherJson);
      setForecast(forecastJson);
      setShowComponents(true);
    }, 500);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="WeatherScreen">
      <div className="header">
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Emoji_u2600.svg/80px-Emoji_u2600.svg.png"
          }
          className="logo"
          alt="logo"
        />
        <span>Weather app</span>
      </div>

      {currentWeather && (
        <CSSTransition
          in={showComponents}
          classNames="transition"
          timeout={500}
        >
          <CurrentWeather
            city={currentWeather.name}
            description={currentWeather.weather[0].description}
            temperature={Math.round(
              parseFloat(currentWeather.main.temp) - 273.15
            )}
            pressure={currentWeather.main.pressure}
            imageSource={currentWeather.weather[0].icon}
            humidity={currentWeather.main.humidity}
            sunset={currentWeather.sys.sunset + currentWeather.timezone}
            sunrise={currentWeather.sys.sunrise + currentWeather.timezone}
            alternate={alternateCurrentWeather}
            onClick={() => setAlternateCurrentWeather(!alternateCurrentWeather)}
          />
        </CSSTransition>
      )}

      <input
        className="input"
        placeholder="e.g. London"
        onInput={handleInput}
        onKeyPress={handleKeyPress}
      />
      <button className="btn" onClick={handleClick}>
        Submit
      </button>
      {forecast && (
        <CSSTransition
          in={showComponents}
          classNames="transition"
          timeout={500}
        >
          <ForecastGrid
            forecast={forecast.daily}
            timezone_offset={forecast.timezone_offset}
          />
        </CSSTransition>
      )}
    </div>
  );
}
export default WeatherScreen;

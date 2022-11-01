export async function fetchCurrentWeatherData(city, key){
    let currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    console.log('fetched current weather data')
    let currentWeatherJson = await currentWeatherResponse.json(); 
    return currentWeatherJson;
}

export async function fetchCurrentWeatherDataWithCoords(longitude, latitude, key){
    let forecastResponse
    = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`);
    console.log('fetched current weather data')
    let forecastJson = await forecastResponse.json();
    return forecastJson;
}

export async function fetchForecastData(longitude, latitude, key){
    let forecastResponse
        = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${longitude}&lon=${latitude}&exclude=current,hourly,minutely&appid=${key}`);
    console.log('fetched forecast weather data')
    let forecastJson = await forecastResponse.json();
    return forecastJson;
}

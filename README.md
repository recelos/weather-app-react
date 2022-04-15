# [Weather app](https://weather-app-jg.netlify.app/)

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Emoji_u2600.svg/480px-Emoji_u2600.svg.png" alt="Weather app logo"/>
</p>

Simple website for checking the weather. 

# Functionality

After entering the main screen, browser will ask user for his localization. If granted, the app will show him informations about current weather and forecasts for next 6 days in his current location. Otherwise, it will just pick London. User can click cards to get more info about specific day or enter another city in the form. Clicking the banner in top left corner will take him back to the splash screen.  

# Technologies

The website was created in ReactJS. Besides basic React functionalities, such as useState or useEffect, it also uses ReactTransisionGroup for animations and FetchAPI for retrieving data.

# Deployment

Website was deployed using [Netlify](https://www.netlify.com/). 

# API

API used to retrieve data comes from [OpenWeatherMap](https://openweathermap.org/api). API calls used are Current Weather Data for the current weather and One Call API for the forecasts.

# CLI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



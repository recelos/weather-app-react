import React from "react";
import "./Forecast.css"
function Forecast(props){
    const day       = props.day;
    const temp      = Math.round(parseFloat(props.temp)-273.15);
    const desc      = props.desc.charAt(0).toUpperCase() + props.desc.slice(1); 
    const press     = props.press;
    const imageSource = props.imageSource;
    const onClick = props.onClick;

    return(
            <div className="Forecast" onClick={onClick}>
                <h2>{day}</h2>
                <img src={`../icons/${imageSource}.png`} alt={imageSource}/> <hr />
                <h4>{desc}</h4><hr />
                <h4>{temp}&deg;C</h4><hr />
                <h4>{press}hPa</h4>
                <img src="../util/primary-20px.png" />
            </div>      
    );
}
export default Forecast;



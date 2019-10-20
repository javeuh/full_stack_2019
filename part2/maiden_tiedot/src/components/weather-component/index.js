import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(false);
    const apiKey = "533234c02d71f787a70b6410fc0905bd";
    const url =
        "http://api.weatherstack.com/current?access_key=" +
        apiKey +
        "&query=" +
        city;
    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setWeather(response.data);
            })
            .then(setWeather(false));
    }, [city, url]);
    if (weather) {
        return (
            <div>
                <h4>Weather in {city}</h4>
                <h5>Temperature {weather.current.temperature} Degrees</h5>
                <img
                    src={weather.current.weather_icons[0]}
                    alt="Weather icon"
                    style={{ height: 8 + "rem" }}
                />
                <h5>
                    Wind: {weather.current.wind_speed} kph, direction{" "}
                    {weather.current.wind_dir}{" "}
                </h5>
            </div>
        );
    }
    return <p>Waiting for weather...</p>;
    //const [weather, setWeather] = useState(weather);
};

export default Weather;

import React, { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(false);
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
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
            .catch(error => {
                // handle error
                console.log(error);
            })
            //asetetaan takaisin alkutilaan jos maa vaihtuu
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

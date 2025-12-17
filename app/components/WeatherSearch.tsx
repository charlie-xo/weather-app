"use client";

import { useState } from "react";
import "./WeatherSearch.css"; // Inga External CSS ah import panrom

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  
  // Fixing deployment error
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
        setWeather(null);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">🌤️ Climate Checker</h2>
      
      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city (e.g., Chennai)"
          className="city-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          onClick={fetchWeather}
          className="search-btn"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {/* Result Kaatum Idam */}
      {weather && (
        <div className="weather-result">
          <h3 className="city-name">{weather.name}, {weather.sys.country}</h3>
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <p className="weather-desc">{weather.weather[0].description}</p>
          <div className="weather-details">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
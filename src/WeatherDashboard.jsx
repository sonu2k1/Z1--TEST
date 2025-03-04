import React, { useState } from 'react';
import axios from 'axios';

function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "0bcf72b1a44dee48c3415a6e3179644c";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const currentWeatherResponse = await axios.get(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(currentWeatherResponse.data);

      const forecastResponse = await axios.get(
        `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data.list);

    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <h1>Wether Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          {/* Add more weather details as needed */}
        </div>
      )}

      {forecastData && (
        <div>
          <h3>5-Day Forecast</h3>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {forecastData.filter((item, index) => index % 8 === 0).map((item) => (
              <div key={item.dt} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', minWidth: '150px' }}>
                <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {item.main.temp}°C</p>
                <p>{item.weather[0].description}</p>
                {/* Add more forecast details as needed */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
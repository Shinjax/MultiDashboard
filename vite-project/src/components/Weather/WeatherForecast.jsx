const apiKEY = "0565657847f78a00ca188622981ada91";


import { useState } from "react";
import axios from "axios";


const WeatherForecast = () => {
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState("");

  const geolocationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKEY}`;

  const fetchGeolocation = async () => {
    try {
      const response = await axios.get(geolocationURL);
      const result = response.data[0]; // Access the first element in the array
      console.log(result)
      console.log("Latitude:", result.lat);
      console.log("Longitude:", result.lon);

      // After fetching geolocation, call the weather forecast API
      fetchData(result.lat, result.lon);
    } catch (error) {
      console.log("Error fetching coordinates:", error);
    }
  };

  const fetchData = async (latitude, longitude) => {
    try {
      const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=auto&forecast_days=5`;
      const response2 = await axios.get(weatherURL);
      const weatherResult = response2.data;


      setForecastData(weatherResult);
      console.log(weatherResult);
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setForecastData([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchGeolocation();
      setLocation("");
    }
  };

  

  return (
    <div className="forecastBlock">
      <p>5 Day Forecast</p>
      <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="forecast">
        {forecastData.daily ? (
          forecastData.daily.time.map((day, index) => (
            <div className="forecastCard" key={index}>
              {day ? <p>Day: {day}</p> : null}
              {forecastData.daily.weathercode[index] ? (
                <p>Weather Code: {forecastData.daily.weathercode[index]}</p>
              ) : null}
              {forecastData.daily.temperature_2m_max[index] ? (
                <p>High: {forecastData.daily.temperature_2m_max[index].toFixed()}°F</p>
              ) : null}
              {forecastData.daily.temperature_2m_min[index] ? (
                <p>Low: {forecastData.daily.temperature_2m_min[index].toFixed()}°F</p>
              ) : null}
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default WeatherForecast;

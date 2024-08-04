import axios from "axios";
import { useState, useEffect } from "react";
import { WiDaySunny, WiCloudy, WiFog, WiSprinkle, WiRainMix, WiRain, WiSnow, WiShowers, WiThunderstorm, WiHail } from "react-icons/wi";

const WeatherForecast = ({ searchLocation }) => {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchLocation && searchLocation.trim() !== "") {
      fetchForecastData();
    }
  }, [searchLocation]);

  const fetchForecastData = async () => {
    const apiKey = "6a68b9a34e09134847563b2092fed8ef"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchLocation}&units=imperial&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      const dailyForecasts = response.data.list.filter((reading, index) => index % 8 === 0);
      setForecastData(dailyForecasts);
      setError("");
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setForecastData([]);
      setError("Failed to fetch forecast data. Please try again.");
    }
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
      case "01n":
        return <WiDaySunny size={40} />;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <WiCloudy size={40} />;
      case "09d":
      case "09n":
        return <WiShowers size={40} />;
      case "10d":
      case "10n":
        return <WiRain size={40} />;
      case "11d":
      case "11n":
        return <WiThunderstorm size={40} />;
      case "13d":
      case "13n":
        return <WiSnow size={40} />;
      case "50d":
      case "50n":
        return <WiFog size={40} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-firstColor text-thirdColor p-6 rounded-lg flex flex-col h-full w-[70%]">
      <h2 className='text-xl text-white text-center font-semibold mb-4'>5-Day Forecast</h2>
      {error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {forecastData.map((forecast, index) => (
            <div key={index} className="bg-secondColor rounded-lg p-4 text-center flex flex-col items-center">
              <p className="font-semibold">{formatDate(forecast.dt_txt)}</p>
              {getWeatherIcon(forecast.weather[0].icon)}
              <p className="text-2xl font-bold">{forecast.main.temp.toFixed()}°F</p>
              <p>{forecast.weather[0].main}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
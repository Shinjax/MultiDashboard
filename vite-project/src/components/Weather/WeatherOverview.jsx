import axios from "axios";
import { useState, useEffect } from "react";

const WeatherOverview = ({ searchLocation }) => {
  const [data, setData] = useState({});
  const [weatherImage, setWeatherImage] = useState("");
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (searchLocation && searchLocation.trim() !== "") {
      fetchData();
    }
  }, [searchLocation]);

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=imperial&appid=6a68b9a34e09134847563b2092fed8ef`;

    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
      switch (response.data.weather[0].main) {
        case "Clear":
          setWeatherImage("./images/clear.png");
          break;
        case "Rain":
          setWeatherImage("./images/snow.png");
          break;
        case "Clouds":
          setWeatherImage("./images/cloud.png");
          break;
        case "Mist":
          setWeatherImage("./images/mist.png");
          break;
        case "Snow":
          setWeatherImage("./images/rain.png");
          break;
        case "Thunderstorm":
          setWeatherImage("./images/thunderstorm.png");
          break;
        default:
          setWeatherImage("");
      }
      setError("");
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setData({});
      setWeatherImage("");
      setError("Failed to fetch weather data. Please enter a valid location.");
      setHasSearched(false);
    }
  };

  return (
    <div className="bg-firstColor text-thirdColor p-6 rounded-lg flex flex-col h-full w-[30%] min-w-[250px]">
      <h2 className='text-xl text-white text-center font-semibold mb-4'>Today's Overview</h2>
      <div className="flex-grow flex flex-col">
        {error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : hasSearched ? (
          <div className="flex-grow flex flex-col items-center justify-center border-slate-900 bg-secondColor border-2 rounded-lg">
            {weatherImage && (
              <img className="w-20 h-20 mb-4" src={weatherImage} alt="Weather Icon" />
            )}
            <div className="text-center mb-5">
              <p className="text-2xl font-bold mb-2">{data.name}</p>
              {data.main && <p className="text-4xl font-bold mb-2">{data.main.temp.toFixed()}°F</p>}
              {data.weather && <p className="text-lg mb-4">{data.weather[0].main}</p>}
              <div className="flex flex-col sm:flex-row justify-around w-full">
                {data.main && <p className='mb-2 sm:mb-0 sm:mr-3'>Humidity: {data.main.humidity}%</p>}
                {data.wind && <p>Wind: {data.wind.speed.toFixed()} MPH</p>}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Enter a location to see weather information.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherOverview;
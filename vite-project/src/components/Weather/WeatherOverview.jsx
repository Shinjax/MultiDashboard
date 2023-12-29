import axios from "axios";
import { useState } from "react";

const WeatherOverview = () => {
    
    const [data,setData] = useState({});
    const [location, setLocation] = useState('');
    const [weatherImage, setWeatherImage] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6a68b9a34e09134847563b2092fed8ef`

    const fetchData = async (event) => {
        if (event.key === 'Enter') {
          try {
            const response = await axios.get(url);
            setData(response.data);
            console.log(response.data)
            switch (response.data.weather[0].main) {
              case 'Clear':
                setWeatherImage('./images/clear.png');
                break;
              case 'Rain':
                setWeatherImage('./images/snow.png');
                break;
              case 'Clouds':
                setWeatherImage('./images/cloud.png');
                break;
              case 'Mist':
                setWeatherImage('./images/mist.png');
                break;
              case 'Snow':
                setWeatherImage('./images/rain.png');
                break;
              default:
                setWeatherImage('');
            }
          } catch (error) {
            console.error('Error fetching weather data:', error);
            setData({});
            setWeatherImage('');
          }
          setLocation('');
        }
      };

      
    return (
      <div className="weather-overview-block">
          <p>Todays Overview</p>
        <div className="weatherContainer">
          <div className="searchBox">
            <input 
              type="text" 
              placeholder="Enter Location"
              value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyPress={fetchData}
              />    
            <button>search</button>
          </div>

          <div className="weatherBox">
              {weatherImage && <img className = "weatherImage" src={weatherImage} alt="Weather Icon" />}
            <div className="weatherLocation">
              <p>{data.name}</p>
            </div>
            <div className="weatherDetails">
              {data.main ? <p className="temperature">{data.main.temp.toFixed()}°F</p> : null}
              {data.weather ? <p className="description">{data.weather[0].main}</p> : null}
              {data.main ? <p className='humidity'>Humidity:{data.main.humidity}%</p> : null}
              {data.wind ? <p className='windSpeed'>WS:{data.wind.speed.toFixed()}MPH</p> : null}
            </div>
          </div>
        </div>
      </div>
    );
}

export default WeatherOverview;
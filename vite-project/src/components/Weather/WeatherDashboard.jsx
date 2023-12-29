
//api key = 6a68b9a34e09134847563b2092fed8ef
import WeatherForecast from "./weatherForecast";
import WeatherOverview from "./weatherOverview";

const WeatherDashboard = () => {

  return (
      <div className="dashboard">
      <div className="logo-block">
        <p className="logoTitle">Weather</p>
        <img
          className="logoImage"
          src="./images/weatherIcon.png"
          alt="Weather App Icon Image"
        />
      </div>

      <WeatherOverview />
      <WeatherForecast />
      </div>
  );
}

export default WeatherDashboard;
import WeatherForecast from "./WeatherForecast";
import WeatherOverview from "./weatherOverview";
import { useState } from "react";

const WeatherDashboard = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      setSearchLocation(searchInput);
    }
  };

  return (
    <section className='max-h-[70vh]'>
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Enter Location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearch}
          className="flex bg-firstColor text-thirdColor px-3 py-2 rounded-l-md"
        />
        <button 
          onClick={handleSearch}
          className="bg-thirdColor text-firstColor px-4 py-2 rounded-r-md hover:bg-opacity-80"
        >
          Search
        </button>
      </div>
      
      <div className='flex flex-row items-start space-x-10'>
        <WeatherOverview searchLocation={searchLocation} />
        <WeatherForecast searchLocation={searchLocation}/>
      </div>
    </section>
  );
}

export default WeatherDashboard;
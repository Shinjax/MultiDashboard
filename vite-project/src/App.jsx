import { useState, createElement } from "react";
import WeatherDashboard from "./components/Weather/weatherDashboard";
import CryptoDashboard from "./components/Crypto/cryptoDashboard";
import FinanceDashboard from "./components/Finance/financeDashboard";
import ProgressDashboard from "./components/ProgressTracker/progressDashboard";

function App() {
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  const addDashboard = () => {
    if (selectedDashboard !== null) {
      const selectedOption = dashboardOptions.find(
        (option) => option.value === selectedDashboard
      );
      setDashboards([...dashboards, selectedOption.value]);
      setSelectedDashboard(null);
    }
  };

  const removeDashboard = (indexToRemove) => {
    setDashboards((prevDashboards) =>
      prevDashboards.filter((_, index) => index !== indexToRemove)
    );
  };

  const componentsMap = {
    WeatherDashboard,
    CryptoDashboard,
    FinanceDashboard,
    ProgressDashboard,
  };

  const dashboardOptions = [
    { label: "Choose Dashboard", value: null },
    { label: "Weather", value: "WeatherDashboard" },
    { label: "Crypto", value: "CryptoDashboard" },
    { label: "Personal Finance", value: "FinanceDashboard" },
    { label: "Personal Progress", value: "ProgressDashboard" },
  ];

  return (
    <section className='p-6 text-black'>
        <div className="flex items-center mb-6">
          <select
            className="bg-thirdColor text-secondColor rounded mr-2"
            value={selectedDashboard}
            onChange={(e) => setSelectedDashboard(e.target.value)}
          >
            {dashboardOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 w-8 h-8 rounded text-white"
            onClick={addDashboard}
          >+</button>
        </div>

          {dashboards.map((dashboard, index) => {
            const DashboardComponent = createElement(componentsMap[dashboard], {});
            return (
              <div key={index} className="mb-8"> 
                <div className="bg-secondColor rounded-lg p-6">
                  {DashboardComponent}
                </div>
                <button
                  className="rounded bg-white mt-4 p-1 hover:bg-gray-100"
                  onClick={() => removeDashboard(index)}
                >
                  Delete Dashboard
                </button>
              </div>
            );
          })}
    </section>
  );
}

export default App;
  import { useState, createElement } from "react";

  import TwitchDashboard from "./components/Twitch/twitchDashboard";
  import WeatherDashboard from "./components/Weather/weatherDashboard";
  import CryptoDashboard from "./components/Crypto/cryptoDashboard";
  import FinanceDashboard from "./components/Finance/financeDashboard";
  import ProgressDashboard from "./components/ProgressTracker/progressDashboard";
  import "./stylesheets/styles.css";
  import "./stylesheets/cryptoStyles.css";
  import "./stylesheets/twitchStyles.css";
  import "./stylesheets/financeStyles.css";
  import "./stylesheets/progressStyles.css";


  function App() {
    
    const [dashboards, setDashboards] = useState([]);
    const [selectedDashboard, setSelectedDashboard] = useState(null);
    

    const addDashboard = () => {
      if (selectedDashboard !== null) {
        // Find the selected dashboard option
        const selectedOption = dashboardOptions.find(
          (option) => option.value === selectedDashboard
        );

        // Add the unique value to the dashboards array
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
      TwitchDashboard: TwitchDashboard,
      WeatherDashboard: WeatherDashboard,
      CryptoDashboard: CryptoDashboard,
      FinanceDashboard: FinanceDashboard,
      ProgressDashboard: ProgressDashboard,
    };

    const dashboardOptions = [
      { label: "Choose Dashboard", value: null},
      { label: "Twitch", value: "TwitchDashboard"},
      { label: "Weather", value: "WeatherDashboard"},  
      { label: "Crypto", value: "CryptoDashboard"},
      { label: "Personal Finance", value: "FinanceDashboard"},
      { label: "Personal Progress", value: "ProgressDashboard"},
    ];

    return (
      <div>
        <div>
          <select 
            className = "dropDownMenu"
            value={selectedDashboard}
            onChange={(e) => setSelectedDashboard(e.target.value)}
          >
            {dashboardOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="addButton" onClick={addDashboard}>
            + Add Dashboard
          </button>
        </div>
        {dashboards.map((dashboard, index) => {
          // Use createElement to render the selected dashboard component
          const DashboardComponent = createElement(
            componentsMap[dashboard],
            {}
          );
          return (
            <div key={index}>
              {DashboardComponent}
              <button className="removeButton"
                onClick={() => removeDashboard(index)}>
                Remove Dashboard
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  export default App;


const SteamDashboard = () => {
    return (
        <div className="dashboard">
        <div className="logo-block">
          <p>Steam</p>
          <img
            className="logoImage"
            src="./images/steamIcon4.png"
            alt="Steam Icon Image"
          />
        </div>
        <div className="overview-block">
          <p>Overview</p>
        </div>
        <div className="secondBlock">
          <p>Price History</p>
        </div>
        <div className="thirdBlock">
          <p>Recent News</p>
        </div>
      </div>
    );
}

export default SteamDashboard;
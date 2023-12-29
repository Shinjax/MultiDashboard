import { useState, useEffect } from 'react';
import axios from 'axios';

const clientId = 'ahsye0zfehpfwzg7kjpd6hrsdsc6tr';
const clientSecret = 'gll91oroe71gok8wsbpveviep9ib37';

const TwitchDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [topGames, setTopGames] = useState([]);
  const [topStreams, setTopStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get an access token
        const tokenResponse = await axios.post(
          `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
        );
        const accessToken = tokenResponse.data.access_token;

        const userId = '510622451'; // my twitch Id

        const userResponse = await axios.get(
          `https://api.twitch.tv/helix/users?id=${userId}`,
          {
            headers: {
              'Client-ID': clientId,
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
      
        const userDataResult = userResponse.data.data[0];
        setUserData(userDataResult);
        console.log(userDataResult);
        
        const topGamesResponse = await axios.get(
          `https://api.twitch.tv/helix/games/top?first=20`,
          {
            headers: {
              'Client-ID': clientId,
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        const topGamesResult = topGamesResponse.data.data;
        setTopGames(topGamesResult);
        console.log(topGamesResult);
        
        //use getStreams call and add up first few pages to get approximate viewer count
        const getTopStreams = await axios.get(
          `https://api.twitch.tv/helix/streams`,
          {
            headers: {
              'Client-ID': clientId,
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
        
        const topStreamsResult = getTopStreams.data.data //api call no work so fix
        setTopStreams(topStreamsResult);
        console.log(topStreamsResult);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="twitchDashboard">
      <div className="twitchLogoBlock">
        <img className="logoImage" src="./images/twitchIcon.png" alt="twitchIcon" />
      </div>

      <div className="twitchOverviewBlock">
        {userData ? (
          <>
            <p>Username: {userData.login}</p>
            <p>Display Name: {userData.display_name}</p>
            <p>Profile Image:</p>
            <img className="profileImage" src={userData.profile_image_url} alt="Twitch Profile" />
          </>
        ) : (
          'Loading...'
        )}
      </div>
      <div className="gameBuzzList">
        <h2>Top 20 Games on Twitch</h2>
        <ol>
          {topGames.map((game) => (
            <li key={game.id}>
              {game.name}
              <img className="gameImage" src={game.box_art_url.replace('{width}', '200').replace('{height}', '300')} alt={`${game.name} Box Art`} />
            </li>
          ))}
        </ol>
      </div>
      
      {/* for another part of the twitch dashboard insert a certain stream and get the analytics with graphs*/}

    </div>
  );
};

export default TwitchDashboard;

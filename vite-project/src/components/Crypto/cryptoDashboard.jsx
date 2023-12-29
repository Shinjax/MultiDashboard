import { useState } from 'react';
import axios from 'axios';


const CryptoDashboard = () => {
    const [coinData, setCoinData] = useState([]); 
    const [search, setSearch] = useState('');

    const fetchData = async (event) => {
        if (event.key === 'Enter') {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${search}&order=market_cap_desc&per_page=1&page=1&sparkline=false`;
                const response = await axios.get(url);
                const newCoinData = response.data[0];
                setCoinData(prevCoinData => [...prevCoinData, newCoinData]); // Add new coin data to the list
            } catch (error) {
                console.log(error);
            }
            setSearch('');
        }
    };

    const deleteCoin = (indexToRemove) => {
        setCoinData((prevCoinData) =>
            prevCoinData.filter((_,index) => index !== indexToRemove)
        );
    };

    return (
        <div className="cryptoDashboard">
            <div className="logo-block">
                <p>Crypto</p>
                <img
                    className="logoImage"
                    src="./images/Crypto.png"
                    alt="Cryto Icon"
                />
            </div>
            <div className="cryptoOverviewBlock">
                <p>Overview</p>
                <input 
                    type="text" 
                    placeholder="Enter Crypto Name"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyPress={fetchData}
                />
                <div className="coinContainer">
                    {coinData.map((coinData, index) => (
                        <div className="coinRow" key={index}>
                            <div className="coin">
                                <img src={coinData.image} alt={`${coinData.name} Logo`} />
                                <h1>{coinData.name}</h1>
                                <p className='coinID'>{coinData.symbol}</p>
                            </div>
                            <div className="coinData">
                                <p> Price: ${coinData.current_price}</p>
                                <p> Total Volume: {coinData.total_volume}</p>
                                <p> Market Cap: {coinData.market_cap}</p>
                            </div>
                            <div className="deleteCoin"> 
                                <button onClick={() => deleteCoin(index)}>X</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CryptoDashboard;

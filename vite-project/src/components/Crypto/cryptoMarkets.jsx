import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const CryptoMarkets = ({ allCoins }) => {
    const [coinData, setCoinData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [filteredCoins, setFilteredCoins] = useState([]);

    const fetchData = async (event) => {
        setError(''); 
        if (event.key === 'Enter') {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${search}&order=market_cap_desc&per_page=1&page=1&sparkline=false`;
                const response = await axios.get(url);
                const newCoinData = response.data[0];

                if (newCoinData) {
                    setCoinData(prevCoinData => [...prevCoinData, newCoinData]);
                    setError('');
                } else {
                    setError('No data found for the entered cryptocurrency.');
                }
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching data.');
            }
            setSearch('');
        }
    };

    useEffect(() => {
        if (search) {
            const filtered = allCoins.filter(coin => 
                coin.id.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredCoins(filtered.slice(0, 3)); // Edit this to change the number of suggestions 
        } else {
            setFilteredCoins([]);
        }
    }, [search, allCoins]);

    const deleteCoin = (indexToRemove) => {
        setCoinData(prevCoinData => prevCoinData.filter((_, index) => index !== indexToRemove));
    }
    
    const inputHandler = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div className='bg-firstColor flex-auto rounded-lg text-thirdColor max-w-[70%] max-h-[60vh] p-4 flex flex-col'>
            <h2 className='text-xl text-center font-semibold mb-5 mt-5'>MARKET TRACKER</h2>
            <form>
                <input
                    type="text"
                    value={search}
                    list="coinlist"
                    onChange={inputHandler}
                    onKeyDown={fetchData}
                    placeholder="Enter cryptocurrency name"
                    className='w-full p-2 mb-4 text-black rounded'
                    required
                />
                <datalist id='coinlist'>
                    {filteredCoins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name} ({coin.symbol.toUpperCase()})
                        </option>
                    ))}
                </datalist>
            </form>
            {error && <p className='text-red-500 mb-2'>{error}</p>}
            <div className='overflow-y-auto flex-grow'>
                <div className='grid grid-cols-5 gap-4 font-bold mb-2'>
                    <div>Coin</div>
                    <div>Current Price</div>
                    <div>24h Change</div>
                    <div>Market Cap</div>
                    <div>Remove</div>
                </div>
                <ul className='space-y-2 overflow-y-auto flex-grow'>
                    {coinData.map((coin, index) => (
                        <li key={index} className='grid grid-cols-5 gap-4 items-center'>
                            <div className='flex items-center'>
                                <img src={coin.image} alt={coin.name} className='w-6 h-6 mr-2' />
                                <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                            </div>
                            <div>${coin.current_price.toLocaleString()}</div>
                            <div className={`flex items-center ${coin.price_change_percentage_24h < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                {coin.price_change_percentage_24h < 0 ? (
                                    <FaArrowTrendDown className="mr-1" />
                                ) : (
                                    <FaArrowTrendUp className="mr-1" />
                                )}
                                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                            </div>
                            <div>${coin.market_cap.toLocaleString()}</div>
                            <div>
                                <button onClick={() => deleteCoin(index)} className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CryptoMarkets;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoTrending = () => {
    const [trending, setTrending] = useState([]);

    const fetchTrending = async () => {
        try {
            const trendingURL = 'https://api.coingecko.com/api/v3/search/trending';
            const response = await axios.get(trendingURL);
            setTrending(response.data.coins.slice(0, 10)); // Get top 10 trending coins (edit this to change list amount)
        } catch (error) {
            console.error('Error fetching trending data:', error);
        }
    }

    useEffect(() => {
        fetchTrending();
    }, [])

    return (
        <div className='bg-firstColor flex-1 rounded-lg text-thirdColor max-w-[30%] max-h-[60vh] p-4 flex flex-col'>
            <h2 className='text-xl text-center font-semibold mb-5 mt-5'>TRENDING</h2>
            <ul className='overflow-y-auto'>
                {trending.map((coin, index) => (
                    <li key={index} className='mb-2 flex justify-center items-center'>
                        <span className='mr-2'>{coin.item.score+1}. </span>
                        <img src={coin.item.small} alt={coin.item.name} className='w-6 h-6 mr-2 mt-1' />
                        <span>{coin.item.name} ({coin.item.symbol})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoTrending;
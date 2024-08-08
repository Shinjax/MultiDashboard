import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoTrending from './CryptoTrending';
import CryptoMarkets from './CryptoMarkets';

const CryptoDashboard = () => {
    const [allCoins, setAllCoins] = useState([]);

    const fetchAllCoins = async () => { 
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
            setAllCoins(response.data);
        } catch (error) {
            console.error('Error fetching all coins:', error);
        }
    }

    useEffect(() => {
        fetchAllCoins();
    }, [])

    return (
        <section className='h-[65vh]'>
           <div className='flex flex-row items-start space-x-10'>
                <CryptoTrending />
                <CryptoMarkets allCoins={allCoins} />
           </div>
        </section>
    );
};

export default CryptoDashboard;
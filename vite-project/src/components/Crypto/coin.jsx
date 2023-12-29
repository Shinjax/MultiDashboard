
const Coin = ( name, image, symbol, price, volume, marketcap ) => {
    return (
        <div className="coinContainer">
            <div className="coinRow">
                <div className="coin">
                    <img src={image} alt={`${name} Logo`} />
                    <h1>{name}</h1>
                    <p className='coinID'>{symbol}</p>
                </div>
                <div className="coinData">
                    <p> Price: ${price}</p>
                    <p> Total Volume: {volume}</p>
                    <p> Market Cap: {marketcap}</p>
                </div>
            </div>
        </div>
    );
}

export default Coin;

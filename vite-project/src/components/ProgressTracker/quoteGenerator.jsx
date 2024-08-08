import { useState } from 'react';
import axios from 'axios';

const QuoteGenerator = () => {
  const [quoteData, setQuoteData] = useState(null);

  const fetchQuoteData = async () => {
    try {
      const url = 'https://api.quotable.io/random';
      const response = await axios.get(url);
      setQuoteData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-[0.5] bg-[#1b2330] p-4 mr-4 mt-4 rounded-lg flex flex-col justify-start items-center text-center">
      <button
        className="w-50 h-[50px] mt-2.5 rounded border-solid bg-blue-500 text-white"
        onClick={fetchQuoteData}
      >
        Get a little motivation
      </button>
      {quoteData && <p className="mt-4">{quoteData.content}</p>}      
    </div>
  );
};

export default QuoteGenerator;
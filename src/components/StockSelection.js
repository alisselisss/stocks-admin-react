import React, { useState } from 'react';

const StockSelection = ({ tickers, onSelectStocks }) => {
    const [selectedStocks, setSelectedStocks] = useState([]);

    const handleCheckboxChange = (ticker) => {
        const updatedSelection = selectedStocks.includes(ticker)
            ? selectedStocks.filter((selected) => selected !== ticker)
            : [...selectedStocks, ticker];

        setSelectedStocks(updatedSelection);
        onSelectStocks(updatedSelection);
    };

    const containerStyle = {
        marginLeft: "10px",
        display: "inline",
    };

    return (
        <div>
            <h3>Select Stocks:</h3>
            {tickers.map((ticker) => (
                <div key={ticker}  style={containerStyle}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedStocks.includes(ticker)}
                            onChange={() => handleCheckboxChange(ticker)}
                        />
                        {ticker}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default StockSelection;

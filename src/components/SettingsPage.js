import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockSelection from "./StockSelection";
import {useSelector} from "react-redux";

const SettingsPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [tradingSpeed, setTradingSpeed] = useState(1);
    const [isTrading, setIsTrading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [stockPrices, setStockPrices] = useState({});
    const [selectedStocks, setSelectedStocks] = useState([]);

    const tickers = useSelector((state) => state.tickers);

    const setsStyle = {
        width: '400px',
        border: '1px solid #999',
        marginLeft: "auto",
        marginRight: "auto",
        padding: "10px",
        borderRadius: "30px",
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const tableStyle = {
        width: '300px',
        border: '1px solid black',
    };

    const cellStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center',
    };

    const btnStyle = {
        marginLeft: "10px",
        marginBottom: "10px",
    };

    useEffect(() => {
        let intervalId;
        if (isTrading) {
            intervalId = setInterval(() => {
                fetchStockPrices();
            }, 1000 * tradingSpeed);
        }
        return () => clearInterval(intervalId);
    }, [isTrading]);


    const fetchStockPrices = async () => {
        try {
            if (!isTrading) {
                return;
            }

            const response = await axios.get(`http://localhost:3000/stock-exchange/stock-prices`, {
                params: {
                    tickers: selectedStocks,
                    date: currentDate,
                },
            });
            console.log(response.data);
            if (response.data) {
                setStockPrices(response.data);
                currentDate.setDate(currentDate.getDate() + 1);
                setCurrentDate(new Date(currentDate));
            }
        } catch (error) {
            console.error('Error fetching stock prices', error);
        }
    };

    const handleStartDateChange = (event) => {
        setStartDate(new Date(event.target.value));
    };

    const handleTradingSpeedChange = (event) => {
        setTradingSpeed(parseFloat(event.target.value));
    };

    const handleStartTrading = async () => {
        try {
            console.log(selectedStocks);
            const response = await axios.post('http://localhost:3000/stock-exchange/start-trading', {
                startDate: startDate,
                tickers: selectedStocks,
                tradingSpeed,
            });
            setCurrentDate(new Date(startDate));
            setIsTrading(true);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error starting trading', error);
        }
    };

    const handleStopTrading = async () => {
        try {
            const response = await axios.post('http://localhost:3000/stock-exchange/stop-trading');
            setIsTrading(false);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error stopping trading', error);
        }
    };

    return (
        <div>
            <div style={setsStyle}>
                <h2>Stock Exchange Settings</h2>
                <div>
                    <label>Start Date:</label>
                    <input type="datetime-local" value={startDate.toISOString().slice(0, -1)} onChange={handleStartDateChange} />
                </div>
                <div>
                    <label>Trading Speed (seconds):</label>
                    <input type="number" value={tradingSpeed} onChange={handleTradingSpeedChange} />
                </div>
            </div>
            <br />
            <StockSelection tickers={tickers} onSelectStocks={setSelectedStocks} />
            <br />
            <div>
                <button onClick={handleStartTrading} disabled={isTrading} class="btn btn-success" style={btnStyle}>
                    Start Trading
                </button>
                <button onClick={handleStopTrading} disabled={!isTrading} class="btn btn-primary" style={btnStyle}>
                    Stop Trading
                </button>
            </div>
            <hr/>
            <h3>Stock Prices:</h3>
            {currentDate.toISOString().split("T")[0]}
            <div style={containerStyle}>
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        {Object.keys(stockPrices).map((ticker) => (
                            <th key={ticker}>{ticker}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {Object.values(stockPrices).map((price, index) => (
                            <td key={index} style={cellStyle}>{price}</td>
                        ))}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SettingsPage;


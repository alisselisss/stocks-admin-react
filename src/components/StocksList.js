import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { useSelector } from 'react-redux';

import axios from 'axios';

const StocksList = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [chartKey, setChartKey] = useState(Date.now());

    const chartRef = useRef();
    const chartInstance = useRef(null);

    const BASE_URL = 'http://localhost:3000/proxy';
    const companies = useSelector((state) => state.companies);

    const containerStyle = {
        marginLeft: "10px",
        marginBottom: "10px",
    };

    const fetchStocks = async () => {
        try {
            if (!selectedCompany) {
                return;
            }

            const response = await axios.get(`${BASE_URL}/${selectedCompany.symbol}`);
            setStocks(response.data.dataset.data.slice(0, 1000));
            return response.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCompanySelect = (company) => {
        console.log(company);
        setSelectedCompany(company);
    };

    useEffect(() => {
        fetchStocks();
    }, [selectedCompany]);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (stocks.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: stocks.map((stock) => stock[0]),
                    datasets: [
                        {
                            label: 'Close Price',
                            data: stocks.map((stock) => stock[4]),
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: 'MMM DD, YYYY',
                                },
                            },
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [stocks]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Stocks List</h2>
            {companies.map((company) => (
                <button class="btn btn-primary" style={containerStyle} key={company.symbol} onClick={() => handleCompanySelect(company)}>
                    {company.name} ({company.symbol})
                </button>
            ))}

            {stocks.length > 0 && (
                <div>
                    <h2>Stock Chart</h2>

                    <div>
                        <Line
                            ref={chartRef}
                            data={{
                                labels: stocks.map((stock) => stock[0]),
                                datasets: [
                                    {
                                        label: 'Close Price',
                                        data: stocks.map((stock) => stock[4]),
                                        borderColor: 'rgba(75,192,192,1)',
                                        borderWidth: 2,
                                        fill: false,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        type: 'time',
                                        time: {
                                            unit: 'day',
                                        },
                                    },
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StocksList;

const initialState = {
    companies: [
        {symbol: 'AAPL', name: 'Apple, Inc.'},
        {symbol: 'SBUX', name: 'Starbucks, Inc.'},
        {symbol: 'MSFT', name: 'Microsoft, Inc.'},
        {symbol: 'CSCO', name: 'Cisco Systems, Inc.'},
        {symbol: 'QCOM', name: 'QUALCOMM Incorporated'},
        {symbol: 'AMZN', name: 'Amazon.com, Inc.'},
        {symbol: 'TSLA', name: 'Tesla, Inc.'},
        {symbol: 'AMD', name: 'Advanced Micro Devices, Inc.'},
    ],
    tickers: ['AAPL', 'SBUX', 'MSFT', 'CSCO', 'QCOM', 'AMZN', 'TSLA', 'AMD'],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMPANIES':
            return {
                ...state,
                companies: action.payload,
            };
        case 'SET_TICKERS':
            return {
                ...state,
                tickers: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
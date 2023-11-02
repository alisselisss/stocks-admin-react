import './App.css';
import BrokersList from "./components/BrokersList";
import StocksList from "./components/StocksList";
import SettingsPage from './components/SettingsPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


function App() {
    const containerStyle = {
        display: "inline",
        textDecoration: "none",
        marginRight: "10px",
    };
    const headerStyle = {
        backgroundColor: "#333",
        marginBottom: "20px",
    };
    return (
        <div className="App">
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" />
            <Helmet>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
            </Helmet>

            <Router>
                <div>
                    <header  class="modal-header" style={headerStyle}>
                        <ul style={containerStyle}>
                            <li style={containerStyle} class="nav-link">
                                <Link to="/">Stocks List</Link>
                            </li>
                            <li style={containerStyle} class="nav-link">
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li style={containerStyle} class="nav-link">
                                <Link to="/brokers">Brokers</Link>
                            </li>
                        </ul>
                    </header>

                    <Routes>
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/brokers" element={<BrokersList />} />
                        <Route path="/" element={<StocksList />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;

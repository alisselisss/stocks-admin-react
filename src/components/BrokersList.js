import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrokersList = () => {
    const [brokers, setBrokers] = useState([]);
    const [newBrokerName, setNewBrokerName] = useState('');
    const [newBrokerCompany, setNewBrokerCompany] = useState('');
    const [newBrokerBalance, setNewBrokerBalance] = useState('');

    const addUserStyle = {
        width: '400px',
        border: '1px solid #999',
        marginLeft: "auto",
        marginRight: "auto",
        padding: "10px",
        borderRadius: "30px",
    };

    const usersStyle = {
        width: '450px',
        marginLeft: "auto",
        marginRight: "auto",
        padding: "10px",
    };

    const containerStyle = {
        marginLeft: "10px",
    };
    const fetchBrokers = async () => {
        const response = await axios.get('http://localhost:3000/brokers');
        setBrokers(response.data);
    };

    const addBroker = async () => {
        await axios.post('http://localhost:3000/brokers', {
            name: newBrokerName,
            company: newBrokerCompany,
            balance: parseFloat(newBrokerBalance),
        });
        fetchBrokers();
    };

    const deleteBroker = async (id) => {
        await axios.delete(`http://localhost:3000/brokers/${id}`);
        fetchBrokers();
    };

    const updateBalance = async (id, newBalance) => {
        await axios.patch(`http://localhost:3000/brokers/${id}/balance`, { balance: newBalance });
        fetchBrokers();
    };

    useEffect(() => {
        fetchBrokers();
    }, []);

    return (
        <div>
            <h2>Brokers List</h2>
            <ul style={usersStyle}>
                {brokers.map((broker) => (
                    <li key={broker.id} >
                        <b>{broker.name}</b> ({broker.company}) - Balance: ${broker.balance}
                        <button class="btn btn-primary" style={containerStyle} onClick={() => deleteBroker(broker.id)}>Delete</button><br />
                        <input class="form-control"
                            type="number"
                            value={broker.balance}
                            onChange={(e) => updateBalance(broker.id, parseFloat(e.target.value))}
                        />
                    </li>
                ))}
            </ul>
            <div style={addUserStyle}>
                <h3>Add New Broker</h3>
                <label>Name: </label>
                <input type="text" class="form-control"  value={newBrokerName} onChange={(e) => setNewBrokerName(e.target.value)} />
                <br />
                <label>Company: </label>
                <input type="text" class="form-control"  value={newBrokerCompany} onChange={(e) => setNewBrokerCompany(e.target.value)} />
                <br />
                <label>Balance: </label>
                <input type="number" class="form-control"  value={newBrokerBalance} onChange={(e) => setNewBrokerBalance(e.target.value)} />
                <br />
                <button onClick={addBroker} class="btn btn-primary">Add Broker</button>
            </div>
        </div>
    );
};

export default BrokersList;

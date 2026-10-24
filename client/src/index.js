import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App';

if (!localStorage.getItem('token')) {
    localStorage.removeItem('username');
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
)

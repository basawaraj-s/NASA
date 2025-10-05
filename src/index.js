import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Fixed: removed stray backticks and properly closed React.StrictMode in previous edit

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

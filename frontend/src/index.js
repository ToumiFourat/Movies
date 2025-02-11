import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Assure-toi d'importer Tailwind CSS
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
    <App /> 
</BrowserRouter> );

import React from 'react'
import { createRoot } from 'react-dom/client' //creates the React root
import './styles/main.scss' //styles imported here and cascade through the entire code
import App from './App' //App.js is the routing component

// Connects React to HTML; root is the id for the div in index.html in the public folder
createRoot(document.getElementById('root')).render(<App />)
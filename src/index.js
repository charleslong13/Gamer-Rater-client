import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import {GamerRater} from "./components/GamerRater"


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <GamerRater />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



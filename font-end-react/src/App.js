import './App.css';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Home from './Components/Home/Home';
import React from 'react';
import axios from 'axios';
import AppSettings from './AppSettings';


axios.defaults.baseURL = AppSettings.AppServerAddress;

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header"  >
          MEMO APP
        </header>
      </div>

      <Home />
    </React.Fragment>

  );
}

export default App;

import logo from '../assets/logo.svg';
import '../styles/App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Routes , Route } from 'react-router-dom';

import modules from '../routes';

// import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Routes>
        {modules.map(module => (
          <Route {...module.routeProps} key={module.name} />
        ))}
      </Routes>
    </div>
  );
}

export default App;

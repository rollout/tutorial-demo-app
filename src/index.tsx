import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FeatureFlagsContextProvider } from './context/FeatureFlagsContext';

ReactDOM.render(
  <React.StrictMode>
    <FeatureFlagsContextProvider>
      <App />
    </FeatureFlagsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
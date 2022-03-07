import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FeatureFlagsContextProvider } from './context/FeatureFlagsContext';
import { Analytics } from './lib/Analytics';
import Bugsnag from '@bugsnag/js'

Analytics.init()

const bugsnagReactPlugin = Bugsnag.getPlugin('react')
const ErrorBoundary = bugsnagReactPlugin ? bugsnagReactPlugin.createErrorBoundary(React) : React.Fragment

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <FeatureFlagsContextProvider>
        <App />
      </FeatureFlagsContextProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
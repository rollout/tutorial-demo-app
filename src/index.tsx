import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { FeatureFlagsContextProvider } from './lib/featureManagement/FeatureFlagsContext';
import { Analytics } from './lib/Analytics';
import Bugsnag from '@bugsnag/js'
import { ErrorPage } from './components/errorpage/ErrorPage';
import { missingRequiredQueryParameters } from './configuration/QueryParams';

Analytics.init()

const bugsnagReactPlugin = Bugsnag.getPlugin('react')
const ErrorBoundary = bugsnagReactPlugin ? bugsnagReactPlugin.createErrorBoundary(React) : React.Fragment

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <FeatureFlagsContextProvider>
      {missingRequiredQueryParameters() 
      ? <ErrorPage/>
      : <App />
      }
      </FeatureFlagsContextProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
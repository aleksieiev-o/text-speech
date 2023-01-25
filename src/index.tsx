import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import AppComponent from './App.component';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>
);

reportWebVitals();

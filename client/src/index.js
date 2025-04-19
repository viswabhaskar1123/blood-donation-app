import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Notice the '/client'
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root')); // ✅ New API
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

import './Main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes/index';
import { CssBaseline } from '@mui/material';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <CssBaseline />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  </React.Fragment>,
);

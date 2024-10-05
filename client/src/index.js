import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import { SocketContextProvider } from './Context/Socket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <AuthContextProvider>
            <SocketContextProvider>

    <App />
    </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import UserContext from './context/UserContext.jsx';
import SocketContext from './context/SocketContext.jsx';
import SwapReqContext from './context/SwapReqContext.jsx';
import MessageContext from './context/MessageContext.jsx';

createRoot(document.getElementById('root')).render(
  <UserContext>
    <SocketContext>
      <MessageContext>
        <SwapReqContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SwapReqContext>
      </MessageContext>
    </SocketContext>
  </UserContext>

);

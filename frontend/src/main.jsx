import React from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import './index.css';

import init from './init.jsx';

const run = async () => {
  const socket = io('/');
  const root = createRoot(document.getElementById('root'));
  const app = await init(socket);
  root.render(<React.StrictMode>{app}</React.StrictMode>);
};

run();

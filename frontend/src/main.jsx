import React from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import './index.css';

import init from './init.jsx';

const socket = io('/');

const run = async () => {
  const root = createRoot(document.getElementById('root'));
  const app = await init();
  root.render(<React.StrictMode>{app}</React.StrictMode>);
};

run();

export default socket;

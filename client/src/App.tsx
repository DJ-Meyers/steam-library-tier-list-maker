import React from 'react';

import './App.css';
import { AuthProvider } from './context/auth/authContext';
import { TierlistProvider } from './context/tierlist/tierlistContext';
import Homepage from './Homepage';

function App() {
  return (
    <AuthProvider>
      <TierlistProvider>
        <Homepage />
      </TierlistProvider>
    </AuthProvider>
  );
}

export default App;

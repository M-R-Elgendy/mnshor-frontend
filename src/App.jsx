import React from 'react';
import { Router } from './components/Router';
import { IsAuthenticated } from './utils/httpCommon';
function App() {

  console.log(IsAuthenticated());
  return (
    <Router />
  );
}

export default App;

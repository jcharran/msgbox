import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Map from './Components/Map';
import AutoLocateMap from './Components/autoLocateMap';
import SearchableMap from './Components/SearchableMap';
function App() {
  return (
    <div>
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={AutoLocateMap} />
        <Route exact path="/search" component={SearchableMap} />
    </Switch>
    </BrowserRouter>
    
  </div>
  );
}

export default App;

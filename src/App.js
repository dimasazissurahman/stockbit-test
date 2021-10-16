import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './container/homePage/HomePage';
import DetailPage from './container/detailPage/detailPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/detail-page/id=:number" component={DetailPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import TaskList from './components/TaskList';
import Login from './components/Login';
import ToastMessage from './components/ToastMessage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={TaskList} />
        <Route exact path="/login" component={Login} />
        <Redirect to="/" />
        <ToastMessage />
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import routes from './routes';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { useSelector } from 'react-redux';

const Route = () => {
  const username = useSelector((state) => state.username);
  return useRoutes(routes(username));
}

const App = () => {
  return (
    <Router>
      <Route />
    </Router>
  );
}

export default App;
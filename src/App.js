// import React from 'react';
// import './assets/css/index.css';
// import { AccountInformation, Home, Login, NotFound } from './pages';
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux';

// const App = () => {
//   const username = useSelector(state => state.username);

//   return (
//     <Router>
//       <Routes>
//         <Route path='*' element={<NotFound />} />
//         <Route exact path={['/login']} element={username ? <Home /> : <Login />}></Route>
//         <Route exact path={['/', '/home']} element={username ? <Home /> : <Navigate to='/login' />} />
//         <Route exact path='/user/account' element={username ? <AccountInformation /> : <Navigate to='/login' />} />
//       </Routes>
//     </Router>
//   )
// };

// export default App;
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
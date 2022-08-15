import React from 'react';
import Register from './Register';
import UserDetails from './UserDetails'
import UserUpdate from './UserUpdate';
import PasswordUpdate from './PasswordUpdate';
import Status from './Status';
import { Routes, Route } from 'react-router-dom'
import Login from './Login';
import '../style/global.css'
const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='user' element={<Status />} >
        <Route path='details' element={<UserDetails />} ></Route>
        <Route path='update'  element={<UserUpdate />} ></Route>
        <Route path='update_password' element={<PasswordUpdate />} />


      </Route>
    </Routes>

  );
};

export default App;

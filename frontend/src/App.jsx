import React, { useContext } from 'react'
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Nav from './components/Nav';
import { userDataContext } from './context/UserContext';
function App() {
  let{userData}=useContext(userDataContext);
  return (
    <>
      {userData && <Nav />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Registration/>} />
      </Routes>
    </>
  );
}

export default App
import { useState, useContext   } from 'react'
import { Routes, Route } from 'react-router'; // Import React Router
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ReviewForm from './components/ReviewForm/reviewForm';

import { UserContext } from './contexts/UserContext';
import Footer from './components/Footer/Footer';

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/reviewForm" element={<ReviewForm />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;


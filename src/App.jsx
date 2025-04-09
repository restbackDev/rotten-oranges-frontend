import { useState, useContext   } from 'react'
import { Routes, Route } from 'react-router'; // Import React Router
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ReviewForm from './components/ReviewForm/reviewForm';
import ReviewList from './components/ReviewList/ReviewList';
import { UserContext } from './contexts/UserContext';
import Footer from './components/Footer/Footer';


// import MediaDetail from './components/MediaDetail/MediaDetail';
import Test from './components/ReviewForm/test';

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        {/* <Route path="/movie/:movieId" element={<MediaDetail />} /> */}
        <Route path="/movie/:movieId/review-form" element={<ReviewForm />} /> {/* route to a add/up review movie form */}
        <Route path="/my-reviews" element={<ReviewList />} /> {/* route to the users list of reviews  */}
        <Route path="*" element={<h2>Whoops! 404 Nothing to see here</h2>} /> 
        
        
        <Route path="/movie/:movieId" element={<Test />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;


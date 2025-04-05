import { useState } from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm"
import styles from "./Landing.module.css";

const Landing = () => {
  const [isSignUp, setIsSignUp] = useState(true)

  const toggleForm = () => {setIsSignUp(!isSignUp)}
  return (
    <main className={styles.landingContainer}>
      <div className={styles.videoContainer}>
        <video autoPlay loop muted className={styles.video}> <source src="src/assets/movie-theater.mp4" type='video/mp4' /></video>
      </div>

      <div className={styles.signUpForm}>
      <h1 className={styles.heading}>Welcome to Rotten<span className={styles.oranges}>Oranges</span></h1>
      <p className={styles.welcomeMessage}>Join the Rotten Oranges community to discover the latest movie reviews, ratings, and recommendations. Sign up now to start exploring</p>
        {isSignUp ? <SignUpForm /> : <SignInForm />}
        <p>{isSignUp ? 'Already have an account? ' : "Don't have an account yet? "}</p>
        <button onClick={toggleForm}> {isSignUp ? 'Sign In': 'Sign Up'}</button>
      </div>
    </main>
  );
};

export default Landing;

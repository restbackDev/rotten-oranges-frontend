import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm"
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <main className={styles.landingContainer}>
      <div className={styles.videoContainer}>
        <video autoPlay loop muted className={styles.video}> <source src="src/assets/movie-theater.mp4" type='video/mp4' /></video>
      </div>

      <div className={styles.signUpForm}>
      <h1>Welcome to Rotten<span>Oranges</span></h1>
      <p>Join the Rotten Oranges community to discover the latest movie reviews, ratings, and recommendations. Sign up now to start exploring</p>
        <SignUpForm />
      </div>
    </main>
  );
};

export default Landing;

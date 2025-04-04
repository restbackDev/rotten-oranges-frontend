import { useContext } from 'react';
import { Link } from 'react-router';
import styles from './NavBar.module.css';
import logo from '../../assets/orange-logo.png'
import { UserContext } from '../../contexts/UserContext';



const NavBar = () => {
  const { user } = useContext(UserContext);

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
      <h1>Rotten<span>Oranges</span></h1>
      <img src={logo} alt="Rotten Oranges Logo" style={{height: '40px'}} />
      </div>
     
      <ul>
        {user ? (
          <div className={styles.navLinks}>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/'>My Reviews</Link></li>
          <li><Link to='/'>My Favorites</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          </div>
        ) : (
        <div className={styles.navLinks}>        
          <li><Link to='/'>Home</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
          <li><Link to="/sign-up">Sign Up</Link></li>
        </div>
        )}

      </ul>
    </nav>
  );
};

export default NavBar;


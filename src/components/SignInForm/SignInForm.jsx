import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import styles from './SignIn.module.css'
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // This function doesn't exist yet, but we'll create it soon.
      // It will cause an error right now
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className={styles.signInContainer}>
      <h1>Sign In</h1>
      {/* <p>{message}</p> */}
      <form className={styles.signInForm} autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'></label>
          <input
            type='text'
            autoComplete='off'
            id='username'
            value={formData.username}
            name='username'
            placeholder='Username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'></label>
          <input
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            placeholder='Password'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.ctaButtons}>
          <button>Sign In</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;


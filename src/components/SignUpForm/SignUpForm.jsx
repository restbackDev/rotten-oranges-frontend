import { useState, useContext } from 'react';
import styles from './SignUp.module.css'
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';


const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData,[evt.target.name]: evt.target.value }); //TODO watch rec for definition
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      console.log(newUser);
      setUser(newUser);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf); //boolean true/false
  };

  return (
    <main className={styles.signUpContainer}>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'></label>
          <input
            type='text'
            id='name'
            value={username}
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
            id='password'
            value={password}
            name='password'
            placeholder='Password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirm'></label>
          <input
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            placeholder='Confirm Password'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.ctaButtons}>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
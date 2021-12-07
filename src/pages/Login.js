import React from 'react';
import '../assets/css/Login.css';
import facebook from '../assets/img/facebook.png';
import logo from '../assets/img/logo.png';
import { UserController } from '../api/controllers'
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import SnackBar from '../components/SnackBar';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [usernameErr, setUsernameErr] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordErr, setPasswordErr] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [responseErr, setResponseErr] = React.useState('');
  const validate = () => {
    const reg = /[A-Za-z_0-9]{6,}/;
    const result = [];
    if (!reg.test(username)) {
      result.push('Username must have at least 6 characters and contain only alphanumeric and underscore characters!');
    } else result.push('');

    if (!reg.test(password)) {
      result.push('Password must have at least 6 characters and contain only alphanumeric and underscore characters!');
    } else result.push('');

    return result;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setUsernameErr('');
    setPasswordErr('');

    const validateResult = validate();
    if (validateResult[0] !== '' && validateResult[1] !== '') {
      setUsernameErr(validateResult[0])
      setPasswordErr(validateResult[1]);
    } else {
      //Implement check login
      let response = await new UserController(username).login(password);
      if (response.error) {
        setResponseErr(response.error.response.data.message);
        setOpen(true);
      } else {
        window.localStorage.setItem('username', username);
        dispatch({ type: 'LOGIN', payload: { username } });
      }

      response = await new UserController(username).getInfo();
      if (response.error) {
        setResponseErr(response.error.response.data.message);
        setOpen(true);
      } else {
        dispatch({ type: 'UPDATE_USER', payload: { userinfo: response.data } });
        navigate('/home');
      }

    }
  }

  return (
    <div className='login-container'>
      <div className='login-mask' />
      <img src={logo} alt='Logo' onClick={() => navigate('/')} />

      <div className='login-content' style={{ backgroundColor: '#514e4e' }}>
        <div className='login-main'>
          <h2>Sign In</h2>
          <form className='login-form' onSubmit={onSubmit}>
            <input
              type='text'
              className='input'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className='err' field='username'>
              {usernameErr}
            </div>
            <input
              type='password'
              className='input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='err' field='password'>
              {passwordErr}
            </div>
            <input type='submit' className='submit-btn' value='Sign in' />
            <div
              className='login-form-helper'
              value={remember}
              onChange={(e) => setRemember(e.target.value)}>
              <input type='checkbox' />
              <span>Remember me</span>
            </div>
          </form>
          <div className='login-form-other'>
            <div className='login-facebook'>
              <img src={facebook} width={20} height={20} alt='facebook' />
              <span>Login with Facebook?</span>
            </div>
            <span>
              New to Netflix?
              <Link to='/register'>Sign up now.</Link>
             
            </span>
          </div>
        </div>
      </div>
      <SnackBar
        open={open}
        severity='warning'
        onClose={() => setOpen(false)}
        content={responseErr}
      />
    </div>
  )
}

export default Login;


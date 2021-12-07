import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../assets/css/SignUp.css'
import { Snackbar } from '@material-ui/core'
import logo from '../assets/img/logo.png'
import { UserController } from '../api/controllers'
import { useDispatch } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: 0,
  })
  const [err, setError] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
  })
  const [responseErr, setResponseErr] = React.useState('')
  const validate = () => {
    const reg = /[A-Za-z_0-9]{6,}/
    const regPhone = /[0-9]{10,10}/
    // eslint-disable-next-line no-useless-escape
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let username = '',
      password = '',
      confirmPassword = '',
      email = '',
      phone = ''
    if (!reg.test(user.username)) {
      username =
        'Username must have at least 6 characters and contain only alphanumeric and underscore characters!'
    }

    if (!reg.test(user.password)) {
      password =
        'Password must have at least 6 characters and contain only alphanumeric and underscore characters!'
    }

    if (user.password !== user.confirmPassword) {
      confirmPassword = 'Password and confirm password does not match'
    }

    if (!regEmail.test(user.email)) {
      email = 'required email'
    }

    if (!regPhone.test(user.phone)) {
      phone = 'required ten-digit dialing of telephone numbers'
    }

    setError({
      username,
      password,
      confirmPassword,
      email,
      phone,
    })

    return username || password || confirmPassword || email || phone ? false : true
  }

  const handleChangeValue = (e) => {
    const { name, value } = e.target
    setUser((user) => ({
      ...user,
      [name]: value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const isValidated = validate()
    if (isValidated) {
      const { password, email, phone } = user
      const { status, message } = await new UserController(
        user.username
      ).register({ password, email, phone })

      if (status === 201) {
        window.localStorage.setItem('username', user.username)
        dispatch({ type: 'LOGIN', payload: { username: user.username } })
        navigate('/home')
      } else {
        setResponseErr(message)
        setOpen(true)
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <div className='sign-up-mask' />
      <img src={logo} alt='Logo' />

      <div className='sign-up-content' style={{ backgroundColor: '#514e4e' }}>
        <div className='sign-up-main'>
          <h2>Sign Up</h2>
          <form className='sign-up-form' onSubmit={onSubmit}>
            <input
              type='text'
              name='username'
              className='input'
              placeholder='Username'
              value={user.username}
              onChange={handleChangeValue}
            />
            <div className='err' field='username'>
              {err.username}
            </div>
            <input
              type='password'
              className='input'
              name='password'
              placeholder='Password'
              value={user.password}
              onChange={handleChangeValue}
            />
            <div className='err' field='password'>
              {err.password}
            </div>
            <input
              type='password'
              className='input'
              name='confirmPassword'
              placeholder='confirm password'
              value={user.confirmPassword}
              onChange={handleChangeValue}
            />
            <div className='err' field='password'>
              {err.confirmPassword}
            </div>
            <input
              type='email'
              className='input'
              name='email'
              placeholder='email'
              value={user.email}
              onChange={handleChangeValue}
            />
            <div className='err' field='email'>
              {err.email}
            </div>
            <input
              type='phone'
              className='input'
              name='phone'
              placeholder='...'
              value={user.phone}
              onChange={handleChangeValue}
            />
            <div className='err' field='password'>
              {err.phone}
            </div>
            <input type='submit' className='submit-btn' value='Sign up' />
          </form>
          <div className='sign-up-form-other'>
            <span>
              New to Netflix?
              <Link to="/login">
                Sign in now.
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity='warning'>
          {responseErr}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SignUp

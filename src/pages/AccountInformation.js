import React from 'react'
import '../assets/scss/AccountInformation.scss'
import logo from '../assets/img/logo.png'
import { Edit, Save, ArrowBack } from '@material-ui/icons'
import { TextField, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserController } from '../api/controllers'
import SnackBar from '../components/SnackBar'
import Loading from '../components/Loading.js'

const AccountInformation = () => {
  //Router
  const navigate = useNavigate()

  //Redux
  const { username } = useSelector((state) => state)
  const dispatch = useDispatch()

  //State
  const [open, setOpen] = React.useState(false)
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [responseErr, setResponseErr] = React.useState('')
  const [successResponse, setSuccessResponse] = React.useState('')
  const [user, setUser] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(true)

  //Controller
  const userController = new UserController(username)

  //Rendering
  React.useEffect(() => {
    const getData = async () => {
      const response = await userController.getInfo()
      if (response.error) {
        setResponseErr(response.error.response.data.message)
        setOpen(true)
      } else {
        dispatch({ type: 'UPDATE_USER', payload: { userinfo: response.data } })
        setUser(response.data)
        setIsLoading(false)
      }
    }
    getData()
    // eslint-disable-next-line
  }, [username, dispatch])

  const changeInput = (e, type) => {
    e.preventDefault()
    const change = Object.assign({}, user)
    change[type] = e.target.value
    setUser(change)
  }

  //Save changes
  const save = async (e) => {
    e.preventDefault()
    //TODO: Save changes
    setIsLoading(true)
    try {
      await userController.update(user)
      setIsLoading(false)
      setSuccessResponse('Update information success!')
      setOpenSuccess(true)

      //Update user date state
      dispatch({ type: 'UPDATE_USER', payload: { userinfo: user } })
    } catch (error) {
      setIsLoading(false)
      setResponseErr(error)
      setOpen(true)
    }
  }

  //Handle input changes
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleInput = async (e) => {
    e.preventDefault()
    const item = e.target.files[0]
    console.log(item)
    const allowTypes = [
      'image/png',
      'image/jpeg',
      'image/jfif',
      'image/pjpeg',
      'image/jpg',
    ]
    if (allowTypes.indexOf(item.type) === -1) {
      setResponseErr('Please select image in png, jpeg, jpg type!')
      setOpen(true)
    } else {
      const change = Object.assign({}, user)
      change['img'] = await toBase64(item)
      setUser(change)
      setResponseErr('')
      setOpen(false)
    }
  }

  const file = React.useRef()

  return (
    <div className='main-container'>
      <img src={logo} alt='Logo' onClick={() => navigate('/')} />
      <div className='profile-box'>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='row'>
            <div className='col-1 heading'>
              <div
                style={{ backgroundImage: `url(${user?.img})` }}
                className='avatar'
              />
              <input
                ref={file}
                type='file'
                hidden
                onChange={handleInput}
                accept='image/png, image/jpeg'
              />
              <Edit className='btn' onClick={() => file.current.click()}></Edit>
              <div className='basic-info'>
                <div className='name'>
                  {user?.first_name + ' ' + user?.last_name}
                </div>
                <div className='address'>{user?.address}</div>
              </div>
            </div>
            <div className='detail-info col-1'>
              <TextField
                helperText=''
                value={user.first_name}
                onChange={(e) => changeInput(e, 'first_name')}
                label='First name'
                variant='outlined'
                className='col-2 input'
              />
              <TextField
                helperText=''
                value={user.last_name}
                onChange={(e) => changeInput(e, 'last_name')}
                label='Last name'
                variant='outlined'
                className='col-2 input'
              />
              <TextField
                helperText=''
                value={user.address}
                onChange={(e) => changeInput(e, 'address')}
                label='Address'
                variant='outlined'
                className='col-2 input'
              />
              <TextField
                helperText=''
                value={user.phone}
                onChange={(e) => changeInput(e, 'phone')}
                label='Phone number'
                variant='outlined'
                className='col-2 input'
              />
              <TextField
                helperText=''
                value={user.email}
                onChange={(e) => changeInput(e, 'email')}
                type='email'
                label='Email'
                variant='outlined'
                className='col-2 input'
              />
              <TextField
                helperText=''
                value={user.account_type}
                disabled
                label='Account type'
                variant='outlined'
                className='col-2 input'
              />
            </div>
            <div className='btn-save col-1'>
              <Button
                variant='contained'
                color='primary'
                size='large'
                className='back-btn'
                startIcon={<ArrowBack />}
                onClick={() => navigate('/home')}>
                Back
              </Button>
              <Button
                variant='contained'
                color='primary'
                size='large'
                startIcon={<Save />}
                onClick={save}>
                Save changes
              </Button>
            </div>
          </div>
        )}
      </div>
      <SnackBar
        open={open}
        onClose={() => setOpen(false)}
        content={responseErr}
        severity='warning'
      />
      <SnackBar
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        content={successResponse}
        severity='success'
      />
    </div>
  )
}

export default AccountInformation

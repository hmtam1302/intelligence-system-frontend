import React from 'react'
import '../assets/scss/AccountInformation.scss'
import logo from '../assets/img/logo.png'
import { Save, ArrowBack } from '@material-ui/icons'
import { TextField, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserController } from '../api/controllers'
import SnackBar from '../components/SnackBar'
import Loading from '../components/Loading.js'

const ConfigApriori = () => {
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
  const [data, setData] = React.useState({
    id: '',
    support: null,
    confidence: null,
  })
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
        setData((data) => ({ ...data, id: response.data.userId }))
        setIsLoading(false)
      }
    }
    getData()
    // eslint-disable-next-line
  }, [username, dispatch])

  const changeInput = (e) => {
    setData({
      ...data,
      [e.currentTarget.name]: e?.currentTarget?.value,
    })
  }

  //Save changes
  const save = async (e) => {
    e.preventDefault()

    if (isNaN(data.support) || isNaN(data.confidence)) {
      setResponseErr('support,confidence required number')
      setOpen(true)
    } else if (!(data.support >= 0.1 && data.support <= 0.3)) {
      setResponseErr('support range(0.1,0.3)')
      setOpen(true)
    } else if (!(data.confidence >= 0 && data.confidence <= 1)) {
      setResponseErr('confidence range(0,1)')
      setOpen(true)
    } else {
      //TODO: Save changes
      setIsLoading(true)
      console.log('vao')
      try {
        await userController.configApriori(
          data.id,
          +data.support,
          +data.confidence
        )
        setIsLoading(false)
        setSuccessResponse('Config apriori success!')
        setOpenSuccess(true)
      } catch (error) {
        setIsLoading(false)
        setResponseErr(error)
        setOpen(true)
      }
    }
  }

  return (
    <div className='main-container'>
      <img src={logo} alt='Logo' onClick={() => navigate('/')} />
      <div className='profile-box'>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='row'>
            <div className='detail-info col-1'>
              <TextField
                helperText=''
                type='text'
                name='support'
                value={data.support}
                onChange={changeInput}
                label='support'
                variant='outlined'
                className='col-2 input'
              />
              <TextField
                helperText=''
                type='text'
                name='confidence'
                value={data.confidence}
                onChange={changeInput}
                label='confidence'
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

export default ConfigApriori

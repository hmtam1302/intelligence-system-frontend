import React from 'react'
import '../assets/scss/ChangePassword.scss'
import logo from '../assets/img/logo.png'
import { Save, ArrowBack } from '@material-ui/icons'
import { TextField, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserController } from '../API/controllers'
import SnackBar from '../components/SnackBar'
import Loading from '../components/Loading.js'

const ChangePassword = () => {
  //Router

//   const navigate = useNavigate();

//   //Redux
//   const { username } = useSelector(state => state);

//   //State
//   const [open, setOpen] = React.useState(false);
//   const [openSuccess, setOpenSuccess] = React.useState(false);
//   const [responseErr, setResponseErr] = React.useState('');
//   const [successResponse, setSuccessResponse] = React.useState('');
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [oldPassword, setOldPassword] = React.useState('');
//   const [newPassword, setNewPassword] = React.useState('');
//   const [confirmPassword, setConfirmPassword] = React.useState('');

//   //Controller
//   const userController = new UserController(username);

//   const validate = () => {
//     const req = /[A-Za-z0-9_{6,}]/;
//     if (!req.test(oldPassword) || !req.test(newPassword) || !req.test(confirmPassword)) {
//       setResponseErr('Password at least 6 alphanumeric characters!');
//       setOpen(true);
//       return false;
//     }
//     if (newPassword === oldPassword) {
//       setResponseErr('New password must not be the same as old password!');
//       setOpen(true);
//       return false;
//     }
//     if (confirmPassword !== newPassword) {
//       setResponseErr('Confirm password not match!');
//       setOpen(true);
//       return false;
//     }

//     return true;
//   }

//   //Save changes
//   const save = async e => {
//     //Validate password
//     if (!validate()) {
//       return;
//     }
//     e.preventDefault();
//     //TODO: Save changes
//     setIsLoading(true);
//     try {
//       await userController.update({ password: newPassword });
//       setIsLoading(false);
//       setSuccessResponse("Update information success!");
//       setOpenSuccess(true);
//     } catch (error) {
//       setIsLoading(false);
//       setResponseErr(error);
//       setOpen(true);
//     }
//   }


//   return (<div className='main-container'>
//     <img src={logo} alt='Logo' onClick={() => navigate('/')} />
//     <div className='profile-box'>
//       {isLoading ? <Loading /> : <>
//         <h1>Change password</h1>
//         <div className='row'>
//           <TextField helperText='' type='password' value={oldPassword} onChange={e => setOldPassword(e.target.value)} label='Old password' variant='outlined' className='col-1 input' />
//           <TextField helperText='' type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} label='New password' variant='outlined' className='col-1 input' />
//           <TextField helperText='' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} label='Confirm password' variant='outlined' className='col-1 input' />
//           <div className='btn-save col-1'>
//             <Button
//               variant='contained'
//               color='primary'
//               size='large'
//               className='back-btn'
//               startIcon={<ArrowBack />}
//               onClick={() => navigate('/home')}
//             >
//               Back
//             </Button>
//             <Button
//               variant='contained'
//               color='primary'
//               size='large'
//               startIcon={<Save />}
//               onClick={save}
//             >
//               Save changes
//             </Button>
//           </div>
//         </div></>}
//     </div>
//     <SnackBar open={open} onClose={() => setOpen(false)} content={responseErr} severity="warning" />
//     <SnackBar open={openSuccess} onClose={() => setOpenSuccess(false)} content={successResponse} severity="success" />
//   </div>);
// };

// export default ChangePassword;

  const navigate = useNavigate()

  //Redux
  const { username } = useSelector((state) => state)

  //State
  const [open, setOpen] = React.useState(false)
  const [openSuccess, setOpenSuccess] = React.useState(false)
  const [responseErr, setResponseErr] = React.useState('')
  const [successResponse, setSuccessResponse] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  //Controller
  const userController = new UserController(username)

  const validate = () => {
    const req = /[A-Za-z0-9_{6,}]/
    if (
      !req.test(oldPassword) ||
      !req.test(newPassword) ||
      !req.test(confirmPassword)
    ) {
      setResponseErr('Password at least 6 alphanumeric characters!')
      setOpen(true)
      return false
    }
    if (newPassword === oldPassword) {
      setResponseErr('New password must not be the same as old password!')
      setOpen(true)
      return false
    }
    if (confirmPassword !== newPassword) {
      setResponseErr('Confirm password not match!')
      setOpen(true)
      return false
    }

    return true
  }

  //Save changes
  const save = async (e) => {
    //Validate password
    if (!validate()) {
      return
    }
    e.preventDefault()
    //TODO: Save changes
    setIsLoading(true)
    try {
      await userController.update({ password: newPassword })
      setIsLoading(false)
      setSuccessResponse('Update information success!')
      setOpenSuccess(true)
    } catch (error) {
      setIsLoading(false)
      setResponseErr(error)
      setOpen(true)
    }
  }

  return (
    <div className='main-container'>
      <img src={logo} alt='Logo' onClick={() => navigate('/')} />
      <div className='profile-box'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1>Change password</h1>
            <div className='row'>
              <TextField
                helperText=''
                type='password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                label='Old password'
                variant='outlined'
                className='col-1 input'
              />
              <TextField
                helperText=''
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                label='New password'
                variant='outlined'
                className='col-1 input'
              />
              <TextField
                helperText=''
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label='Confirm password'
                variant='outlined'
                className='col-1 input'
              />
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
          </>
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

export default ChangePassword

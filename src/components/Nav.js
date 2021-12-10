import React, { useState, useEffect, useRef } from 'react'
import '../assets/css/Nav.css'
import SearchBar from 'material-ui-search-bar'
import logo from '../assets/img/logo.png'
import user from '../assets/img/user.png'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { Info, ExitToApp, LockOpen } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
const ITEM_HEIGHT = 48

const Nav = ({ onChangeSearch }) => {
  const [show, handleShow] = useState(false)

  //Router
  const navigate = useNavigate()

  //Redux
  const dispatch = useDispatch()

  //State
  const { userinfo } = useSelector((state) => state)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const timeOutValue = useRef()
  const open = Boolean(anchorEl)

  //Function
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        handleShow(true)
      } else {
        handleShow(false)
      }
    })
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  const handleAccountInformation = () => {
    navigate('/user/account')
  }

  const handleChangePassword = () => {
    navigate('/user/password')
  }

  const handleConfigApriori = () => {
    navigate('/user/config')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('username')
    dispatch({ type: 'LOGOUT', payload: { username: null } })
    navigate('/')
  }

  const handleSearch = (value) => {
    if (timeOutValue.current) {
      clearTimeout(timeOutValue.current)
    }

    timeOutValue.current = setTimeout(() => {
      onChangeSearch(value)
    }, 1000)
  }

  return (
    <nav className={`nav ${show && 'nav__black'}`}>
      <img alt='Netflix logo' src={logo} className='nav__logo' />
      <div
        className='nav__search'
        style={{
          backgroundColor: '#535252',
          marginRight: '10px',
          borderRadius: '25px',
        }}>
        <SearchBar
          onChange={handleSearch}
          onCancelSearch={() => onChangeSearch('')}
          style={{
            margin: '0 auto',
            maxWidth: 800,
            backgroundColor: '#535252',
            color: 'white',
          }}
        />
      </div>
      <div
        src={user}
        className='nav__avatar'
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        style={{ backgroundImage: `url(${userinfo?.img})` }}
        onClick={handleClick}
      />

      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '30ch',
          },
        }}>
        <MenuItem onClick={handleAccountInformation}>
          <ListItemIcon>
            <Info fontSize='small' />
          </ListItemIcon>
          Account Information
        </MenuItem>
        <MenuItem onClick={handleChangePassword}>
          <ListItemIcon>
            <LockOpen fontSize='small' />
          </ListItemIcon>
          Change password
        </MenuItem>
        <MenuItem onClick={handleConfigApriori}>
          <ListItemIcon>
            <LockOpen fontSize='small' />
          </ListItemIcon>
          Config apriori arguments
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </nav>
  )
}

export default Nav

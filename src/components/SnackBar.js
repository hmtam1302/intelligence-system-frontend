import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = props => {
  return <Snackbar open={props.open} autoHideDuration={2000} onClose={props.onClose}>
    <Alert onClose={props.onClose} severity={props.severity}>{props.content}</Alert>
  </Snackbar>;
}

export default SnackBar;

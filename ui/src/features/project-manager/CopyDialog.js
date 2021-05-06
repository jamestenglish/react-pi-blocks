import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CopyDialog = (props) => {
  const { onClose, open, ...other } = props;

  const [newFileName, setNewFileName] = useState('');

  const handleCancel = () => {
    onClose(false, newFileName);
    setNewFileName('');
  };

  const handleOk = () => {
    onClose(true, newFileName);
    setNewFileName('');
  };

  const handleChange = (event) => {
    setNewFileName(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Delete File?</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Enter the new project name to copy to
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="New Project Name"
          type="string"
          value={newFileName}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleOk}
          color="secondary"
          disabled={newFileName === ''}
        >
          Copy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CopyDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default CopyDialog;

import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PanToolIcon from '@material-ui/icons/PanTool';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { SocketContext } from 'socket-config/socket';

const ConfirmationDialogRaw = (props) => {
  const { onClose, open, ...other } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
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
      <DialogTitle id="confirmation-dialog-title">Power Off?</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to power off?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          No
        </Button>
        <Button onClick={handleOk} color="primary">
          yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.success.main),
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
}))(Button);

const Terminal = ({ isProjectRunning, projectName, projectCode }) => {
  console.group('Terminal');
  const [response, setResponse] = useState('');
  const [value, setValue] = useState('');
  const messagesEndRef = useRef(null);
  const [open, setOpen] = useState(false);

  const socket = useContext(SocketContext);
  console.log({ socket });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClose = (newValue) => {
    console.group('handleClose');
    setOpen(false);

    if (newValue) {
      console.log('emitting powerOff');
      socket.emit('powerOff');
    }
    console.groupEnd();
  };

  useEffect(() => {
    scrollToBottom();
  }, [response]);

  useEffect(() => {
    socket.on('message', (data) => {
      console.group('on message');
      const buf = String.fromCharCode.apply(null, new Uint8Array(data));
      console.log({ buf });
      setResponse((prev) => `${prev}<p class="terminal">${buf}</p>`);
      console.groupEnd();
    });
    socket.on('exit', (data) => {
      console.group('on exit');
      console.log({ data });
      console.groupEnd();
      setResponse((prev) => `${prev}<p class="terminal">${data}</p>`);
    });
  }, [socket]);

  const handleSubmit = (event) => {
    console.group('handleSubmit');
    console.log({ value });
    console.log('emitting');
    socket.emit('message', value);

    setValue('');
    event.preventDefault();
    console.groupEnd();
  };

  const handleRun = () => {
    console.group('handleRun');
    console.log('emitting');

    socket.emit('copyProject', { projectCode });

    setTimeout(() => {
      const runProgramCmd =
        'sudo node /home/pi/Development/johnny-five/index.js';

      socket.emit('message', runProgramCmd);
      socket.emit('projectStarted');
    }, 1000);

    console.groupEnd();
  };

  const handleStop = () => {
    console.group('handleStop');
    console.log('emitting');

    const exitProgramCmd = `.exit`;
    socket.emit('message', exitProgramCmd);
    setTimeout(() => {
      socket.emit('stopProject');
    }, 500);

    console.groupEnd();
  };

  const useStyles = makeStyles((theme) => ({
    buttonBar: {
      '& > *': {
        margin: theme.spacing(1),
      },
      width: '100%',
      position: 'fixed',
    },
    terminalContainer: {
      paddingTop: '46px',
    },
    shutdown: {
      float: 'right',
    },
  }));

  const classes = useStyles();
  console.groupEnd();

  return (
    <>
      <div className={classes.buttonBar}>
        <GreenButton
          variant="contained"
          size="small"
          startIcon={<PlayCircleOutlineIcon />}
          disabled={
            isProjectRunning || projectName == null || projectCode === ''
          }
          onClick={handleRun}
        >
          Play
        </GreenButton>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<PanToolIcon />}
          disabled={!isProjectRunning}
          onClick={handleStop}
        >
          Stop
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.shutdown}
          startIcon={<PowerSettingsNewIcon />}
          disabled={isProjectRunning}
          onClick={() => setOpen(true)}
        >
          Turn off
        </Button>
        <ConfirmationDialogRaw
          id="power-off-dialog"
          keepMounted
          open={open}
          onClose={handleClose}
        />
      </div>
      <div className={`terminal ${classes.terminalContainer}`}>
        <div>
          {/* eslint-disable react/self-closing-comp, react/no-danger */}
          <div
            className="terminal"
            dangerouslySetInnerHTML={{ __html: response }}
          ></div>
          {/* eslint-enable */}
          <div ref={messagesEndRef} />
        </div>
        <form className="terminal" onSubmit={handleSubmit}>
          &gt;{' '}
          <input
            className="terminal"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
      </div>
    </>
  );
};

Terminal.propTypes = {
  isProjectRunning: PropTypes.bool.isRequired,
  projectName: PropTypes.string,
  projectCode: PropTypes.string,
};

export default Terminal;

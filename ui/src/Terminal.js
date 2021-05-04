import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { SocketContext } from './socket';

const Terminal = () => {
  const [response, setResponse] = useState('');
  const [value, setValue] = useState('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const socket = useContext(SocketContext);
  console.log({ socket });

  useEffect(() => {
    scrollToBottom();
  }, [response]);

  useEffect(() => {
    socket.on('connect', function () {
      console.log('Client has connected to the server!');
    });
    socket.on('message', function (data) {
      const buf = String.fromCharCode.apply(null, new Uint8Array(data));
      setResponse((prev) => `${prev}<p class="terminal">${buf}</p>`);
    });
    socket.on('exit', function (data) {
      setResponse((prev) => `${prev}<p class="terminal">${data}</p>`);
    });
  }, [socket]);

  const handleSubmit = (event) => {
    console.log({ value });
    socket.emit('message', value);
    // socket.send(value);

    setValue('');
    event.preventDefault();
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="success"
          size="small"
          className={classes.button}
          startIcon={<PlayCircleOutlineIcon />}
        >
          Play
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<PlayCircleOutlineIcon />}
        >
          Create Button
        </Button>
      </div>
      <div className="terminal">
        <div>
          <div
            className="terminal"
            dangerouslySetInnerHTML={{ __html: response }}
          ></div>
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

export default Terminal;

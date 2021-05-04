import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { SocketContext } from './socket';

const Terminal = () => {
  console.group('Terminal');
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
    socket.on('connect', () => {
      console.log('Client has connected to the server!');
    });
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
    // socket.send(value);

    setValue('');
    event.preventDefault();
    console.groupEnd();
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  console.groupEnd();
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

export default Terminal;

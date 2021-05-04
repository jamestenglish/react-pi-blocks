import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './socket';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
  listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  formRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const ProjectManager = ({ handleProjectNameSelection }) => {
  const socket = useContext(SocketContext);
  const [files, setFiles] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, file) => {
    handleProjectNameSelection(file);
    setSelectedIndex(null);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    socket.on('connect', function () {
      console.log('Client has connected to the server!');
    });
    console.log('emit getFiles');
    socket.emit('getFiles');
    socket.on('files', (data) => {
      console.log('on files');
      console.log({ data });
      setFiles(data);
    });
  }, [socket]);

  let fileList = null;
  if (files !== null) {
    fileList = files.map((file, index) => (
      <ListItem
        button
        key={file}
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, file)}
      >
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary={file} />
      </ListItem>
    ));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div className={classes.listRoot}>
            {fileList === null ? (
              <CircularProgress />
            ) : (
              <List
                component="nav"
                aria-label="project files"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Saved Projects
                  </ListSubheader>
                }
              >
                {fileList}
              </List>
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <form className={classes.formRoot} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="New Project Name"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={inputValue.trim().length === 0}
              onClick={() => {
                const projectName = `${inputValue.trim()}.xml`;
                handleProjectNameSelection(projectName);
                setInputValue('');
              }}
            >
              Create New Project
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectManager;

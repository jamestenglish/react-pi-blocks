import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import CircularProgress from '@material-ui/core/CircularProgress';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { SocketContext } from 'socket-config/socket';

import ProjectListItem from './ProjectListItem';

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
  console.group('ProjectManager');
  const socket = useContext(SocketContext);
  const [files, setFiles] = useState(null);
  const [inputValue, setInputValue] = useState('');
  // TODO jte check create doesn't exist
  const handleDelete = useCallback(
    (fileName) => {
      console.group('handleDelete');

      console.log('emitting deleteFile');
      socket.emit('deleteFile', { fileName });

      console.groupEnd();
    },
    [socket]
  );

  const handleCopy = useCallback(
    (fileName, newFileName) => {
      console.group('handleCopy');

      console.log('emitting handleCopy');
      socket.emit('copyFile', { fileName, newFileName });

      console.groupEnd();
    },
    [socket]
  );
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = useCallback(
    (event, file) => {
      console.group('handleListItemClick');
      console.log({ file });
      console.groupEnd();
      handleProjectNameSelection(file);
      setSelectedIndex(null);
    },
    [handleProjectNameSelection]
  );

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  useEffect(() => {
    console.log('emit getFiles');
    socket.emit('getFiles');

    socket.on('files', (data) => {
      console.group('on files');
      console.log({ data });
      console.groupEnd();
      setFiles(data);
    });
  }, [socket]);

  let fileList = null;
  if (files !== null) {
    fileList = files.map((file, index) => (
      <ProjectListItem
        key={file}
        file={file}
        index={index}
        selectedIndex={selectedIndex}
        handleDelete={handleDelete}
        handleCopy={handleCopy}
        handleListItemClick={handleListItemClick}
      />
    ));
  }
  console.groupEnd();

  return (
    <>
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
                disabled={inputValue.trim().length === 0 || fileList === null}
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
    </>
  );
};

ProjectManager.propTypes = {
  handleProjectNameSelection: PropTypes.func.isRequired,
};

export default ProjectManager;

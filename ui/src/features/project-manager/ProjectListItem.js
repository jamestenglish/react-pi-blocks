import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import CopyDialog from './CopyDialog';

const ProjectListItem = ({
  selectedIndex,
  file,
  index,
  handleListItemClick,
  handleDelete,
  handleCopy,
}) => {
  console.group('ProjectListItem');
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(
    false
  );
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);

  const handleConfirmDeleteDialogClose = useCallback(
    (isConfirmed) => {
      console.group('handleConfirmDeleteDialogClose');
      setIsConfirmDeleteDialogOpen(false);

      if (isConfirmed) {
        handleDelete(file);
      }
      console.groupEnd();
    },
    [file, handleDelete]
  );

  const handleCopyDialogClose = useCallback(
    (isConfirmed, newFileName) => {
      console.group('handleCopyDialogClose');
      setIsCopyDialogOpen(false);

      if (isConfirmed) {
        handleCopy(file, `${newFileName}.xml`);
      }
      console.groupEnd();
    },
    [file, handleCopy]
  );

  console.groupEnd();
  return (
    <>
      <ListItem
        button
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, file)}
      >
        <ListItemAvatar>
          <Avatar>
            <DescriptionIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={file} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setIsConfirmDeleteDialogOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="copy"
            onClick={() => setIsCopyDialogOpen(true)}
          >
            <FileCopyIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ConfirmDeleteDialog
        keepMounted
        open={isConfirmDeleteDialogOpen}
        file={file}
        onClose={handleConfirmDeleteDialogClose}
      />
      <CopyDialog
        keepMounted
        open={isCopyDialogOpen}
        onClose={handleCopyDialogClose}
      />
    </>
  );
};

ProjectListItem.propTypes = {
  selectedIndex: PropTypes.number,
  file: PropTypes.string.isRequired,
  handleListItemClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCopy: PropTypes.func.isRequired,
};

export default ProjectListItem;

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ReactBlockly from 'react-blockly';
import Blockly from 'blockly';

import toolboxCategories from 'toolbox/toolboxCategories';
import workspaceDidChangeInner from './workspaceDidChangeInner';

const onImportXmlError = (e) => {
  console.group('xml error');
  console.error(e);
  console.groupEnd();
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const BlocklyToolbox = ({ toolboxState, handleToolboxChange }) => {
  console.group('BlocklyToolbox');
  const { xml } = toolboxState;
  console.log({ xml });

  const workspaceRef = useRef();
  const initializedRef = useRef(false);

  console.log({ workspaceRef });

  const createVariable = (type) => {
    if (workspaceRef.current) {
      Blockly.Variables.createVariableButtonHandler(
        workspaceRef.current,
        null,
        type
      );
    }
  };

  const workspaceDidChange = (workspace) =>
    workspaceDidChangeInner(
      workspace,
      initializedRef,
      workspaceRef,
      xml,
      handleToolboxChange
    );

  const classes = useStyles();
  console.groupEnd();

  return (
    <>
      <div className={classes.root}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => createVariable('LED')}
        >
          Create LED
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => createVariable('BUTTON')}
        >
          Create Button
        </Button>
      </div>
      <ReactBlockly
        ref={workspaceRef}
        toolboxCategories={toolboxCategories}
        initialXml={xml}
        wrapperDivClassName="fill-height"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true,
          },
        }}
        workspaceDidChange={workspaceDidChange}
        onImportXmlError={onImportXmlError}
        processToolboxCategory={(toolboxCategory) => {
          console.group('processToolboxCategory');
          console.log({ toolboxCategory });
          console.groupEnd();
          return toolboxCategory;
        }}
      />
    </>
  );
};

BlocklyToolbox.propTypes = {
  toolboxState: PropTypes.shape({
    xml: PropTypes.string,
    code: PropTypes.string,
  }).isRequired,
  handleToolboxChange: PropTypes.func.isRequired,
};
export default BlocklyToolbox;

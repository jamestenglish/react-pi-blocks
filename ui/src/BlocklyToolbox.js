import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ReactBlockly from 'react-blockly';
import Blockly from 'blockly';

import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

import toolboxCategories from './toolbox/toolboxCategories';

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
  console.log({ workspaceRef });

  let initialized = false;
  let currWorkspace;

  const createVariable = (type) => {
    if (currWorkspace) {
      Blockly.Variables.createVariableButtonHandler(currWorkspace, null, type);
    }
  };
  const workspaceDidChange = (workspace) => {
    currWorkspace = workspace;
    if (!initialized && workspace) {
      console.group('initialization');
      console.log('Initializing Workspace');
      console.groupEnd();
    }
    console.log({ workspace });
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const rearrangedCode = `
  const { RaspiIO } = require('raspi-io');
  const five = require("johnny-five");
  const board = new five.Board({
    io: new RaspiIO()
  });

  ${code}`;

    let prettierCode = rearrangedCode;
    try {
      prettierCode = prettier.format(rearrangedCode, {
        parser: 'babel',
        plugins: [parserBabel],
      });
    } catch (err) {
      console.group('Prettier Error');
      console.error(err);
      console.groupEnd();
    }
    if (xml !== newXml || !initialized) {
      console.group('xml changed');
      console.log('setting state');
      console.groupEnd();
      handleToolboxChange({ code: prettierCode, xml: newXml });
    }
    initialized = true;
  };

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

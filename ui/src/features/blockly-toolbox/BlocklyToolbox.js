import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ReactBlockly from 'react-blockly';
import Blockly from 'blockly';
import { LED, BUTTON, SENSOR, PCF8591, PIEZO } from 'constants/blockConstants';
import GPIOPins, { getGPIOBlockName } from 'constants/GPIOPins';
import PCF8591Pins, { getPCF8591PinBlockName } from 'constants/PCF8591Pins';

import toolboxCategories from './toolboxCategories';

import workspaceDidChangeInner from './workspaceDidChangeInner';

const GPIOPinBlocksLimiters = GPIOPins.reduce((acc, option) => {
  const [name] = option;
  const key = getGPIOBlockName(name);
  return {
    ...acc,
    [key]: 1,
  };
}, {});

const PCF8591PinBlocksLimiters = PCF8591Pins.reduce((acc, name) => {
  const key = getPCF8591PinBlockName(name);

  return {
    ...acc,
    [key]: 1,
  };
}, {});

const blockLimiters = {
  ...GPIOPinBlocksLimiters,
  ...PCF8591PinBlocksLimiters,
};

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
  // console.log({ xml });

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
          onClick={() => createVariable(LED)}
        >
          Create LED
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => createVariable(BUTTON)}
        >
          Create Button
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => createVariable(PCF8591)}
        >
          Create PCF8591
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => createVariable(SENSOR)}
        >
          Create Sensor
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => createVariable(PIEZO)}
        >
          Create Piezo
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
          maxInstances: blockLimiters,
        }}
        workspaceDidChange={workspaceDidChange}
        onImportXmlError={onImportXmlError}
        processToolboxCategory={(toolboxCategory) => {
          console.group('BlocklyToolbox.processToolboxCategory');
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

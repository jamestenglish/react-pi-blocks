/* eslint-disable import/newline-after-import, import/first, import/order */
import './App.css';
import createLogHelper from 'helpers/createLogHelper';

// import './customBlocks/custom_Blocks';
import './customBlocks/required/board_setup_blocks';
import './customBlocks/led/led';
import './customBlocks/button/button';
import './customBlocks/GPIOpins/pins';
import './customBlocks/virtualBoards/PCF8591';
import './customBlocks/sensor/sensor';
import './customBlocks/piezo/piezo';
import './customBlocks/motor/motor';

import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BlocklyToolbox from 'features/blockly-toolbox/BlocklyToolbox';
import Terminal from './Terminal';
import ProjectManager from 'features/project-manager/ProjectManager';

import { SocketContext, socket } from 'socket-config/socket';

createLogHelper([
  'createGetSensorGenerators',
  'sensor.onChange',
  'App',
  'ProjectManager',
  'ProjectListItem',
  'Terminal',
  'ProjectManager.on files',
  'ProjectManager.handleListItemClick',
  'App.getFile Effect',
  'App.on file',
  'BlocklyToolbox.processToolboxCategory',
  'workspaceDidChangeInner.initialization',
  'workspaceDidChangerInner.xml changed',
  'createGetSensorGenerators.hasSurroundedAncestor',
  'BlocklyToolbox',
]);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const initialXml =
  '<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_setup" id="{`$}^q8GM8vjCjK?)f5u" x="90" y="30"></block></xml>';

const App = () => {
  console.group('App');
  const [toolboxState, setToolboxState] = useState({
    code: '',
    xml: initialXml,
  });
  const [tabValue, setTabValue] = useState(0);
  const [projectName, setProjectName] = useState(null);

  const [isProjectRunning, setIsProjectRunning] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProjectNameSelection = useCallback((projectNameToUpdate) => {
    setProjectName(projectNameToUpdate);
  }, []);

  const handleToolboxChange = useCallback(
    ({ xml, code }) => {
      setToolboxState({ xml, code });
      if (projectName !== null) {
        // console.group('handleToolboxChange');
        // console.log({ xml, projectName });
        // console.groupEnd();
        socket.emit('saveFile', { contents: xml, fileName: projectName });
      }
    },
    [projectName]
  );

  useEffect(() => {
    if (projectName !== null) {
      console.group('App.getFile Effect');
      console.log({ projectName });
      console.groupEnd();
      socket.emit('getFile', { fileName: projectName });
    }
  }, [projectName]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Client has connected to the server!');
    });

    socket.on('file', (file) => {
      console.group('App.on file');
      if (file === '') {
        console.log('blank file');
        setToolboxState({ code: '', xml: initialXml });
      } else {
        const buf = String.fromCharCode.apply(null, new Uint8Array(file));
        console.log({ buf });
        setToolboxState({ code: '', xml: buf });
      }
      setTabValue(1);
      console.groupEnd();
    });

    socket.on('projectStatus', (status) => {
      console.group('on projectStatus');
      console.log({ status });
      setIsProjectRunning(status);
      console.groupEnd();
    });
  }, []);

  console.groupEnd();
  return (
    <SocketContext.Provider value={socket}>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Blockly Tabs"
        >
          <Tab label="Projects" disabled={isProjectRunning} />
          <Tab
            label="Blockly"
            disabled={projectName === null || isProjectRunning}
          />
          <Tab
            label="Code"
            disabled={projectName === null || isProjectRunning}
          />
          <Tab
            label="XML"
            disabled={projectName === null || isProjectRunning}
          />
          <Tab label="Run" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <ProjectManager
          handleProjectNameSelection={handleProjectNameSelection}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {tabValue === 1 && (
          <BlocklyToolbox
            toolboxState={toolboxState}
            handleToolboxChange={handleToolboxChange}
          />
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <pre>{toolboxState.code}</pre>
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <pre id="generated-xml">{toolboxState.xml}</pre>
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Terminal
          isProjectRunning={isProjectRunning}
          projectCode={toolboxState.code}
          projectName={projectName}
        />
      </TabPanel>
    </SocketContext.Provider>
  );
};

export default App;

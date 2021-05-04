import './App.css';
import './customBlocks/custom_Blocks';
import './customBlocks/required/board_setup_blocks';
import './customBlocks/led/led';
import './customBlocks/button/button';
import './customBlocks/pins/pins';
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BlocklyToolbox from './BlocklyToolbox';
import Terminal from './Terminal';
import ProjectManager from './ProjectManager';

import { SocketContext, socket } from './socket';

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
      {/* {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )} */}
      {children}
      {/* {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )} */}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const initialXml =
  '<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable type="LED" id="g^2Gj.3/H$,ISAy|HB1{">led1</variable></variables><block type="board_setup" id="{`$}^q8GM8vjCjK?)f5u" x="90" y="30"><statement name="MAIN"><block type="set_led" id="R)dz)nVwl5Mn.kA1[P8i"><value name="PIN"><block type="pin_5" id="P53XXFoi{@oEOht9j;#x"></block></value><value name="LED"><block type="get_led" id="-X%8-~Q:fdUJshdq-nG="><field name="LED" id="g^2Gj.3/H$,ISAy|HB1{" variabletype="LED">led1</field></block></value></block></statement></block></xml>';

const App = () => {
  console.group('App');
  const [toolboxState, setToolboxState] = useState({
    code: '',
    xml: initialXml,
  });
  const [tabValue, setTabValue] = useState(0);
  const [projectName, setProjectName] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProjectNameSelection = useCallback((projectName) => {
    setProjectName(projectName);
    setTabValue(1);
  }, []);

  const handleToolboxChange = useCallback(
    ({ xml, code }) => {
      setToolboxState({ xml, code });
      if (projectName !== null) {
        console.group('handleToolboxChange');
        console.log({ xml, projectName });
        console.groupEnd();
        socket.emit('saveFile', { contents: xml, fileName: projectName });
      }
    },
    [projectName]
  );

  useEffect(() => {
    if (projectName !== null) {
      console.group('getFile Effect');
      console.log({ projectName });
      console.groupEnd();
      socket.emit('getFile', { fileName: projectName });
    }
  }, [projectName]);

  useEffect(() => {
    socket.on('file', (file) => {
      if (file === '') {
        console.log('blank file');
        setToolboxState({ code: '', xml: initialXml });
      } else {
        const buf = String.fromCharCode.apply(null, new Uint8Array(file));
        console.log({ buf });
        setToolboxState({ code: '', xml: buf });
      }
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Blockly Tabs"
        >
          <Tab label="Projects" />
          <Tab label="Blockly" disabled={projectName === null} />
          <Tab label="Code" disabled={projectName === null} />
          <Tab label="XML" disabled={projectName === null} />
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
        <textarea
          id="code"
          style={{ height: '200px', width: '800px' }}
          value={toolboxState.code}
        ></textarea>
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <pre id="generated-xml">{toolboxState.xml}</pre>
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Terminal />
      </TabPanel>
    </SocketContext.Provider>
  );
};

export default App;

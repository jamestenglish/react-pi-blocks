import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { SocketContext } from './socket';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import BlocklyToolbox from './BlocklyToolbox';
import Terminal from './Terminal';
import ProjectManager from './ProjectManager';

const TabPanel = (props) => {
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
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const AppTabs = ({
  tabValue,
  handleTabChange,
  project,
  toolboxState,
  setToolboxState,
  setProject,
}) => {
  const socket = useContext(SocketContext);
  const [projectName, setProjectName] = useState(null);
  const handleProjectNameSelection = useCallback(
    (projectName) => {
      setProjectName(projectName);
      handleTabChange(null, 1);
    },
    [handleTabChange]
  );
  return (
    <>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Blockly Tabs"
        >
          <Tab label="Projects" />
          <Tab label="Blockly" disabled={project === null} />
          <Tab label="Code" disabled={project === null} />
          <Tab label="XML" disabled={project === null} />
          <Tab label="Run" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <ProjectManager
          handleProjectNameSelection={handleProjectNameSelection}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <BlocklyToolbox
          toolboxState={toolboxState}
          setToolboxState={setToolboxState}
        />
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
    </>
  );
};

export default AppTabs;

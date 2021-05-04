import "./App.css";
import "./customBlocks/custom_Blocks";
import "./customBlocks/required/board_setup_blocks";
import "./customBlocks/led/led";
import "./customBlocks/button/button";
import "./customBlocks/pins/pins";
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import BlocklyToolbox from "./BlocklyToolbox";

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

export default function App() {
  const [toolboxState, setToolboxState] = useState({
    code: "",
    xml: initialXml,
  });
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Blockly" />
          <Tab label="Code" />
          <Tab label="XML" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <BlocklyToolbox
          toolboxState={toolboxState}
          setToolboxState={setToolboxState}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <textarea
          id="code"
          style={{ height: "200px", width: "800px" }}
          value={toolboxState.code}
        ></textarea>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <pre id="generated-xml">{toolboxState.xml}</pre>
      </TabPanel>
    </>
  );
}

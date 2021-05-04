import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import ReactBlockly from "react-blockly";
import Blockly from "blockly";

import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

// import pinLimiter from "./helpers/pinLimiter";
import toolboxCategories from "./toolbox/toolboxCategories";

// const initialXml =
//   '<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_setup" id="{`$}^q8GM8vjCjK?)f5u" x="90" y="30"></block></xml>';

// const changeListener = (event) => {
//   pinLimiter(event, currWorkspace);
// };

// const workspaceDidChange = (workspace) => {
//   currWorkspace = workspace;
//   if (!initialized && workspace) {
//     workspace.addChangeListener(changeListener);
//     initialized = true;
//     console.log("INITIALIZED");
//     console.log("---");
//   }
//   const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
//   document.getElementById("generated-xml").innerText = newXml;

//   const code = Blockly.JavaScript.workspaceToCode(workspace);
//   const rearrangedCode = `
//   const { RaspiIO } = require('raspi-io');
//   const five = require("johnny-five");
//   const board = new five.Board({
//     io: new RaspiIO()
//   });

//   ${code}`;

//   let prettierCode = rearrangedCode;
//   try {
//     prettierCode = prettier.format(rearrangedCode, {
//       parser: "babel",
//       plugins: [parserBabel],
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   document.getElementById("code").value = prettierCode;
// };

// const createWorkspaceDidChange = (setToolboxValue) => (workspace) => {
//   const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
//   document.getElementById("generated-xml").innerText = newXml;

//   const code = Blockly.JavaScript.workspaceToCode(workspace);
//   const rearrangedCode = `
//   const { RaspiIO } = require('raspi-io');
//   const five = require("johnny-five");
//   const board = new five.Board({
//     io: new RaspiIO()
//   });

//   ${code}`;

//   let prettierCode = rearrangedCode;
//   try {
//     prettierCode = prettier.format(rearrangedCode, {
//       parser: "babel",
//       plugins: [parserBabel],
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   document.getElementById("code").value = prettierCode;
// };

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const BlocklyToolbox = ({ toolboxState, handleToolboxChange }) => {
  console.log("render");
  const { xml } = toolboxState;
  console.log({ xml });
  // const workspaceDidChange = createWorkspaceDidChange(setToolboxValue);

  let initialized = false;
  let currWorkspace;

  const createVariable = (type) => {
    if (currWorkspace) {
      Blockly.Variables.createVariableButtonHandler(currWorkspace, null, type);
    }
  };
  function workspaceDidChange(workspace) {
    currWorkspace = workspace;
    if (!initialized && workspace) {
      // workspace.addChangeListener(changeListener);
      initialized = true;
      console.log("INITIALIZED");
      console.log("---");
    }
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    // document.getElementById("generated-xml").innerText = newXml;
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
        parser: "babel",
        plugins: [parserBabel],
      });
    } catch (err) {
      console.log(err);
    }
    if (xml !== newXml) {
      console.log("setting state");
      handleToolboxChange({ code: prettierCode, xml: newXml });
    }
  }

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => createVariable("LED")}
        >
          Create LED
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => createVariable("BUTTON")}
        >
          Create Button
        </Button>
      </div>
      <ReactBlockly
        toolboxCategories={toolboxCategories}
        initialXml={xml}
        wrapperDivClassName="fill-height"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
        }}
        workspaceDidChange={workspaceDidChange}
        onImportXmlError={(e) => console.log({ e })}
      />
    </>
  );
};

BlocklyToolbox.propTypes = {
  toolboxState: PropTypes.any.isRequired,
  setToolboxState: PropTypes.any.isRequired,
};
export default BlocklyToolbox;

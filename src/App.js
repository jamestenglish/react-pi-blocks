import "./App.css";
import "./customBlocks/custom_Blocks";
import "./customBlocks/required/board_setup_blocks";
import "./customBlocks/led/led";
import "./customBlocks/button/button";
import "./customBlocks/pins/pins";
import React from "react";
import ReactBlockly from "react-blockly";
import Blockly from "blockly";

import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

import gpioOptions from "./customBlocks/constants/gpioOptions";
import pinLimiter from "./helpers/pinLimiter";

export default function App() {
  const pinBlocks = gpioOptions.map((option) => {
    const [name] = option;
    const blockName = `pin_${name.replaceAll("#", "")}`;
    return {
      type: blockName,
    };
  });
  const initialXml =
    '<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_setup" id="{`$}^q8GM8vjCjK?)f5u" x="90" y="30"></block></xml>';
  const toolboxCategories = [
    {
      name: "Logic",
      colour: "#5C81A6",
      blocks: [
        {
          type: "controls_if",
        },
        {
          type: "logic_compare",
        },
      ],
    },
    {
      name: "Math",
      colour: "#5CA65C",
      blocks: [
        {
          type: "math_round",
        },
        {
          type: "math_number",
        },
      ],
    },
    {
      name: "Required",
      colour: "#5CA699",
      blocks: [
        {
          type: "board_setup",
        },
      ],
    },
    {
      name: "Pins",
      colour: "#5CA699",
      blocks: pinBlocks,
    },

    {
      name: "LED",
      colour: "#5CA699",
      blocks: [
        {
          type: "set_led",
        },
        {
          type: "get_led",
        },
        {
          type: "led_on_off",
        },
      ],
    },
    {
      name: "Button",
      colour: "#5CA699",
      blocks: [
        {
          type: "set_button",
        },
        {
          type: "get_button",
        },
        {
          type: "button_on_off",
        },
      ],
    },
  ];

  let initialized = false;
  let currWorkspace;
  const changeListener = (event) => {
    pinLimiter(event, currWorkspace);
  };
  const createVariable = (type) => {
    Blockly.Variables.createVariableButtonHandler(currWorkspace, null, type);
  };
  function workspaceDidChange(workspace) {
    currWorkspace = workspace;
    if (!initialized && workspace) {
      workspace.addChangeListener(changeListener);
      initialized = true;
      console.log("INITIALIZED");
      console.log("---");
    }
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    document.getElementById("generated-xml").innerText = newXml;

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
    document.getElementById("code").value = prettierCode;
  }

  return (
    <>
      <div>
        <button onClick={() => createVariable("LED")}>Create LED</button>
        <button onClick={() => createVariable("BUTTON")}>Create Button</button>
      </div>
      <ReactBlockly
        toolboxCategories={toolboxCategories}
        initialXml={initialXml}
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
      />
      <pre id="generated-xml"></pre>
      <textarea
        id="code"
        style={{ height: "200px", width: "800px" }}
        value=""
      ></textarea>
    </>
  );
}

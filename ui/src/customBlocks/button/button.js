/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';

import createGenerators from 'customBlocks/generators/createGenerators';

import { inputType, color, variableName, BLOCKS_MAP } from './constants';

const STATEMENT_NAME = 'BUTTON_STMT';
const BUTTON_COMMAND = 'BUTTON_COMMAND';

const { code, block } = createGenerators({ inputType, color });

Blockly.Blocks[BLOCKS_MAP['makePin']] = {
  init: block.makePin({
    useText: 'used for Button named',
    variableName,
  }),
};

Blockly.JavaScript[BLOCKS_MAP['makePin']] = code.makePin({
  constructorName: 'five.Button',
});

Blockly.Blocks[BLOCKS_MAP['get']] = {
  init: block.getVariable({
    variableName,
  }),
};

Blockly.JavaScript[BLOCKS_MAP['get']] = code.getVariable();

// TODO JTE REFACTOR THIS
Blockly.Blocks[BLOCKS_MAP['on_off']] = {
  init: function () {
    this.appendDummyInput().appendField('When');
    this.appendDummyInput(inputType).appendField(
      new Blockly.FieldVariable(variableName, null, [inputType], inputType),
      inputType
    );
    this.appendDummyInput()
      .appendField('is')
      .appendField(
        new Blockly.FieldDropdown([
          ['Down', 'down'],
          ['Up', 'up'],
          ['Hold', 'hold'],
        ]),
        BUTTON_COMMAND
      );
    this.appendStatementInput(STATEMENT_NAME).setCheck(null);

    this.setColour(color);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  // mutationToDom: function () {
  //   var container = document.createElement("mutation");
  //   var holdInput = this.getFieldValue("BUTTON_COMMAND") === "hold";
  //   container.setAttribute("hold_input", holdInput);
  //   return container;
  // },
  // domToMutation: function (xmlElement) {
  //   var holdInput = xmlElement.getAttribute("hold_input") === "true";
  //   this.updateShape_(holdInput);
  // },

  // validate: function (newValue) {
  //   const holdInput = newValue === "hold";
  //   this.getSourceBlock().updateShape_(holdInput);
  //   return newValue;
  // },
  // updateShape_: function (holdInput) {

  //   const inputExists = this.getInput("WAIT_TIME");
  //   if (holdInput) {
  //     if (!inputExists) {
  //       this.appendDummyInput("WAIT_TIME")
  //         .appendField("for")
  //         .appendField(new Blockly.FieldNumber(500, 0), "WAIT_TIME_IN_MS")
  //         .appendField("milliseconds");
  //     }
  //   } else if (inputExists) {
  //     this.removeInput("WAIT_TIME");
  //   }
  // },
};

Blockly.JavaScript[BLOCKS_MAP['on_off']] = function (blockIn) {
  const buttonCommand = blockIn.getFieldValue(BUTTON_COMMAND);

  const statementsMain = Blockly.JavaScript.statementToCode(
    blockIn,
    STATEMENT_NAME
  );

  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    blockIn.getFieldValue(inputType),
    Blockly.Variables.NAME_TYPE
  );

  const codeOut = `
  ${codeVariableName}.on("${buttonCommand}", () => {
    ${statementsMain}
  });
  `;

  return codeOut;
};

/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';
import { BUTTON, COLORS } from 'constants/blockConstants';

import createGenerators from 'helpers/pinInputGenerators';

const inputType = BUTTON;
const color = COLORS[BUTTON];
const variableName = 'Button Name';

const { code, block } = createGenerators({ inputType, color });

Blockly.Blocks['set_button'] = {
  init: block.setGenerator({
    useText: 'be used for Button named',
    variableName,
  }),
};

Blockly.JavaScript['set_button'] = code.setGenerator({
  constructorName: 'five.Button',
});

Blockly.Blocks['get_button'] = {
  init: block.getGenerator({
    variableName,
  }),
};

Blockly.JavaScript['get_button'] = code.getGenerator();

Blockly.Blocks['button_on_off'] = {
  init: function () {
    this.appendDummyInput().appendField('When');
    this.appendDummyInput(inputType).appendField(
      new Blockly.FieldVariable(variableName, null, [inputType], inputType),
      inputType
    );
    // this.appendValueInput('BUTTON').setCheck('BUTTON').appendField('When');
    this.appendDummyInput()
      .appendField('is')
      .appendField(
        new Blockly.FieldDropdown(
          [
            ['Down', 'down'],
            ['Up', 'up'],
            ['Hold', 'hold'],
          ]
          // this.validate
        ),
        'BUTTON_COMMAND'
      );
    this.appendStatementInput('BUTTON_STMT').setCheck(null);

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

Blockly.JavaScript['button_on_off'] = function (blockIn) {
  const buttonCommand = blockIn.getFieldValue('BUTTON_COMMAND');

  const statementsMain = Blockly.JavaScript.statementToCode(
    blockIn,
    'BUTTON_STMT'
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

/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';

import PCF8591Pins from 'constants/PCF8591Pins';
import {
  PIN_PCF8591,
  PIN_WRAPPER_NAME,
  PIN_FIELD_NAME,
  BOARD_FIELD_NAME,
} from 'constants/blockConstants';
import defaultCreateGenerators from 'customBlocks/generators/createGenerators';
import { inputType, color, variableName, BLOCKS_MAP } from './constants';

import createGenerators from './virtualBoardGenerators';

const useText = 'Create PCF8591 (ADC) named:';
const expanderName = 'PCF8591';

const pinOptions = PCF8591Pins.map((value) => [value, value]);
const pinOptionsFieldName = PIN_FIELD_NAME;
const boardFieldName = BOARD_FIELD_NAME;

const { code, block } = createGenerators({ inputType, color });
const { code: defaultCode, block: defaultBlock } = defaultCreateGenerators({
  inputType,
  color,
});

Blockly.Blocks[BLOCKS_MAP['set']] = {
  init: block.setGenerator({
    useText,
    variableName,
  }),
};

Blockly.JavaScript[BLOCKS_MAP['set']] = code.setGenerator({
  expanderName,
});

Blockly.Blocks[BLOCKS_MAP['get']] = {
  init: defaultBlock.getVariable({ variableName }),
};

Blockly.JavaScript[BLOCKS_MAP['get']] = defaultCode.getVariable();

Blockly.Blocks[BLOCKS_MAP[`get_${PIN_WRAPPER_NAME}`]] = {
  init: function () {
    console.log('======\n============\n---------');
    console.log({ boardFieldName, pinOptionsFieldName });
    this.appendDummyInput()
      .appendField('With ')
      .appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        boardFieldName
      );
    this.appendDummyInput()
      .appendField('use pin ')
      .appendField(new Blockly.FieldDropdown(pinOptions), pinOptionsFieldName);
    this.setOutput(true, PIN_PCF8591);
    this.setColour(color);
  },
};

Blockly.JavaScript[BLOCKS_MAP[`get_${PIN_WRAPPER_NAME}`]] = function (blockIn) {
  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    blockIn.getFieldValue(boardFieldName),
    Blockly.Variables.NAME_TYPE
  );
  const pinValue = blockIn.getFieldValue(pinOptionsFieldName);
  const codeIn = `{board: ${codeVariableName}, pin: "${pinValue}" }`;
  return [codeIn, Blockly.JavaScript.ORDER_ATOMIC];
};

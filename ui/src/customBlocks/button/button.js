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
const BUTTON_COMMAND = `${inputType}_COMMAND`;
const preText = 'When';
const dropDownArray = [
  ['Down', 'down'],
  ['Up', 'up'],
  ['Hold', 'hold'],
];

const additionalInit = (that) =>
  that.appendStatementInput(STATEMENT_NAME).setCheck(null);

const middleText = 'is';

const { code, block } = createGenerators({ inputType, color });

Blockly.Blocks[BLOCKS_MAP['makePin']] = block.makePin({
  useText: 'used for Button named',
  variableName,
});

Blockly.JavaScript[BLOCKS_MAP['makePin']] = code.makePin({
  constructorName: 'five.Button',
});

Blockly.Blocks[BLOCKS_MAP['get']] = block.getVariable({
  variableName,
});

Blockly.JavaScript[BLOCKS_MAP['get']] = code.getVariable();

Blockly.Blocks[BLOCKS_MAP['on_off']] = block.runCommand({
  dropDownArray,
  variableName,
  additionalInit,
  middleText,
  preText,
});

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

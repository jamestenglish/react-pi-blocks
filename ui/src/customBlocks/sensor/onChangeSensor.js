/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */

import Blockly from 'blockly';
import 'blockly/javascript';
import isNullOrEmpty from 'helpers/isNullOrEmpty';
import createGenerators from 'customBlocks/generators/createGenerators';

import { inputType, color, variableName, SENSOR_BLOCKS_MAP } from './constants';

const SENSOR_EVENT_INPUT = 'SENSOR_EVENT';
const SENSOR_ON_STATEMENT = 'SENSOR_ON_STATEMENT';

const { block } = createGenerators({ inputType, color });

const preText = 'When sensor: ';
const commandFieldName = SENSOR_EVENT_INPUT;
const dropDownArray = [
  ['Changes', 'change'],
  ['Gets any data', 'data'],
];

const additionalInit = (that) =>
  that.appendStatementInput(SENSOR_ON_STATEMENT).setCheck(null);

Blockly.Blocks[SENSOR_BLOCKS_MAP['on_change']] = {
  init: block.runCommand({
    dropDownArray,
    variableName,
    additionalInit,
    preText,
    commandFieldName,
  }),
};

Blockly.JavaScript[SENSOR_BLOCKS_MAP['on_change']] = function (blockIn) {
  const sensorEvent = blockIn.getFieldValue(SENSOR_EVENT_INPUT);

  const sensorVariableNameFieldValue = blockIn.getFieldValue(inputType);

  if (
    isNullOrEmpty(sensorEvent) ||
    isNullOrEmpty(sensorVariableNameFieldValue)
  ) {
    return '';
  }
  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    sensorVariableNameFieldValue,
    Blockly.Variables.NAME_TYPE
  );

  const statementsMain = Blockly.JavaScript.statementToCode(
    blockIn,
    SENSOR_ON_STATEMENT
  );
  console.log({ sensorEvent, statementsMain });
  const codeOut = `
    ${codeVariableName}.on("${sensorEvent}", () => {
      ${statementsMain}
    });
    `;

  return codeOut;
};

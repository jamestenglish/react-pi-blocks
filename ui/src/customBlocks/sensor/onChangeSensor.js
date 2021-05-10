/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */

import Blockly from 'blockly';
import 'blockly/javascript';
import isNullOrEmpty from 'helpers/isNullOrEmpty';

import { inputType, color, variableName, SENSOR_BLOCKS_MAP } from './constants';

const SENSOR_EVENT_INPUT = 'SENSOR_EVENT';
const SENSOR_ON_STATEMENT = 'SENSOR_ON_STATEMENT';

Blockly.Blocks[SENSOR_BLOCKS_MAP['on_change']] = {
  init: function () {
    this.appendDummyInput()
      .appendField('When sensor: ')
      .appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['Changes', 'change'],
        ['Gets any data', 'data'],
      ]),
      SENSOR_EVENT_INPUT
    );
    this.appendStatementInput(SENSOR_ON_STATEMENT).setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
  },
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

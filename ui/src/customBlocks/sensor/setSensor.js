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
import { PIN_FIELD_NAME } from 'constants/blockConstants';
// import getConstructorArgs from 'helpers/getConstructorArgs';

import { inputType, color, variableName, SENSOR_BLOCKS_MAP } from './constants';

const thresholdFieldName = 'THRESHOLD';
const frequencyFieldName = 'FREQUENCY_IN_MS';

const CUSTOM_OPTIONS_OPTION = 'custom options';
const sensorOptions = [
  ['default settings', 'default settings'],
  [CUSTOM_OPTIONS_OPTION, CUSTOM_OPTIONS_OPTION],
];

const CUSTOM_OPTIONS_DUMMY_INPUT = 'CUSTOM_OPTIONS_DUMMY_INPUT';
// const PIN_INPUT = 'PIN_INPUT';
const pinFieldName = PIN_FIELD_NAME;
// const boardFieldName = BOARD_FIELD_NAME;

const getCustomOptionsFieldName = (inputTypeIn) =>
  `${inputTypeIn}_CUSTOM_OPTIONS`;

const getHasCustomOptions = (fieldValue) =>
  fieldValue === CUSTOM_OPTIONS_OPTION;

const { block } = createGenerators({ inputType, color, pinFieldName });

const customOptionsFieldName = getCustomOptionsFieldName(inputType);
const customOptionsValidateFuncName = block.getValidateFuncName(
  customOptionsFieldName
);

const additionalInit = (that) => {
  that
    .appendDummyInput()
    .appendField('with')
    .appendField(
      new Blockly.FieldDropdown(
        sensorOptions,
        that[customOptionsValidateFuncName]
      ),
      customOptionsFieldName
    );
};

const customFields = [
  {
    fieldName: customOptionsFieldName,
    getHasCustomOptions,
    checkInputsExists: (that) => {
      const inputValue = that.getInput(CUSTOM_OPTIONS_DUMMY_INPUT);
      console.log({ inputValue });
      return !isNullOrEmpty(inputValue);
    },
    createFields: (that) => {
      // that.setInputsInline(false);
      that
        .appendDummyInput(CUSTOM_OPTIONS_DUMMY_INPUT)
        .appendField(' Threshold:')
        .appendField(new Blockly.FieldNumber(1, 1, 1023), thresholdFieldName)
        .appendField(' and Frequency:')
        .appendField(new Blockly.FieldNumber(25, 1), frequencyFieldName) // ;
        .appendField('milliseconds');
    },
    removeFields: (that) => {
      that.removeInput(CUSTOM_OPTIONS_DUMMY_INPUT);
    },
  },
];

Blockly.Blocks[SENSOR_BLOCKS_MAP['makePin']] = {
  ...block.makePin({
    useText: 'used for Sensor named',
    variableName,
    additionalInit,
  }),
  ...block.customFieldMethodsGenerator({ customFields }),
};

Blockly.JavaScript[SENSOR_BLOCKS_MAP['makePin']] = function (blockIn) {
  console.group(`SensorBlock.${SENSOR_BLOCKS_MAP.makePin}`);
  const inputTypeValue = blockIn.getFieldValue(inputType);
  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    inputTypeValue,
    Blockly.Variables.NAME_TYPE
  );

  const constructorString = Blockly.JavaScript.valueToCode(
    blockIn,
    pinFieldName,
    Blockly.JavaScript.ORDER_ATOMIC
  );

  console.log({ constructorString });

  if (isNullOrEmpty(constructorString)) {
    console.groupEnd();
    return '';
  }

  // eslint-disable-next-line no-eval

  const thresholdValue = blockIn.getFieldValue(thresholdFieldName);

  const frequencyValue = blockIn.getFieldValue(frequencyFieldName);

  let additionalArgsString = '';
  if (!isNullOrEmpty(thresholdValue)) {
    additionalArgsString += `threshold: ${thresholdValue},`;
  }
  if (!isNullOrEmpty(frequencyValue)) {
    additionalArgsString += `freq: ${frequencyValue},`;
  }

  console.log({ additionalArgsString });

  const argsVariableName = `${codeVariableName}__ARGS`;
  const codeOut = `
      const ${argsVariableName} = ${constructorString};
      ${codeVariableName} = new five.Sensor({ ...${argsVariableName}, ${additionalArgsString}});`;
  console.groupEnd();
  return codeOut;
};

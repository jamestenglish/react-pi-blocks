/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';

import createGenerators from 'customBlocks/generators/createGenerators';
import isNullOrEmpty from 'helpers/isNullOrEmpty';
import { PIN, PIN_TYPES } from 'constants/blockConstants';
import { inputType, color, variableName, BLOCKS_MAP } from './constants';

const pinTypes = PIN_TYPES;
const in1PinFieldName = `${PIN}_in1`;
const in2PinFieldName = `${PIN}_in2`;
const pwmPinFieldName = `${PIN}_pwm`;
const constructorName = 'five.Motor';

const { code, block } = createGenerators({ inputType, color });

// IN1, IN2, PWM

// { dir: 4, cdir: 5, pwm: 6 },

Blockly.Blocks[BLOCKS_MAP['makePin']] = {
  init: function () {
    this.appendDummyInput().appendField('Make');
    this.appendValueInput(in1PinFieldName)
      .setCheck(pinTypes)
      .appendField('IN1 use pin');
    this.appendValueInput(in2PinFieldName)
      .setCheck(pinTypes)
      .appendField('IN2 use pin');
    this.appendValueInput(pwmPinFieldName)
      .setCheck(pinTypes)
      .appendField('PWM use pin');

    this.appendDummyInput(inputType)
      .appendField('for Motor named')
      .appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript[BLOCKS_MAP['makePin']] = (blockIn) => {
  const in1PinValue = Blockly.JavaScript.valueToCode(
    blockIn,
    in1PinFieldName,
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const in2PinValue = Blockly.JavaScript.valueToCode(
    blockIn,
    in2PinFieldName,
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const pwmPinValue = Blockly.JavaScript.valueToCode(
    blockIn,
    pwmPinFieldName,
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    blockIn.getFieldValue(inputType),
    Blockly.Variables.NAME_TYPE
  );

  if (
    isNullOrEmpty(in1PinValue) ||
    isNullOrEmpty(in2PinValue) ||
    isNullOrEmpty(pwmPinValue) ||
    isNullOrEmpty(codeVariableName)
  ) {
    return '';
  }
  const pwmVarName = `${codeVariableName}__PWM`;
  const in1VarName = `${codeVariableName}__IN1`;
  const in2VarName = `${codeVariableName}__IN2`;
  const argsVarName = `${codeVariableName}__ARGS`;

  const codeOut = `
    const {pin:${in1VarName}} = ${in1PinValue};
    const {pin:${in2VarName}} = ${in2PinValue};
    const {pin:${pwmVarName}} = ${pwmPinValue};
    const ${argsVarName} = [${pwmVarName}, ${in1VarName}, ${in2VarName}];
    ${codeVariableName} = new ${constructorName}(${argsVarName});\n`;
  return codeOut;
};

Blockly.Blocks[BLOCKS_MAP['get']] = block.getVariable({ variableName });

Blockly.JavaScript[BLOCKS_MAP['get']] = code.getVariable();

const standardCommands = [
  ['Stop', '.stop()'],
  ['Resume', '.start()'],
];

const additionalParamCommands = [
  ['Forward', 'forward'],
  ['Reverse', 'reverse'],
  ['Start', 'start'],
];

const createdFieldName = 'SPEED_FIELD';
const additionInputFieldName = 'ADDITIONAL_PARAM';
const customOptionFieldName = 'MOTOR_COMMAND';

const checkInputsExists = (that) => that.getInput(additionInputFieldName);

const createFields = (that) =>
  that
    .appendDummyInput(additionInputFieldName)
    .appendField('at speed') // TODO variable input
    .appendField(new Blockly.FieldNumber(500, 0), createdFieldName)
    .appendField('between 0 and 255');

const removeFields = (that) => that.removeInput(additionInputFieldName);

const isAdditionaParamInput = (additionalParamCommandsIn) => (fieldValue) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < additionalParamCommandsIn.length; i++) {
    if (fieldValue === additionalParamCommandsIn[i][1]) {
      return true;
    }
  }
  return false;
};

const customFields = [
  {
    fieldName: customOptionFieldName,
    getHasCustomOptions: isAdditionaParamInput(additionalParamCommands),
    checkInputsExists,
    createFields,
    removeFields,
  },
];

Blockly.Blocks[BLOCKS_MAP['runCommand']] = {
  ...block.runCommand({
    dropDownArray: [...additionalParamCommands, ...standardCommands],
    validatorFunctionName: block.getValidateFuncName(customOptionFieldName),
    variableName,
  }),
  ...block.customFieldMethodsGenerator({ customFields }),
};

const codeGenerator = (blockIn) => {
  console.group('motor.additionalParam codeGenerator');
  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    blockIn.getFieldValue(inputType),
    Blockly.Variables.NAME_TYPE
  );
  console.log({ codeVariableName });

  if (isNullOrEmpty(codeVariableName)) {
    console.groupEnd();
    return '';
  }
  const command = blockIn.getFieldValue(customOptionFieldName);
  const arg = blockIn.getFieldValue(createdFieldName);
  const codeOut = `${codeVariableName}.${command}(${arg});\n`;
  console.groupEnd();
  return codeOut;
};

Blockly.JavaScript[BLOCKS_MAP['runCommand']] = function (blockIn) {
  console.group('motor.block.runCommand');
  const fieldValue = blockIn.getFieldValue(customOptionFieldName);

  const hasAdditionalParam = isAdditionaParamInput(additionalParamCommands)(
    fieldValue
  );

  console.log({ hasAdditionalParam });

  if (hasAdditionalParam) {
    const additionPamamResult = codeGenerator(blockIn);
    console.groupEnd();
    return additionPamamResult;
  }

  const result = code.runCommand()(blockIn);
  console.groupEnd();
  return result;
};

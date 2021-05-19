/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';

import createGenerators from 'customBlocks/generators/createGenerators';
import isNullOrEmpty from 'helpers/isNullOrEmpty';
import { inputType, color, variableName, BLOCKS_MAP } from './constants';

const isAdditionaParamInput = (additionalParamCommandsIn) => (fieldValue) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < additionalParamCommandsIn.length; i++) {
    if (fieldValue === additionalParamCommandsIn[i][1]) {
      return true;
    }
  }
  return false;
};

const { code, block } = createGenerators({ inputType, color });

const customOptionFieldName = 'LED_COMMAND';
const additionInputFieldName = 'ADDITIONAL_PARAM';

Blockly.Blocks[BLOCKS_MAP['makePin']] = block.makePin({
  useText: 'used for LED named',
  variableName,
});

Blockly.JavaScript[BLOCKS_MAP['makePin']] = code.makePin({
  constructorName: 'five.Led',
});

Blockly.Blocks[BLOCKS_MAP['get']] = block.getVariable({ variableName });

Blockly.JavaScript[BLOCKS_MAP['get']] = code.getVariable();

const standardCommands = [
  ['Turn On', '.on()'],
  ['Turn Off', '.off()'],
  ['Start Pulsing', '.pulse()'],
  ['Stop Pulsing', '.stop()'],
  ['Fade In', '.fadeIn()'],
  ['Fade Out', '.fadeOut()'],
];

const additionalParamCommands = [['Blink', 'blink']];

const createdFieldName = 'BLINK_TIME_IN_MS';

const checkInputsExists = (that) => that.getInput(additionInputFieldName);
const createFields = (that) =>
  that
    .appendDummyInput(additionInputFieldName)
    .appendField('every')
    .appendField(new Blockly.FieldNumber(500, 0), createdFieldName)
    .appendField('milliseconds');

const removeFields = (that) => that.removeInput(additionInputFieldName);
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
    dropDownArray: [...standardCommands, ...additionalParamCommands],
    validatorFunctionName: block.getValidateFuncName(customOptionFieldName),
    variableName,
  }),
  ...block.customFieldMethodsGenerator({ customFields }),
};

const codeGenerator = (blockIn) => {
  console.group('led.additionalParam codeGenerator');
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
  console.group('led.block.runCommand');
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

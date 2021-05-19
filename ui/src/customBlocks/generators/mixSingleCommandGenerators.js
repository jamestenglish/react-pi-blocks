/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import Blockly from 'blockly';
import 'blockly/javascript';
import isNullOrEmpty from 'helpers/isNullOrEmpty';
import createRunCommandGenerators from './runCommandGenerators';

const additionalInitDefault = (that) => that;
const DEFAULT_PRE_TEXT = 'Make';

const createGenerators = (createArgs) => {
  const { inputType, color = 230 } = createArgs;
  const DEFAULT_COMMAND_FIELD_NAME = `${inputType}_COMMAND`;
  const {
    code: runCommandCode,
    block: runCommandBlock,
  } = createRunCommandGenerators(createArgs);
  const runCommandBlockGenerator = (args) => {
    const {
      dropDownArray,
      variableName,
      validatorFunctionName = null,
      additionalInit = additionalInitDefault,
      preText = DEFAULT_PRE_TEXT,
      middleText = '',
      commandFieldName = DEFAULT_COMMAND_FIELD_NAME,
    } = args;
    return {
      init: runCommandBlock.init,
    };
  };

  const runCommandCodeGenerator = (
    args = {
      commandFieldName: DEFAULT_COMMAND_FIELD_NAME,
    }
  ) => {
    const { commandFieldName } = args;
    return function (blockIn) {
      console.group('runCommandCodeGenerator');
      const inputTypeFieldValue = blockIn.getFieldValue(inputType);
      const variableName = Blockly.JavaScript.variableDB_.getName(
        inputTypeFieldValue,
        Blockly.Variables.NAME_TYPE
      );
      console.log({ inputType, inputTypeFieldValue, variableName });
      if (isNullOrEmpty(variableName)) {
        console.groupEnd();
        return '';
      }
      const command = blockIn.getFieldValue(commandFieldName);
      const code = `${variableName}${command};\n`;
      console.groupEnd();
      return code;
    };
  };

  return {
    block: runCommandBlockGenerator,
    code: runCommandCodeGenerator,
  };
};

export default createGenerators;

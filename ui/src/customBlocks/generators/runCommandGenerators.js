/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import Blockly from 'blockly';
import 'blockly/javascript';
import isNullOrEmpty from 'helpers/isNullOrEmpty';

const additionalInitDefault = (that) => that;
const DEFAULT_PRE_TEXT = 'Make';

const createGenerators = ({ inputType, color = 230 }) => {
  const DEFAULT_COMMAND_FIELD_NAME = `${inputType}_COMMAND`;
  const runCommandBlockGenerator = ({
    dropDownArray,
    variableName,
    validatorFunctionName = null,
    additionalInit = additionalInitDefault,
    preText = DEFAULT_PRE_TEXT,
    middleText = '',
    commandFieldName = DEFAULT_COMMAND_FIELD_NAME,
  }) => {
    return function () {
      let validatorFunc = null;
      if (validatorFunctionName != null) {
        const tmpValidatorFunc = this[validatorFunctionName];
        if (tmpValidatorFunc) {
          validatorFunc = tmpValidatorFunc;
        }
      }
      this.appendDummyInput().appendField(preText);
      this.appendDummyInput(inputType).appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
      if (!isNullOrEmpty(middleText)) {
        this.appendDummyInput().appendField(middleText);
      }

      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown(dropDownArray, validatorFunc),
        commandFieldName
      );
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip('');
      this.setHelpUrl('');
      additionalInit(this);
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

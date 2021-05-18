/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import Blockly from 'blockly';
import 'blockly/javascript';
import isNullOrEmpty from 'helpers/isNullOrEmpty';

const createGenerators = ({ inputType, color = 230 }) => {
  const runCommandBlockGenerator = ({
    dropDownArray,
    variableName,
    validatorFunctionName = null,
  }) => {
    return function () {
      let validatorFunc = null;
      if (validatorFunctionName != null) {
        const tmpValidatorFunc = this[validatorFunctionName];
        if (tmpValidatorFunc) {
          validatorFunc = tmpValidatorFunc;
        }
      }
      // this.appendValueInput(inputType).setCheck(inputType).appendField('Make');
      this.appendDummyInput().appendField('Make');
      this.appendDummyInput(inputType).appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );

      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown(dropDownArray, validatorFunc),
        `${inputType}_COMMAND`
      );
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip('');
      this.setHelpUrl('');
    };
  };

  const runCommandCodeGenerator = () => {
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
      const command = blockIn.getFieldValue(`${inputType}_COMMAND`);
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

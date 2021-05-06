/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import Blockly from 'blockly';
import jsBlockly from 'blockly/javascript';

import isNullOrEmpty from './isNullOrEmpty';

const createGenerators = ({ inputType, color = 230 }) => {
  const pinVariableBlockSetGenerator = ({ useText, variableName }) => {
    return function () {
      this.appendDummyInput().appendField('Make Pin');
      this.appendValueInput('PIN').setCheck('PIN');
      this.appendDummyInput().appendField(useText);
      this.appendDummyInput(inputType).appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
      // this.appendValueInput(inputType).setCheck(inputType);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip('');
      this.setHelpUrl('');
    };
  };

  const pinVariableCodeSetGenerator = ({ constructorName }) => {
    return function (block) {
      const pinValue = Blockly.JavaScript.valueToCode(
        block,
        'PIN',
        Blockly.JavaScript.ORDER_ATOMIC
      );
      const variableName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue(inputType),
        Blockly.Variables.NAME_TYPE
      );

      if (isNullOrEmpty(pinValue) || isNullOrEmpty(variableName)) {
        return '';
      }
      const code = `${variableName} = new ${constructorName}(${pinValue});\n`;
      return code;
    };
  };

  const pinVariableBlockGetGenerator = ({ variableName }) => {
    return function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
      this.setOutput(true, inputType);
      this.setColour(color);
    };
  };

  const pinVariableCodeGetGenerator = () => {
    return function (block) {
      const variableName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue(inputType),
        Blockly.Variables.NAME_TYPE
      );
      const code = variableName;
      return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };
  };

  const commandBlockGenerator = ({
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

  const commandCodeGenerator = () => {
    return function (block) {
      const variableName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue(inputType),
        Blockly.Variables.NAME_TYPE
      );
      if (isNullOrEmpty(variableName)) {
        return '';
      }
      const command = block.getFieldValue(`${inputType}_COMMAND`);
      const code = `${variableName}${command};\n`;
      return code;
    };
  };

  return {
    pinVariableBlockSetGenerator,
    pinVariableCodeSetGenerator,
    pinVariableBlockGetGenerator,
    pinVariableCodeGetGenerator,
    commandBlockGenerator,
    commandCodeGenerator,
  };
};

const initBlocks = () => {
  console.log({ Blockly, jsBlockly });
};
initBlocks();

export { initBlocks };

export default createGenerators;

import Blockly from "blockly";
import "blockly/javascript";

import isNullOrEmpty from "./isNullOrEmpty";

const createGenerators = ({ inputType, color = 230 }) => {
  const pinVariableBlockSetGenerator = ({ useText }) => {
    return function () {
      this.appendDummyInput().appendField("Make Pin");
      this.appendValueInput("PIN").setCheck("PIN");
      this.appendDummyInput().appendField(useText);
      this.appendValueInput(inputType).setCheck(inputType);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip("");
      this.setHelpUrl("");
    };
  };

  const pinVariableCodeSetGenerator = ({ constructorName }) => {
    return function (block) {
      const pinValue = Blockly.JavaScript.valueToCode(
        block,
        "PIN",
        Blockly.JavaScript.ORDER_ATOMIC
      );
      const inputTypeValue = Blockly.JavaScript.valueToCode(
        block,
        inputType,
        Blockly.JavaScript.ORDER_ATOMIC
      );

      console.log({ pinValue, inputTypeValue });

      if (isNullOrEmpty(pinValue) || isNullOrEmpty(inputTypeValue)) {
        return "";
      }
      console.log({ pinFieldValue: block.getFieldValue("PIN") });
      console.log({ ledFieldValue: block.getFieldValue(inputType) });

      const variableName = Blockly.JavaScript.variableDB_.getName(
        inputTypeValue,
        Blockly.Variables.NAME_TYPE
      );
      console.log({ variableName });

      const code = `${variableName} = new ${constructorName}(${pinValue});\n`;
      return code;
    };
  };

  const pinVariableBlockGetGenerator = ({ useText }) => {
    return function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldVariable(useText, null, [inputType], inputType),
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
    validatorFunctionName = null,
  }) => {
    console.log({ validatorFunctionName });
    return function () {
      let validatorFunc = null;
      if (validatorFunctionName != null) {
        const tmpValidatorFunc = this[validatorFunctionName];
        if (tmpValidatorFunc) {
          validatorFunc = tmpValidatorFunc;
        }
      }
      this.appendValueInput(inputType).setCheck(inputType).appendField("Make");
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown(dropDownArray, validatorFunc),
        `${inputType}_COMMAND`
      );
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip("");
      this.setHelpUrl("");
    };
  };

  const commandCodeGenerator = () => {
    return function (block) {
      const inputBlock = Blockly.JavaScript.valueToCode(
        block,
        inputType,
        Blockly.JavaScript.ORDER_ATOMIC
      );
      if (isNullOrEmpty(inputBlock)) {
        return "";
      }
      const variableName = Blockly.JavaScript.variableDB_.getName(
        inputBlock,
        Blockly.Variables.NAME_TYPE
      );
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
export default createGenerators;

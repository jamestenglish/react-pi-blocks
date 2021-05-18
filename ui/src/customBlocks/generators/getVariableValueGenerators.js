/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import Blockly from 'blockly';
import 'blockly/javascript';

const createGenerators = ({ inputType, color = 230 }) => {
  const getVariableBlockGenerator = ({ variableName }) => {
    return function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
      this.setOutput(true, inputType);
      this.setColour(color);
    };
  };

  const getVariableCodeGenerator = () => {
    return function (blockIn) {
      const codeVariableName = Blockly.JavaScript.variableDB_.getName(
        blockIn.getFieldValue(inputType),
        Blockly.Variables.NAME_TYPE
      );
      const codeIn = codeVariableName;
      return [codeIn, Blockly.JavaScript.ORDER_ATOMIC];
    };
  };

  return {
    block: getVariableBlockGenerator,
    code: getVariableCodeGenerator,
  };
};

export default createGenerators;

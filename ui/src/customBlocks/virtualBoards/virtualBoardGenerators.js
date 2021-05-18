/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';
import isNullOrEmpty from 'helpers/isNullOrEmpty';

// TODO JTE square this w/ regular pin generators
const createGenerators = ({ inputType, color }) => {
  const virtualBoardBlockSetGenerator = ({ variableName, useText }) =>
    function () {
      this.appendDummyInput().appendField(useText);
      this.appendDummyInput(inputType).appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip('');
      this.setHelpUrl('');
    };

  const virtualBoardCodeSetGenerator = ({ expanderName }) =>
    function (block) {
      const codeVariableName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue(inputType),
        Blockly.Variables.NAME_TYPE
      );

      const codeOut = `${codeVariableName} = new five.Board.Virtual(
        new five.Expander("${expanderName}")
      );`;
      return codeOut;
    };

  const virtualBoardBlockGetGenerator = ({ variableName }) =>
    function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
      this.setOutput(true, inputType);
      this.setColour(color);
    };

  const virtualBoardCodeGetGenerator = () =>
    function (block) {
      const codeVariableName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue(inputType),
        Blockly.Variables.NAME_TYPE
      );
      const codeOut = codeVariableName;
      return [codeOut, Blockly.JavaScript.ORDER_ATOMIC];
    };

  const virtualBoardBlockUseGenerator = ({ variableName, pinType }) =>
    function () {
      this.appendDummyInput().appendField('Use');
      this.appendDummyInput(inputType).appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
      this.appendDummyInput().appendField('with ADC pin');
      this.appendValueInput(pinType).setCheck(pinType);
      this.appendStatementInput(`${inputType}_STMT`).setCheck(null);

      this.setColour(color);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setHelpUrl('');
    };

  const virtualBoardCodeUseGenerator = ({ pinType }) =>
    function (blockIn) {
      const statementsMain = Blockly.JavaScript.statementToCode(
        blockIn,
        `${inputType}_STMT`
      );

      const pinValue = Blockly.JavaScript.valueToCode(
        blockIn,
        pinType,
        Blockly.JavaScript.ORDER_ATOMIC
      );

      const codeVariableName = Blockly.JavaScript.variableDB_.getName(
        blockIn.getFieldValue(inputType),
        Blockly.Variables.NAME_TYPE
      );

      if (isNullOrEmpty(pinValue) || isNullOrEmpty(codeVariableName)) {
        return '';
      }

      const codeOut = `(() => {
        const additionalParams = {
          pin: ${pinValue},
          board: ${codeVariableName}
          
        };
        ${statementsMain}
      })();
      `;

      return codeOut;
    };

  return {
    block: {
      setGenerator: virtualBoardBlockSetGenerator,
      getGenerator: virtualBoardBlockGetGenerator,
      useGenerator: virtualBoardBlockUseGenerator,
    },
    code: {
      setGenerator: virtualBoardCodeSetGenerator,
      getGenerator: virtualBoardCodeGetGenerator,
      useGenerator: virtualBoardCodeUseGenerator,
    },
  };
};

export default createGenerators;

/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import Blockly from 'blockly';
import 'blockly/javascript';

import { PIN, PIN_TYPES } from 'constants/blockConstants';

import isNullOrEmpty from 'helpers/isNullOrEmpty';

const additionalInitDefault = (that) => that;

const createGenerators = ({
  inputType,
  color = 230,
  pinTypes = PIN_TYPES,
  pinFieldName = PIN,
}) => {
  const makePinBlockGenerator = ({
    useText,
    variableName,
    additionalInit = additionalInitDefault,
  }) => {
    return function () {
      this.appendDummyInput().appendField('Make Pin');
      this.appendValueInput(pinFieldName).setCheck(pinTypes);
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
      additionalInit(this);
    };
  };

  const makePinCodeGenerator = ({ constructorName }) => {
    return function (blockIn) {
      const pinValue = Blockly.JavaScript.valueToCode(
        blockIn,
        pinFieldName,
        Blockly.JavaScript.ORDER_ATOMIC
      );
      const codeVariableName = Blockly.JavaScript.variableDB_.getName(
        blockIn.getFieldValue(inputType),
        Blockly.Variables.NAME_TYPE
      );

      if (isNullOrEmpty(pinValue) || isNullOrEmpty(codeVariableName)) {
        return '';
      }
      const codeOut = `${codeVariableName} = new ${constructorName}(${pinValue});\n`;
      return codeOut;
    };
  };

  return {
    block: makePinBlockGenerator,
    code: makePinCodeGenerator,
  };
};

export default createGenerators;

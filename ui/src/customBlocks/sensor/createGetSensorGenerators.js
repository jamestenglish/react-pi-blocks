/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';
import { SENSOR } from 'constants/blockConstants';
import isNullOrEmpty from 'helpers/isNullOrEmpty';

const doSkipOnChange = (event) => {
  const wrongEvent = event.type !== Blockly.Events.BLOCK_MOVE;
  const isMovingStarting =
    event.newParentId === undefined && event.oldParentId !== undefined;
  return wrongEvent || isMovingStarting;
};

const getFirstSurroundedAncestorByType = (block, surroundAncestorType) => {
  const initialSurroundParent = block.getSurroundParent();
  let surroundParent = initialSurroundParent;
  console.group('hasSurroundedAncestor');
  while (surroundParent != null) {
    console.log({
      surroundParent,
      type: surroundParent.type,
      surroundAncestorType,
    });
    if (surroundParent.type === surroundAncestorType) {
      break;
    }
    surroundParent = surroundParent.getSurroundParent();
  }
  console.groupEnd();
  return surroundParent;
};

const defaultAdditionalInit = (ref) => {
  ref.setOutput(true, SENSOR);
};

const defaultCodeWrapper = (code) => {
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

const createGetSensorGenerators = ({ inputType, color, ancestorBlockType }) => {
  const sensorBlockGetGenerator = ({
    fieldText,
    fields = [],
    additionalInitFunc = defaultAdditionalInit,
  }) => {
    return {
      init: function () {
        this.appendDummyInput().appendField(fieldText);
        const that = this;
        fields.forEach(({ createField, name, text }) => {
          const field = createField();
          that.appendDummyInput().appendField(text).appendField(field, name);
        });
        additionalInitFunc(this);
        this.setColour(color);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setOnChange(this._onChange);
      },
      _onChange: function (event) {
        if (doSkipOnChange(event)) {
          return;
        }
        console.group('onChange');
        const surroundAncestor = getFirstSurroundedAncestorByType(
          this,
          ancestorBlockType
        );
        const hasSensorSurround = !isNullOrEmpty(surroundAncestor);
        const initialSurroundParent = this.getSurroundParent();

        console.log({
          event,
          hasSensorSurround,
          initialSurroundParent,
          type: event.type,
        });
        const isEnabled = this.isEnabled();
        if (!hasSensorSurround && initialSurroundParent != null) {
          this.setEnabled(false);
          if (isEnabled) {
            // eslint-disable-next-line no-alert
            alert('This can only be under a "When Sensor" block.');
          }
        } else {
          this.setEnabled(true);
        }
        console.groupEnd();
      },
    };
  };

  const sensorCodeGetGenerator = ({
    propertyName,
    fields = [],
    codeWrapper = defaultCodeWrapper,
  }) =>
    function () {
      const EMPTY_RESULT = codeWrapper('');
      const surroundAncestor = getFirstSurroundedAncestorByType(
        this,
        ancestorBlockType //
      );
      const hasSensorSurround = !isNullOrEmpty(surroundAncestor);

      if (!hasSensorSurround) {
        return EMPTY_RESULT;
      }
      const sensorVariableNameFieldValue = surroundAncestor.getFieldValue(
        inputType
      );
      console.log({ sensorVariableNameFieldValue });
      if (isNullOrEmpty(sensorVariableNameFieldValue)) {
        return EMPTY_RESULT;
      }
      const fieldValues = [];
      for (let i = 0; i < fields.length; i += 1) {
        const { name } = fields[i];
        const fieldValue = this.getFieldValue(name);
        if (isNullOrEmpty(fieldValue)) {
          return EMPTY_RESULT;
        }
        fieldValues.push(fieldValue);
      }

      const sensorVariableName = Blockly.JavaScript.variableDB_.getName(
        sensorVariableNameFieldValue,
        Blockly.Variables.NAME_TYPE
      );
      console.log({ sensorVariableName, length: fields.length });
      const updatedPropertyName =
        fields.length === 0
          ? propertyName
          : `${propertyName}(${fieldValues.join(',')})`;
      const code = `${sensorVariableName}.${updatedPropertyName}`;
      const result = codeWrapper(code);
      console.log({ result, updatedPropertyName, propertyName, fieldValues });
      return result;
    };

  return {
    code: { get: sensorCodeGetGenerator },
    block: { get: sensorBlockGetGenerator },
  };
};

export default createGetSensorGenerators;

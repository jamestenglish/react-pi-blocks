/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';
import { SENSOR, PIN, COLORS } from 'constants/blockConstants';

import isNullOrEmpty from 'helpers/isNullOrEmpty';

const inputType = SENSOR;
const color = COLORS[SENSOR];
const variableName = 'Sensor Name';
const createText = 'Create Sensor';
const thresholdFieldName = 'THRESHOLD';
const frequencyFieldName = 'FREQUENCY_IN_MS';
const CUSTOM_OPTIONS_OPTION = 'custom options';
const sensorOptions = [
  ['defaults', 'defaults'],
  [CUSTOM_OPTIONS_OPTION, CUSTOM_OPTIONS_OPTION],
];

const CUSTOM_GPIO_OPTION = 'gpio_yes';
const customGPIOOptions = [
  ['No', 'gpio_no'],
  ['Yes', CUSTOM_GPIO_OPTION],
];
const customOptionsXmlAttributeName = 'customOptions';
const customGPIOXmlAttributeName = 'customGPIO';
const CUSTOM_OPTIONS_DUMMY_INPUT = 'CUSTOM_OPTIONS_DUMMY_INPUT';
const PIN_INPUT = 'PIN_INPUT';
const SENSOR_EVENT_INPUT = 'SENSOR_EVENT';
const SENSOR_ON_STATEMENT = 'SENSOR_ON_STATEMENT';

const getCustomOptionsFieldName = (inputTypeIn) =>
  `${inputTypeIn}_CUSTOM_OPTIONS`;

const getCustomGPIOFieldName = (inputTypeIn) => `${inputTypeIn}_CUSTOM_GPIO`;

const getHasCustomOptions = (fieldValue) =>
  fieldValue === CUSTOM_OPTIONS_OPTION;

const getHasCustomGPIO = (fieldValue) => fieldValue === CUSTOM_GPIO_OPTION;

const SENSOR_BLOCK_TYPES = ['set_sensor', 'sensor_on', 'get_sensor_value'];

const SENSOR_BLOCKS_MAP = SENSOR_BLOCK_TYPES.reduce((acc, cur) => {
  return {
    ...acc,
    [cur]: cur,
  };
}, {});

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
    console.log({ surroundParent });
    if (surroundParent.type === surroundAncestorType) {
      break;
    }
    surroundParent = surroundParent.getSurroundParent();
  }
  console.groupEnd();
  return surroundParent;
};

const isNullOrUndefined = (obj) => obj === null || obj === undefined;

Blockly.Blocks[SENSOR_BLOCKS_MAP['set_sensor']] = {
  init: function () {
    this.appendDummyInput()
      .appendField(createText)
      .appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      )

      .appendField('with')
      .appendField(
        new Blockly.FieldDropdown(sensorOptions, this.validateCustomOptions),
        getCustomOptionsFieldName(inputType)
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  mutationToDom: function () {
    const container = document.createElement('mutation');
    const customOptionsFieldValue = this.getFieldValue(
      getCustomOptionsFieldName(inputType)
    );
    const hasCustomOptions = getHasCustomOptions(customOptionsFieldValue);

    if (hasCustomOptions) {
      container.setAttribute(
        customOptionsXmlAttributeName,
        customOptionsFieldValue
      );

      const customGPIOFieldValue = this.getFieldValue(
        getCustomGPIOFieldName(inputType)
      );

      const hasCustomGPIO = getHasCustomGPIO(customGPIOFieldValue);

      if (hasCustomGPIO) {
        container.setAttribute(
          customGPIOXmlAttributeName,
          customGPIOFieldValue
        );
      }
    } else {
      container.setAttribute(customOptionsXmlAttributeName, '');
      container.setAttribute(customGPIOXmlAttributeName, '');
    }
    return container;
  },
  domToMutation: function (xmlElement) {
    const customOptionsXmlAttribute = xmlElement.getAttribute(
      customOptionsXmlAttributeName
    );

    const customGPIOXmlAttribute = xmlElement.getAttribute(
      customGPIOXmlAttributeName
    );
    this.updateShapeCustomOptionShape_(customOptionsXmlAttribute);
    this.updateShapeGPIOShape_(customGPIOXmlAttribute);
  },

  validateCustomOptions: function (newValue) {
    this.getSourceBlock().updateShapeCustomOptionShape_(newValue);
    return newValue;
  },
  validateGPIO: function (newValue) {
    this.getSourceBlock().updateShapeGPIOShape_(newValue);
    return newValue;
  },
  updateShapeCustomOptionShape_: function (customOptionsXmlAttribute) {
    const hasCustomOptions = getHasCustomOptions(customOptionsXmlAttribute);

    const customOptionsDummyInputExists = this.getInput(
      CUSTOM_OPTIONS_DUMMY_INPUT
    );

    if (hasCustomOptions) {
      if (!customOptionsDummyInputExists) {
        this.setInputsInline(false);
        this.appendDummyInput(CUSTOM_OPTIONS_DUMMY_INPUT)
          .appendField(' Threshold:')
          .appendField(new Blockly.FieldNumber(1, 1, 1023), thresholdFieldName)
          .appendField(' and Frequency:')
          .appendField(new Blockly.FieldNumber(25, 1), frequencyFieldName) // ;
          // this.appendDummyInput(`${CUSTOM_OPTIONS_DUMMY_INPUT}_A`)
          .appendField(' Use GPIO?')
          .appendField(
            new Blockly.FieldDropdown(customGPIOOptions, this.validateGPIO),
            getCustomGPIOFieldName(inputType)
          );
      }
    } else if (customOptionsDummyInputExists) {
      this.removeInput(CUSTOM_OPTIONS_DUMMY_INPUT);
      //   this.removeInput(`${CUSTOM_OPTIONS_DUMMY_INPUT}_A`);
      try {
        this.removeInput(PIN_INPUT);
      } catch (e) {
        console.log(e);
      }
      this.setInputsInline(true);
    }
  },
  updateShapeGPIOShape_: function (customGPIOXmlAttribute) {
    const hasCustomGPIO = getHasCustomGPIO(customGPIOXmlAttribute);

    const customGPIODummyInputExists = this.getInput(PIN_INPUT);

    if (hasCustomGPIO) {
      if (!customGPIODummyInputExists) {
        this.appendValueInput(PIN_INPUT)
          .setCheck(PIN)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('GPIO Pin');
      }
    } else if (customGPIODummyInputExists) {
      this.removeInput(PIN_INPUT);
    }
  },
};

Blockly.JavaScript[SENSOR_BLOCKS_MAP['set_sensor']] = function (block) {
  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue(inputType),
    Blockly.Variables.NAME_TYPE
  );

  if (isNullOrEmpty(variableName)) {
    return '';
  }

  const thresholdValue = block.getFieldValue(thresholdFieldName);

  const frequencyValue = block.getFieldValue(frequencyFieldName);

  const pinValue = Blockly.JavaScript.valueToCode(
    block,
    PIN_INPUT,
    Blockly.JavaScript.ORDER_ATOMIC
  );

  const args = {};
  if (!isNullOrEmpty(thresholdValue)) {
    args.threshold = thresholdValue;
  }
  if (!isNullOrEmpty(frequencyValue)) {
    args.freq = frequencyValue;
  }
  if (!isNullOrEmpty(pinValue)) {
    args.pin = pinValue.replaceAll("'", '');
  }

  console.log({ args });
  const argsVariableName = `${codeVariableName}__ARGS`;

  const code = `
    let ${argsVariableName} = ${JSON.stringify(args)};
    try {
        ${argsVariableName} = {
            ...additionalParams,
            ...${argsVariableName}
        } ;
    } catch(e) {} // do nothing

    ${codeVariableName} = new five.Sensor(${argsVariableName});`;
  return code;
};

Blockly.Blocks[SENSOR_BLOCKS_MAP['sensor_on']] = {
  init: function () {
    this.appendDummyInput()
      .appendField('When sensor: ')
      .appendField(
        new Blockly.FieldVariable(variableName, null, [inputType], inputType),
        inputType
      );
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['Changes', 'change'],
        ['Gets any data', 'data'],
      ]),
      SENSOR_EVENT_INPUT
    );
    this.appendStatementInput(SENSOR_ON_STATEMENT).setCheck(null);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
  },
};

Blockly.JavaScript[SENSOR_BLOCKS_MAP['sensor_on']] = function (blockIn) {
  const sensorEvent = blockIn.getFieldValue(SENSOR_EVENT_INPUT);

  const statementsMain = Blockly.JavaScript.statementToCode(
    blockIn,
    SENSOR_ON_STATEMENT
  );
  console.log({ sensorEvent, statementsMain });
  const code = ``;
  return code;
};

Blockly.Blocks[SENSOR_BLOCKS_MAP['get_sensor_value']] = {
  init: function () {
    this.appendDummyInput().appendField(`Test`);
    this.setOutput(true, SENSOR);
    this.setColour(COLORS[SENSOR]);
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
      'sensor_on'
    );
    const hasSensorSurround = !isNullOrUndefined(surroundAncestor);
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
        alert('This can only be under a "When Sensor" block.');
      }
    } else {
      this.setEnabled(true);
    }
    console.groupEnd();
  },
};

// scaleTo(low, high) (integer) Return the sensor's present value, scaled to a new value within the specified low/high range.

// fscaleTo(low, high) (float) Return the sensor's present value, scaled to a new value within the specified low/high range.
// booleanAt(barrier) Set a midpoint barrier value used to calculate returned value of the .boolean property. The barrier is based on the scaled value, not the raw value. Defaults to 50% (512 when unscaled).
// within callback!
Blockly.JavaScript[SENSOR_BLOCKS_MAP['get_sensor_value']] = function () {
  const code = ``;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

export default SENSOR_BLOCK_TYPES;

/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */

import Blockly from 'blockly';
import 'blockly/javascript';
import isNullOrEmpty from 'helpers/isNullOrEmpty';
import { PIN } from 'constants/blockConstants';

import { inputType, color, variableName, SENSOR_BLOCKS_MAP } from './constants';

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

const getCustomOptionsFieldName = (inputTypeIn) =>
  `${inputTypeIn}_CUSTOM_OPTIONS`;

const getCustomGPIOFieldName = (inputTypeIn) => `${inputTypeIn}_CUSTOM_GPIO`;

const getHasCustomOptions = (fieldValue) =>
  fieldValue === CUSTOM_OPTIONS_OPTION;

const getHasCustomGPIO = (fieldValue) => fieldValue === CUSTOM_GPIO_OPTION;

Blockly.Blocks[SENSOR_BLOCKS_MAP.set] = {
  init() {
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
  mutationToDom() {
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
  domToMutation(xmlElement) {
    const customOptionsXmlAttribute = xmlElement.getAttribute(
      customOptionsXmlAttributeName
    );

    const customGPIOXmlAttribute = xmlElement.getAttribute(
      customGPIOXmlAttributeName
    );
    this.updateShapeCustomOptionShape_(customOptionsXmlAttribute);
    this.updateShapeGPIOShape_(customGPIOXmlAttribute);
  },

  validateCustomOptions(newValue) {
    this.getSourceBlock().updateShapeCustomOptionShape_(newValue);
    return newValue;
  },
  validateGPIO(newValue) {
    this.getSourceBlock().updateShapeGPIOShape_(newValue);
    return newValue;
  },
  updateShapeCustomOptionShape_(customOptionsXmlAttribute) {
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
  updateShapeGPIOShape_(customGPIOXmlAttribute) {
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

Blockly.JavaScript[SENSOR_BLOCKS_MAP.set] = function (block) {
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

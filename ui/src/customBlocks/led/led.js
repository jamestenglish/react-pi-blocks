/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';
import { LED, COLORS } from 'constants/blockConstants';

import createGenerators from 'helpers/pinInputGenerators';
import isNullOrEmpty from 'helpers/isNullOrEmpty';

const inputType = LED;
const color = COLORS[LED];

const isAdditionaParamInput = (fieldValue, additionalParamCommands) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < additionalParamCommands.length; i++) {
    if (fieldValue === additionalParamCommands[i][1]) {
      return true;
    }
  }
  return false;
};

const getAdditionParamsArray = (obj) => {
  const additionalParamsArray = Object.keys(obj).reduce(
    (acc, key) => [...acc, [obj[key].dropDownItem, key]],
    []
  );
  return additionalParamsArray;
};

const { code, block } = createGenerators({ inputType, color });

const variableName = 'LED Name';
Blockly.Blocks['set_led'] = {
  init: block.setGenerator({
    useText: 'be used for LED named',
    variableName,
  }),
};

Blockly.JavaScript['set_led'] = code.setGenerator({
  constructorName: 'five.Led',
});

Blockly.Blocks['get_led'] = {
  init: block.getGenerator({ variableName }),
};

Blockly.JavaScript['get_led'] = code.getGenerator();

const standardCommands = [
  ['Turn On', '.on()'],
  ['Turn Off', '.off()'],
  ['Start Pulsing', '.pulse()'],
  ['Stop Pulsing', '.stop()'],
  ['Fade In', '.fadeIn()'],
  ['Fade Out', '.fadeOut()'],
];

const additionalParamCommands = {
  blink: {
    dropDownItem: 'Blink',
    beforeText: 'every',
    afterText: 'milliseconds',
    fieldBlock: new Blockly.FieldNumber(500, 0),
    fieldName: 'BLINK_TIME_IN_MS',
    codeGenerator: function (blockIn) {
      const inputBlock = Blockly.JavaScript.valueToCode(
        blockIn,
        'LED',
        Blockly.JavaScript.ORDER_ATOMIC
      );
      if (isNullOrEmpty(inputBlock)) {
        return '';
      }
      const variableCodeName = Blockly.JavaScript.variableDB_.getName(
        inputBlock,
        Blockly.Variables.NAME_TYPE
      );
      const command = blockIn.getFieldValue('LED_COMMAND');
      const arg = blockIn.getFieldValue('BLINK_TIME_IN_MS');
      const codeOut = `${variableCodeName}.${command}(${arg});\n`;
      return codeOut;
    },
  },
};

const additionalParamsArray = getAdditionParamsArray(additionalParamCommands);

Blockly.Blocks['led_on_off'] = {
  init: block.commandGenerator({
    dropDownArray: [...standardCommands, ...additionalParamsArray],
    validatorFunctionName: 'validate',
    variableName,
  }),
  mutationToDom: function () {
    const container = document.createElement('mutation');
    const fieldValue = this.getFieldValue('LED_COMMAND');

    const hasAdditionalParam = isAdditionaParamInput(
      fieldValue,
      additionalParamsArray
    );

    if (hasAdditionalParam) {
      container.setAttribute('additionalParam', fieldValue);
    } else {
      container.setAttribute('additionalParam', '');
    }
    return container;
  },
  domToMutation: function (xmlElement) {
    const additionalParam = xmlElement.getAttribute('additionalParam');
    this.updateShape_(additionalParam);
  },

  validate: function (newValue) {
    this.getSourceBlock().updateShape_(newValue);
    return newValue;
  },
  updateShape_: function (additionalParam) {
    const hasAdditionalParam = isAdditionaParamInput(
      additionalParam,
      additionalParamsArray
    );
    const inputExists = this.getInput('ADDITIONAL_PARAM');
    if (hasAdditionalParam) {
      if (!inputExists) {
        const additionalParamMeta = additionalParamCommands[additionalParam];
        const {
          beforeText,
          fieldBlock,
          fieldName,
          afterText,
        } = additionalParamMeta;
        this.appendDummyInput('ADDITIONAL_PARAM')
          .appendField(beforeText)
          .appendField(fieldBlock, fieldName)
          .appendField(afterText);
      }
    } else if (inputExists) {
      this.removeInput('ADDITIONAL_PARAM');
    }
  },
};

Blockly.JavaScript['led_on_off'] = function (blockIn) {
  const fieldValue = blockIn.getFieldValue('LED_COMMAND');

  const hasAdditionalParam = isAdditionaParamInput(
    fieldValue,
    additionalParamsArray
  );
  if (hasAdditionalParam) {
    return additionalParamCommands[fieldValue].codeGenerator(blockIn);
  }
  return code.commandGenerator()(blockIn);
};

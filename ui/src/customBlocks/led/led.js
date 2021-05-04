/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';

import createGenerators from '../../helpers/pinVariableGenerators';
import isNullOrEmpty from '../../helpers/isNullOrEmpty';

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

const {
  pinVariableBlockSetGenerator,
  pinVariableCodeSetGenerator,
  pinVariableBlockGetGenerator,
  pinVariableCodeGetGenerator,
  commandBlockGenerator,
  commandCodeGenerator,
} = createGenerators({ inputType: 'LED', color: '#6CB0F2' });

Blockly.Blocks['set_led'] = {
  init: pinVariableBlockSetGenerator({
    useText: 'be used for LED named',
  }),
};

Blockly.JavaScript['set_led'] = pinVariableCodeSetGenerator({
  constructorName: 'five.Led',
});

Blockly.Blocks['get_led'] = {
  init: pinVariableBlockGetGenerator({ useText: 'LED Name' }),
};

Blockly.JavaScript['get_led'] = pinVariableCodeGetGenerator();

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
    codeGenerator: function (block) {
      const inputBlock = Blockly.JavaScript.valueToCode(
        block,
        'LED',
        Blockly.JavaScript.ORDER_ATOMIC
      );
      if (isNullOrEmpty(inputBlock)) {
        return '';
      }
      const variableName = Blockly.JavaScript.variableDB_.getName(
        inputBlock,
        Blockly.Variables.NAME_TYPE
      );
      const command = block.getFieldValue('LED_COMMAND');
      const arg = block.getFieldValue('BLINK_TIME_IN_MS');
      const code = `${variableName}.${command}(${arg});\n`;
      return code;
    },
  },
};

const additionalParamsArray = getAdditionParamsArray(additionalParamCommands);

Blockly.Blocks['led_on_off'] = {
  init: commandBlockGenerator({
    dropDownArray: [...standardCommands, ...additionalParamsArray],
    validatorFunctionName: 'validate',
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

Blockly.JavaScript['led_on_off'] = function (block) {
  const fieldValue = block.getFieldValue('LED_COMMAND');

  const hasAdditionalParam = isAdditionaParamInput(
    fieldValue,
    additionalParamsArray
  );
  if (hasAdditionalParam) {
    return additionalParamCommands[fieldValue].codeGenerator(block);
  }
  return commandCodeGenerator()(block);
};

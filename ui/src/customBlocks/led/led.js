/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';

import createGenerators from 'customBlocks/generators/createGenerators';
import isNullOrEmpty from 'helpers/isNullOrEmpty';
import { inputType, color, variableName, BLOCKS_MAP } from './constants';

const isAdditionaParamInput = (additionalParamCommands) => (fieldValue) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < additionalParamCommands.length; i++) {
    if (fieldValue === additionalParamCommands[i][1]) {
      return true;
    }
  }
  return false;
};

// const getAdditionParamsArray = (obj) => {
//   const additionalParamsArray = Object.keys(obj).reduce(
//     (acc, key) => [...acc, [obj[key].dropDownItem, key]],
//     []
//   );
//   return additionalParamsArray;
// };

const { code, block } = createGenerators({ inputType, color });

const customOptionFieldName = 'LED_COMMAND';
const additionInputFieldName = 'ADDITIONAL_PARAM';

Blockly.Blocks[BLOCKS_MAP['makePin']] = {
  init: block.makePin({
    useText: 'used for LED named',
    variableName,
  }),
};

Blockly.JavaScript[BLOCKS_MAP['makePin']] = code.makePin({
  constructorName: 'five.Led',
});

Blockly.Blocks[BLOCKS_MAP['get']] = {
  init: block.getVariable({ variableName }),
};

Blockly.JavaScript[BLOCKS_MAP['get']] = code.getVariable();

const standardCommands = [
  ['Turn On', '.on()'],
  ['Turn Off', '.off()'],
  ['Start Pulsing', '.pulse()'],
  ['Stop Pulsing', '.stop()'],
  ['Fade In', '.fadeIn()'],
  ['Fade Out', '.fadeOut()'],
];

const additionalParamCommands = [['Blink', 'blink']];

// const additionalParamCommands = {
//   blink: {
//     dropDownItem: 'Blink',
//     beforeText: 'every',
//     afterText: 'milliseconds',
//     createFieldBlock: () => new Blockly.FieldNumber(500, 0),
//     fieldName: 'BLINK_TIME_IN_MS',
//     codeGenerator: function (blockIn) {
//       const inputBlock = Blockly.JavaScript.valueToCode(
//         blockIn,
//         'LED',
//         Blockly.JavaScript.ORDER_ATOMIC
//       );
//       if (isNullOrEmpty(inputBlock)) {
//         return '';
//       }
//       const variableCodeName = Blockly.JavaScript.variableDB_.getName(
//         inputBlock,
//         Blockly.Variables.NAME_TYPE
//       );
//       const command = blockIn.getFieldValue(customOptionFieldName);
//       const arg = blockIn.getFieldValue('BLINK_TIME_IN_MS');
//       const codeOut = `${variableCodeName}.${command}(${arg});\n`;
//       return codeOut;
//     },
//   },
// };

// const additionalParamsArray = getAdditionParamsArray(additionalParamCommands);

const createdFieldName = 'BLINK_TIME_IN_MS';

const checkInputsExists = (that) => that.getInput(additionInputFieldName);
const createFields = (that) =>
  that
    .appendDummyInput(additionInputFieldName)
    .appendField('every')
    .appendField(new Blockly.FieldNumber(500, 0), createdFieldName)
    .appendField('milliseconds');

const removeFields = (that) => that.removeInput(additionInputFieldName);
const customFields = [
  {
    fieldName: customOptionFieldName,
    getHasCustomOptions: isAdditionaParamInput(additionalParamCommands),
    checkInputsExists,
    createFields,
    removeFields,
  },
];

Blockly.Blocks[BLOCKS_MAP['runCommand']] = {
  init: block.runCommand({
    dropDownArray: [...standardCommands, ...additionalParamCommands],
    validatorFunctionName: block.getValidateFuncName(customOptionFieldName),
    variableName,
  }),
  ...block.customFieldMethodsGenerator({ customFields }),
  // mutationToDom: function () {
  //   const container = document.createElement('mutation');
  //   const fieldValue = this.getFieldValue(customOptionFieldName);

  //   const hasAdditionalParam = isAdditionaParamInput(
  //     fieldValue,
  //     additionalParamsArray
  //   );

  //   if (hasAdditionalParam) {
  //     container.setAttribute('additionalParam', fieldValue);
  //   } else {
  //     container.setAttribute('additionalParam', '');
  //   }
  //   return container;
  // },
  // domToMutation: function (xmlElement) {
  //   const additionalParam = xmlElement.getAttribute('additionalParam');
  //   this.updateShape_(additionalParam);
  // },

  // validate: function (newValue) {
  //   this.getSourceBlock().updateShape_(newValue);
  //   return newValue;
  // },
  // updateShape_: function (additionalParam) {
  //   const hasAdditionalParam = isAdditionaParamInput(
  //     additionalParam,
  //     additionalParamsArray
  //   );
  //   const inputExists = this.getInput(additionInputFieldName);
  //   if (hasAdditionalParam) {
  //     if (!inputExists) {
  //       const additionalParamMeta = additionalParamCommands[additionalParam];
  //       const {
  //         beforeText,
  //         createFieldBlock,
  //         fieldName,
  //         afterText,
  //       } = additionalParamMeta;
  //       this.appendDummyInput(additionInputFieldName)
  //         .appendField(beforeText)
  //         .appendField(createFieldBlock(), fieldName)
  //         .appendField(afterText);
  //     }
  //   } else if (inputExists) {
  //     this.removeInput(additionInputFieldName);
  //   }
  // },
};

const codeGenerator = (blockIn) => {
  console.group('additionalParam codeGenerator');
  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    blockIn.getFieldValue(inputType),
    Blockly.Variables.NAME_TYPE
  );
  console.log({ codeVariableName });

  if (isNullOrEmpty(codeVariableName)) {
    console.groupEnd();
    return '';
  }
  const command = blockIn.getFieldValue(customOptionFieldName);
  const arg = blockIn.getFieldValue(createdFieldName);
  const codeOut = `${codeVariableName}.${command}(${arg});\n`;
  console.groupEnd();
  return codeOut;
};

Blockly.JavaScript[BLOCKS_MAP['runCommand']] = function (blockIn) {
  console.group('LED.Block.js.runCommand');
  const fieldValue = blockIn.getFieldValue(customOptionFieldName);

  const hasAdditionalParam = isAdditionaParamInput(additionalParamCommands)(
    fieldValue
  );

  console.log({ hasAdditionalParam });

  if (hasAdditionalParam) {
    const additionPamamResult = codeGenerator(blockIn);
    console.groupEnd();
    return additionPamamResult;
  }

  const result = code.runCommand()(blockIn);
  console.groupEnd();
  return result;
};

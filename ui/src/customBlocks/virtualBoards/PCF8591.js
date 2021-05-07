/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';

import { PCF8591, PIN_PCF8591, COLORS } from 'constants/blockConstants';
import PCF8591Pins, { getPCF8591PinBlockName } from 'constants/PCF8591Pins';

import createGenerators from './virtualBoardGenerators';

const inputType = PCF8591;
const color = COLORS[PCF8591];

const variableName = 'PCF9581 (ADC) Name';
const pinType = PIN_PCF8591;
const useText = 'Create PCF8591 (ADC) named:';
const expanderName = 'PCF8591';

PCF8591Pins.forEach((pinName) => {
  const blockName = getPCF8591PinBlockName(pinName);

  Blockly.Blocks[blockName] = {
    init: function () {
      this.appendDummyInput().appendField(`PCF8591 Pin ${pinName}`);
      this.setOutput(true, pinType);
      this.setColour(color);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript[blockName] = function () {
    const code = `'${pinName}'`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
});

const { code, block } = createGenerators({ inputType, color });

Blockly.Blocks['set_PCF8591'] = {
  init: block.setGenerator({
    useText,
    variableName,
  }),
};

Blockly.JavaScript['set_PCF8591'] = code.setGenerator({
  expanderName,
});

Blockly.Blocks['get_PCF8591'] = {
  init: block.getGenerator({ variableName }),
};

Blockly.JavaScript['get_PCF8591'] = code.getGenerator();

Blockly.Blocks['use_PCF8591'] = {
  init: block.useGenerator({ variableName, pinType }),
};

Blockly.JavaScript['use_PCF8591'] = code.useGenerator({ pinType });

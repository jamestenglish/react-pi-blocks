/* eslint-disable dot-notation */
/* eslint-disable func-names, object-shorthand */
import Blockly from 'blockly';
import 'blockly/javascript';

import { PIN, COLORS } from 'constants/blockConstants';
import GPIOPins, { getGPIOBlockName } from 'constants/GPIOPins';

GPIOPins.forEach((option) => {
  const [name, value] = option;
  const blockName = getGPIOBlockName(name);

  Blockly.Blocks[blockName] = {
    init: function () {
      this.appendDummyInput().appendField(`Pin ${name}`);
      this.setOutput(true, PIN);
      this.setColour(COLORS[PIN]);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript[blockName] = function () {
    const code = `'${value}'`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
});

// Blockly.Blocks['pin_a'] = {
//   init: function () {
//     this.appendDummyInput().appendField('Pin');
//     this.setOutput(true, PIN);
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   },
// };

// Blockly.JavaScript['pin_a'] = function () {
//   const code = `'pin_a'`;
//   return [code, Blockly.JavaScript.ORDER_ATOMIC];
// };

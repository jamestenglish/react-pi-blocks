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
    const code = `{pin: '${value}'}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
});

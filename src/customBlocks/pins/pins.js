import Blockly from 'blockly';
import 'blockly/javascript';

import gpioOptions from '../constants/gpioOptions';

gpioOptions.forEach((option) => {
  const [name, value] = option;
  console.log({ name });
  const blockName = `pin_${name.replaceAll('#', '')}`;
  console.log({ blockName });

  Blockly.Blocks[blockName] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`Pin ${name}`);
      this.setOutput(true, "PIN");
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript[blockName] = function (block) {

    var code = `'${value}'`
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
});

Blockly.Blocks['pin_a'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Pin");
    this.setOutput(true, "PIN");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['pin_a'] = function (block) {

  var code = `'pin_a'`
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

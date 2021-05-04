/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import jsBlockly from 'blockly/javascript';

Blockly.Blocks['board_setup'] = {
  init: function () {
    this.appendDummyInput().appendField('Start');
    this.setHelpUrl('');
    this.setColour(50);
    this.appendStatementInput('MAIN').setCheck(null);
  },
};

Blockly.JavaScript['board_setup'] = function (block) {
  const statementsMain = Blockly.JavaScript.statementToCode(block, 'MAIN');
  const code = `
  board.on("ready", () => {
    ${statementsMain}
  });
  `;
  return code;
};
const initBlocks = () => {
  console.log({ Blockly, jsBlockly });
};
export default initBlocks;

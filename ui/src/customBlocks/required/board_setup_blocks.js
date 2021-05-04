import Blockly from 'blockly';
import 'blockly/javascript';
// procedures_easylab4kids_boards
Blockly.Blocks['board_setup'] = {
  /**
   * Block for defining a procedure with no return value.
   * @this Blockly.Block
   */
  init: function () {
    this.appendDummyInput().appendField('Start');
    this.setHelpUrl('');
    this.setColour(50);
    this.appendStatementInput('MAIN').setCheck(null);
  },
};

Blockly.JavaScript['board_setup'] = function (block) {
  var statementsMain = Blockly.JavaScript.statementToCode(block, 'MAIN');
  var code = `
  board.on("ready", () => {
    ${statementsMain}
  });
  `;
  return code;
};

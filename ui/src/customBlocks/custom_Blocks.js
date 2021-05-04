/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import jsBlockly from 'blockly/javascript';

Blockly.Blocks['new_boundary_function'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput('Boundary Function Name'),
      'Name'
    );
    this.appendStatementInput('Content').setCheck(null);
    this.setInputsInline(true);
    this.setColour(315);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['new_boundary_function'] = function (block) {
  const text_name = block.getFieldValue('Name');
  const statements_content = Blockly.JavaScript.statementToCode(
    block,
    'Content'
  );
  // TODO: Assemble Python into code variable.
  const code =
    'def ' + text_name + '(_object,**kwargs):\n' + statements_content + '\n';
  return code;
};

Blockly.Blocks['return'] = {
  init: function () {
    this.appendValueInput('NAME').setCheck(null).appendField('return');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['return'] = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(
    block,
    'NAME',
    Blockly.Javascript.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  const code = 'return ' + value_name + '\n';
  return code;
};

const initBlocks = () => {
  console.log({ Blockly, jsBlockly });
};
export default initBlocks;

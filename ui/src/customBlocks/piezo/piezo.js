/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';
import isNullOrEmpty from 'helpers/isNullOrEmpty';
import createGenerators from 'helpers/pinInputGenerators';

import {
  inputType,
  color,
  BLOCKS_MAP,
  getBlockTypeName,
  piezeNotesMap,
} from './constants';

const { code, block } = createGenerators({ inputType, color });

const variableName = 'Piezo Name';
const STATEMENT_NAME = 'PIEZO_PLAY_STATEMENT';
const TEMPO_FIELD = 'PIZEO_TEMPO_FIELD';

const NOTE_OPTIONS = Object.keys(piezeNotesMap).map((key) => {
  return [key, `${piezeNotesMap[key]}`];
});

NOTE_OPTIONS.push(['Silence', 'null']);

const NOTE_FIELD = 'PIEZO_NOTE_FIELD';
const NOTE_LENGTH_FIELD = 'PIEZO_NOTE_LENGTH_FIELD';

console.group('piezo');
console.log({ BLOCKS_MAP });
Blockly.Blocks[BLOCKS_MAP['set']] = {
  init: block.setGenerator({
    useText: 'be used for piezo named',
    variableName,
  }),
};

Blockly.JavaScript[BLOCKS_MAP['set']] = code.setGenerator({
  constructorName: 'five.Piezo',
});

Blockly.Blocks[BLOCKS_MAP['play']] = {
  init: function () {
    this.appendDummyInput().appendField('With');
    this.appendDummyInput(inputType).appendField(
      new Blockly.FieldVariable(variableName, null, [inputType], inputType),
      inputType
    );
    this.appendDummyInput()
      .appendField('play at')
      .appendField(new Blockly.FieldNumber(150, 1, 1000), TEMPO_FIELD)
      .appendField('beats per minute');
    this.appendStatementInput(STATEMENT_NAME).setCheck([
      getBlockTypeName('note'),
    ]);

    this.setColour(color);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript[BLOCKS_MAP['play']] = function (blockIn) {
  const piezoTempo = blockIn.getFieldValue(TEMPO_FIELD);

  const statementsMain = Blockly.JavaScript.statementToCode(
    blockIn,
    STATEMENT_NAME
  );

  const variableFieldValue = blockIn.getFieldValue(inputType);

  if (
    isNullOrEmpty(statementsMain) ||
    isNullOrEmpty(piezoTempo) ||
    isNullOrEmpty(variableFieldValue)
  ) {
    return '';
  }

  const codeVariableName = Blockly.JavaScript.variableDB_.getName(
    variableFieldValue,
    Blockly.Variables.NAME_TYPE
  );
  const codeOut = `
    ${codeVariableName}.play({
        temp: ${piezoTempo},
        song: [${statementsMain}]
    });
    `;

  return codeOut;
};

Blockly.Blocks[BLOCKS_MAP['note']] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Play Note')

      .appendField(new Blockly.FieldDropdown(NOTE_OPTIONS), NOTE_FIELD);

    this.appendDummyInput()
      .appendField(' for ')
      .appendField(
        new Blockly.FieldNumber(1.5, 0.25, Infinity, 0.25),
        NOTE_LENGTH_FIELD
      )
      .appendField('beats');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.JavaScript[BLOCKS_MAP['note']] = function (blockIn) {
  const piezoNote = blockIn.getFieldValue(NOTE_FIELD);
  const piezoNoteLength = blockIn.getFieldValue(NOTE_LENGTH_FIELD);

  if (isNullOrEmpty(piezoNoteLength)) {
    return '';
  }
  const codeOut = `[${piezoNote}, ${piezoNoteLength}],\n`;
  return codeOut;
};

console.groupEnd();

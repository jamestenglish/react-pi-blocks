/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';
import createGenerators from 'customBlocks/generators/createGenerators';

import { inputType, color, SENSOR_BLOCKS_MAP, variableName } from './constants';

const { code, block } = createGenerators({
  inputType,
  color,
});
console.log('-------\n-------\n-------\n-------\n');
console.log({ SENSOR_BLOCKS_MAP });
Blockly.Blocks[SENSOR_BLOCKS_MAP['get']] = {
  init: block.getVariable({
    variableName,
  }),
};

Blockly.JavaScript[SENSOR_BLOCKS_MAP['get']] = code.getVariable({
  propertyName: 'value',
});

console.log({ test: Blockly.Blocks[SENSOR_BLOCKS_MAP['get']] });

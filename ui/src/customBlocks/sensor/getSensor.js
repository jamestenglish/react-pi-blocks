/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
import Blockly from 'blockly';
import 'blockly/javascript';

import {
  inputType,
  color,
  SENSOR_BLOCKS_MAP,
  getBlockTypeName,
} from './constants';

import createGetSensorGenerators from './createGetSensorGenerators';

const ancestorBlockType = getBlockTypeName('on_change');
console.log('-----======------');
console.log({ ancestorBlockType });

const { code, block } = createGetSensorGenerators({
  inputType,
  color,
  ancestorBlockType,
});

Blockly.Blocks[SENSOR_BLOCKS_MAP['get_value']] = block.get({
  fieldText: 'Sensor value',
});

Blockly.JavaScript[SENSOR_BLOCKS_MAP['get_value']] = code.get({
  propertyName: 'value',
});

const SCALE_FIELD_MIN_NAME = 'SCALE_FIELD_MIN';
const SCALE_FIELD_MAX_NAME = 'SCALE_FIELD_MAX';

const scaleFields = [
  {
    createField: () => new Blockly.FieldNumber(0, 0, 1023),
    name: SCALE_FIELD_MIN_NAME,
    text: 'minimum: ',
  },
  {
    createField: () => new Blockly.FieldNumber(1023, 0, 1023),
    name: SCALE_FIELD_MAX_NAME,
    text: 'maximum: ',
  },
];

Blockly.Blocks[SENSOR_BLOCKS_MAP['get_scaled']] = block.get({
  fieldText: 'Scale sensor value ',
  fields: scaleFields,
});

Blockly.JavaScript[SENSOR_BLOCKS_MAP['get_scaled']] = code.get({
  propertyName: 'scaleTo',
  fields: scaleFields,
});

const FSCALE_FIELD_MIN_NAME = 'FSCALE_FIELD_MIN';
const FSCALE_FIELD_MAX_NAME = 'FSCALE_FIELD_MAX';
const floatingScaleFields = [
  {
    createField: () => new Blockly.FieldNumber(0, 0, 1023),
    name: FSCALE_FIELD_MIN_NAME,
    text: 'minimum: ',
  },
  {
    createField: () => new Blockly.FieldNumber(1023, 0, 1023),
    name: FSCALE_FIELD_MAX_NAME,
    text: 'maximum: ',
  },
];

Blockly.Blocks[SENSOR_BLOCKS_MAP['get_fscaled']] = block.get({
  fieldText: 'Scale sensor value to decimal',
  fields: floatingScaleFields,
});

Blockly.JavaScript[SENSOR_BLOCKS_MAP['get_fscaled']] = code.get({
  propertyName: 'fscaleTo',
  fields: floatingScaleFields,
});

const BOOLEAN_AT_FIELD_NAME = 'BOOLEAN_AT';
const booleanAtFields = [
  {
    createField: () => new Blockly.FieldNumber(0, 0, 1023),
    name: BOOLEAN_AT_FIELD_NAME,
    text: 'boolean at: ',
  },
];

Blockly.Blocks[SENSOR_BLOCKS_MAP['boolean_at']] = block.get({
  fieldText: 'Set ',
  fields: booleanAtFields,
  additionalInitFunc: (ref) => {
    ref.setPreviousStatement(true, null);
    ref.setNextStatement(true, null);
    ref.setInputsInline(true);
  },
});

Blockly.JavaScript[SENSOR_BLOCKS_MAP['boolean_at']] = code.get({
  propertyName: 'booleanAt',
  fields: booleanAtFields,
  codeWrapper: (codeIn) => codeIn,
});

Blockly.Blocks[SENSOR_BLOCKS_MAP['get_boolean']] = block.get({
  fieldText: 'Sensor boolean',
});

Blockly.JavaScript[SENSOR_BLOCKS_MAP['get_boolean']] = code.get({
  propertyName: 'boolean',
});

Blockly.Blocks[SENSOR_BLOCKS_MAP['get_raw']] = block.get({
  fieldText: 'Sensor raw value',
});

Blockly.JavaScript[SENSOR_BLOCKS_MAP['get_raw']] = code.get({
  propertyName: 'raw',
});

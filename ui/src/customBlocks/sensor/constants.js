import { SENSOR, COLORS } from 'constants/blockConstants';
import createGetBlockTypeName from 'helpers/createGetBlockTypeName';
import getBlockTypeMap from 'helpers/getBlockTypeMap';

export const inputType = SENSOR;
export const color = COLORS[SENSOR];
export const variableName = 'Sensor Name';

export const getBlockTypeName = createGetBlockTypeName(inputType);

export const SENSOR_BLOCK_TYPES = [
  getBlockTypeName('makePin'),
  getBlockTypeName('get'),
  getBlockTypeName('on_change'),
  getBlockTypeName('get_value'),
  getBlockTypeName('get_scaled'),
  getBlockTypeName('get_fscaled'),
  getBlockTypeName('boolean_at'),
  getBlockTypeName('get_boolean'),
  getBlockTypeName('get_raw'),
];

console.log('-------\n-------\n-------\n-------\n');
console.log({ SENSOR_BLOCK_TYPES });
export const SENSOR_BLOCKS_MAP = getBlockTypeMap(SENSOR_BLOCK_TYPES);

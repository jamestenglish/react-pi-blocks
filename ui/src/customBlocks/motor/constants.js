import { MOTOR, COLORS } from 'constants/blockConstants';
import createGetBlockTypeName from 'helpers/createGetBlockTypeName';
import getBlockTypeMap from 'helpers/getBlockTypeMap';

export const inputType = MOTOR;
export const color = COLORS[MOTOR];

export const getBlockTypeName = createGetBlockTypeName(inputType);

export const MOTOR_BLOCK_TYPES = [
  getBlockTypeName('makePin'),
  getBlockTypeName('get'),
  getBlockTypeName('runCommand'),
];

export const BLOCKS_MAP = getBlockTypeMap(MOTOR_BLOCK_TYPES);
export const variableName = 'Motor Name';

import { LED, COLORS } from 'constants/blockConstants';
import createGetBlockTypeName from 'helpers/createGetBlockTypeName';
import getBlockTypeMap from 'helpers/getBlockTypeMap';

export const inputType = LED;
export const color = COLORS[LED];

export const getBlockTypeName = createGetBlockTypeName(inputType);

export const LED_BLOCK_TYPES = [
  getBlockTypeName('makePin'),
  getBlockTypeName('get'),
  getBlockTypeName('runCommand'),
];

export const BLOCKS_MAP = getBlockTypeMap(LED_BLOCK_TYPES);
export const variableName = 'LED Name';

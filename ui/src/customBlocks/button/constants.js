import { BUTTON, COLORS } from 'constants/blockConstants';
import createGetBlockTypeName from 'helpers/createGetBlockTypeName';
import getBlockTypeMap from 'helpers/getBlockTypeMap';

export const inputType = BUTTON;
export const color = COLORS[BUTTON];

export const getBlockTypeName = createGetBlockTypeName(inputType);

export const BUTTON_BLOCK_TYPES = [
  getBlockTypeName('makePin'),
  getBlockTypeName('get'),
  getBlockTypeName('on_off'),
];

export const BLOCKS_MAP = getBlockTypeMap(BUTTON_BLOCK_TYPES);
export const variableName = 'Button Name';

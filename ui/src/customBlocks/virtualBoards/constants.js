import { PCF8591, COLORS, PIN_WRAPPER_NAME } from 'constants/blockConstants';
import createGetBlockTypeName from 'helpers/createGetBlockTypeName';
import getBlockTypeMap from 'helpers/getBlockTypeMap';

export const inputType = PCF8591;
export const color = COLORS[PCF8591];
export const variableName = 'PCF9581 (ADC) Name';

export const getBlockTypeName = createGetBlockTypeName(inputType);

export const PCF8591_BLOCK_TYPES = [
  getBlockTypeName('set'),
  getBlockTypeName('get'),
  getBlockTypeName(`get_${PIN_WRAPPER_NAME}`),
];

export const BLOCKS_MAP = getBlockTypeMap(PCF8591_BLOCK_TYPES);

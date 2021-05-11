import {
  LED,
  BUTTON,
  PIN,
  PCF8591,
  SENSOR,
  PIEZO,
  COLORS,
} from 'constants/blockConstants';
import GPIOPins, { getGPIOBlockName } from 'constants/GPIOPins';
import PCF8591Pins, { getPCF8591PinBlockName } from 'constants/PCF8591Pins';
import { SENSOR_BLOCK_TYPES } from 'customBlocks/sensor/constants';
import { PIEZO_BLOCK_TYPES } from 'customBlocks/piezo/constants';
import { BUTTON_BLOCK_TYPES } from 'customBlocks/button/constants';

const blockTypeMapper = (blockType) => {
  return { type: blockType };
};

const SENSOR_BLOCKS = SENSOR_BLOCK_TYPES.map(blockTypeMapper);

const PIEZO_BLOCKS = PIEZO_BLOCK_TYPES.map(blockTypeMapper);

const BUTTON_BLOCKS = BUTTON_BLOCK_TYPES.map(blockTypeMapper);

const GPIOpinBlocks = GPIOPins.map((option) => {
  const [name] = option;
  const blockName = getGPIOBlockName(name);
  return {
    type: blockName,
  };
});

const PCF8591PinBlocks = PCF8591Pins.map((name) => {
  const blockName = getPCF8591PinBlockName(name);

  return {
    type: blockName,
  };
});

const toolboxCategories = [
  {
    name: 'Variables',
    custom: 'VARIABLE',
    colour: '#a55b80',
  },
  {
    name: 'Logic',
    colour: '#5C81A6',
    blocks: [
      { type: 'controls_if' },
      { type: 'logic_compare' },
      { type: 'logic_operation' },
      { type: 'logic_negate' },
      { type: 'logic_boolean' },
      { type: 'logic_null' },
      { type: 'logic_ternary' },
    ],
  },
  {
    name: 'Math',
    colour: '#5CA65C',
    blocks: [
      { type: 'math_number' },

      { type: 'math_arithmetic' },

      { type: 'math_single' },

      { type: 'math_trig' },

      { type: 'math_constant' },
      { type: 'math_number_property' },

      { type: 'math_round' },

      { type: 'math_on_list' },

      { type: 'math_modulo' },

      { type: 'math_constrain' },

      { type: 'math_random_int' },

      { type: 'math_random_float' },
    ],
  },

  {
    name: 'Text',
    colour: '#5CA65C',
    blocks: [
      {
        type: 'text',
      },
      { type: 'text_print' },
      {
        type: 'text_join',
      },
      {
        type: 'text_append',
      },
      {
        type: 'text_length',
      },
      {
        type: 'text_isEmpty',
      },
      {
        type: 'text_indexOf',
      },
      {
        type: 'text_charAt',
      },
      {
        type: 'text_getSubstring',
      },
      {
        type: 'text_changeCase',
      },
      {
        type: 'text_trim',
      },
    ],
  },
  {
    name: 'Loops',
    colour: '#5ba55b',
    blocks: [
      { type: 'controls_repeat_ext' },
      { type: 'controls_whileUntil' },
      { type: 'controls_for' },
      { type: 'controls_forEach' },
      { type: 'controls_flow_statements' },
    ],
  },
  {
    name: 'Required',
    colour: '#5CA699',
    blocks: [
      {
        type: 'board_setup',
      },
    ],
  },
  {
    name: 'Pins',
    colour: COLORS[PIN],
    blocks: GPIOpinBlocks,
  },

  {
    name: 'LED',
    colour: COLORS[LED],
    blocks: [
      {
        type: 'set_led',
      },
      {
        type: 'get_led',
      },
      {
        type: 'led_on_off',
      },
    ],
  },
  {
    name: 'Button',
    colour: COLORS[BUTTON],
    blocks: [...BUTTON_BLOCKS],
  },
  {
    name: 'PCF9581 (ADC)',
    colour: COLORS[PCF8591],
    blocks: [
      {
        type: 'set_PCF8591',
      },
      {
        type: 'get_PCF8591',
      },
      {
        type: 'use_PCF8591',
      },
      ...PCF8591PinBlocks,
    ],
  },
  {
    name: 'Sensor',
    colour: COLORS[SENSOR],
    blocks: [...SENSOR_BLOCKS],
  },
  {
    name: 'Piezo',
    colour: COLORS[PIEZO],
    blocks: [...PIEZO_BLOCKS],
  },
  {
    name: 'Lists',
    colour: '#745ba5',
    blocks: [
      { type: 'lists_create_with' },
      { type: 'lists_repeat' },
      { type: 'lists_length' },
      { type: 'lists_isEmpty' },
      { type: 'lists_indexOf' },
      { type: 'lists_getIndex' },
      { type: 'lists_setIndex' },
      { type: 'lists_getSublist' },
      { type: 'lists_split' },
      { type: 'lists_sort' },
    ],
  },
];

export default toolboxCategories;

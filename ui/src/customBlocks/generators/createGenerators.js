import { PIN, PIN_TYPES } from 'constants/blockConstants';

import makePinGenerators from './makePinGenerators';
import getVariableValueGenerators from './getVariableValueGenerators';
import runCommandGenerators from './runCommandGenerators';
import mutationGenerators from './mutationGenerators';

const createGenerators = ({
  inputType,
  color = 230,
  pinTypes = PIN_TYPES,
  pinFieldName = PIN,
}) => {
  const generatorArgs = {
    inputType,
    color,
    pinTypes,
    pinFieldName,
  };

  const { code: makePinCode, block: makePinBlock } = makePinGenerators(
    generatorArgs
  );

  const {
    code: getVariableCode,
    block: getVariableBlock,
  } = getVariableValueGenerators(generatorArgs);

  const { block: mutationGeneratorsBlocks } = mutationGenerators(generatorArgs);

  const { code: runCommandCode, block: runCommandBlock } = runCommandGenerators(
    generatorArgs
  );

  return {
    code: {
      makePin: makePinCode,
      getVariable: getVariableCode,
      runCommand: runCommandCode,
    },
    block: {
      makePin: makePinBlock,
      getVariable: getVariableBlock,
      runCommand: runCommandBlock,
      ...mutationGeneratorsBlocks,
    },
  };
};

export default createGenerators;

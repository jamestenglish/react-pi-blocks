const createGetBlockTypeName = (inputType) => {
  const getBlockTypeName = (name) => {
    return `${inputType}_${name}`;
  };
  return getBlockTypeName;
};

export default createGetBlockTypeName;

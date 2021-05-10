const getSensorBlockTypeMap = (blockTypes) => {
  const result = blockTypes.reduce((acc, cur) => {
    const keyA = cur;
    const keyB = cur.replace(/.*?_/, '');
    return {
      ...acc,
      [keyA]: cur,
      [keyB]: cur,
    };
  }, {});

  return result;
};

export default getSensorBlockTypeMap;

const getLastItem = (queue) => {
  const { length } = queue;
  if (length > 0) {
    const currentItem = queue[length - 1];
    return currentItem;
  }
  return null;
};

const createLogHelper = (mutedGroups) => {
  const queue = [];
  const groupFunc = console.group;
  console.group = (name = undefined) => {
    queue.push(name);
    if (!mutedGroups.includes(name)) {
      groupFunc(name);
    }
  };
  const groupEndFunc = console.groupEnd;
  console.groupEnd = () => {
    const name = queue.pop();
    if (!mutedGroups.includes(name)) {
      groupEndFunc();
    }
  };

  const logFunc = console.log;
  console.log = (...values) => {
    const lastItem = getLastItem(queue);
    if (lastItem != null && !mutedGroups.includes(lastItem)) {
      logFunc(...values);
    }
  };
};

export default createLogHelper;

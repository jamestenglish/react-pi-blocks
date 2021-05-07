const GPIOPins = [
  ['#4', 'P1-7'],
  ['#5', 'P1-29'],
  ['#6', 'P1-31'],
  ['#12', 'P1-32'],
  ['#13', 'P1-33'],
  ['#16', 'P1-36'],
  ['#17', 'P1-11'],
  ['#18', 'P1-12'],
  ['#19', 'P1-35'],
  ['#20', 'P1-38'],
  ['#21', 'P1-40'],
  ['#23', 'P1-16'],
  ['#24', 'P1-18'],
  ['#25', 'P1-22'],
  ['#26', 'P1-37'],
  ['#27', 'P1-13'],
];

const gpioMap = GPIOPins.reduce((prev, curr) => {
  return {
    ...prev,
    [curr[0]]: curr[1],
  };
}, {});

const getGPIOBlockName = (name) => `pin_${name.replaceAll('#', '')}`;

export default GPIOPins;

export { gpioMap, getGPIOBlockName };

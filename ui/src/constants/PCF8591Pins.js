const PCF8591Pins = ['A0', 'A1', 'A2', 'A3'];

const getPCF8591PinBlockName = (pinName) => `pin_PCF8591_${pinName}`;

export default PCF8591Pins;

export { getPCF8591PinBlockName };

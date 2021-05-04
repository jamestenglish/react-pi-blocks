import Blockly from 'blockly';
import 'blockly/javascript';
let pins = [];

const pinLimiter = (event, workspace) => {
  if (event.type === Blockly.Events.BLOCK_CREATE) {
    const block = workspace.getBlockById(event.blockId);
    const { type, id } = block;
    if (type.startsWith('pin_')) {
      if (pins.find(({ type: inType }) => inType === type)) {
        setTimeout(() => {
          alert('You have already used this pin for something!');
        }, 1000);
      }
      pins.push({ type, id });
    }
  }
  if (event.type === Blockly.Events.BLOCK_DELETE) {
    const { blockId } = event;

    let found = false;
    pins = pins.filter(({ id }) => {
      if (found) {
        return true;
      }
      if (blockId === id) {
        found = true;
        return false;
      }
      return true;
    });
  }
};

export default pinLimiter;

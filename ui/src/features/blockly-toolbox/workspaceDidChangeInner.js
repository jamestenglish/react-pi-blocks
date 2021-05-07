import Blockly from 'blockly';

import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

const workspaceDidChangeInner = (
  workspace,
  initializedRef,
  workspaceRef,
  xml,
  handleToolboxChange
) => {
  // eslint-disable-next-line no-param-reassign
  workspaceRef.current = workspace;
  if (!initializedRef.current && workspace) {
    console.group('initialization');
    console.log('Initializing Workspace');
    console.groupEnd();
  }
  // console.log({ workspace });
  const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  const rearrangedCode = `
      const { RaspiIO } = require('raspi-io');
      const five = require("johnny-five");
      const board = new five.Board({
        io: new RaspiIO()
      });
    
      ${code}`.replaceAll('window.alert', 'console.log');

  let prettierCode = rearrangedCode;

  try {
    prettierCode = prettier.format(rearrangedCode, {
      parser: 'babel',
      plugins: [parserBabel],
    });
  } catch (err) {
    console.group('Prettier Error');
    console.error(err);
    console.groupEnd();
  }
  if (xml !== newXml || !initializedRef.current) {
    console.group('xml changed');
    console.log('setting state');
    console.groupEnd();
    handleToolboxChange({ code: prettierCode, xml: newXml });
  }
  // eslint-disable-next-line no-param-reassign
  initializedRef.current = true;
};

export default workspaceDidChangeInner;

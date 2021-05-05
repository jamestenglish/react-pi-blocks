(this["webpackJsonpreact-pi-blocks-ui"]=this["webpackJsonpreact-pi-blocks-ui"]||[]).push([[0],{129:function(e,t,n){},130:function(e,t,n){},176:function(e,t,n){"use strict";n.r(t);var o=n(4),a=n(0),i=n.n(a),l=n(11),r=n.n(l),c=(n(129),n(15)),s=n(36),u=n(116),p=(n(130),n(6)),d=n.n(p),m=n(25),b=n.n(m);d.a.Blocks.new_boundary_function={init:function(){this.appendDummyInput().appendField(new d.a.FieldTextInput("Boundary Function Name"),"Name"),this.appendStatementInput("Content").setCheck(null),this.setInputsInline(!0),this.setColour(315),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript.new_boundary_function=function(e){return"def "+e.getFieldValue("Name")+"(_object,**kwargs):\n"+d.a.JavaScript.statementToCode(e,"Content")+"\n"},d.a.Blocks.return={init:function(){this.appendValueInput("NAME").setCheck(null).appendField("return"),this.setInputsInline(!1),this.setPreviousStatement(!0,null),this.setColour(330),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript.return=function(e){return"return "+d.a.JavaScript.valueToCode(e,"NAME",d.a.Javascript.ORDER_ATOMIC)+"\n"},d.a.Blocks.board_setup={init:function(){this.appendDummyInput().appendField("Start"),this.setHelpUrl(""),this.setColour(50),this.appendStatementInput("MAIN").setCheck(null)}},d.a.JavaScript.board_setup=function(e){var t=d.a.JavaScript.statementToCode(e,"MAIN");return'\n  board.on("ready", () => {\n    '.concat(t,"\n  });\n  ")};var h=n(80),f=function(e){return null===e||void 0===e||""===e};console.log({Blockly:d.a,jsBlockly:b.a});var j=function(e){var t=e.inputType,n=e.color,o=void 0===n?230:n;return{pinVariableBlockSetGenerator:function(e){var n=e.useText;return function(){this.appendDummyInput().appendField("Make Pin"),this.appendValueInput("PIN").setCheck("PIN"),this.appendDummyInput().appendField(n),this.appendValueInput(t).setCheck(t),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(o),this.setTooltip(""),this.setHelpUrl("")}},pinVariableCodeSetGenerator:function(e){var n=e.constructorName;return function(e){var o=d.a.JavaScript.valueToCode(e,"PIN",d.a.JavaScript.ORDER_ATOMIC),a=d.a.JavaScript.valueToCode(e,t,d.a.JavaScript.ORDER_ATOMIC);if(f(o)||f(a))return"";var i=d.a.JavaScript.variableDB_.getName(a,d.a.Variables.NAME_TYPE);return"".concat(i," = new ").concat(n,"(").concat(o,");\n")}},pinVariableBlockGetGenerator:function(e){var n=e.useText;return function(){this.appendDummyInput().appendField(new d.a.FieldVariable(n,null,[t],t),t),this.setOutput(!0,t),this.setColour(o)}},pinVariableCodeGetGenerator:function(){return function(e){return[d.a.JavaScript.variableDB_.getName(e.getFieldValue(t),d.a.Variables.NAME_TYPE),d.a.JavaScript.ORDER_ATOMIC]}},commandBlockGenerator:function(e){var n=e.dropDownArray,a=e.validatorFunctionName,i=void 0===a?null:a;return function(){var e=null;if(null!=i){var a=this[i];a&&(e=a)}this.appendValueInput(t).setCheck(t).appendField("Make"),this.appendDummyInput().appendField(new d.a.FieldDropdown(n,e),"".concat(t,"_COMMAND")),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(o),this.setTooltip(""),this.setHelpUrl("")}},commandCodeGenerator:function(){return function(e){var n=d.a.JavaScript.valueToCode(e,t,d.a.JavaScript.ORDER_ATOMIC);if(f(n))return"";var o=d.a.JavaScript.variableDB_.getName(n,d.a.Variables.NAME_TYPE),a=e.getFieldValue("".concat(t,"_COMMAND"));return"".concat(o).concat(a,";\n")}}}},g=function(e,t){for(var n=0;n<t.length;n++)if(e===t[n][1])return!0;return!1},v=j({inputType:"LED",color:"#6CB0F2"}),O=v.pinVariableBlockSetGenerator,x=v.pinVariableCodeSetGenerator,_=v.pinVariableBlockGetGenerator,C=v.pinVariableCodeGetGenerator,y=v.commandBlockGenerator,T=v.commandCodeGenerator;d.a.Blocks.set_led={init:O({useText:"be used for LED named"})},d.a.JavaScript.set_led=x({constructorName:"five.Led"}),d.a.Blocks.get_led={init:_({useText:"LED Name"})},d.a.JavaScript.get_led=C();var S,k={blink:{dropDownItem:"Blink",beforeText:"every",afterText:"milliseconds",fieldBlock:new d.a.FieldNumber(500,0),fieldName:"BLINK_TIME_IN_MS",codeGenerator:function(e){var t=d.a.JavaScript.valueToCode(e,"LED",d.a.JavaScript.ORDER_ATOMIC);if(f(t))return"";var n=d.a.JavaScript.variableDB_.getName(t,d.a.Variables.NAME_TYPE),o=e.getFieldValue("LED_COMMAND"),a=e.getFieldValue("BLINK_TIME_IN_MS");return"".concat(n,".").concat(o,"(").concat(a,");\n")}}},N=(S=k,Object.keys(S).reduce((function(e,t){return[].concat(Object(h.a)(e),[[S[t].dropDownItem,t]])}),[]));d.a.Blocks.led_on_off={init:y({dropDownArray:[].concat([["Turn On",".on()"],["Turn Off",".off()"],["Start Pulsing",".pulse()"],["Stop Pulsing",".stop()"],["Fade In",".fadeIn()"],["Fade Out",".fadeOut()"]],Object(h.a)(N)),validatorFunctionName:"validate"}),mutationToDom:function(){var e=document.createElement("mutation"),t=this.getFieldValue("LED_COMMAND");return g(t,N)?e.setAttribute("additionalParam",t):e.setAttribute("additionalParam",""),e},domToMutation:function(e){var t=e.getAttribute("additionalParam");this.updateShape_(t)},validate:function(e){return this.getSourceBlock().updateShape_(e),e},updateShape_:function(e){var t=g(e,N),n=this.getInput("ADDITIONAL_PARAM");if(t){if(!n){var o=k[e],a=o.beforeText,i=o.fieldBlock,l=o.fieldName,r=o.afterText;this.appendDummyInput("ADDITIONAL_PARAM").appendField(a).appendField(i,l).appendField(r)}}else n&&this.removeInput("ADDITIONAL_PARAM")}},d.a.JavaScript.led_on_off=function(e){var t=e.getFieldValue("LED_COMMAND");return g(t,N)?k[t].codeGenerator(e):T()(e)};var I=j({inputType:"BUTTON",color:"#749DC4"}),E=I.pinVariableBlockSetGenerator,D=I.pinVariableCodeSetGenerator,P=I.pinVariableBlockGetGenerator,A=I.pinVariableCodeGetGenerator;d.a.Blocks.set_button={init:E({useText:"be used for LED named"})},d.a.JavaScript.set_button=D({constructorName:"five.Button"}),d.a.Blocks.get_button={init:P({useText:"Button Name"})},d.a.JavaScript.get_button=A(),d.a.Blocks.button_on_off={init:function(){this.appendValueInput("BUTTON").setCheck("BUTTON").appendField("When"),this.appendDummyInput().appendField("is").appendField(new d.a.FieldDropdown([["Down","down"],["Up","up"],["Hold","hold"]]),"BUTTON_COMMAND"),this.appendStatementInput("BUTTON_STMT").setCheck(null),this.setColour("#6549DA"),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript.button_on_off=function(e){var t=e.getFieldValue("BUTTON_COMMAND"),n=d.a.JavaScript.statementToCode(e,"BUTTON_STMT");return'\n  button.on("'.concat(t,'", () => {\n    ').concat(n,"\n  });\n  ")};var B=n(54),M=[["#4","P1-7"],["#5","P1-29"],["#6","P1-31"],["#12","P1-32"],["#13","P1-33"],["#16","P1-36"],["#17","P1-11"],["#18","P1-12"],["#19","P1-35"],["#20","P1-38"],["#21","P1-40"],["#23","P1-16"],["#24","P1-18"],["#25","P1-22"],["#26","P1-37"],["#27","P1-13"]],F=(M.reduce((function(e,t){return Object(s.a)(Object(s.a)({},e),{},Object(B.a)({},t[0],t[1]))}),{}),M);F.forEach((function(e){var t=Object(c.a)(e,2),n=t[0],o=t[1],a="pin_".concat(n.replaceAll("#",""));d.a.Blocks[a]={init:function(){this.appendDummyInput().appendField("Pin ".concat(n)),this.setOutput(!0,"PIN"),this.setColour("#9CDEF6"),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript[a]=function(){return["'".concat(o,"'"),d.a.JavaScript.ORDER_ATOMIC]}})),d.a.Blocks.pin_a={init:function(){this.appendDummyInput().appendField("Pin"),this.setOutput(!0,"PIN"),this.setColour(230),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript.pin_a=function(){return["'pin_a'",d.a.JavaScript.ORDER_ATOMIC]};var w=n(227),V=n(230),J=n(228),R=n(219),G=n(216),L=n(108),U=n.n(L),H=n(109),z=n.n(H),X=n(110),q=n.n(X),Y=[{name:"Variables",custom:"VARIABLE",colour:"#a55b80"},{name:"Logic",colour:"#5C81A6",blocks:[{type:"controls_if"},{type:"logic_compare"},{type:"logic_operation"},{type:"logic_negate"},{type:"logic_boolean"},{type:"logic_null"},{type:"logic_ternary"}]},{name:"Math",colour:"#5CA65C",blocks:[{type:"math_number"},{type:"math_arithmetic"},{type:"math_single"},{type:"math_trig"},{type:"math_constant"},{type:"math_number_property"},{type:"math_round"},{type:"math_on_list"},{type:"math_modulo"},{type:"math_constrain"},{type:"math_random_int"},{type:"math_random_float"}]},{name:"Text",colour:"#5CA65C",blocks:[{type:"text"},{type:"text_join"},{type:"text_append"},{type:"text_length"},{type:"text_isEmpty"},{type:"text_indexOf"},{type:"text_charAt"},{type:"text_getSubstring"},{type:"text_changeCase"},{type:"text_trim"}]},{name:"Loops",colour:"#5ba55b",blocks:[{type:"controls_repeat_ext"},{type:"controls_whileUntil"},{type:"controls_for"},{type:"controls_forEach"},{type:"controls_flow_statements"}]},{name:"Required",colour:"#5CA699",blocks:[{type:"board_setup"}]},{name:"Pins",colour:"#9CDEF6",blocks:F.map((function(e){var t=Object(c.a)(e,1)[0];return{type:"pin_".concat(t.replaceAll("#",""))}}))},{name:"LED",colour:"#6CB0F2",blocks:[{type:"set_led"},{type:"get_led"},{type:"led_on_off"}]},{name:"Button",colour:"#6549DA",blocks:[{type:"set_button"},{type:"get_button"},{type:"button_on_off"}]},{name:"Lists",colour:"#745ba5",blocks:[{type:"lists_create_with"},{type:"lists_create_with"},{type:"lists_repeat"},{type:"lists_length"},{type:"lists_isEmpty"},{type:"lists_indexOf"},{type:"lists_getIndex"},{type:"lists_setIndex"},{type:"lists_getSublist"},{type:"lists_split"},{type:"lists_sort"}]}],K=function(e){console.group("xml error"),console.error(e),console.groupEnd()},W=Object(G.a)((function(e){return{root:{"& > *":{margin:e.spacing(1)}}}})),$=function(e){var t=e.toolboxState,n=e.handleToolboxChange;console.group("BlocklyToolbox");var a=t.xml;console.log({xml:a});var i,l=!1,r=function(e){i&&d.a.Variables.createVariableButtonHandler(i,null,e)};var c=W();return console.groupEnd(),Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("div",{className:c.root,children:[Object(o.jsx)(R.a,{variant:"outlined",color:"primary",size:"small",onClick:function(){return r("LED")},children:"Create LED"}),Object(o.jsx)(R.a,{variant:"outlined",color:"primary",size:"small",onClick:function(){return r("BUTTON")},children:"Create Button"})]}),Object(o.jsx)(U.a,{toolboxCategories:Y,initialXml:a,wrapperDivClassName:"fill-height",workspaceConfiguration:{grid:{spacing:20,length:3,colour:"#ccc",snap:!0}},workspaceDidChange:function(e){i=e,!l&&e&&(l=!0,console.group("initialization"),console.log("Initializing Workspace"),console.groupEnd());var t=d.a.Xml.domToText(d.a.Xml.workspaceToDom(e)),o=d.a.JavaScript.workspaceToCode(e),r="\n  const { RaspiIO } = require('raspi-io');\n  const five = require(\"johnny-five\");\n  const board = new five.Board({\n    io: new RaspiIO()\n  });\n\n  ".concat(o),c=r;try{c=z.a.format(r,{parser:"babel",plugins:[q.a]})}catch(s){console.group("Prettier Error"),console.error(s),console.groupEnd()}a!==t&&(console.group("xml changed"),console.log("setting state"),console.groupEnd(),n({code:c,xml:t}))},onImportXmlError:K})]})},Q=n(5),Z=n(113),ee=n.n(Z),te=n(114),ne=n.n(te),oe=n(112),ae=n.n(oe),ie="".concat(window.location.hostname,":8080"),le=ae.a.connect(ie,{reconnect:!0}),re=i.a.createContext(),ce=Object(Q.a)((function(e){return{root:{color:e.palette.getContrastText(e.palette.success.main),backgroundColor:e.palette.success.main,"&:hover":{backgroundColor:e.palette.success.dark}}}}))(R.a),se=function(e){var t=e.isProjectRunning,n=e.projectName,i=e.projectCode;console.group("Terminal");var l=Object(a.useState)(""),r=Object(c.a)(l,2),s=r[0],u=r[1],p=Object(a.useState)(""),d=Object(c.a)(p,2),m=d[0],b=d[1],h=Object(a.useRef)(null),f=Object(a.useContext)(re);console.log({socket:f}),Object(a.useEffect)((function(){!function(){var e;null===(e=h.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}()}),[s]),Object(a.useEffect)((function(){f.on("connect",(function(){console.log("Client has connected to the server!")})),f.on("message",(function(e){console.group("on message");var t=String.fromCharCode.apply(null,new Uint8Array(e));console.log({buf:t}),u((function(e){return"".concat(e,'<p class="terminal">').concat(t,"</p>")})),console.groupEnd()})),f.on("exit",(function(e){console.group("on exit"),console.log({data:e}),console.groupEnd(),u((function(t){return"".concat(t,'<p class="terminal">').concat(e,"</p>")}))}))}),[f]);var j=Object(G.a)((function(e){return{button:{"& > *":{margin:e.spacing(1)},position:"fixed"},terminalContainer:{paddingTop:"46px"}}}))();return console.groupEnd(),Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("div",{className:j.button,children:[Object(o.jsx)(ce,{variant:"contained",size:"small",startIcon:Object(o.jsx)(ee.a,{}),disabled:t||null==n||""===i,onClick:function(){console.group("handleRun"),console.log("emitting"),f.emit("copyProject",{projectCode:i}),setTimeout((function(){f.emit("message","sudo node /home/pi/Development/johnny-five/index.js"),f.emit("projectStarted")}),1e3),console.groupEnd()},children:"Play"}),Object(o.jsx)(R.a,{variant:"contained",color:"secondary",size:"small",startIcon:Object(o.jsx)(ne.a,{}),disabled:!t,onClick:function(){console.group("handleStop"),console.log("emitting");f.emit("message",".exit"),setTimeout((function(){f.emit("stopProject")}),500),console.groupEnd()},children:"Stop"})]}),Object(o.jsxs)("div",{className:"terminal ".concat(j.terminalContainer),children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{className:"terminal",dangerouslySetInnerHTML:{__html:s}}),Object(o.jsx)("div",{ref:h})]}),Object(o.jsxs)("form",{className:"terminal",onSubmit:function(e){console.group("handleSubmit"),console.log({value:m}),console.log("emitting"),f.emit("message",m),b(""),e.preventDefault(),console.groupEnd()},children:[">"," ",Object(o.jsx)("input",{className:"terminal",value:m,onChange:function(e){return b(e.target.value)}})]})]})]})},ue=n(225),pe=n(221),de=n(222),me=n(231),be=n(224),he=n(226),fe=n(229),je=n(223),ge=n(115),ve=n.n(ge),Oe=Object(G.a)((function(e){return{listRoot:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper,marginLeft:"auto",marginRight:"auto"},root:{flexGrow:1,margin:e.spacing(1)},formRoot:{"& > *":{margin:e.spacing(1),width:"25ch"}}}})),xe=function(e){var t=e.handleProjectNameSelection;console.group("ProjectManager");var n=Object(a.useContext)(re),l=Object(a.useState)(null),r=Object(c.a)(l,2),s=r[0],u=r[1],p=Object(a.useState)(""),d=Object(c.a)(p,2),m=d[0],b=d[1],h=Oe(),f=i.a.useState(null),j=Object(c.a)(f,2),g=j[0],v=j[1];Object(a.useEffect)((function(){n.on("connect",(function(){console.log("Client has connected to the server!")})),console.log("emit getFiles"),n.emit("getFiles"),n.on("files",(function(e){console.group("on files"),console.log({data:e}),console.groupEnd(),u(e)}))}),[n]);var O=null;return null!==s&&(O=s.map((function(e,n){return Object(o.jsxs)(pe.a,{button:!0,selected:g===n,onClick:function(n){return function(e,n){console.group("handleListItemClick"),console.log({file:n}),console.groupEnd(),t(n),v(null)}(0,e)},children:[Object(o.jsx)(de.a,{children:Object(o.jsx)(ve.a,{})}),Object(o.jsx)(me.a,{primary:e})]},e)}))),console.groupEnd(),Object(o.jsx)("div",{className:h.root,children:Object(o.jsxs)(je.a,{container:!0,spacing:3,children:[Object(o.jsx)(je.a,{item:!0,xs:6,children:Object(o.jsx)("div",{className:h.listRoot,children:null===O?Object(o.jsx)(be.a,{}):Object(o.jsx)(ue.a,{component:"nav","aria-label":"project files",subheader:Object(o.jsx)(he.a,{component:"div",id:"nested-list-subheader",children:"Saved Projects"}),children:O})})}),Object(o.jsx)(je.a,{item:!0,xs:6,children:Object(o.jsxs)("form",{className:h.formRoot,noValidate:!0,autoComplete:"off",children:[Object(o.jsx)(fe.a,{id:"standard-basic",label:"New Project Name",value:m,onChange:function(e){b(e.target.value)}}),Object(o.jsx)(R.a,{variant:"contained",color:"primary",disabled:0===m.trim().length||null===O,onClick:function(){var e="".concat(m.trim(),".xml");t(e),b("")},children:"Create New Project"})]})})]})})};function _e(e){var t=e.children,n=e.value,a=e.index,i=Object(u.a)(e,["children","value","index"]);return Object(o.jsx)("div",Object(s.a)(Object(s.a)({role:"tabpanel",hidden:n!==a,id:"simple-tabpanel-".concat(a),"aria-labelledby":"simple-tab-".concat(a)},i),{},{children:t}))}var Ce='<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_setup" id="{`$}^q8GM8vjCjK?)f5u" x="90" y="30"></block></xml>',ye=function(){console.group("App");var e=Object(a.useState)({code:"",xml:Ce}),t=Object(c.a)(e,2),n=t[0],i=t[1],l=Object(a.useState)(0),r=Object(c.a)(l,2),s=r[0],u=r[1],p=Object(a.useState)(null),d=Object(c.a)(p,2),m=d[0],b=d[1],h=Object(a.useState)(!1),f=Object(c.a)(h,2),j=f[0],g=f[1],v=Object(a.useCallback)((function(e){b(e)}),[]),O=Object(a.useCallback)((function(e){var t=e.xml,n=e.code;i({xml:t,code:n}),null!==m&&(console.group("handleToolboxChange"),console.log({xml:t,projectName:m}),console.groupEnd(),le.emit("saveFile",{contents:t,fileName:m}))}),[m]);return Object(a.useEffect)((function(){null!==m&&(console.group("getFile Effect"),console.log({projectName:m}),console.groupEnd(),le.emit("getFile",{fileName:m}))}),[m]),Object(a.useEffect)((function(){le.on("file",(function(e){if(console.group("on file"),""===e)console.log("blank file"),i({code:"",xml:Ce});else{var t=String.fromCharCode.apply(null,new Uint8Array(e));console.log({buf:t}),i({code:"",xml:t})}u(1),console.groupEnd()})),le.on("projectStatus",(function(e){console.group("on projectStatus"),console.log({status:e}),g(e),console.groupEnd()}))}),[]),console.groupEnd(),Object(o.jsxs)(re.Provider,{value:le,children:[Object(o.jsx)(w.a,{position:"static",children:Object(o.jsxs)(V.a,{value:s,onChange:function(e,t){u(t)},"aria-label":"Blockly Tabs",children:[Object(o.jsx)(J.a,{label:"Projects"}),Object(o.jsx)(J.a,{label:"Blockly",disabled:null===m}),Object(o.jsx)(J.a,{label:"Code",disabled:null===m}),Object(o.jsx)(J.a,{label:"XML",disabled:null===m}),Object(o.jsx)(J.a,{label:"Run"})]})}),Object(o.jsx)(_e,{value:s,index:0,children:Object(o.jsx)(xe,{handleProjectNameSelection:v})}),Object(o.jsx)(_e,{value:s,index:1,children:1===s&&Object(o.jsx)($,{toolboxState:n,handleToolboxChange:O})}),Object(o.jsx)(_e,{value:s,index:2,children:Object(o.jsx)("pre",{children:n.code})}),Object(o.jsx)(_e,{value:s,index:3,children:Object(o.jsx)("pre",{id:"generated-xml",children:n.xml})}),Object(o.jsx)(_e,{value:s,index:4,children:Object(o.jsx)(se,{isProjectRunning:j,projectCode:n.code,projectName:m})})]})};r.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(ye,{})}),document.getElementById("root"))}},[[176,1,2]]]);
//# sourceMappingURL=main.495aa3c1.chunk.js.map
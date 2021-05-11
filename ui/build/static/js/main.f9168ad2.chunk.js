(this["webpackJsonpreact-pi-blocks-ui"]=this["webpackJsonpreact-pi-blocks-ui"]||[]).push([[0],{144:function(e,t,n){},145:function(e,t,n){},191:function(e,t,n){"use strict";n.r(t);var a=n(4),o=n(0),i=n.n(o),r=n(12),l=n.n(r),c=(n(144),n(13)),s=n(11),u=n(34),p=(n(145),n(2)),d=n.n(p);n(19);d.a.Blocks.new_boundary_function={init:function(){this.appendDummyInput().appendField(new d.a.FieldTextInput("Boundary Function Name"),"Name"),this.appendStatementInput("Content").setCheck(null),this.setInputsInline(!0),this.setColour(315),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript.new_boundary_function=function(e){return"def "+e.getFieldValue("Name")+"(_object,**kwargs):\n"+d.a.JavaScript.statementToCode(e,"Content")+"\n"},d.a.Blocks.return={init:function(){this.appendValueInput("NAME").setCheck(null).appendField("return"),this.setInputsInline(!1),this.setPreviousStatement(!0,null),this.setColour(330),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript.return=function(e){return"return "+d.a.JavaScript.valueToCode(e,"NAME",d.a.Javascript.ORDER_ATOMIC)+"\n"},d.a.Blocks.board_setup={init:function(){this.appendDummyInput().appendField("Start"),this.setHelpUrl(""),this.setColour(50),this.appendStatementInput("MAIN").setCheck(null)}},d.a.JavaScript.board_setup=function(e){var t=d.a.JavaScript.statementToCode(e,"MAIN");return'\n  board.on("ready", () => {\n    '.concat(t,"\n  });\n  ")};var m,b=n(37),h=n(15),f="LED",g="BUTTON",v="PIN",j="PCF8591",O="SENSOR",_="PIEZO",y=(m={},Object(h.a)(m,f,"#6CB0F2"),Object(h.a)(m,g,"#6549DA"),Object(h.a)(m,v,"#9CDEF6"),Object(h.a)(m,j,"#FCA481"),Object(h.a)(m,O,"#A392E9"),Object(h.a)(m,_,"#749DC4"),m),C=function(e){return null===e||void 0===e||""===e},x=function(e){var t=e.inputType,n=e.color,a=void 0===n?230:n;return{block:{setGenerator:function(e){var n=e.useText,o=e.variableName;return function(){this.appendDummyInput().appendField("Make Pin"),this.appendValueInput(v).setCheck(v),this.appendDummyInput().appendField(n),this.appendDummyInput(t).appendField(new d.a.FieldVariable(o,null,[t],t),t),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(a),this.setTooltip(""),this.setHelpUrl("")}},getGenerator:function(e){var n=e.variableName;return function(){this.appendDummyInput().appendField(new d.a.FieldVariable(n,null,[t],t),t),this.setOutput(!0,t),this.setColour(a)}},commandGenerator:function(e){var n=e.dropDownArray,o=e.variableName,i=e.validatorFunctionName,r=void 0===i?null:i;return function(){var e=null;if(null!=r){var i=this[r];i&&(e=i)}this.appendDummyInput().appendField("Make"),this.appendDummyInput(t).appendField(new d.a.FieldVariable(o,null,[t],t),t),this.appendDummyInput().appendField(new d.a.FieldDropdown(n,e),"".concat(t,"_COMMAND")),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(a),this.setTooltip(""),this.setHelpUrl("")}}},code:{setGenerator:function(e){var n=e.constructorName;return function(e){var a=d.a.JavaScript.valueToCode(e,v,d.a.JavaScript.ORDER_ATOMIC),o=d.a.JavaScript.variableDB_.getName(e.getFieldValue(t),d.a.Variables.NAME_TYPE);return C(a)||C(o)?"":"".concat(o," = new ").concat(n,"(").concat(a,");\n")}},getGenerator:function(){return function(e){return[d.a.JavaScript.variableDB_.getName(e.getFieldValue(t),d.a.Variables.NAME_TYPE),d.a.JavaScript.ORDER_ATOMIC]}},commandGenerator:function(){return function(e){var n=d.a.JavaScript.variableDB_.getName(e.getFieldValue(t),d.a.Variables.NAME_TYPE);if(C(n))return"";var a=e.getFieldValue("".concat(t,"_COMMAND"));return"".concat(n).concat(a,";\n")}}}}},S=function(e,t){for(var n=0;n<t.length;n++)if(e===t[n][1])return!0;return!1},I=x({inputType:"LED",color:y.LED}),F=I.code,N=I.block,T="LED Name";d.a.Blocks.set_led={init:N.setGenerator({useText:"be used for LED named",variableName:T})},d.a.JavaScript.set_led=F.setGenerator({constructorName:"five.Led"}),d.a.Blocks.get_led={init:N.getGenerator({variableName:T})},d.a.JavaScript.get_led=F.getGenerator();var E,P={blink:{dropDownItem:"Blink",beforeText:"every",afterText:"milliseconds",createFieldBlock:function(){return new d.a.FieldNumber(500,0)},fieldName:"BLINK_TIME_IN_MS",codeGenerator:function(e){var t=d.a.JavaScript.valueToCode(e,"LED",d.a.JavaScript.ORDER_ATOMIC);if(C(t))return"";var n=d.a.JavaScript.variableDB_.getName(t,d.a.Variables.NAME_TYPE),a=e.getFieldValue("LED_COMMAND"),o=e.getFieldValue("BLINK_TIME_IN_MS");return"".concat(n,".").concat(a,"(").concat(o,");\n")}}},k=(E=P,Object.keys(E).reduce((function(e,t){return[].concat(Object(b.a)(e),[[E[t].dropDownItem,t]])}),[]));d.a.Blocks.led_on_off={init:N.commandGenerator({dropDownArray:[].concat([["Turn On",".on()"],["Turn Off",".off()"],["Start Pulsing",".pulse()"],["Stop Pulsing",".stop()"],["Fade In",".fadeIn()"],["Fade Out",".fadeOut()"]],Object(b.a)(k)),validatorFunctionName:"validate",variableName:T}),mutationToDom:function(){var e=document.createElement("mutation"),t=this.getFieldValue("LED_COMMAND");return S(t,k)?e.setAttribute("additionalParam",t):e.setAttribute("additionalParam",""),e},domToMutation:function(e){var t=e.getAttribute("additionalParam");this.updateShape_(t)},validate:function(e){return this.getSourceBlock().updateShape_(e),e},updateShape_:function(e){var t=S(e,k),n=this.getInput("ADDITIONAL_PARAM");if(t){if(!n){var a=P[e],o=a.beforeText,i=a.createFieldBlock,r=a.fieldName,l=a.afterText;this.appendDummyInput("ADDITIONAL_PARAM").appendField(o).appendField(i(),r).appendField(l)}}else n&&this.removeInput("ADDITIONAL_PARAM")}},d.a.JavaScript.led_on_off=function(e){var t=e.getFieldValue("LED_COMMAND");return S(t,k)?P[t].codeGenerator(e):F.commandGenerator()(e)};var D=function(e){return function(t){return"".concat(e,"_").concat(t)}},A=function(e){return e.reduce((function(e,t){var n,a=t,o=t.replace(/.*?_/,"");return Object(s.a)(Object(s.a)({},e),{},(n={},Object(h.a)(n,a,t),Object(h.a)(n,o,t),n))}),{})},w=g,M=y.BUTTON,B=D(w),V=[B("set"),B("get"),B("on_off")],J=A(V),R="Button Name",G="BUTTON_STMT",L="BUTTON_COMMAND",U=x({inputType:w,color:M}),H=U.code,Y=U.block;d.a.Blocks[J.set]={init:Y.setGenerator({useText:"be used for Button named",variableName:R})},d.a.JavaScript[J.set]=H.setGenerator({constructorName:"five.Button"}),d.a.Blocks[J.get]={init:Y.getGenerator({variableName:R})},d.a.JavaScript[J.get]=H.getGenerator(),d.a.Blocks[J.on_off]={init:function(){this.appendDummyInput().appendField("When"),this.appendDummyInput(w).appendField(new d.a.FieldVariable(R,null,[w],w),w),this.appendDummyInput().appendField("is").appendField(new d.a.FieldDropdown([["Down","down"],["Up","up"],["Hold","hold"]]),L),this.appendStatementInput(G).setCheck(null),this.setColour(M),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript[J.on_off]=function(e){var t=e.getFieldValue(L),n=d.a.JavaScript.statementToCode(e,G),a=d.a.JavaScript.variableDB_.getName(e.getFieldValue(w),d.a.Variables.NAME_TYPE);return"\n  ".concat(a,'.on("').concat(t,'", () => {\n    ').concat(n,"\n  });\n  ")};var z=[["#4","P1-7"],["#5","P1-29"],["#6","P1-31"],["#12","P1-32"],["#13","P1-33"],["#16","P1-36"],["#17","P1-11"],["#18","P1-12"],["#19","P1-35"],["#20","P1-38"],["#21","P1-40"],["#23","P1-16"],["#24","P1-18"],["#25","P1-22"],["#26","P1-37"],["#27","P1-13"]],W=(z.reduce((function(e,t){return Object(s.a)(Object(s.a)({},e),{},Object(h.a)({},t[0],t[1]))}),{}),function(e){return"pin_".concat(e.replaceAll("#",""))}),q=z;q.forEach((function(e){var t=Object(c.a)(e,2),n=t[0],a=t[1],o=W(n);d.a.Blocks[o]={init:function(){this.appendDummyInput().appendField("Pin ".concat(n)),this.setOutput(!0,v),this.setColour(y.PIN),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript[o]=function(){return["'".concat(a,"'"),d.a.JavaScript.ORDER_ATOMIC]}}));var Z=function(e){return"pin_PCF8591_".concat(e)},K=["A0","A1","A2","A3"],X=function(e){var t=e.inputType,n=e.color;return{block:{setGenerator:function(e){var a=e.variableName,o=e.useText;return function(){this.appendDummyInput().appendField(o),this.appendDummyInput(t).appendField(new d.a.FieldVariable(a,null,[t],t),t),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(n),this.setTooltip(""),this.setHelpUrl("")}},getGenerator:function(e){var a=e.variableName;return function(){this.appendDummyInput().appendField(new d.a.FieldVariable(a,null,[t],t),t),this.setOutput(!0,t),this.setColour(n)}},useGenerator:function(e){var a=e.variableName,o=e.pinType;return function(){this.appendDummyInput().appendField("Use"),this.appendDummyInput(t).appendField(new d.a.FieldVariable(a,null,[t],t),t),this.appendDummyInput().appendField("with PIN"),this.appendValueInput(o).setCheck(o),this.appendStatementInput("".concat(t,"_STMT")).setCheck(null),this.setColour(n),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setTooltip(""),this.setHelpUrl("")}}},code:{setGenerator:function(e){var n=e.expanderName;return function(e){var a=d.a.JavaScript.variableDB_.getName(e.getFieldValue(t),d.a.Variables.NAME_TYPE);return"".concat(a,' = new five.Board.Virtual(\n        new five.Expander("').concat(n,'")\n      );')}},getGenerator:function(){return function(e){return[d.a.JavaScript.variableDB_.getName(e.getFieldValue(t),d.a.Variables.NAME_TYPE),d.a.JavaScript.ORDER_ATOMIC]}},useGenerator:function(e){var n=e.pinType;return function(e){var a=d.a.JavaScript.statementToCode(e,"".concat(t,"_STMT")),o=d.a.JavaScript.valueToCode(e,n,d.a.JavaScript.ORDER_ATOMIC),i=d.a.JavaScript.variableDB_.getName(e.getFieldValue(t),d.a.Variables.NAME_TYPE);return C(o)||C(i)?"":"(() => {\n        const additionalParams = {\n          pin: ".concat(o,",\n          board: ").concat(i,"\n          \n        };\n        ").concat(a,"\n      })();\n      ")}}}}},Q=y.PCF8591,$="PCF9581 (ADC) Name",ee="PIN_PCF8591";K.forEach((function(e){var t=Z(e);d.a.Blocks[t]={init:function(){this.appendDummyInput().appendField("PCF8591 Pin ".concat(e)),this.setOutput(!0,ee),this.setColour(Q),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript[t]=function(){return["'".concat(e,"'"),d.a.JavaScript.ORDER_ATOMIC]}}));var te=X({inputType:"PCF8591",color:Q}),ne=te.code,ae=te.block;d.a.Blocks.set_PCF8591={init:ae.setGenerator({useText:"Create PCF8591 (ADC) named:",variableName:$})},d.a.JavaScript.set_PCF8591=ne.setGenerator({expanderName:"PCF8591"}),d.a.Blocks.get_PCF8591={init:ae.getGenerator({variableName:$})},d.a.JavaScript.get_PCF8591=ne.getGenerator(),d.a.Blocks.use_PCF8591={init:ae.useGenerator({variableName:$,pinType:ee})},d.a.JavaScript.use_PCF8591=ne.useGenerator({pinType:ee});var oe=O,ie=y.SENSOR,re="Sensor Name",le=D(oe),ce=[le("set"),le("on_change"),le("get_value"),le("get_scaled"),le("get_fscaled"),le("boolean_at"),le("get_boolean"),le("get_raw")],se=A(ce),ue="THRESHOLD",pe="FREQUENCY_IN_MS",de="custom options",me=[["defaults","defaults"],[de,de]],be="gpio_yes",he=[["No","gpio_no"],["Yes",be]],fe="customOptions",ge="customGPIO",ve="CUSTOM_OPTIONS_DUMMY_INPUT",je="PIN_INPUT",Oe=function(e){return"".concat(e,"_CUSTOM_OPTIONS")},_e=function(e){return"".concat(e,"_CUSTOM_GPIO")},ye=function(e){return e===de},Ce=function(e){return e===be};d.a.Blocks[se.set]={init:function(){this.appendDummyInput().appendField("Create Sensor").appendField(new d.a.FieldVariable(re,null,[oe],oe),oe).appendField("with").appendField(new d.a.FieldDropdown(me,this.validateCustomOptions),Oe(oe)),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(ie),this.setTooltip(""),this.setHelpUrl("")},mutationToDom:function(){var e=document.createElement("mutation"),t=this.getFieldValue(Oe(oe));if(ye(t)){e.setAttribute(fe,t);var n=this.getFieldValue(_e(oe));Ce(n)&&e.setAttribute(ge,n)}else e.setAttribute(fe,""),e.setAttribute(ge,"");return e},domToMutation:function(e){var t=e.getAttribute(fe),n=e.getAttribute(ge);this.updateShapeCustomOptionShape_(t),this.updateShapeGPIOShape_(n)},validateCustomOptions:function(e){return this.getSourceBlock().updateShapeCustomOptionShape_(e),e},validateGPIO:function(e){return this.getSourceBlock().updateShapeGPIOShape_(e),e},updateShapeCustomOptionShape_:function(e){var t=ye(e),n=this.getInput(ve);if(t)n||(this.setInputsInline(!1),this.appendDummyInput(ve).appendField(" Threshold:").appendField(new d.a.FieldNumber(1,1,1023),ue).appendField(" and Frequency:").appendField(new d.a.FieldNumber(25,1),pe).appendField(" Use GPIO?").appendField(new d.a.FieldDropdown(he,this.validateGPIO),_e(oe)));else if(n){this.removeInput(ve);try{this.removeInput(je)}catch(a){console.log(a)}this.setInputsInline(!0)}},updateShapeGPIOShape_:function(e){var t=Ce(e),n=this.getInput(je);t?n||this.appendValueInput(je).setCheck(v).setAlign(d.a.ALIGN_RIGHT).appendField("GPIO Pin"):n&&this.removeInput(je)}},d.a.JavaScript[se.set]=function(e){var t=d.a.JavaScript.variableDB_.getName(e.getFieldValue(oe),d.a.Variables.NAME_TYPE);if(C(re))return"";var n=e.getFieldValue(ue),a=e.getFieldValue(pe),o=d.a.JavaScript.valueToCode(e,je,d.a.JavaScript.ORDER_ATOMIC),i={};C(n)||(i.threshold=n),C(a)||(i.freq=a),C(o)||(i.pin=o.replaceAll("'","")),console.log({args:i});var r="".concat(t,"__ARGS");return"\n      let ".concat(r," = ").concat(JSON.stringify(i),";\n      try {\n          ").concat(r," = {\n              ...additionalParams,\n              ...").concat(r,"\n          } ;\n      } catch(e) {} // do nothing\n  \n      ").concat(t," = new five.Sensor(").concat(r,");")};var xe="SENSOR_EVENT",Se="SENSOR_ON_STATEMENT";d.a.Blocks[se.on_change]={init:function(){this.appendDummyInput().appendField("When sensor: ").appendField(new d.a.FieldVariable(re,null,[oe],oe),oe),this.appendDummyInput().appendField(new d.a.FieldDropdown([["Changes","change"],["Gets any data","data"]]),xe),this.appendStatementInput(Se).setCheck(null),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(ie)}},d.a.JavaScript[se.on_change]=function(e){var t=e.getFieldValue(xe),n=e.getFieldValue(oe);if(C(t)||C(n))return"";var a=d.a.JavaScript.variableDB_.getName(n,d.a.Variables.NAME_TYPE),o=d.a.JavaScript.statementToCode(e,Se);return console.log({sensorEvent:t,statementsMain:o}),"\n    ".concat(a,'.on("').concat(t,'", () => {\n      ').concat(o,"\n    });\n    ")};var Ie=function(e,t){var n=e.getSurroundParent();for(console.group("createGetSensorGenerators.hasSurroundedAncestor");null!=n&&(console.log({surroundParent:n,type:n.type,surroundAncestorType:t}),n.type!==t);)n=n.getSurroundParent();return console.groupEnd(),n},Fe=function(e){e.setOutput(!0,O)},Ne=function(e){return[e,d.a.JavaScript.ORDER_ATOMIC]},Te=function(e){var t=e.inputType,n=e.color,a=e.ancestorBlockType;return{code:{get:function(e){var n=e.propertyName,o=e.fields,i=void 0===o?[]:o,r=e.codeWrapper,l=void 0===r?Ne:r;return function(){var e=l(""),o=Ie(this,a);if(!!C(o))return e;var r=o.getFieldValue(t);if(console.log({sensorVariableNameFieldValue:r}),C(r))return e;for(var c=[],s=0;s<i.length;s+=1){var u=i[s].name,p=this.getFieldValue(u);if(C(p))return e;c.push(p)}var m=d.a.JavaScript.variableDB_.getName(r,d.a.Variables.NAME_TYPE);console.log({sensorVariableName:m,length:i.length});var b=0===i.length?n:"".concat(n,"(").concat(c.join(","),")"),h="".concat(m,".").concat(b),f=l(h);return console.log({result:f,updatedPropertyName:b,propertyName:n,fieldValues:c}),f}}},block:{get:function(e){var t=e.fieldText,o=e.fields,i=void 0===o?[]:o,r=e.additionalInitFunc,l=void 0===r?Fe:r;return{init:function(){this.appendDummyInput().appendField(t);var e=this;i.forEach((function(t){var n=t.createField,a=t.name,o=t.text,i=n();e.appendDummyInput().appendField(o).appendField(i,a)})),l(this),this.setColour(n),this.setTooltip(""),this.setHelpUrl(""),this.setOnChange(this._onChange)},_onChange:function(e){if(!function(e){var t=e.type!==d.a.Events.BLOCK_MOVE,n=void 0===e.newParentId&&void 0!==e.oldParentId;return t||n}(e)){console.group("sensor.onChange");var t=Ie(this,a),n=!C(t),o=this.getSurroundParent();console.log({event:e,hasSensorSurround:n,initialSurroundParent:o,type:e.type});var i=this.isEnabled();n||null==o?this.setEnabled(!0):(this.setEnabled(!1),i&&alert('This can only be under a "When Sensor" block.')),console.groupEnd()}}}}}}},Ee=le("on_change"),Pe=Te({inputType:oe,color:ie,ancestorBlockType:Ee}),ke=Pe.code,De=Pe.block;d.a.Blocks[se.get_value]=De.get({fieldText:"Sensor value"}),d.a.JavaScript[se.get_value]=ke.get({propertyName:"value"});var Ae=[{createField:function(){return new d.a.FieldNumber(0,0,1023)},name:"SCALE_FIELD_MIN",text:"minimum: "},{createField:function(){return new d.a.FieldNumber(1023,0,1023)},name:"SCALE_FIELD_MAX",text:"maximum: "}];d.a.Blocks[se.get_scaled]=De.get({fieldText:"Scale sensor value ",fields:Ae}),d.a.JavaScript[se.get_scaled]=ke.get({propertyName:"scaleTo",fields:Ae});var we=[{createField:function(){return new d.a.FieldNumber(0,0,1023)},name:"FSCALE_FIELD_MIN",text:"minimum: "},{createField:function(){return new d.a.FieldNumber(1023,0,1023)},name:"FSCALE_FIELD_MAX",text:"maximum: "}];d.a.Blocks[se.get_fscaled]=De.get({fieldText:"Scale sensor value to decimal",fields:we}),d.a.JavaScript[se.get_fscaled]=ke.get({propertyName:"fscaleTo",fields:we});var Me=[{createField:function(){return new d.a.FieldNumber(0,0,1023)},name:"BOOLEAN_AT",text:"boolean at: "}];d.a.Blocks[se.boolean_at]=De.get({fieldText:"Set ",fields:Me,additionalInitFunc:function(e){e.setPreviousStatement(!0,null),e.setNextStatement(!0,null),e.setInputsInline(!0)}}),d.a.JavaScript[se.boolean_at]=ke.get({propertyName:"booleanAt",fields:Me,codeWrapper:function(e){return"".concat(e,";\n")}}),d.a.Blocks[se.get_boolean]=De.get({fieldText:"Sensor boolean"}),d.a.JavaScript[se.get_boolean]=ke.get({propertyName:"boolean"}),d.a.Blocks[se.get_raw]=De.get({fieldText:"Sensor raw value"}),d.a.JavaScript[se.get_raw]=ke.get({propertyName:"raw"});var Be=_,Ve=y.PIEZO,Je=D(Be),Re=[Je("set"),Je("play"),Je("note"),Je("play_freq"),Je("off")],Ge=A(Re),Le={c0:16,"c#0":17,d0:18,"d#0":19,e0:21,f0:22,"f#0":23,g0:25,"g#0":26,a0:28,"a#0":29,b0:31,c1:33,"c#1":35,d1:37,"d#1":39,e1:41,f1:44,"f#1":47,g1:49,"g#1":52,a1:55,"a#1":58,b1:62,c2:65,"c#2":69,d2:73,"d#2":78,e2:82,f2:87,"f#2":93,g2:98,"g#2":104,a2:110,"a#2":117,b2:124,c3:131,"c#3":139,d3:147,"d#3":156,e3:165,f3:175,"f#3":185,g3:196,"g#3":208,a3:220,"a#3":233,b3:247,c4:262,"c#4":277,d4:294,"d#4":311,e4:330,f4:349,"f#4":370,g4:392,"g#4":415,a4:440,"a#4":466,b4:494,c5:523,"c#5":554,d5:587,"d#5":622,e5:659,f5:698,"f#5":740,g5:784,"g#5":831,a5:880,"a#5":932,b5:988,c6:1047,"c#6":1109,d6:1175,"d#6":1245,e6:1319,f6:1397,"f#6":1480,g6:1568,"g#6":1661,a6:1760,"a#6":1865,b6:1976,c7:2093,"c#7":2217,d7:2349,"d#7":2489,e7:2637,f7:2794,"f#7":2960,g7:3136,"g#7":3322,a7:3520,"a#7":3729,b7:3951,c8:4186,"c#8":4435,d8:4699,"d#8":4978,e8:5274,f8:5588,"f#8":5920,g8:6272,"g#8":6645,a8:7040,"a#8":7459,b8:7902},Ue=Object.keys(Le).reduce((function(e,t){return Object(s.a)(Object(s.a)({},e),{},Object(h.a)({},t,100*Le[t]))}),{}),He=x({inputType:Be,color:Ve}),Ye=He.code,ze=He.block,We="Piezo Name",qe="PIEZO_PLAY_STATEMENT",Ze="PIZEO_TEMPO_FIELD",Ke=Object.keys(Ue).map((function(e){return[e,"".concat(Ue[e])]}));Ke.push(["Silence","null"]);var Xe="PIEZO_NOTE_FIELD",Qe="PIEZO_NOTE_LENGTH_FIELD",$e="PIEZO_FREQUENCY_FIELD",et="PIEZO_DURATION_IN_MS";console.group("piezo"),console.log({BLOCKS_MAP:Ge}),d.a.Blocks[Ge.set]={init:ze.setGenerator({useText:"be used for piezo named",variableName:We})},d.a.JavaScript[Ge.set]=Ye.setGenerator({constructorName:"five.Piezo"}),d.a.Blocks[Ge.play]={init:function(){this.appendDummyInput().appendField("With"),this.appendDummyInput(Be).appendField(new d.a.FieldVariable(We,null,[Be],Be),Be),this.appendDummyInput().appendField("play at").appendField(new d.a.FieldNumber(150,1,1e3),Ze).appendField("beats per minute"),this.appendStatementInput(qe).setCheck([Je("note")]),this.setColour(Ve),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript[Ge.play]=function(e){var t=e.getFieldValue(Ze),n=d.a.JavaScript.statementToCode(e,qe),a=e.getFieldValue(Be);if(C(n)||C(t)||C(a))return"";var o=d.a.JavaScript.variableDB_.getName(a,d.a.Variables.NAME_TYPE);return"\n    ".concat(o,".play({\n        temp: ").concat(t,",\n        song: [").concat(n,"]\n    });\n    ")},d.a.Blocks[Ge.note]={init:function(){this.appendDummyInput().appendField("Play Note").appendField(new d.a.FieldDropdown(Ke),Xe),this.appendDummyInput().appendField(" for ").appendField(new d.a.FieldNumber(1.5,.25,1/0,.25),Qe).appendField("beats"),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(Ve),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript[Ge.note]=function(e){var t=e.getFieldValue(Xe),n=e.getFieldValue(Qe);return C(n)?"":"[".concat(t,", ").concat(n,"],\n")},d.a.Blocks[Ge.play_freq]={init:function(){this.appendDummyInput(Be).appendField("Make").appendField(new d.a.FieldVariable(We,null,[Be],Be),Be),this.appendDummyInput().appendField("play frequency"),this.appendValueInput($e).setCheck("Number"),this.appendDummyInput().appendField("for"),this.appendValueInput(et).setCheck("Number").appendField("milliseconds"),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(Ve),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript[Ge.play_freq]=function(e){var t=d.a.JavaScript.valueToCode(e,$e,d.a.JavaScript.ORDER_ATOMIC),n=d.a.JavaScript.valueToCode(e,et,d.a.JavaScript.ORDER_ATOMIC),a=e.getFieldValue(Be);if(C(a)||C(t)||C(n))return"";var o=d.a.JavaScript.variableDB_.getName(a,d.a.Variables.NAME_TYPE);return"".concat(o,".frequency(").concat(t,", ").concat(n,");\n")},d.a.Blocks[Ge.off]={init:function(){this.appendDummyInput(Be).appendField("Make").appendField(new d.a.FieldVariable(We,null,[Be],Be),Be),this.appendDummyInput().appendField("turn off"),this.setInputsInline(!0),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(Ve),this.setTooltip(""),this.setHelpUrl("")}},d.a.JavaScript[Ge.off]=function(e){var t=e.getFieldValue(Be);if(C(t))return"";var n=d.a.JavaScript.variableDB_.getName(t,d.a.Variables.NAME_TYPE);return"".concat(n,".off();\n")},console.groupEnd();var tt=n(251),nt=n(254),at=n(252),ot=n(236),it=n(233),rt=n(120),lt=n.n(rt),ct=function(e){return{type:e}},st=ce.map(ct),ut=Re.map(ct),pt=V.map(ct),dt=q.map((function(e){var t=Object(c.a)(e,1)[0];return{type:W(t)}})),mt=K.map((function(e){return{type:Z(e)}})),bt=[{name:"Required",colour:"#A5995B",blocks:[{type:"board_setup"}]},{name:"Pins",colour:y.PIN,blocks:dt},{name:"LED",colour:y.LED,blocks:[{type:"set_led"},{type:"get_led"},{type:"led_on_off"}]},{name:"Piezo",colour:y.PIEZO,blocks:Object(b.a)(ut)},{name:"Button",colour:y.BUTTON,blocks:Object(b.a)(pt)},{name:"PCF9581 (ADC)",colour:y.PCF8591,blocks:[{type:"set_PCF8591"},{type:"get_PCF8591"},{type:"use_PCF8591"}].concat(Object(b.a)(mt))},{name:"Sensor",colour:y.SENSOR,blocks:Object(b.a)(st)},{name:"Variables",custom:"VARIABLE",colour:"#a55b80"},{name:"Logic",colour:"#5C81A6",blocks:[{type:"controls_if"},{type:"logic_compare"},{type:"logic_operation"},{type:"logic_negate"},{type:"logic_boolean"},{type:"logic_null"},{type:"logic_ternary"}]},{name:"Math",colour:"#5B67A5",blocks:[{type:"math_number"},{type:"math_arithmetic"},{type:"math_single"},{type:"math_trig"},{type:"math_constant"},{type:"math_number_property"},{type:"math_round"},{type:"math_on_list"},{type:"math_modulo"},{type:"math_constrain"},{type:"math_random_int"},{type:"math_random_float"}]},{name:"Text",colour:"#5ba58c",blocks:[{type:"text"},{type:"text_print"},{type:"text_join"},{type:"text_append"},{type:"text_length"},{type:"text_isEmpty"},{type:"text_indexOf"},{type:"text_charAt"},{type:"text_getSubstring"},{type:"text_changeCase"},{type:"text_trim"}]},{name:"Loops",colour:"#5ba55b",blocks:[{type:"controls_repeat_ext"},{type:"controls_whileUntil"},{type:"controls_for"},{type:"controls_forEach"},{type:"controls_flow_statements"}]},{name:"Lists",colour:"#745ba5",blocks:[{type:"lists_create_with"},{type:"lists_repeat"},{type:"lists_length"},{type:"lists_isEmpty"},{type:"lists_indexOf"},{type:"lists_getIndex"},{type:"lists_setIndex"},{type:"lists_getSublist"},{type:"lists_split"},{type:"lists_sort"}]}],ht=n(121),ft=n.n(ht),gt=n(122),vt=n.n(gt),jt=function(e,t,n,a,o){n.current=e,!t.current&&e&&(console.group("workspaceDidChangeInner.initialization"),console.log("Initializing Workspace"),console.groupEnd());var i=d.a.Xml.domToText(d.a.Xml.workspaceToDom(e)),r=d.a.JavaScript.workspaceToCode(e),l="\n      const { RaspiIO } = require('raspi-io');\n      const five = require(\"johnny-five\");\n      const board = new five.Board({\n        io: new RaspiIO()\n      });\n    \n      ".concat(r).replaceAll("window.alert","console.log"),c=l;try{c=ft.a.format(l,{parser:"babel",plugins:[vt.a]})}catch(s){console.group("Prettier Error"),console.error(s),console.groupEnd()}a===i&&t.current||(console.group("workspaceDidChangerInner.xml changed"),console.log("setting state"),console.groupEnd(),o({code:c,xml:i})),t.current=!0},Ot=q.reduce((function(e,t){var n=Object(c.a)(t,1)[0],a=W(n);return Object(s.a)(Object(s.a)({},e),{},Object(h.a)({},a,1))}),{}),_t=K.reduce((function(e,t){var n=Z(t);return Object(s.a)(Object(s.a)({},e),{},Object(h.a)({},n,1))}),{}),yt=Object(s.a)(Object(s.a)({},Ot),_t),Ct=function(e){console.group("xml error"),console.error(e),console.groupEnd()},xt=Object(it.a)((function(e){return{root:{"& > *":{margin:e.spacing(1)}}}})),St=function(e){var t=e.toolboxState,n=e.handleToolboxChange;console.group("BlocklyToolbox");var i=t.xml,r=Object(o.useRef)(),l=Object(o.useRef)(!1);console.log({workspaceRef:r});var c=function(e){r.current&&d.a.Variables.createVariableButtonHandler(r.current,null,e)},s=xt();return console.groupEnd(),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:s.root,children:[Object(a.jsx)(ot.a,{variant:"outlined",color:"primary",size:"small",onClick:function(){return c(f)},children:"Create LED"}),Object(a.jsx)(ot.a,{variant:"outlined",color:"primary",size:"small",onClick:function(){return c(g)},children:"Create Button"}),Object(a.jsx)(ot.a,{variant:"outlined",color:"primary",size:"small",onClick:function(){return c(j)},children:"Create PCF8591"}),Object(a.jsx)(ot.a,{variant:"outlined",color:"primary",size:"small",onClick:function(){return c(O)},children:"Create Sensor"}),Object(a.jsx)(ot.a,{variant:"outlined",color:"primary",size:"small",onClick:function(){return c(_)},children:"Create Piezo"})]}),Object(a.jsx)(lt.a,{ref:r,toolboxCategories:bt,initialXml:i,wrapperDivClassName:"fill-height",workspaceConfiguration:{grid:{spacing:20,length:3,colour:"#ccc",snap:!0},maxInstances:yt},workspaceDidChange:function(e){return jt(e,l,r,i,n)},onImportXmlError:Ct,processToolboxCategory:function(e){return console.group("BlocklyToolbox.processToolboxCategory"),console.log({toolboxCategory:e}),console.groupEnd(),e}})]})},It=n(6),Ft=n(125),Nt=n.n(Ft),Tt=n(126),Et=n.n(Tt),Pt=n(127),kt=n.n(Pt),Dt=n(238),At=n(239),wt=n(240),Mt=n(256),Bt=n(124),Vt=n.n(Bt),Jt="".concat(window.location.hostname,":8080"),Rt=Vt.a.connect(Jt,{reconnect:!0}),Gt=i.a.createContext(),Lt=function(e){var t=e.onClose,n=e.open,o=Object(u.a)(e,["onClose","open"]);return Object(a.jsxs)(Mt.a,Object(s.a)(Object(s.a)({disableBackdropClick:!0,disableEscapeKeyDown:!0,maxWidth:"xs","aria-labelledby":"confirmation-dialog-title",open:n},o),{},{children:[Object(a.jsx)(Dt.a,{id:"confirmation-dialog-title",children:"Power Off?"}),Object(a.jsx)(At.a,{dividers:!0,children:"Are you sure you want to power off?"}),Object(a.jsxs)(wt.a,{children:[Object(a.jsx)(ot.a,{autoFocus:!0,onClick:function(){t(!1)},color:"primary",children:"No"}),Object(a.jsx)(ot.a,{onClick:function(){t(!0)},color:"primary",children:"yes"})]})]}))},Ut=Object(It.a)((function(e){return{root:{color:e.palette.getContrastText(e.palette.success.main),backgroundColor:e.palette.success.main,"&:hover":{backgroundColor:e.palette.success.dark}}}}))(ot.a),Ht=function(e){var t=e.isProjectRunning,n=e.projectName,i=e.projectCode;console.group("Terminal");var r=Object(o.useState)(""),l=Object(c.a)(r,2),s=l[0],u=l[1],p=Object(o.useState)(""),d=Object(c.a)(p,2),m=d[0],b=d[1],h=Object(o.useRef)(null),f=Object(o.useState)(!1),g=Object(c.a)(f,2),v=g[0],j=g[1],O=Object(o.useContext)(Gt);Object(o.useEffect)((function(){!function(){var e;null===(e=h.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}()}),[s]),Object(o.useEffect)((function(){O.on("message",(function(e){console.group("on message");var t=String.fromCharCode.apply(null,new Uint8Array(e));console.log({buf:t}),u((function(e){return"".concat(e,'<p class="terminal">').concat(t,"</p>")})),console.groupEnd()})),O.on("exit",(function(e){console.group("on exit"),console.log({data:e}),console.groupEnd(),u((function(t){return"".concat(t,'<p class="terminal">').concat(e,"</p>")}))}))}),[O]);var _=Object(it.a)((function(e){return{buttonBar:{"& > *":{margin:e.spacing(1)},width:"100%",position:"fixed"},terminalContainer:{paddingTop:"46px"},shutdown:{float:"right"}}}))();return console.groupEnd(),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:_.buttonBar,children:[Object(a.jsx)(Ut,{variant:"contained",size:"small",startIcon:Object(a.jsx)(Nt.a,{}),disabled:t||null==n||""===i,onClick:function(){console.group("handleRun"),console.log("emitting"),O.emit("copyProject",{projectCode:i}),setTimeout((function(){O.emit("message","sudo node /home/pi/Development/johnny-five/index.js"),O.emit("projectStarted")}),1e3),console.groupEnd()},children:"Play"}),Object(a.jsx)(ot.a,{variant:"contained",color:"secondary",size:"small",startIcon:Object(a.jsx)(Et.a,{}),disabled:!t,onClick:function(){console.group("handleStop"),console.log("emitting");O.emit("message",".exit"),setTimeout((function(){O.emit("stopProject")}),500),console.groupEnd()},children:"Stop"}),Object(a.jsx)(ot.a,{variant:"contained",color:"secondary",size:"small",className:_.shutdown,startIcon:Object(a.jsx)(kt.a,{}),disabled:t,onClick:function(){return j(!0)},children:"Turn off"}),Object(a.jsx)(Lt,{id:"power-off-dialog",keepMounted:!0,open:v,onClose:function(e){console.group("handleClose"),j(!1),e&&(console.log("emitting powerOff"),O.emit("powerOff")),console.groupEnd()}})]}),Object(a.jsxs)("div",{className:"terminal ".concat(_.terminalContainer),children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:"terminal",dangerouslySetInnerHTML:{__html:s}}),Object(a.jsx)("div",{ref:h})]}),Object(a.jsxs)("form",{className:"terminal",onSubmit:function(e){console.group("handleSubmit"),console.log({value:m}),console.log("emitting"),O.emit("message",m),b(""),e.preventDefault(),console.groupEnd()},children:[">"," ",Object(a.jsx)("input",{className:"terminal",value:m,onChange:function(e){return b(e.target.value)}})]})]})]})},Yt=n(242),zt=n(249),Wt=n(250),qt=n(253),Zt=n(248),Kt=n(243),Xt=n(257),Qt=n(244),$t=n(245),en=n(128),tn=n.n(en),nn=n(246),an=n(247),on=n(129),rn=n.n(on),ln=n(130),cn=n.n(ln),sn=function(e){var t=e.onClose,n=e.open,o=e.file,i=Object(u.a)(e,["onClose","open","file"]);return Object(a.jsxs)(Mt.a,Object(s.a)(Object(s.a)({disableBackdropClick:!0,disableEscapeKeyDown:!0,maxWidth:"xs","aria-labelledby":"confirmation-dialog-title",open:n},i),{},{children:[Object(a.jsx)(Dt.a,{id:"confirmation-dialog-title",children:"Delete File?"}),Object(a.jsxs)(At.a,{dividers:!0,children:["Are you sure you want to delete ",o,"?"]}),Object(a.jsxs)(wt.a,{children:[Object(a.jsx)(ot.a,{autoFocus:!0,onClick:function(){t(!1)},color:"primary",children:"Cancel"}),Object(a.jsx)(ot.a,{onClick:function(){t(!0)},color:"secondary",children:"Delete"})]})]}))},un=n(241),pn=function(e){var t=e.onClose,n=e.open,i=Object(u.a)(e,["onClose","open"]),r=Object(o.useState)(""),l=Object(c.a)(r,2),p=l[0],d=l[1];return Object(a.jsxs)(Mt.a,Object(s.a)(Object(s.a)({disableBackdropClick:!0,disableEscapeKeyDown:!0,maxWidth:"xs","aria-labelledby":"confirmation-dialog-title",open:n},i),{},{children:[Object(a.jsx)(Dt.a,{id:"confirmation-dialog-title",children:"Delete File?"}),Object(a.jsxs)(At.a,{dividers:!0,children:[Object(a.jsx)(un.a,{children:"Enter the new project name to copy to"}),Object(a.jsx)(qt.a,{autoFocus:!0,margin:"dense",id:"name",label:"New Project Name",type:"string",value:p,onChange:function(e){d(e.target.value)},fullWidth:!0})]}),Object(a.jsxs)(wt.a,{children:[Object(a.jsx)(ot.a,{autoFocus:!0,onClick:function(){t(!1,p),d("")},color:"primary",children:"Cancel"}),Object(a.jsx)(ot.a,{onClick:function(){t(!0,p),d("")},color:"secondary",disabled:""===p,children:"Copy"})]})]}))},dn=function(e){var t=e.selectedIndex,n=e.file,i=e.index,r=e.handleListItemClick,l=e.handleDelete,s=e.handleCopy;console.group("ProjectListItem");var u=Object(o.useState)(!1),p=Object(c.a)(u,2),d=p[0],m=p[1],b=Object(o.useState)(!1),h=Object(c.a)(b,2),f=h[0],g=h[1],v=Object(o.useCallback)((function(e){console.group("handleConfirmDeleteDialogClose"),m(!1),e&&l(n),console.groupEnd()}),[n,l]),j=Object(o.useCallback)((function(e,t){console.group("handleCopyDialogClose"),g(!1),e&&s(n,"".concat(t,".xml")),console.groupEnd()}),[n,s]);return console.groupEnd(),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)(Kt.a,{button:!0,selected:t===i,onClick:function(e){return r(e,n)},children:[Object(a.jsx)(Qt.a,{children:Object(a.jsx)(Xt.a,{children:Object(a.jsx)(tn.a,{})})}),Object(a.jsx)($t.a,{primary:n}),Object(a.jsxs)(nn.a,{children:[Object(a.jsx)(an.a,{edge:"end","aria-label":"delete",onClick:function(){return m(!0)},children:Object(a.jsx)(rn.a,{})}),Object(a.jsx)(an.a,{edge:"end","aria-label":"copy",onClick:function(){return g(!0)},children:Object(a.jsx)(cn.a,{})})]})]}),Object(a.jsx)(sn,{keepMounted:!0,open:d,file:n,onClose:v}),Object(a.jsx)(pn,{keepMounted:!0,open:f,onClose:j})]})},mn=Object(it.a)((function(e){return{listRoot:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper,marginLeft:"auto",marginRight:"auto"},root:{flexGrow:1,margin:e.spacing(1)},formRoot:{"& > *":{margin:e.spacing(1),width:"25ch"}}}})),bn=function(e){var t=e.handleProjectNameSelection;console.group("ProjectManager");var n=Object(o.useContext)(Gt),r=Object(o.useState)(null),l=Object(c.a)(r,2),s=l[0],u=l[1],p=Object(o.useState)(""),d=Object(c.a)(p,2),m=d[0],b=d[1],h=Object(o.useCallback)((function(e){console.group("handleDelete"),console.log("emitting deleteFile"),n.emit("deleteFile",{fileName:e}),console.groupEnd()}),[n]),f=Object(o.useCallback)((function(e,t){console.group("handleCopy"),console.log("emitting handleCopy"),n.emit("copyFile",{fileName:e,newFileName:t}),console.groupEnd()}),[n]),g=mn(),v=i.a.useState(null),j=Object(c.a)(v,2),O=j[0],_=j[1],y=Object(o.useCallback)((function(e,n){console.group("ProjectManager.handleListItemClick"),console.log({file:n}),console.groupEnd(),t(n),_(null)}),[t]),C=Object(o.useCallback)((function(e){b(e.target.value)}),[]);Object(o.useEffect)((function(){console.log("emit getFiles"),n.emit("getFiles"),n.on("files",(function(e){console.group("ProjectManager.on files"),console.log({data:e}),console.groupEnd(),u(e)}))}),[n]);var x=null;return null!==s&&(x=s.map((function(e,t){return Object(a.jsx)(dn,{file:e,index:t,selectedIndex:O,handleDelete:h,handleCopy:f,handleListItemClick:y},e)}))),console.groupEnd(),Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("div",{className:g.root,children:Object(a.jsxs)(Zt.a,{container:!0,spacing:3,children:[Object(a.jsx)(Zt.a,{item:!0,xs:6,children:Object(a.jsx)("div",{className:g.listRoot,children:null===x?Object(a.jsx)(zt.a,{}):Object(a.jsx)(Yt.a,{component:"nav","aria-label":"project files",subheader:Object(a.jsx)(Wt.a,{component:"div",id:"nested-list-subheader",children:"Saved Projects"}),children:x})})}),Object(a.jsx)(Zt.a,{item:!0,xs:6,children:Object(a.jsxs)("form",{className:g.formRoot,noValidate:!0,autoComplete:"off",children:[Object(a.jsx)(qt.a,{id:"standard-basic",label:"New Project Name",value:m,onChange:C}),Object(a.jsx)(ot.a,{variant:"contained",color:"primary",disabled:0===m.trim().length||null===x,onClick:function(){var e="".concat(m.trim(),".xml");t(e),b("")},children:"Create New Project"})]})})]})})})},hn=function(e){var t=e.length;return t>0?e[t-1]:null};function fn(e){var t=e.children,n=e.value,o=e.index,i=Object(u.a)(e,["children","value","index"]);return Object(a.jsx)("div",Object(s.a)(Object(s.a)({role:"tabpanel",hidden:n!==o,id:"simple-tabpanel-".concat(o),"aria-labelledby":"simple-tab-".concat(o)},i),{},{children:t}))}(function(e){var t=[],n=console.group;console.group=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;t.push(a),e.includes(a)||n(a)};var a=console.groupEnd;console.groupEnd=function(){var n=t.pop();e.includes(n)||a()};var o=console.log;console.log=function(){var n=hn(t);null==n||e.includes(n)||o.apply(void 0,arguments)}})(["createGetSensorGenerators","sensor.onChange","App","ProjectManager","ProjectListItem","Terminal","ProjectManager.on files","ProjectManager.handleListItemClick","App.getFile Effect","App.on file","BlocklyToolbox.processToolboxCategory","workspaceDidChangeInner.initialization","workspaceDidChangerInner.xml changed","createGetSensorGenerators.hasSurroundedAncestor","BlocklyToolbox"]);var gn='<xml xmlns="https://developers.google.com/blockly/xml"><block type="board_setup" id="{`$}^q8GM8vjCjK?)f5u" x="90" y="30"></block></xml>',vn=function(){console.group("App");var e=Object(o.useState)({code:"",xml:gn}),t=Object(c.a)(e,2),n=t[0],i=t[1],r=Object(o.useState)(0),l=Object(c.a)(r,2),s=l[0],u=l[1],p=Object(o.useState)(null),d=Object(c.a)(p,2),m=d[0],b=d[1],h=Object(o.useState)(!1),f=Object(c.a)(h,2),g=f[0],v=f[1],j=Object(o.useCallback)((function(e){b(e)}),[]),O=Object(o.useCallback)((function(e){var t=e.xml,n=e.code;i({xml:t,code:n}),null!==m&&Rt.emit("saveFile",{contents:t,fileName:m})}),[m]);return Object(o.useEffect)((function(){null!==m&&(console.group("App.getFile Effect"),console.log({projectName:m}),console.groupEnd(),Rt.emit("getFile",{fileName:m}))}),[m]),Object(o.useEffect)((function(){Rt.on("connect",(function(){console.log("Client has connected to the server!")})),Rt.on("file",(function(e){if(console.group("App.on file"),""===e)console.log("blank file"),i({code:"",xml:gn});else{var t=String.fromCharCode.apply(null,new Uint8Array(e));console.log({buf:t}),i({code:"",xml:t})}u(1),console.groupEnd()})),Rt.on("projectStatus",(function(e){console.group("on projectStatus"),console.log({status:e}),v(e),console.groupEnd()}))}),[]),console.groupEnd(),Object(a.jsxs)(Gt.Provider,{value:Rt,children:[Object(a.jsx)(tt.a,{position:"static",children:Object(a.jsxs)(nt.a,{value:s,onChange:function(e,t){u(t)},"aria-label":"Blockly Tabs",children:[Object(a.jsx)(at.a,{label:"Projects",disabled:g}),Object(a.jsx)(at.a,{label:"Blockly",disabled:null===m||g}),Object(a.jsx)(at.a,{label:"Code",disabled:null===m||g}),Object(a.jsx)(at.a,{label:"XML",disabled:null===m||g}),Object(a.jsx)(at.a,{label:"Run"})]})}),Object(a.jsx)(fn,{value:s,index:0,children:Object(a.jsx)(bn,{handleProjectNameSelection:j})}),Object(a.jsx)(fn,{value:s,index:1,children:1===s&&Object(a.jsx)(St,{toolboxState:n,handleToolboxChange:O})}),Object(a.jsx)(fn,{value:s,index:2,children:Object(a.jsx)("pre",{children:n.code})}),Object(a.jsx)(fn,{value:s,index:3,children:Object(a.jsx)("pre",{id:"generated-xml",children:n.xml})}),Object(a.jsx)(fn,{value:s,index:4,children:Object(a.jsx)(Ht,{isProjectRunning:g,projectCode:n.code,projectName:m})})]})};l.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(vn,{})}),document.getElementById("root"))}},[[191,1,2]]]);
//# sourceMappingURL=main.f9168ad2.chunk.js.map
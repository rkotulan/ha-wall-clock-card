/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${i}--\x3e`,s=new RegExp(`${i}|${o}`),a="$lit$";class n{constructor(e,t){this.parts=[],this.element=t;const o=[],n=[],l=document.createTreeWalker(t.content,133,null,!1);let h=0,g=-1,u=0;const{strings:p,values:{length:m}}=e;for(;u<m;){const e=l.nextNode();if(null!==e){if(g++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let o=0;for(let e=0;e<i;e++)r(t[e].name,a)&&o++;for(;o-- >0;){const t=p[u],i=d.exec(t)[2],o=i.toLowerCase()+a,n=e.getAttribute(o);e.removeAttribute(o);const r=n.split(s);this.parts.push({type:"attribute",index:g,name:i,strings:r}),u+=r.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,n=t.split(s),l=n.length-1;for(let t=0;t<l;t++){let o,s=n[t];if(""===s)o=c();else{const e=d.exec(s);null!==e&&r(e[2],a)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),o=document.createTextNode(s)}i.insertBefore(o,e),this.parts.push({type:"node",index:++g})}""===n[l]?(i.insertBefore(c(),e),o.push(e)):e.data=n[l],u+=l}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&g!==h||(g++,t.insertBefore(c(),e)),h=g,this.parts.push({type:"node",index:g}),null===e.nextSibling?e.data="":(o.push(e),g--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=n.pop()}for(const e of o)e.parentNode.removeChild(e)}}const r=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:i},parts:o}=e,s=document.createTreeWalker(i,133,null,!1);let a=u(o),n=o[a],r=-1,l=0;const c=[];let d=null;for(;s.nextNode();){r++;const e=s.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==n&&n.index===r;)n.index=null!==d?-1:n.index-l,a=u(o,a),n=o[a]}c.forEach(e=>e.parentNode.removeChild(e))}const g=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},u=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1},p=new WeakMap,m=e=>"function"==typeof e&&p.has(e),f={},v={};class w{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],o=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let a,n=0,r=0,c=s.nextNode();for(;n<o.length;)if(a=o[n],l(a)){for(;r<a.index;)r++,"TEMPLATE"===c.nodeName&&(i.push(c),s.currentNode=c.content),null===(c=s.nextNode())&&(s.currentNode=i.pop(),c=s.nextNode());if("node"===a.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,a.name,a.strings,this.options));n++}else this.__parts.push(void 0),n++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),_=` ${i} `;class b{constructor(e,t,i,o){this.strings=e,this.values=t,this.type=i,this.processor=o}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let n=0;n<e;n++){const e=this.strings[n],r=e.lastIndexOf("\x3c!--");s=(r>-1||s)&&-1===e.indexOf("--\x3e",r+1);const l=d.exec(e);t+=null===l?e+(s?_:o):e.substr(0,l.index)+l[1]+l[2]+a+l[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==y&&(t=y.createHTML(t)),e.innerHTML=t,e}}const S=e=>null===e||!("object"==typeof e||"function"==typeof e),k=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new $(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!k(e))return e}let o="";for(let s=0;s<t;s++){o+=e[s];const t=i[s];if(void 0!==t){const e=t.value;if(S(e)||!k(e))o+="string"==typeof e?e:String(e);else for(const t of e)o+="string"==typeof t?t:String(t)}}return o+=e[t],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||S(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class I{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):k(e)?this.__commitIterable(e):e===v?(this.value=v,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof w&&this.value.template===t)this.value.update(e.values);else{const i=new w(t,e.processor,this.options),o=i._clone();i.update(e.values),this.__commitNode(o),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,o=0;for(const s of e)i=t[o],void 0===i&&(i=new I(this.options),t.push(i),0===o?i.appendIntoPart(this):i.insertAfterPart(t[o-1])),i.setValue(s),i.commit(),o++;o<t.length&&(t.length=o,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class C{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class N extends x{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new O(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class O extends ${}let P=!1;(()=>{try{const e={get capture(){return P=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class D{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(P?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function F(e){let t=T.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},T.set(e.type,t));let o=t.stringsArray.get(e.strings);if(void 0!==o)return o;const s=e.strings.join(i);return o=t.keyString.get(s),void 0===o&&(o=new n(e,e.getTemplateElement()),t.keyString.set(s,o)),t.stringsArray.set(e.strings,o),o}const T=new Map,U=new WeakMap,E=new class{handleAttributeExpressions(e,t,i,o){const s=t[0];return"."===s?new N(e,t.slice(1),i).parts:"@"===s?[new D(e,t.slice(1),o.eventContext)]:"?"===s?[new C(e,t.slice(1),i)]:new x(e,t,i).parts}handleTextExpression(e){return new I(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const M=(e,...t)=>new b(e,t,"html",E),L=(e,t)=>`${e}--${t}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const z=e=>t=>{const o=L(t.type,e);let s=T.get(o);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},T.set(o,s));let a=s.stringsArray.get(t.strings);if(void 0!==a)return a;const r=t.strings.join(i);if(a=s.keyString.get(r),void 0===a){const i=t.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(i,e),a=new n(t,i),s.keyString.set(r,a)}return s.stringsArray.set(t.strings,a),a},J=["html","svg"],W=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const j={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},V=(e,t)=>t!==e&&(t==t||e==e),B={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:V},H="finalized";class q extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const o=this._attributeNameForProperty(i,t);void 0!==o&&(this._attributeToPropertyMap.set(o,i),e.push(o))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=B){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const s=this[e];this[t]=o,this.requestUpdateInternal(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||B}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(H)||e.finalize(),this[H]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=V){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,o=t.converter||j,s="function"==typeof o?o:o.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,o=t.converter;return(o&&o.toAttribute||j.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=B){const o=this.constructor,s=o._attributeNameForProperty(e,i);if(void 0!==s){const e=o._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,o=i._attributeToPropertyMap.get(e);if(void 0!==o){const e=i.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let o=!0;if(void 0!==e){const s=this.constructor;i=i||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}q[H]=!0;const K=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:o}=t;return{kind:i,elements:o,finisher(t){window.customElements.define(e,t)}}})(e,t),G=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function Z(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):G(e,t)}const Y=Element.prototype;Y.msMatchesSelector||Y.webkitMatchesSelector;const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class ee{constructor(e,t){if(t!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const te=(e,...t)=>{const i=t.reduce((t,i,o)=>t+(e=>{if(e instanceof ee)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[o+1],e[0]);return new ee(i,X)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const ie={};class oe extends q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),o=[];i.forEach(e=>o.unshift(e)),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!Q){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ee(String(t),X)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ie&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ie}}oe.finalized=!0,oe.render=(e,i,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw new Error("The `scopeName` option is required.");const s=o.scopeName,a=U.has(i),n=R&&11===i.nodeType&&!!i.host,r=n&&!W.has(s),l=r?document.createDocumentFragment():i;if(((e,i,o)=>{let s=U.get(i);void 0===s&&(t(i,i.firstChild),U.set(i,s=new I(Object.assign({templateFactory:F},o))),s.appendInto(i)),s.setValue(e),s.commit()})(e,l,Object.assign({templateFactory:z(s)},o)),r){const e=U.get(l);U.delete(l);((e,t,i)=>{W.add(e);const o=i?i.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:a}=s;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(o,e);const n=document.createElement("style");for(let e=0;e<a;e++){const t=s[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{J.forEach(t=>{const i=T.get(L(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),h(e,i)})})})(e);const r=o.content;i?function(e,t,i=null){const{element:{content:o},parts:s}=e;if(null==i)return void o.appendChild(t);const a=document.createTreeWalker(o,133,null,!1);let n=u(s),r=0,l=-1;for(;a.nextNode();)for(l++,a.currentNode===i&&(r=g(t),i.parentNode.insertBefore(t,i));-1!==n&&s[n].index===l;){if(r>0){for(;-1!==n;)s[n].index+=r,n=u(s,n);return}n=u(s,n)}}(i,n,r.firstChild):r.insertBefore(n,r.firstChild),window.ShadyCSS.prepareTemplateStyles(o,e);const l=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){r.insertBefore(n,r.firstChild);const e=new Set;e.add(n),h(i,e)}})(s,l,e.value instanceof w?e.value.template:void 0),t(i,i.firstChild),i.appendChild(l),U.set(i,e)}!a&&n&&window.ShadyCSS.styleElement(i.host)},oe.shadowRootOptions={mode:"open"};class se{static getInstance(){return se.instance||(se.instance=new se),se.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&console.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}registerAll(e){e.forEach(e=>this.register(e))}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}var ae,ne;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(ae||(ae={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(ne||(ne={}));const re=[ne.All,ne.ClearSky,ne.Clouds,ne.Rain,ne.Snow,ne.Mist],le=[ae.Unspecified,ae.SunriseSunset,ae.Day,ae.Night];function ce(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?ae.SunriseSunset:e>=9&&e<17?ae.Day:e>=21||e<5?ae.Night:ae.Unspecified}function de(e,t){if(!e)return;const i=e.toLowerCase();for(const e of t)if(i.includes(e.toLowerCase().replace(" ","-")))return e}var he;!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR",e[e.NONE=4]="NONE"}(he||(he={}));const ge={level:he.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let ue={...ge};const pe=[];function me(e,t,i,...o){var s;if(e<ue.level)return;const a=function(e,t,i){const{prefix:o,enableTimestamps:s,enableSourceTracking:a}=ue;let n="";return s&&(n+=`[${(new Date).toISOString()}] `),n+=`[${he[e]}] `,o&&(n+=`[${o}] `),t&&a&&(n+=`[${t}] `),n+=i,n}(e,t,i);if(ue.logToConsole)switch(e){case he.DEBUG:console.debug(a,...o);break;case he.INFO:console.log(a,...o);break;case he.WARN:console.warn(a,...o);break;case he.ERROR:console.error(a,...o)}if(ue.logToStorage){let e=a;if(o.length>0)try{e+=" "+o.map(e=>"object"==typeof e?JSON.stringify(e):String(e)).join(" ")}catch(t){e+=" [Arguments could not be stringified]"}pe.push(e);const t=null!==(s=ue.maxStoredLogs)&&void 0!==s?s:100;pe.length>t&&pe.splice(0,pe.length-t)}}function fe(e){return{debug:(t,...i)=>me(he.DEBUG,e,t,...i),info:(t,...i)=>me(he.INFO,e,t,...i),warn:(t,...i)=>me(he.WARN,e,t,...i),error:(t,...i)=>me(he.ERROR,e,t,...i),withSource:e=>fe(e)}}fe("wall-clock");class ve{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0}getLogger(){return fe(`${this.id}-source`)}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}async fetchImagesAsync(e,t,i){return this.getLogger().info(`Fetching images with weather: ${t}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(e,t,i)}async GetNextImageUrlAsync(e,t,i){var o;this.getLogger().info(`GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(this.getLogger().info("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.lastWeather=t,this.lastTimeOfDay=i);const s=`${t}_${i}`;if(!this.imageUrlCache.has(s)||0===(null===(o=this.imageUrlCache.get(s))||void 0===o?void 0:o.length)){const o=[...await this.fetchImagesAsync(e,t,i)];this.shuffleArray(o),this.imageUrlCache.set(s,o),this.getLogger().info(`Cached ${o.length} images for weather: ${t}, timeOfDay: ${i}`)}const a=this.imageUrlCache.get(s)||[];if(0===a.length)return this.getLogger().warn(`No images available for weather: ${t}, timeOfDay: ${i}`),"";const n=a[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%a.length,this.getLogger().info(`Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${n}`),n}filterImagesByWeatherAndTime(e,t,i){if(this.getLogger().info(`Current time of day: ${i}`),this.getLogger().info(`Current weather condition: ${t}`),0===e.length)return[];let o=[];return o=e.filter(e=>(e.weather===t||e.weather===ne.All)&&e.timeOfDay===i),0===o.length&&(o=e.filter(e=>(e.weather===t||e.weather===ne.All)&&e.timeOfDay===ae.Unspecified)),0===o.length&&(o=e.filter(e=>e.weather===ne.All&&e.timeOfDay===i)),0===o.length&&(o=e.filter(e=>e.weather===ne.All&&e.timeOfDay===ae.Unspecified)),o.length>0?(this.getLogger().info(`Found ${o.length} images matching current conditions`),o.map(e=>e.url)):(this.getLogger().info("No matching images found, returning all images"),e.map(e=>e.url))}convertUrlsToBackgroundImages(e){return this.getLogger().info(`Converting ${e.length} URLs to BackgroundImage objects`),e.map(e=>({url:e,weather:de(e,re)||ne.All,timeOfDay:de(e,le)||ae.Unspecified}))}}const we=new class extends ve{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=fe("local-source")}async fetchImagesInternalAsync(e,t,i){return e.backgroundImages&&e.backgroundImages.length>0?(this.logger.info(`Using backgroundImages structure with ${e.backgroundImages.length} images`),this.logger.info(`First image URL: ${e.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(e.backgroundImages,t,i)):(this.logger.info("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},ye=new class extends ve{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=fe("picsum-source")}async fetchImagesInternalAsync(e,t,i){const o=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.info(`Generated Picsum image URL: ${o}`),[o]}getDefaultConfig(){return{}}},_e=new class extends ve{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=fe("unsplash-source"),this.collections={nature:["3330448","4378039","1319040","3694365"],water:["3694365","1053828","2411979","981639"],architecture:["3348849","4468022","3348849","922312"],city:["3470372","1079798","2563","1110498"],landscape:["4466935","3694365","827743","2422483"],animals:["3106804","1242150","139386","162213"],food:["3687999","2059134","2489501","2252258"],travel:["3349809","3356576","2476111","1901880"],people:["3641869","4468022","181581","139941"],technology:["4587649","8761738","2059134","1263277"],abstract:["4587649","8761738","2059134","1263277"],space:["2022043","2159937","2506084","531563"],interior:["1118894","4466935","3330452","4468022"],flowers:["2411979","827743","1079798","3694365"],dark:["4466935","3694365","827743","2422483"],light:["4466935","3694365","827743","2422483"],minimal:["4466935","3694365","827743","2422483"],colorful:["4466935","3694365","827743","2422483"],black:["4466935","3694365","827743","2422483"],white:["4466935","3694365","827743","2422483"],red:["4466935","3694365","827743","2422483"],blue:["4466935","3694365","827743","2422483"],green:["4466935","3694365","827743","2422483"],yellow:["4466935","3694365","827743","2422483"],orange:["4466935","3694365","827743","2422483"],purple:["4466935","3694365","827743","2422483"],pink:["4466935","3694365","827743","2422483"],brown:["4466935","3694365","827743","2422483"],gray:["4466935","3694365","827743","2422483"],"black-and-white":["4466935","3694365","827743","2422483"]},this.defaultCollections=["3694365","1053828","4466935","3348849"]}async fetchImagesInternalAsync(e,t,i){const o=e.count||5;let s=e.category||"";const a=e.apiKey||"",n=[];if(this.logger.info(`Current weather: ${t}, time of day: ${i}`),this.logger.info(`Using category with weather and time: ${s}`),a)try{return this.logger.info("Using official Unsplash API"),await this.fetchImagesFromApiAsync(a,s,o,t,i,e)}catch(e){this.logger.error("Error fetching images from Unsplash API:",e),this.logger.info("Falling back to direct URL method")}this.logger.info("Using direct URL method for Unsplash images");const r=s.split(",").map(e=>e.trim().toLowerCase());this.logger.info(`Categories for direct URL method: ${r.join(", ")}`);let l=[];r.forEach(e=>{this.collections[e]&&(l=[...l,...this.collections[e]])}),0===l.length?(this.logger.info("No matching collections found, using default collections"),l=this.defaultCollections):this.logger.info(`Using collection IDs: ${l.join(", ")}`);for(let e=0;e<o;e++)try{const t=`https://source.unsplash.com/collection/${l[Math.floor(Math.random()*l.length)]}/1920x1080/?sig=${Date.now()+e}`;this.logger.info(`Generated direct URL (${e+1}/${o}): ${t}`),n.push(t)}catch(t){this.logger.warn(`Failed to generate Unsplash image URL (attempt ${e+1}/${o})`,t)}return n}async fetchImagesFromApiAsync(e,t,i,o,s,a){const n=[],r=(null==a?void 0:a.contentFilter)||"high";let l="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(l=e[0]),e.length>1&&(l+=` ${e.slice(1).join(" ")}`),this.logger.info(`Using categories: ${e.join(", ")}`)}const c=o.toLowerCase();l+=` ${c}`,"sunrise-sunset"===s?l+=" sunrise sunset dawn dusk":"day"===s?l+=" daylight midday day":"night"===s&&(l+=" night dark stars moonlight"),this.logger.info(`Enhanced query with weather data: ${l}`),this.logger.info(`Weather condition: ${c}, Time of day: ${s}`);try{let t="https://api.unsplash.com/photos/random?";const o=new URLSearchParams({client_id:e,count:i.toString(),orientation:"landscape",content_filter:r});l&&o.append("query",l);const s=new URLSearchParams(o);s.delete("client_id"),s.append("client_id","***API_KEY_HIDDEN***"),this.logger.info(`API parameters: ${s.toString()}`),t+=o.toString();const a=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${a}`);const c=await fetch(t);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const d=await c.json();this.logger.info(`API response received with ${Array.isArray(d)?d.length:0} images`),Array.isArray(d)&&d.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";n.push(t)}),this.logger.info(`Fetched ${n.length} images from Unsplash API`)}catch(e){throw this.logger.error("Error fetching from Unsplash API:",e),e}return n}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",useApi:!0,contentFilter:"high"}}getCategories(){return Object.keys(this.collections)}},be=new class extends ve{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=fe("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}async checkEntityAsync(e){try{const t=window.document.querySelector("home-assistant").hass;if(!t)return void this.logger.warn("Could not get Home Assistant instance");const i=t.states[e];if(!i)return void this.logger.warn(`Entity ${e} not found`);this.updateCacheFromEntity(i),this.entityId=e,this.logger.info(`Checked entity ${e}`)}catch(e){this.logger.error("Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)&&t.every(e=>"string"==typeof e)?(this.cachedImages=this.convertUrlsToBackgroundImages(t),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.info(`Updated cache with ${t.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(e,t,i){const o=e.entity;if(!o)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(o);const s=Date.now();if(this.cachedImages.length>0&&s-this.lastFetchTime<this.refreshInterval)return this.logger.info(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t,i);try{const e=window.document.querySelector("home-assistant").hass;if(!e)return this.logger.warn("Could not get Home Assistant instance"),[];const s=e.states[o];return s?(this.updateCacheFromEntity(s),this.filterImagesByWeatherAndTime(this.cachedImages,t,i)):(this.logger.warn(`Sensor ${o} not found`),[])}catch(e){return this.logger.error("Error fetching images from sensor:",e),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Se=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=fe("null-source")}async fetchImagesAsync(e,t,i){return this.logger.info("Returning empty image list"),[]}async GetNextImageUrlAsync(e,t,i){return this.logger.info("Returning empty image URL"),""}getDefaultConfig(){return{}}},ke={local:we,picsum:ye,unsplash:_e,sensor:be};class xe{constructor(){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=fe("background-image-manager")}initialize(e={}){const t=e.imageSourceId||"picsum";if(this.logger.info(`Initializing with image source ID: ${t}`),"none"===t)return this.logger.info("Image source is set to none, skipping initialization"),!1;var i;if(this.imageSourceId=t||"picsum",this.imageSource=(i=this.imageSourceId,ke[i]||Se),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;const o=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...o,...e},this.logger.info(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(e,t){if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${e}, time of day: ${t}`);const i=await this.imageSource.GetNextImageUrlAsync(this.sourceConfig,e,t);return i?(this.logger.info(`Got image URL: ${i}`),i):(this.logger.warn("No image URL returned from source"),"")}catch(e){return this.logger.error("Error getting next image URL:",e),""}}getImageSourceId(){return this.imageSourceId}}se.getInstance().registerAll([ye,we,_e,be]);class $e{static getInstance(){return $e.instance||($e.instance=new $e),$e.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&console.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const Ie=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,i=e.longitude||14.4378,o=e.units||"metric",s=e.language||"cs";try{const a=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${i}&units=${o}&lang=${s}&appid=${e.apiKey}`;console.log("[OpenWeatherMap] "+a);const n=await fetch(a);if(!n.ok)throw new Error(`OpenWeatherMap API error: ${n.statusText}`);const r=await n.json();if(!r.list||!r.list.length)throw new Error("No forecast data available");const l=r.list[0],c=l.weather[0].description,d={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},h=new Map;return r.list.forEach(e=>{var t;const i=new Date(1e3*e.dt).toISOString().split("T")[0];h.has(i)||h.set(i,[]),null===(t=h.get(i))||void 0===t||t.push(e)}),{current:d,daily:Array.from(h.entries()).map(([e,t])=>{const i=t.map(e=>e.main.temp),o=Math.min(...i),s=Math.max(...i),a=t[Math.floor(t.length/2)]||t[0],n=t.filter(e=>void 0!==e.pop).map(e=>e.pop),r=n.length>0?n.reduce((e,t)=>e+t,0)/n.length*100:0;return{date:new Date(e),temperatureMin:o,temperatureMax:s,condition:a.weather[0].description,icon:this.getIconUrl(a.weather[0].icon),precipitation:r,humidity:a.main.humidity,windSpeed:a.wind.speed}})}}catch(e){throw console.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"cs"}}getIconUrl(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){switch(e.toLowerCase()){case"clear":case"clear sky":return ne.ClearSky;case"few clouds":case"scattered clouds":case"broken clouds":case"clouds":return ne.Clouds;case"fog":case"haze":case"dust":case"smoke":case"mist":return ne.Mist;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":return ne.Rain;case"tornado":case"windy":case"all":default:return ne.All;case"snow":return ne.Snow}}},Ce=$e.getInstance();Ce.register(Ie);class Ne{static getInstance(){return Ne.instance||(Ne.instance=new Ne),Ne.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&console.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const Oe=new class{constructor(){this.id="idsjmk",this.name="IDSJMK (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(e,t){try{if(0===t.length)throw new Error("No stops configured");const i={};for(const e of t){const t=String(e.stopId);i[t]||(i[t]=[]),i[t].push(e)}const o=[];for(const t of Object.keys(i)){const s=i[t],a=s.map(e=>e.postId),n=`https://mapa.idsjmk.cz/api/departures?stopid=${t}`,r=await fetch(n,{headers:{"User-Agent":"cz.zolex.iris/6.7.5 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!r.ok)throw new Error(`Failed to fetch transportation data: ${r.status} ${r.statusText}`);const l=await r.json();if(l.Error)throw new Error(`API error: ${l.Error}`);for(const i of a){const a=l.PostList.find(e=>e.PostID===i);if(!a){console.warn(`No platform found with postId ${i} for stopId ${t}`);continue}const n=a.Name,r=s.find(e=>e.postId===i);if(!r)continue;const c=r.name||n,d=e.maxDepartures||2,h=a.Departures.slice(0,Math.min(d,5)).map(e=>({lineId:e.LineId,lineName:e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:c,postId:i}));o.push(...h)}}return{departures:o,loading:!1}}catch(e){return console.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}},Pe=Ne.getInstance();Pe.register(Oe);const De=[{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","mist":"Mist","light_rain":"Light rain"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Ae=Object.fromEntries(De.map(e=>[e.code,e.translations]));let Fe={};function Te(){return De.map(e=>e.code)}function Ue(e){const t=De.find(t=>t.code===e);return(null==t?void 0:t.locale)||"en-US"}function Ee(e,t,i={},o){const s={...i};if(o&&(s.timeZone=o),"hidden"===s.weekday&&(s.weekday=void 0),"hidden"===s.year&&(s.year=void 0),"hidden"===s.month&&(s.month=void 0),"hidden"===s.day&&(s.day=void 0),void 0===s.weekday&&void 0===s.year&&void 0===s.month&&void 0===s.day)return"";const a=Ue(t);if("short"===s.month){const t=new Intl.DateTimeFormat(a,{month:"short",timeZone:o}).format(e),i={...s};delete i.month;let n=e.toLocaleDateString(a,i);return"2-digit"===s.day?(n=n.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${t}`),n.includes(t)||(n=`${n} ${t}`)):n=e.toLocaleDateString(a,s),n}return e.toLocaleDateString(a,s)}var Me,Le,Re;(Re=Me||(Me={})).language="language",Re.system="system",Re.comma_decimal="comma_decimal",Re.decimal_comma="decimal_comma",Re.space_comma="space_comma",Re.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Le||(Le={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var ze=function(e,t,i,o){o=o||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return s.detail=i,e.dispatchEvent(s),s};new Set(["call-service","divider","section","weblink","cast","select"]);var Je=function(e,t,i,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(n=(a<3?s(n):a>3?s(t,i,n):s(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let We=class extends oe{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._timeFormatOptions={hour12:[{value:!0,label:"12-hour"},{value:!1,label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._languageOptions=[],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback(),this._languageOptions=De.map(e=>({value:e.code,label:e.label}))}_getTransportationProviderOptions(){return[...Pe.getAllProviders().map(e=>({value:e.id,label:e.name}))]}setConfig(e){const t=e,i=t.imageSource||"none";let o={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};t.timeFormat&&(o={...o,...t.timeFormat},void 0===t.timeFormat.second&&(o.second=void 0)),this._config={...t,timeFormat:o,dateFormat:t.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:i,imageConfig:t.imageConfig||{},backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",showWeather:void 0!==t.showWeather&&t.showWeather,weatherProvider:t.weatherProvider||"openweathermap",weatherConfig:t.weatherConfig||{},weatherDisplayMode:t.weatherDisplayMode||"both",weatherForecastDays:t.weatherForecastDays||3,transportation:t.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops()}_loadSensors(){var e;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,ze(this,"config-changed",{config:e})}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,i)=>i!==e),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,ze(this,"config-changed",{config:e})}}_sensorChanged(e,t,i){if(this._sensors=this._sensors.map((o,s)=>s===e?{...o,[t]:i}:o),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,ze(this,"config-changed",{config:e})}}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this._config=e,ze(this,"config-changed",{config:e})}}_removeStop(e){if(this._stops=this._stops.filter((t,i)=>i!==e),this._config&&this._config.transportation){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this._config=e,ze(this,"config-changed",{config:e})}}_stopChanged(e,t,i){if(this._stops=this._stops.map((o,s)=>s===e?{...o,[t]:i}:o),this._config&&this._config.transportation){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this._config=e,ze(this,"config-changed",{config:e})}}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:ne.All,timeOfDay:ae.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,i)=>i!==e),this._updateBackgroundImagesConfig()}_updateBackgroundImage(e,t){this._backgroundImages=this._backgroundImages.map((i,o)=>{if(o===e){const e={...i,...t};if(t.url&&e.url){if(e.weather===ne.All){const t=de(e.url,re);t&&(e.weather=t,console.log(`[editor] Auto-detected weather: ${e.weather} from URL: ${e.url}`))}if(e.timeOfDay===ae.Unspecified){const t=de(e.url,le);t&&(e.timeOfDay=t,console.log(`[editor] Auto-detected timeOfDay: ${e.timeOfDay} from URL: ${e.url}`))}}return e}return i}),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this._config){const e=JSON.parse(JSON.stringify(this._config));e.backgroundImages=[...this._backgroundImages],this._config=e,ze(this,"config-changed",{config:e})}}static get styles(){return te`
            .form-container {
                display: flex;
                flex-direction: column;
                padding: 16px;
            }

            .row {
                display: flex;
                margin-bottom: 12px;
                align-items: center;
            }

            .label {
                flex: 0 0 30%;
                font-weight: 500;
            }

            .value {
                flex: 1;
                display: flex;
                align-items: center;
            }


            .section-subheader {
                font-size: 16px;
                font-weight: 500;
                margin: 15px 0 5px 0;
            }

            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
            }

            .sensor-row {
                display: flex;
                margin-bottom: 8px;
                align-items: center;
            }

            .sensor-entity {
                flex: 2;
                margin-right: 8px;
            }

            .sensor-label {
                flex: 1;
                margin-right: 8px;
            }

            .sensor-actions {
                flex: 0 0 40px;
                text-align: center;
            }

            .image-row {
                display: flex;
                margin-bottom: 16px;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
            }

            .image-url {
                flex: 1 1 calc(100% - 60px);
            }

            .image-actions {
                flex: 0 0 40px;
                text-align: center;
            }

            .image-weather {
                flex: 1 1 45%;
            }

            .image-time {
                flex: 1 1 45%;
            }


            .weather-conditions {
                margin-top: 10px;
            }

            .weather-condition {
                border: 1px solid var(--divider-color, #e0e0e0);
                border-radius: 4px;
                padding: 10px;
                margin-bottom: 15px;
            }

            .condition-header {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }

            ha-expansion-panel > .content {
                padding: 12px;
            }

            ha-expansion-panel {
                margin-bottom: 8px;
            }

            .condition-header ha-textfield {
                flex: 1;
            }

            .condition-images {
                margin-left: 15px;
            }

            mwc-button {
                margin-top: 8px;
            }

            ha-switch {
                margin-right: 8px;
            }

            ha-textfield, ha-select {
                width: 100%;
            }
        `}render(){var e,t,i,o,s,a,n,r,l,c,d,h,g,u,p,m,f,v,w,y,_,b,S,k,x;if(!this.hass||!this._config)return M``;const $=Object.keys(this.hass.states).sort();return M`
            <div class="form-container">
                <!-- General Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">General</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Font Color</div>
                            <div class="value">
                                <ha-textfield
                                        label="Font Color (hex, rgb, or rgba)"
                                        .value=${this._config.fontColor||"#FFFFFF"}
                                        @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.fontColor=t.value||"#FFFFFF",this._config=i,ze(this,"config-changed",{config:i})}}
                                ></ha-textfield>
                                <div style="width: 32px; height: 32px; background-color: ${this._config.fontColor||"#FFFFFF"}; border: 1px solid #000; margin-left: 8px;"></div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Language</div>
                            <div class="value">
                                <ha-select
                                        label="Language"
                                        .value=${this._config.language||"cs"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.language=t.value||"cs",this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._languageOptions.map(e=>M`
                                                <mwc-list-item .value=${e.value}>${e.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Log Level</div>
                            <div class="value">
                                <ha-select
                                        label="Log Level"
                                        .value=${this._config.logLevel||"warn"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.logLevel=t.value||"warn",this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    <mwc-list-item value="debug">Debug</mwc-list-item>
                                    <mwc-list-item value="info">Info</mwc-list-item>
                                    <mwc-list-item value="warn">Warning</mwc-list-item>
                                    <mwc-list-item value="error">Error</mwc-list-item>
                                    <mwc-list-item value="none">None</mwc-list-item>
                                </ha-select>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                <!-- Time Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Time Format</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Time Format</div>
                            <div class="value">
                                <ha-select
                                        label="Hour Format"
                                        .value=${(null===(e=this._config.timeFormat)||void 0===e?void 0:e.hour12)?"true":"false"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour12:"true"===t.value},this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.hour12.map(e=>M`
                                                <mwc-list-item .value=${String(e.value)}>${e.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Hour Display</div>
                            <div class="value">
                                <ha-select
                                        label="Hour Display"
                                        .value=${(null===(t=this._config.timeFormat)||void 0===t?void 0:t.hour)||"2-digit"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour:t.value},this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.hour.map(e=>M`
                                                <mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Minute Display</div>
                            <div class="value">
                                <ha-select
                                        label="Minute Display"
                                        .value=${(null===(i=this._config.timeFormat)||void 0===i?void 0:i.minute)||"2-digit"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,minute:t.value},this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.minute.map(e=>M`
                                                <mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Second Display</div>
                            <div class="value">
                                <ha-select
                                        label="Second Display"
                                        .value=${void 0===(null===(o=this._config.timeFormat)||void 0===o?void 0:o.second)?"undefined":null===(s=this._config.timeFormat)||void 0===s?void 0:s.second}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,second:"undefined"===t.value?"hidden":t.value},this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.second.map(e=>M`
                                                <mwc-list-item
                                                        .value=${void 0===e.value?"undefined":e.value}>
                                                    ${e.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                <!-- Date Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Date Format</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Weekday Display</div>
                            <div class="value">
                                <ha-select
                                        label="Weekday Display"
                                        .value=${(null===(a=this._config.dateFormat)||void 0===a?void 0:a.weekday)||"long"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,weekday:"undefined"===t.value?"hidden":t.value},this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.weekday.map(e=>M`
                                                <mwc-list-item
                                                        .value=${void 0===e.value?"undefined":e.value}>
                                                    ${e.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Month Display</div>
                            <div class="value">
                                <ha-select
                                        label="Month Display"
                                        .value=${(null===(n=this._config.dateFormat)||void 0===n?void 0:n.month)||"long"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,month:"undefined"===t.value?"hidden":t.value},this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.month.map(e=>M`
                                                <mwc-list-item
                                                        .value=${void 0===e.value?"undefined":e.value}>
                                                    ${e.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Day Display</div>
                            <div class="value">
                                <ha-select
                                        label="Day Display"
                                        .value=${void 0===(null===(r=this._config.dateFormat)||void 0===r?void 0:r.day)?"undefined":null===(l=this._config.dateFormat)||void 0===l?void 0:l.day}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,day:"undefined"===t.value?"hidden":t.value},this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.day.map(e=>M`
                                                <mwc-list-item
                                                        .value=${void 0===e.value?"undefined":e.value}>
                                                    ${e.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Year Display</div>
                            <div class="value">
                                <ha-select
                                        label="Year Display"
                                        .value=${void 0===(null===(c=this._config.dateFormat)||void 0===c?void 0:c.year)?"undefined":null===(d=this._config.dateFormat)||void 0===d?void 0:d.year}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,year:"undefined"===t.value?"hidden":t.value},this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.year.map(e=>M`
                                                <mwc-list-item
                                                        .value=${void 0===e.value?"undefined":e.value}>
                                                    ${e.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                <!-- Background Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Image Source</div>
                            <div class="value">
                                <ha-select
                                        label="Image Source"
                                        .value=${this._config.imageSource||"none"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageSource=t.value,i.useOnlineImages="none"!==t.value&&"local"!==t.value,this._config=i,ze(this,"config-changed",{config:i})}}
                                >
                                    ${this._imageSourceOptions.map(e=>M`
                                                <mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">Background Opacity</div>
                            <div class="value">
                                <ha-slider
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        pin
                                        .value=${void 0!==this._config.backgroundOpacity?this._config.backgroundOpacity:.5}
                                        @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundOpacity="string"==typeof t.value?parseFloat(t.value):t.value,this._config=i,ze(this,"config-changed",{config:i})}}
                                ></ha-slider>
                                <span>${void 0!==this._config.backgroundOpacity?this._config.backgroundOpacity:.5}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Rotation Interval (seconds)</div>
                            <div class="value">
                                <ha-slider
                                        min="30"
                                        max="300"
                                        step="10"
                                        pin
                                        .value=${this._config.backgroundRotationInterval||90}
                                        @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundRotationInterval="string"==typeof t.value?parseInt(t.value,10):t.value,this._config=i,ze(this,"config-changed",{config:i})}}
                                ></ha-slider>
                                <span>${this._config.backgroundRotationInterval||90} seconds</span>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                ${"local"===this._config.imageSource?M`
                    <!-- Background Images Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Local Background Images</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure local image URLs. Images will be automatically categorized by weather condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day (sunrise-sunset, day, night) in your file paths.
                            </div>

                            <div class="section-subheader">Background Images</div>

                            ${this._backgroundImages.map((e,t)=>M`
                                <div class="image-row">
                                    <div class="image-url">
                                        <ha-textfield
                                                label="Image URL"
                                                .value=${e.url||""}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const i=e.target;i&&this._updateBackgroundImage(t,{url:i.value||""})}}
                                        ></ha-textfield>
                                    </div>
                                    <div class="image-actions">
                                        <ha-icon-button
                                                .path=${"M19,13H5V11H19V13Z"}
                                                @click=${()=>this._removeBackgroundImage(t)}
                                        ></ha-icon-button>
                                    </div>
                                    <div class="image-weather">
                                        <ha-select
                                                label="Weather Condition"
                                                .value=${e.weather}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation()}}
                                                @selected=${e=>{e.stopPropagation(),e.preventDefault();const i=e.target;i&&this._updateBackgroundImage(t,{weather:i.value})}}
                                        >
                                            ${Object.values(ne).map(e=>M`
                                                <mwc-list-item .value=${e}>${e}</mwc-list-item>
                                            `)}
                                        </ha-select>
                                    </div>
                                    <div class="image-time">
                                        <ha-select
                                                label="Time of Day"
                                                .value=${e.timeOfDay}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation()}}
                                                @selected=${e=>{e.stopPropagation(),e.preventDefault();const i=e.target;i&&this._updateBackgroundImage(t,{timeOfDay:i.value})}}
                                        >
                                            ${Object.values(ae).map(e=>M`
                                                <mwc-list-item .value=${e}>${e}</mwc-list-item>
                                            `)}
                                        </ha-select>
                                    </div>
                                </div>
                            `)}

                            <mwc-button @click=${this._addBackgroundImage}>Add Background Image</mwc-button>
                        </div>
                    </ha-expansion-panel>
                `:""}

                ${"unsplash"===this._config.imageSource?M`
                    <!-- Unsplash Configuration Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Unsplash Configuration</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure Unsplash image source settings. You can use Unsplash with or without an API
                                key.
                                Using an API key provides better image quality and more reliable service.
                            </div>

                            <div class="row">
                                <div class="label">Category</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Category"
                                            .value=${(null===(h=this._config.imageConfig)||void 0===h?void 0:h.category)||"nature"}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.category=t.value||"nature",this._config=i,ze(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="info-text">
                                An API key is required for Unsplash to work properly.
                            </div>

                            ${M`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="API Key"
                                                .value=${(null===(g=this._config.imageConfig)||void 0===g?void 0:g.apiKey)||""}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.apiKey=t.value||"",this._config=i,ze(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${(null===(u=this._config.imageConfig)||void 0===u?void 0:u.contentFilter)||"high"}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.contentFilter=t.value||"high",this._config=i,ze(this,"config-changed",{config:i})}}
                                        >
                                            <mwc-list-item .value=${"low"}>Low</mwc-list-item>
                                            <mwc-list-item .value=${"high"}>High</mwc-list-item>
                                        </ha-select>
                                    </div>
                                </div>
                            `}
                        </div>
                    </ha-expansion-panel>
                `:""}

                ${"sensor"===this._config.imageSource?M`
                    <!-- Sensor Images Configuration Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Sensor Images Configuration</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure the sensor that provides the image list. The sensor should have a "files" attribute
                                that contains an array of image URLs.
                            </div>

                            <div class="row">
                                <div class="label">Sensor Entity</div>
                                <div class="value">
                                    <ha-select
                                        label="Entity"
                                        .value=${(null===(p=this._config.imageConfig)||void 0===p?void 0:p.entity)||""}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.entity=t.value||"",this._config=i,ze(this,"config-changed",{config:i})}}
                                    >
                                        ${$.filter(e=>e.startsWith("sensor.")).map(e=>M`
                                                <mwc-list-item .value=${e}>${e}</mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            <div class="info-text">
                                The sensor should have a "files" attribute that contains an array of image URLs.
                                Images will be automatically categorized by weather condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day (sunrise-sunset, day, night) in your file paths.
                            </div>
                        </div>
                    </ha-expansion-panel>
                `:""}

                <!-- Sensors Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Sensors</h3>
                    <div class="content">
                        ${this._sensors.map((e,t)=>M`
                            <div class="sensor-row">
                                <div class="sensor-entity">
                                    <ha-select
                                            label="Entity"
                                            .value=${e.entity||""}
                                            @click=${e=>{e.stopPropagation()}}
                                            @closed=${e=>{e.stopPropagation();const i=e.target;i&&this._sensorChanged(t,"entity",i.value||"")}}
                                    >
                                        ${$.map(e=>M`
                                                    <mwc-list-item .value=${e}>${e}</mwc-list-item>`)}
                                    </ha-select>
                                </div>
                                <div class="sensor-label">
                                    <ha-textfield
                                            label="Label"
                                            .value=${e.label||""}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const i=e.target;i&&this._sensorChanged(t,"label",i.value||"")}}
                                    ></ha-textfield>
                                </div>
                                <div class="sensor-actions">
                                    <ha-icon-button
                                            .path=${"M19,13H5V11H19V13Z"}
                                            @click=${()=>this._removeSensor(t)}
                                    ></ha-icon-button>
                                </div>
                            </div>
                        `)}

                        <mwc-button @click=${this._addSensor}>Add Sensor</mwc-button>
                    </div>
                </ha-expansion-panel>

                <!-- Weather Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Weather Forecast</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Show Weather</div>
                            <div class="value">
                                <ha-switch
                                        .checked=${this._config.showWeather||!1}
                                        @change=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.showWeather=t.checked||!1,this._config=i,ze(this,"config-changed",{config:i})}}
                                ></ha-switch>
                                <span>Display weather forecast</span>
                            </div>
                        </div>

                        ${this._config.showWeather?M`
                            <div class="row">
                                <div class="label">Weather Title</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Title for weather section"
                                            .value=${this._config.weatherTitle||"Weather"}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherTitle=t.value||"Weather",this._config=i,ze(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Weather Provider</div>
                                <div class="value">
                                    <ha-select
                                            label="Provider"
                                            .value=${this._config.weatherProvider||"openweathermap"}
                                            @click=${e=>{e.stopPropagation()}}
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherProvider=t.value||"openweathermap",this._config=i,ze(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherProviderOptions.map(e=>M`
                                                    <mwc-list-item .value=${e.value}>${e.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"openweathermap"===this._config.weatherProvider?M`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="OpenWeatherMap API Key"
                                                .value=${(null===(m=this._config.weatherConfig)||void 0===m?void 0:m.apiKey)||""}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},apiKey:t.value||""},this._config=i,ze(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Location</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Latitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${(null===(f=this._config.weatherConfig)||void 0===f?void 0:f.latitude)||50.0755}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},latitude:parseFloat(t.value||"50.0755")},this._config=i,ze(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <ha-textfield
                                                label="Longitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${(null===(v=this._config.weatherConfig)||void 0===v?void 0:v.longitude)||14.4378}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},longitude:parseFloat(t.value||"14.4378")},this._config=i,ze(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                            `:""}

                            ${"openweathermap"===this._config.weatherProvider?M`
                                <div class="row">
                                    <div class="label">Units</div>
                                    <div class="value">
                                        <ha-select
                                                label="Units"
                                                .value=${(null===(w=this._config.weatherConfig)||void 0===w?void 0:w.units)||"metric"}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},units:t.value||"metric"},this._config=i,ze(this,"config-changed",{config:i})}}
                                        >
                                            ${this._unitsOptions.map(e=>M`
                                                        <mwc-list-item .value=${e.value}>${e.label}
                                                        </mwc-list-item>`)}
                                        </ha-select>
                                    </div>
                                </div>
                            `:""}

                            <div class="row">
                                <div class="label">Display Mode</div>
                                <div class="value">
                                    <ha-select
                                            label="Display Mode"
                                            .value=${this._config.weatherDisplayMode||"both"}
                                            @click=${e=>{e.stopPropagation()}}
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherDisplayMode=t.value||"both",this._config=i,ze(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherDisplayModeOptions.map(e=>M`
                                                    <mwc-list-item .value=${e.value}>${e.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"forecast"===this._config.weatherDisplayMode||"both"===this._config.weatherDisplayMode?M`
                                <div class="row">
                                    <div class="label">Forecast Days</div>
                                    <div class="value">
                                        <ha-slider
                                                min="1"
                                                max="7"
                                                step="1"
                                                pin
                                                .value=${this._config.weatherForecastDays||3}
                                                @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherForecastDays="string"==typeof t.value?parseInt(t.value,10):t.value,this._config=i,ze(this,"config-changed",{config:i})}}
                                        ></ha-slider>
                                        <span>${this._config.weatherForecastDays||3} days</span>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Update Interval</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Update interval in minutes (min: 1)"
                                                type="number"
                                                min="1"
                                                .value=${Math.floor((this._config.weatherUpdateInterval||1800)/60)}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));let o="string"==typeof t.value?parseInt(t.value,10):t.value;o=Math.max(o||30,1);const s=60*o;i.weatherUpdateInterval=s,this._config=i,ze(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <span>minutes</span>
                                    </div>
                                </div>
                            `:""}
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===this._config.enableTransportation?M`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <div class="content">

                            <div class="row">
                                <div class="label">Transportation Provider</div>
                                <div class="value">
                                    <ha-select
                                            label="Provider"
                                            .value=${(null===(y=this._config.transportation)||void 0===y?void 0:y.provider)||"idsjmk"}
                                            @click=${e=>{e.stopPropagation()}}
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,provider:t.value||"idsjmk"},this._config=i,ze(this,"config-changed",{config:i})}}
                                    >
                                        ${this._getTransportationProviderOptions().map(e=>M`
                                                    <mwc-list-item .value=${e.value}>${e.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Global Max Departures</div>
                                <div class="value">
                                    <ha-slider
                                            min="1"
                                            max="5"
                                            step="1"
                                            pin
                                            .value=${(null===(_=this._config.transportation)||void 0===_?void 0:_.maxDepartures)||2}
                                            @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,maxDepartures:"string"==typeof t.value?parseInt(t.value,10):t.value},this._config=i,this._loadStops(),ze(this,"config-changed",{config:i})}}
                                    ></ha-slider>
                                    <span>${(null===(b=this._config.transportation)||void 0===b?void 0:b.maxDepartures)||2} departures</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Show on Demand</div>
                                <div class="value">
                                    <ha-switch
                                            .checked=${!0===(null===(S=this._config.transportation)||void 0===S?void 0:S.onDemand)}
                                            @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,onDemand:t.checked},this._config=i,ze(this,"config-changed",{config:i})}}
                                    ></ha-switch>
                                    <span>Only show departures when clicked</span>
                                </div>
                            </div>

                            ${!0===(null===(k=this._config.transportation)||void 0===k?void 0:k.onDemand)?M`
                                <div class="row">
                                    <div class="label">Auto-Hide Timeout</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Auto-hide timeout in minutes (1-10)"
                                                type="number"
                                                min="1"
                                                max="10"
                                                .value=${(null===(x=this._config.transportation)||void 0===x?void 0:x.autoHideTimeout)||5}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let o="string"==typeof t.value?parseInt(t.value,10):t.value;o=Math.max(Math.min(o||5,10),1),i.transportation={...i.transportation,autoHideTimeout:o},this._config=i,ze(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <span>minutes</span>
                                    </div>
                                </div>
                            `:""}

                            <div class="row">
                                <div class="label">Update Interval</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Update interval in minutes (min: 1)"
                                            type="number"
                                            min="1"
                                            .value=${Math.floor((this._config.transportationUpdateInterval||60)/60)}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let o="string"==typeof t.value?parseInt(t.value,10):t.value;o=Math.max(o||1,1);const s=60*o;i.transportationUpdateInterval=s,this._config=i,ze(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                    <span>minutes</span>
                                </div>
                            </div>

                            <div class="section-subheader">Stops</div>

                            ${this._stops.map((e,t)=>M`
                                <div class="sensor-row">
                                    <div class="sensor-entity">
                                        <ha-textfield
                                                label="Stop ID"
                                                type="number"
                                                .value=${e.stopId||1793}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const i=e.target;i&&this._stopChanged(t,"stopId",parseInt(i.value||"1793",10))}}
                                        ></ha-textfield>
                                    </div>
                                    <div class="sensor-label">
                                        <ha-textfield
                                                label="Post ID"
                                                type="number"
                                                .value=${e.postId||3}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const i=e.target;i&&this._stopChanged(t,"postId",parseInt(i.value||"3",10))}}
                                        ></ha-textfield>
                                    </div>
                                </div>
                                <div class="sensor-row" style="margin-bottom: 16px; padding-bottom: 16px;">
                                    <div class="sensor-entity" style="width: 100%;">
                                        <ha-textfield
                                                label="Stop Name (optional)"
                                                .value=${e.name||""}
                                                style="width: 100%;"
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const i=e.target;i&&this._stopChanged(t,"name",i.value||"")}}
                                        ></ha-textfield>
                                    </div>
                                    <div class="sensor-actions">
                                        <ha-icon-button
                                                .path=${"M19,13H5V11H19V13Z"}
                                                @click=${()=>this._removeStop(t)}
                                        ></ha-icon-button>
                                    </div>
                                </div>
                            `)}

                            <mwc-button @click=${this._addStop}>Add Stop</mwc-button>

                            <div class="info-text">
                                For detailed documentation on transportation configuration, see <a
                                    href="https://github.com/rkotulan/ha-wall-clock-card/blob/main/transportation.md"
                                    target="_blank">transportation.md</a>
                            </div>                        
                        </div>
                    </ha-expansion-panel>
                `:""}
        `}};Je([Z({type:Object})],We.prototype,"hass",void 0),Je([Z({type:Object})],We.prototype,"_config",void 0),Je([Z({type:Array})],We.prototype,"_sensors",void 0),Je([Z({type:Array})],We.prototype,"_backgroundImages",void 0),Je([Z({type:Array})],We.prototype,"_stops",void 0),We=Je([K("wall-clock-card-editor")],We);var je=function(e,t,i,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(n=(a<3?s(n):a>3?s(t,i,n):s(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let Ve=class extends oe{constructor(){super(),this.currentTime="",this.currentDate="",this.config={},this.currentImageUrl="",this.sensorValues=[],this.hours="",this.minutes="",this.seconds="",this.ampm="",this.consecutiveFailures=0,this.isRetrying=!1,this.weatherLoading=!1,this.weatherError=!1,this.weatherErrorMessage="",this.transportationData={departures:[],loading:!1},this.transportationDataLoaded=!1,this.fetchingImageUrls=!1,this.backgroundImageManager=new xe,console.info("%c WALL-CLOCK-CARD %c 1.21.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.updateTime(),this.timer=window.setInterval(()=>{this.updateTime()},1e3)}connectedCallback(){super.connectedCallback(),this.initConnectCallbackAsync()}async initConnectCallbackAsync(){var e;let t;switch((this.config.logLevel||"warn").toLowerCase()){case"debug":t=he.DEBUG;break;case"info":t=he.INFO;break;case"warn":default:t=he.WARN;break;case"error":t=he.ERROR;break;case"none":t=he.NONE}var i;i={level:t,prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1},ue={...ge,...i};try{await async function(){console.log("[lokalify] Loading all translations");const e=Te().map(e=>async function(e){try{Ae[e]?(Fe[e]=Ae[e],console.log(`[lokalify] Loaded translations for ${e}`)):console.warn(`[lokalify] No embedded translations found for ${e}`)}catch(t){console.error(`[lokalify] Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),console.log("[wall-clock] Loaded translations for all languages")}catch(e){console.error("[wall-clock] Error loading translations:",e)}if(this.config.showWeather){await this.fetchWeatherDataAsync();let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;console.log(`[wall-clock] Setting weather update interval to ${e} seconds`),this.weatherUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(e){console.error("[wall-clock] Error in weather update interval:",e)}})()},t)}if(await this.initBackgroundImageManagerAsync(),this.config.transportation)if(null===(e=this.config.transportation)||void 0===e?void 0:e.onDemand)console.log("[wall-clock] Transportation on-demand loading is enabled. Data will be loaded when requested.");else{await this.fetchTransportationDataAsync(),this.transportationDataLoaded=!0;let e=this.config.transportationUpdateInterval||60;e=Math.max(e,60);const t=1e3*e;console.log(`[wall-clock] Setting transportation update interval to ${e} seconds`),this.transportationUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){console.error("[wall-clock] Error in transportation update interval:",e)}})()},t)}}async initBackgroundImageManagerAsync(){var e,t;if(!this.fetchingImageUrls){this.fetchingImageUrls=!0;try{let i=(null===(t=null===(e=this.weatherData)||void 0===e?void 0:e.current)||void 0===t?void 0:t.conditionUnified)||ne.All,o=ce();console.log(`[wall-clock] Current weather: ${i}, time of day: ${o}`);const s={...this.config.imageConfig||{},backgroundImages:this.config.backgroundImages,imageSourceId:this.config.imageSource};if(console.log(`[wall-clock] Initializing BackgroundImageManager with imageSourceId: ${this.config.imageSource||"not set (will use default picsum)"}`),!this.backgroundImageManager.initialize(s))return void console.warn("[wall-clock] Failed to initialize BackgroundImageManager");this.setupImageRotation(),await this.fetchNewImageAsync()}catch(e){console.error("[wall-clock] Error fetching image URLs:",e)}finally{this.fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const e=1e3*(this.config.backgroundRotationInterval||90);console.log(`[wall-clock] Setting up image rotation with interval: ${e/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync()}catch(e){console.error(`[wall-clock] Error in image rotation interval for ${this.config.imageSource}:`,e)}})()},e)}async fetchNewImageAsync(){var e,t;try{let i=(null===(t=null===(e=this.weatherData)||void 0===e?void 0:e.current)||void 0===t?void 0:t.conditionUnified)||ne.All,o=ce();const s=await this.backgroundImageManager.getNextImageUrlAsync(i,o);if(s){console.log(`[wall-clock] Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${s}`),console.log(`[wall-clock] Loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${s}`);const e=new Image;e.onload=()=>{console.log(`[wall-clock] New image loaded successfully: ${s}`),this.currentImageUrl=s,this.requestUpdate()},e.onerror=()=>{console.error(`[wall-clock] Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${s}`)},e.src=s}else console.warn(`[wall-clock] Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(e){console.error("[wall-clock] Error fetching new dynamic image:",e)}}disconnectedCallback(){super.disconnectedCallback(),this.timer&&clearInterval(this.timer),this.imageRotationTimer&&clearInterval(this.imageRotationTimer),this.weatherUpdateTimer&&clearInterval(this.weatherUpdateTimer),this.transportationUpdateTimer&&clearInterval(this.transportationUpdateTimer),this.transportationAutoHideTimer&&clearTimeout(this.transportationAutoHideTimer)}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.enableTransportation){this.transportationData={...this.transportationData,loading:!0,error:void 0};try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const i=(e=t.provider,Pe.getProvider(e));if(!i)throw new Error(`Transportation provider '${t.provider}' not found`);const o=t.stops.map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),s=t.providerConfig||{};void 0!==t.maxDepartures&&(s.maxDepartures=t.maxDepartures),this.transportationData=await i.fetchTransportationAsync(s,o),this.lastTransportationUpdate=new Date,console.log(`[wall-clock] Fetched transportation data from ${i.name}:`,this.transportationData)}catch(e){console.error("[wall-clock] Error fetching transportation data:",e),this.transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}var e}}async fetchWeatherDataAsync(){if(!this.weatherLoading&&this.config.showWeather){console.log("[wall-clock] Begin fetch weather data"),this.weatherLoading=!0,this.weatherError=!1,this.weatherErrorMessage="";try{const t=this.config.weatherProvider||"openweathermap",i=(e=t,Ce.getProvider(e));if(!i)throw new Error(`Weather provider '${t}' not found`);let o=i.getDefaultConfig();this.config.weatherConfig&&(o={...o,...this.config.weatherConfig},this.config.weatherConfig.units&&(o.units=this.config.weatherConfig.units,console.log(`[wall-clock] Using weather units: ${o.units}`))),this.weatherData=await i.fetchWeatherAsync(o),console.log(`[wall-clock] Fetched weather data from ${i.name}:`,this.weatherData)}catch(e){this.weatherError=!0,this.weatherErrorMessage=e instanceof Error?e.message:String(e),console.error("[wall-clock] Error fetching weather data:",e)}finally{this.weatherLoading=!1}var e}}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.initAfterSetConfigAsync(e)}async initAfterSetConfigAsync(e){const t=e.imageSource||"none";let i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(i={...i,...e.timeFormat},void 0!==e.timeFormat.hour12&&(i.hour12=Boolean(e.timeFormat.hour12)),void 0===e.timeFormat.second&&(i.second=void 0));let o={weekday:"long",year:"numeric",month:"long",day:"numeric"};e.dateFormat&&(o={...o,...e.dateFormat},void 0===e.dateFormat.year&&(o.year=void 0));let s=e.timeZone;!s&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(s=this.hass.config.time_zone),this.config={...e,timeFormat:i,dateFormat:o,backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:t,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",timeZone:s},this.currentImageUrl="",this.config.showWeather&&await this.fetchWeatherDataAsync(),await this.initBackgroundImageManagerAsync(),this.updateTime(),this.hass&&this.config.sensorEntity&&this.updateSensorValue()}updated(e){e.has("hass")&&this.config.sensors&&this.config.sensors.length>0&&this.updateSensorValue()}updateSensorValue(){this.hass&&(this.sensorValues=[],this.config.sensors&&this.config.sensors.length>0&&this.config.sensors.forEach(e=>{if(e.entity&&this.hass.states[e.entity]){const t=this.hass.states[e.entity];let i=t.state;t.attributes&&t.attributes.unit_of_measurement&&(i+=` ${t.attributes.unit_of_measurement}`),this.sensorValues.push({entity:e.entity,label:e.label,value:i})}else e.entity&&this.sensorValues.push({entity:e.entity,label:e.label,value:"unavailable"})}))}updateTime(){var e,t,i,o;const s=new Date,a=this.config.language||(this.hass?this.hass.language:null)||"cs",n=this.config.timeZone;let r,l,c;if(this.currentTime=function(e,t,i={},o){const s={...i};if(o&&(s.timeZone=o),"hidden"===s.hour&&(s.hour=void 0),"hidden"===s.minute&&(s.minute=void 0),"hidden"===s.second&&(s.second=void 0),void 0===s.hour&&void 0===s.minute&&void 0===s.second)return"";const a=Ue(t);return e.toLocaleTimeString(a,s)}(s,a,this.config.timeFormat||{},n),n){const e=function(e,t,i={},o){const s={...i};if(o&&(s.timeZone=o),"hidden"===s.weekday&&(s.weekday=void 0),"hidden"===s.year&&(s.year=void 0),"hidden"===s.month&&(s.month=void 0),"hidden"===s.day&&(s.day=void 0),"hidden"===s.hour&&(s.hour=void 0),"hidden"===s.minute&&(s.minute=void 0),"hidden"===s.second&&(s.second=void 0),void 0===s.weekday&&void 0===s.year&&void 0===s.month&&void 0===s.day&&void 0===s.hour&&void 0===s.minute&&void 0===s.second)return"";const a=Ue(t);return e.toLocaleString(a,s)}(s,a,{hour:"numeric",minute:"numeric",second:"numeric",hour12:!1},n),t=e.split(":");r=parseInt(t[0],10),l=parseInt(t[1],10),c=parseInt(t[2],10)}else r=s.getHours(),l=s.getMinutes(),c=s.getSeconds();if(null===(e=this.config.timeFormat)||void 0===e?void 0:e.hour12){const e=r>=12;r%=12,r=r||12,this.ampm=e?"pm":"am"}else this.ampm="";this.hours="2-digit"===(null===(t=this.config.timeFormat)||void 0===t?void 0:t.hour)?r.toString().padStart(2,"0"):r.toString(),this.minutes="2-digit"===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.minute)?l.toString().padStart(2,"0"):l.toString(),this.seconds="2-digit"===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.second)?c.toString().padStart(2,"0"):c.toString();let d=Ee(s,a,this.config.dateFormat||{},n);d=d.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this.currentDate=d}static get styles(){return te`
            :host {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                background-color: var(--card-background-color, var(--primary-background-color, #111));
                color: var(--primary-text-color, #fff);
                font-family: var(--paper-font-common-base_-_font-family, "Roboto", sans-serif);
                position: relative;
                overflow: hidden;
                border-radius: var(--ha-card-border-radius, 4px);
                padding: 0px;
                box-sizing: border-box;
            }

            ha-card {
                width: 100%;
                overflow: hidden;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
            }

            .background-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: 0;
                border-radius: var(--ha-card-border-radius, 4px);
            }

            .background-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #000000;
                z-index: 1;
                border-radius: var(--ha-card-border-radius, 4px);
            }


            .clock {
                font-size: 12rem;
                line-height: 10rem;
                font-weight: 300;
                text-align: center;
                z-index: 2;
                position: relative;
                display: flex;
                align-items: flex-start;
                justify-content: center;
            }

            .hours-minutes {
                font-size: 1em;
                line-height: 1;
            }

            .seconds-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-left: 0.1em;
                margin-top: 0.1em;
                justify-content: flex-start;
            }

            .seconds {
                font-size: 0.5em;
                font-weight: 400;
                line-height: 1;
                vertical-align: top;
            }

            .ampm {
                font-size: 0.3em;
                font-weight: 400;
                line-height: 1;
                text-transform: lowercase;
                opacity: 0.6;
            }

            /* Style for AM/PM when seconds are not displayed */

            .ampm-only {
                margin-top: 1.6em;
            }

            .date {
                font-size: 4rem;
                font-weight: 400;
                text-align: center;
                margin-top: 0.2rem;
                opacity: 1;
                z-index: 2;
                position: relative;
            }

            .sensor-container {
                position: absolute;
                top: 16px;
                left: 16px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                z-index: 3;
                max-width: 40%;
                max-height: 60%;
                overflow-y: auto;
                padding-right: 8px;
            }

            .sensor-item {
                margin-bottom: 16px;
                width: 100%;
            }

            .sensor-label {
                font-size: 1.5rem;
                font-weight: 300;
                opacity: 0.8;
            }

            .sensor-value {
                font-size: 2.5rem;
                font-weight: 400;
            }

            /* Weather display styles */

            .weather-container {
                position: absolute;
                top: 16px;
                right: 16px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                z-index: 3;
                max-width: 40%;
                max-height: 60%;
                overflow-y: auto;
                padding-left: 8px;
            }

            .weather-title {
                font-size: 1.5rem;
                font-weight: 300;
                opacity: 0.8;
                text-align: right;
            }

            .weather-current {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                margin-bottom: 16px;
            }

            .weather-temp-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
            }

            .weather-temp {
                font-size: 2.5rem;
                line-height: 2.5rem;
                font-weight: 400;
            }

            .weather-condition {
                font-size: 1.5rem;
                font-weight: 300;
                opacity: 0.8;
            }

            .weather-icon {
                width: 50px;
                height: 50px;
                margin-left: 8px;
            }

            .weather-forecast {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            .forecast-day {
                display: flex;
                align-items: center;
            }

            .forecast-date {
                font-size: 1.4rem;
                font-weight: 300;
                margin-right: 8px;
                opacity: 0.8;
                width: 2rem;
                text-align: right;
            }

            .forecast-icon {
                width: 50px;
                height: 50px;
                margin: 0 8px;
            }

            .forecast-temp {
                font-size: 1.4rem;
                font-weight: 400;
                width: 80px;
                text-align: right;
            }

            .forecast-condition {
                font-size: 0.9rem;
                margin-top: 0.2rem;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
            }

            .weather-error {
                color: #f44336;
                font-size: 1rem;
            }

            /* Transportation styles */

            .transportation-container {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                z-index: 3;
                padding: 8px 16px;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 0 0 var(--ha-card-border-radius, 4px) var(--ha-card-border-radius, 4px);
            }

            .transportation-on-demand-button {
                position: absolute;
                bottom: 16px;
                left: 16px;
                width: 144px;
                height: 144px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.25);
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                z-index: 3;
                transition: all 0.3s ease;
            }

            .transportation-on-demand-button:hover {
                background-color: rgba(255, 255, 255, 0.4);
                transform: scale(1.1);
            }

            .transportation-on-demand-button svg {
                width: 72px;
                height: 72px;
                fill: white;
            }

            .transportation-title {
                font-size: 1.5rem;
                font-weight: 300;
                opacity: 0.8;
                margin-bottom: 8px;
            }

            .transportation-departures {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 16px;
            }

            .stop-group {
                display: flex;
                flex-direction: column;
                width: 100%;
            }

            /* Responsive layout for transportation stops */
            @media (max-width: 480px) {
                /* Force single column on very small screens */
                .transportation-departures {
                    flex-direction: column;
                }

                .stop-group {
                    width: 100%;
                }
            }

            @media (min-width: 481px) and (max-width: 599px) {
                /* Allow 2 columns on slightly larger screens if they fit */
                .transportation-departures {
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .stop-group {
                    width: calc(50% - 8px);
                }
            }

            @media (min-width: 600px) {
                .transportation-departures {
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .stop-group {
                    width: calc(50% - 8px);
                }
            }

            /* 3 columns for wider screens */
            @media (min-width: 900px) and (max-width: 1179px) {
                .stop-group {
                    width: calc(33% - 8px);
                }
            }

            /* 3 columns for 1180px resolution as requested */
            @media (min-width: 1180px) and (max-width: 1399px) {
                .stop-group {
                    width: calc(33% - 8px);
                }
            }

            /* 4 columns for very wide screens */
            @media (min-width: 1400px) {
                .stop-group {
                    width: calc(25% - 8px);
                }
            }

            .stop-name {
                font-size: 1.3rem;
                font-weight: 500;
                text-align: left;
                width: 100%;
                margin-top: 0;
                margin-bottom: 8px;
                margin-left: 12px;
                opacity: 0.8;
            }

            .stop-departures {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 8px;
            }

            .departure-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.3);
                padding: 8px 12px;
                border-radius: 4px;
                width: calc(100% - 24px);
            }

            .departure-line {
                font-size: 1.5rem;
                font-weight: 700;
                margin-right: 8px;
                min-width: 2rem;
                text-align: center;
            }

            .departure-destination {
                font-size: 1.2rem;
                margin-right: 8px;
            }

            .departure-time {
                font-size: 1.2rem;
                font-weight: 700;
                color: #4CAF50;
            }

            .departure-lowfloor {
                margin-left: 4px;
                font-size: 1.2rem;
            }

            .transportation-error {
                color: #f44336;
                font-size: 1rem;
            }

            .transportation-update-time {
                font-size: 0.8rem;
                opacity: 0.7;
                text-align: center;
                margin-top: 8px;
                width: 100%;
            }

            /* Responsive adjustments */
            @media (min-width: 900px) {
                .clock {
                    font-size: 16rem;
                    line-height: 14rem;
                }

                .date {
                    font-size: 6rem;
                    line-height: 5rem;
                }

                .weather-temp {
                    font-size: 3rem;
                    line-height: 3rem;
                }

                .weather-icon {
                    width: 60px;
                    height: 60px;
                }
            }

            @media (min-width: 1280px) {
                .clock {
                    font-size: 18rem;
                    line-height: 14rem;
                }

                .date {
                    font-size: 6rem;
                }

                .weather-temp {
                    font-size: 3rem;
                    line-height: 3rem;
                }

                .weather-icon {
                    width: 60px;
                    height: 60px;
                }

                .stop-group {
                    margin-bottom: 16px;
                }
            }
        `}render(){var e,t,i;return M`
            <ha-card style="color: ${this.config.fontColor};">
                ${this.currentImageUrl?M`
                            <img
                                    class="background-image"
                                    src="${this.currentImageUrl}"
                                    @load="${()=>console.log("[wall-clock] Background image rendered successfully:",this.currentImageUrl)}"
                                    @error="${e=>console.error("[wall-clock] Error rendering background image:",this.currentImageUrl,e)}"
                            >
                            <div
                                    class="background-overlay"
                                    style="opacity: ${void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5};"
                            ></div>
                        `:""}
                ${this.sensorValues.length>0?M`
                            <div class="sensor-container" style="color: ${this.config.fontColor};">
                                ${this.sensorValues.map(e=>M`
                                    <div class="sensor-item">
                                        ${e.label?M`
                                                    <div class="sensor-label" style="color: ${this.config.fontColor};">
                                                        ${e.label}
                                                    </div>`:""}
                                        <div class="sensor-value" style="color: ${this.config.fontColor};">
                                            ${e.value}
                                        </div>
                                    </div>
                                `)}
                            </div>`:""}
                ${this.config.showWeather&&this.weatherData?M`
                            <div class="weather-container" style="color: ${this.config.fontColor};">
                                ${this.renderWeatherContent()}
                            </div>`:""}
                <div class="clock"
                     style="color: ${this.config.fontColor}; ${this.config.transportation&&!1!==this.config.enableTransportation?`margin-top: -${30*(this.config.transportation.maxDepartures||3)+80}px;`:""}">
                    <span class="hours-minutes" style="color: ${this.config.fontColor};">${this.hours}
                        :${this.minutes}</span>
                    ${void 0!==(null===(e=this.config.timeFormat)||void 0===e?void 0:e.second)&&"hidden"!==(null===(t=this.config.timeFormat)||void 0===t?void 0:t.second)?M`
                        <div class="seconds-container">
                            <span class="seconds" style="color: ${this.config.fontColor};">${this.seconds}</span>
                            ${this.ampm?M`<span class="ampm"
                                                     style="color: ${this.config.fontColor};">${this.ampm}</span>`:""}
                        </div>
                    `:this.ampm?M`
                        <div class="seconds-container">
                            <span class="ampm ampm-only" style="color: ${this.config.fontColor};">${this.ampm}</span>
                        </div>
                    `:""}
                </div>
                <div class="date" style="color: ${this.config.fontColor};">${this.currentDate}</div>
                ${this.config.transportation&&!1!==this.config.enableTransportation?(null===(i=this.config.transportation)||void 0===i?void 0:i.onDemand)&&!this.transportationDataLoaded?M`
                                    <div class="transportation-on-demand-button"
                                         @click=${this._handleTransportationClickAsync}>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
                                        </svg>
                                    </div>`:M`
                                    <div class="transportation-container" style="color: ${this.config.fontColor};">
                                        ${this.renderTransportationContent()}
                                    </div>`:""}
            </ha-card>
        `}renderTransportationContent(){if(this.transportationData.loading)return M`
                <div>Loading transportation data...</div>`;if(this.transportationData.error)return M`
                <div class="transportation-error">${this.transportationData.error}</div>`;if(!this.transportationData.departures||0===this.transportationData.departures.length)return M`
                <div>No departures available</div>`;const e={};for(const t of this.transportationData.departures){const i=`${t.stopName}-${t.postId}`;e[i]||(e[i]=[]),e[i].push(t)}return M`
            <div class="transportation-departures">
                ${Object.entries(e).map(([e,t])=>{const i=t[0].stopName;return M`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.config.fontColor};">
                                ${i}
                            </h3>
                            <div class="stop-departures">
                                ${t.map(e=>M`
                                    <div class="departure-item">
                                        <div class="departure-line" style="color: ${this.config.fontColor};">
                                            ${e.lineName}
                                        </div>
                                        <div class="departure-destination" style="color: ${this.config.fontColor};">→
                                            ${e.finalStop}
                                        </div>
                                        <div class="departure-time" style="color: ${this.config.fontColor};">
                                            ${e.timeMark}
                                        </div>
                                        ${e.isLowFloor?M`
                                            <div class="departure-lowfloor">♿</div>`:""}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `})}
            </div>
        `}renderWeatherContent(){if(this.weatherError)return M`
                <div class="weather-error">${this.weatherErrorMessage}</div>`;if(!this.weatherData||!this.weatherData.current)return M`
                <div class="weather-loading">Loading weather data...</div>`;const e=this.config.weatherDisplayMode||"both",t=this.config.weatherForecastDays||3,i=this.config.weatherTitle||"Weather",o=Math.min(t,this.weatherData.daily.length);return M`
            <div class="weather-title" style="color: ${this.config.fontColor};">${i}</div>

            ${"current"===e||"both"===e?M`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${this.weatherData.current.icon}"
                                     alt="${this.weatherData.current.condition}">
                                <div class="weather-temp">${Math.round(this.weatherData.current.temperature)}°</div>
                            </div>
                            <div class="weather-condition">
                                ${this.translateWeatherCondition(this.weatherData.current.condition)}
                            </div>
                        </div>
                    `:""}

            ${"forecast"===e||"both"===e?M`
                        <div class="weather-forecast">
                            ${this.weatherData.daily.slice(0,o).map(e=>M`
                                <div class="forecast-day">
                                    <div class="forecast-date">${this.formatForecastDate(e.date)}</div>
                                    <img class="forecast-icon" src="${e.icon}" alt="${e.condition}">
                                    <div class="forecast-temp">${Math.round(e.temperatureMin)}° -
                                        ${Math.round(e.temperatureMax)}°
                                    </div>
                                </div>
                            `)}
                        </div>
                    `:""}
        `}async _handleTransportationClickAsync(){var e;if(console.log("[wall-clock] Transportation button clicked, loading data on demand"),await this.fetchTransportationDataAsync(),this.transportationDataLoaded=!0,this.config.transportationUpdateInterval){let e=this.config.transportationUpdateInterval||60;e=Math.max(e,60);const t=1e3*e;console.log(`[wall-clock] Setting transportation update interval to ${e} seconds`),this.transportationUpdateTimer&&clearInterval(this.transportationUpdateTimer),this.transportationUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){console.error("[wall-clock] Error in transportation update interval:",e)}})()},t)}if(null===(e=this.config.transportation)||void 0===e?void 0:e.autoHideTimeout){this.transportationAutoHideTimer&&clearTimeout(this.transportationAutoHideTimer);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));const t=60*e*1e3;console.log(`[wall-clock] Setting transportation auto-hide timeout to ${e} minutes`),this.transportationAutoHideTimer=window.setTimeout(()=>{console.log(`[wall-clock] Auto-hiding transportation departures after ${e} minutes`),this.transportationDataLoaded=!1},t)}}translateWeatherCondition(e){const t=this.config.language||(this.hass?this.hass.language:null)||"cs",i=function(e,t,i=e){if(!Te().includes(t))return null!==i?i:e;const o=Fe[t];if(!o)return null!==i?i:e;const s=function(e,t){if(void 0!==e[t])return e[t];const i=t.split(".");let o=e;for(const e of i){if(null==o||"object"!=typeof o)return;o=o[e]}return o}(o,e);return"string"==typeof s?s:null!==i?i:e}(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,null);return null!==i?i:e}formatForecastDate(e){return Ee(e,this.config.language||(this.hass?this.hass.language:null)||"cs",{weekday:"short"})}};je([Z({type:Object})],Ve.prototype,"hass",void 0),je([Z({type:String})],Ve.prototype,"currentTime",void 0),je([Z({type:String})],Ve.prototype,"currentDate",void 0),je([Z({type:Object})],Ve.prototype,"config",void 0),je([Z({type:String})],Ve.prototype,"currentImageUrl",void 0),je([Z({type:Array})],Ve.prototype,"sensorValues",void 0),je([Z({type:String})],Ve.prototype,"hours",void 0),je([Z({type:String})],Ve.prototype,"minutes",void 0),je([Z({type:String})],Ve.prototype,"seconds",void 0),je([Z({type:String})],Ve.prototype,"ampm",void 0),je([Z({type:Number})],Ve.prototype,"consecutiveFailures",void 0),je([Z({type:Boolean})],Ve.prototype,"isRetrying",void 0),je([Z({type:Object})],Ve.prototype,"weatherData",void 0),je([Z({type:Boolean})],Ve.prototype,"weatherLoading",void 0),je([Z({type:Boolean})],Ve.prototype,"weatherError",void 0),je([Z({type:String})],Ve.prototype,"weatherErrorMessage",void 0),je([Z({type:Object})],Ve.prototype,"transportationData",void 0),je([Z({type:Date})],Ve.prototype,"lastTransportationUpdate",void 0),je([Z({type:Boolean})],Ve.prototype,"transportationDataLoaded",void 0),Ve=je([K("wall-clock-card")],Ve),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
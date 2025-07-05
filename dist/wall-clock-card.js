/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${i}--\x3e`,o=new RegExp(`${i}|${s}`),a="$lit$";class n{constructor(e,t){this.parts=[],this.element=t;const s=[],n=[],l=document.createTreeWalker(t.content,133,null,!1);let d=0,g=-1,u=0;const{strings:p,values:{length:m}}=e;for(;u<m;){const e=l.nextNode();if(null!==e){if(g++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)r(t[e].name,a)&&s++;for(;s-- >0;){const t=p[u],i=h.exec(t)[2],s=i.toLowerCase()+a,n=e.getAttribute(s);e.removeAttribute(s);const r=n.split(o);this.parts.push({type:"attribute",index:g,name:i,strings:r}),u+=r.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,n=t.split(o),l=n.length-1;for(let t=0;t<l;t++){let s,o=n[t];if(""===o)s=c();else{const e=h.exec(o);null!==e&&r(e[2],a)&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),s=document.createTextNode(o)}i.insertBefore(s,e),this.parts.push({type:"node",index:++g})}""===n[l]?(i.insertBefore(c(),e),s.push(e)):e.data=n[l],u+=l}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&g!==d||(g++,t.insertBefore(c(),e)),d=g,this.parts.push({type:"node",index:g}),null===e.nextSibling?e.data="":(s.push(e),g--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=n.pop()}for(const e of s)e.parentNode.removeChild(e)}}const r=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(e,t){const{element:{content:i},parts:s}=e,o=document.createTreeWalker(i,133,null,!1);let a=u(s),n=s[a],r=-1,l=0;const c=[];let h=null;for(;o.nextNode();){r++;const e=o.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==n&&n.index===r;)n.index=null!==h?-1:n.index-l,a=u(s,a),n=s[a]}c.forEach(e=>e.parentNode.removeChild(e))}const g=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},u=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1},p=new WeakMap,m=e=>"function"==typeof e&&p.has(e),f={},v={};class y{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let a,n=0,r=0,c=o.nextNode();for(;n<s.length;)if(a=s[n],l(a)){for(;r<a.index;)r++,"TEMPLATE"===c.nodeName&&(i.push(c),o.currentNode=c.content),null===(c=o.nextNode())&&(o.currentNode=i.pop(),c=o.nextNode());if("node"===a.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,a.name,a.strings,this.options));n++}else this.__parts.push(void 0),n++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const _=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),w=` ${i} `;class b{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",o=!1;for(let n=0;n<e;n++){const e=this.strings[n],r=e.lastIndexOf("\x3c!--");o=(r>-1||o)&&-1===e.indexOf("--\x3e",r+1);const l=h.exec(e);t+=null===l?e+(o?w:s):e.substr(0,l.index)+l[1]+l[2]+a+l[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==_&&(t=_.createHTML(t)),e.innerHTML=t,e}}const S=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class I{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new $(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let s="";for(let o=0;o<t;o++){s+=e[o];const t=i[o];if(void 0!==t){const e=t.value;if(S(e)||!x(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||S(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class k{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===v?(this.value=v,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const i=new y(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const o of e)i=t[s],void 0===i&&(i=new k(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(o),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class P{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class O extends I{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends ${}let C=!1;(()=>{try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class F{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=E(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const E=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function T(e){let t=U.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},U.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const o=e.strings.join(i);return s=t.keyString.get(o),void 0===s&&(s=new n(e,e.getTemplateElement()),t.keyString.set(o,s)),t.stringsArray.set(e.strings,s),s}const U=new Map,D=new WeakMap,M=new class{handleAttributeExpressions(e,t,i,s){const o=t[0];return"."===o?new O(e,t.slice(1),i).parts:"@"===o?[new F(e,t.slice(1),s.eventContext)]:"?"===o?[new P(e,t.slice(1),i)]:new I(e,t,i).parts}handleTextExpression(e){return new k(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const A=(e,...t)=>new b(e,t,"html",M),R=(e,t)=>`${e}--${t}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const V=e=>t=>{const s=R(t.type,e);let o=U.get(s);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},U.set(s,o));let a=o.stringsArray.get(t.strings);if(void 0!==a)return a;const r=t.strings.join(i);if(a=o.keyString.get(r),void 0===a){const i=t.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(i,e),a=new n(t,i),o.keyString.set(r,a)}return o.stringsArray.set(t.strings,a),a},J=["html","svg"],B=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const W={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},z=(e,t)=>t!==e&&(t==t||e==e),j={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:z},H="finalized";class q extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=j){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdateInternal(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||j}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(H)||e.finalize(),this[H]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=z){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||W,o="function"==typeof s?s:s.fromAttribute;return o?o(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||W.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=j){const s=this.constructor,o=s._attributeNameForProperty(e,i);if(void 0!==o){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(o):this.setAttribute(o,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const o=this.constructor;i=i||o.getPropertyOptions(e),o._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}q[H]=!0;const K=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),Z=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function Y(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):Z(e,t)}const G=Element.prototype;G.msMatchesSelector||G.webkitMatchesSelector;const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class ee{constructor(e,t){if(t!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const te=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof ee)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new ee(i,X)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const ie={};class se extends q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!Q){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ee(String(t),X)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ie&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ie}}se.finalized=!0,se.render=(e,i,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const o=s.scopeName,a=D.has(i),n=L&&11===i.nodeType&&!!i.host,r=n&&!B.has(o),l=r?document.createDocumentFragment():i;if(((e,i,s)=>{let o=D.get(i);void 0===o&&(t(i,i.firstChild),D.set(i,o=new k(Object.assign({templateFactory:T},s))),o.appendInto(i)),o.setValue(e),o.commit()})(e,l,Object.assign({templateFactory:V(o)},s)),r){const e=D.get(l);D.delete(l);((e,t,i)=>{B.add(e);const s=i?i.element:document.createElement("template"),o=t.querySelectorAll("style"),{length:a}=o;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(s,e);const n=document.createElement("style");for(let e=0;e<a;e++){const t=o[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{J.forEach(t=>{const i=U.get(R(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),d(e,i)})})})(e);const r=s.content;i?function(e,t,i=null){const{element:{content:s},parts:o}=e;if(null==i)return void s.appendChild(t);const a=document.createTreeWalker(s,133,null,!1);let n=u(o),r=0,l=-1;for(;a.nextNode();)for(l++,a.currentNode===i&&(r=g(t),i.parentNode.insertBefore(t,i));-1!==n&&o[n].index===l;){if(r>0){for(;-1!==n;)o[n].index+=r,n=u(o,n);return}n=u(o,n)}}(i,n,r.firstChild):r.insertBefore(n,r.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const l=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){r.insertBefore(n,r.firstChild);const e=new Set;e.add(n),d(i,e)}})(o,l,e.value instanceof y?e.value.template:void 0),t(i,i.firstChild),i.appendChild(l),D.set(i,e)}!a&&n&&window.ShadyCSS.styleElement(i.host)},se.shadowRootOptions={mode:"open"};class oe{static getInstance(){return oe.instance||(oe.instance=new oe),oe.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&console.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}const ae=new class{constructor(){this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos"}async fetchImages(e){const t=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return console.log(`Generated Picsum image URL: ${t}`),[t]}getDefaultConfig(){return{}}},ne=new class{constructor(){this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration"}async fetchImages(e){const t=e.images||[];return console.log(`Found ${t.length} local images`),t}getDefaultConfig(){return{images:[]}}},re=oe.getInstance();function le(e){return re.getSource(e)}re.register(ae),re.register(ne);class ce{static getInstance(){return ce.instance||(ce.instance=new ce),ce.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&console.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const he=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeather(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,i=e.longitude||14.4378,s=e.units||"metric",o=e.language||"cs";try{const a=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${i}&units=${s}&lang=${o}&appid=${e.apiKey}`;console.log("[OpenWeatherMap] "+a);const n=await fetch(a);if(!n.ok)throw new Error(`OpenWeatherMap API error: ${n.statusText}`);const r=await n.json();if(!r.list||!r.list.length)throw new Error("No forecast data available");const l=r.list[0],c={temperature:l.main.temp,condition:l.weather[0].description,icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},h=new Map;return r.list.forEach(e=>{var t;const i=new Date(1e3*e.dt).toISOString().split("T")[0];h.has(i)||h.set(i,[]),null===(t=h.get(i))||void 0===t||t.push(e)}),{current:c,daily:Array.from(h.entries()).map(([e,t])=>{const i=t.map(e=>e.main.temp),s=Math.min(...i),o=Math.max(...i),a=t[Math.floor(t.length/2)]||t[0],n=t.filter(e=>void 0!==e.pop).map(e=>e.pop),r=n.length>0?n.reduce((e,t)=>e+t,0)/n.length*100:0;return{date:new Date(e),temperatureMin:s,temperatureMax:o,condition:a.weather[0].description,icon:this.getIconUrl(a.weather[0].icon),precipitation:r,humidity:a.main.humidity,windSpeed:a.wind.speed}})}}catch(e){throw console.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"cs"}}getIconUrl(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}},de=ce.getInstance();var ge,ue,pe;de.register(he),(pe=ge||(ge={})).language="language",pe.system="system",pe.comma_decimal="comma_decimal",pe.decimal_comma="decimal_comma",pe.space_comma="space_comma",pe.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ue||(ue={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var me=function(e,t,i,s){s=s||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,e.dispatchEvent(o),o};new Set(["call-service","divider","section","weblink","cast","select"]);var fe=function(e,t,i,s){var o,a=arguments.length,n=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ve=class extends se{constructor(){super(...arguments),this._sensors=[],this._localBackgroundImages=[],this._timeFormatOptions={hour12:[{value:!0,label:"12-hour"},{value:!1,label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:void 0,label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:void 0,label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:void 0,label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:void 0,label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2023)"},{value:"2-digit",label:"2-digit (23)"},{value:void 0,label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback()}setConfig(e){const t=e;let i=t.imageSource;void 0===i&&(i=!0===t.useOnlineImages?t.onlineImageSource||"picsum":!1===t.useOnlineImages&&t.backgroundImages&&t.backgroundImages.length>0?"local":"none");const s=t.locaBackgroundImages||t.backgroundImages||[];this._config={...t,timeFormat:t.timeFormat||{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:t.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:i,imageConfig:t.imageConfig||t.onlineImageConfig||{},locaBackgroundImages:s,backgroundImages:s,useOnlineImages:"none"!==i&&"local"!==i,backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",showWeather:void 0!==t.showWeather&&t.showWeather,weatherProvider:t.weatherProvider||"openweathermap",weatherConfig:t.weatherConfig||{},weatherDisplayMode:t.weatherDisplayMode||"both",weatherForecastDays:t.weatherForecastDays||3},this._loadSensors(),this._loadLocalBackgroundImages()}_loadSensors(){var e,t;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:(null===(t=this._config)||void 0===t?void 0:t.sensorEntity)?this._sensors=[{entity:this._config.sensorEntity,label:this._config.sensorLabel||""}]:this._sensors=[]}_loadLocalBackgroundImages(){var e,t;(null===(e=this._config)||void 0===e?void 0:e.locaBackgroundImages)&&this._config.locaBackgroundImages.length>0?this._localBackgroundImages=[...this._config.locaBackgroundImages]:(null===(t=this._config)||void 0===t?void 0:t.backgroundImages)&&this._config.backgroundImages.length>0?this._localBackgroundImages=[...this._config.backgroundImages]:this._localBackgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,me(this,"config-changed",{config:e})}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,i)=>i!==e),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,me(this,"config-changed",{config:e})}}_sensorChanged(e,t,i){if(this._sensors=this._sensors.map((s,o)=>o===e?{...s,[t]:i}:s),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,me(this,"config-changed",{config:e})}}_addLocalBackgroundImage(){if(this._localBackgroundImages=[...this._localBackgroundImages,""],this._config){const e=JSON.parse(JSON.stringify(this._config));e.locaBackgroundImages=[...this._localBackgroundImages],e.backgroundImages=[...this._localBackgroundImages],this._config=e,me(this,"config-changed",{config:e})}}_removeLocalBackgroundImage(e){if(this._localBackgroundImages=this._localBackgroundImages.filter((t,i)=>i!==e),this._config){const e=JSON.parse(JSON.stringify(this._config));e.locaBackgroundImages=[...this._localBackgroundImages],e.backgroundImages=[...this._localBackgroundImages],this._config=e,me(this,"config-changed",{config:e})}}_updateLocalBackgroundImage(e,t){if(this._localBackgroundImages=this._localBackgroundImages.map((i,s)=>s===e?t:i),this._config){const e=JSON.parse(JSON.stringify(this._config));e.locaBackgroundImages=[...this._localBackgroundImages],e.backgroundImages=[...this._localBackgroundImages],this._config=e,me(this,"config-changed",{config:e})}}static get styles(){return te`
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

      .section-header {
        font-size: 18px;
        font-weight: 500;
        margin-top: 16px;
        margin-bottom: 8px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 4px;
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
        margin-bottom: 8px;
        align-items: center;
      }

      .image-url {
        flex: 1;
        margin-right: 8px;
      }

      .image-actions {
        flex: 0 0 40px;
        text-align: center;
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
    `}render(){var e,t,i,s,o,a,n,r,l,c,h;if(!this.hass||!this._config)return A``;const d=Object.keys(this.hass.states).sort();return A`
      <div class="form-container">
        <!-- Time Format Section -->
        <div class="section-header">Time Format</div>

        <div class="row">
          <div class="label">Time Format</div>
          <div class="value">
            <ha-select
              label="Hour Format"
              .value=${(null===(e=this._config.timeFormat)||void 0===e?void 0:e.hour12)?"true":"false"}
              @click=${e=>{e.stopPropagation()}}
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour12:"true"===t.value},this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._timeFormatOptions.hour12.map(e=>A`<mwc-list-item .value=${String(e.value)}>${e.label}</mwc-list-item>`)}
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
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour:t.value},this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._timeFormatOptions.hour.map(e=>A`<mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`)}
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
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,minute:t.value},this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._timeFormatOptions.minute.map(e=>A`<mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`)}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Second Display</div>
          <div class="value">
            <ha-select
              label="Second Display"
              .value=${(null===(s=this._config.timeFormat)||void 0===s?void 0:s.second)||"2-digit"}
              @click=${e=>{e.stopPropagation()}}
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,second:"undefined"===t.value?void 0:t.value},this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._timeFormatOptions.second.map(e=>A`<mwc-list-item .value=${void 0===e.value?"undefined":e.value}>${e.label}</mwc-list-item>`)}
            </ha-select>
          </div>
        </div>

        <!-- Date Format Section -->
        <div class="section-header">Date Format</div>

        <div class="row">
          <div class="label">Weekday Display</div>
          <div class="value">
            <ha-select
              label="Weekday Display"
              .value=${(null===(o=this._config.dateFormat)||void 0===o?void 0:o.weekday)||"long"}
              @click=${e=>{e.stopPropagation()}}
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,weekday:"undefined"===t.value?void 0:t.value},this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._dateFormatOptions.weekday.map(e=>A`<mwc-list-item .value=${void 0===e.value?"undefined":e.value}>${e.label}</mwc-list-item>`)}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Month Display</div>
          <div class="value">
            <ha-select
              label="Month Display"
              .value=${(null===(a=this._config.dateFormat)||void 0===a?void 0:a.month)||"long"}
              @click=${e=>{e.stopPropagation()}}
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,month:"undefined"===t.value?void 0:t.value},this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._dateFormatOptions.month.map(e=>A`<mwc-list-item .value=${void 0===e.value?"undefined":e.value}>${e.label}</mwc-list-item>`)}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Day Display</div>
          <div class="value">
            <ha-select
              label="Day Display"
              .value=${(null===(n=this._config.dateFormat)||void 0===n?void 0:n.day)||"numeric"}
              @click=${e=>{e.stopPropagation()}}
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,day:"undefined"===t.value?void 0:t.value},this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._dateFormatOptions.day.map(e=>A`<mwc-list-item .value=${void 0===e.value?"undefined":e.value}>${e.label}</mwc-list-item>`)}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Year Display</div>
          <div class="value">
            <ha-select
              label="Year Display"
              .value=${(null===(r=this._config.dateFormat)||void 0===r?void 0:r.year)||"numeric"}
              @click=${e=>{e.stopPropagation()}}
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,year:"undefined"===t.value?void 0:t.value},this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._dateFormatOptions.year.map(e=>A`<mwc-list-item .value=${void 0===e.value?"undefined":e.value}>${e.label}</mwc-list-item>`)}
            </ha-select>
          </div>
        </div>

        <!-- Background Section -->
        <div class="section-header">Background</div>

        <div class="row">
          <div class="label">Image Source</div>
          <div class="value">
            <ha-select
              label="Image Source"
              .value=${this._config.imageSource||"none"}
              @click=${e=>{e.stopPropagation()}}
              @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageSource=t.value,i.useOnlineImages="none"!==t.value&&"local"!==t.value,this._config=i,me(this,"config-changed",{config:i})}}
            >
              ${this._imageSourceOptions.map(e=>A`<mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`)}
            </ha-select>
          </div>
        </div>

        ${"local"===this._config.imageSource?A`
          <div class="section-header">Local Background Images</div>

          ${this._localBackgroundImages.map((e,t)=>A`
            <div class="image-row">
              <div class="image-url">
                <ha-textfield
                  label="Image URL"
                  .value=${e||""}
                  @input=${e=>{e.stopPropagation(),e.preventDefault();const i=e.target;i&&this._updateLocalBackgroundImage(t,i.value||"")}}
                ></ha-textfield>
              </div>
              <div class="image-actions">
                <ha-icon-button
                  .path=${"M19,13H5V11H19V13Z"} 
                  @click=${()=>this._removeLocalBackgroundImage(t)}
                ></ha-icon-button>
              </div>
            </div>
          `)}

          <mwc-button @click=${this._addLocalBackgroundImage}>Add Background Image</mwc-button>
        `:""}

        <div class="row">
          <div class="label">Background Opacity</div>
          <div class="value">
            <ha-slider
              min="0"
              max="1"
              step="0.05"
              pin
              .value=${void 0!==this._config.backgroundOpacity?this._config.backgroundOpacity:.5}
              @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundOpacity="string"==typeof t.value?parseFloat(t.value):t.value,this._config=i,me(this,"config-changed",{config:i})}}
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
              @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundRotationInterval="string"==typeof t.value?parseInt(t.value,10):t.value,this._config=i,me(this,"config-changed",{config:i})}}
            ></ha-slider>
            <span>${this._config.backgroundRotationInterval||90} seconds</span>
          </div>
        </div>

        <!-- Appearance Section -->
        <div class="section-header">Appearance</div>

        <div class="row">
          <div class="label">Font Color</div>
          <div class="value">
            <ha-textfield
              label="Font Color (hex, rgb, or rgba)"
              .value=${this._config.fontColor||"#FFFFFF"}
              @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.fontColor=t.value||"#FFFFFF",this._config=i,me(this,"config-changed",{config:i})}}
            ></ha-textfield>
            <div style="width: 32px; height: 32px; background-color: ${this._config.fontColor||"#FFFFFF"}; border: 1px solid #000; margin-left: 8px;"></div>
          </div>
        </div>

        <!-- Sensors Section -->
        <div class="section-header">Sensors</div>

        ${this._sensors.map((e,t)=>A`
          <div class="sensor-row">
            <div class="sensor-entity">
              <ha-select
                label="Entity"
                .value=${e.entity||""}
                @click=${e=>{e.stopPropagation()}}
                @closed=${e=>{e.stopPropagation();const i=e.target;i&&this._sensorChanged(t,"entity",i.value||"")}}
              >
                ${d.map(e=>A`<mwc-list-item .value=${e}>${e}</mwc-list-item>`)}
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

        <!-- Weather Settings Section -->
        <div class="section-header">Weather Forecast</div>

        <div class="row">
          <div class="label">Show Weather</div>
          <div class="value">
            <ha-switch
              .checked=${this._config.showWeather||!1}
              @change=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.showWeather=t.checked||!1,this._config=i,me(this,"config-changed",{config:i})}}
            ></ha-switch>
            <span>Display weather forecast</span>
          </div>
        </div>

        ${this._config.showWeather?A`
          <div class="row">
            <div class="label">Weather Title</div>
            <div class="value">
              <ha-textfield
                label="Title for weather section"
                .value=${this._config.weatherTitle||"Weather"}
                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherTitle=t.value||"Weather",this._config=i,me(this,"config-changed",{config:i})}}
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
                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherProvider=t.value||"openweathermap",this._config=i,me(this,"config-changed",{config:i})}}
              >
                ${this._weatherProviderOptions.map(e=>A`<mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`)}
              </ha-select>
            </div>
          </div>

          ${"openweathermap"===this._config.weatherProvider?A`
            <div class="row">
              <div class="label">API Key</div>
              <div class="value">
                <ha-textfield
                  label="OpenWeatherMap API Key"
                  .value=${(null===(l=this._config.weatherConfig)||void 0===l?void 0:l.apiKey)||""}
                  @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},apiKey:t.value||""},this._config=i,me(this,"config-changed",{config:i})}}
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
                  .value=${(null===(c=this._config.weatherConfig)||void 0===c?void 0:c.latitude)||50.0755}
                  @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},latitude:parseFloat(t.value||"50.0755")},this._config=i,me(this,"config-changed",{config:i})}}
                ></ha-textfield>
                <ha-textfield
                  label="Longitude"
                  type="number"
                  step="0.0001"
                  .value=${(null===(h=this._config.weatherConfig)||void 0===h?void 0:h.longitude)||14.4378}
                  @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},longitude:parseFloat(t.value||"14.4378")},this._config=i,me(this,"config-changed",{config:i})}}
                ></ha-textfield>
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
                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherDisplayMode=t.value||"both",this._config=i,me(this,"config-changed",{config:i})}}
              >
                ${this._weatherDisplayModeOptions.map(e=>A`<mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`)}
              </ha-select>
            </div>
          </div>

          ${"forecast"===this._config.weatherDisplayMode||"both"===this._config.weatherDisplayMode?A`
            <div class="row">
              <div class="label">Forecast Days</div>
              <div class="value">
                <ha-slider
                  min="1"
                  max="7"
                  step="1"
                  pin
                  .value=${this._config.weatherForecastDays||3}
                  @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherForecastDays="string"==typeof t.value?parseInt(t.value,10):t.value,this._config=i,me(this,"config-changed",{config:i})}}
                ></ha-slider>
                <span>${this._config.weatherForecastDays||3} days</span>
              </div>
            </div>
          `:""}
        `:""}
      </div>
    `}};fe([Y({type:Object})],ve.prototype,"hass",void 0),fe([Y({type:Object})],ve.prototype,"_config",void 0),fe([Y({type:Array})],ve.prototype,"_sensors",void 0),fe([Y({type:Array})],ve.prototype,"_localBackgroundImages",void 0),ve=fe([K("wall-clock-card-editor")],ve);var ye=function(e,t,i,s){var o,a=arguments.length,n=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let _e=class extends se{constructor(){super(),this.currentTime="",this.currentDate="",this.config={},this.currentImageIndex=0,this.imageUrls=[],this.imageStatuses=[],this.currentImageUrl="",this.sensorValues=[],this.legacySensorValue="",this.hours="",this.minutes="",this.seconds="",this.consecutiveFailures=0,this.isRetrying=!1,this.weatherLoading=!1,this.weatherError=!1,this.weatherErrorMessage="",this.fetchingImageUrls=!1,this.updateTime(),this.timer=window.setInterval(()=>{this.updateTime()},1e3)}connectedCallback(){super.connectedCallback(),this.fetchImageUrls(),this.config.showWeather&&(this.fetchWeatherData(),this.weatherUpdateTimer=window.setInterval(()=>{this.fetchWeatherData()},18e5))}async fetchImageUrls(){if(!this.fetchingImageUrls){this.fetchingImageUrls=!0;try{const e=[],t=this.config.imageSource||"picsum";if("none"===t)return console.log("Image source is set to none, skipping image fetching"),this.imageUrls=[],void(this.imageStatuses=[]);if("local"!==t){const t=await this.fetchOnlineImageUrls();e.push(...t)}const i=this.config.locaBackgroundImages||this.config.backgroundImages;if(i&&i.length>0){const t=await this.fetchLocalImageUrls();e.push(...t)}"local"===t&&e.length>0&&(this.shuffleArray(e),console.log("Shuffled local image URLs for random starting order")),this.imageUrls=e,this.imageStatuses=e.map(e=>({url:e,loaded:!1,loading:!1,error:!1})),console.log(`Collected ${e.length} image URLs for lazy loading`),e.length>0&&(this.setupImageRotation(),this.loadCurrentImage())}catch(e){console.error("Error fetching image URLs:",e)}finally{this.fetchingImageUrls=!1}}}async fetchOnlineImageUrls(){try{const e=this.config.imageSource||this.config.onlineImageSource||"picsum",t=le(e);if(!t)return console.error(`Image source '${e}' not found.`),[];const i={...t.getDefaultConfig(),...this.config.imageConfig||this.config.onlineImageConfig||{}};console.log(`Fetching image URLs from ${t.name} with config:`,i);const s=await t.fetchImages(i);return s.length>0?(console.log(`Successfully fetched ${s.length} image URLs from ${t.name}`),s):(console.warn(`Could not fetch any image URLs from ${t.name}.`),[])}catch(e){return console.error("Error in fetchOnlineImageUrls:",e),[]}}async fetchLocalImageUrls(){try{const e=le("local");if(!e)return console.error("Local image source not found. This should not happen."),[];const t=this.config.locaBackgroundImages||this.config.backgroundImages||[],i={...e.getDefaultConfig(),images:t};console.log("Fetching image URLs from Local Images source with config:",i);const s=await e.fetchImages(i);return s.length>0?(console.log(`Successfully fetched ${s.length} image URLs from Local Images source`),s):(console.warn("No local image URLs found in configuration."),[])}catch(e){return console.error("Error in fetchLocalImageUrls:",e),[]}}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer),this.preloadTimer&&clearTimeout(this.preloadTimer),this.imageUrls.length>0&&(this.imageRotationTimer=window.setInterval(()=>{this.currentImageIndex=(this.currentImageIndex+1)%this.imageUrls.length,this.loadCurrentImage()},1e3*(this.config.backgroundRotationInterval||90)),this.scheduleNextImagePreload())}loadCurrentImage(){if(0===this.imageUrls.length||this.currentImageIndex>=this.imageUrls.length)return;const e=this.imageUrls[this.currentImageIndex],t=this.imageStatuses[this.currentImageIndex];if(t.loaded||t.loading)return this.currentImageUrl=e,void this.requestUpdate();this.imageStatuses[this.currentImageIndex]={...t,loading:!0},console.log(`Loading image: ${e}`);const i=new Image;i.onload=()=>{console.log(`Image loaded successfully: ${e}`),this.imageStatuses[this.currentImageIndex]={...this.imageStatuses[this.currentImageIndex],loaded:!0,loading:!1,error:!1},this.currentImageUrl=e,this.consecutiveFailures=0,this.requestUpdate()},i.onerror=()=>{console.error(`Error loading image: ${e}`),this.imageStatuses[this.currentImageIndex]={...this.imageStatuses[this.currentImageIndex],loaded:!1,loading:!1,error:!0},this.tryNextImage()},i.src=e}tryNextImage(){if(this.consecutiveFailures++,this.consecutiveFailures>=5)return console.warn(`Too many consecutive image loading failures (${this.consecutiveFailures}). Stopping retry attempts.`),void this.tryFallbackImageSource();if(!this.isRetrying&&this.imageUrls.length>1){this.isRetrying=!0;const e=Math.min(1e3*Math.pow(2,this.consecutiveFailures-1),3e4);console.log(`Scheduling next image load attempt in ${e}ms (failure #${this.consecutiveFailures})`),setTimeout(()=>{this.currentImageIndex=(this.currentImageIndex+1)%this.imageUrls.length,this.isRetrying=!1,this.loadCurrentImage()},e)}}tryFallbackImageSource(){"none"!==this.config.imageSource&&"local"!==this.config.imageSource&&"picsum"!==this.config.imageSource&&(console.log("Switching to Picsum as fallback image source"),this.config={...this.config,imageSource:"picsum",onlineImageSource:"picsum",useOnlineImages:!0},this.consecutiveFailures=0,this.isRetrying=!1,this.fetchImageUrls())}scheduleNextImagePreload(){this.preloadTimer&&clearTimeout(this.preloadTimer),this.preloadTimer=window.setTimeout(()=>{this.preloadNextImage()},5e3)}preloadNextImage(){if(this.imageUrls.length<=1)return;const e=(this.currentImageIndex+1)%this.imageUrls.length,t=this.imageStatuses[e];if(t.loaded||t.loading)return;if(this.consecutiveFailures>=5)return void console.warn(`Skipping preload due to too many consecutive failures (${this.consecutiveFailures})`);this.imageStatuses[e]={...t,loading:!0};const i=this.imageUrls[e];console.log(`Preloading next image: ${i}`);const s=new Image;s.onload=()=>{console.log(`Next image preloaded successfully: ${i}`),this.imageStatuses[e]={...this.imageStatuses[e],loaded:!0,loading:!1,error:!1},this.consecutiveFailures=0},s.onerror=()=>{console.error(`Error preloading next image: ${i}`),this.imageStatuses[e]={...this.imageStatuses[e],loaded:!1,loading:!1,error:!0}},s.src=i}disconnectedCallback(){super.disconnectedCallback(),this.timer&&clearInterval(this.timer),this.imageRotationTimer&&clearInterval(this.imageRotationTimer),this.preloadTimer&&clearTimeout(this.preloadTimer),this.weatherUpdateTimer&&clearInterval(this.weatherUpdateTimer)}async fetchWeatherData(){if(!this.weatherLoading&&this.config.showWeather){this.weatherLoading=!0,this.weatherError=!1,this.weatherErrorMessage="";try{const t=this.config.weatherProvider||"openweathermap",i=(e=t,de.getProvider(e));if(!i)throw new Error(`Weather provider '${t}' not found`);const s=this.config.weatherConfig||{};this.weatherData=await i.fetchWeather(s),console.log(`Fetched weather data from ${i.name}:`,this.weatherData)}catch(e){this.weatherError=!0,this.weatherErrorMessage=e instanceof Error?e.message:String(e),console.error("Error fetching weather data:",e)}finally{this.weatherLoading=!1}var e}}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");let t=e.imageSource;void 0===t&&(t=!0===e.useOnlineImages?e.onlineImageSource||"picsum":!1===e.useOnlineImages&&e.backgroundImages&&e.backgroundImages.length>0?"local":"none");let i=e.imageConfig||e.onlineImageConfig||{};const s=e.locaBackgroundImages||e.backgroundImages||[];this.config={...e,timeFormat:e.timeFormat||{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:e.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:t,imageConfig:i,locaBackgroundImages:s,backgroundImages:s,useOnlineImages:"none"!==t&&"local"!==t,onlineImageSource:t,onlineImageConfig:i,backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],sensorEntity:e.sensorEntity||"",sensorLabel:e.sensorLabel||"",fontColor:e.fontColor||"#FFFFFF"},!this.config.sensorEntity||this.config.sensors&&0!==this.config.sensors.length||(this.config.sensors=[{entity:this.config.sensorEntity,label:this.config.sensorLabel}]),this.currentImageIndex=0,this.imageUrls=[],this.imageStatuses=[],this.currentImageUrl="",this.fetchImageUrls(),this.updateTime(),this.hass&&this.config.sensorEntity&&this.updateSensorValue()}updated(e){e.has("hass")&&(this.config.sensors&&this.config.sensors.length>0||this.config.sensorEntity)&&this.updateSensorValue()}updateSensorValue(){if(this.hass)if(this.sensorValues=[],this.config.sensors&&this.config.sensors.length>0&&this.config.sensors.forEach(e=>{if(e.entity&&this.hass.states[e.entity]){const t=this.hass.states[e.entity];let i=t.state;t.attributes&&t.attributes.unit_of_measurement&&(i+=` ${t.attributes.unit_of_measurement}`),this.sensorValues.push({entity:e.entity,label:e.label,value:i})}else e.entity&&this.sensorValues.push({entity:e.entity,label:e.label,value:"unavailable"})}),this.config.sensorEntity&&this.hass.states[this.config.sensorEntity]){const e=this.hass.states[this.config.sensorEntity];let t=e.state;e.attributes&&e.attributes.unit_of_measurement&&(t+=` ${e.attributes.unit_of_measurement}`),this.legacySensorValue=t,0===this.sensorValues.length&&this.sensorValues.push({entity:this.config.sensorEntity,label:this.config.sensorLabel,value:t})}else this.config.sensorEntity&&(this.legacySensorValue="unavailable",0===this.sensorValues.length&&this.sensorValues.push({entity:this.config.sensorEntity,label:this.config.sensorLabel,value:"unavailable"}))}updateTime(){const e=new Date;this.currentTime=e.toLocaleTimeString([],this.config.timeFormat),this.hours=e.getHours().toString().padStart(2,"0"),this.minutes=e.getMinutes().toString().padStart(2,"0"),this.seconds=e.getSeconds().toString().padStart(2,"0"),this.currentDate=e.toLocaleDateString([],this.config.dateFormat)}static get styles(){return te`
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
        z-index: 1;
        border-radius: var(--ha-card-border-radius, 4px);
      }

      .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        z-index: 2;
        border-radius: var(--ha-card-border-radius, 4px);
      }


      .clock {
        font-size: 12rem;
        line-height: 10rem;
        font-weight: 300;
        text-align: center;
        z-index: 3;
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }

      .hours-minutes {
        font-size: 1em;
        line-height: 1;
      }

      .seconds {
        font-size: 0.5em;
        font-weight: 400;
        line-height: 1;
        vertical-align: top;
        margin-left: 0.1em;
        margin-top: 0.1em;
      }

      .date {
        font-size: 4rem;
        font-weight: 400;
        text-align: center;
        margin-top: 0.2rem;
        opacity: 1;
        z-index: 3;
        position: relative;
      }

      .sensor-container {
        position: absolute;
        top: 16px;
        left: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        z-index: 4;
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
        z-index: 4;
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
        align-items: flex-end;
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
      }

      .forecast-icon {
        width: 50px;
        height: 50px;
        margin: 0 8px;
      }

      .forecast-temp {
        font-size: 1.4rem;
        font-weight: 400;
      }

      .weather-error {
        color: #f44336;
        font-size: 1rem;
      }

      /* Responsive adjustments */
      @media (min-width: 600px) {
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
      }
    `}render(){return A`
      <ha-card style="color: ${this.config.fontColor};">
        ${this.currentImageUrl?A`
            <img 
              class="background-image" 
              src="${this.currentImageUrl}" 
              @load="${()=>console.log("Background image rendered successfully:",this.currentImageUrl)}"
              @error="${e=>console.error("Error rendering background image:",this.currentImageUrl,e)}"
            >
            <div 
              class="background-overlay" 
              style="opacity: ${void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5};"
            ></div>
          `:""}
        ${this.sensorValues.length>0?A`<div class="sensor-container" style="color: ${this.config.fontColor};">
            ${this.sensorValues.map(e=>A`
              <div class="sensor-item">
                ${e.label?A`<div class="sensor-label" style="color: ${this.config.fontColor};">${e.label}</div>`:""}
                <div class="sensor-value" style="color: ${this.config.fontColor};">${e.value}</div>
              </div>
            `)}
          </div>`:""}
        ${this.config.showWeather&&this.weatherData?A`<div class="weather-container" style="color: ${this.config.fontColor};">
            ${this.renderWeatherContent()}
          </div>`:""}
        <div class="clock" style="color: ${this.config.fontColor};">
          <span class="hours-minutes" style="color: ${this.config.fontColor};">${this.hours}:${this.minutes}</span>
          <span class="seconds" style="color: ${this.config.fontColor};">${this.seconds}</span>
        </div>
        <div class="date" style="color: ${this.config.fontColor};">${this.currentDate}</div>
      </ha-card>
    `}renderWeatherContent(){if(this.weatherError)return A`<div class="weather-error">${this.weatherErrorMessage}</div>`;if(!this.weatherData)return A`<div class="weather-loading">Loading weather data...</div>`;const e=this.config.weatherDisplayMode||"both",t=this.config.weatherForecastDays||3,i=this.config.weatherTitle||"Weather",s=Math.min(t,this.weatherData.daily.length);return A`
      <div class="weather-title" style="color: ${this.config.fontColor};">${i}</div>

      ${"current"===e||"both"===e?A`
          <div class="weather-current">
            <div class="weather-temp-container">
              <img class="weather-icon" src="${this.weatherData.current.icon}" alt="${this.weatherData.current.condition}">
              <div class="weather-temp">${Math.round(this.weatherData.current.temperature)}°</div>              
            </div>
            <div class="weather-condition">${this.weatherData.current.condition}</div>
          </div>
        `:""}

      ${"forecast"===e||"both"===e?A`
          <div class="weather-forecast">
            ${this.weatherData.daily.slice(0,s).map(e=>A`
              <div class="forecast-day">
                <div class="forecast-date">${this.formatForecastDate(e.date)}</div>
                <img class="forecast-icon" src="${e.icon}" alt="${e.condition}">
                <div class="forecast-temp">${Math.round(e.temperatureMin)}° - ${Math.round(e.temperatureMax)}°</div>
              </div>
            `)}
          </div>
        `:""}
    `}formatForecastDate(e){var t;const i=(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.language)||"cs";return e.toLocaleDateString("cs"===i?"cs-CZ":"en-US",{weekday:"short"})}};ye([Y({type:Object})],_e.prototype,"hass",void 0),ye([Y({type:String})],_e.prototype,"currentTime",void 0),ye([Y({type:String})],_e.prototype,"currentDate",void 0),ye([Y({type:Object})],_e.prototype,"config",void 0),ye([Y({type:Number})],_e.prototype,"currentImageIndex",void 0),ye([Y({type:Array})],_e.prototype,"imageUrls",void 0),ye([Y({type:Array})],_e.prototype,"imageStatuses",void 0),ye([Y({type:String})],_e.prototype,"currentImageUrl",void 0),ye([Y({type:Array})],_e.prototype,"sensorValues",void 0),ye([Y({type:String})],_e.prototype,"legacySensorValue",void 0),ye([Y({type:String})],_e.prototype,"hours",void 0),ye([Y({type:String})],_e.prototype,"minutes",void 0),ye([Y({type:String})],_e.prototype,"seconds",void 0),ye([Y({type:Number})],_e.prototype,"consecutiveFailures",void 0),ye([Y({type:Boolean})],_e.prototype,"isRetrying",void 0),ye([Y({type:Object})],_e.prototype,"weatherData",void 0),ye([Y({type:Boolean})],_e.prototype,"weatherLoading",void 0),ye([Y({type:Boolean})],_e.prototype,"weatherError",void 0),ye([Y({type:String})],_e.prototype,"weatherErrorMessage",void 0),_e=ye([K("wall-clock-card")],_e),customElements.define("wall-clock-card",_e),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
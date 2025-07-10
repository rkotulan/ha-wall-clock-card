/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,s=`\x3c!--${i}--\x3e`,o=new RegExp(`${i}|${s}`),a="$lit$";class n{constructor(e,t){this.parts=[],this.element=t;const s=[],n=[],l=document.createTreeWalker(t.content,133,null,!1);let d=0,u=-1,g=0;const{strings:p,values:{length:m}}=e;for(;g<m;){const e=l.nextNode();if(null!==e){if(u++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)r(t[e].name,a)&&s++;for(;s-- >0;){const t=p[g],i=h.exec(t)[2],s=i.toLowerCase()+a,n=e.getAttribute(s);e.removeAttribute(s);const r=n.split(o);this.parts.push({type:"attribute",index:u,name:i,strings:r}),g+=r.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,n=t.split(o),l=n.length-1;for(let t=0;t<l;t++){let s,o=n[t];if(""===o)s=c();else{const e=h.exec(o);null!==e&&r(e[2],a)&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),s=document.createTextNode(o)}i.insertBefore(s,e),this.parts.push({type:"node",index:++u})}""===n[l]?(i.insertBefore(c(),e),s.push(e)):e.data=n[l],g+=l}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&u!==d||(u++,t.insertBefore(c(),e)),d=u,this.parts.push({type:"node",index:u}),null===e.nextSibling?e.data="":(s.push(e),u--),g++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),g++}}else l.currentNode=n.pop()}for(const e of s)e.parentNode.removeChild(e)}}const r=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(e,t){const{element:{content:i},parts:s}=e,o=document.createTreeWalker(i,133,null,!1);let a=g(s),n=s[a],r=-1,l=0;const c=[];let h=null;for(;o.nextNode();){r++;const e=o.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==n&&n.index===r;)n.index=null!==h?-1:n.index-l,a=g(s,a),n=s[a]}c.forEach(e=>e.parentNode.removeChild(e))}const u=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},g=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1},p=new WeakMap,m=e=>"function"==typeof e&&p.has(e),f={},v={};class w{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let a,n=0,r=0,c=o.nextNode();for(;n<s.length;)if(a=s[n],l(a)){for(;r<a.index;)r++,"TEMPLATE"===c.nodeName&&(i.push(c),o.currentNode=c.content),null===(c=o.nextNode())&&(o.currentNode=i.pop(),c=o.nextNode());if("node"===a.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,a.name,a.strings,this.options));n++}else this.__parts.push(void 0),n++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),_=` ${i} `;class b{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",o=!1;for(let n=0;n<e;n++){const e=this.strings[n],r=e.lastIndexOf("\x3c!--");o=(r>-1||o)&&-1===e.indexOf("--\x3e",r+1);const l=h.exec(e);t+=null===l?e+(o?_:s):e.substr(0,l.index)+l[1]+l[2]+a+l[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==y&&(t=y.createHTML(t)),e.innerHTML=t,e}}const S=e=>null===e||!("object"==typeof e||"function"==typeof e),k=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new $(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!k(e))return e}let s="";for(let o=0;o<t;o++){s+=e[o];const t=i[o];if(void 0!==t){const e=t.value;if(S(e)||!k(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||S(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class I{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):k(e)?this.__commitIterable(e):e===v?(this.value=v,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof w&&this.value.template===t)this.value.update(e.values);else{const i=new w(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const o of e)i=t[s],void 0===i&&(i=new I(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(o),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class C{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class O extends x{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends ${}let D=!1;(()=>{try{const e={get capture(){return D=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class P{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=U(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const U=e=>e&&(D?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function F(e){let t=T.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},T.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const o=e.strings.join(i);return s=t.keyString.get(o),void 0===s&&(s=new n(e,e.getTemplateElement()),t.keyString.set(o,s)),t.stringsArray.set(e.strings,s),s}const T=new Map,A=new WeakMap,E=new class{handleAttributeExpressions(e,t,i,s){const o=t[0];return"."===o?new O(e,t.slice(1),i).parts:"@"===o?[new P(e,t.slice(1),s.eventContext)]:"?"===o?[new C(e,t.slice(1),i)]:new x(e,t,i).parts}handleTextExpression(e){return new I(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const M=(e,...t)=>new b(e,t,"html",E),R=(e,t)=>`${e}--${t}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const J=e=>t=>{const s=R(t.type,e);let o=T.get(s);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},T.set(s,o));let a=o.stringsArray.get(t.strings);if(void 0!==a)return a;const r=t.strings.join(i);if(a=o.keyString.get(r),void 0===a){const i=t.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(i,e),a=new n(t,i),o.keyString.set(r,a)}return o.stringsArray.set(t.strings,a),a},z=["html","svg"],W=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const V={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},j=(e,t)=>t!==e&&(t==t||e==e),B={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:j},H="finalized";class q extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=B){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdateInternal(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||B}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(H)||e.finalize(),this[H]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=j){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||V,o="function"==typeof s?s:s.fromAttribute;return o?o(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||V.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=B){const s=this.constructor,o=s._attributeNameForProperty(e,i);if(void 0!==o){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(o):this.setAttribute(o,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const o=this.constructor;i=i||o.getPropertyOptions(e),o._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}q[H]=!0;const K=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),G=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function Z(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):G(e,t)}const Y=Element.prototype;Y.msMatchesSelector||Y.webkitMatchesSelector;const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class ee{constructor(e,t){if(t!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const te=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof ee)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new ee(i,X)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const ie={};class se extends q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!Q){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ee(String(t),X)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ie&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ie}}se.finalized=!0,se.render=(e,i,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const o=s.scopeName,a=A.has(i),n=L&&11===i.nodeType&&!!i.host,r=n&&!W.has(o),l=r?document.createDocumentFragment():i;if(((e,i,s)=>{let o=A.get(i);void 0===o&&(t(i,i.firstChild),A.set(i,o=new I(Object.assign({templateFactory:F},s))),o.appendInto(i)),o.setValue(e),o.commit()})(e,l,Object.assign({templateFactory:J(o)},s)),r){const e=A.get(l);A.delete(l);((e,t,i)=>{W.add(e);const s=i?i.element:document.createElement("template"),o=t.querySelectorAll("style"),{length:a}=o;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(s,e);const n=document.createElement("style");for(let e=0;e<a;e++){const t=o[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{z.forEach(t=>{const i=T.get(R(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),d(e,i)})})})(e);const r=s.content;i?function(e,t,i=null){const{element:{content:s},parts:o}=e;if(null==i)return void s.appendChild(t);const a=document.createTreeWalker(s,133,null,!1);let n=g(o),r=0,l=-1;for(;a.nextNode();)for(l++,a.currentNode===i&&(r=u(t),i.parentNode.insertBefore(t,i));-1!==n&&o[n].index===l;){if(r>0){for(;-1!==n;)o[n].index+=r,n=g(o,n);return}n=g(o,n)}}(i,n,r.firstChild):r.insertBefore(n,r.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const l=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){r.insertBefore(n,r.firstChild);const e=new Set;e.add(n),d(i,e)}})(o,l,e.value instanceof w?e.value.template:void 0),t(i,i.firstChild),i.appendChild(l),A.set(i,e)}!a&&n&&window.ShadyCSS.styleElement(i.host)},se.shadowRootOptions={mode:"open"};class oe{static getInstance(){return oe.instance||(oe.instance=new oe),oe.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&console.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}const ae=new class{constructor(){this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos"}async fetchImages(e){const t=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return console.log(`[picsum-source] Generated Picsum image URL: ${t}`),[t]}async GetNextImageUrl(e,t,i){console.log(`[picsum-source] GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`);const s=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return console.log(`[picsum-source] Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${s}`),s}getDefaultConfig(){return{}}};var ne,re;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(ne||(ne={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(re||(re={}));const le=[re.All,re.ClearSky,re.Clouds,re.Rain,re.Snow,re.Mist],ce=[ne.Unspecified,ne.SunriseSunset,ne.Day,ne.Night];function he(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?ne.SunriseSunset:e>=9&&e<17?ne.Day:e>=21||e<5?ne.Night:ne.Unspecified}function de(e,t){if(!e)return;const i=e.toLowerCase();for(const e of t)if(i.includes(e.toLowerCase().replace(" ","-")))return e}const ue=new class{constructor(){this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}async fetchImages(e,t){const i=this.getCurrentTimeOfDay();if(console.log(`[local-source] Current time of day: ${i}`),e.backgroundImages&&e.backgroundImages.length>0){console.log(`[local-source] Using new backgroundImages structure with ${e.backgroundImages.length} images`);let s=[];if(t&&t.current){const o=t.current.conditionUnified||re.All;console.log(`[local-source] Current weather condition: ${o}`),s=e.backgroundImages.filter(e=>(e.weather===o||e.weather===re.All)&&e.timeOfDay===i),0===s.length&&(s=e.backgroundImages.filter(e=>(e.weather===o||e.weather===re.All)&&e.timeOfDay===ne.Unspecified)),0===s.length&&(s=e.backgroundImages.filter(e=>e.weather===re.All&&e.timeOfDay===i)),0===s.length&&(s=e.backgroundImages.filter(e=>e.weather===re.All&&e.timeOfDay===ne.Unspecified))}else s=e.backgroundImages.filter(e=>e.timeOfDay===i||e.timeOfDay===ne.Unspecified);return s.length>0?(console.log(`[local-source] Found ${s.length} images matching current conditions`),s.map(e=>e.url)):(console.log("[local-source] No matching images found, returning all images"),e.backgroundImages.map(e=>e.url))}console.log("[local-source] No matching images found, falling back to default images");const s=e.images||[];return console.log(`[local-source] Found ${s.length} local images`),s}getCurrentTimeOfDay(){return he()}async GetNextImageUrl(e,t,i){var s;console.log(`[local-source] GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(console.log("[local-source] Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.lastWeather=t,this.lastTimeOfDay=i);const o=`${t}_${i}`;if(!this.imageUrlCache.has(o)||0===(null===(s=this.imageUrlCache.get(o))||void 0===s?void 0:s.length)){let s=[];if(e.backgroundImages&&e.backgroundImages.length>0){console.log(`[local-source] Using backgroundImages structure with ${e.backgroundImages.length} images`);const o=e.backgroundImages.filter(e=>!(e.weather!==t&&e.weather!==re.All||e.timeOfDay!==i&&e.timeOfDay!==ne.Unspecified));if(o.length>0)s=o.map(e=>e.url),console.log(`[local-source] Found ${s.length} images matching weather: ${t}, timeOfDay: ${i}`);else{const t=e.backgroundImages.filter(e=>e.weather===re.All);t.length>0?(s=t.map(e=>e.url),console.log(`[local-source] Found ${s.length} images with 'all' weather`)):(s=e.backgroundImages.map(e=>e.url),console.log(`[local-source] No matching images found, using all ${s.length} images`))}}else e.images&&e.images.length>0&&(s=e.images,console.log(`[local-source] Using simple images array with ${s.length} images`));this.shuffleArray(s),console.log(`[local-source] Shuffled ${s.length} images for random order`),this.imageUrlCache.set(o,s)}const a=this.imageUrlCache.get(o)||[];if(0===a.length)return console.warn(`[local-source] No images available for weather: ${t}, timeOfDay: ${i}`),"";const n=a[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%a.length,console.log(`[local-source] Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${n}`),n}getDefaultConfig(){return{backgroundImages:[],images:[]}}},ge=new class{constructor(){this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.collections={nature:["3330448","4378039","1319040","3694365"],water:["3694365","1053828","2411979","981639"],architecture:["3348849","4468022","3348849","922312"],city:["3470372","1079798","2563","1110498"],landscape:["4466935","3694365","827743","2422483"],animals:["3106804","1242150","139386","162213"],food:["3687999","2059134","2489501","2252258"],travel:["3349809","3356576","2476111","1901880"],people:["3641869","4468022","181581","139941"],technology:["4587649","8761738","2059134","1263277"],abstract:["4587649","8761738","2059134","1263277"],space:["2022043","2159937","2506084","531563"],interior:["1118894","4466935","3330452","4468022"],flowers:["2411979","827743","1079798","3694365"],dark:["4466935","3694365","827743","2422483"],light:["4466935","3694365","827743","2422483"],minimal:["4466935","3694365","827743","2422483"],colorful:["4466935","3694365","827743","2422483"],black:["4466935","3694365","827743","2422483"],white:["4466935","3694365","827743","2422483"],red:["4466935","3694365","827743","2422483"],blue:["4466935","3694365","827743","2422483"],green:["4466935","3694365","827743","2422483"],yellow:["4466935","3694365","827743","2422483"],orange:["4466935","3694365","827743","2422483"],purple:["4466935","3694365","827743","2422483"],pink:["4466935","3694365","827743","2422483"],brown:["4466935","3694365","827743","2422483"],gray:["4466935","3694365","827743","2422483"],"black-and-white":["4466935","3694365","827743","2422483"]},this.defaultCollections=["3694365","1053828","4466935","3348849"]}async fetchImages(e,t){const i=e.count||5;let s=e.category||"";const o=e.apiKey||"",a=[],n=this.getCurrentTimeOfDay();if(console.log(`[unsplash-source] Current time of day: ${n}`),t&&t.current){const e=t.current.condition.toLowerCase();console.log(`[unsplash-source] Current weather condition: ${e}`),console.log(`[unsplash-source] Using category with weather and time: ${s}`)}if(o)try{return console.log("[unsplash-source] Using official Unsplash API"),await this.fetchImagesFromApi(o,s,i,t,e)}catch(e){console.error("[unsplash-source] Error fetching images from Unsplash API:",e),console.log("[unsplash-source] Falling back to direct URL method")}console.log("[unsplash-source] Using direct URL method for Unsplash images");const r=s.split(",").map(e=>e.trim().toLowerCase());console.log(`[unsplash-source] Categories for direct URL method: ${r.join(", ")}`);let l=[];r.forEach(e=>{this.collections[e]&&(l=[...l,...this.collections[e]])}),0===l.length?(console.log("[unsplash-source] No matching collections found, using default collections"),l=this.defaultCollections):console.log(`[unsplash-source] Using collection IDs: ${l.join(", ")}`);for(let e=0;e<i;e++)try{const t=`https://source.unsplash.com/collection/${l[Math.floor(Math.random()*l.length)]}/1920x1080/?sig=${Date.now()+e}`;console.log(`[unsplash-source] Generated direct URL (${e+1}/${i}): ${t}`),a.push(t)}catch(t){console.warn(`[unsplash-source] Failed to generate Unsplash image URL (attempt ${e+1}/${i})`,t)}return a}async fetchImagesFromApi(e,t,i,s,o){const a=[],n=(null==o?void 0:o.contentFilter)||"high";let r="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(r=e[0]),e.length>1&&(r+=` ${e.slice(1).join(" ")}`),console.log(`[unsplash-source] Using categories: ${e.join(", ")}`)}if(s&&s.current){const e=s.current.condition.toLowerCase(),t=Math.round(s.current.temperature);r+=` ${e}`,t<0?r+=" cold freezing snow ice":t>25&&(r+=" hot summer warm");const i=this.getCurrentTimeOfDay();"sunrise-sunset"===i?r+=" sunrise sunset dawn dusk":"day"===i?r+=" daylight midday day":"night"===i&&(r+=" night dark stars moonlight"),console.log(`[unsplash-source] Enhanced query with weather data: ${r}`),console.log(`[unsplash-source] Weather condition: ${e}, Temperature: ${t}°C, Time of day: ${i}`)}try{let t="https://api.unsplash.com/photos/random?";const s=new URLSearchParams({client_id:e,count:i.toString(),orientation:"landscape",content_filter:n});r&&s.append("query",r);const o=new URLSearchParams(s);o.delete("client_id"),o.append("client_id","***API_KEY_HIDDEN***"),console.log(`[unsplash-source] API parameters: ${o.toString()}`),t+=s.toString();const l=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");console.log(`[unsplash-source] Making API request to: ${l}`);const c=await fetch(t);if(!c.ok)throw console.error(`[unsplash-source] API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();console.log(`[unsplash-source] API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";a.push(t)}),console.log(`[unsplash-source] Fetched ${a.length} images from Unsplash API`)}catch(e){throw console.error("[unsplash-source] Error fetching from Unsplash API:",e),e}return a}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",useApi:!0,contentFilter:"high"}}getCategories(){return Object.keys(this.collections)}getCurrentTimeOfDay(){return he()}async GetNextImageUrl(e,t,i){var s;console.log(`[unsplash-source] GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(console.log("[unsplash-source] Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.lastWeather=t,this.lastTimeOfDay=i);const o=`${t}_${i}`;if(!this.imageUrlCache.has(o)||0===(null===(s=this.imageUrlCache.get(o))||void 0===s?void 0:s.length)){let s=e.category||"";const a={current:{condition:t.toString(),temperature:20}},n={...e,category:s},r=await this.fetchImages(n,a);this.imageUrlCache.set(o,r),console.log(`[unsplash-source] Cached ${r.length} images for weather: ${t}, timeOfDay: ${i}`)}const a=this.imageUrlCache.get(o)||[];if(0===a.length)return console.warn(`[unsplash-source] No images available for weather: ${t}, timeOfDay: ${i}`),"";const n=a[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%a.length,console.log(`[unsplash-source] Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${n}`),n}},pe=new class{constructor(){this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.entityId=null}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}async checkEntity(e){try{const t=window.document.querySelector("home-assistant").hass;if(!t)return void console.warn("[sensor-source] Could not get Home Assistant instance");const i=t.states[e];if(!i)return void console.warn(`[sensor-source] Entity ${e} not found`);this.updateCacheFromEntity(i),this.entityId=e,console.log(`[sensor-source] Checked entity ${e}`)}catch(e){console.error("[sensor-source] Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)?(this.cachedImages=t,this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),console.log(`[sensor-source] Updated cache with ${t.length} images from entity ${this.entityId}`)):console.warn(`[sensor-source] Entity ${this.entityId} does not have a valid files attribute`)}async fetchImages(e,t){const i=e.entity;if(!i)return console.warn("[sensor-source] No entity ID provided for Sensor image source"),[];await this.checkEntity(i);const s=Date.now();if(this.cachedImages.length>0&&s-this.lastFetchTime<this.refreshInterval)return console.log(`[sensor-source] Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t);try{const e=window.document.querySelector("home-assistant").hass;if(!e)return console.warn("[sensor-source] Could not get Home Assistant instance"),[];const s=e.states[i];return s?(this.updateCacheFromEntity(s),this.filterImagesByWeatherAndTime(this.cachedImages,t)):(console.warn(`[sensor-source] Sensor ${i} not found`),[])}catch(e){return console.error("[sensor-source] Error fetching images from sensor:",e),[]}}filterImagesByWeatherAndTime(e,t){if(0===e.length)return[];const i=this.getCurrentTimeOfDay();if(console.log(`[sensor-source] Current time of day: ${i}`),t&&t.current&&t.current.conditionUnified){const s=t.current.conditionUnified;console.log(`[sensor-source] Current weather condition: ${s}`);let o=[];if(o=e.filter(e=>{const t=de(e,le),o=de(e,ce);return!(t!==s&&t!==re.All&&t||o!==i&&o)}),o.length>0)return console.log(`[sensor-source] Found ${o.length} images matching current conditions`),o}else t?t.current?console.log("[sensor-source] Weather data has no unified condition, skipping weather-based filtering"):console.log("[sensor-source] Weather data has no current condition, skipping weather-based filtering"):console.log("[sensor-source] No weather data available, skipping weather-based filtering");return console.log("[sensor-source] No matching images found, returning all images"),e}getCurrentTimeOfDay(){return he()}async GetNextImageUrl(e,t,i){var s;console.log(`[sensor-source] GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(console.log("[sensor-source] Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.lastWeather=t,this.lastTimeOfDay=i);const o=`${t}_${i}`;if(!this.imageUrlCache.has(o)||0===(null===(s=this.imageUrlCache.get(o))||void 0===s?void 0:s.length)){const s=await this.fetchImages(e),a=s.filter(e=>{const s=de(e,le),o=de(e,ce);return!(s!==t&&s!==re.All&&s||o!==i&&o)}),n=a.length>0?a:s;this.shuffleArray(n),console.log(`[sensor-source] Shuffled ${n.length} images for random order`),this.imageUrlCache.set(o,n),console.log(`[sensor-source] Cached ${n.length} images for weather: ${t}, timeOfDay: ${i}`)}const a=this.imageUrlCache.get(o)||[];if(0===a.length)return console.warn(`[sensor-source] No images available for weather: ${t}, timeOfDay: ${i}`),"";const n=a[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%a.length,console.log(`[sensor-source] Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${n}`),n}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},me=oe.getInstance();function fe(e){return me.getSource(e)}me.register(ae),me.register(ue),me.register(ge),me.register(pe);class ve{static getInstance(){return ve.instance||(ve.instance=new ve),ve.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&console.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const we=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeather(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,i=e.longitude||14.4378,s=e.units||"metric",o=e.language||"cs";try{const a=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${i}&units=${s}&lang=${o}&appid=${e.apiKey}`;console.log("[OpenWeatherMap] "+a);const n=await fetch(a);if(!n.ok)throw new Error(`OpenWeatherMap API error: ${n.statusText}`);const r=await n.json();if(!r.list||!r.list.length)throw new Error("No forecast data available");const l=r.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},d=new Map;return r.list.forEach(e=>{var t;const i=new Date(1e3*e.dt).toISOString().split("T")[0];d.has(i)||d.set(i,[]),null===(t=d.get(i))||void 0===t||t.push(e)}),{current:h,daily:Array.from(d.entries()).map(([e,t])=>{const i=t.map(e=>e.main.temp),s=Math.min(...i),o=Math.max(...i),a=t[Math.floor(t.length/2)]||t[0],n=t.filter(e=>void 0!==e.pop).map(e=>e.pop),r=n.length>0?n.reduce((e,t)=>e+t,0)/n.length*100:0;return{date:new Date(e),temperatureMin:s,temperatureMax:o,condition:a.weather[0].description,icon:this.getIconUrl(a.weather[0].icon),precipitation:r,humidity:a.main.humidity,windSpeed:a.wind.speed}})}}catch(e){throw console.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"cs"}}getIconUrl(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){switch(e.toLowerCase()){case"clear":case"clear sky":return re.ClearSky;case"few clouds":case"scattered clouds":case"broken clouds":case"clouds":return re.Clouds;case"fog":case"haze":case"dust":case"smoke":case"mist":return re.Mist;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":return re.Rain;case"tornado":case"windy":case"all":default:return re.All;case"snow":return re.Snow}}},ye=ve.getInstance();ye.register(we);class _e{static getInstance(){return _e.instance||(_e.instance=new _e),_e.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&console.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const be=new class{constructor(){this.id="idsjmk",this.name="IDSJMK (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportation(e,t){try{if(0===t.length)throw new Error("No stops configured");const i={};for(const e of t){const t=String(e.stopId);i[t]||(i[t]=[]),i[t].push(e)}const s=[];for(const t of Object.keys(i)){const o=i[t],a=o.map(e=>e.postId),n=`https://mapa.idsjmk.cz/api/departures?stopid=${t}`,r=await fetch(n,{headers:{"User-Agent":"cz.zolex.iris/6.7.5 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!r.ok)throw new Error(`Failed to fetch transportation data: ${r.status} ${r.statusText}`);const l=await r.json();if(l.Error)throw new Error(`API error: ${l.Error}`);for(const i of a){const a=l.PostList.find(e=>e.PostID===i);if(!a){console.warn(`No platform found with postId ${i} for stopId ${t}`);continue}const n=a.Name,r=o.find(e=>e.postId===i);if(!r)continue;const c=r.name||n,h=e.maxDepartures||2,d=a.Departures.slice(0,Math.min(h,5)).map(e=>({lineId:e.LineId,lineName:e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:c,postId:i}));s.push(...d)}}return{departures:s,loading:!1}}catch(e){return console.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}},Se=_e.getInstance();Se.register(be);const ke={cs:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),de:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),sk:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),pl:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),es:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),fr:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),ru:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}'),it:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),pt:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),nl:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),sv:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),no:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),da:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),fi:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),el:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),hu:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}'),ro:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')};let xe={};var $e,Ie,Ce;(Ce=$e||($e={})).language="language",Ce.system="system",Ce.comma_decimal="comma_decimal",Ce.decimal_comma="decimal_comma",Ce.space_comma="space_comma",Ce.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Ie||(Ie={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var Oe=function(e,t,i,s){s=s||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,e.dispatchEvent(o),o};new Set(["call-service","divider","section","weblink","cast","select"]);var Ne=function(e,t,i,s){var o,a=arguments.length,n=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let De=class extends se{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._timeFormatOptions={hour12:[{value:!0,label:"12-hour"},{value:!1,label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:void 0,label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:void 0,label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:void 0,label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:void 0,label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2023)"},{value:"2-digit",label:"2-digit (23)"},{value:void 0,label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._languageOptions=[],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback(),this._languageOptions=[{value:"cs",label:"Czech (Čeština)"},{value:"da",label:"Danish (Dansk)"},{value:"de",label:"German (Deutsch)"},{value:"el",label:"Greek (Ελληνικά)"},{value:"es",label:"Spanish (Español)"},{value:"fi",label:"Finnish (Suomi)"},{value:"fr",label:"French (Français)"},{value:"hu",label:"Hungarian (Magyar)"},{value:"it",label:"Italian (Italiano)"},{value:"nl",label:"Dutch (Nederlands)"},{value:"no",label:"Norwegian (Norsk)"},{value:"pl",label:"Polish (Polski)"},{value:"pt",label:"Portuguese (Português)"},{value:"ro",label:"Romanian (Română)"},{value:"ru",label:"Russian (Русский)"},{value:"sk",label:"Slovak (Slovenčina)"},{value:"sv",label:"Swedish (Svenska)"}]}_getTransportationProviderOptions(){return[...Se.getAllProviders().map(e=>({value:e.id,label:e.name}))]}setConfig(e){const t=e;let i=t.imageSource;if(void 0===i&&(i=!0===t.useOnlineImages?t.onlineImageSource||"picsum":!1===t.useOnlineImages&&t.backgroundImages&&t.backgroundImages.length>0?"local":"none"),Array.isArray(t.backgroundImages)&&t.backgroundImages.length>0&&"string"==typeof t.backgroundImages[0]){const e=[];for(const i of t.backgroundImages)"string"==typeof i&&e.push({url:i,weather:re.All,timeOfDay:ne.Unspecified});t.backgroundImages=e}this._config={...t,timeFormat:t.timeFormat||{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:t.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:i,imageConfig:t.imageConfig||t.onlineImageConfig||{},useOnlineImages:"none"!==i&&"local"!==i,backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",showWeather:void 0!==t.showWeather&&t.showWeather,weatherProvider:t.weatherProvider||"openweathermap",weatherConfig:t.weatherConfig||{},weatherDisplayMode:t.weatherDisplayMode||"both",weatherForecastDays:t.weatherForecastDays||3,transportation:t.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops()}_loadSensors(){var e,t;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:(null===(t=this._config)||void 0===t?void 0:t.sensorEntity)?this._sensors=[{entity:this._config.sensorEntity,label:this._config.sensorLabel||""}]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,Oe(this,"config-changed",{config:e})}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,i)=>i!==e),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,Oe(this,"config-changed",{config:e})}}_sensorChanged(e,t,i){if(this._sensors=this._sensors.map((s,o)=>o===e?{...s,[t]:i}:s),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,Oe(this,"config-changed",{config:e})}}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this._config=e,Oe(this,"config-changed",{config:e})}}_removeStop(e){if(this._stops=this._stops.filter((t,i)=>i!==e),this._config&&this._config.transportation){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this._config=e,Oe(this,"config-changed",{config:e})}}_stopChanged(e,t,i){if(this._stops=this._stops.map((s,o)=>o===e?{...s,[t]:i}:s),this._config&&this._config.transportation){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this._config=e,Oe(this,"config-changed",{config:e})}}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:re.All,timeOfDay:ne.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,i)=>i!==e),this._updateBackgroundImagesConfig()}_updateBackgroundImage(e,t){this._backgroundImages=this._backgroundImages.map((i,s)=>{if(s===e){const e={...i,...t};if(t.url&&e.url){if(e.weather===re.All){const t=de(e.url,le);t&&(e.weather=t,console.log(`[editor] Auto-detected weather: ${e.weather} from URL: ${e.url}`))}if(e.timeOfDay===ne.Unspecified){const t=de(e.url,ce);t&&(e.timeOfDay=t,console.log(`[editor] Auto-detected timeOfDay: ${e.timeOfDay} from URL: ${e.url}`))}}return e}return i}),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this._config){const e=JSON.parse(JSON.stringify(this._config));e.backgroundImages=[...this._backgroundImages],this._config=e,Oe(this,"config-changed",{config:e})}}static get styles(){return te`
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
        `}render(){var e,t,i,s,o,a,n,r,l,c,h,d,u,g,p,m,f,v,w,y,_,b,S;if(!this.hass||!this._config)return M``;const k=Object.keys(this.hass.states).sort();return M`
            <div class="form-container">
                <!-- Appearance Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Appearance</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Font Color</div>
                            <div class="value">
                                <ha-textfield
                                        label="Font Color (hex, rgb, or rgba)"
                                        .value=${this._config.fontColor||"#FFFFFF"}
                                        @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.fontColor=t.value||"#FFFFFF",this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.language=t.value||"cs",this._config=i,Oe(this,"config-changed",{config:i})}}
                                >
                                    ${this._languageOptions.map(e=>M`
                                                <mwc-list-item .value=${e.value}>${e.label}
                                                </mwc-list-item>`)}
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
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour12:"true"===t.value},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour:t.value},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,minute:t.value},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        .value=${(null===(s=this._config.timeFormat)||void 0===s?void 0:s.second)||"2-digit"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,second:"undefined"===t.value?void 0:t.value},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        .value=${(null===(o=this._config.dateFormat)||void 0===o?void 0:o.weekday)||"long"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,weekday:"undefined"===t.value?void 0:t.value},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        .value=${(null===(a=this._config.dateFormat)||void 0===a?void 0:a.month)||"long"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,month:"undefined"===t.value?void 0:t.value},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        .value=${(null===(n=this._config.dateFormat)||void 0===n?void 0:n.day)||"numeric"}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,day:"undefined"===t.value?void 0:t.value},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        .value=${void 0===(null===(r=this._config.dateFormat)||void 0===r?void 0:r.year)?"undefined":null===(l=this._config.dateFormat)||void 0===l?void 0:l.year}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,year:"undefined"===t.value?void 0:t.value},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageSource=t.value,i.useOnlineImages="none"!==t.value&&"local"!==t.value,this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundOpacity="string"==typeof t.value?parseFloat(t.value):t.value,this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundRotationInterval="string"==typeof t.value?parseInt(t.value,10):t.value,this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                            ${Object.values(re).map(e=>M`
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
                                            ${Object.values(ne).map(e=>M`
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
                                            .value=${(null===(c=this._config.imageConfig)||void 0===c?void 0:c.category)||"nature"}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.category=t.value||"nature",this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                                .value=${(null===(h=this._config.imageConfig)||void 0===h?void 0:h.apiKey)||""}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.apiKey=t.value||"",this._config=i,Oe(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${(null===(d=this._config.imageConfig)||void 0===d?void 0:d.contentFilter)||"high"}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.contentFilter=t.value||"high",this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                        .value=${(null===(u=this._config.imageConfig)||void 0===u?void 0:u.entity)||""}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.entity=t.value||"",this._config=i,Oe(this,"config-changed",{config:i})}}
                                    >
                                        ${k.filter(e=>e.startsWith("sensor.")).map(e=>M`
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
                                        ${k.map(e=>M`
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
                                        @change=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.showWeather=t.checked||!1,this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherTitle=t.value||"Weather",this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherProvider=t.value||"openweathermap",this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                                .value=${(null===(g=this._config.weatherConfig)||void 0===g?void 0:g.apiKey)||""}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},apiKey:t.value||""},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                                .value=${(null===(p=this._config.weatherConfig)||void 0===p?void 0:p.latitude)||50.0755}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},latitude:parseFloat(t.value||"50.0755")},this._config=i,Oe(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <ha-textfield
                                                label="Longitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${(null===(m=this._config.weatherConfig)||void 0===m?void 0:m.longitude)||14.4378}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},longitude:parseFloat(t.value||"14.4378")},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                                .value=${(null===(f=this._config.weatherConfig)||void 0===f?void 0:f.units)||"metric"}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},units:t.value||"metric"},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherDisplayMode=t.value||"both",this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                                @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherForecastDays="string"==typeof t.value?parseInt(t.value,10):t.value,this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof t.value?parseInt(t.value,10):t.value;s=Math.max(s||30,1);const o=60*s;i.weatherUpdateInterval=o,this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                            .value=${(null===(v=this._config.transportation)||void 0===v?void 0:v.provider)||"idsjmk"}
                                            @click=${e=>{e.stopPropagation()}}
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,provider:t.value||"idsjmk"},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                            .value=${(null===(w=this._config.transportation)||void 0===w?void 0:w.maxDepartures)||2}
                                            @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,maxDepartures:"string"==typeof t.value?parseInt(t.value,10):t.value},this._config=i,this._loadStops(),Oe(this,"config-changed",{config:i})}}
                                    ></ha-slider>
                                    <span>${(null===(y=this._config.transportation)||void 0===y?void 0:y.maxDepartures)||2} departures</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Show on Demand</div>
                                <div class="value">
                                    <ha-switch
                                            .checked=${!0===(null===(_=this._config.transportation)||void 0===_?void 0:_.onDemand)}
                                            @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,onDemand:t.checked},this._config=i,Oe(this,"config-changed",{config:i})}}
                                    ></ha-switch>
                                    <span>Only show departures when clicked</span>
                                </div>
                            </div>

                            ${!0===(null===(b=this._config.transportation)||void 0===b?void 0:b.onDemand)?M`
                                <div class="row">
                                    <div class="label">Auto-Hide Timeout</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Auto-hide timeout in minutes (1-10)"
                                                type="number"
                                                min="1"
                                                max="10"
                                                .value=${(null===(S=this._config.transportation)||void 0===S?void 0:S.autoHideTimeout)||5}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof t.value?parseInt(t.value,10):t.value;s=Math.max(Math.min(s||5,10),1),i.transportation={...i.transportation,autoHideTimeout:s},this._config=i,Oe(this,"config-changed",{config:i})}}
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
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof t.value?parseInt(t.value,10):t.value;s=Math.max(s||1,1);const o=60*s;i.transportationUpdateInterval=o,this._config=i,Oe(this,"config-changed",{config:i})}}
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
        `}};Ne([Z({type:Object})],De.prototype,"hass",void 0),Ne([Z({type:Object})],De.prototype,"_config",void 0),Ne([Z({type:Array})],De.prototype,"_sensors",void 0),Ne([Z({type:Array})],De.prototype,"_backgroundImages",void 0),Ne([Z({type:Array})],De.prototype,"_stops",void 0),De=Ne([K("wall-clock-card-editor")],De);var Pe=function(e,t,i,s){var o,a=arguments.length,n=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let Ue=class extends se{constructor(){super(),this.currentTime="",this.currentDate="",this.config={},this.currentImageIndex=0,this.imageUrls=[],this.imageStatuses=[],this.currentImageUrl="",this.sensorValues=[],this.legacySensorValue="",this.hours="",this.minutes="",this.seconds="",this.ampm="",this.consecutiveFailures=0,this.isRetrying=!1,this.weatherLoading=!1,this.weatherError=!1,this.weatherErrorMessage="",this.transportationData={departures:[],loading:!1},this.transportationDataLoaded=!1,this.fetchingImageUrls=!1,console.info("%c WALL-CLOCK-CARD %c 1.19.3 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.updateTime(),this.timer=window.setInterval(()=>{this.updateTime()},1e3)}connectedCallback(){super.connectedCallback(),this.initConnectCallback()}async initConnectCallback(){var e;try{await async function(){const e=["cs","de","sk","pl","es","fr","ru","it","pt","nl","sv","no","da","fi","el","hu","ro"].map(e=>async function(e){try{ke[e]?(xe[e]=ke[e],console.log(`[lokalify] Loaded translations for ${e}`)):console.warn(`[lokalify] No embedded translations found for ${e}`)}catch(t){console.error(`[lokalify] Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),console.log("[wall-clock] Loaded translations for all languages")}catch(e){console.error("[wall-clock] Error loading translations:",e)}if(this.config.showWeather){await this.fetchWeatherData();let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;console.log(`[wall-clock] Setting weather update interval to ${e} seconds`),this.weatherUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherData()}catch(e){console.error("[wall-clock] Error in weather update interval:",e)}})()},t)}if(await this.fetchImageUrls(),this.config.transportation)if(null===(e=this.config.transportation)||void 0===e?void 0:e.onDemand)console.log("[wall-clock] Transportation on-demand loading is enabled. Data will be loaded when requested.");else{await this.fetchTransportationData(),this.transportationDataLoaded=!0;let e=this.config.transportationUpdateInterval||60;e=Math.max(e,60);const t=1e3*e;console.log(`[wall-clock] Setting transportation update interval to ${e} seconds`),this.transportationUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationData()}catch(e){console.error("[wall-clock] Error in transportation update interval:",e)}})()},t)}}async fetchImageUrls(){if(!this.fetchingImageUrls){this.fetchingImageUrls=!0;try{const e=[],t=this.config.imageSource||"picsum";if("none"===t)return console.log("[wall-clock] Image source is set to none, skipping image fetching"),this.imageUrls=[],void(this.imageStatuses=[]);const i=fe(t);if(!i)return void console.error(`[wall-clock] Image source '${t}' not found.`);const s={...i.getDefaultConfig(),...this.config.imageConfig||this.config.onlineImageConfig||{}};this.config.backgroundImages&&this.config.backgroundImages.length>0&&(s.backgroundImages=this.config.backgroundImages);let o=re.ClearSky,a=ne.Day;this.weatherData&&this.weatherData.current&&(o=this.weatherData.current.conditionUnified||re.ClearSky,a=he()),console.log(`[wall-clock] Current weather: ${o}, time of day: ${a}`);try{const t=await i.GetNextImageUrl(s,o,a);t?(e.push(t),console.log(`[wall-clock] Got image URL: ${t}`)):console.log("[wall-clock] No image URL returned, will try again in next cycle")}catch(e){console.warn("[wall-clock] Failed to get image URL, will try again in next cycle",e)}("local"===t||"sensor"===t)&&e.length>0&&(this.shuffleArray(e),console.log(`[wall-clock] Shuffled ${t} image URLs for random starting order`)),this.imageUrls=e,this.imageStatuses=e.map(e=>({url:e,loaded:!1,loading:!1,error:!1})),console.log(`[wall-clock] Collected ${e.length} image URLs for lazy loading`),e.length>0&&(this.setupImageRotation(),this.loadCurrentImage())}catch(e){console.error("[wall-clock] Error fetching image URLs:",e)}finally{this.fetchingImageUrls=!1}}}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer),this.preloadTimer&&clearTimeout(this.preloadTimer),this.imageUrls.length>0&&(this.imageRotationTimer=window.setInterval(()=>{"unsplash"===this.config.imageSource?(async()=>{try{await this.fetchNewUnsplashImage()}catch(e){console.error("[wall-clock] Error in image rotation interval for Unsplash:",e)}})():(this.currentImageIndex=(this.currentImageIndex+1)%this.imageUrls.length,this.loadCurrentImage())},1e3*(this.config.backgroundRotationInterval||90)),"unsplash"!==this.config.imageSource&&this.scheduleNextImagePreload())}async fetchNewUnsplashImage(){try{const e=fe("unsplash");if(!e)return void console.error("[wall-clock] Unsplash image source not found. This should not happen.");const t={...e.getDefaultConfig(),...this.config.imageConfig||this.config.onlineImageConfig||{}};let i=re.ClearSky,s=ne.Day;this.weatherData&&this.weatherData.current&&(i=this.weatherData.current.conditionUnified||re.ClearSky,s=he()),console.log(`[wall-clock] Fetching new image from Unsplash with weather: ${i}, time of day: ${s}`);const o=await e.GetNextImageUrl(t,i,s);if(o){console.log(`[wall-clock] Successfully fetched new image from Unsplash: ${o}`);const e={url:o,loaded:!1,loading:!1,error:!1};console.log(`[wall-clock] Loading new Unsplash image: ${o}`);const t=new Image;t.onload=()=>{console.log(`[wall-clock] New Unsplash image loaded successfully: ${o}`),e.loaded=!0,e.loading=!1,this.currentImageUrl=o,this.consecutiveFailures=0,this.requestUpdate()},t.onerror=()=>{console.error(`[wall-clock] Error loading new Unsplash image: ${o}`),e.error=!0,e.loading=!1,this.imageUrls.length>0&&(this.currentImageIndex=(this.currentImageIndex+1)%this.imageUrls.length,this.loadCurrentImage())},e.loading=!0,t.src=o}else console.warn("[wall-clock] Could not fetch new image from Unsplash. Falling back to existing images."),this.imageUrls.length>0&&(this.currentImageIndex=(this.currentImageIndex+1)%this.imageUrls.length,this.loadCurrentImage())}catch(e){console.error("[wall-clock] Error fetching new Unsplash image:",e),this.imageUrls.length>0&&(this.currentImageIndex=(this.currentImageIndex+1)%this.imageUrls.length,this.loadCurrentImage())}}loadCurrentImage(){if(0===this.imageUrls.length||this.currentImageIndex>=this.imageUrls.length)return;const e=this.imageUrls[this.currentImageIndex],t=this.imageStatuses[this.currentImageIndex];if(t.loaded||t.loading)return this.currentImageUrl=e,void this.requestUpdate();this.imageStatuses[this.currentImageIndex]={...t,loading:!0},console.log(`[wall-clock] Loading image: ${e}`);const i=new Image;i.onload=()=>{console.log(`[wall-clock] Image loaded successfully: ${e}`),this.imageStatuses[this.currentImageIndex]={...this.imageStatuses[this.currentImageIndex],loaded:!0,loading:!1,error:!1},this.currentImageUrl=e,this.consecutiveFailures=0,this.requestUpdate()},i.onerror=()=>{console.error(`[wall-clock] Error loading image: ${e}`),this.imageStatuses[this.currentImageIndex]={...this.imageStatuses[this.currentImageIndex],loaded:!1,loading:!1,error:!0},this.tryNextImage()},i.src=e}tryNextImage(){if(this.consecutiveFailures++,this.consecutiveFailures>=5)return console.warn(`[wall-clock] Too many consecutive image loading failures (${this.consecutiveFailures}). Stopping retry attempts.`),void this.tryFallbackImageSource();if(!this.isRetrying&&this.imageUrls.length>1){this.isRetrying=!0;const e=Math.min(1e3*Math.pow(2,this.consecutiveFailures-1),3e4);console.log(`[wall-clock] Scheduling next image load attempt in ${e}ms (failure #${this.consecutiveFailures})`),setTimeout(()=>{this.currentImageIndex=(this.currentImageIndex+1)%this.imageUrls.length,this.isRetrying=!1,this.loadCurrentImage()},e)}}async tryFallbackImageSource(){"none"!==this.config.imageSource&&"local"!==this.config.imageSource&&"picsum"!==this.config.imageSource&&(console.log("[wall-clock] Switching to Picsum as fallback image source"),this.config={...this.config,imageSource:"picsum",onlineImageSource:"picsum",useOnlineImages:!0},this.consecutiveFailures=0,this.isRetrying=!1,await this.fetchImageUrls())}scheduleNextImagePreload(){this.preloadTimer&&clearTimeout(this.preloadTimer),this.preloadTimer=window.setTimeout(()=>{this.preloadNextImage()},5e3)}preloadNextImage(){if(this.imageUrls.length<=1)return;const e=(this.currentImageIndex+1)%this.imageUrls.length,t=this.imageStatuses[e];if(t.loaded||t.loading)return;if(this.consecutiveFailures>=5)return void console.warn(`Skipping preload due to too many consecutive failures (${this.consecutiveFailures})`);this.imageStatuses[e]={...t,loading:!0};const i=this.imageUrls[e];console.log(`[wall-clock] Preloading next image: ${i}`);const s=new Image;s.onload=()=>{console.log(`[wall-clock] Next image preloaded successfully: ${i}`),this.imageStatuses[e]={...this.imageStatuses[e],loaded:!0,loading:!1,error:!1},this.consecutiveFailures=0},s.onerror=()=>{console.error(`[wall-clock] Error preloading next image: ${i}`),this.imageStatuses[e]={...this.imageStatuses[e],loaded:!1,loading:!1,error:!0}},s.src=i}disconnectedCallback(){super.disconnectedCallback(),this.timer&&clearInterval(this.timer),this.imageRotationTimer&&clearInterval(this.imageRotationTimer),this.preloadTimer&&clearTimeout(this.preloadTimer),this.weatherUpdateTimer&&clearInterval(this.weatherUpdateTimer),this.transportationUpdateTimer&&clearInterval(this.transportationUpdateTimer),this.transportationAutoHideTimer&&clearTimeout(this.transportationAutoHideTimer)}async fetchTransportationData(){if(this.config.transportation&&!1!==this.config.enableTransportation){this.transportationData={...this.transportationData,loading:!0,error:void 0};try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const i=(e=t.provider,Se.getProvider(e));if(!i)throw new Error(`Transportation provider '${t.provider}' not found`);const s=t.stops.map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),o=t.providerConfig||{};void 0!==t.maxDepartures&&(o.maxDepartures=t.maxDepartures),this.transportationData=await i.fetchTransportation(o,s),this.lastTransportationUpdate=new Date,console.log(`[wall-clock] Fetched transportation data from ${i.name}:`,this.transportationData)}catch(e){console.error("[wall-clock] Error fetching transportation data:",e),this.transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}var e}}async fetchWeatherData(){if(!this.weatherLoading&&this.config.showWeather){this.weatherLoading=!0,this.weatherError=!1,this.weatherErrorMessage="";try{const t=this.config.weatherProvider||"openweathermap",i=(e=t,ye.getProvider(e));if(!i)throw new Error(`Weather provider '${t}' not found`);let s=i.getDefaultConfig();this.config.weatherConfig&&(s={...s,...this.config.weatherConfig},this.config.weatherConfig.units&&(s.units=this.config.weatherConfig.units,console.log(`[wall-clock] Using weather units: ${s.units}`))),this.weatherData=await i.fetchWeather(s),console.log(`[wall-clock] Fetched weather data from ${i.name}:`,this.weatherData)}catch(e){this.weatherError=!0,this.weatherErrorMessage=e instanceof Error?e.message:String(e),console.error("[wall-clock] Error fetching weather data:",e)}finally{this.weatherLoading=!1}var e}}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.initAfterSetConfig(e)}async initAfterSetConfig(e){let t=e.imageSource;void 0===t&&(t=!0===e.useOnlineImages?e.onlineImageSource||"picsum":!1===e.useOnlineImages&&e.backgroundImages&&e.backgroundImages.length>0?"local":"none");let i=e.imageConfig||e.onlineImageConfig||{};if(Array.isArray(e.backgroundImages)&&e.backgroundImages.length>0&&"string"==typeof e.backgroundImages[0]){const t=[];for(const i of e.backgroundImages)"string"==typeof i&&t.push({url:i,weather:re.All,timeOfDay:ne.Unspecified});e.backgroundImages=t}let s={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(s={...s,...e.timeFormat},void 0!==e.timeFormat.hour12&&(s.hour12=Boolean(e.timeFormat.hour12)));let o={weekday:"long",year:"numeric",month:"long",day:"numeric"};e.dateFormat&&(o={...o,...e.dateFormat},void 0===e.dateFormat.year&&(o.year=void 0)),this.config={...e,timeFormat:s,dateFormat:o,backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:t,imageConfig:i,useOnlineImages:"none"!==t&&"local"!==t,onlineImageSource:t,onlineImageConfig:i,backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],sensorEntity:e.sensorEntity||"",sensorLabel:e.sensorLabel||"",fontColor:e.fontColor||"#FFFFFF"},!this.config.sensorEntity||this.config.sensors&&0!==this.config.sensors.length||(this.config.sensors=[{entity:this.config.sensorEntity,label:this.config.sensorLabel}]),this.currentImageIndex=0,this.imageUrls=[],this.imageStatuses=[],this.currentImageUrl="",this.config.showWeather&&await this.fetchWeatherData(),await this.fetchImageUrls(),this.updateTime(),this.hass&&this.config.sensorEntity&&this.updateSensorValue()}updated(e){e.has("hass")&&(this.config.sensors&&this.config.sensors.length>0||this.config.sensorEntity)&&this.updateSensorValue()}updateSensorValue(){if(this.hass)if(this.sensorValues=[],this.config.sensors&&this.config.sensors.length>0&&this.config.sensors.forEach(e=>{if(e.entity&&this.hass.states[e.entity]){const t=this.hass.states[e.entity];let i=t.state;t.attributes&&t.attributes.unit_of_measurement&&(i+=` ${t.attributes.unit_of_measurement}`),this.sensorValues.push({entity:e.entity,label:e.label,value:i})}else e.entity&&this.sensorValues.push({entity:e.entity,label:e.label,value:"unavailable"})}),this.config.sensorEntity&&this.hass.states[this.config.sensorEntity]){const e=this.hass.states[this.config.sensorEntity];let t=e.state;e.attributes&&e.attributes.unit_of_measurement&&(t+=` ${e.attributes.unit_of_measurement}`),this.legacySensorValue=t,0===this.sensorValues.length&&this.sensorValues.push({entity:this.config.sensorEntity,label:this.config.sensorLabel,value:t})}else this.config.sensorEntity&&(this.legacySensorValue="unavailable",0===this.sensorValues.length&&this.sensorValues.push({entity:this.config.sensorEntity,label:this.config.sensorLabel,value:"unavailable"}))}updateTime(){var e;const t=new Date;this.currentTime=t.toLocaleTimeString([],this.config.timeFormat);let i=t.getHours();if(null===(e=this.config.timeFormat)||void 0===e?void 0:e.hour12){const e=i>=12;i%=12,i=i||12,this.ampm=e?"pm":"am"}else this.ampm="";this.hours=i.toString().padStart(2,"0"),this.minutes=t.getMinutes().toString().padStart(2,"0"),this.seconds=t.getSeconds().toString().padStart(2,"0");let s=t.toLocaleDateString([],this.config.dateFormat);s=s.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this.currentDate=s}static get styles(){return te`
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
        margin-top: 0.2em;
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
    `}render(){var e;return M`
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
        ${this.sensorValues.length>0?M`<div class="sensor-container" style="color: ${this.config.fontColor};">
            ${this.sensorValues.map(e=>M`
              <div class="sensor-item">
                ${e.label?M`<div class="sensor-label" style="color: ${this.config.fontColor};">${e.label}</div>`:""}
                <div class="sensor-value" style="color: ${this.config.fontColor};">${e.value}</div>
              </div>
            `)}
          </div>`:""}
        ${this.config.showWeather&&this.weatherData?M`<div class="weather-container" style="color: ${this.config.fontColor};">
            ${this.renderWeatherContent()}
          </div>`:""}
        <div class="clock" style="color: ${this.config.fontColor}; ${this.config.transportation&&!1!==this.config.enableTransportation?`margin-top: -${30*(this.config.transportation.maxDepartures||3)+80}px;`:""}">
          <span class="hours-minutes" style="color: ${this.config.fontColor};">${this.hours}:${this.minutes}</span>
          <div class="seconds-container">
            <span class="seconds" style="color: ${this.config.fontColor};">${this.seconds}</span>
            ${this.ampm?M`<span class="ampm" style="color: ${this.config.fontColor};">${this.ampm}</span>`:""}
          </div>
        </div>
        <div class="date" style="color: ${this.config.fontColor};">${this.currentDate}</div>
        ${this.config.transportation&&!1!==this.config.enableTransportation?(null===(e=this.config.transportation)||void 0===e?void 0:e.onDemand)&&!this.transportationDataLoaded?M`<div class="transportation-on-demand-button" @click=${this._handleTransportationClick}>
              <svg viewBox="0 0 24 24">
                <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
              </svg>
            </div>`:M`<div class="transportation-container" style="color: ${this.config.fontColor};">
              ${this.renderTransportationContent()}
            </div>`:""}
      </ha-card>
    `}renderTransportationContent(){if(this.transportationData.loading)return M`<div>Loading transportation data...</div>`;if(this.transportationData.error)return M`<div class="transportation-error">${this.transportationData.error}</div>`;if(!this.transportationData.departures||0===this.transportationData.departures.length)return M`<div>No departures available</div>`;const e={};for(const t of this.transportationData.departures){const i=`${t.stopName}-${t.postId}`;e[i]||(e[i]=[]),e[i].push(t)}return M`
      <div class="transportation-departures">
        ${Object.entries(e).map(([e,t])=>{const i=t[0].stopName;return M`
            <div class="stop-group">
              <h3 class="stop-name" style="color: ${this.config.fontColor};">
                 ${i}
              </h3>
              <div class="stop-departures">
                ${t.map(e=>M`
                  <div class="departure-item">
                    <div class="departure-line" style="color: ${this.config.fontColor};">${e.lineName}</div>
                    <div class="departure-destination" style="color: ${this.config.fontColor};">→ ${e.finalStop}</div>
                    <div class="departure-time" style="color: ${this.config.fontColor};">${e.timeMark}</div>
                    ${e.isLowFloor?M`<div class="departure-lowfloor">♿</div>`:""}
                  </div>
                `)}
              </div>
            </div>
          `})}
      </div>
    `}renderWeatherContent(){if(this.weatherError)return M`<div class="weather-error">${this.weatherErrorMessage}</div>`;if(!this.weatherData||!this.weatherData.current)return M`<div class="weather-loading">Loading weather data...</div>`;const e=this.config.weatherDisplayMode||"both",t=this.config.weatherForecastDays||3,i=this.config.weatherTitle||"Weather",s=Math.min(t,this.weatherData.daily.length);return M`
      <div class="weather-title" style="color: ${this.config.fontColor};">${i}</div>

      ${"current"===e||"both"===e?M`
          <div class="weather-current">
            <div class="weather-temp-container">
              <img class="weather-icon" src="${this.weatherData.current.icon}" alt="${this.weatherData.current.condition}">
              <div class="weather-temp">${Math.round(this.weatherData.current.temperature)}°</div>              
            </div>
            <div class="weather-condition">${this.translateWeatherCondition(this.weatherData.current.condition)}</div>
          </div>
        `:""}

      ${"forecast"===e||"both"===e?M`
          <div class="weather-forecast">
            ${this.weatherData.daily.slice(0,s).map(e=>M`
              <div class="forecast-day">
                <div class="forecast-date">${this.formatForecastDate(e.date)}</div>
                <img class="forecast-icon" src="${e.icon}" alt="${e.condition}">
                <div class="forecast-temp">${Math.round(e.temperatureMin)}° - ${Math.round(e.temperatureMax)}°</div>
              </div>
            `)}
          </div>
        `:""}
    `}async _handleTransportationClick(){var e;if(console.log("[wall-clock] Transportation button clicked, loading data on demand"),await this.fetchTransportationData(),this.transportationDataLoaded=!0,this.config.transportationUpdateInterval){let e=this.config.transportationUpdateInterval||60;e=Math.max(e,60);const t=1e3*e;console.log(`[wall-clock] Setting transportation update interval to ${e} seconds`),this.transportationUpdateTimer&&clearInterval(this.transportationUpdateTimer),this.transportationUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationData()}catch(e){console.error("[wall-clock] Error in transportation update interval:",e)}})()},t)}if(null===(e=this.config.transportation)||void 0===e?void 0:e.autoHideTimeout){this.transportationAutoHideTimer&&clearTimeout(this.transportationAutoHideTimer);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));const t=60*e*1e3;console.log(`[wall-clock] Setting transportation auto-hide timeout to ${e} minutes`),this.transportationAutoHideTimer=window.setTimeout(()=>{console.log(`[wall-clock] Auto-hiding transportation departures after ${e} minutes`),this.transportationDataLoaded=!1},t)}}translateWeatherCondition(e){const t=this.config.language||(this.hass?this.hass.language:null)||"cs",i=function(e,t,i=e){if(!["cs","de","sk","pl","es","fr","ru","it","pt","nl","sv","no","da","fi","el","hu","ro"].includes(t))return null!==i?i:e;const s=xe[t];if(!s)return null!==i?i:e;const o=function(e,t){if(void 0!==e[t])return e[t];const i=t.split(".");let s=e;for(const e of i){if(null==s||"object"!=typeof s)return;s=s[e]}return s}(s,e);return"string"==typeof o?o:null!==i?i:e}(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,null);return null!==i?i:e}formatForecastDate(e){let t;switch(this.config.language||(this.hass?this.hass.language:null)||"cs"){case"cs":t="cs-CZ";break;case"de":t="de-DE";break;case"sk":t="sk-SK";break;case"pl":t="pl-PL";break;case"es":t="es-ES";break;case"fr":t="fr-FR";break;case"ru":t="ru-RU";break;default:t="en-US"}return e.toLocaleDateString(t,{weekday:"short"})}};Pe([Z({type:Object})],Ue.prototype,"hass",void 0),Pe([Z({type:String})],Ue.prototype,"currentTime",void 0),Pe([Z({type:String})],Ue.prototype,"currentDate",void 0),Pe([Z({type:Object})],Ue.prototype,"config",void 0),Pe([Z({type:Number})],Ue.prototype,"currentImageIndex",void 0),Pe([Z({type:Array})],Ue.prototype,"imageUrls",void 0),Pe([Z({type:Array})],Ue.prototype,"imageStatuses",void 0),Pe([Z({type:String})],Ue.prototype,"currentImageUrl",void 0),Pe([Z({type:Array})],Ue.prototype,"sensorValues",void 0),Pe([Z({type:String})],Ue.prototype,"legacySensorValue",void 0),Pe([Z({type:String})],Ue.prototype,"hours",void 0),Pe([Z({type:String})],Ue.prototype,"minutes",void 0),Pe([Z({type:String})],Ue.prototype,"seconds",void 0),Pe([Z({type:String})],Ue.prototype,"ampm",void 0),Pe([Z({type:Number})],Ue.prototype,"consecutiveFailures",void 0),Pe([Z({type:Boolean})],Ue.prototype,"isRetrying",void 0),Pe([Z({type:Object})],Ue.prototype,"weatherData",void 0),Pe([Z({type:Boolean})],Ue.prototype,"weatherLoading",void 0),Pe([Z({type:Boolean})],Ue.prototype,"weatherError",void 0),Pe([Z({type:String})],Ue.prototype,"weatherErrorMessage",void 0),Pe([Z({type:Object})],Ue.prototype,"transportationData",void 0),Pe([Z({type:Date})],Ue.prototype,"lastTransportationUpdate",void 0),Pe([Z({type:Boolean})],Ue.prototype,"transportationDataLoaded",void 0),Ue=Pe([K("wall-clock-card")],Ue),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
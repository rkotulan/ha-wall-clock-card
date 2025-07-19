/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const o=this.t;if(t&&void 0===e){const t=void 0!==o&&1===o.length;t&&(e=i.get(o)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(o,e))}return e}toString(){return this.cssText}}const r=e=>new n("string"==typeof e?e:e+"",void 0,o),a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new n(i,e,o)},s=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return r(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:g,getPrototypeOf:u}=Object,p=globalThis,m=p.trustedTypes,f=m?m.emptyScript:"",v=p.reactiveElementPolyfillSupport,w=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},b=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class _ extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:n}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);n?.call(this,t),this.requestUpdate(e,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...d(e),...g(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((o,i)=>{if(t)o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=t.cssText,o.appendChild(i)}})(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:y).toAttribute(t,o.type);this._$Em=e,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){const o=this.constructor,i=o._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=o.getPropertyOptions(i),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=i;const r=n.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,o){if(void 0!==e){const i=this.constructor,n=this[e];if(o??=i.getPropertyOptions(e),!((o.hasChanged??b)(n,t)||o.useDefault&&o.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:n},r){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==n||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[w("elementProperties")]=new Map,_[w("finalized")]=new Map,v?.({ReactiveElement:_}),(p.reactiveElementVersions??=[]).push("2.1.1");const C=globalThis,x=C.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+I,N=`<${A}>`,O=document,T=()=>O.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,F=e=>D(e)||"function"==typeof e?.[Symbol.iterator],E="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,M=/>/g,W=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,z=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),H=z(1),V=z(2),J=(z(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),Z=new WeakMap,K=O.createTreeWalker(O,129);function G(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const o=e.length-1,i=[];let n,r=2===t?"<svg>":3===t?"<math>":"",a=U;for(let t=0;t<o;t++){const o=e[t];let s,l,c=-1,h=0;for(;h<o.length&&(a.lastIndex=h,l=a.exec(o),null!==l);)h=a.lastIndex,a===U?"!--"===l[1]?a=R:void 0!==l[1]?a=M:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=W):void 0!==l[3]&&(a=W):a===W?">"===l[0]?(a=n??U,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?W:'"'===l[3]?L:B):a===L||a===B?a=W:a===R||a===M?a=U:(a=W,n=void 0);const d=a===W&&e[t+1].startsWith("/>")?" ":"";r+=a===U?o+N:c>=0?(i.push(s),o.slice(0,c)+k+o.slice(c)+I+d):o+I+(-2===c?t:d)}return[G(e,r+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Q{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let n=0,r=0;const a=e.length-1,s=this.parts,[l,c]=Y(e,t);if(this.el=Q.createElement(l,o),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=K.nextNode())&&s.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(k)){const t=c[r++],o=i.getAttribute(e).split(I),a=/([.?@])?(.*)/.exec(t);s.push({type:1,index:n,name:a[2],strings:o,ctor:"."===a[1]?ie:"?"===a[1]?ne:"@"===a[1]?re:oe}),i.removeAttribute(e)}else e.startsWith(I)&&(s.push({type:6,index:n}),i.removeAttribute(e));if(j.test(i.tagName)){const e=i.textContent.split(I),t=e.length-1;if(t>0){i.textContent=x?x.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],T()),K.nextNode(),s.push({type:2,index:++n});i.append(e[t],T())}}}else if(8===i.nodeType)if(i.data===A)s.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(I,e+1));)s.push({type:7,index:n}),e+=I.length-1}n++}}static createElement(e,t){const o=O.createElement("template");return o.innerHTML=e,o}}function X(e,t,o=e,i){if(t===J)return t;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const r=P(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(e),n._$AT(e,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(t=X(e,n._$AS(e,t.values),n,i)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=(e?.creationScope??O).importNode(t,!0);K.currentNode=i;let n=K.nextNode(),r=0,a=0,s=o[0];for(;void 0!==s;){if(r===s.index){let t;2===s.type?t=new te(n,n.nextSibling,this,e):1===s.type?t=new s.ctor(n,s.name,s.strings,this,e):6===s.type&&(t=new ae(n,this,e)),this._$AV.push(t),s=o[++a]}r!==s?.index&&(n=K.nextNode(),r++)}return K.currentNode=O,i}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),P(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==J&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):F(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=Q.createElement(G(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new ee(i,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new Q(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const n of e)i===t.length?t.push(o=new te(this.O(T()),this.O(T()),this,this.options)):o=t[i],o._$AI(n),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(e,t=this,o,i){const n=this.strings;let r=!1;if(void 0===n)e=X(this,e,t,0),r=!P(e)||e!==this._$AH&&e!==J,r&&(this._$AH=e);else{const i=e;let a,s;for(e=n[0],a=0;a<n.length-1;a++)s=X(this,i[o+a],t,a),s===J&&(s=this._$AH[a]),r||=!P(s)||s!==this._$AH[a],s===q?e=q:e!==q&&(e+=(s??"")+n[a+1]),this._$AH[a]=s}r&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ne extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class re extends oe{constructor(e,t,o,i,n){super(e,t,o,i,n),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===J)return;const o=this._$AH,i=e===q&&o!==q||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==q&&(o===q||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const se={M:k,P:I,A,C:1,L:Y,R:ee,D:F,V:X,I:te,H:oe,N:ne,U:re,B:ie,F:ae},le=C.litHtmlPolyfillSupport;le?.(Q,te),(C.litHtmlVersions??=[]).push("3.3.1");const ce=globalThis;class he extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const i=o?.renderBefore??t;let n=i._$litPart$;if(void 0===n){const e=o?.renderBefore??null;i._$litPart$=n=new te(t.insertBefore(T(),e),e,void 0,o??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}he._$litElement$=!0,he.finalized=!0,ce.litElementHydrateSupport?.({LitElement:he});const de=ce.litElementPolyfillSupport;de?.({LitElement:he}),(ce.litElementVersions??=[]).push("4.2.1");const ge=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},pe=(e=ue,t,o)=>{const{kind:i,metadata:n}=o;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(o.name,e),"accessor"===i){const{name:i}=o;return{set(o){const n=t.get.call(this);t.set.call(this,o),this.requestUpdate(i,n,e)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];t.call(this,o),this.requestUpdate(i,n,e)}}throw Error("Unsupported decorator location: "+i)};function me(e){return(t,o)=>"object"==typeof o?pe(e,t,o):((e,t,o)=>{const i=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),i?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}var fe;!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR",e[e.NONE=4]="NONE"}(fe||(fe={}));const ve={level:fe.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let we={...ve};const ye=[];function be(e){const t=we.level;we={...ve,...e},t!==we.level&&console.log(`[LOGGER] Log level changed from ${fe[t]} to ${fe[we.level]}`)}function $e(e,t,o,...i){var n;if(e<we.level)return;const r=function(e,t,o){const{prefix:i,enableTimestamps:n,enableSourceTracking:r}=we;let a="";return n&&(a+=`[${(new Date).toISOString()}] `),a+=`[${fe[e]}] `,i&&(a+=`[${i}] `),t&&r&&(a+=`[${t}] `),a+=o,a}(e,t,o);if(we.logToConsole)switch(e){case fe.DEBUG:console.debug(r,...i);break;case fe.INFO:console.log(r,...i);break;case fe.WARN:console.warn(r,...i);break;case fe.ERROR:console.error(r,...i)}if(we.logToStorage){let e=r;if(i.length>0)try{e+=" "+i.map(e=>"object"==typeof e?JSON.stringify(e):String(e)).join(" ")}catch(t){e+=" [Arguments could not be stringified]"}ye.push(e);const t=null!==(n=we.maxStoredLogs)&&void 0!==n?n:100;ye.length>t&&ye.splice(0,ye.length-t)}}function _e(e){return{debug:(t,...o)=>$e(fe.DEBUG,e,t,...o),info:(t,...o)=>$e(fe.INFO,e,t,...o),warn:(t,...o)=>$e(fe.WARN,e,t,...o),error:(t,...o)=>$e(fe.ERROR,e,t,...o),withSource:e=>_e(e)}}function Ce(e){switch(e.toLowerCase()){case"debug":return fe.DEBUG;case"info":return fe.INFO;case"warn":default:return fe.WARN;case"error":return fe.ERROR;case"none":return fe.NONE}}const xe=_e("wall-clock");class Se{static getInstance(){return Se.instance||(Se.instance=new Se),Se.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&xe.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}registerAll(e){e.forEach(e=>this.register(e))}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}var ke,Ie;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(ke||(ke={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(Ie||(Ie={}));const Ae=[Ie.All,Ie.ClearSky,Ie.Clouds,Ie.Rain,Ie.Snow,Ie.Mist],Ne=[ke.Unspecified,ke.SunriseSunset,ke.Day,ke.Night];function Oe(e,t){if(!e)return;const o=e.toLowerCase();for(const e of t)if(o.includes(e.toLowerCase().replace(" ","-")))return e}class Te{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return _e(`${this.id}-source`)}shuffleArray(e){for(let t=e.length-1;t>0;t--){const o=Math.floor(Math.random()*(t+1));[e[t],e[o]]=[e[o],e[t]]}}async fetchImagesAsync(e,t,o){return this.getLogger().debug(`Fetching images with weather: ${t}, timeOfDay: ${o}`),this.fetchImagesInternalAsync(e,t,o)}async getNextImageUrlAsync(e,t,o){var i;this.getLogger().debug(`GetNextImageUrl called with weather: ${t}, timeOfDay: ${o}`),this.lastWeather===t&&this.lastTimeOfDay===o||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=t,this.lastTimeOfDay=o);const n=`${t}_${o}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(n)||0===(null===(i=this.imageUrlCache.get(n))||void 0===i?void 0:i.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const i=[...await this.fetchImagesAsync(e,t,o)];this.shuffleArray(i),this.imageUrlCache.set(n,i),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${i.length} images for weather: ${t}, timeOfDay: ${o}`)}const r=this.imageUrlCache.get(n)||[];if(0===r.length)return this.getLogger().warn(`No images available for weather: ${t}, timeOfDay: ${o}`),"";const a=r[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%r.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${t}, timeOfDay: ${o}, URL: ${a}`),a}filterImagesByWeatherAndTime(e,t,o){if(this.getLogger().debug(`Current time of day: ${o}`),this.getLogger().debug(`Current weather condition: ${t}`),0===e.length)return[];let i=[];return i=e.filter(e=>(e.weather===t||e.weather===Ie.All||t===Ie.All)&&e.timeOfDay===o),0===i.length&&(i=e.filter(e=>(e.weather===t||e.weather===Ie.All||t===Ie.All)&&e.timeOfDay===ke.Unspecified)),0===i.length&&(i=e.filter(e=>e.timeOfDay===o)),0===i.length&&(i=e.filter(e=>e.timeOfDay===ke.Unspecified)),i.length>0?(this.getLogger().debug(`Found ${i.length} images matching current conditions`),i.map(e=>e.url)):(this.getLogger().info("No matching images found, returning all images"),e.map(e=>e.url))}convertUrlsToBackgroundImages(e){return this.getLogger().debug(`Converting ${e.length} URLs to BackgroundImage objects`),e.map(e=>({url:e,weather:Oe(e,Ae)||Ie.All,timeOfDay:Oe(e,Ne)||ke.Unspecified}))}}const Pe=new class extends Te{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=_e("local-source")}async fetchImagesInternalAsync(e,t,o){return e.backgroundImages&&e.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${e.backgroundImages.length} images`),this.logger.debug(`First image URL: ${e.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(e.backgroundImages,t,o)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},De=new class extends Te{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=_e("picsum-source")}async fetchImagesInternalAsync(e,t,o){const i=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${i}`),[i]}getDefaultConfig(){return{}}},Fe=new class extends Te{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=_e("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(e,t,o){const i=e.count||5;let n=e.category||"";const r=e.apiKey||"";return this.logger.debug(`Current weather: ${t}, time of day: ${o}`),this.logger.debug(`Using category with weather and time: ${n}`),r?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(r,n,i,t,o,e)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(e,t,o,i,n,r){const a=[],s=(null==r?void 0:r.contentFilter)||"high";let l="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(l=e[0]),e.length>1&&(l+=` ${e.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${e.join(", ")}`)}const c=i.toLowerCase();l+=` ${c}`,"sunrise-sunset"===n?l+=" sunrise sunset dawn dusk":"day"===n?l+=" daylight midday day":"night"===n&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${n}`);try{let t="https://api.unsplash.com/photos/random?";const i=new URLSearchParams({client_id:e,count:o.toString(),orientation:"landscape",content_filter:s});l&&i.append("query",l);const n=new URLSearchParams(i);n.delete("client_id"),n.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${n.toString()}`),t+=i.toString();const r=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${r}`);const c=await fetch(t);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();this.logger.debug(`API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";a.push(t)}),this.logger.debug(`Fetched ${a.length} images from Unsplash API`)}catch(e){throw this.logger.error("Error fetching from Unsplash API:",e),e}return a}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Ee=new class extends Te{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=_e("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}async checkEntityAsync(e){try{const t=window.document.querySelector("home-assistant").hass;if(!t)return void this.logger.warn("Could not get Home Assistant instance");const o=t.states[e];if(!o)return void this.logger.warn(`Entity ${e} not found`);this.updateCacheFromEntity(o),this.entityId=e,this.logger.debug(`Checked entity ${e}`)}catch(e){this.logger.error("Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)&&t.every(e=>"string"==typeof e)?(this.cachedImages=this.convertUrlsToBackgroundImages(t),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${t.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(e,t,o){const i=e.entity;if(!i)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(i);const n=Date.now();if(this.cachedImages.length>0&&n-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t,o);try{const e=window.document.querySelector("home-assistant").hass;if(!e)return this.logger.warn("Could not get Home Assistant instance"),[];const n=e.states[i];return n?(this.updateCacheFromEntity(n),this.filterImagesByWeatherAndTime(this.cachedImages,t,o)):(this.logger.warn(`Sensor ${i} not found`),[])}catch(e){return this.logger.error("Error fetching images from sensor:",e),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Ue=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=_e("null-source")}async fetchImagesAsync(e,t,o){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(e,t,o){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Re={local:Pe,picsum:De,unsplash:Fe,sensor:Ee};class Me{constructor(){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=_e("background-image-manager")}initialize(e={}){const t=e.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${t}`),"none"===t)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var o;if(this.imageSourceId=t||"picsum",this.imageSource=(o=this.imageSourceId,Re[o]||Ue),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;const i=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...i,...e},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(e,t){if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${e}, time of day: ${t}`);const o=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,e,t);return o?(this.logger.debug(`Got image URL: ${o}`),o):(this.logger.warn("No image URL returned from source"),"")}catch(e){return this.logger.error("Error getting next image URL:",e),""}}getImageSourceId(){return this.imageSourceId}}Se.getInstance().registerAll([De,Pe,Fe,Ee]);const We=[{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","mist":"Mist","light_rain":"Light rain"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Be=Object.fromEntries(We.map(e=>[e.code,e.translations]));let Le={};function je(){return We.map(e=>e.code)}function ze(e,t,o={},i){const n={...o};if(i&&(n.timeZone=i),"hidden"===n.weekday&&(n.weekday=void 0),"hidden"===n.year&&(n.year=void 0),"hidden"===n.month&&(n.month=void 0),"hidden"===n.day&&(n.day=void 0),void 0===n.weekday&&void 0===n.year&&void 0===n.month&&void 0===n.day)return"";const r=function(e){const t=We.find(t=>t.code===e);return(null==t?void 0:t.locale)||"en-US"}(t);if("short"===n.month){const t=new Intl.DateTimeFormat(r,{month:"short",timeZone:i}).format(e),o={...n};delete o.month;let a=e.toLocaleDateString(r,o);return"2-digit"===n.day?(a=a.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${t}`),a.includes(t)||(a=`${a} ${t}`)):a=e.toLocaleDateString(r,n),a}return e.toLocaleDateString(r,n)}class He{constructor(e,t){this._readyResolve=null,this.host=e,this.logger=_e(t),e.addController(this),this.ready=new Promise(e=>{this._readyResolve=e})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(e=>{this._readyResolve=e}),this.onHostDisconnected()}}class Ve extends He{constructor(e,t={}){super(e,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=t}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(e){this.logger.debug("Updating ClockController config:",e),this.config={...this.config,...e};const t=new Date,o=this.config.language||"en",i=this.config.timeZone;this.updateTime(t,i),this.updateDate(t,o,i),this.host.requestUpdate()}update(){const e=new Date,t=this.config.language||"en",o=this.config.timeZone;this.updateTime(e,o),0!==e.getSeconds()&&""!==this._currentDate||this.updateDate(e,t,o),this.host.requestUpdate()}updateTime(e,t){var o,i,n,r,a,s,l,c;const h="hidden"===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.second),d=!0===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.hour12);let g,u,p;if(t){const o=new Intl.DateTimeFormat("en-US",{timeZone:t,hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(e);g=parseInt((null===(n=o.find(e=>"hour"===e.type))||void 0===n?void 0:n.value)||"0",10),u=parseInt((null===(r=o.find(e=>"minute"===e.type))||void 0===r?void 0:r.value)||"0",10),p=parseInt((null===(a=o.find(e=>"second"===e.type))||void 0===a?void 0:a.value)||"0",10)}else g=e.getHours(),u=e.getMinutes(),p=e.getSeconds();if(h&&(this._seconds=""),d){const e=g>=12;g%=12,g=g||12,this._ampm=e?"PM":"AM"}else this._ampm="";const m="numeric"!==(null===(s=this.config.timeFormat)||void 0===s?void 0:s.hour);this._hours=m?g.toString().padStart(2,"0"):g.toString();const f="numeric"!==(null===(l=this.config.timeFormat)||void 0===l?void 0:l.minute);if(this._minutes=f?u.toString().padStart(2,"0"):u.toString(),!h){const e="numeric"!==(null===(c=this.config.timeFormat)||void 0===c?void 0:c.second);this._seconds=e?p.toString().padStart(2,"0"):p.toString()}}updateDate(e,t,o){let i=ze(e,t,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},o);i=i.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=i}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var Je=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let qe=class extends he{constructor(){super(),this.logger=_e("clock-component"),this.clockController=new Ve(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(e){if(super.updated(e),e.has("timeFormat")||e.has("dateFormat")||e.has("language")||e.has("timeZone")){if(this.logger.debug("Clock properties changed, updating ClockController"),e.has("timeFormat")){const t=e.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.timeFormat)}`)}if(e.has("dateFormat")){const t=e.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.dateFormat)}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}render(){var e,t;const o=this.getSeconds(),i=void 0!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second)&&"hidden"!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second);return this.logger.debug(`Rendering clock - Seconds: ${o}, Show seconds: ${i}, TimeFormat: ${JSON.stringify(this.timeFormat)}`),H`
            <div class="clock" style="color: ${this.fontColor};">
                <span class="hours-minutes" style="color: ${this.fontColor};">${this.getHours()}:${this.getMinutes()}</span>
                ${i?H`
                    <div class="seconds-container">
                        <span class="seconds" style="color: ${this.fontColor};">${o}</span>
                        ${this.getAmPm()?H`<span class="ampm" style="color: ${this.fontColor};">${this.getAmPm()}</span>`:""}
                    </div>
                `:this.getAmPm()?H`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: ${this.fontColor};">${this.getAmPm()}</span>
                    </div>
                `:""}
            </div>
            <div class="date" style="color: ${this.fontColor};">${this.getCurrentDate()}</div>
        `}};qe.styles=a`
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
        }

        @media (min-width: 1280px) {
            .clock {
                font-size: 18rem;
                line-height: 14rem;
            }

            .date {
                font-size: 6rem;
            }
        }
    `,Je([me({type:Object})],qe.prototype,"timeFormat",void 0),Je([me({type:Object})],qe.prototype,"dateFormat",void 0),Je([me({type:String})],qe.prototype,"fontColor",void 0),Je([me({type:String})],qe.prototype,"language",void 0),Je([me({type:String})],qe.prototype,"timeZone",void 0),qe=Je([ge("ha-clock")],qe);class Ze extends He{constructor(e,t={}){super(e,"sensor-controller"),this._sensorValues=[],this.config={},this.config=t}onHostConnected(){}onHostDisconnected(){}updateConfig(e){this.logger.debug("Updating SensorController config:",e),this.config={...this.config,...e},this.hass&&this.updateSensorValues()}updateHass(e){this.hass=e,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=[],this.config.sensors.forEach(e=>{if(e.entity&&this.hass.states[e.entity]){const t=this.hass.states[e.entity];let o=t.state;t.attributes&&t.attributes.unit_of_measurement&&(o+=` ${t.attributes.unit_of_measurement}`),this._sensorValues.push({entity:e.entity,label:e.label,value:o})}else e.entity&&this._sensorValues.push({entity:e.entity,label:e.label,value:"unavailable"})}),this.host.requestUpdate()):this._sensorValues=[]}get sensorValues(){return this._sensorValues}}var Ke=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let Ge=class extends he{constructor(){super(),this.logger=_e("sensor-component"),this.sensorController=new Ze(this,{sensors:this.sensors})}get controller(){return this.sensorController}updated(e){super.updated(e),e.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),e.has("hass")&&this.hass&&(this.logger.debug("Hass changed, updating SensorController"),this.sensorController.updateHass(this.hass))}render(){const e=this.sensorController.sensorValues;return 0===e.length?H``:H`
            <div class="sensor-container" style="color: ${this.fontColor};">
                ${e.map(e=>H`
                    <div class="sensor-item">
                        ${e.label?H`
                                <div class="sensor-label" style="color: ${this.fontColor};">
                                    ${e.label}
                                </div>`:""}
                        <div class="sensor-value" style="color: ${this.fontColor};">
                            ${e.value}
                        </div>
                    </div>
                `)}
            </div>
        `}};Ge.styles=a`
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
            font-size: 1.0rem;
            font-weight: 300;
            opacity: 0.8;
        }

        .sensor-value {
            font-size: 1.5rem;
            font-weight: 400;
        }

        /* Responsive adjustments */
        @media (min-width: 900px) {
            .sensor-label {
                font-size: 1.2rem;
            }

            .sensor-value {
                font-size: 2rem;
            }
        }

        @media (min-width: 1280px) {
            .sensor-label {
                font-size: 1.5rem;
            }

            .sensor-value {
                font-size: 2.5rem;
            }
        }
    `,Ke([me({type:Array})],Ge.prototype,"sensors",void 0),Ke([me({type:String})],Ge.prototype,"fontColor",void 0),Ke([me({type:Object})],Ge.prototype,"hass",void 0),Ge=Ke([ge("ha-sensors")],Ge);var Ye=Object.defineProperty,Qe=(e,t,o)=>(((e,t,o)=>{t in e?Ye(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o})(e,"symbol"!=typeof t?t+"":t,o),o),Xe=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},et=(e,t,o)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,o)},tt=(e,t,o)=>(((e,t)=>{if(!t.has(e))throw TypeError("Cannot access private method")})(e,t),o);function ot(e,t){return Object.is(e,t)}let it=null,nt=!1,rt=1;const at=Symbol("SIGNAL");function st(e){const t=it;return it=e,t}const lt={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ct(e){if(nt)throw new Error("undefined"!=typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===it)return;it.consumerOnSignalRead(e);const t=it.nextProducerIndex++;ft(it),t<it.producerNode.length&&it.producerNode[t]!==e&&mt(it)&&pt(it.producerNode[t],it.producerIndexOfThis[t]),it.producerNode[t]!==e&&(it.producerNode[t]=e,it.producerIndexOfThis[t]=mt(it)?ut(e,it,t):0),it.producerLastReadVersion[t]=e.version}function ht(e){if(e.dirty||e.lastCleanEpoch!==rt){if(!e.producerMustRecompute(e)&&!function(e){ft(e);for(let t=0;t<e.producerNode.length;t++){const o=e.producerNode[t],i=e.producerLastReadVersion[t];if(i!==o.version)return!0;if(ht(o),i!==o.version)return!0}return!1}(e))return e.dirty=!1,void(e.lastCleanEpoch=rt);e.producerRecomputeValue(e),e.dirty=!1,e.lastCleanEpoch=rt}}function dt(e){if(void 0===e.liveConsumerNode)return;const t=nt;nt=!0;try{for(const t of e.liveConsumerNode)t.dirty||gt(t)}finally{nt=t}}function gt(e){var t;e.dirty=!0,dt(e),null==(t=e.consumerMarkedDirty)||t.call(e.wrapper??e)}function ut(e,t,o){var i;if(vt(e),ft(e),0===e.liveConsumerNode.length){null==(i=e.watched)||i.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)e.producerIndexOfThis[t]=ut(e.producerNode[t],e,t)}return e.liveConsumerIndexOfThis.push(o),e.liveConsumerNode.push(t)-1}function pt(e,t){var o;if(vt(e),ft(e),"undefined"!=typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(o=e.unwatched)||o.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)pt(e.producerNode[t],e.producerIndexOfThis[t])}const i=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[i],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[i],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){const o=e.liveConsumerIndexOfThis[t],i=e.liveConsumerNode[t];ft(i),i.producerIndexOfThis[o]=t}}function mt(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function ft(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function vt(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function wt(e){if(ht(e),ct(e),e.value===$t)throw e.error;return e.value}const yt=Symbol("UNSET"),bt=Symbol("COMPUTING"),$t=Symbol("ERRORED"),_t=(()=>({...lt,value:yt,dirty:!0,error:null,equal:ot,producerMustRecompute:e=>e.value===yt||e.value===bt,producerRecomputeValue(e){if(e.value===bt)throw new Error("Detected cycle in computations.");const t=e.value;e.value=bt;const o=function(e){return e&&(e.nextProducerIndex=0),st(e)}(e);let i,n=!1;try{i=e.computation.call(e.wrapper),n=t!==yt&&t!==$t&&e.equal.call(e.wrapper,t,i)}catch(t){i=$t,e.error=t}finally{!function(e,t){if(st(t),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(mt(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)pt(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}(e,o)}n?e.value=t:(e.value=i,e.version++)}}))();function Ct(){return ct(this),this.value}function xt(e,t){!1===(null==it?void 0:it.consumerAllowSignalWrites)&&function(){throw new Error}(),e.equal.call(e.wrapper,e.value,t)||(e.value=t,function(e){e.version++,rt++,dt(e)}(e))}const St=(()=>({...lt,equal:ot,value:void 0}))(),kt=Symbol("node");var It,At,Nt,Ot,Tt,Pt,Dt,Ft,Et,Ut,Rt;At=It||(It={}),Nt=kt,Ot=new WeakSet,At.isState=e=>"object"==typeof e&&Xe(Ot,e),At.State=class{constructor(e,t={}){et(this,Ot),Qe(this,Nt);const o=function(e){const t=Object.create(St);t.value=e;const o=()=>(ct(t),t.value);return o[at]=t,o}(e),i=o[at];if(this[kt]=i,i.wrapper=this,t){const e=t.equals;e&&(i.equal=e),i.watched=t[At.subtle.watched],i.unwatched=t[At.subtle.unwatched]}}get(){if(!(0,At.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Ct.call(this[kt])}set(e){if(!(0,At.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(nt)throw new Error("Writes to signals not permitted during Watcher callback");xt(this[kt],e)}},Tt=kt,Pt=new WeakSet,At.isComputed=e=>"object"==typeof e&&Xe(Pt,e),At.Computed=class{constructor(e,t){et(this,Pt),Qe(this,Tt);const o=function(e){const t=Object.create(_t);t.computation=e;const o=()=>wt(t);return o[at]=t,o}(e),i=o[at];if(i.consumerAllowSignalWrites=!0,this[kt]=i,i.wrapper=this,t){const e=t.equals;e&&(i.equal=e),i.watched=t[At.subtle.watched],i.unwatched=t[At.subtle.unwatched]}}get(){if(!(0,At.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return wt(this[kt])}},(Dt=At.subtle||(At.subtle={})).untrack=function(e){let t,o=null;try{o=st(null),t=e()}finally{st(o)}return t},Dt.introspectSources=function(e){var t;if(!(0,At.isComputed)(e)&&!(0,At.isWatcher)(e))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(t=e[kt].producerNode)?void 0:t.map(e=>e.wrapper))??[]},Dt.introspectSinks=function(e){var t;if(!(0,At.isComputed)(e)&&!(0,At.isState)(e))throw new TypeError("Called introspectSinks without a Signal argument");return(null==(t=e[kt].liveConsumerNode)?void 0:t.map(e=>e.wrapper))??[]},Dt.hasSinks=function(e){if(!(0,At.isComputed)(e)&&!(0,At.isState)(e))throw new TypeError("Called hasSinks without a Signal argument");const t=e[kt].liveConsumerNode;return!!t&&t.length>0},Dt.hasSources=function(e){if(!(0,At.isComputed)(e)&&!(0,At.isWatcher)(e))throw new TypeError("Called hasSources without a Computed or Watcher argument");const t=e[kt].producerNode;return!!t&&t.length>0},Ft=kt,Et=new WeakSet,Ut=new WeakSet,Rt=function(e){for(const t of e)if(!(0,At.isComputed)(t)&&!(0,At.isState)(t))throw new TypeError("Called watch/unwatch without a Computed or State argument")},At.isWatcher=e=>Xe(Et,e),Dt.Watcher=class{constructor(e){et(this,Et),et(this,Ut),Qe(this,Ft);let t=Object.create(lt);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[kt]=t}watch(...e){if(!(0,At.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");tt(this,Ut,Rt).call(this,e);const t=this[kt];t.dirty=!1;const o=st(t);for(const t of e)ct(t[kt]);st(o)}unwatch(...e){if(!(0,At.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");tt(this,Ut,Rt).call(this,e);const t=this[kt];ft(t);for(let o=t.producerNode.length-1;o>=0;o--)if(e.includes(t.producerNode[o].wrapper)){pt(t.producerNode[o],t.producerIndexOfThis[o]);const e=t.producerNode.length-1;if(t.producerNode[o]=t.producerNode[e],t.producerIndexOfThis[o]=t.producerIndexOfThis[e],t.producerNode.length--,t.producerIndexOfThis.length--,t.nextProducerIndex--,o<t.producerNode.length){const e=t.producerIndexOfThis[o],i=t.producerNode[o];vt(i),i.liveConsumerIndexOfThis[e]=o}}}getPending(){if(!(0,At.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[kt].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}},Dt.currentComputed=function(){var e;return null==(e=it)?void 0:e.wrapper},Dt.watched=Symbol("watched"),Dt.unwatched=Symbol("unwatched"),Symbol("SignalWatcherBrand"),new FinalizationRegistry(({watcher:e,signal:t})=>{e.unwatch(t)}),new WeakMap;class Mt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:Wt}=se,Bt=(e,t)=>{const o=e._$AN;if(void 0===o)return!1;for(const e of o)e._$AO?.(t,!1),Bt(e,t);return!0},Lt=e=>{let t,o;do{if(void 0===(t=e._$AM))break;o=t._$AN,o.delete(e),e=t}while(0===o?.size)},jt=e=>{for(let t;t=e._$AM;e=t){let o=t._$AN;if(void 0===o)t._$AN=o=new Set;else if(o.has(e))break;o.add(e),Vt(t)}};function zt(e){void 0!==this._$AN?(Lt(this),this._$AM=e,jt(this)):this._$AM=e}function Ht(e,t=!1,o=0){const i=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(i))for(let e=o;e<i.length;e++)Bt(i[e],!1),Lt(i[e]);else null!=i&&(Bt(i,!1),Lt(i));else Bt(this,e)}const Vt=e=>{2==e.type&&(e._$AP??=Ht,e._$AQ??=zt)};class Jt extends Mt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,o){super._$AT(e,t,o),jt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Bt(this,e),Lt(this))}setValue(e){if((()=>void 0===this._$Ct.strings)())this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const qt=(Kt=class extends Jt{_$Sl(){if(void 0!==this._$Su)return;this._$SW=new It.Computed(()=>{var e;return null===(e=this._$Sj)||void 0===e?void 0:e.get()});const e=this._$Su=new It.subtle.Watcher(()=>{var t;null===(t=this._$SO)||void 0===t||t._(this),e.watch()});e.watch(this._$SW)}_$Sp(){var e;void 0!==this._$Su&&(this._$Su.unwatch(this._$SW),this._$SW=void 0,this._$Su=void 0,null===(e=this._$SO)||void 0===e||e.m(this))}commit(){this.setValue(It.subtle.untrack(()=>{var e;return null===(e=this._$SW)||void 0===e?void 0:e.get()}))}render(e){return It.subtle.untrack(()=>e.get())}update(e,[t]){var o,i;return null!==(o=this._$SO)&&void 0!==o||(this._$SO=null===(i=e.options)||void 0===i?void 0:i.host),t!==this._$Sj&&void 0!==this._$Sj&&this._$Sp(),this._$Sj=t,this._$Sl(),It.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$Sl()}},(...e)=>({_$litDirective$:Kt,values:e})),Zt=e=>(t,...o)=>e(t,...o.map(e=>e instanceof It.State||e instanceof It.Computed?qt(e):e));var Kt;Zt(H),Zt(V),It.State,It.Computed;class Gt{constructor(){this._weatherSignal=new It.State(void 0,void 0)}get weatherSignal(){return this._weatherSignal}updateWeatherSignal(e){this._weatherSignal.set(void 0),this._weatherSignal.set(e)}}const Yt=new Gt,Qt=Yt.weatherSignal;function Xt(e){Yt.updateWeatherSignal(e)}class eo extends He{constructor(e,t={}){super(e,"background-image-controller"),this.backgroundImageManager=new Me,this.currentWeather=Ie.All,this._currentImageUrl="",this._previousImageUrl="",this._isTransitioning=!1,this._fetchingImageUrls=!1,this.config=t,this.setupWeatherWatcher()}setWeatherSignalProvider(e){this.weatherSignalProvider=e,this.weatherWatcher&&(this.weatherWatcher.unwatch(Qt),this.weatherSignalProvider&&this.weatherWatcher.unwatch(this.weatherSignalProvider.weatherSignal)),this.setupWeatherWatcher()}setupWeatherWatcher(){this.weatherWatcher=new It.subtle.Watcher(async()=>{var e;await 0;const t=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:Qt,o=t.get();void 0!==o&&(this.updateWeather(o||Ie.All),this.logger.info("New signal for weather:",o),null===(e=this.weatherWatcher)||void 0===e||e.watch(t))})}onHostConnected(){var e;const t=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:Qt;null===(e=this.weatherWatcher)||void 0===e||e.watch(t),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){var e;const t=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:Qt;null===(e=this.weatherWatcher)||void 0===e||e.unwatch(t),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(e){const t={...this.config};this.config={...this.config,...e},xe.info("Update the BackgroundImageController with new configuration");const o=this.isInitialized;t.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{o&&this.fetchNewImageAsync(this.currentWeather).catch(e=>this.logger.error("Error fetching image after reinitialization:",e))}).catch(e=>this.logger.error("Error during BackgroundImageManager initialization:",e)):t.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:e,...t}=this.config.imageSourceConfig||{},o=t.imageSourceId?t:{imageSourceId:"picsum"};if(this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${o.imageSourceId||"default"}`),!this.backgroundImageManager.initialize(o))return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(e){this.logger.error("Error fetching image URLs:",e)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const e=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${e/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(e){this.logger.error("Error in image rotation interval:",e)}})()},e)}async fetchNewImageAsync(e){try{let t=e,o=function(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?ke.SunriseSunset:e>=9&&e<17?ke.Day:e>=21||e<5?ke.Night:ke.Unspecified}();const i=await this.backgroundImageManager.getNextImageUrlAsync(t,o);if(i){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${i}`);const e=new Image;e.onload=()=>{this.logger.debug(`New image loaded successfully: ${i}`),this._currentImageUrl&&(this._previousImageUrl=this._currentImageUrl,this.logger.debug("Starting transition for subsequent image"),this.handleImageTransition()),this._currentImageUrl=i,this._previousImageUrl||(this.logger.debug("Starting transition for first image"),this.handleImageTransition())},e.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${i}`)},e.src=i}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(e){this.logger.error("Error fetching new dynamic image:",e)}}updateWeather(e){this.isInitialized?this.currentWeather!==e&&(this.logger.info(`Updating weather condition to: ${e}`),this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after weather update:",e))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after initialization:",e))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}get isTransitioning(){return this._isTransitioning}handleImageTransition(){this._isTransitioning=!0,this.host.requestUpdate(),setTimeout(()=>{this.applyTransitionEffect()},eo.TRANSITION_DELAY_MS)}applyTransitionEffect(){if(!(this.host instanceof HTMLElement&&this.host.shadowRoot))return void this.logger.error("Could not access shadow root");const e=this.host.shadowRoot.querySelector(".background-container");e?(e.classList.add("active-transition"),this.logger.debug("Added active-transition class to container"),setTimeout(()=>{this.cleanupAfterTransition(e)},eo.TRANSITION_DURATION_MS)):this.logger.error("Could not find background container element")}cleanupAfterTransition(e){e.classList.contains("active-transition")&&e.classList.remove("active-transition"),this._isTransitioning=!1,this.host.requestUpdate(),this.logger.debug("Transition completed")}}eo.TRANSITION_DELAY_MS=50,eo.TRANSITION_DURATION_MS=1e3;var to=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let oo=class extends he{constructor(){super(),this.backgroundOpacity=.5,this.logger=_e("background-image-component"),this.backgroundImageController=new eo(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(e){var t;super.updated(e),e.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(t=this.config)&&void 0!==t?t:{}))}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}get isTransitioning(){return this.backgroundImageController.isTransitioning}render(){const e=this.currentImageUrl,t=this.previousImageUrl,o=this.isTransitioning;return H`
            <div class="background-container ${o?"transitioning":""}">
                ${e?H`

                        ${o&&t?H`
                                <img class="background-image previous" src="${t}" >
                            `:""}
                        <img class="background-image" src="${e}">
                        <div class="background-overlay" style="opacity: ${void 0!==this.backgroundOpacity?this.backgroundOpacity:.5};"></div>
                    `:""}
            </div>
        `}};oo.styles=a`
        :host {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .background-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;            
            opacity: 0;
            /* No default transition - will be added only during explicit transitions */
        }

        /* Default state - current image is visible */
        .background-image:not(.previous) {
            opacity: 1;
        }

        /* Initial state for transition */
        .transitioning .background-image {
            transition: none; /* Ensure no transition during setup */
        }

        .transitioning .background-image.previous {
            opacity: 1; /* Previous image starts visible */
        }

        .transitioning .background-image:not(.previous) {
            opacity: 0; /* New image starts invisible */
        }

        /* Active transition state - smooth transition between images */
        .transitioning.active-transition .background-image {
            transition: opacity 1s ease-in-out; /* Apply transition to all images */
        }

        .transitioning.active-transition .background-image.previous {
            opacity: 0; /* Previous image fades out */
        }

        .transitioning.active-transition .background-image:not(.previous) {
            opacity: 1; /* New image fades in */
        }

        .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
        }
    `,to([me({type:Number})],oo.prototype,"backgroundOpacity",void 0),to([me({type:Object})],oo.prototype,"config",void 0),oo=to([ge("ha-background-image")],oo);class io{static getInstance(){return io.instance||(io.instance=new io),io.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&xe.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const no=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,o=e.longitude||14.4378,i=e.units||"metric",n=e.language||"en";try{const r=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${o}&units=${i}&lang=${n}&appid=${e.apiKey}`;xe.debug("[OpenWeatherMap] "+r);const a=await fetch(r);if(!a.ok)throw new Error(`OpenWeatherMap API error: ${a.statusText}`);const s=await a.json();if(!s.list||!s.list.length)throw new Error("No forecast data available");const l=s.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},d=new Map;return s.list.forEach(e=>{var t;const o=new Date(1e3*e.dt).toISOString().split("T")[0];d.has(o)||d.set(o,[]),null===(t=d.get(o))||void 0===t||t.push(e)}),{current:h,daily:Array.from(d.entries()).map(([e,t])=>{const o=t.map(e=>e.main.temp),i=Math.min(...o),n=Math.max(...o),r=t[Math.floor(t.length/2)]||t[0],a=t.filter(e=>void 0!==e.pop).map(e=>e.pop),s=a.length>0?a.reduce((e,t)=>e+t,0)/a.length*100:0;return{date:new Date(e),temperatureMin:i,temperatureMax:n,condition:r.weather[0].description,icon:this.getIconUrl(r.weather[0].icon),precipitation:s,humidity:r.main.humidity,windSpeed:r.wind.speed}})}}catch(e){throw xe.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"en"}}getIconUrl(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){let t;switch(xe.debug(`[OpenWeatherMap] Mapping weather condition: ${e}`),e.toLowerCase()){case"clear":case"clear sky":t=Ie.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":t=Ie.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":t=Ie.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":t=Ie.Rain;break;case"tornado":case"windy":case"all":default:t=Ie.All;break;case"snow":t=Ie.Snow}return xe.debug(`[OpenWeatherMap] Mapped to Weather enum: ${t}`),t}},ro=io.getInstance();ro.register(no);class ao extends He{constructor(e,t={}){super(e,"weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this.config={},this.config=t}setWeatherSignalProvider(e){this._weatherSignalProvider=e}onHostConnected(){this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0)}async updateConfigAsync(e){this.logger.debug("Updating WeatherController config:",e);const t=this.config.showWeather,o=this.config.weatherUpdateInterval;this.config={...this.config,...e},o!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),!t&&this.config.showWeather?await this.fetchWeatherDataAsync():this.config.showWeather||(this._weatherSignalProvider?this._weatherSignalProvider.updateWeatherSignal(Ie.All):Xt(Ie.All)),this.host.requestUpdate()}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting weather update interval to ${e} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(e){this.logger.error("Error in weather update interval:",e)}})()},t)}async fetchWeatherDataAsync(){var e,t,o,i;if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const r=this.config.weatherProvider||"openweathermap",a=(n=r,ro.getProvider(n));if(!a)throw new Error(`Weather provider '${r}' not found`);let s=a.getDefaultConfig();this.config.weatherConfig&&(s={...s,...this.config.weatherConfig},this.config.weatherConfig.units&&(s.units=this.config.weatherConfig.units,this.logger.debug(`Using weather units: ${s.units}`))),this._weatherData=await a.fetchWeatherAsync(s),this._weatherData&&(this._weatherSignalProvider?this._weatherSignalProvider.updateWeatherSignal(null!==(t=null===(e=this._weatherData.current)||void 0===e?void 0:e.conditionUnified)&&void 0!==t?t:Ie.All):Xt(null!==(i=null===(o=this._weatherData.current)||void 0===o?void 0:o.conditionUnified)&&void 0!==i?i:Ie.All)),this.logger.info(`Fetched weather data from ${a.name}:`,this._weatherData)}catch(e){this._weatherError=!0,this._weatherErrorMessage=e instanceof Error?e.message:String(e),this.logger.error("Error fetching weather data:",e)}finally{this._weatherLoading=!1,this.host.requestUpdate()}var n}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}get weatherSignalProvider(){return this._weatherSignalProvider}}var so=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let lo=class extends he{constructor(){super(),this.logger=_e("weather-component"),this.weatherController=new ao(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval})}get controller(){return this.weatherController}updated(e){if(super.updated(e),e.has("showWeather")||e.has("weatherProvider")||e.has("weatherConfig")||e.has("weatherDisplayMode")||e.has("weatherForecastDays")||e.has("weatherTitle")||e.has("weatherUpdateInterval")){this.logger.debug("Weather properties changed, updating WeatherController");const e={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval};this.weatherController.updateConfigAsync(e)}}translateWeatherCondition(e){const t=this.language||"en",o=function(e,t,o=e){if(!je().includes(t))return null!==o?o:e;let i=Le[t];if(!i){if(!Be[t])return xe.warn(`No embedded translations found for ${t}`),null!==o?o:e;Le[t]=Be[t],i=Le[t],xe.debug(`Loaded translations for ${t} on-demand`)}const n=function(e,t){if(void 0!==e[t])return e[t];const o=t.split(".");let i=e;for(const e of o){if(null==i||"object"!=typeof i)return;i=i[e]}return i}(i,e);return"string"==typeof n?xe.debug(`Translation found for key "${e}" in language "${t}": "${n}"`):xe.debug(`No translation found for key "${e}" in language "${t}", using default: "${null!==o?o:e}"`),"string"==typeof n?n:null!==o?o:e}(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,null);return null!==o?o:e}formatForecastDate(e){return ze(e,this.language||"en",{weekday:"short"})}get weatherData(){const e=this.weatherController.weatherData;return e&&e.current&&e.current.conditionUnified&&(this.weatherController.weatherSignalProvider?this.weatherController.weatherSignalProvider.updateWeatherSignal(e.current.conditionUnified):Xt(e.current.conditionUnified)),e}render(){const e=this.weatherController.weatherData;if(this.weatherController.hasError)return H`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!e)return H`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;const t=this.weatherDisplayMode||"both",o=this.weatherForecastDays||3,i=this.weatherTitle||"Weather",n=Math.min(o,e.daily.length);return H`
            <div class="weather-container" style="color: ${this.fontColor};">
                <div class="weather-title" style="color: ${this.fontColor};">${i}</div>

                ${"current"===t||"both"===t?H`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${e.current.icon}"
                                     alt="${e.current.condition}">
                                <div class="weather-temp">${Math.round(e.current.temperature)}°</div>
                            </div>
                            <div class="weather-condition">
                                ${this.translateWeatherCondition(e.current.condition)}
                            </div>
                        </div>
                    `:""}

                ${"forecast"===t||"both"===t?H`
                        <div class="weather-forecast">
                            ${e.daily.slice(0,n).map(e=>H`
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
            </div>
        `}};lo.styles=a`
        .weather-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            z-index: 3;
            max-width: 100%;
            max-height: 100%;
            overflow-y: auto;
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

        /* Responsive adjustments */
        @media (min-width: 900px) {
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
            .weather-temp {
                font-size: 3rem;
                line-height: 3rem;
            }

            .weather-icon {
                width: 60px;
                height: 60px;
            }
        }
    `,so([me({type:Boolean})],lo.prototype,"showWeather",void 0),so([me({type:String})],lo.prototype,"weatherProvider",void 0),so([me({type:Object})],lo.prototype,"weatherConfig",void 0),so([me({type:String})],lo.prototype,"weatherDisplayMode",void 0),so([me({type:Number})],lo.prototype,"weatherForecastDays",void 0),so([me({type:String})],lo.prototype,"weatherTitle",void 0),so([me({type:Number})],lo.prototype,"weatherUpdateInterval",void 0),so([me({type:String})],lo.prototype,"fontColor",void 0),so([me({type:String})],lo.prototype,"language",void 0),lo=so([ge("ha-weather")],lo);class co{static getInstance(){return co.instance||(co.instance=new co),co.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&xe.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const ho=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(e,t){try{if(0===t.length)throw new Error("No stops configured");const o={};for(const e of t){const t=String(e.stopId);o[t]||(o[t]=[]),o[t].push(e)}const i=[];for(const t of Object.keys(o)){const n=o[t],r=n.map(e=>e.postId),a=`https://dpmbinfo.dpmb.cz/api/departures?stopid=${t}`,s=`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,l=await fetch(s,{headers:{"User-Agent":"cz.dpmb.dpmbinfo/4.1.3 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!l.ok)throw new Error(`Failed to fetch transportation data: ${l.status} ${l.statusText}`);const c=await l.json();if(c.Error)throw new Error(`API error: ${c.Error}`);for(const o of r){const r=c.PostList.find(e=>e.PostID===o);if(!r){xe.warn(`No platform found with postId ${o} for stopId ${t}`);continue}const a=r.Name,s=n.find(e=>e.postId===o);if(!s)continue;const l=s.name||a,h=e.maxDepartures||2,d=r.Departures.slice(0,Math.min(h,5)).map(e=>({lineId:e.LineId||e.Line,lineName:e.Line||e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:l,postId:o}));i.push(...d)}}return{departures:i,loading:!1}}catch(e){return xe.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}},go=co.getInstance();go.register(ho);class uo extends He{constructor(e,t={}){super(e,"transportation-controller"),this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this.config={},this.config=t}onHostConnected(){var e;this.config.transportation&&!1!==this.config.enableTransportation&&!(null===(e=this.config.transportation)||void 0===e?void 0:e.onDemand)&&(this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval())}onHostDisconnected(){this.clearTimers()}updateConfig(e){var t;this.logger.debug("Updating TransportationController config:",e);const o={...this.config};this.config={...this.config,...e},this.clearTimers(),this.config.transportation&&!1!==this.config.enableTransportation&&!(null===(t=this.config.transportation)||void 0===t?void 0:t.onDemand)?((!o.transportation||!this.config.transportation||JSON.stringify(o.transportation)!==JSON.stringify(this.config.transportation)||o.enableTransportation!==this.config.enableTransportation)&&this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval()):this._transportationDataLoaded=!1,this.host.requestUpdate()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.enableTransportation)return;let e=this.config.transportationUpdateInterval||60;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting transportation update interval to ${e} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){this.logger.error("Error in transportation update interval:",e)}})()},t)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0)}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.enableTransportation){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const o=(e=t.provider,go.getProvider(e));if(!o)throw new Error(`Transportation provider '${t.provider}' not found`);const i=t.stops.map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),n=t.providerConfig||{};void 0!==t.maxDepartures&&(n.maxDepartures=t.maxDepartures),this._transportationData=await o.fetchTransportationAsync(n,i),this._lastTransportationUpdate=new Date,this.logger.debug(`Fetched transportation data from ${o.name}:`,this._transportationData)}catch(e){this.logger.error("Error fetching transportation data:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}var e;this.host.requestUpdate()}}async handleTransportationClick(){var e;if(this.logger.debug("Transportation button clicked, loading data on demand"),await this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(e=this.config.transportation)||void 0===e?void 0:e.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));const t=60*e*1e3;this.logger.debug(`Setting transportation auto-hide timeout to ${e} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.debug(`Auto-hiding transportation departures after ${e} minutes`),this._transportationDataLoaded=!1,this.host.requestUpdate()},t)}this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get lastTransportationUpdate(){return this._lastTransportationUpdate}}var po=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let mo=class extends he{constructor(){super(),this.enableTransportation=!0,this.logger=_e("transportation-component"),this.transportationController=new uo(this,{transportation:this.transportation,transportationUpdateInterval:this.transportationUpdateInterval,enableTransportation:this.enableTransportation})}get controller(){return this.transportationController}updated(e){super.updated(e),(e.has("transportation")||e.has("transportationUpdateInterval")||e.has("enableTransportation"))&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation,transportationUpdateInterval:this.transportationUpdateInterval,enableTransportation:this.enableTransportation}))}render(){var e;if(!this.transportation||!1===this.enableTransportation)return H``;const t=this.transportationController.transportationData,o=this.transportationController.transportationDataLoaded;return H`
            ${(null===(e=this.transportation)||void 0===e?void 0:e.onDemand)&&!o?H`
                    <div class="transportation-on-demand-button"
                         @click=${this._handleTransportationClickAsync}>
                        <svg viewBox="0 0 24 24">
                            <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
                        </svg>
                    </div>`:H`
                    <div class="transportation-container" style="color: ${this.fontColor};">
                        ${this.renderTransportationContent(t)}
                    </div>`}
        `}renderTransportationContent(e){if(e.loading)return H`
                <div>Loading transportation data...</div>`;if(e.error)return H`
                <div class="transportation-error">${e.error}</div>`;if(!e.departures||0===e.departures.length)return H`
                <div>No departures available</div>`;const t={};for(const o of e.departures){const e=`${o.stopName}-${o.postId}`;t[e]||(t[e]=[]),t[e].push(o)}return H`
            <div class="transportation-departures">
                ${Object.entries(t).map(([e,t])=>{const o=t[0].stopName;return H`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.fontColor};">
                                ${o}
                            </h3>
                            <div class="stop-departures">
                                ${t.map(e=>H`
                                    <div class="departure-item">
                                        <div class="departure-line" style="color: ${this.fontColor};">
                                            ${e.lineName}
                                        </div>
                                        <div class="departure-destination" style="color: ${this.fontColor};">→
                                            ${e.finalStop}
                                        </div>
                                        <div class="departure-time" style="color: ${this.fontColor};">
                                            ${e.timeMark}
                                        </div>
                                        ${e.isLowFloor?H`
                                            <div class="departure-lowfloor">♿</div>`:""}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `})}
            </div>
        `}async _handleTransportationClickAsync(){this.transportationController.handleTransportationClick()}};var fo;mo.styles=a`
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
        @media (min-width: 1280px) {
            .stop-group {
                margin-bottom: 16px;
            }
        }
    `,po([me({type:Object})],mo.prototype,"transportation",void 0),po([me({type:Number})],mo.prototype,"transportationUpdateInterval",void 0),po([me({type:Boolean})],mo.prototype,"enableTransportation",void 0),po([me({type:String})],mo.prototype,"fontColor",void 0),po([me({type:Object})],mo.prototype,"hass",void 0),mo=po([ge("ha-transportation")],mo),function(e){e.Left="left",e.Center="center",e.Right="right"}(fo||(fo={}));class vo{constructor(){this.handlers=new Map}static getInstance(){return vo.instance||(vo.instance=new vo),vo.instance}registerHandler(e,t){this.handlers.set(e,t)}getHandler(e){return this.handlers.get(e)}}class wo extends He{constructor(e,t={}){super(e,"action-bar-controller"),this.config={},this.config=t,this.registry=vo.getInstance()}onHostConnected(){this.logger.debug("Action bar controller connected")}onHostDisconnected(){this.logger.debug("Action bar controller disconnected")}updateConfig(e){this.logger.debug("Updating ActionBarController config:",e),this.config={...this.config,...e},this.host.requestUpdate()}get actionBarConfig(){return this.config.actionBar}get isActionBarEnabled(){return!1!==this.config.enableActionBar&&!!this.config.actionBar&&!1!==this.config.actionBar.enabled}registerActionHandler(e,t){this.logger.debug(`Registering handler for action type: ${e}`),this.registry.registerHandler(e,t)}getActionHandler(e){return this.registry.getHandler(e)}}class yo{constructor(){this.plugins=new Map,this.actionRegistry=vo.getInstance()}static getInstance(){return yo.instance||(yo.instance=new yo),yo.instance}registerPlugin(e){const t=e.actionId;this.plugins.set(t,e)}registerPluginWithHandler(e){this.registerPlugin(e),this.actionRegistry.registerHandler(e.actionId,e.handler)}getAllPlugins(){return Array.from(this.plugins.values())}getPlugin(e){return this.plugins.get(e)}getAllActionIds(){return Array.from(this.plugins.keys())}}function bo(e){yo.getInstance().registerPluginWithHandler(e)}var $o=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let _o=class extends he{constructor(){super(),this.enableActionBar=!0,this.logger=_e("action-bar-component"),this.actionBarController=new wo(this,{actionBar:this.actionBar,enableActionBar:this.enableActionBar})}get controller(){return this.actionBarController}updated(e){super.updated(e),(e.has("actionBar")||e.has("enableActionBar"))&&(this.logger.debug("Action bar properties changed, updating ActionBarController"),this.actionBarController.updateConfig({actionBar:this.actionBar,enableActionBar:this.enableActionBar})),e.has("hass")&&this.hass&&(this.logger.debug("Home Assistant instance changed, requesting update"),this.requestUpdate())}getJustifyContent(){if(!this.actionBar||!this.actionBar.alignment)return"center";switch(this.actionBar.alignment){case fo.Left:return"flex-start";case fo.Right:return"flex-end";case fo.Center:default:return"center"}}render(){if(!this.actionBar||!1===this.enableActionBar||!this.actionBar.actions||0===this.actionBar.actions.length)return H``;const e=this.getJustifyContent(),t=void 0!==this.actionBar.backgroundOpacity?this.actionBar.backgroundOpacity:.3;return H`
            <div class="action-bar-container" 
                style="color: ${this.fontColor}; 
                       justify-content: ${e}; 
                       background-color: rgba(0, 0, 0, ${t});">
                ${this.actionBar.actions.map(e=>this.renderActionButton(e))}
            </div>
        `}renderActionButton(e){const t=yo.getInstance().getPlugin(e.actionId);let o=e.active||!1,i=e.icon;t&&"getIconForState"in t&&this.hass&&(i=t.getIconForState(e,this.hass)),t&&"getActiveState"in t&&(o=t.getActiveState());const n=o?"active":"",r=o&&e.activeColor?`--active-icon-color: ${e.activeColor};`:"";return H`
            <div class="action-button ${n}" 
                 style="${r}"
                 @click=${()=>this._handleActionClick(e)}>
                ${i&&i.startsWith("mdi:")?H`<ha-icon icon="${i}" 
                                   style="${o&&e.activeColor?`color: ${e.activeColor};`:""}">
                           </ha-icon>`:H`<svg viewBox="0 0 24 24"
                               style="${o&&e.activeColor?`fill: ${e.activeColor};`:""}">
                        <path d="${i}"></path>
                      </svg>`}
                <div class="action-title">${e.title}</div>
            </div>
        `}_handleActionClick(e){this.hass?(this.logger.debug("Action clicked:",e),function(e,t){const o=vo.getInstance().getHandler(e.actionId);o?o(e,t):console.warn(`No handler registered for action type: ${e.actionId}`)}(e,this.hass)):this.logger.error("Home Assistant instance not available")}};_o.styles=a`
        .action-bar-container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            z-index: 3;
            padding: 16px;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 0 0 var(--ha-card-border-radius, 4px) var(--ha-card-border-radius, 4px);
            gap: 16px;
            height: auto;
            min-height: 144px;
        }

        .action-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 90px;
            width: 144px;
            height: 144px;
            transition: all 0.3s ease;
        }

        .action-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
        }

        .action-button.active ha-icon {
            color: #ffeb3b; /* Yellow color for active state */
        }

        .action-button svg, .action-button ha-icon {
            width: 72px;
            height: 72px;
            fill: currentColor;
            margin-bottom: 0;
        }

        .action-button ha-icon {
            --mdc-icon-size: 72px;
            color: currentColor;
        }

        .action-title {
            font-size: 18px;
            font-weight: 400;
            text-align: center;
        }
    `,$o([me({type:Object})],_o.prototype,"actionBar",void 0),$o([me({type:Boolean})],_o.prototype,"enableActionBar",void 0),$o([me({type:String})],_o.prototype,"fontColor",void 0),$o([me({type:Object})],_o.prototype,"hass",void 0),_o=$o([ge("ha-action-bar")],_o);const Co="action-navigate",xo=e=>{const{path:t,target:o}=e;if("_blank"===o)window.open(t,"_blank");else{window.history.pushState(null,"",t);const e=new Event("location-changed",{composed:!0});window.dispatchEvent(e)}};var So,ko=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};class Io extends he{updated(e){super.updated(e)}handleInputChange(e,t){t.stopPropagation(),t.preventDefault();const o=t.target;o&&this.actionChanged(this.index,e,o.value||"")}handleValueChange(e,t){t.stopPropagation(),t.preventDefault(),this.actionChanged(this.index,e,t.detail.value)}}ko([me({type:Object})],Io.prototype,"hass",void 0),ko([me({type:Object})],Io.prototype,"actionConfig",void 0),ko([me({type:Number})],Io.prototype,"index",void 0),ko([me({type:Function})],Io.prototype,"actionChanged",void 0),function(e){e.Left="left",e.Top="top",e.Hidden="hidden"}(So||(So={}));let Ao=class extends Io{get navigationAction(){return this.actionConfig}render(){return H`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"text"}}}
                    .value=${this.navigationAction.path||""}
                    .label= ${"Navigation Path"}
                    .labelPosition=${So.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${e=>this.handleValueChange("path",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"_self",label:"Current Tab"},{value:"_blank",label:"New Tab"}],mode:"dropdown"}}}
                    .value=${this.navigationAction.target||"_self"}
                    .label= ${"Open In"}
                    .labelPosition=${So.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${e=>this.handleValueChange("target",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color:{type:"rgb"}}}
                    .value=${this.navigationAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the navigation action is active"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Ao=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a}([ge("navigation-editor-plugin")],Ao);const No="call-service",Oo=(e,t)=>{const{service:o,service_data:i,confirmation:n,confirmation_text:r}=e;if(n&&!confirm(r||`Are you sure you want to call ${o}?`))return;const[a,s]=o.split(".");t.callService(a,s,i)};var To=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let Po=class extends Io{constructor(){super(...arguments),this._services=[]}get serviceCallAction(){return this.actionConfig}firstUpdated(){this._loadServices()}_loadServices(){if(!this.hass)return;const e=this.hass.services;if(!e)return;const t=[];Object.keys(e).forEach(o=>{Object.keys(e[o]).forEach(e=>{t.push({value:`${o}.${e}`,label:`${o}.${e}`})})}),t.sort((e,t)=>e.label.localeCompare(t.label)),this._services=t}render(){return H`

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:this._services,mode:"dropdown",custom_value:!0}}}
                    .value=${this.serviceCallAction.service||""}
                    .label=${"Service"}
                    .helper= ${"Select a service or enter a custom one (domain.service)"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("service",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{multiline:!1,type:"text"}}}
                    label="Service Data (JSON)"
                    .value=${this.serviceCallAction.service_data?JSON.stringify(this.serviceCallAction.service_data):"{}"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>{if(e.stopPropagation(),e.preventDefault(),e.target)try{const t=JSON.parse(e.detail.value||"{}");this.actionChanged(this.index,"service_data",t)}catch(e){}}}
            ></ha-row-selector>

            <div class="helper-text">Example: {"entity_id": "light.living_room"} for light.toggle service</div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color:{type:"rgb"}}}
                    .value=${this.serviceCallAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the service call action is active"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Po.styles=a`
        .sensor-row {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }

        .sensor-entity {
            flex: 1;
            margin-right: 8px;
        }

        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,To([me({state:!0,attribute:!1})],Po.prototype,"_services",void 0),Po=To([ge("service-call-editor-plugin")],Po);const Do="light-toggle",Fo=(e,t)=>{const{entity_id:o}=e;o?t.states[o]?t.callService("light","toggle",{entity_id:o}):console.warn(`Entity ${o} not found`):console.warn("No entity_id specified for light toggle action")};let Eo=class extends Io{get lightToggleAction(){return this.actionConfig}render(){return H`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"light"}}}
                    .value=${this.lightToggleAction.entity_id||""}
                    .label=${"Light Entity"}
                    .helper=${"Select a light entity to toggle"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for light on state"}}}
                    .value=${this.lightToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when light is on"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.lightToggleAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the light is on (active state)"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Eo.styles=a`
        .row {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }

        .entity {
            flex: 1;
            margin-right: 8px;
        }

        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,Eo=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a}([ge("light-toggle-editor-plugin")],Eo);const Uo="switch-toggle",Ro=(e,t)=>{const{entity_id:o}=e;o?t.states[o]?t.callService("switch","toggle",{entity_id:o}):console.warn(`Entity ${o} not found`):console.warn("No entity_id specified for switch toggle action")};let Mo=class extends Io{get switchToggleAction(){return this.actionConfig}render(){return H`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"switch"}}}
                    .value=${this.switchToggleAction.entity_id||""}
                    .label=${"Switch Entity"}
                    .helper=${"Select a switch entity to toggle"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for switch on state"}}}
                    .value=${this.switchToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when switch is on"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.switchToggleAction.activeColor||"#4CAF50"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the switch is on (active state)"}
                    .labelPosition=${So.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};var Wo,Bo,Lo;Mo.styles=a`
        .row {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }

        .entity {
            flex: 1;
            margin-right: 8px;
        }

        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,Mo=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a}([ge("switch-toggle-editor-plugin")],Mo),(new class{constructor(){this.actionId=Co,this.name="Navigate to Page",this.description="Navigate to a different page in Home Assistant",this.icon="mdi:arrow-right",this.handler=xo,this.editorTag="navigation-editor-plugin"}defaultActionConfig(){return{actionId:Co,title:"Navigate",icon:this.icon,path:"/"}}register(){bo(this)}}).register(),(new class{constructor(){this.actionId=No,this.name="Call Service",this.description="Call a Home Assistant service",this.icon="mdi:lightbulb",this.handler=Oo,this.editorTag="service-call-editor-plugin"}defaultActionConfig(){return{actionId:No,service:"light.toggle",service_data:{entity_id:"light.living_room"},title:"Toggle Light",icon:this.icon}}register(){bo(this)}}).register(),(new class{constructor(){this.actionId=Do,this.name="Toggle Light",this.description="Toggle a light on or off",this.icon="mdi:lightbulb",this.handler=Fo,this.editorTag="light-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:o}=e;if(!o)return e.icon||this.icon;const i=t.states[o];return i?(this._lastActiveState="on"===i.state,this._lastActiveState?e.icon_on||this.icon:e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:Do,entity_id:"",title:"Toggle Light",icon:this.icon,icon_on:"mdi:lightbulb-on"}}register(){bo(this)}}).register(),(new class{constructor(){this.actionId=Uo,this.name="Toggle Switch",this.description="Toggle a switch on or off",this.icon="mdi:toggle-switch-variant-off",this.handler=Ro,this.editorTag="switch-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:o}=e;if(!o)return e.icon||this.icon;const i=t.states[o];return i?(this._lastActiveState="on"===i.state,this._lastActiveState?e.icon_on||"mdi:toggle-switch-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:Uo,entity_id:"",title:"Toggle Switch",icon:this.icon,icon_on:"mdi:toggle-switch-variant"}}register(){bo(this)}}).register(),(Lo=Wo||(Wo={})).language="language",Lo.system="system",Lo.comma_decimal="comma_decimal",Lo.decimal_comma="decimal_comma",Lo.space_comma="space_comma",Lo.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Bo||(Bo={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var jo=function(e,t,o,i){i=i||{},o=null==o?{}:o;var n=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return n.detail=o,e.dispatchEvent(n),n};new Set(["call-service","divider","section","weblink","cast","select"]);var zo=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let Ho=class extends he{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._actions=[],this._sensorsWithFilesAttr=[],this._editorComponentCache=new Map,this._timeFormatOptions={hour12:[{value:"true",label:"12-hour"},{value:"false",label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._languageOptions=[],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback(),this._languageOptions=We.map(e=>({value:e.code,label:e.label}))}updated(e){super.updated(e),e.has("hass")&&this.hass&&this._updateSensorsWithFilesAttr()}_updateSensorsWithFilesAttr(){this.hass&&(this._sensorsWithFilesAttr=Object.keys(this.hass.states).filter(e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e];return t&&t.attributes&&void 0!==t.attributes.files}))}_getTransportationProviderOptions(){return[...go.getAllProviders().map(e=>({value:e.id,label:e.name}))]}setConfig(e){const t=e,o=t.imageSource||"none";let i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};t.timeFormat&&(i={...i,...t.timeFormat},void 0===t.timeFormat.second&&(i.second=void 0)),this._config={...t,timeFormat:i,dateFormat:t.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:o,imageConfig:t.imageConfig||{},backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",showWeather:void 0!==t.showWeather&&t.showWeather,weatherProvider:t.weatherProvider||"openweathermap",weatherConfig:t.weatherConfig||{},weatherDisplayMode:t.weatherDisplayMode||"both",weatherForecastDays:t.weatherForecastDays||3,transportation:t.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops(),this._loadActions()}_loadSensors(){var e;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadActions(){var e;(null===(e=this._config)||void 0===e?void 0:e.actionBar)&&this._config.actionBar.actions&&this._config.actionBar.actions.length>0?this._actions=[...this._config.actionBar.actions]:this._actions=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,jo(this,"config-changed",{config:e})}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,o)=>o!==e),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,jo(this,"config-changed",{config:e})}}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this._config=e,jo(this,"config-changed",{config:e})}}_getActionTypeOptions(){return yo.getInstance().getAllPlugins().map(e=>({value:e.actionId,label:e.name}))}_getEditorTagName(e){const t=yo.getInstance().getPlugin(e);return t&&t.editorTag?t.editorTag:null}_createEditorTagComponent(e,t){const o=this._getEditorTagName(e.actionId);if(!o)return"";const i=`${e.actionId}-${t}`;if(this._editorComponentCache.has(i)){const t=this._editorComponentCache.get(i);return this.hass&&(t.hass=this.hass),t.actionConfig=e,t}try{const n=document.createElement(o);return this.hass&&(n.hass=this.hass),n.actionConfig=e,n.index=t,n.actionChanged=this._actionChanged.bind(this),this._editorComponentCache.set(i,n),n}catch(e){return console.error(`Error creating editor component ${o}:`,e),""}}_addAction(){const e=this._getActionTypeOptions(),t=e.length>0?e[0].value:Co;let o;const i=yo.getInstance().getPlugin(t);if(o=i&&i.defaultActionConfig?i.defaultActionConfig():{actionId:t,title:"Action",icon:"mdi:flash"},this._editorComponentCache.clear(),this._actions=[...this._actions,o],this._config){const e=JSON.parse(JSON.stringify(this._config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],e.enableActionBar=!0,this._config=e,jo(this,"config-changed",{config:e})}}_removeStop(e){if(this._stops=this._stops.filter((t,o)=>o!==e),this._config&&this._config.transportation){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this._config=e,jo(this,"config-changed",{config:e})}}_removeAction(e){if(this._editorComponentCache.clear(),this._actions=this._actions.filter((t,o)=>o!==e),this._config){const e=JSON.parse(JSON.stringify(this._config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],0===this._actions.length&&(e.enableActionBar=!1,e.actionBar=void 0),this._config=e,jo(this,"config-changed",{config:e})}}_stopChanged(e,t,o){if(this._stops=this._stops.map((i,n)=>n===e?{...i,[t]:o}:i),this._config&&this._config.transportation){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this._config=e,jo(this,"config-changed",{config:e})}}_actionChanged(e,t,o){if("actionId"===t){const t=this._actions[e];if(t){const o=`${t.actionId}-${e}`;this._editorComponentCache.delete(o)}}if(this._actions=this._actions.map((i,n)=>n===e?{...i,[t]:o}:i),this._config){const e=JSON.parse(JSON.stringify(this._config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this._config=e,jo(this,"config-changed",{config:e})}}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:Ie.All,timeOfDay:ke.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,o)=>o!==e),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this._config){const e=JSON.parse(JSON.stringify(this._config));e.backgroundImages=[...this._backgroundImages],this._config=e,jo(this,"config-changed",{config:e})}}_handleFormValueChanged(e){if(e.stopPropagation(),!this._config)return;const t=function(e,t,o){const i=JSON.parse(JSON.stringify(e)),n=t.split(".");let r=i;for(let e=0;e<n.length-1;e++){const t=n[e];void 0===r[t]&&(r[t]={}),r=r[t]}return r[n[n.length-1]]=o,i}(this._config,e.detail.propertyName,e.detail.value);this._config=t,jo(this,"config-changed",{config:t})}static get styles(){return a`
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
                overflow: hidden;
            }

            .section-subheader {
                font-size: 16px;
                font-weight: 500;
                margin: 25px 0 5px 0;
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
                margin-top: 20px;
            }

            /* Action-specific styles */

            .action-item {
                border: 1px solid var(--divider-color, #e0e0e0);
                border-radius: 4px;
                padding: 10px;
                margin-bottom: 15px;
            }

            .action-row {
                display: flex;
                margin-bottom: 8px;
                align-items: center;
            }

            .action-field {
                flex: 2;
                margin-right: 8px;
            }

            .action-buttons {
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

            ha-selector, ha-textfield, ha-select {
                width: 100%;
            }
        `}render(){var e,t,o,i,n,r,a,s,l,c,h,d,g,u,p,m,f,v,w,y,b,$,_,C,x,S,k,I;return this.hass&&this._config?H`
            <div class="form-container">
                <!-- General Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">General</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{color_hex:""}}
                                .value=${this._config.fontColor}
                                .label= ${"Font Color"}
                                propertyName="fontColor"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._languageOptions,mode:"dropdown"}}}
                                .value=${this._config.language||"en"}
                                .label=${"Language"}
                                propertyName="language"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:[{value:"debug",label:"Debug"},{value:"info",label:"Info"},{value:"warn",label:"Warning"},{value:"error",label:"Error"},{value:"none",label:"None"}],mode:"dropdown"}}}
                                .value=${this._config.logLevel||"info"}
                                .label= ${"Log Level"}
                                propertyName="logLevel"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </ha-expansion-panel>

                <!-- Time Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Time Format</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._timeFormatOptions.hour12,mode:"dropdown"}}}
                                .value=${(null===(e=this._config.timeFormat)||void 0===e?void 0:e.hour12)?"true":"false"}
                                .label= ${"Hour Format"}
                                propertyName="timeFormat.hour12"
                                .transformData=${e=>"true"===e}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._timeFormatOptions.hour,mode:"dropdown"}}}
                                .value=${(null===(t=this._config.timeFormat)||void 0===t?void 0:t.hour)||"2-digit"}
                                .label= ${"Hour Display"}
                                propertyName="timeFormat.hour"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._timeFormatOptions.minute,mode:"dropdown"}}}
                                .value=${(null===(o=this._config.timeFormat)||void 0===o?void 0:o.minute)||"2-digit"}
                                .label= ${"Minute Display"}
                                propertyName="timeFormat.minute"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._timeFormatOptions.second,mode:"dropdown"}}}
                                .value=${void 0===(null===(i=this._config.timeFormat)||void 0===i?void 0:i.second)?"undefined":null===(n=this._config.timeFormat)||void 0===n?void 0:n.second}
                                .label= ${"Second Display"}
                                propertyName="timeFormat.second"
                                .transformData=${e=>"undefined"===e?"hidden":e}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </ha-expansion-panel>

                <!-- Date Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Date Format</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._dateFormatOptions.weekday,mode:"dropdown"}}}
                                .value=${(null===(r=this._config.dateFormat)||void 0===r?void 0:r.weekday)||"long"}
                                .label= ${"Weekday Display"}
                                propertyName="dateFormat.weekday"
                                .transformData=${e=>"undefined"===e?"hidden":e}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._dateFormatOptions.month,mode:"dropdown"}}}
                                .value=${(null===(a=this._config.dateFormat)||void 0===a?void 0:a.month)||"long"}
                                .label= ${"Month Display"}
                                propertyName="dateFormat.month"
                                .transformData=${e=>"undefined"===e?"hidden":e}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._dateFormatOptions.day,mode:"dropdown"}}}
                                .value=${void 0===(null===(s=this._config.dateFormat)||void 0===s?void 0:s.day)?"undefined":null===(l=this._config.dateFormat)||void 0===l?void 0:l.day}
                                .label= ${"Day Display"}
                                propertyName="dateFormat.day"
                                .transformData=${e=>"undefined"===e?"hidden":e}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._dateFormatOptions.year,mode:"dropdown"}}}
                                .value=${void 0===(null===(c=this._config.dateFormat)||void 0===c?void 0:c.year)?"undefined":null===(h=this._config.dateFormat)||void 0===h?void 0:h.year}
                                .label= ${"Year Display"}
                                propertyName="dateFormat.year"
                                .transformData=${e=>"undefined"===e?"hidden":e}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </ha-expansion-panel>

                <!-- Background Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._imageSourceOptions,mode:"dropdown"}}}
                                .value=${this._config.imageSource||"none"}
                                .label= ${"Image Source"}
                                propertyName="imageSource"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:0,max:1,step:.05,mode:"slider",slider_ticks:!0}}}
                                .value=${void 0!==this._config.backgroundOpacity?this._config.backgroundOpacity:.5}
                                .label= ${"Background Opacity"}
                                propertyName="backgroundOpacity"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:30,max:300,step:10,mode:"slider",slider_ticks:!0}}}
                                .value=${this._config.backgroundRotationInterval||90}
                                .label= ${"Rotation Interval (sec)"}
                                propertyName="backgroundRotationInterval"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </ha-expansion-panel>

                ${"local"===this._config.imageSource?H`
                    <!-- Background Images Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Local Background Images</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure local image URLs. Images will be automatically categorized by weather
                                condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day
                                (sunrise-sunset, day, night) in your file paths.
                            </div>

                            <div class="section-subheader">Background Images</div>

                            ${this._backgroundImages.map((e,t)=>H`
                                <div class="image-row">
                                    <div class="image-url">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{text:{type:"text"}}}
                                                .value=${e.url||""}
                                                .label= ${"Image URL"}
                                                propertyName="backgroundImages.${t}.url"
                                                @value-changed=${this._handleFormValueChanged}
                                        ></ha-row-selector>
                                    </div>
                                    <div class="image-actions">
                                        <ha-icon-button
                                                .path=${"M19,13H5V11H19V13Z"}
                                                @click=${()=>this._removeBackgroundImage(t)}
                                        ></ha-icon-button>
                                    </div>
                                    <div class="image-weather">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{select:{options:Object.values(Ie).map(e=>({value:e,label:e}))}}}
                                                .value=${e.weather}
                                                .label= ${"Weather Condition"}
                                                propertyName="backgroundImages.${t}.weather"
                                                @value-changed=${this._handleFormValueChanged}
                                        ></ha-row-selector>
                                    </div>
                                    <div class="image-time">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{select:{options:Object.values(ke).map(e=>({value:e,label:e}))}}}
                                                .value=${e.timeOfDay}
                                                .label= ${"Time of Day"}
                                                propertyName="backgroundImages.${t}.timeOfDay"
                                                @value-changed=${this._handleFormValueChanged}
                                        ></ha-row-selector>
                                    </div>
                                </div>
                            `)}

                            <mwc-button @click=${this._addBackgroundImage}>Add Background Image</mwc-button>
                        </div>
                    </ha-expansion-panel>
                `:""}

                ${"unsplash"===this._config.imageSource?H`
                    <!-- Unsplash Configuration Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Unsplash Configuration</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure Unsplash image source settings. An API key is required to use Unsplash.
                                You can obtain a free API key from the Unsplash Developer portal.
                            </div>

                            <div class="row">
                                <div class="label">Category</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Category"
                                            .value=${(null===(d=this._config.imageConfig)||void 0===d?void 0:d.category)||"nature"}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const o=JSON.parse(JSON.stringify(this._config));o.imageConfig||(o.imageConfig={}),o.imageConfig.category=t.value||"nature",this._config=o,jo(this,"config-changed",{config:o})}}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <ha-row-selector
                                    min="1"
                                    max="30"
                                    .hass=${this.hass}
                                    .selector=${{text:{type:"number"}}}
                                    .value=${(null===(g=this._config.imageConfig)||void 0===g?void 0:g.count)||"5"}
                                    .label= ${"Number of Photos"}
                                    propertyName="imageConfig.count"
                                    transformData=${e=>{let t=parseInt(e||"5",10);return(isNaN(t)||t<1)&&(t=1),t>30&&(t=30),t}}
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <div class="info-text">
                                An API key is required. Without a valid API key, the Unsplash image source will not
                                work.
                            </div>

                            ${H`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="API Key"
                                                .value=${(null===(u=this._config.imageConfig)||void 0===u?void 0:u.apiKey)||""}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const o=JSON.parse(JSON.stringify(this._config));o.imageConfig||(o.imageConfig={}),o.imageConfig.apiKey=t.value||"",this._config=o,jo(this,"config-changed",{config:o})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${(null===(p=this._config.imageConfig)||void 0===p?void 0:p.contentFilter)||"high"}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const o=JSON.parse(JSON.stringify(this._config));o.imageConfig||(o.imageConfig={}),o.imageConfig.contentFilter=t.value||"high",this._config=o,jo(this,"config-changed",{config:o})}}
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

                ${"sensor"===this._config.imageSource?H`
                    <!-- Sensor Images Configuration Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Sensor Images Configuration</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure the sensor that provides the image list. The sensor should have a "files"
                                attribute
                                that contains an array of image URLs.
                            </div>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .labelPosition=${So.Top}
                                    .selector=${{entity:{include_entities:this._sensorsWithFilesAttr}}}
                                    .value=${(null===(m=this._config.imageConfig)||void 0===m?void 0:m.entity)||""}
                                    .label= ${"Sensor Entity"}
                                    propertyName="imageConfig.entity"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <div class="info-text">
                                The sensor should have a "files" attribute that contains an array of image URLs.
                                Images will be automatically categorized by weather condition and time of day based on
                                their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day
                                (sunrise-sunset, day, night) in your file paths.
                            </div>
                        </div>
                    </ha-expansion-panel>
                `:""}

                <!-- Sensors Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Sensors</h3>
                    <div class="content">
                        ${this._sensors.map((e,t)=>H`
                            <div class="sensor-row">

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{type:"text"}}}
                                        .value=${e.label||""}
                                        .label=${"Label"}
                                        .labelPosition=${So.Top}
                                        propertyName="sensors.${t}.label"
                                        @value-changed=${this._handleFormValueChanged}
                                        style="flex: 0 0 30%; margin-right: 8px; overflow: hidden;"
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{entity:{filter:{domain:["sensor","binary_sensor","input_text","input_number","input_datetime","sun","weather"]}}}}
                                        .value=${e.entity||""}
                                        .label=${"Entity"}
                                        .labelPosition=${So.Top}
                                        propertyName="sensors.${t}.entity"
                                        @value-changed=${this._handleFormValueChanged}
                                        style="flex: 0 0 60%; overflow: hidden;"
                                ></ha-row-selector>

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
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${this._config.showWeather||!1}
                                .label= ${"Show Weather"}
                                .helper= ${"Display weather forecast"}
                                propertyName="showWeather"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${this._config.showWeather?H`
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{type:"text"}}}
                                    .value=${this._config.weatherTitle||"Weather"}
                                    .label= ${"Weather Title"}
                                    propertyName="weatherTitle"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select:{options:this._weatherProviderOptions,mode:"dropdown"}}}
                                    .value=${this._config.weatherProvider||"openweathermap"}
                                    .label= ${"Weather Provider"}
                                    propertyName="weatherProvider"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${"openweathermap"===this._config.weatherProvider?H`
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{type:"text"}}}
                                        .value=${(null===(f=this._config.weatherConfig)||void 0===f?void 0:f.apiKey)||""}
                                        .label= ${"API Key"}
                                        .helper= ${"OpenWeatherMap API Key"}
                                        propertyName="weatherConfig.apiKey"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{number:{min:-90,max:90,step:1e-4,mode:"box"}}}
                                        .value=${(null===(v=this._config.weatherConfig)||void 0===v?void 0:v.latitude)||50.0755}
                                        .label=${"Latitude"}
                                        propertyName="weatherConfig.latitude"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{number:{min:-180,max:180,step:1e-4,mode:"box"}}}
                                        .value=${(null===(w=this._config.weatherConfig)||void 0===w?void 0:w.longitude)||14.4378}
                                        .label=${"Longitude"}
                                        propertyName="weatherConfig.longitude"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{select:{options:this._unitsOptions,mode:"dropdown"}}}
                                        .value=${(null===(y=this._config.weatherConfig)||void 0===y?void 0:y.units)||"metric"}
                                        .label=${"Units"}
                                        propertyName="weatherConfig.units"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            `:""}

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select:{options:this._weatherDisplayModeOptions,mode:"dropdown"}}}
                                    .value=${this._config.weatherDisplayMode||"both"}
                                    .label= ${"Display Mode"}
                                    propertyName="weatherDisplayMode"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${"forecast"===this._config.weatherDisplayMode||"both"===this._config.weatherDisplayMode?H`
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{number:{min:1,max:7,step:1,mode:"slider"}}}
                                        .value=${this._config.weatherForecastDays||3}
                                        .label= ${"Forecast Days"}
                                        .helper=${`${this._config.weatherForecastDays||3} days`}
                                        propertyName="weatherForecastDays"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{number:{min:1,step:1,mode:"box"}}}
                                        .value=${Math.floor((this._config.weatherUpdateInterval||1800)/60)}
                                        .label= ${"Update Interval"}
                                        .helper= ${"Update interval in minutes (min: 1)"}
                                        propertyName="weatherUpdateInterval"
                                        .transformData=${e=>60*e}
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            `:""}
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===this._config.enableTransportation?H`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <div class="content">

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select:{options:this._getTransportationProviderOptions(),mode:"dropdown"}}}
                                    .value=${(null===(b=this._config.transportation)||void 0===b?void 0:b.provider)||"idsjmk"}
                                    .label= ${"Transportation Provider"}
                                    propertyName="transportation.provider"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:1,max:5,step:1,mode:"slider"}}}
                                    .value=${(null===($=this._config.transportation)||void 0===$?void 0:$.maxDepartures)||2}
                                    .label= ${"Global Max Departures"}
                                    .helper=${`${(null===(_=this._config.transportation)||void 0===_?void 0:_.maxDepartures)||2} departures`}
                                    propertyName="transportation.maxDepartures"
                                    @value-changed=${e=>{this._handleFormValueChanged(e),this._loadStops()}}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{boolean:{}}}
                                    .value=${!0===(null===(C=this._config.transportation)||void 0===C?void 0:C.onDemand)}
                                    .label= ${"Show on Demand"}
                                    .helper= ${"Only show departures when clicked"}
                                    propertyName="transportation.onDemand"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${!0===(null===(x=this._config.transportation)||void 0===x?void 0:x.onDemand)?H`
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{number:{min:1,max:10,step:1,mode:"box"}}}
                                        .value=${(null===(S=this._config.transportation)||void 0===S?void 0:S.autoHideTimeout)||5}
                                        .label= ${"Auto-Hide Timeout"}
                                        .helper= ${"Auto-hide timeout in minutes (1-10)"}
                                        propertyName="transportation.autoHideTimeout"
                                        .transformData=${e=>Math.max(Math.min(e||5,10),1)}
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            `:""}

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:1,step:1,mode:"box"}}}
                                    .value=${Math.floor((this._config.transportationUpdateInterval||60)/60)}
                                    .label= ${"Update Interval"}
                                    .helper= ${"Update interval in minutes (min: 1)"}
                                    propertyName="transportationUpdateInterval"
                                    .transformData=${e=>60*Math.max(e||1,1)}
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <div class="section-subheader">Stops</div>

                            ${this._stops.map((e,t)=>H`
                                <div class="sensor-row">
                                    <div class="sensor-entity">
                                        <ha-textfield
                                                label="Stop ID"
                                                type="number"
                                                .value=${e.stopId||1793}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const o=e.target;o&&this._stopChanged(t,"stopId",parseInt(o.value||"1793",10))}}
                                        ></ha-textfield>
                                    </div>
                                    <div class="sensor-label">
                                        <ha-textfield
                                                label="Post ID"
                                                type="number"
                                                .value=${e.postId||3}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const o=e.target;o&&this._stopChanged(t,"postId",parseInt(o.value||"3",10))}}
                                        ></ha-textfield>
                                    </div>
                                </div>
                                <div class="sensor-row" style="margin-bottom: 16px; padding-bottom: 16px;">
                                    <div class="sensor-entity" style="width: 100%;">
                                        <ha-textfield
                                                label="Stop Name (optional)"
                                                .value=${e.name||""}
                                                style="width: 100%;"
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const o=e.target;o&&this._stopChanged(t,"name",o.value||"")}}
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

                <!-- Action Bar Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Action Bar</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${!0===this._config.enableActionBar}
                                .label= ${"Enable Action Bar"}
                                propertyName="enableActionBar"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${!0===this._config.enableActionBar?H`
                            <div class="info-text">
                                Configure action buttons that will appear at the bottom of the card.
                                Action bar and transportation cannot be displayed simultaneously - action bar takes
                                precedence.
                            </div>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select:{options:[{value:fo.Left,label:"Left"},{value:fo.Center,label:"Center"},{value:fo.Right,label:"Right"}],mode:"dropdown"}}}
                                    .value=${(null===(k=this._config.actionBar)||void 0===k?void 0:k.alignment)||fo.Center}
                                    .label= ${"Button Alignment"}
                                    .helper= ${"Align buttons to the left, center, or right"}
                                    .labelPosition=${So.Top}
                                    propertyName="actionBar.alignment"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                                    .value=${void 0!==(null===(I=this._config.actionBar)||void 0===I?void 0:I.backgroundOpacity)?this._config.actionBar.backgroundOpacity:.3}
                                    .label= ${"Background Opacity"}
                                    .helper= ${"Adjust the transparency of the action bar background (0 = fully transparent, 1 = fully opaque)"}
                                    .labelPosition=${So.Top}
                                    propertyName="actionBar.backgroundOpacity"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <div class="section-subheader">Actions</div>

                            ${this._actions.map((e,t)=>H`

                                <ha-row-selector
                                        style="flex: 2;"
                                        .hass=${this.hass}
                                        .selector=${{select:{options:this._getActionTypeOptions(),mode:"dropdown"}}}
                                        .value=${e.actionId}
                                        .label= ${"Action Type"}
                                        .actionIcon=${"M19,13H5V11H19V13Z"}
                                        .actionTooltip= ${"Remove action"}
                                        @value-changed=${e=>{this._actionChanged(t,"actionId",e.detail.value)}}
                                        @action-click=${()=>this._removeAction(t)}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{type:"text"}}}
                                        .value=${e.title||""}
                                        .label=${"Title"}
                                        .helper= ${"Title for the action button"}
                                        .labelPosition=${So.Hidden}
                                        @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const o=e.detail.value;this._actionChanged(t,"title",o||"")}}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{icon:{placeholder:"mdi:clock"}}}
                                        .value=${e.icon||""}
                                        .label=${"Icon"}
                                        .helper= ${"Icon for the action button"}
                                        .labelPosition=${So.Hidden}
                                        @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const o=e.detail.value;this._actionChanged(t,"icon",o||"")}}
                                ></ha-row-selector>

                                <!-- Editor components are now dynamically created by the factory pattern -->
                                ${this._createEditorTagComponent(e,t)}

                                </div>
                            `)}

                            <mwc-button @click=${this._addAction}>Add Action</mwc-button>
                        `:""}
                    </div>
                </ha-expansion-panel>
        `:H``}};zo([me({type:Object})],Ho.prototype,"hass",void 0),zo([me({type:Object})],Ho.prototype,"_config",void 0),zo([me({type:Array})],Ho.prototype,"_sensors",void 0),zo([me({type:Array})],Ho.prototype,"_backgroundImages",void 0),zo([me({type:Array})],Ho.prototype,"_stops",void 0),zo([me({type:Array})],Ho.prototype,"_actions",void 0),zo([me({type:Array})],Ho.prototype,"_sensorsWithFilesAttr",void 0),Ho=zo([ge("wall-clock-card-editor")],Ho);var Vo=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let Jo=class extends he{constructor(){super(...arguments),this.disabled=!1,this.required=!0}render(){return H`
            <ha-textfield
                    type="color"
                    .value=${this.value||""}
                    .label=${this.label}
                    .helper=${this.helper}
                    .disabled=${this.disabled}
                    .required=${this.required}
                    @change=${this._valueChanged}
            ></ha-textfield>
        `}_valueChanged(e){const t=e.target.value;t&&!/^#[0-9a-fA-F]{6}$/.test(t)||jo(this,"value-changed",{value:t})}};Jo.styles=a`
        :host {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        ha-textfield {
            --text-field-padding: 8px;
            min-width: 75px;
            flex-grow: 1;
            margin: 0;
        }
    `,Vo([me({attribute:!1})],Jo.prototype,"hass",void 0),Vo([me({attribute:!1})],Jo.prototype,"selector",void 0),Vo([me()],Jo.prototype,"value",void 0),Vo([me()],Jo.prototype,"label",void 0),Vo([me()],Jo.prototype,"helper",void 0),Vo([me({type:Boolean,reflect:!0})],Jo.prototype,"disabled",void 0),Vo([me({type:Boolean})],Jo.prototype,"required",void 0),Jo=Vo([ge("ha-selector-color_hex")],Jo);var qo=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let Zo=class extends he{constructor(){super(...arguments),this.disabled=!1,this.required=!0,this.labelPosition=So.Left}render(){return H`
            <div class="row ${this.labelPosition.toLowerCase()}">
                ${this.label&&this.labelPosition!==So.Hidden?H`
                    <div class="label">${this.label}</div>
                `:""}
                <div class="value">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${this.selector}
                        .value=${this.value||""}
                        .helper=${this.helper}
                        .disabled=${this.disabled}
                        .required=${this.required}
                        @value-changed=${this._valueChanged}
                    ></ha-selector>
                </div>
                ${this.actionIcon?H`
                    <div class="action-button">
                        <ha-icon-button
                            .path=${this.actionIcon}
                            .title=${this.actionTooltip||""}
                            @click=${this._handleActionClick}
                        ></ha-icon-button>
                    </div>
                `:""}
            </div>
        `}_handleActionClick(e){e.stopPropagation(),jo(this,"action-click",{})}_valueChanged(e){e.stopPropagation();let t=e.detail.value;this.transformData&&(t=this.transformData(t)),jo(this,"value-changed",{value:t,propertyName:this.propertyName})}};Zo.styles=a`
        .row {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
        }

        /* Default style for left position */
        .row.left {
            flex-direction: row;
        }

        .row.left .label {
            flex: 0 0 30%;
            font-weight: 500;
        }

        /* Style for top position */
        .row.top {
            flex-direction: column;
            align-items: flex-start;
        }

        .row.top .label {
            margin-bottom: 8px;
            font-weight: 500;
        }

        .row.top .value {
            width: 100%;
        }

        /* Common styles */
        .value {
            flex: 1;
            display: flex;
            align-items: center;
            overflow: hidden; /* Already present */
            text-overflow: ellipsis; /* Add this */
            white-space: nowrap; /* Add this */
        }

        ha-selector {
            width: 100%;
            overflow: hidden; /* Add this */
            text-overflow: ellipsis; /* Add this */
        }

        /* Action button styles */
        .action-button {
            display: flex;
            align-items: center;
            margin-left: 8px;
        }
    `,qo([me({attribute:!1})],Zo.prototype,"hass",void 0),qo([me({attribute:!1})],Zo.prototype,"selector",void 0),qo([me()],Zo.prototype,"value",void 0),qo([me()],Zo.prototype,"label",void 0),qo([me()],Zo.prototype,"helper",void 0),qo([me({type:Boolean,reflect:!0})],Zo.prototype,"disabled",void 0),qo([me({type:Boolean})],Zo.prototype,"required",void 0),qo([me()],Zo.prototype,"propertyName",void 0),qo([me({attribute:!1})],Zo.prototype,"transformData",void 0),qo([me({attribute:!1})],Zo.prototype,"labelPosition",void 0),qo([me({attribute:!1})],Zo.prototype,"actionIcon",void 0),qo([me({attribute:!1})],Zo.prototype,"actionTooltip",void 0),Zo=qo([ge("ha-row-selector")],Zo);var Ko=function(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a};let Go=class extends he{constructor(){super(),this.config={},this.consecutiveFailures=0,this.isRetrying=!1,this.clockComponent=document.createElement("ha-clock"),this.sensorComponent=document.createElement("ha-sensors"),this.weatherComponent=document.createElement("ha-weather"),this.backgroundImageComponent=document.createElement("ha-background-image"),this.transportationComponent=document.createElement("ha-transportation"),this.actionBarComponent=document.createElement("ha-action-bar"),this.weatherSignalProvider=new Gt,xe.info("%c WALL-CLOCK-CARD %c 2.0.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language,this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language,this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor,this.actionBarComponent.actionBar=this.config.actionBar,this.actionBarComponent.enableActionBar=!1!==this.config.enableActionBar,this.actionBarComponent.fontColor=this.config.fontColor}connectedCallback(){super.connectedCallback(),this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.weatherComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor,this.hass&&(this.transportationComponent.hass=this.hass),this.actionBarComponent.actionBar=this.config.actionBar,this.actionBarComponent.enableActionBar=!1!==this.config.enableActionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.hass&&(this.actionBarComponent.hass=this.hass),this.initConnectCallbackAsync()}async initConnectCallbackAsync(){await this.weatherComponent.controller.ready,await this.backgroundImageComponent.controller.ready,await this.clockComponent.controller.ready,await this.sensorComponent.controller.ready,await this.transportationComponent.controller.ready,await this.actionBarComponent.controller.ready,be({level:Ce(this.config.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1});try{await async function(){xe.debug("Loading all translations");const e=je().map(e=>async function(e){try{Be[e]?(Le[e]=Be[e],xe.debug(`Loaded translations for ${e}`)):xe.warn(`No embedded translations found for ${e}`)}catch(t){xe.error(`Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),xe.debug("Loaded translations for all languages")}catch(e){xe.error("Error loading translations:",e)}this.config.showWeather||this.weatherSignalProvider.updateWeatherSignal(Ie.All)}initBackgroundImageComponent(){var e,t,o,i,n;const r={imageSourceId:this.config.imageSource||"picsum",backgroundImages:this.config.backgroundImages,entity:null===(e=this.config.imageConfig)||void 0===e?void 0:e.entity,apiKey:null===(t=this.config.imageConfig)||void 0===t?void 0:t.apiKey,contentFilter:null===(o=this.config.imageConfig)||void 0===o?void 0:o.contentFilter,category:null===(i=this.config.imageConfig)||void 0===i?void 0:i.category,count:null===(n=this.config.imageConfig)||void 0===n?void 0:n.count};this.backgroundImageComponent.backgroundOpacity=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5,this.backgroundImageComponent.config={imageSourceConfig:r,backgroundRotationInterval:this.config.backgroundRotationInterval},this.backgroundImageComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),xe.debug("Background image component initialized")}disconnectedCallback(){super.disconnectedCallback()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.initAfterSetConfigAsync(e)}async initAfterSetConfigAsync(e){const t=e.imageSource||"none";let o={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(o={...o,...e.timeFormat},void 0!==e.timeFormat.hour12&&(o.hour12=Boolean(e.timeFormat.hour12)),void 0===e.timeFormat.second&&(o.second=void 0));let i={weekday:"long",year:"numeric",month:"long",day:"numeric"};e.dateFormat&&(i={...i,...e.dateFormat},void 0===e.dateFormat.year&&(i.year=void 0));let n=e.timeZone;!n&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(n=this.hass.config.time_zone),this.config={...e,timeFormat:o,dateFormat:i,backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:t,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",timeZone:n},this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.weatherComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor,this.actionBarComponent.actionBar=this.config.actionBar,this.actionBarComponent.enableActionBar=!1!==this.config.enableActionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.config.showWeather||this.backgroundImageComponent.controller.ready.then(()=>{this.weatherSignalProvider.updateWeatherSignal(Ie.All)})}updated(e){if(e.has("hass")&&this.hass&&(this.sensorComponent.hass=this.hass,this.transportationComponent.hass=this.hass,this.actionBarComponent.hass=this.hass),e.has("config")&&this.config){const e=this.config.logLevel||"info",t=Ce(e);xe.debug(`Updating log level to ${e} (${fe[t]})`),be({level:t,prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}}static get styles(){return a`
            /* Include ClockComponent styles */
            ${r(qe.styles)}
            /* Include SensorComponent styles */
            ${r(Ge.styles)}
            /* Include BackgroundImageComponent styles */
            ${r(oo.styles)}
            /* Include WeatherComponent styles */
            ${r(lo.styles)}
            /* Include TransportationComponent styles */
            ${r(mo.styles)}
            /* Include ActionBarComponent styles */
            ${r(_o.styles)}
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

        `}render(){const e=this.config.transportation&&!1!==this.config.enableTransportation,t=this.config.actionBar&&!1!==this.config.enableActionBar;let o="";return t?o="margin-top: -80px;":e&&(o=`margin-top: -${30*(this.config.transportation.maxDepartures||3)+80}px;`),H`
            <ha-card style="color: rgb( ${this.config.fontColor});">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather?H`<div style="position: absolute; top: 16px; right: 16px; max-width: 40%; max-height: 60%; z-index: 3; padding-left: 8px;">
                            ${this.weatherComponent}
                        </div>`:""}
                <div style="${o}">
                    ${this.clockComponent}
                </div>
                ${t?"":this.transportationComponent}
                ${this.actionBarComponent}
            </ha-card>
        `}};Ko([me({type:Object})],Go.prototype,"hass",void 0),Ko([me({type:Object})],Go.prototype,"config",void 0),Ko([me({type:Number})],Go.prototype,"consecutiveFailures",void 0),Ko([me({type:Boolean})],Go.prototype,"isRetrying",void 0),Go=Ko([ge("wall-clock-card")],Go),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
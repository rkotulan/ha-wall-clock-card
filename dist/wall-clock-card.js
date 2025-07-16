/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;class s{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=n.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&n.set(i,e))}return e}toString(){return this.cssText}}const r=e=>new s("string"==typeof e?e:e+"",void 0,i),o=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new s(n,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return r(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:d,getPrototypeOf:g}=Object,m=globalThis,f=m.trustedTypes,p=f?f.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(e,t)=>e,w={toAttribute(e,t){switch(t){case Boolean:e=e?p:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class k extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&c(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const r=n?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...u(e),...d(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(t)i.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of n){const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:w;this._$Em=n;const r=s.fromAttribute(t,e.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const n=this.constructor,s=this[e];if(i??=n.getPropertyOptions(e),!((i.hasChanged??b)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,v?.({ReactiveElement:k}),(m.reactiveElementVersions??=[]).push("2.1.1");const S=globalThis,$=S.trustedTypes,C=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,I="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+x,N=`<${O}>`,T=document,D=()=>T.createComment(""),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,E=e=>M(e)||"function"==typeof e?.[Symbol.iterator],F="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,W=/>/g,L=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,z=/"/g,V=/^(?:script|style|textarea|title)$/i,j=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),H=j(1),Z=j(2),J=(j(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),B=new WeakMap,Y=T.createTreeWalker(T,129);function G(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,n=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=P;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===P?"!--"===l[1]?o=U:void 0!==l[1]?o=W:void 0!==l[2]?(V.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=L):void 0!==l[3]&&(o=L):o===L?">"===l[0]?(o=s??P,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?L:'"'===l[3]?z:R):o===z||o===R?o=L:o===U||o===W?o=P:(o=L,s=void 0);const u=o===L&&e[t+1].startsWith("/>")?" ":"";r+=o===P?i+N:c>=0?(n.push(a),i.slice(0,c)+I+i.slice(c)+x+u):i+x+(-2===c?t:u)}return[G(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class Q{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,r=0;const o=e.length-1,a=this.parts,[l,c]=K(e,t);if(this.el=Q.createElement(l,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=Y.nextNode())&&a.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(I)){const t=c[r++],i=n.getAttribute(e).split(x),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?ne:"?"===o[1]?se:"@"===o[1]?re:ie}),n.removeAttribute(e)}else e.startsWith(x)&&(a.push({type:6,index:s}),n.removeAttribute(e));if(V.test(n.tagName)){const e=n.textContent.split(x),t=e.length-1;if(t>0){n.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],D()),Y.nextNode(),a.push({type:2,index:++s});n.append(e[t],D())}}}else if(8===n.nodeType)if(n.data===O)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=n.data.indexOf(x,e+1));)a.push({type:7,index:s}),e+=x.length-1}s++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,n){if(t===J)return t;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const r=A(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,n)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??T).importNode(t,!0);Y.currentNode=n;let s=Y.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new te(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new oe(s,this,e)),this._$AV.push(t),a=i[++o]}r!==a?.index&&(s=Y.nextNode(),r++)}return Y.currentNode=T,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),A(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==J&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):E(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&A(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new ee(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new Q(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new te(this.O(D()),this.O(D()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,n){const s=this.strings;let r=!1;if(void 0===s)e=X(this,e,t,0),r=!A(e)||e!==this._$AH&&e!==J,r&&(this._$AH=e);else{const n=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=X(this,n[i+o],t,o),a===J&&(a=this._$AH[o]),r||=!A(a)||a!==this._$AH[o],a===q?e=q:e!==q&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}r&&!n&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ne extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class se extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class re extends ie{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===J)return;const i=this._$AH,n=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==q&&(i===q||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ae={M:I,P:x,A:O,C:1,L:K,R:ee,D:E,V:X,I:te,H:ie,N:se,U:re,B:ne,F:oe},le=S.litHtmlPolyfillSupport;le?.(Q,te),(S.litHtmlVersions??=[]).push("3.3.1");const ce=globalThis;class he extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(void 0===s){const e=i?.renderBefore??null;n._$litPart$=s=new te(t.insertBefore(D(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}he._$litElement$=!0,he.finalized=!0,ce.litElementHydrateSupport?.({LitElement:he});const ue=ce.litElementPolyfillSupport;ue?.({LitElement:he}),(ce.litElementVersions??=[]).push("4.2.1");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ge={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},me=(e=ge,t,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,s,e)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];t.call(this,i),this.requestUpdate(n,s,e)}}throw Error("Unsupported decorator location: "+n)};function fe(e){return(t,i)=>"object"==typeof i?me(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}var pe;!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR",e[e.NONE=4]="NONE"}(pe||(pe={}));const ve={level:pe.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let ye={...ve};const we=[];function be(e){const t=ye.level;ye={...ve,...e},t!==ye.level&&console.log(`[LOGGER] Log level changed from ${pe[t]} to ${pe[ye.level]}`)}function _e(e,t,i,...n){var s;if(e<ye.level)return;const r=function(e,t,i){const{prefix:n,enableTimestamps:s,enableSourceTracking:r}=ye;let o="";return s&&(o+=`[${(new Date).toISOString()}] `),o+=`[${pe[e]}] `,n&&(o+=`[${n}] `),t&&r&&(o+=`[${t}] `),o+=i,o}(e,t,i);if(ye.logToConsole)switch(e){case pe.DEBUG:console.debug(r,...n);break;case pe.INFO:console.log(r,...n);break;case pe.WARN:console.warn(r,...n);break;case pe.ERROR:console.error(r,...n)}if(ye.logToStorage){let e=r;if(n.length>0)try{e+=" "+n.map(e=>"object"==typeof e?JSON.stringify(e):String(e)).join(" ")}catch(t){e+=" [Arguments could not be stringified]"}we.push(e);const t=null!==(s=ye.maxStoredLogs)&&void 0!==s?s:100;we.length>t&&we.splice(0,we.length-t)}}function ke(e){return{debug:(t,...i)=>_e(pe.DEBUG,e,t,...i),info:(t,...i)=>_e(pe.INFO,e,t,...i),warn:(t,...i)=>_e(pe.WARN,e,t,...i),error:(t,...i)=>_e(pe.ERROR,e,t,...i),withSource:e=>ke(e)}}function Se(e){switch(e.toLowerCase()){case"debug":return pe.DEBUG;case"info":return pe.INFO;case"warn":default:return pe.WARN;case"error":return pe.ERROR;case"none":return pe.NONE}}const $e=ke("wall-clock");class Ce{static getInstance(){return Ce.instance||(Ce.instance=new Ce),Ce.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&$e.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}registerAll(e){e.forEach(e=>this.register(e))}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}var Ie,xe;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(Ie||(Ie={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(xe||(xe={}));const Oe=[xe.All,xe.ClearSky,xe.Clouds,xe.Rain,xe.Snow,xe.Mist],Ne=[Ie.Unspecified,Ie.SunriseSunset,Ie.Day,Ie.Night];function Te(e,t){if(!e)return;const i=e.toLowerCase();for(const e of t)if(i.includes(e.toLowerCase().replace(" ","-")))return e}class De{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return ke(`${this.id}-source`)}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}async fetchImagesAsync(e,t,i){return this.getLogger().debug(`Fetching images with weather: ${t}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(e,t,i)}async getNextImageUrlAsync(e,t,i){var n;this.getLogger().debug(`GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=t,this.lastTimeOfDay=i);const s=`${t}_${i}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(s)||0===(null===(n=this.imageUrlCache.get(s))||void 0===n?void 0:n.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const n=[...await this.fetchImagesAsync(e,t,i)];this.shuffleArray(n),this.imageUrlCache.set(s,n),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${n.length} images for weather: ${t}, timeOfDay: ${i}`)}const r=this.imageUrlCache.get(s)||[];if(0===r.length)return this.getLogger().warn(`No images available for weather: ${t}, timeOfDay: ${i}`),"";const o=r[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%r.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${o}`),o}filterImagesByWeatherAndTime(e,t,i){if(this.getLogger().debug(`Current time of day: ${i}`),this.getLogger().debug(`Current weather condition: ${t}`),0===e.length)return[];let n=[];return n=e.filter(e=>(e.weather===t||e.weather===xe.All||t===xe.All)&&e.timeOfDay===i),0===n.length&&(n=e.filter(e=>(e.weather===t||e.weather===xe.All||t===xe.All)&&e.timeOfDay===Ie.Unspecified)),0===n.length&&(n=e.filter(e=>e.timeOfDay===i)),0===n.length&&(n=e.filter(e=>e.timeOfDay===Ie.Unspecified)),n.length>0?(this.getLogger().debug(`Found ${n.length} images matching current conditions`),n.map(e=>e.url)):(this.getLogger().info("No matching images found, returning all images"),e.map(e=>e.url))}convertUrlsToBackgroundImages(e){return this.getLogger().debug(`Converting ${e.length} URLs to BackgroundImage objects`),e.map(e=>({url:e,weather:Te(e,Oe)||xe.All,timeOfDay:Te(e,Ne)||Ie.Unspecified}))}}const Ae=new class extends De{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=ke("local-source")}async fetchImagesInternalAsync(e,t,i){return e.backgroundImages&&e.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${e.backgroundImages.length} images`),this.logger.debug(`First image URL: ${e.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(e.backgroundImages,t,i)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Me=new class extends De{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=ke("picsum-source")}async fetchImagesInternalAsync(e,t,i){const n=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${n}`),[n]}getDefaultConfig(){return{}}},Ee=new class extends De{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=ke("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(e,t,i){const n=e.count||5;let s=e.category||"";const r=e.apiKey||"";return this.logger.debug(`Current weather: ${t}, time of day: ${i}`),this.logger.debug(`Using category with weather and time: ${s}`),r?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(r,s,n,t,i,e)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(e,t,i,n,s,r){const o=[],a=(null==r?void 0:r.contentFilter)||"high";let l="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(l=e[0]),e.length>1&&(l+=` ${e.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${e.join(", ")}`)}const c=n.toLowerCase();l+=` ${c}`,"sunrise-sunset"===s?l+=" sunrise sunset dawn dusk":"day"===s?l+=" daylight midday day":"night"===s&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${s}`);try{let t="https://api.unsplash.com/photos/random?";const n=new URLSearchParams({client_id:e,count:i.toString(),orientation:"landscape",content_filter:a});l&&n.append("query",l);const s=new URLSearchParams(n);s.delete("client_id"),s.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${s.toString()}`),t+=n.toString();const r=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${r}`);const c=await fetch(t);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();this.logger.debug(`API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";o.push(t)}),this.logger.debug(`Fetched ${o.length} images from Unsplash API`)}catch(e){throw this.logger.error("Error fetching from Unsplash API:",e),e}return o}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Fe=new class extends De{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=ke("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}async checkEntityAsync(e){try{const t=window.document.querySelector("home-assistant").hass;if(!t)return void this.logger.warn("Could not get Home Assistant instance");const i=t.states[e];if(!i)return void this.logger.warn(`Entity ${e} not found`);this.updateCacheFromEntity(i),this.entityId=e,this.logger.debug(`Checked entity ${e}`)}catch(e){this.logger.error("Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)&&t.every(e=>"string"==typeof e)?(this.cachedImages=this.convertUrlsToBackgroundImages(t),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${t.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(e,t,i){const n=e.entity;if(!n)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(n);const s=Date.now();if(this.cachedImages.length>0&&s-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t,i);try{const e=window.document.querySelector("home-assistant").hass;if(!e)return this.logger.warn("Could not get Home Assistant instance"),[];const s=e.states[n];return s?(this.updateCacheFromEntity(s),this.filterImagesByWeatherAndTime(this.cachedImages,t,i)):(this.logger.warn(`Sensor ${n} not found`),[])}catch(e){return this.logger.error("Error fetching images from sensor:",e),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Pe=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=ke("null-source")}async fetchImagesAsync(e,t,i){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(e,t,i){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Ue={local:Ae,picsum:Me,unsplash:Ee,sensor:Fe};class We{constructor(){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=ke("background-image-manager")}initialize(e={}){const t=e.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${t}`),"none"===t)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var i;if(this.imageSourceId=t||"picsum",this.imageSource=(i=this.imageSourceId,Ue[i]||Pe),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;const n=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...n,...e},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(e,t){if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${e}, time of day: ${t}`);const i=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,e,t);return i?(this.logger.debug(`Got image URL: ${i}`),i):(this.logger.warn("No image URL returned from source"),"")}catch(e){return this.logger.error("Error getting next image URL:",e),""}}getImageSourceId(){return this.imageSourceId}}Ce.getInstance().registerAll([Me,Ae,Ee,Fe]);const Le=[{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","mist":"Mist","light_rain":"Light rain"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Re=Object.fromEntries(Le.map(e=>[e.code,e.translations]));let ze={};function Ve(){return Le.map(e=>e.code)}function je(e,t,i={},n){const s={...i};if(n&&(s.timeZone=n),"hidden"===s.weekday&&(s.weekday=void 0),"hidden"===s.year&&(s.year=void 0),"hidden"===s.month&&(s.month=void 0),"hidden"===s.day&&(s.day=void 0),void 0===s.weekday&&void 0===s.year&&void 0===s.month&&void 0===s.day)return"";const r=function(e){const t=Le.find(t=>t.code===e);return(null==t?void 0:t.locale)||"en-US"}(t);if("short"===s.month){const t=new Intl.DateTimeFormat(r,{month:"short",timeZone:n}).format(e),i={...s};delete i.month;let o=e.toLocaleDateString(r,i);return"2-digit"===s.day?(o=o.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${t}`),o.includes(t)||(o=`${o} ${t}`)):o=e.toLocaleDateString(r,s),o}return e.toLocaleDateString(r,s)}class He{constructor(e,t){this._readyResolve=null,this.host=e,this.logger=ke(t),e.addController(this),this.ready=new Promise(e=>{this._readyResolve=e})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(e=>{this._readyResolve=e}),this.onHostDisconnected()}}class Ze extends Error{}class Je extends Ze{constructor(e){super(`Invalid DateTime: ${e.toMessage()}`)}}class qe extends Ze{constructor(e){super(`Invalid Interval: ${e.toMessage()}`)}}class Be extends Ze{constructor(e){super(`Invalid Duration: ${e.toMessage()}`)}}class Ye extends Ze{}class Ge extends Ze{constructor(e){super(`Invalid unit ${e}`)}}class Ke extends Ze{}class Qe extends Ze{constructor(){super("Zone is an abstract class")}}const Xe="numeric",et="short",tt="long",it={year:Xe,month:Xe,day:Xe},nt={year:Xe,month:et,day:Xe},st={year:Xe,month:et,day:Xe,weekday:et},rt={year:Xe,month:tt,day:Xe},ot={year:Xe,month:tt,day:Xe,weekday:tt},at={hour:Xe,minute:Xe},lt={hour:Xe,minute:Xe,second:Xe},ct={hour:Xe,minute:Xe,second:Xe,timeZoneName:et},ht={hour:Xe,minute:Xe,second:Xe,timeZoneName:tt},ut={hour:Xe,minute:Xe,hourCycle:"h23"},dt={hour:Xe,minute:Xe,second:Xe,hourCycle:"h23"},gt={hour:Xe,minute:Xe,second:Xe,hourCycle:"h23",timeZoneName:et},mt={hour:Xe,minute:Xe,second:Xe,hourCycle:"h23",timeZoneName:tt},ft={year:Xe,month:Xe,day:Xe,hour:Xe,minute:Xe},pt={year:Xe,month:Xe,day:Xe,hour:Xe,minute:Xe,second:Xe},vt={year:Xe,month:et,day:Xe,hour:Xe,minute:Xe},yt={year:Xe,month:et,day:Xe,hour:Xe,minute:Xe,second:Xe},wt={year:Xe,month:et,day:Xe,weekday:et,hour:Xe,minute:Xe},bt={year:Xe,month:tt,day:Xe,hour:Xe,minute:Xe,timeZoneName:et},_t={year:Xe,month:tt,day:Xe,hour:Xe,minute:Xe,second:Xe,timeZoneName:et},kt={year:Xe,month:tt,day:Xe,weekday:tt,hour:Xe,minute:Xe,timeZoneName:tt},St={year:Xe,month:tt,day:Xe,weekday:tt,hour:Xe,minute:Xe,second:Xe,timeZoneName:tt};class $t{get type(){throw new Qe}get name(){throw new Qe}get ianaName(){return this.name}get isUniversal(){throw new Qe}offsetName(e,t){throw new Qe}formatOffset(e,t){throw new Qe}offset(e){throw new Qe}equals(e){throw new Qe}get isValid(){throw new Qe}}let Ct=null;class It extends $t{static get instance(){return null===Ct&&(Ct=new It),Ct}get type(){return"system"}get name(){return(new Intl.DateTimeFormat).resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(e,{format:t,locale:i}){return Ji(e,t,i)}formatOffset(e,t){return Gi(this.offset(e),t)}offset(e){return-new Date(e).getTimezoneOffset()}equals(e){return"system"===e.type}get isValid(){return!0}}const xt=new Map,Ot={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},Nt=new Map;class Tt extends $t{static create(e){let t=Nt.get(e);return void 0===t&&Nt.set(e,t=new Tt(e)),t}static resetCache(){Nt.clear(),xt.clear()}static isValidSpecifier(e){return this.isValidZone(e)}static isValidZone(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch(e){return!1}}constructor(e){super(),this.zoneName=e,this.valid=Tt.isValidZone(e)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(e,{format:t,locale:i}){return Ji(e,t,i,this.name)}formatOffset(e,t){return Gi(this.offset(e),t)}offset(e){if(!this.valid)return NaN;const t=new Date(e);if(isNaN(t))return NaN;const i=function(e){let t=xt.get(e);return void 0===t&&(t=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:e,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"}),xt.set(e,t)),t}(this.name);let[n,s,r,o,a,l,c]=i.formatToParts?function(e,t){const i=e.formatToParts(t),n=[];for(let e=0;e<i.length;e++){const{type:t,value:s}=i[e],r=Ot[t];"era"===t?n[r]=s:Ci(r)||(n[r]=parseInt(s,10))}return n}(i,t):function(e,t){const i=e.format(t).replace(/\u200E/g,""),n=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(i),[,s,r,o,a,l,c,h]=n;return[o,s,r,a,l,c,h]}(i,t);"BC"===o&&(n=1-Math.abs(n));let h=+t;const u=h%1e3;return h-=u>=0?u:1e3+u,(Vi({year:n,month:s,day:r,hour:24===a?0:a,minute:l,second:c,millisecond:0})-h)/6e4}equals(e){return"iana"===e.type&&e.name===this.name}get isValid(){return this.valid}}let Dt={};const At=new Map;function Mt(e,t={}){const i=JSON.stringify([e,t]);let n=At.get(i);return void 0===n&&(n=new Intl.DateTimeFormat(e,t),At.set(i,n)),n}const Et=new Map,Ft=new Map;let Pt=null;const Ut=new Map;function Wt(e){let t=Ut.get(e);return void 0===t&&(t=new Intl.DateTimeFormat(e).resolvedOptions(),Ut.set(e,t)),t}const Lt=new Map;function Rt(e,t,i,n){const s=e.listingMode();return"error"===s?null:"en"===s?i(t):n(t)}class zt{constructor(e,t,i){this.padTo=i.padTo||0,this.floor=i.floor||!1;const{padTo:n,floor:s,...r}=i;if(!t||Object.keys(r).length>0){const t={useGrouping:!1,...i};i.padTo>0&&(t.minimumIntegerDigits=i.padTo),this.inf=function(e,t={}){const i=JSON.stringify([e,t]);let n=Et.get(i);return void 0===n&&(n=new Intl.NumberFormat(e,t),Et.set(i,n)),n}(e,t)}}format(e){if(this.inf){const t=this.floor?Math.floor(e):e;return this.inf.format(t)}return Ei(this.floor?Math.floor(e):Wi(e,3),this.padTo)}}class Vt{constructor(e,t,i){let n;if(this.opts=i,this.originalZone=void 0,this.opts.timeZone)this.dt=e;else if("fixed"===e.zone.type){const t=e.offset/60*-1,i=t>=0?`Etc/GMT+${t}`:`Etc/GMT${t}`;0!==e.offset&&Tt.create(i).valid?(n=i,this.dt=e):(n="UTC",this.dt=0===e.offset?e:e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone)}else"system"===e.zone.type?this.dt=e:"iana"===e.zone.type?(this.dt=e,n=e.zone.name):(n="UTC",this.dt=e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone);const s={...this.opts};s.timeZone=s.timeZone||n,this.dtf=Mt(t,s)}format(){return this.originalZone?this.formatToParts().map(({value:e})=>e).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){const e=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?e.map(e=>{if("timeZoneName"===e.type){const t=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...e,value:t}}return e}):e}resolvedOptions(){return this.dtf.resolvedOptions()}}class jt{constructor(e,t,i){this.opts={style:"long",...i},!t&&Oi()&&(this.rtf=function(e,t={}){const{base:i,...n}=t,s=JSON.stringify([e,n]);let r=Ft.get(s);return void 0===r&&(r=new Intl.RelativeTimeFormat(e,t),Ft.set(s,r)),r}(e,i))}format(e,t){return this.rtf?this.rtf.format(e,t):function(e,t,i="always",n=!1){const s={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},r=-1===["hours","minutes","seconds"].indexOf(e);if("auto"===i&&r){const i="days"===e;switch(t){case 1:return i?"tomorrow":`next ${s[e][0]}`;case-1:return i?"yesterday":`last ${s[e][0]}`;case 0:return i?"today":`this ${s[e][0]}`}}const o=Object.is(t,-0)||t<0,a=Math.abs(t),l=1===a,c=s[e],h=n?l?c[1]:c[2]||c[1]:l?s[e][0]:e;return o?`${a} ${h} ago`:`in ${a} ${h}`}(t,e,this.opts.numeric,"long"!==this.opts.style)}formatToParts(e,t){return this.rtf?this.rtf.formatToParts(e,t):[]}}const Ht={firstDay:1,minimalDays:4,weekend:[6,7]};class Zt{static fromOpts(e){return Zt.create(e.locale,e.numberingSystem,e.outputCalendar,e.weekSettings,e.defaultToEN)}static create(e,t,i,n,s=!1){const r=e||ci.defaultLocale,o=r||(s?"en-US":Pt||(Pt=(new Intl.DateTimeFormat).resolvedOptions().locale,Pt)),a=t||ci.defaultNumberingSystem,l=i||ci.defaultOutputCalendar,c=Ai(n)||ci.defaultWeekSettings;return new Zt(o,a,l,c,r)}static resetCache(){Pt=null,At.clear(),Et.clear(),Ft.clear(),Ut.clear(),Lt.clear()}static fromObject({locale:e,numberingSystem:t,outputCalendar:i,weekSettings:n}={}){return Zt.create(e,t,i,n)}constructor(e,t,i,n,s){const[r,o,a]=function(e){const t=e.indexOf("-x-");-1!==t&&(e=e.substring(0,t));const i=e.indexOf("-u-");if(-1===i)return[e];{let t,n;try{t=Mt(e).resolvedOptions(),n=e}catch(s){const r=e.substring(0,i);t=Mt(r).resolvedOptions(),n=r}const{numberingSystem:s,calendar:r}=t;return[n,s,r]}}(e);this.locale=r,this.numberingSystem=t||o||null,this.outputCalendar=i||a||null,this.weekSettings=n,this.intl=function(e,t,i){return i||t?(e.includes("-u-")||(e+="-u"),i&&(e+=`-ca-${i}`),t&&(e+=`-nu-${t}`),e):e}(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=s,this.fastNumbersCached=null}get fastNumbers(){var e;return null==this.fastNumbersCached&&(this.fastNumbersCached=(!(e=this).numberingSystem||"latn"===e.numberingSystem)&&("latn"===e.numberingSystem||!e.locale||e.locale.startsWith("en")||"latn"===Wt(e.locale).numberingSystem)),this.fastNumbersCached}listingMode(){const e=this.isEnglish(),t=!(null!==this.numberingSystem&&"latn"!==this.numberingSystem||null!==this.outputCalendar&&"gregory"!==this.outputCalendar);return e&&t?"en":"intl"}clone(e){return e&&0!==Object.getOwnPropertyNames(e).length?Zt.create(e.locale||this.specifiedLocale,e.numberingSystem||this.numberingSystem,e.outputCalendar||this.outputCalendar,Ai(e.weekSettings)||this.weekSettings,e.defaultToEN||!1):this}redefaultToEN(e={}){return this.clone({...e,defaultToEN:!0})}redefaultToSystem(e={}){return this.clone({...e,defaultToEN:!1})}months(e,t=!1){return Rt(this,e,tn,()=>{const i="ja"===this.intl||this.intl.startsWith("ja-"),n=(t&=!i)?{month:e,day:"numeric"}:{month:e},s=t?"format":"standalone";if(!this.monthsCache[s][e]){const t=i?e=>this.dtFormatter(e,n).format():e=>this.extract(e,n,"month");this.monthsCache[s][e]=function(e){const t=[];for(let i=1;i<=12;i++){const n=sr.utc(2009,i,1);t.push(e(n))}return t}(t)}return this.monthsCache[s][e]})}weekdays(e,t=!1){return Rt(this,e,on,()=>{const i=t?{weekday:e,year:"numeric",month:"long",day:"numeric"}:{weekday:e},n=t?"format":"standalone";return this.weekdaysCache[n][e]||(this.weekdaysCache[n][e]=function(e){const t=[];for(let i=1;i<=7;i++){const n=sr.utc(2016,11,13+i);t.push(e(n))}return t}(e=>this.extract(e,i,"weekday"))),this.weekdaysCache[n][e]})}meridiems(){return Rt(this,void 0,()=>an,()=>{if(!this.meridiemCache){const e={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[sr.utc(2016,11,13,9),sr.utc(2016,11,13,19)].map(t=>this.extract(t,e,"dayperiod"))}return this.meridiemCache})}eras(e){return Rt(this,e,un,()=>{const t={era:e};return this.eraCache[e]||(this.eraCache[e]=[sr.utc(-40,1,1),sr.utc(2017,1,1)].map(e=>this.extract(e,t,"era"))),this.eraCache[e]})}extract(e,t,i){const n=this.dtFormatter(e,t).formatToParts().find(e=>e.type.toLowerCase()===i);return n?n.value:null}numberFormatter(e={}){return new zt(this.intl,e.forceSimple||this.fastNumbers,e)}dtFormatter(e,t={}){return new Vt(e,this.intl,t)}relFormatter(e={}){return new jt(this.intl,this.isEnglish(),e)}listFormatter(e={}){return function(e,t={}){const i=JSON.stringify([e,t]);let n=Dt[i];return n||(n=new Intl.ListFormat(e,t),Dt[i]=n),n}(this.intl,e)}isEnglish(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||Wt(this.intl).locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:Ni()?function(e){let t=Lt.get(e);if(!t){const i=new Intl.Locale(e);t="getWeekInfo"in i?i.getWeekInfo():i.weekInfo,"minimalDays"in t||(t={...Ht,...t}),Lt.set(e,t)}return t}(this.locale):Ht}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(e){return this.locale===e.locale&&this.numberingSystem===e.numberingSystem&&this.outputCalendar===e.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let Jt=null;class qt extends $t{static get utcInstance(){return null===Jt&&(Jt=new qt(0)),Jt}static instance(e){return 0===e?qt.utcInstance:new qt(e)}static parseSpecifier(e){if(e){const t=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(t)return new qt(qi(t[1],t[2]))}return null}constructor(e){super(),this.fixed=e}get type(){return"fixed"}get name(){return 0===this.fixed?"UTC":`UTC${Gi(this.fixed,"narrow")}`}get ianaName(){return 0===this.fixed?"Etc/UTC":`Etc/GMT${Gi(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(e,t){return Gi(this.fixed,t)}get isUniversal(){return!0}offset(){return this.fixed}equals(e){return"fixed"===e.type&&e.fixed===this.fixed}get isValid(){return!0}}class Bt extends $t{constructor(e){super(),this.zoneName=e}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function Yt(e,t){if(Ci(e)||null===e)return t;if(e instanceof $t)return e;if(function(e){return"string"==typeof e}(e)){const i=e.toLowerCase();return"default"===i?t:"local"===i||"system"===i?It.instance:"utc"===i||"gmt"===i?qt.utcInstance:qt.parseSpecifier(i)||Tt.create(e)}return Ii(e)?qt.instance(e):"object"==typeof e&&"offset"in e&&"function"==typeof e.offset?e:new Bt(e)}const Gt={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},Kt={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},Qt=Gt.hanidec.replace(/[\[|\]]/g,"").split(""),Xt=new Map;function ei({numberingSystem:e},t=""){const i=e||"latn";let n=Xt.get(i);void 0===n&&(n=new Map,Xt.set(i,n));let s=n.get(t);return void 0===s&&(s=new RegExp(`${Gt[i]}${t}`),n.set(t,s)),s}let ti,ii=()=>Date.now(),ni="system",si=null,ri=null,oi=null,ai=60,li=null;class ci{static get now(){return ii}static set now(e){ii=e}static set defaultZone(e){ni=e}static get defaultZone(){return Yt(ni,It.instance)}static get defaultLocale(){return si}static set defaultLocale(e){si=e}static get defaultNumberingSystem(){return ri}static set defaultNumberingSystem(e){ri=e}static get defaultOutputCalendar(){return oi}static set defaultOutputCalendar(e){oi=e}static get defaultWeekSettings(){return li}static set defaultWeekSettings(e){li=Ai(e)}static get twoDigitCutoffYear(){return ai}static set twoDigitCutoffYear(e){ai=e%100}static get throwOnInvalid(){return ti}static set throwOnInvalid(e){ti=e}static resetCaches(){Zt.resetCache(),Tt.resetCache(),sr.resetCache(),Xt.clear()}}class hi{constructor(e,t){this.reason=e,this.explanation=t}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}const ui=[0,31,59,90,120,151,181,212,243,273,304,334],di=[0,31,60,91,121,152,182,213,244,274,305,335];function gi(e,t){return new hi("unit out of range",`you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`)}function mi(e,t,i){const n=new Date(Date.UTC(e,t-1,i));e<100&&e>=0&&n.setUTCFullYear(n.getUTCFullYear()-1900);const s=n.getUTCDay();return 0===s?7:s}function fi(e,t,i){return i+(Li(e)?di:ui)[t-1]}function pi(e,t){const i=Li(e)?di:ui,n=i.findIndex(e=>e<t);return{month:n+1,day:t-i[n]}}function vi(e,t){return(e-t+7)%7+1}function yi(e,t=4,i=1){const{year:n,month:s,day:r}=e,o=fi(n,s,r),a=vi(mi(n,s,r),i);let l,c=Math.floor((o-a+14-t)/7);return c<1?(l=n-1,c=Hi(l,t,i)):c>Hi(n,t,i)?(l=n+1,c=1):l=n,{weekYear:l,weekNumber:c,weekday:a,...Ki(e)}}function wi(e,t=4,i=1){const{weekYear:n,weekNumber:s,weekday:r}=e,o=vi(mi(n,1,t),i),a=Ri(n);let l,c=7*s+r-o-7+t;c<1?(l=n-1,c+=Ri(l)):c>a?(l=n+1,c-=Ri(n)):l=n;const{month:h,day:u}=pi(l,c);return{year:l,month:h,day:u,...Ki(e)}}function bi(e){const{year:t,month:i,day:n}=e;return{year:t,ordinal:fi(t,i,n),...Ki(e)}}function _i(e){const{year:t,ordinal:i}=e,{month:n,day:s}=pi(t,i);return{year:t,month:n,day:s,...Ki(e)}}function ki(e,t){if(!Ci(e.localWeekday)||!Ci(e.localWeekNumber)||!Ci(e.localWeekYear)){if(!Ci(e.weekday)||!Ci(e.weekNumber)||!Ci(e.weekYear))throw new Ye("Cannot mix locale-based week fields with ISO-based week fields");return Ci(e.localWeekday)||(e.weekday=e.localWeekday),Ci(e.localWeekNumber)||(e.weekNumber=e.localWeekNumber),Ci(e.localWeekYear)||(e.weekYear=e.localWeekYear),delete e.localWeekday,delete e.localWeekNumber,delete e.localWeekYear,{minDaysInFirstWeek:t.getMinDaysInFirstWeek(),startOfWeek:t.getStartOfWeek()}}return{minDaysInFirstWeek:4,startOfWeek:1}}function Si(e){const t=xi(e.year),i=Mi(e.month,1,12),n=Mi(e.day,1,zi(e.year,e.month));return t?i?!n&&gi("day",e.day):gi("month",e.month):gi("year",e.year)}function $i(e){const{hour:t,minute:i,second:n,millisecond:s}=e,r=Mi(t,0,23)||24===t&&0===i&&0===n&&0===s,o=Mi(i,0,59),a=Mi(n,0,59),l=Mi(s,0,999);return r?o?a?!l&&gi("millisecond",s):gi("second",n):gi("minute",i):gi("hour",t)}function Ci(e){return void 0===e}function Ii(e){return"number"==typeof e}function xi(e){return"number"==typeof e&&e%1==0}function Oi(){try{return"undefined"!=typeof Intl&&!!Intl.RelativeTimeFormat}catch(e){return!1}}function Ni(){try{return"undefined"!=typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(e){return!1}}function Ti(e,t,i){if(0!==e.length)return e.reduce((e,n)=>{const s=[t(n),n];return e&&i(e[0],s[0])===e[0]?e:s},null)[1]}function Di(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function Ai(e){if(null==e)return null;if("object"!=typeof e)throw new Ke("Week settings must be an object");if(!Mi(e.firstDay,1,7)||!Mi(e.minimalDays,1,7)||!Array.isArray(e.weekend)||e.weekend.some(e=>!Mi(e,1,7)))throw new Ke("Invalid week settings");return{firstDay:e.firstDay,minimalDays:e.minimalDays,weekend:Array.from(e.weekend)}}function Mi(e,t,i){return xi(e)&&e>=t&&e<=i}function Ei(e,t=2){let i;return i=e<0?"-"+(""+-e).padStart(t,"0"):(""+e).padStart(t,"0"),i}function Fi(e){return Ci(e)||null===e||""===e?void 0:parseInt(e,10)}function Pi(e){return Ci(e)||null===e||""===e?void 0:parseFloat(e)}function Ui(e){if(!Ci(e)&&null!==e&&""!==e){const t=1e3*parseFloat("0."+e);return Math.floor(t)}}function Wi(e,t,i="round"){const n=10**t;switch(i){case"expand":return e>0?Math.ceil(e*n)/n:Math.floor(e*n)/n;case"trunc":return Math.trunc(e*n)/n;case"round":return Math.round(e*n)/n;case"floor":return Math.floor(e*n)/n;case"ceil":return Math.ceil(e*n)/n;default:throw new RangeError(`Value rounding ${i} is out of range`)}}function Li(e){return e%4==0&&(e%100!=0||e%400==0)}function Ri(e){return Li(e)?366:365}function zi(e,t){const i=function(e){return e-12*Math.floor(e/12)}(t-1)+1;return 2===i?Li(e+(t-i)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][i-1]}function Vi(e){let t=Date.UTC(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond);return e.year<100&&e.year>=0&&(t=new Date(t),t.setUTCFullYear(e.year,e.month-1,e.day)),+t}function ji(e,t,i){return-vi(mi(e,1,t),i)+t-1}function Hi(e,t=4,i=1){const n=ji(e,t,i),s=ji(e+1,t,i);return(Ri(e)-n+s)/7}function Zi(e){return e>99?e:e>ci.twoDigitCutoffYear?1900+e:2e3+e}function Ji(e,t,i,n=null){const s=new Date(e),r={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};n&&(r.timeZone=n);const o={timeZoneName:t,...r},a=new Intl.DateTimeFormat(i,o).formatToParts(s).find(e=>"timezonename"===e.type.toLowerCase());return a?a.value:null}function qi(e,t){let i=parseInt(e,10);Number.isNaN(i)&&(i=0);const n=parseInt(t,10)||0;return 60*i+(i<0||Object.is(i,-0)?-n:n)}function Bi(e){const t=Number(e);if("boolean"==typeof e||""===e||!Number.isFinite(t))throw new Ke(`Invalid unit value ${e}`);return t}function Yi(e,t){const i={};for(const n in e)if(Di(e,n)){const s=e[n];if(null==s)continue;i[t(n)]=Bi(s)}return i}function Gi(e,t){const i=Math.trunc(Math.abs(e/60)),n=Math.trunc(Math.abs(e%60)),s=e>=0?"+":"-";switch(t){case"short":return`${s}${Ei(i,2)}:${Ei(n,2)}`;case"narrow":return`${s}${i}${n>0?`:${n}`:""}`;case"techie":return`${s}${Ei(i,2)}${Ei(n,2)}`;default:throw new RangeError(`Value format ${t} is out of range for property format`)}}function Ki(e){return function(e){return["hour","minute","second","millisecond"].reduce((t,i)=>(t[i]=e[i],t),{})}(e)}const Qi=["January","February","March","April","May","June","July","August","September","October","November","December"],Xi=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],en=["J","F","M","A","M","J","J","A","S","O","N","D"];function tn(e){switch(e){case"narrow":return[...en];case"short":return[...Xi];case"long":return[...Qi];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}const nn=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],sn=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],rn=["M","T","W","T","F","S","S"];function on(e){switch(e){case"narrow":return[...rn];case"short":return[...sn];case"long":return[...nn];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}const an=["AM","PM"],ln=["Before Christ","Anno Domini"],cn=["BC","AD"],hn=["B","A"];function un(e){switch(e){case"narrow":return[...hn];case"short":return[...cn];case"long":return[...ln];default:return null}}function dn(e,t){let i="";for(const n of e)n.literal?i+=n.val:i+=t(n.val);return i}const gn={D:it,DD:nt,DDD:rt,DDDD:ot,t:at,tt:lt,ttt:ct,tttt:ht,T:ut,TT:dt,TTT:gt,TTTT:mt,f:ft,ff:vt,fff:bt,ffff:kt,F:pt,FF:yt,FFF:_t,FFFF:St};class mn{static create(e,t={}){return new mn(e,t)}static parseFormat(e){let t=null,i="",n=!1;const s=[];for(let r=0;r<e.length;r++){const o=e.charAt(r);"'"===o?((i.length>0||n)&&s.push({literal:n||/^\s+$/.test(i),val:""===i?"'":i}),t=null,i="",n=!n):n||o===t?i+=o:(i.length>0&&s.push({literal:/^\s+$/.test(i),val:i}),i=o,t=o)}return i.length>0&&s.push({literal:n||/^\s+$/.test(i),val:i}),s}static macroTokenToFormatOpts(e){return gn[e]}constructor(e,t){this.opts=t,this.loc=e,this.systemLoc=null}formatWithSystemDefault(e,t){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(e,{...this.opts,...t}).format()}dtFormatter(e,t={}){return this.loc.dtFormatter(e,{...this.opts,...t})}formatDateTime(e,t){return this.dtFormatter(e,t).format()}formatDateTimeParts(e,t){return this.dtFormatter(e,t).formatToParts()}formatInterval(e,t){return this.dtFormatter(e.start,t).dtf.formatRange(e.start.toJSDate(),e.end.toJSDate())}resolvedOptions(e,t){return this.dtFormatter(e,t).resolvedOptions()}num(e,t=0,i=void 0){if(this.opts.forceSimple)return Ei(e,t);const n={...this.opts};return t>0&&(n.padTo=t),i&&(n.signDisplay=i),this.loc.numberFormatter(n).format(e)}formatDateTimeFromString(e,t){const i="en"===this.loc.listingMode(),n=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,s=(t,i)=>this.loc.extract(e,t,i),r=t=>e.isOffsetFixed&&0===e.offset&&t.allowZ?"Z":e.isValid?e.zone.formatOffset(e.ts,t.format):"",o=(t,n)=>i?function(e,t){return tn(t)[e.month-1]}(e,t):s(n?{month:t}:{month:t,day:"numeric"},"month"),a=(t,n)=>i?function(e,t){return on(t)[e.weekday-1]}(e,t):s(n?{weekday:t}:{weekday:t,month:"long",day:"numeric"},"weekday"),l=t=>{const i=mn.macroTokenToFormatOpts(t);return i?this.formatWithSystemDefault(e,i):t},c=t=>i?function(e,t){return un(t)[e.year<0?0:1]}(e,t):s({era:t},"era");return dn(mn.parseFormat(t),t=>{switch(t){case"S":return this.num(e.millisecond);case"u":case"SSS":return this.num(e.millisecond,3);case"s":return this.num(e.second);case"ss":return this.num(e.second,2);case"uu":return this.num(Math.floor(e.millisecond/10),2);case"uuu":return this.num(Math.floor(e.millisecond/100));case"m":return this.num(e.minute);case"mm":return this.num(e.minute,2);case"h":return this.num(e.hour%12==0?12:e.hour%12);case"hh":return this.num(e.hour%12==0?12:e.hour%12,2);case"H":return this.num(e.hour);case"HH":return this.num(e.hour,2);case"Z":return r({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return r({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return r({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return e.zone.offsetName(e.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return e.zone.offsetName(e.ts,{format:"long",locale:this.loc.locale});case"z":return e.zoneName;case"a":return i?function(e){return an[e.hour<12?0:1]}(e):s({hour:"numeric",hourCycle:"h12"},"dayperiod");case"d":return n?s({day:"numeric"},"day"):this.num(e.day);case"dd":return n?s({day:"2-digit"},"day"):this.num(e.day,2);case"c":case"E":return this.num(e.weekday);case"ccc":return a("short",!0);case"cccc":return a("long",!0);case"ccccc":return a("narrow",!0);case"EEE":return a("short",!1);case"EEEE":return a("long",!1);case"EEEEE":return a("narrow",!1);case"L":return n?s({month:"numeric",day:"numeric"},"month"):this.num(e.month);case"LL":return n?s({month:"2-digit",day:"numeric"},"month"):this.num(e.month,2);case"LLL":return o("short",!0);case"LLLL":return o("long",!0);case"LLLLL":return o("narrow",!0);case"M":return n?s({month:"numeric"},"month"):this.num(e.month);case"MM":return n?s({month:"2-digit"},"month"):this.num(e.month,2);case"MMM":return o("short",!1);case"MMMM":return o("long",!1);case"MMMMM":return o("narrow",!1);case"y":return n?s({year:"numeric"},"year"):this.num(e.year);case"yy":return n?s({year:"2-digit"},"year"):this.num(e.year.toString().slice(-2),2);case"yyyy":return n?s({year:"numeric"},"year"):this.num(e.year,4);case"yyyyyy":return n?s({year:"numeric"},"year"):this.num(e.year,6);case"G":return c("short");case"GG":return c("long");case"GGGGG":return c("narrow");case"kk":return this.num(e.weekYear.toString().slice(-2),2);case"kkkk":return this.num(e.weekYear,4);case"W":return this.num(e.weekNumber);case"WW":return this.num(e.weekNumber,2);case"n":return this.num(e.localWeekNumber);case"nn":return this.num(e.localWeekNumber,2);case"ii":return this.num(e.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(e.localWeekYear,4);case"o":return this.num(e.ordinal);case"ooo":return this.num(e.ordinal,3);case"q":return this.num(e.quarter);case"qq":return this.num(e.quarter,2);case"X":return this.num(Math.floor(e.ts/1e3));case"x":return this.num(e.ts);default:return l(t)}})}formatDurationFromString(e,t){const i="negativeLargestOnly"===this.opts.signMode?-1:1,n=e=>{switch(e[0]){case"S":return"milliseconds";case"s":return"seconds";case"m":return"minutes";case"h":return"hours";case"d":return"days";case"w":return"weeks";case"M":return"months";case"y":return"years";default:return null}},s=mn.parseFormat(t),r=s.reduce((e,{literal:t,val:i})=>t?e:e.concat(i),[]),o=e.shiftTo(...r.map(n).filter(e=>e));return dn(s,((e,t)=>s=>{const r=n(s);if(r){const n=t.isNegativeDuration&&r!==t.largestUnit?i:1;let o;return o="negativeLargestOnly"===this.opts.signMode&&r!==t.largestUnit?"never":"all"===this.opts.signMode?"always":"auto",this.num(e.get(r)*n,s.length,o)}return s})(o,{isNegativeDuration:o<0,largestUnit:Object.keys(o.values)[0]}))}}const fn=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function pn(...e){const t=e.reduce((e,t)=>e+t.source,"");return RegExp(`^${t}$`)}function vn(...e){return t=>e.reduce(([e,i,n],s)=>{const[r,o,a]=s(t,n);return[{...e,...r},o||i,a]},[{},null,1]).slice(0,2)}function yn(e,...t){if(null==e)return[null,null];for(const[i,n]of t){const t=i.exec(e);if(t)return n(t)}return[null,null]}function wn(...e){return(t,i)=>{const n={};let s;for(s=0;s<e.length;s++)n[e[s]]=Fi(t[i+s]);return[n,null,i+s]}}const bn=/(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/,_n=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,kn=RegExp(`${_n.source}(?:${bn.source}?(?:\\[(${fn.source})\\])?)?`),Sn=RegExp(`(?:[Tt]${kn.source})?`),$n=wn("weekYear","weekNumber","weekDay"),Cn=wn("year","ordinal"),In=RegExp(`${_n.source} ?(?:${bn.source}|(${fn.source}))?`),xn=RegExp(`(?: ${In.source})?`);function On(e,t,i){const n=e[t];return Ci(n)?i:Fi(n)}function Nn(e,t){return[{hours:On(e,t,0),minutes:On(e,t+1,0),seconds:On(e,t+2,0),milliseconds:Ui(e[t+3])},null,t+4]}function Tn(e,t){const i=!e[t]&&!e[t+1],n=qi(e[t+1],e[t+2]);return[{},i?null:qt.instance(n),t+3]}function Dn(e,t){return[{},e[t]?Tt.create(e[t]):null,t+1]}const An=RegExp(`^T?${_n.source}$`),Mn=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function En(e){const[t,i,n,s,r,o,a,l,c]=e,h="-"===t[0],u=l&&"-"===l[0],d=(e,t=!1)=>void 0!==e&&(t||e&&h)?-e:e;return[{years:d(Pi(i)),months:d(Pi(n)),weeks:d(Pi(s)),days:d(Pi(r)),hours:d(Pi(o)),minutes:d(Pi(a)),seconds:d(Pi(l),"-0"===l),milliseconds:d(Ui(c),u)}]}const Fn={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Pn(e,t,i,n,s,r,o){const a={year:2===t.length?Zi(Fi(t)):Fi(t),month:Xi.indexOf(i)+1,day:Fi(n),hour:Fi(s),minute:Fi(r)};return o&&(a.second=Fi(o)),e&&(a.weekday=e.length>3?nn.indexOf(e)+1:sn.indexOf(e)+1),a}const Un=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function Wn(e){const[,t,i,n,s,r,o,a,l,c,h,u]=e,d=Pn(t,s,n,i,r,o,a);let g;return g=l?Fn[l]:c?0:qi(h,u),[d,new qt(g)]}const Ln=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,Rn=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,zn=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function Vn(e){const[,t,i,n,s,r,o,a]=e;return[Pn(t,s,n,i,r,o,a),qt.utcInstance]}function jn(e){const[,t,i,n,s,r,o,a]=e;return[Pn(t,a,i,n,s,r,o),qt.utcInstance]}const Hn=pn(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,Sn),Zn=pn(/(\d{4})-?W(\d\d)(?:-?(\d))?/,Sn),Jn=pn(/(\d{4})-?(\d{3})/,Sn),qn=pn(kn),Bn=vn(function(e,t){return[{year:On(e,t),month:On(e,t+1,1),day:On(e,t+2,1)},null,t+3]},Nn,Tn,Dn),Yn=vn($n,Nn,Tn,Dn),Gn=vn(Cn,Nn,Tn,Dn),Kn=vn(Nn,Tn,Dn),Qn=vn(Nn),Xn=pn(/(\d{4})-(\d\d)-(\d\d)/,xn),es=pn(In),ts=vn(Nn,Tn,Dn),is="Invalid Duration",ns={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},ss={years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6},...ns},rs={years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:525949.2*60,milliseconds:525949.2*60*1e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:525949.2*60/4,milliseconds:7889237999.999999},months:{weeks:4.3481250000000005,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3},...ns},os=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],as=os.slice(0).reverse();function ls(e,t,i=!1){const n={values:i?t.values:{...e.values,...t.values||{}},loc:e.loc.clone(t.loc),conversionAccuracy:t.conversionAccuracy||e.conversionAccuracy,matrix:t.matrix||e.matrix};return new ds(n)}function cs(e,t){let i=t.milliseconds??0;for(const n of as.slice(1))t[n]&&(i+=t[n]*e[n].milliseconds);return i}function hs(e,t){const i=cs(e,t)<0?-1:1;os.reduceRight((n,s)=>{if(Ci(t[s]))return n;if(n){const r=t[n]*i,o=e[s][n],a=Math.floor(r/o);t[s]+=a*i,t[n]-=a*o*i}return s},null),os.reduce((i,n)=>{if(Ci(t[n]))return i;if(i){const s=t[i]%1;t[i]-=s,t[n]+=s*e[i][n]}return n},null)}function us(e){const t={};for(const[i,n]of Object.entries(e))0!==n&&(t[i]=n);return t}class ds{constructor(e){const t="longterm"===e.conversionAccuracy||!1;let i=t?rs:ss;e.matrix&&(i=e.matrix),this.values=e.values,this.loc=e.loc||Zt.create(),this.conversionAccuracy=t?"longterm":"casual",this.invalid=e.invalid||null,this.matrix=i,this.isLuxonDuration=!0}static fromMillis(e,t){return ds.fromObject({milliseconds:e},t)}static fromObject(e,t={}){if(null==e||"object"!=typeof e)throw new Ke("Duration.fromObject: argument expected to be an object, got "+(null===e?"null":typeof e));return new ds({values:Yi(e,ds.normalizeUnit),loc:Zt.fromObject(t),conversionAccuracy:t.conversionAccuracy,matrix:t.matrix})}static fromDurationLike(e){if(Ii(e))return ds.fromMillis(e);if(ds.isDuration(e))return e;if("object"==typeof e)return ds.fromObject(e);throw new Ke(`Unknown duration argument ${e} of type ${typeof e}`)}static fromISO(e,t){const[i]=function(e){return yn(e,[Mn,En])}(e);return i?ds.fromObject(i,t):ds.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static fromISOTime(e,t){const[i]=function(e){return yn(e,[An,Qn])}(e);return i?ds.fromObject(i,t):ds.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static invalid(e,t=null){if(!e)throw new Ke("need to specify a reason the Duration is invalid");const i=e instanceof hi?e:new hi(e,t);if(ci.throwOnInvalid)throw new Be(i);return new ds({invalid:i})}static normalizeUnit(e){const t={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[e?e.toLowerCase():e];if(!t)throw new Ge(e);return t}static isDuration(e){return e&&e.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(e,t={}){const i={...t,floor:!1!==t.round&&!1!==t.floor};return this.isValid?mn.create(this.loc,i).formatDurationFromString(this,e):is}toHuman(e={}){if(!this.isValid)return is;const t=!1!==e.showZeros,i=os.map(i=>{const n=this.values[i];return Ci(n)||0===n&&!t?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...e,unit:i.slice(0,-1)}).format(n)}).filter(e=>e);return this.loc.listFormatter({type:"conjunction",style:e.listStyle||"narrow",...e}).format(i)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let e="P";return 0!==this.years&&(e+=this.years+"Y"),0===this.months&&0===this.quarters||(e+=this.months+3*this.quarters+"M"),0!==this.weeks&&(e+=this.weeks+"W"),0!==this.days&&(e+=this.days+"D"),0===this.hours&&0===this.minutes&&0===this.seconds&&0===this.milliseconds||(e+="T"),0!==this.hours&&(e+=this.hours+"H"),0!==this.minutes&&(e+=this.minutes+"M"),0===this.seconds&&0===this.milliseconds||(e+=Wi(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===e&&(e+="T0S"),e}toISOTime(e={}){if(!this.isValid)return null;const t=this.toMillis();return t<0||t>=864e5?null:(e={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...e,includeOffset:!1},sr.fromMillis(t,{zone:"UTC"}).toISOTime(e))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?cs(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(e){if(!this.isValid)return this;const t=ds.fromDurationLike(e),i={};for(const e of os)(Di(t.values,e)||Di(this.values,e))&&(i[e]=t.get(e)+this.get(e));return ls(this,{values:i},!0)}minus(e){if(!this.isValid)return this;const t=ds.fromDurationLike(e);return this.plus(t.negate())}mapUnits(e){if(!this.isValid)return this;const t={};for(const i of Object.keys(this.values))t[i]=Bi(e(this.values[i],i));return ls(this,{values:t},!0)}get(e){return this[ds.normalizeUnit(e)]}set(e){return this.isValid?ls(this,{values:{...this.values,...Yi(e,ds.normalizeUnit)}}):this}reconfigure({locale:e,numberingSystem:t,conversionAccuracy:i,matrix:n}={}){return ls(this,{loc:this.loc.clone({locale:e,numberingSystem:t}),matrix:n,conversionAccuracy:i})}as(e){return this.isValid?this.shiftTo(e).get(e):NaN}normalize(){if(!this.isValid)return this;const e=this.toObject();return hs(this.matrix,e),ls(this,{values:e},!0)}rescale(){return this.isValid?ls(this,{values:us(this.normalize().shiftToAll().toObject())},!0):this}shiftTo(...e){if(!this.isValid)return this;if(0===e.length)return this;e=e.map(e=>ds.normalizeUnit(e));const t={},i={},n=this.toObject();let s;for(const r of os)if(e.indexOf(r)>=0){s=r;let e=0;for(const t in i)e+=this.matrix[t][r]*i[t],i[t]=0;Ii(n[r])&&(e+=n[r]);const o=Math.trunc(e);t[r]=o,i[r]=(1e3*e-1e3*o)/1e3}else Ii(n[r])&&(i[r]=n[r]);for(const e in i)0!==i[e]&&(t[s]+=e===s?i[e]:i[e]/this.matrix[s][e]);return hs(this.matrix,t),ls(this,{values:t},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;const e={};for(const t of Object.keys(this.values))e[t]=0===this.values[t]?0:-this.values[t];return ls(this,{values:e},!0)}removeZeros(){return this.isValid?ls(this,{values:us(this.values)},!0):this}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(e){if(!this.isValid||!e.isValid)return!1;if(!this.loc.equals(e.loc))return!1;function t(e,t){return void 0===e||0===e?void 0===t||0===t:e===t}for(const i of os)if(!t(this.values[i],e.values[i]))return!1;return!0}}const gs="Invalid Interval";class ms{constructor(e){this.s=e.start,this.e=e.end,this.invalid=e.invalid||null,this.isLuxonInterval=!0}static invalid(e,t=null){if(!e)throw new Ke("need to specify a reason the Interval is invalid");const i=e instanceof hi?e:new hi(e,t);if(ci.throwOnInvalid)throw new qe(i);return new ms({invalid:i})}static fromDateTimes(e,t){const i=rr(e),n=rr(t),s=function(e,t){return e&&e.isValid?t&&t.isValid?t<e?ms.invalid("end before start",`The end of an interval must be after its start, but you had start=${e.toISO()} and end=${t.toISO()}`):null:ms.invalid("missing or invalid end"):ms.invalid("missing or invalid start")}(i,n);return null==s?new ms({start:i,end:n}):s}static after(e,t){const i=ds.fromDurationLike(t),n=rr(e);return ms.fromDateTimes(n,n.plus(i))}static before(e,t){const i=ds.fromDurationLike(t),n=rr(e);return ms.fromDateTimes(n.minus(i),n)}static fromISO(e,t){const[i,n]=(e||"").split("/",2);if(i&&n){let e,s,r,o;try{e=sr.fromISO(i,t),s=e.isValid}catch(n){s=!1}try{r=sr.fromISO(n,t),o=r.isValid}catch(n){o=!1}if(s&&o)return ms.fromDateTimes(e,r);if(s){const i=ds.fromISO(n,t);if(i.isValid)return ms.after(e,i)}else if(o){const e=ds.fromISO(i,t);if(e.isValid)return ms.before(r,e)}}return ms.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static isInterval(e){return e&&e.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get lastDateTime(){return this.isValid&&this.e?this.e.minus(1):null}get isValid(){return null===this.invalidReason}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(e="milliseconds"){return this.isValid?this.toDuration(e).get(e):NaN}count(e="milliseconds",t){if(!this.isValid)return NaN;const i=this.start.startOf(e,t);let n;return n=t?.useLocaleWeeks?this.end.reconfigure({locale:i.locale}):this.end,n=n.startOf(e,t),Math.floor(n.diff(i,e).get(e))+(n.valueOf()!==this.end.valueOf())}hasSame(e){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,e))}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(e){return!!this.isValid&&this.s>e}isBefore(e){return!!this.isValid&&this.e<=e}contains(e){return!!this.isValid&&this.s<=e&&this.e>e}set({start:e,end:t}={}){return this.isValid?ms.fromDateTimes(e||this.s,t||this.e):this}splitAt(...e){if(!this.isValid)return[];const t=e.map(rr).filter(e=>this.contains(e)).sort((e,t)=>e.toMillis()-t.toMillis()),i=[];let{s:n}=this,s=0;for(;n<this.e;){const e=t[s]||this.e,r=+e>+this.e?this.e:e;i.push(ms.fromDateTimes(n,r)),n=r,s+=1}return i}splitBy(e){const t=ds.fromDurationLike(e);if(!this.isValid||!t.isValid||0===t.as("milliseconds"))return[];let i,{s:n}=this,s=1;const r=[];for(;n<this.e;){const e=this.start.plus(t.mapUnits(e=>e*s));i=+e>+this.e?this.e:e,r.push(ms.fromDateTimes(n,i)),n=i,s+=1}return r}divideEqually(e){return this.isValid?this.splitBy(this.length()/e).slice(0,e):[]}overlaps(e){return this.e>e.s&&this.s<e.e}abutsStart(e){return!!this.isValid&&+this.e===+e.s}abutsEnd(e){return!!this.isValid&&+e.e===+this.s}engulfs(e){return!!this.isValid&&this.s<=e.s&&this.e>=e.e}equals(e){return!(!this.isValid||!e.isValid)&&this.s.equals(e.s)&&this.e.equals(e.e)}intersection(e){if(!this.isValid)return this;const t=this.s>e.s?this.s:e.s,i=this.e<e.e?this.e:e.e;return t>=i?null:ms.fromDateTimes(t,i)}union(e){if(!this.isValid)return this;const t=this.s<e.s?this.s:e.s,i=this.e>e.e?this.e:e.e;return ms.fromDateTimes(t,i)}static merge(e){const[t,i]=e.sort((e,t)=>e.s-t.s).reduce(([e,t],i)=>t?t.overlaps(i)||t.abutsStart(i)?[e,t.union(i)]:[e.concat([t]),i]:[e,i],[[],null]);return i&&t.push(i),t}static xor(e){let t=null,i=0;const n=[],s=e.map(e=>[{time:e.s,type:"s"},{time:e.e,type:"e"}]),r=Array.prototype.concat(...s).sort((e,t)=>e.time-t.time);for(const e of r)i+="s"===e.type?1:-1,1===i?t=e.time:(t&&+t!==+e.time&&n.push(ms.fromDateTimes(t,e.time)),t=null);return ms.merge(n)}difference(...e){return ms.xor([this].concat(e)).map(e=>this.intersection(e)).filter(e=>e&&!e.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:gs}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(e=it,t={}){return this.isValid?mn.create(this.s.loc.clone(t),e).formatInterval(this):gs}toISO(e){return this.isValid?`${this.s.toISO(e)}/${this.e.toISO(e)}`:gs}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:gs}toISOTime(e){return this.isValid?`${this.s.toISOTime(e)}/${this.e.toISOTime(e)}`:gs}toFormat(e,{separator:t=" – "}={}){return this.isValid?`${this.s.toFormat(e)}${t}${this.e.toFormat(e)}`:gs}toDuration(e,t){return this.isValid?this.e.diff(this.s,e,t):ds.invalid(this.invalidReason)}mapEndpoints(e){return ms.fromDateTimes(e(this.s),e(this.e))}}class fs{static hasDST(e=ci.defaultZone){const t=sr.now().setZone(e).set({month:12});return!e.isUniversal&&t.offset!==t.set({month:6}).offset}static isValidIANAZone(e){return Tt.isValidZone(e)}static normalizeZone(e){return Yt(e,ci.defaultZone)}static getStartOfWeek({locale:e=null,locObj:t=null}={}){return(t||Zt.create(e)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:e=null,locObj:t=null}={}){return(t||Zt.create(e)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:e=null,locObj:t=null}={}){return(t||Zt.create(e)).getWeekendDays().slice()}static months(e="long",{locale:t=null,numberingSystem:i=null,locObj:n=null,outputCalendar:s="gregory"}={}){return(n||Zt.create(t,i,s)).months(e)}static monthsFormat(e="long",{locale:t=null,numberingSystem:i=null,locObj:n=null,outputCalendar:s="gregory"}={}){return(n||Zt.create(t,i,s)).months(e,!0)}static weekdays(e="long",{locale:t=null,numberingSystem:i=null,locObj:n=null}={}){return(n||Zt.create(t,i,null)).weekdays(e)}static weekdaysFormat(e="long",{locale:t=null,numberingSystem:i=null,locObj:n=null}={}){return(n||Zt.create(t,i,null)).weekdays(e,!0)}static meridiems({locale:e=null}={}){return Zt.create(e).meridiems()}static eras(e="short",{locale:t=null}={}){return Zt.create(t,null,"gregory").eras(e)}static features(){return{relative:Oi(),localeWeek:Ni()}}}function ps(e,t){const i=e=>e.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),n=i(t)-i(e);return Math.floor(ds.fromMillis(n).as("days"))}function vs(e,t=e=>e){return{regex:e,deser:([e])=>t(function(e){let t=parseInt(e,10);if(isNaN(t)){t="";for(let i=0;i<e.length;i++){const n=e.charCodeAt(i);if(-1!==e[i].search(Gt.hanidec))t+=Qt.indexOf(e[i]);else for(const e in Kt){const[i,s]=Kt[e];n>=i&&n<=s&&(t+=n-i)}}return parseInt(t,10)}return t}(e))}}const ys=`[ ${String.fromCharCode(160)}]`,ws=new RegExp(ys,"g");function bs(e){return e.replace(/\./g,"\\.?").replace(ws,ys)}function _s(e){return e.replace(/\./g,"").replace(ws," ").toLowerCase()}function ks(e,t){return null===e?null:{regex:RegExp(e.map(bs).join("|")),deser:([i])=>e.findIndex(e=>_s(i)===_s(e))+t}}function Ss(e,t){return{regex:e,deser:([,e,t])=>qi(e,t),groups:t}}function $s(e){return{regex:e,deser:([e])=>e}}const Cs={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}};let Is=null;function xs(e,t){return Array.prototype.concat(...e.map(e=>function(e,t){if(e.literal)return e;const i=Ts(mn.macroTokenToFormatOpts(e.val),t);return null==i||i.includes(void 0)?e:i}(e,t)))}class Os{constructor(e,t){if(this.locale=e,this.format=t,this.tokens=xs(mn.parseFormat(t),e),this.units=this.tokens.map(t=>function(e,t){const i=ei(t),n=ei(t,"{2}"),s=ei(t,"{3}"),r=ei(t,"{4}"),o=ei(t,"{6}"),a=ei(t,"{1,2}"),l=ei(t,"{1,3}"),c=ei(t,"{1,6}"),h=ei(t,"{1,9}"),u=ei(t,"{2,4}"),d=ei(t,"{4,6}"),g=e=>{return{regex:RegExp((t=e.val,t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"))),deser:([e])=>e,literal:!0};var t},m=(m=>{if(e.literal)return g(m);switch(m.val){case"G":return ks(t.eras("short"),0);case"GG":return ks(t.eras("long"),0);case"y":return vs(c);case"yy":case"kk":return vs(u,Zi);case"yyyy":case"kkkk":return vs(r);case"yyyyy":return vs(d);case"yyyyyy":return vs(o);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return vs(a);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return vs(n);case"MMM":return ks(t.months("short",!0),1);case"MMMM":return ks(t.months("long",!0),1);case"LLL":return ks(t.months("short",!1),1);case"LLLL":return ks(t.months("long",!1),1);case"o":case"S":return vs(l);case"ooo":case"SSS":return vs(s);case"u":return $s(h);case"uu":return $s(a);case"uuu":case"E":case"c":return vs(i);case"a":return ks(t.meridiems(),0);case"EEE":return ks(t.weekdays("short",!1),1);case"EEEE":return ks(t.weekdays("long",!1),1);case"ccc":return ks(t.weekdays("short",!0),1);case"cccc":return ks(t.weekdays("long",!0),1);case"Z":case"ZZ":return Ss(new RegExp(`([+-]${a.source})(?::(${n.source}))?`),2);case"ZZZ":return Ss(new RegExp(`([+-]${a.source})(${n.source})?`),2);case"z":return $s(/[a-z_+-/]{1,256}?/i);case" ":return $s(/[^\S\n\r]/);default:return g(m)}})(e)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"};return m.token=e,m}(t,e)),this.disqualifyingUnit=this.units.find(e=>e.invalidReason),!this.disqualifyingUnit){const[e,t]=function(e){const t=e.map(e=>e.regex).reduce((e,t)=>`${e}(${t.source})`,"");return[`^${t}$`,e]}(this.units);this.regex=RegExp(e,"i"),this.handlers=t}}explainFromTokens(e){if(this.isValid){const[t,i]=function(e,t,i){const n=e.match(t);if(n){const e={};let t=1;for(const s in i)if(Di(i,s)){const r=i[s],o=r.groups?r.groups+1:1;!r.literal&&r.token&&(e[r.token.val[0]]=r.deser(n.slice(t,t+o))),t+=o}return[n,e]}return[n,{}]}(e,this.regex,this.handlers),[n,s,r]=i?function(e){let t,i=null;Ci(e.z)||(i=Tt.create(e.z)),Ci(e.Z)||(i||(i=new qt(e.Z)),t=e.Z),Ci(e.q)||(e.M=3*(e.q-1)+1),Ci(e.h)||(e.h<12&&1===e.a?e.h+=12:12===e.h&&0===e.a&&(e.h=0)),0===e.G&&e.y&&(e.y=-e.y),Ci(e.u)||(e.S=Ui(e.u));const n=Object.keys(e).reduce((t,i)=>{const n=(e=>{switch(e){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}})(i);return n&&(t[n]=e[i]),t},{});return[n,i,t]}(i):[null,null,void 0];if(Di(i,"a")&&Di(i,"H"))throw new Ye("Can't include meridiem when specifying 24-hour format");return{input:e,tokens:this.tokens,regex:this.regex,rawMatches:t,matches:i,result:n,zone:s,specificOffset:r}}return{input:e,tokens:this.tokens,invalidReason:this.invalidReason}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function Ns(e,t,i){return new Os(e,i).explainFromTokens(t)}function Ts(e,t){if(!e)return null;const i=mn.create(t,e).dtFormatter((Is||(Is=sr.fromMillis(1555555555555)),Is)),n=i.formatToParts(),s=i.resolvedOptions();return n.map(t=>function(e,t,i){const{type:n,value:s}=e;if("literal"===n){const e=/^\s+$/.test(s);return{literal:!e,val:e?" ":s}}const r=t[n];let o=n;"hour"===n&&(o=null!=t.hour12?t.hour12?"hour12":"hour24":null!=t.hourCycle?"h11"===t.hourCycle||"h12"===t.hourCycle?"hour12":"hour24":i.hour12?"hour12":"hour24");let a=Cs[o];if("object"==typeof a&&(a=a[r]),a)return{literal:!1,val:a}}(t,e,s))}const Ds="Invalid DateTime",As=864e13;function Ms(e){return new hi("unsupported zone",`the zone "${e.name}" is not supported`)}function Es(e){return null===e.weekData&&(e.weekData=yi(e.c)),e.weekData}function Fs(e){return null===e.localWeekData&&(e.localWeekData=yi(e.c,e.loc.getMinDaysInFirstWeek(),e.loc.getStartOfWeek())),e.localWeekData}function Ps(e,t){const i={ts:e.ts,zone:e.zone,c:e.c,o:e.o,loc:e.loc,invalid:e.invalid};return new sr({...i,...t,old:i})}function Us(e,t,i){let n=e-60*t*1e3;const s=i.offset(n);if(t===s)return[n,t];n-=60*(s-t)*1e3;const r=i.offset(n);return s===r?[n,s]:[e-60*Math.min(s,r)*1e3,Math.max(s,r)]}function Ws(e,t){const i=new Date(e+=60*t*1e3);return{year:i.getUTCFullYear(),month:i.getUTCMonth()+1,day:i.getUTCDate(),hour:i.getUTCHours(),minute:i.getUTCMinutes(),second:i.getUTCSeconds(),millisecond:i.getUTCMilliseconds()}}function Ls(e,t,i){return Us(Vi(e),t,i)}function Rs(e,t){const i=e.o,n=e.c.year+Math.trunc(t.years),s=e.c.month+Math.trunc(t.months)+3*Math.trunc(t.quarters),r={...e.c,year:n,month:s,day:Math.min(e.c.day,zi(n,s))+Math.trunc(t.days)+7*Math.trunc(t.weeks)},o=ds.fromObject({years:t.years-Math.trunc(t.years),quarters:t.quarters-Math.trunc(t.quarters),months:t.months-Math.trunc(t.months),weeks:t.weeks-Math.trunc(t.weeks),days:t.days-Math.trunc(t.days),hours:t.hours,minutes:t.minutes,seconds:t.seconds,milliseconds:t.milliseconds}).as("milliseconds"),a=Vi(r);let[l,c]=Us(a,i,e.zone);return 0!==o&&(l+=o,c=e.zone.offset(l)),{ts:l,o:c}}function zs(e,t,i,n,s,r){const{setZone:o,zone:a}=i;if(e&&0!==Object.keys(e).length||t){const n=t||a,s=sr.fromObject(e,{...i,zone:n,specificOffset:r});return o?s:s.setZone(a)}return sr.invalid(new hi("unparsable",`the input "${s}" can't be parsed as ${n}`))}function Vs(e,t,i=!0){return e.isValid?mn.create(Zt.create("en-US"),{allowZ:i,forceSimple:!0}).formatDateTimeFromString(e,t):null}function js(e,t,i){const n=e.c.year>9999||e.c.year<0;let s="";if(n&&e.c.year>=0&&(s+="+"),s+=Ei(e.c.year,n?6:4),"year"===i)return s;if(t){if(s+="-",s+=Ei(e.c.month),"month"===i)return s;s+="-"}else if(s+=Ei(e.c.month),"month"===i)return s;return s+=Ei(e.c.day),s}function Hs(e,t,i,n,s,r,o){let a=!i||0!==e.c.millisecond||0!==e.c.second,l="";switch(o){case"day":case"month":case"year":break;default:if(l+=Ei(e.c.hour),"hour"===o)break;if(t){if(l+=":",l+=Ei(e.c.minute),"minute"===o)break;a&&(l+=":",l+=Ei(e.c.second))}else{if(l+=Ei(e.c.minute),"minute"===o)break;a&&(l+=Ei(e.c.second))}if("second"===o)break;!a||n&&0===e.c.millisecond||(l+=".",l+=Ei(e.c.millisecond,3))}return s&&(e.isOffsetFixed&&0===e.offset&&!r?l+="Z":e.o<0?(l+="-",l+=Ei(Math.trunc(-e.o/60)),l+=":",l+=Ei(Math.trunc(-e.o%60))):(l+="+",l+=Ei(Math.trunc(e.o/60)),l+=":",l+=Ei(Math.trunc(e.o%60)))),r&&(l+="["+e.zone.ianaName+"]"),l}const Zs={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},Js={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},qs={ordinal:1,hour:0,minute:0,second:0,millisecond:0},Bs=["year","month","day","hour","minute","second","millisecond"],Ys=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],Gs=["year","ordinal","hour","minute","second","millisecond"];function Ks(e){const t={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[e.toLowerCase()];if(!t)throw new Ge(e);return t}function Qs(e){switch(e.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return Ks(e)}}function Xs(e,t){const i=Yt(t.zone,ci.defaultZone);if(!i.isValid)return sr.invalid(Ms(i));const n=Zt.fromObject(t);let s,r;if(Ci(e.year))s=ci.now();else{for(const t of Bs)Ci(e[t])&&(e[t]=Zs[t]);const t=Si(e)||$i(e);if(t)return sr.invalid(t);const n=function(e){if(void 0===ir&&(ir=ci.now()),"iana"!==e.type)return e.offset(ir);const t=e.name;let i=nr.get(t);return void 0===i&&(i=e.offset(ir),nr.set(t,i)),i}(i);[s,r]=Ls(e,n,i)}return new sr({ts:s,zone:i,loc:n,o:r})}function er(e,t,i){const n=!!Ci(i.round)||i.round,s=Ci(i.rounding)?"trunc":i.rounding,r=(e,r)=>(e=Wi(e,n||i.calendary?0:2,i.calendary?"round":s),t.loc.clone(i).relFormatter(i).format(e,r)),o=n=>i.calendary?t.hasSame(e,n)?0:t.startOf(n).diff(e.startOf(n),n).get(n):t.diff(e,n).get(n);if(i.unit)return r(o(i.unit),i.unit);for(const e of i.units){const t=o(e);if(Math.abs(t)>=1)return r(t,e)}return r(e>t?-0:0,i.units[i.units.length-1])}function tr(e){let t,i={};return e.length>0&&"object"==typeof e[e.length-1]?(i=e[e.length-1],t=Array.from(e).slice(0,e.length-1)):t=Array.from(e),[i,t]}let ir;const nr=new Map;class sr{constructor(e){const t=e.zone||ci.defaultZone;let i=e.invalid||(Number.isNaN(e.ts)?new hi("invalid input"):null)||(t.isValid?null:Ms(t));this.ts=Ci(e.ts)?ci.now():e.ts;let n=null,s=null;if(!i)if(e.old&&e.old.ts===this.ts&&e.old.zone.equals(t))[n,s]=[e.old.c,e.old.o];else{const r=Ii(e.o)&&!e.old?e.o:t.offset(this.ts);n=Ws(this.ts,r),i=Number.isNaN(n.year)?new hi("invalid input"):null,n=i?null:n,s=i?null:r}this._zone=t,this.loc=e.loc||Zt.create(),this.invalid=i,this.weekData=null,this.localWeekData=null,this.c=n,this.o=s,this.isLuxonDateTime=!0}static now(){return new sr({})}static local(){const[e,t]=tr(arguments),[i,n,s,r,o,a,l]=t;return Xs({year:i,month:n,day:s,hour:r,minute:o,second:a,millisecond:l},e)}static utc(){const[e,t]=tr(arguments),[i,n,s,r,o,a,l]=t;return e.zone=qt.utcInstance,Xs({year:i,month:n,day:s,hour:r,minute:o,second:a,millisecond:l},e)}static fromJSDate(e,t={}){const i=function(e){return"[object Date]"===Object.prototype.toString.call(e)}(e)?e.valueOf():NaN;if(Number.isNaN(i))return sr.invalid("invalid input");const n=Yt(t.zone,ci.defaultZone);return n.isValid?new sr({ts:i,zone:n,loc:Zt.fromObject(t)}):sr.invalid(Ms(n))}static fromMillis(e,t={}){if(Ii(e))return e<-As||e>As?sr.invalid("Timestamp out of range"):new sr({ts:e,zone:Yt(t.zone,ci.defaultZone),loc:Zt.fromObject(t)});throw new Ke(`fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`)}static fromSeconds(e,t={}){if(Ii(e))return new sr({ts:1e3*e,zone:Yt(t.zone,ci.defaultZone),loc:Zt.fromObject(t)});throw new Ke("fromSeconds requires a numerical input")}static fromObject(e,t={}){e=e||{};const i=Yt(t.zone,ci.defaultZone);if(!i.isValid)return sr.invalid(Ms(i));const n=Zt.fromObject(t),s=Yi(e,Qs),{minDaysInFirstWeek:r,startOfWeek:o}=ki(s,n),a=ci.now(),l=Ci(t.specificOffset)?i.offset(a):t.specificOffset,c=!Ci(s.ordinal),h=!Ci(s.year),u=!Ci(s.month)||!Ci(s.day),d=h||u,g=s.weekYear||s.weekNumber;if((d||c)&&g)throw new Ye("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(u&&c)throw new Ye("Can't mix ordinal dates with month/day");const m=g||s.weekday&&!d;let f,p,v=Ws(a,l);m?(f=Ys,p=Js,v=yi(v,r,o)):c?(f=Gs,p=qs,v=bi(v)):(f=Bs,p=Zs);let y=!1;for(const e of f)Ci(s[e])?s[e]=y?p[e]:v[e]:y=!0;const w=m?function(e,t=4,i=1){const n=xi(e.weekYear),s=Mi(e.weekNumber,1,Hi(e.weekYear,t,i)),r=Mi(e.weekday,1,7);return n?s?!r&&gi("weekday",e.weekday):gi("week",e.weekNumber):gi("weekYear",e.weekYear)}(s,r,o):c?function(e){const t=xi(e.year),i=Mi(e.ordinal,1,Ri(e.year));return t?!i&&gi("ordinal",e.ordinal):gi("year",e.year)}(s):Si(s),b=w||$i(s);if(b)return sr.invalid(b);const _=m?wi(s,r,o):c?_i(s):s,[k,S]=Ls(_,l,i),$=new sr({ts:k,zone:i,o:S,loc:n});return s.weekday&&d&&e.weekday!==$.weekday?sr.invalid("mismatched weekday",`you can't specify both a weekday of ${s.weekday} and a date of ${$.toISO()}`):$.isValid?$:sr.invalid($.invalid)}static fromISO(e,t={}){const[i,n]=function(e){return yn(e,[Hn,Bn],[Zn,Yn],[Jn,Gn],[qn,Kn])}(e);return zs(i,n,t,"ISO 8601",e)}static fromRFC2822(e,t={}){const[i,n]=function(e){return yn(function(e){return e.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}(e),[Un,Wn])}(e);return zs(i,n,t,"RFC 2822",e)}static fromHTTP(e,t={}){const[i,n]=function(e){return yn(e,[Ln,Vn],[Rn,Vn],[zn,jn])}(e);return zs(i,n,t,"HTTP",t)}static fromFormat(e,t,i={}){if(Ci(e)||Ci(t))throw new Ke("fromFormat requires an input string and a format");const{locale:n=null,numberingSystem:s=null}=i,r=Zt.fromOpts({locale:n,numberingSystem:s,defaultToEN:!0}),[o,a,l,c]=function(e,t,i){const{result:n,zone:s,specificOffset:r,invalidReason:o}=Ns(e,t,i);return[n,s,r,o]}(r,e,t);return c?sr.invalid(c):zs(o,a,i,`format ${t}`,e,l)}static fromString(e,t,i={}){return sr.fromFormat(e,t,i)}static fromSQL(e,t={}){const[i,n]=function(e){return yn(e,[Xn,Bn],[es,ts])}(e);return zs(i,n,t,"SQL",e)}static invalid(e,t=null){if(!e)throw new Ke("need to specify a reason the DateTime is invalid");const i=e instanceof hi?e:new hi(e,t);if(ci.throwOnInvalid)throw new Je(i);return new sr({invalid:i})}static isDateTime(e){return e&&e.isLuxonDateTime||!1}static parseFormatForOpts(e,t={}){const i=Ts(e,Zt.fromObject(t));return i?i.map(e=>e?e.val:null).join(""):null}static expandFormat(e,t={}){return xs(mn.parseFormat(e),Zt.fromObject(t)).map(e=>e.val).join("")}static resetCache(){ir=void 0,nr.clear()}get(e){return this[e]}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?Es(this).weekYear:NaN}get weekNumber(){return this.isValid?Es(this).weekNumber:NaN}get weekday(){return this.isValid?Es(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?Fs(this).weekday:NaN}get localWeekNumber(){return this.isValid?Fs(this).weekNumber:NaN}get localWeekYear(){return this.isValid?Fs(this).weekYear:NaN}get ordinal(){return this.isValid?bi(this.c).ordinal:NaN}get monthShort(){return this.isValid?fs.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?fs.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?fs.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?fs.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];const e=864e5,t=6e4,i=Vi(this.c),n=this.zone.offset(i-e),s=this.zone.offset(i+e),r=this.zone.offset(i-n*t),o=this.zone.offset(i-s*t);if(r===o)return[this];const a=i-r*t,l=i-o*t,c=Ws(a,r),h=Ws(l,o);return c.hour===h.hour&&c.minute===h.minute&&c.second===h.second&&c.millisecond===h.millisecond?[Ps(this,{ts:a}),Ps(this,{ts:l})]:[this]}get isInLeapYear(){return Li(this.year)}get daysInMonth(){return zi(this.year,this.month)}get daysInYear(){return this.isValid?Ri(this.year):NaN}get weeksInWeekYear(){return this.isValid?Hi(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?Hi(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(e={}){const{locale:t,numberingSystem:i,calendar:n}=mn.create(this.loc.clone(e),e).resolvedOptions(this);return{locale:t,numberingSystem:i,outputCalendar:n}}toUTC(e=0,t={}){return this.setZone(qt.instance(e),t)}toLocal(){return this.setZone(ci.defaultZone)}setZone(e,{keepLocalTime:t=!1,keepCalendarTime:i=!1}={}){if((e=Yt(e,ci.defaultZone)).equals(this.zone))return this;if(e.isValid){let n=this.ts;if(t||i){const t=e.offset(this.ts),i=this.toObject();[n]=Ls(i,t,e)}return Ps(this,{ts:n,zone:e})}return sr.invalid(Ms(e))}reconfigure({locale:e,numberingSystem:t,outputCalendar:i}={}){return Ps(this,{loc:this.loc.clone({locale:e,numberingSystem:t,outputCalendar:i})})}setLocale(e){return this.reconfigure({locale:e})}set(e){if(!this.isValid)return this;const t=Yi(e,Qs),{minDaysInFirstWeek:i,startOfWeek:n}=ki(t,this.loc),s=!Ci(t.weekYear)||!Ci(t.weekNumber)||!Ci(t.weekday),r=!Ci(t.ordinal),o=!Ci(t.year),a=!Ci(t.month)||!Ci(t.day),l=o||a,c=t.weekYear||t.weekNumber;if((l||r)&&c)throw new Ye("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(a&&r)throw new Ye("Can't mix ordinal dates with month/day");let h;s?h=wi({...yi(this.c,i,n),...t},i,n):Ci(t.ordinal)?(h={...this.toObject(),...t},Ci(t.day)&&(h.day=Math.min(zi(h.year,h.month),h.day))):h=_i({...bi(this.c),...t});const[u,d]=Ls(h,this.o,this.zone);return Ps(this,{ts:u,o:d})}plus(e){return this.isValid?Ps(this,Rs(this,ds.fromDurationLike(e))):this}minus(e){return this.isValid?Ps(this,Rs(this,ds.fromDurationLike(e).negate())):this}startOf(e,{useLocaleWeeks:t=!1}={}){if(!this.isValid)return this;const i={},n=ds.normalizeUnit(e);switch(n){case"years":i.month=1;case"quarters":case"months":i.day=1;case"weeks":case"days":i.hour=0;case"hours":i.minute=0;case"minutes":i.second=0;case"seconds":i.millisecond=0}if("weeks"===n)if(t){const e=this.loc.getStartOfWeek(),{weekday:t}=this;t<e&&(i.weekNumber=this.weekNumber-1),i.weekday=e}else i.weekday=1;if("quarters"===n){const e=Math.ceil(this.month/3);i.month=3*(e-1)+1}return this.set(i)}endOf(e,t){return this.isValid?this.plus({[e]:1}).startOf(e,t).minus(1):this}toFormat(e,t={}){return this.isValid?mn.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this,e):Ds}toLocaleString(e=it,t={}){return this.isValid?mn.create(this.loc.clone(t),e).formatDateTime(this):Ds}toLocaleParts(e={}){return this.isValid?mn.create(this.loc.clone(e),e).formatDateTimeParts(this):[]}toISO({format:e="extended",suppressSeconds:t=!1,suppressMilliseconds:i=!1,includeOffset:n=!0,extendedZone:s=!1,precision:r="milliseconds"}={}){if(!this.isValid)return null;const o="extended"===e;let a=js(this,o,r=Ks(r));return Bs.indexOf(r)>=3&&(a+="T"),a+=Hs(this,o,t,i,n,s,r),a}toISODate({format:e="extended",precision:t="day"}={}){return this.isValid?js(this,"extended"===e,Ks(t)):null}toISOWeekDate(){return Vs(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:e=!1,suppressSeconds:t=!1,includeOffset:i=!0,includePrefix:n=!1,extendedZone:s=!1,format:r="extended",precision:o="milliseconds"}={}){return this.isValid?(o=Ks(o),(n&&Bs.indexOf(o)>=3?"T":"")+Hs(this,"extended"===r,t,e,i,s,o)):null}toRFC2822(){return Vs(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return Vs(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?js(this,!0):null}toSQLTime({includeOffset:e=!0,includeZone:t=!1,includeOffsetSpace:i=!0}={}){let n="HH:mm:ss.SSS";return(t||e)&&(i&&(n+=" "),t?n+="z":e&&(n+="ZZ")),Vs(this,n,!0)}toSQL(e={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(e)}`:null}toString(){return this.isValid?this.toISO():Ds}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(e={}){if(!this.isValid)return{};const t={...this.c};return e.includeConfig&&(t.outputCalendar=this.outputCalendar,t.numberingSystem=this.loc.numberingSystem,t.locale=this.loc.locale),t}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(e,t="milliseconds",i={}){if(!this.isValid||!e.isValid)return ds.invalid("created by diffing an invalid DateTime");const n={locale:this.locale,numberingSystem:this.numberingSystem,...i},s=(a=t,Array.isArray(a)?a:[a]).map(ds.normalizeUnit),r=e.valueOf()>this.valueOf(),o=function(e,t,i,n){let[s,r,o,a]=function(e,t,i){const n=[["years",(e,t)=>t.year-e.year],["quarters",(e,t)=>t.quarter-e.quarter+4*(t.year-e.year)],["months",(e,t)=>t.month-e.month+12*(t.year-e.year)],["weeks",(e,t)=>{const i=ps(e,t);return(i-i%7)/7}],["days",ps]],s={},r=e;let o,a;for(const[l,c]of n)i.indexOf(l)>=0&&(o=l,s[l]=c(e,t),a=r.plus(s),a>t?(s[l]--,(e=r.plus(s))>t&&(a=e,s[l]--,e=r.plus(s))):e=a);return[e,s,a,o]}(e,t,i);const l=t-s,c=i.filter(e=>["hours","minutes","seconds","milliseconds"].indexOf(e)>=0);0===c.length&&(o<t&&(o=s.plus({[a]:1})),o!==s&&(r[a]=(r[a]||0)+l/(o-s)));const h=ds.fromObject(r,n);return c.length>0?ds.fromMillis(l,n).shiftTo(...c).plus(h):h}(r?this:e,r?e:this,s,n);var a;return r?o.negate():o}diffNow(e="milliseconds",t={}){return this.diff(sr.now(),e,t)}until(e){return this.isValid?ms.fromDateTimes(this,e):this}hasSame(e,t,i){if(!this.isValid)return!1;const n=e.valueOf(),s=this.setZone(e.zone,{keepLocalTime:!0});return s.startOf(t,i)<=n&&n<=s.endOf(t,i)}equals(e){return this.isValid&&e.isValid&&this.valueOf()===e.valueOf()&&this.zone.equals(e.zone)&&this.loc.equals(e.loc)}toRelative(e={}){if(!this.isValid)return null;const t=e.base||sr.fromObject({},{zone:this.zone}),i=e.padding?this<t?-e.padding:e.padding:0;let n=["years","months","days","hours","minutes","seconds"],s=e.unit;return Array.isArray(e.unit)&&(n=e.unit,s=void 0),er(t,this.plus(i),{...e,numeric:"always",units:n,unit:s})}toRelativeCalendar(e={}){return this.isValid?er(e.base||sr.fromObject({},{zone:this.zone}),this,{...e,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...e){if(!e.every(sr.isDateTime))throw new Ke("min requires all arguments be DateTimes");return Ti(e,e=>e.valueOf(),Math.min)}static max(...e){if(!e.every(sr.isDateTime))throw new Ke("max requires all arguments be DateTimes");return Ti(e,e=>e.valueOf(),Math.max)}static fromFormatExplain(e,t,i={}){const{locale:n=null,numberingSystem:s=null}=i;return Ns(Zt.fromOpts({locale:n,numberingSystem:s,defaultToEN:!0}),e,t)}static fromStringExplain(e,t,i={}){return sr.fromFormatExplain(e,t,i)}static buildFormatParser(e,t={}){const{locale:i=null,numberingSystem:n=null}=t,s=Zt.fromOpts({locale:i,numberingSystem:n,defaultToEN:!0});return new Os(s,e)}static fromFormatParser(e,t,i={}){if(Ci(e)||Ci(t))throw new Ke("fromFormatParser requires an input string and a format parser");const{locale:n=null,numberingSystem:s=null}=i,r=Zt.fromOpts({locale:n,numberingSystem:s,defaultToEN:!0});if(!r.equals(t.locale))throw new Ke(`fromFormatParser called with a locale of ${r}, but the format parser was created for ${t.locale}`);const{result:o,zone:a,specificOffset:l,invalidReason:c}=t.explainFromTokens(e);return c?sr.invalid(c):zs(o,a,i,`format ${t.format}`,e,l)}static get DATE_SHORT(){return it}static get DATE_MED(){return nt}static get DATE_MED_WITH_WEEKDAY(){return st}static get DATE_FULL(){return rt}static get DATE_HUGE(){return ot}static get TIME_SIMPLE(){return at}static get TIME_WITH_SECONDS(){return lt}static get TIME_WITH_SHORT_OFFSET(){return ct}static get TIME_WITH_LONG_OFFSET(){return ht}static get TIME_24_SIMPLE(){return ut}static get TIME_24_WITH_SECONDS(){return dt}static get TIME_24_WITH_SHORT_OFFSET(){return gt}static get TIME_24_WITH_LONG_OFFSET(){return mt}static get DATETIME_SHORT(){return ft}static get DATETIME_SHORT_WITH_SECONDS(){return pt}static get DATETIME_MED(){return vt}static get DATETIME_MED_WITH_SECONDS(){return yt}static get DATETIME_MED_WITH_WEEKDAY(){return wt}static get DATETIME_FULL(){return bt}static get DATETIME_FULL_WITH_SECONDS(){return _t}static get DATETIME_HUGE(){return kt}static get DATETIME_HUGE_WITH_SECONDS(){return St}}function rr(e){if(sr.isDateTime(e))return e;if(e&&e.valueOf&&Ii(e.valueOf()))return sr.fromJSDate(e);if(e&&"object"==typeof e)return sr.fromObject(e);throw new Ke(`Unknown datetime argument: ${e}, of type ${typeof e}`)}class or extends He{constructor(e,t={}){super(e,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=t}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(e){this.logger.debug("Updating ClockController config:",e),this.config={...this.config,...e};const t=new Date,i=this.config.language||"cs",n=this.config.timeZone;this.updateTime(t,n),this.updateDate(t,i,n),this.host.requestUpdate()}update(){const e=new Date,t=this.config.language||"cs",i=this.config.timeZone;this.updateTime(e,i),0!==e.getSeconds()&&""!==this._currentDate||this.updateDate(e,t,i),this.host.requestUpdate()}updateTime(e,t){var i,n,s,r,o;const a="hidden"===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.second),l=!0===(null===(n=this.config.timeFormat)||void 0===n?void 0:n.hour12);let c,h,u;if(t){const i=sr.fromJSDate(e,t?{zone:t}:void 0);c=i.hour,h=i.minute,u=i.second}else c=e.getHours(),h=e.getMinutes(),u=e.getSeconds();if(a&&(this._seconds=""),l){const e=c>=12;c%=12,c=c||12,this._ampm=e?"PM":"AM"}else this._ampm="";const d="numeric"!==(null===(s=this.config.timeFormat)||void 0===s?void 0:s.hour);this._hours=d?c.toString().padStart(2,"0"):c.toString();const g="numeric"!==(null===(r=this.config.timeFormat)||void 0===r?void 0:r.minute);if(this._minutes=g?h.toString().padStart(2,"0"):h.toString(),!a){const e="numeric"!==(null===(o=this.config.timeFormat)||void 0===o?void 0:o.second);this._seconds=e?u.toString().padStart(2,"0"):u.toString()}}updateDate(e,t,i){let n=je(e,t,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},i);n=n.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=n}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var ar=function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let lr=class extends he{constructor(){super(),this.logger=ke("clock-component"),this.clockController=new or(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(e){if(super.updated(e),e.has("timeFormat")||e.has("dateFormat")||e.has("language")||e.has("timeZone")){if(this.logger.debug("Clock properties changed, updating ClockController"),e.has("timeFormat")){const t=e.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.timeFormat)}`)}if(e.has("dateFormat")){const t=e.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.dateFormat)}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}render(){var e,t;const i=this.getSeconds(),n=void 0!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second)&&"hidden"!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second);return this.logger.debug(`Rendering clock - Seconds: ${i}, Show seconds: ${n}, TimeFormat: ${JSON.stringify(this.timeFormat)}`),H`
            <div class="clock" style="color: rgb( ${this.fontColor});">
                <span class="hours-minutes" style="color: rgb( ${this.fontColor});">${this.getHours()}:${this.getMinutes()}</span>
                ${n?H`
                    <div class="seconds-container">
                        <span class="seconds" style="color: rgb( ${this.fontColor});">${i}</span>
                        ${this.getAmPm()?H`<span class="ampm" style="color: rgb( ${this.fontColor});">${this.getAmPm()}</span>`:""}
                    </div>
                `:this.getAmPm()?H`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: rgb( ${this.fontColor});">${this.getAmPm()}</span>
                    </div>
                `:""}
            </div>
            <div class="date" style="color: rgb( ${this.fontColor});">${this.getCurrentDate()}</div>
        `}};lr.styles=o`
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
    `,ar([fe({type:Object})],lr.prototype,"timeFormat",void 0),ar([fe({type:Object})],lr.prototype,"dateFormat",void 0),ar([fe({type:String})],lr.prototype,"fontColor",void 0),ar([fe({type:String})],lr.prototype,"language",void 0),ar([fe({type:String})],lr.prototype,"timeZone",void 0),lr=ar([de("ha-clock")],lr);class cr extends He{constructor(e,t={}){super(e,"sensor-controller"),this._sensorValues=[],this.config={},this.config=t}onHostConnected(){}onHostDisconnected(){}updateConfig(e){this.logger.debug("Updating SensorController config:",e),this.config={...this.config,...e},this.hass&&this.updateSensorValues()}updateHass(e){this.hass=e,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=[],this.config.sensors.forEach(e=>{if(e.entity&&this.hass.states[e.entity]){const t=this.hass.states[e.entity];let i=t.state;t.attributes&&t.attributes.unit_of_measurement&&(i+=` ${t.attributes.unit_of_measurement}`),this._sensorValues.push({entity:e.entity,label:e.label,value:i})}else e.entity&&this._sensorValues.push({entity:e.entity,label:e.label,value:"unavailable"})}),this.host.requestUpdate()):this._sensorValues=[]}get sensorValues(){return this._sensorValues}}var hr=function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let ur=class extends he{constructor(){super(),this.logger=ke("sensor-component"),this.sensorController=new cr(this,{sensors:this.sensors})}get controller(){return this.sensorController}updated(e){super.updated(e),e.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),e.has("hass")&&this.hass&&(this.logger.debug("Hass changed, updating SensorController"),this.sensorController.updateHass(this.hass))}render(){const e=this.sensorController.sensorValues;return 0===e.length?H``:H`
            <div class="sensor-container" style="color: rgb( ${this.fontColor});">
                ${e.map(e=>H`
                    <div class="sensor-item">
                        ${e.label?H`
                                <div class="sensor-label" style="color: rgb( ${this.fontColor});">
                                    ${e.label}
                                </div>`:""}
                        <div class="sensor-value" style="color: rgb( ${this.fontColor});">
                            ${e.value}
                        </div>
                    </div>
                `)}
            </div>
        `}};ur.styles=o`
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
    `,hr([fe({type:Array})],ur.prototype,"sensors",void 0),hr([fe({type:String})],ur.prototype,"fontColor",void 0),hr([fe({type:Object})],ur.prototype,"hass",void 0),ur=hr([de("ha-sensors")],ur);var dr=Object.defineProperty,gr=(e,t,i)=>(((e,t,i)=>{t in e?dr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i})(e,"symbol"!=typeof t?t+"":t,i),i),mr=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},fr=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},pr=(e,t,i)=>(((e,t)=>{if(!t.has(e))throw TypeError("Cannot access private method")})(e,t),i);function vr(e,t){return Object.is(e,t)}let yr=null,wr=!1,br=1;const _r=Symbol("SIGNAL");function kr(e){const t=yr;return yr=e,t}const Sr={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function $r(e){if(wr)throw new Error("undefined"!=typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===yr)return;yr.consumerOnSignalRead(e);const t=yr.nextProducerIndex++;Dr(yr),t<yr.producerNode.length&&yr.producerNode[t]!==e&&Tr(yr)&&Nr(yr.producerNode[t],yr.producerIndexOfThis[t]),yr.producerNode[t]!==e&&(yr.producerNode[t]=e,yr.producerIndexOfThis[t]=Tr(yr)?Or(e,yr,t):0),yr.producerLastReadVersion[t]=e.version}function Cr(e){if(e.dirty||e.lastCleanEpoch!==br){if(!e.producerMustRecompute(e)&&!function(e){Dr(e);for(let t=0;t<e.producerNode.length;t++){const i=e.producerNode[t],n=e.producerLastReadVersion[t];if(n!==i.version)return!0;if(Cr(i),n!==i.version)return!0}return!1}(e))return e.dirty=!1,void(e.lastCleanEpoch=br);e.producerRecomputeValue(e),e.dirty=!1,e.lastCleanEpoch=br}}function Ir(e){if(void 0===e.liveConsumerNode)return;const t=wr;wr=!0;try{for(const t of e.liveConsumerNode)t.dirty||xr(t)}finally{wr=t}}function xr(e){var t;e.dirty=!0,Ir(e),null==(t=e.consumerMarkedDirty)||t.call(e.wrapper??e)}function Or(e,t,i){var n;if(Ar(e),Dr(e),0===e.liveConsumerNode.length){null==(n=e.watched)||n.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)e.producerIndexOfThis[t]=Or(e.producerNode[t],e,t)}return e.liveConsumerIndexOfThis.push(i),e.liveConsumerNode.push(t)-1}function Nr(e,t){var i;if(Ar(e),Dr(e),"undefined"!=typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(i=e.unwatched)||i.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)Nr(e.producerNode[t],e.producerIndexOfThis[t])}const n=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[n],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[n],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){const i=e.liveConsumerIndexOfThis[t],n=e.liveConsumerNode[t];Dr(n),n.producerIndexOfThis[i]=t}}function Tr(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function Dr(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function Ar(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function Mr(e){if(Cr(e),$r(e),e.value===Pr)throw e.error;return e.value}const Er=Symbol("UNSET"),Fr=Symbol("COMPUTING"),Pr=Symbol("ERRORED"),Ur=(()=>({...Sr,value:Er,dirty:!0,error:null,equal:vr,producerMustRecompute:e=>e.value===Er||e.value===Fr,producerRecomputeValue(e){if(e.value===Fr)throw new Error("Detected cycle in computations.");const t=e.value;e.value=Fr;const i=function(e){return e&&(e.nextProducerIndex=0),kr(e)}(e);let n,s=!1;try{n=e.computation.call(e.wrapper),s=t!==Er&&t!==Pr&&e.equal.call(e.wrapper,t,n)}catch(t){n=Pr,e.error=t}finally{!function(e,t){if(kr(t),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(Tr(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)Nr(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}(e,i)}s?e.value=t:(e.value=n,e.version++)}}))();function Wr(){return $r(this),this.value}function Lr(e,t){!1===(null==yr?void 0:yr.consumerAllowSignalWrites)&&function(){throw new Error}(),e.equal.call(e.wrapper,e.value,t)||(e.value=t,function(e){e.version++,br++,Ir(e)}(e))}const Rr=(()=>({...Sr,equal:vr,value:void 0}))(),zr=Symbol("node");var Vr,jr,Hr,Zr,Jr,qr,Br,Yr,Gr,Kr,Qr;jr=Vr||(Vr={}),Hr=zr,Zr=new WeakSet,jr.isState=e=>"object"==typeof e&&mr(Zr,e),jr.State=class{constructor(e,t={}){fr(this,Zr),gr(this,Hr);const i=function(e){const t=Object.create(Rr);t.value=e;const i=()=>($r(t),t.value);return i[_r]=t,i}(e),n=i[_r];if(this[zr]=n,n.wrapper=this,t){const e=t.equals;e&&(n.equal=e),n.watched=t[jr.subtle.watched],n.unwatched=t[jr.subtle.unwatched]}}get(){if(!(0,jr.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Wr.call(this[zr])}set(e){if(!(0,jr.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(wr)throw new Error("Writes to signals not permitted during Watcher callback");Lr(this[zr],e)}},Jr=zr,qr=new WeakSet,jr.isComputed=e=>"object"==typeof e&&mr(qr,e),jr.Computed=class{constructor(e,t){fr(this,qr),gr(this,Jr);const i=function(e){const t=Object.create(Ur);t.computation=e;const i=()=>Mr(t);return i[_r]=t,i}(e),n=i[_r];if(n.consumerAllowSignalWrites=!0,this[zr]=n,n.wrapper=this,t){const e=t.equals;e&&(n.equal=e),n.watched=t[jr.subtle.watched],n.unwatched=t[jr.subtle.unwatched]}}get(){if(!(0,jr.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Mr(this[zr])}},(Br=jr.subtle||(jr.subtle={})).untrack=function(e){let t,i=null;try{i=kr(null),t=e()}finally{kr(i)}return t},Br.introspectSources=function(e){var t;if(!(0,jr.isComputed)(e)&&!(0,jr.isWatcher)(e))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(t=e[zr].producerNode)?void 0:t.map(e=>e.wrapper))??[]},Br.introspectSinks=function(e){var t;if(!(0,jr.isComputed)(e)&&!(0,jr.isState)(e))throw new TypeError("Called introspectSinks without a Signal argument");return(null==(t=e[zr].liveConsumerNode)?void 0:t.map(e=>e.wrapper))??[]},Br.hasSinks=function(e){if(!(0,jr.isComputed)(e)&&!(0,jr.isState)(e))throw new TypeError("Called hasSinks without a Signal argument");const t=e[zr].liveConsumerNode;return!!t&&t.length>0},Br.hasSources=function(e){if(!(0,jr.isComputed)(e)&&!(0,jr.isWatcher)(e))throw new TypeError("Called hasSources without a Computed or Watcher argument");const t=e[zr].producerNode;return!!t&&t.length>0},Yr=zr,Gr=new WeakSet,Kr=new WeakSet,Qr=function(e){for(const t of e)if(!(0,jr.isComputed)(t)&&!(0,jr.isState)(t))throw new TypeError("Called watch/unwatch without a Computed or State argument")},jr.isWatcher=e=>mr(Gr,e),Br.Watcher=class{constructor(e){fr(this,Gr),fr(this,Kr),gr(this,Yr);let t=Object.create(Sr);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[zr]=t}watch(...e){if(!(0,jr.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");pr(this,Kr,Qr).call(this,e);const t=this[zr];t.dirty=!1;const i=kr(t);for(const t of e)$r(t[zr]);kr(i)}unwatch(...e){if(!(0,jr.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");pr(this,Kr,Qr).call(this,e);const t=this[zr];Dr(t);for(let i=t.producerNode.length-1;i>=0;i--)if(e.includes(t.producerNode[i].wrapper)){Nr(t.producerNode[i],t.producerIndexOfThis[i]);const e=t.producerNode.length-1;if(t.producerNode[i]=t.producerNode[e],t.producerIndexOfThis[i]=t.producerIndexOfThis[e],t.producerNode.length--,t.producerIndexOfThis.length--,t.nextProducerIndex--,i<t.producerNode.length){const e=t.producerIndexOfThis[i],n=t.producerNode[i];Ar(n),n.liveConsumerIndexOfThis[e]=i}}}getPending(){if(!(0,jr.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[zr].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}},Br.currentComputed=function(){var e;return null==(e=yr)?void 0:e.wrapper},Br.watched=Symbol("watched"),Br.unwatched=Symbol("unwatched"),Symbol("SignalWatcherBrand"),new FinalizationRegistry(({watcher:e,signal:t})=>{e.unwatch(t)}),new WeakMap;class Xr{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:eo}=ae,to=(e,t)=>{const i=e._$AN;if(void 0===i)return!1;for(const e of i)e._$AO?.(t,!1),to(e,t);return!0},io=e=>{let t,i;do{if(void 0===(t=e._$AM))break;i=t._$AN,i.delete(e),e=t}while(0===i?.size)},no=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),oo(t)}};function so(e){void 0!==this._$AN?(io(this),this._$AM=e,no(this)):this._$AM=e}function ro(e,t=!1,i=0){const n=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(t)if(Array.isArray(n))for(let e=i;e<n.length;e++)to(n[e],!1),io(n[e]);else null!=n&&(to(n,!1),io(n));else to(this,e)}const oo=e=>{2==e.type&&(e._$AP??=ro,e._$AQ??=so)};class ao extends Xr{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),no(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(to(this,e),io(this))}setValue(e){if((()=>void 0===this._$Ct.strings)())this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const lo=(ho=class extends ao{_$Sl(){if(void 0!==this._$Su)return;this._$SW=new Vr.Computed(()=>{var e;return null===(e=this._$Sj)||void 0===e?void 0:e.get()});const e=this._$Su=new Vr.subtle.Watcher(()=>{var t;null===(t=this._$SO)||void 0===t||t._(this),e.watch()});e.watch(this._$SW)}_$Sp(){var e;void 0!==this._$Su&&(this._$Su.unwatch(this._$SW),this._$SW=void 0,this._$Su=void 0,null===(e=this._$SO)||void 0===e||e.m(this))}commit(){this.setValue(Vr.subtle.untrack(()=>{var e;return null===(e=this._$SW)||void 0===e?void 0:e.get()}))}render(e){return Vr.subtle.untrack(()=>e.get())}update(e,[t]){var i,n;return null!==(i=this._$SO)&&void 0!==i||(this._$SO=null===(n=e.options)||void 0===n?void 0:n.host),t!==this._$Sj&&void 0!==this._$Sj&&this._$Sp(),this._$Sj=t,this._$Sl(),Vr.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$Sl()}},(...e)=>({_$litDirective$:ho,values:e})),co=e=>(t,...i)=>e(t,...i.map(e=>e instanceof Vr.State||e instanceof Vr.Computed?lo(e):e));var ho;co(H),co(Z),Vr.State,Vr.Computed;class uo{constructor(){this._weatherSignal=new Vr.State(void 0,void 0)}get weatherSignal(){return this._weatherSignal}updateWeatherSignal(e){this._weatherSignal.set(void 0),this._weatherSignal.set(e)}}const go=new uo,mo=go.weatherSignal;function fo(e){go.updateWeatherSignal(e)}class po extends He{constructor(e,t={}){super(e,"background-image-controller"),this.backgroundImageManager=new We,this.currentWeather=xe.All,this._currentImageUrl="",this._previousImageUrl="",this._isTransitioning=!1,this._fetchingImageUrls=!1,this.config=t,this.setupWeatherWatcher()}setWeatherSignalProvider(e){this.weatherSignalProvider=e,this.weatherWatcher&&(this.weatherWatcher.unwatch(mo),this.weatherSignalProvider&&this.weatherWatcher.unwatch(this.weatherSignalProvider.weatherSignal)),this.setupWeatherWatcher()}setupWeatherWatcher(){this.weatherWatcher=new Vr.subtle.Watcher(async()=>{var e;await 0;const t=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:mo,i=t.get();void 0!==i&&(this.updateWeather(i||xe.All),this.logger.info("New signal for weather:",i),null===(e=this.weatherWatcher)||void 0===e||e.watch(t))})}onHostConnected(){var e;const t=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:mo;null===(e=this.weatherWatcher)||void 0===e||e.watch(t),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){var e;const t=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:mo;null===(e=this.weatherWatcher)||void 0===e||e.unwatch(t),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(e){const t={...this.config};this.config={...this.config,...e},$e.info("Update the BackgroundImageController with new configuration");const i=this.isInitialized;t.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{i&&this.fetchNewImageAsync(this.currentWeather).catch(e=>this.logger.error("Error fetching image after reinitialization:",e))}).catch(e=>this.logger.error("Error during BackgroundImageManager initialization:",e)):t.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:e,...t}=this.config.imageSourceConfig||{},i=t.imageSourceId?t:{imageSourceId:"picsum"};if(this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${i.imageSourceId||"default"}`),!this.backgroundImageManager.initialize(i))return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(e){this.logger.error("Error fetching image URLs:",e)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const e=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${e/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(e){this.logger.error("Error in image rotation interval:",e)}})()},e)}async fetchNewImageAsync(e){try{let t=e,i=function(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?Ie.SunriseSunset:e>=9&&e<17?Ie.Day:e>=21||e<5?Ie.Night:Ie.Unspecified}();const n=await this.backgroundImageManager.getNextImageUrlAsync(t,i);if(n){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${n}`);const e=new Image;e.onload=()=>{this.logger.debug(`New image loaded successfully: ${n}`),this._currentImageUrl&&(this._previousImageUrl=this._currentImageUrl,this.logger.debug("Starting transition for subsequent image"),this.handleImageTransition()),this._currentImageUrl=n,this._previousImageUrl||(this.logger.debug("Starting transition for first image"),this.handleImageTransition())},e.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${n}`)},e.src=n}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(e){this.logger.error("Error fetching new dynamic image:",e)}}updateWeather(e){this.isInitialized?this.currentWeather!==e&&(this.logger.info(`Updating weather condition to: ${e}`),this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after weather update:",e))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after initialization:",e))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}get isTransitioning(){return this._isTransitioning}handleImageTransition(){this._isTransitioning=!0,this.host.requestUpdate(),setTimeout(()=>{this.applyTransitionEffect()},po.TRANSITION_DELAY_MS)}applyTransitionEffect(){if(!(this.host instanceof HTMLElement&&this.host.shadowRoot))return void this.logger.error("Could not access shadow root");const e=this.host.shadowRoot.querySelector(".background-container");e?(e.classList.add("active-transition"),this.logger.debug("Added active-transition class to container"),setTimeout(()=>{this.cleanupAfterTransition(e)},po.TRANSITION_DURATION_MS)):this.logger.error("Could not find background container element")}cleanupAfterTransition(e){e.classList.contains("active-transition")&&e.classList.remove("active-transition"),this._isTransitioning=!1,this.host.requestUpdate(),this.logger.debug("Transition completed")}}po.TRANSITION_DELAY_MS=50,po.TRANSITION_DURATION_MS=1e3;var vo=function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let yo=class extends he{constructor(){super(),this.backgroundOpacity=.5,this.logger=ke("background-image-component"),this.backgroundImageController=new po(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(e){var t;super.updated(e),e.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(t=this.config)&&void 0!==t?t:{}))}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}get isTransitioning(){return this.backgroundImageController.isTransitioning}render(){const e=this.currentImageUrl,t=this.previousImageUrl,i=this.isTransitioning;return H`
            <div class="background-container ${i?"transitioning":""}">
                ${e?H`

                        ${i&&t?H`
                                <img class="background-image previous" src="${t}" >
                            `:""}
                        <img class="background-image" src="${e}">
                        <div class="background-overlay" style="opacity: ${void 0!==this.backgroundOpacity?this.backgroundOpacity:.5};"></div>
                    `:""}
            </div>
        `}};yo.styles=o`
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
    `,vo([fe({type:Number})],yo.prototype,"backgroundOpacity",void 0),vo([fe({type:Object})],yo.prototype,"config",void 0),yo=vo([de("ha-background-image")],yo);class wo{static getInstance(){return wo.instance||(wo.instance=new wo),wo.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&$e.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const bo=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,i=e.longitude||14.4378,n=e.units||"metric",s=e.language||"cs";try{const r=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${i}&units=${n}&lang=${s}&appid=${e.apiKey}`;$e.debug("[OpenWeatherMap] "+r);const o=await fetch(r);if(!o.ok)throw new Error(`OpenWeatherMap API error: ${o.statusText}`);const a=await o.json();if(!a.list||!a.list.length)throw new Error("No forecast data available");const l=a.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},u=new Map;return a.list.forEach(e=>{var t;const i=new Date(1e3*e.dt).toISOString().split("T")[0];u.has(i)||u.set(i,[]),null===(t=u.get(i))||void 0===t||t.push(e)}),{current:h,daily:Array.from(u.entries()).map(([e,t])=>{const i=t.map(e=>e.main.temp),n=Math.min(...i),s=Math.max(...i),r=t[Math.floor(t.length/2)]||t[0],o=t.filter(e=>void 0!==e.pop).map(e=>e.pop),a=o.length>0?o.reduce((e,t)=>e+t,0)/o.length*100:0;return{date:new Date(e),temperatureMin:n,temperatureMax:s,condition:r.weather[0].description,icon:this.getIconUrl(r.weather[0].icon),precipitation:a,humidity:r.main.humidity,windSpeed:r.wind.speed}})}}catch(e){throw $e.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"cs"}}getIconUrl(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){let t;switch($e.debug(`[OpenWeatherMap] Mapping weather condition: ${e}`),e.toLowerCase()){case"clear":case"clear sky":t=xe.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":t=xe.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":t=xe.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":t=xe.Rain;break;case"tornado":case"windy":case"all":default:t=xe.All;break;case"snow":t=xe.Snow}return $e.debug(`[OpenWeatherMap] Mapped to Weather enum: ${t}`),t}},_o=wo.getInstance();_o.register(bo);class ko extends He{constructor(e,t={}){super(e,"weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this.config={},this.config=t}setWeatherSignalProvider(e){this._weatherSignalProvider=e}onHostConnected(){this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0)}async updateConfigAsync(e){this.logger.debug("Updating WeatherController config:",e);const t=this.config.showWeather,i=this.config.weatherUpdateInterval;this.config={...this.config,...e},i!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),!t&&this.config.showWeather?await this.fetchWeatherDataAsync():this.config.showWeather||(this._weatherSignalProvider?this._weatherSignalProvider.updateWeatherSignal(xe.All):fo(xe.All)),this.host.requestUpdate()}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting weather update interval to ${e} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(e){this.logger.error("Error in weather update interval:",e)}})()},t)}async fetchWeatherDataAsync(){var e,t,i,n;if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const r=this.config.weatherProvider||"openweathermap",o=(s=r,_o.getProvider(s));if(!o)throw new Error(`Weather provider '${r}' not found`);let a=o.getDefaultConfig();this.config.weatherConfig&&(a={...a,...this.config.weatherConfig},this.config.weatherConfig.units&&(a.units=this.config.weatherConfig.units,this.logger.debug(`Using weather units: ${a.units}`))),this._weatherData=await o.fetchWeatherAsync(a),this._weatherData&&(this._weatherSignalProvider?this._weatherSignalProvider.updateWeatherSignal(null!==(t=null===(e=this._weatherData.current)||void 0===e?void 0:e.conditionUnified)&&void 0!==t?t:xe.All):fo(null!==(n=null===(i=this._weatherData.current)||void 0===i?void 0:i.conditionUnified)&&void 0!==n?n:xe.All)),this.logger.info(`Fetched weather data from ${o.name}:`,this._weatherData)}catch(e){this._weatherError=!0,this._weatherErrorMessage=e instanceof Error?e.message:String(e),this.logger.error("Error fetching weather data:",e)}finally{this._weatherLoading=!1,this.host.requestUpdate()}var s}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}get weatherSignalProvider(){return this._weatherSignalProvider}}var So=function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let $o=class extends he{constructor(){super(),this.logger=ke("weather-component"),this.weatherController=new ko(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval})}get controller(){return this.weatherController}updated(e){if(super.updated(e),e.has("showWeather")||e.has("weatherProvider")||e.has("weatherConfig")||e.has("weatherDisplayMode")||e.has("weatherForecastDays")||e.has("weatherTitle")||e.has("weatherUpdateInterval")){this.logger.debug("Weather properties changed, updating WeatherController");const e={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval};this.weatherController.updateConfigAsync(e)}}translateWeatherCondition(e){const t=this.language||"cs",i=function(e,t,i=e){if(!Ve().includes(t))return null!==i?i:e;const n=ze[t];if(!n)return null!==i?i:e;const s=function(e,t){if(void 0!==e[t])return e[t];const i=t.split(".");let n=e;for(const e of i){if(null==n||"object"!=typeof n)return;n=n[e]}return n}(n,e);return"string"==typeof s?s:null!==i?i:e}(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,null);return null!==i?i:e}formatForecastDate(e){return je(e,this.language||"cs",{weekday:"short"})}get weatherData(){const e=this.weatherController.weatherData;return e&&e.current&&e.current.conditionUnified&&(this.weatherController.weatherSignalProvider?this.weatherController.weatherSignalProvider.updateWeatherSignal(e.current.conditionUnified):fo(e.current.conditionUnified)),e}render(){const e=this.weatherController.weatherData;if(this.weatherController.hasError)return H`
                <div class="weather-container" style="color: rgb( ${this.fontColor});">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!e)return H`
                <div class="weather-container" style="color: rgb( ${this.fontColor});">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;const t=this.weatherDisplayMode||"both",i=this.weatherForecastDays||3,n=this.weatherTitle||"Weather",s=Math.min(i,e.daily.length);return H`
            <div class="weather-container" style="color: rgb( ${this.fontColor});">
                <div class="weather-title" style="color: rgb( ${this.fontColor});">${n}</div>

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
                            ${e.daily.slice(0,s).map(e=>H`
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
        `}};$o.styles=o`
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
    `,So([fe({type:Boolean})],$o.prototype,"showWeather",void 0),So([fe({type:String})],$o.prototype,"weatherProvider",void 0),So([fe({type:Object})],$o.prototype,"weatherConfig",void 0),So([fe({type:String})],$o.prototype,"weatherDisplayMode",void 0),So([fe({type:Number})],$o.prototype,"weatherForecastDays",void 0),So([fe({type:String})],$o.prototype,"weatherTitle",void 0),So([fe({type:Number})],$o.prototype,"weatherUpdateInterval",void 0),So([fe({type:String})],$o.prototype,"fontColor",void 0),So([fe({type:String})],$o.prototype,"language",void 0),$o=So([de("ha-weather")],$o);class Co{static getInstance(){return Co.instance||(Co.instance=new Co),Co.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&$e.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const Io=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(e,t){try{if(0===t.length)throw new Error("No stops configured");const i={};for(const e of t){const t=String(e.stopId);i[t]||(i[t]=[]),i[t].push(e)}const n=[];for(const t of Object.keys(i)){const s=i[t],r=s.map(e=>e.postId),o=`https://dpmbinfo.dpmb.cz/api/departures?stopid=${t}`,a=`https://api.allorigins.win/raw?url=${encodeURIComponent(o)}`,l=await fetch(a,{headers:{"User-Agent":"cz.dpmb.dpmbinfo/4.1.3 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!l.ok)throw new Error(`Failed to fetch transportation data: ${l.status} ${l.statusText}`);const c=await l.json();if(c.Error)throw new Error(`API error: ${c.Error}`);for(const i of r){const r=c.PostList.find(e=>e.PostID===i);if(!r){$e.warn(`No platform found with postId ${i} for stopId ${t}`);continue}const o=r.Name,a=s.find(e=>e.postId===i);if(!a)continue;const l=a.name||o,h=e.maxDepartures||2,u=r.Departures.slice(0,Math.min(h,5)).map(e=>({lineId:e.LineId||e.Line,lineName:e.Line||e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:l,postId:i}));n.push(...u)}}return{departures:n,loading:!1}}catch(e){return $e.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}},xo=Co.getInstance();xo.register(Io);class Oo extends He{constructor(e,t={}){super(e,"transportation-controller"),this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this.config={},this.config=t}onHostConnected(){var e;this.config.transportation&&!1!==this.config.enableTransportation&&!(null===(e=this.config.transportation)||void 0===e?void 0:e.onDemand)&&(this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval())}onHostDisconnected(){this.clearTimers()}updateConfig(e){var t;this.logger.debug("Updating TransportationController config:",e);const i={...this.config};this.config={...this.config,...e},this.clearTimers(),this.config.transportation&&!1!==this.config.enableTransportation&&!(null===(t=this.config.transportation)||void 0===t?void 0:t.onDemand)?((!i.transportation||!this.config.transportation||JSON.stringify(i.transportation)!==JSON.stringify(this.config.transportation)||i.enableTransportation!==this.config.enableTransportation)&&this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval()):this._transportationDataLoaded=!1,this.host.requestUpdate()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.enableTransportation)return;let e=this.config.transportationUpdateInterval||60;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting transportation update interval to ${e} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){this.logger.error("Error in transportation update interval:",e)}})()},t)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0)}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.enableTransportation){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const i=(e=t.provider,xo.getProvider(e));if(!i)throw new Error(`Transportation provider '${t.provider}' not found`);const n=t.stops.map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),s=t.providerConfig||{};void 0!==t.maxDepartures&&(s.maxDepartures=t.maxDepartures),this._transportationData=await i.fetchTransportationAsync(s,n),this._lastTransportationUpdate=new Date,this.logger.debug(`Fetched transportation data from ${i.name}:`,this._transportationData)}catch(e){this.logger.error("Error fetching transportation data:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}var e;this.host.requestUpdate()}}async handleTransportationClick(){var e;if(this.logger.debug("Transportation button clicked, loading data on demand"),await this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(e=this.config.transportation)||void 0===e?void 0:e.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));const t=60*e*1e3;this.logger.debug(`Setting transportation auto-hide timeout to ${e} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.debug(`Auto-hiding transportation departures after ${e} minutes`),this._transportationDataLoaded=!1,this.host.requestUpdate()},t)}this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get lastTransportationUpdate(){return this._lastTransportationUpdate}}var No=function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let To=class extends he{constructor(){super(),this.enableTransportation=!0,this.logger=ke("transportation-component"),this.transportationController=new Oo(this,{transportation:this.transportation,transportationUpdateInterval:this.transportationUpdateInterval,enableTransportation:this.enableTransportation})}get controller(){return this.transportationController}updated(e){super.updated(e),(e.has("transportation")||e.has("transportationUpdateInterval")||e.has("enableTransportation"))&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation,transportationUpdateInterval:this.transportationUpdateInterval,enableTransportation:this.enableTransportation}))}render(){var e;if(!this.transportation||!1===this.enableTransportation)return H``;const t=this.transportationController.transportationData,i=this.transportationController.transportationDataLoaded;return H`
            ${(null===(e=this.transportation)||void 0===e?void 0:e.onDemand)&&!i?H`
                    <div class="transportation-on-demand-button"
                         @click=${this._handleTransportationClickAsync}>
                        <svg viewBox="0 0 24 24">
                            <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
                        </svg>
                    </div>`:H`
                    <div class="transportation-container" style="color: rgb( ${this.fontColor});">
                        ${this.renderTransportationContent(t)}
                    </div>`}
        `}renderTransportationContent(e){if(e.loading)return H`
                <div>Loading transportation data...</div>`;if(e.error)return H`
                <div class="transportation-error">${e.error}</div>`;if(!e.departures||0===e.departures.length)return H`
                <div>No departures available</div>`;const t={};for(const i of e.departures){const e=`${i.stopName}-${i.postId}`;t[e]||(t[e]=[]),t[e].push(i)}return H`
            <div class="transportation-departures">
                ${Object.entries(t).map(([e,t])=>{const i=t[0].stopName;return H`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: rgb( ${this.fontColor});">
                                ${i}
                            </h3>
                            <div class="stop-departures">
                                ${t.map(e=>H`
                                    <div class="departure-item">
                                        <div class="departure-line" style="color: rgb( ${this.fontColor});">
                                            ${e.lineName}
                                        </div>
                                        <div class="departure-destination" style="color: rgb( ${this.fontColor});">→
                                            ${e.finalStop}
                                        </div>
                                        <div class="departure-time" style="color: rgb( ${this.fontColor});">
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
        `}async _handleTransportationClickAsync(){this.transportationController.handleTransportationClick()}};var Do,Ao,Mo;To.styles=o`
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
    `,No([fe({type:Object})],To.prototype,"transportation",void 0),No([fe({type:Number})],To.prototype,"transportationUpdateInterval",void 0),No([fe({type:Boolean})],To.prototype,"enableTransportation",void 0),No([fe({type:String})],To.prototype,"fontColor",void 0),No([fe({type:Object})],To.prototype,"hass",void 0),To=No([de("ha-transportation")],To),(Mo=Do||(Do={})).language="language",Mo.system="system",Mo.comma_decimal="comma_decimal",Mo.decimal_comma="decimal_comma",Mo.space_comma="space_comma",Mo.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Ao||(Ao={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var Eo=function(e,t,i,n){n=n||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,e.dispatchEvent(s),s};new Set(["call-service","divider","section","weblink","cast","select"]);var Fo=function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let Po=class extends he{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._timeFormatOptions={hour12:[{value:!0,label:"12-hour"},{value:!1,label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._languageOptions=[],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback(),this._languageOptions=Le.map(e=>({value:e.code,label:e.label}))}_getTransportationProviderOptions(){return[...xo.getAllProviders().map(e=>({value:e.id,label:e.name}))]}_getGeneralSchema(){return[{name:"fontColor",label:"Font Color",selector:{color_rgb:{}}},{name:"language",label:"Language",selector:{select:{options:this._languageOptions}}},{name:"logLevel",label:"Log Level",selector:{select:{options:[{value:"debug",label:"Debug"},{value:"info",label:"Info"},{value:"warn",label:"Warning"},{value:"error",label:"Error"},{value:"none",label:"None"}],mode:"dropdown"}}}]}_getTimeFormatSchema(){return[{name:"hour12",label:"Use 12-Hour Clock",selector:{boolean:{}}},{name:"hour",label:"Hour Display",selector:{select:{options:this._timeFormatOptions.hour.map(e=>({value:e.value,label:e.label})),mode:"dropdown"}}},{name:"minute",label:"Minute Display",selector:{select:{options:this._timeFormatOptions.minute.map(e=>({value:e.value,label:e.label})),mode:"dropdown"}}},{name:"second",label:"Second Display",selector:{select:{options:this._timeFormatOptions.second.map(e=>({value:void 0===e.value?"undefined":e.value,label:e.label})),mode:"dropdown"}}}]}_getDateFormatSchema(){return[{name:"weekday",label:"Weekday Display",selector:{select:{options:this._dateFormatOptions.weekday.map(e=>({value:void 0===e.value?"undefined":e.value,label:e.label})),mode:"dropdown"}}},{name:"month",label:"Month Display",selector:{select:{options:this._dateFormatOptions.month.map(e=>({value:void 0===e.value?"undefined":e.value,label:e.label})),mode:"dropdown"}}},{name:"day",label:"Day Display",selector:{select:{options:this._dateFormatOptions.day.map(e=>({value:void 0===e.value?"undefined":e.value,label:e.label})),mode:"dropdown"}}},{name:"year",label:"Year Display",selector:{select:{options:this._dateFormatOptions.year.map(e=>({value:void 0===e.value?"undefined":e.value,label:e.label})),mode:"dropdown"}}}]}_computeLabel(e){return e.label||e.name}_handleFormValueChanged(e){if(e.stopPropagation(),!this._config)return;const t=e.detail.value,i=JSON.parse(JSON.stringify(this._config));Object.keys(t).forEach(e=>{i[e]=t[e]}),this._config=i,Eo(this,"config-changed",{config:i})}_handleNestedFormValueChanged(e,t){if(t.stopPropagation(),!this._config||!this._config[e])return;const i=t.detail.value,n=JSON.parse(JSON.stringify(this._config));n[e]={...n[e]},Object.keys(i).forEach(t=>{const s=i[t];n[e][t]="hidden"===s?"hidden":"undefined"===s?void 0:"true"===s||"false"!==s&&s}),this._config=n,Eo(this,"config-changed",{config:n})}setConfig(e){const t=e,i=t.imageSource||"none";let n={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};t.timeFormat&&(n={...n,...t.timeFormat},void 0===t.timeFormat.second&&(n.second=void 0)),this._config={...t,timeFormat:n,dateFormat:t.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:i,imageConfig:t.imageConfig||{},backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",showWeather:void 0!==t.showWeather&&t.showWeather,weatherProvider:t.weatherProvider||"openweathermap",weatherConfig:t.weatherConfig||{},weatherDisplayMode:t.weatherDisplayMode||"both",weatherForecastDays:t.weatherForecastDays||3,transportation:t.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops()}_loadSensors(){var e;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,Eo(this,"config-changed",{config:e})}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,i)=>i!==e),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,Eo(this,"config-changed",{config:e})}}_sensorChanged(e,t,i){if(this._sensors=this._sensors.map((n,s)=>s===e?{...n,[t]:i}:n),this._config){const e=JSON.parse(JSON.stringify(this._config));e.sensors=[...this._sensors],this._config=e,Eo(this,"config-changed",{config:e})}}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this._config){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this._config=e,Eo(this,"config-changed",{config:e})}}_removeStop(e){if(this._stops=this._stops.filter((t,i)=>i!==e),this._config&&this._config.transportation){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this._config=e,Eo(this,"config-changed",{config:e})}}_stopChanged(e,t,i){if(this._stops=this._stops.map((n,s)=>s===e?{...n,[t]:i}:n),this._config&&this._config.transportation){const e=JSON.parse(JSON.stringify(this._config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this._config=e,Eo(this,"config-changed",{config:e})}}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:xe.All,timeOfDay:Ie.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,i)=>i!==e),this._updateBackgroundImagesConfig()}_updateBackgroundImage(e,t){this._backgroundImages=this._backgroundImages.map((i,n)=>{if(n===e){const e={...i,...t};if(t.url&&e.url){if(e.weather===xe.All){const t=Te(e.url,Oe);t&&(e.weather=t,$e.debug(`Auto-detected weather: ${e.weather} from URL: ${e.url}`))}if(e.timeOfDay===Ie.Unspecified){const t=Te(e.url,Ne);t&&(e.timeOfDay=t,$e.debug(`Auto-detected timeOfDay: ${e.timeOfDay} from URL: ${e.url}`))}}return e}return i}),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this._config){const e=JSON.parse(JSON.stringify(this._config));e.backgroundImages=[...this._backgroundImages],this._config=e,Eo(this,"config-changed",{config:e})}}static get styles(){return o`
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

            ha-selector, ha-textfield, ha-select {
                width: 100%;
            }
        `}render(){var e,t,i,n,s,r,o,a,l,c,h,u,d,g,m;if(!this.hass||!this._config)return H``;const f=Object.keys(this.hass.states).sort();return H`
            <div class="form-container">
                <!-- General Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">General</h3>
                    <div class="content">
                        <ha-form
                            .hass=${this.hass}
                            .data=${this._config}
                            .schema=${this._getGeneralSchema()}
                            .computeLabel=${this._computeLabel}
                            @value-changed=${this._handleFormValueChanged}
                        ></ha-form>

                        <!-- Color preview is now handled by the color_rgb selector -->
                    </div>
                </ha-expansion-panel>

                <!-- Time Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Time Format</h3>
                    <div class="content">
                        <ha-form
                            .hass=${this.hass}
                            .data=${this._config.timeFormat||{}}
                            .schema=${this._getTimeFormatSchema()}
                            .computeLabel=${this._computeLabel}
                            @value-changed=${e=>this._handleNestedFormValueChanged("timeFormat",e)}
                        ></ha-form>
                    </div>
                </ha-expansion-panel>

                <!-- Date Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Date Format</h3>
                    <div class="content">
                        <ha-form
                            .hass=${this.hass}
                            .data=${this._config.dateFormat||{}}
                            .schema=${this._getDateFormatSchema()}
                            .computeLabel=${this._computeLabel}
                            @value-changed=${e=>this._handleNestedFormValueChanged("dateFormat",e)}
                        ></ha-form>
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
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageSource=t.value,i.useOnlineImages="none"!==t.value&&"local"!==t.value,this._config=i,Eo(this,"config-changed",{config:i})}}
                                >
                                    ${this._imageSourceOptions.map(e=>H`
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
                                        @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundOpacity="string"==typeof t.value?parseFloat(t.value):t.value,this._config=i,Eo(this,"config-changed",{config:i})}}
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
                                        @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundRotationInterval="string"==typeof t.value?parseInt(t.value,10):t.value,this._config=i,Eo(this,"config-changed",{config:i})}}
                                ></ha-slider>
                                <span>${this._config.backgroundRotationInterval||90} seconds</span>
                            </div>
                        </div>
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
                                            ${Object.values(xe).map(e=>H`
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
                                            ${Object.values(Ie).map(e=>H`
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
                                            .value=${(null===(e=this._config.imageConfig)||void 0===e?void 0:e.category)||"nature"}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.category=t.value||"nature",this._config=i,Eo(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Number of Photos</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Number of Photos"
                                            type="number"
                                            min="1"
                                            max="30"
                                            .value=${(null===(t=this._config.imageConfig)||void 0===t?void 0:t.count)||"5"}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={});let n=parseInt(t.value||"5",10);(isNaN(n)||n<1)&&(n=1),n>30&&(n=30),i.imageConfig.count=n,this._config=i,Eo(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                </div>
                            </div>

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
                                                .value=${(null===(i=this._config.imageConfig)||void 0===i?void 0:i.apiKey)||""}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.apiKey=t.value||"",this._config=i,Eo(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${(null===(n=this._config.imageConfig)||void 0===n?void 0:n.contentFilter)||"high"}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.contentFilter=t.value||"high",this._config=i,Eo(this,"config-changed",{config:i})}}
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

                            <div class="row">
                                <div class="label">Sensor Entity</div>
                                <div class="value">
                                    <ha-select
                                        label="Entity"
                                        .value=${(null===(s=this._config.imageConfig)||void 0===s?void 0:s.entity)||""}
                                        @click=${e=>{e.stopPropagation()}}
                                        @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.entity=t.value||"",this._config=i,Eo(this,"config-changed",{config:i})}}
                                    >
                                        ${f.filter(e=>e.startsWith("sensor.")).map(e=>H`
                                                <mwc-list-item .value=${e}>${e}</mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

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
                                <div class="sensor-entity">
                                    <ha-select
                                            label="Entity"
                                            .value=${e.entity||""}
                                            @click=${e=>{e.stopPropagation()}}
                                            @closed=${e=>{e.stopPropagation();const i=e.target;i&&this._sensorChanged(t,"entity",i.value||"")}}
                                    >
                                        ${f.map(e=>H`
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
                                        @change=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.showWeather=t.checked||!1,this._config=i,Eo(this,"config-changed",{config:i})}}
                                ></ha-switch>
                                <span>Display weather forecast</span>
                            </div>
                        </div>

                        ${this._config.showWeather?H`
                            <div class="row">
                                <div class="label">Weather Title</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Title for weather section"
                                            .value=${this._config.weatherTitle||"Weather"}
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherTitle=t.value||"Weather",this._config=i,Eo(this,"config-changed",{config:i})}}
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
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherProvider=t.value||"openweathermap",this._config=i,Eo(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherProviderOptions.map(e=>H`
                                                    <mwc-list-item .value=${e.value}>${e.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"openweathermap"===this._config.weatherProvider?H`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="OpenWeatherMap API Key"
                                                .value=${(null===(r=this._config.weatherConfig)||void 0===r?void 0:r.apiKey)||""}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},apiKey:t.value||""},this._config=i,Eo(this,"config-changed",{config:i})}}
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
                                                .value=${(null===(o=this._config.weatherConfig)||void 0===o?void 0:o.latitude)||50.0755}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},latitude:parseFloat(t.value||"50.0755")},this._config=i,Eo(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <ha-textfield
                                                label="Longitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${(null===(a=this._config.weatherConfig)||void 0===a?void 0:a.longitude)||14.4378}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},longitude:parseFloat(t.value||"14.4378")},this._config=i,Eo(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                            `:""}

                            ${"openweathermap"===this._config.weatherProvider?H`
                                <div class="row">
                                    <div class="label">Units</div>
                                    <div class="value">
                                        <ha-select
                                                label="Units"
                                                .value=${(null===(l=this._config.weatherConfig)||void 0===l?void 0:l.units)||"metric"}
                                                @click=${e=>{e.stopPropagation()}}
                                                @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},units:t.value||"metric"},this._config=i,Eo(this,"config-changed",{config:i})}}
                                        >
                                            ${this._unitsOptions.map(e=>H`
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
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherDisplayMode=t.value||"both",this._config=i,Eo(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherDisplayModeOptions.map(e=>H`
                                                    <mwc-list-item .value=${e.value}>${e.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"forecast"===this._config.weatherDisplayMode||"both"===this._config.weatherDisplayMode?H`
                                <div class="row">
                                    <div class="label">Forecast Days</div>
                                    <div class="value">
                                        <ha-slider
                                                min="1"
                                                max="7"
                                                step="1"
                                                pin
                                                .value=${this._config.weatherForecastDays||3}
                                                @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherForecastDays="string"==typeof t.value?parseInt(t.value,10):t.value,this._config=i,Eo(this,"config-changed",{config:i})}}
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
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));let n="string"==typeof t.value?parseInt(t.value,10):t.value;n=Math.max(n||30,1);const s=60*n;i.weatherUpdateInterval=s,this._config=i,Eo(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <span>minutes</span>
                                    </div>
                                </div>
                            `:""}
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===this._config.enableTransportation?H`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <div class="content">

                            <div class="row">
                                <div class="label">Transportation Provider</div>
                                <div class="value">
                                    <ha-select
                                            label="Provider"
                                            .value=${(null===(c=this._config.transportation)||void 0===c?void 0:c.provider)||"idsjmk"}
                                            @click=${e=>{e.stopPropagation()}}
                                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,provider:t.value||"idsjmk"},this._config=i,Eo(this,"config-changed",{config:i})}}
                                    >
                                        ${this._getTransportationProviderOptions().map(e=>H`
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
                                            .value=${(null===(h=this._config.transportation)||void 0===h?void 0:h.maxDepartures)||2}
                                            @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,maxDepartures:"string"==typeof t.value?parseInt(t.value,10):t.value},this._config=i,this._loadStops(),Eo(this,"config-changed",{config:i})}}
                                    ></ha-slider>
                                    <span>${(null===(u=this._config.transportation)||void 0===u?void 0:u.maxDepartures)||2} departures</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Show on Demand</div>
                                <div class="value">
                                    <ha-switch
                                            .checked=${!0===(null===(d=this._config.transportation)||void 0===d?void 0:d.onDemand)}
                                            @change=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,onDemand:t.checked},this._config=i,Eo(this,"config-changed",{config:i})}}
                                    ></ha-switch>
                                    <span>Only show departures when clicked</span>
                                </div>
                            </div>

                            ${!0===(null===(g=this._config.transportation)||void 0===g?void 0:g.onDemand)?H`
                                <div class="row">
                                    <div class="label">Auto-Hide Timeout</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Auto-hide timeout in minutes (1-10)"
                                                type="number"
                                                min="1"
                                                max="10"
                                                .value=${(null===(m=this._config.transportation)||void 0===m?void 0:m.autoHideTimeout)||5}
                                                @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let n="string"==typeof t.value?parseInt(t.value,10):t.value;n=Math.max(Math.min(n||5,10),1),i.transportation={...i.transportation,autoHideTimeout:n},this._config=i,Eo(this,"config-changed",{config:i})}}
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
                                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let n="string"==typeof t.value?parseInt(t.value,10):t.value;n=Math.max(n||1,1);const s=60*n;i.transportationUpdateInterval=s,this._config=i,Eo(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                    <span>minutes</span>
                                </div>
                            </div>

                            <div class="section-subheader">Stops</div>

                            ${this._stops.map((e,t)=>H`
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
        `}};Fo([fe({type:Object})],Po.prototype,"hass",void 0),Fo([fe({type:Object})],Po.prototype,"_config",void 0),Fo([fe({type:Array})],Po.prototype,"_sensors",void 0),Fo([fe({type:Array})],Po.prototype,"_backgroundImages",void 0),Fo([fe({type:Array})],Po.prototype,"_stops",void 0),Po=Fo([de("wall-clock-card-editor")],Po);var Uo=function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let Wo=class extends he{constructor(){super(),this.config={},this.consecutiveFailures=0,this.isRetrying=!1,this.clockComponent=document.createElement("ha-clock"),this.sensorComponent=document.createElement("ha-sensors"),this.weatherComponent=document.createElement("ha-weather"),this.backgroundImageComponent=document.createElement("ha-background-image"),this.transportationComponent=document.createElement("ha-transportation"),this.weatherSignalProvider=new uo,$e.info("%c WALL-CLOCK-CARD %c 2.0.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language,this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language,this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor}connectedCallback(){super.connectedCallback(),this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.weatherComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor,this.hass&&(this.transportationComponent.hass=this.hass),this.initConnectCallbackAsync()}async initConnectCallbackAsync(){await this.weatherComponent.controller.ready,await this.backgroundImageComponent.controller.ready,await this.clockComponent.controller.ready,await this.sensorComponent.controller.ready,await this.transportationComponent.controller.ready,be({level:Se(this.config.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1});try{await async function(){$e.debug("Loading all translations");const e=Ve().map(e=>async function(e){try{Re[e]?(ze[e]=Re[e],$e.debug(`Loaded translations for ${e}`)):$e.warn(`No embedded translations found for ${e}`)}catch(t){$e.error(`Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),$e.debug("Loaded translations for all languages")}catch(e){$e.error("Error loading translations:",e)}this.config.showWeather||this.weatherSignalProvider.updateWeatherSignal(xe.All)}initBackgroundImageComponent(){var e,t,i,n,s;const r={imageSourceId:this.config.imageSource||"picsum",backgroundImages:this.config.backgroundImages,entity:null===(e=this.config.imageConfig)||void 0===e?void 0:e.entity,apiKey:null===(t=this.config.imageConfig)||void 0===t?void 0:t.apiKey,contentFilter:null===(i=this.config.imageConfig)||void 0===i?void 0:i.contentFilter,category:null===(n=this.config.imageConfig)||void 0===n?void 0:n.category,count:null===(s=this.config.imageConfig)||void 0===s?void 0:s.count};this.backgroundImageComponent.backgroundOpacity=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5,this.backgroundImageComponent.config={imageSourceConfig:r,backgroundRotationInterval:this.config.backgroundRotationInterval},this.backgroundImageComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),$e.debug("Background image component initialized")}disconnectedCallback(){super.disconnectedCallback()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.initAfterSetConfigAsync(e)}async initAfterSetConfigAsync(e){const t=e.imageSource||"none";let i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(i={...i,...e.timeFormat},void 0!==e.timeFormat.hour12&&(i.hour12=Boolean(e.timeFormat.hour12)),void 0===e.timeFormat.second&&(i.second=void 0));let n={weekday:"long",year:"numeric",month:"long",day:"numeric"};e.dateFormat&&(n={...n,...e.dateFormat},void 0===e.dateFormat.year&&(n.year=void 0));let s=e.timeZone;!s&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(s=this.hass.config.time_zone),this.config={...e,timeFormat:i,dateFormat:n,backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:t,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",timeZone:s},this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.weatherComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor,this.config.showWeather||this.backgroundImageComponent.controller.ready.then(()=>{this.weatherSignalProvider.updateWeatherSignal(xe.All)})}updated(e){if(e.has("hass")&&this.hass&&(this.sensorComponent.hass=this.hass,this.transportationComponent.hass=this.hass),e.has("config")&&this.config){const e=this.config.logLevel||"info",t=Se(e);$e.debug(`Updating log level to ${e} (${pe[t]})`),be({level:t,prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}}static get styles(){return o`
            /* Include ClockComponent styles */
            ${r(lr.styles)}
            /* Include SensorComponent styles */
            ${r(ur.styles)}
            /* Include BackgroundImageComponent styles */
            ${r(yo.styles)}
            /* Include WeatherComponent styles */
            ${r($o.styles)}
            /* Include TransportationComponent styles */
            ${r(To.styles)}
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

        `}render(){return H`
            <ha-card style="color: rgb( ${this.config.fontColor});">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather?H`<div style="position: absolute; top: 16px; right: 16px; max-width: 40%; max-height: 60%; z-index: 3; padding-left: 8px;">
                            ${this.weatherComponent}
                        </div>`:""}
                <div style="${this.config.transportation&&!1!==this.config.enableTransportation?`margin-top: -${30*(this.config.transportation.maxDepartures||3)+80}px;`:""}">
                    ${this.clockComponent}
                </div>
                ${this.transportationComponent}
            </ha-card>
        `}};Uo([fe({type:Object})],Wo.prototype,"hass",void 0),Uo([fe({type:Object})],Wo.prototype,"config",void 0),Uo([fe({type:Number})],Wo.prototype,"consecutiveFailures",void 0),Uo([fe({type:Boolean})],Wo.prototype,"isRetrying",void 0),Wo=Uo([de("wall-clock-card")],Wo),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
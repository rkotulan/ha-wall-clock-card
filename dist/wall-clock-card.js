/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;class s{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}}const r=t=>new s("string"==typeof t?t:t+"",void 0,i),o=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new s(n,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:d,getPrototypeOf:g}=Object,m=globalThis,f=m.trustedTypes,p=f?f.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),_={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class k extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const r=n?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=n;const r=s.fromAttribute(e,t.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const n=this.constructor,s=this[t];if(i??=n.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,v?.({ReactiveElement:k}),(m.reactiveElementVersions??=[]).push("2.1.1");const S=globalThis,$=S.trustedTypes,C=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,I="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+x,N=`<${O}>`,T=document,D=()=>T.createComment(""),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,F=t=>M(t)||"function"==typeof t?.[Symbol.iterator],E="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,W=/>/g,L=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,z=/"/g,V=/^(?:script|style|textarea|title)$/i,j=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),J=j(1),H=j(2),Z=(j(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),B=new WeakMap,Y=T.createTreeWalker(T,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,n=[];let s,r=2===e?"<svg>":3===e?"<math>":"",o=P;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===P?"!--"===l[1]?o=U:void 0!==l[1]?o=W:void 0!==l[2]?(V.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=L):void 0!==l[3]&&(o=L):o===L?">"===l[0]?(o=s??P,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?L:'"'===l[3]?z:R):o===z||o===R?o=L:o===U||o===W?o=P:(o=L,s=void 0);const u=o===L&&t[e+1].startsWith("/>")?" ":"";r+=o===P?i+N:c>=0?(n.push(a),i.slice(0,c)+I+i.slice(c)+x+u):i+x+(-2===c?e:u)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Q{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,r=0;const o=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=Q.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Y.nextNode())&&a.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(I)){const e=c[r++],i=n.getAttribute(t).split(x),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?nt:"?"===o[1]?st:"@"===o[1]?rt:it}),n.removeAttribute(t)}else t.startsWith(x)&&(a.push({type:6,index:s}),n.removeAttribute(t));if(V.test(n.tagName)){const t=n.textContent.split(x),e=t.length-1;if(e>0){n.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],D()),Y.nextNode(),a.push({type:2,index:++s});n.append(t[e],D())}}}else if(8===n.nodeType)if(n.data===O)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(x,t+1));)a.push({type:7,index:s}),t+=x.length-1}s++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,n){if(e===Z)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const r=A(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=X(t,s._$AS(t,e.values),s,n)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);Y.currentNode=n;let s=Y.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ot(s,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(s=Y.nextNode(),r++)}return Y.currentNode=T,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),A(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):F(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&A(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new Q(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new et(this.O(D()),this.O(D()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,n){const s=this.strings;let r=!1;if(void 0===s)t=X(this,t,e,0),r=!A(t)||t!==this._$AH&&t!==Z,r&&(this._$AH=t);else{const n=t;let o,a;for(t=s[0],o=0;o<s.length-1;o++)a=X(this,n[i+o],e,o),a===Z&&(a=this._$AH[o]),r||=!A(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+s[o+1]),this._$AH[o]=a}r&&!n&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class rt extends it{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===Z)return;const i=this._$AH,n=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==q&&(i===q||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at={M:I,P:x,A:O,C:1,L:K,R:tt,D:F,V:X,I:et,H:it,N:st,U:rt,B:nt,F:ot},lt=S.litHtmlPolyfillSupport;lt?.(Q,et),(S.litHtmlVersions??=[]).push("3.3.1");const ct=globalThis;class ht extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new et(e.insertBefore(D(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}ht._$litElement$=!0,ht.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ht});const ut=ct.litElementPolyfillSupport;ut?.({LitElement:ht}),(ct.litElementVersions??=[]).push("4.2.1");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},gt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},mt=(t=gt,e,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t)}}throw Error("Unsupported decorator location: "+n)};function ft(t){return(e,i)=>"object"==typeof i?mt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var pt;!function(t){t[t.DEBUG=0]="DEBUG",t[t.INFO=1]="INFO",t[t.WARN=2]="WARN",t[t.ERROR=3]="ERROR",t[t.NONE=4]="NONE"}(pt||(pt={}));const vt={level:pt.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let yt={...vt};const wt=[];function bt(t){const e=yt.level;yt={...vt,...t},e!==yt.level&&console.log(`[LOGGER] Log level changed from ${pt[e]} to ${pt[yt.level]}`)}function _t(t,e,i,...n){var s;if(t<yt.level)return;const r=function(t,e,i){const{prefix:n,enableTimestamps:s,enableSourceTracking:r}=yt;let o="";return s&&(o+=`[${(new Date).toISOString()}] `),o+=`[${pt[t]}] `,n&&(o+=`[${n}] `),e&&r&&(o+=`[${e}] `),o+=i,o}(t,e,i);if(yt.logToConsole)switch(t){case pt.DEBUG:console.debug(r,...n);break;case pt.INFO:console.log(r,...n);break;case pt.WARN:console.warn(r,...n);break;case pt.ERROR:console.error(r,...n)}if(yt.logToStorage){let t=r;if(n.length>0)try{t+=" "+n.map(t=>"object"==typeof t?JSON.stringify(t):String(t)).join(" ")}catch(e){t+=" [Arguments could not be stringified]"}wt.push(t);const e=null!==(s=yt.maxStoredLogs)&&void 0!==s?s:100;wt.length>e&&wt.splice(0,wt.length-e)}}function kt(t){return{debug:(e,...i)=>_t(pt.DEBUG,t,e,...i),info:(e,...i)=>_t(pt.INFO,t,e,...i),warn:(e,...i)=>_t(pt.WARN,t,e,...i),error:(e,...i)=>_t(pt.ERROR,t,e,...i),withSource:t=>kt(t)}}function St(t){switch(t.toLowerCase()){case"debug":return pt.DEBUG;case"info":return pt.INFO;case"warn":default:return pt.WARN;case"error":return pt.ERROR;case"none":return pt.NONE}}const $t=kt("wall-clock");class Ct{static getInstance(){return Ct.instance||(Ct.instance=new Ct),Ct.instance}constructor(){this.sources=new Map}register(t){this.sources.has(t.id)&&$t.warn(`Image source with ID ${t.id} is already registered. Overwriting.`),this.sources.set(t.id,t)}registerAll(t){t.forEach(t=>this.register(t))}getSource(t){return this.sources.get(t)}getAllSources(){return Array.from(this.sources.values())}hasSource(t){return this.sources.has(t)}}var It,xt;!function(t){t.Unspecified="unspecified",t.SunriseSunset="sunrise-sunset",t.Day="day",t.Night="night"}(It||(It={})),function(t){t.All="all",t.ClearSky="clear sky",t.Clouds="clouds",t.Rain="rain",t.Snow="snow",t.Mist="mist"}(xt||(xt={}));const Ot=[xt.All,xt.ClearSky,xt.Clouds,xt.Rain,xt.Snow,xt.Mist],Nt=[It.Unspecified,It.SunriseSunset,It.Day,It.Night];function Tt(t,e){if(!t)return;const i=t.toLowerCase();for(const t of e)if(i.includes(t.toLowerCase().replace(" ","-")))return t}class Dt{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return kt(`${this.id}-source`)}shuffleArray(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}}async fetchImagesAsync(t,e,i){return this.getLogger().debug(`Fetching images with weather: ${e}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(t,e,i)}async getNextImageUrlAsync(t,e,i){var n;this.getLogger().debug(`GetNextImageUrl called with weather: ${e}, timeOfDay: ${i}`),this.lastWeather===e&&this.lastTimeOfDay===i||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=e,this.lastTimeOfDay=i);const s=`${e}_${i}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(s)||0===(null===(n=this.imageUrlCache.get(s))||void 0===n?void 0:n.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const n=[...await this.fetchImagesAsync(t,e,i)];this.shuffleArray(n),this.imageUrlCache.set(s,n),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${n.length} images for weather: ${e}, timeOfDay: ${i}`)}const r=this.imageUrlCache.get(s)||[];if(0===r.length)return this.getLogger().warn(`No images available for weather: ${e}, timeOfDay: ${i}`),"";const o=r[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%r.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${e}, timeOfDay: ${i}, URL: ${o}`),o}filterImagesByWeatherAndTime(t,e,i){if(this.getLogger().debug(`Current time of day: ${i}`),this.getLogger().debug(`Current weather condition: ${e}`),0===t.length)return[];let n=[];return n=t.filter(t=>(t.weather===e||t.weather===xt.All||e===xt.All)&&t.timeOfDay===i),0===n.length&&(n=t.filter(t=>(t.weather===e||t.weather===xt.All||e===xt.All)&&t.timeOfDay===It.Unspecified)),0===n.length&&(n=t.filter(t=>t.timeOfDay===i)),0===n.length&&(n=t.filter(t=>t.timeOfDay===It.Unspecified)),n.length>0?(this.getLogger().debug(`Found ${n.length} images matching current conditions`),n.map(t=>t.url)):(this.getLogger().info("No matching images found, returning all images"),t.map(t=>t.url))}convertUrlsToBackgroundImages(t){return this.getLogger().debug(`Converting ${t.length} URLs to BackgroundImage objects`),t.map(t=>({url:t,weather:Tt(t,Ot)||xt.All,timeOfDay:Tt(t,Nt)||It.Unspecified}))}}const At=new class extends Dt{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=kt("local-source")}async fetchImagesInternalAsync(t,e,i){return t.backgroundImages&&t.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${t.backgroundImages.length} images`),this.logger.debug(`First image URL: ${t.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(t.backgroundImages,e,i)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Mt=new class extends Dt{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=kt("picsum-source")}async fetchImagesInternalAsync(t,e,i){const n=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${n}`),[n]}getDefaultConfig(){return{}}},Ft=new class extends Dt{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=kt("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(t,e,i){const n=t.count||5;let s=t.category||"";const r=t.apiKey||"";return this.logger.debug(`Current weather: ${e}, time of day: ${i}`),this.logger.debug(`Using category with weather and time: ${s}`),r?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(r,s,n,e,i,t)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(t,e,i,n,s,r){const o=[],a=(null==r?void 0:r.contentFilter)||"high";let l="";if(e){const t=e.split(",").map(t=>t.trim().toLowerCase());t.length>0&&(l=t[0]),t.length>1&&(l+=` ${t.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${t.join(", ")}`)}const c=n.toLowerCase();l+=` ${c}`,"sunrise-sunset"===s?l+=" sunrise sunset dawn dusk":"day"===s?l+=" daylight midday day":"night"===s&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${s}`);try{let e="https://api.unsplash.com/photos/random?";const n=new URLSearchParams({client_id:t,count:i.toString(),orientation:"landscape",content_filter:a});l&&n.append("query",l);const s=new URLSearchParams(n);s.delete("client_id"),s.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${s.toString()}`),e+=n.toString();const r=e.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${r}`);const c=await fetch(e);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();this.logger.debug(`API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(t=>{const e=t.urls.raw+"&w=1920&h=1080&fit=crop";o.push(e)}),this.logger.debug(`Fetched ${o.length} images from Unsplash API`)}catch(t){throw this.logger.error("Error fetching from Unsplash API:",t),t}return o}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Et=new class extends Dt{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=kt("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}async checkEntityAsync(t){try{const e=window.document.querySelector("home-assistant").hass;if(!e)return void this.logger.warn("Could not get Home Assistant instance");const i=e.states[t];if(!i)return void this.logger.warn(`Entity ${t} not found`);this.updateCacheFromEntity(i),this.entityId=t,this.logger.debug(`Checked entity ${t}`)}catch(t){this.logger.error("Error checking entity:",t)}}updateCacheFromEntity(t){const e=t.attributes.files;e&&Array.isArray(e)&&e.every(t=>"string"==typeof t)?(this.cachedImages=this.convertUrlsToBackgroundImages(e),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${e.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(t,e,i){const n=t.entity;if(!n)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(n);const s=Date.now();if(this.cachedImages.length>0&&s-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,e,i);try{const t=window.document.querySelector("home-assistant").hass;if(!t)return this.logger.warn("Could not get Home Assistant instance"),[];const s=t.states[n];return s?(this.updateCacheFromEntity(s),this.filterImagesByWeatherAndTime(this.cachedImages,e,i)):(this.logger.warn(`Sensor ${n} not found`),[])}catch(t){return this.logger.error("Error fetching images from sensor:",t),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Pt=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=kt("null-source")}async fetchImagesAsync(t,e,i){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(t,e,i){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Ut={local:At,picsum:Mt,unsplash:Ft,sensor:Et};class Wt{constructor(){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=kt("background-image-manager")}initialize(t={}){const e=t.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${e}`),"none"===e)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var i;if(this.imageSourceId=e||"picsum",this.imageSource=(i=this.imageSourceId,Ut[i]||Pt),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;const n=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...n,...t},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(t,e){if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${t}, time of day: ${e}`);const i=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,t,e);return i?(this.logger.debug(`Got image URL: ${i}`),i):(this.logger.warn("No image URL returned from source"),"")}catch(t){return this.logger.error("Error getting next image URL:",t),""}}getImageSourceId(){return this.imageSourceId}}Ct.getInstance().registerAll([Mt,At,Ft,Et]);const Lt=[{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","mist":"Mist","light_rain":"Light rain"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Rt=Object.fromEntries(Lt.map(t=>[t.code,t.translations]));let zt={};function Vt(){return Lt.map(t=>t.code)}function jt(t,e,i={},n){const s={...i};if(n&&(s.timeZone=n),"hidden"===s.weekday&&(s.weekday=void 0),"hidden"===s.year&&(s.year=void 0),"hidden"===s.month&&(s.month=void 0),"hidden"===s.day&&(s.day=void 0),void 0===s.weekday&&void 0===s.year&&void 0===s.month&&void 0===s.day)return"";const r=function(t){const e=Lt.find(e=>e.code===t);return(null==e?void 0:e.locale)||"en-US"}(e);if("short"===s.month){const e=new Intl.DateTimeFormat(r,{month:"short",timeZone:n}).format(t),i={...s};delete i.month;let o=t.toLocaleDateString(r,i);return"2-digit"===s.day?(o=o.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${e}`),o.includes(e)||(o=`${o} ${e}`)):o=t.toLocaleDateString(r,s),o}return t.toLocaleDateString(r,s)}class Jt{constructor(t,e){this._readyResolve=null,this.host=t,this.logger=kt(e),t.addController(this),this.ready=new Promise(t=>{this._readyResolve=t})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(t=>{this._readyResolve=t}),this.onHostDisconnected()}}class Ht extends Error{}class Zt extends Ht{constructor(t){super(`Invalid DateTime: ${t.toMessage()}`)}}class qt extends Ht{constructor(t){super(`Invalid Interval: ${t.toMessage()}`)}}class Bt extends Ht{constructor(t){super(`Invalid Duration: ${t.toMessage()}`)}}class Yt extends Ht{}class Gt extends Ht{constructor(t){super(`Invalid unit ${t}`)}}class Kt extends Ht{}class Qt extends Ht{constructor(){super("Zone is an abstract class")}}const Xt="numeric",te="short",ee="long",ie={year:Xt,month:Xt,day:Xt},ne={year:Xt,month:te,day:Xt},se={year:Xt,month:te,day:Xt,weekday:te},re={year:Xt,month:ee,day:Xt},oe={year:Xt,month:ee,day:Xt,weekday:ee},ae={hour:Xt,minute:Xt},le={hour:Xt,minute:Xt,second:Xt},ce={hour:Xt,minute:Xt,second:Xt,timeZoneName:te},he={hour:Xt,minute:Xt,second:Xt,timeZoneName:ee},ue={hour:Xt,minute:Xt,hourCycle:"h23"},de={hour:Xt,minute:Xt,second:Xt,hourCycle:"h23"},ge={hour:Xt,minute:Xt,second:Xt,hourCycle:"h23",timeZoneName:te},me={hour:Xt,minute:Xt,second:Xt,hourCycle:"h23",timeZoneName:ee},fe={year:Xt,month:Xt,day:Xt,hour:Xt,minute:Xt},pe={year:Xt,month:Xt,day:Xt,hour:Xt,minute:Xt,second:Xt},ve={year:Xt,month:te,day:Xt,hour:Xt,minute:Xt},ye={year:Xt,month:te,day:Xt,hour:Xt,minute:Xt,second:Xt},we={year:Xt,month:te,day:Xt,weekday:te,hour:Xt,minute:Xt},be={year:Xt,month:ee,day:Xt,hour:Xt,minute:Xt,timeZoneName:te},_e={year:Xt,month:ee,day:Xt,hour:Xt,minute:Xt,second:Xt,timeZoneName:te},ke={year:Xt,month:ee,day:Xt,weekday:ee,hour:Xt,minute:Xt,timeZoneName:ee},Se={year:Xt,month:ee,day:Xt,weekday:ee,hour:Xt,minute:Xt,second:Xt,timeZoneName:ee};class $e{get type(){throw new Qt}get name(){throw new Qt}get ianaName(){return this.name}get isUniversal(){throw new Qt}offsetName(t,e){throw new Qt}formatOffset(t,e){throw new Qt}offset(t){throw new Qt}equals(t){throw new Qt}get isValid(){throw new Qt}}let Ce=null;class Ie extends $e{static get instance(){return null===Ce&&(Ce=new Ie),Ce}get type(){return"system"}get name(){return(new Intl.DateTimeFormat).resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(t,{format:e,locale:i}){return Zi(t,e,i)}formatOffset(t,e){return Gi(this.offset(t),e)}offset(t){return-new Date(t).getTimezoneOffset()}equals(t){return"system"===t.type}get isValid(){return!0}}const xe=new Map,Oe={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},Ne=new Map;class Te extends $e{static create(t){let e=Ne.get(t);return void 0===e&&Ne.set(t,e=new Te(t)),e}static resetCache(){Ne.clear(),xe.clear()}static isValidSpecifier(t){return this.isValidZone(t)}static isValidZone(t){if(!t)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:t}).format(),!0}catch(t){return!1}}constructor(t){super(),this.zoneName=t,this.valid=Te.isValidZone(t)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(t,{format:e,locale:i}){return Zi(t,e,i,this.name)}formatOffset(t,e){return Gi(this.offset(t),e)}offset(t){if(!this.valid)return NaN;const e=new Date(t);if(isNaN(e))return NaN;const i=function(t){let e=xe.get(t);return void 0===e&&(e=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"}),xe.set(t,e)),e}(this.name);let[n,s,r,o,a,l,c]=i.formatToParts?function(t,e){const i=t.formatToParts(e),n=[];for(let t=0;t<i.length;t++){const{type:e,value:s}=i[t],r=Oe[e];"era"===e?n[r]=s:Ci(r)||(n[r]=parseInt(s,10))}return n}(i,e):function(t,e){const i=t.format(e).replace(/\u200E/g,""),n=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(i),[,s,r,o,a,l,c,h]=n;return[o,s,r,a,l,c,h]}(i,e);"BC"===o&&(n=1-Math.abs(n));let h=+e;const u=h%1e3;return h-=u>=0?u:1e3+u,(Vi({year:n,month:s,day:r,hour:24===a?0:a,minute:l,second:c,millisecond:0})-h)/6e4}equals(t){return"iana"===t.type&&t.name===this.name}get isValid(){return this.valid}}let De={};const Ae=new Map;function Me(t,e={}){const i=JSON.stringify([t,e]);let n=Ae.get(i);return void 0===n&&(n=new Intl.DateTimeFormat(t,e),Ae.set(i,n)),n}const Fe=new Map,Ee=new Map;let Pe=null;const Ue=new Map;function We(t){let e=Ue.get(t);return void 0===e&&(e=new Intl.DateTimeFormat(t).resolvedOptions(),Ue.set(t,e)),e}const Le=new Map;function Re(t,e,i,n){const s=t.listingMode();return"error"===s?null:"en"===s?i(e):n(e)}class ze{constructor(t,e,i){this.padTo=i.padTo||0,this.floor=i.floor||!1;const{padTo:n,floor:s,...r}=i;if(!e||Object.keys(r).length>0){const e={useGrouping:!1,...i};i.padTo>0&&(e.minimumIntegerDigits=i.padTo),this.inf=function(t,e={}){const i=JSON.stringify([t,e]);let n=Fe.get(i);return void 0===n&&(n=new Intl.NumberFormat(t,e),Fe.set(i,n)),n}(t,e)}}format(t){if(this.inf){const e=this.floor?Math.floor(t):t;return this.inf.format(e)}return Fi(this.floor?Math.floor(t):Wi(t,3),this.padTo)}}class Ve{constructor(t,e,i){let n;if(this.opts=i,this.originalZone=void 0,this.opts.timeZone)this.dt=t;else if("fixed"===t.zone.type){const e=t.offset/60*-1,i=e>=0?`Etc/GMT+${e}`:`Etc/GMT${e}`;0!==t.offset&&Te.create(i).valid?(n=i,this.dt=t):(n="UTC",this.dt=0===t.offset?t:t.setZone("UTC").plus({minutes:t.offset}),this.originalZone=t.zone)}else"system"===t.zone.type?this.dt=t:"iana"===t.zone.type?(this.dt=t,n=t.zone.name):(n="UTC",this.dt=t.setZone("UTC").plus({minutes:t.offset}),this.originalZone=t.zone);const s={...this.opts};s.timeZone=s.timeZone||n,this.dtf=Me(e,s)}format(){return this.originalZone?this.formatToParts().map(({value:t})=>t).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){const t=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?t.map(t=>{if("timeZoneName"===t.type){const e=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...t,value:e}}return t}):t}resolvedOptions(){return this.dtf.resolvedOptions()}}class je{constructor(t,e,i){this.opts={style:"long",...i},!e&&Oi()&&(this.rtf=function(t,e={}){const{base:i,...n}=e,s=JSON.stringify([t,n]);let r=Ee.get(s);return void 0===r&&(r=new Intl.RelativeTimeFormat(t,e),Ee.set(s,r)),r}(t,i))}format(t,e){return this.rtf?this.rtf.format(t,e):function(t,e,i="always",n=!1){const s={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},r=-1===["hours","minutes","seconds"].indexOf(t);if("auto"===i&&r){const i="days"===t;switch(e){case 1:return i?"tomorrow":`next ${s[t][0]}`;case-1:return i?"yesterday":`last ${s[t][0]}`;case 0:return i?"today":`this ${s[t][0]}`}}const o=Object.is(e,-0)||e<0,a=Math.abs(e),l=1===a,c=s[t],h=n?l?c[1]:c[2]||c[1]:l?s[t][0]:t;return o?`${a} ${h} ago`:`in ${a} ${h}`}(e,t,this.opts.numeric,"long"!==this.opts.style)}formatToParts(t,e){return this.rtf?this.rtf.formatToParts(t,e):[]}}const Je={firstDay:1,minimalDays:4,weekend:[6,7]};class He{static fromOpts(t){return He.create(t.locale,t.numberingSystem,t.outputCalendar,t.weekSettings,t.defaultToEN)}static create(t,e,i,n,s=!1){const r=t||ci.defaultLocale,o=r||(s?"en-US":Pe||(Pe=(new Intl.DateTimeFormat).resolvedOptions().locale,Pe)),a=e||ci.defaultNumberingSystem,l=i||ci.defaultOutputCalendar,c=Ai(n)||ci.defaultWeekSettings;return new He(o,a,l,c,r)}static resetCache(){Pe=null,Ae.clear(),Fe.clear(),Ee.clear(),Ue.clear(),Le.clear()}static fromObject({locale:t,numberingSystem:e,outputCalendar:i,weekSettings:n}={}){return He.create(t,e,i,n)}constructor(t,e,i,n,s){const[r,o,a]=function(t){const e=t.indexOf("-x-");-1!==e&&(t=t.substring(0,e));const i=t.indexOf("-u-");if(-1===i)return[t];{let e,n;try{e=Me(t).resolvedOptions(),n=t}catch(s){const r=t.substring(0,i);e=Me(r).resolvedOptions(),n=r}const{numberingSystem:s,calendar:r}=e;return[n,s,r]}}(t);this.locale=r,this.numberingSystem=e||o||null,this.outputCalendar=i||a||null,this.weekSettings=n,this.intl=function(t,e,i){return i||e?(t.includes("-u-")||(t+="-u"),i&&(t+=`-ca-${i}`),e&&(t+=`-nu-${e}`),t):t}(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=s,this.fastNumbersCached=null}get fastNumbers(){var t;return null==this.fastNumbersCached&&(this.fastNumbersCached=(!(t=this).numberingSystem||"latn"===t.numberingSystem)&&("latn"===t.numberingSystem||!t.locale||t.locale.startsWith("en")||"latn"===We(t.locale).numberingSystem)),this.fastNumbersCached}listingMode(){const t=this.isEnglish(),e=!(null!==this.numberingSystem&&"latn"!==this.numberingSystem||null!==this.outputCalendar&&"gregory"!==this.outputCalendar);return t&&e?"en":"intl"}clone(t){return t&&0!==Object.getOwnPropertyNames(t).length?He.create(t.locale||this.specifiedLocale,t.numberingSystem||this.numberingSystem,t.outputCalendar||this.outputCalendar,Ai(t.weekSettings)||this.weekSettings,t.defaultToEN||!1):this}redefaultToEN(t={}){return this.clone({...t,defaultToEN:!0})}redefaultToSystem(t={}){return this.clone({...t,defaultToEN:!1})}months(t,e=!1){return Re(this,t,en,()=>{const i="ja"===this.intl||this.intl.startsWith("ja-"),n=(e&=!i)?{month:t,day:"numeric"}:{month:t},s=e?"format":"standalone";if(!this.monthsCache[s][t]){const e=i?t=>this.dtFormatter(t,n).format():t=>this.extract(t,n,"month");this.monthsCache[s][t]=function(t){const e=[];for(let i=1;i<=12;i++){const n=sr.utc(2009,i,1);e.push(t(n))}return e}(e)}return this.monthsCache[s][t]})}weekdays(t,e=!1){return Re(this,t,on,()=>{const i=e?{weekday:t,year:"numeric",month:"long",day:"numeric"}:{weekday:t},n=e?"format":"standalone";return this.weekdaysCache[n][t]||(this.weekdaysCache[n][t]=function(t){const e=[];for(let i=1;i<=7;i++){const n=sr.utc(2016,11,13+i);e.push(t(n))}return e}(t=>this.extract(t,i,"weekday"))),this.weekdaysCache[n][t]})}meridiems(){return Re(this,void 0,()=>an,()=>{if(!this.meridiemCache){const t={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[sr.utc(2016,11,13,9),sr.utc(2016,11,13,19)].map(e=>this.extract(e,t,"dayperiod"))}return this.meridiemCache})}eras(t){return Re(this,t,un,()=>{const e={era:t};return this.eraCache[t]||(this.eraCache[t]=[sr.utc(-40,1,1),sr.utc(2017,1,1)].map(t=>this.extract(t,e,"era"))),this.eraCache[t]})}extract(t,e,i){const n=this.dtFormatter(t,e).formatToParts().find(t=>t.type.toLowerCase()===i);return n?n.value:null}numberFormatter(t={}){return new ze(this.intl,t.forceSimple||this.fastNumbers,t)}dtFormatter(t,e={}){return new Ve(t,this.intl,e)}relFormatter(t={}){return new je(this.intl,this.isEnglish(),t)}listFormatter(t={}){return function(t,e={}){const i=JSON.stringify([t,e]);let n=De[i];return n||(n=new Intl.ListFormat(t,e),De[i]=n),n}(this.intl,t)}isEnglish(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||We(this.intl).locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:Ni()?function(t){let e=Le.get(t);if(!e){const i=new Intl.Locale(t);e="getWeekInfo"in i?i.getWeekInfo():i.weekInfo,"minimalDays"in e||(e={...Je,...e}),Le.set(t,e)}return e}(this.locale):Je}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(t){return this.locale===t.locale&&this.numberingSystem===t.numberingSystem&&this.outputCalendar===t.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let Ze=null;class qe extends $e{static get utcInstance(){return null===Ze&&(Ze=new qe(0)),Ze}static instance(t){return 0===t?qe.utcInstance:new qe(t)}static parseSpecifier(t){if(t){const e=t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(e)return new qe(qi(e[1],e[2]))}return null}constructor(t){super(),this.fixed=t}get type(){return"fixed"}get name(){return 0===this.fixed?"UTC":`UTC${Gi(this.fixed,"narrow")}`}get ianaName(){return 0===this.fixed?"Etc/UTC":`Etc/GMT${Gi(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(t,e){return Gi(this.fixed,e)}get isUniversal(){return!0}offset(){return this.fixed}equals(t){return"fixed"===t.type&&t.fixed===this.fixed}get isValid(){return!0}}class Be extends $e{constructor(t){super(),this.zoneName=t}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function Ye(t,e){if(Ci(t)||null===t)return e;if(t instanceof $e)return t;if(function(t){return"string"==typeof t}(t)){const i=t.toLowerCase();return"default"===i?e:"local"===i||"system"===i?Ie.instance:"utc"===i||"gmt"===i?qe.utcInstance:qe.parseSpecifier(i)||Te.create(t)}return Ii(t)?qe.instance(t):"object"==typeof t&&"offset"in t&&"function"==typeof t.offset?t:new Be(t)}const Ge={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},Ke={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},Qe=Ge.hanidec.replace(/[\[|\]]/g,"").split(""),Xe=new Map;function ti({numberingSystem:t},e=""){const i=t||"latn";let n=Xe.get(i);void 0===n&&(n=new Map,Xe.set(i,n));let s=n.get(e);return void 0===s&&(s=new RegExp(`${Ge[i]}${e}`),n.set(e,s)),s}let ei,ii=()=>Date.now(),ni="system",si=null,ri=null,oi=null,ai=60,li=null;class ci{static get now(){return ii}static set now(t){ii=t}static set defaultZone(t){ni=t}static get defaultZone(){return Ye(ni,Ie.instance)}static get defaultLocale(){return si}static set defaultLocale(t){si=t}static get defaultNumberingSystem(){return ri}static set defaultNumberingSystem(t){ri=t}static get defaultOutputCalendar(){return oi}static set defaultOutputCalendar(t){oi=t}static get defaultWeekSettings(){return li}static set defaultWeekSettings(t){li=Ai(t)}static get twoDigitCutoffYear(){return ai}static set twoDigitCutoffYear(t){ai=t%100}static get throwOnInvalid(){return ei}static set throwOnInvalid(t){ei=t}static resetCaches(){He.resetCache(),Te.resetCache(),sr.resetCache(),Xe.clear()}}class hi{constructor(t,e){this.reason=t,this.explanation=e}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}const ui=[0,31,59,90,120,151,181,212,243,273,304,334],di=[0,31,60,91,121,152,182,213,244,274,305,335];function gi(t,e){return new hi("unit out of range",`you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`)}function mi(t,e,i){const n=new Date(Date.UTC(t,e-1,i));t<100&&t>=0&&n.setUTCFullYear(n.getUTCFullYear()-1900);const s=n.getUTCDay();return 0===s?7:s}function fi(t,e,i){return i+(Li(t)?di:ui)[e-1]}function pi(t,e){const i=Li(t)?di:ui,n=i.findIndex(t=>t<e);return{month:n+1,day:e-i[n]}}function vi(t,e){return(t-e+7)%7+1}function yi(t,e=4,i=1){const{year:n,month:s,day:r}=t,o=fi(n,s,r),a=vi(mi(n,s,r),i);let l,c=Math.floor((o-a+14-e)/7);return c<1?(l=n-1,c=Ji(l,e,i)):c>Ji(n,e,i)?(l=n+1,c=1):l=n,{weekYear:l,weekNumber:c,weekday:a,...Ki(t)}}function wi(t,e=4,i=1){const{weekYear:n,weekNumber:s,weekday:r}=t,o=vi(mi(n,1,e),i),a=Ri(n);let l,c=7*s+r-o-7+e;c<1?(l=n-1,c+=Ri(l)):c>a?(l=n+1,c-=Ri(n)):l=n;const{month:h,day:u}=pi(l,c);return{year:l,month:h,day:u,...Ki(t)}}function bi(t){const{year:e,month:i,day:n}=t;return{year:e,ordinal:fi(e,i,n),...Ki(t)}}function _i(t){const{year:e,ordinal:i}=t,{month:n,day:s}=pi(e,i);return{year:e,month:n,day:s,...Ki(t)}}function ki(t,e){if(!Ci(t.localWeekday)||!Ci(t.localWeekNumber)||!Ci(t.localWeekYear)){if(!Ci(t.weekday)||!Ci(t.weekNumber)||!Ci(t.weekYear))throw new Yt("Cannot mix locale-based week fields with ISO-based week fields");return Ci(t.localWeekday)||(t.weekday=t.localWeekday),Ci(t.localWeekNumber)||(t.weekNumber=t.localWeekNumber),Ci(t.localWeekYear)||(t.weekYear=t.localWeekYear),delete t.localWeekday,delete t.localWeekNumber,delete t.localWeekYear,{minDaysInFirstWeek:e.getMinDaysInFirstWeek(),startOfWeek:e.getStartOfWeek()}}return{minDaysInFirstWeek:4,startOfWeek:1}}function Si(t){const e=xi(t.year),i=Mi(t.month,1,12),n=Mi(t.day,1,zi(t.year,t.month));return e?i?!n&&gi("day",t.day):gi("month",t.month):gi("year",t.year)}function $i(t){const{hour:e,minute:i,second:n,millisecond:s}=t,r=Mi(e,0,23)||24===e&&0===i&&0===n&&0===s,o=Mi(i,0,59),a=Mi(n,0,59),l=Mi(s,0,999);return r?o?a?!l&&gi("millisecond",s):gi("second",n):gi("minute",i):gi("hour",e)}function Ci(t){return void 0===t}function Ii(t){return"number"==typeof t}function xi(t){return"number"==typeof t&&t%1==0}function Oi(){try{return"undefined"!=typeof Intl&&!!Intl.RelativeTimeFormat}catch(t){return!1}}function Ni(){try{return"undefined"!=typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(t){return!1}}function Ti(t,e,i){if(0!==t.length)return t.reduce((t,n)=>{const s=[e(n),n];return t&&i(t[0],s[0])===t[0]?t:s},null)[1]}function Di(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Ai(t){if(null==t)return null;if("object"!=typeof t)throw new Kt("Week settings must be an object");if(!Mi(t.firstDay,1,7)||!Mi(t.minimalDays,1,7)||!Array.isArray(t.weekend)||t.weekend.some(t=>!Mi(t,1,7)))throw new Kt("Invalid week settings");return{firstDay:t.firstDay,minimalDays:t.minimalDays,weekend:Array.from(t.weekend)}}function Mi(t,e,i){return xi(t)&&t>=e&&t<=i}function Fi(t,e=2){let i;return i=t<0?"-"+(""+-t).padStart(e,"0"):(""+t).padStart(e,"0"),i}function Ei(t){return Ci(t)||null===t||""===t?void 0:parseInt(t,10)}function Pi(t){return Ci(t)||null===t||""===t?void 0:parseFloat(t)}function Ui(t){if(!Ci(t)&&null!==t&&""!==t){const e=1e3*parseFloat("0."+t);return Math.floor(e)}}function Wi(t,e,i="round"){const n=10**e;switch(i){case"expand":return t>0?Math.ceil(t*n)/n:Math.floor(t*n)/n;case"trunc":return Math.trunc(t*n)/n;case"round":return Math.round(t*n)/n;case"floor":return Math.floor(t*n)/n;case"ceil":return Math.ceil(t*n)/n;default:throw new RangeError(`Value rounding ${i} is out of range`)}}function Li(t){return t%4==0&&(t%100!=0||t%400==0)}function Ri(t){return Li(t)?366:365}function zi(t,e){const i=function(t){return t-12*Math.floor(t/12)}(e-1)+1;return 2===i?Li(t+(e-i)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][i-1]}function Vi(t){let e=Date.UTC(t.year,t.month-1,t.day,t.hour,t.minute,t.second,t.millisecond);return t.year<100&&t.year>=0&&(e=new Date(e),e.setUTCFullYear(t.year,t.month-1,t.day)),+e}function ji(t,e,i){return-vi(mi(t,1,e),i)+e-1}function Ji(t,e=4,i=1){const n=ji(t,e,i),s=ji(t+1,e,i);return(Ri(t)-n+s)/7}function Hi(t){return t>99?t:t>ci.twoDigitCutoffYear?1900+t:2e3+t}function Zi(t,e,i,n=null){const s=new Date(t),r={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};n&&(r.timeZone=n);const o={timeZoneName:e,...r},a=new Intl.DateTimeFormat(i,o).formatToParts(s).find(t=>"timezonename"===t.type.toLowerCase());return a?a.value:null}function qi(t,e){let i=parseInt(t,10);Number.isNaN(i)&&(i=0);const n=parseInt(e,10)||0;return 60*i+(i<0||Object.is(i,-0)?-n:n)}function Bi(t){const e=Number(t);if("boolean"==typeof t||""===t||!Number.isFinite(e))throw new Kt(`Invalid unit value ${t}`);return e}function Yi(t,e){const i={};for(const n in t)if(Di(t,n)){const s=t[n];if(null==s)continue;i[e(n)]=Bi(s)}return i}function Gi(t,e){const i=Math.trunc(Math.abs(t/60)),n=Math.trunc(Math.abs(t%60)),s=t>=0?"+":"-";switch(e){case"short":return`${s}${Fi(i,2)}:${Fi(n,2)}`;case"narrow":return`${s}${i}${n>0?`:${n}`:""}`;case"techie":return`${s}${Fi(i,2)}${Fi(n,2)}`;default:throw new RangeError(`Value format ${e} is out of range for property format`)}}function Ki(t){return function(t){return["hour","minute","second","millisecond"].reduce((e,i)=>(e[i]=t[i],e),{})}(t)}const Qi=["January","February","March","April","May","June","July","August","September","October","November","December"],Xi=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],tn=["J","F","M","A","M","J","J","A","S","O","N","D"];function en(t){switch(t){case"narrow":return[...tn];case"short":return[...Xi];case"long":return[...Qi];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}const nn=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],sn=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],rn=["M","T","W","T","F","S","S"];function on(t){switch(t){case"narrow":return[...rn];case"short":return[...sn];case"long":return[...nn];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}const an=["AM","PM"],ln=["Before Christ","Anno Domini"],cn=["BC","AD"],hn=["B","A"];function un(t){switch(t){case"narrow":return[...hn];case"short":return[...cn];case"long":return[...ln];default:return null}}function dn(t,e){let i="";for(const n of t)n.literal?i+=n.val:i+=e(n.val);return i}const gn={D:ie,DD:ne,DDD:re,DDDD:oe,t:ae,tt:le,ttt:ce,tttt:he,T:ue,TT:de,TTT:ge,TTTT:me,f:fe,ff:ve,fff:be,ffff:ke,F:pe,FF:ye,FFF:_e,FFFF:Se};class mn{static create(t,e={}){return new mn(t,e)}static parseFormat(t){let e=null,i="",n=!1;const s=[];for(let r=0;r<t.length;r++){const o=t.charAt(r);"'"===o?((i.length>0||n)&&s.push({literal:n||/^\s+$/.test(i),val:""===i?"'":i}),e=null,i="",n=!n):n||o===e?i+=o:(i.length>0&&s.push({literal:/^\s+$/.test(i),val:i}),i=o,e=o)}return i.length>0&&s.push({literal:n||/^\s+$/.test(i),val:i}),s}static macroTokenToFormatOpts(t){return gn[t]}constructor(t,e){this.opts=e,this.loc=t,this.systemLoc=null}formatWithSystemDefault(t,e){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(t,{...this.opts,...e}).format()}dtFormatter(t,e={}){return this.loc.dtFormatter(t,{...this.opts,...e})}formatDateTime(t,e){return this.dtFormatter(t,e).format()}formatDateTimeParts(t,e){return this.dtFormatter(t,e).formatToParts()}formatInterval(t,e){return this.dtFormatter(t.start,e).dtf.formatRange(t.start.toJSDate(),t.end.toJSDate())}resolvedOptions(t,e){return this.dtFormatter(t,e).resolvedOptions()}num(t,e=0,i=void 0){if(this.opts.forceSimple)return Fi(t,e);const n={...this.opts};return e>0&&(n.padTo=e),i&&(n.signDisplay=i),this.loc.numberFormatter(n).format(t)}formatDateTimeFromString(t,e){const i="en"===this.loc.listingMode(),n=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,s=(e,i)=>this.loc.extract(t,e,i),r=e=>t.isOffsetFixed&&0===t.offset&&e.allowZ?"Z":t.isValid?t.zone.formatOffset(t.ts,e.format):"",o=(e,n)=>i?function(t,e){return en(e)[t.month-1]}(t,e):s(n?{month:e}:{month:e,day:"numeric"},"month"),a=(e,n)=>i?function(t,e){return on(e)[t.weekday-1]}(t,e):s(n?{weekday:e}:{weekday:e,month:"long",day:"numeric"},"weekday"),l=e=>{const i=mn.macroTokenToFormatOpts(e);return i?this.formatWithSystemDefault(t,i):e},c=e=>i?function(t,e){return un(e)[t.year<0?0:1]}(t,e):s({era:e},"era");return dn(mn.parseFormat(e),e=>{switch(e){case"S":return this.num(t.millisecond);case"u":case"SSS":return this.num(t.millisecond,3);case"s":return this.num(t.second);case"ss":return this.num(t.second,2);case"uu":return this.num(Math.floor(t.millisecond/10),2);case"uuu":return this.num(Math.floor(t.millisecond/100));case"m":return this.num(t.minute);case"mm":return this.num(t.minute,2);case"h":return this.num(t.hour%12==0?12:t.hour%12);case"hh":return this.num(t.hour%12==0?12:t.hour%12,2);case"H":return this.num(t.hour);case"HH":return this.num(t.hour,2);case"Z":return r({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return r({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return r({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return t.zone.offsetName(t.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return t.zone.offsetName(t.ts,{format:"long",locale:this.loc.locale});case"z":return t.zoneName;case"a":return i?function(t){return an[t.hour<12?0:1]}(t):s({hour:"numeric",hourCycle:"h12"},"dayperiod");case"d":return n?s({day:"numeric"},"day"):this.num(t.day);case"dd":return n?s({day:"2-digit"},"day"):this.num(t.day,2);case"c":case"E":return this.num(t.weekday);case"ccc":return a("short",!0);case"cccc":return a("long",!0);case"ccccc":return a("narrow",!0);case"EEE":return a("short",!1);case"EEEE":return a("long",!1);case"EEEEE":return a("narrow",!1);case"L":return n?s({month:"numeric",day:"numeric"},"month"):this.num(t.month);case"LL":return n?s({month:"2-digit",day:"numeric"},"month"):this.num(t.month,2);case"LLL":return o("short",!0);case"LLLL":return o("long",!0);case"LLLLL":return o("narrow",!0);case"M":return n?s({month:"numeric"},"month"):this.num(t.month);case"MM":return n?s({month:"2-digit"},"month"):this.num(t.month,2);case"MMM":return o("short",!1);case"MMMM":return o("long",!1);case"MMMMM":return o("narrow",!1);case"y":return n?s({year:"numeric"},"year"):this.num(t.year);case"yy":return n?s({year:"2-digit"},"year"):this.num(t.year.toString().slice(-2),2);case"yyyy":return n?s({year:"numeric"},"year"):this.num(t.year,4);case"yyyyyy":return n?s({year:"numeric"},"year"):this.num(t.year,6);case"G":return c("short");case"GG":return c("long");case"GGGGG":return c("narrow");case"kk":return this.num(t.weekYear.toString().slice(-2),2);case"kkkk":return this.num(t.weekYear,4);case"W":return this.num(t.weekNumber);case"WW":return this.num(t.weekNumber,2);case"n":return this.num(t.localWeekNumber);case"nn":return this.num(t.localWeekNumber,2);case"ii":return this.num(t.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(t.localWeekYear,4);case"o":return this.num(t.ordinal);case"ooo":return this.num(t.ordinal,3);case"q":return this.num(t.quarter);case"qq":return this.num(t.quarter,2);case"X":return this.num(Math.floor(t.ts/1e3));case"x":return this.num(t.ts);default:return l(e)}})}formatDurationFromString(t,e){const i="negativeLargestOnly"===this.opts.signMode?-1:1,n=t=>{switch(t[0]){case"S":return"milliseconds";case"s":return"seconds";case"m":return"minutes";case"h":return"hours";case"d":return"days";case"w":return"weeks";case"M":return"months";case"y":return"years";default:return null}},s=mn.parseFormat(e),r=s.reduce((t,{literal:e,val:i})=>e?t:t.concat(i),[]),o=t.shiftTo(...r.map(n).filter(t=>t));return dn(s,((t,e)=>s=>{const r=n(s);if(r){const n=e.isNegativeDuration&&r!==e.largestUnit?i:1;let o;return o="negativeLargestOnly"===this.opts.signMode&&r!==e.largestUnit?"never":"all"===this.opts.signMode?"always":"auto",this.num(t.get(r)*n,s.length,o)}return s})(o,{isNegativeDuration:o<0,largestUnit:Object.keys(o.values)[0]}))}}const fn=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function pn(...t){const e=t.reduce((t,e)=>t+e.source,"");return RegExp(`^${e}$`)}function vn(...t){return e=>t.reduce(([t,i,n],s)=>{const[r,o,a]=s(e,n);return[{...t,...r},o||i,a]},[{},null,1]).slice(0,2)}function yn(t,...e){if(null==t)return[null,null];for(const[i,n]of e){const e=i.exec(t);if(e)return n(e)}return[null,null]}function wn(...t){return(e,i)=>{const n={};let s;for(s=0;s<t.length;s++)n[t[s]]=Ei(e[i+s]);return[n,null,i+s]}}const bn=/(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/,_n=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,kn=RegExp(`${_n.source}(?:${bn.source}?(?:\\[(${fn.source})\\])?)?`),Sn=RegExp(`(?:[Tt]${kn.source})?`),$n=wn("weekYear","weekNumber","weekDay"),Cn=wn("year","ordinal"),In=RegExp(`${_n.source} ?(?:${bn.source}|(${fn.source}))?`),xn=RegExp(`(?: ${In.source})?`);function On(t,e,i){const n=t[e];return Ci(n)?i:Ei(n)}function Nn(t,e){return[{hours:On(t,e,0),minutes:On(t,e+1,0),seconds:On(t,e+2,0),milliseconds:Ui(t[e+3])},null,e+4]}function Tn(t,e){const i=!t[e]&&!t[e+1],n=qi(t[e+1],t[e+2]);return[{},i?null:qe.instance(n),e+3]}function Dn(t,e){return[{},t[e]?Te.create(t[e]):null,e+1]}const An=RegExp(`^T?${_n.source}$`),Mn=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function Fn(t){const[e,i,n,s,r,o,a,l,c]=t,h="-"===e[0],u=l&&"-"===l[0],d=(t,e=!1)=>void 0!==t&&(e||t&&h)?-t:t;return[{years:d(Pi(i)),months:d(Pi(n)),weeks:d(Pi(s)),days:d(Pi(r)),hours:d(Pi(o)),minutes:d(Pi(a)),seconds:d(Pi(l),"-0"===l),milliseconds:d(Ui(c),u)}]}const En={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Pn(t,e,i,n,s,r,o){const a={year:2===e.length?Hi(Ei(e)):Ei(e),month:Xi.indexOf(i)+1,day:Ei(n),hour:Ei(s),minute:Ei(r)};return o&&(a.second=Ei(o)),t&&(a.weekday=t.length>3?nn.indexOf(t)+1:sn.indexOf(t)+1),a}const Un=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function Wn(t){const[,e,i,n,s,r,o,a,l,c,h,u]=t,d=Pn(e,s,n,i,r,o,a);let g;return g=l?En[l]:c?0:qi(h,u),[d,new qe(g)]}const Ln=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,Rn=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,zn=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function Vn(t){const[,e,i,n,s,r,o,a]=t;return[Pn(e,s,n,i,r,o,a),qe.utcInstance]}function jn(t){const[,e,i,n,s,r,o,a]=t;return[Pn(e,a,i,n,s,r,o),qe.utcInstance]}const Jn=pn(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,Sn),Hn=pn(/(\d{4})-?W(\d\d)(?:-?(\d))?/,Sn),Zn=pn(/(\d{4})-?(\d{3})/,Sn),qn=pn(kn),Bn=vn(function(t,e){return[{year:On(t,e),month:On(t,e+1,1),day:On(t,e+2,1)},null,e+3]},Nn,Tn,Dn),Yn=vn($n,Nn,Tn,Dn),Gn=vn(Cn,Nn,Tn,Dn),Kn=vn(Nn,Tn,Dn),Qn=vn(Nn),Xn=pn(/(\d{4})-(\d\d)-(\d\d)/,xn),ts=pn(In),es=vn(Nn,Tn,Dn),is="Invalid Duration",ns={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},ss={years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6},...ns},rs={years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:525949.2*60,milliseconds:525949.2*60*1e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:525949.2*60/4,milliseconds:7889237999.999999},months:{weeks:4.3481250000000005,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3},...ns},os=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],as=os.slice(0).reverse();function ls(t,e,i=!1){const n={values:i?e.values:{...t.values,...e.values||{}},loc:t.loc.clone(e.loc),conversionAccuracy:e.conversionAccuracy||t.conversionAccuracy,matrix:e.matrix||t.matrix};return new ds(n)}function cs(t,e){let i=e.milliseconds??0;for(const n of as.slice(1))e[n]&&(i+=e[n]*t[n].milliseconds);return i}function hs(t,e){const i=cs(t,e)<0?-1:1;os.reduceRight((n,s)=>{if(Ci(e[s]))return n;if(n){const r=e[n]*i,o=t[s][n],a=Math.floor(r/o);e[s]+=a*i,e[n]-=a*o*i}return s},null),os.reduce((i,n)=>{if(Ci(e[n]))return i;if(i){const s=e[i]%1;e[i]-=s,e[n]+=s*t[i][n]}return n},null)}function us(t){const e={};for(const[i,n]of Object.entries(t))0!==n&&(e[i]=n);return e}class ds{constructor(t){const e="longterm"===t.conversionAccuracy||!1;let i=e?rs:ss;t.matrix&&(i=t.matrix),this.values=t.values,this.loc=t.loc||He.create(),this.conversionAccuracy=e?"longterm":"casual",this.invalid=t.invalid||null,this.matrix=i,this.isLuxonDuration=!0}static fromMillis(t,e){return ds.fromObject({milliseconds:t},e)}static fromObject(t,e={}){if(null==t||"object"!=typeof t)throw new Kt("Duration.fromObject: argument expected to be an object, got "+(null===t?"null":typeof t));return new ds({values:Yi(t,ds.normalizeUnit),loc:He.fromObject(e),conversionAccuracy:e.conversionAccuracy,matrix:e.matrix})}static fromDurationLike(t){if(Ii(t))return ds.fromMillis(t);if(ds.isDuration(t))return t;if("object"==typeof t)return ds.fromObject(t);throw new Kt(`Unknown duration argument ${t} of type ${typeof t}`)}static fromISO(t,e){const[i]=function(t){return yn(t,[Mn,Fn])}(t);return i?ds.fromObject(i,e):ds.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static fromISOTime(t,e){const[i]=function(t){return yn(t,[An,Qn])}(t);return i?ds.fromObject(i,e):ds.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static invalid(t,e=null){if(!t)throw new Kt("need to specify a reason the Duration is invalid");const i=t instanceof hi?t:new hi(t,e);if(ci.throwOnInvalid)throw new Bt(i);return new ds({invalid:i})}static normalizeUnit(t){const e={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[t?t.toLowerCase():t];if(!e)throw new Gt(t);return e}static isDuration(t){return t&&t.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(t,e={}){const i={...e,floor:!1!==e.round&&!1!==e.floor};return this.isValid?mn.create(this.loc,i).formatDurationFromString(this,t):is}toHuman(t={}){if(!this.isValid)return is;const e=!1!==t.showZeros,i=os.map(i=>{const n=this.values[i];return Ci(n)||0===n&&!e?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...t,unit:i.slice(0,-1)}).format(n)}).filter(t=>t);return this.loc.listFormatter({type:"conjunction",style:t.listStyle||"narrow",...t}).format(i)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let t="P";return 0!==this.years&&(t+=this.years+"Y"),0===this.months&&0===this.quarters||(t+=this.months+3*this.quarters+"M"),0!==this.weeks&&(t+=this.weeks+"W"),0!==this.days&&(t+=this.days+"D"),0===this.hours&&0===this.minutes&&0===this.seconds&&0===this.milliseconds||(t+="T"),0!==this.hours&&(t+=this.hours+"H"),0!==this.minutes&&(t+=this.minutes+"M"),0===this.seconds&&0===this.milliseconds||(t+=Wi(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===t&&(t+="T0S"),t}toISOTime(t={}){if(!this.isValid)return null;const e=this.toMillis();return e<0||e>=864e5?null:(t={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...t,includeOffset:!1},sr.fromMillis(e,{zone:"UTC"}).toISOTime(t))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?cs(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(t){if(!this.isValid)return this;const e=ds.fromDurationLike(t),i={};for(const t of os)(Di(e.values,t)||Di(this.values,t))&&(i[t]=e.get(t)+this.get(t));return ls(this,{values:i},!0)}minus(t){if(!this.isValid)return this;const e=ds.fromDurationLike(t);return this.plus(e.negate())}mapUnits(t){if(!this.isValid)return this;const e={};for(const i of Object.keys(this.values))e[i]=Bi(t(this.values[i],i));return ls(this,{values:e},!0)}get(t){return this[ds.normalizeUnit(t)]}set(t){return this.isValid?ls(this,{values:{...this.values,...Yi(t,ds.normalizeUnit)}}):this}reconfigure({locale:t,numberingSystem:e,conversionAccuracy:i,matrix:n}={}){return ls(this,{loc:this.loc.clone({locale:t,numberingSystem:e}),matrix:n,conversionAccuracy:i})}as(t){return this.isValid?this.shiftTo(t).get(t):NaN}normalize(){if(!this.isValid)return this;const t=this.toObject();return hs(this.matrix,t),ls(this,{values:t},!0)}rescale(){return this.isValid?ls(this,{values:us(this.normalize().shiftToAll().toObject())},!0):this}shiftTo(...t){if(!this.isValid)return this;if(0===t.length)return this;t=t.map(t=>ds.normalizeUnit(t));const e={},i={},n=this.toObject();let s;for(const r of os)if(t.indexOf(r)>=0){s=r;let t=0;for(const e in i)t+=this.matrix[e][r]*i[e],i[e]=0;Ii(n[r])&&(t+=n[r]);const o=Math.trunc(t);e[r]=o,i[r]=(1e3*t-1e3*o)/1e3}else Ii(n[r])&&(i[r]=n[r]);for(const t in i)0!==i[t]&&(e[s]+=t===s?i[t]:i[t]/this.matrix[s][t]);return hs(this.matrix,e),ls(this,{values:e},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;const t={};for(const e of Object.keys(this.values))t[e]=0===this.values[e]?0:-this.values[e];return ls(this,{values:t},!0)}removeZeros(){return this.isValid?ls(this,{values:us(this.values)},!0):this}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(t){if(!this.isValid||!t.isValid)return!1;if(!this.loc.equals(t.loc))return!1;function e(t,e){return void 0===t||0===t?void 0===e||0===e:t===e}for(const i of os)if(!e(this.values[i],t.values[i]))return!1;return!0}}const gs="Invalid Interval";class ms{constructor(t){this.s=t.start,this.e=t.end,this.invalid=t.invalid||null,this.isLuxonInterval=!0}static invalid(t,e=null){if(!t)throw new Kt("need to specify a reason the Interval is invalid");const i=t instanceof hi?t:new hi(t,e);if(ci.throwOnInvalid)throw new qt(i);return new ms({invalid:i})}static fromDateTimes(t,e){const i=rr(t),n=rr(e),s=function(t,e){return t&&t.isValid?e&&e.isValid?e<t?ms.invalid("end before start",`The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`):null:ms.invalid("missing or invalid end"):ms.invalid("missing or invalid start")}(i,n);return null==s?new ms({start:i,end:n}):s}static after(t,e){const i=ds.fromDurationLike(e),n=rr(t);return ms.fromDateTimes(n,n.plus(i))}static before(t,e){const i=ds.fromDurationLike(e),n=rr(t);return ms.fromDateTimes(n.minus(i),n)}static fromISO(t,e){const[i,n]=(t||"").split("/",2);if(i&&n){let t,s,r,o;try{t=sr.fromISO(i,e),s=t.isValid}catch(n){s=!1}try{r=sr.fromISO(n,e),o=r.isValid}catch(n){o=!1}if(s&&o)return ms.fromDateTimes(t,r);if(s){const i=ds.fromISO(n,e);if(i.isValid)return ms.after(t,i)}else if(o){const t=ds.fromISO(i,e);if(t.isValid)return ms.before(r,t)}}return ms.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static isInterval(t){return t&&t.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get lastDateTime(){return this.isValid&&this.e?this.e.minus(1):null}get isValid(){return null===this.invalidReason}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(t="milliseconds"){return this.isValid?this.toDuration(t).get(t):NaN}count(t="milliseconds",e){if(!this.isValid)return NaN;const i=this.start.startOf(t,e);let n;return n=e?.useLocaleWeeks?this.end.reconfigure({locale:i.locale}):this.end,n=n.startOf(t,e),Math.floor(n.diff(i,t).get(t))+(n.valueOf()!==this.end.valueOf())}hasSame(t){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,t))}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(t){return!!this.isValid&&this.s>t}isBefore(t){return!!this.isValid&&this.e<=t}contains(t){return!!this.isValid&&this.s<=t&&this.e>t}set({start:t,end:e}={}){return this.isValid?ms.fromDateTimes(t||this.s,e||this.e):this}splitAt(...t){if(!this.isValid)return[];const e=t.map(rr).filter(t=>this.contains(t)).sort((t,e)=>t.toMillis()-e.toMillis()),i=[];let{s:n}=this,s=0;for(;n<this.e;){const t=e[s]||this.e,r=+t>+this.e?this.e:t;i.push(ms.fromDateTimes(n,r)),n=r,s+=1}return i}splitBy(t){const e=ds.fromDurationLike(t);if(!this.isValid||!e.isValid||0===e.as("milliseconds"))return[];let i,{s:n}=this,s=1;const r=[];for(;n<this.e;){const t=this.start.plus(e.mapUnits(t=>t*s));i=+t>+this.e?this.e:t,r.push(ms.fromDateTimes(n,i)),n=i,s+=1}return r}divideEqually(t){return this.isValid?this.splitBy(this.length()/t).slice(0,t):[]}overlaps(t){return this.e>t.s&&this.s<t.e}abutsStart(t){return!!this.isValid&&+this.e===+t.s}abutsEnd(t){return!!this.isValid&&+t.e===+this.s}engulfs(t){return!!this.isValid&&this.s<=t.s&&this.e>=t.e}equals(t){return!(!this.isValid||!t.isValid)&&this.s.equals(t.s)&&this.e.equals(t.e)}intersection(t){if(!this.isValid)return this;const e=this.s>t.s?this.s:t.s,i=this.e<t.e?this.e:t.e;return e>=i?null:ms.fromDateTimes(e,i)}union(t){if(!this.isValid)return this;const e=this.s<t.s?this.s:t.s,i=this.e>t.e?this.e:t.e;return ms.fromDateTimes(e,i)}static merge(t){const[e,i]=t.sort((t,e)=>t.s-e.s).reduce(([t,e],i)=>e?e.overlaps(i)||e.abutsStart(i)?[t,e.union(i)]:[t.concat([e]),i]:[t,i],[[],null]);return i&&e.push(i),e}static xor(t){let e=null,i=0;const n=[],s=t.map(t=>[{time:t.s,type:"s"},{time:t.e,type:"e"}]),r=Array.prototype.concat(...s).sort((t,e)=>t.time-e.time);for(const t of r)i+="s"===t.type?1:-1,1===i?e=t.time:(e&&+e!==+t.time&&n.push(ms.fromDateTimes(e,t.time)),e=null);return ms.merge(n)}difference(...t){return ms.xor([this].concat(t)).map(t=>this.intersection(t)).filter(t=>t&&!t.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:gs}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(t=ie,e={}){return this.isValid?mn.create(this.s.loc.clone(e),t).formatInterval(this):gs}toISO(t){return this.isValid?`${this.s.toISO(t)}/${this.e.toISO(t)}`:gs}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:gs}toISOTime(t){return this.isValid?`${this.s.toISOTime(t)}/${this.e.toISOTime(t)}`:gs}toFormat(t,{separator:e=" – "}={}){return this.isValid?`${this.s.toFormat(t)}${e}${this.e.toFormat(t)}`:gs}toDuration(t,e){return this.isValid?this.e.diff(this.s,t,e):ds.invalid(this.invalidReason)}mapEndpoints(t){return ms.fromDateTimes(t(this.s),t(this.e))}}class fs{static hasDST(t=ci.defaultZone){const e=sr.now().setZone(t).set({month:12});return!t.isUniversal&&e.offset!==e.set({month:6}).offset}static isValidIANAZone(t){return Te.isValidZone(t)}static normalizeZone(t){return Ye(t,ci.defaultZone)}static getStartOfWeek({locale:t=null,locObj:e=null}={}){return(e||He.create(t)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:t=null,locObj:e=null}={}){return(e||He.create(t)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:t=null,locObj:e=null}={}){return(e||He.create(t)).getWeekendDays().slice()}static months(t="long",{locale:e=null,numberingSystem:i=null,locObj:n=null,outputCalendar:s="gregory"}={}){return(n||He.create(e,i,s)).months(t)}static monthsFormat(t="long",{locale:e=null,numberingSystem:i=null,locObj:n=null,outputCalendar:s="gregory"}={}){return(n||He.create(e,i,s)).months(t,!0)}static weekdays(t="long",{locale:e=null,numberingSystem:i=null,locObj:n=null}={}){return(n||He.create(e,i,null)).weekdays(t)}static weekdaysFormat(t="long",{locale:e=null,numberingSystem:i=null,locObj:n=null}={}){return(n||He.create(e,i,null)).weekdays(t,!0)}static meridiems({locale:t=null}={}){return He.create(t).meridiems()}static eras(t="short",{locale:e=null}={}){return He.create(e,null,"gregory").eras(t)}static features(){return{relative:Oi(),localeWeek:Ni()}}}function ps(t,e){const i=t=>t.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),n=i(e)-i(t);return Math.floor(ds.fromMillis(n).as("days"))}function vs(t,e=t=>t){return{regex:t,deser:([t])=>e(function(t){let e=parseInt(t,10);if(isNaN(e)){e="";for(let i=0;i<t.length;i++){const n=t.charCodeAt(i);if(-1!==t[i].search(Ge.hanidec))e+=Qe.indexOf(t[i]);else for(const t in Ke){const[i,s]=Ke[t];n>=i&&n<=s&&(e+=n-i)}}return parseInt(e,10)}return e}(t))}}const ys=`[ ${String.fromCharCode(160)}]`,ws=new RegExp(ys,"g");function bs(t){return t.replace(/\./g,"\\.?").replace(ws,ys)}function _s(t){return t.replace(/\./g,"").replace(ws," ").toLowerCase()}function ks(t,e){return null===t?null:{regex:RegExp(t.map(bs).join("|")),deser:([i])=>t.findIndex(t=>_s(i)===_s(t))+e}}function Ss(t,e){return{regex:t,deser:([,t,e])=>qi(t,e),groups:e}}function $s(t){return{regex:t,deser:([t])=>t}}const Cs={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}};let Is=null;function xs(t,e){return Array.prototype.concat(...t.map(t=>function(t,e){if(t.literal)return t;const i=Ts(mn.macroTokenToFormatOpts(t.val),e);return null==i||i.includes(void 0)?t:i}(t,e)))}class Os{constructor(t,e){if(this.locale=t,this.format=e,this.tokens=xs(mn.parseFormat(e),t),this.units=this.tokens.map(e=>function(t,e){const i=ti(e),n=ti(e,"{2}"),s=ti(e,"{3}"),r=ti(e,"{4}"),o=ti(e,"{6}"),a=ti(e,"{1,2}"),l=ti(e,"{1,3}"),c=ti(e,"{1,6}"),h=ti(e,"{1,9}"),u=ti(e,"{2,4}"),d=ti(e,"{4,6}"),g=t=>{return{regex:RegExp((e=t.val,e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"))),deser:([t])=>t,literal:!0};var e},m=(m=>{if(t.literal)return g(m);switch(m.val){case"G":return ks(e.eras("short"),0);case"GG":return ks(e.eras("long"),0);case"y":return vs(c);case"yy":case"kk":return vs(u,Hi);case"yyyy":case"kkkk":return vs(r);case"yyyyy":return vs(d);case"yyyyyy":return vs(o);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return vs(a);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return vs(n);case"MMM":return ks(e.months("short",!0),1);case"MMMM":return ks(e.months("long",!0),1);case"LLL":return ks(e.months("short",!1),1);case"LLLL":return ks(e.months("long",!1),1);case"o":case"S":return vs(l);case"ooo":case"SSS":return vs(s);case"u":return $s(h);case"uu":return $s(a);case"uuu":case"E":case"c":return vs(i);case"a":return ks(e.meridiems(),0);case"EEE":return ks(e.weekdays("short",!1),1);case"EEEE":return ks(e.weekdays("long",!1),1);case"ccc":return ks(e.weekdays("short",!0),1);case"cccc":return ks(e.weekdays("long",!0),1);case"Z":case"ZZ":return Ss(new RegExp(`([+-]${a.source})(?::(${n.source}))?`),2);case"ZZZ":return Ss(new RegExp(`([+-]${a.source})(${n.source})?`),2);case"z":return $s(/[a-z_+-/]{1,256}?/i);case" ":return $s(/[^\S\n\r]/);default:return g(m)}})(t)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"};return m.token=t,m}(e,t)),this.disqualifyingUnit=this.units.find(t=>t.invalidReason),!this.disqualifyingUnit){const[t,e]=function(t){const e=t.map(t=>t.regex).reduce((t,e)=>`${t}(${e.source})`,"");return[`^${e}$`,t]}(this.units);this.regex=RegExp(t,"i"),this.handlers=e}}explainFromTokens(t){if(this.isValid){const[e,i]=function(t,e,i){const n=t.match(e);if(n){const t={};let e=1;for(const s in i)if(Di(i,s)){const r=i[s],o=r.groups?r.groups+1:1;!r.literal&&r.token&&(t[r.token.val[0]]=r.deser(n.slice(e,e+o))),e+=o}return[n,t]}return[n,{}]}(t,this.regex,this.handlers),[n,s,r]=i?function(t){let e,i=null;Ci(t.z)||(i=Te.create(t.z)),Ci(t.Z)||(i||(i=new qe(t.Z)),e=t.Z),Ci(t.q)||(t.M=3*(t.q-1)+1),Ci(t.h)||(t.h<12&&1===t.a?t.h+=12:12===t.h&&0===t.a&&(t.h=0)),0===t.G&&t.y&&(t.y=-t.y),Ci(t.u)||(t.S=Ui(t.u));const n=Object.keys(t).reduce((e,i)=>{const n=(t=>{switch(t){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}})(i);return n&&(e[n]=t[i]),e},{});return[n,i,e]}(i):[null,null,void 0];if(Di(i,"a")&&Di(i,"H"))throw new Yt("Can't include meridiem when specifying 24-hour format");return{input:t,tokens:this.tokens,regex:this.regex,rawMatches:e,matches:i,result:n,zone:s,specificOffset:r}}return{input:t,tokens:this.tokens,invalidReason:this.invalidReason}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function Ns(t,e,i){return new Os(t,i).explainFromTokens(e)}function Ts(t,e){if(!t)return null;const i=mn.create(e,t).dtFormatter((Is||(Is=sr.fromMillis(1555555555555)),Is)),n=i.formatToParts(),s=i.resolvedOptions();return n.map(e=>function(t,e,i){const{type:n,value:s}=t;if("literal"===n){const t=/^\s+$/.test(s);return{literal:!t,val:t?" ":s}}const r=e[n];let o=n;"hour"===n&&(o=null!=e.hour12?e.hour12?"hour12":"hour24":null!=e.hourCycle?"h11"===e.hourCycle||"h12"===e.hourCycle?"hour12":"hour24":i.hour12?"hour12":"hour24");let a=Cs[o];if("object"==typeof a&&(a=a[r]),a)return{literal:!1,val:a}}(e,t,s))}const Ds="Invalid DateTime",As=864e13;function Ms(t){return new hi("unsupported zone",`the zone "${t.name}" is not supported`)}function Fs(t){return null===t.weekData&&(t.weekData=yi(t.c)),t.weekData}function Es(t){return null===t.localWeekData&&(t.localWeekData=yi(t.c,t.loc.getMinDaysInFirstWeek(),t.loc.getStartOfWeek())),t.localWeekData}function Ps(t,e){const i={ts:t.ts,zone:t.zone,c:t.c,o:t.o,loc:t.loc,invalid:t.invalid};return new sr({...i,...e,old:i})}function Us(t,e,i){let n=t-60*e*1e3;const s=i.offset(n);if(e===s)return[n,e];n-=60*(s-e)*1e3;const r=i.offset(n);return s===r?[n,s]:[t-60*Math.min(s,r)*1e3,Math.max(s,r)]}function Ws(t,e){const i=new Date(t+=60*e*1e3);return{year:i.getUTCFullYear(),month:i.getUTCMonth()+1,day:i.getUTCDate(),hour:i.getUTCHours(),minute:i.getUTCMinutes(),second:i.getUTCSeconds(),millisecond:i.getUTCMilliseconds()}}function Ls(t,e,i){return Us(Vi(t),e,i)}function Rs(t,e){const i=t.o,n=t.c.year+Math.trunc(e.years),s=t.c.month+Math.trunc(e.months)+3*Math.trunc(e.quarters),r={...t.c,year:n,month:s,day:Math.min(t.c.day,zi(n,s))+Math.trunc(e.days)+7*Math.trunc(e.weeks)},o=ds.fromObject({years:e.years-Math.trunc(e.years),quarters:e.quarters-Math.trunc(e.quarters),months:e.months-Math.trunc(e.months),weeks:e.weeks-Math.trunc(e.weeks),days:e.days-Math.trunc(e.days),hours:e.hours,minutes:e.minutes,seconds:e.seconds,milliseconds:e.milliseconds}).as("milliseconds"),a=Vi(r);let[l,c]=Us(a,i,t.zone);return 0!==o&&(l+=o,c=t.zone.offset(l)),{ts:l,o:c}}function zs(t,e,i,n,s,r){const{setZone:o,zone:a}=i;if(t&&0!==Object.keys(t).length||e){const n=e||a,s=sr.fromObject(t,{...i,zone:n,specificOffset:r});return o?s:s.setZone(a)}return sr.invalid(new hi("unparsable",`the input "${s}" can't be parsed as ${n}`))}function Vs(t,e,i=!0){return t.isValid?mn.create(He.create("en-US"),{allowZ:i,forceSimple:!0}).formatDateTimeFromString(t,e):null}function js(t,e,i){const n=t.c.year>9999||t.c.year<0;let s="";if(n&&t.c.year>=0&&(s+="+"),s+=Fi(t.c.year,n?6:4),"year"===i)return s;if(e){if(s+="-",s+=Fi(t.c.month),"month"===i)return s;s+="-"}else if(s+=Fi(t.c.month),"month"===i)return s;return s+=Fi(t.c.day),s}function Js(t,e,i,n,s,r,o){let a=!i||0!==t.c.millisecond||0!==t.c.second,l="";switch(o){case"day":case"month":case"year":break;default:if(l+=Fi(t.c.hour),"hour"===o)break;if(e){if(l+=":",l+=Fi(t.c.minute),"minute"===o)break;a&&(l+=":",l+=Fi(t.c.second))}else{if(l+=Fi(t.c.minute),"minute"===o)break;a&&(l+=Fi(t.c.second))}if("second"===o)break;!a||n&&0===t.c.millisecond||(l+=".",l+=Fi(t.c.millisecond,3))}return s&&(t.isOffsetFixed&&0===t.offset&&!r?l+="Z":t.o<0?(l+="-",l+=Fi(Math.trunc(-t.o/60)),l+=":",l+=Fi(Math.trunc(-t.o%60))):(l+="+",l+=Fi(Math.trunc(t.o/60)),l+=":",l+=Fi(Math.trunc(t.o%60)))),r&&(l+="["+t.zone.ianaName+"]"),l}const Hs={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},Zs={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},qs={ordinal:1,hour:0,minute:0,second:0,millisecond:0},Bs=["year","month","day","hour","minute","second","millisecond"],Ys=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],Gs=["year","ordinal","hour","minute","second","millisecond"];function Ks(t){const e={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[t.toLowerCase()];if(!e)throw new Gt(t);return e}function Qs(t){switch(t.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return Ks(t)}}function Xs(t,e){const i=Ye(e.zone,ci.defaultZone);if(!i.isValid)return sr.invalid(Ms(i));const n=He.fromObject(e);let s,r;if(Ci(t.year))s=ci.now();else{for(const e of Bs)Ci(t[e])&&(t[e]=Hs[e]);const e=Si(t)||$i(t);if(e)return sr.invalid(e);const n=function(t){if(void 0===ir&&(ir=ci.now()),"iana"!==t.type)return t.offset(ir);const e=t.name;let i=nr.get(e);return void 0===i&&(i=t.offset(ir),nr.set(e,i)),i}(i);[s,r]=Ls(t,n,i)}return new sr({ts:s,zone:i,loc:n,o:r})}function tr(t,e,i){const n=!!Ci(i.round)||i.round,s=Ci(i.rounding)?"trunc":i.rounding,r=(t,r)=>(t=Wi(t,n||i.calendary?0:2,i.calendary?"round":s),e.loc.clone(i).relFormatter(i).format(t,r)),o=n=>i.calendary?e.hasSame(t,n)?0:e.startOf(n).diff(t.startOf(n),n).get(n):e.diff(t,n).get(n);if(i.unit)return r(o(i.unit),i.unit);for(const t of i.units){const e=o(t);if(Math.abs(e)>=1)return r(e,t)}return r(t>e?-0:0,i.units[i.units.length-1])}function er(t){let e,i={};return t.length>0&&"object"==typeof t[t.length-1]?(i=t[t.length-1],e=Array.from(t).slice(0,t.length-1)):e=Array.from(t),[i,e]}let ir;const nr=new Map;class sr{constructor(t){const e=t.zone||ci.defaultZone;let i=t.invalid||(Number.isNaN(t.ts)?new hi("invalid input"):null)||(e.isValid?null:Ms(e));this.ts=Ci(t.ts)?ci.now():t.ts;let n=null,s=null;if(!i)if(t.old&&t.old.ts===this.ts&&t.old.zone.equals(e))[n,s]=[t.old.c,t.old.o];else{const r=Ii(t.o)&&!t.old?t.o:e.offset(this.ts);n=Ws(this.ts,r),i=Number.isNaN(n.year)?new hi("invalid input"):null,n=i?null:n,s=i?null:r}this._zone=e,this.loc=t.loc||He.create(),this.invalid=i,this.weekData=null,this.localWeekData=null,this.c=n,this.o=s,this.isLuxonDateTime=!0}static now(){return new sr({})}static local(){const[t,e]=er(arguments),[i,n,s,r,o,a,l]=e;return Xs({year:i,month:n,day:s,hour:r,minute:o,second:a,millisecond:l},t)}static utc(){const[t,e]=er(arguments),[i,n,s,r,o,a,l]=e;return t.zone=qe.utcInstance,Xs({year:i,month:n,day:s,hour:r,minute:o,second:a,millisecond:l},t)}static fromJSDate(t,e={}){const i=function(t){return"[object Date]"===Object.prototype.toString.call(t)}(t)?t.valueOf():NaN;if(Number.isNaN(i))return sr.invalid("invalid input");const n=Ye(e.zone,ci.defaultZone);return n.isValid?new sr({ts:i,zone:n,loc:He.fromObject(e)}):sr.invalid(Ms(n))}static fromMillis(t,e={}){if(Ii(t))return t<-As||t>As?sr.invalid("Timestamp out of range"):new sr({ts:t,zone:Ye(e.zone,ci.defaultZone),loc:He.fromObject(e)});throw new Kt(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`)}static fromSeconds(t,e={}){if(Ii(t))return new sr({ts:1e3*t,zone:Ye(e.zone,ci.defaultZone),loc:He.fromObject(e)});throw new Kt("fromSeconds requires a numerical input")}static fromObject(t,e={}){t=t||{};const i=Ye(e.zone,ci.defaultZone);if(!i.isValid)return sr.invalid(Ms(i));const n=He.fromObject(e),s=Yi(t,Qs),{minDaysInFirstWeek:r,startOfWeek:o}=ki(s,n),a=ci.now(),l=Ci(e.specificOffset)?i.offset(a):e.specificOffset,c=!Ci(s.ordinal),h=!Ci(s.year),u=!Ci(s.month)||!Ci(s.day),d=h||u,g=s.weekYear||s.weekNumber;if((d||c)&&g)throw new Yt("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(u&&c)throw new Yt("Can't mix ordinal dates with month/day");const m=g||s.weekday&&!d;let f,p,v=Ws(a,l);m?(f=Ys,p=Zs,v=yi(v,r,o)):c?(f=Gs,p=qs,v=bi(v)):(f=Bs,p=Hs);let y=!1;for(const t of f)Ci(s[t])?s[t]=y?p[t]:v[t]:y=!0;const w=m?function(t,e=4,i=1){const n=xi(t.weekYear),s=Mi(t.weekNumber,1,Ji(t.weekYear,e,i)),r=Mi(t.weekday,1,7);return n?s?!r&&gi("weekday",t.weekday):gi("week",t.weekNumber):gi("weekYear",t.weekYear)}(s,r,o):c?function(t){const e=xi(t.year),i=Mi(t.ordinal,1,Ri(t.year));return e?!i&&gi("ordinal",t.ordinal):gi("year",t.year)}(s):Si(s),b=w||$i(s);if(b)return sr.invalid(b);const _=m?wi(s,r,o):c?_i(s):s,[k,S]=Ls(_,l,i),$=new sr({ts:k,zone:i,o:S,loc:n});return s.weekday&&d&&t.weekday!==$.weekday?sr.invalid("mismatched weekday",`you can't specify both a weekday of ${s.weekday} and a date of ${$.toISO()}`):$.isValid?$:sr.invalid($.invalid)}static fromISO(t,e={}){const[i,n]=function(t){return yn(t,[Jn,Bn],[Hn,Yn],[Zn,Gn],[qn,Kn])}(t);return zs(i,n,e,"ISO 8601",t)}static fromRFC2822(t,e={}){const[i,n]=function(t){return yn(function(t){return t.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}(t),[Un,Wn])}(t);return zs(i,n,e,"RFC 2822",t)}static fromHTTP(t,e={}){const[i,n]=function(t){return yn(t,[Ln,Vn],[Rn,Vn],[zn,jn])}(t);return zs(i,n,e,"HTTP",e)}static fromFormat(t,e,i={}){if(Ci(t)||Ci(e))throw new Kt("fromFormat requires an input string and a format");const{locale:n=null,numberingSystem:s=null}=i,r=He.fromOpts({locale:n,numberingSystem:s,defaultToEN:!0}),[o,a,l,c]=function(t,e,i){const{result:n,zone:s,specificOffset:r,invalidReason:o}=Ns(t,e,i);return[n,s,r,o]}(r,t,e);return c?sr.invalid(c):zs(o,a,i,`format ${e}`,t,l)}static fromString(t,e,i={}){return sr.fromFormat(t,e,i)}static fromSQL(t,e={}){const[i,n]=function(t){return yn(t,[Xn,Bn],[ts,es])}(t);return zs(i,n,e,"SQL",t)}static invalid(t,e=null){if(!t)throw new Kt("need to specify a reason the DateTime is invalid");const i=t instanceof hi?t:new hi(t,e);if(ci.throwOnInvalid)throw new Zt(i);return new sr({invalid:i})}static isDateTime(t){return t&&t.isLuxonDateTime||!1}static parseFormatForOpts(t,e={}){const i=Ts(t,He.fromObject(e));return i?i.map(t=>t?t.val:null).join(""):null}static expandFormat(t,e={}){return xs(mn.parseFormat(t),He.fromObject(e)).map(t=>t.val).join("")}static resetCache(){ir=void 0,nr.clear()}get(t){return this[t]}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?Fs(this).weekYear:NaN}get weekNumber(){return this.isValid?Fs(this).weekNumber:NaN}get weekday(){return this.isValid?Fs(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?Es(this).weekday:NaN}get localWeekNumber(){return this.isValid?Es(this).weekNumber:NaN}get localWeekYear(){return this.isValid?Es(this).weekYear:NaN}get ordinal(){return this.isValid?bi(this.c).ordinal:NaN}get monthShort(){return this.isValid?fs.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?fs.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?fs.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?fs.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];const t=864e5,e=6e4,i=Vi(this.c),n=this.zone.offset(i-t),s=this.zone.offset(i+t),r=this.zone.offset(i-n*e),o=this.zone.offset(i-s*e);if(r===o)return[this];const a=i-r*e,l=i-o*e,c=Ws(a,r),h=Ws(l,o);return c.hour===h.hour&&c.minute===h.minute&&c.second===h.second&&c.millisecond===h.millisecond?[Ps(this,{ts:a}),Ps(this,{ts:l})]:[this]}get isInLeapYear(){return Li(this.year)}get daysInMonth(){return zi(this.year,this.month)}get daysInYear(){return this.isValid?Ri(this.year):NaN}get weeksInWeekYear(){return this.isValid?Ji(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?Ji(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(t={}){const{locale:e,numberingSystem:i,calendar:n}=mn.create(this.loc.clone(t),t).resolvedOptions(this);return{locale:e,numberingSystem:i,outputCalendar:n}}toUTC(t=0,e={}){return this.setZone(qe.instance(t),e)}toLocal(){return this.setZone(ci.defaultZone)}setZone(t,{keepLocalTime:e=!1,keepCalendarTime:i=!1}={}){if((t=Ye(t,ci.defaultZone)).equals(this.zone))return this;if(t.isValid){let n=this.ts;if(e||i){const e=t.offset(this.ts),i=this.toObject();[n]=Ls(i,e,t)}return Ps(this,{ts:n,zone:t})}return sr.invalid(Ms(t))}reconfigure({locale:t,numberingSystem:e,outputCalendar:i}={}){return Ps(this,{loc:this.loc.clone({locale:t,numberingSystem:e,outputCalendar:i})})}setLocale(t){return this.reconfigure({locale:t})}set(t){if(!this.isValid)return this;const e=Yi(t,Qs),{minDaysInFirstWeek:i,startOfWeek:n}=ki(e,this.loc),s=!Ci(e.weekYear)||!Ci(e.weekNumber)||!Ci(e.weekday),r=!Ci(e.ordinal),o=!Ci(e.year),a=!Ci(e.month)||!Ci(e.day),l=o||a,c=e.weekYear||e.weekNumber;if((l||r)&&c)throw new Yt("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(a&&r)throw new Yt("Can't mix ordinal dates with month/day");let h;s?h=wi({...yi(this.c,i,n),...e},i,n):Ci(e.ordinal)?(h={...this.toObject(),...e},Ci(e.day)&&(h.day=Math.min(zi(h.year,h.month),h.day))):h=_i({...bi(this.c),...e});const[u,d]=Ls(h,this.o,this.zone);return Ps(this,{ts:u,o:d})}plus(t){return this.isValid?Ps(this,Rs(this,ds.fromDurationLike(t))):this}minus(t){return this.isValid?Ps(this,Rs(this,ds.fromDurationLike(t).negate())):this}startOf(t,{useLocaleWeeks:e=!1}={}){if(!this.isValid)return this;const i={},n=ds.normalizeUnit(t);switch(n){case"years":i.month=1;case"quarters":case"months":i.day=1;case"weeks":case"days":i.hour=0;case"hours":i.minute=0;case"minutes":i.second=0;case"seconds":i.millisecond=0}if("weeks"===n)if(e){const t=this.loc.getStartOfWeek(),{weekday:e}=this;e<t&&(i.weekNumber=this.weekNumber-1),i.weekday=t}else i.weekday=1;if("quarters"===n){const t=Math.ceil(this.month/3);i.month=3*(t-1)+1}return this.set(i)}endOf(t,e){return this.isValid?this.plus({[t]:1}).startOf(t,e).minus(1):this}toFormat(t,e={}){return this.isValid?mn.create(this.loc.redefaultToEN(e)).formatDateTimeFromString(this,t):Ds}toLocaleString(t=ie,e={}){return this.isValid?mn.create(this.loc.clone(e),t).formatDateTime(this):Ds}toLocaleParts(t={}){return this.isValid?mn.create(this.loc.clone(t),t).formatDateTimeParts(this):[]}toISO({format:t="extended",suppressSeconds:e=!1,suppressMilliseconds:i=!1,includeOffset:n=!0,extendedZone:s=!1,precision:r="milliseconds"}={}){if(!this.isValid)return null;const o="extended"===t;let a=js(this,o,r=Ks(r));return Bs.indexOf(r)>=3&&(a+="T"),a+=Js(this,o,e,i,n,s,r),a}toISODate({format:t="extended",precision:e="day"}={}){return this.isValid?js(this,"extended"===t,Ks(e)):null}toISOWeekDate(){return Vs(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:t=!1,suppressSeconds:e=!1,includeOffset:i=!0,includePrefix:n=!1,extendedZone:s=!1,format:r="extended",precision:o="milliseconds"}={}){return this.isValid?(o=Ks(o),(n&&Bs.indexOf(o)>=3?"T":"")+Js(this,"extended"===r,e,t,i,s,o)):null}toRFC2822(){return Vs(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return Vs(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?js(this,!0):null}toSQLTime({includeOffset:t=!0,includeZone:e=!1,includeOffsetSpace:i=!0}={}){let n="HH:mm:ss.SSS";return(e||t)&&(i&&(n+=" "),e?n+="z":t&&(n+="ZZ")),Vs(this,n,!0)}toSQL(t={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(t)}`:null}toString(){return this.isValid?this.toISO():Ds}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(t={}){if(!this.isValid)return{};const e={...this.c};return t.includeConfig&&(e.outputCalendar=this.outputCalendar,e.numberingSystem=this.loc.numberingSystem,e.locale=this.loc.locale),e}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(t,e="milliseconds",i={}){if(!this.isValid||!t.isValid)return ds.invalid("created by diffing an invalid DateTime");const n={locale:this.locale,numberingSystem:this.numberingSystem,...i},s=(a=e,Array.isArray(a)?a:[a]).map(ds.normalizeUnit),r=t.valueOf()>this.valueOf(),o=function(t,e,i,n){let[s,r,o,a]=function(t,e,i){const n=[["years",(t,e)=>e.year-t.year],["quarters",(t,e)=>e.quarter-t.quarter+4*(e.year-t.year)],["months",(t,e)=>e.month-t.month+12*(e.year-t.year)],["weeks",(t,e)=>{const i=ps(t,e);return(i-i%7)/7}],["days",ps]],s={},r=t;let o,a;for(const[l,c]of n)i.indexOf(l)>=0&&(o=l,s[l]=c(t,e),a=r.plus(s),a>e?(s[l]--,(t=r.plus(s))>e&&(a=t,s[l]--,t=r.plus(s))):t=a);return[t,s,a,o]}(t,e,i);const l=e-s,c=i.filter(t=>["hours","minutes","seconds","milliseconds"].indexOf(t)>=0);0===c.length&&(o<e&&(o=s.plus({[a]:1})),o!==s&&(r[a]=(r[a]||0)+l/(o-s)));const h=ds.fromObject(r,n);return c.length>0?ds.fromMillis(l,n).shiftTo(...c).plus(h):h}(r?this:t,r?t:this,s,n);var a;return r?o.negate():o}diffNow(t="milliseconds",e={}){return this.diff(sr.now(),t,e)}until(t){return this.isValid?ms.fromDateTimes(this,t):this}hasSame(t,e,i){if(!this.isValid)return!1;const n=t.valueOf(),s=this.setZone(t.zone,{keepLocalTime:!0});return s.startOf(e,i)<=n&&n<=s.endOf(e,i)}equals(t){return this.isValid&&t.isValid&&this.valueOf()===t.valueOf()&&this.zone.equals(t.zone)&&this.loc.equals(t.loc)}toRelative(t={}){if(!this.isValid)return null;const e=t.base||sr.fromObject({},{zone:this.zone}),i=t.padding?this<e?-t.padding:t.padding:0;let n=["years","months","days","hours","minutes","seconds"],s=t.unit;return Array.isArray(t.unit)&&(n=t.unit,s=void 0),tr(e,this.plus(i),{...t,numeric:"always",units:n,unit:s})}toRelativeCalendar(t={}){return this.isValid?tr(t.base||sr.fromObject({},{zone:this.zone}),this,{...t,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...t){if(!t.every(sr.isDateTime))throw new Kt("min requires all arguments be DateTimes");return Ti(t,t=>t.valueOf(),Math.min)}static max(...t){if(!t.every(sr.isDateTime))throw new Kt("max requires all arguments be DateTimes");return Ti(t,t=>t.valueOf(),Math.max)}static fromFormatExplain(t,e,i={}){const{locale:n=null,numberingSystem:s=null}=i;return Ns(He.fromOpts({locale:n,numberingSystem:s,defaultToEN:!0}),t,e)}static fromStringExplain(t,e,i={}){return sr.fromFormatExplain(t,e,i)}static buildFormatParser(t,e={}){const{locale:i=null,numberingSystem:n=null}=e,s=He.fromOpts({locale:i,numberingSystem:n,defaultToEN:!0});return new Os(s,t)}static fromFormatParser(t,e,i={}){if(Ci(t)||Ci(e))throw new Kt("fromFormatParser requires an input string and a format parser");const{locale:n=null,numberingSystem:s=null}=i,r=He.fromOpts({locale:n,numberingSystem:s,defaultToEN:!0});if(!r.equals(e.locale))throw new Kt(`fromFormatParser called with a locale of ${r}, but the format parser was created for ${e.locale}`);const{result:o,zone:a,specificOffset:l,invalidReason:c}=e.explainFromTokens(t);return c?sr.invalid(c):zs(o,a,i,`format ${e.format}`,t,l)}static get DATE_SHORT(){return ie}static get DATE_MED(){return ne}static get DATE_MED_WITH_WEEKDAY(){return se}static get DATE_FULL(){return re}static get DATE_HUGE(){return oe}static get TIME_SIMPLE(){return ae}static get TIME_WITH_SECONDS(){return le}static get TIME_WITH_SHORT_OFFSET(){return ce}static get TIME_WITH_LONG_OFFSET(){return he}static get TIME_24_SIMPLE(){return ue}static get TIME_24_WITH_SECONDS(){return de}static get TIME_24_WITH_SHORT_OFFSET(){return ge}static get TIME_24_WITH_LONG_OFFSET(){return me}static get DATETIME_SHORT(){return fe}static get DATETIME_SHORT_WITH_SECONDS(){return pe}static get DATETIME_MED(){return ve}static get DATETIME_MED_WITH_SECONDS(){return ye}static get DATETIME_MED_WITH_WEEKDAY(){return we}static get DATETIME_FULL(){return be}static get DATETIME_FULL_WITH_SECONDS(){return _e}static get DATETIME_HUGE(){return ke}static get DATETIME_HUGE_WITH_SECONDS(){return Se}}function rr(t){if(sr.isDateTime(t))return t;if(t&&t.valueOf&&Ii(t.valueOf()))return sr.fromJSDate(t);if(t&&"object"==typeof t)return sr.fromObject(t);throw new Kt(`Unknown datetime argument: ${t}, of type ${typeof t}`)}class or extends Jt{constructor(t,e={}){super(t,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=e}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(t){this.logger.debug("Updating ClockController config:",t),this.config={...this.config,...t};const e=new Date,i=this.config.language||"cs",n=this.config.timeZone;this.updateTime(e,n),this.updateDate(e,i,n),this.host.requestUpdate()}update(){const t=new Date,e=this.config.language||"cs",i=this.config.timeZone;this.updateTime(t,i),0!==t.getSeconds()&&""!==this._currentDate||this.updateDate(t,e,i),this.host.requestUpdate()}updateTime(t,e){var i,n,s,r,o;const a="hidden"===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.second),l=!0===(null===(n=this.config.timeFormat)||void 0===n?void 0:n.hour12);let c,h,u;if(e){const i=sr.fromJSDate(t,e?{zone:e}:void 0);c=i.hour,h=i.minute,u=i.second}else c=t.getHours(),h=t.getMinutes(),u=t.getSeconds();if(a&&(this._seconds=""),l){const t=c>=12;c%=12,c=c||12,this._ampm=t?"PM":"AM"}else this._ampm="";const d="numeric"!==(null===(s=this.config.timeFormat)||void 0===s?void 0:s.hour);this._hours=d?c.toString().padStart(2,"0"):c.toString();const g="numeric"!==(null===(r=this.config.timeFormat)||void 0===r?void 0:r.minute);if(this._minutes=g?h.toString().padStart(2,"0"):h.toString(),!a){const t="numeric"!==(null===(o=this.config.timeFormat)||void 0===o?void 0:o.second);this._seconds=t?u.toString().padStart(2,"0"):u.toString()}}updateDate(t,e,i){let n=jt(t,e,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},i);n=n.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=n}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var ar=function(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let lr=class extends ht{constructor(){super(),this.logger=kt("clock-component"),this.clockController=new or(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(t){if(super.updated(t),t.has("timeFormat")||t.has("dateFormat")||t.has("language")||t.has("timeZone")){if(this.logger.debug("Clock properties changed, updating ClockController"),t.has("timeFormat")){const e=t.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(e)} -> ${JSON.stringify(this.timeFormat)}`)}if(t.has("dateFormat")){const e=t.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(e)} -> ${JSON.stringify(this.dateFormat)}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}render(){var t,e;const i=this.getSeconds(),n=void 0!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second)&&"hidden"!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second);return this.logger.debug(`Rendering clock - Seconds: ${i}, Show seconds: ${n}, TimeFormat: ${JSON.stringify(this.timeFormat)}`),J`
            <div class="clock" style="color: ${this.fontColor};">
                <span class="hours-minutes" style="color: ${this.fontColor};">${this.getHours()}:${this.getMinutes()}</span>
                ${n?J`
                    <div class="seconds-container">
                        <span class="seconds" style="color: ${this.fontColor};">${i}</span>
                        ${this.getAmPm()?J`<span class="ampm" style="color: ${this.fontColor};">${this.getAmPm()}</span>`:""}
                    </div>
                `:this.getAmPm()?J`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: ${this.fontColor};">${this.getAmPm()}</span>
                    </div>
                `:""}
            </div>
            <div class="date" style="color: ${this.fontColor};">${this.getCurrentDate()}</div>
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
    `,ar([ft({type:Object})],lr.prototype,"timeFormat",void 0),ar([ft({type:Object})],lr.prototype,"dateFormat",void 0),ar([ft({type:String})],lr.prototype,"fontColor",void 0),ar([ft({type:String})],lr.prototype,"language",void 0),ar([ft({type:String})],lr.prototype,"timeZone",void 0),lr=ar([dt("ha-clock")],lr);class cr extends Jt{constructor(t,e={}){super(t,"sensor-controller"),this._sensorValues=[],this.config={},this.config=e}onHostConnected(){}onHostDisconnected(){}updateConfig(t){this.logger.debug("Updating SensorController config:",t),this.config={...this.config,...t},this.hass&&this.updateSensorValues()}updateHass(t){this.hass=t,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=[],this.config.sensors.forEach(t=>{if(t.entity&&this.hass.states[t.entity]){const e=this.hass.states[t.entity];let i=e.state;e.attributes&&e.attributes.unit_of_measurement&&(i+=` ${e.attributes.unit_of_measurement}`),this._sensorValues.push({entity:t.entity,label:t.label,value:i})}else t.entity&&this._sensorValues.push({entity:t.entity,label:t.label,value:"unavailable"})}),this.host.requestUpdate()):this._sensorValues=[]}get sensorValues(){return this._sensorValues}}var hr=function(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let ur=class extends ht{constructor(){super(),this.logger=kt("sensor-component"),this.sensorController=new cr(this,{sensors:this.sensors})}get controller(){return this.sensorController}updated(t){super.updated(t),t.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),t.has("hass")&&this.hass&&(this.logger.debug("Hass changed, updating SensorController"),this.sensorController.updateHass(this.hass))}render(){const t=this.sensorController.sensorValues;return 0===t.length?J``:J`
            <div class="sensor-container" style="color: ${this.fontColor};">
                ${t.map(t=>J`
                    <div class="sensor-item">
                        ${t.label?J`
                                <div class="sensor-label" style="color: ${this.fontColor};">
                                    ${t.label}
                                </div>`:""}
                        <div class="sensor-value" style="color: ${this.fontColor};">
                            ${t.value}
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
    `,hr([ft({type:Array})],ur.prototype,"sensors",void 0),hr([ft({type:String})],ur.prototype,"fontColor",void 0),hr([ft({type:Object})],ur.prototype,"hass",void 0),ur=hr([dt("ha-sensors")],ur);var dr=Object.defineProperty,gr=(t,e,i)=>(((t,e,i)=>{e in t?dr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i})(t,"symbol"!=typeof e?e+"":e,i),i),mr=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},fr=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},pr=(t,e,i)=>(((t,e)=>{if(!e.has(t))throw TypeError("Cannot access private method")})(t,e),i);function vr(t,e){return Object.is(t,e)}let yr=null,wr=!1,br=1;const _r=Symbol("SIGNAL");function kr(t){const e=yr;return yr=t,e}const Sr={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function $r(t){if(wr)throw new Error("undefined"!=typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===yr)return;yr.consumerOnSignalRead(t);const e=yr.nextProducerIndex++;Dr(yr),e<yr.producerNode.length&&yr.producerNode[e]!==t&&Tr(yr)&&Nr(yr.producerNode[e],yr.producerIndexOfThis[e]),yr.producerNode[e]!==t&&(yr.producerNode[e]=t,yr.producerIndexOfThis[e]=Tr(yr)?Or(t,yr,e):0),yr.producerLastReadVersion[e]=t.version}function Cr(t){if(t.dirty||t.lastCleanEpoch!==br){if(!t.producerMustRecompute(t)&&!function(t){Dr(t);for(let e=0;e<t.producerNode.length;e++){const i=t.producerNode[e],n=t.producerLastReadVersion[e];if(n!==i.version)return!0;if(Cr(i),n!==i.version)return!0}return!1}(t))return t.dirty=!1,void(t.lastCleanEpoch=br);t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=br}}function Ir(t){if(void 0===t.liveConsumerNode)return;const e=wr;wr=!0;try{for(const e of t.liveConsumerNode)e.dirty||xr(e)}finally{wr=e}}function xr(t){var e;t.dirty=!0,Ir(t),null==(e=t.consumerMarkedDirty)||e.call(t.wrapper??t)}function Or(t,e,i){var n;if(Ar(t),Dr(t),0===t.liveConsumerNode.length){null==(n=t.watched)||n.call(t.wrapper);for(let e=0;e<t.producerNode.length;e++)t.producerIndexOfThis[e]=Or(t.producerNode[e],t,e)}return t.liveConsumerIndexOfThis.push(i),t.liveConsumerNode.push(e)-1}function Nr(t,e){var i;if(Ar(t),Dr(t),"undefined"!=typeof ngDevMode&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(1===t.liveConsumerNode.length){null==(i=t.unwatched)||i.call(t.wrapper);for(let e=0;e<t.producerNode.length;e++)Nr(t.producerNode[e],t.producerIndexOfThis[e])}const n=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[n],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[n],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){const i=t.liveConsumerIndexOfThis[e],n=t.liveConsumerNode[e];Dr(n),n.producerIndexOfThis[i]=e}}function Tr(t){var e;return t.consumerIsAlwaysLive||((null==(e=null==t?void 0:t.liveConsumerNode)?void 0:e.length)??0)>0}function Dr(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function Ar(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function Mr(t){if(Cr(t),$r(t),t.value===Pr)throw t.error;return t.value}const Fr=Symbol("UNSET"),Er=Symbol("COMPUTING"),Pr=Symbol("ERRORED"),Ur=(()=>({...Sr,value:Fr,dirty:!0,error:null,equal:vr,producerMustRecompute:t=>t.value===Fr||t.value===Er,producerRecomputeValue(t){if(t.value===Er)throw new Error("Detected cycle in computations.");const e=t.value;t.value=Er;const i=function(t){return t&&(t.nextProducerIndex=0),kr(t)}(t);let n,s=!1;try{n=t.computation.call(t.wrapper),s=e!==Fr&&e!==Pr&&t.equal.call(t.wrapper,e,n)}catch(e){n=Pr,t.error=e}finally{!function(t,e){if(kr(e),t&&void 0!==t.producerNode&&void 0!==t.producerIndexOfThis&&void 0!==t.producerLastReadVersion){if(Tr(t))for(let e=t.nextProducerIndex;e<t.producerNode.length;e++)Nr(t.producerNode[e],t.producerIndexOfThis[e]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}(t,i)}s?t.value=e:(t.value=n,t.version++)}}))();function Wr(){return $r(this),this.value}function Lr(t,e){!1===(null==yr?void 0:yr.consumerAllowSignalWrites)&&function(){throw new Error}(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,function(t){t.version++,br++,Ir(t)}(t))}const Rr=(()=>({...Sr,equal:vr,value:void 0}))(),zr=Symbol("node");var Vr,jr,Jr,Hr,Zr,qr,Br,Yr,Gr,Kr,Qr;jr=Vr||(Vr={}),Jr=zr,Hr=new WeakSet,jr.isState=t=>"object"==typeof t&&mr(Hr,t),jr.State=class{constructor(t,e={}){fr(this,Hr),gr(this,Jr);const i=function(t){const e=Object.create(Rr);e.value=t;const i=()=>($r(e),e.value);return i[_r]=e,i}(t),n=i[_r];if(this[zr]=n,n.wrapper=this,e){const t=e.equals;t&&(n.equal=t),n.watched=e[jr.subtle.watched],n.unwatched=e[jr.subtle.unwatched]}}get(){if(!(0,jr.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Wr.call(this[zr])}set(t){if(!(0,jr.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(wr)throw new Error("Writes to signals not permitted during Watcher callback");Lr(this[zr],t)}},Zr=zr,qr=new WeakSet,jr.isComputed=t=>"object"==typeof t&&mr(qr,t),jr.Computed=class{constructor(t,e){fr(this,qr),gr(this,Zr);const i=function(t){const e=Object.create(Ur);e.computation=t;const i=()=>Mr(e);return i[_r]=e,i}(t),n=i[_r];if(n.consumerAllowSignalWrites=!0,this[zr]=n,n.wrapper=this,e){const t=e.equals;t&&(n.equal=t),n.watched=e[jr.subtle.watched],n.unwatched=e[jr.subtle.unwatched]}}get(){if(!(0,jr.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Mr(this[zr])}},(Br=jr.subtle||(jr.subtle={})).untrack=function(t){let e,i=null;try{i=kr(null),e=t()}finally{kr(i)}return e},Br.introspectSources=function(t){var e;if(!(0,jr.isComputed)(t)&&!(0,jr.isWatcher)(t))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(e=t[zr].producerNode)?void 0:e.map(t=>t.wrapper))??[]},Br.introspectSinks=function(t){var e;if(!(0,jr.isComputed)(t)&&!(0,jr.isState)(t))throw new TypeError("Called introspectSinks without a Signal argument");return(null==(e=t[zr].liveConsumerNode)?void 0:e.map(t=>t.wrapper))??[]},Br.hasSinks=function(t){if(!(0,jr.isComputed)(t)&&!(0,jr.isState)(t))throw new TypeError("Called hasSinks without a Signal argument");const e=t[zr].liveConsumerNode;return!!e&&e.length>0},Br.hasSources=function(t){if(!(0,jr.isComputed)(t)&&!(0,jr.isWatcher)(t))throw new TypeError("Called hasSources without a Computed or Watcher argument");const e=t[zr].producerNode;return!!e&&e.length>0},Yr=zr,Gr=new WeakSet,Kr=new WeakSet,Qr=function(t){for(const e of t)if(!(0,jr.isComputed)(e)&&!(0,jr.isState)(e))throw new TypeError("Called watch/unwatch without a Computed or State argument")},jr.isWatcher=t=>mr(Gr,t),Br.Watcher=class{constructor(t){fr(this,Gr),fr(this,Kr),gr(this,Yr);let e=Object.create(Sr);e.wrapper=this,e.consumerMarkedDirty=t,e.consumerIsAlwaysLive=!0,e.consumerAllowSignalWrites=!1,e.producerNode=[],this[zr]=e}watch(...t){if(!(0,jr.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");pr(this,Kr,Qr).call(this,t);const e=this[zr];e.dirty=!1;const i=kr(e);for(const e of t)$r(e[zr]);kr(i)}unwatch(...t){if(!(0,jr.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");pr(this,Kr,Qr).call(this,t);const e=this[zr];Dr(e);for(let i=e.producerNode.length-1;i>=0;i--)if(t.includes(e.producerNode[i].wrapper)){Nr(e.producerNode[i],e.producerIndexOfThis[i]);const t=e.producerNode.length-1;if(e.producerNode[i]=e.producerNode[t],e.producerIndexOfThis[i]=e.producerIndexOfThis[t],e.producerNode.length--,e.producerIndexOfThis.length--,e.nextProducerIndex--,i<e.producerNode.length){const t=e.producerIndexOfThis[i],n=e.producerNode[i];Ar(n),n.liveConsumerIndexOfThis[t]=i}}}getPending(){if(!(0,jr.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[zr].producerNode.filter(t=>t.dirty).map(t=>t.wrapper)}},Br.currentComputed=function(){var t;return null==(t=yr)?void 0:t.wrapper},Br.watched=Symbol("watched"),Br.unwatched=Symbol("unwatched"),Symbol("SignalWatcherBrand"),new FinalizationRegistry(({watcher:t,signal:e})=>{t.unwatch(e)}),new WeakMap;class Xr{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const{I:to}=at,eo=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),eo(t,e);return!0},io=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},no=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),oo(e)}};function so(t){void 0!==this._$AN?(io(this),this._$AM=t,no(this)):this._$AM=t}function ro(t,e=!1,i=0){const n=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(n))for(let t=i;t<n.length;t++)eo(n[t],!1),io(n[t]);else null!=n&&(eo(n,!1),io(n));else eo(this,t)}const oo=t=>{2==t.type&&(t._$AP??=ro,t._$AQ??=so)};class ao extends Xr{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),no(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(eo(this,t),io(this))}setValue(t){if((()=>void 0===this._$Ct.strings)())this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const lo=(ho=class extends ao{_$Sl(){if(void 0!==this._$Su)return;this._$SW=new Vr.Computed(()=>{var t;return null===(t=this._$Sj)||void 0===t?void 0:t.get()});const t=this._$Su=new Vr.subtle.Watcher(()=>{var e;null===(e=this._$SO)||void 0===e||e._(this),t.watch()});t.watch(this._$SW)}_$Sp(){var t;void 0!==this._$Su&&(this._$Su.unwatch(this._$SW),this._$SW=void 0,this._$Su=void 0,null===(t=this._$SO)||void 0===t||t.m(this))}commit(){this.setValue(Vr.subtle.untrack(()=>{var t;return null===(t=this._$SW)||void 0===t?void 0:t.get()}))}render(t){return Vr.subtle.untrack(()=>t.get())}update(t,[e]){var i,n;return null!==(i=this._$SO)&&void 0!==i||(this._$SO=null===(n=t.options)||void 0===n?void 0:n.host),e!==this._$Sj&&void 0!==this._$Sj&&this._$Sp(),this._$Sj=e,this._$Sl(),Vr.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$Sl()}},(...t)=>({_$litDirective$:ho,values:t})),co=t=>(e,...i)=>t(e,...i.map(t=>t instanceof Vr.State||t instanceof Vr.Computed?lo(t):t));var ho;co(J),co(H),Vr.State,Vr.Computed;class uo{constructor(){this._weatherSignal=new Vr.State(void 0,void 0)}get weatherSignal(){return this._weatherSignal}updateWeatherSignal(t){this._weatherSignal.set(void 0),this._weatherSignal.set(t)}}const go=new uo,mo=go.weatherSignal;function fo(t){go.updateWeatherSignal(t)}class po extends Jt{constructor(t,e={}){super(t,"background-image-controller"),this.backgroundImageManager=new Wt,this.currentWeather=xt.All,this._currentImageUrl="",this._previousImageUrl="",this._isTransitioning=!1,this._fetchingImageUrls=!1,this.config=e,this.setupWeatherWatcher()}setWeatherSignalProvider(t){this.weatherSignalProvider=t,this.weatherWatcher&&(this.weatherWatcher.unwatch(mo),this.weatherSignalProvider&&this.weatherWatcher.unwatch(this.weatherSignalProvider.weatherSignal)),this.setupWeatherWatcher()}setupWeatherWatcher(){this.weatherWatcher=new Vr.subtle.Watcher(async()=>{var t;await 0;const e=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:mo,i=e.get();void 0!==i&&(this.updateWeather(i||xt.All),this.logger.info("New signal for weather:",i),null===(t=this.weatherWatcher)||void 0===t||t.watch(e))})}onHostConnected(){var t;const e=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:mo;null===(t=this.weatherWatcher)||void 0===t||t.watch(e),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){var t;const e=this.weatherSignalProvider?this.weatherSignalProvider.weatherSignal:mo;null===(t=this.weatherWatcher)||void 0===t||t.unwatch(e),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(t){const e={...this.config};this.config={...this.config,...t},$t.info("Update the BackgroundImageController with new configuration");const i=this.isInitialized;e.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{i&&this.fetchNewImageAsync(this.currentWeather).catch(t=>this.logger.error("Error fetching image after reinitialization:",t))}).catch(t=>this.logger.error("Error during BackgroundImageManager initialization:",t)):e.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:t,...e}=this.config.imageSourceConfig||{},i=e.imageSourceId?e:{imageSourceId:"picsum"};if(this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${i.imageSourceId||"default"}`),!this.backgroundImageManager.initialize(i))return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(t){this.logger.error("Error fetching image URLs:",t)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const t=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${t/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(t){this.logger.error("Error in image rotation interval:",t)}})()},t)}async fetchNewImageAsync(t){try{let e=t,i=function(){const t=(new Date).getHours();return t>=5&&t<9||t>=17&&t<21?It.SunriseSunset:t>=9&&t<17?It.Day:t>=21||t<5?It.Night:It.Unspecified}();const n=await this.backgroundImageManager.getNextImageUrlAsync(e,i);if(n){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${n}`);const t=new Image;t.onload=()=>{this.logger.debug(`New image loaded successfully: ${n}`),this._currentImageUrl&&(this._previousImageUrl=this._currentImageUrl,this._isTransitioning=!0,this.host.requestUpdate(),setTimeout(()=>{if(this.logger.debug("Starting transition"),this.host instanceof HTMLElement&&this.host.shadowRoot){const t=this.host.shadowRoot.querySelector(".background-container");t?(t.classList.add("active-transition"),this.logger.debug("Added active-transition class to container"),setTimeout(()=>{t.classList.contains("active-transition")&&t.classList.remove("active-transition"),this._isTransitioning=!1,this.host.requestUpdate(),this.logger.debug("Transition completed")},1e3)):this.logger.error("Could not find background container element")}else this.logger.error("Could not access shadow root")},50)),this._currentImageUrl=n,this._previousImageUrl||(this._isTransitioning=!1,this.host.requestUpdate())},t.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${n}`)},t.src=n}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(t){this.logger.error("Error fetching new dynamic image:",t)}}updateWeather(t){this.isInitialized?this.currentWeather!==t&&(this.logger.info(`Updating weather condition to: ${t}`),this.currentWeather=t,this.fetchNewImageAsync(t).catch(t=>this.logger.error("Error fetching image after weather update:",t))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=t,this.fetchNewImageAsync(t).catch(t=>this.logger.error("Error fetching image after initialization:",t))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}get isTransitioning(){return this._isTransitioning}}var vo=function(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let yo=class extends ht{constructor(){super(),this.backgroundOpacity=.5,this.logger=kt("background-image-component"),this.backgroundImageController=new po(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(t){var e;super.updated(t),t.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(e=this.config)&&void 0!==e?e:{}))}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}get isTransitioning(){return this.backgroundImageController.isTransitioning}render(){const t=this.currentImageUrl,e=this.previousImageUrl,i=this.isTransitioning;return J`
            <div class="background-container ${i?"transitioning":""}">
                ${t?J`

                        ${i&&e?J`
                                <img class="background-image previous" src="${e}" >
                            `:""}
                        <img class="background-image" src="${t}">
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
    `,vo([ft({type:Number})],yo.prototype,"backgroundOpacity",void 0),vo([ft({type:Object})],yo.prototype,"config",void 0),yo=vo([dt("ha-background-image")],yo);class wo{static getInstance(){return wo.instance||(wo.instance=new wo),wo.instance}constructor(){this.providers=new Map}register(t){this.providers.has(t.id)&&$t.warn(`Weather provider with ID ${t.id} is already registered. Overwriting.`),this.providers.set(t.id,t)}getProvider(t){return this.providers.get(t)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(t){return this.providers.has(t)}}const bo=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(t){if(!t.apiKey)throw new Error("OpenWeatherMap API key is required");const e=t.latitude||50.0755,i=t.longitude||14.4378,n=t.units||"metric",s=t.language||"cs";try{const r=`https://api.openweathermap.org/data/2.5/forecast?lat=${e}&lon=${i}&units=${n}&lang=${s}&appid=${t.apiKey}`;$t.debug("[OpenWeatherMap] "+r);const o=await fetch(r);if(!o.ok)throw new Error(`OpenWeatherMap API error: ${o.statusText}`);const a=await o.json();if(!a.list||!a.list.length)throw new Error("No forecast data available");const l=a.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},u=new Map;return a.list.forEach(t=>{var e;const i=new Date(1e3*t.dt).toISOString().split("T")[0];u.has(i)||u.set(i,[]),null===(e=u.get(i))||void 0===e||e.push(t)}),{current:h,daily:Array.from(u.entries()).map(([t,e])=>{const i=e.map(t=>t.main.temp),n=Math.min(...i),s=Math.max(...i),r=e[Math.floor(e.length/2)]||e[0],o=e.filter(t=>void 0!==t.pop).map(t=>t.pop),a=o.length>0?o.reduce((t,e)=>t+e,0)/o.length*100:0;return{date:new Date(t),temperatureMin:n,temperatureMax:s,condition:r.weather[0].description,icon:this.getIconUrl(r.weather[0].icon),precipitation:a,humidity:r.main.humidity,windSpeed:r.wind.speed}})}}catch(t){throw $t.error("Error fetching weather data from OpenWeatherMap:",t),t}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"cs"}}getIconUrl(t){return`https://openweathermap.org/img/wn/${t}@2x.png`}getWindDirection(t){return["N","NE","E","SE","S","SW","W","NW"][Math.round(t/45)%8]}mapWeatherCondition(t){let e;switch($t.debug(`[OpenWeatherMap] Mapping weather condition: ${t}`),t.toLowerCase()){case"clear":case"clear sky":e=xt.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":e=xt.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":e=xt.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":e=xt.Rain;break;case"tornado":case"windy":case"all":default:e=xt.All;break;case"snow":e=xt.Snow}return $t.debug(`[OpenWeatherMap] Mapped to Weather enum: ${e}`),e}},_o=wo.getInstance();_o.register(bo);class ko extends Jt{constructor(t,e={}){super(t,"weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this.config={},this.config=e}setWeatherSignalProvider(t){this._weatherSignalProvider=t}onHostConnected(){this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0)}async updateConfigAsync(t){this.logger.debug("Updating WeatherController config:",t);const e=this.config.showWeather,i=this.config.weatherUpdateInterval;this.config={...this.config,...t},i!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),!e&&this.config.showWeather?await this.fetchWeatherDataAsync():this.config.showWeather||(this._weatherSignalProvider?this._weatherSignalProvider.updateWeatherSignal(xt.All):fo(xt.All)),this.host.requestUpdate()}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let t=this.config.weatherUpdateInterval||1800;t=Math.max(t,60);const e=1e3*t;this.logger.debug(`Setting weather update interval to ${t} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(t){this.logger.error("Error in weather update interval:",t)}})()},e)}async fetchWeatherDataAsync(){var t,e,i,n;if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const r=this.config.weatherProvider||"openweathermap",o=(s=r,_o.getProvider(s));if(!o)throw new Error(`Weather provider '${r}' not found`);let a=o.getDefaultConfig();this.config.weatherConfig&&(a={...a,...this.config.weatherConfig},this.config.weatherConfig.units&&(a.units=this.config.weatherConfig.units,this.logger.debug(`Using weather units: ${a.units}`))),this._weatherData=await o.fetchWeatherAsync(a),this._weatherData&&(this._weatherSignalProvider?this._weatherSignalProvider.updateWeatherSignal(null!==(e=null===(t=this._weatherData.current)||void 0===t?void 0:t.conditionUnified)&&void 0!==e?e:xt.All):fo(null!==(n=null===(i=this._weatherData.current)||void 0===i?void 0:i.conditionUnified)&&void 0!==n?n:xt.All)),this.logger.info(`Fetched weather data from ${o.name}:`,this._weatherData)}catch(t){this._weatherError=!0,this._weatherErrorMessage=t instanceof Error?t.message:String(t),this.logger.error("Error fetching weather data:",t)}finally{this._weatherLoading=!1,this.host.requestUpdate()}var s}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}get weatherSignalProvider(){return this._weatherSignalProvider}}var So=function(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let $o=class extends ht{constructor(){super(),this.logger=kt("weather-component"),this.weatherController=new ko(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval})}get controller(){return this.weatherController}updated(t){if(super.updated(t),t.has("showWeather")||t.has("weatherProvider")||t.has("weatherConfig")||t.has("weatherDisplayMode")||t.has("weatherForecastDays")||t.has("weatherTitle")||t.has("weatherUpdateInterval")){this.logger.debug("Weather properties changed, updating WeatherController");const t={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval};this.weatherController.updateConfigAsync(t)}}translateWeatherCondition(t){const e=this.language||"cs",i=function(t,e,i=t){if(!Vt().includes(e))return null!==i?i:t;const n=zt[e];if(!n)return null!==i?i:t;const s=function(t,e){if(void 0!==t[e])return t[e];const i=e.split(".");let n=t;for(const t of i){if(null==n||"object"!=typeof n)return;n=n[t]}return n}(n,t);return"string"==typeof s?s:null!==i?i:t}(`conditions.${t.toLowerCase().replace(/ /g,"_")}`,e,null);return null!==i?i:t}formatForecastDate(t){return jt(t,this.language||"cs",{weekday:"short"})}get weatherData(){const t=this.weatherController.weatherData;return t&&t.current&&t.current.conditionUnified&&(this.weatherController.weatherSignalProvider?this.weatherController.weatherSignalProvider.updateWeatherSignal(t.current.conditionUnified):fo(t.current.conditionUnified)),t}render(){const t=this.weatherController.weatherData;if(this.weatherController.hasError)return J`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!t)return J`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;const e=this.weatherDisplayMode||"both",i=this.weatherForecastDays||3,n=this.weatherTitle||"Weather",s=Math.min(i,t.daily.length);return J`
            <div class="weather-container" style="color: ${this.fontColor};">
                <div class="weather-title" style="color: ${this.fontColor};">${n}</div>

                ${"current"===e||"both"===e?J`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${t.current.icon}"
                                     alt="${t.current.condition}">
                                <div class="weather-temp">${Math.round(t.current.temperature)}°</div>
                            </div>
                            <div class="weather-condition">
                                ${this.translateWeatherCondition(t.current.condition)}
                            </div>
                        </div>
                    `:""}

                ${"forecast"===e||"both"===e?J`
                        <div class="weather-forecast">
                            ${t.daily.slice(0,s).map(t=>J`
                                <div class="forecast-day">
                                    <div class="forecast-date">${this.formatForecastDate(t.date)}</div>
                                    <img class="forecast-icon" src="${t.icon}" alt="${t.condition}">
                                    <div class="forecast-temp">${Math.round(t.temperatureMin)}° -
                                        ${Math.round(t.temperatureMax)}°
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
    `,So([ft({type:Boolean})],$o.prototype,"showWeather",void 0),So([ft({type:String})],$o.prototype,"weatherProvider",void 0),So([ft({type:Object})],$o.prototype,"weatherConfig",void 0),So([ft({type:String})],$o.prototype,"weatherDisplayMode",void 0),So([ft({type:Number})],$o.prototype,"weatherForecastDays",void 0),So([ft({type:String})],$o.prototype,"weatherTitle",void 0),So([ft({type:Number})],$o.prototype,"weatherUpdateInterval",void 0),So([ft({type:String})],$o.prototype,"fontColor",void 0),So([ft({type:String})],$o.prototype,"language",void 0),$o=So([dt("ha-weather")],$o);class Co{static getInstance(){return Co.instance||(Co.instance=new Co),Co.instance}constructor(){this.providers=new Map}register(t){this.providers.has(t.id)&&$t.warn(`Transportation provider with ID ${t.id} is already registered. Overwriting.`),this.providers.set(t.id,t)}getProvider(t){return this.providers.get(t)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(t){return this.providers.has(t)}}const Io=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(t,e){try{if(0===e.length)throw new Error("No stops configured");const i={};for(const t of e){const e=String(t.stopId);i[e]||(i[e]=[]),i[e].push(t)}const n=[];for(const e of Object.keys(i)){const s=i[e],r=s.map(t=>t.postId),o=`https://dpmbinfo.dpmb.cz/api/departures?stopid=${e}`,a=`https://api.allorigins.win/raw?url=${encodeURIComponent(o)}`,l=await fetch(a,{headers:{"User-Agent":"cz.dpmb.dpmbinfo/4.1.3 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!l.ok)throw new Error(`Failed to fetch transportation data: ${l.status} ${l.statusText}`);const c=await l.json();if(c.Error)throw new Error(`API error: ${c.Error}`);for(const i of r){const r=c.PostList.find(t=>t.PostID===i);if(!r){$t.warn(`No platform found with postId ${i} for stopId ${e}`);continue}const o=r.Name,a=s.find(t=>t.postId===i);if(!a)continue;const l=a.name||o,h=t.maxDepartures||2,u=r.Departures.slice(0,Math.min(h,5)).map(t=>({lineId:t.LineId||t.Line,lineName:t.Line||t.LineName,finalStop:t.FinalStop,isLowFloor:t.IsLowFloor,timeMark:t.TimeMark,stopName:l,postId:i}));n.push(...u)}}return{departures:n,loading:!1}}catch(t){return $t.error("Error fetching transportation data:",t),{departures:[],error:t instanceof Error?t.message:String(t),loading:!1}}}getDefaultConfig(){return{}}},xo=Co.getInstance();xo.register(Io);class Oo extends Jt{constructor(t,e={}){super(t,"transportation-controller"),this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this.config={},this.config=e}onHostConnected(){var t;this.config.transportation&&!1!==this.config.enableTransportation&&!(null===(t=this.config.transportation)||void 0===t?void 0:t.onDemand)&&(this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval())}onHostDisconnected(){this.clearTimers()}updateConfig(t){var e;this.logger.debug("Updating TransportationController config:",t);const i={...this.config};this.config={...this.config,...t},this.clearTimers(),this.config.transportation&&!1!==this.config.enableTransportation&&!(null===(e=this.config.transportation)||void 0===e?void 0:e.onDemand)?((!i.transportation||!this.config.transportation||JSON.stringify(i.transportation)!==JSON.stringify(this.config.transportation)||i.enableTransportation!==this.config.enableTransportation)&&this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval()):this._transportationDataLoaded=!1,this.host.requestUpdate()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.enableTransportation)return;let t=this.config.transportationUpdateInterval||60;t=Math.max(t,60);const e=1e3*t;this.logger.debug(`Setting transportation update interval to ${t} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(t){this.logger.error("Error in transportation update interval:",t)}})()},e)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0)}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.enableTransportation){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const e=this.config.transportation;e.provider||(e.provider="idsjmk");const i=(t=e.provider,xo.getProvider(t));if(!i)throw new Error(`Transportation provider '${e.provider}' not found`);const n=e.stops.map(t=>({stopId:t.stopId,postId:t.postId,name:t.name})),s=e.providerConfig||{};void 0!==e.maxDepartures&&(s.maxDepartures=e.maxDepartures),this._transportationData=await i.fetchTransportationAsync(s,n),this._lastTransportationUpdate=new Date,this.logger.debug(`Fetched transportation data from ${i.name}:`,this._transportationData)}catch(t){this.logger.error("Error fetching transportation data:",t),this._transportationData={departures:[],error:t instanceof Error?t.message:String(t),loading:!1}}var t;this.host.requestUpdate()}}async handleTransportationClick(){var t;if(this.logger.debug("Transportation button clicked, loading data on demand"),await this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(t=this.config.transportation)||void 0===t?void 0:t.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let t=this.config.transportation.autoHideTimeout||5;t=Math.max(1,Math.min(10,t));const e=60*t*1e3;this.logger.debug(`Setting transportation auto-hide timeout to ${t} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.debug(`Auto-hiding transportation departures after ${t} minutes`),this._transportationDataLoaded=!1,this.host.requestUpdate()},e)}this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get lastTransportationUpdate(){return this._lastTransportationUpdate}}var No=function(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let To=class extends ht{constructor(){super(),this.enableTransportation=!0,this.logger=kt("transportation-component"),this.transportationController=new Oo(this,{transportation:this.transportation,transportationUpdateInterval:this.transportationUpdateInterval,enableTransportation:this.enableTransportation})}get controller(){return this.transportationController}updated(t){super.updated(t),(t.has("transportation")||t.has("transportationUpdateInterval")||t.has("enableTransportation"))&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation,transportationUpdateInterval:this.transportationUpdateInterval,enableTransportation:this.enableTransportation}))}render(){var t;if(!this.transportation||!1===this.enableTransportation)return J``;const e=this.transportationController.transportationData,i=this.transportationController.transportationDataLoaded;return J`
            ${(null===(t=this.transportation)||void 0===t?void 0:t.onDemand)&&!i?J`
                    <div class="transportation-on-demand-button"
                         @click=${this._handleTransportationClickAsync}>
                        <svg viewBox="0 0 24 24">
                            <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
                        </svg>
                    </div>`:J`
                    <div class="transportation-container" style="color: ${this.fontColor};">
                        ${this.renderTransportationContent(e)}
                    </div>`}
        `}renderTransportationContent(t){if(t.loading)return J`
                <div>Loading transportation data...</div>`;if(t.error)return J`
                <div class="transportation-error">${t.error}</div>`;if(!t.departures||0===t.departures.length)return J`
                <div>No departures available</div>`;const e={};for(const i of t.departures){const t=`${i.stopName}-${i.postId}`;e[t]||(e[t]=[]),e[t].push(i)}return J`
            <div class="transportation-departures">
                ${Object.entries(e).map(([t,e])=>{const i=e[0].stopName;return J`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.fontColor};">
                                ${i}
                            </h3>
                            <div class="stop-departures">
                                ${e.map(t=>J`
                                    <div class="departure-item">
                                        <div class="departure-line" style="color: ${this.fontColor};">
                                            ${t.lineName}
                                        </div>
                                        <div class="departure-destination" style="color: ${this.fontColor};">→
                                            ${t.finalStop}
                                        </div>
                                        <div class="departure-time" style="color: ${this.fontColor};">
                                            ${t.timeMark}
                                        </div>
                                        ${t.isLowFloor?J`
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
    `,No([ft({type:Object})],To.prototype,"transportation",void 0),No([ft({type:Number})],To.prototype,"transportationUpdateInterval",void 0),No([ft({type:Boolean})],To.prototype,"enableTransportation",void 0),No([ft({type:String})],To.prototype,"fontColor",void 0),No([ft({type:Object})],To.prototype,"hass",void 0),To=No([dt("ha-transportation")],To),(Mo=Do||(Do={})).language="language",Mo.system="system",Mo.comma_decimal="comma_decimal",Mo.decimal_comma="decimal_comma",Mo.space_comma="space_comma",Mo.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Ao||(Ao={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var Fo=function(t,e,i,n){n=n||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,t.dispatchEvent(s),s};new Set(["call-service","divider","section","weblink","cast","select"]);var Eo=function(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let Po=class extends ht{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._timeFormatOptions={hour12:[{value:!0,label:"12-hour"},{value:!1,label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._languageOptions=[],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback(),this._languageOptions=Lt.map(t=>({value:t.code,label:t.label}))}_getTransportationProviderOptions(){return[...xo.getAllProviders().map(t=>({value:t.id,label:t.name}))]}setConfig(t){const e=t,i=e.imageSource||"none";let n={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(n={...n,...e.timeFormat},void 0===e.timeFormat.second&&(n.second=void 0)),this._config={...e,timeFormat:n,dateFormat:e.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:i,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",showWeather:void 0!==e.showWeather&&e.showWeather,weatherProvider:e.weatherProvider||"openweathermap",weatherConfig:e.weatherConfig||{},weatherDisplayMode:e.weatherDisplayMode||"both",weatherForecastDays:e.weatherForecastDays||3,transportation:e.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops()}_loadSensors(){var t;(null===(t=this._config)||void 0===t?void 0:t.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var t;(null===(t=this._config)||void 0===t?void 0:t.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadBackgroundImages(){var t;(null===(t=this._config)||void 0===t?void 0:t.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,Fo(this,"config-changed",{config:t})}}_removeSensor(t){if(this._sensors=this._sensors.filter((e,i)=>i!==t),this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,Fo(this,"config-changed",{config:t})}}_sensorChanged(t,e,i){if(this._sensors=this._sensors.map((n,s)=>s===t?{...n,[e]:i}:n),this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,Fo(this,"config-changed",{config:t})}}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this._config){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],this._config=t,Fo(this,"config-changed",{config:t})}}_removeStop(t){if(this._stops=this._stops.filter((e,i)=>i!==t),this._config&&this._config.transportation){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],0===this._stops.length&&(t.transportation=void 0),this._config=t,Fo(this,"config-changed",{config:t})}}_stopChanged(t,e,i){if(this._stops=this._stops.map((n,s)=>s===t?{...n,[e]:i}:n),this._config&&this._config.transportation){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],this._config=t,Fo(this,"config-changed",{config:t})}}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:xt.All,timeOfDay:It.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(t){this._backgroundImages=this._backgroundImages.filter((e,i)=>i!==t),this._updateBackgroundImagesConfig()}_updateBackgroundImage(t,e){this._backgroundImages=this._backgroundImages.map((i,n)=>{if(n===t){const t={...i,...e};if(e.url&&t.url){if(t.weather===xt.All){const e=Tt(t.url,Ot);e&&(t.weather=e,$t.debug(`Auto-detected weather: ${t.weather} from URL: ${t.url}`))}if(t.timeOfDay===It.Unspecified){const e=Tt(t.url,Nt);e&&(t.timeOfDay=e,$t.debug(`Auto-detected timeOfDay: ${t.timeOfDay} from URL: ${t.url}`))}}return t}return i}),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this._config){const t=JSON.parse(JSON.stringify(this._config));t.backgroundImages=[...this._backgroundImages],this._config=t,Fo(this,"config-changed",{config:t})}}static get styles(){return o`
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
        `}render(){var t,e,i,n,s,r,o,a,l,c,h,u,d,g,m,f,p,v,y,w,b,_,k,S,$,C;if(!this.hass||!this._config)return J``;const I=Object.keys(this.hass.states).sort();return J`
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
                                        @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.fontColor=e.value||"#FFFFFF",this._config=i,Fo(this,"config-changed",{config:i})}}
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
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.language=e.value||"cs",this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._languageOptions.map(t=>J`
                                                <mwc-list-item .value=${t.value}>${t.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Log Level</div>
                            <div class="value">
                                <ha-select
                                        label="Log Level"
                                        .value=${this._config.logLevel||"info"}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.logLevel=e.value||"warn",this._config=i,Fo(this,"config-changed",{config:i})}}
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
                                        .value=${(null===(t=this._config.timeFormat)||void 0===t?void 0:t.hour12)?"true":"false"}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour12:"true"===e.value},this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.hour12.map(t=>J`
                                                <mwc-list-item .value=${String(t.value)}>${t.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Hour Display</div>
                            <div class="value">
                                <ha-select
                                        label="Hour Display"
                                        .value=${(null===(e=this._config.timeFormat)||void 0===e?void 0:e.hour)||"2-digit"}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour:e.value},this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.hour.map(t=>J`
                                                <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Minute Display</div>
                            <div class="value">
                                <ha-select
                                        label="Minute Display"
                                        .value=${(null===(i=this._config.timeFormat)||void 0===i?void 0:i.minute)||"2-digit"}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,minute:e.value},this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.minute.map(t=>J`
                                                <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Second Display</div>
                            <div class="value">
                                <ha-select
                                        label="Second Display"
                                        .value=${void 0===(null===(n=this._config.timeFormat)||void 0===n?void 0:n.second)?"undefined":null===(s=this._config.timeFormat)||void 0===s?void 0:s.second}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,second:"undefined"===e.value?"hidden":e.value},this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.second.map(t=>J`
                                                <mwc-list-item
                                                        .value=${void 0===t.value?"undefined":t.value}>
                                                    ${t.label}
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
                                        .value=${(null===(r=this._config.dateFormat)||void 0===r?void 0:r.weekday)||"long"}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,weekday:"undefined"===e.value?"hidden":e.value},this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.weekday.map(t=>J`
                                                <mwc-list-item
                                                        .value=${void 0===t.value?"undefined":t.value}>
                                                    ${t.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Month Display</div>
                            <div class="value">
                                <ha-select
                                        label="Month Display"
                                        .value=${(null===(o=this._config.dateFormat)||void 0===o?void 0:o.month)||"long"}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,month:"undefined"===e.value?"hidden":e.value},this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.month.map(t=>J`
                                                <mwc-list-item
                                                        .value=${void 0===t.value?"undefined":t.value}>
                                                    ${t.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Day Display</div>
                            <div class="value">
                                <ha-select
                                        label="Day Display"
                                        .value=${void 0===(null===(a=this._config.dateFormat)||void 0===a?void 0:a.day)?"undefined":null===(l=this._config.dateFormat)||void 0===l?void 0:l.day}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,day:"undefined"===e.value?"hidden":e.value},this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.day.map(t=>J`
                                                <mwc-list-item
                                                        .value=${void 0===t.value?"undefined":t.value}>
                                                    ${t.label}
                                                </mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Year Display</div>
                            <div class="value">
                                <ha-select
                                        label="Year Display"
                                        .value=${void 0===(null===(c=this._config.dateFormat)||void 0===c?void 0:c.year)?"undefined":null===(h=this._config.dateFormat)||void 0===h?void 0:h.year}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,year:"undefined"===e.value?"hidden":e.value},this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.year.map(t=>J`
                                                <mwc-list-item
                                                        .value=${void 0===t.value?"undefined":t.value}>
                                                    ${t.label}
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
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageSource=e.value,i.useOnlineImages="none"!==e.value&&"local"!==e.value,this._config=i,Fo(this,"config-changed",{config:i})}}
                                >
                                    ${this._imageSourceOptions.map(t=>J`
                                                <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>`)}
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
                                        @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundOpacity="string"==typeof e.value?parseFloat(e.value):e.value,this._config=i,Fo(this,"config-changed",{config:i})}}
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
                                        @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundRotationInterval="string"==typeof e.value?parseInt(e.value,10):e.value,this._config=i,Fo(this,"config-changed",{config:i})}}
                                ></ha-slider>
                                <span>${this._config.backgroundRotationInterval||90} seconds</span>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                ${"local"===this._config.imageSource?J`
                    <!-- Background Images Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Local Background Images</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure local image URLs. Images will be automatically categorized by weather condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day (sunrise-sunset, day, night) in your file paths.
                            </div>

                            <div class="section-subheader">Background Images</div>

                            ${this._backgroundImages.map((t,e)=>J`
                                <div class="image-row">
                                    <div class="image-url">
                                        <ha-textfield
                                                label="Image URL"
                                                .value=${t.url||""}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const i=t.target;i&&this._updateBackgroundImage(e,{url:i.value||""})}}
                                        ></ha-textfield>
                                    </div>
                                    <div class="image-actions">
                                        <ha-icon-button
                                                .path=${"M19,13H5V11H19V13Z"}
                                                @click=${()=>this._removeBackgroundImage(e)}
                                        ></ha-icon-button>
                                    </div>
                                    <div class="image-weather">
                                        <ha-select
                                                label="Weather Condition"
                                                .value=${t.weather}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation()}}
                                                @selected=${t=>{t.stopPropagation(),t.preventDefault();const i=t.target;i&&this._updateBackgroundImage(e,{weather:i.value})}}
                                        >
                                            ${Object.values(xt).map(t=>J`
                                                <mwc-list-item .value=${t}>${t}</mwc-list-item>
                                            `)}
                                        </ha-select>
                                    </div>
                                    <div class="image-time">
                                        <ha-select
                                                label="Time of Day"
                                                .value=${t.timeOfDay}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation()}}
                                                @selected=${t=>{t.stopPropagation(),t.preventDefault();const i=t.target;i&&this._updateBackgroundImage(e,{timeOfDay:i.value})}}
                                        >
                                            ${Object.values(It).map(t=>J`
                                                <mwc-list-item .value=${t}>${t}</mwc-list-item>
                                            `)}
                                        </ha-select>
                                    </div>
                                </div>
                            `)}

                            <mwc-button @click=${this._addBackgroundImage}>Add Background Image</mwc-button>
                        </div>
                    </ha-expansion-panel>
                `:""}

                ${"unsplash"===this._config.imageSource?J`
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
                                            .value=${(null===(u=this._config.imageConfig)||void 0===u?void 0:u.category)||"nature"}
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.category=e.value||"nature",this._config=i,Fo(this,"config-changed",{config:i})}}
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
                                            .value=${(null===(d=this._config.imageConfig)||void 0===d?void 0:d.count)||"5"}
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={});let n=parseInt(e.value||"5",10);(isNaN(n)||n<1)&&(n=1),n>30&&(n=30),i.imageConfig.count=n,this._config=i,Fo(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="info-text">
                                An API key is required. Without a valid API key, the Unsplash image source will not work.
                            </div>

                            ${J`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="API Key"
                                                .value=${(null===(g=this._config.imageConfig)||void 0===g?void 0:g.apiKey)||""}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.apiKey=e.value||"",this._config=i,Fo(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${(null===(m=this._config.imageConfig)||void 0===m?void 0:m.contentFilter)||"high"}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.contentFilter=e.value||"high",this._config=i,Fo(this,"config-changed",{config:i})}}
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

                ${"sensor"===this._config.imageSource?J`
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
                                        .value=${(null===(f=this._config.imageConfig)||void 0===f?void 0:f.entity)||""}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.entity=e.value||"",this._config=i,Fo(this,"config-changed",{config:i})}}
                                    >
                                        ${I.filter(t=>t.startsWith("sensor.")).map(t=>J`
                                                <mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
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
                        ${this._sensors.map((t,e)=>J`
                            <div class="sensor-row">
                                <div class="sensor-entity">
                                    <ha-select
                                            label="Entity"
                                            .value=${t.entity||""}
                                            @click=${t=>{t.stopPropagation()}}
                                            @closed=${t=>{t.stopPropagation();const i=t.target;i&&this._sensorChanged(e,"entity",i.value||"")}}
                                    >
                                        ${I.map(t=>J`
                                                    <mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
                                    </ha-select>
                                </div>
                                <div class="sensor-label">
                                    <ha-textfield
                                            label="Label"
                                            .value=${t.label||""}
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const i=t.target;i&&this._sensorChanged(e,"label",i.value||"")}}
                                    ></ha-textfield>
                                </div>
                                <div class="sensor-actions">
                                    <ha-icon-button
                                            .path=${"M19,13H5V11H19V13Z"}
                                            @click=${()=>this._removeSensor(e)}
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
                                        @change=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.showWeather=e.checked||!1,this._config=i,Fo(this,"config-changed",{config:i})}}
                                ></ha-switch>
                                <span>Display weather forecast</span>
                            </div>
                        </div>

                        ${this._config.showWeather?J`
                            <div class="row">
                                <div class="label">Weather Title</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Title for weather section"
                                            .value=${this._config.weatherTitle||"Weather"}
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherTitle=e.value||"Weather",this._config=i,Fo(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Weather Provider</div>
                                <div class="value">
                                    <ha-select
                                            label="Provider"
                                            .value=${this._config.weatherProvider||"openweathermap"}
                                            @click=${t=>{t.stopPropagation()}}
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherProvider=e.value||"openweathermap",this._config=i,Fo(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherProviderOptions.map(t=>J`
                                                    <mwc-list-item .value=${t.value}>${t.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"openweathermap"===this._config.weatherProvider?J`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="OpenWeatherMap API Key"
                                                .value=${(null===(p=this._config.weatherConfig)||void 0===p?void 0:p.apiKey)||""}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},apiKey:e.value||""},this._config=i,Fo(this,"config-changed",{config:i})}}
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
                                                .value=${(null===(v=this._config.weatherConfig)||void 0===v?void 0:v.latitude)||50.0755}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},latitude:parseFloat(e.value||"50.0755")},this._config=i,Fo(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <ha-textfield
                                                label="Longitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${(null===(y=this._config.weatherConfig)||void 0===y?void 0:y.longitude)||14.4378}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},longitude:parseFloat(e.value||"14.4378")},this._config=i,Fo(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                            `:""}

                            ${"openweathermap"===this._config.weatherProvider?J`
                                <div class="row">
                                    <div class="label">Units</div>
                                    <div class="value">
                                        <ha-select
                                                label="Units"
                                                .value=${(null===(w=this._config.weatherConfig)||void 0===w?void 0:w.units)||"metric"}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},units:e.value||"metric"},this._config=i,Fo(this,"config-changed",{config:i})}}
                                        >
                                            ${this._unitsOptions.map(t=>J`
                                                        <mwc-list-item .value=${t.value}>${t.label}
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
                                            @click=${t=>{t.stopPropagation()}}
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherDisplayMode=e.value||"both",this._config=i,Fo(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherDisplayModeOptions.map(t=>J`
                                                    <mwc-list-item .value=${t.value}>${t.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"forecast"===this._config.weatherDisplayMode||"both"===this._config.weatherDisplayMode?J`
                                <div class="row">
                                    <div class="label">Forecast Days</div>
                                    <div class="value">
                                        <ha-slider
                                                min="1"
                                                max="7"
                                                step="1"
                                                pin
                                                .value=${this._config.weatherForecastDays||3}
                                                @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherForecastDays="string"==typeof e.value?parseInt(e.value,10):e.value,this._config=i,Fo(this,"config-changed",{config:i})}}
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
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));let n="string"==typeof e.value?parseInt(e.value,10):e.value;n=Math.max(n||30,1);const s=60*n;i.weatherUpdateInterval=s,this._config=i,Fo(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <span>minutes</span>
                                    </div>
                                </div>
                            `:""}
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===this._config.enableTransportation?J`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <div class="content">

                            <div class="row">
                                <div class="label">Transportation Provider</div>
                                <div class="value">
                                    <ha-select
                                            label="Provider"
                                            .value=${(null===(b=this._config.transportation)||void 0===b?void 0:b.provider)||"idsjmk"}
                                            @click=${t=>{t.stopPropagation()}}
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,provider:e.value||"idsjmk"},this._config=i,Fo(this,"config-changed",{config:i})}}
                                    >
                                        ${this._getTransportationProviderOptions().map(t=>J`
                                                    <mwc-list-item .value=${t.value}>${t.label}
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
                                            @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,maxDepartures:"string"==typeof e.value?parseInt(e.value,10):e.value},this._config=i,this._loadStops(),Fo(this,"config-changed",{config:i})}}
                                    ></ha-slider>
                                    <span>${(null===(k=this._config.transportation)||void 0===k?void 0:k.maxDepartures)||2} departures</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Show on Demand</div>
                                <div class="value">
                                    <ha-switch
                                            .checked=${!0===(null===(S=this._config.transportation)||void 0===S?void 0:S.onDemand)}
                                            @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,onDemand:e.checked},this._config=i,Fo(this,"config-changed",{config:i})}}
                                    ></ha-switch>
                                    <span>Only show departures when clicked</span>
                                </div>
                            </div>

                            ${!0===(null===($=this._config.transportation)||void 0===$?void 0:$.onDemand)?J`
                                <div class="row">
                                    <div class="label">Auto-Hide Timeout</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Auto-hide timeout in minutes (1-10)"
                                                type="number"
                                                min="1"
                                                max="10"
                                                .value=${(null===(C=this._config.transportation)||void 0===C?void 0:C.autoHideTimeout)||5}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let n="string"==typeof e.value?parseInt(e.value,10):e.value;n=Math.max(Math.min(n||5,10),1),i.transportation={...i.transportation,autoHideTimeout:n},this._config=i,Fo(this,"config-changed",{config:i})}}
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
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let n="string"==typeof e.value?parseInt(e.value,10):e.value;n=Math.max(n||1,1);const s=60*n;i.transportationUpdateInterval=s,this._config=i,Fo(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                    <span>minutes</span>
                                </div>
                            </div>

                            <div class="section-subheader">Stops</div>

                            ${this._stops.map((t,e)=>J`
                                <div class="sensor-row">
                                    <div class="sensor-entity">
                                        <ha-textfield
                                                label="Stop ID"
                                                type="number"
                                                .value=${t.stopId||1793}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const i=t.target;i&&this._stopChanged(e,"stopId",parseInt(i.value||"1793",10))}}
                                        ></ha-textfield>
                                    </div>
                                    <div class="sensor-label">
                                        <ha-textfield
                                                label="Post ID"
                                                type="number"
                                                .value=${t.postId||3}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const i=t.target;i&&this._stopChanged(e,"postId",parseInt(i.value||"3",10))}}
                                        ></ha-textfield>
                                    </div>
                                </div>
                                <div class="sensor-row" style="margin-bottom: 16px; padding-bottom: 16px;">
                                    <div class="sensor-entity" style="width: 100%;">
                                        <ha-textfield
                                                label="Stop Name (optional)"
                                                .value=${t.name||""}
                                                style="width: 100%;"
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const i=t.target;i&&this._stopChanged(e,"name",i.value||"")}}
                                        ></ha-textfield>
                                    </div>
                                    <div class="sensor-actions">
                                        <ha-icon-button
                                                .path=${"M19,13H5V11H19V13Z"}
                                                @click=${()=>this._removeStop(e)}
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
        `}};Eo([ft({type:Object})],Po.prototype,"hass",void 0),Eo([ft({type:Object})],Po.prototype,"_config",void 0),Eo([ft({type:Array})],Po.prototype,"_sensors",void 0),Eo([ft({type:Array})],Po.prototype,"_backgroundImages",void 0),Eo([ft({type:Array})],Po.prototype,"_stops",void 0),Po=Eo([dt("wall-clock-card-editor")],Po);var Uo=function(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let Wo=class extends ht{constructor(){super(),this.config={},this.consecutiveFailures=0,this.isRetrying=!1,this.clockComponent=document.createElement("ha-clock"),this.sensorComponent=document.createElement("ha-sensors"),this.weatherComponent=document.createElement("ha-weather"),this.backgroundImageComponent=document.createElement("ha-background-image"),this.transportationComponent=document.createElement("ha-transportation"),this.weatherSignalProvider=new uo,$t.info("%c WALL-CLOCK-CARD %c 2.0.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language,this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language,this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor}connectedCallback(){super.connectedCallback(),this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.weatherComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor,this.hass&&(this.transportationComponent.hass=this.hass),this.initConnectCallbackAsync()}async initConnectCallbackAsync(){await this.weatherComponent.controller.ready,await this.backgroundImageComponent.controller.ready,await this.clockComponent.controller.ready,await this.sensorComponent.controller.ready,await this.transportationComponent.controller.ready,bt({level:St(this.config.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1});try{await async function(){$t.debug("Loading all translations");const t=Vt().map(t=>async function(t){try{Rt[t]?(zt[t]=Rt[t],$t.debug(`Loaded translations for ${t}`)):$t.warn(`No embedded translations found for ${t}`)}catch(e){$t.error(`Error loading translations for ${t}: ${e}`)}}(t));await Promise.all(t)}(),$t.debug("Loaded translations for all languages")}catch(t){$t.error("Error loading translations:",t)}this.config.showWeather||this.weatherSignalProvider.updateWeatherSignal(xt.All)}initBackgroundImageComponent(){var t,e,i,n,s;const r={imageSourceId:this.config.imageSource||"picsum",backgroundImages:this.config.backgroundImages,entity:null===(t=this.config.imageConfig)||void 0===t?void 0:t.entity,apiKey:null===(e=this.config.imageConfig)||void 0===e?void 0:e.apiKey,contentFilter:null===(i=this.config.imageConfig)||void 0===i?void 0:i.contentFilter,category:null===(n=this.config.imageConfig)||void 0===n?void 0:n.category,count:null===(s=this.config.imageConfig)||void 0===s?void 0:s.count};this.backgroundImageComponent.backgroundOpacity=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5,this.backgroundImageComponent.config={imageSourceConfig:r,backgroundRotationInterval:this.config.backgroundRotationInterval},this.backgroundImageComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),$t.debug("Background image component initialized")}disconnectedCallback(){super.disconnectedCallback()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.initAfterSetConfigAsync(t)}async initAfterSetConfigAsync(t){const e=t.imageSource||"none";let i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};t.timeFormat&&(i={...i,...t.timeFormat},void 0!==t.timeFormat.hour12&&(i.hour12=Boolean(t.timeFormat.hour12)),void 0===t.timeFormat.second&&(i.second=void 0));let n={weekday:"long",year:"numeric",month:"long",day:"numeric"};t.dateFormat&&(n={...n,...t.dateFormat},void 0===t.dateFormat.year&&(n.year=void 0));let s=t.timeZone;!s&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(s=this.hass.config.time_zone),this.config={...t,timeFormat:i,dateFormat:n,backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:e,imageConfig:t.imageConfig||{},backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",timeZone:s},this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.weatherComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.transportationUpdateInterval=this.config.transportationUpdateInterval,this.transportationComponent.enableTransportation=!1!==this.config.enableTransportation,this.transportationComponent.fontColor=this.config.fontColor,this.config.showWeather||this.backgroundImageComponent.controller.ready.then(()=>{this.weatherSignalProvider.updateWeatherSignal(xt.All)})}updated(t){if(t.has("hass")&&this.hass&&(this.sensorComponent.hass=this.hass,this.transportationComponent.hass=this.hass),t.has("config")&&this.config){const t=this.config.logLevel||"info",e=St(t);$t.debug(`Updating log level to ${t} (${pt[e]})`),bt({level:e,prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}}static get styles(){return o`
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

        `}render(){return J`
            <ha-card style="color: ${this.config.fontColor};">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather?J`<div style="position: absolute; top: 16px; right: 16px; max-width: 40%; max-height: 60%; z-index: 3; padding-left: 8px;">
                            ${this.weatherComponent}
                        </div>`:""}
                <div style="${this.config.transportation&&!1!==this.config.enableTransportation?`margin-top: -${30*(this.config.transportation.maxDepartures||3)+80}px;`:""}">
                    ${this.clockComponent}
                </div>
                ${this.transportationComponent}
            </ha-card>
        `}};Uo([ft({type:Object})],Wo.prototype,"hass",void 0),Uo([ft({type:Object})],Wo.prototype,"config",void 0),Uo([ft({type:Number})],Wo.prototype,"consecutiveFailures",void 0),Uo([ft({type:Boolean})],Wo.prototype,"isRetrying",void 0),Wo=Uo([dt("wall-clock-card")],Wo),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;class n{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const o=this.t;if(e&&void 0===t){const e=void 0!==o&&1===o.length;e&&(t=i.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(o,t))}return t}toString(){return this.cssText}}const s=t=>new n("string"==typeof t?t:t+"",void 0,o),a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new n(i,t,o)},r=(o,i)=>{if(e)o.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,o.appendChild(i)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return s(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:g,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",y=m.reactiveElementPolyfillSupport,w=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},$=(t,e)=>!c(t,e),_={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const s=i?.call(this);n?.call(this,e),this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[...g(t),...u(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:b).toAttribute(e,o.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const s=n.fromAttribute(e,t.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){const i=this.constructor,n=this[t];if(o??=i.getPropertyOptions(t),!((o.hasChanged??$)(n,e)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:n},s){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[w("elementProperties")]=new Map,C[w("finalized")]=new Map,y?.({ReactiveElement:C}),(m.reactiveElementVersions??=[]).push("2.1.1");const x=globalThis,k=x.trustedTypes,I=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+S,D=`<${O}>`,N=document,P=()=>N.createComment(""),F=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,E="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,M=/>/g,B=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,z=/^(?:script|style|textarea|title)$/i,W=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),H=W(1),V=(W(2),W(3),Symbol.for("lit-noChange")),J=Symbol.for("lit-nothing"),q=new WeakMap,K=N.createTreeWalker(N,129);function Z(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==I?I.createHTML(e):e}const G=(t,e)=>{const o=t.length-1,i=[];let n,s=2===e?"<svg>":3===e?"<math>":"",a=U;for(let e=0;e<o;e++){const o=t[e];let r,l,c=-1,h=0;for(;h<o.length&&(a.lastIndex=h,l=a.exec(o),null!==l);)h=a.lastIndex,a===U?"!--"===l[1]?a=R:void 0!==l[1]?a=M:void 0!==l[2]?(z.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=B):void 0!==l[3]&&(a=B):a===B?">"===l[0]?(a=n??U,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?B:'"'===l[3]?j:L):a===j||a===L?a=B:a===R||a===M?a=U:(a=B,n=void 0);const d=a===B&&t[e+1].startsWith("/>")?" ":"";s+=a===U?o+D:c>=0?(i.push(r),o.slice(0,c)+A+o.slice(c)+S+d):o+S+(-2===c?e:d)}return[Z(t,s+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let n=0,s=0;const a=t.length-1,r=this.parts,[l,c]=G(t,e);if(this.el=Y.createElement(l,o),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&r.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(A)){const e=c[s++],o=i.getAttribute(t).split(S),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:a[2],strings:o,ctor:"."===a[1]?ot:"?"===a[1]?it:"@"===a[1]?nt:et}),i.removeAttribute(t)}else t.startsWith(S)&&(r.push({type:6,index:n}),i.removeAttribute(t));if(z.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=k?k.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],P()),K.nextNode(),r.push({type:2,index:++n});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===O)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)r.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const o=N.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,i){if(e===V)return e;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const s=F(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??N).importNode(e,!0);K.currentNode=i;let n=K.nextNode(),s=0,a=0,r=o[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new tt(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new st(n,this,t)),this._$AV.push(e),r=o[++a]}s!==r?.index&&(n=K.nextNode(),s++)}return K.currentNode=N,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),F(t)?t===J||null==t||""===t?(this._$AH!==J&&this._$AR(),this._$AH=J):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==J&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Y.createElement(Z(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const n of t)i===e.length?e.push(o=new tt(this.O(P()),this.O(P()),this,this.options)):o=e[i],o._$AI(n),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,n){this.type=1,this._$AH=J,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=J}_$AI(t,e=this,o,i){const n=this.strings;let s=!1;if(void 0===n)t=Q(this,t,e,0),s=!F(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const i=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=Q(this,i[o+a],e,a),r===V&&(r=this._$AH[a]),s||=!F(r)||r!==this._$AH[a],r===J?t=J:t!==J&&(t+=(r??"")+n[a+1]),this._$AH[a]=r}s&&!i&&this.j(t)}j(t){t===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===J?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==J)}}class nt extends et{constructor(t,e,o,i,n){super(t,e,o,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??J)===V)return;const o=this._$AH,i=t===J&&o!==J||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==J&&(o===J||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Y,tt),(x.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class lt extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=o?.renderBefore??null;i._$litPart$=n=new tt(e.insertBefore(P(),t),t,void 0,o??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}lt._$litElement$=!0,lt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:lt});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:lt}),(rt.litElementVersions??=[]).push("4.2.1");const ht=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},gt=(t=dt,e,o)=>{const{kind:i,metadata:n}=o;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,n,t)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];e.call(this,o),this.requestUpdate(i,n,t)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,o)=>"object"==typeof o?gt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}var pt;!function(t){t[t.DEBUG=0]="DEBUG",t[t.INFO=1]="INFO",t[t.WARN=2]="WARN",t[t.ERROR=3]="ERROR",t[t.NONE=4]="NONE"}(pt||(pt={}));const mt={level:pt.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let ft={...mt};const vt=[];function yt(t){const e=ft.level;ft={...mt,...t},e!==ft.level&&console.log(`[LOGGER] Log level changed from ${pt[e]} to ${pt[ft.level]}`)}function wt(t,e,o,...i){var n;if(t<ft.level)return;const s=function(t,e,o){const{prefix:i,enableTimestamps:n,enableSourceTracking:s}=ft;let a="";return n&&(a+=`[${(new Date).toISOString()}] `),a+=`[${pt[t]}] `,i&&(a+=`[${i}] `),e&&s&&(a+=`[${e}] `),a+=o,a}(t,e,o);if(ft.logToConsole)switch(t){case pt.DEBUG:console.debug(s,...i);break;case pt.INFO:console.log(s,...i);break;case pt.WARN:console.warn(s,...i);break;case pt.ERROR:console.error(s,...i)}if(ft.logToStorage){let t=s;if(i.length>0)try{t+=" "+i.map(t=>"object"==typeof t?JSON.stringify(t):String(t)).join(" ")}catch(e){t+=" [Arguments could not be stringified]"}vt.push(t);const e=null!==(n=ft.maxStoredLogs)&&void 0!==n?n:100;vt.length>e&&vt.splice(0,vt.length-e)}}function bt(t){return{debug:(e,...o)=>wt(pt.DEBUG,t,e,...o),info:(e,...o)=>wt(pt.INFO,t,e,...o),warn:(e,...o)=>wt(pt.WARN,t,e,...o),error:(e,...o)=>wt(pt.ERROR,t,e,...o),withSource:t=>bt(t)}}function $t(t){switch(t.toLowerCase()){case"debug":return pt.DEBUG;case"info":return pt.INFO;case"warn":default:return pt.WARN;case"error":return pt.ERROR;case"none":return pt.NONE}}const _t=bt("wall-clock");class Ct{static getInstance(){return Ct.instance||(Ct.instance=new Ct),Ct.instance}constructor(){this.sources=new Map}register(t){this.sources.has(t.id)&&_t.warn(`Image source with ID ${t.id} is already registered. Overwriting.`),this.sources.set(t.id,t)}registerAll(t){t.forEach(t=>this.register(t))}getSource(t){return this.sources.get(t)}getAllSources(){return Array.from(this.sources.values())}hasSource(t){return this.sources.has(t)}}var xt,kt;!function(t){t.Unspecified="unspecified",t.SunriseSunset="sunrise-sunset",t.Day="day",t.Night="night"}(xt||(xt={})),function(t){t.All="all",t.ClearSky="clear sky",t.Clouds="clouds",t.Rain="rain",t.Snow="snow",t.Mist="mist"}(kt||(kt={}));const It=[kt.All,kt.ClearSky,kt.Clouds,kt.Rain,kt.Snow,kt.Mist],At=[xt.Unspecified,xt.SunriseSunset,xt.Day,xt.Night];function St(t,e){if(!t)return;const o=t.toLowerCase();for(const t of e)if(o.includes(t.toLowerCase().replace(" ","-")))return t}class Ot{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return bt(`${this.id}-source`)}shuffleArray(t){for(let e=t.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[t[e],t[o]]=[t[o],t[e]]}}async fetchImagesAsync(t,e,o){return this.getLogger().debug(`Fetching images with weather: ${e}, timeOfDay: ${o}`),this.fetchImagesInternalAsync(t,e,o)}async getNextImageUrlAsync(t,e,o){var i;this.getLogger().debug(`GetNextImageUrl called with weather: ${e}, timeOfDay: ${o}`),this.lastWeather===e&&this.lastTimeOfDay===o||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=e,this.lastTimeOfDay=o);const n=`${e}_${o}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(n)||0===(null===(i=this.imageUrlCache.get(n))||void 0===i?void 0:i.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const i=[...await this.fetchImagesAsync(t,e,o)];this.shuffleArray(i),this.imageUrlCache.set(n,i),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${i.length} images for weather: ${e}, timeOfDay: ${o}`)}const s=this.imageUrlCache.get(n)||[];if(0===s.length)return this.getLogger().warn(`No images available for weather: ${e}, timeOfDay: ${o}`),"";const a=s[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%s.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${e}, timeOfDay: ${o}, URL: ${a}`),a}filterImagesByWeatherAndTime(t,e,o){if(this.getLogger().debug(`Current time of day: ${o}`),this.getLogger().debug(`Current weather condition: ${e}`),0===t.length)return[];let i=[];return i=t.filter(t=>(t.weather===e||t.weather===kt.All||e===kt.All)&&t.timeOfDay===o),0===i.length&&(i=t.filter(t=>(t.weather===e||t.weather===kt.All||e===kt.All)&&t.timeOfDay===xt.Unspecified)),0===i.length&&(i=t.filter(t=>t.timeOfDay===o)),0===i.length&&(i=t.filter(t=>t.timeOfDay===xt.Unspecified)),i.length>0?(this.getLogger().debug(`Found ${i.length} images matching current conditions`),i.map(t=>t.url)):(this.getLogger().info("No matching images found, returning all images"),t.map(t=>t.url))}convertUrlsToBackgroundImages(t){return this.getLogger().debug(`Converting ${t.length} URLs to BackgroundImage objects`),t.map(t=>({url:t,weather:St(t,It)||kt.All,timeOfDay:St(t,At)||xt.Unspecified}))}}const Dt=new class extends Ot{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=bt("local-source")}async fetchImagesInternalAsync(t,e,o){return t.backgroundImages&&t.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${t.backgroundImages.length} images`),this.logger.debug(`First image URL: ${t.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(t.backgroundImages,e,o)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Nt=new class extends Ot{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=bt("picsum-source")}async fetchImagesInternalAsync(t,e,o){const i=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${i}`),[i]}getDefaultConfig(){return{}}},Pt=new class extends Ot{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=bt("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(t,e,o){const i=t.count||5;let n=t.category||"";const s=t.apiKey||"";return this.logger.debug(`Current weather: ${e}, time of day: ${o}`),this.logger.debug(`Using category with weather and time: ${n}`),s?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(s,n,i,e,o,t)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(t,e,o,i,n,s){const a=[],r=(null==s?void 0:s.contentFilter)||"high";let l="";if(e){const t=e.split(",").map(t=>t.trim().toLowerCase());t.length>0&&(l=t[0]),t.length>1&&(l+=` ${t.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${t.join(", ")}`)}const c=i.toLowerCase();l+=` ${c}`,"sunrise-sunset"===n?l+=" sunrise sunset dawn dusk":"day"===n?l+=" daylight midday day":"night"===n&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${n}`);try{let e="https://api.unsplash.com/photos/random?";const i=new URLSearchParams({client_id:t,count:o.toString(),orientation:"landscape",content_filter:r});l&&i.append("query",l);const n=new URLSearchParams(i);n.delete("client_id"),n.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${n.toString()}`),e+=i.toString();const s=e.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${s}`);const c=await fetch(e);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();this.logger.debug(`API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(t=>{const e=t.urls.raw+"&w=1920&h=1080&fit=crop";a.push(e)}),this.logger.debug(`Fetched ${a.length} images from Unsplash API`)}catch(t){throw this.logger.error("Error fetching from Unsplash API:",t),t}return a}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Ft=new class extends Ot{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=bt("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}async checkEntityAsync(t){try{const e=window.document.querySelector("home-assistant").hass;if(!e)return void this.logger.warn("Could not get Home Assistant instance");const o=e.states[t];if(!o)return void this.logger.warn(`Entity ${t} not found`);this.updateCacheFromEntity(o),this.entityId=t,this.logger.debug(`Checked entity ${t}`)}catch(t){this.logger.error("Error checking entity:",t)}}updateCacheFromEntity(t){const e=t.attributes.files;e&&Array.isArray(e)&&e.every(t=>"string"==typeof t)?(this.cachedImages=this.convertUrlsToBackgroundImages(e),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${e.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(t,e,o){const i=t.entity;if(!i)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(i);const n=Date.now();if(this.cachedImages.length>0&&n-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,e,o);try{const t=window.document.querySelector("home-assistant").hass;if(!t)return this.logger.warn("Could not get Home Assistant instance"),[];const n=t.states[i];return n?(this.updateCacheFromEntity(n),this.filterImagesByWeatherAndTime(this.cachedImages,e,o)):(this.logger.warn(`Sensor ${i} not found`),[])}catch(t){return this.logger.error("Error fetching images from sensor:",t),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Tt=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=bt("null-source")}async fetchImagesAsync(t,e,o){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(t,e,o){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Et={local:Dt,picsum:Nt,unsplash:Pt,sensor:Ft};class Ut{constructor(){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=bt("background-image-manager")}initialize(t={}){const e=t.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${e}`),"none"===e)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var o;if(this.imageSourceId=e||"picsum",this.imageSource=(o=this.imageSourceId,Et[o]||Tt),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;const i=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...i,...t},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(t,e){if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${t}, time of day: ${e}`);const o=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,t,e);return o?(this.logger.debug(`Got image URL: ${o}`),o):(this.logger.warn("No image URL returned from source"),"")}catch(t){return this.logger.error("Error getting next image URL:",t),""}}getImageSourceId(){return this.imageSourceId}}Ct.getInstance().registerAll([Nt,Dt,Pt,Ft]);const Rt=[{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","mist":"Mist","light_rain":"Light rain"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Mt=Object.fromEntries(Rt.map(t=>[t.code,t.translations]));let Bt={};function Lt(){return Rt.map(t=>t.code)}function jt(t,e,o={},i){const n={...o};if(i&&(n.timeZone=i),"hidden"===n.weekday&&(n.weekday=void 0),"hidden"===n.year&&(n.year=void 0),"hidden"===n.month&&(n.month=void 0),"hidden"===n.day&&(n.day=void 0),void 0===n.weekday&&void 0===n.year&&void 0===n.month&&void 0===n.day)return"";const s=function(t){const e=Rt.find(e=>e.code===t);return(null==e?void 0:e.locale)||"en-US"}(e);if("short"===n.month){const e=new Intl.DateTimeFormat(s,{month:"short",timeZone:i}).format(t),o={...n};delete o.month;let a=t.toLocaleDateString(s,o);return"2-digit"===n.day?(a=a.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${e}`),a.includes(e)||(a=`${a} ${e}`)):a=t.toLocaleDateString(s,n),a}return t.toLocaleDateString(s,n)}class zt{constructor(t,e){this._readyResolve=null,this.host=t,this.logger=bt(e),t.addController(this),this.ready=new Promise(t=>{this._readyResolve=t})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(t=>{this._readyResolve=t}),this.onHostDisconnected()}}function Wt(t){let e=document.querySelector(t);if(!e){const o=e=>{const i=e.querySelectorAll("*");for(const e of Array.from(i)){if(e.tagName.toLowerCase()===t.toLowerCase())return e;if(e.shadowRoot){const t=o(e.shadowRoot);if(t)return t}}return null};e=o(document)}return e}function Ht(t,e){const o=t;return o.shadowRoot?Array.from(o.shadowRoot.querySelectorAll(e)):[]}class Vt{constructor(){this.subscribers=new Map}static getInstance(){return Vt.instance||(Vt.instance=new Vt),Vt.instance}subscribe(t,e){this.subscribers.has(t)||this.subscribers.set(t,[]),this.subscribers.get(t).push(e)}unsubscribe(t,e){const o=this.subscribers.get(t);o&&this.subscribers.set(t,o.filter(t=>t!==e))}publish(t){const e=t.constructor;(this.subscribers.get(e)||[]).forEach(e=>e(t))}}class Jt{constructor(t){this.weather=t}}class qt{constructor(){}}class Kt extends zt{constructor(t,e={}){super(t,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=e}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(t){this.logger.debug("Updating ClockController config:",t),this.config={...this.config,...t};const e=new Date,o=this.config.language||"en",i=this.config.timeZone;this.updateTime(e,i),this.updateDate(e,o,i),this.host.requestUpdate()}update(){const t=new Date,e=this.config.language||"en",o=this.config.timeZone;this.updateTime(t,o),0!==t.getSeconds()&&""!==this._currentDate||this.updateDate(t,e,o),this.host.requestUpdate()}updateTime(t,e){var o,i,n,s,a,r,l,c;const h="hidden"===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.second),d=!0===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.hour12);let g,u,p;if(e){const o=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(t);g=parseInt((null===(n=o.find(t=>"hour"===t.type))||void 0===n?void 0:n.value)||"0",10),u=parseInt((null===(s=o.find(t=>"minute"===t.type))||void 0===s?void 0:s.value)||"0",10),p=parseInt((null===(a=o.find(t=>"second"===t.type))||void 0===a?void 0:a.value)||"0",10)}else g=t.getHours(),u=t.getMinutes(),p=t.getSeconds();if(h&&(this._seconds=""),d){const t=g>=12;g%=12,g=g||12,this._ampm=t?"PM":"AM"}else this._ampm="";const m="numeric"!==(null===(r=this.config.timeFormat)||void 0===r?void 0:r.hour);this._hours=m?g.toString().padStart(2,"0"):g.toString();const f="numeric"!==(null===(l=this.config.timeFormat)||void 0===l?void 0:l.minute);if(this._minutes=f?u.toString().padStart(2,"0"):u.toString(),!h){const t="numeric"!==(null===(c=this.config.timeFormat)||void 0===c?void 0:c.second);this._seconds=t?p.toString().padStart(2,"0"):p.toString()}}updateDate(t,e,o){let i=jt(t,e,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},o);i=i.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=i}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var Zt=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let Gt=class extends lt{constructor(){super(),this.logger=bt("clock-component"),this.clockController=new Kt(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(t){if(super.updated(t),t.has("timeFormat")||t.has("dateFormat")||t.has("language")||t.has("timeZone")){if(this.logger.debug("Clock properties changed, updating ClockController"),t.has("timeFormat")){const e=t.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(e)} -> ${JSON.stringify(this.timeFormat)}`)}if(t.has("dateFormat")){const e=t.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(e)} -> ${JSON.stringify(this.dateFormat)}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}render(){var t,e;const o=this.getSeconds(),i=void 0!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second)&&"hidden"!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second);return H`
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
        `}};Gt.styles=a`
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
    `,Zt([ut({type:Object})],Gt.prototype,"timeFormat",void 0),Zt([ut({type:Object})],Gt.prototype,"dateFormat",void 0),Zt([ut({type:String})],Gt.prototype,"fontColor",void 0),Zt([ut({type:String})],Gt.prototype,"language",void 0),Zt([ut({type:String})],Gt.prototype,"timeZone",void 0),Gt=Zt([ht("ha-clock")],Gt);class Yt extends zt{constructor(t,e={}){super(t,"sensor-controller"),this._sensorValues=[],this.config={},this.config=e}onHostConnected(){}onHostDisconnected(){}updateConfig(t){this.logger.debug("Updating SensorController config:",t),this.config={...this.config,...t},this.hass&&this.updateSensorValues()}updateHass(t){this.hass=t,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=[],this.config.sensors.forEach(t=>{if(t.entity&&this.hass.states[t.entity]){const e=this.hass.states[t.entity];let o=e.state;e.attributes&&e.attributes.unit_of_measurement&&(o+=` ${e.attributes.unit_of_measurement}`),this._sensorValues.push({entity:t.entity,label:t.label,value:o})}else t.entity&&this._sensorValues.push({entity:t.entity,label:t.label,value:"unavailable"})}),this.host.requestUpdate()):this._sensorValues=[]}get sensorValues(){return this._sensorValues}}var Qt=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let Xt=class extends lt{constructor(){super(),this.logger=bt("sensor-component"),this.sensorController=new Yt(this,{sensors:this.sensors})}get controller(){return this.sensorController}updated(t){super.updated(t),t.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),t.has("hass")&&this.hass&&this.sensorController.updateHass(this.hass)}render(){const t=this.sensorController.sensorValues;return 0===t.length?H``:H`
            <div class="sensor-container" style="color: ${this.fontColor};">
                ${t.map(t=>H`
                    <div class="sensor-item">
                        ${t.label?H`
                                <div class="sensor-label" style="color: ${this.fontColor};">
                                    ${t.label}
                                </div>`:""}
                        <div class="sensor-value" style="color: ${this.fontColor};">
                            ${t.value}
                        </div>
                    </div>
                `)}
            </div>
        `}};Xt.styles=a`
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
    `,Qt([ut({type:Array})],Xt.prototype,"sensors",void 0),Qt([ut({type:String})],Xt.prototype,"fontColor",void 0),Qt([ut({type:Object})],Xt.prototype,"hass",void 0),Xt=Qt([ht("ha-sensors")],Xt);class te extends zt{constructor(t,e={}){super(t,"background-image-controller"),this.backgroundImageManager=new Ut,this.currentWeather=kt.All,this.messenger=Vt.getInstance(),this._currentImageUrl="",this._previousImageUrl="",this._fetchingImageUrls=!1,this.onWeather=t=>{this.logger.info("New message for weather:",t.weather),this.updateWeather(t.weather)},this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:1e3,fill:"forwards"},this.config=e}onHostConnected(){this.messenger.subscribe(Jt,this.onWeather),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){this.messenger.unsubscribe(Jt,this.onWeather),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(t){const e={...this.config};this.config={...this.config,...t},_t.info("Update the BackgroundImageController with new configuration");const o=this.isInitialized;e.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{o&&this.fetchNewImageAsync(this.currentWeather).catch(t=>this.logger.error("Error fetching image after reinitialization:",t))}).catch(t=>this.logger.error("Error during BackgroundImageManager initialization:",t)):e.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:t,...e}=this.config.imageSourceConfig||{},o=e.imageSourceId?e:{imageSourceId:"picsum"};if(this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${o.imageSourceId||"default"}`),!this.backgroundImageManager.initialize(o))return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(t){this.logger.error("Error fetching image URLs:",t)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const t=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${t/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(t){this.logger.error("Error in image rotation interval:",t)}})()},t)}async fetchNextImageAsync(){await this.fetchNewImageAsync(this.currentWeather)}async fetchNewImageAsync(t){try{let e=t,o=function(){const t=(new Date).getHours();return t>=5&&t<9||t>=17&&t<21?xt.SunriseSunset:t>=9&&t<17?xt.Day:t>=21||t<5?xt.Night:xt.Unspecified}();const i=await this.backgroundImageManager.getNextImageUrlAsync(e,o);if(i){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${i}`);const t=new Image;t.onload=async()=>{this.logger.debug(`New image loaded successfully: ${i}`),this._currentImageUrl?this._previousImageUrl=this._currentImageUrl:this._previousImageUrl="",this._currentImageUrl=i,this.host.requestUpdate(),await this.host.updateComplete,await this.fireAnimate()},t.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${i}`)},t.src=i}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(t){this.logger.error("Error fetching new dynamic image:",t)}}async fireAnimate(){const t=Ht(this.host,".background-image");0!==t.length&&(1===t.length?t[0].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"}):(t[0].animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),t[1].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})),this._previousImageUrl="")}updateWeather(t){this.isInitialized?this.currentWeather!==t&&(this.logger.info(`Updating weather condition to: ${t}`),this.currentWeather=t,this.fetchNewImageAsync(t).catch(t=>this.logger.error("Error fetching image after weather update:",t))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=t,this.fetchNewImageAsync(t).catch(t=>this.logger.error("Error fetching image after initialization:",t))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}}var ee=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let oe=class extends lt{constructor(){super(),this.backgroundOpacity=.5,this.logger=bt("background-image-component"),this.backgroundImageController=new te(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(t){var e;super.updated(t),t.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(e=this.config)&&void 0!==e?e:{}))}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}render(){const t=this.currentImageUrl,e=this.previousImageUrl;return H`
            <div class="background-container">
                ${t?H`
                        ${e?H`
                                <!-- Previous image that will fade out -->
                                <img class="background-image fade-out" src="${e}">
                            `:""}
                        <!-- Current image that will fade in -->
                        <img class="background-image fade-in" src="${t}">
                        <div class="background-overlay" style="opacity: ${void 0!==this.backgroundOpacity?this.backgroundOpacity:.5};"></div>
                    `:""}
            </div>
        `}};oe.styles=a`
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
            /* No default opacity or z-index - will be controlled by inline styles and @lit-labs/motion */            
        }

        .fade-out {            
            z-index: 0;
        }

        .fade-in {            
            z-index: 1;
        }

        .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 2; /* Ensure overlay is above all images */
        }
    `,ee([ut({type:Number})],oe.prototype,"backgroundOpacity",void 0),ee([ut({type:Object})],oe.prototype,"config",void 0),oe=ee([ht("ha-background-image")],oe);class ie{static getInstance(){return ie.instance||(ie.instance=new ie),ie.instance}constructor(){this.providers=new Map}register(t){this.providers.has(t.id)&&_t.warn(`Weather provider with ID ${t.id} is already registered. Overwriting.`),this.providers.set(t.id,t)}getProvider(t){return this.providers.get(t)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(t){return this.providers.has(t)}}const ne=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(t){if(!t.apiKey)throw new Error("OpenWeatherMap API key is required");const e=t.latitude||50.0755,o=t.longitude||14.4378,i=t.units||"metric",n=t.language||"en";try{const s=`https://api.openweathermap.org/data/2.5/forecast?lat=${e}&lon=${o}&units=${i}&lang=${n}&appid=${t.apiKey}`;_t.debug("[OpenWeatherMap] "+s);const a=await fetch(s);if(!a.ok)throw new Error(`OpenWeatherMap API error: ${a.statusText}`);const r=await a.json();if(!r.list||!r.list.length)throw new Error("No forecast data available");const l=r.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},d=new Map;return r.list.forEach(t=>{var e;const o=new Date(1e3*t.dt).toISOString().split("T")[0];d.has(o)||d.set(o,[]),null===(e=d.get(o))||void 0===e||e.push(t)}),{current:h,daily:Array.from(d.entries()).map(([t,e])=>{const o=e.map(t=>t.main.temp),i=Math.min(...o),n=Math.max(...o),s=e[Math.floor(e.length/2)]||e[0],a=e.filter(t=>void 0!==t.pop).map(t=>t.pop),r=a.length>0?a.reduce((t,e)=>t+e,0)/a.length*100:0;return{date:new Date(t),temperatureMin:i,temperatureMax:n,condition:s.weather[0].description,icon:this.getIconUrl(s.weather[0].icon),precipitation:r,humidity:s.main.humidity,windSpeed:s.wind.speed}})}}catch(t){throw _t.error("Error fetching weather data from OpenWeatherMap:",t),t}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"en"}}getIconUrl(t){return`https://openweathermap.org/img/wn/${t}@2x.png`}getWindDirection(t){return["N","NE","E","SE","S","SW","W","NW"][Math.round(t/45)%8]}mapWeatherCondition(t){let e;switch(_t.debug(`[OpenWeatherMap] Mapping weather condition: ${t}`),t.toLowerCase()){case"clear":case"clear sky":e=kt.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":e=kt.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":e=kt.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":e=kt.Rain;break;case"tornado":case"windy":case"all":default:e=kt.All;break;case"snow":e=kt.Snow}return _t.debug(`[OpenWeatherMap] Mapped to Weather enum: ${e}`),e}},se=ie.getInstance();se.register(ne);class ae extends zt{constructor(t,e={}){super(t,"weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this.config={},this.config=e}onHostConnected(){this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0)}async updateConfigAsync(t){this.logger.debug("Updating WeatherController config:",t);const e=this.config.showWeather,o=this.config.weatherUpdateInterval;this.config={...this.config,...t},o!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),!e&&this.config.showWeather?await this.fetchWeatherDataAsync():this.config.showWeather||Vt.getInstance().publish(new Jt(kt.All)),this.host.requestUpdate()}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let t=this.config.weatherUpdateInterval||1800;t=Math.max(t,60);const e=1e3*t;this.logger.debug(`Setting weather update interval to ${t} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(t){this.logger.error("Error in weather update interval:",t)}})()},e)}async fetchWeatherDataAsync(){var t,e;if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const i=this.config.weatherProvider||"openweathermap",n=(o=i,se.getProvider(o));if(!n)throw new Error(`Weather provider '${i}' not found`);let s=n.getDefaultConfig();this.config.weatherConfig&&(s={...s,...this.config.weatherConfig},this.config.weatherConfig.units&&(s.units=this.config.weatherConfig.units,this.logger.debug(`Using weather units: ${s.units}`))),this._weatherData=await n.fetchWeatherAsync(s),this._weatherData&&Vt.getInstance().publish(new Jt(null!==(e=null===(t=this._weatherData.current)||void 0===t?void 0:t.conditionUnified)&&void 0!==e?e:kt.All)),this.logger.info(`Fetched weather data from ${n.name}:`,this._weatherData)}catch(t){this._weatherError=!0,this._weatherErrorMessage=t instanceof Error?t.message:String(t),this.logger.error("Error fetching weather data:",t)}finally{this._weatherLoading=!1,this.host.requestUpdate()}var o}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}}var re=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let le=class extends lt{constructor(){super(),this.logger=bt("weather-component"),this.weatherController=new ae(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval})}get controller(){return this.weatherController}updated(t){if(super.updated(t),t.has("showWeather")||t.has("weatherProvider")||t.has("weatherConfig")||t.has("weatherDisplayMode")||t.has("weatherForecastDays")||t.has("weatherTitle")||t.has("weatherUpdateInterval")){this.logger.debug("Weather properties changed, updating WeatherController");const t={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval};this.weatherController.updateConfigAsync(t)}}translateWeatherCondition(t){const e=this.language||"en",o=function(t,e,o=t){if(!Lt().includes(e))return null!==o?o:t;let i=Bt[e];if(!i){if(!Mt[e])return _t.warn(`No embedded translations found for ${e}`),null!==o?o:t;Bt[e]=Mt[e],i=Bt[e],_t.debug(`Loaded translations for ${e} on-demand`)}const n=function(t,e){if(void 0!==t[e])return t[e];const o=e.split(".");let i=t;for(const t of o){if(null==i||"object"!=typeof i)return;i=i[t]}return i}(i,t);return"string"==typeof n?_t.debug(`Translation found for key "${t}" in language "${e}": "${n}"`):_t.debug(`No translation found for key "${t}" in language "${e}", using default: "${null!==o?o:t}"`),"string"==typeof n?n:null!==o?o:t}(`conditions.${t.toLowerCase().replace(/ /g,"_")}`,e,null);return null!==o?o:t}formatForecastDate(t){return jt(t,this.language||"en",{weekday:"short"})}get weatherData(){const t=this.weatherController.weatherData;return t&&t.current&&t.current.conditionUnified&&Vt.getInstance().publish(new Jt(t.current.conditionUnified)),t}render(){const t=this.weatherController.weatherData;if(this.weatherController.hasError)return H`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!t)return H`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;const e=this.weatherDisplayMode||"both",o=this.weatherForecastDays||3,i=this.weatherTitle||"Weather",n=Math.min(o,t.daily.length);return H`
            <div class="weather-container" style="color: ${this.fontColor};">
                <div class="weather-title" style="color: ${this.fontColor};">${i}</div>

                ${"current"===e||"both"===e?H`
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

                ${"forecast"===e||"both"===e?H`
                        <div class="weather-forecast">
                            ${t.daily.slice(0,n).map(t=>H`
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
        `}};le.styles=a`
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
    `,re([ut({type:Boolean})],le.prototype,"showWeather",void 0),re([ut({type:String})],le.prototype,"weatherProvider",void 0),re([ut({type:Object})],le.prototype,"weatherConfig",void 0),re([ut({type:String})],le.prototype,"weatherDisplayMode",void 0),re([ut({type:Number})],le.prototype,"weatherForecastDays",void 0),re([ut({type:String})],le.prototype,"weatherTitle",void 0),re([ut({type:Number})],le.prototype,"weatherUpdateInterval",void 0),re([ut({type:String})],le.prototype,"fontColor",void 0),re([ut({type:String})],le.prototype,"language",void 0),le=re([ht("ha-weather")],le);class ce{static getInstance(){return ce.instance||(ce.instance=new ce),ce.instance}constructor(){this.providers=new Map}register(t){this.providers.has(t.id)&&_t.warn(`Transportation provider with ID ${t.id} is already registered. Overwriting.`),this.providers.set(t.id,t)}getProvider(t){return this.providers.get(t)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(t){return this.providers.has(t)}}const he=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(t,e){try{if(0===e.length)throw new Error("No stops configured");const o={};for(const t of e){const e=String(t.stopId);o[e]||(o[e]=[]),o[e].push(t)}const i=[];for(const e of Object.keys(o)){const n=o[e],s=n.map(t=>t.postId),a=`https://dpmbinfo.dpmb.cz/api/departures?stopid=${e}`,r=`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,l=await fetch(r,{headers:{"User-Agent":"cz.dpmb.dpmbinfo/4.1.3 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!l.ok)throw new Error(`Failed to fetch transportation data: ${l.status} ${l.statusText}`);const c=await l.json();if(c.Error)throw new Error(`API error: ${c.Error}`);for(const o of s){const s=c.PostList.find(t=>t.PostID===o);if(!s){_t.warn(`No platform found with postId ${o} for stopId ${e}`);continue}const a=s.Name,r=n.find(t=>t.postId===o);if(!r)continue;const l=r.name||a,h=t.maxDepartures||2,d=s.Departures.slice(0,Math.min(h,5)).map(t=>({lineId:t.LineId||t.Line,lineName:t.Line||t.LineName,finalStop:t.FinalStop,isLowFloor:t.IsLowFloor,timeMark:t.TimeMark,stopName:l,postId:o}));i.push(...d)}}return{departures:i,loading:!1}}catch(t){return _t.error("Error fetching transportation data:",t),{departures:[],error:t instanceof Error?t.message:String(t),loading:!1}}}getDefaultConfig(){return{}}},de=ce.getInstance();de.register(he);class ge extends zt{constructor(t,e={}){super(t,"transportation-controller"),this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this._isActive=!1,this.config={},this.config=e}onHostConnected(){}onHostDisconnected(){this.clearTimers()}updateConfig(t){this.logger.debug("Updating TransportationController config:",t),this.config={...this.config,...t},this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.transportation.enable)return;let t=this.config.transportation.updateInterval||60;t=Math.max(t,60);const e=1100*t;this.logger.debug(`Setting transportation update interval to ${t} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(t){this.logger.error("Error in transportation update interval:",t)}})()},e)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0),this.errorTimerId&&(window.clearTimeout(this.errorTimerId),this.errorTimerId=void 0),this.setInactive()}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.transportation.enable){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const e=this.config.transportation;e.provider||(e.provider="idsjmk");const o=(t=e.provider,de.getProvider(t));if(!o)throw new Error(`Transportation provider '${e.provider}' not found`);const i=e.stops.map(t=>({stopId:t.stopId,postId:t.postId,name:t.name})),n=e.providerConfig||{};void 0!==e.maxDepartures&&(n.maxDepartures=e.maxDepartures),this._transportationData=await o.fetchTransportationAsync(n,i),this._lastTransportationUpdate=new Date,this.logger.info(`Fetched transportation data from ${o.name}:`,this._transportationData)}catch(t){this.logger.error("Error fetching transportation data:",t),this._transportationData={departures:[],error:t instanceof Error?t.message:String(t),loading:!1},this.errorTimerId&&(window.clearTimeout(this.errorTimerId),this.errorTimerId=void 0),this.errorTimerId=window.setTimeout(()=>{this.logger.debug("Auto-hiding transportation error after 10 seconds"),this.setInactive(),this._transportationDataLoaded=!1,this.host.requestUpdate()},1e4)}var t;this.host.requestUpdate()}}async handleTransportationClick(){var t;if(this.logger.debug("Transportation button clicked, loading data on demand"),this.errorTimerId&&(window.clearTimeout(this.errorTimerId),this.errorTimerId=void 0),this._isActive=!0,await this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(t=this.config.transportation)||void 0===t?void 0:t.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let t=this.config.transportation.autoHideTimeout||5;t=Math.max(1,Math.min(10,t));const e=60*t*1e3;this.logger.debug(`Setting transportation auto-hide timeout to ${t} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.debug(`Auto-hiding transportation departures after ${t} minutes`),this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()},e)}this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get isActive(){return this._isActive}get lastTransportationUpdate(){return this._lastTransportationUpdate}get isTransportationEnabled(){return void 0!==this.config.transportation&&!1!==this.config.transportation.enable}setInactive(){this._isActive=!1,Vt.getInstance().publish(new qt)}}class ue extends lt{activate(){}deactivate(){}}class pe extends zt{static get styles(){return a`
            .bottom-bar-container {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                z-index: 2;
            }

            .bottom-bar-item {
                display: none;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
            }

            .bottom-bar-item.active {
                display: block;
            }

            .bottom-bar-item.previous {
                display: block;
            }
        `}constructor(t){super(t,"bottom-bar-manager"),this.components=[],this.activeComponent=null,this.previousActiveComponent=null,this.messenger=Vt.getInstance(),this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:500,fill:"forwards"},this.onRequestUpdateMessage=t=>{this.updateActiveComponent()}}registerComponent(t){this.logger.info(`Registering component ${t.className} with priority ${t.priority}`),this.components.push(t),this.components.sort((t,e)=>e.priority-t.priority),this.updateActiveComponent(),this.host.requestUpdate()}updateActiveComponent(){var t;const e=this.components.find(t=>t.isActive)||null;this.activeComponent!==e&&(this.logger.debug(`Changing active component from ${(null===(t=this.activeComponent)||void 0===t?void 0:t.constructor.name)||"none"} to ${(null==e?void 0:e.constructor.name)||"none"}`),this.previousActiveComponent=this.activeComponent,this.activeComponent&&this.activeComponent.deactivate(),this.activeComponent=e,this.activeComponent&&this.activeComponent.activate(),this.previousActiveComponent&&this.activeComponent&&(this.host.requestUpdate(),this.host.updateComplete.then(()=>{this.animateComponentChange()})))}animateComponentChange(){if(!this.activeComponent||!this.previousActiveComponent)return;const t=Ht(this.host,".bottom-bar-item.active")[0],e=Ht(this.host,".bottom-bar-item.previous")[0];t&&e?(e.animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),t.animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})):this.logger.warn("Could not find elements for animation")}get currentComponent(){return this.activeComponent}render(){return H`
            <div class="bottom-bar-container">
                ${this.components.map(t=>{const e=t==this.currentComponent,o=t==this.previousActiveComponent;return H`
                        <div class="bottom-bar-item ${e?"active":""} ${o?"previous":""}">
                            ${t}
                        </div>
                    `})}
            </div>
        `}onHostConnected(){this.logger.debug("Bottom bar manager connected"),this.messenger.subscribe(qt,this.onRequestUpdateMessage)}onHostDisconnected(){this.logger.debug("Bottom bar manager disconnected"),this.messenger.unsubscribe(qt,this.onRequestUpdateMessage)}}var me=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let fe=class extends ue{get priority(){return 10}get isActive(){return this.controller.isActive}constructor(){super(),this.logger=bt("transportation-component"),this.transportationController=new ge(this,{transportation:this.transportation})}get controller(){return this.transportationController}updated(t){super.updated(t),t.has("transportation")&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation}))}render(){if(!this.transportation||!1===this.transportation.enable)return H``;const t=this.transportationController.transportationData,e=this.transportationController.transportationDataLoaded;return H`
            ${this.controller.isActive?e?H`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    ${this.renderTransportationContent(t)}
                                </div>`:H`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    <div>Loading transportation data...</div>
                                </div>`:H``}
        `}renderTransportationContent(t){if(t.loading)return H`
                <div>Loading transportation data...</div>`;if(t.error)return H`
                <div class="transportation-error">${t.error}</div>`;if(!t.departures||0===t.departures.length)return H`
                <div>No departures available</div>`;const e={};for(const o of t.departures){const t=`${o.stopName}-${o.postId}`;e[t]||(e[t]=[]),e[t].push(o)}return H`
            <div class="transportation-departures">
                ${Object.entries(e).map(([t,e])=>{const o=e[0].stopName;return H`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.fontColor};">
                                ${o}
                            </h3>
                            <div class="stop-departures">
                                ${e.map(t=>H`
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
                                        ${t.isLowFloor?H`
                                            <div class="departure-lowfloor">♿</div>`:""}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `})}
            </div>
        `}};var ve;fe.styles=a`
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
            min-height: 170px;
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
    `,me([ut({type:Object})],fe.prototype,"transportation",void 0),me([ut({type:String})],fe.prototype,"fontColor",void 0),me([ut({type:Object})],fe.prototype,"hass",void 0),fe=me([ht("ha-transportation")],fe),function(t){t.Left="left",t.Center="center",t.Right="right"}(ve||(ve={}));class ye{constructor(){this.handlers=new Map}static getInstance(){return ye.instance||(ye.instance=new ye),ye.instance}registerHandler(t,e){this.handlers.set(t,e)}getHandler(t){return this.handlers.get(t)}}class we extends zt{constructor(t,e={}){super(t,"action-bar-controller"),this.config={},this.config=e,this.registry=ye.getInstance()}onHostConnected(){this.logger.debug("Action bar controller connected")}onHostDisconnected(){this.logger.debug("Action bar controller disconnected")}updateConfig(t){this.logger.debug("Updating ActionBarController config:",t),this.config={...this.config,...t},this.host.requestUpdate()}get actionBarConfig(){return this.config.actionBar}get isActionBarEnabled(){var t;return!0===(null===(t=this.config.actionBar)||void 0===t?void 0:t.enabled)}registerActionHandler(t,e){this.logger.debug(`Registering handler for action type: ${t}`),this.registry.registerHandler(t,e)}getActionHandler(t){return this.registry.getHandler(t)}}class be{constructor(){this.plugins=new Map,this.actionRegistry=ye.getInstance()}static getInstance(){return be.instance||(be.instance=new be),be.instance}registerPlugin(t){const e=t.actionId;this.plugins.set(e,t)}registerPluginWithHandler(t){this.registerPlugin(t),this.actionRegistry.registerHandler(t.actionId,t.handler)}getAllPlugins(){return Array.from(this.plugins.values())}getPlugin(t){return this.plugins.get(t)}getAllActionIds(){return Array.from(this.plugins.keys())}}function $e(t){be.getInstance().registerPluginWithHandler(t)}var _e=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let Ce=class extends ue{get priority(){return 5}get isActive(){var t;return!0===(null===(t=this.config)||void 0===t?void 0:t.enabled)&&this.config.actions&&this.config.actions.length>0}constructor(){super(),this.logger=bt("action-bar-component"),this.actionBarController=new we(this,{actionBar:this.config})}get controller(){return this.actionBarController}updated(t){super.updated(t),t.has("config")&&(this.logger.debug("Config properties changed, updating ActionBarController"),this.actionBarController.updateConfig({actionBar:this.config})),t.has("hass")&&this.hass&&this.requestUpdate()}getJustifyContent(){if(!this.config||!this.config.alignment)return"center";switch(this.config.alignment){case ve.Left:return"flex-start";case ve.Right:return"flex-end";case ve.Center:default:return"center"}}render(){if(!this.config||!1===this.config.enabled||!this.config.actions||0===this.config.actions.length)return H``;const t=this.getJustifyContent(),e=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.3;return H`
            <div class="action-bar-container" 
                style="color: ${this.fontColor}; 
                       justify-content: ${t}; 
                       background-color: rgba(0, 0, 0, ${e});">
                ${this.config.actions.map(t=>this.renderActionButton(t))}
            </div>
        `}renderActionButton(t){const e=be.getInstance().getPlugin(t.actionId);let o=t.active||!1,i=t.icon;e&&"getIconForState"in e&&this.hass&&(i=e.getIconForState(t,this.hass)),e&&"getActiveState"in e&&(o=e.getActiveState());const n=o?"active":"",s=o&&t.activeColor?`--active-icon-color: ${t.activeColor};`:"";return H`
            <div class="action-button ${n}" 
                 style="${s}"
                 @click=${()=>this._handleActionClick(t)}>
                ${i&&i.startsWith("mdi:")?H`<ha-icon icon="${i}" 
                                   style="${o&&t.activeColor?`color: ${t.activeColor};`:""}">
                           </ha-icon>`:H`<svg viewBox="0 0 24 24"
                               style="${o&&t.activeColor?`fill: ${t.activeColor};`:""}">
                        <path d="${i}"></path>
                      </svg>`}
                <div class="action-title">${t.title}</div>
            </div>
        `}_handleActionClick(t){this.hass?(this.logger.debug("Action clicked:",t),function(t,e){const o=ye.getInstance().getHandler(t.actionId);o?o(t,e):console.warn(`No handler registered for action type: ${t.actionId}`)}(t,this.hass)):this.logger.error("Home Assistant instance not available")}};Ce.styles=a`
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
    `,_e([ut({type:Object})],Ce.prototype,"config",void 0),_e([ut({type:String})],Ce.prototype,"fontColor",void 0),_e([ut({type:Object})],Ce.prototype,"hass",void 0),Ce=_e([ht("ha-action-bar")],Ce);const xe="action-navigate",ke=t=>{const{path:e,target:o}=t;if("_blank"===o)window.open(e,"_blank");else{window.history.pushState(null,"",e);const t=new Event("location-changed",{composed:!0});window.dispatchEvent(t)}};var Ie,Ae=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};class Se extends lt{updated(t){super.updated(t)}handleInputChange(t,e){e.stopPropagation(),e.preventDefault();const o=e.target;o&&this.actionChanged(this.index,t,o.value||"")}handleValueChange(t,e){e.stopPropagation(),e.preventDefault(),this.actionChanged(this.index,t,e.detail.value)}}Ae([ut({type:Object})],Se.prototype,"hass",void 0),Ae([ut({type:Object})],Se.prototype,"actionConfig",void 0),Ae([ut({type:Number})],Se.prototype,"index",void 0),Ae([ut({type:Function})],Se.prototype,"actionChanged",void 0),function(t){t.Left="left",t.Top="top",t.Hidden="hidden"}(Ie||(Ie={}));let Oe=class extends Se{get navigationAction(){return this.actionConfig}render(){return H`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"text"}}}
                    .value=${this.navigationAction.path||""}
                    .label= ${"Navigation Path"}
                    .labelPosition=${Ie.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${t=>this.handleValueChange("path",t)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"_self",label:"Current Tab"},{value:"_blank",label:"New Tab"}],mode:"dropdown"}}}
                    .value=${this.navigationAction.target||"_self"}
                    .label= ${"Open In"}
                    .labelPosition=${Ie.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${t=>this.handleValueChange("target",t)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color:{type:"rgb"}}}
                    .value=${this.navigationAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the navigation action is active"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("activeColor",t)}
            ></ha-row-selector>
        `}};Oe=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a}([ht("navigation-editor-plugin")],Oe);const De="call-service",Ne=(t,e)=>{const{service:o,service_data:i,confirmation:n,confirmation_text:s}=t;if(n&&!confirm(s||`Are you sure you want to call ${o}?`))return;const[a,r]=o.split(".");e.callService(a,r,i)};var Pe=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let Fe=class extends Se{constructor(){super(...arguments),this._services=[]}get serviceCallAction(){return this.actionConfig}firstUpdated(){this._loadServices()}_loadServices(){if(!this.hass)return;const t=this.hass.services;if(!t)return;const e=[];Object.keys(t).forEach(o=>{Object.keys(t[o]).forEach(t=>{e.push({value:`${o}.${t}`,label:`${o}.${t}`})})}),e.sort((t,e)=>t.label.localeCompare(e.label)),this._services=e}render(){return H`

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:this._services,mode:"dropdown",custom_value:!0}}}
                    .value=${this.serviceCallAction.service||""}
                    .label=${"Service"}
                    .helper= ${"Select a service or enter a custom one (domain.service)"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("service",t)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{multiline:!1,type:"text"}}}
                    label="Service Data (JSON)"
                    .value=${this.serviceCallAction.service_data?JSON.stringify(this.serviceCallAction.service_data):"{}"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>{if(t.stopPropagation(),t.preventDefault(),t.target)try{const e=JSON.parse(t.detail.value||"{}");this.actionChanged(this.index,"service_data",e)}catch(t){}}}
            ></ha-row-selector>

            <div class="helper-text">Example: {"entity_id": "light.living_room"} for light.toggle service</div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color:{type:"rgb"}}}
                    .value=${this.serviceCallAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the service call action is active"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("activeColor",t)}
            ></ha-row-selector>
        `}};Fe.styles=a`
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
    `,Pe([ut({state:!0,attribute:!1})],Fe.prototype,"_services",void 0),Fe=Pe([ht("service-call-editor-plugin")],Fe);const Te="light-toggle",Ee=(t,e)=>{const{entity_id:o}=t;o?e.states[o]?e.callService("light","toggle",{entity_id:o}):console.warn(`Entity ${o} not found`):console.warn("No entity_id specified for light toggle action")};let Ue=class extends Se{get lightToggleAction(){return this.actionConfig}render(){return H`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"light"}}}
                    .value=${this.lightToggleAction.entity_id||""}
                    .label=${"Light Entity"}
                    .helper=${"Select a light entity to toggle"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("entity_id",t)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for light on state"}}}
                    .value=${this.lightToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when light is on"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("icon_on",t)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.lightToggleAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the light is on (active state)"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("activeColor",t)}
            ></ha-row-selector>
        `}};Ue.styles=a`
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
    `,Ue=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a}([ht("light-toggle-editor-plugin")],Ue);const Re="switch-toggle",Me=(t,e)=>{const{entity_id:o}=t;o?e.states[o]?e.callService("switch","toggle",{entity_id:o}):console.warn(`Entity ${o} not found`):console.warn("No entity_id specified for switch toggle action")};let Be=class extends Se{get switchToggleAction(){return this.actionConfig}render(){return H`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"switch"}}}
                    .value=${this.switchToggleAction.entity_id||""}
                    .label=${"Switch Entity"}
                    .helper=${"Select a switch entity to toggle"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("entity_id",t)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for switch on state"}}}
                    .value=${this.switchToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when switch is on"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("icon_on",t)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.switchToggleAction.activeColor||"#4CAF50"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the switch is on (active state)"}
                    .labelPosition=${Ie.Hidden}
                    @value-changed=${t=>this.handleValueChange("activeColor",t)}
            ></ha-row-selector>
        `}};Be.styles=a`
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
    `,Be=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a}([ht("switch-toggle-editor-plugin")],Be);const Le=bt("weather-update-plugin"),je="weather-update",ze=(t,e)=>{const o=Wt("wall-clock-card");if(!o)return void Le.warn("Wall Clock Card not found");const i=o.weatherComponent;i?i.controller.fetchWeatherDataAsync().then(()=>{Le.info("Weather update triggered successfully")}).catch(t=>{Le.error("Error triggering weather update:",t)}):Le.warn("Weather component not found")};class We{constructor(){this.actionId=je,this.name="Update Weather",this.description="Trigger an immediate weather update",this.icon="mdi:weather-partly-cloudy",this.handler=ze,this.editorTag="weather-update-editor-plugin"}defaultActionConfig(){return{actionId:je,title:"Update Weather",icon:this.icon}}register(){$e(this)}}function He(){(new We).register()}let Ve=class extends Se{get weatherUpdateAction(){return this.actionConfig}render(){return H`
            <div class="helper-text">
                This action will trigger an immediate weather update when clicked.
                No additional configuration is needed.
            </div>
        `}};Ve.styles=a`
        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,Ve=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a}([ht("weather-update-editor-plugin")],Ve),He();const Je="transportation",qe=bt("transportation-plugin"),Ke=(t,e)=>{const o=Wt("wall-clock-card");if(!o)return void qe.warn("Wall Clock Card not found");const i=o.transportationComponent;if(!i)return void qe.warn("Transportation component not found");const n=o.bottomBarManager;if(!n)return qe.warn("Bottom bar manager not found"),void i.controller.handleTransportationClick().then(()=>{qe.info("Transportation display triggered successfully (fallback mode)")}).catch(t=>{qe.error("Error triggering transportation display:",t)});i.controller.handleTransportationClick().then(()=>{n.updateActiveComponent(),qe.info("Transportation display triggered successfully")}).catch(t=>{qe.error("Error triggering transportation display:",t)})};class Ze{constructor(){this.actionId=Je,this.name="Transportation",this.description="Show transportation information",this.icon="mdi:bus-clock",this.handler=Ke,this.editorTag=""}defaultActionConfig(){return{actionId:Je,title:"Transportation",icon:this.icon}}isAvailable(){const t=Wt("wall-clock-card");if(!t)return!1;const e=t.transportationComponent;return!!e&&e.controller.isTransportationEnabled}register(){$e(this)}}function Ge(){(new Ze).register()}Ge();const Ye="background-next",Qe=bt("background-next-plugin"),Xe=(t,e)=>{const o=Wt("wall-clock-card");if(!o)return void Qe.warn("Wall Clock Card not found");const i=o.backgroundImageComponent;i?i.controller.fetchNextImageAsync().then(()=>{Qe.info("Next background image triggered successfully")}).catch(t=>{Qe.error("Error triggering next background image:",t)}):Qe.warn("Background image component not found")};class to{constructor(){this.actionId=Ye,this.name="Next Background",this.description="Show next background image",this.icon="mdi:image-refresh",this.handler=Xe,this.editorTag=""}defaultActionConfig(){return{actionId:Ye,title:"Next Background",icon:this.icon}}isAvailable(){const t=Wt("wall-clock-card");if(!t)return!1;const e=t.backgroundImageComponent;return!!e&&e.controller.isInitialized}register(){$e(this)}}function eo(){(new to).register()}var oo,io,no;eo(),(new class{constructor(){this.actionId=xe,this.name="Navigate to Page",this.description="Navigate to a different page in Home Assistant",this.icon="mdi:arrow-right",this.handler=ke,this.editorTag="navigation-editor-plugin"}defaultActionConfig(){return{actionId:xe,title:"Navigate",icon:this.icon,path:"/"}}register(){$e(this)}}).register(),(new class{constructor(){this.actionId=De,this.name="Call Service",this.description="Call a Home Assistant service",this.icon="mdi:lightbulb",this.handler=Ne,this.editorTag="service-call-editor-plugin"}defaultActionConfig(){return{actionId:De,service:"light.toggle",service_data:{entity_id:"light.living_room"},title:"Toggle Light",icon:this.icon}}register(){$e(this)}}).register(),(new class{constructor(){this.actionId=Te,this.name="Toggle Light",this.description="Toggle a light on or off",this.icon="mdi:lightbulb",this.handler=Ee,this.editorTag="light-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(t,e){const{entity_id:o}=t;if(!o)return t.icon||this.icon;const i=e.states[o];return i?(this._lastActiveState="on"===i.state,this._lastActiveState?t.icon_on||this.icon:t.icon||this.icon):t.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:Te,entity_id:"",title:"Toggle Light",icon:this.icon,icon_on:"mdi:lightbulb-on"}}register(){$e(this)}}).register(),(new class{constructor(){this.actionId=Re,this.name="Toggle Switch",this.description="Toggle a switch on or off",this.icon="mdi:toggle-switch-variant-off",this.handler=Me,this.editorTag="switch-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(t,e){const{entity_id:o}=t;if(!o)return t.icon||this.icon;const i=e.states[o];return i?(this._lastActiveState="on"===i.state,this._lastActiveState?t.icon_on||"mdi:toggle-switch-on":t.icon||this.icon):t.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:Re,entity_id:"",title:"Toggle Switch",icon:this.icon,icon_on:"mdi:toggle-switch-variant"}}register(){$e(this)}}).register(),He(),Ge(),eo(),(no=oo||(oo={})).language="language",no.system="system",no.comma_decimal="comma_decimal",no.decimal_comma="decimal_comma",no.space_comma="space_comma",no.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(io||(io={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var so=function(t,e,o,i){i=i||{},o=null==o?{}:o;var n=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return n.detail=o,t.dispatchEvent(n),n};new Set(["call-service","divider","section","weblink","cast","select"]);var ao=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let ro=class extends lt{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._actions=[],this._sensorsWithFilesAttr=[],this._editorComponentCache=new Map,this._timeFormatOptions={hour12:[{value:"true",label:"12-hour"},{value:"false",label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._languageOptions=[],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback(),this._languageOptions=Rt.map(t=>({value:t.code,label:t.label}))}updated(t){super.updated(t),t.has("hass")&&this.hass&&this._updateSensorsWithFilesAttr()}_updateSensorsWithFilesAttr(){this.hass&&(this._sensorsWithFilesAttr=Object.keys(this.hass.states).filter(t=>{if(!t.startsWith("sensor."))return!1;const e=this.hass.states[t];return e&&e.attributes&&void 0!==e.attributes.files}))}_getTransportationProviderOptions(){return[...de.getAllProviders().map(t=>({value:t.id,label:t.name}))]}setConfig(t){const e=t,o=e.imageSource||"none";let i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(i={...i,...e.timeFormat},void 0===e.timeFormat.second&&(i.second=void 0)),this._config={...e,timeFormat:i,dateFormat:e.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:o,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",showWeather:void 0!==e.showWeather&&e.showWeather,weatherProvider:e.weatherProvider||"openweathermap",weatherConfig:e.weatherConfig||{},weatherDisplayMode:e.weatherDisplayMode||"both",weatherForecastDays:e.weatherForecastDays||3,transportation:e.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops(),this._loadActions()}_loadSensors(){var t;(null===(t=this._config)||void 0===t?void 0:t.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var t;(null===(t=this._config)||void 0===t?void 0:t.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadActions(){var t;(null===(t=this._config)||void 0===t?void 0:t.actionBar)&&this._config.actionBar.actions&&this._config.actionBar.actions.length>0?this._actions=[...this._config.actionBar.actions]:this._actions=[]}_loadBackgroundImages(){var t;(null===(t=this._config)||void 0===t?void 0:t.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,so(this,"config-changed",{config:t})}}_removeSensor(t){if(this._sensors=this._sensors.filter((e,o)=>o!==t),this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,so(this,"config-changed",{config:t})}}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this._config){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],this._config=t,so(this,"config-changed",{config:t})}}_getActionTypeOptions(){return be.getInstance().getAllPlugins().map(t=>({value:t.actionId,label:t.name}))}_getEditorTagName(t){const e=be.getInstance().getPlugin(t);return e&&e.editorTag?e.editorTag:null}_createEditorTagComponent(t,e){const o=this._getEditorTagName(t.actionId);if(!o)return"";const i=`${t.actionId}-${e}`;if(this._editorComponentCache.has(i)){const e=this._editorComponentCache.get(i);return this.hass&&(e.hass=this.hass),e.actionConfig=t,e}try{const n=document.createElement(o);return this.hass&&(n.hass=this.hass),n.actionConfig=t,n.index=e,n.actionChanged=this._actionChanged.bind(this),this._editorComponentCache.set(i,n),n}catch(t){return console.error(`Error creating editor component ${o}:`,t),""}}_addAction(){const t=this._getActionTypeOptions(),e=t.length>0?t[0].value:xe;let o;const i=be.getInstance().getPlugin(e);if(o=i&&i.defaultActionConfig?i.defaultActionConfig():{actionId:e,title:"Action",icon:"mdi:flash"},this._editorComponentCache.clear(),this._actions=[...this._actions,o],this._config){const t=JSON.parse(JSON.stringify(this._config));t.actionBar||(t.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),t.actionBar.actions||(t.actionBar.actions=[]),t.actionBar.actions=[...this._actions],t.actionBar.enabled=!0,this._config=t,so(this,"config-changed",{config:t})}}_removeStop(t){if(this._stops=this._stops.filter((e,o)=>o!==t),this._config&&this._config.transportation){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],0===this._stops.length&&(t.transportation=void 0),this._config=t,so(this,"config-changed",{config:t})}}_moveActionUp(t){if(t<=0||t>=this._actions.length)return;this._editorComponentCache.clear();const e=[...this._actions],o=e[t];if(e[t]=e[t-1],e[t-1]=o,this._actions=e,this._config){const t=JSON.parse(JSON.stringify(this._config));t.actionBar||(t.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),t.actionBar.actions||(t.actionBar.actions=[]),t.actionBar.actions=[...this._actions],this._config=t,so(this,"config-changed",{config:t})}}_moveActionDown(t){if(t<0||t>=this._actions.length-1)return;this._editorComponentCache.clear();const e=[...this._actions],o=e[t];if(e[t]=e[t+1],e[t+1]=o,this._actions=e,this._config){const t=JSON.parse(JSON.stringify(this._config));t.actionBar||(t.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),t.actionBar.actions||(t.actionBar.actions=[]),t.actionBar.actions=[...this._actions],this._config=t,so(this,"config-changed",{config:t})}}_removeAction(t){if(this._editorComponentCache.clear(),this._actions=this._actions.filter((e,o)=>o!==t),this._config){const t=JSON.parse(JSON.stringify(this._config));t.actionBar||(t.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),t.actionBar.actions||(t.actionBar.actions=[]),t.actionBar.actions=[...this._actions],0===this._actions.length&&(t.actionBar&&(t.actionBar.enabled=!1),t.actionBar=void 0),this._config=t,so(this,"config-changed",{config:t})}}_stopChanged(t,e,o){if(this._stops=this._stops.map((i,n)=>n===t?{...i,[e]:o}:i),this._config&&this._config.transportation){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],this._config=t,so(this,"config-changed",{config:t})}}_actionChanged(t,e,o){if("actionId"===e){const e=this._actions[t];if(e){const o=`${e.actionId}-${t}`;this._editorComponentCache.delete(o)}}if(this._actions=this._actions.map((i,n)=>n===t?{...i,[e]:o}:i),this._config){const t=JSON.parse(JSON.stringify(this._config));t.actionBar||(t.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),t.actionBar.actions||(t.actionBar.actions=[]),t.actionBar.actions=[...this._actions],this._config=t,so(this,"config-changed",{config:t})}}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:kt.All,timeOfDay:xt.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(t){this._backgroundImages=this._backgroundImages.filter((e,o)=>o!==t),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this._config){const t=JSON.parse(JSON.stringify(this._config));t.backgroundImages=[...this._backgroundImages],this._config=t,so(this,"config-changed",{config:t})}}_handleFormValueChanged(t){if(t.stopPropagation(),!this._config)return;const e=function(t,e,o){const i=JSON.parse(JSON.stringify(t)),n=e.split(".");let s=i;for(let t=0;t<n.length-1;t++){const e=n[t];void 0===s[e]&&(s[e]={}),s=s[e]}return s[n[n.length-1]]=o,i}(this._config,t.detail.propertyName,t.detail.value);this._config=e,so(this,"config-changed",{config:e})}static get styles(){return a`
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
        `}render(){var t,e,o,i,n,s,a,r,l,c,h,d,g,u,p,m,f,v,y,w,b,$,_,C,x,k,I,A,S;return this.hass&&this._config?H`
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
                                .value=${(null===(t=this._config.timeFormat)||void 0===t?void 0:t.hour12)?"true":"false"}
                                .label= ${"Hour Format"}
                                propertyName="timeFormat.hour12"
                                .transformData=${t=>"true"===t}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._timeFormatOptions.hour,mode:"dropdown"}}}
                                .value=${(null===(e=this._config.timeFormat)||void 0===e?void 0:e.hour)||"2-digit"}
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
                                .transformData=${t=>"undefined"===t?"hidden":t}
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
                                .value=${(null===(s=this._config.dateFormat)||void 0===s?void 0:s.weekday)||"long"}
                                .label= ${"Weekday Display"}
                                propertyName="dateFormat.weekday"
                                .transformData=${t=>"undefined"===t?"hidden":t}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._dateFormatOptions.month,mode:"dropdown"}}}
                                .value=${(null===(a=this._config.dateFormat)||void 0===a?void 0:a.month)||"long"}
                                .label= ${"Month Display"}
                                propertyName="dateFormat.month"
                                .transformData=${t=>"undefined"===t?"hidden":t}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._dateFormatOptions.day,mode:"dropdown"}}}
                                .value=${void 0===(null===(r=this._config.dateFormat)||void 0===r?void 0:r.day)?"undefined":null===(l=this._config.dateFormat)||void 0===l?void 0:l.day}
                                .label= ${"Day Display"}
                                propertyName="dateFormat.day"
                                .transformData=${t=>"undefined"===t?"hidden":t}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._dateFormatOptions.year,mode:"dropdown"}}}
                                .value=${void 0===(null===(c=this._config.dateFormat)||void 0===c?void 0:c.year)?"undefined":null===(h=this._config.dateFormat)||void 0===h?void 0:h.year}
                                .label= ${"Year Display"}
                                propertyName="dateFormat.year"
                                .transformData=${t=>"undefined"===t?"hidden":t}
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

                            ${this._backgroundImages.map((t,e)=>H`
                                <div class="image-row">
                                    <div class="image-url">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{text:{type:"text"}}}
                                                .value=${t.url||""}
                                                .label= ${"Image URL"}
                                                propertyName="backgroundImages.${e}.url"
                                                @value-changed=${this._handleFormValueChanged}
                                        ></ha-row-selector>
                                    </div>
                                    <div class="image-actions">
                                        <ha-icon-button
                                                .path=${"M19,13H5V11H19V13Z"}
                                                @click=${()=>this._removeBackgroundImage(e)}
                                        ></ha-icon-button>
                                    </div>
                                    <div class="image-weather">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{select:{options:Object.values(kt).map(t=>({value:t,label:t}))}}}
                                                .value=${t.weather}
                                                .label= ${"Weather Condition"}
                                                propertyName="backgroundImages.${e}.weather"
                                                @value-changed=${this._handleFormValueChanged}
                                        ></ha-row-selector>
                                    </div>
                                    <div class="image-time">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{select:{options:Object.values(xt).map(t=>({value:t,label:t}))}}}
                                                .value=${t.timeOfDay}
                                                .label= ${"Time of Day"}
                                                propertyName="backgroundImages.${e}.timeOfDay"
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
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const o=JSON.parse(JSON.stringify(this._config));o.imageConfig||(o.imageConfig={}),o.imageConfig.category=e.value||"nature",this._config=o,so(this,"config-changed",{config:o})}}
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
                                    transformData=${t=>{let e=parseInt(t||"5",10);return(isNaN(e)||e<1)&&(e=1),e>30&&(e=30),e}}
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
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const o=JSON.parse(JSON.stringify(this._config));o.imageConfig||(o.imageConfig={}),o.imageConfig.apiKey=e.value||"",this._config=o,so(this,"config-changed",{config:o})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${(null===(p=this._config.imageConfig)||void 0===p?void 0:p.contentFilter)||"high"}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const o=JSON.parse(JSON.stringify(this._config));o.imageConfig||(o.imageConfig={}),o.imageConfig.contentFilter=e.value||"high",this._config=o,so(this,"config-changed",{config:o})}}
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
                                    .labelPosition=${Ie.Top}
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
                        ${this._sensors.map((t,e)=>H`
                            <div class="sensor-row">

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{type:"text"}}}
                                        .value=${t.label||""}
                                        .label=${"Label"}
                                        .labelPosition=${Ie.Top}
                                        propertyName="sensors.${e}.label"
                                        @value-changed=${this._handleFormValueChanged}
                                        style="flex: 0 0 30%; margin-right: 8px; overflow: hidden;"
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{entity:{filter:{domain:["sensor","binary_sensor","input_text","input_number","input_datetime","sun","weather"]}}}}
                                        .value=${t.entity||""}
                                        .label=${"Entity"}
                                        .labelPosition=${Ie.Top}
                                        propertyName="sensors.${e}.entity"
                                        @value-changed=${this._handleFormValueChanged}
                                        style="flex: 0 0 60%; overflow: hidden;"
                                ></ha-row-selector>

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
                                        .value=${(null===(y=this._config.weatherConfig)||void 0===y?void 0:y.longitude)||14.4378}
                                        .label=${"Longitude"}
                                        propertyName="weatherConfig.longitude"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{select:{options:this._unitsOptions,mode:"dropdown"}}}
                                        .value=${(null===(w=this._config.weatherConfig)||void 0===w?void 0:w.units)||"metric"}
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
                                        .transformData=${t=>60*t}
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            `:""}
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===(null===(b=this._config.transportation)||void 0===b?void 0:b.enable)?H`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <div class="content">

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select:{options:this._getTransportationProviderOptions(),mode:"dropdown"}}}
                                    .value=${(null===($=this._config.transportation)||void 0===$?void 0:$.provider)||"idsjmk"}
                                    .label= ${"Transportation Provider"}
                                    propertyName="transportation.provider"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:1,max:5,step:1,mode:"slider"}}}
                                    .value=${(null===(_=this._config.transportation)||void 0===_?void 0:_.maxDepartures)||2}
                                    .label= ${"Global Max Departures"}
                                    .helper=${`${(null===(C=this._config.transportation)||void 0===C?void 0:C.maxDepartures)||2} departures`}
                                    propertyName="transportation.maxDepartures"
                                    @value-changed=${t=>{this._handleFormValueChanged(t),this._loadStops()}}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:1,max:10,step:1,mode:"box"}}}
                                    .value=${(null===(x=this._config.transportation)||void 0===x?void 0:x.autoHideTimeout)||5}
                                    .label= ${"Auto-Hide Timeout"}
                                    .helper= ${"Auto-hide timeout in minutes (1-10)"}
                                    propertyName="transportation.autoHideTimeout"
                                    .transformData=${t=>Math.max(Math.min(t||5,10),1)}
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:1,step:1,mode:"box"}}}
                                    .value=${Math.floor((this._config.transportation.updateInterval||60)/60)}
                                    .label= ${"Update Interval"}
                                    .helper= ${"Update interval in minutes (min: 1)"}
                                    propertyName="transportation.updateInterval"
                                    .transformData=${t=>60*Math.max(t||1,1)}
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <div class="section-subheader">Stops</div>

                            ${this._stops.map((t,e)=>H`
                                <div class="sensor-row">
                                    <div class="sensor-entity">
                                        <ha-textfield
                                                label="Stop ID"
                                                type="number"
                                                .value=${t.stopId||1793}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const o=t.target;o&&this._stopChanged(e,"stopId",parseInt(o.value||"1793",10))}}
                                        ></ha-textfield>
                                    </div>
                                    <div class="sensor-label">
                                        <ha-textfield
                                                label="Post ID"
                                                type="number"
                                                .value=${t.postId||3}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const o=t.target;o&&this._stopChanged(e,"postId",parseInt(o.value||"3",10))}}
                                        ></ha-textfield>
                                    </div>
                                </div>
                                <div class="sensor-row" style="margin-bottom: 16px; padding-bottom: 16px;">
                                    <div class="sensor-entity" style="width: 100%;">
                                        <ha-textfield
                                                label="Stop Name (optional)"
                                                .value=${t.name||""}
                                                style="width: 100%;"
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const o=t.target;o&&this._stopChanged(e,"name",o.value||"")}}
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

                <!-- Action Bar Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Action Bar</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${!0===(null===(k=this._config.actionBar)||void 0===k?void 0:k.enabled)}
                                .label= ${"Enable Action Bar"}
                                propertyName="actionBar.enabled"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${!0===(null===(I=this._config.actionBar)||void 0===I?void 0:I.enabled)?H`
                            <div class="info-text">
                                Configure action buttons that will appear at the bottom of the card.
                                Action bar and transportation cannot be displayed simultaneously - action bar takes
                                precedence.
                            </div>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select:{options:[{value:ve.Left,label:"Left"},{value:ve.Center,label:"Center"},{value:ve.Right,label:"Right"}],mode:"dropdown"}}}
                                    .value=${(null===(A=this._config.actionBar)||void 0===A?void 0:A.alignment)||ve.Center}
                                    .label= ${"Button Alignment"}
                                    .helper= ${"Align buttons to the left, center, or right"}
                                    .labelPosition=${Ie.Top}
                                    propertyName="actionBar.alignment"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                                    .value=${void 0!==(null===(S=this._config.actionBar)||void 0===S?void 0:S.backgroundOpacity)?this._config.actionBar.backgroundOpacity:.3}
                                    .label= ${"Background Opacity"}
                                    .helper= ${"Adjust the transparency of the action bar background (0 = fully transparent, 1 = fully opaque)"}
                                    .labelPosition=${Ie.Top}
                                    propertyName="actionBar.backgroundOpacity"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <div class="section-subheader">Actions</div>

                            ${this._actions.map((t,e)=>H`

                                <ha-row-selector
                                        style="flex: 2;"
                                        .hass=${this.hass}
                                        .selector=${{select:{options:this._getActionTypeOptions(),mode:"dropdown"}}}
                                        .value=${t.actionId}
                                        .label= ${"Action Type"}
                                        .labelPosition=${Ie.Hidden}
                                        .helper= ${"Select Action type"}
                                        .actionIcon=${"M19,13H5V11H19V13Z"}
                                        .actionTooltip= ${"Remove action"}
                                        .secondaryActionIcon=${e>0?"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z":""}
                                        .secondaryActionTooltip=${e>0?"Move action up":""}
                                        .tertiaryActionIcon=${e<this._actions.length-1?"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z":""}
                                        .tertiaryActionTooltip=${e<this._actions.length-1?"Move action down":""}
                                        @value-changed=${t=>{this._actionChanged(e,"actionId",t.detail.value)}}
                                        @action-click=${()=>this._removeAction(e)}
                                        @secondary-action-click=${e>0?()=>this._moveActionUp(e):null}
                                        @tertiary-action-click=${e<this._actions.length-1?()=>this._moveActionDown(e):null}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{type:"text"}}}
                                        .value=${t.title||""}
                                        .label=${"Title"}
                                        .helper= ${"Title for the action button"}
                                        .labelPosition=${Ie.Hidden}
                                        @value-changed=${t=>{t.stopPropagation(),t.preventDefault();const o=t.detail.value;this._actionChanged(e,"title",o||"")}}
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{icon:{placeholder:"mdi:clock"}}}
                                        .value=${t.icon||""}
                                        .label=${"Icon"}
                                        .helper= ${"Icon for the action button"}
                                        .labelPosition=${Ie.Hidden}
                                        @value-changed=${t=>{t.stopPropagation(),t.preventDefault();const o=t.detail.value;this._actionChanged(e,"icon",o||"")}}
                                ></ha-row-selector>

                                <!-- Editor components are now dynamically created by the factory pattern -->
                                ${this._createEditorTagComponent(t,e)}

                                </div>
                            `)}

                            <mwc-button @click=${this._addAction}>Add Action</mwc-button>
                        `:""}
                    </div>
                </ha-expansion-panel>
        `:H``}};ao([ut({type:Object})],ro.prototype,"hass",void 0),ao([ut({type:Object})],ro.prototype,"_config",void 0),ao([ut({type:Array})],ro.prototype,"_sensors",void 0),ao([ut({type:Array})],ro.prototype,"_backgroundImages",void 0),ao([ut({type:Array})],ro.prototype,"_stops",void 0),ao([ut({type:Array})],ro.prototype,"_actions",void 0),ao([ut({type:Array})],ro.prototype,"_sensorsWithFilesAttr",void 0),ro=ao([ht("wall-clock-card-editor")],ro);var lo=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let co=class extends lt{constructor(){super(...arguments),this.disabled=!1,this.required=!0}render(){return H`
            <ha-textfield
                    type="color"
                    .value=${this.value||""}
                    .label=${this.label}
                    .helper=${this.helper}
                    .disabled=${this.disabled}
                    .required=${this.required}
                    @change=${this._valueChanged}
            ></ha-textfield>
        `}_valueChanged(t){const e=t.target.value;e&&!/^#[0-9a-fA-F]{6}$/.test(e)||so(this,"value-changed",{value:e})}};co.styles=a`
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
    `,lo([ut({attribute:!1})],co.prototype,"hass",void 0),lo([ut({attribute:!1})],co.prototype,"selector",void 0),lo([ut()],co.prototype,"value",void 0),lo([ut()],co.prototype,"label",void 0),lo([ut()],co.prototype,"helper",void 0),lo([ut({type:Boolean,reflect:!0})],co.prototype,"disabled",void 0),lo([ut({type:Boolean})],co.prototype,"required",void 0),co=lo([ht("ha-selector-color_hex")],co);var ho=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let go=class extends lt{constructor(){super(...arguments),this.disabled=!1,this.required=!0,this.labelPosition=Ie.Left}render(){return H`
            <div class="row ${this.labelPosition.toLowerCase()}">
                ${this.label&&this.labelPosition!==Ie.Hidden?H`
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
                <div class="action-buttons">
                    ${this.secondaryActionIcon?H`
                        <div class="action-button">
                            <ha-icon-button
                                .path=${this.secondaryActionIcon}
                                .title=${this.secondaryActionTooltip||""}
                                @click=${this._handleSecondaryActionClick}
                            ></ha-icon-button>
                        </div>
                    `:""}
                    ${this.tertiaryActionIcon?H`
                        <div class="action-button">
                            <ha-icon-button
                                .path=${this.tertiaryActionIcon}
                                .title=${this.tertiaryActionTooltip||""}
                                @click=${this._handleTertiaryActionClick}
                            ></ha-icon-button>
                        </div>
                    `:""}
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
            </div>
        `}_handleActionClick(t){t.stopPropagation(),so(this,"action-click",{})}_handleSecondaryActionClick(t){t.stopPropagation(),so(this,"secondary-action-click",{})}_handleTertiaryActionClick(t){t.stopPropagation(),so(this,"tertiary-action-click",{})}_valueChanged(t){t.stopPropagation();let e=t.detail.value;this.transformData&&(e=this.transformData(e)),so(this,"value-changed",{value:e,propertyName:this.propertyName})}};go.styles=a`
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

        /* Action buttons container */
        .action-buttons {
            display: flex;
            align-items: center;
            margin-left: 8px;
        }

        /* Action button styles */
        .action-button {
            display: flex;
            align-items: center;
            margin-left: 4px;
        }
    `,ho([ut({attribute:!1})],go.prototype,"hass",void 0),ho([ut({attribute:!1})],go.prototype,"selector",void 0),ho([ut()],go.prototype,"value",void 0),ho([ut()],go.prototype,"label",void 0),ho([ut()],go.prototype,"helper",void 0),ho([ut({type:Boolean,reflect:!0})],go.prototype,"disabled",void 0),ho([ut({type:Boolean})],go.prototype,"required",void 0),ho([ut()],go.prototype,"propertyName",void 0),ho([ut({attribute:!1})],go.prototype,"transformData",void 0),ho([ut({attribute:!1})],go.prototype,"labelPosition",void 0),ho([ut({attribute:!1})],go.prototype,"actionIcon",void 0),ho([ut({attribute:!1})],go.prototype,"actionTooltip",void 0),ho([ut({attribute:!1})],go.prototype,"secondaryActionIcon",void 0),ho([ut({attribute:!1})],go.prototype,"secondaryActionTooltip",void 0),ho([ut({attribute:!1})],go.prototype,"tertiaryActionIcon",void 0),ho([ut({attribute:!1})],go.prototype,"tertiaryActionTooltip",void 0),go=ho([ht("ha-row-selector")],go);var uo=function(t,e,o,i){var n,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,i);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(s<3?n(a):s>3?n(e,o,a):n(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a};let po=class extends lt{constructor(){super(),this.config={},this.consecutiveFailures=0,this.isRetrying=!1,this.clockComponent=document.createElement("ha-clock"),this.sensorComponent=document.createElement("ha-sensors"),this.weatherComponent=document.createElement("ha-weather"),this.backgroundImageComponent=document.createElement("ha-background-image"),this.transportationComponent=document.createElement("ha-transportation"),this.actionBarComponent=document.createElement("ha-action-bar"),_t.info("%c WALL-CLOCK-CARD %c 2.0.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language,this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language,this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.fontColor=this.config.fontColor;const t=this.config.actionBar?{...this.config.actionBar,enabled:!0===this.config.enableActionBar}:{actions:[],enabled:!0===this.config.enableActionBar};this.config={...this.config,actionBar:t},this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.bottomBarManager=new pe(this),this.bottomBarManager.registerComponent(this.transportationComponent),this.bottomBarManager.registerComponent(this.actionBarComponent)}connectedCallback(){super.connectedCallback(),this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.hass&&(this.transportationComponent.hass=this.hass),this.config.actionBar||(this.config.actionBar={actions:[]}),this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.hass&&(this.actionBarComponent.hass=this.hass),this.initConnectCallbackAsync()}async initConnectCallbackAsync(){await this.weatherComponent.controller.ready,await this.backgroundImageComponent.controller.ready,await this.clockComponent.controller.ready,await this.sensorComponent.controller.ready,await this.transportationComponent.controller.ready,await this.actionBarComponent.controller.ready,this.transportationComponent.fontColor=this.config.fontColor,this.transportationComponent.transportation=this.config.transportation,yt({level:$t(this.config.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1});try{await async function(){_t.debug("Loading all translations");const t=Lt().map(t=>async function(t){try{Mt[t]?(Bt[t]=Mt[t],_t.debug(`Loaded translations for ${t}`)):_t.warn(`No embedded translations found for ${t}`)}catch(e){_t.error(`Error loading translations for ${t}: ${e}`)}}(t));await Promise.all(t)}(),_t.debug("Loaded translations for all languages")}catch(t){_t.error("Error loading translations:",t)}this.config.showWeather||Vt.getInstance().publish(new Jt(kt.All))}initBackgroundImageComponent(){var t,e,o,i,n;const s={imageSourceId:this.config.imageSource||"picsum",backgroundImages:this.config.backgroundImages,entity:null===(t=this.config.imageConfig)||void 0===t?void 0:t.entity,apiKey:null===(e=this.config.imageConfig)||void 0===e?void 0:e.apiKey,contentFilter:null===(o=this.config.imageConfig)||void 0===o?void 0:o.contentFilter,category:null===(i=this.config.imageConfig)||void 0===i?void 0:i.category,count:null===(n=this.config.imageConfig)||void 0===n?void 0:n.count};this.backgroundImageComponent.backgroundOpacity=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5,this.backgroundImageComponent.config={imageSourceConfig:s,backgroundRotationInterval:this.config.backgroundRotationInterval},_t.debug("Background image component initialized")}disconnectedCallback(){super.disconnectedCallback()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.initAfterSetConfigAsync(t)}async initAfterSetConfigAsync(t){const e=t.imageSource||"none";let o={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};t.timeFormat&&(o={...o,...t.timeFormat},void 0!==t.timeFormat.hour12&&(o.hour12=Boolean(t.timeFormat.hour12)),void 0===t.timeFormat.second&&(o.second=void 0));let i={weekday:"long",year:"numeric",month:"long",day:"numeric"};t.dateFormat&&(i={...i,...t.dateFormat},void 0===t.dateFormat.year&&(i.year=void 0));let n=t.timeZone;!n&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(n=this.hass.config.time_zone),this.config={...t,timeFormat:o,dateFormat:i,backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:e,imageConfig:t.imageConfig||{},backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",timeZone:n},this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.fontColor=this.config.fontColor,this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.config.showWeather||this.backgroundImageComponent.controller.ready.then(()=>{Vt.getInstance().publish(new Jt(kt.All))})}updated(t){if(t.has("hass")&&this.hass&&(this.sensorComponent.hass=this.hass,this.transportationComponent.hass=this.hass,this.actionBarComponent.hass=this.hass),t.has("config")&&this.config){const t=this.config.logLevel||"info",e=$t(t);_t.debug(`Updating log level to ${t} (${pt[e]})`),yt({level:e,prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}}static get styles(){return a`
            /* Include ClockComponent styles */
            ${s(Gt.styles)}
            /* Include SensorComponent styles */
            ${s(Xt.styles)}
            /* Include BackgroundImageComponent styles */
            ${s(oe.styles)}
            /* Include WeatherComponent styles */
            ${s(le.styles)}
            /* Include TransportationComponent styles */
            ${s(fe.styles)}
            /* Include ActionBarComponent styles */
            ${s(Ce.styles)}
            /* Include BottomBarManager styles */
            ${s(pe.styles)}
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

        `}render(){let t="";return null!==this.bottomBarManager.currentComponent&&(t="margin-top: -140px;"),H`
            <ha-card style="color: rgb( ${this.config.fontColor});">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather?H`<div style="position: absolute; top: 16px; right: 16px; max-width: 40%; max-height: 60%; z-index: 3; padding-left: 8px;">
                            ${this.weatherComponent}
                        </div>`:""}
                <div style="${t}">
                    ${this.clockComponent}
                </div>
                ${this.bottomBarManager.render()}
            </ha-card>
        `}};uo([ut({type:Object})],po.prototype,"hass",void 0),uo([ut({type:Object})],po.prototype,"config",void 0),uo([ut({type:Number})],po.prototype,"consecutiveFailures",void 0),uo([ut({type:Boolean})],po.prototype,"isRetrying",void 0),po=uo([ht("wall-clock-card")],po),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
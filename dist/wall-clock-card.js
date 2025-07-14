/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const r=t=>new n("string"==typeof t?t:t+"",void 0,i),o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:d,getPrototypeOf:g}=Object,m=globalThis,f=m.trustedTypes,p=f?f.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),k={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class _ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=k){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??k}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[y("elementProperties")]=new Map,_[y("finalized")]=new Map,v?.({ReactiveElement:_}),(m.reactiveElementVersions??=[]).push("2.1.1");const $=globalThis,S=$.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,I="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+x,D=`<${O}>`,N=document,T=()=>N.createComment(""),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,F="[ \t\n\f\r]",E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,U=/>/g,L=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,z=/"/g,R=/^(?:script|style|textarea|title)$/i,V=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),j=V(1),J=(V(2),V(3),Symbol.for("lit-noChange")),Z=Symbol.for("lit-nothing"),H=new WeakMap,q=N.createTreeWalker(N,129);function B(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=E;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===E?"!--"===l[1]?o=P:void 0!==l[1]?o=U:void 0!==l[2]?(R.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=L):void 0!==l[3]&&(o=L):o===L?">"===l[0]?(o=n??E,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?L:'"'===l[3]?z:W):o===z||o===W?o=L:o===P||o===U?o=E:(o=L,n=void 0);const u=o===L&&t[e+1].startsWith("/>")?" ":"";r+=o===E?i+D:c>=0?(s.push(a),i.slice(0,c)+I+i.slice(c)+x+u):i+x+(-2===c?e:u)}return[B(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=G.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(I)){const e=c[r++],i=s.getAttribute(t).split(x),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(x)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(R.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),q.nextNode(),a.push({type:2,index:++n});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===O)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)a.push({type:7,index:n}),t+=x.length-1}n++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===J)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=A(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=K(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??N).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=q.nextNode(),r++)}return q.currentNode=N,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),A(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&A(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(B(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=H.get(t.strings);return void 0===e&&H.set(t.strings,e=new G(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=K(this,t,e,0),r=!A(t)||t!==this._$AH&&t!==J,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=K(this,s[i+o],e,o),a===J&&(a=this._$AH[o]),r||=!A(a)||a!==this._$AH[o],a===Z?t=Z:t!==Z&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??Z)===J)return;const i=this._$AH,s=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==Z&&(i===Z||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(G,X),($.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;class at extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(T(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.1");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},ut=(t=ht,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var gt;!function(t){t[t.DEBUG=0]="DEBUG",t[t.INFO=1]="INFO",t[t.WARN=2]="WARN",t[t.ERROR=3]="ERROR",t[t.NONE=4]="NONE"}(gt||(gt={}));const mt={level:gt.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let ft={...mt};const pt=[];function vt(t){const e=ft.level;ft={...mt,...t},e!==ft.level&&console.log(`[LOGGER] Log level changed from ${gt[e]} to ${gt[ft.level]}`)}function yt(t,e,i,...s){var n;if(t<ft.level)return;const r=function(t,e,i){const{prefix:s,enableTimestamps:n,enableSourceTracking:r}=ft;let o="";return n&&(o+=`[${(new Date).toISOString()}] `),o+=`[${gt[t]}] `,s&&(o+=`[${s}] `),e&&r&&(o+=`[${e}] `),o+=i,o}(t,e,i);if(ft.logToConsole)switch(t){case gt.DEBUG:console.debug(r,...s);break;case gt.INFO:console.log(r,...s);break;case gt.WARN:console.warn(r,...s);break;case gt.ERROR:console.error(r,...s)}if(ft.logToStorage){let t=r;if(s.length>0)try{t+=" "+s.map(t=>"object"==typeof t?JSON.stringify(t):String(t)).join(" ")}catch(e){t+=" [Arguments could not be stringified]"}pt.push(t);const e=null!==(n=ft.maxStoredLogs)&&void 0!==n?n:100;pt.length>e&&pt.splice(0,pt.length-e)}}function wt(t){return{debug:(e,...i)=>yt(gt.DEBUG,t,e,...i),info:(e,...i)=>yt(gt.INFO,t,e,...i),warn:(e,...i)=>yt(gt.WARN,t,e,...i),error:(e,...i)=>yt(gt.ERROR,t,e,...i),withSource:t=>wt(t)}}function bt(t){switch(t.toLowerCase()){case"debug":return gt.DEBUG;case"info":return gt.INFO;case"warn":default:return gt.WARN;case"error":return gt.ERROR;case"none":return gt.NONE}}const kt=wt("wall-clock");class _t{static getInstance(){return _t.instance||(_t.instance=new _t),_t.instance}constructor(){this.providers=new Map}register(t){this.providers.has(t.id)&&kt.warn(`Transportation provider with ID ${t.id} is already registered. Overwriting.`),this.providers.set(t.id,t)}getProvider(t){return this.providers.get(t)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(t){return this.providers.has(t)}}const $t=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(t,e){try{if(0===e.length)throw new Error("No stops configured");const i={};for(const t of e){const e=String(t.stopId);i[e]||(i[e]=[]),i[e].push(t)}const s=[];for(const e of Object.keys(i)){const n=i[e],r=n.map(t=>t.postId),o=`https://dpmbinfo.dpmb.cz/api/departures?stopid=${e}`,a=`https://api.allorigins.win/raw?url=${encodeURIComponent(o)}`,l=await fetch(a,{headers:{"User-Agent":"cz.dpmb.dpmbinfo/4.1.3 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!l.ok)throw new Error(`Failed to fetch transportation data: ${l.status} ${l.statusText}`);const c=await l.json();if(c.Error)throw new Error(`API error: ${c.Error}`);for(const i of r){const r=c.PostList.find(t=>t.PostID===i);if(!r){kt.warn(`No platform found with postId ${i} for stopId ${e}`);continue}const o=r.Name,a=n.find(t=>t.postId===i);if(!a)continue;const l=a.name||o,h=t.maxDepartures||2,u=r.Departures.slice(0,Math.min(h,5)).map(t=>({lineId:t.LineId||t.Line,lineName:t.Line||t.LineName,finalStop:t.FinalStop,isLowFloor:t.IsLowFloor,timeMark:t.TimeMark,stopName:l,postId:i}));s.push(...u)}}return{departures:s,loading:!1}}catch(t){return kt.error("Error fetching transportation data:",t),{departures:[],error:t instanceof Error?t.message:String(t),loading:!1}}}getDefaultConfig(){return{}}},St=_t.getInstance();St.register($t);const Ct=[{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","mist":"Mist","light_rain":"Light rain"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],It=Object.fromEntries(Ct.map(t=>[t.code,t.translations]));let xt={};function Ot(){return Ct.map(t=>t.code)}function Dt(t,e,i={},s){const n={...i};if(s&&(n.timeZone=s),"hidden"===n.weekday&&(n.weekday=void 0),"hidden"===n.year&&(n.year=void 0),"hidden"===n.month&&(n.month=void 0),"hidden"===n.day&&(n.day=void 0),void 0===n.weekday&&void 0===n.year&&void 0===n.month&&void 0===n.day)return"";const r=function(t){const e=Ct.find(e=>e.code===t);return(null==e?void 0:e.locale)||"en-US"}(e);if("short"===n.month){const e=new Intl.DateTimeFormat(r,{month:"short",timeZone:s}).format(t),i={...n};delete i.month;let o=t.toLocaleDateString(r,i);return"2-digit"===n.day?(o=o.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${e}`),o.includes(e)||(o=`${o} ${e}`)):o=t.toLocaleDateString(r,n),o}return t.toLocaleDateString(r,n)}class Nt extends Error{}class Tt extends Nt{constructor(t){super(`Invalid DateTime: ${t.toMessage()}`)}}class At extends Nt{constructor(t){super(`Invalid Interval: ${t.toMessage()}`)}}class Mt extends Nt{constructor(t){super(`Invalid Duration: ${t.toMessage()}`)}}class Ft extends Nt{}class Et extends Nt{constructor(t){super(`Invalid unit ${t}`)}}class Pt extends Nt{}class Ut extends Nt{constructor(){super("Zone is an abstract class")}}const Lt="numeric",Wt="short",zt="long",Rt={year:Lt,month:Lt,day:Lt},Vt={year:Lt,month:Wt,day:Lt},jt={year:Lt,month:Wt,day:Lt,weekday:Wt},Jt={year:Lt,month:zt,day:Lt},Zt={year:Lt,month:zt,day:Lt,weekday:zt},Ht={hour:Lt,minute:Lt},qt={hour:Lt,minute:Lt,second:Lt},Bt={hour:Lt,minute:Lt,second:Lt,timeZoneName:Wt},Yt={hour:Lt,minute:Lt,second:Lt,timeZoneName:zt},Gt={hour:Lt,minute:Lt,hourCycle:"h23"},Kt={hour:Lt,minute:Lt,second:Lt,hourCycle:"h23"},Qt={hour:Lt,minute:Lt,second:Lt,hourCycle:"h23",timeZoneName:Wt},Xt={hour:Lt,minute:Lt,second:Lt,hourCycle:"h23",timeZoneName:zt},te={year:Lt,month:Lt,day:Lt,hour:Lt,minute:Lt},ee={year:Lt,month:Lt,day:Lt,hour:Lt,minute:Lt,second:Lt},ie={year:Lt,month:Wt,day:Lt,hour:Lt,minute:Lt},se={year:Lt,month:Wt,day:Lt,hour:Lt,minute:Lt,second:Lt},ne={year:Lt,month:Wt,day:Lt,weekday:Wt,hour:Lt,minute:Lt},re={year:Lt,month:zt,day:Lt,hour:Lt,minute:Lt,timeZoneName:Wt},oe={year:Lt,month:zt,day:Lt,hour:Lt,minute:Lt,second:Lt,timeZoneName:Wt},ae={year:Lt,month:zt,day:Lt,weekday:zt,hour:Lt,minute:Lt,timeZoneName:zt},le={year:Lt,month:zt,day:Lt,weekday:zt,hour:Lt,minute:Lt,second:Lt,timeZoneName:zt};class ce{get type(){throw new Ut}get name(){throw new Ut}get ianaName(){return this.name}get isUniversal(){throw new Ut}offsetName(t,e){throw new Ut}formatOffset(t,e){throw new Ut}offset(t){throw new Ut}equals(t){throw new Ut}get isValid(){throw new Ut}}let he=null;class ue extends ce{static get instance(){return null===he&&(he=new ue),he}get type(){return"system"}get name(){return(new Intl.DateTimeFormat).resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(t,{format:e,locale:i}){return Ti(t,e,i)}formatOffset(t,e){return Ei(this.offset(t),e)}offset(t){return-new Date(t).getTimezoneOffset()}equals(t){return"system"===t.type}get isValid(){return!0}}const de=new Map,ge={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},me=new Map;class fe extends ce{static create(t){let e=me.get(t);return void 0===e&&me.set(t,e=new fe(t)),e}static resetCache(){me.clear(),de.clear()}static isValidSpecifier(t){return this.isValidZone(t)}static isValidZone(t){if(!t)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:t}).format(),!0}catch(t){return!1}}constructor(t){super(),this.zoneName=t,this.valid=fe.isValidZone(t)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(t,{format:e,locale:i}){return Ti(t,e,i,this.name)}formatOffset(t,e){return Ei(this.offset(t),e)}offset(t){if(!this.valid)return NaN;const e=new Date(t);if(isNaN(e))return NaN;const i=function(t){let e=de.get(t);return void 0===e&&(e=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"}),de.set(t,e)),e}(this.name);let[s,n,r,o,a,l,c]=i.formatToParts?function(t,e){const i=t.formatToParts(e),s=[];for(let t=0;t<i.length;t++){const{type:e,value:n}=i[t],r=ge[e];"era"===e?s[r]=n:hi(r)||(s[r]=parseInt(n,10))}return s}(i,e):function(t,e){const i=t.format(e).replace(/\u200E/g,""),s=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(i),[,n,r,o,a,l,c,h]=s;return[o,n,r,a,l,c,h]}(i,e);"BC"===o&&(s=1-Math.abs(s));let h=+e;const u=h%1e3;return h-=u>=0?u:1e3+u,(xi({year:s,month:n,day:r,hour:24===a?0:a,minute:l,second:c,millisecond:0})-h)/6e4}equals(t){return"iana"===t.type&&t.name===this.name}get isValid(){return this.valid}}let pe={};const ve=new Map;function ye(t,e={}){const i=JSON.stringify([t,e]);let s=ve.get(i);return void 0===s&&(s=new Intl.DateTimeFormat(t,e),ve.set(i,s)),s}const we=new Map,be=new Map;let ke=null;const _e=new Map;function $e(t){let e=_e.get(t);return void 0===e&&(e=new Intl.DateTimeFormat(t).resolvedOptions(),_e.set(t,e)),e}const Se=new Map;function Ce(t,e,i,s){const n=t.listingMode();return"error"===n?null:"en"===n?i(e):s(e)}class Ie{constructor(t,e,i){this.padTo=i.padTo||0,this.floor=i.floor||!1;const{padTo:s,floor:n,...r}=i;if(!e||Object.keys(r).length>0){const e={useGrouping:!1,...i};i.padTo>0&&(e.minimumIntegerDigits=i.padTo),this.inf=function(t,e={}){const i=JSON.stringify([t,e]);let s=we.get(i);return void 0===s&&(s=new Intl.NumberFormat(t,e),we.set(i,s)),s}(t,e)}}format(t){if(this.inf){const e=this.floor?Math.floor(t):t;return this.inf.format(e)}return wi(this.floor?Math.floor(t):$i(t,3),this.padTo)}}class xe{constructor(t,e,i){let s;if(this.opts=i,this.originalZone=void 0,this.opts.timeZone)this.dt=t;else if("fixed"===t.zone.type){const e=t.offset/60*-1,i=e>=0?`Etc/GMT+${e}`:`Etc/GMT${e}`;0!==t.offset&&fe.create(i).valid?(s=i,this.dt=t):(s="UTC",this.dt=0===t.offset?t:t.setZone("UTC").plus({minutes:t.offset}),this.originalZone=t.zone)}else"system"===t.zone.type?this.dt=t:"iana"===t.zone.type?(this.dt=t,s=t.zone.name):(s="UTC",this.dt=t.setZone("UTC").plus({minutes:t.offset}),this.originalZone=t.zone);const n={...this.opts};n.timeZone=n.timeZone||s,this.dtf=ye(e,n)}format(){return this.originalZone?this.formatToParts().map(({value:t})=>t).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){const t=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?t.map(t=>{if("timeZoneName"===t.type){const e=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...t,value:e}}return t}):t}resolvedOptions(){return this.dtf.resolvedOptions()}}class Oe{constructor(t,e,i){this.opts={style:"long",...i},!e&&gi()&&(this.rtf=function(t,e={}){const{base:i,...s}=e,n=JSON.stringify([t,s]);let r=be.get(n);return void 0===r&&(r=new Intl.RelativeTimeFormat(t,e),be.set(n,r)),r}(t,i))}format(t,e){return this.rtf?this.rtf.format(t,e):function(t,e,i="always",s=!1){const n={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},r=-1===["hours","minutes","seconds"].indexOf(t);if("auto"===i&&r){const i="days"===t;switch(e){case 1:return i?"tomorrow":`next ${n[t][0]}`;case-1:return i?"yesterday":`last ${n[t][0]}`;case 0:return i?"today":`this ${n[t][0]}`}}const o=Object.is(e,-0)||e<0,a=Math.abs(e),l=1===a,c=n[t],h=s?l?c[1]:c[2]||c[1]:l?n[t][0]:t;return o?`${a} ${h} ago`:`in ${a} ${h}`}(e,t,this.opts.numeric,"long"!==this.opts.style)}formatToParts(t,e){return this.rtf?this.rtf.formatToParts(t,e):[]}}const De={firstDay:1,minimalDays:4,weekend:[6,7]};class Ne{static fromOpts(t){return Ne.create(t.locale,t.numberingSystem,t.outputCalendar,t.weekSettings,t.defaultToEN)}static create(t,e,i,s,n=!1){const r=t||Be.defaultLocale,o=r||(n?"en-US":ke||(ke=(new Intl.DateTimeFormat).resolvedOptions().locale,ke)),a=e||Be.defaultNumberingSystem,l=i||Be.defaultOutputCalendar,c=vi(s)||Be.defaultWeekSettings;return new Ne(o,a,l,c,r)}static resetCache(){ke=null,ve.clear(),we.clear(),be.clear(),_e.clear(),Se.clear()}static fromObject({locale:t,numberingSystem:e,outputCalendar:i,weekSettings:s}={}){return Ne.create(t,e,i,s)}constructor(t,e,i,s,n){const[r,o,a]=function(t){const e=t.indexOf("-x-");-1!==e&&(t=t.substring(0,e));const i=t.indexOf("-u-");if(-1===i)return[t];{let e,s;try{e=ye(t).resolvedOptions(),s=t}catch(n){const r=t.substring(0,i);e=ye(r).resolvedOptions(),s=r}const{numberingSystem:n,calendar:r}=e;return[s,n,r]}}(t);this.locale=r,this.numberingSystem=e||o||null,this.outputCalendar=i||a||null,this.weekSettings=s,this.intl=function(t,e,i){return i||e?(t.includes("-u-")||(t+="-u"),i&&(t+=`-ca-${i}`),e&&(t+=`-nu-${e}`),t):t}(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=n,this.fastNumbersCached=null}get fastNumbers(){var t;return null==this.fastNumbersCached&&(this.fastNumbersCached=(!(t=this).numberingSystem||"latn"===t.numberingSystem)&&("latn"===t.numberingSystem||!t.locale||t.locale.startsWith("en")||"latn"===$e(t.locale).numberingSystem)),this.fastNumbersCached}listingMode(){const t=this.isEnglish(),e=!(null!==this.numberingSystem&&"latn"!==this.numberingSystem||null!==this.outputCalendar&&"gregory"!==this.outputCalendar);return t&&e?"en":"intl"}clone(t){return t&&0!==Object.getOwnPropertyNames(t).length?Ne.create(t.locale||this.specifiedLocale,t.numberingSystem||this.numberingSystem,t.outputCalendar||this.outputCalendar,vi(t.weekSettings)||this.weekSettings,t.defaultToEN||!1):this}redefaultToEN(t={}){return this.clone({...t,defaultToEN:!0})}redefaultToSystem(t={}){return this.clone({...t,defaultToEN:!1})}months(t,e=!1){return Ce(this,t,zi,()=>{const i="ja"===this.intl||this.intl.startsWith("ja-"),s=(e&=!i)?{month:t,day:"numeric"}:{month:t},n=e?"format":"standalone";if(!this.monthsCache[n][t]){const e=i?t=>this.dtFormatter(t,s).format():t=>this.extract(t,s,"month");this.monthsCache[n][t]=function(t){const e=[];for(let i=1;i<=12;i++){const s=jn.utc(2009,i,1);e.push(t(s))}return e}(e)}return this.monthsCache[n][t]})}weekdays(t,e=!1){return Ce(this,t,Ji,()=>{const i=e?{weekday:t,year:"numeric",month:"long",day:"numeric"}:{weekday:t},s=e?"format":"standalone";return this.weekdaysCache[s][t]||(this.weekdaysCache[s][t]=function(t){const e=[];for(let i=1;i<=7;i++){const s=jn.utc(2016,11,13+i);e.push(t(s))}return e}(t=>this.extract(t,i,"weekday"))),this.weekdaysCache[s][t]})}meridiems(){return Ce(this,void 0,()=>Zi,()=>{if(!this.meridiemCache){const t={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[jn.utc(2016,11,13,9),jn.utc(2016,11,13,19)].map(e=>this.extract(e,t,"dayperiod"))}return this.meridiemCache})}eras(t){return Ce(this,t,Yi,()=>{const e={era:t};return this.eraCache[t]||(this.eraCache[t]=[jn.utc(-40,1,1),jn.utc(2017,1,1)].map(t=>this.extract(t,e,"era"))),this.eraCache[t]})}extract(t,e,i){const s=this.dtFormatter(t,e).formatToParts().find(t=>t.type.toLowerCase()===i);return s?s.value:null}numberFormatter(t={}){return new Ie(this.intl,t.forceSimple||this.fastNumbers,t)}dtFormatter(t,e={}){return new xe(t,this.intl,e)}relFormatter(t={}){return new Oe(this.intl,this.isEnglish(),t)}listFormatter(t={}){return function(t,e={}){const i=JSON.stringify([t,e]);let s=pe[i];return s||(s=new Intl.ListFormat(t,e),pe[i]=s),s}(this.intl,t)}isEnglish(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||$e(this.intl).locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:mi()?function(t){let e=Se.get(t);if(!e){const i=new Intl.Locale(t);e="getWeekInfo"in i?i.getWeekInfo():i.weekInfo,"minimalDays"in e||(e={...De,...e}),Se.set(t,e)}return e}(this.locale):De}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(t){return this.locale===t.locale&&this.numberingSystem===t.numberingSystem&&this.outputCalendar===t.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let Te=null;class Ae extends ce{static get utcInstance(){return null===Te&&(Te=new Ae(0)),Te}static instance(t){return 0===t?Ae.utcInstance:new Ae(t)}static parseSpecifier(t){if(t){const e=t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(e)return new Ae(Ai(e[1],e[2]))}return null}constructor(t){super(),this.fixed=t}get type(){return"fixed"}get name(){return 0===this.fixed?"UTC":`UTC${Ei(this.fixed,"narrow")}`}get ianaName(){return 0===this.fixed?"Etc/UTC":`Etc/GMT${Ei(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(t,e){return Ei(this.fixed,e)}get isUniversal(){return!0}offset(){return this.fixed}equals(t){return"fixed"===t.type&&t.fixed===this.fixed}get isValid(){return!0}}class Me extends ce{constructor(t){super(),this.zoneName=t}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function Fe(t,e){if(hi(t)||null===t)return e;if(t instanceof ce)return t;if(function(t){return"string"==typeof t}(t)){const i=t.toLowerCase();return"default"===i?e:"local"===i||"system"===i?ue.instance:"utc"===i||"gmt"===i?Ae.utcInstance:Ae.parseSpecifier(i)||fe.create(t)}return ui(t)?Ae.instance(t):"object"==typeof t&&"offset"in t&&"function"==typeof t.offset?t:new Me(t)}const Ee={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},Pe={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},Ue=Ee.hanidec.replace(/[\[|\]]/g,"").split(""),Le=new Map;function We({numberingSystem:t},e=""){const i=t||"latn";let s=Le.get(i);void 0===s&&(s=new Map,Le.set(i,s));let n=s.get(e);return void 0===n&&(n=new RegExp(`${Ee[i]}${e}`),s.set(e,n)),n}let ze,Re=()=>Date.now(),Ve="system",je=null,Je=null,Ze=null,He=60,qe=null;class Be{static get now(){return Re}static set now(t){Re=t}static set defaultZone(t){Ve=t}static get defaultZone(){return Fe(Ve,ue.instance)}static get defaultLocale(){return je}static set defaultLocale(t){je=t}static get defaultNumberingSystem(){return Je}static set defaultNumberingSystem(t){Je=t}static get defaultOutputCalendar(){return Ze}static set defaultOutputCalendar(t){Ze=t}static get defaultWeekSettings(){return qe}static set defaultWeekSettings(t){qe=vi(t)}static get twoDigitCutoffYear(){return He}static set twoDigitCutoffYear(t){He=t%100}static get throwOnInvalid(){return ze}static set throwOnInvalid(t){ze=t}static resetCaches(){Ne.resetCache(),fe.resetCache(),jn.resetCache(),Le.clear()}}class Ye{constructor(t,e){this.reason=t,this.explanation=e}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}const Ge=[0,31,59,90,120,151,181,212,243,273,304,334],Ke=[0,31,60,91,121,152,182,213,244,274,305,335];function Qe(t,e){return new Ye("unit out of range",`you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`)}function Xe(t,e,i){const s=new Date(Date.UTC(t,e-1,i));t<100&&t>=0&&s.setUTCFullYear(s.getUTCFullYear()-1900);const n=s.getUTCDay();return 0===n?7:n}function ti(t,e,i){return i+(Si(t)?Ke:Ge)[e-1]}function ei(t,e){const i=Si(t)?Ke:Ge,s=i.findIndex(t=>t<e);return{month:s+1,day:e-i[s]}}function ii(t,e){return(t-e+7)%7+1}function si(t,e=4,i=1){const{year:s,month:n,day:r}=t,o=ti(s,n,r),a=ii(Xe(s,n,r),i);let l,c=Math.floor((o-a+14-e)/7);return c<1?(l=s-1,c=Di(l,e,i)):c>Di(s,e,i)?(l=s+1,c=1):l=s,{weekYear:l,weekNumber:c,weekday:a,...Pi(t)}}function ni(t,e=4,i=1){const{weekYear:s,weekNumber:n,weekday:r}=t,o=ii(Xe(s,1,e),i),a=Ci(s);let l,c=7*n+r-o-7+e;c<1?(l=s-1,c+=Ci(l)):c>a?(l=s+1,c-=Ci(s)):l=s;const{month:h,day:u}=ei(l,c);return{year:l,month:h,day:u,...Pi(t)}}function ri(t){const{year:e,month:i,day:s}=t;return{year:e,ordinal:ti(e,i,s),...Pi(t)}}function oi(t){const{year:e,ordinal:i}=t,{month:s,day:n}=ei(e,i);return{year:e,month:s,day:n,...Pi(t)}}function ai(t,e){if(!hi(t.localWeekday)||!hi(t.localWeekNumber)||!hi(t.localWeekYear)){if(!hi(t.weekday)||!hi(t.weekNumber)||!hi(t.weekYear))throw new Ft("Cannot mix locale-based week fields with ISO-based week fields");return hi(t.localWeekday)||(t.weekday=t.localWeekday),hi(t.localWeekNumber)||(t.weekNumber=t.localWeekNumber),hi(t.localWeekYear)||(t.weekYear=t.localWeekYear),delete t.localWeekday,delete t.localWeekNumber,delete t.localWeekYear,{minDaysInFirstWeek:e.getMinDaysInFirstWeek(),startOfWeek:e.getStartOfWeek()}}return{minDaysInFirstWeek:4,startOfWeek:1}}function li(t){const e=di(t.year),i=yi(t.month,1,12),s=yi(t.day,1,Ii(t.year,t.month));return e?i?!s&&Qe("day",t.day):Qe("month",t.month):Qe("year",t.year)}function ci(t){const{hour:e,minute:i,second:s,millisecond:n}=t,r=yi(e,0,23)||24===e&&0===i&&0===s&&0===n,o=yi(i,0,59),a=yi(s,0,59),l=yi(n,0,999);return r?o?a?!l&&Qe("millisecond",n):Qe("second",s):Qe("minute",i):Qe("hour",e)}function hi(t){return void 0===t}function ui(t){return"number"==typeof t}function di(t){return"number"==typeof t&&t%1==0}function gi(){try{return"undefined"!=typeof Intl&&!!Intl.RelativeTimeFormat}catch(t){return!1}}function mi(){try{return"undefined"!=typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(t){return!1}}function fi(t,e,i){if(0!==t.length)return t.reduce((t,s)=>{const n=[e(s),s];return t&&i(t[0],n[0])===t[0]?t:n},null)[1]}function pi(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function vi(t){if(null==t)return null;if("object"!=typeof t)throw new Pt("Week settings must be an object");if(!yi(t.firstDay,1,7)||!yi(t.minimalDays,1,7)||!Array.isArray(t.weekend)||t.weekend.some(t=>!yi(t,1,7)))throw new Pt("Invalid week settings");return{firstDay:t.firstDay,minimalDays:t.minimalDays,weekend:Array.from(t.weekend)}}function yi(t,e,i){return di(t)&&t>=e&&t<=i}function wi(t,e=2){let i;return i=t<0?"-"+(""+-t).padStart(e,"0"):(""+t).padStart(e,"0"),i}function bi(t){return hi(t)||null===t||""===t?void 0:parseInt(t,10)}function ki(t){return hi(t)||null===t||""===t?void 0:parseFloat(t)}function _i(t){if(!hi(t)&&null!==t&&""!==t){const e=1e3*parseFloat("0."+t);return Math.floor(e)}}function $i(t,e,i="round"){const s=10**e;switch(i){case"expand":return t>0?Math.ceil(t*s)/s:Math.floor(t*s)/s;case"trunc":return Math.trunc(t*s)/s;case"round":return Math.round(t*s)/s;case"floor":return Math.floor(t*s)/s;case"ceil":return Math.ceil(t*s)/s;default:throw new RangeError(`Value rounding ${i} is out of range`)}}function Si(t){return t%4==0&&(t%100!=0||t%400==0)}function Ci(t){return Si(t)?366:365}function Ii(t,e){const i=function(t){return t-12*Math.floor(t/12)}(e-1)+1;return 2===i?Si(t+(e-i)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][i-1]}function xi(t){let e=Date.UTC(t.year,t.month-1,t.day,t.hour,t.minute,t.second,t.millisecond);return t.year<100&&t.year>=0&&(e=new Date(e),e.setUTCFullYear(t.year,t.month-1,t.day)),+e}function Oi(t,e,i){return-ii(Xe(t,1,e),i)+e-1}function Di(t,e=4,i=1){const s=Oi(t,e,i),n=Oi(t+1,e,i);return(Ci(t)-s+n)/7}function Ni(t){return t>99?t:t>Be.twoDigitCutoffYear?1900+t:2e3+t}function Ti(t,e,i,s=null){const n=new Date(t),r={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};s&&(r.timeZone=s);const o={timeZoneName:e,...r},a=new Intl.DateTimeFormat(i,o).formatToParts(n).find(t=>"timezonename"===t.type.toLowerCase());return a?a.value:null}function Ai(t,e){let i=parseInt(t,10);Number.isNaN(i)&&(i=0);const s=parseInt(e,10)||0;return 60*i+(i<0||Object.is(i,-0)?-s:s)}function Mi(t){const e=Number(t);if("boolean"==typeof t||""===t||!Number.isFinite(e))throw new Pt(`Invalid unit value ${t}`);return e}function Fi(t,e){const i={};for(const s in t)if(pi(t,s)){const n=t[s];if(null==n)continue;i[e(s)]=Mi(n)}return i}function Ei(t,e){const i=Math.trunc(Math.abs(t/60)),s=Math.trunc(Math.abs(t%60)),n=t>=0?"+":"-";switch(e){case"short":return`${n}${wi(i,2)}:${wi(s,2)}`;case"narrow":return`${n}${i}${s>0?`:${s}`:""}`;case"techie":return`${n}${wi(i,2)}${wi(s,2)}`;default:throw new RangeError(`Value format ${e} is out of range for property format`)}}function Pi(t){return function(t){return["hour","minute","second","millisecond"].reduce((e,i)=>(e[i]=t[i],e),{})}(t)}const Ui=["January","February","March","April","May","June","July","August","September","October","November","December"],Li=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Wi=["J","F","M","A","M","J","J","A","S","O","N","D"];function zi(t){switch(t){case"narrow":return[...Wi];case"short":return[...Li];case"long":return[...Ui];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}const Ri=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],Vi=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],ji=["M","T","W","T","F","S","S"];function Ji(t){switch(t){case"narrow":return[...ji];case"short":return[...Vi];case"long":return[...Ri];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}const Zi=["AM","PM"],Hi=["Before Christ","Anno Domini"],qi=["BC","AD"],Bi=["B","A"];function Yi(t){switch(t){case"narrow":return[...Bi];case"short":return[...qi];case"long":return[...Hi];default:return null}}function Gi(t,e){let i="";for(const s of t)s.literal?i+=s.val:i+=e(s.val);return i}const Ki={D:Rt,DD:Vt,DDD:Jt,DDDD:Zt,t:Ht,tt:qt,ttt:Bt,tttt:Yt,T:Gt,TT:Kt,TTT:Qt,TTTT:Xt,f:te,ff:ie,fff:re,ffff:ae,F:ee,FF:se,FFF:oe,FFFF:le};class Qi{static create(t,e={}){return new Qi(t,e)}static parseFormat(t){let e=null,i="",s=!1;const n=[];for(let r=0;r<t.length;r++){const o=t.charAt(r);"'"===o?((i.length>0||s)&&n.push({literal:s||/^\s+$/.test(i),val:""===i?"'":i}),e=null,i="",s=!s):s||o===e?i+=o:(i.length>0&&n.push({literal:/^\s+$/.test(i),val:i}),i=o,e=o)}return i.length>0&&n.push({literal:s||/^\s+$/.test(i),val:i}),n}static macroTokenToFormatOpts(t){return Ki[t]}constructor(t,e){this.opts=e,this.loc=t,this.systemLoc=null}formatWithSystemDefault(t,e){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(t,{...this.opts,...e}).format()}dtFormatter(t,e={}){return this.loc.dtFormatter(t,{...this.opts,...e})}formatDateTime(t,e){return this.dtFormatter(t,e).format()}formatDateTimeParts(t,e){return this.dtFormatter(t,e).formatToParts()}formatInterval(t,e){return this.dtFormatter(t.start,e).dtf.formatRange(t.start.toJSDate(),t.end.toJSDate())}resolvedOptions(t,e){return this.dtFormatter(t,e).resolvedOptions()}num(t,e=0,i=void 0){if(this.opts.forceSimple)return wi(t,e);const s={...this.opts};return e>0&&(s.padTo=e),i&&(s.signDisplay=i),this.loc.numberFormatter(s).format(t)}formatDateTimeFromString(t,e){const i="en"===this.loc.listingMode(),s=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,n=(e,i)=>this.loc.extract(t,e,i),r=e=>t.isOffsetFixed&&0===t.offset&&e.allowZ?"Z":t.isValid?t.zone.formatOffset(t.ts,e.format):"",o=(e,s)=>i?function(t,e){return zi(e)[t.month-1]}(t,e):n(s?{month:e}:{month:e,day:"numeric"},"month"),a=(e,s)=>i?function(t,e){return Ji(e)[t.weekday-1]}(t,e):n(s?{weekday:e}:{weekday:e,month:"long",day:"numeric"},"weekday"),l=e=>{const i=Qi.macroTokenToFormatOpts(e);return i?this.formatWithSystemDefault(t,i):e},c=e=>i?function(t,e){return Yi(e)[t.year<0?0:1]}(t,e):n({era:e},"era");return Gi(Qi.parseFormat(e),e=>{switch(e){case"S":return this.num(t.millisecond);case"u":case"SSS":return this.num(t.millisecond,3);case"s":return this.num(t.second);case"ss":return this.num(t.second,2);case"uu":return this.num(Math.floor(t.millisecond/10),2);case"uuu":return this.num(Math.floor(t.millisecond/100));case"m":return this.num(t.minute);case"mm":return this.num(t.minute,2);case"h":return this.num(t.hour%12==0?12:t.hour%12);case"hh":return this.num(t.hour%12==0?12:t.hour%12,2);case"H":return this.num(t.hour);case"HH":return this.num(t.hour,2);case"Z":return r({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return r({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return r({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return t.zone.offsetName(t.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return t.zone.offsetName(t.ts,{format:"long",locale:this.loc.locale});case"z":return t.zoneName;case"a":return i?function(t){return Zi[t.hour<12?0:1]}(t):n({hour:"numeric",hourCycle:"h12"},"dayperiod");case"d":return s?n({day:"numeric"},"day"):this.num(t.day);case"dd":return s?n({day:"2-digit"},"day"):this.num(t.day,2);case"c":case"E":return this.num(t.weekday);case"ccc":return a("short",!0);case"cccc":return a("long",!0);case"ccccc":return a("narrow",!0);case"EEE":return a("short",!1);case"EEEE":return a("long",!1);case"EEEEE":return a("narrow",!1);case"L":return s?n({month:"numeric",day:"numeric"},"month"):this.num(t.month);case"LL":return s?n({month:"2-digit",day:"numeric"},"month"):this.num(t.month,2);case"LLL":return o("short",!0);case"LLLL":return o("long",!0);case"LLLLL":return o("narrow",!0);case"M":return s?n({month:"numeric"},"month"):this.num(t.month);case"MM":return s?n({month:"2-digit"},"month"):this.num(t.month,2);case"MMM":return o("short",!1);case"MMMM":return o("long",!1);case"MMMMM":return o("narrow",!1);case"y":return s?n({year:"numeric"},"year"):this.num(t.year);case"yy":return s?n({year:"2-digit"},"year"):this.num(t.year.toString().slice(-2),2);case"yyyy":return s?n({year:"numeric"},"year"):this.num(t.year,4);case"yyyyyy":return s?n({year:"numeric"},"year"):this.num(t.year,6);case"G":return c("short");case"GG":return c("long");case"GGGGG":return c("narrow");case"kk":return this.num(t.weekYear.toString().slice(-2),2);case"kkkk":return this.num(t.weekYear,4);case"W":return this.num(t.weekNumber);case"WW":return this.num(t.weekNumber,2);case"n":return this.num(t.localWeekNumber);case"nn":return this.num(t.localWeekNumber,2);case"ii":return this.num(t.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(t.localWeekYear,4);case"o":return this.num(t.ordinal);case"ooo":return this.num(t.ordinal,3);case"q":return this.num(t.quarter);case"qq":return this.num(t.quarter,2);case"X":return this.num(Math.floor(t.ts/1e3));case"x":return this.num(t.ts);default:return l(e)}})}formatDurationFromString(t,e){const i="negativeLargestOnly"===this.opts.signMode?-1:1,s=t=>{switch(t[0]){case"S":return"milliseconds";case"s":return"seconds";case"m":return"minutes";case"h":return"hours";case"d":return"days";case"w":return"weeks";case"M":return"months";case"y":return"years";default:return null}},n=Qi.parseFormat(e),r=n.reduce((t,{literal:e,val:i})=>e?t:t.concat(i),[]),o=t.shiftTo(...r.map(s).filter(t=>t));return Gi(n,((t,e)=>n=>{const r=s(n);if(r){const s=e.isNegativeDuration&&r!==e.largestUnit?i:1;let o;return o="negativeLargestOnly"===this.opts.signMode&&r!==e.largestUnit?"never":"all"===this.opts.signMode?"always":"auto",this.num(t.get(r)*s,n.length,o)}return n})(o,{isNegativeDuration:o<0,largestUnit:Object.keys(o.values)[0]}))}}const Xi=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function ts(...t){const e=t.reduce((t,e)=>t+e.source,"");return RegExp(`^${e}$`)}function es(...t){return e=>t.reduce(([t,i,s],n)=>{const[r,o,a]=n(e,s);return[{...t,...r},o||i,a]},[{},null,1]).slice(0,2)}function is(t,...e){if(null==t)return[null,null];for(const[i,s]of e){const e=i.exec(t);if(e)return s(e)}return[null,null]}function ss(...t){return(e,i)=>{const s={};let n;for(n=0;n<t.length;n++)s[t[n]]=bi(e[i+n]);return[s,null,i+n]}}const ns=/(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/,rs=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,os=RegExp(`${rs.source}(?:${ns.source}?(?:\\[(${Xi.source})\\])?)?`),as=RegExp(`(?:[Tt]${os.source})?`),ls=ss("weekYear","weekNumber","weekDay"),cs=ss("year","ordinal"),hs=RegExp(`${rs.source} ?(?:${ns.source}|(${Xi.source}))?`),us=RegExp(`(?: ${hs.source})?`);function ds(t,e,i){const s=t[e];return hi(s)?i:bi(s)}function gs(t,e){return[{hours:ds(t,e,0),minutes:ds(t,e+1,0),seconds:ds(t,e+2,0),milliseconds:_i(t[e+3])},null,e+4]}function ms(t,e){const i=!t[e]&&!t[e+1],s=Ai(t[e+1],t[e+2]);return[{},i?null:Ae.instance(s),e+3]}function fs(t,e){return[{},t[e]?fe.create(t[e]):null,e+1]}const ps=RegExp(`^T?${rs.source}$`),vs=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function ys(t){const[e,i,s,n,r,o,a,l,c]=t,h="-"===e[0],u=l&&"-"===l[0],d=(t,e=!1)=>void 0!==t&&(e||t&&h)?-t:t;return[{years:d(ki(i)),months:d(ki(s)),weeks:d(ki(n)),days:d(ki(r)),hours:d(ki(o)),minutes:d(ki(a)),seconds:d(ki(l),"-0"===l),milliseconds:d(_i(c),u)}]}const ws={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function bs(t,e,i,s,n,r,o){const a={year:2===e.length?Ni(bi(e)):bi(e),month:Li.indexOf(i)+1,day:bi(s),hour:bi(n),minute:bi(r)};return o&&(a.second=bi(o)),t&&(a.weekday=t.length>3?Ri.indexOf(t)+1:Vi.indexOf(t)+1),a}const ks=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function _s(t){const[,e,i,s,n,r,o,a,l,c,h,u]=t,d=bs(e,n,s,i,r,o,a);let g;return g=l?ws[l]:c?0:Ai(h,u),[d,new Ae(g)]}const $s=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,Ss=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,Cs=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function Is(t){const[,e,i,s,n,r,o,a]=t;return[bs(e,n,s,i,r,o,a),Ae.utcInstance]}function xs(t){const[,e,i,s,n,r,o,a]=t;return[bs(e,a,i,s,n,r,o),Ae.utcInstance]}const Os=ts(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,as),Ds=ts(/(\d{4})-?W(\d\d)(?:-?(\d))?/,as),Ns=ts(/(\d{4})-?(\d{3})/,as),Ts=ts(os),As=es(function(t,e){return[{year:ds(t,e),month:ds(t,e+1,1),day:ds(t,e+2,1)},null,e+3]},gs,ms,fs),Ms=es(ls,gs,ms,fs),Fs=es(cs,gs,ms,fs),Es=es(gs,ms,fs),Ps=es(gs),Us=ts(/(\d{4})-(\d\d)-(\d\d)/,us),Ls=ts(hs),Ws=es(gs,ms,fs),zs="Invalid Duration",Rs={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},Vs={years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6},...Rs},js={years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:525949.2*60,milliseconds:525949.2*60*1e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:525949.2*60/4,milliseconds:7889237999.999999},months:{weeks:4.3481250000000005,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3},...Rs},Js=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],Zs=Js.slice(0).reverse();function Hs(t,e,i=!1){const s={values:i?e.values:{...t.values,...e.values||{}},loc:t.loc.clone(e.loc),conversionAccuracy:e.conversionAccuracy||t.conversionAccuracy,matrix:e.matrix||t.matrix};return new Gs(s)}function qs(t,e){let i=e.milliseconds??0;for(const s of Zs.slice(1))e[s]&&(i+=e[s]*t[s].milliseconds);return i}function Bs(t,e){const i=qs(t,e)<0?-1:1;Js.reduceRight((s,n)=>{if(hi(e[n]))return s;if(s){const r=e[s]*i,o=t[n][s],a=Math.floor(r/o);e[n]+=a*i,e[s]-=a*o*i}return n},null),Js.reduce((i,s)=>{if(hi(e[s]))return i;if(i){const n=e[i]%1;e[i]-=n,e[s]+=n*t[i][s]}return s},null)}function Ys(t){const e={};for(const[i,s]of Object.entries(t))0!==s&&(e[i]=s);return e}class Gs{constructor(t){const e="longterm"===t.conversionAccuracy||!1;let i=e?js:Vs;t.matrix&&(i=t.matrix),this.values=t.values,this.loc=t.loc||Ne.create(),this.conversionAccuracy=e?"longterm":"casual",this.invalid=t.invalid||null,this.matrix=i,this.isLuxonDuration=!0}static fromMillis(t,e){return Gs.fromObject({milliseconds:t},e)}static fromObject(t,e={}){if(null==t||"object"!=typeof t)throw new Pt("Duration.fromObject: argument expected to be an object, got "+(null===t?"null":typeof t));return new Gs({values:Fi(t,Gs.normalizeUnit),loc:Ne.fromObject(e),conversionAccuracy:e.conversionAccuracy,matrix:e.matrix})}static fromDurationLike(t){if(ui(t))return Gs.fromMillis(t);if(Gs.isDuration(t))return t;if("object"==typeof t)return Gs.fromObject(t);throw new Pt(`Unknown duration argument ${t} of type ${typeof t}`)}static fromISO(t,e){const[i]=function(t){return is(t,[vs,ys])}(t);return i?Gs.fromObject(i,e):Gs.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static fromISOTime(t,e){const[i]=function(t){return is(t,[ps,Ps])}(t);return i?Gs.fromObject(i,e):Gs.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static invalid(t,e=null){if(!t)throw new Pt("need to specify a reason the Duration is invalid");const i=t instanceof Ye?t:new Ye(t,e);if(Be.throwOnInvalid)throw new Mt(i);return new Gs({invalid:i})}static normalizeUnit(t){const e={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[t?t.toLowerCase():t];if(!e)throw new Et(t);return e}static isDuration(t){return t&&t.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(t,e={}){const i={...e,floor:!1!==e.round&&!1!==e.floor};return this.isValid?Qi.create(this.loc,i).formatDurationFromString(this,t):zs}toHuman(t={}){if(!this.isValid)return zs;const e=!1!==t.showZeros,i=Js.map(i=>{const s=this.values[i];return hi(s)||0===s&&!e?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...t,unit:i.slice(0,-1)}).format(s)}).filter(t=>t);return this.loc.listFormatter({type:"conjunction",style:t.listStyle||"narrow",...t}).format(i)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let t="P";return 0!==this.years&&(t+=this.years+"Y"),0===this.months&&0===this.quarters||(t+=this.months+3*this.quarters+"M"),0!==this.weeks&&(t+=this.weeks+"W"),0!==this.days&&(t+=this.days+"D"),0===this.hours&&0===this.minutes&&0===this.seconds&&0===this.milliseconds||(t+="T"),0!==this.hours&&(t+=this.hours+"H"),0!==this.minutes&&(t+=this.minutes+"M"),0===this.seconds&&0===this.milliseconds||(t+=$i(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===t&&(t+="T0S"),t}toISOTime(t={}){if(!this.isValid)return null;const e=this.toMillis();return e<0||e>=864e5?null:(t={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...t,includeOffset:!1},jn.fromMillis(e,{zone:"UTC"}).toISOTime(t))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?qs(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(t){if(!this.isValid)return this;const e=Gs.fromDurationLike(t),i={};for(const t of Js)(pi(e.values,t)||pi(this.values,t))&&(i[t]=e.get(t)+this.get(t));return Hs(this,{values:i},!0)}minus(t){if(!this.isValid)return this;const e=Gs.fromDurationLike(t);return this.plus(e.negate())}mapUnits(t){if(!this.isValid)return this;const e={};for(const i of Object.keys(this.values))e[i]=Mi(t(this.values[i],i));return Hs(this,{values:e},!0)}get(t){return this[Gs.normalizeUnit(t)]}set(t){return this.isValid?Hs(this,{values:{...this.values,...Fi(t,Gs.normalizeUnit)}}):this}reconfigure({locale:t,numberingSystem:e,conversionAccuracy:i,matrix:s}={}){return Hs(this,{loc:this.loc.clone({locale:t,numberingSystem:e}),matrix:s,conversionAccuracy:i})}as(t){return this.isValid?this.shiftTo(t).get(t):NaN}normalize(){if(!this.isValid)return this;const t=this.toObject();return Bs(this.matrix,t),Hs(this,{values:t},!0)}rescale(){return this.isValid?Hs(this,{values:Ys(this.normalize().shiftToAll().toObject())},!0):this}shiftTo(...t){if(!this.isValid)return this;if(0===t.length)return this;t=t.map(t=>Gs.normalizeUnit(t));const e={},i={},s=this.toObject();let n;for(const r of Js)if(t.indexOf(r)>=0){n=r;let t=0;for(const e in i)t+=this.matrix[e][r]*i[e],i[e]=0;ui(s[r])&&(t+=s[r]);const o=Math.trunc(t);e[r]=o,i[r]=(1e3*t-1e3*o)/1e3}else ui(s[r])&&(i[r]=s[r]);for(const t in i)0!==i[t]&&(e[n]+=t===n?i[t]:i[t]/this.matrix[n][t]);return Bs(this.matrix,e),Hs(this,{values:e},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;const t={};for(const e of Object.keys(this.values))t[e]=0===this.values[e]?0:-this.values[e];return Hs(this,{values:t},!0)}removeZeros(){return this.isValid?Hs(this,{values:Ys(this.values)},!0):this}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(t){if(!this.isValid||!t.isValid)return!1;if(!this.loc.equals(t.loc))return!1;function e(t,e){return void 0===t||0===t?void 0===e||0===e:t===e}for(const i of Js)if(!e(this.values[i],t.values[i]))return!1;return!0}}const Ks="Invalid Interval";class Qs{constructor(t){this.s=t.start,this.e=t.end,this.invalid=t.invalid||null,this.isLuxonInterval=!0}static invalid(t,e=null){if(!t)throw new Pt("need to specify a reason the Interval is invalid");const i=t instanceof Ye?t:new Ye(t,e);if(Be.throwOnInvalid)throw new At(i);return new Qs({invalid:i})}static fromDateTimes(t,e){const i=Jn(t),s=Jn(e),n=function(t,e){return t&&t.isValid?e&&e.isValid?e<t?Qs.invalid("end before start",`The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`):null:Qs.invalid("missing or invalid end"):Qs.invalid("missing or invalid start")}(i,s);return null==n?new Qs({start:i,end:s}):n}static after(t,e){const i=Gs.fromDurationLike(e),s=Jn(t);return Qs.fromDateTimes(s,s.plus(i))}static before(t,e){const i=Gs.fromDurationLike(e),s=Jn(t);return Qs.fromDateTimes(s.minus(i),s)}static fromISO(t,e){const[i,s]=(t||"").split("/",2);if(i&&s){let t,n,r,o;try{t=jn.fromISO(i,e),n=t.isValid}catch(s){n=!1}try{r=jn.fromISO(s,e),o=r.isValid}catch(s){o=!1}if(n&&o)return Qs.fromDateTimes(t,r);if(n){const i=Gs.fromISO(s,e);if(i.isValid)return Qs.after(t,i)}else if(o){const t=Gs.fromISO(i,e);if(t.isValid)return Qs.before(r,t)}}return Qs.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static isInterval(t){return t&&t.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get lastDateTime(){return this.isValid&&this.e?this.e.minus(1):null}get isValid(){return null===this.invalidReason}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(t="milliseconds"){return this.isValid?this.toDuration(t).get(t):NaN}count(t="milliseconds",e){if(!this.isValid)return NaN;const i=this.start.startOf(t,e);let s;return s=e?.useLocaleWeeks?this.end.reconfigure({locale:i.locale}):this.end,s=s.startOf(t,e),Math.floor(s.diff(i,t).get(t))+(s.valueOf()!==this.end.valueOf())}hasSame(t){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,t))}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(t){return!!this.isValid&&this.s>t}isBefore(t){return!!this.isValid&&this.e<=t}contains(t){return!!this.isValid&&this.s<=t&&this.e>t}set({start:t,end:e}={}){return this.isValid?Qs.fromDateTimes(t||this.s,e||this.e):this}splitAt(...t){if(!this.isValid)return[];const e=t.map(Jn).filter(t=>this.contains(t)).sort((t,e)=>t.toMillis()-e.toMillis()),i=[];let{s}=this,n=0;for(;s<this.e;){const t=e[n]||this.e,r=+t>+this.e?this.e:t;i.push(Qs.fromDateTimes(s,r)),s=r,n+=1}return i}splitBy(t){const e=Gs.fromDurationLike(t);if(!this.isValid||!e.isValid||0===e.as("milliseconds"))return[];let i,{s}=this,n=1;const r=[];for(;s<this.e;){const t=this.start.plus(e.mapUnits(t=>t*n));i=+t>+this.e?this.e:t,r.push(Qs.fromDateTimes(s,i)),s=i,n+=1}return r}divideEqually(t){return this.isValid?this.splitBy(this.length()/t).slice(0,t):[]}overlaps(t){return this.e>t.s&&this.s<t.e}abutsStart(t){return!!this.isValid&&+this.e===+t.s}abutsEnd(t){return!!this.isValid&&+t.e===+this.s}engulfs(t){return!!this.isValid&&this.s<=t.s&&this.e>=t.e}equals(t){return!(!this.isValid||!t.isValid)&&this.s.equals(t.s)&&this.e.equals(t.e)}intersection(t){if(!this.isValid)return this;const e=this.s>t.s?this.s:t.s,i=this.e<t.e?this.e:t.e;return e>=i?null:Qs.fromDateTimes(e,i)}union(t){if(!this.isValid)return this;const e=this.s<t.s?this.s:t.s,i=this.e>t.e?this.e:t.e;return Qs.fromDateTimes(e,i)}static merge(t){const[e,i]=t.sort((t,e)=>t.s-e.s).reduce(([t,e],i)=>e?e.overlaps(i)||e.abutsStart(i)?[t,e.union(i)]:[t.concat([e]),i]:[t,i],[[],null]);return i&&e.push(i),e}static xor(t){let e=null,i=0;const s=[],n=t.map(t=>[{time:t.s,type:"s"},{time:t.e,type:"e"}]),r=Array.prototype.concat(...n).sort((t,e)=>t.time-e.time);for(const t of r)i+="s"===t.type?1:-1,1===i?e=t.time:(e&&+e!==+t.time&&s.push(Qs.fromDateTimes(e,t.time)),e=null);return Qs.merge(s)}difference(...t){return Qs.xor([this].concat(t)).map(t=>this.intersection(t)).filter(t=>t&&!t.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:Ks}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(t=Rt,e={}){return this.isValid?Qi.create(this.s.loc.clone(e),t).formatInterval(this):Ks}toISO(t){return this.isValid?`${this.s.toISO(t)}/${this.e.toISO(t)}`:Ks}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:Ks}toISOTime(t){return this.isValid?`${this.s.toISOTime(t)}/${this.e.toISOTime(t)}`:Ks}toFormat(t,{separator:e=" – "}={}){return this.isValid?`${this.s.toFormat(t)}${e}${this.e.toFormat(t)}`:Ks}toDuration(t,e){return this.isValid?this.e.diff(this.s,t,e):Gs.invalid(this.invalidReason)}mapEndpoints(t){return Qs.fromDateTimes(t(this.s),t(this.e))}}class Xs{static hasDST(t=Be.defaultZone){const e=jn.now().setZone(t).set({month:12});return!t.isUniversal&&e.offset!==e.set({month:6}).offset}static isValidIANAZone(t){return fe.isValidZone(t)}static normalizeZone(t){return Fe(t,Be.defaultZone)}static getStartOfWeek({locale:t=null,locObj:e=null}={}){return(e||Ne.create(t)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:t=null,locObj:e=null}={}){return(e||Ne.create(t)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:t=null,locObj:e=null}={}){return(e||Ne.create(t)).getWeekendDays().slice()}static months(t="long",{locale:e=null,numberingSystem:i=null,locObj:s=null,outputCalendar:n="gregory"}={}){return(s||Ne.create(e,i,n)).months(t)}static monthsFormat(t="long",{locale:e=null,numberingSystem:i=null,locObj:s=null,outputCalendar:n="gregory"}={}){return(s||Ne.create(e,i,n)).months(t,!0)}static weekdays(t="long",{locale:e=null,numberingSystem:i=null,locObj:s=null}={}){return(s||Ne.create(e,i,null)).weekdays(t)}static weekdaysFormat(t="long",{locale:e=null,numberingSystem:i=null,locObj:s=null}={}){return(s||Ne.create(e,i,null)).weekdays(t,!0)}static meridiems({locale:t=null}={}){return Ne.create(t).meridiems()}static eras(t="short",{locale:e=null}={}){return Ne.create(e,null,"gregory").eras(t)}static features(){return{relative:gi(),localeWeek:mi()}}}function tn(t,e){const i=t=>t.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),s=i(e)-i(t);return Math.floor(Gs.fromMillis(s).as("days"))}function en(t,e=t=>t){return{regex:t,deser:([t])=>e(function(t){let e=parseInt(t,10);if(isNaN(e)){e="";for(let i=0;i<t.length;i++){const s=t.charCodeAt(i);if(-1!==t[i].search(Ee.hanidec))e+=Ue.indexOf(t[i]);else for(const t in Pe){const[i,n]=Pe[t];s>=i&&s<=n&&(e+=s-i)}}return parseInt(e,10)}return e}(t))}}const sn=`[ ${String.fromCharCode(160)}]`,nn=new RegExp(sn,"g");function rn(t){return t.replace(/\./g,"\\.?").replace(nn,sn)}function on(t){return t.replace(/\./g,"").replace(nn," ").toLowerCase()}function an(t,e){return null===t?null:{regex:RegExp(t.map(rn).join("|")),deser:([i])=>t.findIndex(t=>on(i)===on(t))+e}}function ln(t,e){return{regex:t,deser:([,t,e])=>Ai(t,e),groups:e}}function cn(t){return{regex:t,deser:([t])=>t}}const hn={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}};let un=null;function dn(t,e){return Array.prototype.concat(...t.map(t=>function(t,e){if(t.literal)return t;const i=fn(Qi.macroTokenToFormatOpts(t.val),e);return null==i||i.includes(void 0)?t:i}(t,e)))}class gn{constructor(t,e){if(this.locale=t,this.format=e,this.tokens=dn(Qi.parseFormat(e),t),this.units=this.tokens.map(e=>function(t,e){const i=We(e),s=We(e,"{2}"),n=We(e,"{3}"),r=We(e,"{4}"),o=We(e,"{6}"),a=We(e,"{1,2}"),l=We(e,"{1,3}"),c=We(e,"{1,6}"),h=We(e,"{1,9}"),u=We(e,"{2,4}"),d=We(e,"{4,6}"),g=t=>{return{regex:RegExp((e=t.val,e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"))),deser:([t])=>t,literal:!0};var e},m=(m=>{if(t.literal)return g(m);switch(m.val){case"G":return an(e.eras("short"),0);case"GG":return an(e.eras("long"),0);case"y":return en(c);case"yy":case"kk":return en(u,Ni);case"yyyy":case"kkkk":return en(r);case"yyyyy":return en(d);case"yyyyyy":return en(o);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return en(a);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return en(s);case"MMM":return an(e.months("short",!0),1);case"MMMM":return an(e.months("long",!0),1);case"LLL":return an(e.months("short",!1),1);case"LLLL":return an(e.months("long",!1),1);case"o":case"S":return en(l);case"ooo":case"SSS":return en(n);case"u":return cn(h);case"uu":return cn(a);case"uuu":case"E":case"c":return en(i);case"a":return an(e.meridiems(),0);case"EEE":return an(e.weekdays("short",!1),1);case"EEEE":return an(e.weekdays("long",!1),1);case"ccc":return an(e.weekdays("short",!0),1);case"cccc":return an(e.weekdays("long",!0),1);case"Z":case"ZZ":return ln(new RegExp(`([+-]${a.source})(?::(${s.source}))?`),2);case"ZZZ":return ln(new RegExp(`([+-]${a.source})(${s.source})?`),2);case"z":return cn(/[a-z_+-/]{1,256}?/i);case" ":return cn(/[^\S\n\r]/);default:return g(m)}})(t)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"};return m.token=t,m}(e,t)),this.disqualifyingUnit=this.units.find(t=>t.invalidReason),!this.disqualifyingUnit){const[t,e]=function(t){const e=t.map(t=>t.regex).reduce((t,e)=>`${t}(${e.source})`,"");return[`^${e}$`,t]}(this.units);this.regex=RegExp(t,"i"),this.handlers=e}}explainFromTokens(t){if(this.isValid){const[e,i]=function(t,e,i){const s=t.match(e);if(s){const t={};let e=1;for(const n in i)if(pi(i,n)){const r=i[n],o=r.groups?r.groups+1:1;!r.literal&&r.token&&(t[r.token.val[0]]=r.deser(s.slice(e,e+o))),e+=o}return[s,t]}return[s,{}]}(t,this.regex,this.handlers),[s,n,r]=i?function(t){let e,i=null;hi(t.z)||(i=fe.create(t.z)),hi(t.Z)||(i||(i=new Ae(t.Z)),e=t.Z),hi(t.q)||(t.M=3*(t.q-1)+1),hi(t.h)||(t.h<12&&1===t.a?t.h+=12:12===t.h&&0===t.a&&(t.h=0)),0===t.G&&t.y&&(t.y=-t.y),hi(t.u)||(t.S=_i(t.u));const s=Object.keys(t).reduce((e,i)=>{const s=(t=>{switch(t){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}})(i);return s&&(e[s]=t[i]),e},{});return[s,i,e]}(i):[null,null,void 0];if(pi(i,"a")&&pi(i,"H"))throw new Ft("Can't include meridiem when specifying 24-hour format");return{input:t,tokens:this.tokens,regex:this.regex,rawMatches:e,matches:i,result:s,zone:n,specificOffset:r}}return{input:t,tokens:this.tokens,invalidReason:this.invalidReason}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function mn(t,e,i){return new gn(t,i).explainFromTokens(e)}function fn(t,e){if(!t)return null;const i=Qi.create(e,t).dtFormatter((un||(un=jn.fromMillis(1555555555555)),un)),s=i.formatToParts(),n=i.resolvedOptions();return s.map(e=>function(t,e,i){const{type:s,value:n}=t;if("literal"===s){const t=/^\s+$/.test(n);return{literal:!t,val:t?" ":n}}const r=e[s];let o=s;"hour"===s&&(o=null!=e.hour12?e.hour12?"hour12":"hour24":null!=e.hourCycle?"h11"===e.hourCycle||"h12"===e.hourCycle?"hour12":"hour24":i.hour12?"hour12":"hour24");let a=hn[o];if("object"==typeof a&&(a=a[r]),a)return{literal:!1,val:a}}(e,t,n))}const pn="Invalid DateTime",vn=864e13;function yn(t){return new Ye("unsupported zone",`the zone "${t.name}" is not supported`)}function wn(t){return null===t.weekData&&(t.weekData=si(t.c)),t.weekData}function bn(t){return null===t.localWeekData&&(t.localWeekData=si(t.c,t.loc.getMinDaysInFirstWeek(),t.loc.getStartOfWeek())),t.localWeekData}function kn(t,e){const i={ts:t.ts,zone:t.zone,c:t.c,o:t.o,loc:t.loc,invalid:t.invalid};return new jn({...i,...e,old:i})}function _n(t,e,i){let s=t-60*e*1e3;const n=i.offset(s);if(e===n)return[s,e];s-=60*(n-e)*1e3;const r=i.offset(s);return n===r?[s,n]:[t-60*Math.min(n,r)*1e3,Math.max(n,r)]}function $n(t,e){const i=new Date(t+=60*e*1e3);return{year:i.getUTCFullYear(),month:i.getUTCMonth()+1,day:i.getUTCDate(),hour:i.getUTCHours(),minute:i.getUTCMinutes(),second:i.getUTCSeconds(),millisecond:i.getUTCMilliseconds()}}function Sn(t,e,i){return _n(xi(t),e,i)}function Cn(t,e){const i=t.o,s=t.c.year+Math.trunc(e.years),n=t.c.month+Math.trunc(e.months)+3*Math.trunc(e.quarters),r={...t.c,year:s,month:n,day:Math.min(t.c.day,Ii(s,n))+Math.trunc(e.days)+7*Math.trunc(e.weeks)},o=Gs.fromObject({years:e.years-Math.trunc(e.years),quarters:e.quarters-Math.trunc(e.quarters),months:e.months-Math.trunc(e.months),weeks:e.weeks-Math.trunc(e.weeks),days:e.days-Math.trunc(e.days),hours:e.hours,minutes:e.minutes,seconds:e.seconds,milliseconds:e.milliseconds}).as("milliseconds"),a=xi(r);let[l,c]=_n(a,i,t.zone);return 0!==o&&(l+=o,c=t.zone.offset(l)),{ts:l,o:c}}function In(t,e,i,s,n,r){const{setZone:o,zone:a}=i;if(t&&0!==Object.keys(t).length||e){const s=e||a,n=jn.fromObject(t,{...i,zone:s,specificOffset:r});return o?n:n.setZone(a)}return jn.invalid(new Ye("unparsable",`the input "${n}" can't be parsed as ${s}`))}function xn(t,e,i=!0){return t.isValid?Qi.create(Ne.create("en-US"),{allowZ:i,forceSimple:!0}).formatDateTimeFromString(t,e):null}function On(t,e,i){const s=t.c.year>9999||t.c.year<0;let n="";if(s&&t.c.year>=0&&(n+="+"),n+=wi(t.c.year,s?6:4),"year"===i)return n;if(e){if(n+="-",n+=wi(t.c.month),"month"===i)return n;n+="-"}else if(n+=wi(t.c.month),"month"===i)return n;return n+=wi(t.c.day),n}function Dn(t,e,i,s,n,r,o){let a=!i||0!==t.c.millisecond||0!==t.c.second,l="";switch(o){case"day":case"month":case"year":break;default:if(l+=wi(t.c.hour),"hour"===o)break;if(e){if(l+=":",l+=wi(t.c.minute),"minute"===o)break;a&&(l+=":",l+=wi(t.c.second))}else{if(l+=wi(t.c.minute),"minute"===o)break;a&&(l+=wi(t.c.second))}if("second"===o)break;!a||s&&0===t.c.millisecond||(l+=".",l+=wi(t.c.millisecond,3))}return n&&(t.isOffsetFixed&&0===t.offset&&!r?l+="Z":t.o<0?(l+="-",l+=wi(Math.trunc(-t.o/60)),l+=":",l+=wi(Math.trunc(-t.o%60))):(l+="+",l+=wi(Math.trunc(t.o/60)),l+=":",l+=wi(Math.trunc(t.o%60)))),r&&(l+="["+t.zone.ianaName+"]"),l}const Nn={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},Tn={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},An={ordinal:1,hour:0,minute:0,second:0,millisecond:0},Mn=["year","month","day","hour","minute","second","millisecond"],Fn=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],En=["year","ordinal","hour","minute","second","millisecond"];function Pn(t){const e={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[t.toLowerCase()];if(!e)throw new Et(t);return e}function Un(t){switch(t.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return Pn(t)}}function Ln(t,e){const i=Fe(e.zone,Be.defaultZone);if(!i.isValid)return jn.invalid(yn(i));const s=Ne.fromObject(e);let n,r;if(hi(t.year))n=Be.now();else{for(const e of Mn)hi(t[e])&&(t[e]=Nn[e]);const e=li(t)||ci(t);if(e)return jn.invalid(e);const s=function(t){if(void 0===Rn&&(Rn=Be.now()),"iana"!==t.type)return t.offset(Rn);const e=t.name;let i=Vn.get(e);return void 0===i&&(i=t.offset(Rn),Vn.set(e,i)),i}(i);[n,r]=Sn(t,s,i)}return new jn({ts:n,zone:i,loc:s,o:r})}function Wn(t,e,i){const s=!!hi(i.round)||i.round,n=hi(i.rounding)?"trunc":i.rounding,r=(t,r)=>(t=$i(t,s||i.calendary?0:2,i.calendary?"round":n),e.loc.clone(i).relFormatter(i).format(t,r)),o=s=>i.calendary?e.hasSame(t,s)?0:e.startOf(s).diff(t.startOf(s),s).get(s):e.diff(t,s).get(s);if(i.unit)return r(o(i.unit),i.unit);for(const t of i.units){const e=o(t);if(Math.abs(e)>=1)return r(e,t)}return r(t>e?-0:0,i.units[i.units.length-1])}function zn(t){let e,i={};return t.length>0&&"object"==typeof t[t.length-1]?(i=t[t.length-1],e=Array.from(t).slice(0,t.length-1)):e=Array.from(t),[i,e]}let Rn;const Vn=new Map;class jn{constructor(t){const e=t.zone||Be.defaultZone;let i=t.invalid||(Number.isNaN(t.ts)?new Ye("invalid input"):null)||(e.isValid?null:yn(e));this.ts=hi(t.ts)?Be.now():t.ts;let s=null,n=null;if(!i)if(t.old&&t.old.ts===this.ts&&t.old.zone.equals(e))[s,n]=[t.old.c,t.old.o];else{const r=ui(t.o)&&!t.old?t.o:e.offset(this.ts);s=$n(this.ts,r),i=Number.isNaN(s.year)?new Ye("invalid input"):null,s=i?null:s,n=i?null:r}this._zone=e,this.loc=t.loc||Ne.create(),this.invalid=i,this.weekData=null,this.localWeekData=null,this.c=s,this.o=n,this.isLuxonDateTime=!0}static now(){return new jn({})}static local(){const[t,e]=zn(arguments),[i,s,n,r,o,a,l]=e;return Ln({year:i,month:s,day:n,hour:r,minute:o,second:a,millisecond:l},t)}static utc(){const[t,e]=zn(arguments),[i,s,n,r,o,a,l]=e;return t.zone=Ae.utcInstance,Ln({year:i,month:s,day:n,hour:r,minute:o,second:a,millisecond:l},t)}static fromJSDate(t,e={}){const i=function(t){return"[object Date]"===Object.prototype.toString.call(t)}(t)?t.valueOf():NaN;if(Number.isNaN(i))return jn.invalid("invalid input");const s=Fe(e.zone,Be.defaultZone);return s.isValid?new jn({ts:i,zone:s,loc:Ne.fromObject(e)}):jn.invalid(yn(s))}static fromMillis(t,e={}){if(ui(t))return t<-vn||t>vn?jn.invalid("Timestamp out of range"):new jn({ts:t,zone:Fe(e.zone,Be.defaultZone),loc:Ne.fromObject(e)});throw new Pt(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`)}static fromSeconds(t,e={}){if(ui(t))return new jn({ts:1e3*t,zone:Fe(e.zone,Be.defaultZone),loc:Ne.fromObject(e)});throw new Pt("fromSeconds requires a numerical input")}static fromObject(t,e={}){t=t||{};const i=Fe(e.zone,Be.defaultZone);if(!i.isValid)return jn.invalid(yn(i));const s=Ne.fromObject(e),n=Fi(t,Un),{minDaysInFirstWeek:r,startOfWeek:o}=ai(n,s),a=Be.now(),l=hi(e.specificOffset)?i.offset(a):e.specificOffset,c=!hi(n.ordinal),h=!hi(n.year),u=!hi(n.month)||!hi(n.day),d=h||u,g=n.weekYear||n.weekNumber;if((d||c)&&g)throw new Ft("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(u&&c)throw new Ft("Can't mix ordinal dates with month/day");const m=g||n.weekday&&!d;let f,p,v=$n(a,l);m?(f=Fn,p=Tn,v=si(v,r,o)):c?(f=En,p=An,v=ri(v)):(f=Mn,p=Nn);let y=!1;for(const t of f)hi(n[t])?n[t]=y?p[t]:v[t]:y=!0;const w=m?function(t,e=4,i=1){const s=di(t.weekYear),n=yi(t.weekNumber,1,Di(t.weekYear,e,i)),r=yi(t.weekday,1,7);return s?n?!r&&Qe("weekday",t.weekday):Qe("week",t.weekNumber):Qe("weekYear",t.weekYear)}(n,r,o):c?function(t){const e=di(t.year),i=yi(t.ordinal,1,Ci(t.year));return e?!i&&Qe("ordinal",t.ordinal):Qe("year",t.year)}(n):li(n),b=w||ci(n);if(b)return jn.invalid(b);const k=m?ni(n,r,o):c?oi(n):n,[_,$]=Sn(k,l,i),S=new jn({ts:_,zone:i,o:$,loc:s});return n.weekday&&d&&t.weekday!==S.weekday?jn.invalid("mismatched weekday",`you can't specify both a weekday of ${n.weekday} and a date of ${S.toISO()}`):S.isValid?S:jn.invalid(S.invalid)}static fromISO(t,e={}){const[i,s]=function(t){return is(t,[Os,As],[Ds,Ms],[Ns,Fs],[Ts,Es])}(t);return In(i,s,e,"ISO 8601",t)}static fromRFC2822(t,e={}){const[i,s]=function(t){return is(function(t){return t.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}(t),[ks,_s])}(t);return In(i,s,e,"RFC 2822",t)}static fromHTTP(t,e={}){const[i,s]=function(t){return is(t,[$s,Is],[Ss,Is],[Cs,xs])}(t);return In(i,s,e,"HTTP",e)}static fromFormat(t,e,i={}){if(hi(t)||hi(e))throw new Pt("fromFormat requires an input string and a format");const{locale:s=null,numberingSystem:n=null}=i,r=Ne.fromOpts({locale:s,numberingSystem:n,defaultToEN:!0}),[o,a,l,c]=function(t,e,i){const{result:s,zone:n,specificOffset:r,invalidReason:o}=mn(t,e,i);return[s,n,r,o]}(r,t,e);return c?jn.invalid(c):In(o,a,i,`format ${e}`,t,l)}static fromString(t,e,i={}){return jn.fromFormat(t,e,i)}static fromSQL(t,e={}){const[i,s]=function(t){return is(t,[Us,As],[Ls,Ws])}(t);return In(i,s,e,"SQL",t)}static invalid(t,e=null){if(!t)throw new Pt("need to specify a reason the DateTime is invalid");const i=t instanceof Ye?t:new Ye(t,e);if(Be.throwOnInvalid)throw new Tt(i);return new jn({invalid:i})}static isDateTime(t){return t&&t.isLuxonDateTime||!1}static parseFormatForOpts(t,e={}){const i=fn(t,Ne.fromObject(e));return i?i.map(t=>t?t.val:null).join(""):null}static expandFormat(t,e={}){return dn(Qi.parseFormat(t),Ne.fromObject(e)).map(t=>t.val).join("")}static resetCache(){Rn=void 0,Vn.clear()}get(t){return this[t]}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?wn(this).weekYear:NaN}get weekNumber(){return this.isValid?wn(this).weekNumber:NaN}get weekday(){return this.isValid?wn(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?bn(this).weekday:NaN}get localWeekNumber(){return this.isValid?bn(this).weekNumber:NaN}get localWeekYear(){return this.isValid?bn(this).weekYear:NaN}get ordinal(){return this.isValid?ri(this.c).ordinal:NaN}get monthShort(){return this.isValid?Xs.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?Xs.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?Xs.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?Xs.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];const t=864e5,e=6e4,i=xi(this.c),s=this.zone.offset(i-t),n=this.zone.offset(i+t),r=this.zone.offset(i-s*e),o=this.zone.offset(i-n*e);if(r===o)return[this];const a=i-r*e,l=i-o*e,c=$n(a,r),h=$n(l,o);return c.hour===h.hour&&c.minute===h.minute&&c.second===h.second&&c.millisecond===h.millisecond?[kn(this,{ts:a}),kn(this,{ts:l})]:[this]}get isInLeapYear(){return Si(this.year)}get daysInMonth(){return Ii(this.year,this.month)}get daysInYear(){return this.isValid?Ci(this.year):NaN}get weeksInWeekYear(){return this.isValid?Di(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?Di(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(t={}){const{locale:e,numberingSystem:i,calendar:s}=Qi.create(this.loc.clone(t),t).resolvedOptions(this);return{locale:e,numberingSystem:i,outputCalendar:s}}toUTC(t=0,e={}){return this.setZone(Ae.instance(t),e)}toLocal(){return this.setZone(Be.defaultZone)}setZone(t,{keepLocalTime:e=!1,keepCalendarTime:i=!1}={}){if((t=Fe(t,Be.defaultZone)).equals(this.zone))return this;if(t.isValid){let s=this.ts;if(e||i){const e=t.offset(this.ts),i=this.toObject();[s]=Sn(i,e,t)}return kn(this,{ts:s,zone:t})}return jn.invalid(yn(t))}reconfigure({locale:t,numberingSystem:e,outputCalendar:i}={}){return kn(this,{loc:this.loc.clone({locale:t,numberingSystem:e,outputCalendar:i})})}setLocale(t){return this.reconfigure({locale:t})}set(t){if(!this.isValid)return this;const e=Fi(t,Un),{minDaysInFirstWeek:i,startOfWeek:s}=ai(e,this.loc),n=!hi(e.weekYear)||!hi(e.weekNumber)||!hi(e.weekday),r=!hi(e.ordinal),o=!hi(e.year),a=!hi(e.month)||!hi(e.day),l=o||a,c=e.weekYear||e.weekNumber;if((l||r)&&c)throw new Ft("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(a&&r)throw new Ft("Can't mix ordinal dates with month/day");let h;n?h=ni({...si(this.c,i,s),...e},i,s):hi(e.ordinal)?(h={...this.toObject(),...e},hi(e.day)&&(h.day=Math.min(Ii(h.year,h.month),h.day))):h=oi({...ri(this.c),...e});const[u,d]=Sn(h,this.o,this.zone);return kn(this,{ts:u,o:d})}plus(t){return this.isValid?kn(this,Cn(this,Gs.fromDurationLike(t))):this}minus(t){return this.isValid?kn(this,Cn(this,Gs.fromDurationLike(t).negate())):this}startOf(t,{useLocaleWeeks:e=!1}={}){if(!this.isValid)return this;const i={},s=Gs.normalizeUnit(t);switch(s){case"years":i.month=1;case"quarters":case"months":i.day=1;case"weeks":case"days":i.hour=0;case"hours":i.minute=0;case"minutes":i.second=0;case"seconds":i.millisecond=0}if("weeks"===s)if(e){const t=this.loc.getStartOfWeek(),{weekday:e}=this;e<t&&(i.weekNumber=this.weekNumber-1),i.weekday=t}else i.weekday=1;if("quarters"===s){const t=Math.ceil(this.month/3);i.month=3*(t-1)+1}return this.set(i)}endOf(t,e){return this.isValid?this.plus({[t]:1}).startOf(t,e).minus(1):this}toFormat(t,e={}){return this.isValid?Qi.create(this.loc.redefaultToEN(e)).formatDateTimeFromString(this,t):pn}toLocaleString(t=Rt,e={}){return this.isValid?Qi.create(this.loc.clone(e),t).formatDateTime(this):pn}toLocaleParts(t={}){return this.isValid?Qi.create(this.loc.clone(t),t).formatDateTimeParts(this):[]}toISO({format:t="extended",suppressSeconds:e=!1,suppressMilliseconds:i=!1,includeOffset:s=!0,extendedZone:n=!1,precision:r="milliseconds"}={}){if(!this.isValid)return null;const o="extended"===t;let a=On(this,o,r=Pn(r));return Mn.indexOf(r)>=3&&(a+="T"),a+=Dn(this,o,e,i,s,n,r),a}toISODate({format:t="extended",precision:e="day"}={}){return this.isValid?On(this,"extended"===t,Pn(e)):null}toISOWeekDate(){return xn(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:t=!1,suppressSeconds:e=!1,includeOffset:i=!0,includePrefix:s=!1,extendedZone:n=!1,format:r="extended",precision:o="milliseconds"}={}){return this.isValid?(o=Pn(o),(s&&Mn.indexOf(o)>=3?"T":"")+Dn(this,"extended"===r,e,t,i,n,o)):null}toRFC2822(){return xn(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return xn(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?On(this,!0):null}toSQLTime({includeOffset:t=!0,includeZone:e=!1,includeOffsetSpace:i=!0}={}){let s="HH:mm:ss.SSS";return(e||t)&&(i&&(s+=" "),e?s+="z":t&&(s+="ZZ")),xn(this,s,!0)}toSQL(t={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(t)}`:null}toString(){return this.isValid?this.toISO():pn}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(t={}){if(!this.isValid)return{};const e={...this.c};return t.includeConfig&&(e.outputCalendar=this.outputCalendar,e.numberingSystem=this.loc.numberingSystem,e.locale=this.loc.locale),e}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(t,e="milliseconds",i={}){if(!this.isValid||!t.isValid)return Gs.invalid("created by diffing an invalid DateTime");const s={locale:this.locale,numberingSystem:this.numberingSystem,...i},n=(a=e,Array.isArray(a)?a:[a]).map(Gs.normalizeUnit),r=t.valueOf()>this.valueOf(),o=function(t,e,i,s){let[n,r,o,a]=function(t,e,i){const s=[["years",(t,e)=>e.year-t.year],["quarters",(t,e)=>e.quarter-t.quarter+4*(e.year-t.year)],["months",(t,e)=>e.month-t.month+12*(e.year-t.year)],["weeks",(t,e)=>{const i=tn(t,e);return(i-i%7)/7}],["days",tn]],n={},r=t;let o,a;for(const[l,c]of s)i.indexOf(l)>=0&&(o=l,n[l]=c(t,e),a=r.plus(n),a>e?(n[l]--,(t=r.plus(n))>e&&(a=t,n[l]--,t=r.plus(n))):t=a);return[t,n,a,o]}(t,e,i);const l=e-n,c=i.filter(t=>["hours","minutes","seconds","milliseconds"].indexOf(t)>=0);0===c.length&&(o<e&&(o=n.plus({[a]:1})),o!==n&&(r[a]=(r[a]||0)+l/(o-n)));const h=Gs.fromObject(r,s);return c.length>0?Gs.fromMillis(l,s).shiftTo(...c).plus(h):h}(r?this:t,r?t:this,n,s);var a;return r?o.negate():o}diffNow(t="milliseconds",e={}){return this.diff(jn.now(),t,e)}until(t){return this.isValid?Qs.fromDateTimes(this,t):this}hasSame(t,e,i){if(!this.isValid)return!1;const s=t.valueOf(),n=this.setZone(t.zone,{keepLocalTime:!0});return n.startOf(e,i)<=s&&s<=n.endOf(e,i)}equals(t){return this.isValid&&t.isValid&&this.valueOf()===t.valueOf()&&this.zone.equals(t.zone)&&this.loc.equals(t.loc)}toRelative(t={}){if(!this.isValid)return null;const e=t.base||jn.fromObject({},{zone:this.zone}),i=t.padding?this<e?-t.padding:t.padding:0;let s=["years","months","days","hours","minutes","seconds"],n=t.unit;return Array.isArray(t.unit)&&(s=t.unit,n=void 0),Wn(e,this.plus(i),{...t,numeric:"always",units:s,unit:n})}toRelativeCalendar(t={}){return this.isValid?Wn(t.base||jn.fromObject({},{zone:this.zone}),this,{...t,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...t){if(!t.every(jn.isDateTime))throw new Pt("min requires all arguments be DateTimes");return fi(t,t=>t.valueOf(),Math.min)}static max(...t){if(!t.every(jn.isDateTime))throw new Pt("max requires all arguments be DateTimes");return fi(t,t=>t.valueOf(),Math.max)}static fromFormatExplain(t,e,i={}){const{locale:s=null,numberingSystem:n=null}=i;return mn(Ne.fromOpts({locale:s,numberingSystem:n,defaultToEN:!0}),t,e)}static fromStringExplain(t,e,i={}){return jn.fromFormatExplain(t,e,i)}static buildFormatParser(t,e={}){const{locale:i=null,numberingSystem:s=null}=e,n=Ne.fromOpts({locale:i,numberingSystem:s,defaultToEN:!0});return new gn(n,t)}static fromFormatParser(t,e,i={}){if(hi(t)||hi(e))throw new Pt("fromFormatParser requires an input string and a format parser");const{locale:s=null,numberingSystem:n=null}=i,r=Ne.fromOpts({locale:s,numberingSystem:n,defaultToEN:!0});if(!r.equals(e.locale))throw new Pt(`fromFormatParser called with a locale of ${r}, but the format parser was created for ${e.locale}`);const{result:o,zone:a,specificOffset:l,invalidReason:c}=e.explainFromTokens(t);return c?jn.invalid(c):In(o,a,i,`format ${e.format}`,t,l)}static get DATE_SHORT(){return Rt}static get DATE_MED(){return Vt}static get DATE_MED_WITH_WEEKDAY(){return jt}static get DATE_FULL(){return Jt}static get DATE_HUGE(){return Zt}static get TIME_SIMPLE(){return Ht}static get TIME_WITH_SECONDS(){return qt}static get TIME_WITH_SHORT_OFFSET(){return Bt}static get TIME_WITH_LONG_OFFSET(){return Yt}static get TIME_24_SIMPLE(){return Gt}static get TIME_24_WITH_SECONDS(){return Kt}static get TIME_24_WITH_SHORT_OFFSET(){return Qt}static get TIME_24_WITH_LONG_OFFSET(){return Xt}static get DATETIME_SHORT(){return te}static get DATETIME_SHORT_WITH_SECONDS(){return ee}static get DATETIME_MED(){return ie}static get DATETIME_MED_WITH_SECONDS(){return se}static get DATETIME_MED_WITH_WEEKDAY(){return ne}static get DATETIME_FULL(){return re}static get DATETIME_FULL_WITH_SECONDS(){return oe}static get DATETIME_HUGE(){return ae}static get DATETIME_HUGE_WITH_SECONDS(){return le}}function Jn(t){if(jn.isDateTime(t))return t;if(t&&t.valueOf&&ui(t.valueOf()))return jn.fromJSDate(t);if(t&&"object"==typeof t)return jn.fromObject(t);throw new Pt(`Unknown datetime argument: ${t}, of type ${typeof t}`)}class Zn{constructor(t,e={}){this.logger=wt("clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.host=t,this.config=e,t.addController(this)}hostConnected(){this.logger.debug("ClockController host connected"),this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}hostDisconnected(){this.logger.debug("ClockController host disconnected"),this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(t){this.logger.debug("Updating ClockController config:",t),this.config={...this.config,...t};const e=new Date,i=this.config.language||"cs",s=this.config.timeZone;this.updateTime(e,s),this.updateDate(e,i,s),this.host.requestUpdate()}update(){const t=new Date,e=this.config.language||"cs",i=this.config.timeZone;this.updateTime(t,i),0!==t.getSeconds()&&""!==this._currentDate||this.updateDate(t,e,i),this.host.requestUpdate()}updateTime(t,e){var i,s,n,r,o;const a="hidden"===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.second),l=!0===(null===(s=this.config.timeFormat)||void 0===s?void 0:s.hour12);let c,h,u;if(e){const i=jn.fromJSDate(t,e?{zone:e}:void 0);c=i.hour,h=i.minute,u=i.second}else c=t.getHours(),h=t.getMinutes(),u=t.getSeconds();if(a&&(this._seconds=""),l){const t=c>=12;c%=12,c=c||12,this._ampm=t?"PM":"AM"}else this._ampm="";const d="numeric"!==(null===(n=this.config.timeFormat)||void 0===n?void 0:n.hour);this._hours=d?c.toString().padStart(2,"0"):c.toString();const g="numeric"!==(null===(r=this.config.timeFormat)||void 0===r?void 0:r.minute);if(this._minutes=g?h.toString().padStart(2,"0"):h.toString(),!a){const t="numeric"!==(null===(o=this.config.timeFormat)||void 0===o?void 0:o.second);this._seconds=t?u.toString().padStart(2,"0"):u.toString()}}updateDate(t,e,i){let s=Dt(t,e,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},i);s=s.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=s}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var Hn=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let qn=class extends at{constructor(){super(),this.logger=wt("clock-component"),this.clockController=new Zn(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}updated(t){if(super.updated(t),t.has("timeFormat")||t.has("dateFormat")||t.has("language")||t.has("timeZone")){if(this.logger.debug("Clock properties changed, updating ClockController"),t.has("timeFormat")){const e=t.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(e)} -> ${JSON.stringify(this.timeFormat)}`)}if(t.has("dateFormat")){const e=t.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(e)} -> ${JSON.stringify(this.dateFormat)}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}render(){var t,e;const i=this.getSeconds(),s=void 0!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second)&&"hidden"!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second);return this.logger.debug(`Rendering clock - Seconds: ${i}, Show seconds: ${s}, TimeFormat: ${JSON.stringify(this.timeFormat)}`),j`
            <div class="clock" style="color: ${this.fontColor};">
                <span class="hours-minutes" style="color: ${this.fontColor};">${this.getHours()}:${this.getMinutes()}</span>
                ${s?j`
                    <div class="seconds-container">
                        <span class="seconds" style="color: ${this.fontColor};">${i}</span>
                        ${this.getAmPm()?j`<span class="ampm" style="color: ${this.fontColor};">${this.getAmPm()}</span>`:""}
                    </div>
                `:this.getAmPm()?j`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: ${this.fontColor};">${this.getAmPm()}</span>
                    </div>
                `:""}
            </div>
            <div class="date" style="color: ${this.fontColor};">${this.getCurrentDate()}</div>
        `}};qn.styles=o`
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
    `,Hn([dt({type:Object})],qn.prototype,"timeFormat",void 0),Hn([dt({type:Object})],qn.prototype,"dateFormat",void 0),Hn([dt({type:String})],qn.prototype,"fontColor",void 0),Hn([dt({type:String})],qn.prototype,"language",void 0),Hn([dt({type:String})],qn.prototype,"timeZone",void 0),qn=Hn([ct("ha-clock")],qn);class Bn{constructor(t,e={}){this.logger=wt("sensor-controller"),this._sensorValues=[],this.config={},this.host=t,this.config=e,t.addController(this)}hostConnected(){this.logger.debug("SensorController host connected")}hostDisconnected(){this.logger.debug("SensorController host disconnected")}updateConfig(t){this.logger.debug("Updating SensorController config:",t),this.config={...this.config,...t},this.hass&&this.updateSensorValues()}updateHass(t){this.hass=t,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=[],this.config.sensors.forEach(t=>{if(t.entity&&this.hass.states[t.entity]){const e=this.hass.states[t.entity];let i=e.state;e.attributes&&e.attributes.unit_of_measurement&&(i+=` ${e.attributes.unit_of_measurement}`),this._sensorValues.push({entity:t.entity,label:t.label,value:i})}else t.entity&&this._sensorValues.push({entity:t.entity,label:t.label,value:"unavailable"})}),this.host.requestUpdate()):this._sensorValues=[]}get sensorValues(){return this._sensorValues}}var Yn=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let Gn=class extends at{constructor(){super(),this.logger=wt("sensor-component"),this.sensorController=new Bn(this,{sensors:this.sensors})}updated(t){super.updated(t),t.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),t.has("hass")&&this.hass&&(this.logger.debug("Hass changed, updating SensorController"),this.sensorController.updateHass(this.hass))}render(){const t=this.sensorController.sensorValues;return 0===t.length?j``:j`
            <div class="sensor-container" style="color: ${this.fontColor};">
                ${t.map(t=>j`
                    <div class="sensor-item">
                        ${t.label?j`
                                <div class="sensor-label" style="color: ${this.fontColor};">
                                    ${t.label}
                                </div>`:""}
                        <div class="sensor-value" style="color: ${this.fontColor};">
                            ${t.value}
                        </div>
                    </div>
                `)}
            </div>
        `}};Gn.styles=o`
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
    `,Yn([dt({type:Array})],Gn.prototype,"sensors",void 0),Yn([dt({type:String})],Gn.prototype,"fontColor",void 0),Yn([dt({type:Object})],Gn.prototype,"hass",void 0),Gn=Yn([ct("ha-sensors")],Gn);class Kn{static getInstance(){return Kn.instance||(Kn.instance=new Kn),Kn.instance}constructor(){this.sources=new Map}register(t){this.sources.has(t.id)&&kt.warn(`Image source with ID ${t.id} is already registered. Overwriting.`),this.sources.set(t.id,t)}registerAll(t){t.forEach(t=>this.register(t))}getSource(t){return this.sources.get(t)}getAllSources(){return Array.from(this.sources.values())}hasSource(t){return this.sources.has(t)}}var Qn,Xn;!function(t){t.Unspecified="unspecified",t.SunriseSunset="sunrise-sunset",t.Day="day",t.Night="night"}(Qn||(Qn={})),function(t){t.All="all",t.ClearSky="clear sky",t.Clouds="clouds",t.Rain="rain",t.Snow="snow",t.Mist="mist"}(Xn||(Xn={}));const tr=[Xn.All,Xn.ClearSky,Xn.Clouds,Xn.Rain,Xn.Snow,Xn.Mist],er=[Qn.Unspecified,Qn.SunriseSunset,Qn.Day,Qn.Night];function ir(t,e){if(!t)return;const i=t.toLowerCase();for(const t of e)if(i.includes(t.toLowerCase().replace(" ","-")))return t}class sr{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0}getLogger(){return wt(`${this.id}-source`)}shuffleArray(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}}async fetchImagesAsync(t,e,i){return this.getLogger().debug(`Fetching images with weather: ${e}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(t,e,i)}async getNextImageUrlAsync(t,e,i){var s;this.getLogger().debug(`GetNextImageUrl called with weather: ${e}, timeOfDay: ${i}`),this.lastWeather===e&&this.lastTimeOfDay===i||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.lastWeather=e,this.lastTimeOfDay=i);const n=`${e}_${i}`;if(!this.imageUrlCache.has(n)||0===(null===(s=this.imageUrlCache.get(n))||void 0===s?void 0:s.length)){const s=[...await this.fetchImagesAsync(t,e,i)];this.shuffleArray(s),this.imageUrlCache.set(n,s),this.getLogger().info(`Cached ${s.length} images for weather: ${e}, timeOfDay: ${i}`)}const r=this.imageUrlCache.get(n)||[];if(0===r.length)return this.getLogger().warn(`No images available for weather: ${e}, timeOfDay: ${i}`),"";const o=r[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%r.length,this.getLogger().info(`Returning image for weather: ${e}, timeOfDay: ${i}, URL: ${o}`),o}filterImagesByWeatherAndTime(t,e,i){if(this.getLogger().debug(`Current time of day: ${i}`),this.getLogger().debug(`Current weather condition: ${e}`),0===t.length)return[];let s=[];return s=t.filter(t=>(t.weather===e||t.weather===Xn.All||e===Xn.All)&&t.timeOfDay===i),0===s.length&&(s=t.filter(t=>(t.weather===e||t.weather===Xn.All||e===Xn.All)&&t.timeOfDay===Qn.Unspecified)),0===s.length&&(s=t.filter(t=>t.timeOfDay===i)),0===s.length&&(s=t.filter(t=>t.timeOfDay===Qn.Unspecified)),s.length>0?(this.getLogger().debug(`Found ${s.length} images matching current conditions`),s.map(t=>t.url)):(this.getLogger().info("No matching images found, returning all images"),t.map(t=>t.url))}convertUrlsToBackgroundImages(t){return this.getLogger().debug(`Converting ${t.length} URLs to BackgroundImage objects`),t.map(t=>({url:t,weather:ir(t,tr)||Xn.All,timeOfDay:ir(t,er)||Qn.Unspecified}))}}const nr=new class extends sr{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=wt("local-source")}async fetchImagesInternalAsync(t,e,i){return t.backgroundImages&&t.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${t.backgroundImages.length} images`),this.logger.debug(`First image URL: ${t.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(t.backgroundImages,e,i)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},rr=new class extends sr{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=wt("picsum-source")}async fetchImagesInternalAsync(t,e,i){const s=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${s}`),[s]}getDefaultConfig(){return{}}},or=new class extends sr{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=wt("unsplash-source"),this.collections={nature:["3330448","4378039","1319040","3694365"],water:["3694365","1053828","2411979","981639"],architecture:["3348849","4468022","3348849","922312"],city:["3470372","1079798","2563","1110498"],landscape:["4466935","3694365","827743","2422483"],animals:["3106804","1242150","139386","162213"],food:["3687999","2059134","2489501","2252258"],travel:["3349809","3356576","2476111","1901880"],people:["3641869","4468022","181581","139941"],technology:["4587649","8761738","2059134","1263277"],abstract:["4587649","8761738","2059134","1263277"],space:["2022043","2159937","2506084","531563"],interior:["1118894","4466935","3330452","4468022"],flowers:["2411979","827743","1079798","3694365"],dark:["4466935","3694365","827743","2422483"],light:["4466935","3694365","827743","2422483"],minimal:["4466935","3694365","827743","2422483"],colorful:["4466935","3694365","827743","2422483"],black:["4466935","3694365","827743","2422483"],white:["4466935","3694365","827743","2422483"],red:["4466935","3694365","827743","2422483"],blue:["4466935","3694365","827743","2422483"],green:["4466935","3694365","827743","2422483"],yellow:["4466935","3694365","827743","2422483"],orange:["4466935","3694365","827743","2422483"],purple:["4466935","3694365","827743","2422483"],pink:["4466935","3694365","827743","2422483"],brown:["4466935","3694365","827743","2422483"],gray:["4466935","3694365","827743","2422483"],"black-and-white":["4466935","3694365","827743","2422483"]},this.defaultCollections=["3694365","1053828","4466935","3348849"]}async fetchImagesInternalAsync(t,e,i){const s=t.count||5;let n=t.category||"";const r=t.apiKey||"",o=[];if(this.logger.debug(`Current weather: ${e}, time of day: ${i}`),this.logger.debug(`Using category with weather and time: ${n}`),r)try{return this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(r,n,s,e,i,t)}catch(t){this.logger.error("Error fetching images from Unsplash API:",t),this.logger.debug("Falling back to direct URL method")}this.logger.debug("Using direct URL method for Unsplash images");const a=n.split(",").map(t=>t.trim().toLowerCase());this.logger.debug(`Categories for direct URL method: ${a.join(", ")}`);let l=[];a.forEach(t=>{this.collections[t]&&(l=[...l,...this.collections[t]])}),0===l.length?(this.logger.debug("No matching collections found, using default collections"),l=this.defaultCollections):this.logger.debug(`Using collection IDs: ${l.join(", ")}`);for(let t=0;t<s;t++)try{const e=`https://source.unsplash.com/collection/${l[Math.floor(Math.random()*l.length)]}/1920x1080/?sig=${Date.now()+t}`;this.logger.debug(`Generated direct URL (${t+1}/${s}): ${e}`),o.push(e)}catch(e){this.logger.warn(`Failed to generate Unsplash image URL (attempt ${t+1}/${s})`,e)}return o}async fetchImagesFromApiAsync(t,e,i,s,n,r){const o=[],a=(null==r?void 0:r.contentFilter)||"high";let l="";if(e){const t=e.split(",").map(t=>t.trim().toLowerCase());t.length>0&&(l=t[0]),t.length>1&&(l+=` ${t.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${t.join(", ")}`)}const c=s.toLowerCase();l+=` ${c}`,"sunrise-sunset"===n?l+=" sunrise sunset dawn dusk":"day"===n?l+=" daylight midday day":"night"===n&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${n}`);try{let e="https://api.unsplash.com/photos/random?";const s=new URLSearchParams({client_id:t,count:i.toString(),orientation:"landscape",content_filter:a});l&&s.append("query",l);const n=new URLSearchParams(s);n.delete("client_id"),n.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${n.toString()}`),e+=s.toString();const r=e.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.debug(`Making API request to: ${r}`);const c=await fetch(e);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();this.logger.debug(`API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(t=>{const e=t.urls.raw+"&w=1920&h=1080&fit=crop";o.push(e)}),this.logger.debug(`Fetched ${o.length} images from Unsplash API`)}catch(t){throw this.logger.error("Error fetching from Unsplash API:",t),t}return o}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",useApi:!0,contentFilter:"high"}}getCategories(){return Object.keys(this.collections)}},ar=new class extends sr{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=wt("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}async checkEntityAsync(t){try{const e=window.document.querySelector("home-assistant").hass;if(!e)return void this.logger.warn("Could not get Home Assistant instance");const i=e.states[t];if(!i)return void this.logger.warn(`Entity ${t} not found`);this.updateCacheFromEntity(i),this.entityId=t,this.logger.debug(`Checked entity ${t}`)}catch(t){this.logger.error("Error checking entity:",t)}}updateCacheFromEntity(t){const e=t.attributes.files;e&&Array.isArray(e)&&e.every(t=>"string"==typeof t)?(this.cachedImages=this.convertUrlsToBackgroundImages(e),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${e.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(t,e,i){const s=t.entity;if(!s)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(s);const n=Date.now();if(this.cachedImages.length>0&&n-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,e,i);try{const t=window.document.querySelector("home-assistant").hass;if(!t)return this.logger.warn("Could not get Home Assistant instance"),[];const n=t.states[s];return n?(this.updateCacheFromEntity(n),this.filterImagesByWeatherAndTime(this.cachedImages,e,i)):(this.logger.warn(`Sensor ${s} not found`),[])}catch(t){return this.logger.error("Error fetching images from sensor:",t),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},lr=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=wt("null-source")}async fetchImagesAsync(t,e,i){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(t,e,i){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},cr={local:nr,picsum:rr,unsplash:or,sensor:ar};class hr{constructor(){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=wt("background-image-manager")}initialize(t={}){const e=t.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${e}`),"none"===e)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var i;if(this.imageSourceId=e||"picsum",this.imageSource=(i=this.imageSourceId,cr[i]||lr),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;const s=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...s,...t},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(t,e){if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${t}, time of day: ${e}`);const i=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,t,e);return i?(this.logger.debug(`Got image URL: ${i}`),i):(this.logger.warn("No image URL returned from source"),"")}catch(t){return this.logger.error("Error getting next image URL:",t),""}}getImageSourceId(){return this.imageSourceId}}Kn.getInstance().registerAll([rr,nr,or,ar]);class ur{constructor(t,e={}){this.logger=wt("background-image-controller"),this.backgroundImageManager=new hr,this.currentWeather=Xn.All,this._currentImageUrl="",this._previousImageUrl="",this._isTransitioning=!1,this._fetchingImageUrls=!1,this.host=t,this.config=e,t.addController(this)}hostConnected(){this.logger.debug("Host connected"),this.config.imageSourceConfig&&this.initializeManagerAsync()}hostDisconnected(){this.logger.debug("Host disconnected"),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(t){const e={...this.config};this.config={...this.config,...t},kt.info("Update the BackgroundImageController with new configuration");const i=this.isInitialized;e.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{i&&this.fetchNewImageAsync(this.currentWeather).catch(t=>this.logger.error("Error fetching image after reinitialization:",t))}).catch(t=>this.logger.error("Error during BackgroundImageManager initialization:",t)):e.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:t,...e}=this.config.imageSourceConfig||{},i=e.imageSourceId?e:{imageSourceId:"picsum"};if(this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${i.imageSourceId||"default"}`),!this.backgroundImageManager.initialize(i))return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(t){this.logger.error("Error fetching image URLs:",t)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const t=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${t/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(t){this.logger.error("Error in image rotation interval:",t)}})()},t)}async fetchNewImageAsync(t){try{let e=t,i=function(){const t=(new Date).getHours();return t>=5&&t<9||t>=17&&t<21?Qn.SunriseSunset:t>=9&&t<17?Qn.Day:t>=21||t<5?Qn.Night:Qn.Unspecified}();const s=await this.backgroundImageManager.getNextImageUrlAsync(e,i);if(s){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${s}`);const t=new Image;t.onload=()=>{this.logger.debug(`New image loaded successfully: ${s}`),this._currentImageUrl&&(this._previousImageUrl=this._currentImageUrl,this._isTransitioning=!0,this.host.requestUpdate(),setTimeout(()=>{if(this.logger.debug("Starting transition"),this.host instanceof HTMLElement&&this.host.shadowRoot){const t=this.host.shadowRoot.querySelector(".background-container");t?(t.classList.add("active-transition"),this.logger.debug("Added active-transition class to container"),setTimeout(()=>{t.classList.contains("active-transition")&&t.classList.remove("active-transition"),this._isTransitioning=!1,this.host.requestUpdate(),this.logger.debug("Transition completed")},1e3)):this.logger.error("Could not find background container element")}else this.logger.error("Could not access shadow root")},50)),this._currentImageUrl=s,this._previousImageUrl||(this._isTransitioning=!1,this.host.requestUpdate())},t.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${s}`)},t.src=s}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(t){this.logger.error("Error fetching new dynamic image:",t)}}updateWeather(t){this.isInitialized?this.currentWeather!==t&&(this.logger.info(`Updating weather condition to: ${t}`),this.currentWeather=t,this.fetchNewImageAsync(t).catch(t=>this.logger.error("Error fetching image after weather update:",t))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=t,this.fetchNewImageAsync(t).catch(t=>this.logger.error("Error fetching image after initialization:",t))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}get isTransitioning(){return this._isTransitioning}}var dr=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let gr=class extends at{constructor(){super(),this.backgroundOpacity=.5,this.logger=wt("background-image-component"),this.backgroundImageController=new ur(this,{})}updated(t){var e;super.updated(t),t.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(e=this.config)&&void 0!==e?e:{})),t.has("weather")&&this.weather&&this.backgroundImageController.updateWeather(this.weather)}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}get isTransitioning(){return this.backgroundImageController.isTransitioning}render(){const t=this.currentImageUrl,e=this.previousImageUrl,i=this.isTransitioning;return j`
            <div class="background-container ${i?"transitioning":""}">
                ${t?j`

                        ${i&&e?j`
                                <img class="background-image previous" src="${e}" >
                            `:""}
                        <img class="background-image" src="${t}">
                        <div class="background-overlay" style="opacity: ${void 0!==this.backgroundOpacity?this.backgroundOpacity:.5};"></div>
                    `:""}
            </div>
        `}};gr.styles=o`
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
    `,dr([dt({type:Number})],gr.prototype,"backgroundOpacity",void 0),dr([dt({type:String})],gr.prototype,"weather",void 0),dr([dt({type:Object})],gr.prototype,"config",void 0),gr=dr([ct("ha-background-image")],gr);class mr{static getInstance(){return mr.instance||(mr.instance=new mr),mr.instance}constructor(){this.providers=new Map}register(t){this.providers.has(t.id)&&kt.warn(`Weather provider with ID ${t.id} is already registered. Overwriting.`),this.providers.set(t.id,t)}getProvider(t){return this.providers.get(t)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(t){return this.providers.has(t)}}const fr=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(t){if(!t.apiKey)throw new Error("OpenWeatherMap API key is required");const e=t.latitude||50.0755,i=t.longitude||14.4378,s=t.units||"metric",n=t.language||"cs";try{const r=`https://api.openweathermap.org/data/2.5/forecast?lat=${e}&lon=${i}&units=${s}&lang=${n}&appid=${t.apiKey}`;kt.debug("[OpenWeatherMap] "+r);const o=await fetch(r);if(!o.ok)throw new Error(`OpenWeatherMap API error: ${o.statusText}`);const a=await o.json();if(!a.list||!a.list.length)throw new Error("No forecast data available");const l=a.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},u=new Map;return a.list.forEach(t=>{var e;const i=new Date(1e3*t.dt).toISOString().split("T")[0];u.has(i)||u.set(i,[]),null===(e=u.get(i))||void 0===e||e.push(t)}),{current:h,daily:Array.from(u.entries()).map(([t,e])=>{const i=e.map(t=>t.main.temp),s=Math.min(...i),n=Math.max(...i),r=e[Math.floor(e.length/2)]||e[0],o=e.filter(t=>void 0!==t.pop).map(t=>t.pop),a=o.length>0?o.reduce((t,e)=>t+e,0)/o.length*100:0;return{date:new Date(t),temperatureMin:s,temperatureMax:n,condition:r.weather[0].description,icon:this.getIconUrl(r.weather[0].icon),precipitation:a,humidity:r.main.humidity,windSpeed:r.wind.speed}})}}catch(t){throw kt.error("Error fetching weather data from OpenWeatherMap:",t),t}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"cs"}}getIconUrl(t){return`https://openweathermap.org/img/wn/${t}@2x.png`}getWindDirection(t){return["N","NE","E","SE","S","SW","W","NW"][Math.round(t/45)%8]}mapWeatherCondition(t){let e;switch(kt.debug(`[OpenWeatherMap] Mapping weather condition: ${t}`),t.toLowerCase()){case"clear":case"clear sky":e=Xn.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":e=Xn.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":e=Xn.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":e=Xn.Rain;break;case"tornado":case"windy":case"all":default:e=Xn.All;break;case"snow":e=Xn.Snow}return kt.debug(`[OpenWeatherMap] Mapped to Weather enum: ${e}`),e}},pr=mr.getInstance();pr.register(fr);class vr{constructor(t,e={}){this.logger=wt("weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this.config={},this.host=t,this.config=e,t.addController(this)}hostConnected(){this.logger.debug("WeatherController host connected"),this.config.showWeather&&(this.fetchWeatherDataAsync(),this.setupUpdateInterval())}hostDisconnected(){this.logger.debug("WeatherController host disconnected"),this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0)}updateConfig(t){this.logger.debug("Updating WeatherController config:",t);const e=this.config.showWeather,i=this.config.weatherUpdateInterval;this.config={...this.config,...t},!e&&this.config.showWeather&&this.fetchWeatherDataAsync(),i!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),this.host.requestUpdate()}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let t=this.config.weatherUpdateInterval||1800;t=Math.max(t,60);const e=1e3*t;this.logger.debug(`Setting weather update interval to ${t} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(t){this.logger.error("Error in weather update interval:",t)}})()},e)}async fetchWeatherDataAsync(){if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const e=this.config.weatherProvider||"openweathermap",i=(t=e,pr.getProvider(t));if(!i)throw new Error(`Weather provider '${e}' not found`);let s=i.getDefaultConfig();this.config.weatherConfig&&(s={...s,...this.config.weatherConfig},this.config.weatherConfig.units&&(s.units=this.config.weatherConfig.units,this.logger.debug(`Using weather units: ${s.units}`))),this._weatherData=await i.fetchWeatherAsync(s),this.logger.info(`Fetched weather data from ${i.name}:`,this._weatherData)}catch(t){this._weatherError=!0,this._weatherErrorMessage=t instanceof Error?t.message:String(t),this.logger.error("Error fetching weather data:",t)}finally{this._weatherLoading=!1,this.host.requestUpdate()}var t}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}}var yr=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let wr=class extends at{constructor(){super(),this.logger=wt("weather-component"),this.weatherController=new vr(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval})}updated(t){if(super.updated(t),t.has("showWeather")||t.has("weatherProvider")||t.has("weatherConfig")||t.has("weatherDisplayMode")||t.has("weatherForecastDays")||t.has("weatherTitle")||t.has("weatherUpdateInterval")){this.logger.debug("Weather properties changed, updating WeatherController");const t={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval};this.weatherController.updateConfig(t)}}translateWeatherCondition(t){const e=this.language||"cs",i=function(t,e,i=t){if(!Ot().includes(e))return null!==i?i:t;const s=xt[e];if(!s)return null!==i?i:t;const n=function(t,e){if(void 0!==t[e])return t[e];const i=e.split(".");let s=t;for(const t of i){if(null==s||"object"!=typeof s)return;s=s[t]}return s}(s,t);return"string"==typeof n?n:null!==i?i:t}(`conditions.${t.toLowerCase().replace(/ /g,"_")}`,e,null);return null!==i?i:t}formatForecastDate(t){return Dt(t,this.language||"cs",{weekday:"short"})}get weatherData(){return this.weatherController.weatherData}render(){const t=this.weatherController.weatherData;if(this.weatherController.hasError)return j`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!t)return j`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;const e=this.weatherDisplayMode||"both",i=this.weatherForecastDays||3,s=this.weatherTitle||"Weather",n=Math.min(i,t.daily.length);return j`
            <div class="weather-container" style="color: ${this.fontColor};">
                <div class="weather-title" style="color: ${this.fontColor};">${s}</div>

                ${"current"===e||"both"===e?j`
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

                ${"forecast"===e||"both"===e?j`
                        <div class="weather-forecast">
                            ${t.daily.slice(0,n).map(t=>j`
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
        `}};var br,kr,_r;wr.styles=o`
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
    `,yr([dt({type:Boolean})],wr.prototype,"showWeather",void 0),yr([dt({type:String})],wr.prototype,"weatherProvider",void 0),yr([dt({type:Object})],wr.prototype,"weatherConfig",void 0),yr([dt({type:String})],wr.prototype,"weatherDisplayMode",void 0),yr([dt({type:Number})],wr.prototype,"weatherForecastDays",void 0),yr([dt({type:String})],wr.prototype,"weatherTitle",void 0),yr([dt({type:Number})],wr.prototype,"weatherUpdateInterval",void 0),yr([dt({type:String})],wr.prototype,"fontColor",void 0),yr([dt({type:String})],wr.prototype,"language",void 0),wr=yr([ct("ha-weather")],wr),(_r=br||(br={})).language="language",_r.system="system",_r.comma_decimal="comma_decimal",_r.decimal_comma="decimal_comma",_r.space_comma="space_comma",_r.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(kr||(kr={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var $r=function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n};new Set(["call-service","divider","section","weblink","cast","select"]);var Sr=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let Cr=class extends at{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._timeFormatOptions={hour12:[{value:!0,label:"12-hour"},{value:!1,label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._languageOptions=[],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback(),this._languageOptions=Ct.map(t=>({value:t.code,label:t.label}))}_getTransportationProviderOptions(){return[...St.getAllProviders().map(t=>({value:t.id,label:t.name}))]}setConfig(t){const e=t,i=e.imageSource||"none";let s={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(s={...s,...e.timeFormat},void 0===e.timeFormat.second&&(s.second=void 0)),this._config={...e,timeFormat:s,dateFormat:e.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:i,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",showWeather:void 0!==e.showWeather&&e.showWeather,weatherProvider:e.weatherProvider||"openweathermap",weatherConfig:e.weatherConfig||{},weatherDisplayMode:e.weatherDisplayMode||"both",weatherForecastDays:e.weatherForecastDays||3,transportation:e.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops()}_loadSensors(){var t;(null===(t=this._config)||void 0===t?void 0:t.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var t;(null===(t=this._config)||void 0===t?void 0:t.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadBackgroundImages(){var t;(null===(t=this._config)||void 0===t?void 0:t.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,$r(this,"config-changed",{config:t})}}_removeSensor(t){if(this._sensors=this._sensors.filter((e,i)=>i!==t),this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,$r(this,"config-changed",{config:t})}}_sensorChanged(t,e,i){if(this._sensors=this._sensors.map((s,n)=>n===t?{...s,[e]:i}:s),this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,$r(this,"config-changed",{config:t})}}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this._config){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],this._config=t,$r(this,"config-changed",{config:t})}}_removeStop(t){if(this._stops=this._stops.filter((e,i)=>i!==t),this._config&&this._config.transportation){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],0===this._stops.length&&(t.transportation=void 0),this._config=t,$r(this,"config-changed",{config:t})}}_stopChanged(t,e,i){if(this._stops=this._stops.map((s,n)=>n===t?{...s,[e]:i}:s),this._config&&this._config.transportation){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],this._config=t,$r(this,"config-changed",{config:t})}}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:Xn.All,timeOfDay:Qn.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(t){this._backgroundImages=this._backgroundImages.filter((e,i)=>i!==t),this._updateBackgroundImagesConfig()}_updateBackgroundImage(t,e){this._backgroundImages=this._backgroundImages.map((i,s)=>{if(s===t){const t={...i,...e};if(e.url&&t.url){if(t.weather===Xn.All){const e=ir(t.url,tr);e&&(t.weather=e,kt.debug(`Auto-detected weather: ${t.weather} from URL: ${t.url}`))}if(t.timeOfDay===Qn.Unspecified){const e=ir(t.url,er);e&&(t.timeOfDay=e,kt.debug(`Auto-detected timeOfDay: ${t.timeOfDay} from URL: ${t.url}`))}}return t}return i}),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this._config){const t=JSON.parse(JSON.stringify(this._config));t.backgroundImages=[...this._backgroundImages],this._config=t,$r(this,"config-changed",{config:t})}}static get styles(){return o`
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
        `}render(){var t,e,i,s,n,r,o,a,l,c,h,u,d,g,m,f,p,v,y,w,b,k,_,$,S;if(!this.hass||!this._config)return j``;const C=Object.keys(this.hass.states).sort();return j`
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
                                        @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.fontColor=e.value||"#FFFFFF",this._config=i,$r(this,"config-changed",{config:i})}}
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.language=e.value||"cs",this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._languageOptions.map(t=>j`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.logLevel=e.value||"warn",this._config=i,$r(this,"config-changed",{config:i})}}
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour12:"true"===e.value},this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.hour12.map(t=>j`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour:e.value},this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.hour.map(t=>j`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,minute:e.value},this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.minute.map(t=>j`
                                                <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Second Display</div>
                            <div class="value">
                                <ha-select
                                        label="Second Display"
                                        .value=${void 0===(null===(s=this._config.timeFormat)||void 0===s?void 0:s.second)?"undefined":null===(n=this._config.timeFormat)||void 0===n?void 0:n.second}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,second:"undefined"===e.value?"hidden":e.value},this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.second.map(t=>j`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,weekday:"undefined"===e.value?"hidden":e.value},this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.weekday.map(t=>j`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,month:"undefined"===e.value?"hidden":e.value},this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.month.map(t=>j`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,day:"undefined"===e.value?"hidden":e.value},this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.day.map(t=>j`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,year:"undefined"===e.value?"hidden":e.value},this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.year.map(t=>j`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageSource=e.value,i.useOnlineImages="none"!==e.value&&"local"!==e.value,this._config=i,$r(this,"config-changed",{config:i})}}
                                >
                                    ${this._imageSourceOptions.map(t=>j`
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
                                        @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundOpacity="string"==typeof e.value?parseFloat(e.value):e.value,this._config=i,$r(this,"config-changed",{config:i})}}
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
                                        @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundRotationInterval="string"==typeof e.value?parseInt(e.value,10):e.value,this._config=i,$r(this,"config-changed",{config:i})}}
                                ></ha-slider>
                                <span>${this._config.backgroundRotationInterval||90} seconds</span>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                ${"local"===this._config.imageSource?j`
                    <!-- Background Images Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Local Background Images</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure local image URLs. Images will be automatically categorized by weather condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day (sunrise-sunset, day, night) in your file paths.
                            </div>

                            <div class="section-subheader">Background Images</div>

                            ${this._backgroundImages.map((t,e)=>j`
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
                                            ${Object.values(Xn).map(t=>j`
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
                                            ${Object.values(Qn).map(t=>j`
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

                ${"unsplash"===this._config.imageSource?j`
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
                                            .value=${(null===(u=this._config.imageConfig)||void 0===u?void 0:u.category)||"nature"}
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.category=e.value||"nature",this._config=i,$r(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="info-text">
                                An API key is required for Unsplash to work properly.
                            </div>

                            ${j`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="API Key"
                                                .value=${(null===(d=this._config.imageConfig)||void 0===d?void 0:d.apiKey)||""}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.apiKey=e.value||"",this._config=i,$r(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${(null===(g=this._config.imageConfig)||void 0===g?void 0:g.contentFilter)||"high"}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.contentFilter=e.value||"high",this._config=i,$r(this,"config-changed",{config:i})}}
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

                ${"sensor"===this._config.imageSource?j`
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
                                        .value=${(null===(m=this._config.imageConfig)||void 0===m?void 0:m.entity)||""}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.entity=e.value||"",this._config=i,$r(this,"config-changed",{config:i})}}
                                    >
                                        ${C.filter(t=>t.startsWith("sensor.")).map(t=>j`
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
                        ${this._sensors.map((t,e)=>j`
                            <div class="sensor-row">
                                <div class="sensor-entity">
                                    <ha-select
                                            label="Entity"
                                            .value=${t.entity||""}
                                            @click=${t=>{t.stopPropagation()}}
                                            @closed=${t=>{t.stopPropagation();const i=t.target;i&&this._sensorChanged(e,"entity",i.value||"")}}
                                    >
                                        ${C.map(t=>j`
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
                                        @change=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.showWeather=e.checked||!1,this._config=i,$r(this,"config-changed",{config:i})}}
                                ></ha-switch>
                                <span>Display weather forecast</span>
                            </div>
                        </div>

                        ${this._config.showWeather?j`
                            <div class="row">
                                <div class="label">Weather Title</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Title for weather section"
                                            .value=${this._config.weatherTitle||"Weather"}
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherTitle=e.value||"Weather",this._config=i,$r(this,"config-changed",{config:i})}}
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
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherProvider=e.value||"openweathermap",this._config=i,$r(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherProviderOptions.map(t=>j`
                                                    <mwc-list-item .value=${t.value}>${t.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"openweathermap"===this._config.weatherProvider?j`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="OpenWeatherMap API Key"
                                                .value=${(null===(f=this._config.weatherConfig)||void 0===f?void 0:f.apiKey)||""}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},apiKey:e.value||""},this._config=i,$r(this,"config-changed",{config:i})}}
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
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},latitude:parseFloat(e.value||"50.0755")},this._config=i,$r(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <ha-textfield
                                                label="Longitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${(null===(v=this._config.weatherConfig)||void 0===v?void 0:v.longitude)||14.4378}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},longitude:parseFloat(e.value||"14.4378")},this._config=i,$r(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                            `:""}

                            ${"openweathermap"===this._config.weatherProvider?j`
                                <div class="row">
                                    <div class="label">Units</div>
                                    <div class="value">
                                        <ha-select
                                                label="Units"
                                                .value=${(null===(y=this._config.weatherConfig)||void 0===y?void 0:y.units)||"metric"}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},units:e.value||"metric"},this._config=i,$r(this,"config-changed",{config:i})}}
                                        >
                                            ${this._unitsOptions.map(t=>j`
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
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherDisplayMode=e.value||"both",this._config=i,$r(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherDisplayModeOptions.map(t=>j`
                                                    <mwc-list-item .value=${t.value}>${t.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"forecast"===this._config.weatherDisplayMode||"both"===this._config.weatherDisplayMode?j`
                                <div class="row">
                                    <div class="label">Forecast Days</div>
                                    <div class="value">
                                        <ha-slider
                                                min="1"
                                                max="7"
                                                step="1"
                                                pin
                                                .value=${this._config.weatherForecastDays||3}
                                                @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherForecastDays="string"==typeof e.value?parseInt(e.value,10):e.value,this._config=i,$r(this,"config-changed",{config:i})}}
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
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof e.value?parseInt(e.value,10):e.value;s=Math.max(s||30,1);const n=60*s;i.weatherUpdateInterval=n,this._config=i,$r(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <span>minutes</span>
                                    </div>
                                </div>
                            `:""}
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===this._config.enableTransportation?j`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <div class="content">

                            <div class="row">
                                <div class="label">Transportation Provider</div>
                                <div class="value">
                                    <ha-select
                                            label="Provider"
                                            .value=${(null===(w=this._config.transportation)||void 0===w?void 0:w.provider)||"idsjmk"}
                                            @click=${t=>{t.stopPropagation()}}
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,provider:e.value||"idsjmk"},this._config=i,$r(this,"config-changed",{config:i})}}
                                    >
                                        ${this._getTransportationProviderOptions().map(t=>j`
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
                                            .value=${(null===(b=this._config.transportation)||void 0===b?void 0:b.maxDepartures)||2}
                                            @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,maxDepartures:"string"==typeof e.value?parseInt(e.value,10):e.value},this._config=i,this._loadStops(),$r(this,"config-changed",{config:i})}}
                                    ></ha-slider>
                                    <span>${(null===(k=this._config.transportation)||void 0===k?void 0:k.maxDepartures)||2} departures</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Show on Demand</div>
                                <div class="value">
                                    <ha-switch
                                            .checked=${!0===(null===(_=this._config.transportation)||void 0===_?void 0:_.onDemand)}
                                            @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,onDemand:e.checked},this._config=i,$r(this,"config-changed",{config:i})}}
                                    ></ha-switch>
                                    <span>Only show departures when clicked</span>
                                </div>
                            </div>

                            ${!0===(null===($=this._config.transportation)||void 0===$?void 0:$.onDemand)?j`
                                <div class="row">
                                    <div class="label">Auto-Hide Timeout</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Auto-hide timeout in minutes (1-10)"
                                                type="number"
                                                min="1"
                                                max="10"
                                                .value=${(null===(S=this._config.transportation)||void 0===S?void 0:S.autoHideTimeout)||5}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof e.value?parseInt(e.value,10):e.value;s=Math.max(Math.min(s||5,10),1),i.transportation={...i.transportation,autoHideTimeout:s},this._config=i,$r(this,"config-changed",{config:i})}}
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
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof e.value?parseInt(e.value,10):e.value;s=Math.max(s||1,1);const n=60*s;i.transportationUpdateInterval=n,this._config=i,$r(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                    <span>minutes</span>
                                </div>
                            </div>

                            <div class="section-subheader">Stops</div>

                            ${this._stops.map((t,e)=>j`
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
        `}};Sr([dt({type:Object})],Cr.prototype,"hass",void 0),Sr([dt({type:Object})],Cr.prototype,"_config",void 0),Sr([dt({type:Array})],Cr.prototype,"_sensors",void 0),Sr([dt({type:Array})],Cr.prototype,"_backgroundImages",void 0),Sr([dt({type:Array})],Cr.prototype,"_stops",void 0),Cr=Sr([ct("wall-clock-card-editor")],Cr);var Ir=function(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o};let xr=class extends at{constructor(){super(),this.config={},this.consecutiveFailures=0,this.isRetrying=!1,this.transportationData={departures:[],loading:!1},this.transportationDataLoaded=!1,this.clockComponent=document.createElement("ha-clock"),this.sensorComponent=document.createElement("ha-sensors"),this.weatherComponent=document.createElement("ha-weather"),kt.info("%c WALL-CLOCK-CARD %c 2.0.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language,this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language}connectedCallback(){super.connectedCallback(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.initConnectCallbackAsync()}async initConnectCallbackAsync(){var t;vt({level:bt(this.config.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1});try{await async function(){kt.debug("Loading all translations");const t=Ot().map(t=>async function(t){try{It[t]?(xt[t]=It[t],kt.debug(`Loaded translations for ${t}`)):kt.warn(`No embedded translations found for ${t}`)}catch(e){kt.error(`Error loading translations for ${t}: ${e}`)}}(t));await Promise.all(t)}(),kt.debug("Loaded translations for all languages")}catch(t){kt.error("Error loading translations:",t)}if(this.config.transportation)if(null===(t=this.config.transportation)||void 0===t?void 0:t.onDemand)kt.debug("Transportation on-demand loading is enabled. Data will be loaded when requested.");else{await this.fetchTransportationDataAsync(),this.transportationDataLoaded=!0;let t=this.config.transportationUpdateInterval||60;t=Math.max(t,60);const e=1e3*t;kt.info(`Setting transportation update interval to ${t} seconds`),this.transportationUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(t){kt.error("Error in transportation update interval:",t)}})()},e)}}createBackgroundImageComponent(){this.backgroundImageComponent||(this.backgroundImageComponent=document.createElement("ha-background-image"),this.initBackgroundImageComponent(),kt.debug("Background image component created and initialized"))}initBackgroundImageComponent(){var t,e;if(!this.backgroundImageComponent)return;const i={imageSourceId:this.config.imageSource||"picsum",backgroundImages:this.config.backgroundImages,entity:null===(t=this.config.imageConfig)||void 0===t?void 0:t.entity,apiKey:null===(e=this.config.imageConfig)||void 0===e?void 0:e.apiKey};this.backgroundImageComponent.backgroundOpacity=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5,this.backgroundImageComponent.config={imageSourceConfig:i,backgroundRotationInterval:this.config.backgroundRotationInterval},kt.debug("Background image component initialized")}disconnectedCallback(){super.disconnectedCallback(),this.transportationUpdateTimer&&clearInterval(this.transportationUpdateTimer),this.transportationAutoHideTimer&&clearTimeout(this.transportationAutoHideTimer)}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.enableTransportation){this.transportationData={...this.transportationData,loading:!0,error:void 0};try{const e=this.config.transportation;e.provider||(e.provider="idsjmk");const i=(t=e.provider,St.getProvider(t));if(!i)throw new Error(`Transportation provider '${e.provider}' not found`);const s=e.stops.map(t=>({stopId:t.stopId,postId:t.postId,name:t.name})),n=e.providerConfig||{};void 0!==e.maxDepartures&&(n.maxDepartures=e.maxDepartures),this.transportationData=await i.fetchTransportationAsync(n,s),this.lastTransportationUpdate=new Date,kt.debug(`Fetched transportation data from ${i.name}:`,this.transportationData)}catch(t){kt.error("Error fetching transportation data:",t),this.transportationData={departures:[],error:t instanceof Error?t.message:String(t),loading:!1}}var t}}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.initAfterSetConfigAsync(t)}async initAfterSetConfigAsync(t){const e=t.imageSource||"none";let i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};t.timeFormat&&(i={...i,...t.timeFormat},void 0!==t.timeFormat.hour12&&(i.hour12=Boolean(t.timeFormat.hour12)),void 0===t.timeFormat.second&&(i.second=void 0));let s={weekday:"long",year:"numeric",month:"long",day:"numeric"};t.dateFormat&&(s={...s,...t.dateFormat},void 0===t.dateFormat.year&&(s.year=void 0));let n=t.timeZone;!n&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(n=this.hass.config.time_zone),this.config={...t,timeFormat:i,dateFormat:s,backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:e,imageConfig:t.imageConfig||{},backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",timeZone:n},this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs"}updated(t){if(t.has("hass")&&this.hass&&(this.sensorComponent.hass=this.hass,this.backgroundImageComponent&&this.weatherComponent)){const t=this.weatherComponent.weatherData;t&&t.current&&t.current.conditionUnified&&(this.backgroundImageComponent.weather=t.current.conditionUnified)}if(t.has("weatherComponent")&&this.weatherComponent&&this.backgroundImageComponent){const t=this.weatherComponent.weatherData;t&&t.current&&t.current.conditionUnified&&(this.backgroundImageComponent.weather=t.current.conditionUnified)}if(t.has("config")&&this.config){const t=this.config.logLevel||"info",e=bt(t);kt.debug(`Updating log level to ${t} (${gt[e]})`),vt({level:e,prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}}static get styles(){return o`
            /* Include ClockComponent styles */
            ${r(qn.styles)}
            /* Include SensorComponent styles */
            ${r(Gn.styles)}
            /* Include BackgroundImageComponent styles */
            ${r(gr.styles)}
            /* Include WeatherComponent styles */
            ${r(wr.styles)}
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

            /* Background image styles are now in the BackgroundImageComponent */



            /* Sensor styles are now in the SensorComponent */

            /* Weather styles are now in the WeatherComponent */

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
            @media (min-width: 1280px) {
                .stop-group {
                    margin-bottom: 16px;
                }
            }
        `}render(){var t;return this.createBackgroundImageComponent(),j`
            <ha-card style="color: ${this.config.fontColor};">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather?j`<div style="position: absolute; top: 16px; right: 16px; max-width: 40%; max-height: 60%; z-index: 3; padding-left: 8px;">
                            ${this.weatherComponent}
                        </div>`:""}
                <div style="${this.config.transportation&&!1!==this.config.enableTransportation?`margin-top: -${30*(this.config.transportation.maxDepartures||3)+80}px;`:""}">
                    ${this.clockComponent}
                </div>
                ${this.config.transportation&&!1!==this.config.enableTransportation?(null===(t=this.config.transportation)||void 0===t?void 0:t.onDemand)&&!this.transportationDataLoaded?j`
                                    <div class="transportation-on-demand-button"
                                         @click=${this._handleTransportationClickAsync}>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
                                        </svg>
                                    </div>`:j`
                                    <div class="transportation-container" style="color: ${this.config.fontColor};">
                                        ${this.renderTransportationContent()}
                                    </div>`:""}
            </ha-card>
        `}renderTransportationContent(){if(this.transportationData.loading)return j`
                <div>Loading transportation data...</div>`;if(this.transportationData.error)return j`
                <div class="transportation-error">${this.transportationData.error}</div>`;if(!this.transportationData.departures||0===this.transportationData.departures.length)return j`
                <div>No departures available</div>`;const t={};for(const e of this.transportationData.departures){const i=`${e.stopName}-${e.postId}`;t[i]||(t[i]=[]),t[i].push(e)}return j`
            <div class="transportation-departures">
                ${Object.entries(t).map(([t,e])=>{const i=e[0].stopName;return j`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.config.fontColor};">
                                ${i}
                            </h3>
                            <div class="stop-departures">
                                ${e.map(t=>j`
                                    <div class="departure-item">
                                        <div class="departure-line" style="color: ${this.config.fontColor};">
                                            ${t.lineName}
                                        </div>
                                        <div class="departure-destination" style="color: ${this.config.fontColor};">→
                                            ${t.finalStop}
                                        </div>
                                        <div class="departure-time" style="color: ${this.config.fontColor};">
                                            ${t.timeMark}
                                        </div>
                                        ${t.isLowFloor?j`
                                            <div class="departure-lowfloor">♿</div>`:""}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `})}
            </div>
        `}async _handleTransportationClickAsync(){var t;if(kt.debug("Transportation button clicked, loading data on demand"),await this.fetchTransportationDataAsync(),this.transportationDataLoaded=!0,this.config.transportationUpdateInterval){let t=this.config.transportationUpdateInterval||60;t=Math.max(t,60);const e=1e3*t;kt.debug(`Setting transportation update interval to ${t} seconds`),this.transportationUpdateTimer&&clearInterval(this.transportationUpdateTimer),this.transportationUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(t){kt.error("Error in transportation update interval:",t)}})()},e)}if(null===(t=this.config.transportation)||void 0===t?void 0:t.autoHideTimeout){this.transportationAutoHideTimer&&clearTimeout(this.transportationAutoHideTimer);let t=this.config.transportation.autoHideTimeout||5;t=Math.max(1,Math.min(10,t));const e=60*t*1e3;kt.debug(`Setting transportation auto-hide timeout to ${t} minutes`),this.transportationAutoHideTimer=window.setTimeout(()=>{kt.debug(`Auto-hiding transportation departures after ${t} minutes`),this.transportationDataLoaded=!1},e)}}};Ir([dt({type:Object})],xr.prototype,"hass",void 0),Ir([dt({type:Object})],xr.prototype,"config",void 0),Ir([dt({type:Number})],xr.prototype,"consecutiveFailures",void 0),Ir([dt({type:Boolean})],xr.prototype,"isRetrying",void 0),Ir([dt({type:Object})],xr.prototype,"transportationData",void 0),Ir([dt({type:Date})],xr.prototype,"lastTransportationUpdate",void 0),Ir([dt({type:Boolean})],xr.prototype,"transportationDataLoaded",void 0),xr=Ir([ct("wall-clock-card")],xr),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;class n{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}}const s=e=>new n("string"==typeof e?e:e+"",void 0,i),a=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(o,e,i)},r=(i,o)=>{if(t)i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=t.cssText,i.appendChild(o)}},l=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return s(t)})(e):e,{is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:g,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",y=m.reactiveElementPolyfillSupport,w=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!c(e,t),_={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&h(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const s=o?.call(this);n?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...g(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=o;const s=n.fromAttribute(t,e.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const o=this.constructor,n=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??$)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==n||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[w("elementProperties")]=new Map,C[w("finalized")]=new Map,y?.({ReactiveElement:C}),(m.reactiveElementVersions??=[]).push("2.1.1");const S=globalThis,x=S.trustedTypes,k=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,I="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+A,O=`<${z}>`,P=document,D=()=>P.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,F=Array.isArray,E="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,U=/>/g,M=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,j=/"/g,L=/^(?:script|style|textarea|title)$/i,H=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),W=H(1),V=(H(2),H(3),Symbol.for("lit-noChange")),J=Symbol.for("lit-nothing"),q=new WeakMap,K=P.createTreeWalker(P,129);function Z(e,t){if(!F(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,o=[];let n,s=2===t?"<svg>":3===t?"<math>":"",a=R;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===R?"!--"===l[1]?a=T:void 0!==l[1]?a=U:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=M):void 0!==l[3]&&(a=M):a===M?">"===l[0]?(a=n??R,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?M:'"'===l[3]?j:B):a===j||a===B?a=M:a===T||a===U?a=R:(a=M,n=void 0);const d=a===M&&e[t+1].startsWith("/>")?" ":"";s+=a===R?i+O:c>=0?(o.push(r),i.slice(0,c)+I+i.slice(c)+A+d):i+A+(-2===c?t:d)}return[Z(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Y{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,s=0;const a=e.length-1,r=this.parts,[l,c]=G(e,t);if(this.el=Y.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=K.nextNode())&&r.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(I)){const t=c[s++],i=o.getAttribute(e).split(A),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?oe:"@"===a[1]?ne:te}),o.removeAttribute(e)}else e.startsWith(A)&&(r.push({type:6,index:n}),o.removeAttribute(e));if(L.test(o.tagName)){const e=o.textContent.split(A),t=e.length-1;if(t>0){o.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],D()),K.nextNode(),r.push({type:2,index:++n});o.append(e[t],D())}}}else if(8===o.nodeType)if(o.data===z)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(A,e+1));)r.push({type:7,index:n}),e+=A.length-1}n++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,o){if(t===V)return t;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=N(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(e),n._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(t=Q(e,n._$AS(e,t.values),n,o)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??P).importNode(t,!0);K.currentNode=o;let n=K.nextNode(),s=0,a=0,r=i[0];for(;void 0!==r;){if(s===r.index){let t;2===r.type?t=new ee(n,n.nextSibling,this,e):1===r.type?t=new r.ctor(n,r.name,r.strings,this,e):6===r.type&&(t=new se(n,this,e)),this._$AV.push(t),r=i[++a]}s!==r?.index&&(n=K.nextNode(),s++)}return K.currentNode=P,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),N(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>F(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new X(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Y(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new ee(this.O(D()),this.O(D()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,n){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}_$AI(e,t=this,i,o){const n=this.strings;let s=!1;if(void 0===n)e=Q(this,e,t,0),s=!N(e)||e!==this._$AH&&e!==V,s&&(this._$AH=e);else{const o=e;let a,r;for(e=n[0],a=0;a<n.length-1;a++)r=Q(this,o[i+a],t,a),r===V&&(r=this._$AH[a]),s||=!N(r)||r!==this._$AH[a],r===J?e=J:e!==J&&(e+=(r??"")+n[a+1]),this._$AH[a]=r}s&&!o&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class oe extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class ne extends te{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??J)===V)return;const i=this._$AH,o=e===J&&i!==J||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==J&&(i===J||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=S.litHtmlPolyfillSupport;ae?.(Y,ee),(S.litHtmlVersions??=[]).push("3.3.1");const re=globalThis;class le extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let n=o._$litPart$;if(void 0===n){const e=i?.renderBefore??null;o._$litPart$=n=new ee(t.insertBefore(D(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}le._$litElement$=!0,le.finalized=!0,re.litElementHydrateSupport?.({LitElement:le});const ce=re.litElementPolyfillSupport;ce?.({LitElement:le}),(re.litElementVersions??=[]).push("4.2.1");const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},ge=(e=de,t,i)=>{const{kind:o,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,n,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];t.call(this,i),this.requestUpdate(o,n,e)}}throw Error("Unsupported decorator location: "+o)};function ue(e){return(t,i)=>"object"==typeof i?ge(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}var pe;!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR",e[e.NONE=4]="NONE"}(pe||(pe={}));const me={level:pe.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let fe={...me};const ve=[];function ye(e){const t=fe.level;fe={...me,...e},t!==fe.level&&console.log(`[LOGGER] Log level changed from ${pe[t]} to ${pe[fe.level]}`)}function we(e,t,i,...o){var n;if(e<fe.level)return;const s=function(e,t,i){const{prefix:o,enableTimestamps:n,enableSourceTracking:s}=fe;let a="";return n&&(a+=`[${(new Date).toISOString()}] `),a+=`[${pe[e]}] `,o&&(a+=`[${o}] `),t&&s&&(a+=`[${t}] `),a+=i,a}(e,t,i);if(fe.logToConsole)switch(e){case pe.DEBUG:console.debug(s,...o);break;case pe.INFO:console.log(s,...o);break;case pe.WARN:console.warn(s,...o);break;case pe.ERROR:console.error(s,...o)}if(fe.logToStorage){let e=s;if(o.length>0)try{e+=" "+o.map(e=>"object"==typeof e?JSON.stringify(e):String(e)).join(" ")}catch(t){e+=" [Arguments could not be stringified]"}ve.push(e);const t=null!==(n=fe.maxStoredLogs)&&void 0!==n?n:100;ve.length>t&&ve.splice(0,ve.length-t)}}function be(e){return{debug:(t,...i)=>we(pe.DEBUG,e,t,...i),info:(t,...i)=>we(pe.INFO,e,t,...i),warn:(t,...i)=>we(pe.WARN,e,t,...i),error:(t,...i)=>we(pe.ERROR,e,t,...i),withSource:e=>be(e)}}function $e(e){switch(e.toLowerCase()){case"debug":return pe.DEBUG;case"info":return pe.INFO;case"warn":default:return pe.WARN;case"error":return pe.ERROR;case"none":return pe.NONE}}const _e=be("wall-clock");class Ce{static getInstance(){return Ce.instance||(Ce.instance=new Ce),Ce.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&_e.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}registerAll(e){e.forEach(e=>this.register(e))}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}var Se,xe;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(Se||(Se={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(xe||(xe={}));const ke=[xe.All,xe.ClearSky,xe.Clouds,xe.Rain,xe.Snow,xe.Mist],Ie=[Se.Unspecified,Se.SunriseSunset,Se.Day,Se.Night];function Ae(e,t){if(!e)return;const i=e.toLowerCase();for(const e of t)if(i.includes(e.toLowerCase().replace(" ","-")))return e}class ze{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return be(`${this.id}-source`)}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}async fetchImagesAsync(e,t,i){return this.getLogger().debug(`Fetching images with weather: ${t}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(e,t,i)}async getNextImageUrlAsync(e,t,i){var o;this.getLogger().debug(`GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=t,this.lastTimeOfDay=i);const n=`${t}_${i}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(n)||0===(null===(o=this.imageUrlCache.get(n))||void 0===o?void 0:o.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const o=[...await this.fetchImagesAsync(e,t,i)];this.shuffleArray(o),this.imageUrlCache.set(n,o),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${o.length} images for weather: ${t}, timeOfDay: ${i}`)}const s=this.imageUrlCache.get(n)||[];if(0===s.length)return this.getLogger().warn(`No images available for weather: ${t}, timeOfDay: ${i}`),"";const a=s[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%s.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${a}`),a}filterImagesByWeatherAndTime(e,t,i){if(this.getLogger().debug(`Current time of day: ${i}`),this.getLogger().debug(`Current weather condition: ${t}`),0===e.length)return[];let o=[];return o=e.filter(e=>(e.weather===t||e.weather===xe.All||t===xe.All)&&e.timeOfDay===i),0===o.length&&(o=e.filter(e=>(e.weather===t||e.weather===xe.All||t===xe.All)&&e.timeOfDay===Se.Unspecified)),0===o.length&&(o=e.filter(e=>e.timeOfDay===i)),0===o.length&&(o=e.filter(e=>e.timeOfDay===Se.Unspecified)),o.length>0?(this.getLogger().debug(`Found ${o.length} images matching current conditions`),o.map(e=>e.url)):(this.getLogger().info("No matching images found, returning all images"),e.map(e=>e.url))}convertUrlsToBackgroundImages(e){return this.getLogger().debug(`Converting ${e.length} URLs to BackgroundImage objects`),e.map(e=>({url:e,weather:Ae(e,ke)||xe.All,timeOfDay:Ae(e,Ie)||Se.Unspecified}))}}const Oe=new class extends ze{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=be("local-source")}async fetchImagesInternalAsync(e,t,i){return e.backgroundImages&&e.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${e.backgroundImages.length} images`),this.logger.debug(`First image URL: ${e.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(e.backgroundImages,t,i)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Pe=new class extends ze{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=be("picsum-source")}async fetchImagesInternalAsync(e,t,i){const o=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${o}`),[o]}getDefaultConfig(){return{}}},De=new class extends ze{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=be("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(e,t,i){const o=e.count||5;let n=e.category||"";const s=e.apiKey||"";return this.logger.debug(`Current weather: ${t}, time of day: ${i}`),this.logger.debug(`Using category with weather and time: ${n}`),s?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(s,n,o,t,i,e)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(e,t,i,o,n,s){const a=[],r=(null==s?void 0:s.contentFilter)||"high";let l="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(l=e[0]),e.length>1&&(l+=` ${e.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${e.join(", ")}`)}const c=o.toLowerCase();l+=` ${c}`,"sunrise-sunset"===n?l+=" sunrise sunset dawn dusk":"day"===n?l+=" daylight midday day":"night"===n&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${n}`);try{let t="https://api.unsplash.com/photos/random?";const o=new URLSearchParams({client_id:e,count:i.toString(),orientation:"landscape",content_filter:r});l&&o.append("query",l);const n=new URLSearchParams(o);n.delete("client_id"),n.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${n.toString()}`),t+=o.toString();const s=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${s}`);const c=await fetch(t);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();this.logger.debug(`API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";a.push(t)}),this.logger.debug(`Fetched ${a.length} images from Unsplash API`)}catch(e){throw this.logger.error("Error fetching from Unsplash API:",e),e}return a}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Ne=new class extends ze{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=be("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}async checkEntityAsync(e){try{const t=window.document.querySelector("home-assistant").hass;if(!t)return void this.logger.warn("Could not get Home Assistant instance");const i=t.states[e];if(!i)return void this.logger.warn(`Entity ${e} not found`);this.updateCacheFromEntity(i),this.entityId=e,this.logger.debug(`Checked entity ${e}`)}catch(e){this.logger.error("Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)&&t.every(e=>"string"==typeof e)?(this.cachedImages=this.convertUrlsToBackgroundImages(t),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${t.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(e,t,i){const o=e.entity;if(!o)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(o);const n=Date.now();if(this.cachedImages.length>0&&n-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t,i);try{const e=window.document.querySelector("home-assistant").hass;if(!e)return this.logger.warn("Could not get Home Assistant instance"),[];const n=e.states[o];return n?(this.updateCacheFromEntity(n),this.filterImagesByWeatherAndTime(this.cachedImages,t,i)):(this.logger.warn(`Sensor ${o} not found`),[])}catch(e){return this.logger.error("Error fetching images from sensor:",e),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Fe=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=be("null-source")}async fetchImagesAsync(e,t,i){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(e,t,i){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Ee={local:Oe,picsum:Pe,unsplash:De,sensor:Ne};class Re{constructor(){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=be("background-image-manager")}initialize(e={}){const t=e.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${t}`),"none"===t)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var i;if(this.imageSourceId=t||"picsum",this.imageSource=(i=this.imageSourceId,Ee[i]||Fe),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;const o=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...o,...e},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(e,t){if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${e}, time of day: ${t}`);const i=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,e,t);return i?(this.logger.debug(`Got image URL: ${i}`),i):(this.logger.warn("No image URL returned from source"),"")}catch(e){return this.logger.error("Error getting next image URL:",e),""}}getImageSourceId(){return this.imageSourceId}}Ce.getInstance().registerAll([Pe,Oe,De,Ne]);const Te=[{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť","moderate_rain":"Mírný déšť","heavy_intensity_rain":"Silný déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen","moderate_rain":"Mäßiger Regen","heavy_intensity_rain":"Starker Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή","moderate_rain":"Μέτρια βροχή","heavy_intensity_rain":"Έντονη βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","mist":"Mist","light_rain":"Light rain","moderate_rain":"Moderate rain","heavy_intensity_rain":"Heavy rain"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera","moderate_rain":"Lluvia moderada","heavy_intensity_rain":"Lluvia intensa"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade","moderate_rain":"Kohtalainen sade","heavy_intensity_rain":"Voimakas sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère","moderate_rain":"Pluie modérée","heavy_intensity_rain":"Pluie forte"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső","moderate_rain":"Mérsékelt eső","heavy_intensity_rain":"Erős eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera","moderate_rain":"Pioggia moderata","heavy_intensity_rain":"Pioggia intensa"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen","moderate_rain":"Matige regen","heavy_intensity_rain":"Zware regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz","moderate_rain":"Umiarkowany deszcz","heavy_intensity_rain":"Intensywny deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca","moderate_rain":"Chuva moderada","heavy_intensity_rain":"Chuva forte"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară","moderate_rain":"Ploaie moderată","heavy_intensity_rain":"Ploaie puternică"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь","moderate_rain":"Умеренный дождь","heavy_intensity_rain":"Сильный дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď","moderate_rain":"Mierny dážď","heavy_intensity_rain":"Silný dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn","moderate_rain":"Måttligt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Ue=Object.fromEntries(Te.map(e=>[e.code,e.translations]));let Me={};function Be(){return Te.map(e=>e.code)}function je(e,t,i={},o){const n={...i};if(o&&(n.timeZone=o),"hidden"===n.weekday&&(n.weekday=void 0),"hidden"===n.year&&(n.year=void 0),"hidden"===n.month&&(n.month=void 0),"hidden"===n.day&&(n.day=void 0),void 0===n.weekday&&void 0===n.year&&void 0===n.month&&void 0===n.day)return"";const s=function(e){const t=Te.find(t=>t.code===e);return(null==t?void 0:t.locale)||"en-US"}(t);if("short"===n.month){const t=new Intl.DateTimeFormat(s,{month:"short",timeZone:o}).format(e),i={...n};delete i.month;let a=e.toLocaleDateString(s,i);return"2-digit"===n.day?(a=a.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${t}`),a.includes(t)||(a=`${a} ${t}`)):a=e.toLocaleDateString(s,n),a}return e.toLocaleDateString(s,n)}class Le{constructor(e,t){this._readyResolve=null,this.host=e,this.logger=be(t),e.addController(this),this.ready=new Promise(e=>{this._readyResolve=e})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(e=>{this._readyResolve=e}),this.onHostDisconnected()}}function He(e,t){const i=e;return i.shadowRoot?Array.from(i.shadowRoot.querySelectorAll(t)):[]}class We{constructor(){this.subscribers=new Map}static getInstance(){return We.instance||(We.instance=new We),We.instance}subscribe(e,t){this.subscribers.has(e)||this.subscribers.set(e,[]),this.subscribers.get(e).push(t)}unsubscribe(e,t){const i=this.subscribers.get(e);i&&this.subscribers.set(e,i.filter(e=>e!==t))}publish(e){const t=e.constructor;(this.subscribers.get(t)||[]).forEach(t=>t(e))}}class Ve{constructor(e){this.weather=e}}class Je{constructor(){}}class qe{constructor(){}}class Ke{constructor(){}}class Ze{constructor(){}}var Ge,Ye,Qe;!function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(Ge||(Ge={})),function(e){e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night",e.Unspecified="unspecified"}(Ye||(Ye={})),function(e){e.Large="large",e.Medium="medium",e.Small="small",e.Custom="custom"}(Qe||(Qe={}));const Xe={clockSize:{large:"18rem",medium:"16rem",small:"14rem"},dateSize:{large:"6rem",medium:"6rem",small:"4rem"},labelSize:{large:"1.8rem",medium:"1.2rem",small:"1.0rem"},valueSize:{large:"3rem",medium:"2rem",small:"1.5rem"},iconSize:{large:"84px",medium:"72px",small:"60px"},buttonSize:{large:"168px",medium:"144px",small:"120px"},forecastTempWidth:{large:"120px",medium:"80px",small:"70px"}};function et(e,t,i){if(e===Qe.Custom&&t)return t;const o=Xe[i];return e===Qe.Large?o.large:e===Qe.Small?o.small:o.medium}class tt extends Le{constructor(e,t={}){super(e,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=t}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(e){this.logger.debug("Updating ClockController config:",e),this.config={...this.config,...e};const t=new Date,i=this.config.language||"en",o=this.config.timeZone;this.updateTime(t,o),this.updateDate(t,i,o),this.host.requestUpdate()}update(){const e=new Date,t=this.config.language||"en",i=this.config.timeZone;this.updateTime(e,i),0!==e.getSeconds()&&""!==this._currentDate||this.updateDate(e,t,i),this.host.requestUpdate()}updateTime(e,t){var i,o,n,s,a,r,l,c;const h="hidden"===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.second),d=!0===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.hour12);let g,u,p;if(t){const i=new Intl.DateTimeFormat("en-US",{timeZone:t,hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(e);g=parseInt((null===(n=i.find(e=>"hour"===e.type))||void 0===n?void 0:n.value)||"0",10),u=parseInt((null===(s=i.find(e=>"minute"===e.type))||void 0===s?void 0:s.value)||"0",10),p=parseInt((null===(a=i.find(e=>"second"===e.type))||void 0===a?void 0:a.value)||"0",10)}else g=e.getHours(),u=e.getMinutes(),p=e.getSeconds();if(h&&(this._seconds=""),d){const e=g>=12;g%=12,g=g||12,this._ampm=e?"PM":"AM"}else this._ampm="";const m="numeric"!==(null===(r=this.config.timeFormat)||void 0===r?void 0:r.hour);this._hours=m?g.toString().padStart(2,"0"):g.toString();const f="numeric"!==(null===(l=this.config.timeFormat)||void 0===l?void 0:l.minute);if(this._minutes=f?u.toString().padStart(2,"0"):u.toString(),!h){const e="numeric"!==(null===(c=this.config.timeFormat)||void 0===c?void 0:c.second);this._seconds=e?p.toString().padStart(2,"0"):p.toString()}}updateDate(e,t,i){let o=je(e,t,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},i);o=o.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=o}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var it=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let ot=class extends le{constructor(){super(),this.logger=be("clock-component"),this.clockController=new tt(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(e){if(super.updated(e),e.has("timeFormat")||e.has("dateFormat")||e.has("language")||e.has("timeZone")||e.has("size")||e.has("clockSize")||e.has("dateSize")){if(this.logger.debug("Clock properties changed, updating ClockController"),e.has("timeFormat")){const t=e.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.timeFormat)}`)}if(e.has("dateFormat")){const t=e.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.dateFormat)}`)}if(e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("clockSize")){const t=e.get("clockSize");this.logger.debug(`ClockSize changed: ${t} -> ${this.clockSize}`)}if(e.has("dateSize")){const t=e.get("dateSize");this.logger.debug(`DateSize changed: ${t} -> ${this.dateSize}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}getClockSize(){return et(this.size,this.clockSize,"clockSize")}getDateSize(){return et(this.size,this.dateSize,"dateSize")}render(){var e,t;const i=this.getSeconds(),o=void 0!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second)&&"hidden"!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second),n=this.getClockSize(),s=this.getDateSize();return this.logger.debug(`Rendering clock - Size: ${this.size}, ClockSize: ${n}, DateSize: ${s}`),W`
            <div class="clock" style="color: ${this.fontColor}; font-size: ${n};">
                <span class="hours-minutes" style="color: ${this.fontColor};">${this.getHours()}:${this.getMinutes()}</span>
                ${o?W`
                    <div class="seconds-container">
                        <span class="seconds" style="color: ${this.fontColor};">${i}</span>
                        ${this.getAmPm()?W`<span class="ampm" style="color: ${this.fontColor};">${this.getAmPm()}</span>`:""}
                    </div>
                `:this.getAmPm()?W`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: ${this.fontColor};">${this.getAmPm()}</span>
                    </div>
                `:""}
            </div>
            <div class="date" style="color: ${this.fontColor}; font-size: ${s};">${this.getCurrentDate()}</div>
        `}};ot.styles=a`
        .clock {
            font-size: 16rem; /* Medium size (default) */
            line-height: 14rem;
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
            font-size: 6rem; /* Medium size (default) */
            font-weight: 400;
            text-align: center;
            margin-top: 0.2rem;
            opacity: 1;
            z-index: 2;
            position: relative;
            line-height: 5rem;
        }
    `,it([ue({type:Object})],ot.prototype,"timeFormat",void 0),it([ue({type:Object})],ot.prototype,"dateFormat",void 0),it([ue({type:String})],ot.prototype,"fontColor",void 0),it([ue({type:String})],ot.prototype,"language",void 0),it([ue({type:String})],ot.prototype,"timeZone",void 0),it([ue({type:String})],ot.prototype,"size",void 0),it([ue({type:String})],ot.prototype,"clockSize",void 0),it([ue({type:String})],ot.prototype,"dateSize",void 0),ot=it([he("ha-clock")],ot);class nt extends Le{constructor(e,t={}){super(e,"sensor-controller"),this._sensorValues=[],this.config={},this.config=t}onHostConnected(){}onHostDisconnected(){}updateConfig(e){this.logger.debug("Updating SensorController config:",e),this.config={...this.config,...e},this.hass&&this.updateSensorValues()}updateHass(e){this.hass=e,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=[],this.config.sensors.forEach(e=>{if(e.entity&&this.hass.states[e.entity]){const t=this.hass.states[e.entity];let i=t.state;t.attributes&&t.attributes.unit_of_measurement&&(i+=` ${t.attributes.unit_of_measurement}`),this._sensorValues.push({entity:e.entity,label:e.label,value:i})}else e.entity&&this._sensorValues.push({entity:e.entity,label:e.label,value:"unavailable"})}),this.host.requestUpdate()):this._sensorValues=[]}get sensorValues(){return this._sensorValues}}var st=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let at=class extends le{constructor(){super(),this.logger=be("sensor-component"),this.sensorController=new nt(this,{sensors:this.sensors})}get controller(){return this.sensorController}getLabelSize(){return et(this.size,this.labelSize,"labelSize")}getValueSize(){return et(this.size,this.valueSize,"valueSize")}updated(e){if(super.updated(e),e.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),e.has("hass")&&this.hass&&this.sensorController.updateHass(this.hass),e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}render(){const e=this.sensorController.sensorValues;if(0===e.length)return W``;const t=this.getLabelSize(),i=this.getValueSize();return this.logger.debug(`Rendering sensors - LabelSize: ${t}, ValueSize: ${i}`),W`
            <div class="sensor-container" style="color: ${this.fontColor};">
                ${e.map(e=>W`
                    <div class="sensor-item">
                        ${e.label?W`
                                <div class="sensor-label" style="color: ${this.fontColor}; font-size: ${t};">
                                    ${e.label}
                                </div>`:""}
                        <div class="sensor-value" style="color: ${this.fontColor}; font-size: ${i};">
                            ${e.value}
                        </div>
                    </div>
                `)}
            </div>
        `}};at.styles=a`
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
    `,st([ue({type:Array})],at.prototype,"sensors",void 0),st([ue({type:String})],at.prototype,"fontColor",void 0),st([ue({type:Object})],at.prototype,"hass",void 0),st([ue({type:String})],at.prototype,"size",void 0),st([ue({type:String})],at.prototype,"labelSize",void 0),st([ue({type:String})],at.prototype,"valueSize",void 0),at=st([he("ha-sensors")],at);class rt extends Le{constructor(e,t={}){super(e,"background-image-controller"),this.backgroundImageManager=new Re,this.currentWeather=xe.All,this.messenger=We.getInstance(),this._currentImageUrl="",this._previousImageUrl="",this._fetchingImageUrls=!1,this.onWeather=e=>{this.logger.info("New message for weather:",e.weather),this.updateWeather(e.weather)},this.onFetchNextImage=e=>{this.logger.info("Fetch next image requested"),this.setupImageRotation(),this.fetchNewImageAsync(this.currentWeather)},this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:1e3,fill:"forwards"},this.config=t}onHostConnected(){this.messenger.subscribe(Ve,this.onWeather),this.messenger.subscribe(Ze,this.onFetchNextImage),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){this.messenger.unsubscribe(Ve,this.onWeather),this.messenger.unsubscribe(Ze,this.onFetchNextImage),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(e){const t={...this.config};this.config={...this.config,...e},_e.info("Update the BackgroundImageController with new configuration");const i=this.isInitialized;t.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{i&&this.fetchNewImageAsync(this.currentWeather).catch(e=>this.logger.error("Error fetching image after reinitialization:",e))}).catch(e=>this.logger.error("Error during BackgroundImageManager initialization:",e)):t.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:e,...t}=this.config.imageSourceConfig||{},i=t.imageSourceId?t:{imageSourceId:"picsum"};if(this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${i.imageSourceId||"default"}`),!this.backgroundImageManager.initialize(i))return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(e){this.logger.error("Error fetching image URLs:",e)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const e=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${e/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(e){this.logger.error("Error in image rotation interval:",e)}})()},e)}async fetchNewImageAsync(e){try{let t=e,i=function(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?Se.SunriseSunset:e>=9&&e<17?Se.Day:e>=21||e<5?Se.Night:Se.Unspecified}();const o=await this.backgroundImageManager.getNextImageUrlAsync(t,i);if(o){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`);const e=new Image;e.onload=async()=>{this.logger.debug(`New image loaded successfully: ${o}`),this._currentImageUrl?this._previousImageUrl=this._currentImageUrl:this._previousImageUrl="",this._currentImageUrl=o,this.host.requestUpdate(),await this.host.updateComplete,await this.fireAnimate()},e.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`)},e.src=o}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(e){this.logger.error("Error fetching new dynamic image:",e)}}async fireAnimate(){const e=He(this.host,".background-image");0!==e.length&&(1===e.length?e[0].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"}):(e[0].animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),e[1].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})),this._previousImageUrl="")}updateWeather(e){this.isInitialized?this.currentWeather!==e&&(this.logger.info(`Updating weather condition to: ${e}`),this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after weather update:",e))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after initialization:",e))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}}var lt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let ct=class extends le{constructor(){super(),this.backgroundOpacity=.5,this.logger=be("background-image-component"),this.backgroundImageController=new rt(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(e){var t;super.updated(e),e.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(t=this.config)&&void 0!==t?t:{}))}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}render(){const e=this.currentImageUrl,t=this.previousImageUrl;return W`
            <div class="background-container">
                ${e?W`
                        ${t?W`
                                <!-- Previous image that will fade out -->
                                <img class="background-image fade-out" src="${t}">
                            `:""}
                        <!-- Current image that will fade in -->
                        <img class="background-image fade-in" src="${e}">
                        <div class="background-overlay" style="opacity: ${void 0!==this.backgroundOpacity?this.backgroundOpacity:.5};"></div>
                    `:""}
            </div>
        `}};ct.styles=a`
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
    `,lt([ue({type:Number})],ct.prototype,"backgroundOpacity",void 0),lt([ue({type:Object})],ct.prototype,"config",void 0),ct=lt([he("ha-background-image")],ct);class ht{static getInstance(){return ht.instance||(ht.instance=new ht),ht.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&_e.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const dt=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,i=e.longitude||14.4378,o=e.units||"metric",n=e.language||"en";try{const s=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${i}&units=${o}&lang=${n}&appid=${e.apiKey}`;_e.debug("[OpenWeatherMap] "+s);const a=await fetch(s);if(!a.ok)throw new Error(`OpenWeatherMap API error: ${a.statusText}`);const r=await a.json();if(!r.list||!r.list.length)throw new Error("No forecast data available");const l=r.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},d=new Map;return r.list.forEach(e=>{var t;const i=new Date(1e3*e.dt).toISOString().split("T")[0];d.has(i)||d.set(i,[]),null===(t=d.get(i))||void 0===t||t.push(e)}),{current:h,daily:Array.from(d.entries()).map(([e,t])=>{const i=t.map(e=>e.main.temp),o=Math.min(...i),n=Math.max(...i),s=t[Math.floor(t.length/2)]||t[0],a=t.filter(e=>void 0!==e.pop).map(e=>e.pop),r=a.length>0?a.reduce((e,t)=>e+t,0)/a.length*100:0;return{date:new Date(e),temperatureMin:o,temperatureMax:n,condition:s.weather[0].description,icon:this.getIconUrl(s.weather[0].icon),precipitation:r,humidity:s.main.humidity,windSpeed:s.wind.speed}})}}catch(e){throw _e.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"en"}}getIconUrl(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){let t;switch(_e.debug(`[OpenWeatherMap] Mapping weather condition: ${e}`),e.toLowerCase()){case"clear":case"clear sky":t=xe.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":t=xe.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":t=xe.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":t=xe.Rain;break;case"tornado":case"windy":case"all":default:t=xe.All;break;case"snow":t=xe.Snow}return _e.debug(`[OpenWeatherMap] Mapped to Weather enum: ${t}`),t}},gt=ht.getInstance();gt.register(dt);class ut extends Le{constructor(e,t={}){super(e,"weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this._messenger=We.getInstance(),this._forceUpdateWeatherHandler=e=>this.fetchWeatherDataAsync(),this.config={},this.config=t}onHostConnected(){this._messenger.subscribe(Je,this._forceUpdateWeatherHandler),this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this._messenger.unsubscribe(Je,this._forceUpdateWeatherHandler),this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0)}async updateConfigAsync(e){this.logger.debug("Updating WeatherController config:",e);const t=this.config.showWeather,i=this.config.weatherUpdateInterval;this.config={...this.config,...e},i!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),!t&&this.config.showWeather?await this.fetchWeatherDataAsync():this.config.showWeather||We.getInstance().publish(new Ve(xe.All)),this.host.requestUpdate()}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting weather update interval to ${e} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(e){this.logger.error("Error in weather update interval:",e)}})()},t)}async fetchWeatherDataAsync(){var e,t;if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const o=this.config.weatherProvider||"openweathermap",n=(i=o,gt.getProvider(i));if(!n)throw new Error(`Weather provider '${o}' not found`);let s=n.getDefaultConfig();this.config.weatherConfig&&(s={...s,...this.config.weatherConfig},this.config.weatherConfig.units&&(s.units=this.config.weatherConfig.units,this.logger.debug(`Using weather units: ${s.units}`))),this._weatherData=await n.fetchWeatherAsync(s),this._weatherData&&We.getInstance().publish(new Ve(null!==(t=null===(e=this._weatherData.current)||void 0===e?void 0:e.conditionUnified)&&void 0!==t?t:xe.All)),this.logger.info(`Fetched weather data from ${n.name}:`,this._weatherData)}catch(e){this._weatherError=!0,this._weatherErrorMessage=e instanceof Error?e.message:String(e),this.logger.error("Error fetching weather data:",e)}finally{this._weatherLoading=!1,this.host.requestUpdate()}var i}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}}var pt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let mt=class extends le{constructor(){super(),this.logger=be("weather-component"),this.weatherController=new ut(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval})}get controller(){return this.weatherController}updated(e){if(super.updated(e),e.has("showWeather")||e.has("weatherProvider")||e.has("weatherConfig")||e.has("weatherDisplayMode")||e.has("weatherForecastDays")||e.has("weatherTitle")||e.has("weatherUpdateInterval")){this.logger.debug("Weather properties changed, updating WeatherController");const e={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval};this.weatherController.updateConfigAsync(e)}if(e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}translateWeatherCondition(e){const t=this.language||"en",i=function(e,t,i=e){if(!Be().includes(t))return null!==i?i:e;let o=Me[t];if(!o){if(!Ue[t])return _e.warn(`No embedded translations found for ${t}`),null!==i?i:e;Me[t]=Ue[t],o=Me[t],_e.debug(`Loaded translations for ${t} on-demand`)}const n=function(e,t){if(void 0!==e[t])return e[t];const i=t.split(".");let o=e;for(const e of i){if(null==o||"object"!=typeof o)return;o=o[e]}return o}(o,e);return"string"==typeof n?_e.debug(`Translation found for key "${e}" in language "${t}": "${n}"`):_e.debug(`No translation found for key "${e}" in language "${t}", using default: "${null!==i?i:e}"`),"string"==typeof n?n:null!==i?i:e}(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,null);return null!==i?i:e}formatForecastDate(e){return je(e,this.language||"en",{weekday:"short"})}get weatherData(){const e=this.weatherController.weatherData;return e&&e.current&&e.current.conditionUnified&&We.getInstance().publish(new Ve(e.current.conditionUnified)),e}getLabelSize(){return et(this.size,this.labelSize,"labelSize")}getValueSize(){return et(this.size,this.valueSize,"valueSize")}getForecastTempWidth(){return et(this.size,void 0,"forecastTempWidth")}render(){const e=this.weatherController.weatherData;if(this.weatherController.hasError)return W`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!e)return W`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;const t=this.weatherDisplayMode||"both",i=this.weatherForecastDays||3,o=this.weatherTitle||"Weather",n=Math.min(i,e.daily.length),s=this.getLabelSize(),a=this.getValueSize(),r=this.getForecastTempWidth();return W`
            <div class="weather-container" style="color: ${this.fontColor};">
                <div class="weather-title" style="color: ${this.fontColor}; font-size: ${s};">${o}</div>

                ${"current"===t||"both"===t?W`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${e.current.icon}"
                                     alt="${e.current.condition}">
                                <div class="weather-temp" style="font-size: ${a};">${Math.round(e.current.temperature)}°</div>
                            </div>
                            <div class="weather-condition" style="font-size: ${s};">
                                ${this.translateWeatherCondition(e.current.condition)}
                            </div>
                        </div>
                    `:""}

                ${"forecast"===t||"both"===t?W`
                        <div class="weather-forecast">
                            ${e.daily.slice(0,n).map(e=>W`
                                <div class="forecast-day">
                                    <div class="forecast-date" style="font-size: ${s};">${this.formatForecastDate(e.date)}</div>
                                    <img class="forecast-icon" src="${e.icon}" alt="${e.condition}">
                                    <div class="forecast-temp" style="font-size: ${s}; width: ${r};">${Math.round(e.temperatureMin)}° -
                                        ${Math.round(e.temperatureMax)}°
                                    </div>
                                </div>
                            `)}
                        </div>
                    `:""}
            </div>
        `}};mt.styles=a`
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
            font-size: 3rem; /* Medium size (default) */
            line-height: 3rem;
            font-weight: 400;
        }

        .weather-condition {
            font-size: 1.5rem; /* Medium size (default) */
            font-weight: 300;
            opacity: 0.8;
        }

        .weather-icon {
            width: 60px; /* Medium size (default) */
            height: 60px;
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
            font-size: 1.4rem; /* Medium size (default) */
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
            font-size: 1.4rem; /* Medium size (default) */
            font-weight: 400;
            width: 80px;
            text-align: right;
        }

        .forecast-condition {
            font-size: 0.9rem; /* Medium size (default) */
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
    `,pt([ue({type:Boolean})],mt.prototype,"showWeather",void 0),pt([ue({type:String})],mt.prototype,"weatherProvider",void 0),pt([ue({type:Object})],mt.prototype,"weatherConfig",void 0),pt([ue({type:String})],mt.prototype,"weatherDisplayMode",void 0),pt([ue({type:Number})],mt.prototype,"weatherForecastDays",void 0),pt([ue({type:String})],mt.prototype,"weatherTitle",void 0),pt([ue({type:Number})],mt.prototype,"weatherUpdateInterval",void 0),pt([ue({type:String})],mt.prototype,"fontColor",void 0),pt([ue({type:String})],mt.prototype,"language",void 0),pt([ue({type:String})],mt.prototype,"size",void 0),pt([ue({type:String})],mt.prototype,"labelSize",void 0),pt([ue({type:String})],mt.prototype,"valueSize",void 0),mt=pt([he("ha-weather")],mt);class ft{static getInstance(){return ft.instance||(ft.instance=new ft),ft.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&_e.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const vt=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(e,t){try{if(0===t.length)throw new Error("No stops configured");const i={};for(const e of t){const t=String(e.stopId);i[t]||(i[t]=[]),i[t].push(e)}const o=[];for(const t of Object.keys(i)){const n=i[t],s=n.map(e=>e.postId),a=`https://dpmbinfo.dpmb.cz/api/departures?stopid=${t}`,r=`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,l=await fetch(r,{headers:{"User-Agent":"cz.dpmb.dpmbinfo/4.1.3 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!l.ok)throw new Error(`Failed to fetch transportation data: ${l.status} ${l.statusText}`);const c=await l.json();if(c.Error)throw new Error(`API error: ${c.Error}`);for(const i of s){const s=c.PostList.find(e=>e.PostID===i);if(!s){_e.warn(`No platform found with postId ${i} for stopId ${t}`);continue}const a=s.Name,r=n.find(e=>e.postId===i);if(!r)continue;const l=r.name||a,h=e.maxDepartures||2,d=s.Departures.slice(0,Math.min(h,5)).map(e=>({lineId:e.LineId||e.Line,lineName:e.Line||e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:l,postId:i}));o.push(...d)}}return{departures:o,loading:!1}}catch(e){return _e.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}},yt=ft.getInstance();yt.register(vt);class wt extends Le{constructor(e,t={}){super(e,"transportation-controller"),this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this._isActive=!1,this.config={},this.config=t}onHostConnected(){We.getInstance().subscribe(Ke,()=>this.handleTransportationClick())}onHostDisconnected(){this.clearTimers(),We.getInstance().unsubscribe(Ke,()=>this.handleTransportationClick())}updateConfig(e){this.logger.debug("Updating TransportationController config:",e),this.config={...this.config,...e},this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.transportation.enable)return;let e=this.config.transportation.updateInterval||60;e=Math.max(e,60);const t=1100*e;this.logger.debug(`Setting transportation update interval to ${e} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){this.logger.error("Error in transportation update interval:",e)}})()},t)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0),this.setInactive()}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.transportation.enable){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const i=(e=t.provider,yt.getProvider(e));if(!i)throw new Error(`Transportation provider '${t.provider}' not found`);const o=t.stops.map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),n=t.providerConfig||{};void 0!==t.maxDepartures&&(n.maxDepartures=t.maxDepartures),this._transportationData=await i.fetchTransportationAsync(n,o),this._lastTransportationUpdate=new Date,this.logger.info(`Fetched transportation data from ${i.name}:`,this._transportationData)}catch(e){this.logger.warn("Error fetching transportation data:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}var e;this.host.requestUpdate()}}async handleTransportationClick(){var e;if(this.logger.debug("Transportation button clicked, loading data on demand"),this.setActive(),await this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(e=this.config.transportation)||void 0===e?void 0:e.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));let t=60*e*1e3;this._transportationData.error&&(t=1e4),this.logger.debug(`Setting transportation auto-hide timeout to ${e} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.debug(`Auto-hiding transportation departures after ${e} minutes`),this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()},t)}this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get isActive(){return this._isActive}get lastTransportationUpdate(){return this._lastTransportationUpdate}get isTransportationEnabled(){return void 0!==this.config.transportation&&!1!==this.config.transportation.enable}setInactive(){this._isActive=!1,We.getInstance().publish(new qe)}setActive(){this._isActive=!0,We.getInstance().publish(new qe)}}class bt extends le{activate(){}deactivate(){}}class $t extends Le{static get styles(){return a`
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
        `}constructor(e){super(e,"bottom-bar-manager"),this.components=[],this.activeComponent=null,this.previousActiveComponent=null,this.messenger=We.getInstance(),this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:500,fill:"forwards"},this.onRequestUpdateMessage=e=>{this.updateActiveComponent()}}registerComponent(e){this.logger.info(`Registering component ${e.className} with priority ${e.priority}`),this.components.push(e),this.components.sort((e,t)=>t.priority-e.priority),this.updateActiveComponent(),this.host.requestUpdate()}updateActiveComponent(){var e;const t=this.components.find(e=>e.isActive)||null;this.activeComponent!==t&&(this.logger.debug(`Changing active component from ${(null===(e=this.activeComponent)||void 0===e?void 0:e.constructor.name)||"none"} to ${(null==t?void 0:t.constructor.name)||"none"}`),this.previousActiveComponent=this.activeComponent,this.activeComponent&&this.activeComponent.deactivate(),this.activeComponent=t,this.activeComponent&&this.activeComponent.activate(),this.previousActiveComponent&&this.activeComponent&&(this.host.requestUpdate(),this.host.updateComplete.then(()=>{this.animateComponentChange()})))}animateComponentChange(){if(!this.activeComponent||!this.previousActiveComponent)return;const e=He(this.host,".bottom-bar-item.active")[0],t=He(this.host,".bottom-bar-item.previous")[0];e&&t?(t.animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),e.animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})):this.logger.warn("Could not find elements for animation")}get currentComponent(){return this.activeComponent}render(){return W`
            <div class="bottom-bar-container">
                ${this.components.map(e=>{const t=e==this.currentComponent,i=e==this.previousActiveComponent;return W`
                        <div class="bottom-bar-item ${t?"active":""} ${i?"previous":""}">
                            ${e}
                        </div>
                    `})}
            </div>
        `}onHostConnected(){this.logger.debug("Bottom bar manager connected"),this.messenger.subscribe(qe,this.onRequestUpdateMessage)}onHostDisconnected(){this.logger.debug("Bottom bar manager disconnected"),this.messenger.unsubscribe(qe,this.onRequestUpdateMessage)}}var _t=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ct=class extends bt{get priority(){return 10}get isActive(){return this.controller.isActive}constructor(){super(),this.logger=be("transportation-component"),this.transportationController=new wt(this,{transportation:this.transportation})}get controller(){return this.transportationController}updated(e){super.updated(e),e.has("transportation")&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation}))}render(){if(!this.transportation||!0!==this.transportation.enable)return W``;const e=this.transportationController.transportationData,t=this.transportationController.transportationDataLoaded;return W`
            ${this.controller.isActive?t?W`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    ${this.renderTransportationContent(e)}
                                </div>`:W`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    <div class="transportation-loading">Loading transportation data...</div>
                                </div>`:W``}
        `}renderTransportationContent(e){if(e.loading)return W`
                <div class="transportation-loading">Loading transportation data...</div>`;if(e.error)return W`
                <div class="transportation-error">${e.error}</div>`;if(!e.departures||0===e.departures.length)return W`
                <div class="transportation-loading">No departures available</div>`;const t={};for(const i of e.departures){const e=`${i.stopName}-${i.postId}`;t[e]||(t[e]=[]),t[e].push(i)}return W`
            <div class="transportation-departures">
                ${Object.entries(t).map(([e,t])=>{const i=t[0].stopName;return W`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.fontColor};">
                                ${i}
                            </h3>
                            <div class="stop-departures">
                                ${t.map(e=>W`
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
                                        ${e.isLowFloor?W`
                                            <div class="departure-lowfloor">♿</div>`:""}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `})}
            </div>
        `}};var St;Ct.styles=a`
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
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 170px;
            width: 100%;
        }

        .transportation-loading {
            color: #FFFFFF;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 170px;
            width: 100%;
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
    `,_t([ue({type:Object})],Ct.prototype,"transportation",void 0),_t([ue({type:String})],Ct.prototype,"fontColor",void 0),_t([ue({type:Object})],Ct.prototype,"hass",void 0),Ct=_t([he("ha-transportation")],Ct),function(e){e.Left="left",e.Center="center",e.Right="right"}(St||(St={}));class xt{constructor(){this.handlers=new Map}static getInstance(){return xt.instance||(xt.instance=new xt),xt.instance}registerHandler(e,t){this.handlers.set(e,t)}getHandler(e){return this.handlers.get(e)}}class kt extends Le{constructor(e,t={}){super(e,"action-bar-controller"),this.config={},this.config=t,this.registry=xt.getInstance()}onHostConnected(){this.logger.debug("Action bar controller connected")}onHostDisconnected(){this.logger.debug("Action bar controller disconnected")}updateConfig(e){this.logger.debug("Updating ActionBarController config:",e),this.config={...this.config,...e},this.host.requestUpdate()}get actionBarConfig(){return this.config.actionBar}get isActionBarEnabled(){var e;return!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}registerActionHandler(e,t){this.logger.debug(`Registering handler for action type: ${e}`),this.registry.registerHandler(e,t)}getActionHandler(e){return this.registry.getHandler(e)}}class It{constructor(){this.plugins=new Map,this.actionRegistry=xt.getInstance()}static getInstance(){return It.instance||(It.instance=new It),It.instance}registerPlugin(e){const t=e.actionId;this.plugins.set(t,e)}registerPluginWithHandler(e){this.registerPlugin(e),this.actionRegistry.registerHandler(e.actionId,e.handler)}getAllPlugins(){return Array.from(this.plugins.values())}getPlugin(e){return this.plugins.get(e)}getAllActionIds(){return Array.from(this.plugins.keys())}}function At(e){It.getInstance().registerPluginWithHandler(e)}var zt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ot=class extends bt{get priority(){return 5}get isActive(){var e;return!0===(null===(e=this.config)||void 0===e?void 0:e.enabled)&&this.config.actions&&this.config.actions.length>0}constructor(){super(),this.logger=be("action-bar-component"),this.actionBarController=new kt(this,{actionBar:this.config})}get controller(){return this.actionBarController}getIconSize(){return et(this.size,this.iconSize,"iconSize")}getButtonSize(){return function(e,t){if(e===Qe.Custom&&t){const e=parseInt(t);return isNaN(e)?Xe.buttonSize.medium:2*e+"px"}return et(e,void 0,"buttonSize")}(this.size,this.iconSize)}updated(e){super.updated(e),e.has("config")&&(this.logger.debug("Config properties changed, updating ActionBarController"),this.actionBarController.updateConfig({actionBar:this.config}),We.getInstance().publish(new qe)),e.has("hass")&&this.hass&&this.requestUpdate()}getJustifyContent(){if(!this.config||!this.config.alignment)return"center";switch(this.config.alignment){case St.Left:return"flex-start";case St.Right:return"flex-end";case St.Center:default:return"center"}}render(){if(!this.config||!1===this.config.enabled||!this.config.actions||0===this.config.actions.length)return W``;const e=this.getJustifyContent(),t=this.getButtonSize(),i=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.3;return this.logger.debug(`Rendering action bar - ButtonSize: ${t}`),W`
            <div class="action-bar-container" 
                style="color: ${this.fontColor}; 
                       justify-content: ${e}; 
                       background-color: rgba(0, 0, 0, ${i});
                       --action-button-size: ${t};">
                ${this.config.actions.map(e=>this.renderActionButton(e))}
            </div>
        `}renderActionButton(e){const t=It.getInstance().getPlugin(e.actionId);let i=e.active||!1,o=e.icon;t&&"getIconForState"in t&&this.hass&&(o=t.getIconForState(e,this.hass)),t&&"getActiveState"in t&&(i=t.getActiveState());const n=i?"active":"",s=i&&e.activeColor?`--active-icon-color: ${e.activeColor};`:"";return W`
            <div class="action-button ${n}" 
                 style="${s}"
                 @click=${()=>this._handleActionClick(e)}>
                ${o&&o.startsWith("mdi:")?W`<ha-icon icon="${o}" 
                                   style="${i&&e.activeColor?`color: ${e.activeColor};`:""} 
                                          width: ${this.getIconSize()}; 
                                          height: ${this.getIconSize()}; 
                                          --mdc-icon-size: ${this.getIconSize()};">
                           </ha-icon>`:W`<svg viewBox="0 0 24 24"
                               style="${i&&e.activeColor?`fill: ${e.activeColor};`:""} 
                                      width: ${this.getIconSize()}; 
                                      height: ${this.getIconSize()};">
                        <path d="${o}"></path>
                      </svg>`}
                <div class="action-title">${e.title}</div>
            </div>
        `}_handleActionClick(e){this.hass?(this.logger.debug("Action clicked:",e),function(e,t,i){const o=xt.getInstance().getHandler(e.actionId);o?o(e,t,i):console.warn(`No handler registered for action type: ${e.actionId}`)}(e,this.hass,this)):this.logger.error("Home Assistant instance not available")}};Ot.styles=a`
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
            min-height: var(--action-button-size, 144px);
        }

        .action-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 90px;
            width: var(--action-button-size, 144px);
            height: var(--action-button-size, 144px);
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
    `,zt([ue({type:Object})],Ot.prototype,"config",void 0),zt([ue({type:String})],Ot.prototype,"fontColor",void 0),zt([ue({type:Object})],Ot.prototype,"hass",void 0),zt([ue({type:String})],Ot.prototype,"size",void 0),zt([ue({type:String})],Ot.prototype,"iconSize",void 0),Ot=zt([he("ha-action-bar")],Ot);const Pt="action-navigate",Dt=e=>{const{path:t,target:i}=e;if("_blank"===i)window.open(t,"_blank");else{window.history.pushState(null,"",t);const e=new Event("location-changed",{composed:!0});window.dispatchEvent(e)}};var Nt,Ft=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};class Et extends le{updated(e){super.updated(e)}handleInputChange(e,t){t.stopPropagation(),t.preventDefault();const i=t.target;i&&this.actionChanged(this.index,e,i.value||"")}handleValueChange(e,t){t.stopPropagation(),t.preventDefault(),this.actionChanged(this.index,e,t.detail.value)}}Ft([ue({type:Object})],Et.prototype,"hass",void 0),Ft([ue({type:Object})],Et.prototype,"actionConfig",void 0),Ft([ue({type:Number})],Et.prototype,"index",void 0),Ft([ue({type:Function})],Et.prototype,"actionChanged",void 0),function(e){e.Left="left",e.Top="top",e.Hidden="hidden"}(Nt||(Nt={}));let Rt=class extends Et{get navigationAction(){return this.actionConfig}render(){return W`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"text"}}}
                    .value=${this.navigationAction.path||""}
                    .label= ${"Navigation Path"}
                    .labelPosition=${Nt.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${e=>this.handleValueChange("path",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"_self",label:"Current Tab"},{value:"_blank",label:"New Tab"}],mode:"dropdown"}}}
                    .value=${this.navigationAction.target||"_self"}
                    .label= ${"Open In"}
                    .labelPosition=${Nt.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${e=>this.handleValueChange("target",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color:{type:"rgb"}}}
                    .value=${this.navigationAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the navigation action is active"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Rt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([he("navigation-editor-plugin")],Rt);const Tt="call-service",Ut=(e,t)=>{const{service:i,service_data:o,confirmation:n,confirmation_text:s}=e;if(n&&!confirm(s||`Are you sure you want to call ${i}?`))return;const[a,r]=i.split(".");t.callService(a,r,o)};var Mt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Bt=class extends Et{constructor(){super(...arguments),this._services=[]}get serviceCallAction(){return this.actionConfig}firstUpdated(){this._loadServices()}_loadServices(){if(!this.hass)return;const e=this.hass.services;if(!e)return;const t=[];Object.keys(e).forEach(i=>{Object.keys(e[i]).forEach(e=>{t.push({value:`${i}.${e}`,label:`${i}.${e}`})})}),t.sort((e,t)=>e.label.localeCompare(t.label)),this._services=t}render(){return W`

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:this._services,mode:"dropdown",custom_value:!0}}}
                    .value=${this.serviceCallAction.service||""}
                    .label=${"Service"}
                    .helper= ${"Select a service or enter a custom one (domain.service)"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("service",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{multiline:!1,type:"text"}}}
                    label="Service Data (JSON)"
                    .value=${this.serviceCallAction.service_data?JSON.stringify(this.serviceCallAction.service_data):"{}"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>{if(e.stopPropagation(),e.preventDefault(),e.target)try{const t=JSON.parse(e.detail.value||"{}");this.actionChanged(this.index,"service_data",t)}catch(e){}}}
            ></ha-row-selector>

            <div class="helper-text">Example: {"entity_id": "light.living_room"} for light.toggle service</div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color:{type:"rgb"}}}
                    .value=${this.serviceCallAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the service call action is active"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Bt.styles=a`
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
    `,Mt([ue({state:!0,attribute:!1})],Bt.prototype,"_services",void 0),Bt=Mt([he("service-call-editor-plugin")],Bt);const jt="light-toggle",Lt=(e,t)=>{const{entity_id:i}=e;i?t.states[i]?t.callService("light","toggle",{entity_id:i}):console.warn(`Entity ${i} not found`):console.warn("No entity_id specified for light toggle action")};let Ht=class extends Et{get lightToggleAction(){return this.actionConfig}render(){return W`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"light"}}}
                    .value=${this.lightToggleAction.entity_id||""}
                    .label=${"Light Entity"}
                    .helper=${"Select a light entity to toggle"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for light on state"}}}
                    .value=${this.lightToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when light is on"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.lightToggleAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the light is on (active state)"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Ht.styles=a`
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
    `,Ht=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([he("light-toggle-editor-plugin")],Ht);const Wt="switch-toggle",Vt=(e,t)=>{const{entity_id:i}=e;i?t.states[i]?t.callService("switch","toggle",{entity_id:i}):console.warn(`Entity ${i} not found`):console.warn("No entity_id specified for switch toggle action")};let Jt=class extends Et{get switchToggleAction(){return this.actionConfig}render(){return W`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"switch"}}}
                    .value=${this.switchToggleAction.entity_id||""}
                    .label=${"Switch Entity"}
                    .helper=${"Select a switch entity to toggle"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for switch on state"}}}
                    .value=${this.switchToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when switch is on"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.switchToggleAction.activeColor||"#4CAF50"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the switch is on (active state)"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Jt.styles=a`
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
    `,Jt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([he("switch-toggle-editor-plugin")],Jt);const qt=be("weather-update-plugin"),Kt="weather-update",Zt=(e,t)=>{qt.info("Weather update clicked"),We.getInstance().publish(new Je)};class Gt{constructor(){this.actionId=Kt,this.name="Update Weather",this.description="Trigger an immediate weather update",this.icon="mdi:weather-partly-cloudy",this.handler=Zt,this.editorTag="weather-update-editor-plugin"}defaultActionConfig(){return{actionId:Kt,title:"Update Weather",icon:this.icon}}register(){At(this)}}function Yt(){(new Gt).register()}let Qt=class extends Et{get weatherUpdateAction(){return this.actionConfig}render(){return W`
            <div class="helper-text">
                This action will trigger an immediate weather update when clicked.
                No additional configuration is needed.
            </div>
        `}};Qt.styles=a`
        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,Qt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([he("weather-update-editor-plugin")],Qt),Yt();const Xt="transportation",ei=be("transportation-plugin"),ti=(e,t)=>{ei.info("Transportation clicked"),We.getInstance().publish(new Ke)};class ii{constructor(){this.actionId=Xt,this.name="Transportation",this.description="Show transportation information",this.icon="mdi:bus-clock",this.handler=ti,this.editorTag=""}defaultActionConfig(){return{actionId:Xt,title:"Transportation",icon:this.icon}}register(){At(this)}}function oi(){(new ii).register()}oi();const ni="background-next",si=be("background-next-plugin"),ai=(e,t)=>{si.info("Background next clicked"),We.getInstance().publish(new Ze)};class ri{constructor(){this.actionId=ni,this.name="Next Background",this.description="Show next background image",this.icon="mdi:image-refresh",this.handler=ai,this.editorTag=""}defaultActionConfig(){return{actionId:ni,title:"Next Background",icon:this.icon}}register(){At(this)}}function li(){(new ri).register()}li();const ci="action-more-info";var hi,di,gi;(gi=hi||(hi={})).language="language",gi.system="system",gi.comma_decimal="comma_decimal",gi.decimal_comma="decimal_comma",gi.space_comma="space_comma",gi.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(di||(di={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var ui=function(e,t,i,o){o=o||{},i=null==i?{}:i;var n=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,e.dispatchEvent(n),n};new Set(["call-service","divider","section","weblink","cast","select"]);const pi=be("more-info-plugin"),mi=(e,t,i)=>{const{entity_id:o}=e;if(!o)return void pi.warn("No entity_id specified for more-info action");const n=t.states[o];if(n){pi.info(`Opening more-info for entity ${o} (${n.entity_id})`);try{const e={entityId:o,view:"info"};ui(i||document.body,"hass-more-info",e)}catch(e){pi.warn("Error using fireEvent method:",e)}}else pi.warn(`Entity ${o} not found`)};let fi=class extends Et{get moreInfoAction(){return this.actionConfig}render(){return W`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.moreInfoAction.entity_id||""}
                    .label=${"Entity"}
                    .helper=${"Select an entity to show more info for"}
                    .labelPosition=${Nt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>
        `}};fi.styles=a`
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
    `,fi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([he("more-info-editor-plugin")],fi),(new class{constructor(){this.actionId=Pt,this.name="Navigate to Page",this.description="Navigate to a different page in Home Assistant",this.icon="mdi:arrow-right",this.handler=Dt,this.editorTag="navigation-editor-plugin"}defaultActionConfig(){return{actionId:Pt,title:"Navigate",icon:this.icon,path:"/"}}register(){At(this)}}).register(),(new class{constructor(){this.actionId=Tt,this.name="Call Service",this.description="Call a Home Assistant service",this.icon="mdi:lightbulb",this.handler=Ut,this.editorTag="service-call-editor-plugin"}defaultActionConfig(){return{actionId:Tt,service:"light.toggle",service_data:{entity_id:"light.living_room"},title:"Toggle Light",icon:this.icon}}register(){At(this)}}).register(),(new class{constructor(){this.actionId=jt,this.name="Toggle Light",this.description="Toggle a light on or off",this.icon="mdi:lightbulb",this.handler=Lt,this.editorTag="light-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:i}=e;if(!i)return e.icon||this.icon;const o=t.states[i];return o?(this._lastActiveState="on"===o.state,this._lastActiveState?e.icon_on||this.icon:e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:jt,entity_id:"",title:"Toggle Light",icon:this.icon,icon_on:"mdi:lightbulb-on"}}register(){At(this)}}).register(),(new class{constructor(){this.actionId=Wt,this.name="Toggle Switch",this.description="Toggle a switch on or off",this.icon="mdi:toggle-switch-variant-off",this.handler=Vt,this.editorTag="switch-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:i}=e;if(!i)return e.icon||this.icon;const o=t.states[i];return o?(this._lastActiveState="on"===o.state,this._lastActiveState?e.icon_on||"mdi:toggle-switch-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:Wt,entity_id:"",title:"Toggle Switch",icon:this.icon,icon_on:"mdi:toggle-switch-variant"}}register(){At(this)}}).register(),Yt(),oi(),li(),(new class{constructor(){this.actionId=ci,this.name="Entity More Info",this.description="Open the default modal window of an entity",this.icon="mdi:information-outline",this.handler=mi,this.editorTag="more-info-editor-plugin"}defaultActionConfig(){return{actionId:ci,title:"More Info",icon:this.icon,entity_id:""}}register(){At(this)}}).register();var vi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};class yi extends le{updated(e){super.updated(e)}_handleFormValueChanged(e){if(e.stopPropagation(),!this.config)return;const t=JSON.parse(JSON.stringify(this.config));this.setPropertyByPath(t,e.detail.propertyName,e.detail.value),ui(this,"config-changed",{config:t})}setPropertyByPath(e,t,i){if(!t)return e;const o=t.split(".");let n=e;for(let e=0;e<o.length-1;e++){const t=o[e];if(t.includes("[")&&t.includes("]")){const e=t.substring(0,t.indexOf("[")),i=parseInt(t.substring(t.indexOf("[")+1,t.indexOf("]")),10);n[e]||(n[e]=[]),n[e][i]||(n[e][i]={}),n=n[e][i]}else n[t]||(n[t]={}),n=n[t]}return n[o[o.length-1]]=i,e}}vi([ue({type:Object})],yi.prototype,"hass",void 0),vi([ue({type:Object})],yi.prototype,"config",void 0);var wi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let bi=class extends yi{constructor(){super(...arguments),this._actions=[],this._editorComponentCache=new Map}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadActions()}_loadActions(){var e;(null===(e=this.config)||void 0===e?void 0:e.actionBar)&&this.config.actionBar.actions&&this.config.actionBar.actions.length>0?this._actions=[...this.config.actionBar.actions]:this._actions=[]}_getActionTypeOptions(){return It.getInstance().getAllPlugins().map(e=>({value:e.actionId,label:e.name}))}_getEditorTagName(e){const t=It.getInstance().getPlugin(e);return t&&t.editorTag?t.editorTag:null}_createEditorTagComponent(e,t){const i=this._getEditorTagName(e.actionId);if(!i)return"";const o=`${e.actionId}-${t}`;if(this._editorComponentCache.has(o)){const t=this._editorComponentCache.get(o);return this.hass&&(t.hass=this.hass),t.actionConfig=e,t}try{const n=document.createElement(i);return this.hass&&(n.hass=this.hass),n.actionConfig=e,n.index=t,n.actionChanged=this._actionChanged.bind(this),this._editorComponentCache.set(o,n),n}catch(e){return console.error(`Error creating editor component ${i}:`,e),""}}_addAction(){const e=this._getActionTypeOptions(),t=e.length>0?e[0].value:Pt;let i;const o=It.getInstance().getPlugin(t);if(i=o&&o.defaultActionConfig?o.defaultActionConfig():{actionId:t,title:"Action",icon:"mdi:flash"},this._editorComponentCache.clear(),this._actions=[...this._actions,i],this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],e.actionBar.enabled=!0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionUp(e){if(e<=0||e>=this._actions.length)return;this._editorComponentCache.clear();const t=[...this._actions],i=t[e];if(t[e]=t[e-1],t[e-1]=i,this._actions=t,this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionDown(e){if(e<0||e>=this._actions.length-1)return;this._editorComponentCache.clear();const t=[...this._actions],i=t[e];if(t[e]=t[e+1],t[e+1]=i,this._actions=t,this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeAction(e){if(this._editorComponentCache.clear(),this._actions=this._actions.filter((t,i)=>i!==e),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],0===this._actions.length&&(e.actionBar&&(e.actionBar.enabled=!1),e.actionBar=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_actionChanged(e,t,i){if("actionId"===t){const t=this._actions[e];if(t){const i=`${t.actionId}-${e}`;this._editorComponentCache.delete(i)}}if(this._actions=this._actions.map((o,n)=>n===e?{...o,[t]:i}:o),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
            .content {
                padding: 12px;
            }
            
            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
            }
            
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
        `}render(){var e,t,i,o;return this.hass&&this.config?W`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}
                        .label= ${"Enable Action Bar"}
                        propertyName="actionBar.enabled"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${!0===(null===(t=this.config.actionBar)||void 0===t?void 0:t.enabled)?W`
                    <div class="info-text">
                        Configure action buttons that will appear at the bottom of the card.
                        Action bar and transportation cannot be displayed simultaneously - action bar takes
                        precedence.
                    </div>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:[{value:St.Left,label:"Left"},{value:St.Center,label:"Center"},{value:St.Right,label:"Right"}],mode:"dropdown"}}}
                            .value=${(null===(i=this.config.actionBar)||void 0===i?void 0:i.alignment)||St.Center}
                            .label= ${"Button Alignment"}
                            .helper= ${"Align buttons to the left, center, or right"}
                            .labelPosition=${Nt.Top}
                            propertyName="actionBar.alignment"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                            .value=${void 0!==(null===(o=this.config.actionBar)||void 0===o?void 0:o.backgroundOpacity)?this.config.actionBar.backgroundOpacity:.3}
                            .label= ${"Background Opacity"}
                            .helper= ${"Adjust the transparency of the action bar background (0 = fully transparent, 1 = fully opaque)"}
                            .labelPosition=${Nt.Top}
                            propertyName="actionBar.backgroundOpacity"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <div class="section-subheader">Actions</div>

                    ${this._actions.map((e,t)=>W`
                        ${t>0?W`<hr style="width: 100%; border: none; border-top: 1px solid var(--divider-color, rgba(0,0,0,0.8)); margin: 8px 0 16px 0;">`:""}

                        <ha-row-selector
                                style="flex: 2;"
                                .hass=${this.hass}
                                .selector=${{select:{options:this._getActionTypeOptions(),mode:"dropdown"}}}
                                .value=${e.actionId}
                                .label= ${"Action Type"}
                                .labelPosition=${Nt.Hidden}
                                .helper= ${"Select Action type"}
                                .actionButtons=${[{icon:"M19,13H5V11H19V13Z",tooltip:"Remove action",eventName:"action-click"},...t>0?[{icon:"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",tooltip:"Move action up",eventName:"action-click-0"}]:[],...t<this._actions.length-1?[{icon:"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",tooltip:"Move action down",eventName:"action-click-1"}]:[]]}
                                @value-changed=${e=>{this._actionChanged(t,"actionId",e.detail.value)}}
                                @action-click=${()=>this._removeAction(t)}
                                @action-click-0=${t>0?()=>this._moveActionUp(t):null}
                                @action-click-1=${t<this._actions.length-1?()=>this._moveActionDown(t):null}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${e.title||""}
                                .label=${"Title"}
                                .helper= ${"Title for the action button"}
                                .labelPosition=${Nt.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const i=e.detail.value;this._actionChanged(t,"title",i||"")}}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{icon:{placeholder:"mdi:clock"}}}
                                .value=${e.icon||""}
                                .label=${"Icon"}
                                .helper= ${"Icon for the action button"}
                                .labelPosition=${Nt.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const i=e.detail.value;this._actionChanged(t,"icon",i||"")}}
                        ></ha-row-selector>

                        <!-- Editor components are now dynamically created by the factory pattern -->
                        ${this._createEditorTagComponent(e,t)}
                    `)}

                    <mwc-button @click=${this._addAction}>Add Action</mwc-button>
                `:""}
            </div>
        `:W``}};wi([ue({type:Array})],bi.prototype,"_actions",void 0),bi=wi([he("action-bar-editor")],bi);var $i=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let _i=class extends yi{constructor(){super(...arguments),this._backgroundImages=[],this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadBackgroundImages()}_loadBackgroundImages(){var e;(null===(e=this.config)||void 0===e?void 0:e.backgroundImages)&&this.config.backgroundImages.length>0?this._backgroundImages=[...this.config.backgroundImages]:this._backgroundImages=[]}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:xe.All,timeOfDay:Se.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,i)=>i!==e),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this.config){const e=JSON.parse(JSON.stringify(this.config));e.backgroundImages=[...this._backgroundImages],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
            .content {
                padding: 12px;
            }
            
            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
            }
            
            .section-subheader {
                font-size: 16px;
                font-weight: 500;
                margin: 25px 0 5px 0;
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
        `}render(){return this.hass&&this.config?W`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._imageSourceOptions,mode:"dropdown"}}}
                        .value=${this.config.imageSource||"none"}
                        .label= ${"Image Source"}
                        propertyName="imageSource"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:0,max:1,step:.05,mode:"slider",slider_ticks:!0}}}
                        .value=${void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5}
                        .label= ${"Background Opacity"}
                        propertyName="backgroundOpacity"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:30,max:300,step:10,mode:"slider",slider_ticks:!0}}}
                        .value=${this.config.backgroundRotationInterval||90}
                        .label= ${"Rotation Interval (sec)"}
                        propertyName="backgroundRotationInterval"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                
                ${"local"===this.config.imageSource?this._renderLocalImagesSection():""}
                ${"unsplash"===this.config.imageSource?this._renderUnsplashSection():""}
                ${"sensor"===this.config.imageSource?this._renderSensorImagesSection():""}
            </div>
        `:W``}_renderLocalImagesSection(){return W`
            <div class="info-text">
                Configure local image URLs. Images will be automatically categorized by weather
                condition and time of day based on their file paths.
                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day
                (sunrise-sunset, day, night) in your file paths.
            </div>

            <div class="section-subheader">Background Images</div>

            ${this._backgroundImages.map((e,t)=>W`
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
                                .selector=${{select:{options:Object.values(xe).map(e=>({value:e,label:e}))}}}
                                .value=${e.weather}
                                .label= ${"Weather Condition"}
                                propertyName="backgroundImages.${t}.weather"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                    <div class="image-time">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:Object.values(Se).map(e=>({value:e,label:e}))}}}
                                .value=${e.timeOfDay}
                                .label= ${"Time of Day"}
                                propertyName="backgroundImages.${t}.timeOfDay"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </div>
            `)}

            <mwc-button @click=${this._addBackgroundImage}>Add Background Image</mwc-button>
        `}_renderUnsplashSection(){var e,t,i,o;return W`
            <div class="info-text">
                Configure Unsplash image source settings. An API key is required to use Unsplash.
                You can obtain a free API key from the Unsplash Developer portal.
            </div>

            <div class="row">
                <div class="label">Category</div>
                <div class="value">
                    <ha-textfield
                            label="Category"
                            .value=${(null===(e=this.config.imageConfig)||void 0===e?void 0:e.category)||"nature"}
                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this.config)return;const i=JSON.parse(JSON.stringify(this.config));i.imageConfig||(i.imageConfig={}),i.imageConfig.category=t.value||"nature",this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}}
                    ></ha-textfield>
                </div>
            </div>

            <ha-row-selector
                    min="1"
                    max="30"
                    .hass=${this.hass}
                    .selector=${{text:{type:"number"}}}
                    .value=${(null===(t=this.config.imageConfig)||void 0===t?void 0:t.count)||"5"}
                    .label= ${"Number of Photos"}
                    propertyName="imageConfig.count"
                    transformData=${e=>{let t=parseInt(e||"5",10);return(isNaN(t)||t<1)&&(t=1),t>30&&(t=30),t}}
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <div class="info-text">
                An API key is required. Without a valid API key, the Unsplash image source will not
                work.
            </div>

            <div class="row">
                <div class="label">API Key</div>
                <div class="value">
                    <ha-textfield
                            label="API Key"
                            .value=${(null===(i=this.config.imageConfig)||void 0===i?void 0:i.apiKey)||""}
                            @input=${e=>{e.stopPropagation(),e.preventDefault();const t=e.target;if(!t||!this.config)return;const i=JSON.parse(JSON.stringify(this.config));i.imageConfig||(i.imageConfig={}),i.imageConfig.apiKey=t.value||"",this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}}
                    ></ha-textfield>
                </div>
            </div>

            <div class="row">
                <div class="label">Content Filter</div>
                <div class="value">
                    <ha-select
                            label="Content Filter"
                            .value=${(null===(o=this.config.imageConfig)||void 0===o?void 0:o.contentFilter)||"high"}
                            @click=${e=>{e.stopPropagation()}}
                            @closed=${e=>{e.stopPropagation();const t=e.target;if(!t||!this.config)return;const i=JSON.parse(JSON.stringify(this.config));i.imageConfig||(i.imageConfig={}),i.imageConfig.contentFilter=t.value||"high",this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}}
                    >
                        <mwc-list-item .value=${"low"}>Low</mwc-list-item>
                        <mwc-list-item .value=${"high"}>High</mwc-list-item>
                    </ha-select>
                </div>
            </div>
        `}_renderSensorImagesSection(){var e;return W`
            <div class="info-text">
                Configure the sensor that provides the image list. The sensor should have a "files"
                attribute that contains an array of image URLs.
            </div>

            <ha-row-selector
                    .hass=${this.hass}
                    .labelPosition=${"top"}
                    .selector=${{entity:{include_entities:this.hass?Object.keys(this.hass.states).filter(e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e];return t&&t.attributes&&void 0!==t.attributes.files}):[]}}}
                    .value=${(null===(e=this.config.imageConfig)||void 0===e?void 0:e.entity)||""}
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
        `}};$i([ue({type:Array})],_i.prototype,"_backgroundImages",void 0),_i=$i([he("background-editor")],_i);let Ci=class extends yi{constructor(){super(...arguments),this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]}}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n,s;return this.hass&&this.config?W`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._dateFormatOptions.weekday,mode:"dropdown"}}}
                        .value=${(null===(e=this.config.dateFormat)||void 0===e?void 0:e.weekday)||"long"}
                        .label= ${"Weekday Display"}
                        propertyName="dateFormat.weekday"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._dateFormatOptions.month,mode:"dropdown"}}}
                        .value=${(null===(t=this.config.dateFormat)||void 0===t?void 0:t.month)||"long"}
                        .label= ${"Month Display"}
                        propertyName="dateFormat.month"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._dateFormatOptions.day,mode:"dropdown"}}}
                        .value=${void 0===(null===(i=this.config.dateFormat)||void 0===i?void 0:i.day)?"undefined":null===(o=this.config.dateFormat)||void 0===o?void 0:o.day}
                        .label= ${"Day Display"}
                        propertyName="dateFormat.day"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._dateFormatOptions.year,mode:"dropdown"}}}
                        .value=${void 0===(null===(n=this.config.dateFormat)||void 0===n?void 0:n.year)?"undefined":null===(s=this.config.dateFormat)||void 0===s?void 0:s.year}
                        .label= ${"Year Display"}
                        propertyName="dateFormat.year"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `:W``}};Ci=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([he("date-format-editor")],Ci);let Si=class extends yi{constructor(){super(...arguments),this._timeFormatOptions={hour12:[{value:"true",label:"12-hour"},{value:"false",label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]}}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n;return this.hass&&this.config?W`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._timeFormatOptions.hour12,mode:"dropdown"}}}
                        .value=${(null===(e=this.config.timeFormat)||void 0===e?void 0:e.hour12)?"true":"false"}
                        .label= ${"Hour Format"}
                        propertyName="timeFormat.hour12"
                        .transformData=${e=>"true"===e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._timeFormatOptions.hour,mode:"dropdown"}}}
                        .value=${(null===(t=this.config.timeFormat)||void 0===t?void 0:t.hour)||"2-digit"}
                        .label= ${"Hour Display"}
                        propertyName="timeFormat.hour"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._timeFormatOptions.minute,mode:"dropdown"}}}
                        .value=${(null===(i=this.config.timeFormat)||void 0===i?void 0:i.minute)||"2-digit"}
                        .label= ${"Minute Display"}
                        propertyName="timeFormat.minute"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._timeFormatOptions.second,mode:"dropdown"}}}
                        .value=${void 0===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.second)?"undefined":null===(n=this.config.timeFormat)||void 0===n?void 0:n.second}
                        .label= ${"Second Display"}
                        propertyName="timeFormat.second"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `:W``}};Si=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([he("time-format-editor")],Si);var xi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let ki=class extends yi{constructor(){super(...arguments),this._sensors=[]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadSensors()}_loadSensors(){var e;(null===(e=this.config)||void 0===e?void 0:e.sensors)&&this.config.sensors.length>0?this._sensors=[...this.config.sensors]:this._sensors=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,i)=>i!==e),this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
            .content {
                padding: 12px;
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
        `}render(){return this.hass&&this.config?W`
            <div class="content">
                ${this._sensors.map((e,t)=>W`
                    <div class="sensor-row">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${e.label||""}
                                .label=${"Label"}
                                .labelPosition=${Nt.Top}
                                propertyName="sensors.${t}.label"
                                @value-changed=${this._handleFormValueChanged}
                                style="flex: 0 0 30%; margin-right: 8px; overflow: hidden;"
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{entity:{filter:{domain:["sensor","binary_sensor","input_text","input_number","input_datetime","sun","weather"]}}}}
                                .value=${e.entity||""}
                                .label=${"Entity"}
                                .labelPosition=${Nt.Top}
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
        `:W``}};xi([ue({type:Array})],ki.prototype,"_sensors",void 0),ki=xi([he("sensors-editor")],ki);var Ii=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ai=class extends yi{constructor(){super(...arguments),this._stops=[]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadStops()}_loadStops(){var e;(null===(e=this.config)||void 0===e?void 0:e.transportation)&&this.config.transportation.stops&&this.config.transportation.stops.length>0?this._stops=[...this.config.transportation.stops]:this._stops=[]}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeStop(e){if(this._stops=this._stops.filter((t,i)=>i!==e),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_stopChanged(e,t,i){if(this._stops=this._stops.map((o,n)=>n===e?{...o,[t]:i}:o),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_getTransportationProviderOptions(){return[...yt.getAllProviders().map(e=>({value:e.id,label:e.name}))]}static get styles(){return a`
            .content {
                padding: 12px;
            }
            
            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
            }
            
            .section-subheader {
                font-size: 16px;
                font-weight: 500;
                margin: 25px 0 5px 0;
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
        `}render(){var e,t,i,o,n;return this.hass&&this.config&&(null===(e=this.config.transportation)||void 0===e?void 0:e.enable)?W`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._getTransportationProviderOptions(),mode:"dropdown"}}}
                        .value=${(null===(t=this.config.transportation)||void 0===t?void 0:t.provider)||"idsjmk"}
                        .label= ${"Transportation Provider"}
                        propertyName="transportation.provider"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,max:5,step:1,mode:"slider"}}}
                        .value=${(null===(i=this.config.transportation)||void 0===i?void 0:i.maxDepartures)||2}
                        .label= ${"Global Max Departures"}
                        .helper=${`${(null===(o=this.config.transportation)||void 0===o?void 0:o.maxDepartures)||2} departures`}
                        propertyName="transportation.maxDepartures"
                        @value-changed=${e=>{this._handleFormValueChanged(e),this._loadStops()}}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,max:10,step:1,mode:"box"}}}
                        .value=${(null===(n=this.config.transportation)||void 0===n?void 0:n.autoHideTimeout)||5}
                        .label= ${"Auto-Hide Timeout"}
                        .helper= ${"Auto-hide timeout in minutes (1-10)"}
                        propertyName="transportation.autoHideTimeout"
                        .transformData=${e=>Math.max(Math.min(e||5,10),1)}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,step:1,mode:"box"}}}
                        .value=${Math.floor((this.config.transportation.updateInterval||60)/60)}
                        .label= ${"Update Interval"}
                        .helper= ${"Update interval in minutes (min: 1)"}
                        propertyName="transportation.updateInterval"
                        .transformData=${e=>60*Math.max(e||1,1)}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <div class="section-subheader">Stops</div>

                ${this._stops.map((e,t)=>W`
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
        `:W``}};Ii([ue({type:Array})],Ai.prototype,"_stops",void 0),Ai=Ii([he("transportation-editor")],Ai);let zi=class extends yi{constructor(){super(...arguments),this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o;return this.hass&&this.config?W`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${this.config.showWeather||!1}
                        .label= ${"Show Weather"}
                        .helper= ${"Display weather forecast"}
                        propertyName="showWeather"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${this.config.showWeather?W`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{text:{type:"text"}}}
                            .value=${this.config.weatherTitle||"Weather"}
                            .label= ${"Weather Title"}
                            propertyName="weatherTitle"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:this._weatherProviderOptions,mode:"dropdown"}}}
                            .value=${this.config.weatherProvider||"openweathermap"}
                            .label= ${"Weather Provider"}
                            propertyName="weatherProvider"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    ${"openweathermap"===this.config.weatherProvider?W`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${(null===(e=this.config.weatherConfig)||void 0===e?void 0:e.apiKey)||""}
                                .label= ${"API Key"}
                                .helper= ${"OpenWeatherMap API Key"}
                                propertyName="weatherConfig.apiKey"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:-90,max:90,step:1e-4,mode:"box"}}}
                                .value=${(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.latitude)||50.0755}
                                .label=${"Latitude"}
                                propertyName="weatherConfig.latitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:-180,max:180,step:1e-4,mode:"box"}}}
                                .value=${(null===(i=this.config.weatherConfig)||void 0===i?void 0:i.longitude)||14.4378}
                                .label=${"Longitude"}
                                propertyName="weatherConfig.longitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._unitsOptions,mode:"dropdown"}}}
                                .value=${(null===(o=this.config.weatherConfig)||void 0===o?void 0:o.units)||"metric"}
                                .label=${"Units"}
                                propertyName="weatherConfig.units"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    `:""}

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:this._weatherDisplayModeOptions,mode:"dropdown"}}}
                            .value=${this.config.weatherDisplayMode||"both"}
                            .label= ${"Display Mode"}
                            propertyName="weatherDisplayMode"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    ${"forecast"===this.config.weatherDisplayMode||"both"===this.config.weatherDisplayMode?W`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:1,max:7,step:1,mode:"slider"}}}
                                .value=${this.config.weatherForecastDays||3}
                                .label= ${"Forecast Days"}
                                .helper=${`${this.config.weatherForecastDays||3} days`}
                                propertyName="weatherForecastDays"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:1,step:1,mode:"box"}}}
                                .value=${Math.floor((this.config.weatherUpdateInterval||1800)/60)}
                                .label= ${"Update Interval"}
                                .helper= ${"Update interval in minutes (min: 1)"}
                                propertyName="weatherUpdateInterval"
                                .transformData=${e=>60*e}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    `:""}
                `:""}
            </div>
        `:W``}};zi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([he("weather-editor")],zi);var Oi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Pi=class extends le{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._actions=[],this._languageOptions=[]}connectedCallback(){super.connectedCallback(),this._languageOptions=Te.map(e=>({value:e.code,label:e.label}))}updated(e){super.updated(e)}setConfig(e){const t=e,i=t.imageSource||"none";let o={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};t.timeFormat&&(o={...o,...t.timeFormat},void 0===t.timeFormat.second&&(o.second=void 0)),this._config={...t,timeFormat:o,dateFormat:t.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:i,imageConfig:t.imageConfig||{},backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",size:t.size||Qe.Medium,customSizes:t.customSizes||{clockSize:"16rem",dateSize:"6rem",labelSize:"1.5rem",valueSize:"3rem",actionBarIconSize:"72px"},showWeather:void 0!==t.showWeather&&t.showWeather,weatherProvider:t.weatherProvider||"openweathermap",weatherConfig:t.weatherConfig||{},weatherDisplayMode:t.weatherDisplayMode||"both",weatherForecastDays:t.weatherForecastDays||3,transportation:t.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops(),this._loadActions()}_loadSensors(){var e;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadActions(){var e;(null===(e=this._config)||void 0===e?void 0:e.actionBar)&&this._config.actionBar.actions&&this._config.actionBar.actions.length>0?this._actions=[...this._config.actionBar.actions]:this._actions=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_handleFormValueChanged(e){if(e.stopPropagation(),!this._config)return;const t=function(e,t,i){const o=JSON.parse(JSON.stringify(e)),n=t.split(".");let s=o;for(let e=0;e<n.length-1;e++){const t=n[e];void 0===s[t]&&(s[t]={}),s=s[t]}return s[n[n.length-1]]=i,o}(this._config,e.detail.propertyName,e.detail.value);this._config=t,ui(this,"config-changed",{config:t})}static get styles(){return a`
            .form-container {
                display: flex;
                flex-direction: column;
                padding: 16px;
            }

            .content {
                padding: 12px;
            }

            ha-expansion-panel {
                margin-bottom: 8px;
            }

            ha-selector, ha-textfield, ha-select {
                width: 100%;
            }
        `}render(){var e,t,i,o,n,s;return this.hass&&this._config?W`
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

                        <!-- Size Settings -->
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:[{value:Qe.Large,label:"Large"},{value:Qe.Medium,label:"Medium"},{value:Qe.Small,label:"Small"},{value:Qe.Custom,label:"Custom"}],mode:"dropdown"}}}
                                .value=${this._config.size||Qe.Medium}
                                .label= ${"Size"}
                                propertyName="size"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${this._config.size===Qe.Custom?W`
                            <h4>Custom Sizes</h4>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(e=this._config.customSizes)||void 0===e?void 0:e.clockSize)||"16rem"}
                                    .label= ${"Clock Size (e.g., 16rem)"}
                                    propertyName="customSizes.clockSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(t=this._config.customSizes)||void 0===t?void 0:t.dateSize)||"6rem"}
                                    .label= ${"Date Size (e.g., 6rem)"}
                                    propertyName="customSizes.dateSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(i=this._config.customSizes)||void 0===i?void 0:i.labelSize)||"1.5rem"}
                                    .label= ${"Label Size (e.g., 1.5rem)"}
                                    propertyName="customSizes.labelSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(o=this._config.customSizes)||void 0===o?void 0:o.valueSize)||"3rem"}
                                    .label= ${"Value Size (e.g., 3rem)"}
                                    propertyName="customSizes.valueSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(n=this._config.customSizes)||void 0===n?void 0:n.actionBarIconSize)||"72px"}
                                    .label= ${"Action Bar Icon Size (e.g., 72px)"}
                                    propertyName="customSizes.actionBarIconSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Time Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Time Format</h3>
                    <time-format-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,ui(this,"config-changed",{config:this._config})}}
                    ></time-format-editor>
                </ha-expansion-panel>

                <!-- Date Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Date Format</h3>
                    <date-format-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,ui(this,"config-changed",{config:this._config})}}
                    ></date-format-editor>
                </ha-expansion-panel>

                <!-- Background Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <background-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,this._loadBackgroundImages(),ui(this,"config-changed",{config:this._config})}}
                    ></background-editor>
                </ha-expansion-panel>

                <!-- Sensors Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Sensors</h3>
                    <sensors-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,this._loadSensors(),ui(this,"config-changed",{config:this._config})}}
                    ></sensors-editor>
                </ha-expansion-panel>

                <!-- Weather Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Weather Forecast</h3>
                    <weather-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,ui(this,"config-changed",{config:this._config})}}
                    ></weather-editor>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===(null===(s=this._config.transportation)||void 0===s?void 0:s.enable)?W`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <transportation-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,this._loadStops(),ui(this,"config-changed",{config:this._config})}}
                        ></transportation-editor>
                    </ha-expansion-panel>
                `:""}

                <!-- Action Bar Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Action Bar</h3>
                    <action-bar-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,this._loadActions(),ui(this,"config-changed",{config:this._config})}}
                    ></action-bar-editor>
                </ha-expansion-panel>
            </div>
        `:W``}};Oi([ue({type:Object})],Pi.prototype,"hass",void 0),Oi([ue({type:Object})],Pi.prototype,"_config",void 0),Oi([ue({type:Array})],Pi.prototype,"_sensors",void 0),Oi([ue({type:Array})],Pi.prototype,"_backgroundImages",void 0),Oi([ue({type:Array})],Pi.prototype,"_stops",void 0),Oi([ue({type:Array})],Pi.prototype,"_actions",void 0),Pi=Oi([he("wall-clock-card-editor")],Pi);var Di=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ni=class extends le{constructor(){super(...arguments),this.disabled=!1,this.required=!0}render(){return W`
            <ha-textfield
                    type="color"
                    .value=${this.value||""}
                    .label=${this.label}
                    .helper=${this.helper}
                    .disabled=${this.disabled}
                    .required=${this.required}
                    @change=${this._valueChanged}
            ></ha-textfield>
        `}_valueChanged(e){const t=e.target.value;t&&!/^#[0-9a-fA-F]{6}$/.test(t)||ui(this,"value-changed",{value:t})}};Ni.styles=a`
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
    `,Di([ue({attribute:!1})],Ni.prototype,"hass",void 0),Di([ue({attribute:!1})],Ni.prototype,"selector",void 0),Di([ue()],Ni.prototype,"value",void 0),Di([ue()],Ni.prototype,"label",void 0),Di([ue()],Ni.prototype,"helper",void 0),Di([ue({type:Boolean,reflect:!0})],Ni.prototype,"disabled",void 0),Di([ue({type:Boolean})],Ni.prototype,"required",void 0),Ni=Di([he("ha-selector-color_hex")],Ni);var Fi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ei=class extends le{constructor(){super(...arguments),this.disabled=!1,this.required=!0,this.labelPosition=Nt.Left}render(){return W`
            <div class="row ${this.labelPosition.toLowerCase()}">
                ${this.label&&this.labelPosition!==Nt.Hidden?W`
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
                    ${this.actionButtons?this.actionButtons.map((e,t)=>W`
                            <div class="action-button">
                                <ha-icon-button
                                    .path=${e.icon}
                                    .title=${e.tooltip||""}
                                    @click=${i=>this._handleDynamicActionClick(i,t,e.eventName)}
                                ></ha-icon-button>
                            </div>
                        `):""}
                </div>
            </div>
        `}_handleDynamicActionClick(e,t,i){e.stopPropagation(),ui(this,i||`action-click-${t}`,{})}_valueChanged(e){e.stopPropagation();let t=e.detail.value;this.transformData&&(t=this.transformData(t)),ui(this,"value-changed",{value:t,propertyName:this.propertyName})}};Ei.styles=a`
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
    `,Fi([ue({attribute:!1})],Ei.prototype,"hass",void 0),Fi([ue({attribute:!1})],Ei.prototype,"selector",void 0),Fi([ue()],Ei.prototype,"value",void 0),Fi([ue()],Ei.prototype,"label",void 0),Fi([ue()],Ei.prototype,"helper",void 0),Fi([ue({type:Boolean,reflect:!0})],Ei.prototype,"disabled",void 0),Fi([ue({type:Boolean})],Ei.prototype,"required",void 0),Fi([ue()],Ei.prototype,"propertyName",void 0),Fi([ue({attribute:!1})],Ei.prototype,"transformData",void 0),Fi([ue({attribute:!1})],Ei.prototype,"labelPosition",void 0),Fi([ue({attribute:!1})],Ei.prototype,"actionButtons",void 0),Ei=Fi([he("ha-row-selector")],Ei);var Ri=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ti=class extends le{constructor(){super(),this.config={},this.consecutiveFailures=0,this.isRetrying=!1,this.clockComponent=document.createElement("ha-clock"),this.sensorComponent=document.createElement("ha-sensors"),this.weatherComponent=document.createElement("ha-weather"),this.backgroundImageComponent=document.createElement("ha-background-image"),this.transportationComponent=document.createElement("ha-transportation"),this.actionBarComponent=document.createElement("ha-action-bar"),_e.info("%c WALL-CLOCK-CARD %c 2.3.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language,this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.clockComponent.size=this.config.size,this.config.customSizes&&(this.clockComponent.clockSize=this.config.customSizes.clockSize,this.clockComponent.dateSize=this.config.customSizes.dateSize),this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.sensorComponent.size=this.config.size,this.config.customSizes&&(this.sensorComponent.labelSize=this.config.customSizes.labelSize,this.sensorComponent.valueSize=this.config.customSizes.valueSize),this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language,this.weatherComponent.size=this.config.size,this.config.customSizes&&(this.weatherComponent.labelSize=this.config.customSizes.labelSize,this.weatherComponent.valueSize=this.config.customSizes.valueSize),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.fontColor=this.config.fontColor;const e=this.config.actionBar?{...this.config.actionBar,enabled:!0===this.config.enableActionBar}:{actions:[],enabled:!0===this.config.enableActionBar};this.config={...this.config,actionBar:e},this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.actionBarComponent.size=this.config.size,this.config.customSizes&&(this.actionBarComponent.iconSize=this.config.customSizes.actionBarIconSize),this.bottomBarManager=new $t(this),this.bottomBarManager.registerComponent(this.transportationComponent),this.bottomBarManager.registerComponent(this.actionBarComponent)}connectedCallback(){super.connectedCallback(),this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.clockComponent.size=this.config.size,this.config.customSizes&&(this.clockComponent.clockSize=this.config.customSizes.clockSize,this.clockComponent.dateSize=this.config.customSizes.dateSize),this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.sensorComponent.size=this.config.size,this.config.customSizes&&(this.sensorComponent.labelSize=this.config.customSizes.labelSize,this.sensorComponent.valueSize=this.config.customSizes.valueSize),this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.weatherComponent.size=this.config.size,this.config.customSizes&&(this.weatherComponent.labelSize=this.config.customSizes.labelSize,this.weatherComponent.valueSize=this.config.customSizes.valueSize),this.hass&&(this.transportationComponent.hass=this.hass),this.config.actionBar||(this.config.actionBar={actions:[]}),this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.actionBarComponent.size=this.config.size,this.config.customSizes&&(this.actionBarComponent.iconSize=this.config.customSizes.actionBarIconSize),this.hass&&(this.actionBarComponent.hass=this.hass),this.initConnectCallbackAsync()}async initConnectCallbackAsync(){await this.weatherComponent.controller.ready,await this.backgroundImageComponent.controller.ready,await this.clockComponent.controller.ready,await this.sensorComponent.controller.ready,await this.transportationComponent.controller.ready,await this.actionBarComponent.controller.ready,this.transportationComponent.fontColor=this.config.fontColor,this.transportationComponent.transportation=this.config.transportation,ye({level:$e(this.config.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1});try{await async function(){_e.debug("Loading all translations");const e=Be().map(e=>async function(e){try{Ue[e]?(Me[e]=Ue[e],_e.debug(`Loaded translations for ${e}`)):_e.warn(`No embedded translations found for ${e}`)}catch(t){_e.error(`Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),_e.debug("Loaded translations for all languages")}catch(e){_e.error("Error loading translations:",e)}this.config.showWeather||We.getInstance().publish(new Ve(xe.All))}initBackgroundImageComponent(){var e,t,i,o,n;const s={imageSourceId:this.config.imageSource||"picsum",backgroundImages:this.config.backgroundImages,entity:null===(e=this.config.imageConfig)||void 0===e?void 0:e.entity,apiKey:null===(t=this.config.imageConfig)||void 0===t?void 0:t.apiKey,contentFilter:null===(i=this.config.imageConfig)||void 0===i?void 0:i.contentFilter,category:null===(o=this.config.imageConfig)||void 0===o?void 0:o.category,count:null===(n=this.config.imageConfig)||void 0===n?void 0:n.count};this.backgroundImageComponent.backgroundOpacity=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5,this.backgroundImageComponent.config={imageSourceConfig:s,backgroundRotationInterval:this.config.backgroundRotationInterval},_e.debug("Background image component initialized")}disconnectedCallback(){super.disconnectedCallback()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.initAfterSetConfigAsync(e)}async initAfterSetConfigAsync(e){const t=e.imageSource||"none";let i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(i={...i,...e.timeFormat},void 0!==e.timeFormat.hour12&&(i.hour12=Boolean(e.timeFormat.hour12)),void 0===e.timeFormat.second&&(i.second=void 0));let o={weekday:"long",year:"numeric",month:"long",day:"numeric"};e.dateFormat&&(o={...o,...e.dateFormat},void 0===e.dateFormat.year&&(o.year=void 0));let n=e.timeZone;!n&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(n=this.hass.config.time_zone),this.config={...e,timeFormat:i,dateFormat:o,backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:t,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",timeZone:n,size:e.size||Qe.Medium,customSizes:e.customSizes||{}},this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.clockComponent.size=this.config.size,this.config.customSizes&&(this.clockComponent.clockSize=this.config.customSizes.clockSize,this.clockComponent.dateSize=this.config.customSizes.dateSize),this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.sensorComponent.size=this.config.size,this.config.customSizes&&(this.sensorComponent.labelSize=this.config.customSizes.labelSize,this.sensorComponent.valueSize=this.config.customSizes.valueSize),this.hass&&(this.sensorComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language||(this.hass?this.hass.language:null)||"en",this.weatherComponent.size=this.config.size,this.config.customSizes&&(this.weatherComponent.labelSize=this.config.customSizes.labelSize,this.weatherComponent.valueSize=this.config.customSizes.valueSize),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.fontColor=this.config.fontColor,this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.actionBarComponent.size=this.config.size,this.config.customSizes&&(this.actionBarComponent.iconSize=this.config.customSizes.actionBarIconSize),this.config.showWeather||this.backgroundImageComponent.controller.ready.then(()=>{We.getInstance().publish(new Ve(xe.All))})}updated(e){if(e.has("hass")&&this.hass&&(this.sensorComponent.hass=this.hass,this.transportationComponent.hass=this.hass,this.actionBarComponent.hass=this.hass),e.has("config")&&this.config){const e=this.config.logLevel||"info",t=$e(e);_e.debug(`Updating log level to ${e} (${pe[t]})`),ye({level:t,prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}}static get styles(){return a`
            /* Include ClockComponent styles */
            ${s(ot.styles)}
            /* Include SensorComponent styles */
            ${s(at.styles)}
            /* Include BackgroundImageComponent styles */
            ${s(ct.styles)}
            /* Include WeatherComponent styles */
            ${s(mt.styles)}
            /* Include TransportationComponent styles */
            ${s(Ct.styles)}
            /* Include ActionBarComponent styles */
            ${s(Ot.styles)}
            /* Include BottomBarManager styles */
            ${s($t.styles)}
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

        `}render(){let e="";return null!==this.bottomBarManager.currentComponent&&(e="margin-top: -140px;"),W`
            <ha-card style="color: rgb( ${this.config.fontColor});">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather?W`<div style="position: absolute; top: 16px; right: 16px; max-width: 40%; max-height: 60%; z-index: 3; padding-left: 8px;">
                            ${this.weatherComponent}
                        </div>`:""}
                <div style="${e}">
                    ${this.clockComponent}
                </div>
                ${this.bottomBarManager.render()}
            </ha-card>
        `}};Ri([ue({type:Object})],Ti.prototype,"hass",void 0),Ri([ue({type:Object})],Ti.prototype,"config",void 0),Ri([ue({type:Number})],Ti.prototype,"consecutiveFailures",void 0),Ri([ue({type:Boolean})],Ti.prototype,"isRetrying",void 0),Ti=Ri([he("wall-clock-card")],Ti),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
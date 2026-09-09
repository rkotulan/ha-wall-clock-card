/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;class a{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const o=this.t;if(t&&void 0===e){const t=void 0!==o&&1===o.length;t&&(e=i.get(o)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(o,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new a(i,e,o)},r=(o,i)=>{if(t)o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of i){const i=document.createElement("style"),a=e.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=t.cssText,o.appendChild(i)}},s=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,m=g.trustedTypes,v=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},w=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);a?.call(this,t),this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(void 0!==i&&!0===o.reflect){const a=(void 0!==o.converter?.toAttribute?o.converter:b).toAttribute(t,o.type);this._$Em=e,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){const o=this.constructor,i=o._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=o.getPropertyOptions(i),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const n=a.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,o){if(void 0!==e){const i=this.constructor,a=this[e];if(o??=i.getPropertyOptions(e),!((o.hasChanged??w)(a,t)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:a},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,f?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.1");const $=globalThis,k=$.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+C,E=`<${I}>`,A=document,D=()=>A.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,O=e=>T(e)||"function"==typeof e?.[Symbol.iterator],N="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,R=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,W=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),U=W(1),V=W(2),Z=(W(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),K=new WeakMap,G=A.createTreeWalker(A,129);function J(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Y=(e,t)=>{const o=e.length-1,i=[];let a,n=2===t?"<svg>":3===t?"<math>":"",r=F;for(let t=0;t<o;t++){const o=e[t];let s,l,c=-1,d=0;for(;d<o.length&&(r.lastIndex=d,l=r.exec(o),null!==l);)d=r.lastIndex,r===F?"!--"===l[1]?r=M:void 0!==l[1]?r=R:void 0!==l[2]?(B.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=j):void 0!==l[3]&&(r=j):r===j?">"===l[0]?(r=a??F,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?j:'"'===l[3]?H:L):r===H||r===L?r=j:r===M||r===R?r=F:(r=j,a=void 0);const h=r===j&&e[t+1].startsWith("/>")?" ":"";n+=r===F?o+E:c>=0?(i.push(s),o.slice(0,c)+z+o.slice(c)+C+h):o+C+(-2===c?t:h)}return[J(e,n+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let a=0,n=0;const r=e.length-1,s=this.parts,[l,c]=Y(e,t);if(this.el=X.createElement(l,o),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=G.nextNode())&&s.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(z)){const t=c[n++],o=i.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);s.push({type:1,index:a,name:r[2],strings:o,ctor:"."===r[1]?ie:"?"===r[1]?ae:"@"===r[1]?ne:oe}),i.removeAttribute(e)}else e.startsWith(C)&&(s.push({type:6,index:a}),i.removeAttribute(e));if(B.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=k?k.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],D()),G.nextNode(),s.push({type:2,index:++a});i.append(e[t],D())}}}else if(8===i.nodeType)if(i.data===I)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)s.push({type:7,index:a}),e+=C.length-1}a++}}static createElement(e,t){const o=A.createElement("template");return o.innerHTML=e,o}}function Q(e,t,o=e,i){if(t===Z)return t;let a=void 0!==i?o._$Co?.[i]:o._$Cl;const n=P(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,o,i)),void 0!==i?(o._$Co??=[])[i]=a:o._$Cl=a),void 0!==a&&(t=Q(e,a._$AS(e,t.values),a,i)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=(e?.creationScope??A).importNode(t,!0);G.currentNode=i;let a=G.nextNode(),n=0,r=0,s=o[0];for(;void 0!==s;){if(n===s.index){let t;2===s.type?t=new te(a,a.nextSibling,this,e):1===s.type?t=new s.ctor(a,s.name,s.strings,this,e):6===s.type&&(t=new re(a,this,e)),this._$AV.push(t),s=o[++r]}n!==s?.index&&(a=G.nextNode(),n++)}return G.currentNode=A,i}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),P(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==Z&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):O(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=X.createElement(J(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new ee(i,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new X(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const a of e)i===t.length?t.push(o=new te(this.O(D()),this.O(D()),this,this.options)):o=t[i],o._$AI(a),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,a){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(e,t=this,o,i){const a=this.strings;let n=!1;if(void 0===a)e=Q(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==Z,n&&(this._$AH=e);else{const i=e;let r,s;for(e=a[0],r=0;r<a.length-1;r++)s=Q(this,i[o+r],t,r),s===Z&&(s=this._$AH[r]),n||=!P(s)||s!==this._$AH[r],s===q?e=q:e!==q&&(e+=(s??"")+a[r+1]),this._$AH[r]=s}n&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ae extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ne extends oe{constructor(e,t,o,i,a){super(e,t,o,i,a),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??q)===Z)return;const o=this._$AH,i=e===q&&o!==q||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==q&&(o===q||i);i&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const se={M:z,P:C,A:I,C:1,L:Y,R:ee,D:O,V:Q,I:te,H:oe,N:ae,U:ne,B:ie,F:re},le=$.litHtmlPolyfillSupport;le?.(X,te),($.litHtmlVersions??=[]).push("3.3.1");const ce=globalThis;class de extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const i=o?.renderBefore??t;let a=i._$litPart$;if(void 0===a){const e=o?.renderBefore??null;i._$litPart$=a=new te(t.insertBefore(D(),e),e,void 0,o??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}de._$litElement$=!0,de.finalized=!0,ce.litElementHydrateSupport?.({LitElement:de});const he=ce.litElementPolyfillSupport;he?.({LitElement:de}),(ce.litElementVersions??=[]).push("4.2.1");const ue=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},ge=(e=pe,t,o)=>{const{kind:i,metadata:a}=o;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(o.name,e),"accessor"===i){const{name:i}=o;return{set(o){const a=t.get.call(this);t.set.call(this,o),this.requestUpdate(i,a,e)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=o;return function(o){const a=this[i];t.call(this,o),this.requestUpdate(i,a,e)}}throw Error("Unsupported decorator location: "+i)};function me(e){return(t,o)=>"object"==typeof o?ge(e,t,o):((e,t,o)=>{const i=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),i?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function ve(e){return me({...e,state:!0,attribute:!1})}const fe=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,o),o);function ye(e,t){return(o,i,a)=>{const n=t=>t.renderRoot?.querySelector(e)??null;if(t){const{get:e,set:t}="object"==typeof i?o:a??(()=>{const e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return fe(o,i,{get(){let o=e.call(this);return void 0===o&&(o=n(this),(null!==o||this.hasUpdated)&&t.call(this,o)),o}})}return fe(o,i,{get(){return n(this)}})}}var be;!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR",e[e.NONE=4]="NONE"}(be||(be={}));const we={level:be.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let _e={...we};const xe=[];function $e(e,t,o,...i){var a;if(e<_e.level)return;const n=function(e,t,o){const{prefix:i,enableTimestamps:a,enableSourceTracking:n}=_e;let r="";return a&&(r+=`[${(new Date).toISOString()}] `),r+=`[${be[e]}] `,i&&(r+=`[${i}] `),t&&n&&(r+=`[${t}] `),r+=o,r}(e,t,o);if(_e.logToConsole)switch(e){case be.DEBUG:console.debug(n,...i);break;case be.INFO:console.log(n,...i);break;case be.WARN:console.warn(n,...i);break;case be.ERROR:console.error(n,...i)}if(_e.logToStorage){let e=n;if(i.length>0)try{e+=" "+i.map(e=>"object"==typeof e?JSON.stringify(e):String(e)).join(" ")}catch(t){e+=" [Arguments could not be stringified]"}xe.push(e);const t=null!==(a=_e.maxStoredLogs)&&void 0!==a?a:100;xe.length>t&&xe.splice(0,xe.length-t)}}function ke(e){return{debug:(t,...o)=>$e(be.DEBUG,e,t,...o),info:(t,...o)=>$e(be.INFO,e,t,...o),warn:(t,...o)=>$e(be.WARN,e,t,...o),error:(t,...o)=>$e(be.ERROR,e,t,...o),withSource:e=>ke(e)}}function Se(e){switch(e.toLowerCase()){case"debug":return be.DEBUG;case"info":return be.INFO;case"warn":default:return be.WARN;case"error":return be.ERROR;case"none":return be.NONE}}const ze=ke("wall-clock");class Ce{static getInstance(){return Ce.instance||(Ce.instance=new Ce),Ce.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&ze.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}registerAll(e){e.forEach(e=>this.register(e))}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}var Ie,Ee;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(Ie||(Ie={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(Ee||(Ee={}));const Ae=[Ee.All,Ee.ClearSky,Ee.Clouds,Ee.Rain,Ee.Snow,Ee.Mist],De=[Ie.Unspecified,Ie.SunriseSunset,Ie.Day,Ie.Night];function Pe(e,t){if(!e)return;const o=e.toLowerCase();for(const e of t)if(o.includes(e.toLowerCase().replace(" ","-")))return e}class Te{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return ke(`${this.id}-source`)}shuffleArray(e){for(let t=e.length-1;t>0;t--){const o=Math.floor(Math.random()*(t+1));[e[t],e[o]]=[e[o],e[t]]}}async fetchImagesAsync(e,t,o){return this.getLogger().debug(`Fetching images with weather: ${t}, timeOfDay: ${o}`),this.fetchImagesInternalAsync(e,t,o)}async getNextImageUrlAsync(e,t,o){var i;this.getLogger().debug(`GetNextImageUrl called with weather: ${t}, timeOfDay: ${o}`),this.lastWeather===t&&this.lastTimeOfDay===o||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=t,this.lastTimeOfDay=o);const a=`${t}_${o}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(a)||0===(null===(i=this.imageUrlCache.get(a))||void 0===i?void 0:i.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const i=[...await this.fetchImagesAsync(e,t,o)];this.shuffleArray(i),this.imageUrlCache.set(a,i),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${i.length} images for weather: ${t}, timeOfDay: ${o}`)}const n=this.imageUrlCache.get(a)||[];if(0===n.length)return this.getLogger().warn(`No images available for weather: ${t}, timeOfDay: ${o}`),"";const r=n[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%n.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${t}, timeOfDay: ${o}, URL: ${r}`),r}filterImagesByWeatherAndTime(e,t,o){if(this.getLogger().debug(`Current time of day: ${o}`),this.getLogger().debug(`Current weather condition: ${t}`),0===e.length)return[];let i=[];return i=e.filter(e=>(e.weather===t||e.weather===Ee.All||t===Ee.All)&&e.timeOfDay===o),0===i.length&&(i=e.filter(e=>(e.weather===t||e.weather===Ee.All||t===Ee.All)&&e.timeOfDay===Ie.Unspecified)),0===i.length&&(i=e.filter(e=>e.timeOfDay===o)),0===i.length&&(i=e.filter(e=>e.timeOfDay===Ie.Unspecified)),i.length>0?(this.getLogger().debug(`Found ${i.length} images matching current conditions`),i.map(e=>e.url)):(this.getLogger().info("No matching images found, returning all images"),e.map(e=>e.url))}convertUrlsToBackgroundImages(e){return this.getLogger().debug(`Converting ${e.length} URLs to BackgroundImage objects`),e.map(e=>({url:e,weather:Pe(e,Ae)||Ee.All,timeOfDay:Pe(e,De)||Ie.Unspecified}))}}const Oe=new class extends Te{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=ke("local-source")}async fetchImagesInternalAsync(e,t,o){return e.backgroundImages&&e.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${e.backgroundImages.length} images`),this.logger.debug(`First image URL: ${e.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(e.backgroundImages,t,o)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Ne=new class extends Te{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=ke("picsum-source")}async fetchImagesInternalAsync(e,t,o){const i=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${i}`),[i]}getDefaultConfig(){return{}}},Fe=new class extends Te{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=ke("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(e,t,o){const i=e.count||5;let a=e.category||"";const n=e.apiKey||"";return this.logger.debug(`Current weather: ${t}, time of day: ${o}`),this.logger.debug(`Using category with weather and time: ${a}`),n?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(n,a,i,t,o,e)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(e,t,o,i,a,n){const r=[],s=(null==n?void 0:n.contentFilter)||"high";let l="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(l=e[0]),e.length>1&&(l+=` ${e.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${e.join(", ")}`)}const c=i.toLowerCase();l+=` ${c}`,"sunrise-sunset"===a?l+=" sunrise sunset dawn dusk":"day"===a?l+=" daylight midday day":"night"===a&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${a}`);try{let t="https://api.unsplash.com/photos/random?";const i=new URLSearchParams({client_id:e,count:o.toString(),orientation:"landscape",content_filter:s});l&&i.append("query",l);const a=new URLSearchParams(i);a.delete("client_id"),a.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${a.toString()}`),t+=i.toString();const n=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${n}`);const c=await fetch(t);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const d=await c.json();this.logger.debug(`API response received with ${Array.isArray(d)?d.length:0} images`),Array.isArray(d)&&d.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";r.push(t)}),this.logger.debug(`Fetched ${r.length} images from Unsplash API`)}catch(e){throw this.logger.error("Error fetching from Unsplash API:",e),e}return r}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Me=new class extends Te{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=ke("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}setHass(e){this.hass=e}async checkEntityAsync(e){try{if(!this.hass)return void this.logger.warn("Could not get Home Assistant instance");const t=this.hass.states[e];if(!t)return void this.logger.warn(`Entity ${e} not found`);this.updateCacheFromEntity(t),this.entityId=e,this.logger.debug(`Checked entity ${e}`)}catch(e){this.logger.error("Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)&&t.every(e=>"string"==typeof e)?(this.cachedImages=this.convertUrlsToBackgroundImages(t),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${t.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(e,t,o){const i=e.entity;if(!i)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(i);const a=Date.now();if(this.cachedImages.length>0&&a-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t,o);try{if(!this.hass)return this.logger.warn("Could not get Home Assistant instance"),[];const e=this.hass.states[i];return e?(this.updateCacheFromEntity(e),this.filterImagesByWeatherAndTime(this.cachedImages,t,o)):(this.logger.warn(`Sensor ${i} not found`),[])}catch(e){return this.logger.error("Error fetching images from sensor:",e),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}};function Re(e){var t;return[...new Set((null!==(t=e.children)&&void 0!==t?t:[e]).filter(e=>{var t;return!e.can_expand&&(null===(t=e.media_content_type)||void 0===t?void 0:t.startsWith("image/"))}).map(e=>e.media_content_id).filter(e=>e.startsWith("media-source://")))]}class je extends Te{constructor(){super(...arguments),this.id="media-source",this.name="Home Assistant media",this.description="Photos from a Home Assistant media album or folder",this.selection=""}setHass(e){this.hass=e}getDefaultConfig(){return{mediaContentId:""}}async getNextImageUrlAsync(e,t,o){var i;const a=String(null!==(i=e.mediaContentId)&&void 0!==i?i:"");return a!==this.selection&&(this.selection=a,this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1),super.getNextImageUrlAsync(e,t,o)}async fetchImagesInternalAsync(e){var t;const o=String(null!==(t=e.mediaContentId)&&void 0!==t?t:"");if(!o)return[];if(!o.startsWith("media-source://"))throw new Error("Select a Home Assistant media album or folder");if(!this.hass)throw new Error("Home Assistant is not connected");return Re(await this.hass.callWS({type:"media_source/browse_media",media_content_id:o}))}}const Le=new je,He=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=ke("null-source")}async fetchImagesAsync(e,t,o){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(e,t,o){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Be={local:Oe,picsum:Ne,unsplash:Fe,sensor:Me,"media-source":Le};class We{constructor(e){this.imageSource=null,this.sourceConfig={},this.imageSourceId="none",this.logger=ke("background-image-manager"),this.hass=e}setHass(e){var t,o;this.hass=e,null===(o=null===(t=this.imageSource)||void 0===t?void 0:t.setHass)||void 0===o||o.call(t,e)}initialize(e={}){var t,o;const i=e.imageSourceId||"none";if(this.logger.debug(`Initializing with image source ID: ${i}`),"none"===i)return this.imageSource=null,this.imageSourceId="none",this.sourceConfig={},this.logger.debug("Image source is set to none, clearing initialization"),!1;var a;if(this.imageSourceId=i,this.imageSource="media-source"===(a=this.imageSourceId)?new je:Be[a]||He,!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),this.sourceConfig={},!1;null===(o=(t=this.imageSource).setHass)||void 0===o||o.call(t,this.hass);const n=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...n,...e},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(e,t){var o;if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${e}, time of day: ${t}`);let i=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,e,t);if(i&&i.startsWith("media-source://"))try{if(!(null===(o=this.hass)||void 0===o?void 0:o.callWS))return this.logger.warn("Home Assistant instance not available to resolve media-source URL"),"";{const e=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:i});i=(null==e?void 0:e.url)||""}}catch(e){return this.logger.error("Failed to resolve media-source URL",e),""}return i?(this.logger.debug("Resolved background image"),i):(this.logger.warn("No image URL returned from source"),"")}catch(e){return this.logger.error("Error getting next image URL:",e),""}}getImageSourceId(){return this.imageSourceId}}Ce.getInstance().registerAll([Ne,Oe,Fe,Me,Le]);const Ue=[{code:"bg",label:"Bulgarian (Български)",locale:"bg-BG",translations:JSON.parse('{"common":{"title":"Времето","description":"Текущо време и прогноза","settings":"Настройки на времето"},"conditions":{"all":"Всички метеорологични условия","clouds":"Облачно","clear_sky":"Ясно","few_clouds":"Частична облачност","scattered_clouds":"Разкъсана облачност","broken_clouds":"Значителна облачност","overcast_clouds":"Плътна облачност","shower_rain":"Превалявания от дъжд","rain":"Дъжд","thunderstorm":"Гръмотевична буря","snow":"Сняг","light_snow":"Слаб сняг","mist":"Мъгла","light_rain":"Слаб дъжд","moderate_rain":"Умерен дъжд","heavy_intensity_rain":"Силен дъжд","sunny":"Слънчево","clear_night":"Ясна нощ","partlycloudy":"Предимно облачно","cloudy":"Облачно","rainy":"Дъждовно","snowy":"Снежно","fog":"Мъгла","hail":"Градушка","windy":"Ветровито"},"forecast":{"title":"Прогноза","today":"Днес","tomorrow":"Утре","next_days":"Следващите дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"month":{"viewMode":"Zobrazení kalendáře","viewMonth":"Měsíc","viewFourWeeks":"Čtyři týdny od aktuálního týdne","showTitle":"Zobrazit záhlaví kalendáře","showNavigation":"Zobrazit navigaci měsíců","showGridLines":"Zobrazit čáry mřížky","backgroundOpacity":"Neprůhlednost podkladu kalendáře","grayOutPastEvents":"Zešednout proběhlé události","wrapEventTitles":"Zalomit text událostí na dva řádky","previous":"Předchozí měsíc","next":"Další měsíc","today":"Dnes","more":"další","close":"Zavřít","loading":"Načítání kalendáře…","error":"Některé kalendáře se nepodařilo načíst.","firstDayOfWeek":"Začátek týdne","eventsPerDay":"Událostí na den","showAllDay":"Zobrazit celodenní události","cellMinHeight":"Minimální výška dne (px)","calendarDateSize":"Velikost data","eventTitleSize":"Velikost textu událostí","gridColor":"Barva mřížky","eventBackgroundOpacity":"Neprůhlednost pozadí událostí","updateInterval":"Obnovení (sekundy)"},"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","light_snow":"Slabé sněžení","mist":"Mlha","light_rain":"Slabý déšť","moderate_rain":"Mírný déšť","heavy_intensity_rain":"Silný déšť","sunny":"Slunečno","clear_night":"Jasná noc","partlycloudy":"Polojasno","cloudy":"Oblačno","rainy":"Deštivo","snowy":"Sněžení","fog":"Mlha","hail":"Krupobití","windy":"Větrno"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}},"ui":{"add":"Přidat","add_all":"Přidat vše","remove":"Odebrat","expand":"Rozbalit","collapse":"Sbalit","left":"Vlevo","center":"Na střed","right":"Vpravo","auto":"Automaticky (podle zóny)","zone_default":"Podle zóny","horizontal":"Vodorovně","vertical":"Svisle","none":"Žádné","content":"Obsah","appearance":"Vzhled","behavior":"Chování","settings":"Nastavení","saved":"Uloženo","done":"Hotovo","close":"Zavřít"},"designer":{"edit_board":"Upravit board","drag_hint":"Přetáhněte widget za úchyt · kliknutím jej vyberete a nastavíte","designer":"Designer","configure_card":"Nastavit kartu","card_settings":"Nastavení karty","card_settings_unavailable":"Nastavení karty není dostupné.","use_designer_title":"Nastavte kartu v Designeru","use_designer_help":"Zavřete tento dialog. V režimu úprav dashboardu otevřete kartu tlačítkem Nastavit kartu a použijte Nastavení karty nebo vyberte widget.","mode":"Režim editoru","preview":"Náhled","widgets":"Widgety","search":"Hledat…","information":"Informace","time":"Čas","controls":"Ovládání","other":"Ostatní","drag_here":"+ Přetáhněte sem widget","drag_to_move":"Přetáhnout","edit_widget":"Upravit {name}","remove_widget":"Odebrat {name}","singleton":"Widget {name} lze přidat pouze jednou","unsaved":"Neuložené změny","saving":"Ukládám…","save_failed":"Uložení selhalo — klikněte pro opakování","retry_save":"Opakovat uložení","autosave_hint":"Změny se připravují průběžně · uložíte je a dashboard dokončíte tlačítkem Hotovo","autosave_hint_local":"Změny se připravují průběžně · uložíte je a editor zavřete tlačítkem Hotovo"},"zones":{"split_top":"Nahoře","split_center":"Uprostřed","split_bottom":"Dole","top_left":"Vlevo nahoře","top_center":"Uprostřed nahoře","top_right":"Vpravo nahoře","middle_left":"Vlevo","center":"Uprostřed","middle_right":"Vpravo","bottom_left":"Vlevo dole","bottom_center":"Uprostřed dole","bottom_right":"Vpravo dole"},"general":{"title":"Obecné","layout":"Rozložení","appearance":"Vzhled karty","language_diagnostics":"Jazyk a diagnostika","font_color":"Barva písma","font_color_template":"Dynamická šablona je nastavena v editoru YAML","custom_color":"Vlastní barva","font_family":"Rodina písma","font_family_help":"CSS rodina nebo seznam písem; font musí být již načtený","text_shadow":"Stín textu","text_shadow_help":"Hodnota CSS text-shadow, například 0 2px 4px rgba(0, 0, 0, 0.8)","language":"Jazyk","log_level":"Úroveň logování","size":"Velikost","large":"Velká","medium":"Střední","small":"Malá","custom_sizes":"Vlastní velikosti","clock_top_margin":"Horní okraj hodin (např. 0rem)","spacing":"Rozestupy","background":"Pozadí","time_format":"Formát času","date_format":"Formát data"},"runtime":{"loading_weather":"Načítám data počasí…","loading_transportation":"Načítám data dopravy…","no_departures":"Nejsou dostupné žádné odjezdy.","transportation_title":"Odjezdy MHD","wheelchair_accessible":"Bezbariérový spoj"},"inspector":{"widget_settings":"Nastavení widgetu","appearance_layout":"Vzhled a rozložení","no_content":"Tento widget nemá žádné nastavení obsahu.","no_behavior":"Tento widget nemá žádné další nastavení chování.","select_hint":"Vyberte widget nebo zónu, kterou chcete upravit.","layout_designer":"Designer rozložení","zone":"Zóna: {name}","edit_zone":"Upravit zónu {name}","layout_settings":"Nastavení rozložení","add_widget_first":"Před změnou nastavení přidejte do této zóny widget.","color":"Vlastní barva","display_priority":"Priorita zobrazení","priority_help":"V exkluzivní zóně se zobrazí aktivní widget s vyšší hodnotou","zone_alignment":"Zarovnání zóny","zone_alignment_help":"Použije se na všechny widgety v této zóně","zone_default":"Výchozí pro zónu ({alignment})","mode":"Režim","stack":"Skládat (zobrazit všechny widgety)","exclusive":"Exkluzivní (aktivní widget s nejvyšší prioritou)","direction":"Směr","column":"Sloupec","row":"Řádek","horizontal_alignment":"Vodorovné zarovnání","span_panel":"Roztáhnout přes celý dělený panel","span_panel_help":"Použije se, pokud je toto jediná obsazená oblast v panelu.","row_width_ratio":"Poměr šířky v řádku","row_width_ratio_help":"Relativní podíl dostupné šířky řádku; 0 použije doporučený automatický poměr.","width_mode":"Chování šířky v řádku","width_mode_help":"Automatika zvolí vhodné chování podle typu widgetu.","width_mode_fill":"Roztáhnout","width_mode_content":"Podle obsahu","widget_gap":"Vlastní mezera mezi widgety (např. 4px)","zone_padding":"Odsazení zóny (např. 0 16px)","vertical_offset":"Svislý posun zóny (např. -8vh)","vertical_offset_help":"Záporná hodnota posune celou zónu nahoru, kladná dolů.","clock_size":"Velikost hodin (např. 16rem)","date_size":"Velikost data (např. 6rem)","label_size":"Velikost popisku (např. 1.2rem)","value_size":"Velikost hodnoty (např. 2rem)","icon_size":"Velikost ikony (tlačítko je 2× větší, např. 72px)","action_title_size":"Velikost názvu tlačítka (např. 18px)","calendar_date_size":"Velikost bloku data (např. 1rem)","event_title_size":"Velikost názvu události (např. 1rem)","event_detail_size":"Velikost detailu události (např. 0.82rem)","font_size":"Velikost písma (např. 2rem)","font_family":"Vlastní rodina písma","font_family_help":"CSS rodina nebo seznam písem; prázdné použije font karty","text_shadow":"Vlastní stín textu","text_shadow_help":"Hodnota CSS text-shadow; prázdné použije stín karty, none jej vypne","max_width":"Maximální šířka (např. 420px)","max_height":"Maximální výška (např. 50vh)","unsupported_width":"Maximální šířka není podporována — hodnotu odstraňte","unsupported_height":"Maximální výška není podporována — hodnotu odstraňte","margin":"Okraj (CSS zkrácený zápis)"},"layout":{"structure":"Struktura rozložení","format":"Formát rozložení","format_help":"Mění geometrii plochy; widgety si zachovají své zóny a nastavení.","compact_rows":"Kompaktní řádky (původní chování)","compact_rows_help":"Při prázdném prostředním řádku seskupí horní a dolní widgety doprostřed. Vypnutá volba je ponechá u protilehlých okrajů.","format_grid":"Mřížka 3 × 3","format_vertical_2_1":"Svislé 2/3 + 1/3","format_vertical_1_2":"Svislé 1/3 + 2/3","format_horizontal_2_1":"Vodorovné 2/3 + 1/3","format_horizontal_1_2":"Vodorovné 1/3 + 2/3","visual_preset":"Vizuální preset","preset_none":"Bez vizuálního presetu","preset_glass":"Skleněný informační panel","preset_help":"Preset mění pouze vzhled rozložení, nikdy entity, akce ani umístění widgetů."},"spacing":{"preset":"Předvolba rozestupů","compact":"Kompaktní","normal":"Normální","spacious":"Prostorné","custom":"Vlastní","card_padding":"Odsazení karty","card_padding_help":"1–4 hodnoty: nahoře, vpravo, dole, vlevo. Příklad: 60px 60px 60px 16px.","zone_gap":"Mezera mezi zónami","zone_gap_help":"Jedna hodnota, například 24px.","widget_gap":"Mezera mezi widgety","widget_gap_help":"Jedna hodnota, například 16px.","invalid_padding":"Použijte 1–4 CSS délky, například 60px 60px 60px 16px.","invalid_length":"Použijte jednu CSS délku, například 16px.","legacy_hint":"První změna rozestupů převede starší konfiguraci na formát zón."},"widgets":{"calendar_month":"Měsíční přehled","sensors":"Senzory","weather":"Počasí","calendar":"Kalendář","transportation":"Doprava","clock":"Hodiny","date":"Datum","action_bar":"Panel akcí","ha_card":"Karta Home Assistantu","separator":"Oddělovač"},"editor":{"format":{"hour_format":"Formát hodin","hour_display":"Zobrazení hodin","minute_display":"Zobrazení minut","second_display":"Zobrazení sekund","hour_12":"12hodinový","hour_24":"24hodinový","show_am_pm":"Zobrazit AM/PM","show_am_pm_help":"Ponechá 12hodinový formát a pouze skryje nebo zobrazí označení období","am_pm_display":"Zobrazení AM/PM","am_pm_display_help":"Skryje označení období nebo zobrazí a/p či AM/PM","am_pm_hidden":"Skryté","am_pm_narrow":"1 znak (a/p)","am_pm_full":"2 znaky (AM/PM)","colon_blink":"Dvojtečka","colon_blink_help":"Určuje, zda oddělovač zůstane viditelný, nebo bude blikat","colon_static":"Statická","colon_fast":"Rychle (0,5 s zap./vyp.)","colon_slow":"Pomalu (1 s zap./vyp.)","numeric":"Číslo","two_digit":"Dvě číslice","hidden":"Skryté","custom_date":"Vlastní formát data","custom_date_help":"Například yyyy-MM-dd nebo EEEE, MMMM d, yyyy. Vyplněná hodnota přepíše nastavení níže.","weekday_display":"Zobrazení dne v týdnu","month_display":"Zobrazení měsíce","day_display":"Zobrazení dne","year_display":"Zobrazení roku","long_monday":"Dlouhý (pondělí)","short_mon":"Krátký (po)","narrow_m":"Úzký (P)","long_january":"Dlouhý (leden)","short_jan":"Krátký (led)","narrow_j":"Úzký (L)","numeric_1":"Číslo (1)","two_digit_01":"Dvě číslice (01)","numeric_2025":"Číslo (2025)","two_digit_25":"Dvě číslice (25)"},"weather":{"source":"Zdroj počasí","visible_content":"Zobrazované informace","icons":"Ikony počasí","availability":"Dostupnost","refresh":"Aktualizace dat","show":"Zobrazit počasí","show_help":"Zobrazí aktuální počasí a předpověď","title":"Název počasí","show_title":"Zobrazit nadpis předpovědi","show_title_help":"Zobrazí nad widgetem nadpis Počasí nebo Předpověď","provider":"Poskytovatel počasí","provider_none":"Žádný (vypnout počasí)","provider_ha":"Entita Home Assistantu","entity":"Entita počasí","api_key":"API klíč","api_key_help":"API klíč OpenWeatherMap","latitude":"Zeměpisná šířka","longitude":"Zeměpisná délka","units":"Jednotky","metric":"Metrické (°C, m/s)","imperial":"Imperiální (°F, mph)","display_mode":"Režim zobrazení","current":"Pouze aktuální počasí","forecast":"Pouze předpověď","both":"Aktuální počasí a předpověď","icon_set":"Sada ikon počasí","animate_icons":"Animovat ikony","animate_icons_help":"Používá jemný pohyb a respektuje systémové omezení animací.","forecast_type":"Typ předpovědi","forecast_type_help":"Automaticky použije předpověď podporovanou vybranou entitou","forecast_type_auto":"Automaticky","forecast_type_daily":"Denní","forecast_type_hourly":"Hodinová","forecast_type_twice_daily":"Dvakrát denně","forecast_days":"Počet dní předpovědi","days":"Počet dní: {count}","forecast_hours":"Počet hodin předpovědi","hours":"Počet hodin: {count}","update_interval":"Interval aktualizace","update_help":"Interval v minutách (minimum 1)","orientation":"Orientace předpovědi","orientation_help":"Automaticky použije řádek ve středních zónách a sloupec v bočních zónách."},"sensors":{"empty":"Nejsou nastaveny žádné senzory.","sensor":"Senzor {number}","label":"Popisek","entity":"Entita","icon":"Ikona","icon_help":"Prázdná hodnota použije ikonu entity z Home Assistantu.","add":"Přidat senzor","remove":"Odebrat senzor","expand":"Rozbalit senzor","collapse":"Sbalit senzor","orientation":"Orientace položek","orientation_help":"Automaticky použije řádek ve středních zónách a sloupec v bočních zónách.","alignment":"Zarovnání položek","alignment_help":"Použije zarovnání zóny, nebo jej nastavte jen pro tento widget.","item_gap":"Mezera mezi senzory","item_gap_help":"CSS délka mezi senzory (výchozí: 16px)","show_icons":"Zobrazit ikony senzorů","show_icons_help":"Zobrazí nebo skryje ikonu vedle každého senzoru.","icon_size":"Velikost ikony senzoru","icon_size_help":"CSS délka (výchozí je responsivní velikost, maximálně 36px).","show_separator":"Zobrazit separátor senzorů","show_separator_help":"Zobrazí nebo skryje čáru mezi senzory ve vodorovném režimu.","separator_color":"Barva separátoru","separator_color_help":"Prázdná hodnota použije barvu textu widgetu.","separator_opacity":"Průhlednost separátoru","separator_opacity_help":"Nastaví průhlednost separátoru.","default_color":"Výchozí barva","default_color_help":"Použije se, pokud nevyhoví žádné podmíněné pravidlo; prázdná hodnota převezme barvu widgetu.","color_rules":"Podmíněné barvy","add_color_rule":"Přidat pravidlo","remove_color_rule":"Odebrat pravidlo","operator":"Podmínka","threshold":"Hodnota","rule_color":"Barva","operator_less_than":"Menší než (<)","operator_less_or_equal":"Menší nebo rovno (≤)","operator_greater_than":"Větší než (>)","operator_greater_or_equal":"Větší nebo rovno (≥)","operator_equal":"Rovno (=)","operator_not_equal":"Není rovno (≠)","move_rule_up":"Posunout pravidlo nahoru","move_rule_down":"Posunout pravidlo dolů"},"transportation":{"source":"Zdroj dat","appearance":"Zobrazení odjezdů","behavior":"Aktualizace a automatické skrytí","provider":"Poskytovatel dopravy","max_departures":"Maximum odjezdů na zastávku","departures":"Počet odjezdů: {count}","display_mode":"Zobrazení odjezdů","display_inline":"V ploše karty","display_modal":"V modálním okně","display_mode_help":"Určuje, kde se odjezdy otevřou po stisknutí akce Doprava","auto_hide":"Automaticky skrýt po","auto_hide_help":"Čas v minutách (1–10)","update_interval":"Interval aktualizace","update_help":"Interval v minutách (minimum 1)","stops":"Zastávky","stop":"Zastávka {number}","stop_id":"ID zastávky","post_id":"ID stanoviště","stop_name":"Název zastávky (volitelné)","add_stop":"Přidat zastávku","remove_stop":"Odebrat zastávku","expand_stop":"Rozbalit zastávku","collapse_stop":"Sbalit zastávku","documentation":"Dokumentace nastavení dopravy","refresh_buttons":"Entity tlačítek aktualizace","refresh_button":"Entita tlačítka aktualizace","refresh_button_help":"Při otevření odjezdů se aktivuje tato zastávka","departure_entities":"Entity senzorů odjezdů","departure_entities_help":"Vyberte senzory v pořadí zobrazení"},"actions":{"enable":"Povolit panel akcí","description":"Nastavte tlačítka akcí zobrazená v tomto widgetu.","orientation":"Orientace tlačítek","orientation_help":"Automaticky použije řádek ve středních zónách a sloupec v bočních zónách.","alignment":"Zarovnání tlačítek","alignment_help":"Zarovná tlačítka vlevo, na střed nebo vpravo","opacity":"Průhlednost podkladu","opacity_help":"Nastaví průhlednost podkladu panelu akcí","button_background":"Kruhové pozadí tlačítek","button_background_help":"Zobrazí nebo skryje průhledný kruh za každou akcí","columns":"Počet sloupců mřížky","columns_help":"0 automaticky použije 2 sloupce ve vodorovné zóně; jiná hodnota nastaví počet sloupců napevno.","button_gap":"Mezera mezi tlačítky","button_gap_help":"CSS délka mezi tlačítky (výchozí: 16px)","panel_padding":"Vnitřní odsazení panelu","panel_padding_help":"CSS odsazení uvnitř panelu akcí (výchozí: 16px)","title":"Akce","empty":"Nejsou nastaveny žádné akce.","action":"Akce {number}","type":"Typ akce","select_type":"Vyberte typ akce","button_title":"Název","title_help":"Název tlačítka akce","icon":"Ikona","icon_help":"Ikona tlačítka akce","add":"Přidat akci","remove":"Odebrat akci","expand":"Rozbalit akci","collapse":"Sbalit akci","move_up":"Posunout akci nahoru","move_down":"Posunout akci dolů","appearance":"Vzhled podle stavu entity","default_color":"Výchozí barva ikony","state_entity":"Sledovaná entita","state_entity_help":"Mění pouze vzhled. Akce klepnutí, podržení a dvojitého klepnutí zůstávají stejné.","state_rules_help":"Použije se první odpovídající stav. Ostatní stavy zachovají běžný vzhled tlačítka. Podle potřeby přidejte pravidla pro unknown a unavailable.","rule_state":"Stav (například open nebo closed)","rule_color":"Barva ikony","add_rule":"Přidat pravidlo stavu","remove_rule":"Odstranit pravidlo","types":{"weather_update":"Aktualizovat počasí","transportation":"Doprava","light_toggle":"Přepnout světlo","action_navigate":"Přejít na stránku","background_next":"Další pozadí","action_ha":"Akce Home Assistantu","call_service":"Zavolat službu","switch_toggle":"Přepnout přepínač","action_more_info":"Detail entity"}},"action_plugin":{"entity":"Entita","entity_more_info_help":"Entita použitá pro detail a přepnutí","tap_action":"Akce při klepnutí","tap_help":"Standardní akce Home Assistantu spuštěná klepnutím","hold_action":"Akce při podržení","hold_help":"Standardní akce Home Assistantu spuštěná podržením","double_action":"Akce při dvojitém klepnutí","double_help":"Standardní akce Home Assistantu spuštěná dvojitým klepnutím","active_color":"Aktivní barva","active_color_help":"Barva použitá, když je akce aktivní","light_entity":"Entita světla","light_help":"Vyberte světlo, které se má přepínat","switch_entity":"Entita přepínače","switch_help":"Vyberte přepínač, který se má ovládat","icon_on":"Ikona zapnutého stavu","light_icon_help":"Ikona zobrazená při zapnutém světle","switch_icon_help":"Ikona zobrazená při zapnutém přepínači","light_color_help":"Barva při zapnutém světle","switch_color_help":"Barva při zapnutém přepínači","more_info_help":"Vyberte entitu, jejíž detail se má zobrazit","navigation_path":"Cesta navigace","navigation_help":"Cesta nebo URL, která se má otevřít","open_in":"Otevřít v","current_tab":"Aktuální kartě","new_tab":"Nové kartě","service":"Služba","service_help":"Volaná služba včetně dat a cíle","confirmation":"Vyžadovat potvrzení","confirmation_help":"Před voláním služby zobrazí potvrzovací dialog","confirmation_text":"Text potvrzení","confirmation_text_help":"Vlastní text potvrzovacího dialogu","weather_update_help":"Tato akce okamžitě aktualizuje počasí. Není potřeba žádné další nastavení."},"background":{"source_group":"Zdroj obrázků","appearance":"Vzhled obrázku","rotation_group":"Střídání obrázků","transparent":"Průhledné pozadí karty","transparent_help":"Odstraní podklad, rámeček a stín karty. Pro zobrazení tapety dashboardu vyberte zdroj bez obrázku.","source":"Zdroj obrázků","opacity":"Průhlednost pozadí","blur":"Rozmazání pozadí (px)","grayscale":"Odstíny šedi pozadí","rotation":"Interval změny (sekundy)","fit":"Přizpůsobení obrázku pozadí","images":"Obrázky pozadí","image":"Obrázek pozadí {number}","url":"URL obrázku","weather":"Podmínka počasí","weather_any":"Libovolné počasí","time":"Část dne","time_any":"Libovolná denní doba","add":"Přidat obrázek pozadí","remove":"Odebrat obrázek pozadí","expand":"Rozbalit obrázek pozadí","collapse":"Sbalit obrázek pozadí","source_none":"Žádné obrázky pozadí","source_picsum":"Fotografie Picsum","source_local":"Místní obrázky","source_media":"Média Home Assistantu","media_help":"Vyberte album nebo složku. Použijí se pouze fotografie přímo v ní, podsložky a videa se přeskočí. Immich nejprve připojte v integracích Home Assistantu.","media_selected":"Vybráno","media_root":"Všechna média","media_back":"Zpět","media_loading":"Načítání médií…","media_error":"Média se nepodařilo načíst. Zkontrolujte integraci a její oprávnění.","media_retry":"Zkusit znovu","media_photo_count":"Počet fotografií ve složce","media_use":"Použít toto album / složku","source_sensor":"Obrázky ze senzoru","fit_fill":"Vyplnit","fit_contain":"Přizpůsobit celé","fit_cover":"Pokrýt","fit_scale_down":"Zmenšit","local_help":"Nastavte URL místních obrázků a jejich podmínky počasí a denní doby.","unsplash_help":"Nastavte zdroj Unsplash. Je vyžadován API klíč.","category":"Kategorie","photo_count":"Počet fotografií","api_help":"Bez platného API klíče nebude zdroj Unsplash fungovat.","api_key":"API klíč","content_filter":"Filtr obsahu","sensor_entity":"Entita senzoru","sensor_help":"Vyberte senzor, jehož atribut files obsahuje pole URL obrázků.","sensor_files_help":"Senzor musí poskytovat atribut files s URL obrázků."},"calendar":{"calendars":"Kalendáře","calendar":"Kalendář {number}","entity":"Entita kalendáře","empty":"Přidejte jednu nebo více entit kalendáře Home Assistantu.","label":"Popisek (volitelné)","event_color":"Barva událostí","add":"Přidat kalendář","add_all":"Přidat vše","remove":"Odebrat kalendář","expand":"Rozbalit kalendář","collapse":"Sbalit kalendář","display":"Zobrazení","range":"Rozsah událostí","details":"Obsah událostí","display_mode":"Režim zobrazení","agenda":"Agenda","today_only":"Pouze dnes","days_ahead":"Počet dní dopředu","maximum_events":"Maximální počet událostí","show_all_day":"Zobrazit celodenní události","show_location":"Zobrazit místo","show_description":"Zobrazit popis","hide_past":"Skrýt dnešní uplynulé události","hide_empty":"Skrýt bez událostí","update_interval":"Interval aktualizace","update_help":"Minuty (minimum 1)","filtering":"Filtrování a viditelnost","refresh":"Aktualizace dat","event_background":"Podklad událostí","event_appearance":"Vzhled událostí","event_background_color":"Barva podkladu událostí","event_background_opacity":"Průhlednost podkladu událostí","all_day":"Celý den","loading":"Načítám kalendář…","no_events":"Žádné nadcházející události.","when":"Termín","calendar_name":"Kalendář","location":"Místo","description":"Popis","event":"Událost kalendáře"},"separator":{"orientation":"Orientace","orientation_help":"Automaticky se řídí směrem hostitelské zóny.","color":"Barva oddělovače","opacity":"Průhlednost","thickness":"Tloušťka","thickness_help":"CSS délka, například 1px nebo 0.15rem.","length":"Délka","length_help":"CSS délka nebo procenta, například 100% nebo 240px."},"ha_card":{"description":"Vloží vestavěnou nebo nainstalovanou vlastní kartu dashboardu Home Assistantu.","card_type":"Typ karty","card_type_help":"Vyberte kartu nebo zadejte její typ, například custom:mushroom-template-card.","choose_card":"Vybrat kartu","change_card":"Vybrat jinou kartu","edit_card":"Upravit kartu v editoru Home Assistantu","dialog_title":"Nastavení vložené karty","transparent":"Průhledné pozadí karty","transparent_help":"Odstraní standardní podklad HA, pokud vložená karta podporuje proměnné motivu.","empty":"Vyberte kartu Home Assistantu v editoru widgetu.","loading":"Načítám kartu Home Assistantu…","recursion_error":"Kartu wall-clock-card nelze vložit samu do sebe.","helpers_error":"Pomocné funkce karet Home Assistantu nejsou dostupné.","native_editor_unavailable":"Nativní editor karet Home Assistantu není v tomto zobrazení dostupný. Úplnou konfiguraci karty upravte níže.","json_config":"Konfigurace karty (JSON)","json_error":"Konfigurace karty není platný JSON.","json_type_error":"Konfigurace karty musí obsahovat typ."}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","light_snow":"Let sne","mist":"Tåge","light_rain":"Let regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn","sunny":"Solrigt","clear_night":"Klar nat","partlycloudy":"Delvist skyet","cloudy":"Overskyet","rainy":"Regnfuldt","snowy":"Snevejr","fog":"Tåge","hail":"Hagl","windy":"Blæsende"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","light_snow":"Leichter Schneefall","mist":"Nebel","light_rain":"Leichter Regen","moderate_rain":"Mäßiger Regen","heavy_intensity_rain":"Starker Regen","sunny":"Sonnig","clear_night":"Klare Nacht","partlycloudy":"Teilweise bewölkt","cloudy":"Bewölkt","rainy":"Regnerisch","snowy":"Verschneit","fog":"Nebel","hail":"Hagel","windy":"Windig"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","light_snow":"Ελαφριά χιονόπτωση","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή","moderate_rain":"Μέτρια βροχή","heavy_intensity_rain":"Έντονη βροχή","sunny":"Ηλιοφάνεια","clear_night":"Αίθριος νυχτερινός ουρανός","partlycloudy":"Μερικώς συννεφιασμένος","cloudy":"Συννεφιά","rainy":"Βροχερός","snowy":"Χιονισμένος","fog":"Ομίχλη","hail":"Χαλάζι","windy":"Ανεμώδης"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"month":{"viewMode":"Calendar view","viewMonth":"Month","viewFourWeeks":"Four weeks from the current week","showTitle":"Show calendar heading","showNavigation":"Show month navigation","showGridLines":"Show grid lines","backgroundOpacity":"Calendar background opacity","grayOutPastEvents":"Gray out past events","wrapEventTitles":"Wrap event text to two lines","previous":"Previous month","next":"Next month","today":"Today","more":"more","close":"Close","loading":"Loading calendar…","error":"Some calendars could not be loaded.","firstDayOfWeek":"First day of week","eventsPerDay":"Events per day","showAllDay":"Show all-day events","cellMinHeight":"Minimum day height (px)","calendarDateSize":"Date text size","eventTitleSize":"Event text size","gridColor":"Grid color","eventBackgroundOpacity":"Event background opacity","updateInterval":"Refresh interval (seconds)"},"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","light_snow":"Light snow","mist":"Mist","light_rain":"Light rain","moderate_rain":"Moderate rain","heavy_intensity_rain":"Heavy rain","sunny":"Sunny","clear_night":"Clear night","partlycloudy":"Partly cloudy","cloudy":"Cloudy","rainy":"Rainy","snowy":"Snowy","fog":"Fog","hail":"Hail","windy":"Windy"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}},"ui":{"add":"Add","add_all":"Add all","remove":"Remove","expand":"Expand","collapse":"Collapse","left":"Left","center":"Center","right":"Right","auto":"Auto (by zone)","zone_default":"Zone default","horizontal":"Horizontal","vertical":"Vertical","none":"None","content":"Content","appearance":"Appearance","behavior":"Behavior","settings":"Settings","saved":"Saved","done":"Done","close":"Close"},"designer":{"edit_board":"Edit board","drag_hint":"Drag a widget by its handle · click it to select and configure it","designer":"Designer","configure_card":"Configure card","card_settings":"Card settings","card_settings_unavailable":"Card settings are not available.","use_designer_title":"Configure this card in Designer","use_designer_help":"Close this dialog. In dashboard edit mode, open the card with Configure card and use Card settings or select a widget.","mode":"Editor mode","preview":"Preview","widgets":"Widgets","search":"Search…","information":"Information","time":"Time","controls":"Controls","other":"Other","drag_here":"+ Drag a widget here","drag_to_move":"Drag to move","edit_widget":"Edit {name}","remove_widget":"Remove {name}","singleton":"{name} can only be added once","unsaved":"Unsaved changes","saving":"Saving…","save_failed":"Save failed — click to retry","retry_save":"Retry save","autosave_hint":"Changes are prepared continuously · save and finish the dashboard with Done","autosave_hint_local":"Changes are prepared continuously · save and close this editor with Done"},"zones":{"split_top":"Top","split_center":"Center","split_bottom":"Bottom","top_left":"Top left","top_center":"Top center","top_right":"Top right","middle_left":"Left","center":"Center","middle_right":"Right","bottom_left":"Bottom left","bottom_center":"Bottom center","bottom_right":"Bottom right"},"general":{"title":"General","layout":"Layout","appearance":"Card appearance","language_diagnostics":"Language and diagnostics","font_color":"Font color","font_color_template":"Dynamic template configured in the YAML code editor","custom_color":"Custom color","font_family":"Font family","font_family_help":"CSS font family or stack; the font must already be loaded","text_shadow":"Text shadow","text_shadow_help":"CSS text-shadow value, for example 0 2px 4px rgba(0, 0, 0, 0.8)","language":"Language","log_level":"Log level","size":"Size","large":"Large","medium":"Medium","small":"Small","custom_sizes":"Custom sizes","clock_top_margin":"Clock top margin (e.g., 0rem)","spacing":"Spacing","background":"Background","time_format":"Time format","date_format":"Date format"},"runtime":{"loading_weather":"Loading weather data…","loading_transportation":"Loading transportation data…","no_departures":"No departures available.","transportation_title":"Transit departures","wheelchair_accessible":"Wheelchair accessible"},"inspector":{"widget_settings":"Widget settings","appearance_layout":"Appearance and layout","no_content":"This widget has no content settings.","no_behavior":"This widget has no additional behavior settings.","select_hint":"Select a widget or zone to configure it.","layout_designer":"Layout designer","zone":"Zone: {name}","edit_zone":"Edit zone {name}","layout_settings":"Layout settings","add_widget_first":"Add a widget to this zone before changing its settings.","color":"Color override","display_priority":"Display priority","priority_help":"Higher active value wins in this exclusive zone","zone_alignment":"Zone alignment","zone_alignment_help":"Applies to every widget in this zone","zone_default":"Zone default ({alignment})","mode":"Mode","stack":"Stack (show all widgets)","exclusive":"Exclusive (highest-priority active widget)","direction":"Direction","column":"Column","row":"Row","horizontal_alignment":"Horizontal alignment","span_panel":"Fill the complete split panel","span_panel_help":"Available when this is the only occupied area in its panel.","row_width_ratio":"Row width ratio","row_width_ratio_help":"Relative share of available row width; 0 uses the recommended automatic ratio.","width_mode":"Row width behavior","width_mode_help":"Automatic chooses a suitable behavior for the widget type.","width_mode_fill":"Fill available space","width_mode_content":"Fit to content","widget_gap":"Widget gap override (e.g., 4px)","zone_padding":"Zone padding (e.g., 0 16px)","vertical_offset":"Vertical offset (e.g., -8vh)","vertical_offset_help":"Negative values move the complete zone up; positive values move it down.","clock_size":"Clock size (e.g., 16rem)","date_size":"Date size (e.g., 6rem)","label_size":"Label size (e.g., 1.2rem)","value_size":"Value size (e.g., 2rem)","icon_size":"Icon size (button is 2×, e.g., 72px)","action_title_size":"Button title size (e.g., 18px)","calendar_date_size":"Date block size (e.g., 1rem)","event_title_size":"Event title size (e.g., 1rem)","event_detail_size":"Event detail size (e.g., 0.82rem)","font_size":"Font size (e.g., 2rem)","font_family":"Font family override","font_family_help":"CSS font family or stack; empty uses the card font","text_shadow":"Text shadow override","text_shadow_help":"CSS text-shadow value; empty uses the card shadow, none disables it","max_width":"Maximum width (e.g., 420px)","max_height":"Maximum height (e.g., 50vh)","unsupported_width":"Maximum width (unsupported — clear this value)","unsupported_height":"Maximum height (unsupported — clear this value)","margin":"Margin (CSS shorthand)"},"layout":{"structure":"Layout structure","format":"Layout format","format_help":"Changes the canvas geometry; widgets keep their current zones and settings.","compact_rows":"Compact rows (original behavior)","compact_rows_help":"Group top and bottom widgets in the middle when the middle row is empty. Off keeps them at opposite edges.","format_grid":"Grid 3 × 3","format_vertical_2_1":"Vertical 2/3 + 1/3","format_vertical_1_2":"Vertical 1/3 + 2/3","format_horizontal_2_1":"Horizontal 2/3 + 1/3","format_horizontal_1_2":"Horizontal 1/3 + 2/3","visual_preset":"Visual preset","preset_none":"No visual preset","preset_glass":"Glass information panel","preset_help":"Presets only style the layout and never change entities, actions, or widget placement."},"spacing":{"preset":"Spacing preset","compact":"Compact","normal":"Normal","spacious":"Spacious","custom":"Custom","card_padding":"Card padding","card_padding_help":"1–4 values: top, right, bottom, left. Example: 60px 60px 60px 16px.","zone_gap":"Zone gap","zone_gap_help":"One value, for example: 24px.","widget_gap":"Widget gap","widget_gap_help":"One value, for example: 16px.","invalid_padding":"Use 1–4 CSS lengths, for example: 60px 60px 60px 16px.","invalid_length":"Use one CSS length, for example: 16px.","legacy_hint":"The first spacing change converts this legacy configuration to the zone format."},"widgets":{"calendar_month":"Monthly overview","sensors":"Sensors","weather":"Weather","calendar":"Calendar","transportation":"Transportation","clock":"Clock","date":"Date","action_bar":"Action bar","ha_card":"Home Assistant card","separator":"Separator"},"editor":{"format":{"hour_format":"Hour format","hour_display":"Hour display","minute_display":"Minute display","second_display":"Second display","hour_12":"12-hour","hour_24":"24-hour","show_am_pm":"Show AM/PM","show_am_pm_help":"Keep 12-hour time while hiding or showing the period","am_pm_display":"AM/PM display","am_pm_display_help":"Hide the period, show a/p, or show AM/PM","am_pm_hidden":"Hidden","am_pm_narrow":"1-digit (a/p)","am_pm_full":"2-digit (AM/PM)","colon_blink":"Colon","colon_blink_help":"Choose whether the separator stays visible or blinks","colon_static":"Static","colon_fast":"Fast (0.5 s on/off)","colon_slow":"Slow (1 s on/off)","numeric":"Numeric","two_digit":"2-digit","hidden":"Hidden","custom_date":"Custom date format","custom_date_help":"For example yyyy-MM-dd or EEEE, MMMM d, yyyy. When filled, it overrides the settings below.","weekday_display":"Weekday display","month_display":"Month display","day_display":"Day display","year_display":"Year display","long_monday":"Long (Monday)","short_mon":"Short (Mon)","narrow_m":"Narrow (M)","long_january":"Long (January)","short_jan":"Short (Jan)","narrow_j":"Narrow (J)","numeric_1":"Numeric (1)","two_digit_01":"2-digit (01)","numeric_2025":"Numeric (2025)","two_digit_25":"2-digit (25)"},"weather":{"source":"Weather source","visible_content":"Displayed information","icons":"Weather icons","availability":"Availability","refresh":"Data refresh","show":"Show weather","show_help":"Display current weather and forecast","title":"Weather title","show_title":"Show forecast heading","show_title_help":"Show the Weather or Forecast heading above the widget","provider":"Weather provider","provider_none":"None (disable weather)","provider_ha":"Home Assistant entity","entity":"Weather entity","api_key":"API key","api_key_help":"OpenWeatherMap API key","latitude":"Latitude","longitude":"Longitude","units":"Units","metric":"Metric (°C, m/s)","imperial":"Imperial (°F, mph)","display_mode":"Display mode","current":"Current weather only","forecast":"Forecast only","both":"Current and forecast","icon_set":"Weather icon set","animate_icons":"Animate icons","animate_icons_help":"Uses subtle motion and respects the system reduced-motion preference.","forecast_type":"Forecast type","forecast_type_help":"Automatic uses a forecast supported by the selected entity","forecast_type_auto":"Automatic","forecast_type_daily":"Daily","forecast_type_hourly":"Hourly","forecast_type_twice_daily":"Twice daily","forecast_days":"Forecast days","days":"{count} days","forecast_hours":"Forecast hours","hours":"{count} hours","update_interval":"Update interval","update_help":"Update interval in minutes (minimum 1)","orientation":"Forecast orientation","orientation_help":"Auto uses a row in center zones and a column in side zones."},"sensors":{"empty":"No sensors configured.","sensor":"Sensor {number}","label":"Label","entity":"Entity","icon":"Icon","icon_help":"Leave empty to use the Home Assistant entity icon.","add":"Add sensor","remove":"Remove sensor","expand":"Expand sensor","collapse":"Collapse sensor","orientation":"Item orientation","orientation_help":"Auto uses a row in center zones and a column in side zones.","alignment":"Item alignment","alignment_help":"Use the zone alignment or override it for this widget.","item_gap":"Sensor item gap","item_gap_help":"CSS length between sensors (default: 16px)","show_icons":"Show sensor icons","show_icons_help":"Show or hide the icon next to each sensor.","icon_size":"Sensor icon size","icon_size_help":"CSS length (default is responsive, maximum 36px).","show_separator":"Show sensor separator","show_separator_help":"Show or hide the line between sensors in horizontal mode.","separator_color":"Separator color","separator_color_help":"Empty uses the widget text color.","separator_opacity":"Separator opacity","separator_opacity_help":"Adjust the separator transparency.","default_color":"Default color","default_color_help":"Used when no conditional rule matches; empty inherits the widget color.","color_rules":"Conditional colors","add_color_rule":"Add rule","remove_color_rule":"Remove rule","operator":"Condition","threshold":"Value","rule_color":"Color","operator_less_than":"Less than (<)","operator_less_or_equal":"Less than or equal (≤)","operator_greater_than":"Greater than (>)","operator_greater_or_equal":"Greater than or equal (≥)","operator_equal":"Equal (=)","operator_not_equal":"Not equal (≠)","move_rule_up":"Move rule up","move_rule_down":"Move rule down"},"transportation":{"source":"Data source","appearance":"Departure display","behavior":"Refresh and auto-hide","provider":"Transportation provider","max_departures":"Maximum departures per stop","departures":"{count} departures","display_mode":"Departure display","display_inline":"In card layout","display_modal":"Modal dialog","display_mode_help":"Choose where departures open after pressing the transportation action","auto_hide":"Auto-hide timeout","auto_hide_help":"Auto-hide timeout in minutes (1–10)","update_interval":"Update interval","update_help":"Update interval in minutes (minimum 1)","stops":"Stops","stop":"Stop {number}","stop_id":"Stop ID","post_id":"Post ID","stop_name":"Stop name (optional)","add_stop":"Add stop","remove_stop":"Remove stop","expand_stop":"Expand stop","collapse_stop":"Collapse stop","documentation":"Transportation configuration documentation","refresh_buttons":"Refresh button entities","refresh_button":"Refresh button entity","refresh_button_help":"This stop is activated when departures are opened","departure_entities":"Departure sensor entities","departure_entities_help":"Select the sensors in display order"},"actions":{"enable":"Enable action bar","description":"Configure action buttons displayed in this widget.","orientation":"Button orientation","orientation_help":"Auto uses a row in center zones and a column in side zones.","alignment":"Button alignment","alignment_help":"Align buttons to the left, center, or right","opacity":"Background opacity","opacity_help":"Adjust the action bar background transparency","button_background":"Circular button background","button_background_help":"Show or hide the translucent circle behind each action","columns":"Grid columns","columns_help":"0 automatically uses 2 columns in a horizontal zone; another value fixes the column count.","button_gap":"Button gap","button_gap_help":"CSS length between buttons (default: 16px)","panel_padding":"Panel padding","panel_padding_help":"CSS padding inside the action bar (default: 16px)","title":"Actions","empty":"No actions configured yet.","action":"Action {number}","type":"Action type","select_type":"Select action type","button_title":"Title","title_help":"Title for the action button","icon":"Icon","icon_help":"Icon for the action button","add":"Add action","remove":"Remove action","expand":"Expand action","collapse":"Collapse action","move_up":"Move action up","move_down":"Move action down","appearance":"Appearance by entity state","default_color":"Default icon color","state_entity":"Entity to track","state_entity_help":"Changes appearance only. Tap, hold and double-tap actions stay the same.","state_rules_help":"The first matching state wins. Unmatched states use the normal button appearance. Add unknown and unavailable rules if needed.","rule_state":"State (for example open or closed)","rule_color":"Icon color","add_rule":"Add state rule","remove_rule":"Remove rule","types":{"weather_update":"Update weather","transportation":"Transportation","light_toggle":"Toggle light","action_navigate":"Navigate to page","background_next":"Next background","action_ha":"Home Assistant action","call_service":"Call service","switch_toggle":"Toggle switch","action_more_info":"Entity details"}},"action_plugin":{"entity":"Entity","entity_more_info_help":"Entity used by the more-info and toggle actions","tap_action":"Tap action","tap_help":"Standard Home Assistant action to run on tap","hold_action":"Hold action","hold_help":"Standard Home Assistant action to run on hold","double_action":"Double tap action","double_help":"Standard Home Assistant action to run on double tap","active_color":"Active color","active_color_help":"Color to use when the action is active","light_entity":"Light entity","light_help":"Select a light entity to toggle","switch_entity":"Switch entity","switch_help":"Select a switch entity to toggle","icon_on":"Icon (on state)","light_icon_help":"Icon to show when the light is on","switch_icon_help":"Icon to show when the switch is on","light_color_help":"Color to use when the light is on","switch_color_help":"Color to use when the switch is on","more_info_help":"Select an entity to show more information for","navigation_path":"Navigation path","navigation_help":"Path or URL to open","open_in":"Open in","current_tab":"Current tab","new_tab":"New tab","service":"Service","service_help":"Service to call, including data and target","confirmation":"Ask for confirmation","confirmation_help":"Show a confirmation dialog before calling the service","confirmation_text":"Confirmation text","confirmation_text_help":"Custom text for the confirmation dialog","weather_update_help":"This action triggers an immediate weather update. No additional configuration is needed."},"background":{"source_group":"Image source","appearance":"Image appearance","rotation_group":"Image rotation","transparent":"Transparent card background","transparent_help":"Removes the card background, border and shadow. Select no image to reveal the dashboard wallpaper.","source":"Image source","opacity":"Background opacity","blur":"Background blur (px)","grayscale":"Background grayscale","rotation":"Rotation interval (seconds)","fit":"Background image fit","images":"Background images","image":"Background image {number}","url":"Image URL","weather":"Weather condition","weather_any":"Any weather","time":"Time of day","time_any":"Any time","add":"Add background image","remove":"Remove background image","expand":"Expand background image","collapse":"Collapse background image","source_none":"None (no background images)","source_picsum":"Picsum photos","source_local":"Local images","source_media":"Home Assistant media","media_help":"Choose an album or folder. Only its photos are used; subfolders and videos are skipped. Configure Immich in Home Assistant first.","media_selected":"Selected","media_root":"All media","media_back":"Back","media_loading":"Loading media…","media_error":"Could not load media. Check the integration and its permissions.","media_retry":"Retry","media_photo_count":"Photos in this folder","media_use":"Use this album / folder","source_sensor":"Sensor images","fit_fill":"Fill","fit_contain":"Contain","fit_cover":"Cover","fit_scale_down":"Scale down","local_help":"Configure local image URLs. Weather and time-of-day conditions can be selected for each image.","unsplash_help":"Configure Unsplash image source settings. An API key is required.","category":"Category","photo_count":"Number of photos","api_help":"Without a valid API key, the Unsplash image source will not work.","api_key":"API key","content_filter":"Content filter","sensor_entity":"Sensor entity","sensor_help":"Select a sensor whose files attribute contains an array of image URLs.","sensor_files_help":"The sensor must expose a files attribute containing image URLs."},"calendar":{"calendars":"Calendars","calendar":"Calendar {number}","entity":"Calendar entity","empty":"Add one or more Home Assistant calendar entities.","label":"Label (optional)","event_color":"Event color","add":"Add calendar","add_all":"Add all","remove":"Remove calendar","expand":"Expand calendar","collapse":"Collapse calendar","display":"Display","range":"Event range","details":"Event details","display_mode":"Display mode","agenda":"Agenda","today_only":"Today only","days_ahead":"Days ahead","maximum_events":"Maximum events","show_all_day":"Show all-day events","show_location":"Show location","show_description":"Show description","hide_past":"Hide past events today","hide_empty":"Hide when empty","update_interval":"Update interval","update_help":"Minutes (minimum 1)","filtering":"Filtering and visibility","refresh":"Data refresh","event_background":"Event background","event_appearance":"Event appearance","event_background_color":"Event background color","event_background_opacity":"Event background opacity","all_day":"All day","loading":"Loading calendar…","no_events":"No upcoming events.","when":"When","calendar_name":"Calendar","location":"Location","description":"Description","event":"Calendar event"},"separator":{"orientation":"Orientation","orientation_help":"Auto follows the direction of the hosting zone.","color":"Separator color","opacity":"Opacity","thickness":"Thickness","thickness_help":"CSS length, for example 1px or 0.15rem.","length":"Length","length_help":"CSS length or percentage, for example 100% or 240px."},"ha_card":{"description":"Embed a built-in or installed custom Home Assistant dashboard card.","card_type":"Card type","card_type_help":"Choose a card or enter its type, for example custom:mushroom-template-card.","choose_card":"Choose card","change_card":"Choose another card","edit_card":"Edit card in Home Assistant editor","dialog_title":"Embedded card settings","transparent":"Transparent card background","transparent_help":"Removes the standard HA card surface where the embedded card supports theme variables.","empty":"Choose a Home Assistant card in the widget editor.","loading":"Loading Home Assistant card…","recursion_error":"wall-clock-card cannot be embedded inside itself.","helpers_error":"Home Assistant card helpers are unavailable.","native_editor_unavailable":"The native Home Assistant card editor is unavailable in this view. Edit the complete card configuration below.","json_config":"Card configuration (JSON)","json_error":"The card configuration is not valid JSON.","json_type_error":"The card configuration must contain a type."}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","light_snow":"Nieve ligera","mist":"Niebla","light_rain":"Lluvia ligera","moderate_rain":"Lluvia moderada","heavy_intensity_rain":"Lluvia intensa","sunny":"Soleado","clear_night":"Noche despejada","partlycloudy":"Parcialmente nublado","cloudy":"Nublado","rainy":"Lluvioso","snowy":"Nevado","fog":"Niebla","hail":"Granizo","windy":"Ventoso"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","light_snow":"Kevyt lumisade","mist":"Sumu","light_rain":"Kevyt sade","moderate_rain":"Kohtalainen sade","heavy_intensity_rain":"Voimakas sade","sunny":"Aurinkoinen","clear_night":"Selkeä yö","partlycloudy":"Puolipilvinen","cloudy":"Pilvinen","rainy":"Sateinen","snowy":"Luminen","fog":"Sumu","hail":"Rae","windy":"Tuulinen"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","light_snow":"Légère neige","mist":"Brouillard","light_rain":"Pluie légère","moderate_rain":"Pluie modérée","heavy_intensity_rain":"Pluie forte","sunny":"Ensoleillé","clear_night":"Nuit claire","partlycloudy":"Partiellement nuageux","cloudy":"Nuageux","rainy":"Pluvieux","snowy":"Neigeux","fog":"Brouillard","hail":"Grêle","windy":"Venteux"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","light_snow":"Gyenge havazás","mist":"Köd","light_rain":"Gyenge eső","moderate_rain":"Mérsékelt eső","heavy_intensity_rain":"Erős eső","sunny":"Napos","clear_night":"Tiszta éjszaka","partlycloudy":"Részben felhős","cloudy":"Felhős","rainy":"Esős","snowy":"Havas","fog":"Köd","hail":"Jégeső","windy":"Szeles"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","light_snow":"Neve leggera","mist":"Nebbia","light_rain":"Pioggia leggera","moderate_rain":"Pioggia moderata","heavy_intensity_rain":"Pioggia intensa","sunny":"Soleggiato","clear_night":"Notte serena","partlycloudy":"Parzialmente nuvoloso","cloudy":"Nuvoloso","rainy":"Piovoso","snowy":"Nevoso","fog":"Nebbia","hail":"Grandine","windy":"Ventoso"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","light_snow":"Lichte sneeuw","mist":"Mist","light_rain":"Lichte regen","moderate_rain":"Matige regen","heavy_intensity_rain":"Zware regen","sunny":"Zonnig","clear_night":"Heldere nacht","partlycloudy":"Half bewolkt","cloudy":"Bewolkt","rainy":"Regenachtig","snowy":"Sneeuwachtig","fog":"Mist","hail":"Hagel","windy":"Winderig"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","light_snow":"Lett snø","mist":"Tåke","light_rain":"Lett regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn","sunny":"Solfylt","clear_night":"Klar natt","partlycloudy":"Delvis skyet","cloudy":"Overskyet","rainy":"Regnfullt","snowy":"Snøfylt","fog":"Tåke","hail":"Hagl","windy":"Vindfullt"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","light_snow":"Lekki śnieg","mist":"Mgła","light_rain":"Lekki deszcz","moderate_rain":"Umiarkowany deszcz","heavy_intensity_rain":"Intensywny deszcz","sunny":"Słonecznie","clear_night":"Pogodna noc","partlycloudy":"Częściowe zachmurzenie","cloudy":"Pochmurno","rainy":"Deszczowo","snowy":"Śnieżnie","fog":"Mgła","hail":"Grad","windy":"Wietrznie"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","light_snow":"Neve leve","mist":"Névoa","light_rain":"Chuva fraca","moderate_rain":"Chuva moderada","heavy_intensity_rain":"Chuva forte","sunny":"Ensolarado","clear_night":"Noite limpa","partlycloudy":"Parcialmente nublado","cloudy":"Nublado","rainy":"Chuvoso","snowy":"Nevado","fog":"Nevoeiro","hail":"Granizo","windy":"Ventoso"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","light_snow":"Ninsoare ușoară","mist":"Ceață","light_rain":"Ploaie ușoară","moderate_rain":"Ploaie moderată","heavy_intensity_rain":"Ploaie puternică","sunny":"Însorit","clear_night":"Noapte senină","partlycloudy":"Parțial înnorat","cloudy":"Înnorat","rainy":"Ploios","snowy":"Înzăpezit","fog":"Ceață","hail":"Grindină","windy":"Vântos"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","light_snow":"Небольшой снег","mist":"Туман","light_rain":"Небольшой дождь","moderate_rain":"Умеренный дождь","heavy_intensity_rain":"Сильный дождь","sunny":"Солнечно","clear_night":"Ясная ночь","partlycloudy":"Переменная облачность","cloudy":"Облачно","rainy":"Дождливо","snowy":"Снежно","fog":"Туман","hail":"Град","windy":"Ветрено"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","light_snow":"Slabé sneženie","mist":"Hmla","light_rain":"Slabý dážď","moderate_rain":"Mierny dážď","heavy_intensity_rain":"Silný dážď","sunny":"Slnečno","clear_night":"Jasná noc","partlycloudy":"Polojasno","cloudy":"Oblačno","rainy":"Daždivo","snowy":"Sneženie","fog":"Hmla","hail":"Krupobitie","windy":"Veterno"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","light_snow":"Lätt snöfall","mist":"Dimma","light_rain":"Lätt regn","moderate_rain":"Måttligt regn","heavy_intensity_rain":"Kraftigt regn","sunny":"Soligt","clear_night":"Klar natt","partlycloudy":"Halvklart","cloudy":"Molnigt","rainy":"Regnigt","snowy":"Snöigt","fog":"Dimma","hail":"Hagel","windy":"Blåsigt"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Ve=Object.fromEntries(Ue.map(e=>[e.code,e.translations]));let Ze={};function qe(e,t){if(void 0!==e[t])return e[t];const o=t.split(".");let i=e;for(const e of o){if(null==i||"object"!=typeof i)return;i=i[e]}return i}function Ke(e,t,o=e){const i=Ge(t);let a=Ze[i];a||(Ve[i]?(Ze[i]=Ve[i],a=Ze[i],ze.debug(`Loaded translations for ${i} on-demand`)):a=Ve.en);const n=qe(a,e),r="en"===i?n:qe(Ve.en,e);return"string"==typeof n?ze.debug(`Translation found for key "${e}" in language "${i}": "${n}"`):ze.debug(`No translation found for key "${e}" in language "${i}", using English/default fallback`),"string"==typeof n?n:"string"==typeof r?r:null!==o?o:e}function Ge(e){const t=(e||"en").toLowerCase().split(/[-_]/)[0];return"cz"===t?"cs":"nb"===t||"nn"===t?"no":Ye().includes(t)?t:"en"}function Je(e,t,o=e,i={}){var a;return Ke(e,"string"==typeof t?t:(null===(a=null==t?void 0:t.locale)||void 0===a?void 0:a.language)||(null==t?void 0:t.language)||"en",o).replace(/\{([^}]+)\}/g,(e,t)=>Object.prototype.hasOwnProperty.call(i,t)?String(i[t]):e)}function Ye(){return Ue.map(e=>e.code)}function Xe(){return Ue.map(e=>({value:e.code,label:e.label}))}function Qe(e){const t=Ue.find(t=>t.code===Ge(e));return(null==t?void 0:t.locale)||"en-US"}function et(e,t,o={},i){const{showAmPm:a,amPmDisplay:n,...r}=o;if(r.custom)return function(e,t,o,i){const a=Qe(t),n={EEEE:"weekday",EEE:"weekday",MMMM:"month",MMM:"month",MM:"month",M:"month",dd:"day",d:"day",yyyy:"year",yy:"year",HH:"hour",H:"hour",mm:"minute",m:"minute",ss:"second",s:"second"},r={EEEE:new Intl.DateTimeFormat(a,{weekday:"long",timeZone:i}),EEE:new Intl.DateTimeFormat(a,{weekday:"short",timeZone:i}),MMMM:new Intl.DateTimeFormat(a,{month:"long",timeZone:i}),MMM:new Intl.DateTimeFormat(a,{month:"short",timeZone:i}),MM:new Intl.DateTimeFormat(a,{month:"2-digit",timeZone:i}),M:new Intl.DateTimeFormat(a,{month:"numeric",timeZone:i}),dd:new Intl.DateTimeFormat(a,{day:"2-digit",timeZone:i}),d:new Intl.DateTimeFormat(a,{day:"numeric",timeZone:i}),yyyy:new Intl.DateTimeFormat(a,{year:"numeric",timeZone:i}),yy:new Intl.DateTimeFormat(a,{year:"2-digit",timeZone:i}),HH:new Intl.DateTimeFormat(a,{hour:"2-digit",hour12:!1,timeZone:i}),H:new Intl.DateTimeFormat(a,{hour:"numeric",hour12:!1,timeZone:i}),mm:new Intl.DateTimeFormat(a,{minute:"2-digit",timeZone:i}),m:new Intl.DateTimeFormat(a,{minute:"numeric",timeZone:i}),ss:new Intl.DateTimeFormat(a,{second:"2-digit",timeZone:i}),s:new Intl.DateTimeFormat(a,{second:"numeric",timeZone:i})};return o.replace(/EEEE|EEE|MMMM|MMM|MM|M|dd|d|yyyy|yy|HH|H|mm|m|ss|s/g,t=>{var o;const i=n[t];return(null===(o=r[t].formatToParts(e).find(e=>e.type===i))||void 0===o?void 0:o.value)||""})}(e,t,r.custom,i);if(i&&(r.timeZone=i),"hidden"===r.weekday&&(r.weekday=void 0),"hidden"===r.year&&(r.year=void 0),"hidden"===r.month&&(r.month=void 0),"hidden"===r.day&&(r.day=void 0),void 0===r.weekday&&void 0===r.year&&void 0===r.month&&void 0===r.day)return"";const s=Qe(t);if("short"===r.month){const t=new Intl.DateTimeFormat(s,{month:"short",timeZone:i}).format(e),o={...r};delete o.month;let a=e.toLocaleDateString(s,o);return"2-digit"===r.day?(a=a.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${t}`),a.includes(t)||(a=`${a} ${t}`)):a=e.toLocaleDateString(s,r),a}return e.toLocaleDateString(s,r)}class tt{constructor(e,t){this._readyResolve=null,this.host=e,this.logger=ke(t),e.addController(this),this.ready=new Promise(e=>{this._readyResolve=e})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(e=>{this._readyResolve=e}),this.onHostDisconnected()}}class ot{constructor(){this.subscribers=new Map}static getInstance(){return ot.instance||(ot.instance=new ot),ot.instance}subscribe(e,t){this.subscribers.has(e)||this.subscribers.set(e,[]),this.subscribers.get(e).push(t)}unsubscribe(e,t){const o=this.subscribers.get(e);o&&this.subscribers.set(e,o.filter(e=>e!==t))}publish(e){const t=e.constructor;(this.subscribers.get(t)||[]).forEach(t=>t(e))}}class it{constructor(e,t){this.componentName=e,this.state=t}}class at{constructor(e){this.weather=e}}class nt{constructor(){}}class rt{constructor(){}}class st{constructor(){}}class lt{constructor(){}}class ct{constructor(){this.states=new Map}static getInstance(){return ct.instance||(ct.instance=new ct),ct.instance}isActive(e){return!0===this.states.get(e)}setActive(e,t){this.isActive(e)!==t&&(this.states.set(e,t),ot.getInstance().publish(new it(e,t)))}}var dt,ht,ut;!function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(dt||(dt={})),function(e){e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night",e.Unspecified="unspecified"}(ht||(ht={})),function(e){e.Large="large",e.Medium="medium",e.Small="small",e.Custom="custom"}(ut||(ut={}));const pt={clockSize:{large:"18rem",medium:"16rem",small:"14rem"},dateSize:{large:"6rem",medium:"6rem",small:"4rem"},labelSize:{large:"1.8rem",medium:"1.2rem",small:"1.0rem"},valueSize:{large:"3rem",medium:"2rem",small:"1.5rem"},iconSize:{large:"84px",medium:"72px",small:"60px"},buttonSize:{large:"168px",medium:"144px",small:"120px"},forecastTempWidth:{large:"120px",medium:"80px",small:"70px"}};function gt(e,t,o){if(e===ut.Custom&&t)return t;const i=pt[o];return e===ut.Large?i.large:e===ut.Small?i.small:i.medium}class mt extends tt{constructor(e,t={}){super(e,"background-image-controller"),this.backgroundImageManager=new We,this.currentWeather=Ee.All,this.messenger=ot.getInstance(),this._currentImageUrl="",this._previousImageUrl="",this._fetchingImageUrls=!1,this.managerInitialized=!1,this.hasReceivedWeather=!1,this.imageRequestGeneration=0,this.onWeather=e=>{this.logger.info("New message for weather:",e.weather),this.hasReceivedWeather=!0,this.updateWeather(e.weather)},this.onFetchNextImage=e=>{this.logger.info("Fetch next image requested"),this.isInitialized&&(this.setupImageRotation(),this.fetchNewImageAsync(this.currentWeather))},this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:1e3,fill:"forwards"},this.config=t}updateHass(e){this.hass=e,this.backgroundImageManager.setHass(e)}onHostConnected(){this.messenger.subscribe(at,this.onWeather),this.messenger.subscribe(lt,this.onFetchNextImage),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){this.messenger.unsubscribe(at,this.onWeather),this.messenger.unsubscribe(lt,this.onFetchNextImage),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0),this.managerInitialized=!1,this.imageRequestGeneration++}updateConfig(e){const t={...this.config};this.config={...this.config,...e},ze.info("Update the BackgroundImageController with new configuration");const o=this.isInitialized;t.imageSourceConfig!==this.config.imageSourceConfig?(this.imageRequestGeneration++,this.initializeManagerAsync().then(e=>{e&&(o||this.hasReceivedWeather)&&this.fetchNewImageAsync(this.currentWeather).catch(e=>this.logger.error("Error fetching image after reinitialization:",e))}).catch(e=>this.logger.error("Error during BackgroundImageManager initialization:",e))):t.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(this._fetchingImageUrls)return!1;this._fetchingImageUrls=!0;try{const e=this.config.imageSourceConfig;if(!e||"none"===e.imageSourceId)return this.disableBackground(),!1;this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${e.imageSourceId}`);const t=this.backgroundImageManager.initialize(e);return this.managerInitialized=t,t&&this.backgroundImageManager.setHass(this.hass),t?(this.setupImageRotation(),!0):(this.logger.warn("Failed to initialize BackgroundImageManager"),this.disableBackground(),!1)}catch(e){return this.managerInitialized=!1,this.logger.error("Error fetching image URLs:",e),!1}finally{this._fetchingImageUrls=!1}}disableBackground(){this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0),this.managerInitialized=!1,this.backgroundImageManager.initialize({imageSourceId:"none"}),(this._currentImageUrl||this._previousImageUrl)&&(this._currentImageUrl="",this._previousImageUrl="",this.host.requestUpdate())}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const e=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${e/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(e){this.logger.error("Error in image rotation interval:",e)}})()},e)}async fetchNewImageAsync(e){if(!this.managerInitialized)return;const t=this.imageRequestGeneration;try{let o=e,i=function(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?Ie.SunriseSunset:e>=9&&e<17?Ie.Day:e>=21||e<5?Ie.Night:Ie.Unspecified}();const a=await this.backgroundImageManager.getNextImageUrlAsync(o,i);if(t!==this.imageRequestGeneration||!this.managerInitialized)return;if(a){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}`);const e=new Image;e.onload=async()=>{t===this.imageRequestGeneration&&this.managerInitialized&&(this.logger.debug("New image loaded successfully"),this._currentImageUrl?this._previousImageUrl=this._currentImageUrl:this._previousImageUrl="",this._currentImageUrl=a,this.host.requestUpdate(),await this.host.updateComplete,await this.fireAnimate())},e.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}`)},e.src=a}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(e){this.logger.error("Error fetching new dynamic image:",e)}}async fireAnimate(){const e=function(e){const t=e;return t.shadowRoot?Array.from(t.shadowRoot.querySelectorAll(".background-image")):[]}(this.host);0!==e.length&&(1===e.length?e[0].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"}):(e[0].animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),e[1].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})),this._previousImageUrl="")}updateWeather(e){var t;const o=this.currentWeather!==e;this.currentWeather=e;const i=null===(t=this.config.imageSourceConfig)||void 0===t?void 0:t.imageSourceId;i&&"none"!==i&&(this.isInitialized?o&&(this.logger.info(`Updating weather condition to: ${e}`),this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after weather update:",e))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(t=>{t&&this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after initialization:",e))})))}get isInitialized(){return this.managerInitialized}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}}var vt=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let ft=class extends de{constructor(){super(),this.backgroundOpacity=.5,this.objectFit="cover",this.backgroundBlur=0,this.backgroundGrayscale=0,this.logger=ke("background-image-component"),this.backgroundImageController=new mt(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(e){var t;super.updated(e),e.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(t=this.config)&&void 0!==t?t:{})),e.has("hass")&&this.backgroundImageController.updateHass(this.hass)}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}render(){const e=this.currentImageUrl,t=this.previousImageUrl,o=this.objectFit||"cover",i=Math.min(30,Math.max(0,Number(this.backgroundBlur)||0)),a=Number(this.backgroundGrayscale),n=Number.isFinite(a)?Math.min(1,Math.max(0,a)):0;return U`
            <div class="background-container"
                 style="--background-blur: ${i}px;
                        --background-blur-offset: ${-i}px;
                        --background-blur-overflow: ${2*i}px;
                        --background-grayscale: ${n};">
                ${e?U`
                        ${t?U`
                                <!-- Previous image that will fade out -->
                                <img class="background-image fade-out" src="${t}" style="object-fit: ${o};">
                            `:""}
                        <!-- Current image that will fade in -->
                        <img class="background-image fade-in" src="${e}" style="object-fit: ${o};">
                        <div class="background-overlay" style="opacity: ${void 0!==this.backgroundOpacity?this.backgroundOpacity:.5};"></div>
                    `:""}
            </div>
        `}};function yt(e){return e.substr(0,e.indexOf("."))}var bt,wt;ft.styles=n`
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
            top: var(--background-blur-offset, 0px);
            left: var(--background-blur-offset, 0px);
            width: calc(100% + var(--background-blur-overflow, 0px));
            height: calc(100% + var(--background-blur-overflow, 0px));
            filter: blur(var(--background-blur, 0px)) grayscale(var(--background-grayscale, 0));
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
    `,vt([me({type:Number})],ft.prototype,"backgroundOpacity",void 0),vt([me({type:String})],ft.prototype,"objectFit",void 0),vt([me({type:Number})],ft.prototype,"backgroundBlur",void 0),vt([me({type:Number})],ft.prototype,"backgroundGrayscale",void 0),vt([me({type:Object})],ft.prototype,"config",void 0),vt([me({type:Object})],ft.prototype,"hass",void 0),ft=vt([ue("ha-background-image")],ft),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(bt||(bt={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(wt||(wt={}));const _t=(e,t)=>{const o=Object.assign({maximumFractionDigits:2},t);if("string"!=typeof e)return o;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){const t=e.indexOf(".")>-1?e.split(".")[1].length:0;o.minimumFractionDigits=t,o.maximumFractionDigits=t}return o},xt="mdi:bookmark",$t=["closed","locked","off"],kt=(new Set(["fan","input_boolean","light","switch","group","automation"]),(e,t,o,i)=>{i=i||{},o=null==o?{}:o;const a=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return a.detail=o,e.dispatchEvent(a),a});new Set(["call-service","divider","section","weblink","cast","select"]);const St={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function zt(e,t){if(e in St)return St[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),xt}}const Ct=e=>{kt(window,"haptic",e)},It=(e,t,o=!1)=>{o?history.replaceState(null,"",t):history.pushState(null,"",t),kt(window,"location-changed",{replace:o})},Et=(e,t,o,i)=>{let a;"double_tap"===i&&o.double_tap_action?a=o.double_tap_action:"hold"===i&&o.hold_action?a=o.hold_action:"tap"===i&&o.tap_action&&(a=o.tap_action),((e,t,o,i)=>{if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(e=>e.user===t.user.id)||(Ct("warning"),confirm(i.confirmation.text||`Are you sure you want to ${i.action}?`)))switch(i.action){case"more-info":(o.entity||o.camera_image)&&kt(e,"hass-more-info",{entityId:o.entity?o.entity:o.camera_image});break;case"navigate":i.navigation_path&&It(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":o.entity&&(((e,t)=>{((e,t,o=!0)=>{const i=yt(t),a="group"===i?"homeassistant":i;let n;switch(i){case"lock":n=o?"unlock":"lock";break;case"cover":n=o?"open_cover":"close_cover";break;default:n=o?"turn_on":"turn_off"}e.callService(a,n,{entity_id:t})})(e,t,$t.includes(e.states[t].state))})(t,o.entity),Ct("success"));break;case"call-service":{if(!i.service)return void Ct("failure");const[e,o]=i.service.split(".",2);t.callService(e,o,i.service_data,i.target),Ct("success");break}case"fire-dom-event":kt(e,"ll-custom",i)}})(e,t,o,a)};function At(e){return void 0!==e&&"none"!==e.action}const Dt={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},Pt={binary_sensor:(e,t)=>{const o="off"===e;switch(null==t?void 0:t.attributes.device_class){case"battery":return o?"mdi:battery":"mdi:battery-outline";case"battery_charging":return o?"mdi:battery":"mdi:battery-charging";case"cold":return o?"mdi:thermometer":"mdi:snowflake";case"connectivity":return o?"mdi:server-network-off":"mdi:server-network";case"door":return o?"mdi:door-closed":"mdi:door-open";case"garage_door":return o?"mdi:garage":"mdi:garage-open";case"power":case"plug":return o?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return o?"mdi:check-circle":"mdi:alert-circle";case"smoke":return o?"mdi:check-circle":"mdi:smoke";case"heat":return o?"mdi:thermometer":"mdi:fire";case"light":return o?"mdi:brightness-5":"mdi:brightness-7";case"lock":return o?"mdi:lock":"mdi:lock-open";case"moisture":return o?"mdi:water-off":"mdi:water";case"motion":return o?"mdi:walk":"mdi:run";case"occupancy":case"presence":return o?"mdi:home-outline":"mdi:home";case"opening":return o?"mdi:square":"mdi:square-outline";case"running":return o?"mdi:stop":"mdi:play";case"sound":return o?"mdi:music-note-off":"mdi:music-note";case"update":return o?"mdi:package":"mdi:package-up";case"vibration":return o?"mdi:crop-portrait":"mdi:vibrate";case"window":return o?"mdi:window-closed":"mdi:window-open";default:return o?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:e=>{const t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"mdi:garage-open":"mdi:garage";case"door":return t?"mdi:door-open":"mdi:door-closed";case"shutter":return t?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return t?"mdi:blinds-open":"mdi:blinds";case"window":return t?"mdi:window-open":"mdi:window-closed";default:return zt("cover",e.state)}},sensor:e=>{const t=e.attributes.device_class;if(t&&t in Dt)return Dt[t];if("battery"===t){const t=Number(e.state);if(isNaN(t))return"mdi:battery-unknown";const o=10*Math.round(t/10);return o>=100?"mdi:battery":o<=0?"mdi:battery-alert":`hass:battery-${o}`}const o=e.attributes.unit_of_measurement;return"°C"===o||"°F"===o?"mdi:thermometer":zt("sensor")},input_datetime:e=>e.attributes.has_date?e.attributes.has_time?zt("input_datetime"):"mdi:calendar":"mdi:clock"},Tt=e=>{if(!e)return xt;if(e.attributes.icon)return e.attributes.icon;const t=yt(e.entity_id);return t in Pt?Pt[t](e):zt(t,e.state)},Ot=new Map;function Nt(e,t){var o;return e?null===(o=Ot.get(e))||void 0===o?void 0:o.get(t):void 0}function Ft(e,t,o){var i;if(!e)return;const a=null!==(i=Ot.get(e))&&void 0!==i?i:new Map;a.set(t,o),Ot.set(e,a)}var Mt=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};class Rt extends de{constructor(){super(...arguments),this.section="all"}restoreExpandedIndex(e){return function(e,t){var o;const i=null===(o=Nt(e,t))||void 0===o?void 0:o.expandedIndex;return null===i?null:"number"==typeof i&&Number.isInteger(i)&&i>=0?i:null}(this.editorSessionKey,e)}retainExpandedIndex(e,t){!function(e,t,o){Ft(e,t,{expandedIndex:o})}(this.editorSessionKey,e,t)}t(e,t,o={}){return Je(e,this.hass,null!=t?t:e,o)}updated(e){super.updated(e)}_handleFormValueChanged(e){if(e.stopPropagation(),!this.config)return;const t=JSON.parse(JSON.stringify(this.config));this.setPropertyByPath(t,e.detail.propertyName,e.detail.value),kt(this,"config-changed",{config:t})}setPropertyByPath(e,t,o){if(!t)return e;const i=t.split(".");let a=e;for(let e=0;e<i.length-1;e++){const t=i[e];if(t.includes("[")&&t.includes("]")){const e=t.substring(0,t.indexOf("[")),o=parseInt(t.substring(t.indexOf("[")+1,t.indexOf("]")),10);a[e]||(a[e]=[]),a[e][o]||(a[e][o]={}),a=a[e][o]}else a[t]||(a[t]={}),a=a[t]}return a[i[i.length-1]]=o,e}}function jt(e,t,o){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var o=t.call(e,"string");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function Lt(){return Lt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var i in o)({}).hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},Lt.apply(null,arguments)}function Ht(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,i)}return o}function Bt(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?Ht(Object(o),!0).forEach(function(t){jt(e,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):Ht(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))})}return e}function Wt(e){return Wt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Wt(e)}function Ut(e){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(e)}Mt([me({type:Object})],Rt.prototype,"hass",void 0),Mt([me({type:Object})],Rt.prototype,"config",void 0),Mt([me({attribute:!1})],Rt.prototype,"editorSessionKey",void 0),Mt([me({type:String})],Rt.prototype,"section",void 0);var Vt=Ut(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Zt=Ut(/Edge/i),qt=Ut(/firefox/i),Kt=Ut(/safari/i)&&!Ut(/chrome/i)&&!Ut(/android/i),Gt=Ut(/iP(ad|od|hone)/i),Jt=Ut(/chrome/i)&&Ut(/android/i),Yt={capture:!1,passive:!1};function Xt(e,t,o){e.addEventListener(t,o,!Vt&&Yt)}function Qt(e,t,o){e.removeEventListener(t,o,!Vt&&Yt)}function eo(e,t){if(t){if(">"===t[0]&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch(e){return!1}return!1}}function to(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function oo(e,t,o,i){if(e){o=o||document;do{if(null!=t&&(">"===t[0]?e.parentNode===o&&eo(e,t):eo(e,t))||i&&e===o)return e;if(e===o)break}while(e=to(e))}return null}var io,ao=/\s+/g;function no(e,t,o){if(e&&t)if(e.classList)e.classList[o?"add":"remove"](t);else{var i=(" "+e.className+" ").replace(ao," ").replace(" "+t+" "," ");e.className=(i+(o?" "+t:"")).replace(ao," ")}}function ro(e,t,o){var i=e&&e.style;if(i){if(void 0===o)return document.defaultView&&document.defaultView.getComputedStyle?o=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(o=e.currentStyle),void 0===t?o:o[t];t in i||-1!==t.indexOf("webkit")||(t="-webkit-"+t),i[t]=o+("string"==typeof o?"":"px")}}function so(e,t){var o="";if("string"==typeof e)o=e;else do{var i=ro(e,"transform");i&&"none"!==i&&(o=i+" "+o)}while(!t&&(e=e.parentNode));var a=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return a&&new a(o)}function lo(e,t,o){if(e){var i=e.getElementsByTagName(t),a=0,n=i.length;if(o)for(;a<n;a++)o(i[a],a);return i}return[]}function co(){return document.scrollingElement||document.documentElement}function ho(e,t,o,i,a){if(e.getBoundingClientRect||e===window){var n,r,s,l,c,d,h;if(e!==window&&e.parentNode&&e!==co()?(r=(n=e.getBoundingClientRect()).top,s=n.left,l=n.bottom,c=n.right,d=n.height,h=n.width):(r=0,s=0,l=window.innerHeight,c=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(t||o)&&e!==window&&(a=a||e.parentNode,!Vt))do{if(a&&a.getBoundingClientRect&&("none"!==ro(a,"transform")||o&&"static"!==ro(a,"position"))){var u=a.getBoundingClientRect();r-=u.top+parseInt(ro(a,"border-top-width")),s-=u.left+parseInt(ro(a,"border-left-width")),l=r+n.height,c=s+n.width;break}}while(a=a.parentNode);if(i&&e!==window){var p=so(a||e),g=p&&p.a,m=p&&p.d;p&&(l=(r/=m)+(d/=m),c=(s/=g)+(h/=g))}return{top:r,left:s,bottom:l,right:c,width:h,height:d}}}function uo(e,t,o){for(var i=fo(e,!0),a=ho(e)[t];i;){var n=ho(i)[o];if(!("top"===o||"left"===o?a>=n:a<=n))return i;if(i===co())break;i=fo(i,!1)}return!1}function po(e,t,o,i){for(var a=0,n=0,r=e.children;n<r.length;){if("none"!==r[n].style.display&&r[n]!==wi.ghost&&(i||r[n]!==wi.dragged)&&oo(r[n],o.draggable,e,!1)){if(a===t)return r[n];a++}n++}return null}function go(e,t){for(var o=e.lastElementChild;o&&(o===wi.ghost||"none"===ro(o,"display")||t&&!eo(o,t));)o=o.previousElementSibling;return o||null}function mo(e,t){var o=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)"TEMPLATE"===e.nodeName.toUpperCase()||e===wi.clone||t&&!eo(e,t)||o++;return o}function vo(e){var t=0,o=0,i=co();if(e)do{var a=so(e),n=a.a,r=a.d;t+=e.scrollLeft*n,o+=e.scrollTop*r}while(e!==i&&(e=e.parentNode));return[t,o]}function fo(e,t){if(!e||!e.getBoundingClientRect)return co();var o=e,i=!1;do{if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var a=ro(o);if(o.clientWidth<o.scrollWidth&&("auto"==a.overflowX||"scroll"==a.overflowX)||o.clientHeight<o.scrollHeight&&("auto"==a.overflowY||"scroll"==a.overflowY)){if(!o.getBoundingClientRect||o===document.body)return co();if(i||t)return o;i=!0}}}while(o=o.parentNode);return co()}function yo(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}function bo(e,t){return function(){if(!io){var o=arguments;1===o.length?e.call(this,o[0]):e.apply(this,o),io=setTimeout(function(){io=void 0},t)}}}function wo(e,t,o){e.scrollLeft+=t,e.scrollTop+=o}function _o(e){var t=window.Polymer,o=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):o?o(e).clone(!0)[0]:e.cloneNode(!0)}function xo(e,t,o){var i={};return Array.from(e.children).forEach(function(a){var n,r,s,l;if(oo(a,t.draggable,e,!1)&&!a.animated&&a!==o){var c=ho(a);i.left=Math.min(null!==(n=i.left)&&void 0!==n?n:1/0,c.left),i.top=Math.min(null!==(r=i.top)&&void 0!==r?r:1/0,c.top),i.right=Math.max(null!==(s=i.right)&&void 0!==s?s:-1/0,c.right),i.bottom=Math.max(null!==(l=i.bottom)&&void 0!==l?l:-1/0,c.bottom)}}),i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}var $o="Sortable"+(new Date).getTime();var ko=[],So={initializeByDefault:!0},zo={mount:function(e){for(var t in So)So.hasOwnProperty(t)&&!(t in e)&&(e[t]=So[t]);ko.forEach(function(t){if(t.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),ko.push(e)},pluginEvent:function(e,t,o){var i=this;this.eventCanceled=!1,o.cancel=function(){i.eventCanceled=!0};var a=e+"Global";ko.forEach(function(i){t[i.pluginName]&&(t[i.pluginName][a]&&t[i.pluginName][a](Bt({sortable:t},o)),t.options[i.pluginName]&&t[i.pluginName][e]&&t[i.pluginName][e](Bt({sortable:t},o)))})},initializePlugins:function(e,t,o,i){for(var a in ko.forEach(function(i){var a=i.pluginName;if(e.options[a]||i.initializeByDefault){var n=new i(e,t,e.options);n.sortable=e,n.options=e.options,e[a]=n,Lt(o,n.defaults)}}),e.options)if(e.options.hasOwnProperty(a)){var n=this.modifyOption(e,a,e.options[a]);void 0!==n&&(e.options[a]=n)}},getEventProperties:function(e,t){var o={};return ko.forEach(function(i){"function"==typeof i.eventProperties&&Lt(o,i.eventProperties.call(t[i.pluginName],e))}),o},modifyOption:function(e,t,o){var i;return ko.forEach(function(a){e[a.pluginName]&&a.optionListeners&&"function"==typeof a.optionListeners[t]&&(i=a.optionListeners[t].call(e[a.pluginName],o))}),i}};var Co=["evt"],Io=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=o.evt,a=function(e,t){if(null==e)return{};var o,i,a=function(e,t){if(null==e)return{};var o={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(-1!==t.indexOf(i))continue;o[i]=e[i]}return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)o=n[i],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}(o,Co);zo.pluginEvent.bind(wi)(e,t,Bt({dragEl:Ao,parentEl:Do,ghostEl:Po,rootEl:To,nextEl:Oo,lastDownEl:No,cloneEl:Fo,cloneHidden:Mo,dragStarted:Jo,putSortable:Wo,activeSortable:wi.active,originalEvent:i,oldIndex:Ro,oldDraggableIndex:Lo,newIndex:jo,newDraggableIndex:Ho,hideGhostForTarget:vi,unhideGhostForTarget:fi,cloneNowHidden:function(){Mo=!0},cloneNowShown:function(){Mo=!1},dispatchSortableEvent:function(e){Eo({sortable:t,name:e,originalEvent:i})}},a))};function Eo(e){!function(e){var t=e.sortable,o=e.rootEl,i=e.name,a=e.targetEl,n=e.cloneEl,r=e.toEl,s=e.fromEl,l=e.oldIndex,c=e.newIndex,d=e.oldDraggableIndex,h=e.newDraggableIndex,u=e.originalEvent,p=e.putSortable,g=e.extraEventProperties;if(t=t||o&&o[$o]){var m,v=t.options,f="on"+i.charAt(0).toUpperCase()+i.substr(1);!window.CustomEvent||Vt||Zt?(m=document.createEvent("Event")).initEvent(i,!0,!0):m=new CustomEvent(i,{bubbles:!0,cancelable:!0}),m.to=r||o,m.from=s||o,m.item=a||o,m.clone=n,m.oldIndex=l,m.newIndex=c,m.oldDraggableIndex=d,m.newDraggableIndex=h,m.originalEvent=u,m.pullMode=p?p.lastPutMode:void 0;var y=Bt(Bt({},g),zo.getEventProperties(i,t));for(var b in y)m[b]=y[b];o&&o.dispatchEvent(m),v[f]&&v[f].call(t,m)}}(Bt({putSortable:Wo,cloneEl:Fo,targetEl:Ao,rootEl:To,oldIndex:Ro,oldDraggableIndex:Lo,newIndex:jo,newDraggableIndex:Ho},e))}var Ao,Do,Po,To,Oo,No,Fo,Mo,Ro,jo,Lo,Ho,Bo,Wo,Uo,Vo,Zo,qo,Ko,Go,Jo,Yo,Xo,Qo,ei,ti=!1,oi=!1,ii=[],ai=!1,ni=!1,ri=[],si=!1,li=[],ci="undefined"!=typeof document,di=Gt,hi=Zt||Vt?"cssFloat":"float",ui=ci&&!Jt&&!Gt&&"draggable"in document.createElement("div"),pi=function(){if(ci){if(Vt)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto","auto"===e.style.pointerEvents}}(),gi=function(e,t){var o=ro(e),i=parseInt(o.width)-parseInt(o.paddingLeft)-parseInt(o.paddingRight)-parseInt(o.borderLeftWidth)-parseInt(o.borderRightWidth),a=po(e,0,t),n=po(e,1,t),r=a&&ro(a),s=n&&ro(n),l=r&&parseInt(r.marginLeft)+parseInt(r.marginRight)+ho(a).width,c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+ho(n).width;if("flex"===o.display)return"column"===o.flexDirection||"column-reverse"===o.flexDirection?"vertical":"horizontal";if("grid"===o.display)return o.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(a&&r.float&&"none"!==r.float){var d="left"===r.float?"left":"right";return!n||"both"!==s.clear&&s.clear!==d?"horizontal":"vertical"}return a&&("block"===r.display||"flex"===r.display||"table"===r.display||"grid"===r.display||l>=i&&"none"===o[hi]||n&&"none"===o[hi]&&l+c>i)?"vertical":"horizontal"},mi=function(e){function t(e,o){return function(i,a,n,r){var s=i.options.group.name&&a.options.group.name&&i.options.group.name===a.options.group.name;if(null==e&&(o||s))return!0;if(null==e||!1===e)return!1;if(o&&"clone"===e)return e;if("function"==typeof e)return t(e(i,a,n,r),o)(i,a,n,r);var l=(o?i:a).options.group.name;return!0===e||"string"==typeof e&&e===l||e.join&&e.indexOf(l)>-1}}var o={},i=e.group;i&&"object"==Wt(i)||(i={name:i}),o.name=i.name,o.checkPull=t(i.pull,!0),o.checkPut=t(i.put),o.revertClone=i.revertClone,e.group=o},vi=function(){!pi&&Po&&ro(Po,"display","none")},fi=function(){!pi&&Po&&ro(Po,"display","")};ci&&!Jt&&document.addEventListener("click",function(e){if(oi)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),oi=!1,!1},!0);var yi=function(e){if(Ao){var t=function(e,t){var o;return ii.some(function(i){var a=i[$o].options.emptyInsertThreshold;if(a&&!go(i)){var n=ho(i),r=e>=n.left-a&&e<=n.right+a,s=t>=n.top-a&&t<=n.bottom+a;return r&&s?o=i:void 0}}),o}((e=e.touches?e.touches[0]:e).clientX,e.clientY);if(t){var o={};for(var i in e)e.hasOwnProperty(i)&&(o[i]=e[i]);o.target=o.rootEl=t,o.preventDefault=void 0,o.stopPropagation=void 0,t[$o]._onDragOver(o)}}},bi=function(e){Ao&&Ao.parentNode[$o]._isOutsideThisEl(e.target)};function wi(e,t){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=Lt({},t),e[$o]=this;var o,i,a={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return gi(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==wi.supportPointer&&"PointerEvent"in window&&(!Kt||Gt),emptyInsertThreshold:5};for(var n in zo.initializePlugins(this,e,a),a)!(n in t)&&(t[n]=a[n]);for(var r in mi(t),this)"_"===r.charAt(0)&&"function"==typeof this[r]&&(this[r]=this[r].bind(this));this.nativeDraggable=!t.forceFallback&&ui,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?Xt(e,"pointerdown",this._onTapStart):(Xt(e,"mousedown",this._onTapStart),Xt(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(Xt(e,"dragover",this),Xt(e,"dragenter",this)),ii.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),Lt(this,(i=[],{captureAnimationState:function(){i=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(e){if("none"!==ro(e,"display")&&e!==wi.ghost){i.push({target:e,rect:ho(e)});var t=Bt({},i[i.length-1].rect);if(e.thisAnimationDuration){var o=so(e,!0);o&&(t.top-=o.f,t.left-=o.e)}e.fromRect=t}})},addAnimationState:function(e){i.push(e)},removeAnimationState:function(e){i.splice(function(e,t){for(var o in e)if(e.hasOwnProperty(o))for(var i in t)if(t.hasOwnProperty(i)&&t[i]===e[o][i])return Number(o);return-1}(i,{target:e}),1)},animateAll:function(e){var t=this;if(!this.options.animation)return clearTimeout(o),void("function"==typeof e&&e());var a=!1,n=0;i.forEach(function(e){var o=0,i=e.target,r=i.fromRect,s=ho(i),l=i.prevFromRect,c=i.prevToRect,d=e.rect,h=so(i,!0);h&&(s.top-=h.f,s.left-=h.e),i.toRect=s,i.thisAnimationDuration&&yo(l,s)&&!yo(r,s)&&(d.top-s.top)/(d.left-s.left)===(r.top-s.top)/(r.left-s.left)&&(o=function(e,t,o,i){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-o.top,2)+Math.pow(t.left-o.left,2))*i.animation}(d,l,c,t.options)),yo(s,r)||(i.prevFromRect=r,i.prevToRect=s,o||(o=t.options.animation),t.animate(i,d,s,o)),o&&(a=!0,n=Math.max(n,o),clearTimeout(i.animationResetTimer),i.animationResetTimer=setTimeout(function(){i.animationTime=0,i.prevFromRect=null,i.fromRect=null,i.prevToRect=null,i.thisAnimationDuration=null},o),i.thisAnimationDuration=o)}),clearTimeout(o),a?o=setTimeout(function(){"function"==typeof e&&e()},n):"function"==typeof e&&e(),i=[]},animate:function(e,t,o,i){if(i){ro(e,"transition",""),ro(e,"transform","");var a=so(this.el),n=a&&a.a,r=a&&a.d,s=(t.left-o.left)/(n||1),l=(t.top-o.top)/(r||1);e.animatingX=!!s,e.animatingY=!!l,ro(e,"transform","translate3d("+s+"px,"+l+"px,0)"),this.forRepaintDummy=function(e){return e.offsetWidth}(e),ro(e,"transition","transform "+i+"ms"+(this.options.easing?" "+this.options.easing:"")),ro(e,"transform","translate3d(0,0,0)"),"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=setTimeout(function(){ro(e,"transition",""),ro(e,"transform",""),e.animated=!1,e.animatingX=!1,e.animatingY=!1},i)}}}))}function _i(e,t,o,i,a,n,r,s){var l,c,d=e[$o],h=d.options.onMove;return!window.CustomEvent||Vt||Zt?(l=document.createEvent("Event")).initEvent("move",!0,!0):l=new CustomEvent("move",{bubbles:!0,cancelable:!0}),l.to=t,l.from=e,l.dragged=o,l.draggedRect=i,l.related=a||t,l.relatedRect=n||ho(t),l.willInsertAfter=s,l.originalEvent=r,e.dispatchEvent(l),h&&(c=h.call(d,l,r)),c}function xi(e){e.draggable=!1}function $i(){si=!1}function ki(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,o=t.length,i=0;o--;)i+=t.charCodeAt(o);return i.toString(36)}function Si(e){return setTimeout(e,0)}function zi(e){return clearTimeout(e)}wi.prototype={constructor:wi,_isOutsideThisEl:function(e){this.el.contains(e)||e===this.el||(Yo=null)},_getDirection:function(e,t){return"function"==typeof this.options.direction?this.options.direction.call(this,e,t,Ao):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,o=this.el,i=this.options,a=i.preventOnFilter,n=e.type,r=e.touches&&e.touches[0]||e.pointerType&&"touch"===e.pointerType&&e,s=(r||e).target,l=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||s,c=i.filter;if(function(e){li.length=0;for(var t=e.getElementsByTagName("input"),o=t.length;o--;){var i=t[o];i.checked&&li.push(i)}}(o),!Ao&&!(/mousedown|pointerdown/.test(n)&&0!==e.button||i.disabled)&&!l.isContentEditable&&(this.nativeDraggable||!Kt||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=oo(s,i.draggable,o,!1))&&s.animated||No===s)){if(Ro=mo(s),Lo=mo(s,i.draggable),"function"==typeof c){if(c.call(this,e,s,this))return Eo({sortable:t,rootEl:l,name:"filter",targetEl:s,toEl:o,fromEl:o}),Io("filter",t,{evt:e}),void(a&&e.preventDefault())}else if(c&&(c=c.split(",").some(function(i){if(i=oo(l,i.trim(),o,!1))return Eo({sortable:t,rootEl:i,name:"filter",targetEl:s,fromEl:o,toEl:o}),Io("filter",t,{evt:e}),!0})))return void(a&&e.preventDefault());i.handle&&!oo(l,i.handle,o,!1)||this._prepareDragStart(e,r,s)}}},_prepareDragStart:function(e,t,o){var i,a=this,n=a.el,r=a.options,s=n.ownerDocument;if(o&&!Ao&&o.parentNode===n){var l=ho(o);if(To=n,Do=(Ao=o).parentNode,Oo=Ao.nextSibling,No=o,Bo=r.group,wi.dragged=Ao,Uo={target:Ao,clientX:(t||e).clientX,clientY:(t||e).clientY},Ko=Uo.clientX-l.left,Go=Uo.clientY-l.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,Ao.style["will-change"]="all",i=function(){Io("delayEnded",a,{evt:e}),wi.eventCanceled?a._onDrop():(a._disableDelayedDragEvents(),!qt&&a.nativeDraggable&&(Ao.draggable=!0),a._triggerDragStart(e,t),Eo({sortable:a,name:"choose",originalEvent:e}),no(Ao,r.chosenClass,!0))},r.ignore.split(",").forEach(function(e){lo(Ao,e.trim(),xi)}),Xt(s,"dragover",yi),Xt(s,"mousemove",yi),Xt(s,"touchmove",yi),r.supportPointer?(Xt(s,"pointerup",a._onDrop),!this.nativeDraggable&&Xt(s,"pointercancel",a._onDrop)):(Xt(s,"mouseup",a._onDrop),Xt(s,"touchend",a._onDrop),Xt(s,"touchcancel",a._onDrop)),qt&&this.nativeDraggable&&(this.options.touchStartThreshold=4,Ao.draggable=!0),Io("delayStart",this,{evt:e}),!r.delay||r.delayOnTouchOnly&&!t||this.nativeDraggable&&(Zt||Vt))i();else{if(wi.eventCanceled)return void this._onDrop();r.supportPointer?(Xt(s,"pointerup",a._disableDelayedDrag),Xt(s,"pointercancel",a._disableDelayedDrag)):(Xt(s,"mouseup",a._disableDelayedDrag),Xt(s,"touchend",a._disableDelayedDrag),Xt(s,"touchcancel",a._disableDelayedDrag)),Xt(s,"mousemove",a._delayedDragTouchMoveHandler),Xt(s,"touchmove",a._delayedDragTouchMoveHandler),r.supportPointer&&Xt(s,"pointermove",a._delayedDragTouchMoveHandler),a._dragStartTimer=setTimeout(i,r.delay)}}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){Ao&&xi(Ao),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;Qt(e,"mouseup",this._disableDelayedDrag),Qt(e,"touchend",this._disableDelayedDrag),Qt(e,"touchcancel",this._disableDelayedDrag),Qt(e,"pointerup",this._disableDelayedDrag),Qt(e,"pointercancel",this._disableDelayedDrag),Qt(e,"mousemove",this._delayedDragTouchMoveHandler),Qt(e,"touchmove",this._delayedDragTouchMoveHandler),Qt(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||"touch"==e.pointerType&&e,!this.nativeDraggable||t?this.options.supportPointer?Xt(document,"pointermove",this._onTouchMove):Xt(document,t?"touchmove":"mousemove",this._onTouchMove):(Xt(Ao,"dragend",this),Xt(To,"dragstart",this._onDragStart));try{document.selection?Si(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch(e){}},_dragStarted:function(e,t){if(ti=!1,To&&Ao){Io("dragStarted",this,{evt:t}),this.nativeDraggable&&Xt(document,"dragover",bi);var o=this.options;!e&&no(Ao,o.dragClass,!1),no(Ao,o.ghostClass,!0),wi.active=this,e&&this._appendGhost(),Eo({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(Vo){this._lastX=Vo.clientX,this._lastY=Vo.clientY,vi();for(var e=document.elementFromPoint(Vo.clientX,Vo.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(Vo.clientX,Vo.clientY))!==t;)t=e;if(Ao.parentNode[$o]._isOutsideThisEl(e),t)do{if(t[$o]&&t[$o]._onDragOver({clientX:Vo.clientX,clientY:Vo.clientY,target:e,rootEl:t})&&!this.options.dragoverBubble)break;e=t}while(t=to(t));fi()}},_onTouchMove:function(e){if(Uo){var t=this.options,o=t.fallbackTolerance,i=t.fallbackOffset,a=e.touches?e.touches[0]:e,n=Po&&so(Po,!0),r=Po&&n&&n.a,s=Po&&n&&n.d,l=di&&ei&&vo(ei),c=(a.clientX-Uo.clientX+i.x)/(r||1)+(l?l[0]-ri[0]:0)/(r||1),d=(a.clientY-Uo.clientY+i.y)/(s||1)+(l?l[1]-ri[1]:0)/(s||1);if(!wi.active&&!ti){if(o&&Math.max(Math.abs(a.clientX-this._lastX),Math.abs(a.clientY-this._lastY))<o)return;this._onDragStart(e,!0)}if(Po){n?(n.e+=c-(Zo||0),n.f+=d-(qo||0)):n={a:1,b:0,c:0,d:1,e:c,f:d};var h="matrix(".concat(n.a,",").concat(n.b,",").concat(n.c,",").concat(n.d,",").concat(n.e,",").concat(n.f,")");ro(Po,"webkitTransform",h),ro(Po,"mozTransform",h),ro(Po,"msTransform",h),ro(Po,"transform",h),Zo=c,qo=d,Vo=a}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!Po){var e=this.options.fallbackOnBody?document.body:To,t=ho(Ao,!0,di,!0,e),o=this.options;if(di){for(ei=e;"static"===ro(ei,"position")&&"none"===ro(ei,"transform")&&ei!==document;)ei=ei.parentNode;ei!==document.body&&ei!==document.documentElement?(ei===document&&(ei=co()),t.top+=ei.scrollTop,t.left+=ei.scrollLeft):ei=co(),ri=vo(ei)}no(Po=Ao.cloneNode(!0),o.ghostClass,!1),no(Po,o.fallbackClass,!0),no(Po,o.dragClass,!0),ro(Po,"transition",""),ro(Po,"transform",""),ro(Po,"box-sizing","border-box"),ro(Po,"margin",0),ro(Po,"top",t.top),ro(Po,"left",t.left),ro(Po,"width",t.width),ro(Po,"height",t.height),ro(Po,"opacity","0.8"),ro(Po,"position",di?"absolute":"fixed"),ro(Po,"zIndex","100000"),ro(Po,"pointerEvents","none"),wi.ghost=Po,e.appendChild(Po),ro(Po,"transform-origin",Ko/parseInt(Po.style.width)*100+"% "+Go/parseInt(Po.style.height)*100+"%")}},_onDragStart:function(e,t){var o=this,i=e.dataTransfer,a=o.options;Io("dragStart",this,{evt:e}),wi.eventCanceled?this._onDrop():(Io("setupClone",this),wi.eventCanceled||((Fo=_o(Ao)).removeAttribute("id"),Fo.draggable=!1,Fo.style["will-change"]="",this._hideClone(),no(Fo,this.options.chosenClass,!1),wi.clone=Fo),o.cloneId=Si(function(){Io("clone",o),wi.eventCanceled||(o.options.removeCloneOnHide||To.insertBefore(Fo,Ao),o._hideClone(),Eo({sortable:o,name:"clone"}))}),!t&&no(Ao,a.dragClass,!0),t?(oi=!0,o._loopId=setInterval(o._emulateDragOver,50)):(Qt(document,"mouseup",o._onDrop),Qt(document,"touchend",o._onDrop),Qt(document,"touchcancel",o._onDrop),i&&(i.effectAllowed="move",a.setData&&a.setData.call(o,i,Ao)),Xt(document,"drop",o),ro(Ao,"transform","translateZ(0)")),ti=!0,o._dragStartId=Si(o._dragStarted.bind(o,t,e)),Xt(document,"selectstart",o),Jo=!0,window.getSelection().removeAllRanges(),Kt&&ro(document.body,"user-select","none"))},_onDragOver:function(e){var t,o,i,a,n=this.el,r=e.target,s=this.options,l=s.group,c=wi.active,d=Bo===l,h=s.sort,u=Wo||c,p=this,g=!1;if(!si){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),r=oo(r,s.draggable,n,!0),E("dragOver"),wi.eventCanceled)return g;if(Ao.contains(e.target)||r.animated&&r.animatingX&&r.animatingY||p._ignoreWhileAnimating===r)return D(!1);if(oi=!1,c&&!s.disabled&&(d?h||(i=Do!==To):Wo===this||(this.lastPutMode=Bo.checkPull(this,c,Ao,e))&&l.checkPut(this,c,Ao,e))){if(a="vertical"===this._getDirection(e,r),t=ho(Ao),E("dragOverValid"),wi.eventCanceled)return g;if(i)return Do=To,A(),this._hideClone(),E("revert"),wi.eventCanceled||(Oo?To.insertBefore(Ao,Oo):To.appendChild(Ao)),D(!0);var m=go(n,s.draggable);if(!m||function(e,t,o){var i=ho(go(o.el,o.options.draggable)),a=xo(o.el,o.options,Po);return t?e.clientX>a.right+10||e.clientY>i.bottom&&e.clientX>i.left:e.clientY>a.bottom+10||e.clientX>i.right&&e.clientY>i.top}(e,a,this)&&!m.animated){if(m===Ao)return D(!1);if(m&&n===e.target&&(r=m),r&&(o=ho(r)),!1!==_i(To,n,Ao,t,r,o,e,!!r))return A(),m&&m.nextSibling?n.insertBefore(Ao,m.nextSibling):n.appendChild(Ao),Do=n,P(),D(!0)}else if(m&&function(e,t,o){var i=ho(po(o.el,0,o.options,!0)),a=xo(o.el,o.options,Po);return t?e.clientX<a.left-10||e.clientY<i.top&&e.clientX<i.right:e.clientY<a.top-10||e.clientY<i.bottom&&e.clientX<i.left}(e,a,this)){var v=po(n,0,s,!0);if(v===Ao)return D(!1);if(o=ho(r=v),!1!==_i(To,n,Ao,t,r,o,e,!1))return A(),n.insertBefore(Ao,v),Do=n,P(),D(!0)}else if(r.parentNode===n){o=ho(r);var f,y,b,w=Ao.parentNode!==n,_=!function(e,t,o){var i=o?e.left:e.top,a=o?e.right:e.bottom,n=o?e.width:e.height,r=o?t.left:t.top,s=o?t.right:t.bottom,l=o?t.width:t.height;return i===r||a===s||i+n/2===r+l/2}(Ao.animated&&Ao.toRect||t,r.animated&&r.toRect||o,a),x=a?"top":"left",$=uo(r,"top","top")||uo(Ao,"top","top"),k=$?$.scrollTop:void 0;if(Yo!==r&&(y=o[x],ai=!1,ni=!_&&s.invertSwap||w),f=function(e,t,o,i,a,n,r,s){var l=i?e.clientY:e.clientX,c=i?o.height:o.width,d=i?o.top:o.left,h=i?o.bottom:o.right,u=!1;if(!r)if(s&&Qo<c*a){if(!ai&&(1===Xo?l>d+c*n/2:l<h-c*n/2)&&(ai=!0),ai)u=!0;else if(1===Xo?l<d+Qo:l>h-Qo)return-Xo}else if(l>d+c*(1-a)/2&&l<h-c*(1-a)/2)return function(e){return mo(Ao)<mo(e)?1:-1}(t);return(u=u||r)&&(l<d+c*n/2||l>h-c*n/2)?l>d+c/2?1:-1:0}(e,r,o,a,_?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,ni,Yo===r),0!==f){var S=mo(Ao);do{S-=f,b=Do.children[S]}while(b&&("none"===ro(b,"display")||b===Po))}if(0===f||b===r)return D(!1);Yo=r,Xo=f;var z=r.nextElementSibling,C=!1,I=_i(To,n,Ao,t,r,o,e,C=1===f);if(!1!==I)return 1!==I&&-1!==I||(C=1===I),si=!0,setTimeout($i,30),A(),C&&!z?n.appendChild(Ao):r.parentNode.insertBefore(Ao,C?z:r),$&&wo($,0,k-$.scrollTop),Do=Ao.parentNode,void 0===y||ni||(Qo=Math.abs(y-ho(r)[x])),P(),D(!0)}if(n.contains(Ao))return D(!1)}return!1}function E(s,l){Io(s,p,Bt({evt:e,isOwner:d,axis:a?"vertical":"horizontal",revert:i,dragRect:t,targetRect:o,canSort:h,fromSortable:u,target:r,completed:D,onMove:function(o,i){return _i(To,n,Ao,t,o,ho(o),e,i)},changed:P},l))}function A(){E("dragOverAnimationCapture"),p.captureAnimationState(),p!==u&&u.captureAnimationState()}function D(t){return E("dragOverCompleted",{insertion:t}),t&&(d?c._hideClone():c._showClone(p),p!==u&&(no(Ao,Wo?Wo.options.ghostClass:c.options.ghostClass,!1),no(Ao,s.ghostClass,!0)),Wo!==p&&p!==wi.active?Wo=p:p===wi.active&&Wo&&(Wo=null),u===p&&(p._ignoreWhileAnimating=r),p.animateAll(function(){E("dragOverAnimationComplete"),p._ignoreWhileAnimating=null}),p!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(r===Ao&&!Ao.animated||r===n&&!r.animated)&&(Yo=null),s.dragoverBubble||e.rootEl||r===document||(Ao.parentNode[$o]._isOutsideThisEl(e.target),!t&&yi(e)),!s.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),g=!0}function P(){jo=mo(Ao),Ho=mo(Ao,s.draggable),Eo({sortable:p,name:"change",toEl:n,newIndex:jo,newDraggableIndex:Ho,originalEvent:e})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){Qt(document,"mousemove",this._onTouchMove),Qt(document,"touchmove",this._onTouchMove),Qt(document,"pointermove",this._onTouchMove),Qt(document,"dragover",yi),Qt(document,"mousemove",yi),Qt(document,"touchmove",yi)},_offUpEvents:function(){var e=this.el.ownerDocument;Qt(e,"mouseup",this._onDrop),Qt(e,"touchend",this._onDrop),Qt(e,"pointerup",this._onDrop),Qt(e,"pointercancel",this._onDrop),Qt(e,"touchcancel",this._onDrop),Qt(document,"selectstart",this)},_onDrop:function(e){var t=this.el,o=this.options;jo=mo(Ao),Ho=mo(Ao,o.draggable),Io("drop",this,{evt:e}),Do=Ao&&Ao.parentNode,jo=mo(Ao),Ho=mo(Ao,o.draggable),wi.eventCanceled||(ti=!1,ni=!1,ai=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),zi(this.cloneId),zi(this._dragStartId),this.nativeDraggable&&(Qt(document,"drop",this),Qt(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),Kt&&ro(document.body,"user-select",""),ro(Ao,"transform",""),e&&(Jo&&(e.cancelable&&e.preventDefault(),!o.dropBubble&&e.stopPropagation()),Po&&Po.parentNode&&Po.parentNode.removeChild(Po),(To===Do||Wo&&"clone"!==Wo.lastPutMode)&&Fo&&Fo.parentNode&&Fo.parentNode.removeChild(Fo),Ao&&(this.nativeDraggable&&Qt(Ao,"dragend",this),xi(Ao),Ao.style["will-change"]="",Jo&&!ti&&no(Ao,Wo?Wo.options.ghostClass:this.options.ghostClass,!1),no(Ao,this.options.chosenClass,!1),Eo({sortable:this,name:"unchoose",toEl:Do,newIndex:null,newDraggableIndex:null,originalEvent:e}),To!==Do?(jo>=0&&(Eo({rootEl:Do,name:"add",toEl:Do,fromEl:To,originalEvent:e}),Eo({sortable:this,name:"remove",toEl:Do,originalEvent:e}),Eo({rootEl:Do,name:"sort",toEl:Do,fromEl:To,originalEvent:e}),Eo({sortable:this,name:"sort",toEl:Do,originalEvent:e})),Wo&&Wo.save()):jo!==Ro&&jo>=0&&(Eo({sortable:this,name:"update",toEl:Do,originalEvent:e}),Eo({sortable:this,name:"sort",toEl:Do,originalEvent:e})),wi.active&&(null!=jo&&-1!==jo||(jo=Ro,Ho=Lo),Eo({sortable:this,name:"end",toEl:Do,originalEvent:e}),this.save())))),this._nulling()},_nulling:function(){Io("nulling",this),To=Ao=Do=Po=Oo=Fo=No=Mo=Uo=Vo=Jo=jo=Ho=Ro=Lo=Yo=Xo=Wo=Bo=wi.dragged=wi.ghost=wi.clone=wi.active=null;var e=this.el;li.forEach(function(t){e.contains(t)&&(t.checked=!0)}),li.length=Zo=qo=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":Ao&&(this._onDragOver(e),function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}(e));break;case"selectstart":e.preventDefault()}},toArray:function(){for(var e,t=[],o=this.el.children,i=0,a=o.length,n=this.options;i<a;i++)oo(e=o[i],n.draggable,this.el,!1)&&t.push(e.getAttribute(n.dataIdAttr)||ki(e));return t},sort:function(e,t){var o={},i=this.el;this.toArray().forEach(function(e,t){var a=i.children[t];oo(a,this.options.draggable,i,!1)&&(o[e]=a)},this),t&&this.captureAnimationState(),e.forEach(function(e){o[e]&&(i.removeChild(o[e]),i.appendChild(o[e]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return oo(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var o=this.options;if(void 0===t)return o[e];var i=zo.modifyOption(this,e,t);o[e]=void 0!==i?i:t,"group"===e&&mi(o)},destroy:function(){Io("destroy",this);var e=this.el;e[$o]=null,Qt(e,"mousedown",this._onTapStart),Qt(e,"touchstart",this._onTapStart),Qt(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(Qt(e,"dragover",this),Qt(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),ii.splice(ii.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!Mo){if(Io("hideClone",this),wi.eventCanceled)return;ro(Fo,"display","none"),this.options.removeCloneOnHide&&Fo.parentNode&&Fo.parentNode.removeChild(Fo),Mo=!0}},_showClone:function(e){if("clone"===e.lastPutMode){if(Mo){if(Io("showClone",this),wi.eventCanceled)return;Ao.parentNode!=To||this.options.group.revertClone?Oo?To.insertBefore(Fo,Oo):To.appendChild(Fo):To.insertBefore(Fo,Ao),this.options.group.revertClone&&this.animate(Ao,Fo),ro(Fo,"display",""),Mo=!1}}else this._hideClone()}},ci&&Xt(document,"touchmove",function(e){(wi.active||ti)&&e.cancelable&&e.preventDefault()}),wi.utils={on:Xt,off:Qt,css:ro,find:lo,is:function(e,t){return!!oo(e,t,e,!1)},extend:function(e,t){if(e&&t)for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);return e},throttle:bo,closest:oo,toggleClass:no,clone:_o,index:mo,nextTick:Si,cancelNextTick:zi,detectDirection:gi,getChild:po,expando:$o},wi.get=function(e){return e[$o]},wi.mount=function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];t[0].constructor===Array&&(t=t[0]),t.forEach(function(e){if(!e.prototype||!e.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));e.utils&&(wi.utils=Bt(Bt({},wi.utils),e.utils)),zo.mount(e)})},wi.create=function(e,t){return new wi(e,t)},wi.version="1.15.7";var Ci,Ii,Ei,Ai,Di,Pi,Ti=[],Oi=!1;function Ni(){Ti.forEach(function(e){clearInterval(e.pid)}),Ti=[]}function Fi(){clearInterval(Pi)}var Mi=bo(function(e,t,o,i){if(t.scroll){var a,n=(e.touches?e.touches[0]:e).clientX,r=(e.touches?e.touches[0]:e).clientY,s=t.scrollSensitivity,l=t.scrollSpeed,c=co(),d=!1;Ii!==o&&(Ii=o,Ni(),Ci=t.scroll,a=t.scrollFn,!0===Ci&&(Ci=fo(o,!0)));var h=0,u=Ci;do{var p=u,g=ho(p),m=g.top,v=g.bottom,f=g.left,y=g.right,b=g.width,w=g.height,_=void 0,x=void 0,$=p.scrollWidth,k=p.scrollHeight,S=ro(p),z=p.scrollLeft,C=p.scrollTop;p===c?(_=b<$&&("auto"===S.overflowX||"scroll"===S.overflowX||"visible"===S.overflowX),x=w<k&&("auto"===S.overflowY||"scroll"===S.overflowY||"visible"===S.overflowY)):(_=b<$&&("auto"===S.overflowX||"scroll"===S.overflowX),x=w<k&&("auto"===S.overflowY||"scroll"===S.overflowY));var I=_&&(Math.abs(y-n)<=s&&z+b<$)-(Math.abs(f-n)<=s&&!!z),E=x&&(Math.abs(v-r)<=s&&C+w<k)-(Math.abs(m-r)<=s&&!!C);if(!Ti[h])for(var A=0;A<=h;A++)Ti[A]||(Ti[A]={});Ti[h].vx==I&&Ti[h].vy==E&&Ti[h].el===p||(Ti[h].el=p,Ti[h].vx=I,Ti[h].vy=E,clearInterval(Ti[h].pid),0==I&&0==E||(d=!0,Ti[h].pid=setInterval(function(){i&&0===this.layer&&wi.active._onTouchMove(Di);var t=Ti[this.layer].vy?Ti[this.layer].vy*l:0,o=Ti[this.layer].vx?Ti[this.layer].vx*l:0;"function"==typeof a&&"continue"!==a.call(wi.dragged.parentNode[$o],o,t,e,Di,Ti[this.layer].el)||wo(Ti[this.layer].el,o,t)}.bind({layer:h}),24))),h++}while(t.bubbleScroll&&u!==c&&(u=fo(u,!1)));Oi=d}},30),Ri=function(e){var t=e.originalEvent,o=e.putSortable,i=e.dragEl,a=e.activeSortable,n=e.dispatchSortableEvent,r=e.hideGhostForTarget,s=e.unhideGhostForTarget;if(t){var l=o||a;r();var c=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,d=document.elementFromPoint(c.clientX,c.clientY);s(),l&&!l.el.contains(d)&&(n("spill"),this.onSpill({dragEl:i,putSortable:o}))}};function ji(){}function Li(){}ji.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,o=e.putSortable;this.sortable.captureAnimationState(),o&&o.captureAnimationState();var i=po(this.sortable.el,this.startIndex,this.options);i?this.sortable.el.insertBefore(t,i):this.sortable.el.appendChild(t),this.sortable.animateAll(),o&&o.animateAll()},drop:Ri},Lt(ji,{pluginName:"revertOnSpill"}),Li.prototype={onSpill:function(e){var t=e.dragEl,o=e.putSortable||this.sortable;o.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),o.animateAll()},drop:Ri},Lt(Li,{pluginName:"removeOnSpill"}),wi.mount(new function(){function e(){for(var e in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}return e.prototype={dragStarted:function(e){var t=e.originalEvent;this.sortable.nativeDraggable?Xt(document,"dragover",this._handleAutoScroll):this.options.supportPointer?Xt(document,"pointermove",this._handleFallbackAutoScroll):t.touches?Xt(document,"touchmove",this._handleFallbackAutoScroll):Xt(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(e){var t=e.originalEvent;this.options.dragOverBubble||t.rootEl||this._handleAutoScroll(t)},drop:function(){this.sortable.nativeDraggable?Qt(document,"dragover",this._handleAutoScroll):(Qt(document,"pointermove",this._handleFallbackAutoScroll),Qt(document,"touchmove",this._handleFallbackAutoScroll),Qt(document,"mousemove",this._handleFallbackAutoScroll)),Fi(),Ni(),clearTimeout(io),io=void 0},nulling:function(){Di=Ii=Ci=Oi=Pi=Ei=Ai=null,Ti.length=0},_handleFallbackAutoScroll:function(e){this._handleAutoScroll(e,!0)},_handleAutoScroll:function(e,t){var o=this,i=(e.touches?e.touches[0]:e).clientX,a=(e.touches?e.touches[0]:e).clientY,n=document.elementFromPoint(i,a);if(Di=e,t||this.options.forceAutoScrollFallback||Zt||Vt||Kt){Mi(e,this.options,n,t);var r=fo(n,!0);!Oi||Pi&&i===Ei&&a===Ai||(Pi&&Fi(),Pi=setInterval(function(){var n=fo(document.elementFromPoint(i,a),!0);n!==r&&(r=n,Ni()),Mi(e,o.options,n,t)},10),Ei=i,Ai=a)}else{if(!this.options.bubbleScroll||fo(n,!0)===co())return void Ni();Mi(e,this.options,fo(n,!1),!1)}}},Lt(e,{pluginName:"scroll",initializeByDefault:!0})}),wi.mount(Li,ji);const Hi=wi;function Bi(e,t,o){if(t===o||t<0||o<0||t>=e.length||o>=e.length)return[...e];const i=[...e],[a]=i.splice(t,1);return i.splice(o,0,a),i}function Wi(e,t,o){return null===e?null:e===t?o:t<e&&e<=o?e-1:o<=e&&e<t?e+1:e}class Ui{constructor(e,t){this.host=e,this.options=t,this.setupRevision=0}schedule(){const e=++this.setupRevision;this.host.updateComplete.then(()=>{requestAnimationFrame(()=>{var t;if(e!==this.setupRevision||!this.host.isConnected)return;const o=null===(t=this.host.shadowRoot)||void 0===t?void 0:t.querySelector(this.options.containerSelector);o===this.element&&this.sortable||this.rebuild(null!=o?o:void 0)})})}disconnect(){this.setupRevision+=1,this.destroy()}destroy(){var e;null===(e=this.sortable)||void 0===e||e.destroy(),this.sortable=void 0,this.element=void 0,this.dragOrigin=void 0}rebuild(e){var t,o,i;this.destroy(),e&&(this.sortable=new Hi(e,{animation:150,draggable:null!==(t=this.options.draggable)&&void 0!==t?t:".sortable-item",handle:null!==(o=this.options.handle)&&void 0!==o?o:".sortable-drag-handle",ghostClass:null!==(i=this.options.ghostClass)&&void 0!==i?i:"sortable-list-ghost",onStart:e=>{this.dragOrigin={parent:e.from,next:e.item.nextSibling}},onEnd:e=>this.handleEnd(e)}),this.element=e)}handleEnd(e){const t=this.dragOrigin;this.dragOrigin=void 0,t&&t.parent.insertBefore(e.item,t.next),null!=e.oldIndex&&null!=e.newIndex&&e.oldIndex!==e.newIndex&&this.options.onMove(e.oldIndex,e.newIndex)}}var Vi;!function(e){e.Auto="auto",e.Left="left",e.Center="center",e.Right="right"}(Vi||(Vi={}));class Zi{constructor(){this.handlers=new Map}static getInstance(){return Zi.instance||(Zi.instance=new Zi),Zi.instance}registerHandler(e,t){this.handlers.set(e,t)}getHandler(e){return this.handlers.get(e)}}class qi extends tt{constructor(e,t={}){super(e,"action-bar-controller"),this.config={},this.config=t,this.registry=Zi.getInstance()}onHostConnected(){this.logger.debug("Action bar controller connected")}onHostDisconnected(){this.logger.debug("Action bar controller disconnected")}updateConfig(e){this.logger.debug("Updating ActionBarController config:",e),this.config={...this.config,...e},this.host.requestUpdate()}get actionBarConfig(){return this.config.actionBar}get isActionBarEnabled(){var e;return!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}registerActionHandler(e,t){this.logger.debug(`Registering handler for action type: ${e}`),this.registry.registerHandler(e,t)}getActionHandler(e){return this.registry.getHandler(e)}}const Ki=e=>(...t)=>({_$litDirective$:e,values:t});class Gi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const Ji=Ki(class extends Gi{constructor(e){if(super(e),6!==e.type)throw new Error("actionHandler must be attached to an element")}render(e){return Z}update(e,[t]){return this.attach(e.element,t||{}),Z}attach(e,t){if(e._actionHandlerOptions=t,e._actionHandlerAttached)return;let o;e._actionHandlerAttached=!0;let i,a=!1;const n=t=>{kt(e,"action",{action:t})},r=()=>{void 0!==o&&(window.clearTimeout(o),o=void 0)};e.addEventListener("pointerdown",()=>{var t;a=!1,(null===(t=e._actionHandlerOptions)||void 0===t?void 0:t.hasHold)&&(r(),o=window.setTimeout(()=>{a=!0,n("hold")},500))}),e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r),e.addEventListener("pointerleave",r),e.addEventListener("click",()=>{var t;a?a=!1:(null===(t=e._actionHandlerOptions)||void 0===t?void 0:t.hasDoubleClick)?void 0!==i?(window.clearTimeout(i),i=void 0,n("double_tap")):i=window.setTimeout(()=>{i=void 0,n("tap")},250):n("tap")}),e.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),n("tap"))})}});class Yi{constructor(){this.plugins=new Map,this.actionRegistry=Zi.getInstance()}static getInstance(){return Yi.instance||(Yi.instance=new Yi),Yi.instance}registerPlugin(e){const t=e.actionId;this.plugins.set(t,e)}registerPluginWithHandler(e){this.registerPlugin(e),this.actionRegistry.registerHandler(e.actionId,e.handler)}getAllPlugins(){return Array.from(this.plugins.values())}getPlugin(e){return this.plugins.get(e)}getAllActionIds(){return Array.from(this.plugins.keys())}}function Xi(e){Yi.getInstance().registerPluginWithHandler(e)}class Qi extends de{activate(){}deactivate(){}}var ea=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let ta=class extends Qi{get priority(){return 5}get isActive(){var e,t;return!this.transportationActive&&!0===(null===(e=this.config)||void 0===e?void 0:e.enabled)&&!!(null===(t=this.config.actions)||void 0===t?void 0:t.length)}constructor(){super(),this.transportationActive=!1,this.logger=ke("action-bar-component"),this.onActiveComponentChanged=e=>{"transportation"===e.componentName&&this.transportationActive!==e.state&&(this.transportationActive=e.state)},this.actionBarController=new qi(this,{actionBar:this.config})}connectedCallback(){super.connectedCallback(),this.transportationActive=ct.getInstance().isActive("transportation"),ot.getInstance().subscribe(it,this.onActiveComponentChanged)}disconnectedCallback(){ot.getInstance().unsubscribe(it,this.onActiveComponentChanged),super.disconnectedCallback()}get controller(){return this.actionBarController}getIconSize(){return gt(this.size,this.iconSize,"iconSize")}getButtonSize(){return function(e,t){if(e===ut.Custom&&t){const e=parseInt(t);return isNaN(e)?pt.buttonSize.medium:2*e+"px"}return gt(e,void 0,"buttonSize")}(this.size,this.iconSize)}updated(e){super.updated(e),e.has("config")&&(this.logger.debug("Config properties changed, updating ActionBarController"),this.actionBarController.updateConfig({actionBar:this.config}),ot.getInstance().publish(new rt)),e.has("hass")&&this.hass&&this.requestUpdate()}getFlexAlignment(){if(!this.config||!this.config.alignment)return"center";switch(this.config.alignment){case Vi.Left:return"flex-start";case Vi.Right:return"flex-end";case Vi.Center:default:return"center"}}render(){var e,t,o,i;if(this.transportationActive||!this.config||!1===this.config.enabled||!this.config.actions||0===this.config.actions.length)return U``;const a=null!==(e=this.config.orientation)&&void 0!==e?e:"horizontal",n=Number.isFinite(Number(this.config.columns))?Math.max(1,Math.min(6,Math.round(Number(this.config.columns)))):void 0,r=this.getFlexAlignment(),s=n?`justify-content: ${r}; align-content: center;`:"vertical"===a?"justify-content: center; align-items: center;":`justify-content: ${r}; align-items: center;`,l=n?"grid":a,c=this.config.alignment&&this.config.alignment!==Vi.Auto?this.config.alignment:Vi.Center,d=this.getButtonSize(),h=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.3,u=(null===(t=this.config.buttonGap)||void 0===t?void 0:t.trim())||"16px",p=!1===this.config.showButtonBackground?"flat-buttons":"",g=(null===(o=this.config.padding)||void 0===o?void 0:o.trim())||(p?"16px 16px 4px":"16px"),m=(null===(i=this.config.titleSize)||void 0===i?void 0:i.trim())||"18px";return this.logger.debug(`Rendering action bar - ButtonSize: ${d}`),U`
            <div class="action-bar-container ${l} align-${c} ${p}"
                style="color: ${this.fontColor}; 
                       ${s}
                       background-color: rgba(0, 0, 0, ${h});
                       --action-button-size: ${d};
                       --action-button-gap: ${u};
                       --action-columns: ${null!=n?n:1};
                       --action-bar-padding: ${g};
                       --action-title-size: ${m};">
                ${this.config.actions.map(e=>this.renderActionButton(e))}
            </div>
        `}renderActionButton(e){var t;const o=Yi.getInstance().getPlugin(e.actionId);let i=e.active||!1,a=e.icon;o&&"getIconForState"in o&&this.hass&&(a=o.getIconForState(e,this.hass)),o&&"getActiveState"in o&&(i=o.getActiveState());const n=i?"active":"",r=function(e,t,o){var i,a;if(!e.stateEntity||!t||!Array.isArray(e.stateRules))return o;const n=null!==(a=null===(i=t[e.stateEntity])||void 0===i?void 0:i.state)&&void 0!==a?a:"unavailable",r=e.stateRules.find(e=>e&&""!==e.state&&e.state===n);return r?{icon:r.icon||o.icon,color:r.color||o.color}:o}(e,null===(t=this.hass)||void 0===t?void 0:t.states,{icon:a,color:i?e.activeColor:e.color});a=r.icon;const s=i&&e.activeColor?`--active-icon-color: ${e.activeColor};`:"";return U`
            <div class="action-button ${n}"
                 style="${s}"
                 role="button"
                 tabindex="0"
                 aria-label="${e.title}"
                 ${Ji({hasHold:At(e.hold_action),hasDoubleClick:At(e.double_tap_action)})}
                 @action=${t=>{var o;return this._handleAction(e,(null===(o=t.detail)||void 0===o?void 0:o.action)||"tap")}}>
                ${l=a,Boolean(null==l?void 0:l.includes(":"))?U`<ha-icon .icon=${a}
                                   style="${r.color?`color: ${r.color};`:""}
                                          width: ${this.getIconSize()};
                                          height: ${this.getIconSize()};
                                          --mdc-icon-size: ${this.getIconSize()};">
                           </ha-icon>`:U`<svg viewBox="0 0 24 24"
                               style="${r.color?`fill: ${r.color};`:""}
                                      width: ${this.getIconSize()};
                                      height: ${this.getIconSize()};">
                        <path d="${a}"></path>
                      </svg>`}
                <div class="action-title">${e.title}</div>
            </div>
        `;var l}_handleAction(e,t){this.hass?(this.logger.debug(`Action ${t}:`,e),function(e,t,o,i="tap"){let a="hold"===i?e.hold_action:"double_tap"===i?e.double_tap_action:e.tap_action;var n;if(a&&(!(n=a)||"object"!=typeof n||Array.isArray(n)||"string"!=typeof n.action)&&(console.warn(`Ignoring invalid ${i} action config (expected an object with an "action" key):`,a),a=void 0),a){const n={...e},r=a.entity||a.entity_id||e.entity_id;return!n.entity&&r&&(n.entity=r),void Et(o||document.body,t,n,i)}if("tap"!==i)return;const r=Zi.getInstance().getHandler(e.actionId);r?r(e,t,o):console.warn(`No handler registered for action type: ${e.actionId}`)}(e,this.hass,this,t)):this.logger.error("Home Assistant instance not available")}};ta.styles=n`
        :host {
            display: block;
            width: 100%;
        }

        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own content. */
        .action-bar-container {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            z-index: 3;
            padding: var(--action-bar-padding, 16px);
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 0 0 var(--ha-card-border-radius, 4px) var(--ha-card-border-radius, 4px);
            gap: var(--action-button-gap, 16px);
            height: auto;
            min-height: var(--action-button-size, 144px);
        }

        .action-bar-container.horizontal {
            flex-direction: row;
            align-items: center;
        }

        .action-bar-container.vertical {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: fit-content;
            max-width: 100%;
            border-radius: var(--ha-card-border-radius, 4px);
        }

        .action-bar-container.grid {
            display: grid;
            grid-template-columns: repeat(var(--action-columns, 2), minmax(0, 1fr));
            grid-auto-rows: auto;
            place-content: center;
            align-items: center;
            width: 100%;
        }

        .action-bar-container.grid .action-button {
            width: min(var(--action-button-size, 144px), 100%);
            height: auto;
            aspect-ratio: 1;
            justify-self: center;
            min-width: 0;
        }

        .action-bar-container.grid .action-button svg,
        .action-bar-container.grid .action-button ha-icon {
            max-width: 50%;
            max-height: 50%;
        }

        .action-bar-container.vertical.align-left {
            margin-left: 0;
            margin-right: auto;
        }

        .action-bar-container.vertical.align-center {
            margin-left: auto;
            margin-right: auto;
        }

        .action-bar-container.vertical.align-right {
            margin-left: auto;
            margin-right: 0;
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

        .action-bar-container.flat-buttons .action-button {
            background-color: transparent;
        }

        .action-bar-container.flat-buttons .action-button:hover {
            background-color: rgba(255, 255, 255, 0.08);
        }

        .action-button:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
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
            max-width: 100%;
            overflow: hidden;
            font-size: var(--action-title-size, 18px);
            font-weight: 400;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    `,ea([me({type:Object})],ta.prototype,"config",void 0),ea([me({type:String})],ta.prototype,"fontColor",void 0),ea([me({type:Object})],ta.prototype,"hass",void 0),ea([me({type:String})],ta.prototype,"size",void 0),ea([me({type:String})],ta.prototype,"iconSize",void 0),ea([ve()],ta.prototype,"transportationActive",void 0),ta=ea([ue("ha-action-bar")],ta);const oa="action-navigate",ia=(e,t,o)=>{const{path:i,target:a}=e;"_blank"!==a?It(o||document.body,i):window.open(i,"_blank")};var aa,na=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};class ra extends de{t(e,t){return Je(e,this.hass,t)}updated(e){super.updated(e)}handleInputChange(e,t){t.stopPropagation(),t.preventDefault();const o=t.target;o&&this.actionChanged(this.index,e,o.value||"")}handleValueChange(e,t){t.stopPropagation(),t.preventDefault(),this.actionChanged(this.index,e,t.detail.value)}}na([me({type:Object})],ra.prototype,"hass",void 0),na([me({type:Object})],ra.prototype,"actionConfig",void 0),na([me({type:Number})],ra.prototype,"index",void 0),na([me({type:Function})],ra.prototype,"actionChanged",void 0),function(e){e.Left="left",e.Top="top",e.Hidden="hidden"}(aa||(aa={}));let sa=class extends ra{get navigationAction(){return this.actionConfig}render(){return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"text"}}}
                    .value=${this.navigationAction.path||""}
                    .label=${this.t("editor.action_plugin.navigation_path","Navigation path")}
                    .labelPosition=${aa.Hidden}
                    .helper=${this.t("editor.action_plugin.navigation_help","Path or URL to open")}
                    @value-changed=${e=>this.handleValueChange("path",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"_self",label:this.t("editor.action_plugin.current_tab","Current tab")},{value:"_blank",label:this.t("editor.action_plugin.new_tab","New tab")}],mode:"dropdown"}}}
                    .value=${this.navigationAction.target||"_self"}
                    .label=${this.t("editor.action_plugin.open_in","Open in")}
                    .labelPosition=${aa.Hidden}
                    .helper=${this.t("editor.action_plugin.navigation_help","Path or URL to open")}
                    @value-changed=${e=>this.handleValueChange("target",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.navigationAction.activeColor||"#ffeb3b"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.active_color_help","Color to use when the action is active")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};sa=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("navigation-editor-plugin")],sa);const la="action-ha",ca=(e,t,o)=>{Et(o||document.body,t,{entity:e.entity,tap_action:e.tap_action},"tap")};let da=class extends ra{get haAction(){return this.actionConfig}render(){return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.haAction.entity||""}
                    .required=${!1}
                    .label=${this.t("editor.action_plugin.entity","Entity")}
                    .helper=${this.t("editor.action_plugin.entity_more_info_help","Entity used by the more-info and toggle actions")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.tap_action}
                    .label=${this.t("editor.action_plugin.tap_action","Tap action")}
                    .helper=${this.t("editor.action_plugin.tap_help","Standard Home Assistant action to run on tap")}
                    .labelPosition=${aa.Top}
                    @value-changed=${e=>this.handleValueChange("tap_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.hold_action}
                    .required=${!1}
                    .label=${this.t("editor.action_plugin.hold_action","Hold action")}
                    .helper=${this.t("editor.action_plugin.hold_help","Standard Home Assistant action to run on hold")}
                    .labelPosition=${aa.Top}
                    @value-changed=${e=>this.handleValueChange("hold_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.double_tap_action}
                    .required=${!1}
                    .label=${this.t("editor.action_plugin.double_action","Double tap action")}
                    .helper=${this.t("editor.action_plugin.double_help","Standard Home Assistant action to run on double tap")}
                    .labelPosition=${aa.Top}
                    @value-changed=${e=>this.handleValueChange("double_tap_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.haAction.activeColor||"#ffeb3b"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.active_color_help","Color to use when the action is active")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};da=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("ha-action-editor-plugin")],da);const ha="call-service",ua=(e,t,o)=>{const{service:i,service_data:a,target:n,confirmation:r,confirmation_text:s}=e;Et(o||document.body,t,{tap_action:{action:"call-service",service:i,service_data:a,target:n,confirmation:r?{text:s||`Are you sure you want to call ${i}?`}:void 0}},"tap")};let pa=class extends ra{get serviceCallAction(){return this.actionConfig}get uiActionValue(){const{service:e,service_data:t,target:o}=this.serviceCallAction;return{action:"perform-action",perform_action:e||"",data:t,target:o}}_serviceChanged(e){var t,o,i;e.stopPropagation(),e.preventDefault();const a=e.detail.value||{};this.actionChanged(this.index,"service",null!==(o=null!==(t=a.perform_action)&&void 0!==t?t:a.service)&&void 0!==o?o:""),this.actionChanged(this.index,"service_data",null!==(i=a.data)&&void 0!==i?i:a.service_data),this.actionChanged(this.index,"target",a.target)}render(){return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{actions:["perform-action"],default_action:"perform-action"}}}
                    .value=${this.uiActionValue}
                    .label=${this.t("editor.action_plugin.service","Service")}
                    .helper=${this.t("editor.action_plugin.service_help","Service to call, including data and target")}
                    .labelPosition=${aa.Top}
                    @value-changed=${e=>this._serviceChanged(e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{boolean:{}}}
                    .value=${this.serviceCallAction.confirmation||!1}
                    .label=${this.t("editor.action_plugin.confirmation","Ask for confirmation")}
                    .helper=${this.t("editor.action_plugin.confirmation_help","Show a confirmation dialog before calling the service")}
                    .labelPosition=${aa.Left}
                    @value-changed=${e=>this.handleValueChange("confirmation",e)}
            ></ha-row-selector>

            ${this.serviceCallAction.confirmation?U`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{type:"text"}}}
                        .value=${this.serviceCallAction.confirmation_text||""}
                        .required=${!1}
                        .label=${this.t("editor.action_plugin.confirmation_text","Confirmation text")}
                        .helper=${this.t("editor.action_plugin.confirmation_text_help","Custom text for the confirmation dialog")}
                        .labelPosition=${aa.Hidden}
                        @value-changed=${e=>this.handleValueChange("confirmation_text",e)}
                ></ha-row-selector>
            `:""}

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.serviceCallAction.activeColor||"#ffeb3b"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.active_color_help","Color to use when the action is active")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};pa=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("service-call-editor-plugin")],pa);const ga="light-toggle",ma=(e,t)=>{const{entity_id:o}=e;o?t.states[o]?t.callService("light","toggle",{entity_id:o}):console.warn(`Entity ${o} not found`):console.warn("No entity_id specified for light toggle action")};let va=class extends ra{get lightToggleAction(){return this.actionConfig}render(){return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"light"}}}
                    .value=${this.lightToggleAction.entity_id||""}
                    .label=${this.t("editor.action_plugin.light_entity","Light entity")}
                    .helper=${this.t("editor.action_plugin.light_help","Select a light entity to toggle")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for light on state"}}}
                    .value=${this.lightToggleAction.icon_on||""}
                    .label=${this.t("editor.action_plugin.icon_on","Icon (on state)")}
                    .helper=${this.t("editor.action_plugin.light_icon_help","Icon to show when the light is on")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.lightToggleAction.activeColor||"#ffeb3b"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.light_color_help","Color to use when the light is on")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};va.styles=n`
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
    `,va=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("light-toggle-editor-plugin")],va);const fa="switch-toggle",ya=(e,t)=>{const{entity_id:o}=e;o?t.states[o]?t.callService("switch","toggle",{entity_id:o}):console.warn(`Entity ${o} not found`):console.warn("No entity_id specified for switch toggle action")};let ba=class extends ra{get switchToggleAction(){return this.actionConfig}render(){return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"switch"}}}
                    .value=${this.switchToggleAction.entity_id||""}
                    .label=${this.t("editor.action_plugin.switch_entity","Switch entity")}
                    .helper=${this.t("editor.action_plugin.switch_help","Select a switch entity to toggle")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for switch on state"}}}
                    .value=${this.switchToggleAction.icon_on||""}
                    .label=${this.t("editor.action_plugin.icon_on","Icon (on state)")}
                    .helper=${this.t("editor.action_plugin.switch_icon_help","Icon to show when the switch is on")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.switchToggleAction.activeColor||"#4CAF50"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.switch_color_help","Color to use when the switch is on")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};ba.styles=n`
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
    `,ba=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("switch-toggle-editor-plugin")],ba);const wa=ke("weather-update-plugin"),_a="weather-update",xa=(e,t)=>{wa.info("Weather update clicked"),ot.getInstance().publish(new nt)};class $a{constructor(){this.actionId=_a,this.name="Update Weather",this.description="Trigger an immediate weather update",this.icon="mdi:weather-partly-cloudy",this.handler=xa,this.editorTag="weather-update-editor-plugin"}defaultActionConfig(){return{actionId:_a,title:"Update Weather",icon:this.icon}}register(){Xi(this)}}function ka(){(new $a).register()}let Sa=class extends ra{get weatherUpdateAction(){return this.actionConfig}render(){return U`
            <div class="helper-text">
                ${this.t("editor.action_plugin.weather_update_help","This action triggers an immediate weather update. No additional configuration is needed.")}
            </div>
        `}};Sa.styles=n`
        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,Sa=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("weather-update-editor-plugin")],Sa),ka();const za="transportation",Ca=ke("transportation-plugin"),Ia=(e,t)=>{Ca.info("Transportation clicked"),ot.getInstance().publish(new st)};class Ea{constructor(){this.actionId=za,this.name="Transportation",this.description="Show transportation information",this.icon="mdi:bus-clock",this.handler=Ia,this.editorTag=""}defaultActionConfig(){return{actionId:za,title:"Transportation",icon:this.icon}}register(){Xi(this)}}function Aa(){(new Ea).register()}Aa();const Da="background-next",Pa=ke("background-next-plugin"),Ta=(e,t)=>{Pa.info("Background next clicked"),ot.getInstance().publish(new lt)};class Oa{constructor(){this.actionId=Da,this.name="Next Background",this.description="Show next background image",this.icon="mdi:image-refresh",this.handler=Ta,this.editorTag=""}defaultActionConfig(){return{actionId:Da,title:"Next Background",icon:this.icon}}register(){Xi(this)}}function Na(){(new Oa).register()}Na();const Fa="action-more-info",Ma=ke("more-info-plugin"),Ra=(e,t,o)=>{const{entity_id:i}=e;if(!i)return void Ma.warn("No entity_id specified for more-info action");const a=t.states[i];if(a){Ma.info(`Opening more-info for entity ${i} (${a.entity_id})`);try{const e={entityId:i,view:"info"};kt(o||document.body,"hass-more-info",e)}catch(e){Ma.warn("Error using fireEvent method:",e)}}else Ma.warn(`Entity ${i} not found`)};let ja=class extends ra{get moreInfoAction(){return this.actionConfig}render(){return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.moreInfoAction.entity_id||""}
                    .label=${this.t("editor.action_plugin.entity","Entity")}
                    .helper=${this.t("editor.action_plugin.more_info_help","Select an entity to show more information for")}
                    .labelPosition=${aa.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>
        `}};ja.styles=n`
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
    `,ja=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("more-info-editor-plugin")],ja),(new class{constructor(){this.actionId=oa,this.name="Navigate to Page",this.description="Navigate to a different page in Home Assistant",this.icon="mdi:arrow-right",this.handler=ia,this.editorTag="navigation-editor-plugin"}defaultActionConfig(){return{actionId:oa,title:"Navigate",icon:this.icon,path:"/"}}register(){Xi(this)}}).register(),(new class{constructor(){this.actionId=la,this.name="Home Assistant Action",this.description="Run a standard Home Assistant action (navigate, call service, more info, url, toggle)",this.icon="mdi:gesture-tap",this.handler=ca,this.editorTag="ha-action-editor-plugin"}defaultActionConfig(){return{actionId:la,title:"Action",icon:this.icon,tap_action:{action:"navigate",navigation_path:"/config"}}}register(){Xi(this)}}).register(),(new class{constructor(){this.actionId=ha,this.name="Call Service",this.description="Call a Home Assistant service",this.icon="mdi:lightbulb",this.handler=ua,this.editorTag="service-call-editor-plugin"}defaultActionConfig(){return{actionId:ha,service:"light.toggle",service_data:{entity_id:"light.living_room"},title:"Toggle Light",icon:this.icon}}register(){Xi(this)}}).register(),(new class{constructor(){this.actionId=ga,this.name="Toggle Light",this.description="Toggle a light on or off",this.icon="mdi:lightbulb",this.handler=ma,this.editorTag="light-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:o}=e;if(!o)return e.icon||this.icon;const i=t.states[o];return i?(this._lastActiveState="on"===i.state,this._lastActiveState?e.icon_on||"mdi:lightbulb-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:ga,entity_id:"",title:"Toggle Light",icon:this.icon,icon_on:"mdi:lightbulb-on"}}register(){Xi(this)}}).register(),(new class{constructor(){this.actionId=fa,this.name="Toggle Switch",this.description="Toggle a switch on or off",this.icon="mdi:toggle-switch-variant-off",this.handler=ya,this.editorTag="switch-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:o}=e;if(!o)return e.icon||this.icon;const i=t.states[o];return i?(this._lastActiveState="on"===i.state,this._lastActiveState?e.icon_on||"mdi:toggle-switch-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:fa,entity_id:"",title:"Toggle Switch",icon:this.icon,icon_on:"mdi:toggle-switch-variant"}}register(){Xi(this)}}).register(),ka(),Aa(),Na(),(new class{constructor(){this.actionId=Fa,this.name="Entity More Info",this.description="Open the default modal window of an entity",this.icon="mdi:information-outline",this.handler=Ra,this.editorTag="more-info-editor-plugin"}defaultActionConfig(){return{actionId:Fa,title:"More Info",icon:this.icon,entity_id:""}}register(){Xi(this)}}).register();var La=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};const Ha="actions.expansion";let Ba=class extends Rt{constructor(){super(...arguments),this._actions=[],this._expandedActionIndex=null,this.sortableList=new Ui(this,{containerSelector:".action-list",draggable:".action-item",handle:".action-drag-handle",ghostClass:"action-item-ghost",onMove:(e,t)=>this._moveAction(e,t)}),this._editorComponentCache=new Map}updated(e){super.updated(e),e.has("editorSessionKey")&&(this._expandedActionIndex=this.restoreExpandedIndex(Ha)),e.has("config")&&this.config&&this._loadActions(),this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}_loadActions(){var e;if(!(null===(e=this.config)||void 0===e?void 0:e.actionBar))return this._actions=[],void(this._expandedActionIndex=null);this.config.actionBar.actions&&this.config.actionBar.actions.length>0?this._actions=[...this.config.actionBar.actions]:this._actions=[],(0===this._actions.length||null!==this._expandedActionIndex&&this._expandedActionIndex>=this._actions.length)&&(this._expandedActionIndex=null),this._retainExpansionState()}_retainExpansionState(){this.retainExpandedIndex(Ha,this._expandedActionIndex)}_getActionTypeOptions(){return Yi.getInstance().getAllPlugins().map(e=>({value:e.actionId,label:this.t(`editor.actions.types.${e.actionId.replace(/-/g,"_")}`,e.name)}))}_getEditorTagName(e){const t=Yi.getInstance().getPlugin(e);return t&&t.editorTag?t.editorTag:null}_createEditorTagComponent(e,t){const o=this._getEditorTagName(e.actionId);if(!o)return"";const i=`${e.actionId}-${t}`;if(this._editorComponentCache.has(i)){const t=this._editorComponentCache.get(i);return this.hass&&(t.hass=this.hass),t.actionConfig=e,t}try{const a=document.createElement(o);return this.hass&&(a.hass=this.hass),a.actionConfig=e,a.index=t,a.actionChanged=this._actionChanged.bind(this),this._editorComponentCache.set(i,a),a}catch(e){return console.error(`Error creating editor component ${o}:`,e),""}}_addAction(){const e=this._getActionTypeOptions(),t=e.length>0?e[0].value:oa;let o;const i=Yi.getInstance().getPlugin(t);if(o=i&&i.defaultActionConfig?i.defaultActionConfig():{actionId:t,title:"Action",icon:"mdi:flash"},this._editorComponentCache.clear(),this._expandedActionIndex=this._actions.length,this._retainExpansionState(),this._actions=[...this._actions,o],this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],e.actionBar.enabled=!0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionUp(e){if(e<=0||e>=this._actions.length)return;this._editorComponentCache.clear();const t=[...this._actions],o=t[e];if(t[e]=t[e-1],t[e-1]=o,this._actions=t,this._expandedActionIndex===e?this._expandedActionIndex=e-1:this._expandedActionIndex===e-1&&(this._expandedActionIndex=e),this._retainExpansionState(),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionDown(e){if(e<0||e>=this._actions.length-1)return;this._editorComponentCache.clear();const t=[...this._actions],o=t[e];if(t[e]=t[e+1],t[e+1]=o,this._actions=t,this._expandedActionIndex===e?this._expandedActionIndex=e+1:this._expandedActionIndex===e+1&&(this._expandedActionIndex=e),this._retainExpansionState(),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeAction(e){if(this._editorComponentCache.clear(),this._actions=this._actions.filter((t,o)=>o!==e),0===this._actions.length||this._expandedActionIndex===e?this._expandedActionIndex=null:null!==this._expandedActionIndex&&this._expandedActionIndex>e&&(this._expandedActionIndex-=1),this._retainExpansionState(),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],0===this._actions.length&&(e.actionBar&&(e.actionBar.enabled=!1),e.actionBar=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_toggleAction(e){this._expandedActionIndex=this._expandedActionIndex===e?null:e,this._retainExpansionState()}_moveAction(e,t){if(this._editorComponentCache.clear(),this._expandedActionIndex=Wi(this._expandedActionIndex,e,t),this._retainExpansionState(),this._actions=Bi(this._actions,e,t),!this.config)return;const o=JSON.parse(JSON.stringify(this.config));o.actionBar||(o.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),o.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o}}))}_actionChanged(e,t,o){if("actionId"===t){const t=this._actions[e];if(t){const o=`${t.actionId}-${e}`;this._editorComponentCache.delete(o)}}if(this._actions=this._actions.map((i,a)=>a===e?{...i,[t]:o}:i),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_updateStateRule(e,t,o,i){i.stopPropagation();const a=(this._actions[e].stateRules||[]).map((e,a)=>{var n;return a===t?{...e,[o]:null!==(n=i.detail.value)&&void 0!==n?n:""}:e});this._actionChanged(e,"stateRules",a)}_renderAppearance(e,t){const o=e.stateRules||[];return U`
            <div class="state-appearance">
                <h4>${this.t("editor.actions.appearance","Appearance by entity state")}</h4>
                <ha-row-selector
                    .hass=${this.hass} .selector=${{color_hex:{}}}
                    .value=${e.color||""} .required=${!1}
                    .label=${this.t("editor.actions.default_color","Default icon color")}
                    .labelPosition=${aa.Top}
                    @value-changed=${e=>{e.stopPropagation(),this._actionChanged(t,"color",e.detail.value||"")}}
                ></ha-row-selector>
                <ha-row-selector
                    .hass=${this.hass} .selector=${{entity:{}}}
                    .value=${e.stateEntity||""} .required=${!1}
                    .label=${this.t("editor.actions.state_entity","Entity to track")}
                    .helper=${this.t("editor.actions.state_entity_help","Changes appearance only. Tap, hold and double-tap actions stay the same.")}
                    .labelPosition=${aa.Top}
                    @value-changed=${e=>{e.stopPropagation(),this._actionChanged(t,"stateEntity",e.detail.value||"")}}
                ></ha-row-selector>
                ${e.stateEntity||o.length?U`
                    <p class="info-text">${this.t("editor.actions.state_rules_help","The first matching state wins. Unmatched states use the normal button appearance. Add unknown and unavailable rules if needed.")}</p>
                    ${o.map((e,i)=>U`
                        <div class="state-rule">
                            <ha-row-selector
                                .hass=${this.hass} .selector=${{text:{}}}
                                .value=${e.state}
                                .label=${this.t("editor.actions.rule_state","State (for example open or closed)")}
                                .labelPosition=${aa.Top}
                                @value-changed=${e=>this._updateStateRule(t,i,"state",e)}
                            ></ha-row-selector>
                            <ha-row-selector
                                .hass=${this.hass} .selector=${{icon:{}}}
                                .value=${e.icon||""} .required=${!1}
                                .label=${this.t("editor.actions.icon","Icon")}
                                .labelPosition=${aa.Top}
                                @value-changed=${e=>this._updateStateRule(t,i,"icon",e)}
                            ></ha-row-selector>
                            <ha-row-selector
                                .hass=${this.hass} .selector=${{color_hex:{}}}
                                .value=${e.color||""} .required=${!1}
                                .label=${this.t("editor.actions.rule_color","Icon color")}
                                .labelPosition=${aa.Top}
                                @value-changed=${e=>this._updateStateRule(t,i,"color",e)}
                            ></ha-row-selector>
                            <button class="remove-state-rule" type="button"
                                @click=${()=>this._actionChanged(t,"stateRules",o.filter((e,t)=>t!==i))}>
                                ${this.t("editor.actions.remove_rule","Remove rule")}
                            </button>
                        </div>
                    `)}
                    <button class="add-action add-state-rule" type="button"
                        @click=${()=>this._actionChanged(t,"stateRules",[...o,{state:""}])}>
                        ${this.t("editor.actions.add_rule","Add state rule")}
                    </button>
                `:""}
            </div>
        `}static get styles(){return n`
            .content {
                padding: 12px;
            }

            .state-appearance {
                border-top: 1px solid var(--divider-color, #777);
                margin-top: 12px;
            }
            .state-appearance h4 { color: var(--primary-text-color); margin: 12px 0; }
            .state-rule {
                border: 1px solid var(--divider-color, #777);
                border-radius: 8px;
                padding: 8px;
                margin: 8px 0;
            }
            .remove-state-rule {
                background: transparent;
                color: var(--error-color, #db4437);
                border: 1px solid currentColor;
                border-radius: 6px;
                padding: 8px;
                cursor: pointer;
                font: inherit;
            }
            
            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
            }
            
            .action-item {
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
                border-radius: 8px;
                padding: 10px;
                margin: 10px 0;
                background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
            }

            .action-item.collapsed .action-header { margin-bottom: 0; }

            .action-header {
                display: flex;
                align-items: center;
                min-height: 36px;
                margin-bottom: 4px;
            }

            .action-drag-handle {
                display: grid;
                place-items: center;
                flex: 0 0 30px;
                width: 30px;
                height: 32px;
                color: var(--secondary-text-color, #aaa);
                cursor: grab;
                touch-action: none;
            }

            .action-drag-handle:active { cursor: grabbing; }
            .action-drag-handle ha-icon { --mdc-icon-size: 19px; }
            .action-item-ghost { opacity: 0.35; }

            .action-toggle {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding: 0 4px;
                border: 0;
                background: transparent;
                color: var(--primary-text-color, #fff);
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .action-item-title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
            }

            .action-icon-button {
                display: grid;
                place-items: center;
                flex: 0 0 32px;
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .action-icon-button ha-icon { --mdc-icon-size: 18px; }

            .action-icon-button:hover,
            .action-icon-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .action-icon-button.remove:hover { color: var(--error-color, #db4437); }

            .action-body {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
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

            .empty-actions {
                margin: 8px 0;
                padding: 12px;
                border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
                border-radius: 8px;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.85rem;
                text-align: center;
            }

            .add-action {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                min-height: 42px;
                margin-top: 10px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 8px;
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            .add-action:hover,
            .add-action:focus-visible {
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 28%, transparent);
                outline: none;
            }

            .add-action ha-icon {
                --mdc-icon-size: 19px;
            }
        `}render(){var e;if(!this.hass||!this.config)return U``;const t="all"===this.section||"content"===this.section,o="all"===this.section||"behavior"===this.section;return U`
            <div class="content">
                ${o?U`<ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}
                        .label=${this.t("editor.actions.enable","Enable action bar")}
                        propertyName="actionBar.enabled"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>`:""}

                ${t?U`
                    <div class="info-text">
                        ${this.t("editor.actions.description","Configure action buttons displayed in this widget.")}
                    </div>

                    <div class="section-subheader">${this.t("editor.actions.title","Actions")}</div>

                    ${0===this._actions.length?U`
                        <div class="empty-actions">${this.t("editor.actions.empty","No actions configured yet.")}</div>
                    `:""}
                    <div class="action-list">
                    ${this._actions.map((e,t)=>{const o=this._expandedActionIndex===t,i=Yi.getInstance().getPlugin(e.actionId),a=i?this.t(`editor.actions.types.${e.actionId.replace(/-/g,"_")}`,i.name):void 0,n=e.title||a||this.t("editor.actions.action","Action {number}",{number:t+1});return U`
                        <div class="action-item ${o?"":"collapsed"}">
                        <div class="action-header">
                            <span class="action-drag-handle"
                                  title=${this.t("designer.drag_to_move","Drag to move")}
                                  aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                <ha-icon icon="mdi:drag"></ha-icon>
                            </span>
                            <button class="action-toggle" type="button"
                                    aria-expanded=${o}
                                    @click=${()=>this._toggleAction(t)}>
                                <span class="action-item-title">${n}</span>
                            </button>
                            <button class="action-icon-button remove" type="button"
                                    title=${this.t("editor.actions.remove","Remove action")}
                                    aria-label=${this.t("editor.actions.remove","Remove action")}
                                    @click=${()=>this._removeAction(t)}>
                                <ha-icon icon="mdi:delete-outline"></ha-icon>
                            </button>
                            <button class="action-icon-button" type="button"
                                    title=${o?this.t("editor.actions.collapse","Collapse action"):this.t("editor.actions.expand","Expand action")}
                                    aria-label=${o?this.t("editor.actions.collapse","Collapse action"):this.t("editor.actions.expand","Expand action")}
                                    @click=${()=>this._toggleAction(t)}>
                                <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </button>
                        </div>
                        ${o?U`<div class="action-body">
                        <ha-row-selector
                                style="flex: 2;"
                                .hass=${this.hass}
                                .selector=${{select:{options:this._getActionTypeOptions(),mode:"dropdown"}}}
                                .value=${e.actionId}
                                .label=${this.t("editor.actions.type","Action type")}
                                .labelPosition=${aa.Hidden}
                                .helper=${this.t("editor.actions.select_type","Select action type")}
                                .actionButtons=${[...t>0?[{icon:"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",tooltip:this.t("editor.actions.move_up","Move action up"),eventName:"action-click-0"}]:[],...t<this._actions.length-1?[{icon:"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",tooltip:this.t("editor.actions.move_down","Move action down"),eventName:"action-click-1"}]:[]]}
                                @value-changed=${e=>{this._actionChanged(t,"actionId",e.detail.value)}}
                                @action-click-0=${t>0?()=>this._moveActionUp(t):null}
                                @action-click-1=${t<this._actions.length-1?()=>this._moveActionDown(t):null}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${e.title||""}
                                .label=${this.t("editor.actions.button_title","Title")}
                                .helper=${this.t("editor.actions.title_help","Title for the action button")}
                                .labelPosition=${aa.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const o=e.detail.value;this._actionChanged(t,"title",o||"")}}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{icon:{placeholder:"mdi:clock"}}}
                                .value=${e.icon||""}
                                .label=${this.t("editor.actions.icon","Icon")}
                                .helper=${this.t("editor.actions.icon_help","Icon for the action button")}
                                .labelPosition=${aa.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const o=e.detail.value;this._actionChanged(t,"icon",o||"")}}
                        ></ha-row-selector>

                        <!-- Editor components are now dynamically created by the factory pattern -->
                        ${this._createEditorTagComponent(e,t)}
                        ${this._renderAppearance(e,t)}
                        </div>`:""}
                        </div>
                    `})}
                    </div>

                    <button class="add-action" type="button" @click=${this._addAction}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${this.t("editor.actions.add","Add action")}
                    </button>
                `:""}
            </div>
        `}};La([me({type:Array})],Ba.prototype,"_actions",void 0),La([ve()],Ba.prototype,"_expandedActionIndex",void 0),Ba=La([ue("action-bar-editor")],Ba);var Wa=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Ua=class extends de{constructor(){super(...arguments),this.selected="",this.selectedTitle="",this.history=[],this.busy=!1,this.error=!1,this.request=0,this.browseTarget=""}t(e,t){return Je(`editor.background.${e}`,this.hass,t)}updated(e){this.hass&&(e.has("selected")||!this.current&&!this.error&&!this.busy&&e.has("hass"))&&this.browse(this.selected||"",!1)}disconnectedCallback(){this.request++,this.busy=!1,super.disconnectedCallback()}async browse(e,t=!0){if(!this.hass)return;const o=++this.request;this.browseTarget=e,this.busy=!0,this.error=!1;try{const i=await this.hass.callWS({type:"media_source/browse_media",...e?{media_content_id:e}:{}});if(o!==this.request)return;t&&this.current&&(this.history=[...this.history,this.current.media_content_id]),this.current=i}catch(e){o===this.request&&(this.error=!0)}finally{o===this.request&&(this.busy=!1)}}select(){!this.current||this.busy||this.error||this.dispatchEvent(new CustomEvent("media-selected",{detail:{id:this.current.media_content_id,title:this.current.title},bubbles:!0,composed:!0}))}render(){var e,t,o;const i=null!==(o=null===(t=null===(e=this.current)||void 0===e?void 0:e.children)||void 0===t?void 0:t.filter(e=>e.can_expand))&&void 0!==o?o:[],a=this.current?Re(this.current).length:0;return U`<div class="box">
            <p>${this.t("media_help","Choose an album or folder. Only its photos are used; subfolders and videos are skipped. Configure Immich in Home Assistant first.")}</p>
            ${this.selected?U`<p>${this.t("media_selected","Selected")}: ${this.selectedTitle||this.selected}</p>`:""}
            <div class="nav">
                <button type="button" ?disabled=${this.busy} @click=${()=>{this.history=[],this.browse("",!1)}}>${this.t("media_root","All media")}</button>
                <button type="button" ?disabled=${this.busy||!this.history.length} @click=${()=>{const e=this.history[this.history.length-1];this.history=this.history.slice(0,-1),this.browse(e,!1)}}>${this.t("media_back","Back")}</button>
            </div>
            ${this.busy?U`<p role="status">${this.t("media_loading","Loading media…")}</p>`:""}
            ${this.error?U`<p class="error" role="alert">${this.t("media_error","Could not load media. Check the integration and its permissions.")}</p>
                <button type="button" @click=${()=>this.browse(this.browseTarget,!1)}>${this.t("media_retry","Retry")}</button>`:""}
            ${!this.current||this.busy||this.error?"":U`
                <h4>${this.current.title}</h4>
                <div class="folders">${i.map(e=>U`<button type="button" @click=${()=>this.browse(e.media_content_id)}>📁 ${e.title}</button>`)}</div>
                <p>${this.t("media_photo_count","Photos in this folder")}: ${a}</p>
                <button class="select" type="button" ?disabled=${0===a} @click=${this.select}>${this.t("media_use","Use this album / folder")}</button>
            `}
        </div>`}};Ua.styles=n`
        :host { display:block; margin:12px 0; }
        .box { border:1px solid var(--divider-color); border-radius:8px; padding:12px; }
        p { color:var(--secondary-text-color); font-size:13px; overflow-wrap:anywhere; }
        h4 { margin:12px 0; }
        button { color:var(--primary-color); background:transparent; border:1px solid var(--divider-color);
            border-radius:6px; padding:10px; font:inherit; cursor:pointer; }
        button:disabled { opacity:.5; cursor:default; }
        .nav { display:flex; gap:8px; }
        .folders { display:flex; flex-direction:column; gap:6px; max-height:280px; overflow:auto; margin:12px 0; }
        .folders button { text-align:left; overflow-wrap:anywhere; }
        .select { width:100%; }
        .error { color:var(--error-color); }
    `,Wa([me({attribute:!1})],Ua.prototype,"hass",void 0),Wa([me()],Ua.prototype,"selected",void 0),Wa([me()],Ua.prototype,"selectedTitle",void 0),Wa([ve()],Ua.prototype,"current",void 0),Wa([ve()],Ua.prototype,"history",void 0),Wa([ve()],Ua.prototype,"busy",void 0),Wa([ve()],Ua.prototype,"error",void 0),Ua=Wa([ue("wcc-media-browser")],Ua);var Va=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};const Za="background-images.expansion";let qa=class extends Rt{constructor(){super(...arguments),this._backgroundImages=[],this._expandedImageIndex=null,this.sortableList=new Ui(this,{containerSelector:".image-list",draggable:".image-card",handle:".image-drag-handle",ghostClass:"image-card-ghost",onMove:(e,t)=>this._moveBackgroundImage(e,t)})}_imageSourceOptions(){return[{value:"none",label:this.t("editor.background.source_none","None (no background images)")},{value:"picsum",label:this.t("editor.background.source_picsum","Picsum photos")},{value:"local",label:this.t("editor.background.source_local","Local images")},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:this.t("editor.background.source_sensor","Sensor images")},{value:"media-source",label:this.t("editor.background.source_media","Home Assistant media")}]}_objectFitOptions(){return[{value:"fill",label:this.t("editor.background.fit_fill","Fill")},{value:"contain",label:this.t("editor.background.fit_contain","Contain")},{value:"cover",label:this.t("editor.background.fit_cover","Cover")},{value:"none",label:this.t("ui.none","None")},{value:"scale-down",label:this.t("editor.background.fit_scale_down","Scale down")}]}updated(e){super.updated(e),e.has("editorSessionKey")&&(this._expandedImageIndex=this.restoreExpandedIndex(Za)),e.has("config")&&this.config&&this._loadBackgroundImages(),this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}_loadBackgroundImages(){var e;(null===(e=this.config)||void 0===e?void 0:e.backgroundImages)&&this.config.backgroundImages.length>0?this._backgroundImages=[...this.config.backgroundImages]:this._backgroundImages=[],(0===this._backgroundImages.length||null!==this._expandedImageIndex&&this._expandedImageIndex>=this._backgroundImages.length)&&(this._expandedImageIndex=null),this._retainExpansionState()}_retainExpansionState(){this.retainExpandedIndex(Za,this._expandedImageIndex)}_addBackgroundImage(){this._expandedImageIndex=this._backgroundImages.length,this._retainExpansionState(),this._backgroundImages=[...this._backgroundImages,{url:"",weather:Ee.All,timeOfDay:Ie.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,o)=>o!==e),0===this._backgroundImages.length||this._expandedImageIndex===e?this._expandedImageIndex=null:null!==this._expandedImageIndex&&this._expandedImageIndex>e&&(this._expandedImageIndex-=1),this._retainExpansionState(),this._updateBackgroundImagesConfig()}_toggleImage(e){this._expandedImageIndex=this._expandedImageIndex===e?null:e,this._retainExpansionState()}_moveBackgroundImage(e,t){this._expandedImageIndex=Wi(this._expandedImageIndex,e,t),this._retainExpansionState(),this._backgroundImages=Bi(this._backgroundImages,e,t),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this.config){const e=JSON.parse(JSON.stringify(this.config));e.backgroundImages=[...this._backgroundImages],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return n`
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
            
            .image-card {
                margin: 10px 0;
                padding: 8px 10px 10px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
                border-radius: 8px;
                background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
            }

            .image-card.collapsed .image-header { margin-bottom: 0; }

            .image-header {
                display: flex;
                align-items: center;
                min-height: 36px;
                margin-bottom: 2px;
            }

            .image-drag-handle {
                display: grid;
                place-items: center;
                flex: 0 0 30px;
                width: 30px;
                height: 32px;
                color: var(--secondary-text-color, #aaa);
                cursor: grab;
                touch-action: none;
            }

            .image-drag-handle:active { cursor: grabbing; }
            .image-drag-handle ha-icon { --mdc-icon-size: 19px; }
            .image-card-ghost { opacity: 0.35; }

            .image-toggle {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding: 0 4px;
                border: 0;
                background: transparent;
                color: var(--primary-text-color, #fff);
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .image-title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.9rem;
                font-weight: 600;
            }

            .image-icon-button {
                display: grid;
                place-items: center;
                flex: 0 0 32px;
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .image-icon-button ha-icon { --mdc-icon-size: 18px; }

            .image-icon-button:hover,
            .image-icon-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .image-icon-button.remove:hover { color: var(--error-color, #db4437); }

            .image-body {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .image-body ha-row-selector {
                display: block;
                width: 100%;
                padding: 3px 0;
            }

            .add-image {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                min-height: 42px;
                margin-top: 10px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 8px;
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            .add-image:hover,
            .add-image:focus-visible {
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 28%, transparent);
                outline: none;
            }

            .add-image ha-icon {
                --mdc-icon-size: 19px;
            }
        `}render(){var e,t,o,i;return this.hass&&this.config?U`
            <div class="content">
                <div class="section-subheader">${this.t("editor.background.source_group","Image source")}</div>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!0===this.config.backgroundTransparent}
                        .label=${this.t("editor.background.transparent","Transparent card background")}
                        .helper=${this.t("editor.background.transparent_help","Removes the card background, border and shadow. Select no image to reveal the dashboard wallpaper.")}
                        propertyName="backgroundTransparent"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._imageSourceOptions(),mode:"dropdown"}}}
                        .value=${this.config.imageSource||"none"}
                        .label=${this.t("editor.background.source","Image source")}
                        propertyName="imageSource"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${"local"===this.config.imageSource?this._renderLocalImagesSection():""}
                ${"unsplash"===this.config.imageSource?this._renderUnsplashSection():""}
                ${"sensor"===this.config.imageSource?this._renderSensorImagesSection():""}
                ${"media-source"===this.config.imageSource?U`
                    <wcc-media-browser .hass=${this.hass}
                        .selected=${(null===(e=this.config.imageConfig)||void 0===e?void 0:e.mediaContentId)||""}
                        .selectedTitle=${(null===(t=this.config.imageConfig)||void 0===t?void 0:t.mediaTitle)||""}
                        @media-selected=${e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this.config,imageConfig:{mediaContentId:e.detail.id,mediaTitle:e.detail.title}}}}))}}></wcc-media-browser>
                `:""}

                <div class="section-subheader">${this.t("editor.background.appearance","Image appearance")}</div>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:0,max:1,step:.05,mode:"slider",slider_ticks:!0}}}
                        .value=${void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5}
                        .label=${this.t("editor.background.opacity","Background opacity")}
                        propertyName="backgroundOpacity"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:0,max:30,step:1,mode:"slider",slider_ticks:!0}}}
                        .value=${null!==(o=this.config.backgroundBlur)&&void 0!==o?o:0}
                        .label=${this.t("editor.background.blur","Background blur (px)")}
                        propertyName="backgroundBlur"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:0,max:1,step:.05,mode:"slider",slider_ticks:!0}}}
                        .value=${null!==(i=this.config.backgroundGrayscale)&&void 0!==i?i:0}
                        .label=${this.t("editor.background.grayscale","Background grayscale")}
                        propertyName="backgroundGrayscale"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._objectFitOptions(),mode:"dropdown"}}}
                        .value=${this.config.objectFit||"cover"}
                        .label=${this.t("editor.background.fit","Background image fit")}
                        propertyName="objectFit"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <div class="section-subheader">${this.t("editor.background.rotation_group","Image rotation")}</div>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:30,max:300,step:10,mode:"slider",slider_ticks:!0}}}
                        .value=${this.config.backgroundRotationInterval||90}
                        .label=${this.t("editor.background.rotation","Rotation interval (seconds)")}
                        propertyName="backgroundRotationInterval"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `:U``}_renderLocalImagesSection(){return U`
            <div class="info-text">
                ${this.t("editor.background.local_help","Configure local image URLs. Weather and time-of-day conditions can be selected for each image.")}
            </div>

            <div class="section-subheader">${this.t("editor.background.images","Background images")}</div>

            <div class="image-list">
            ${this._backgroundImages.map((e,t)=>{const o=this._expandedImageIndex===t,i=e.url||this.t("editor.background.image","Background image {number}",{number:t+1});return U`
                <div class="image-card ${o?"":"collapsed"}">
                    <div class="image-header">
                        <span class="image-drag-handle"
                              title=${this.t("designer.drag_to_move","Drag to move")}
                              aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                            <ha-icon icon="mdi:drag"></ha-icon>
                        </span>
                        <button class="image-toggle" type="button"
                                aria-expanded=${o}
                                @click=${()=>this._toggleImage(t)}>
                            <span class="image-title">${i}</span>
                        </button>
                        <button class="image-icon-button remove" type="button"
                                title=${this.t("editor.background.remove","Remove background image")}
                                aria-label=${this.t("editor.background.remove","Remove background image")}
                                @click=${()=>this._removeBackgroundImage(t)}>
                            <ha-icon icon="mdi:delete-outline"></ha-icon>
                        </button>
                        <button class="image-icon-button" type="button"
                                title=${o?this.t("editor.background.collapse","Collapse background image"):this.t("editor.background.expand","Expand background image")}
                                aria-label=${o?this.t("editor.background.collapse","Collapse background image"):this.t("editor.background.expand","Expand background image")}
                                @click=${()=>this._toggleImage(t)}>
                            <ha-icon icon=${o?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                        </button>
                    </div>
                    ${o?U`<div class="image-body">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${e.url||""}
                                .label=${this.t("editor.background.url","Image URL")}
                                propertyName="backgroundImages.${t}.url"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:Object.values(Ee).map(e=>({value:e,label:e===Ee.All?this.t("editor.background.weather_any","Any weather"):e}))}}}
                                .value=${e.weather}
                                .label=${this.t("editor.background.weather","Weather condition")}
                                propertyName="backgroundImages.${t}.weather"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:Object.values(Ie).map(e=>({value:e,label:e===Ie.Unspecified?this.t("editor.background.time_any","Any time"):e}))}}}
                                .value=${e.timeOfDay}
                                .label=${this.t("editor.background.time","Time of day")}
                                propertyName="backgroundImages.${t}.timeOfDay"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>`:""}
                </div>
            `})}
            </div>

            <button class="add-image" type="button" @click=${this._addBackgroundImage}>
                <ha-icon icon="mdi:plus"></ha-icon>
                ${this.t("editor.background.add","Add background image")}
            </button>
        `}_renderUnsplashSection(){var e,t,o,i;return U`
            <div class="info-text">
                ${this.t("editor.background.unsplash_help","Configure Unsplash image source settings. An API key is required.")}
            </div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"text"}}}
                    .value=${(null===(e=this.config.imageConfig)||void 0===e?void 0:e.category)||"nature"}
                    .label=${this.t("editor.background.category","Category")}
                    propertyName="imageConfig.category"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <ha-row-selector
                    min="1"
                    max="30"
                    .hass=${this.hass}
                    .selector=${{text:{type:"number"}}}
                    .value=${(null===(t=this.config.imageConfig)||void 0===t?void 0:t.count)||"5"}
                    .label=${this.t("editor.background.photo_count","Number of photos")}
                    propertyName="imageConfig.count"
                    .transformData=${e=>{let t=parseInt(e||"5",10);return(isNaN(t)||t<1)&&(t=1),t>30&&(t=30),t}}
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <div class="info-text">
                ${this.t("editor.background.api_help","Without a valid API key, the Unsplash image source will not work.")}
            </div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"password"}}}
                    .value=${(null===(o=this.config.imageConfig)||void 0===o?void 0:o.apiKey)||""}
                    .label=${this.t("editor.background.api_key","API key")}
                    propertyName="imageConfig.apiKey"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"low",label:"Low"},{value:"high",label:"High"}],mode:"dropdown"}}}
                    .value=${(null===(i=this.config.imageConfig)||void 0===i?void 0:i.contentFilter)||"high"}
                    .label=${this.t("editor.background.content_filter","Content filter")}
                    propertyName="imageConfig.contentFilter"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>
        `}_renderSensorImagesSection(){var e;return U`
            <div class="info-text">
                ${this.t("editor.background.sensor_help","Select a sensor whose files attribute contains an array of image URLs.")}
            </div>

            <ha-row-selector
                    .hass=${this.hass}
                    .labelPosition=${"top"}
                    .selector=${{entity:{include_entities:this.hass?Object.keys(this.hass.states).filter(e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e];return t&&t.attributes&&void 0!==t.attributes.files}):[]}}}
                    .value=${(null===(e=this.config.imageConfig)||void 0===e?void 0:e.entity)||""}
                    .label=${this.t("editor.background.sensor_entity","Sensor entity")}
                    propertyName="imageConfig.entity"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <div class="info-text">
                ${this.t("editor.background.sensor_files_help","The sensor must expose a files attribute containing image URLs.")}
            </div>
        `}};Va([me({type:Array})],qa.prototype,"_backgroundImages",void 0),Va([ve()],qa.prototype,"_expandedImageIndex",void 0),qa=Va([ue("background-editor")],qa);var Ka=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};const Ga="calendar-sources.expansion";let Ja=class extends Rt{constructor(){super(...arguments),this.sourcesOnly=!1,this.sources=[],this.addingAll=!1,this.expandedSourceIndex=null,this.sortableList=new Ui(this,{containerSelector:".source-list",draggable:".source-card",handle:".source-drag-handle",ghostClass:"source-card-ghost",onMove:(e,t)=>this.moveSource(e,t)})}updated(e){var t;if(super.updated(e),e.has("editorSessionKey")&&(this.expandedSourceIndex=this.restoreExpandedIndex(Ga)),e.has("config")){const e=this.config;this.sources=(null!==(t=e.entities)&&void 0!==t?t:[]).map(e=>({...e})),null!==this.expandedSourceIndex&&this.expandedSourceIndex>=this.sources.length&&(this.expandedSourceIndex=null),this.retainExpansionState()}this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}emitSources(e){this.sources=e,kt(this,"config-changed",{config:{...this.config,entities:e.map(e=>({...e}))}})}retainExpansionState(){this.retainExpandedIndex(Ga,this.expandedSourceIndex)}addSource(){this.expandedSourceIndex=this.sources.length,this.retainExpansionState(),this.emitSources([...this.sources,{entity:"",color:"#4fc3f7"}])}removeSource(e){this.expandedSourceIndex===e?this.expandedSourceIndex=null:null!==this.expandedSourceIndex&&this.expandedSourceIndex>e&&this.expandedSourceIndex--,this.retainExpansionState(),this.emitSources(this.sources.filter((t,o)=>o!==e))}toggleSource(e){this.expandedSourceIndex=this.expandedSourceIndex===e?null:e,this.retainExpansionState()}moveSource(e,t){this.expandedSourceIndex=Wi(this.expandedSourceIndex,e,t),this.retainExpansionState(),this.emitSources(Bi(this.sources,e,t))}updateSource(e,t,o){this.emitSources(this.sources.map((i,a)=>a===e?{...i,[t]:o}:i))}async addAllCalendars(){if(this.hass&&!this.addingAll){this.addingAll=!0;try{let e=[];try{e=await this.hass.callApi("GET","calendars")}catch(t){e=Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("calendar.")).map(e=>{var t;return{entity_id:e.entity_id,name:String(null!==(t=e.attributes.friendly_name)&&void 0!==t?t:e.entity_id)}})}const t=new Set(this.sources.map(e=>e.entity)),o=["#4fc3f7","#ff6b6b","#66bb6a","#ffca28","#ab47bc","#26a69a"],i=e.filter(e=>e.entity_id&&!t.has(e.entity_id)).map((e,t)=>({entity:e.entity_id,label:e.name||void 0,color:o[(this.sources.length+t)%o.length]}));i.length>0&&(this.expandedSourceIndex=this.sources.length,this.retainExpansionState(),this.emitSources([...this.sources,...i]))}finally{this.addingAll=!1}}}render(){var e,t,o,i,a,n,r;if(!this.hass||!this.config)return U``;const s=this.config,l="all"===this.section||"content"===this.section,c="all"===this.section||"appearance"===this.section,d="all"===this.section||"behavior"===this.section;return U`
            <div class="content">
                ${l?U`
                    <div class="section-title">${this.t("editor.calendar.calendars","Calendars")}</div>
                    ${0===this.sources.length?U`<div class="empty">${this.t("editor.calendar.empty","Add one or more Home Assistant calendar entities.")}</div>`:""}
                    <div class="source-list">
                        ${this.sources.map((e,t)=>{var o,i;const a=this.expandedSourceIndex===t;return U`
                            <div class="source-card ${a?"expanded":"collapsed"}">
                                <div class="source-header">
                                    <span class="source-drag-handle"
                                          title=${this.t("designer.drag_to_move","Drag to move")}
                                          aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                        <ha-icon icon="mdi:drag"></ha-icon>
                                    </span>
                                    <button class="source-toggle"
                                            type="button"
                                            aria-expanded=${a?"true":"false"}
                                            @click=${()=>this.toggleSource(t)}>
                                        <span class="source-title">
                                            <span class="source-color" style=${`--source-color:${e.color||"#4fc3f7"}`}></span>
                                            ${e.label||e.entity||this.t("editor.calendar.calendar","Calendar {number}",{number:t+1})}
                                        </span>
                                    </button>
                                    <button class="source-icon-button remove"
                                            type="button"
                                            title=${this.t("editor.calendar.remove","Remove calendar")}
                                            aria-label=${this.t("editor.calendar.remove","Remove calendar")}
                                            @click=${()=>this.removeSource(t)}>
                                        <ha-icon icon="mdi:delete-outline"></ha-icon>
                                    </button>
                                    <button class="source-icon-button"
                                            type="button"
                                            title=${a?this.t("editor.calendar.collapse","Collapse calendar"):this.t("editor.calendar.expand","Expand calendar")}
                                            aria-label=${a?this.t("editor.calendar.collapse","Collapse calendar"):this.t("editor.calendar.expand","Expand calendar")}
                                            aria-expanded=${a?"true":"false"}
                                            @click=${()=>this.toggleSource(t)}>
                                        <ha-icon .icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                                    </button>
                                </div>
                                ${a?U`<div class="source-body">
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{entity:{filter:{domain:"calendar"}}}}
                                        .value=${e.entity}
                                        .label=${this.t("editor.calendar.entity","Calendar entity")}
                                        .labelPosition=${aa.Top}
                                        @value-changed=${e=>this.updateSource(t,"entity",e.detail.value)}>
                                </ha-row-selector>
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{type:"text"}}}
                                        .value=${null!==(o=e.label)&&void 0!==o?o:""}
                                        .label=${this.t("editor.calendar.label","Label (optional)")}
                                        .labelPosition=${aa.Top}
                                        @value-changed=${e=>this.updateSource(t,"label",e.detail.value)}>
                                </ha-row-selector>
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{color_hex:""}}
                                        .value=${null!==(i=e.color)&&void 0!==i?i:"#4fc3f7"}
                                        .label=${this.t("editor.calendar.event_color","Event color")}
                                        .labelPosition=${aa.Top}
                                        @value-changed=${e=>this.updateSource(t,"color",e.detail.value)}>
                                </ha-row-selector>
                                </div>`:""}
                            </div>
                        `})}
                    </div>

                    <div class="button-row">
                        <button type="button" @click=${this.addSource}>
                            <ha-icon icon="mdi:plus"></ha-icon> ${this.t("editor.calendar.add","Add calendar")}
                        </button>
                        <button type="button" ?disabled=${this.addingAll} @click=${this.addAllCalendars}>
                            <ha-icon icon="mdi:calendar-multiple"></ha-icon> ${this.t("editor.calendar.add_all","Add all")}
                        </button>
                    </div>

                    ${this.sourcesOnly?"":U`<div class="section-title">${this.t("editor.calendar.range","Event range")}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:[{value:"agenda",label:this.t("editor.calendar.agenda","Agenda")},{value:"today",label:this.t("editor.calendar.today_only","Today only")}],mode:"dropdown"}}}
                                .value=${null!==(e=s.displayMode)&&void 0!==e?e:"agenda"}
                                .label=${this.t("editor.calendar.display_mode","Display mode")}
                                propertyName="displayMode"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        ${"today"!==s.displayMode?U`
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:1,max:31,step:1,mode:"box"}}}
                                    .value=${null!==(t=s.daysAhead)&&void 0!==t?t:7}
                                    .label=${this.t("editor.calendar.days_ahead","Days ahead")}
                                    propertyName="daysAhead"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        `:""}
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:1,max:100,step:1,mode:"box"}}}
                                .value=${null!==(o=s.maxEvents)&&void 0!==o?o:8}
                                .label=${this.t("editor.calendar.maximum_events","Maximum events")}
                                propertyName="maxEvents"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>

                    <div class="section-title">${this.t("editor.calendar.details","Event details")}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${!1!==s.showAllDay}
                                .label=${this.t("editor.calendar.show_all_day","Show all-day events")}
                                propertyName="showAllDay"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${!1!==s.showLocation}
                                .label=${this.t("editor.calendar.show_location","Show location")}
                                propertyName="showLocation"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${!0===s.showDescription}
                                .label=${this.t("editor.calendar.show_description","Show description")}
                                propertyName="showDescription"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>
                    `}
                `:""}

                ${c&&!this.sourcesOnly?U`
                    <div class="section-title">${this.t("editor.calendar.event_appearance","Event appearance")}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{color_hex:""}}
                                .value=${null!==(i=s.eventBackgroundColor)&&void 0!==i?i:"#202020"}
                                .label=${this.t("editor.calendar.event_background_color","Background color")}
                                propertyName="eventBackgroundColor"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                                .value=${null!==(a=s.eventBackgroundOpacity)&&void 0!==a?a:.76}
                                .label=${this.t("editor.calendar.event_background_opacity","Background opacity")}
                                .helper=${`${Math.round(100*(null!==(n=s.eventBackgroundOpacity)&&void 0!==n?n:.76))}%`}
                                propertyName="eventBackgroundOpacity"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>
                `:""}

                ${d&&!this.sourcesOnly?U`
                    <div class="section-title">${this.t("editor.calendar.filtering","Filtering and visibility")}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${!1!==s.hidePastTodayEvents}
                                .label=${this.t("editor.calendar.hide_past","Hide past events today")}
                                propertyName="hidePastTodayEvents"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${!0===s.hideWhenEmpty}
                                .label=${this.t("editor.calendar.hide_empty","Hide when empty")}
                                propertyName="hideWhenEmpty"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>

                    <div class="section-title">${this.t("editor.calendar.refresh","Data refresh")}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:1,max:1440,step:1,mode:"box"}}}
                                .value=${Math.max(1,Math.round((null!==(r=s.updateInterval)&&void 0!==r?r:300)/60))}
                                .label=${this.t("editor.calendar.update_interval","Update interval")}
                                .helper=${this.t("editor.calendar.update_help","Minutes (minimum 1)")}
                                .transformData=${e=>60*e}
                                propertyName="updateInterval"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>
                `:""}
            </div>
        `}};Ja.styles=n`
        .content {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 12px;
        }

        .section-title {
            margin: 2px 0 0;
            color: var(--secondary-text-color, #aaa);
            font-size: 0.73rem;
            font-weight: 750;
            letter-spacing: 0.06em;
            text-transform: uppercase;
        }

        .source-card {
            padding: 10px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
            border-radius: 8px;
            background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
        }

        .source-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .source-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 34px;
            margin-bottom: 4px;
        }

        .source-drag-handle {
            display: grid;
            place-items: center;
            flex: 0 0 30px;
            width: 30px;
            height: 32px;
            color: var(--secondary-text-color, #aaa);
            cursor: grab;
            touch-action: none;
        }

        .source-drag-handle:active { cursor: grabbing; }
        .source-drag-handle ha-icon { --mdc-icon-size: 19px; }
        .source-card-ghost { opacity: 0.35; }

        .source-card.collapsed .source-header {
            margin-bottom: 0;
        }

        .source-toggle {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            min-width: 0;
            min-height: 34px;
            padding: 0 4px 0 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            text-align: left;
            cursor: pointer;
            flex: 1;
        }

        .source-toggle:hover,
        .source-toggle:focus-visible {
            color: var(--primary-color, #03a9f4);
            outline: none;
        }

        .source-icon-button {
            display: grid;
            place-items: center;
            width: 32px;
            height: 32px;
            padding: 0;
            border: 0;
            border-radius: 6px;
            background: transparent;
            color: var(--secondary-text-color, #aaa);
            cursor: pointer;
            flex: 0 0 32px;
        }

        .source-icon-button ha-icon {
            --mdc-icon-size: 18px;
        }

        .source-icon-button:hover,
        .source-icon-button:focus-visible {
            background: rgba(255, 255, 255, 0.09);
            color: var(--primary-text-color, #fff);
            outline: none;
        }

        .source-icon-button.remove:hover,
        .source-icon-button.remove:focus-visible {
            color: var(--error-color, #ef5350);
        }

        .source-title {
            display: flex;
            align-items: center;
            gap: 8px;
            overflow: hidden;
            font-size: 0.8rem;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .source-color {
            flex: 0 0 auto;
            width: 12px;
            height: 12px;
            border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
            border-radius: 50%;
            background: var(--source-color, #4fc3f7);
            box-shadow: 0 0 0 2px color-mix(in srgb, var(--source-color, #4fc3f7) 22%, transparent);
        }

        .source-card ha-row-selector {
            display: block;
            padding: 2px 0;
        }

        .source-body {
            padding-top: 4px;
            border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        }

        .empty {
            padding: 14px;
            border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
            border-radius: 8px;
            color: var(--secondary-text-color, #aaa);
            font-size: 0.84rem;
            line-height: 1.45;
            text-align: center;
        }

        .button-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .button-row button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            min-height: 42px;
            padding: 0 10px;
            border: 1px solid var(--primary-color, #03a9f4);
            border-radius: 8px;
            background: color-mix(in srgb, var(--primary-color, #03a9f4) 16%, transparent);
            color: var(--primary-color, #03a9f4);
            font: inherit;
            font-size: 0.84rem;
            font-weight: 650;
            cursor: pointer;
        }

        .button-row button:hover,
        .button-row button:focus-visible {
            background: color-mix(in srgb, var(--primary-color, #03a9f4) 27%, transparent);
            outline: none;
        }

        .button-row button:disabled {
            cursor: progress;
            opacity: 0.55;
        }

        .button-row button ha-icon {
            --mdc-icon-size: 18px;
        }

        .options {
            padding-top: 4px;
            border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        }

        @media (max-width: 380px) {
            .button-row { grid-template-columns: 1fr; }
        }
    `,Ka([me({type:Boolean})],Ja.prototype,"sourcesOnly",void 0),Ka([ve()],Ja.prototype,"sources",void 0),Ka([ve()],Ja.prototype,"addingAll",void 0),Ka([ve()],Ja.prototype,"expandedSourceIndex",void 0),Ja=Ka([ue("calendar-editor")],Ja);let Ya=class extends Rt{_dateFormatOptions(){return{weekday:[{value:"long",label:this.t("editor.format.long_monday","Long (Monday)")},{value:"short",label:this.t("editor.format.short_mon","Short (Mon)")},{value:"narrow",label:this.t("editor.format.narrow_m","Narrow (M)")},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}],month:[{value:"long",label:this.t("editor.format.long_january","Long (January)")},{value:"short",label:this.t("editor.format.short_jan","Short (Jan)")},{value:"narrow",label:this.t("editor.format.narrow_j","Narrow (J)")},{value:"numeric",label:this.t("editor.format.numeric_1","Numeric (1)")},{value:"2-digit",label:this.t("editor.format.two_digit_01","2-digit (01)")},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}],day:[{value:"numeric",label:this.t("editor.format.numeric_1","Numeric (1)")},{value:"2-digit",label:this.t("editor.format.two_digit_01","2-digit (01)")},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}],year:[{value:"numeric",label:this.t("editor.format.numeric_2025","Numeric (2025)")},{value:"2-digit",label:this.t("editor.format.two_digit_25","2-digit (25)")},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}]}}static get styles(){return n`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,o,i,a,n,r;if(!this.hass||!this.config)return U``;const s=this._dateFormatOptions();return U`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${(null===(e=this.config.dateFormat)||void 0===e?void 0:e.custom)||""}
                        .label=${this.t("editor.format.custom_date","Custom date format")}
                        .helper=${this.t("editor.format.custom_date_help","For example yyyy-MM-dd or EEEE, MMMM d, yyyy. When filled, it overrides the settings below.")}
                        propertyName="dateFormat.custom"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.weekday,mode:"dropdown"}}}
                        .value=${(null===(t=this.config.dateFormat)||void 0===t?void 0:t.weekday)||"long"}
                        .label=${this.t("editor.format.weekday_display","Weekday display")}
                        propertyName="dateFormat.weekday"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.month,mode:"dropdown"}}}
                        .value=${(null===(o=this.config.dateFormat)||void 0===o?void 0:o.month)||"long"}
                        .label=${this.t("editor.format.month_display","Month display")}
                        propertyName="dateFormat.month"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.day,mode:"dropdown"}}}
                        .value=${void 0===(null===(i=this.config.dateFormat)||void 0===i?void 0:i.day)?"undefined":null===(a=this.config.dateFormat)||void 0===a?void 0:a.day}
                        .label=${this.t("editor.format.day_display","Day display")}
                        propertyName="dateFormat.day"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.year,mode:"dropdown"}}}
                        .value=${void 0===(null===(n=this.config.dateFormat)||void 0===n?void 0:n.year)?"undefined":null===(r=this.config.dateFormat)||void 0===r?void 0:r.year}
                        .label=${this.t("editor.format.year_display","Year display")}
                        propertyName="dateFormat.year"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `}};Ya=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("date-format-editor")],Ya);let Xa=class extends Rt{_timeFormatOptions(){const e=this.t("editor.format.numeric","Numeric"),t=this.t("editor.format.two_digit","2-digit");return{hour12:[{value:"true",label:this.t("editor.format.hour_12","12-hour")},{value:"false",label:this.t("editor.format.hour_24","24-hour")}],amPmDisplay:[{value:"hidden",label:this.t("editor.format.am_pm_hidden","Hidden")},{value:"narrow",label:this.t("editor.format.am_pm_narrow","1-digit (a/p)")},{value:"full",label:this.t("editor.format.am_pm_full","2-digit (AM/PM)")}],hour:[{value:"numeric",label:e},{value:"2-digit",label:t}],minute:[{value:"numeric",label:e},{value:"2-digit",label:t}],second:[{value:"numeric",label:e},{value:"2-digit",label:t},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}],colonBlink:[{value:"static",label:this.t("editor.format.colon_static","Static")},{value:"fast",label:this.t("editor.format.colon_fast","Fast (0.5 s on/off)")},{value:"slow",label:this.t("editor.format.colon_slow","Slow (1 s on/off)")}]}}static get styles(){return n`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,o,i,a,n,r,s,l,c;if(!this.hass||!this.config)return U``;const d=this._timeFormatOptions();return U`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:d.hour12,mode:"dropdown"}}}
                        .value=${(null===(e=this.config.timeFormat)||void 0===e?void 0:e.hour12)?"true":"false"}
                        .label=${this.t("editor.format.hour_format","Hour format")}
                        propertyName="timeFormat.hour12"
                        .transformData=${e=>"true"===e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${(null===(t=this.config.timeFormat)||void 0===t?void 0:t.hour12)?U`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:d.amPmDisplay,mode:"dropdown"}}}
                            .value=${null!==(i=null===(o=this.config.timeFormat)||void 0===o?void 0:o.amPmDisplay)&&void 0!==i?i:!1===(null===(a=this.config.timeFormat)||void 0===a?void 0:a.showAmPm)?"hidden":"full"}
                            .label=${this.t("editor.format.am_pm_display","AM/PM display")}
                            .helper=${this.t("editor.format.am_pm_display_help","Hide the period, show a/p, or show AM/PM")}
                            propertyName="timeFormat.amPmDisplay"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>
                `:""}

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:d.hour,mode:"dropdown"}}}
                        .value=${(null===(n=this.config.timeFormat)||void 0===n?void 0:n.hour)||"2-digit"}
                        .label=${this.t("editor.format.hour_display","Hour display")}
                        propertyName="timeFormat.hour"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:d.colonBlink,mode:"dropdown"}}}
                        .value=${(null===(r=this.config.timeFormat)||void 0===r?void 0:r.colonBlink)||"static"}
                        .label=${this.t("editor.format.colon_blink","Colon")}
                        .helper=${this.t("editor.format.colon_blink_help","Choose whether the separator stays visible or blinks")}
                        propertyName="timeFormat.colonBlink"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:d.minute,mode:"dropdown"}}}
                        .value=${(null===(s=this.config.timeFormat)||void 0===s?void 0:s.minute)||"2-digit"}
                        .label=${this.t("editor.format.minute_display","Minute display")}
                        propertyName="timeFormat.minute"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:d.second,mode:"dropdown"}}}
                        .value=${void 0===(null===(l=this.config.timeFormat)||void 0===l?void 0:l.second)?"undefined":null===(c=this.config.timeFormat)||void 0===c?void 0:c.second}
                        .label=${this.t("editor.format.second_display","Second display")}
                        propertyName="timeFormat.second"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `}};Xa=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("time-format-editor")],Xa);var Qa=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};const en="sensors.expansion";let tn=class extends Rt{constructor(){super(...arguments),this._sensors=[],this._expandedSensorIndex=null,this.sortableList=new Ui(this,{containerSelector:".sensor-list",draggable:".sensor-card",handle:".sensor-drag-handle",ghostClass:"sensor-card-ghost",onMove:(e,t)=>this._moveSensor(e,t)})}updated(e){var t;if(super.updated(e),e.has("editorSessionKey")){const e=Nt(this.editorSessionKey,en);this._expandedSensorIndex=null!==(t=null==e?void 0:e.sensorIndex)&&void 0!==t?t:null}e.has("config")&&this.config&&this._loadSensors(),this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}_retainExpansionState(){Ft(this.editorSessionKey,en,{sensorIndex:this._expandedSensorIndex})}_loadSensors(){var e;(null===(e=this.config)||void 0===e?void 0:e.sensors)&&this.config.sensors.length>0?this._sensors=[...this.config.sensors]:this._sensors=[],0===this._sensors.length?this._expandedSensorIndex=null:null!==this._expandedSensorIndex&&(this._expandedSensorIndex=Math.min(this._expandedSensorIndex,this._sensors.length-1)),this._retainExpansionState()}_addSensor(){if(this._expandedSensorIndex=this._sensors.length,this._retainExpansionState(),this._sensors=[...this._sensors,{entity:"",label:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,o)=>o!==e),0===this._sensors.length||this._expandedSensorIndex===e?this._expandedSensorIndex=null:null!==this._expandedSensorIndex&&this._expandedSensorIndex>e&&(this._expandedSensorIndex-=1),this._retainExpansionState(),this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_toggleSensor(e){this._expandedSensorIndex=this._expandedSensorIndex===e?null:e,this._retainExpansionState()}_moveSensor(e,t){if(this._expandedSensorIndex=Wi(this._expandedSensorIndex,e,t),this._retainExpansionState(),this._sensors=Bi(this._sensors,e,t),!this.config)return;const o=JSON.parse(JSON.stringify(this.config));o.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o}}))}_commitSensors(e){if(this._sensors=e,!this.config)return;const t=JSON.parse(JSON.stringify(this.config));t.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_addColorRule(e){const t=this._sensors.map((t,o)=>{var i;return o!==e?t:{...t,colorRules:[...null!==(i=t.colorRules)&&void 0!==i?i:[],{operator:"<",value:0,color:"#ffffff"}]}});this._commitSensors(t)}_removeColorRule(e,t){const o=this._sensors.map((o,i)=>{var a;if(i!==e)return o;const n=(null!==(a=o.colorRules)&&void 0!==a?a:[]).filter((e,o)=>o!==t),r={...o};return n.length>0?r.colorRules=n:delete r.colorRules,r});this._commitSensors(o)}_moveColorRule(e,t,o){const i=this._sensors.map((i,a)=>{var n;return a!==e?i:{...i,colorRules:Bi(null!==(n=i.colorRules)&&void 0!==n?n:[],t,o)}});this._commitSensors(i)}_operatorOptions(){return[{value:"<",label:this.t("editor.sensors.operator_less_than","Less than (<)")},{value:"<=",label:this.t("editor.sensors.operator_less_or_equal","Less than or equal (≤)")},{value:">",label:this.t("editor.sensors.operator_greater_than","Greater than (>)")},{value:">=",label:this.t("editor.sensors.operator_greater_or_equal","Greater than or equal (≥)")},{value:"=",label:this.t("editor.sensors.operator_equal","Equal (=)")},{value:"!=",label:this.t("editor.sensors.operator_not_equal","Not equal (≠)")}]}_colorRuleValueSelector(e){return"="===e||"!="===e?{text:{type:"text"}}:{number:{step:"any",mode:"box"}}}static get styles(){return n`
            .content {
                padding: 12px;
            }

            .sensor-card {
                margin: 0 0 10px;
                padding: 10px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
                border-radius: 8px;
                background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
            }

            .sensor-card.collapsed .sensor-header {
                margin-bottom: 0;
            }

            .sensor-header {
                display: flex;
                align-items: center;
                min-height: 34px;
                margin-bottom: 4px;
            }

            .sensor-drag-handle {
                display: grid;
                place-items: center;
                flex: 0 0 30px;
                width: 30px;
                height: 32px;
                color: var(--secondary-text-color, #aaa);
                cursor: grab;
                touch-action: none;
            }

            .sensor-drag-handle:active { cursor: grabbing; }
            .sensor-drag-handle ha-icon { --mdc-icon-size: 19px; }
            .sensor-card-ghost { opacity: 0.35; }

            .sensor-toggle {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding: 0 4px;
                border: 0;
                background: transparent;
                color: var(--primary-text-color, #fff);
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .sensor-title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
            }

            .sensor-icon-button {
                display: grid;
                place-items: center;
                flex: 0 0 32px;
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .sensor-icon-button ha-icon {
                --mdc-icon-size: 18px;
            }

            .sensor-icon-button:hover,
            .sensor-icon-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .sensor-icon-button.remove:hover {
                color: var(--error-color, #db4437);
            }

            .sensor-body {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .sensor-card ha-row-selector {
                display: block;
                width: 100%;
                padding: 2px 0;
            }

            .color-rules {
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .color-rules-header,
            .color-rule-actions {
                display: flex;
                align-items: center;
            }

            .color-rules-header {
                justify-content: space-between;
                gap: 8px;
                margin-bottom: 8px;
            }

            .color-rules-title {
                color: var(--secondary-text-color, #aaa);
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
            }

            .color-rule {
                display: grid;
                grid-template-columns: minmax(120px, 1fr) minmax(90px, 0.8fr) minmax(120px, 1fr) auto;
                gap: 8px;
                align-items: end;
                margin-top: 8px;
                padding: 8px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
                border-radius: 6px;
            }

            .color-rule-actions {
                align-self: center;
            }

            .color-rule-button {
                display: grid;
                place-items: center;
                width: 30px;
                height: 30px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .color-rule-button:hover:not(:disabled),
            .color-rule-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .color-rule-button.remove:hover {
                color: var(--error-color, #db4437);
            }

            .color-rule-button:disabled {
                opacity: 0.3;
                cursor: default;
            }

            .color-rule-button ha-icon {
                --mdc-icon-size: 18px;
            }

            .add-color-rule {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                min-height: 32px;
                padding: 0 9px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 6px;
                background: transparent;
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-size: 0.82rem;
                cursor: pointer;
            }

            .add-color-rule ha-icon {
                --mdc-icon-size: 17px;
            }

            @media (max-width: 600px) {
                .color-rule {
                    grid-template-columns: 1fr 1fr;
                }

                .color-rule-actions {
                    grid-column: 1 / -1;
                    justify-content: flex-end;
                }
            }

            .empty-sensors {
                margin: 0 0 10px;
                padding: 12px;
                border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
                border-radius: 8px;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.85rem;
                text-align: center;
            }

            .add-sensor {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                min-height: 42px;
                margin-top: 10px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 8px;
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            .add-sensor:hover,
            .add-sensor:focus-visible {
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 28%, transparent);
                outline: none;
            }

            .add-sensor ha-icon {
                --mdc-icon-size: 19px;
            }
        `}render(){return this.hass&&this.config?U`
            <div class="content">
                ${0===this._sensors.length?U`
                    <div class="empty-sensors">${this.t("editor.sensors.empty","No sensors configured.")}</div>
                `:""}
                <div class="sensor-list">
                ${this._sensors.map((e,t)=>{var o,i;const a=this._expandedSensorIndex===t,n=e.label||e.entity||this.t("editor.sensors.sensor","Sensor {number}",{number:t+1});return U`
                    <div class="sensor-card ${a?"":"collapsed"}">
                        <div class="sensor-header">
                            <span class="sensor-drag-handle"
                                  title=${this.t("designer.drag_to_move","Drag to move")}
                                  aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                <ha-icon icon="mdi:drag"></ha-icon>
                            </span>
                            <button class="sensor-toggle" type="button"
                                    aria-expanded=${a}
                                    @click=${()=>this._toggleSensor(t)}>
                                <span class="sensor-title">${n}</span>
                            </button>
                            <button class="sensor-icon-button remove" type="button"
                                    title=${this.t("editor.sensors.remove","Remove sensor")}
                                    aria-label=${this.t("editor.sensors.remove","Remove sensor")}
                                    @click=${()=>this._removeSensor(t)}>
                                <ha-icon icon="mdi:delete-outline"></ha-icon>
                            </button>
                            <button class="sensor-icon-button" type="button"
                                    title=${a?this.t("editor.sensors.collapse","Collapse sensor"):this.t("editor.sensors.expand","Expand sensor")}
                                    aria-label=${a?this.t("editor.sensors.collapse","Collapse sensor"):this.t("editor.sensors.expand","Expand sensor")}
                                    @click=${()=>this._toggleSensor(t)}>
                                <ha-icon icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </button>
                        </div>
                        ${a?U`<div class="sensor-body">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${e.label||""}
                                .label=${this.t("editor.sensors.label","Label")}
                                .labelPosition=${aa.Top}
                                propertyName="sensors.${t}.label"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{entity:{filter:{domain:["sensor","binary_sensor","input_text","input_number","input_datetime","sun","weather"]}}}}
                                .value=${e.entity||""}
                                .label=${this.t("editor.sensors.entity","Entity")}
                                .labelPosition=${aa.Top}
                                propertyName="sensors.${t}.entity"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{icon:{}}}
                                .value=${e.icon||""}
                                .label=${this.t("editor.sensors.icon","Icon")}
                                .helper=${this.t("editor.sensors.icon_help","Empty uses the Home Assistant entity icon")}
                                .labelPosition=${aa.Top}
                                propertyName="sensors.${t}.icon"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{color_hex:""}}
                                .value=${null!==(o=e.color)&&void 0!==o?o:""}
                                .label=${this.t("editor.sensors.default_color","Default color")}
                                .helper=${this.t("editor.sensors.default_color_help","Used when no conditional rule matches; empty inherits the widget color.")}
                                .labelPosition=${aa.Top}
                                propertyName="sensors.${t}.color"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <div class="color-rules">
                            <div class="color-rules-header">
                                <span class="color-rules-title">
                                    ${this.t("editor.sensors.color_rules","Conditional colors")}
                                </span>
                                <button class="add-color-rule" type="button"
                                        @click=${()=>this._addColorRule(t)}>
                                    <ha-icon icon="mdi:plus"></ha-icon>
                                    ${this.t("editor.sensors.add_color_rule","Add rule")}
                                </button>
                            </div>
                            ${(null!==(i=e.colorRules)&&void 0!==i?i:[]).map((e,o,i)=>U`
                                <div class="color-rule">
                                    <ha-row-selector
                                            .hass=${this.hass}
                                            .selector=${{select:{options:this._operatorOptions(),mode:"dropdown"}}}
                                            .value=${e.operator}
                                            .label=${this.t("editor.sensors.operator","Condition")}
                                            .labelPosition=${aa.Top}
                                            propertyName="sensors.${t}.colorRules.${o}.operator"
                                            @value-changed=${this._handleFormValueChanged}
                                    ></ha-row-selector>
                                    <ha-row-selector
                                            .hass=${this.hass}
                                            .selector=${this._colorRuleValueSelector(e.operator)}
                                            .value=${e.value}
                                            .label=${this.t("editor.sensors.threshold","Value")}
                                            .labelPosition=${aa.Top}
                                            propertyName="sensors.${t}.colorRules.${o}.value"
                                            @value-changed=${this._handleFormValueChanged}
                                    ></ha-row-selector>
                                    <ha-row-selector
                                            .hass=${this.hass}
                                            .selector=${{color_hex:""}}
                                            .value=${e.color}
                                            .label=${this.t("editor.sensors.rule_color","Color")}
                                            .labelPosition=${aa.Top}
                                            propertyName="sensors.${t}.colorRules.${o}.color"
                                            @value-changed=${this._handleFormValueChanged}
                                    ></ha-row-selector>
                                    <div class="color-rule-actions">
                                        <button class="color-rule-button" type="button"
                                                ?disabled=${0===o}
                                                title=${this.t("editor.sensors.move_rule_up","Move rule up")}
                                                aria-label=${this.t("editor.sensors.move_rule_up","Move rule up")}
                                                @click=${()=>this._moveColorRule(t,o,o-1)}>
                                            <ha-icon icon="mdi:arrow-up"></ha-icon>
                                        </button>
                                        <button class="color-rule-button" type="button"
                                                ?disabled=${o===i.length-1}
                                                title=${this.t("editor.sensors.move_rule_down","Move rule down")}
                                                aria-label=${this.t("editor.sensors.move_rule_down","Move rule down")}
                                                @click=${()=>this._moveColorRule(t,o,o+1)}>
                                            <ha-icon icon="mdi:arrow-down"></ha-icon>
                                        </button>
                                        <button class="color-rule-button remove" type="button"
                                                title=${this.t("editor.sensors.remove_color_rule","Remove rule")}
                                                aria-label=${this.t("editor.sensors.remove_color_rule","Remove rule")}
                                                @click=${()=>this._removeColorRule(t,o)}>
                                            <ha-icon icon="mdi:delete-outline"></ha-icon>
                                        </button>
                                    </div>
                                </div>
                            `)}
                        </div>
                        </div>`:""}
                    </div>
                `})}
                </div>

                <button class="add-sensor" type="button" @click=${this._addSensor}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                    ${this.t("editor.sensors.add","Add sensor")}
                </button>
            </div>
        `:U``}};Qa([me({attribute:!1})],tn.prototype,"editorSessionKey",void 0),Qa([me({type:Array})],tn.prototype,"_sensors",void 0),Qa([ve()],tn.prototype,"_expandedSensorIndex",void 0),tn=Qa([ue("sensors-editor")],tn);class on{static getInstance(){return on.instance||(on.instance=new on),on.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&ze.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const an=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(e,t){try{if(0===t.length)throw new Error("No stops configured");const o={};for(const e of t){const t=String(e.stopId);o[t]||(o[t]=[]),o[t].push(e)}const i=[];for(const t of Object.keys(o)){const a=o[t],n=a.map(e=>e.postId),r=`https://transportation-proxy.datario.app/proxy/departures?stopid=${t}`,s=await fetch(r,{headers:{"X-Api-Key":"2f8a0c7b2e9a44a4b8aa9a6b4a3d1e2f"}});if(!s.ok)throw new Error(`Failed to fetch transportation data: ${s.status} ${s.statusText}`);const l=await s.json();if(l.Error)throw new Error(`API error: ${l.Error}`);for(const o of n){const n=l.PostList.find(e=>e.PostID===o);if(!n){ze.warn(`No platform found with postId ${o} for stopId ${t}`);continue}const r=n.Name,s=a.find(e=>e.postId===o);if(!s)continue;const c=s.name||r,d=e.maxDepartures||2,h=n.Departures.slice(0,Math.min(d,5)).map(e=>({lineId:e.LineId||e.Line,lineName:e.Line||e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:c,postId:o}));i.push(...h)}}return{departures:i,loading:!1}}catch(e){return ze.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}};function nn(e,t){var o,i;const a=null===(o=e.name)||void 0===o?void 0:o.trim();if(a)return a;const n=e.refreshButtonEntity?null===(i=null==t?void 0:t.states[e.refreshButtonEntity])||void 0===i?void 0:i.attributes.friendly_name:void 0;return n&&String(n).replace(/\s+(Aktualizovat odjezdy|Refresh departures)$/iu,"").trim()||void 0}const rn=new class{constructor(){this.id="homeassistant",this.name="Home Assistant entities",this.description="Departure sensors and an on-demand refresh button from Home Assistant",this.usesHassStateUpdates=!0}setHass(e){this.hass=e}async activateAsync(e){const t=this.requireHass(),o=this.getButtonEntityIds(e);if(0===o.length)throw new Error("At least one Home Assistant refresh button entity is required");for(const e of o)if(!t.states[e])throw new Error(`Entity ${e} not found`);await t.callService("button","press",{entity_id:1===o.length?o[0]:o})}async fetchTransportationAsync(e,t){try{const t=this.requireHass(),o=this.getConfiguredProfiles(e);if(0===o.flatMap(e=>this.getProfileEntityIds(e)).length)throw new Error("At least one Home Assistant departure sensor is required");const i=[];for(const[e,a]of o.entries()){const o=nn(a,t);for(const n of this.getProfileEntityIds(a)){const a=t.states[n];if(!a)throw new Error(`Entity ${n} not found`);if("unknown"===a.state||"unavailable"===a.state)continue;const r=a.attributes,s=r.line,l=r.destination;if(void 0===s||!l)continue;const c=String(o||r.stop_name||a.attributes.friendly_name||n),d=this.optionalIdentifier(r.post_id);i.push({lineId:String(s),lineName:String(s),finalStop:String(l),isLowFloor:!0===r.is_low_floor,timeMark:this.formatState(t,a),stopName:c,postId:d,groupId:`homeassistant-profile-${e}`,entityId:n,departureAt:r.departure_at,hasAirConditioning:!0===r.has_air_conditioning,occupancy:r.occupancy,occupancyPercent:r.occupancy_percent,vehicleId:r.vehicle_id})}}return{departures:i,loading:!1}}catch(e){return{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getHassStateKey(e){return this.hass?this.getEntityIds(e).map(e=>{var t;const o=null===(t=this.hass)||void 0===t?void 0:t.states[e];return o?`${e}:${o.state}:${o.last_updated}:${JSON.stringify(o.attributes)}`:`${e}:missing`}).join("|"):""}getDefaultConfig(){return{profiles:[]}}requireHass(){if(!this.hass)throw new Error("Home Assistant instance not set");return this.hass}getEntityIds(e){return this.getConfiguredProfiles(e).flatMap(e=>this.getProfileEntityIds(e))}getButtonEntityIds(e){var t,o;const i=(null===(t=e.profiles)||void 0===t?void 0:t.length)?e.profiles.map(e=>e.refreshButtonEntity||""):(null===(o=e.refreshButtonEntities)||void 0===o?void 0:o.length)?e.refreshButtonEntities:[e.refreshButtonEntity||""];return[...new Set(i.map(e=>e.trim()).filter(Boolean))]}getConfiguredProfiles(e){var t;return(null===(t=e.profiles)||void 0===t?void 0:t.length)?e.profiles:[{departureEntities:e.departureEntities||[]}]}getProfileEntityIds(e){return(e.departureEntities||[]).map(e=>e.trim()).filter(Boolean)}formatState(e,t){const o=e.formatEntityState;if("function"==typeof o)try{return String(o.call(e,t))}catch(e){}const i=t.attributes.unit_of_measurement;return`${t.state}${i?` ${i}`:""}`}optionalIdentifier(e){return"string"==typeof e||"number"==typeof e?e:void 0}},sn=on.getInstance();function ln(e){return sn.getProvider(e)}sn.register(an),sn.register(rn);var cn=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};const dn="transportation-expansion";let hn=class extends Rt{constructor(){super(...arguments),this._stops=[],this._expandedStopIndex=null,this._haProfiles=[],this._expandedHaProfileIndex=null,this.sortableList=new Ui(this,{containerSelector:".stop-list",draggable:".stop-card",handle:".stop-drag-handle",ghostClass:"stop-card-ghost",onMove:(e,t)=>{var o,i;"ha-profiles"===(null===(i=null===(o=this.shadowRoot)||void 0===o?void 0:o.querySelector(".stop-list"))||void 0===i?void 0:i.dataset.kind)?this._moveHaProfile(e,t):this._moveStop(e,t)}})}updated(e){var t,o;if(super.updated(e),e.has("editorSessionKey")){const e=Nt(this.editorSessionKey,dn);this._expandedStopIndex=null!==(t=null==e?void 0:e.stopIndex)&&void 0!==t?t:null,this._expandedHaProfileIndex=null!==(o=null==e?void 0:e.haProfileIndex)&&void 0!==o?o:null}e.has("config")&&this.config&&(this._loadStops(),this._loadHaProfiles()),this.sortableList.schedule()}_retainExpansionState(){Ft(this.editorSessionKey,dn,{stopIndex:this._expandedStopIndex,haProfileIndex:this._expandedHaProfileIndex})}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}_loadHaProfiles(){var e,t;const o=null===(e=this.config)||void 0===e?void 0:e.transportation,i=null==o?void 0:o.providerConfig,a=null==i?void 0:i.profiles;if(null==a?void 0:a.length)this._haProfiles=a.map(e=>({...e,departureEntities:[...e.departureEntities||[]]}));else{const e=(null===(t=null==i?void 0:i.refreshButtonEntities)||void 0===t?void 0:t.length)?i.refreshButtonEntities:(null==i?void 0:i.refreshButtonEntity)?[i.refreshButtonEntity]:[],o=[...(null==i?void 0:i.departureEntities)||[]];if(e.length<=1)this._haProfiles=e.length||o.length?[{refreshButtonEntity:e[0],departureEntities:o}]:[];else{const t=Math.ceil(o.length/e.length);this._haProfiles=e.map((e,i)=>({refreshButtonEntity:e,departureEntities:t?o.slice(i*t,(i+1)*t):[]}))}}0===this._haProfiles.length?this._expandedHaProfileIndex=null:null!==this._expandedHaProfileIndex&&(this._expandedHaProfileIndex=Math.min(this._expandedHaProfileIndex,this._haProfiles.length-1)),this._retainExpansionState()}_saveHaProfiles(){var e,t;if(!(null===(e=this.config)||void 0===e?void 0:e.transportation))return;const o=JSON.parse(JSON.stringify(this.config));(t=o.transportation).providerConfig||(t.providerConfig={}),o.transportation.providerConfig.profiles=this._haProfiles.map(e=>{const{maxDepartures:t,...o}=e;return{...o,departureEntities:[...e.departureEntities||[]]}}),delete o.transportation.providerConfig.refreshButtonEntity,delete o.transportation.providerConfig.refreshButtonEntities,delete o.transportation.providerConfig.departureEntities,delete o.transportation.maxDepartures,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o}}))}_addHaProfile(){this._expandedHaProfileIndex=this._haProfiles.length,this._retainExpansionState(),this._haProfiles=[...this._haProfiles,{name:"",refreshButtonEntity:"",departureEntities:[]}],this._saveHaProfiles()}_removeHaProfile(e){this._haProfiles=this._haProfiles.filter((t,o)=>o!==e),0===this._haProfiles.length||this._expandedHaProfileIndex===e?this._expandedHaProfileIndex=null:null!==this._expandedHaProfileIndex&&this._expandedHaProfileIndex>e&&(this._expandedHaProfileIndex-=1),this._retainExpansionState(),this._saveHaProfiles()}_haProfileChanged(e,t,o){this._haProfiles=this._haProfiles.map((i,a)=>a===e?{...i,[t]:o}:i),this._saveHaProfiles()}_toggleHaProfile(e){this._expandedHaProfileIndex=this._expandedHaProfileIndex===e?null:e,this._retainExpansionState()}_moveHaProfile(e,t){this._expandedHaProfileIndex=Wi(this._expandedHaProfileIndex,e,t),this._retainExpansionState(),this._haProfiles=Bi(this._haProfiles,e,t),this._saveHaProfiles()}_haProfileLabel(e,t){return nn(e,this.hass)||this.t("editor.transportation.stop","Stop {number}",{number:t+1})}_entityLabel(e){var t,o;return function(e,t){return String(t||e).trim().replace(/\s+(Aktualizovat odjezdy|Refresh departures)$/iu," — $1").replace(/\s+(Odjezd \d+|Departure \d+)$/iu," — $1")}(e,null===(o=null===(t=this.hass)||void 0===t?void 0:t.states[e])||void 0===o?void 0:o.attributes.friendly_name)}_loadStops(){var e;if(!(null===(e=this.config)||void 0===e?void 0:e.transportation))return this._stops=[],this._expandedStopIndex=null,void this._retainExpansionState();this.config.transportation.stops&&this.config.transportation.stops.length>0?this._stops=[...this.config.transportation.stops]:this._stops=[],0===this._stops.length?this._expandedStopIndex=null:null!==this._expandedStopIndex&&(this._expandedStopIndex=Math.min(this._expandedStopIndex,this._stops.length-1)),this._retainExpansionState()}_addStop(){if(this._expandedStopIndex=this._stops.length,this._retainExpansionState(),this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeStop(e){if(this._stops=this._stops.filter((t,o)=>o!==e),0===this._stops.length||this._expandedStopIndex===e?this._expandedStopIndex=null:null!==this._expandedStopIndex&&this._expandedStopIndex>e&&(this._expandedStopIndex-=1),this._retainExpansionState(),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_stopChanged(e,t,o){if(this._stops=this._stops.map((i,a)=>a===e?{...i,[t]:o}:i),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_toggleStop(e){this._expandedStopIndex=this._expandedStopIndex===e?null:e,this._retainExpansionState()}_moveStop(e,t){var o;if(this._expandedStopIndex=Wi(this._expandedStopIndex,e,t),this._retainExpansionState(),this._stops=Bi(this._stops,e,t),!(null===(o=this.config)||void 0===o?void 0:o.transportation))return;const i=JSON.parse(JSON.stringify(this.config));i.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}_normalizeStopId(e){const t=String(null!=e?e:"").trim();if(t)return/^-?\d+$/.test(t)?Number(t):t}_getTransportationProviderOptions(){return[...sn.getAllProviders().map(e=>({value:e.id,label:e.name}))]}static get styles(){return n`
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
            
            .stop-card {
                margin: 10px 0;
                padding: 8px 10px 10px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
                border-radius: 8px;
                background: var(--card-background-color, rgba(255, 255, 255, 0.04));
            }

            .stop-card.collapsed .stop-header {
                margin-bottom: 0;
            }

            .stop-header {
                display: flex;
                align-items: center;
                min-height: 36px;
                margin-bottom: 2px;
            }

            .stop-drag-handle {
                display: grid;
                place-items: center;
                flex: 0 0 30px;
                width: 30px;
                height: 32px;
                color: var(--secondary-text-color, #aaa);
                cursor: grab;
                touch-action: none;
            }

            .stop-drag-handle:active { cursor: grabbing; }
            .stop-drag-handle ha-icon { --mdc-icon-size: 19px; }
            .stop-card-ghost { opacity: 0.35; }

            .stop-toggle {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding: 0 4px;
                border: 0;
                background: transparent;
                color: var(--primary-text-color, #fff);
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .stop-toggle strong {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.9rem;
            }

            .stop-icon-button {
                display: grid;
                place-items: center;
                flex: 0 0 32px;
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .stop-icon-button ha-icon { --mdc-icon-size: 18px; }

            .stop-icon-button:hover,
            .stop-icon-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .stop-icon-button.remove:hover { color: var(--error-color, #db4437); }

            .stop-body {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .stop-card ha-row-selector {
                display: block;
                width: 100%;
                padding: 3px 0;
            }

            .add-stop {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                min-height: 42px;
                margin: 10px 0 20px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 8px;
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            .add-stop:hover,
            .add-stop:focus-visible {
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 28%, transparent);
                outline: none;
            }

            .add-stop ha-icon {
                --mdc-icon-size: 19px;
            }
        `}render(){var e,t,o,i,a,n;if(!this.hass||!this.config)return U``;if(!(null===(e=this.config.transportation)||void 0===e?void 0:e.enabled))return U``;const r="homeassistant"===this.config.transportation.provider,s="all"===this.section||"content"===this.section,l="all"===this.section||"appearance"===this.section,c="all"===this.section||"behavior"===this.section;return U`
            <div class="content">
                ${s?U`
                <div class="section-subheader">${this.t("editor.transportation.source","Data source")}</div>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._getTransportationProviderOptions(),mode:"dropdown"}}}
                        .value=${(null===(t=this.config.transportation)||void 0===t?void 0:t.provider)||"idsjmk"}
                        .label=${this.t("editor.transportation.provider","Transportation provider")}
                        propertyName="transportation.provider"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                `:""}

                ${l?U`
                <div class="section-subheader">${this.t("editor.transportation.appearance","Departure display")}</div>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:[{value:"inline",label:this.t("editor.transportation.display_inline","In card layout")},{value:"modal",label:this.t("editor.transportation.display_modal","Modal dialog")}],mode:"dropdown"}}}
                        .value=${null!==(o=this.config.transportation.displayMode)&&void 0!==o?o:"inline"}
                        .label=${this.t("editor.transportation.display_mode","Departure display")}
                        .helper=${this.t("editor.transportation.display_mode_help","Choose where departures open after pressing the transportation action")}
                        propertyName="transportation.displayMode"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                `:""}

                ${s&&r?U`
                    <div class="section-subheader">${this.t("editor.transportation.stops","Stops")}</div>

                    <div class="stop-list" data-kind="ha-profiles">
                    ${this._haProfiles.map((e,t)=>{var o;const i=this._expandedHaProfileIndex===t,a=this._haProfileLabel(e,t);return U`
                        <div class="stop-card ${i?"":"collapsed"}">
                            <div class="stop-header">
                                <span class="stop-drag-handle"
                                      title=${this.t("designer.drag_to_move","Drag to move")}
                                      aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                    <ha-icon icon="mdi:drag"></ha-icon>
                                </span>
                                <button class="stop-toggle" type="button"
                                        aria-expanded=${i}
                                        @click=${()=>this._toggleHaProfile(t)}>
                                    <strong>${a}</strong>
                                </button>
                                <button class="stop-icon-button remove" type="button"
                                        title=${this.t("editor.transportation.remove_stop","Remove stop")}
                                        aria-label=${this.t("editor.transportation.remove_stop","Remove stop")}
                                        @click=${()=>this._removeHaProfile(t)}>
                                    <ha-icon icon="mdi:delete-outline"></ha-icon>
                                </button>
                                <button class="stop-icon-button" type="button"
                                        title=${i?this.t("editor.transportation.collapse_stop","Collapse stop"):this.t("editor.transportation.expand_stop","Expand stop")}
                                        aria-label=${i?this.t("editor.transportation.collapse_stop","Collapse stop"):this.t("editor.transportation.expand_stop","Expand stop")}
                                        @click=${()=>this._toggleHaProfile(t)}>
                                    <ha-icon icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                                </button>
                            </div>
                            ${i?U`<div class="stop-body">
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{}}}
                                        .value=${(null===(o=e.name)||void 0===o?void 0:o.trim())?e.name:a}
                                        .label=${this.t("editor.transportation.stop_name","Stop name (optional)")}
                                        @value-changed=${e=>this._haProfileChanged(t,"name",e.detail.value||"")}>
                                </ha-row-selector>
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{entity:{domain:"button"}}}
                                        .value=${e.refreshButtonEntity||""}
                                        .label=${this.t("editor.transportation.refresh_button","Refresh button entity")}
                                        .helper=${e.refreshButtonEntity?this._entityLabel(e.refreshButtonEntity):this.t("editor.transportation.refresh_button_help","This profile is activated when departures are opened")}
                                        @value-changed=${e=>this._haProfileChanged(t,"refreshButtonEntity",e.detail.value||"")}>
                                </ha-row-selector>
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{entity:{domain:"sensor",device_class:"duration",multiple:!0}}}
                                        .value=${e.departureEntities||[]}
                                        .label=${this.t("editor.transportation.departure_entities","Departure sensor entities")}
                                        .helper=${this.t("editor.transportation.departure_entities_help","Select the sensors in display order")}
                                        @value-changed=${e=>this._haProfileChanged(t,"departureEntities",e.detail.value||[])}>
                                </ha-row-selector>
                            </div>`:""}
                        </div>
                    `})}
                    </div>

                    <button class="add-stop" type="button" @click=${this._addHaProfile}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${this.t("editor.transportation.add_stop","Add stop")}
                    </button>

                `:""}

                ${l&&!r?U`<ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,max:5,step:1,mode:"slider"}}}
                        .value=${(null===(i=this.config.transportation)||void 0===i?void 0:i.maxDepartures)||2}
                        .label=${this.t("editor.transportation.max_departures","Maximum departures per stop")}
                        .helper=${this.t("editor.transportation.departures","{count} departures",{count:(null===(a=this.config.transportation)||void 0===a?void 0:a.maxDepartures)||2})}
                        propertyName="transportation.maxDepartures"
                        @value-changed=${e=>{this._handleFormValueChanged(e),this._loadStops()}}
                ></ha-row-selector>`:""}

                ${c?U`
                <div class="section-subheader">${this.t("editor.transportation.behavior","Refresh and auto-hide")}</div>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,max:10,step:1,mode:"box"}}}
                        .value=${(null===(n=this.config.transportation)||void 0===n?void 0:n.autoHideTimeout)||5}
                        .label=${this.t("editor.transportation.auto_hide","Auto-hide timeout")}
                        .helper=${this.t("editor.transportation.auto_hide_help","Auto-hide timeout in minutes (1–10)")}
                        propertyName="transportation.autoHideTimeout"
                        .transformData=${e=>Math.max(Math.min(e||5,10),1)}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                `:""}

                ${c&&!r?U`<ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,step:1,mode:"box"}}}
                        .value=${Math.floor((this.config.transportation.updateInterval||60)/60)}
                        .label=${this.t("editor.transportation.update_interval","Update interval")}
                        .helper=${this.t("editor.transportation.update_help","Update interval in minutes (minimum 1)")}
                        propertyName="transportation.updateInterval"
                        .transformData=${e=>60*Math.max(e||1,1)}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>`:""}

                ${s&&!r?U`
                <div class="section-subheader">${this.t("editor.transportation.stops","Stops")}</div>

                <div class="stop-list" data-kind="direct-stops">
                ${this._stops.map((e,t)=>{var o,i,a;const n=this._expandedStopIndex===t;return U`
                    <div class="stop-card ${n?"":"collapsed"}">
                        <div class="stop-header">
                            <span class="stop-drag-handle"
                                  title=${this.t("designer.drag_to_move","Drag to move")}
                                  aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                <ha-icon icon="mdi:drag"></ha-icon>
                            </span>
                            <button class="stop-toggle" type="button"
                                    aria-expanded=${n}
                                    @click=${()=>this._toggleStop(t)}>
                                <strong>${e.name||this.t("editor.transportation.stop","Stop {number}",{number:t+1})}</strong>
                            </button>
                            <button class="stop-icon-button remove" type="button"
                                    title=${this.t("editor.transportation.remove_stop","Remove stop")}
                                    aria-label=${this.t("editor.transportation.remove_stop","Remove stop")}
                                    @click=${()=>this._removeStop(t)}>
                                <ha-icon icon="mdi:delete-outline"></ha-icon>
                            </button>
                            <button class="stop-icon-button" type="button"
                                    title=${n?this.t("editor.transportation.collapse_stop","Collapse stop"):this.t("editor.transportation.expand_stop","Expand stop")}
                                    aria-label=${n?this.t("editor.transportation.collapse_stop","Collapse stop"):this.t("editor.transportation.expand_stop","Expand stop")}
                                    @click=${()=>this._toggleStop(t)}>
                                <ha-icon icon=${n?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </button>
                        </div>
                        ${n?U`<div class="stop-body">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${String(null!==(o=e.stopId)&&void 0!==o?o:"")}
                                .label=${this.t("editor.transportation.stop_id","Stop ID")}
                                @value-changed=${e=>this._stopChanged(t,"stopId",this._normalizeStopId(e.detail.value))}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${String(null!==(i=e.postId)&&void 0!==i?i:"")}
                                .label=${this.t("editor.transportation.post_id","Post ID")}
                                @value-changed=${e=>this._stopChanged(t,"postId",this._normalizeStopId(e.detail.value))}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${null!==(a=e.name)&&void 0!==a?a:""}
                                .label=${this.t("editor.transportation.stop_name","Stop name (optional)")}
                                @value-changed=${e=>this._stopChanged(t,"name",e.detail.value||"")}>
                        </ha-row-selector>
                        </div>`:""}
                    </div>
                `})}
                </div>

                <button class="add-stop" type="button" @click=${this._addStop}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                    ${this.t("editor.transportation.add_stop","Add stop")}
                </button>
                `:""}

                ${s?U`<div class="info-text">
                    <a
                        href="https://github.com/rkotulan/ha-wall-clock-card/blob/main/docs/transportation.md"
                        target="_blank">${this.t("editor.transportation.documentation","Transportation configuration documentation")}</a>
                </div>`:""}
            </div>
        `}};cn([me({attribute:!1})],hn.prototype,"editorSessionKey",void 0),cn([me({type:Array})],hn.prototype,"_stops",void 0),cn([ve()],hn.prototype,"_expandedStopIndex",void 0),cn([ve()],hn.prototype,"_haProfiles",void 0),cn([ve()],hn.prototype,"_expandedHaProfileIndex",void 0),hn=cn([ue("transportation-editor")],hn);let un=class extends Rt{constructor(){super(...arguments),this._weatherIconSetOptions=[{value:"wall-clock",label:"Wall Clock (Animated SVG)"},{value:"metno",label:"Met.no (SVG)"},{value:"openweathermap",label:"OpenWeatherMap (PNG)"},{value:"basmilius",label:"Bas Milius (Animated)"}]}_weatherProviderOptions(){return[{value:"none",label:this.t("editor.weather.provider_none","None (disable weather)")},{value:"homeassistant",label:this.t("editor.weather.provider_ha","Home Assistant entity")},{value:"openweathermap",label:"OpenWeatherMap"}]}_unitsOptions(){return[{value:"metric",label:this.t("editor.weather.metric","Metric (°C, m/s)")},{value:"imperial",label:this.t("editor.weather.imperial","Imperial (°F, mph)")}]}_weatherDisplayModeOptions(){return[{value:"current",label:this.t("editor.weather.current","Current weather only")},{value:"forecast",label:this.t("editor.weather.forecast","Forecast only")},{value:"both",label:this.t("editor.weather.both","Current and forecast")}]}_forecastTypeOptions(){return[{value:"auto",label:this.t("editor.weather.forecast_type_auto","Automatic")},{value:"daily",label:this.t("editor.weather.forecast_type_daily","Daily")},{value:"hourly",label:this.t("editor.weather.forecast_type_hourly","Hourly")},{value:"twice_daily",label:this.t("editor.weather.forecast_type_twice_daily","Twice daily")}]}_resolvedForecastType(){var e,t,o,i,a;const n=null===(e=this.config.weatherConfig)||void 0===e?void 0:e.forecastType;if(n&&"auto"!==n)return n;const r=null===(t=this.config.weatherConfig)||void 0===t?void 0:t.entityId,s=Number(r&&null!==(a=null===(i=null===(o=this.hass.states[r])||void 0===o?void 0:o.attributes)||void 0===i?void 0:i.supported_features)&&void 0!==a?a:0);return 1&s?"daily":2&s?"hourly":4&s?"twice_daily":"daily"}static get styles(){return n`
            .content {
                display: flex;
                flex-direction: column;
                gap: 14px;
                padding: 12px;
            }

            .section-title {
                margin: 2px 0 0;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.73rem;
                font-weight: 750;
                letter-spacing: 0.06em;
                text-transform: uppercase;
            }

            .options {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }
        `}render(){var e,t,o,i,a,n;if(!this.hass||!this.config)return U``;const r="all"===this.section||"content"===this.section,s="all"===this.section||"appearance"===this.section,l="all"===this.section||"behavior"===this.section,c=this._resolvedForecastType(),d=this.config.weatherForecastDays||3;return U`
            <div class="content">
                ${r?U`
                    <div class="section-title">${this.t("editor.weather.source","Weather source")}</div>
                    <div class="options">
                        <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:this._weatherProviderOptions(),mode:"dropdown"}}}
                            .value=${this.config.weatherProvider||"openweathermap"}
                            .label=${this.t("editor.weather.provider","Weather provider")}
                            propertyName="weatherProvider"
                            @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${"homeassistant"===this.config.weatherProvider?U`
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{entity:{domain:"weather"}}}
                                    .value=${(null===(e=this.config.weatherConfig)||void 0===e?void 0:e.entityId)||""}
                                    .label=${this.t("editor.weather.entity","Weather entity")}
                                    propertyName="weatherConfig.entityId"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select:{options:this._forecastTypeOptions(),mode:"dropdown"}}}
                                    .value=${(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.forecastType)||"auto"}
                                    .label=${this.t("editor.weather.forecast_type","Forecast type")}
                                    .helper=${this.t("editor.weather.forecast_type_help","Automatic uses a forecast supported by the selected entity")}
                                    propertyName="weatherConfig.forecastType"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        `:""}
                        ${"openweathermap"===this.config.weatherProvider?U`
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{type:"text"}}}
                                    .value=${(null===(o=this.config.weatherConfig)||void 0===o?void 0:o.apiKey)||""}
                                    .label=${this.t("editor.weather.api_key","API key")}
                                    .helper=${this.t("editor.weather.api_key_help","OpenWeatherMap API key")}
                                    propertyName="weatherConfig.apiKey"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:-90,max:90,step:1e-4,mode:"box"}}}
                                    .value=${(null===(i=this.config.weatherConfig)||void 0===i?void 0:i.latitude)||50.0755}
                                    .label=${this.t("editor.weather.latitude","Latitude")}
                                    propertyName="weatherConfig.latitude"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number:{min:-180,max:180,step:1e-4,mode:"box"}}}
                                    .value=${(null===(a=this.config.weatherConfig)||void 0===a?void 0:a.longitude)||14.4378}
                                    .label=${this.t("editor.weather.longitude","Longitude")}
                                    propertyName="weatherConfig.longitude"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select:{options:this._unitsOptions(),mode:"dropdown"}}}
                                    .value=${(null===(n=this.config.weatherConfig)||void 0===n?void 0:n.units)||"metric"}
                                    .label=${this.t("editor.weather.units","Units")}
                                    propertyName="weatherConfig.units"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        `:""}
                    </div>

                    <div class="section-title">${this.t("editor.weather.visible_content","Displayed information")}</div>
                    <div class="options">
                        <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{text:{type:"text"}}}
                            .value=${this.config.weatherTitle||this.t("common.title","Weather")}
                            .label=${this.t("editor.weather.title","Weather title")}
                            propertyName="weatherTitle"
                            @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean:{}}}
                            .value=${!1!==this.config.weatherShowTitle}
                            .label=${this.t("editor.weather.show_title","Show forecast heading")}
                            .helper=${this.t("editor.weather.show_title_help","Show the Weather or Forecast heading above the widget")}
                            propertyName="weatherShowTitle"
                            @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:this._weatherDisplayModeOptions(),mode:"dropdown"}}}
                            .value=${this.config.weatherDisplayMode||"both"}
                            .label=${this.t("editor.weather.display_mode","Display mode")}
                            propertyName="weatherDisplayMode"
                            @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        ${"forecast"===this.config.weatherDisplayMode||"both"===this.config.weatherDisplayMode?U`
                            <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:1,max:"hourly"===c?24:7,step:1,mode:"slider"}}}
                                .value=${d}
                                .label=${"hourly"===c?this.t("editor.weather.forecast_hours","Forecast hours"):this.t("editor.weather.forecast_days","Forecast days")}
                                .helper=${"hourly"===c?this.t("editor.weather.hours","{count} hours",{count:d}):this.t("editor.weather.days","{count} days",{count:d})}
                                propertyName="weatherForecastDays"
                                @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        `:""}
                    </div>
                `:""}

                ${s?U`
                    <div class="section-title">${this.t("editor.weather.icons","Weather icons")}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._weatherIconSetOptions,mode:"dropdown"}}}
                                .value=${this.config.weatherIconSet||("homeassistant"===this.config.weatherProvider?"metno":"openweathermap")}
                                .label=${this.t("editor.weather.icon_set","Weather icon set")}
                                propertyName="weatherIconSet"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        ${"wall-clock"===this.config.weatherIconSet?U`
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{boolean:{}}}
                                    .value=${!1!==this.config.weatherIconAnimation}
                                    .label=${this.t("editor.weather.animate_icons","Animate icons")}
                                    .helper=${this.t("editor.weather.animate_icons_help","Uses subtle motion and respects the system reduced-motion preference.")}
                                    propertyName="weatherIconAnimation"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        `:""}
                    </div>
                `:""}

                ${l?U`
                    <div class="section-title">${this.t("editor.weather.availability","Availability")}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${this.config.showWeather||!1}
                                .label=${this.t("editor.weather.show","Show weather")}
                                .helper=${this.t("editor.weather.show_help","Display current weather and forecast")}
                                propertyName="showWeather"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>
                    <div class="section-title">${this.t("editor.weather.refresh","Data refresh")}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:1,step:1,mode:"box"}}}
                                .value=${Math.floor((this.config.weatherUpdateInterval||1800)/60)}
                                .label=${this.t("editor.weather.update_interval","Update interval")}
                                .helper=${this.t("editor.weather.update_help","Update interval in minutes (minimum 1)")}
                                propertyName="weatherUpdateInterval"
                                .transformData=${e=>60*e}
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>
                `:""}
            </div>
        `}};un=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("weather-editor")],un);let pn=class extends Rt{render(){var e,t,o,i,a;return this.hass&&this.config?"all"!==this.section&&"appearance"!==this.section?U``:U`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:[{value:"auto",label:this.t("ui.auto","Auto (by zone)")},{value:"horizontal",label:this.t("ui.horizontal","Horizontal")},{value:"vertical",label:this.t("ui.vertical","Vertical")}],mode:"dropdown"}}}
                        .value=${null!==(e=this.config.orientation)&&void 0!==e?e:"auto"}
                        .label=${this.t("editor.separator.orientation","Orientation")}
                        .helper=${this.t("editor.separator.orientation_help","Auto follows the direction of the hosting zone.")}
                        propertyName="orientation"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{color_hex:""}}
                        .value=${null!==(t=this.config.color)&&void 0!==t?t:"#ffffff"}
                        .label=${this.t("editor.separator.color","Separator color")}
                        propertyName="color"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                        .value=${null!==(o=this.config.opacity)&&void 0!==o?o:.35}
                        .label=${this.t("editor.separator.opacity","Opacity")}
                        propertyName="opacity"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(i=this.config.thickness)&&void 0!==i?i:"1px"}
                        .label=${this.t("editor.separator.thickness","Thickness")}
                        .helper=${this.t("editor.separator.thickness_help","CSS length, for example 1px or 0.15rem.")}
                        propertyName="thickness"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(a=this.config.length)&&void 0!==a?a:"100%"}
                        .label=${this.t("editor.separator.length","Length")}
                        .helper=${this.t("editor.separator.length_help","CSS length or percentage, for example 100% or 240px.")}
                        propertyName="length"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>
            </div>
        `:U``}};pn.styles=n`
        .content {
            padding: 12px;
        }
    `,pn=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("separator-editor")],pn);const gn=["top-left","top-center","top-right","middle-left","center","middle-right","bottom-left","bottom-center","bottom-right"],mn=["grid-3x3","vertical-2-1","vertical-1-2","horizontal-2-1","horizontal-1-2"],vn=["none","glass"];function fn(e){return(null==e?void 0:e.endsWith("-left"))?"start":(null==e?void 0:e.endsWith("-right"))?"end":"center"}const yn={compact:{padding:"8px",zoneGap:"8px",widgetGap:"4px"},normal:{padding:"16px",zoneGap:"16px",widgetGap:"8px"},spacious:{padding:"32px",zoneGap:"24px",widgetGap:"16px"}},bn=ke("migrate-config");function wn(e){const t={};for(const[o,i]of Object.entries(e))void 0!==i&&(t[o]=i);return t}const _n=["timeFormat","dateFormat","sensors","showWeather","weatherProvider","weatherConfig","weatherDisplayMode","weatherForecastDays","weatherTitle","weatherShowTitle","weatherUpdateInterval","weatherIconSet","weatherIconAnimation","transportation","actionBar","enableActionBar","imageSource","imageConfig","backgroundImages","backgroundOpacity","backgroundRotationInterval","objectFit","backgroundBlur","backgroundGrayscale","fontColor","fontFamily","textShadow","language","timeZone","size","customSizes"];function xn(e){var t,o,i,a,n,r,s,l,c,d,h,u,p,g,m;if(function(e){var t;return!!(null===(t=e.layout)||void 0===t?void 0:t.zones)}(e))return e;const v={},f=(e,t,o)=>{const i=v[e];i?i.widgets.push(t):v[e]={...o,widgets:[t]}};f("center",$n({type:"clock",id:"clock",timeFormat:e.timeFormat,clockSize:null===(t=e.customSizes)||void 0===t?void 0:t.clockSize})),f("center",$n({type:"date",id:"date",dateFormat:e.dateFormat,dateSize:null===(o=e.customSizes)||void 0===o?void 0:o.dateSize})),(null===(i=e.customSizes)||void 0===i?void 0:i.clockTopMargin)&&bn.info(`customSizes.clockTopMargin ('${e.customSizes.clockTopMargin}') is obsolete in the zone layout and was dropped`),e.sensors&&e.sensors.length>0&&f("top-left",$n({type:"sensors",id:"sensors",sensors:e.sensors,labelSize:null===(a=e.customSizes)||void 0===a?void 0:a.labelSize,valueSize:null===(n=e.customSizes)||void 0===n?void 0:n.valueSize})),e.showWeather&&f("top-right",$n({type:"weather",id:"weather",provider:e.weatherProvider,providerConfig:e.weatherConfig,displayMode:e.weatherDisplayMode,forecastDays:e.weatherForecastDays,title:e.weatherTitle,showTitle:e.weatherShowTitle,updateInterval:e.weatherUpdateInterval,iconSet:null!==(r=e.weatherIconSet)&&void 0!==r?r:null===(s=e.weatherConfig)||void 0===s?void 0:s.iconSet,animateIcons:e.weatherIconAnimation,labelSize:null===(l=e.customSizes)||void 0===l?void 0:l.labelSize,valueSize:null===(c=e.customSizes)||void 0===c?void 0:c.valueSize})),e.transportation&&f("bottom-center",$n({type:"transportation",id:"transportation",...e.transportation,priority:10}),{mode:"exclusive"}),(null!==(h=null===(d=e.actionBar)||void 0===d?void 0:d.enabled)&&void 0!==h?h:!0===e.enableActionBar)&&f("bottom-center",$n({type:"action-bar",id:"action-bar",actions:[],...e.actionBar,enabled:!0,iconSize:null===(u=e.customSizes)||void 0===u?void 0:u.actionBarIconSize,titleSize:null!==(g=null===(p=e.customSizes)||void 0===p?void 0:p.actionBarTitleSize)&&void 0!==g?g:null===(m=e.actionBar)||void 0===m?void 0:m.titleSize,priority:5}),{mode:"exclusive"});const y=wn({source:e.imageSource,config:e.imageConfig,images:e.backgroundImages,opacity:e.backgroundOpacity,transparent:e.backgroundTransparent,rotationInterval:e.backgroundRotationInterval,objectFit:e.objectFit,blur:e.backgroundBlur,grayscale:e.backgroundGrayscale}),b=wn({fontColor:e.fontColor,fontFamily:e.fontFamily,textShadow:e.textShadow,language:e.language,timeZone:e.timeZone,size:e.size}),w={};for(const[t,o]of Object.entries(e))_n.includes(t)||void 0===o||(w[t]=o);const _={...w,layout:{zones:v}};return Object.keys(y).length>0&&(_.background=y),Object.keys(b).length>0&&(_.appearance=b),_}function $n(e){return wn(e)}const kn=/^(0|-?\d+(\.\d+)?(px|rem|em|%|vh|vw))$/;function Sn(e,t){return function(e,t){const o=e.trim().split(/\s+/);return o.length>=1&&o.length<=t&&o.every(e=>kn.test(e))}(t,"padding"===e?4:1)}function zn(e){const t=null==e?void 0:e.spacing,o="string"==typeof t&&t in yn?t:"normal";"string"!=typeof t||t in yn||bn.warn(`Unknown spacing preset '${t}', falling back to 'normal'`);const i={...yn[o]};if(t&&"object"==typeof t){const e=["padding","zoneGap","widgetGap"];for(const o of e){const e=t[o];void 0!==e&&("string"==typeof e&&Sn(o,e)?i[o]=e:bn.warn(`Invalid spacing.${o} value '${e}', falling back to '${i[o]}'`))}}return i}function Cn(e){const t=e.trim().split(/\s+/),[o,i=o,a=o,n=i]=t;return 2===t.length?{top:o,right:i,bottom:o,left:i}:3===t.length?{top:o,right:i,bottom:a,left:i}:{top:o,right:i,bottom:a,left:n}}function In(e){return JSON.parse(JSON.stringify(e))}function En(e,t){return Object.values(e.zones).some(e=>{var o;return null===(o=null==e?void 0:e.widgets)||void 0===o?void 0:o.some(e=>e.type===t)})}function An(e,t){const o=new Set(t),i=new Map;for(const[t,a]of Object.entries(e.zones))null==a||a.widgets.forEach((e,a)=>{if(!o.has(e.type))return;const n=e.id===e.type,r=i.get(e.type);(!r||n&&!r.canonical)&&i.set(e.type,{zone:t,index:a,canonical:n})});const a=In(e);for(const[t,n]of Object.entries(e.zones)){if(!n)continue;const e=a.zones[t];e&&(e.widgets=n.widgets.filter((e,a)=>{if(!o.has(e.type))return!0;const n=i.get(e.type);return(null==n?void 0:n.zone)===t&&n.index===a}).map(e=>In(e)),0===e.widgets.length&&delete a.zones[t])}return a}function Dn(e,t){const o=function(e){var t;const o=new Set;for(const i of Object.values(e.zones))null===(t=null==i?void 0:i.widgets)||void 0===t||t.forEach(e=>{e.id&&o.add(e.id)});return o}(e);if(!o.has(t))return t;let i=2;for(;o.has(`${t}-${i}`);)i++;return`${t}-${i}`}function Pn(e,t){var o;for(const[i,a]of Object.entries(e.zones)){const e=null!==(o=null==a?void 0:a.widgets.findIndex(e=>e.id===t))&&void 0!==o?o:-1;if(e>=0&&a)return{zone:i,index:e,widget:a.widgets[e]}}}function Tn(e){if(!e)return{};const{widgets:t,...o}=e;return o}function On(e,t,o){for(const i of t){if(i===o)continue;const t=e.zones[i];if(!t)continue;const a=Tn(t);Object.keys(a).length>0?e.zones[i]={...a,widgets:[]}:delete e.zones[i]}}function Nn(e,t,o,i){var a;const n=t[0];if(!n)return In(e);const r=In(e),s=null!==(a=e.zones[n])&&void 0!==a?a:t.map(t=>e.zones[t]).find(Boolean),l=t.flatMap(e=>{var t,o;return null!==(o=null===(t=r.zones[e])||void 0===t?void 0:t.widgets)&&void 0!==o?o:[]}),c={...In(o),id:Dn(e,o.type)},d=void 0===i?l.length:Math.max(0,Math.min(i,l.length));return l.splice(d,0,c),r.zones[n]={...Tn(s),widgets:l},On(r,t,n),r}function Fn(e,t){const o=In(e);return void 0===t?delete o.spacing:o.spacing=t,o}function Mn(e,t){const o=In(e);return"none"===t?delete o.preset:o.preset=t,o}function Rn(e,t,o,i){var a;for(const n of Object.values(e.layout.zones))null===(a=null==n?void 0:n.widgets)||void 0===a||a.forEach(e=>{e.type===t&&(void 0===i||""===i?delete e[o]:e[o]=i)})}function jn(e,t,o){const i=In(e);switch(t){case"fontColor":case"fontFamily":case"textShadow":case"language":case"size":return i.appearance={...i.appearance,[t]:o},i;case"logLevel":return i.logLevel=o,i;case"customSizes.clockSize":return Rn(i,"clock","clockSize",o),i;case"customSizes.dateSize":return Rn(i,"date","dateSize",o),i;case"customSizes.labelSize":return Rn(i,"sensors","labelSize",o),Rn(i,"weather","labelSize",o),i;case"customSizes.valueSize":return Rn(i,"sensors","valueSize",o),Rn(i,"weather","valueSize",o),i;case"customSizes.actionBarIconSize":return Rn(i,"action-bar","iconSize",o),i;case"customSizes.actionBarTitleSize":return Rn(i,"action-bar","titleSize",o),i;default:return i}}function Ln(e){const t=null==e?void 0:e.format;return t&&mn.includes(t)?t:"grid-3x3"}function Hn(e){const t=null==e?void 0:e.preset;return t&&vn.includes(t)?t:"none"}function Bn(e){switch(e){case"vertical-2-1":return{columns:"minmax(0, 2fr) minmax(0, 1fr)",rows:"minmax(0, 1fr) auto minmax(0, 1fr)"};case"vertical-1-2":return{columns:"minmax(0, 1fr) minmax(0, 2fr)",rows:"minmax(0, 1fr) auto minmax(0, 1fr)"};case"horizontal-2-1":return{columns:"minmax(0, 1fr) auto minmax(0, 1fr)",rows:"minmax(0, 2fr) minmax(0, 1fr)"};case"horizontal-1-2":return{columns:"minmax(0, 1fr) auto minmax(0, 1fr)",rows:"minmax(0, 1fr) minmax(0, 2fr)"};default:return{columns:"minmax(0, 1fr) auto minmax(0, 1fr)",rows:"minmax(0, 1fr) auto minmax(0, 1fr)"}}}function Wn(e){if("center"===e)return{row:"middle",column:"center"};const[t,o]=e.split("-");return{row:t,column:o}}function Un(e){return e.startsWith("vertical-")?"vertical":e.startsWith("horizontal-")?"horizontal":void 0}function Vn(e,t){if(!Un(e))return;const{row:o,column:i}=Wn(t);return"vertical-2-1"===e?"right"===i?2:1:"vertical-1-2"===e?"left"===i?1:2:"horizontal-2-1"===e?"bottom"===o?2:1:"top"===o?1:2}function Zn(e,t){const o=Un(e);if(!o)return;const{row:i,column:a}=Wn(t);return"vertical"===o?"top"===i?"start":"bottom"===i?"end":"center":"left"===a?"start":"right"===a?"end":"center"}function qn(e,t,o){return Un(e)?gn.filter(i=>Vn(e,i)===t&&Zn(e,i)===o):[]}function Kn(e,t,o){return qn(e,t,o)[0]}function Gn(e,t){const{row:o,column:i}=Wn(t),a="top"===o?"start":"bottom"===o?"end":"center";return"vertical-2-1"===e?{row:"top"===o?1:"middle"===o?2:3,column:"right"===i?2:1,alignSelf:a}:"vertical-1-2"===e?{row:"top"===o?1:"middle"===o?2:3,column:"left"===i?1:2,alignSelf:a}:"horizontal-2-1"===e?{row:"bottom"===o?2:1,column:"left"===i?1:"center"===i?2:3,alignSelf:a}:"horizontal-1-2"===e?{row:"top"===o?1:2,column:"left"===i?1:"center"===i?2:3,alignSelf:a}:{row:"top"===o?1:"middle"===o?2:3,column:"left"===i?1:"center"===i?2:3,alignSelf:a}}function Jn(e){switch(e){case"vertical-2-1":return"right";case"vertical-1-2":return"left";case"horizontal-2-1":return"bottom";case"horizontal-1-2":return"top";default:return}}var Yn=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Xn=class extends de{constructor(){super(...arguments),this.config={},this.inspector=!1,this.spacingDraft={},this.spacingErrors={}}t(e,t){return Je(e,this.hass,t)}get v3(){return xn(this.config)}get layout(){return this.v3.layout}static get styles(){return n`
            .content {
                display: flex;
                flex-direction: column;
                gap: 12px;
                padding: 12px;
            }

            .section-title {
                margin: 2px 0 -4px;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.73rem;
                font-weight: 750;
                letter-spacing: 0.06em;
                text-transform: uppercase;
            }

            .section-group {
                padding-top: 6px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .hint {
                margin: 0 0 12px;
                font-size: 0.85rem;
                opacity: 0.7;
            }

            .field-help {
                margin: -6px 0 10px;
                font-size: 0.75rem;
                opacity: 0.62;
            }

            .field-error {
                margin: -6px 0 10px;
                color: var(--error-color, #db4437);
                font-size: 0.75rem;
            }

            ha-row-selector {
                display: block;
                width: 100%;
            }
        `}emitLayout(e){kt(this,"config-changed",{config:{...this.v3,layout:e}})}get spacingPresetValue(){const e=this.layout.spacing;return void 0===e?"normal":"string"==typeof e?e:"custom"}handleSpacingPresetChanged(e){this.spacingDraft={},this.spacingErrors={},"custom"===e?this.emitLayout(Fn(this.layout,{...zn(this.layout)})):"normal"===e?this.emitLayout(Fn(this.layout,void 0)):this.emitLayout(Fn(this.layout,e))}handleFormatChanged(e){const t=e;let o=function(e,t){const o=In(e);return"grid-3x3"===t?delete o.format:o.format=t,o}(this.layout,t);"grid-3x3"===t&&(o=Mn(o,"none")),this.emitLayout(o)}handleVisualPresetChanged(e){this.emitLayout(Mn(this.layout,e))}renderFormat(){var e;const t=Ln(this.layout);return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"grid-3x3",label:this.t("layout.format_grid","Grid 3 × 3")},{value:"vertical-2-1",label:this.t("layout.format_vertical_2_1","Vertical 2/3 + 1/3")},{value:"vertical-1-2",label:this.t("layout.format_vertical_1_2","Vertical 1/3 + 2/3")},{value:"horizontal-2-1",label:this.t("layout.format_horizontal_2_1","Horizontal 2/3 + 1/3")},{value:"horizontal-1-2",label:this.t("layout.format_horizontal_1_2","Horizontal 1/3 + 2/3")}],mode:"dropdown"}}}
                    .value=${t}
                    .label=${this.t("layout.format","Layout format")}
                    .labelPosition=${this.inspector?aa.Top:aa.Left}
                    @value-changed=${e=>this.handleFormatChanged(e.detail.value)}
            ></ha-row-selector>
            <div class="field-help">
                ${this.t("layout.format_help","Changes the canvas geometry; widgets keep their current zones and settings.")}
            </div>
            ${"grid-3x3"===t?U`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!0===this.layout.compactRows}
                        .label=${this.t("layout.compact_rows","Compact rows (original behavior)")}
                        .labelPosition=${this.inspector?aa.Top:aa.Left}
                        @value-changed=${e=>this.emitLayout({...this.layout,compactRows:!0===e.detail.value})}
                ></ha-row-selector>
                <div class="field-help">
                    ${this.t("layout.compact_rows_help","Group top and bottom widgets in the middle when the middle row is empty. Off keeps them at opposite edges.")}
                </div>
            `:""}
            ${"grid-3x3"!==t?U`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:[{value:"none",label:this.t("layout.preset_none","No visual preset")},{value:"glass",label:this.t("layout.preset_glass","Glass information panel")}],mode:"dropdown"}}}
                        .value=${null!==(e=this.layout.preset)&&void 0!==e?e:"none"}
                        .label=${this.t("layout.visual_preset","Visual preset")}
                        .labelPosition=${this.inspector?aa.Top:aa.Left}
                        @value-changed=${e=>this.handleVisualPresetChanged(e.detail.value)}
                ></ha-row-selector>
                <div class="field-help">
                    ${this.t("layout.preset_help","Presets only style the layout and never change entities, actions, or widget placement.")}
                </div>
            `:""}
        `}handleSpacingDraftChanged(e,t){if(this.spacingDraft={...this.spacingDraft,[e]:t},this.spacingErrors[e]){const t={...this.spacingErrors};delete t[e],this.spacingErrors=t}}commitSpacingValue(e){const t=this.spacingDraft[e];if(void 0===t)return;const o=t.trim().replace(/\s+/g," ");if(""!==o&&!Sn(e,o))return void(this.spacingErrors={...this.spacingErrors,[e]:"padding"===e?this.t("spacing.invalid_padding","Use 1–4 CSS lengths, for example: 60px 60px 60px 16px."):this.t("spacing.invalid_length","Use one CSS length, for example: 16px.")});const i={...this.spacingDraft};delete i[e],this.spacingDraft=i;const a={...this.spacingErrors};delete a[e],this.spacingErrors=a;const n={..."object"==typeof this.layout.spacing?this.layout.spacing:{}};""===o?delete n[e]:n[e]=o,this.emitLayout(Fn(this.layout,n))}renderSpacingField(e,t,o,i){var a;return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{}}}
                    .value=${null!==(a=this.spacingDraft[e])&&void 0!==a?a:i[e]}
                    .label=${t}
                    .labelPosition=${this.inspector?aa.Top:aa.Left}
                    @value-changed=${t=>this.handleSpacingDraftChanged(e,t.detail.value)}
                    @focusout=${()=>this.commitSpacingValue(e)}
                    @keydown=${t=>{"Enter"===t.key&&this.commitSpacingValue(e)}}
            ></ha-row-selector>
            ${this.spacingErrors[e]?U`<div class="field-error">${this.spacingErrors[e]}</div>`:U`<div class="field-help">${o}</div>`}
        `}renderSpacing(){const e=zn(this.layout);return U`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"compact",label:this.t("spacing.compact","Compact")},{value:"normal",label:this.t("spacing.normal","Normal")},{value:"spacious",label:this.t("spacing.spacious","Spacious")},{value:"custom",label:this.t("spacing.custom","Custom")}],mode:"dropdown"}}}
                    .value=${this.spacingPresetValue}
                    .label=${this.t("spacing.preset","Spacing preset")}
                    .labelPosition=${this.inspector?aa.Top:aa.Left}
                    @value-changed=${e=>this.handleSpacingPresetChanged(e.detail.value)}
            ></ha-row-selector>
            ${"custom"===this.spacingPresetValue?U`
                ${this.renderSpacingField("padding",this.t("spacing.card_padding","Card padding"),this.t("spacing.card_padding_help","1–4 values: top, right, bottom, left. Example: 60px 60px 60px 16px."),e)}
                ${this.renderSpacingField("zoneGap",this.t("spacing.zone_gap","Zone gap"),this.t("spacing.zone_gap_help","One value, for example: 24px."),e)}
                ${this.renderSpacingField("widgetGap",this.t("spacing.widget_gap","Widget gap"),this.t("spacing.widget_gap_help","One value, for example: 16px."),e)}
            `:""}
        `}render(){return this.hass?U`
            <div class="content">
                ${this.config.layout?"":U`
                    <p class="hint">${this.t("spacing.legacy_hint","The first spacing change converts this legacy configuration to the zone format.")}</p>
                `}
                <div class="section-title">${this.t("layout.structure","Layout structure")}</div>
                <div class="section-group">${this.renderFormat()}</div>
                <div class="section-title">${this.t("general.spacing","Spacing")}</div>
                <div class="section-group">${this.renderSpacing()}</div>
            </div>
        `:U``}};function Qn(e){const t={type:e.type};return void 0!==e.id&&(t.id=e.id),void 0!==e.priority&&(t.priority=e.priority),void 0!==e.style&&(t.style=e.style),void 0!==e.visibility&&(t.visibility=e.visibility),t}function er(e){return Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e))}function tr(e){var t;const o=null!==(t=e.background)&&void 0!==t?t:{};return er({imageSource:o.source,imageConfig:o.config,backgroundImages:o.images,backgroundOpacity:o.opacity,backgroundTransparent:o.transparent,backgroundRotationInterval:o.rotationInterval,objectFit:o.objectFit,backgroundBlur:o.blur,backgroundGrayscale:o.grayscale})}function or(e){return er({source:e.imageSource,config:e.imageConfig,images:e.backgroundImages,opacity:e.backgroundOpacity,transparent:e.backgroundTransparent,rotationInterval:e.backgroundRotationInterval,objectFit:e.objectFit,blur:e.backgroundBlur,grayscale:e.backgroundGrayscale})}Yn([me({type:Object})],Xn.prototype,"hass",void 0),Yn([me({type:Object})],Xn.prototype,"config",void 0),Yn([me({type:Boolean})],Xn.prototype,"inspector",void 0),Yn([ve()],Xn.prototype,"spacingDraft",void 0),Yn([ve()],Xn.prototype,"spacingErrors",void 0),Xn=Yn([ue("layout-editor")],Xn);var ir=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let ar=class extends de{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._actions=[],this._languageOptions=[]}t(e,t){return Je(e,this.hass,t)}connectedCallback(){super.connectedCallback(),this._languageOptions=Xe()}setConfig(e){var t,o,i,a,n,r,s;const l=e;if(l.layout)return void(this._config=l);const c=l.imageSource||"none";let d={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};l.timeFormat&&(d={...d,...l.timeFormat},void 0===l.timeFormat.second&&(d.second=void 0)),this._config={...l,timeFormat:d,dateFormat:l.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==l.backgroundOpacity?l.backgroundOpacity:.3,imageSource:c,imageConfig:l.imageConfig||{},backgroundRotationInterval:l.backgroundRotationInterval||90,sensors:l.sensors||[],fontColor:l.fontColor||"#FFFFFF",size:l.size||ut.Medium,customSizes:l.customSizes?{clockSize:null!==(t=l.customSizes.clockSize)&&void 0!==t?t:"16rem",dateSize:null!==(o=l.customSizes.dateSize)&&void 0!==o?o:"6rem",labelSize:null!==(i=l.customSizes.labelSize)&&void 0!==i?i:"1.5rem",valueSize:null!==(a=l.customSizes.valueSize)&&void 0!==a?a:"3rem",actionBarIconSize:null!==(n=l.customSizes.actionBarIconSize)&&void 0!==n?n:"72px",actionBarTitleSize:null!==(r=l.customSizes.actionBarTitleSize)&&void 0!==r?r:"18px",clockTopMargin:null!==(s=l.customSizes.clockTopMargin)&&void 0!==s?s:"0rem"}:{clockSize:"16rem",dateSize:"6rem",labelSize:"1.5rem",valueSize:"3rem",actionBarIconSize:"72px",actionBarTitleSize:"18px",clockTopMargin:"0rem"},showWeather:void 0!==l.showWeather&&l.showWeather,weatherProvider:l.weatherProvider||"openweathermap",weatherConfig:l.weatherConfig||{},weatherDisplayMode:l.weatherDisplayMode||"both",weatherForecastDays:l.weatherForecastDays||3,weatherShowTitle:!1!==l.weatherShowTitle,transportation:l.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops(),this._loadActions()}_loadSensors(){var e;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadActions(){var e;(null===(e=this._config)||void 0===e?void 0:e.actionBar)&&this._config.actionBar.actions&&this._config.actionBar.actions.length>0?this._actions=[...this._config.actionBar.actions]:this._actions=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}get _isV3(){var e;return!!(null===(e=this._config)||void 0===e?void 0:e.layout)}_generalValue(e){var t,o;return this._isV3?null===(t=this._config.appearance)||void 0===t?void 0:t[e]:null===(o=this._config)||void 0===o?void 0:o[e]}_sizeValue(e,t,o,i){var a,n,r,s,l;if(this._isV3){const e="sensors"===t?this._widgetSizeValue("weather",o):void 0;return null!==(n=null!==(a=this._widgetSizeValue(t,o))&&void 0!==a?a:e)&&void 0!==n?n:i}return null!==(l=(null!==(s=null===(r=this._config)||void 0===r?void 0:r.customSizes)&&void 0!==s?s:{})[e])&&void 0!==l?l:i}_widgetSizeValue(e,t){var o,i,a;const n=null!==(i=null===(o=this._config.layout)||void 0===o?void 0:o.zones)&&void 0!==i?i:{};for(const o of Object.values(n))for(const i of null!==(a=null==o?void 0:o.widgets)&&void 0!==a?a:[])if(i.type===e&&void 0!==i[t])return i[t]}_handleFormValueChanged(e){if(e.stopPropagation(),!this._config)return;if(this._isV3){const t=jn(this._config,e.detail.propertyName,e.detail.value);return this._config=t,void kt(this,"config-changed",{config:this._config})}const t=function(e,t,o){const i=JSON.parse(JSON.stringify(e)),a=t.split(".");let n=i;for(let e=0;e<a.length-1;e++){const t=a[e];void 0===n[t]&&(n[t]={}),n=n[t]}return n[a[a.length-1]]=o,i}(this._config,e.detail.propertyName,e.detail.value);this._config=t,kt(this,"config-changed",{config:t})}static get styles(){return n`
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

            .designer-notice {
                display: grid;
                grid-template-columns: 44px minmax(0, 1fr);
                gap: 14px;
                align-items: start;
                margin: 16px;
                padding: 16px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
                border-radius: 12px;
                background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
            }

            .designer-notice-icon {
                display: grid;
                place-items: center;
                width: 44px;
                height: 44px;
                border-radius: 10px;
                background: var(--primary-color, #2878d8);
                color: var(--text-primary-color, #fff);
            }

            .designer-notice-icon ha-icon {
                --mdc-icon-size: 24px;
            }

            .designer-notice strong {
                display: block;
                margin: 2px 0 6px;
                color: var(--primary-text-color, #fff);
                font-size: 1rem;
            }

            .designer-notice p {
                margin: 0;
                color: var(--secondary-text-color, #a0a0a0);
                font-size: 0.86rem;
                line-height: 1.5;
            }
        `}render(){return this.hass&&this._config?this._isV3?U`
            <div class="designer-notice">
                <span class="designer-notice-icon"><ha-icon icon="mdi:layers-edit"></ha-icon></span>
                <div>
                    <strong>${this.t("designer.use_designer_title","Configure this card in Designer")}</strong>
                    <p>${this.t("designer.use_designer_help","Close this dialog. In dashboard edit mode, open the card with Configure card and use Card settings or select a widget.")}</p>
                </div>
            </div>
        `:this.renderLegacyEditor():U``}renderLegacyEditor(){var e,t,o,i,a;return this.hass&&this._config?U`
            <div class="form-container">
                <!-- General Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">${this.t("general.title","General")}</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{color_hex:""}}
                                .value=${this._generalValue("fontColor")}
                                .label=${this.t("general.font_color","Font color")}
                                propertyName="fontColor"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${null!==(e=this._generalValue("fontFamily"))&&void 0!==e?e:""}
                                .label=${this.t("general.font_family","Font family")}
                                .helper=${this.t("general.font_family_help","CSS font family or stack; the font must already be loaded")}
                                propertyName="fontFamily"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${null!==(t=this._generalValue("textShadow"))&&void 0!==t?t:""}
                                .label=${this.t("general.text_shadow","Text shadow")}
                                .helper=${this.t("general.text_shadow_help","CSS text-shadow value, for example 0 2px 4px rgba(0, 0, 0, 0.8)")}
                                propertyName="textShadow"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._languageOptions,mode:"dropdown"}}}
                                .value=${Ge(String(this._generalValue("language")||(null===(o=this.hass.locale)||void 0===o?void 0:o.language)||this.hass.language||"en"))}
                                .label=${this.t("general.language","Language")}
                                propertyName="language"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:[{value:"debug",label:"Debug"},{value:"info",label:"Info"},{value:"warn",label:"Warning"},{value:"error",label:"Error"},{value:"none",label:"None"}],mode:"dropdown"}}}
                                .value=${this._config.logLevel||"info"}
                                .label=${this.t("general.log_level","Log level")}
                                propertyName="logLevel"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <!-- Size Settings -->
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:[{value:ut.Large,label:this.t("general.large","Large")},{value:ut.Medium,label:this.t("general.medium","Medium")},{value:ut.Small,label:this.t("general.small","Small")},{value:ut.Custom,label:this.t("spacing.custom","Custom")}],mode:"dropdown"}}}
                                .value=${this._generalValue("size")||ut.Medium}
                                .label=${this.t("general.size","Size")}
                                propertyName="size"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${(this._generalValue("size")||ut.Medium)===ut.Custom?U`
                            <h4>${this.t("general.custom_sizes","Custom sizes")}</h4>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("clockSize","clock","clockSize","16rem")}
                                    .label=${this.t("inspector.clock_size","Clock size (e.g., 16rem)")}
                                    propertyName="customSizes.clockSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${this._isV3?"":U`
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{}}}
                                        .value=${(null===(i=this._config.customSizes)||void 0===i?void 0:i.clockTopMargin)||"0rem"}
                                        .label=${this.t("general.clock_top_margin","Clock top margin (e.g., 0rem)")}
                                        propertyName="customSizes.clockTopMargin"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            `}

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("dateSize","date","dateSize","6rem")}
                                    .label=${this.t("inspector.date_size","Date size (e.g., 6rem)")}
                                    propertyName="customSizes.dateSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("labelSize","sensors","labelSize","1.5rem")}
                                    .label=${this.t("inspector.label_size","Label size (e.g., 1.5rem)")}
                                    propertyName="customSizes.labelSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("valueSize","sensors","valueSize","3rem")}
                                    .label=${this.t("inspector.value_size","Value size (e.g., 3rem)")}
                                    propertyName="customSizes.valueSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("actionBarIconSize","action-bar","iconSize","72px")}
                                    .label=${this.t("inspector.icon_size","Action bar icon size (e.g., 72px)")}
                                    propertyName="customSizes.actionBarIconSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("actionBarTitleSize","action-bar","titleSize","18px")}
                                    .label=${this.t("inspector.action_title_size","Button title size (e.g., 18px)")}
                                    propertyName="customSizes.actionBarTitleSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Spacing Section (widget placement/configuration is edited in-place) -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">${this.t("general.spacing","Spacing")}</h3>
                    <layout-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,kt(this,"config-changed",{config:this._config})}}
                    ></layout-editor>
                </ha-expansion-panel>

                <!-- Background Section (v3: adapted to background.* keys) -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">${this.t("general.background","Background")}</h3>
                    <background-editor
                        .hass=${this.hass}
                        .config=${this._isV3?tr(this._config):this._config}
                        @config-changed=${e=>{this._isV3?this._config={...this._config,background:or(e.detail.config)}:(this._config=e.detail.config,this._loadBackgroundImages()),kt(this,"config-changed",{config:this._config})}}
                    ></background-editor>
                </ha-expansion-panel>

                ${this._isV3?"":U`
                    <!-- Legacy sections: for zone layouts these settings are edited
                         per widget in the Layout section above -->

                    <!-- Time Format Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("general.time_format","Time format")}</h3>
                        <time-format-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,kt(this,"config-changed",{config:this._config})}}
                        ></time-format-editor>
                    </ha-expansion-panel>

                    <!-- Date Format Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("general.date_format","Date format")}</h3>
                        <date-format-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,kt(this,"config-changed",{config:this._config})}}
                        ></date-format-editor>
                    </ha-expansion-panel>

                    <!-- Sensors Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("widgets.sensors","Sensors")}</h3>
                        <sensors-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,this._loadSensors(),kt(this,"config-changed",{config:this._config})}}
                        ></sensors-editor>
                    </ha-expansion-panel>

                    <!-- Weather Settings Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("widgets.weather","Weather")}</h3>
                        <weather-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,kt(this,"config-changed",{config:this._config})}}
                        ></weather-editor>
                    </ha-expansion-panel>

                    <!-- Transportation Settings Section -->
                    ${!0===(null===(a=this._config.transportation)||void 0===a?void 0:a.enabled)?U`
                        <ha-expansion-panel outlined>
                            <h3 slot="header">${this.t("widgets.transportation","Transportation")}</h3>
                            <transportation-editor
                                .hass=${this.hass}
                                .config=${this._config}
                                @config-changed=${e=>{this._config=e.detail.config,this._loadStops(),kt(this,"config-changed",{config:this._config})}}
                            ></transportation-editor>
                        </ha-expansion-panel>
                    `:""}

                    <!-- Action Bar Settings Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("widgets.action_bar","Action bar")}</h3>
                        <action-bar-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,this._loadActions(),kt(this,"config-changed",{config:this._config})}}
                        ></action-bar-editor>
                    </ha-expansion-panel>
                `}
            </div>
        `:U``}};ir([me({type:Object})],ar.prototype,"hass",void 0),ir([me({type:Object})],ar.prototype,"_config",void 0),ir([me({type:Array})],ar.prototype,"_sensors",void 0),ir([me({type:Array})],ar.prototype,"_backgroundImages",void 0),ir([me({type:Array})],ar.prototype,"_stops",void 0),ir([me({type:Array})],ar.prototype,"_actions",void 0),ar=ir([ue("wall-clock-card-editor")],ar);class nr{constructor(){this.widgets=new Map,this.logger=ke("widget-registry")}static getInstance(){return nr.instance||(nr.instance=new nr),nr.instance}register(e){this.widgets.set(e.widgetId,e)}registerAll(e){e.forEach(e=>this.register(e))}getWidget(e){return this.widgets.get(e)}getAllWidgets(){return Array.from(this.widgets.values())}createElement(e){const t=this.widgets.get(e.type);if(!t)return void this.logger.warn(`Unknown widget type '${e.type}', ignoring`);const o=document.createElement(t.elementTag);return o.config=e,o}}const rr={weather:3,calendar:3,"calendar-month":4,transportation:3,"action-bar":2};function sr(e){return!["sensors","calendar"].includes(null!=e?e:"")}function lr(e,t){return e&&"auto"!==e?e:"center"===t||(null==t?void 0:t.endsWith("-center"))?"horizontal":"vertical"}function cr(e,t,o){if(e&&"auto"!==e)return e;const i=null!=o?o:fn(t);return"start"===i?"left":"end"===i?"right":"center"}var dr=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};const hr={"top-left":"Top left","top-center":"Top center","top-right":"Top right","middle-left":"Left",center:"Center","middle-right":"Right","bottom-left":"Bottom left","bottom-center":"Bottom center","bottom-right":"Bottom right"},ur=[{labelKey:"designer.information",fallback:"Information",widgetIds:["sensors","weather","calendar","calendar-month","transportation"]},{labelKey:"designer.time",fallback:"Time",widgetIds:["clock","date"]},{labelKey:"designer.controls",fallback:"Controls",widgetIds:["action-bar"]}];let pr=class extends de{constructor(){super(...arguments),this.layout={zones:{}},this.selectedWidget=null,this.selectedZone=null,this.selectable=!1,this.paletteQuery="",this.sortables=[],this.sortableElements=[],this.sortableSetupRevision=0}t(e,t,o={}){return Je(e,this.hass,t,o)}zoneLabel(e){return this.t(`zones.${e.replace(/-/g,"_")}`,hr[e])}widgetName(e,t){var o;return this.t(`widgets.${t.replace(/-/g,"_")}`,null!==(o=null==e?void 0:e.name)&&void 0!==o?o:t)}static get styles(){return n`
            :host {
                display: grid;
                grid-template-columns: 188px minmax(0, 1fr);
                height: 100%;
                min-width: 0;
                min-height: 0;
                box-sizing: border-box;
                background:
                    var(--primary-background-color, #fafafa);
                color: var(--primary-text-color, #212121);
            }

            .zone-grid {
                grid-column: 2;
                grid-row: 1;
                display: grid;
                position: relative;
                box-sizing: border-box;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                grid-template-rows: repeat(3, minmax(0, 1fr));
                gap: 10px;
                min-height: 0;
                min-width: 0;
                padding: 16px;
                overflow: hidden;
            }

            .format-preview-surface {
                position: relative;
                z-index: 0;
                pointer-events: none;
                min-width: 0;
                min-height: 0;
            }

            .format-preview-surface::before {
                content: '';
                position: absolute;
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent);
            }

            .format-preview-surface.left {
                grid-column: 1;
                grid-row: 1 / -1;
            }

            .format-preview-surface.left::before {
                inset:
                    calc(-1 * var(--preview-padding-top))
                    calc(-1 * var(--preview-zone-gap))
                    calc(-1 * var(--preview-padding-bottom))
                    calc(-1 * var(--preview-padding-left));
                border-right: 2px solid var(--primary-color, #03a9f4);
            }

            .format-preview-surface.right {
                grid-column: 2;
                grid-row: 1 / -1;
            }

            .format-preview-surface.right::before {
                inset:
                    calc(-1 * var(--preview-padding-top))
                    calc(-1 * var(--preview-padding-right))
                    calc(-1 * var(--preview-padding-bottom))
                    calc(-1 * var(--preview-zone-gap));
                border-left: 2px solid var(--primary-color, #03a9f4);
            }

            .format-preview-surface.top {
                grid-column: 1 / -1;
                grid-row: 1;
            }

            .format-preview-surface.top::before {
                inset:
                    calc(-1 * var(--preview-padding-top))
                    calc(-1 * var(--preview-padding-right))
                    calc(-1 * var(--preview-zone-gap))
                    calc(-1 * var(--preview-padding-left));
                border-bottom: 2px solid var(--primary-color, #03a9f4);
            }

            .format-preview-surface.bottom {
                grid-column: 1 / -1;
                grid-row: 2;
            }

            .format-preview-surface.bottom::before {
                inset:
                    calc(-1 * var(--preview-zone-gap))
                    calc(-1 * var(--preview-padding-right))
                    calc(-1 * var(--preview-padding-bottom))
                    calc(-1 * var(--preview-padding-left));
                border-top: 2px solid var(--primary-color, #03a9f4);
            }

            .format-preview-surface.glass::before {
                background:
                    color-mix(in srgb, var(--card-background-color, #fff) 72%, transparent);
                box-shadow: 0 0 32px rgba(0, 0, 0, 0.22);
            }

            .split-panel {
                position: relative;
                z-index: 1;
                display: grid;
                min-width: 0;
                min-height: 0;
                padding: 22px 9px 9px;
                box-sizing: border-box;
                border: 1px dashed var(--divider-color, rgba(0, 0, 0, 0.12));
                border-radius: 12px;
                background: var(--card-background-color, #fff);
            }

            .split-panel.vertical {
                grid-template-rows: minmax(0, 1fr) auto minmax(0, 1fr);
            }

            .split-panel.horizontal {
                grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
            }

            .split-panel-label {
                position: absolute;
                top: 0;
                left: 12px;
                z-index: 2;
                padding: 1px 7px 2px;
                border-radius: 3px;
                background: var(--card-background-color, #fff);
                color: var(--primary-text-color, #212121);
                font-size: 0.64rem;
                font-weight: 800;
                letter-spacing: 0.08em;
                line-height: 1.25;
                transform: translateY(-50%);
            }

            .split-anchor {
                display: flex;
                flex-direction: column;
                gap: 8px;
                min-width: 0;
                min-height: 0;
            }

            .split-panel.vertical > .split-anchor.start {
                grid-row: 1;
                align-self: start;
            }

            .split-panel.vertical > .split-anchor.center {
                grid-row: 2;
                align-self: center;
            }

            .split-panel.vertical > .split-anchor.end {
                grid-row: 3;
                align-self: end;
            }

            .split-panel.horizontal > .split-anchor.start {
                grid-column: 1;
            }

            .split-panel.horizontal > .split-anchor.center {
                grid-column: 2;
            }

            .split-panel.horizontal > .split-anchor.end {
                grid-column: 3;
            }

            /*
             * Horizontal split rows have a fixed share of the Designer height.
             * Keep that geometry stable and scroll an overfilled physical area
             * locally instead of clipping its widget chips at the panel edge.
             */
            .split-panel.horizontal > .split-anchor {
                grid-row: 1;
                align-self: stretch;
                overflow-x: hidden;
                overflow-y: auto;
                overscroll-behavior: contain;
                scrollbar-gutter: stable;
            }

            .split-panel.horizontal > .split-anchor.panel-span {
                grid-column: 1 / -1;
            }

            .split-panel .zone-cell {
                flex: 0 0 auto;
                min-height: 42px;
                padding: 17px 7px 6px;
                border-radius: 8px;
                background: var(--secondary-background-color, #f2f2f2);
            }

            .split-panel .zone-list {
                flex: 0 0 auto;
                min-height: 30px;
            }

            .split-panel .empty-zone {
                min-height: 30px;
            }

            .zone-cell {
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: column;
                min-width: 0;
                min-height: 0;
                padding: 20px 8px 8px;
                border: 1px dashed var(--divider-color, rgba(0, 0, 0, 0.12));
                border-radius: 12px;
                background: var(--card-background-color, #fff);
                overflow: visible;
                cursor: pointer;
                transition: border-color 120ms ease, background-color 120ms ease;
            }

            .zone-cell:hover {
                border-color: var(--primary-color, #03a9f4);
                background-color: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent);
            }

            .zone-cell.selected {
                border-color: var(--primary-color, #3b82f6);
                border-style: solid;
                background-color: color-mix(in srgb, var(--primary-color, #3b82f6) 7%, transparent);
            }

            .zone-cell:focus-visible {
                outline: 2px solid var(--primary-color, #3b82f6);
                outline-offset: 2px;
            }

            .zone-label {
                position: absolute;
                top: 0;
                left: 10px;
                z-index: 1;
                max-width: calc(100% - 20px);
                padding: 1px 7px 2px;
                border-radius: 3px;
                background: var(--card-background-color, #fff);
                color: var(--secondary-text-color, #666);
                font-size: 0.64rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                line-height: 1.25;
                text-transform: uppercase;
                transform: translateY(-50%);
                cursor: pointer;
                user-select: none;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .zone-label:hover {
                color: var(--primary-text-color, #212121);
            }

            .zone-list {
                display: flex;
                flex-direction: column;
                gap: 6px;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding-top: 0;
            }

            .zone-list .chip {
                min-height: 36px;
                gap: 0;
                padding: 2px 5px 2px 2px;
                box-sizing: border-box;
                font-size: 0.85rem;
            }

            .zone-list .chip ha-icon {
                --mdc-icon-size: 18px;
            }

            .zone-list .chip-action {
                width: 28px;
                height: 28px;
            }

            .zone-list .drag-handle {
                width: 20px;
                height: 28px;
            }

            .chip {
                display: flex;
                align-items: center;
                gap: 4px;
                border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                border-radius: 8px;
                padding: 2px 4px;
                font-size: 0.85rem;
                background-color: var(--card-background-color, #fff);
                color: var(--primary-text-color, #212121);
                user-select: none;
                min-width: 0;
            }

            .chip-edit {
                display: flex;
                align-items: center;
                gap: 6px;
                min-width: 0;
                flex: 1;
                padding: 3px 4px;
                border: 0;
                color: inherit;
                background: transparent;
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .zone-list .chip-edit {
                gap: 8px;
                padding-left: 0;
            }

            .zone-list .chip-edit > ha-icon:first-child,
            .palette .chip > ha-icon:first-child {
                color: var(--primary-color, #03a9f4);
            }

            .zone-list .chip-edit > ha-icon:first-child {
                display: grid;
                place-items: center;
                width: 20px;
                flex: 0 0 20px;
            }

            .chip-edit span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
            }

            .chip ha-icon {
                --mdc-icon-size: 16px;
                flex-shrink: 0;
            }

            .drag-handle,
            .chip-action {
                display: grid;
                place-items: center;
                width: 26px;
                height: 26px;
                padding: 0;
                border: 0;
                border-radius: 4px;
                color: inherit;
                background: transparent;
                flex-shrink: 0;
            }

            .drag-handle {
                cursor: grab;
                opacity: 0.7;
            }

            .drag-handle:active {
                cursor: grabbing;
            }

            .chip-action {
                cursor: pointer;
                opacity: 0.75;
            }

            .chip-action:hover,
            .chip-edit:hover,
            .chip-action:focus-visible,
            .chip-edit:focus-visible {
                background-color: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent);
                opacity: 1;
                outline: none;
            }

            .chip.selected {
                border-color: var(--primary-color, #3b82f6);
                outline: 1px solid var(--primary-color, #3b82f6);
                background: color-mix(in srgb, var(--primary-color, #3b82f6) 15%, var(--card-background-color, #fff));
            }

            .chip.sortable-ghost {
                opacity: 0.28;
            }

            .palette {
                grid-column: 1;
                grid-row: 1;
                display: flex;
                flex-direction: column;
                align-items: stretch;
                gap: 7px;
                min-width: 0;
                min-height: 0;
                padding: 14px 10px;
                box-sizing: border-box;
                border-right: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                background: var(--card-background-color, #fff);
                overflow-x: hidden;
                overflow-y: auto;
            }

            .palette-title {
                margin: 0 4px 2px;
                color: var(--secondary-text-color, #666);
                font-size: 0.68rem;
                font-weight: 800;
                letter-spacing: 0.1em;
                text-transform: uppercase;
            }

            .palette-search {
                position: relative;
                margin-bottom: 4px;
            }

            .palette-search ha-icon {
                position: absolute;
                top: 50%;
                left: 10px;
                z-index: 1;
                --mdc-icon-size: 16px;
                color: var(--secondary-text-color, #666);
                transform: translateY(-50%);
                pointer-events: none;
            }

            .palette-search input {
                width: 100%;
                height: 34px;
                padding: 0 10px 0 34px;
                box-sizing: border-box;
                border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                border-radius: 8px;
                outline: none;
                background: var(--card-background-color, #fff);
                color: var(--primary-text-color, #212121);
                font: inherit;
                font-size: 0.8rem;
            }

            .palette-search input:focus {
                border-color: var(--primary-color, #3b82f6);
            }

            .palette-category {
                margin: 8px 4px 0;
                color: var(--secondary-text-color, #666);
                font-size: 0.62rem;
                font-weight: 800;
                letter-spacing: 0.1em;
                text-transform: uppercase;
            }

            .palette .chip {
                width: 100%;
                min-height: 36px;
                padding: 4px 8px;
                box-sizing: border-box;
                background: var(--secondary-background-color, #f2f2f2);
                cursor: pointer;
            }

            .palette .chip:hover {
                border-color: var(--primary-color, #03a9f4);
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent);
            }

            .palette .palette-name {
                min-width: 0;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .palette .drag-handle {
                margin-left: auto;
                color: var(--secondary-text-color, #666);
            }

            .palette .chip.unavailable {
                opacity: 0.32;
                cursor: not-allowed;
                filter: grayscale(1);
            }

            .empty-zone {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1;
                min-height: 36px;
                color: var(--secondary-text-color, #666);
                font-size: 0.74rem;
                opacity: 0;
                pointer-events: none;
                transition: opacity 120ms ease;
            }

            .zone-cell:hover .empty-zone {
                opacity: 0.7;
            }

            @media (max-width: 1050px) {
                :host {
                    grid-template-columns: 164px minmax(0, 1fr);
                }

                .zone-grid {
                    gap: 7px;
                    padding: 12px;
                }
            }
        `}disconnectedCallback(){super.disconnectedCallback(),this.sortableSetupRevision++,this.destroySortables()}updated(e){super.updated(e),this.scheduleSortableSetup(e.has("layout"))}emitLayout(e,t){this.dispatchEvent(new CustomEvent("layout-changed",{detail:{layout:e,focusWidgetId:t},bubbles:!0,composed:!0}))}emitSelection(e,t){this.selectable&&this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}selectZoneFromCell(e,t){if(!e.composedPath().some(e=>e instanceof Element&&e.classList.contains("chip"))){if(e instanceof KeyboardEvent){if("Enter"!==e.key&&" "!==e.key)return;e.preventDefault()}this.emitSelection("wcc-zone-selected",{zone:t})}}destroySortables(){this.sortables.forEach(e=>e.destroy()),this.sortables=[],this.sortableElements=[]}scheduleSortableSetup(e){const t=++this.sortableSetupRevision;this.updateComplete.then(()=>{requestAnimationFrame(()=>{if(t!==this.sortableSetupRevision||!this.isConnected)return;const o=this.currentSortableElements(),i=o.length===this.sortableElements.length&&o.every((e,t)=>e===this.sortableElements[t]);!e&&i&&0!==this.sortables.length||this.rebuildSortables(o)})})}currentSortableElements(){var e,t,o;const i=Array.from(null!==(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll(".zone-list"))&&void 0!==t?t:[]),a=null===(o=this.shadowRoot)||void 0===o?void 0:o.querySelector(".palette");return a?[...i,a]:i}rebuildSortables(e=this.currentSortableElements()){this.destroySortables();const t=e.find(e=>e.classList.contains("palette"));e.filter(e=>e.classList.contains("zone-list")).forEach(e=>{this.sortables.push(new Hi(e,{group:"wcc-widgets",animation:150,draggable:".chip:not(.unavailable)",handle:".drag-handle",filter:".chip-edit, .chip-action",preventOnFilter:!0,onStart:e=>{this.captureDragOrigin(e)},onEnd:e=>{this.handleDragEnd(e)}}))}),t&&this.sortables.push(new Hi(t,{group:{name:"wcc-widgets",pull:"clone",put:!1},sort:!1,animation:150,draggable:".chip:not(.unavailable)",handle:".drag-handle",onStart:e=>{this.captureDragOrigin(e)},onEnd:e=>{this.handlePaletteDrop(e)}})),this.sortableElements=e}captureDragOrigin(e){this.dragOrigin={parent:e.from,next:e.item.nextSibling}}revertDragDom(e){const t=this.dragOrigin;this.dragOrigin=void 0,t&&t.parent.insertBefore(e.item,t.next)}targetZones(e){var t,o;return(null!==(o=null!==(t=e.dataset.zones)&&void 0!==t?t:e.dataset.zone)&&void 0!==o?o:"").split(",").filter(e=>gn.includes(e))}handleDragEnd(e){const t=e.item.dataset.zone,o=Number(e.item.dataset.index),i=this.targetZones(e.to);this.revertDragDom(e),t&&Number.isInteger(o)&&0!==i.length&&null!=e.newIndex&&(e.from===e.to&&e.oldIndex===e.newIndex||this.emitLayout(function(e,t,o,i,a){var n;const r=i[0],s=e.zones[t];if(!r||!s||o<0||o>=s.widgets.length)return In(e);const l=In(e),c=l.zones[t].widgets[o],d=null!==(n=e.zones[r])&&void 0!==n?n:i.map(t=>e.zones[t]).find(Boolean);l.zones[t].widgets.splice(o,1),i.includes(t)||0!==l.zones[t].widgets.length||delete l.zones[t];const h=i.flatMap(e=>{var t,o;return null!==(o=null===(t=l.zones[e])||void 0===t?void 0:t.widgets)&&void 0!==o?o:[]}),u=Math.max(0,Math.min(a,h.length));return h.splice(u,0,c),l.zones[r]={...Tn(d),widgets:h},On(l,i,r),l}(this.layout,t,o,i,e.newIndex)))}handlePaletteDrop(e){var t,o;const i=this.targetZones(e.to),a=e.item.dataset.widgetType;if(null===(t=e.clone)||void 0===t||t.remove(),this.revertDragDom(e),0===i.length||!a)return;const n=nr.getInstance().getWidget(a);if(!n||n.singleton&&En(this.layout,a))return;const r=Dn(this.layout,a);this.emitLayout(Nn(this.layout,i,n.defaultConfig(),null!==(o=e.newIndex)&&void 0!==o?o:void 0),r)}zonesForSelection(e){const t=Ln(this.layout),o=Vn(t,e),i=Zn(t,e);return o&&i?qn(t,o,i):[e]}addFromPaletteClick(e){var t,o,i;const a=nr.getInstance().getWidget(e);if(!a||a.singleton&&En(this.layout,e))return;const n=null!==(i=null!==(t=this.selectedZone)&&void 0!==t?t:null===(o=this.selectedWidget)||void 0===o?void 0:o.zone)&&void 0!==i?i:"center",r=Dn(this.layout,e),s=this.zonesForSelection(n),l=s.length>1?Nn(this.layout,s,a.defaultConfig()):function(e,t,o){var i;const a=In(e),n={...In(o),id:Dn(e,o.type)},r=null!==(i=a.zones[t])&&void 0!==i?i:{widgets:[]},s=r.widgets.length;return r.widgets.splice(s,0,n),a.zones[t]=r,a}(this.layout,n,a.defaultConfig());this.emitLayout(l,r)}paletteGroups(){const e=this.paletteQuery.trim().toLocaleLowerCase(),t=nr.getInstance().getAllWidgets(),o=new Set(ur.flatMap(e=>e.widgetIds));return[...ur.map(e=>({label:this.t(e.labelKey,e.fallback),plugins:e.widgetIds.map(e=>t.find(t=>t.widgetId===e)).filter(e=>void 0!==e)})),{label:this.t("designer.other","Other"),plugins:t.filter(e=>!o.has(e.widgetId))}].map(t=>({...t,plugins:t.plugins.filter(t=>!e||t.name.toLocaleLowerCase().includes(e)||t.widgetId.toLocaleLowerCase().includes(e))})).filter(e=>e.plugins.length>0)}renderChip(e,t,o){var i,a,n,r;const s=nr.getInstance().getWidget(t.type),l=t.id?(null===(i=this.selectedWidget)||void 0===i?void 0:i.widgetId)===t.id:(null===(a=this.selectedWidget)||void 0===a?void 0:a.zone)===e&&(null===(n=this.selectedWidget)||void 0===n?void 0:n.index)===o,c=this.widgetName(s,t.type);return U`
            <div class="chip ${l?"selected":""}"
                 data-zone=${e} data-index=${o}>
                <span class="drag-handle" title=${this.t("designer.drag_to_move","Drag to move")} aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                    <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </span>
                <button class="chip-edit"
                        title=${this.t("designer.edit_widget","Edit {name}",{name:c})}
                        @click=${()=>this.emitSelection("wcc-widget-selected",{zone:e,index:o,widgetId:t.id})}>
                    <ha-icon .icon=${null!==(r=null==s?void 0:s.icon)&&void 0!==r?r:"mdi:puzzle"}></ha-icon>
                    <span>${c}</span>
                    <ha-icon icon="mdi:cog-outline"></ha-icon>
                </button>
                <button class="chip-action" title=${this.t("ui.remove","Remove")} aria-label=${this.t("designer.remove_widget","Remove {name}",{name:c})}
                        @click=${()=>this.emitLayout(function(e,t,o){const i=In(e),a=i.zones[t];return!a||o<0||o>=a.widgets.length||(a.widgets.splice(o,1),0===a.widgets.length&&delete i.zones[t]),i}(this.layout,e,o))}>
                    <ha-icon icon="mdi:delete-outline"></ha-icon>
                </button>
            </div>
        `}renderZoneCell(e,t=[e],o=this.zoneLabel(e)){var i;const a=null!==(i=this.layout.zones[e])&&void 0!==i?i:t.map(e=>this.layout.zones[e]).find(Boolean),n=t.flatMap(e=>{var t,o;return(null!==(o=null===(t=this.layout.zones[e])||void 0===t?void 0:t.widgets)&&void 0!==o?o:[]).map((t,o)=>({sourceZone:e,widget:t,index:o}))}),r=null!==this.selectedZone&&t.includes(this.selectedZone);return U`
            <div class="zone-cell ${r?"selected":""}"
                    role="button"
                    tabindex="0"
                    aria-label=${this.t("inspector.edit_zone","Edit zone {name}",{name:o})}
                    @click=${t=>this.selectZoneFromCell(t,e)}
                    @keydown=${t=>this.selectZoneFromCell(t,e)}>
                <span class="zone-label">
                    ${o}${"exclusive"===(null==a?void 0:a.mode)?" ↔":""}
                </span>
                <div class="zone-list" data-zone=${e} data-zones=${t.join(",")}>
                    ${n.map(e=>this.renderChip(e.sourceZone,e.widget,e.index))}
                    ${0===n.length?U`<span class="empty-zone">${this.t("designer.drag_here","+ Drag a widget here")}</span>`:""}
                </div>
            </div>
        `}splitAnchorLabel(e,t){return"vertical"===e?"start"===t?this.t("zones.split_top","Top"):"end"===t?this.t("zones.split_bottom","Bottom"):this.t("zones.split_center","Center"):"start"===t?this.t("ui.left","Left"):"end"===t?this.t("ui.right","Right"):this.t("ui.center","Center")}splitPanelStyle(e,t){return"vertical"===e?`grid-column: ${t}; grid-row: 1 / -1;`:`grid-column: 1 / -1; grid-row: ${t};`}renderSplitPanel(e,t,o){var i;const a=["start","center","end"].map(t=>({anchor:t,zones:qn(e,o,t),canonical:Kn(e,o,t)})),n=a.filter(e=>e.zones.some(e=>{var t,o;return(null!==(o=null===(t=this.layout.zones[e])||void 0===t?void 0:t.widgets.length)&&void 0!==o?o:0)>0})),r="horizontal"===t&&1===n.length&&n[0].canonical&&"panel"===(null===(i=this.layout.zones[n[0].canonical])||void 0===i?void 0:i.span)?n[0].anchor:void 0,s=r?n:a,l=e.endsWith("2-1"),c=1===o===l?"2/3":"1/3";return U`
            <div class="split-panel ${t}" style=${this.splitPanelStyle(t,o)}>
                <span class="split-panel-label">${c}</span>
                ${s.map(e=>U`
                    <div class="split-anchor ${e.anchor} ${e.anchor===r?"panel-span":""}">
                        ${e.canonical?this.renderZoneCell(e.canonical,e.zones,this.splitAnchorLabel(t,e.anchor)):""}
                    </div>
                `)}
            </div>
        `}render(){const e=Ln(this.layout),t=Hn(this.layout),o=zn(this.layout),i=Cn(o.padding),a=Bn(e),n=Jn(e),r=Un(e);return U`
            <div class="zone-grid format-${e} preset-${t}"
                 style="grid-template-columns: ${a.columns}; grid-template-rows: ${a.rows};
                        gap: ${o.zoneGap}; padding: ${o.padding};
                        --preview-zone-gap: ${o.zoneGap};
                        --preview-padding-top: ${i.top}; --preview-padding-right: ${i.right};
                        --preview-padding-bottom: ${i.bottom}; --preview-padding-left: ${i.left};">
                ${n?U`
                    <div class="format-preview-surface ${"glass"===t?"glass":""} ${n}"></div>
                `:""}
                ${r?[1,2].map(t=>this.renderSplitPanel(e,r,t)):gn.map(e=>this.renderZoneCell(e))}
            </div>
            <div class="palette">
                <div class="palette-title">${this.t("designer.widgets","Widgets")}</div>
                <label class="palette-search">
                    <ha-icon icon="mdi:magnify"></ha-icon>
                    <input
                            type="search"
                            placeholder=${this.t("designer.search","Search…")}
                            .value=${this.paletteQuery}
                            @input=${e=>{this.paletteQuery=e.target.value}}>
                </label>
                ${this.paletteGroups().map(e=>U`
                    <div class="palette-category">${e.label}</div>
                    ${e.plugins.map(e=>{var t;const o=!!e.singleton&&En(this.layout,e.widgetId),i=this.widgetName(e,e.widgetId);return U`
                        <div class="chip ${o?"unavailable":""}"
                             data-widget-type=${e.widgetId}
                             aria-disabled=${o?"true":"false"}
                             title=${o?this.t("designer.singleton","{name} can only be added once",{name:i}):null!==(t=e.description)&&void 0!==t?t:""}
                             @click=${()=>this.addFromPaletteClick(e.widgetId)}>
                            <ha-icon .icon=${e.icon}></ha-icon>
                            <span class="palette-name">${i}</span>
                            <span class="drag-handle" title=${this.t("designer.drag_to_move","Drag to move")} aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                <ha-icon icon="mdi:drag-vertical"></ha-icon>
                            </span>
                        </div>
                    `})}
                `)}
            </div>
        `}};dr([me({attribute:!1})],pr.prototype,"hass",void 0),dr([me({attribute:!1})],pr.prototype,"layout",void 0),dr([me({attribute:!1})],pr.prototype,"selectedWidget",void 0),dr([me({attribute:!1})],pr.prototype,"selectedZone",void 0),dr([me({type:Boolean})],pr.prototype,"selectable",void 0),dr([ve()],pr.prototype,"paletteQuery",void 0),pr=dr([ue("wcc-zone-overlay")],pr);const gr="#FFFFFF";function mr(e){return Boolean(e&&/{{|{%|{#/.test(e))}function vr(e){return`var(--wall-clock-font-color, ${e})`}function fr(e){return"undefined"==typeof CSS||"function"!=typeof CSS.supports||CSS.supports("color",e)}class yr{constructor(e,t,o=fr){this.host=e,this.onColorChanged=t,this.supportsColor=o,this.logger=ke("font-color-controller"),this.connected=!1,this.configuredColor=gr,this.effectiveColor=gr,this.subscriptionGeneration=0,e.addController(this)}get color(){return this.effectiveColor}update(e,t,o){var i;const a=null!=e?e:gr,n=null==t?void 0:t.connection,r=null===(i=null==t?void 0:t.user)||void 0===i?void 0:i.name;(a!==this.configuredColor||n!==this.connection||o!==this.templateConfig||r!==this.user)&&(this.stopSubscription(),this.configuredColor=a,this.connection=n,this.templateConfig=o,this.user=r,mr(a)?(this.setEffectiveColor(gr),this.startSubscription()):this.setEffectiveColor(a))}hostConnected(){this.connected=!0,this.startSubscription()}hostDisconnected(){this.connected=!1,this.stopSubscription()}startSubscription(){if(!this.connected||this.subscription||!this.connection||!mr(this.configuredColor))return;const e=++this.subscriptionGeneration,t=this.connection.subscribeMessage(t=>{var o;if(e!==this.subscriptionGeneration)return;if(null==t?void 0:t.error)return void this.logger.warn(`Font color template error: ${t.error}`);const i=function(e,t=fr){if(null==e)return;const o=String(e).trim();return o&&t(o)?o:void 0}(null==t?void 0:t.result,this.supportsColor);i?this.setEffectiveColor(i):this.logger.warn(`Ignoring invalid font color template result: ${String(null!==(o=null==t?void 0:t.result)&&void 0!==o?o:"")}`)},{type:"render_template",template:this.configuredColor,variables:{config:this.templateConfig,user:this.user},strict:!0,report_errors:!0});this.subscription=t,t.catch(t=>{e===this.subscriptionGeneration&&(this.subscription=void 0,this.logger.warn("Unable to subscribe to the font color template:",t))})}stopSubscription(){this.subscriptionGeneration++;const e=this.subscription;this.subscription=void 0,e&&e.then(e=>e()).catch(()=>{})}setEffectiveColor(e){e!==this.effectiveColor&&(this.effectiveColor=e,this.onColorChanged(),this.host.requestUpdate())}}const br={clock:["content"],date:["content"],sensors:["content"],weather:["content","appearance","behavior"],transportation:["content","appearance","behavior"],"action-bar":["content","behavior"],"calendar-month":["content","appearance","behavior"],calendar:["content","appearance","behavior"],separator:["appearance"],"ha-card":["content","appearance"]};var wr=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let _r="general";const xr=new Map;let $r=class extends de{constructor(){super(...arguments),this.layout={zones:{}},this.selectedWidget=null,this.selectedZone=null,this.activeTab="content",this.activeCardTab=_r,this.editorCache=new Map,this.languageOptions=Xe(),this.fontColors=["#fff7bb","#ffffff","#ffe59a","#79c4ff","#8be0aa","#e6a6df"]}t(e,t,o={}){return Je(e,this.hass,t,o)}zoneLabel(e){return this.t(`zones.${e.replace(/-/g,"_")}`,hr[e])}static get styles(){return n`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                height: 100%;
                min-width: 0;
                min-height: 0;
                color: var(--primary-text-color, #212121);
                background: var(--card-background-color, #fff);
            }

            .header {
                display: flex;
                align-items: center;
                gap: 12px;
                min-height: 60px;
                padding: 0 16px;
                border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                background: var(--secondary-background-color, #f2f2f2);
            }

            .header-icon {
                display: grid;
                place-items: center;
                width: 36px;
                height: 36px;
                border-radius: 9px;
                background: var(--primary-color, #2878d8);
                color: var(--text-primary-color, #fff);
                flex: 0 0 auto;
            }

            .header-icon ha-icon {
                --mdc-icon-size: 20px;
            }

            .title {
                min-width: 0;
                flex: 1;
            }

            .title strong,
            .title span {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .title span {
                margin-top: 1px;
                font-size: 0.75rem;
                opacity: 0.65;
            }

            .tabs {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                padding: 8px 10px 0;
                border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                background: var(--card-background-color, #fff);
            }

            .tab {
                min-height: 38px;
                padding: 0 6px;
                border: 0;
                border-bottom: 2px solid transparent;
                background: transparent;
                color: var(--secondary-text-color, #666);
                font: inherit;
                font-size: 0.78rem;
                cursor: pointer;
            }

            .tab:hover,
            .tab:focus-visible {
                color: var(--primary-text-color, #212121);
                outline: none;
            }

            .tab.active {
                border-bottom-color: var(--primary-color, #3b82f6);
                color: var(--primary-text-color, #212121);
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent);
            }

            .body {
                flex: 1;
                min-height: 0;
                /* Keep the final control fully scrollable above the designer
                   status bar, especially when an expanded list item is tall. */
                padding: 12px 12px 64px;
                box-sizing: border-box;
                scroll-padding-bottom: 64px;
                background: var(--card-background-color, #fff);
                overflow-y: auto;
            }

            .hint {
                margin: 12px 4px;
                font-size: 0.85rem;
                opacity: 0.7;
            }

            .section-title {
                margin: 0 0 8px;
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
                color: var(--secondary-text-color, #666);
            }

            .section-card {
                padding: 10px;
                border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                border-radius: 10px;
                background: var(--secondary-background-color, #f2f2f2);
            }

            .section-card + .section-card {
                margin-top: 12px;
            }

            .feature-editor {
                overflow: hidden;
                border-radius: 6px;
            }

            .settings-list ha-row-selector {
                padding: 5px 0;
                border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
            }

            .settings-list ha-row-selector:first-child {
                border-top: 0;
            }

            ha-row-selector {
                display: block;
                width: 100%;
            }

            .card-settings-body {
                flex: 1;
                min-height: 0;
                padding: 10px 16px 64px;
                box-sizing: border-box;
                overflow-y: auto;
                background: var(--card-background-color, #fff);
            }

            .card-settings-body ha-row-selector {
                margin-bottom: 4px;
            }

            .font-color-field {
                margin: 4px 0 12px;
            }

            .field-label {
                display: block;
                margin-bottom: 7px;
                color: var(--secondary-text-color, #666);
                font-size: 0.76rem;
            }

            .template-note {
                margin: -1px 0 8px;
                color: var(--primary-color, #4f8cff);
                font-size: 0.72rem;
                line-height: 1.35;
            }

            .color-palette {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
            }

            .color-choice,
            .color-custom {
                position: relative;
                display: grid;
                place-items: center;
                width: 28px;
                height: 28px;
                padding: 0;
                box-sizing: border-box;
                border: 2px solid transparent;
                border-radius: 7px;
                background: var(--color-choice, transparent);
                color: var(--secondary-text-color, #666);
                cursor: pointer;
            }

            .color-choice:hover,
            .color-choice:focus-visible,
            .color-custom:hover,
            .color-custom:focus-within {
                outline: 1px solid var(--primary-color, #03a9f4);
                outline-offset: 2px;
            }

            .color-choice.selected,
            .color-custom.selected {
                border-color: var(--card-background-color, #fff);
                outline: 2px solid var(--primary-color, #03a9f4);
                outline-offset: 1px;
            }

            .color-custom {
                border: 1px dashed var(--divider-color, rgba(0, 0, 0, 0.12));
                background: var(--custom-color, transparent);
            }

            .color-custom ha-icon {
                --mdc-icon-size: 15px;
            }

            .color-custom input {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }

            layout-editor,
            background-editor {
                display: block;
                margin: 0 -12px;
            }

            .empty-inspector {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: center;
                padding: 28px;
                color: var(--secondary-text-color, #666);
                text-align: center;
                line-height: 1.5;
            }
        `}updated(e){var t;super.updated(e),(e.has("selectedWidget")||e.has("selectedZone"))&&(this.activeTab=this.selectedWidget&&null!==(t=xr.get(this.widgetSelectionKey(this.selectedWidget)))&&void 0!==t?t:"content")}widgetSelectionKey(e){var t;return null!==(t=e.widgetId)&&void 0!==t?t:`${e.zone}:${e.index}`}selectWidgetTab(e){this.activeTab=e,this.selectedWidget&&xr.set(this.widgetSelectionKey(this.selectedWidget),e)}resolveWidget(){var e;const t=this.selectedWidget;if(!t)return;if(t.widgetId){const e=Pn(this.layout,t.widgetId);if(e)return e}const o=null===(e=this.layout.zones[t.zone])||void 0===e?void 0:e.widgets[t.index];return o?{zone:t.zone,index:t.index,widget:o}:void 0}getEditor(e){let t=this.editorCache.get(e);return t||(t=document.createElement(e),t.addEventListener("config-changed",e=>{e.stopPropagation();const t=this.resolveWidget();if(!t)return;const o=e.detail.config;this.emitWidget(t.zone,t.index,function(e,t){var o,i,a,n,r,s,l,c,d,h,u,p;switch(e.type){case"clock":return er({...Qn(e),clockSize:e.clockSize,timeFormat:t.timeFormat});case"date":return er({...Qn(e),dateSize:e.dateSize,dateFormat:t.dateFormat});case"sensors":return er({...Qn(e),labelSize:e.labelSize,valueSize:e.valueSize,iconSize:null!==(o=t.iconSize)&&void 0!==o?o:e.iconSize,sensors:null!==(i=t.sensors)&&void 0!==i?i:[],orientation:t.orientation,alignment:t.alignment,itemGap:t.itemGap,showIcons:null!==(a=t.showIcons)&&void 0!==a?a:e.showIcons,showSeparator:null!==(n=t.showSeparator)&&void 0!==n?n:e.showSeparator,separatorColor:null!==(r=t.separatorColor)&&void 0!==r?r:e.separatorColor,separatorOpacity:null!==(s=t.separatorOpacity)&&void 0!==s?s:e.separatorOpacity});case"weather":return er({...Qn(e),enabled:!1!==t.showWeather&&"none"!==t.weatherProvider&&void 0,labelSize:e.labelSize,valueSize:e.valueSize,provider:t.weatherProvider,providerConfig:t.weatherConfig,displayMode:t.weatherDisplayMode,forecastDays:t.weatherForecastDays,title:t.weatherTitle,showTitle:t.weatherShowTitle,updateInterval:t.weatherUpdateInterval,iconSet:t.weatherIconSet,animateIcons:t.weatherIconAnimation,orientation:e.orientation});case"transportation":{if(!t.transportation)return{...e,stops:[]};const o=t.transportation,{enabled:i,...a}=o;return{...Qn(e),...a,stops:null!==(l=a.stops)&&void 0!==l?l:[]}}case"action-bar":{const o=null!==(c=t.actionBar)&&void 0!==c?c:{};return er({...Qn(e),iconSize:e.iconSize,titleSize:null!==(d=o.titleSize)&&void 0!==d?d:e.titleSize,enabled:null===(h=o.enabled)||void 0===h||h,actions:null!==(u=o.actions)&&void 0!==u?u:[],alignment:o.alignment,orientation:o.orientation,columns:o.columns,backgroundOpacity:o.backgroundOpacity,showButtonBackground:null!==(p=o.showButtonBackground)&&void 0!==p?p:e.showButtonBackground,buttonGap:o.buttonGap,padding:o.padding})}default:return{...t,...Qn(e)}}}(t.widget,o))}),this.editorCache.set(e,t)),t}emitWidget(e,t,o){this.dispatchEvent(new CustomEvent("wcc-widget-config-changed",{detail:{zone:e,index:t,widget:o},bubbles:!0,composed:!0}))}updateWidgetField(e,t){const o=this.resolveWidget();if(!o)return;const i={...o.widget};void 0===t||""===t?delete i[e]:i[e]=t,this.emitWidget(o.zone,o.index,i)}updateWidgetSize(e,t){var o;const i=this.resolveWidget();if(!i)return;const a={...i.widget};if(""===t?delete a[e]:a[e]=t,void 0!==(null===(o=a.style)||void 0===o?void 0:o.fontSize)){const e={...a.style};delete e.fontSize,0===Object.keys(e).length?delete a.style:a.style=e}this.emitWidget(i.zone,i.index,a)}updateStyle(e,t){var o;const i=this.resolveWidget();if(!i)return;const a={...null!==(o=i.widget.style)&&void 0!==o?o:{}};void 0===t||""===t?delete a[e]:a[e]=t;const n={...i.widget};0===Object.keys(a).length?delete n.style:n.style=a,this.emitWidget(i.zone,i.index,n)}updateZone(e,t=this.selectedZone){t&&this.dispatchEvent(new CustomEvent("wcc-zone-settings-changed",{detail:{zone:t,settings:e},bubbles:!0,composed:!0}))}emitCardConfig(e){this.dispatchEvent(new CustomEvent("wcc-card-config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}updateGeneralSetting(e,t){this.config&&this.emitCardConfig(jn(this.config,e,t))}supportedStyleKeys(e){var t,o;const i=sr(e.type),a=!["clock","date","action-bar","sensors","weather","calendar"].includes(e.type),n=[];return(i||void 0!==(null===(t=e.style)||void 0===t?void 0:t.maxWidth))&&n.push("maxWidth"),(a||void 0!==(null===(o=e.style)||void 0===o?void 0:o.maxHeight))&&n.push("maxHeight"),n.push("margin"),n}renderZoneAlignment(e){var t;const o=null===(t=this.layout.zones[e])||void 0===t?void 0:t.align,i=fn(e),a={start:this.t("ui.left","Left"),center:this.t("ui.center","Center"),end:this.t("ui.right","Right")}[i];return U`
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select:{options:[{value:"auto",label:this.t("inspector.zone_default","Zone default ({alignment})",{alignment:a})},{value:"start",label:this.t("ui.left","Left")},{value:"center",label:this.t("ui.center","Center")},{value:"end",label:this.t("ui.right","Right")}],mode:"dropdown"}}}
                    .value=${null!=o?o:"auto"}
                    .label=${this.t("inspector.zone_alignment","Zone alignment")}
                    .helper=${this.t("inspector.zone_alignment_help","Applies to every widget in this zone")}
                    @value-changed=${t=>this.updateZone({align:"auto"===t.detail.value?void 0:t.detail.value},e)}>
            </ha-row-selector>
        `}renderHeader(e,t,o){return U`
            <div class="header">
                <span class="header-icon"><ha-icon .icon=${e}></ha-icon></span>
                <div class="title"><strong>${t}</strong><span>${o}</span></div>
            </div>
        `}renderTabs(){const e=[{id:"content",label:this.t("ui.content","Content")},{id:"appearance",label:this.t("ui.appearance","Appearance")},{id:"behavior",label:this.t("ui.behavior","Behavior")}];return U`
            <div class="tabs" role="tablist" aria-label=${this.t("inspector.widget_settings","Widget settings")}>
                ${e.map(e=>U`
                    <button
                            class="tab ${this.activeTab===e.id?"active":""}"
                            role="tab"
                            aria-selected=${this.activeTab===e.id?"true":"false"}
                            @click=${()=>this.selectWidgetTab(e.id)}>
                        ${e.label}
                    </button>
                `)}
            </div>
        `}renderWidgetPresentationFields(e){var t,o,i,a,n,r,s,l,c,d;if("sensors"!==e.type&&"weather"!==e.type&&"action-bar"!==e.type)return U``;const h="action-bar"===e.type?"actions":e.type,u="sensors"===e.type?"Item":"weather"===e.type?"Forecast":"Button";return U`
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select:{options:[{value:"auto",label:this.t("ui.auto","Auto (by zone)")},{value:"horizontal",label:this.t("ui.horizontal","Horizontal")},{value:"vertical",label:this.t("ui.vertical","Vertical")}],mode:"dropdown"}}}
                    .value=${null!==(t=e.orientation)&&void 0!==t?t:"auto"}
                    .label=${this.t(`editor.${h}.orientation`,`${u} orientation`)}
                    .helper=${this.t(`editor.${h}.orientation_help`,"Auto uses a row in center zones and a column in side zones.")}
                    @value-changed=${e=>this.updateWidgetField("orientation","auto"===e.detail.value?void 0:e.detail.value)}>
            </ha-row-selector>
            ${"weather"!==e.type?U`
                <ha-row-selector .hass=${this.hass}
                        .selector=${{select:{options:[{value:"auto",label:this.t("ui.zone_default","Zone default")},{value:"left",label:this.t("ui.left","Left")},{value:"center",label:this.t("ui.center","Center")},{value:"right",label:this.t("ui.right","Right")}],mode:"dropdown"}}}
                        .value=${null!==(o=e.alignment)&&void 0!==o?o:"auto"}
                        .label=${this.t(`editor.${h}.alignment`,`${u} alignment`)}
                        .helper=${this.t(`editor.${h}.alignment_help`,"Use the zone alignment or override it for this widget.")}
                        @value-changed=${e=>this.updateWidgetField("alignment","auto"===e.detail.value?void 0:e.detail.value)}>
                </ha-row-selector>
            `:""}
            ${"sensors"===e.type?U`
                <ha-row-selector .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!1!==e.showIcons}
                        .label=${this.t("editor.sensors.show_icons","Show sensor icons")}
                        .helper=${this.t("editor.sensors.show_icons_help","Show or hide the icon next to each sensor")}
                        @value-changed=${e=>this.updateWidgetField("showIcons",!1!==e.detail.value&&void 0)}>
                </ha-row-selector>
                ${!1!==e.showIcons?U`
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{text:{}}}
                            .value=${null!==(i=e.iconSize)&&void 0!==i?i:""}
                            .label=${this.t("editor.sensors.icon_size","Sensor icon size")}
                            .helper=${this.t("editor.sensors.icon_size_help","CSS length (default: responsive, maximum 36px)")}
                            @value-changed=${e=>{var t;return this.updateWidgetField("iconSize",(null===(t=e.detail.value)||void 0===t?void 0:t.trim())||void 0)}}>
                    </ha-row-selector>
                `:""}
                <ha-row-selector .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!1!==e.showSeparator}
                        .label=${this.t("editor.sensors.show_separator","Show sensor separator")}
                        .helper=${this.t("editor.sensors.show_separator_help","Show or hide the line between horizontal sensor items")}
                        @value-changed=${e=>this.updateWidgetField("showSeparator",!1!==e.detail.value&&void 0)}>
                </ha-row-selector>
                ${!1!==e.showSeparator?U`
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{color_hex:""}}
                            .value=${null!==(a=e.separatorColor)&&void 0!==a?a:""}
                            .label=${this.t("editor.sensors.separator_color","Separator color")}
                            .helper=${this.t("editor.sensors.separator_color_help","Empty uses the widget text color")}
                            @value-changed=${e=>{var t;return this.updateWidgetField("separatorColor",(null===(t=e.detail.value)||void 0===t?void 0:t.trim())||void 0)}}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                            .value=${null!==(n=e.separatorOpacity)&&void 0!==n?n:.28}
                            .label=${this.t("editor.sensors.separator_opacity","Separator opacity")}
                            .helper=${this.t("editor.sensors.separator_opacity_help","Adjust the separator transparency")}
                            @value-changed=${e=>this.updateWidgetField("separatorOpacity",.28===e.detail.value?void 0:e.detail.value)}>
                    </ha-row-selector>
                `:""}
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(r=e.itemGap)&&void 0!==r?r:""}
                        .label=${this.t("editor.sensors.item_gap","Sensor item gap")}
                        .helper=${this.t("editor.sensors.item_gap_help","CSS length between sensors (default: 16px)")}
                        @value-changed=${e=>{var t;return this.updateWidgetField("itemGap",(null===(t=e.detail.value)||void 0===t?void 0:t.trim())||void 0)}}>
                </ha-row-selector>
            `:""}
            ${"action-bar"===e.type?U`
                <ha-row-selector .hass=${this.hass}
                        .selector=${{number:{min:0,max:6,step:1,mode:"box"}}}
                        .value=${null!==(s=e.columns)&&void 0!==s?s:0}
                        .label=${this.t("editor.actions.columns","Grid columns")}
                        .helper=${this.t("editor.actions.columns_help","0 automatically uses 2 columns in a horizontal zone; another value fixes the column count.")}
                        @value-changed=${e=>this.updateWidgetField("columns",Number(e.detail.value)>0?Number(e.detail.value):void 0)}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!1!==e.showButtonBackground}
                        .label=${this.t("editor.actions.button_background","Circular button background")}
                        .helper=${this.t("editor.actions.button_background_help","Show or hide the translucent circle behind each action")}
                        @value-changed=${e=>this.updateWidgetField("showButtonBackground",!1!==e.detail.value&&void 0)}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(l=e.buttonGap)&&void 0!==l?l:""}
                        .label=${this.t("editor.actions.button_gap","Button gap")}
                        .helper=${this.t("editor.actions.button_gap_help","CSS length between buttons (default: 16px)")}
                        @value-changed=${e=>{var t;return this.updateWidgetField("buttonGap",(null===(t=e.detail.value)||void 0===t?void 0:t.trim())||void 0)}}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(c=e.padding)&&void 0!==c?c:""}
                        .label=${this.t("editor.actions.panel_padding","Panel padding")}
                        .helper=${this.t("editor.actions.panel_padding_help","CSS padding shorthand (default: 16px)")}
                        @value-changed=${e=>{var t;return this.updateWidgetField("padding",(null===(t=e.detail.value)||void 0===t?void 0:t.trim())||void 0)}}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                        .value=${null!==(d=e.backgroundOpacity)&&void 0!==d?d:.3}
                        .label=${this.t("editor.actions.opacity","Background opacity")}
                        .helper=${this.t("editor.actions.opacity_help","Adjust the action bar background transparency")}
                        @value-changed=${e=>this.updateWidgetField("backgroundOpacity",e.detail.value)}>
                </ha-row-selector>
            `:""}
        `}renderWidget(){var e,t,o,i,a,n,r,s,l,c,d,h;const u=this.resolveWidget();if(!u)return U``;const{zone:p,widget:g}=u,m=nr.getInstance().getWidget(g.type),v=this.t(`widgets.${g.type.replace(/-/g,"_")}`,null!==(e=null==m?void 0:m.name)&&void 0!==e?e:g.type);let f=U`
            <p class="hint">${this.t("inspector.no_content","This widget has no content settings.")}</p>
        `;if(null==m?void 0:m.editorTag){const e=this.getEditor(m.editorTag);e.hass=this.hass,e.editorSessionKey=this.editorSessionKey,e.config=function(e){var t,o,i;switch(e.type){case"clock":return er({timeFormat:e.timeFormat});case"date":return er({dateFormat:e.dateFormat});case"sensors":return er({sensors:null!==(t=e.sensors)&&void 0!==t?t:[],orientation:e.orientation,alignment:e.alignment,itemGap:e.itemGap,showIcons:e.showIcons,iconSize:e.iconSize,showSeparator:e.showSeparator,separatorColor:e.separatorColor,separatorOpacity:e.separatorOpacity});case"weather":return er({showWeather:!1!==e.enabled,weatherProvider:e.provider,weatherConfig:e.providerConfig,weatherDisplayMode:e.displayMode,weatherForecastDays:e.forecastDays,weatherTitle:e.title,weatherShowTitle:e.showTitle,weatherUpdateInterval:e.updateInterval,weatherIconSet:e.iconSet,weatherIconAnimation:e.animateIcons});case"transportation":{const{type:t,id:o,priority:i,style:a,visibility:n,...r}=e;return{transportation:{enabled:!0,...r}}}case"action-bar":return{actionBar:er({enabled:null===(o=e.enabled)||void 0===o||o,actions:null!==(i=e.actions)&&void 0!==i?i:[],alignment:e.alignment,orientation:e.orientation,columns:e.columns,backgroundOpacity:e.backgroundOpacity,showButtonBackground:e.showButtonBackground,buttonGap:e.buttonGap,padding:e.padding,titleSize:e.titleSize})};default:return e}}(g),e.section=this.activeTab,f=e}const y=null!==(t=g.style)&&void 0!==t?t:{},b="exclusive"===(null===(o=this.layout.zones[p])||void 0===o?void 0:o.mode),w=!!(null==m?void 0:m.editorTag)&&(_=g.type,x=this.activeTab,function(e){var t;return null!==(t=br[e])&&void 0!==t?t:["content"]}(_).includes(x));var _,x;return U`
            ${this.renderHeader(null!==(i=null==m?void 0:m.icon)&&void 0!==i?i:"mdi:puzzle",v,this.zoneLabel(p))}
            ${this.renderTabs()}
            <div class="body">
                ${"content"===this.activeTab?U`
                    <section class="section-card">
                        ${w&&"calendar"!==g.type?U`
                            <div class="section-title">${this.t("inspector.widget_settings","Widget settings")}</div>
                        `:""}
                        ${w?U`<div class="feature-editor">${f}</div>`:U`<p class="hint">${this.t("inspector.no_content","This widget has no content settings.")}</p>`}
                    </section>
                `:""}
                ${"appearance"===this.activeTab?U`
                    ${w?U`
                        <section class="section-card">
                            <div class="feature-editor">${f}</div>
                        </section>
                    `:""}
                    <section class="section-card">
                    <div class="section-title">${this.t("inspector.appearance_layout","Appearance and layout")}</div>
                    <div class="settings-list">
                        ${this.renderWidgetPresentationFields(g)}
                        ${"row"===(null===(a=this.layout.zones[p])||void 0===a?void 0:a.direction)||void 0!==y.widthMode?U`
                            <ha-row-selector .hass=${this.hass}
                                    .selector=${{select:{options:[{value:"auto",label:this.t("ui.auto","Automatic")},{value:"fill",label:this.t("inspector.width_mode_fill","Fill available space")},{value:"content",label:this.t("inspector.width_mode_content","Fit to content")}],mode:"dropdown"}}}
                                    .value=${null!==(n=y.widthMode)&&void 0!==n?n:"auto"}
                                    .label=${this.t("inspector.width_mode","Row width behavior")}
                                    .helper=${this.t("inspector.width_mode_help","Automatic chooses a suitable behavior for the widget type.")}
                                    @value-changed=${e=>this.updateStyle("widthMode","auto"===e.detail.value?void 0:e.detail.value)}>
                            </ha-row-selector>
                        `:""}
                        <ha-row-selector .hass=${this.hass} .selector=${{color_hex:""}}
                                .value=${null!==(r=y.color)&&void 0!==r?r:""} .label=${this.t("inspector.color","Color override")}
                                @value-changed=${e=>this.updateStyle("color",e.detail.value)}>
                        </ha-row-selector>
                        <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                                .value=${null!==(s=y.fontFamily)&&void 0!==s?s:""}
                                .label=${this.t("inspector.font_family","Font family override")}
                                .helper=${this.t("inspector.font_family_help","CSS font family or stack; empty uses the card font")}
                                @value-changed=${e=>this.updateStyle("fontFamily",e.detail.value)}>
                        </ha-row-selector>
                        <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                                .value=${null!==(l=y.textShadow)&&void 0!==l?l:""}
                                .label=${this.t("inspector.text_shadow","Text shadow override")}
                                .helper=${this.t("inspector.text_shadow_help","CSS text-shadow value; empty uses the card shadow, none disables it")}
                                @value-changed=${e=>this.updateStyle("textShadow",e.detail.value)}>
                        </ha-row-selector>
                        ${this.renderWidgetSizeFields(g,y)}
                        ${"row"===(null===(c=this.layout.zones[p])||void 0===c?void 0:c.direction)&&"content"!==y.widthMode||void 0!==y.grow?U`
                            <ha-row-selector .hass=${this.hass}
                                    .selector=${{number:{min:0,max:10,step:.25,mode:"box"}}}
                                    .value=${null!==(d=y.grow)&&void 0!==d?d:0}
                                    .label=${this.t("inspector.row_width_ratio","Row width ratio")}
                                    .helper=${this.t("inspector.row_width_ratio_help","Relative share of available row width; 0 uses the widget content width.")}
                                    @value-changed=${e=>this.updateStyle("grow",Number(e.detail.value)>0?Number(e.detail.value):void 0)}>
                            </ha-row-selector>
                        `:""}
                        ${"clock"===g.type||"date"===g.type?this.renderZoneAlignment(p):""}
                        ${this.supportedStyleKeys(g).map(e=>{var t;return U`
                            <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                                    .value=${null!==(t=y[e])&&void 0!==t?t:""} .label=${this.styleLabel(e,g)}
                                    @value-changed=${t=>this.updateStyle(e,t.detail.value)}>
                            </ha-row-selector>
                        `})}
                    </div>
                    </section>
                `:""}
                ${"behavior"===this.activeTab?U`
                    ${w?U`
                        <section class="section-card">
                            <div class="feature-editor">${f}</div>
                        </section>
                    `:""}
                    ${b||!w?U`<section class="section-card">
                        <div class="section-title">${this.t("ui.behavior","Behavior")}</div>
                        <div class="settings-list">
                        ${b?U`
                            <ha-row-selector .hass=${this.hass} .selector=${{number:{mode:"box"}}}
                                    .value=${null!==(h=g.priority)&&void 0!==h?h:0} .label=${this.t("inspector.display_priority","Display priority")}
                                    .helper=${this.t("inspector.priority_help","Higher active value wins in this exclusive zone")}
                                    @value-changed=${e=>this.updateWidgetField("priority",0===e.detail.value?void 0:e.detail.value)}>
                            </ha-row-selector>
                        `:U`<p class="hint">${this.t("inspector.no_behavior","This widget has no additional behavior settings.")}</p>`}
                        </div>
                    </section>`:""}
                `:""}
            </div>
        `}renderWidgetSizeFields(e,t){var o;const i=(t,o,i)=>{var a,n;return U`
            <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                    .value=${null!==(n=null!==(a=e[t])&&void 0!==a?a:i)&&void 0!==n?n:""}
                    .label=${o}
                    @value-changed=${e=>this.updateWidgetSize(t,e.detail.value)}>
            </ha-row-selector>
        `};switch(e.type){case"clock":return i("clockSize",this.t("inspector.clock_size","Clock size (e.g., 16rem)"),t.fontSize);case"date":return i("dateSize",this.t("inspector.date_size","Date size (e.g., 6rem)"),t.fontSize);case"sensors":case"weather":return U`
                    ${i("labelSize",this.t("inspector.label_size","Label size (e.g., 1.2rem)"))}
                    ${i("valueSize",this.t("inspector.value_size","Value size (e.g., 2rem)"))}
                `;case"action-bar":return U`
                    ${i("iconSize",this.t("inspector.icon_size","Icon size (button is 2×, e.g., 72px)"))}
                    ${i("titleSize",this.t("inspector.action_title_size","Button title size (e.g., 18px)"))}
                `;case"calendar":return U`
                    ${i("calendarDateSize",this.t("inspector.calendar_date_size","Date block size (e.g., 1rem)"))}
                    ${i("eventTitleSize",this.t("inspector.event_title_size","Event title size (e.g., 1rem)"))}
                    ${i("eventDetailSize",this.t("inspector.event_detail_size","Event detail size (e.g., 0.82rem)"))}
                `;case"transportation":return U``;default:return U`
                    <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                            .value=${null!==(o=t.fontSize)&&void 0!==o?o:""} .label=${this.styleLabel("fontSize")}
                            @value-changed=${e=>this.updateStyle("fontSize",e.detail.value)}>
                    </ha-row-selector>
                `}}styleLabel(e,t){if(t){if("maxWidth"===e&&!sr(t.type))return this.t("inspector.unsupported_width","Maximum width (unsupported — clear this value)");if("maxHeight"===e&&["clock","date","action-bar","sensors","weather","calendar"].includes(t.type))return this.t("inspector.unsupported_height","Maximum height (unsupported — clear this value)")}return{color:this.t("inspector.color","Color override"),fontSize:this.t("inspector.font_size","Font size (e.g., 2rem)"),fontFamily:this.t("inspector.font_family","Font family override"),textShadow:this.t("inspector.text_shadow","Text shadow override"),widthMode:this.t("inspector.width_mode","Row width behavior"),grow:this.t("inspector.row_width_ratio","Row width ratio"),maxWidth:this.t("inspector.max_width","Maximum width (e.g., 420px)"),maxHeight:this.t("inspector.max_height","Maximum height (e.g., 50vh)"),margin:this.t("inspector.margin","Margin (CSS shorthand)")}[e]}renderZone(){var e,t,o,i,a,n;const r=this.selectedZone,s=r?this.layout.zones[r]:void 0;return r?U`
            ${this.renderHeader("mdi:view-grid-outline",this.t("inspector.zone","Zone: {name}",{name:this.zoneLabel(r)}),this.t("inspector.layout_settings","Layout settings"))}
            <div class="body">
                <section class="section-card settings-list">
                ${s?U`
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{select:{options:[{value:"stack",label:this.t("inspector.stack","Stack (show all widgets)")},{value:"exclusive",label:this.t("inspector.exclusive","Exclusive (highest-priority active widget)")}],mode:"dropdown"}}}
                            .value=${null!==(e=s.mode)&&void 0!==e?e:"stack"} .label=${this.t("inspector.mode","Mode")}
                            @value-changed=${e=>this.updateZone({mode:"stack"===e.detail.value?void 0:e.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{select:{options:[{value:"column",label:this.t("inspector.column","Column")},{value:"row",label:this.t("inspector.row","Row")}],mode:"dropdown"}}}
                            .value=${null!==(t=s.direction)&&void 0!==t?t:"column"} .label=${this.t("inspector.direction","Direction")}
                            @value-changed=${e=>this.updateZone({direction:"column"===e.detail.value?void 0:e.detail.value})}>
                    </ha-row-selector>
                    ${"grid-3x3"!==Ln(this.layout)?U`
                        <ha-row-selector .hass=${this.hass}
                                .selector=${{boolean:{}}}
                                .value=${"panel"===s.span}
                                .label=${this.t("inspector.span_panel","Fill the complete split panel")}
                                .helper=${this.t("inspector.span_panel_help","Available when this is the only occupied area in its panel.")}
                                @value-changed=${e=>this.updateZone({span:!0===e.detail.value?"panel":void 0})}>
                        </ha-row-selector>
                    `:""}
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{select:{options:[{value:"auto",label:this.t("inspector.zone_default","Zone default ({alignment})",{alignment:{start:this.t("ui.left","Left"),center:this.t("ui.center","Center"),end:this.t("ui.right","Right")}[fn(r)]})},{value:"start",label:this.t("ui.left","Left")},{value:"center",label:this.t("ui.center","Center")},{value:"end",label:this.t("ui.right","Right")}],mode:"dropdown"}}}
                            .value=${null!==(o=s.align)&&void 0!==o?o:"auto"} .label=${this.t("inspector.horizontal_alignment","Horizontal alignment")}
                            @value-changed=${e=>this.updateZone({align:"auto"===e.detail.value?void 0:e.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                            .value=${null!==(i=s.gap)&&void 0!==i?i:""} .label=${this.t("inspector.widget_gap","Widget gap override (e.g., 4px)")}
                            @value-changed=${e=>this.updateZone({gap:e.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                            .value=${null!==(a=s.padding)&&void 0!==a?a:""} .label=${this.t("inspector.zone_padding","Zone padding (e.g., 0 16px)")}
                            @value-changed=${e=>this.updateZone({padding:e.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                            .value=${null!==(n=s.offsetY)&&void 0!==n?n:""} .label=${this.t("inspector.vertical_offset","Vertical offset (e.g., -8vh)")}
                            .helper=${this.t("inspector.vertical_offset_help","Negative values move the complete zone up; positive values move it down.")}
                            @value-changed=${e=>this.updateZone({offsetY:e.detail.value})}>
                    </ha-row-selector>
                `:U`<p class="hint">${this.t("inspector.add_widget_first","Add a widget to this zone before changing its settings.")}</p>`}
                </section>
            </div>
        `:U``}renderCardTabs(){const e=[{id:"general",label:this.t("general.title","General")},{id:"spacing",label:this.t("general.layout","Layout")},{id:"background",label:this.t("general.background","Background")}];return U`
            <div class="tabs" role="tablist" aria-label=${this.t("designer.card_settings","Card settings")}>
                ${e.map(e=>U`
                    <button
                            class="tab ${this.activeCardTab===e.id?"active":""}"
                            role="tab"
                            aria-selected=${this.activeCardTab===e.id?"true":"false"}
                            @click=${()=>{_r=e.id,this.activeCardTab=e.id}}>
                        ${e.label}
                    </button>
                `)}
            </div>
        `}renderFontColor(){var e,t,o;const i=null!==(o=null===(t=null===(e=this.config)||void 0===e?void 0:e.appearance)||void 0===t?void 0:t.fontColor)&&void 0!==o?o:"#FFFFFF",a=mr(i),n=i.toLowerCase(),r=this.fontColors.some(e=>e.toLowerCase()===n),s=/^#[0-9a-f]{6}$/i.test(i)?i:"#ffffff";return U`
            <div class="font-color-field">
                <span class="field-label">${this.t("general.font_color","Font color")}</span>
                ${a?U`
                    <div class="template-note">
                        ${this.t("general.font_color_template","Dynamic template configured in the YAML code editor")}
                    </div>
                `:""}
                <div class="color-palette">
                    ${this.fontColors.map(e=>U`
                        <button class="color-choice ${e.toLowerCase()===n?"selected":""}"
                                type="button"
                                style=${`--color-choice: ${e}`}
                                title=${e}
                                aria-label=${`${this.t("general.font_color","Font color")} ${e}`}
                                @click=${()=>this.updateGeneralSetting("fontColor",e)}>
                        </button>
                    `)}
                    <label class="color-custom ${r?"":"selected"}"
                            style=${`--custom-color: ${r?"transparent":s}; --color-choice: ${s}`}
                            title=${this.t("general.custom_color","Custom color")}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        <input type="color" .value=${s}
                                aria-label=${this.t("general.custom_color","Custom color")}
                                @change=${e=>this.updateGeneralSetting("fontColor",e.target.value)}>
                    </label>
                </div>
            </div>
        `}renderCardGeneral(){var e,t,o,i,a,n,r,s,l,c;const d=null!==(t=null===(e=this.config)||void 0===e?void 0:e.appearance)&&void 0!==t?t:{},h=Ge(String(d.language||(null===(i=null===(o=this.hass)||void 0===o?void 0:o.locale)||void 0===i?void 0:i.language)||(null===(a=this.hass)||void 0===a?void 0:a.language)||"en"));return U`
            <section class="section-card">
                <div class="section-title">${this.t("general.appearance","Card appearance")}</div>
                ${this.renderFontColor()}
                <ha-row-selector .hass=${this.hass}
                        .selector=${{select:{options:[{value:ut.Large,label:this.t("general.large","Large")},{value:ut.Medium,label:this.t("general.medium","Medium")},{value:ut.Small,label:this.t("general.small","Small")},{value:ut.Custom,label:this.t("spacing.custom","Custom")}],mode:"dropdown"}}}
                        .value=${null!==(n=d.size)&&void 0!==n?n:ut.Medium}
                        .label=${this.t("general.size","Size")}
                        .labelPosition=${aa.Top}
                        @value-changed=${e=>this.updateGeneralSetting("size",e.detail.value)}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(r=d.fontFamily)&&void 0!==r?r:""}
                        .label=${this.t("general.font_family","Font family")}
                        .helper=${this.t("general.font_family_help","CSS font family or stack; the font must already be loaded")}
                        .labelPosition=${aa.Top}
                        @value-changed=${e=>this.updateGeneralSetting("fontFamily",e.detail.value)}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(s=d.textShadow)&&void 0!==s?s:""}
                        .label=${this.t("general.text_shadow","Text shadow")}
                        .helper=${this.t("general.text_shadow_help","CSS text-shadow value, for example 0 2px 4px rgba(0, 0, 0, 0.8)")}
                        .labelPosition=${aa.Top}
                        @value-changed=${e=>this.updateGeneralSetting("textShadow",e.detail.value)}>
                </ha-row-selector>
            </section>
            <section class="section-card">
                <div class="section-title">${this.t("general.language_diagnostics","Language and diagnostics")}</div>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{select:{options:this.languageOptions,mode:"dropdown"}}}
                        .value=${h}
                        .label=${this.t("general.language","Language")}
                        .labelPosition=${aa.Top}
                        @value-changed=${e=>this.updateGeneralSetting("language",e.detail.value)}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{select:{options:[{value:"debug",label:"Debug"},{value:"info",label:"Info"},{value:"warn",label:"Warning"},{value:"error",label:"Error"},{value:"none",label:this.t("ui.none","None")}],mode:"dropdown"}}}
                        .value=${null!==(c=null===(l=this.config)||void 0===l?void 0:l.logLevel)&&void 0!==c?c:"info"}
                        .label=${this.t("general.log_level","Log level")}
                        .labelPosition=${aa.Top}
                        @value-changed=${e=>this.updateGeneralSetting("logLevel",e.detail.value)}>
                </ha-row-selector>
            </section>
        `}renderCardSettings(){return this.config?U`
            ${this.renderHeader("mdi:theme-light-dark","Wall Clock",this.t("designer.card_settings","Card settings"))}
            ${this.renderCardTabs()}
            <div class="card-settings-body">
                ${"general"===this.activeCardTab?this.renderCardGeneral():""}
                ${"spacing"===this.activeCardTab?U`
                    <layout-editor
                            .hass=${this.hass}
                            .config=${this.config}
                            inspector
                            @config-changed=${e=>{e.stopPropagation(),this.emitCardConfig(e.detail.config)}}>
                    </layout-editor>
                `:""}
                ${"background"===this.activeCardTab?U`
                    <background-editor
                            .hass=${this.hass}
                            .editorSessionKey=${this.editorSessionKey}
                            .config=${tr(this.config)}
                            @config-changed=${e=>{e.stopPropagation(),this.emitCardConfig({...this.config,background:or(e.detail.config)})}}>
                    </background-editor>
                `:""}
            </div>
        `:U`
                ${this.renderHeader("mdi:theme-light-dark","Wall Clock",this.t("designer.card_settings","Card settings"))}
                <div class="empty-inspector">${this.t("designer.card_settings_unavailable","Card settings are not available.")}</div>
            `}render(){return this.selectedWidget?this.renderWidget():this.selectedZone?this.renderZone():this.renderCardSettings()}};wr([me({attribute:!1})],$r.prototype,"hass",void 0),wr([me({attribute:!1})],$r.prototype,"config",void 0),wr([me({attribute:!1})],$r.prototype,"layout",void 0),wr([me({attribute:!1})],$r.prototype,"selectedWidget",void 0),wr([me({attribute:!1})],$r.prototype,"selectedZone",void 0),wr([me({attribute:!1})],$r.prototype,"editorSessionKey",void 0),wr([ve()],$r.prototype,"activeTab",void 0),wr([ve()],$r.prototype,"activeCardTab",void 0),$r=wr([ue("wcc-layout-inspector")],$r);var kr=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Sr=class extends de{constructor(){super(...arguments),this.disabled=!1,this.required=!0}render(){const e=this.validColor(this.value)?this.value:"#ffffff";return U`
            <div class="color-control">
                <input
                    class="color-swatch"
                    type="color"
                    .value=${e}
                    .disabled=${this.disabled}
                    aria-label=${this.label||"Choose color"}
                    @change=${this._valueChanged}
                >
                <input
                    class="hex-input"
                    type="text"
                    .value=${this.value||""}
                    ?disabled=${this.disabled}
                    aria-label=${this.label||"Hex color"}
                    placeholder="#RRGGBB"
                    @change=${this._valueChanged}
                ></input>
            </div>
        `}validColor(e){return Boolean(e&&/^#[0-9a-fA-F]{6}$/.test(e))}_valueChanged(e){const t=e.target.value;t&&!this.validColor(t)||kt(this,"value-changed",{value:t})}};Sr.styles=n`
        :host {
            display: block;
            width: 100%;
        }

        .color-control {
            display: grid;
            grid-template-columns: 52px minmax(0, 1fr);
            align-items: center;
            gap: 10px;
            width: 100%;
        }

        .color-swatch {
            width: 52px;
            height: 44px;
            padding: 3px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.24));
            border-radius: 7px;
            box-sizing: border-box;
            background: var(--secondary-background-color, #333);
            cursor: pointer;
        }

        .color-swatch::-webkit-color-swatch-wrapper {
            padding: 0;
        }

        .color-swatch::-webkit-color-swatch {
            border: 0;
            border-radius: 4px;
        }

        .color-swatch:disabled {
            cursor: default;
            opacity: 0.5;
        }

        .hex-input {
            width: 100%;
            min-width: 0;
            height: 44px;
            box-sizing: border-box;
            margin: 0;
            padding: 0 10px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.24));
            border-radius: 7px;
            background: var(--secondary-background-color, #333);
            color: var(--primary-text-color, #e1e1e1);
            font-family: inherit;
            font-size: 14px;
        }

        .hex-input::placeholder {
            color: var(--secondary-text-color, rgba(255, 255, 255, 0.5));
        }

        .hex-input:focus {
            outline: none;
            border-color: var(--primary-color, #03a9f4);
        }

        .hex-input:disabled {
            opacity: 0.5;
        }
    `,kr([me({attribute:!1})],Sr.prototype,"hass",void 0),kr([me({attribute:!1})],Sr.prototype,"selector",void 0),kr([me()],Sr.prototype,"value",void 0),kr([me()],Sr.prototype,"label",void 0),kr([me()],Sr.prototype,"helper",void 0),kr([me({type:Boolean,reflect:!0})],Sr.prototype,"disabled",void 0),kr([me({type:Boolean})],Sr.prototype,"required",void 0),Sr=kr([ue("ha-selector-color_hex")],Sr);var zr=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Cr=class extends de{constructor(){super(...arguments),this.lastEmittedValue=Symbol("initial-value"),this.hasNumberDraft=!1,this.numberDraft="",this.nativeInputListener=e=>this._nativeInputChanged(e),this.fieldCommitListener=()=>this._commitNestedFieldValue(),this.disabled=!1,this.required=!0,this.labelPosition=aa.Top}connectedCallback(){super.connectedCallback(),this.addEventListener("input",this.nativeInputListener,{capture:!0}),this.addEventListener("focusout",this.fieldCommitListener,{capture:!0})}disconnectedCallback(){this.removeEventListener("input",this.nativeInputListener,{capture:!0}),this.removeEventListener("focusout",this.fieldCommitListener,{capture:!0}),super.disconnectedCallback()}get isBooleanSelector(){return!!this.selector&&Object.prototype.hasOwnProperty.call(this.selector,"boolean")}get isNumberBoxSelector(){return!!this.selector&&"number"in this.selector&&!!this.selector.number&&"slider"!==this.selector.number.mode}get selectorValue(){var e;return this.isNumberBoxSelector&&this.hasNumberDraft?this.numberDraft:null!==(e=this.value)&&void 0!==e?e:""}render(){return U`
            <div class="row ${this.labelPosition.toLowerCase()} ${this.isBooleanSelector?"boolean":""}">
                ${this.label&&this.labelPosition!==aa.Hidden?U`
                    <div class="label">${this.label}</div>
                `:""}
                <div class="value">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${this.selector}
                        .value=${this.selectorValue}
                        .helper=${this.isBooleanSelector?void 0:this.helper}
                        .disabled=${this.disabled}
                        .required=${this.required}
                        @value-changed=${this._valueChanged}
                    ></ha-selector>
                </div>
                <div class="action-buttons">
                    ${this.actionButtons?this.actionButtons.map((e,t)=>U`
                            <div class="action-button">
                                <ha-icon-button
                                    .path=${e.icon}
                                    .title=${e.tooltip||""}
                                    @click=${o=>this._handleDynamicActionClick(o,t,e.eventName)}
                                ></ha-icon-button>
                            </div>
                        `):""}
                </div>
                ${this.isBooleanSelector&&this.helper?U`
                    <div class="boolean-helper">${this.helper}</div>
                `:""}
            </div>
        `}_handleDynamicActionClick(e,t,o){e.stopPropagation(),kt(this,o||`action-click-${t}`,{})}_valueChanged(e){e.stopPropagation();const t=e.detail.value;if(this.isNumberBoxSelector&&this._isEmptyNumberValue(t))return this.numberDraft="",void(this.hasNumberDraft=!0);this.isNumberBoxSelector&&(this.hasNumberDraft=!1),this._emitValue(t)}_nativeInputChanged(e){if(!(this.selector&&Object.prototype.hasOwnProperty.call(this.selector,"text")||this.isNumberBoxSelector))return;const t=e.composedPath().find(e=>"string"==typeof(null==e?void 0:e.value));if(t){if(this.isNumberBoxSelector){if(""===t.value)return this.numberDraft="",void(this.hasNumberDraft=!0);const e=Number(t.value);return void(Number.isFinite(e)&&(this.hasNumberDraft=!1,this._emitValue(e)))}this._emitValue(t.value)}}_commitNestedFieldValue(){if(this.isNumberBoxSelector)return void(this.hasNumberDraft&&(this.hasNumberDraft=!1));if(!this.selector||!Object.prototype.hasOwnProperty.call(this.selector,"text"))return;const e=[this.renderRoot];for(;e.length;){const t=e.shift();for(const o of Array.from(t.querySelectorAll("*"))){if(o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement)return void this._emitValue(o.value);o.shadowRoot&&e.push(o.shadowRoot)}}}_isEmptyNumberValue(e){return""===e||null==e||"number"==typeof e&&Number.isNaN(e)}_emitValue(e){let t=e;this.transformData&&(t=this.transformData(t)),Object.is(this.lastEmittedValue,t)||(this.lastEmittedValue=t,kt(this,"value-changed",{value:t,propertyName:this.propertyName}))}updated(e){e.has("value")&&(this.lastEmittedValue=this.value)}};Cr.styles=n`
        .row {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
        }

        /* Compact style for fields that explicitly request a left label. */
        .row.left {
            flex-direction: row;
        }

        .row.left .label {
            flex: 0 0 30%;
            font-weight: 500;
        }

        .row.left.boolean {
            display: grid;
            grid-template-columns: minmax(0, 30%) minmax(0, 1fr) auto;
            column-gap: 8px;
            row-gap: 4px;
        }

        .row.left.boolean .value {
            min-width: 0;
            justify-content: flex-end;
            overflow: visible;
        }

        .row.left.boolean .value ha-selector {
            flex: 0 0 auto;
            width: auto;
            overflow: visible;
        }

        .row.left.boolean .action-buttons {
            grid-column: 3;
            grid-row: 1;
        }

        .row.boolean .action-buttons:empty {
            display: none;
        }

        .row.left.boolean .boolean-helper {
            grid-column: 2 / -1;
        }

        /* Style for top position */
        .row.top {
            flex-direction: column;
            align-items: flex-start;
        }

        .row.top.boolean {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto auto;
            column-gap: 12px;
            row-gap: 4px;
            align-items: center;
            min-height: 48px;
        }

        .row.top .label {
            margin-bottom: 8px;
            font-weight: 500;
        }

        .row.top.boolean .label {
            grid-column: 1;
            grid-row: 1;
            min-width: 0;
            margin-bottom: 0;
        }

        .row.top .value {
            width: 100%;
        }

        .row.top.boolean .value {
            grid-column: 2;
            grid-row: 1;
            width: auto;
            align-self: center;
            overflow: visible;
        }

        .row.top.boolean .value ha-selector {
            width: auto;
            overflow: visible;
        }

        .row.top.boolean .action-buttons {
            grid-column: 3;
            grid-row: 1;
            margin-left: 0;
        }

        .row.top.boolean .boolean-helper {
            grid-column: 1 / -1;
            grid-row: 2;
        }

        .boolean-helper {
            min-width: 0;
            color: var(--secondary-text-color, #727272);
            font-size: 0.75rem;
            line-height: 1.35;
            white-space: normal;
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
    `,zr([ve()],Cr.prototype,"hasNumberDraft",void 0),zr([ve()],Cr.prototype,"numberDraft",void 0),zr([me({attribute:!1})],Cr.prototype,"hass",void 0),zr([me({attribute:!1})],Cr.prototype,"selector",void 0),zr([me({attribute:!1})],Cr.prototype,"value",void 0),zr([me()],Cr.prototype,"label",void 0),zr([me()],Cr.prototype,"helper",void 0),zr([me({type:Boolean,reflect:!0})],Cr.prototype,"disabled",void 0),zr([me({type:Boolean})],Cr.prototype,"required",void 0),zr([me()],Cr.prototype,"propertyName",void 0),zr([me({attribute:!1})],Cr.prototype,"transformData",void 0),zr([me({attribute:!1})],Cr.prototype,"labelPosition",void 0),zr([me({attribute:!1})],Cr.prototype,"actionButtons",void 0),Cr=zr([ue("ha-row-selector")],Cr);const{I:Ir}=se,Er=()=>document.createComment(""),Ar=(e,t,o)=>{const i=e._$AA.parentNode,a=void 0===t?e._$AB:t._$AA;if(void 0===o){const t=i.insertBefore(Er(),a),n=i.insertBefore(Er(),a);o=new Ir(t,n,e,e.options)}else{const t=o._$AB.nextSibling,n=o._$AM,r=n!==e;if(r){let t;o._$AQ?.(e),o._$AM=e,void 0!==o._$AP&&(t=e._$AU)!==n._$AU&&o._$AP(t)}if(t!==a||r){let e=o._$AA;for(;e!==t;){const t=e.nextSibling;i.insertBefore(e,a),e=t}}}return o},Dr=(e,t,o=e)=>(e._$AI(t,o),e),Pr={},Tr=e=>{e._$AR(),e._$AA.remove()},Or=(e,t,o)=>{const i=new Map;for(let a=t;a<=o;a++)i.set(e[a],a);return i},Nr=Ki(class extends Gi{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let i;void 0===o?o=t:void 0!==t&&(i=t);const a=[],n=[];let r=0;for(const t of e)a[r]=i?i(t,r):r,n[r]=o(t,r),r++;return{values:n,keys:a}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,i]){const a=(e=>e._$AH)(e),{values:n,keys:r}=this.dt(t,o,i);if(!Array.isArray(a))return this.ut=r,n;const s=this.ut??=[],l=[];let c,d,h=0,u=a.length-1,p=0,g=n.length-1;for(;h<=u&&p<=g;)if(null===a[h])h++;else if(null===a[u])u--;else if(s[h]===r[p])l[p]=Dr(a[h],n[p]),h++,p++;else if(s[u]===r[g])l[g]=Dr(a[u],n[g]),u--,g--;else if(s[h]===r[g])l[g]=Dr(a[h],n[g]),Ar(e,l[g+1],a[h]),h++,g--;else if(s[u]===r[p])l[p]=Dr(a[u],n[p]),Ar(e,a[h],a[u]),u--,p++;else if(void 0===c&&(c=Or(r,p,g),d=Or(s,h,u)),c.has(s[h]))if(c.has(s[u])){const t=d.get(r[p]),o=void 0!==t?a[t]:null;if(null===o){const t=Ar(e,a[h]);Dr(t,n[p]),l[p]=t}else l[p]=Dr(o,n[p]),Ar(e,a[h],o),a[t]=null;p++}else Tr(a[u]),u--;else Tr(a[h]),h++;for(;p<=g;){const t=Ar(e,l[g+1]);Dr(t,n[p]),l[p++]=t}for(;h<=u;){const e=a[h++];null!==e&&Tr(e)}return this.ut=r,((e,t=Pr)=>{e._$AH=t})(e,l),Z}});function Fr(e,t,o,i){return void 0!==e&&Number.isFinite(e)?Math.min(i,Math.max(o,Math.trunc(e))):t}function Mr(e,t){try{const o=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(e),i=e=>{var t,i;return null!==(i=null===(t=o.find(t=>t.type===e))||void 0===t?void 0:t.value)&&void 0!==i?i:""};return`${i("year")}-${i("month")}-${i("day")}`}catch(t){return e.toISOString().slice(0,10)}}function Rr(e,t){const[o,i,a]=e.split("-").map(Number);return new Date(Date.UTC(o,i-1,a+t)).toISOString().slice(0,10)}function jr(e){var t;const o=null!==(t=e.dateTime)&&void 0!==t?t:e.date?`${e.date}T00:00:00Z`:void 0;if(!o)return;const i=new Date(o);return Number.isNaN(i.getTime())?void 0:i}function Lr(e,t){if(e.allDay!==t.allDay)return e.allDay?-1:1;const o=e.start.getTime()-t.start.getTime();return 0!==o?o:e.summary.localeCompare(t.summary)}function Hr(e){return"number"==typeof e&&Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function Br(e,t){const[o,i]=e.split("-").map(Number);return new Date(Date.UTC(o,i-1+t,1)).toISOString().slice(0,7)}var Wr=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Ur=class extends de{constructor(){super(...arguments),this.widgets=[],this.activeWidget=null,this.previousWidget=null,this.transitionRevision=0,this.transitionAnimations=[],this.messenger=ot.getInstance(),this.logger=ke("wcc-zone"),this.animationOptions={duration:500,fill:"forwards"},this.onRequestUpdate=e=>{this.updateActiveWidget()}}connectedCallback(){super.connectedCallback(),this.messenger.subscribe(rt,this.onRequestUpdate),this.updateActiveWidget()}disconnectedCallback(){super.disconnectedCallback(),this.messenger.unsubscribe(rt,this.onRequestUpdate),this.cancelTransition()}updated(e){super.updated(e),(e.has("widgets")||e.has("zoneConfig"))&&this.updateActiveWidget()}get isExclusive(){var e;return"exclusive"===(null===(e=this.zoneConfig)||void 0===e?void 0:e.mode)}updateActiveWidget(){var e,t,o;if(!this.isExclusive)return;const i=[...this.widgets].sort((e,t)=>t.priority-e.priority),a=null!==(e=i.find(e=>e.isActive))&&void 0!==e?e:null;if(a===this.activeWidget)return;this.logger.debug(`Exclusive zone ${this.zoneId}: switching to ${null!==(o=null===(t=null==a?void 0:a.config)||void 0===t?void 0:t.type)&&void 0!==o?o:"none"}`),this.cancelTransition();const n=this.activeWidget;if(this.activeWidget=a,this.previousWidget=n,null==n||n.deactivate(),null==a||a.activate(),n&&a){const e=this.transitionRevision;this.updateComplete.then(()=>this.animateTransition(e))}else this.previousWidget=null}cancelTransition(){this.transitionRevision++;for(const e of this.transitionAnimations)e.cancel();this.transitionAnimations=[]}async animateTransition(e){var t,o;if(e!==this.transitionRevision)return;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".item.active"),a=null===(o=this.shadowRoot)||void 0===o?void 0:o.querySelector(".item.previous");if(!i||!a)return this.previousWidget=null,void this.requestUpdate();const n=[a.animate([{opacity:1},{opacity:0}],{...this.animationOptions,easing:"ease-out"}),i.animate([{opacity:0},{opacity:1}],{...this.animationOptions,easing:"ease-in"})];this.transitionAnimations=n;try{await Promise.all(n.map(e=>e.finished))}catch(e){return}if(e===this.transitionRevision&&(this.previousWidget=null,this.requestUpdate(),await this.updateComplete,e===this.transitionRevision)){for(const e of n)e.cancel();this.transitionAnimations=[]}}render(){var e;const t=this.zoneConfig,o=(null==t?void 0:t.gap)?`--zone-gap: ${t.gap};`:"",i=(null==t?void 0:t.padding)?`padding: ${t.padding};`:"",a=(null==t?void 0:t.offsetY)?`--zone-offset-y: ${t.offsetY};`:"",n={start:"flex-start",center:"center",end:"flex-end"}[null!==(e=null==t?void 0:t.align)&&void 0!==e?e:fn(this.zoneId)];if(this.isExclusive)return U`
                <div class="exclusive" style="${i} ${a}">
                    ${this.widgets.map(e=>U`
                        <div class="item
                                    ${e===this.activeWidget?"active":""}
                                    ${e===this.previousWidget?"previous":""}">
                            ${e}
                        </div>
                    `)}
                </div>
            `;const r="row"===(null==t?void 0:t.direction)?"row":"column";return U`
            <div class="stack ${r}" style="${o} ${i} ${a} ${"column"===r?`align-items: ${n};`:`justify-content: ${n};`}">
                ${this.widgets}
            </div>
        `}};Ur.styles=n`
        :host {
            display: block;
            min-width: 0;
            min-height: 0;
            pointer-events: none;
        }

        .stack {
            display: flex;
            width: 100%;
            height: 100%;
            gap: var(--zone-gap, var(--wcc-widget-gap, 8px));
            transform: translateY(var(--zone-offset-y, 0));
            pointer-events: auto;
        }

        .stack.column {
            flex-direction: column;
            justify-content: center;
        }

        .stack.row {
            flex-direction: row;
            align-items: center;
        }

        /* Exclusive mode: all items share one grid cell; only the active one
           (plus the previous one during the crossfade) is visible. */
        .exclusive {
            display: grid;
            width: 100%;
            transform: translateY(var(--zone-offset-y, 0));
            pointer-events: auto;
        }

        .exclusive > .item {
            grid-column: 1;
            grid-row: 1;
            display: none;
            min-width: 0;
        }

        .exclusive > .item.active,
        .exclusive > .item.previous {
            display: block;
        }

        /* The outgoing layer is visual only. It must never intercept a click
           intended for the newly active action bar underneath/above it. */
        .exclusive > .item.previous {
            pointer-events: none;
        }
    `,Wr([me({attribute:!1})],Ur.prototype,"zoneId",void 0),Wr([me({attribute:!1})],Ur.prototype,"zoneConfig",void 0),Wr([me({attribute:!1})],Ur.prototype,"widgets",void 0),Wr([ve()],Ur.prototype,"activeWidget",void 0),Ur=Wr([ue("wcc-zone")],Ur);var Vr=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Zr=class extends de{constructor(){super(...arguments),this.appearance={},this.zoneEntries=[],this.widgetCache=new Map,this.logger=ke("wcc-layout")}willUpdate(e){e.has("layout")&&this.rebuildZones(),(e.has("hass")||e.has("appearance"))&&this.forwardToWidgets()}rebuildZones(){var e,t,o;const i=nr.getInstance(),a=new Map;this.zoneEntries=[];for(const n of gn){const r=null===(t=null===(e=this.layout)||void 0===e?void 0:e.zones)||void 0===t?void 0:t[n];if(!(null===(o=null==r?void 0:r.widgets)||void 0===o?void 0:o.length))continue;const s=[];r.widgets.forEach((e,t)=>{var o,l,c,d;const h=`${n}:${null!==(o=e.id)&&void 0!==o?o:`${t}:${e.type}`}`;let u=this.widgetCache.get(h);if(u&&(null===(l=u.config)||void 0===l?void 0:l.type)===e.type)u.config=e;else if(u=i.createElement(e),!u)return;u.zoneId=n,u.zoneAlignment=null!==(c=r.align)&&void 0!==c?c:fn(n),u.zoneDirection=null!==(d=r.direction)&&void 0!==d?d:"column",u.appearance=this.appearance,this.hass&&(u.hass=this.hass),a.set(h,u),s.push(u)}),s.length&&this.zoneEntries.push({zoneId:n,config:r,widgets:s})}this.widgetCache=a,this.logger.debug(`Rebuilt zones: ${this.zoneEntries.map(e=>e.zoneId).join(", ")||"none"}`)}forwardToWidgets(){for(const e of this.widgetCache.values())e.appearance=this.appearance,this.hass&&(e.hass=this.hass)}hasWidget(e){return this.zoneEntries.some(t=>t.widgets.some(t=>{var o;return(null===(o=t.config)||void 0===o?void 0:o.type)===e}))}hasZone(e){return this.zoneEntries.some(t=>t.zoneId===e)}zonePlacement(e){const t=Ln(this.layout);if("grid-3x3"!==t){const o=Gn(t,e);return`grid-row: ${o.row}; grid-column: ${o.column}; align-self: ${o.alignSelf}; justify-self: stretch; z-index: 1;`}const[o]="center"===e?["middle"]:e.split("-"),i="top"===o?"start":"bottom"===o?"end":"center";return"bottom-center"!==e||this.hasZone("bottom-left")||this.hasZone("bottom-right")?"top-center"!==e||this.hasZone("top-left")||this.hasZone("top-right")?`grid-area: ${e}; align-self: ${i}; justify-self: stretch;`:"grid-area: top-center; grid-column: 1 / -1; align-self: start; justify-self: stretch;":"grid-area: bottom-center; grid-column: 1 / -1; align-self: end; justify-self: stretch;"}separatorInsetStyle(e,t,o){switch(function(e,t){const o=Jn(e);if(!o)return;const i=Gn(e,t);return"left"===o&&1===i.column||"right"===o&&2===i.column||"top"===o&&1===i.row||"bottom"===o&&2===i.row?o:void 0}(e,t)){case"left":return`--wcc-separator-inline-end-inset: ${o.left};`;case"right":return`--wcc-separator-inline-start-inset: ${o.right};`;case"top":return`--wcc-separator-block-end-inset: ${o.top};`;case"bottom":return`--wcc-separator-block-start-inset: ${o.bottom};`;default:return""}}renderZone(e,t,o,i=""){return U`
            <wcc-zone style="${i}
                             ${this.separatorInsetStyle(t,e.zoneId,o)}"
                      .zoneId=${e.zoneId}
                      .zoneConfig=${e.config}
                      .widgets=${e.widgets}></wcc-zone>
        `}splitPanelStyle(e,t){return"vertical"===e?`grid-column: ${t}; grid-row: 1 / -1;`:`grid-column: 1 / -1; grid-row: ${t};`}renderSplitPanel(e,t,o,i){var a;const n=["start","center","end"].map(t=>({anchor:t,entry:this.splitGroupEntry(e,o,t)})),r=n.filter(e=>e.entry),s="horizontal"===t&&1===r.length&&"panel"===(null===(a=r[0].entry)||void 0===a?void 0:a.config.span)?r[0].anchor:void 0,l=s?r[0].entry.widgets.filter(e=>"calendar-month"===e.config.type):[],c=1===l.length?`background: rgba(18,20,24,${Hr(l[0].config.backgroundOpacity)}); --wcc-calendar-local-background-opacity: 0;`:"";return U`
            <div class="split-panel ${t}" style=${this.splitPanelStyle(t,o)+c}>
                ${n.map(t=>t.entry?U`
                    <div class="split-anchor ${t.anchor} ${t.anchor===s?"panel-span":""}">
                        ${this.renderZone(t.entry,e,i)}
                    </div>
                `:"")}
            </div>
        `}splitGroupEntry(e,t,o){var i,a,n,r,s;const l=qn(e,t,o),c=Kn(e,t,o);if(!c)return;const d=l.map(e=>this.zoneEntries.find(t=>t.zoneId===e)).filter(e=>void 0!==e),h=d.flatMap(e=>e.widgets);if(0===h.length)return;const u=null!==(n=null===(a=null===(i=this.layout)||void 0===i?void 0:i.zones)||void 0===a?void 0:a[c])&&void 0!==n?n:d[0].config,p=null!==(r=u.align)&&void 0!==r?r:fn(c),g=null!==(s=u.direction)&&void 0!==s?s:"column";return h.forEach(e=>{e.zoneId=c,e.zoneAlignment=p,e.zoneDirection=g}),{zoneId:c,config:u,widgets:h}}render(){var e,t,o,i;const a=zn(this.layout),n=Cn(a.padding),r=Ln(this.layout),s=Hn(this.layout),l=Bn(r),c="grid-3x3"===r?function(e,t=!1){const o={top:["top-left","top-center","top-right"],middle:["middle-left","center","middle-right"],bottom:["bottom-left","bottom-center","bottom-right"]},i=Object.keys(o).filter(t=>o[t].some(t=>e.includes(t)));if(0===i.length||3===i.length||!t&&i.includes("top")&&i.includes("bottom"))return{areas:"'top-left top-center top-right' 'middle-left center middle-right' 'bottom-left bottom-center bottom-right'",rows:"minmax(0, 1fr) auto minmax(0, 1fr)",alignContent:"stretch"};const a=i.map(e=>`'${o[e].join(" ")}'`).join(" ");let n="center";return i.every(e=>"bottom"!==e)&&(n="start"),i.every(e=>"top"!==e)&&(n="end"),1===i.length&&"middle"===i[0]&&(n="center"),{areas:a,rows:i.map(()=>"auto").join(" "),alignContent:n}}(this.zoneEntries.map(e=>e.zoneId),!0===(null===(e=this.layout)||void 0===e?void 0:e.compactRows)):void 0,d="glass"===s?Jn(r):void 0,h=Un(r);return U`
            <div class="grid"
                 data-format=${r}
                 style="--wcc-padding: ${a.padding}; --wcc-zone-gap: ${a.zoneGap}; --wcc-widget-gap: ${a.widgetGap};
                        --wcc-padding-top: ${n.top}; --wcc-padding-right: ${n.right};
                        --wcc-padding-bottom: ${n.bottom}; --wcc-padding-left: ${n.left};
                        grid-template-columns: ${l.columns};
                        grid-template-rows: ${null!==(t=null==c?void 0:c.rows)&&void 0!==t?t:l.rows};
                        grid-template-areas: ${null!==(o=null==c?void 0:c.areas)&&void 0!==o?o:"none"};
                        align-content: ${null!==(i=null==c?void 0:c.alignContent)&&void 0!==i?i:"stretch"};">
                ${d?U`<div class="format-surface ${d}"></div>`:""}
                ${h?[1,2].map(e=>this.renderSplitPanel(r,h,e,n)):Nr(this.zoneEntries,e=>e.zoneId,e=>this.renderZone(e,r,n,this.zonePlacement(e.zoneId)))}
            </div>
        `}};function qr(e,t,o=[]){if(e===t)return o;if(e&&"object"==typeof e)if(Array.isArray(e))for(let i=0;i<e.length;i++){const a=qr(e[i],t,[...o,i]);if(a)return a}else for(const[i,a]of Object.entries(e)){const e=qr(a,t,[...o,i]);if(e)return e}}function Kr(e,t){return t.reduce((e,t)=>{if(e&&"object"==typeof e)return e[t]},e)}function Gr(e,t){return e===t||JSON.stringify(e)===JSON.stringify(t)}Zr.styles=n`
        :host {
            display: flex;
            flex-direction: column;
            /* Flex child of ha-card AND flex container for .grid: this keeps the
               height definite down to the grid so its rows redistribute to fit
               the card box instead of growing it (see wall-clock-card :host). */
            flex: 1 1 auto;
            min-height: 0;
            width: 100%;
            height: 100%;
            position: relative;
            /* Must sit above the background overlay (.background-overlay has
               z-index: 2 inside ha-background-image, which does not create its
               own stacking context) — matches the v2 component z-indexes. */
            z-index: 3;
        }

        /* 1fr side tracks are equal (minmax(0, 1fr) caps their min-content),
           so the center zone stays truly centered regardless of side content. */
        .grid {
            display: grid;
            grid-template-areas:
                'top-left    top-center    top-right'
                'middle-left center        middle-right'
                'bottom-left bottom-center bottom-right';
            grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
            grid-template-rows: minmax(0, 1fr) auto minmax(0, 1fr);
            gap: var(--wcc-zone-gap);
            padding: var(--wcc-padding);
            width: 100%;
            /* flex-fill the layout host (not height:100%, which would not resolve
               through the auto-height flex chain) so rows share a definite box. */
            flex: 1 1 auto;
            min-height: 0;
            box-sizing: border-box;
            position: relative;
            z-index: 1;
        }

        .format-surface {
            position: relative;
            z-index: 0;
            pointer-events: none;
            min-width: 0;
            min-height: 0;
        }

        .format-surface::before {
            content: '';
            position: absolute;
            background:
                linear-gradient(135deg, rgba(9, 13, 18, 0.72), rgba(20, 18, 19, 0.62));
            box-shadow: 0 0 48px rgba(0, 0, 0, 0.18);
            backdrop-filter: blur(24px) saturate(1.1);
            -webkit-backdrop-filter: blur(24px) saturate(1.1);
        }

        .format-surface.left {
            grid-column: 1;
            grid-row: 1 / -1;
        }

        .format-surface.left::before {
            inset:
                calc(-1 * var(--wcc-padding-top))
                calc(-1 * var(--wcc-zone-gap))
                calc(-1 * var(--wcc-padding-bottom))
                calc(-1 * var(--wcc-padding-left));
            border-right: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.right {
            grid-column: 2;
            grid-row: 1 / -1;
        }

        .format-surface.right::before {
            inset:
                calc(-1 * var(--wcc-padding-top))
                calc(-1 * var(--wcc-padding-right))
                calc(-1 * var(--wcc-padding-bottom))
                calc(-1 * var(--wcc-zone-gap));
            border-left: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.top {
            grid-column: 1 / -1;
            grid-row: 1;
        }

        .format-surface.top::before {
            inset:
                calc(-1 * var(--wcc-padding-top))
                calc(-1 * var(--wcc-padding-right))
                calc(-1 * var(--wcc-zone-gap))
                calc(-1 * var(--wcc-padding-left));
            border-bottom: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.bottom {
            grid-column: 1 / -1;
            grid-row: 2;
        }

        .format-surface.bottom::before {
            inset:
                calc(-1 * var(--wcc-zone-gap))
                calc(-1 * var(--wcc-padding-right))
                calc(-1 * var(--wcc-padding-bottom))
                calc(-1 * var(--wcc-padding-left));
            border-top: 1px solid rgba(255, 255, 255, 0.16);
        }

        /*
         * Split formats have two real panels. Their logical zones are grouped
         * by the remaining axis, so neighbouring legacy anchors never overlap.
         */
        .split-panel {
            position: relative;
            z-index: 1;
            display: grid;
            min-width: 0;
            min-height: 0;
        }

        .split-panel.vertical {
            grid-template-rows: minmax(0, 1fr) auto minmax(0, 1fr);
        }

        .split-panel.horizontal {
            grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        }

        .split-anchor {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            gap: var(--wcc-zone-gap);
        }

        .split-panel.vertical > .split-anchor.start {
            grid-row: 1;
            align-self: start;
        }

        .split-panel.vertical > .split-anchor.center {
            grid-row: 2;
            align-self: center;
        }

        .split-panel.vertical > .split-anchor.end {
            grid-row: 3;
            align-self: end;
        }

        .split-panel.horizontal > .split-anchor.start {
            grid-column: 1;
            justify-self: stretch;
        }

        .split-panel.horizontal > .split-anchor.center {
            grid-column: 2;
            justify-self: center;
        }

        .split-panel.horizontal > .split-anchor.end {
            grid-column: 3;
            justify-self: stretch;
        }

        .split-panel.horizontal > .split-anchor.panel-span {
            grid-column: 1 / -1;
            justify-self: stretch;
        }

        /*
         * A horizontal split keeps left/centre/right anchors. Each anchor must
         * fill the panel vertically as well, otherwise WccZone shrink-wraps its
         * widgets and its internal vertical centring has no free space to use.
         */
        .split-panel.horizontal > .split-anchor > wcc-zone {
            flex: 1 1 auto;
        }
    `,Vr([me({attribute:!1})],Zr.prototype,"layout",void 0),Vr([me({attribute:!1})],Zr.prototype,"hass",void 0),Vr([me({attribute:!1})],Zr.prototype,"appearance",void 0),Zr=Vr([ue("wcc-layout")],Zr);class Jr extends tt{constructor(e,t={}){super(e,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=t}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(e){this.logger.debug("Updating ClockController config:",e),this.config={...this.config,...e};const t=new Date,o=this.config.language||"en",i=this.config.timeZone;this.updateTime(t,i),this.updateDate(t,o,i),this.host.requestUpdate()}update(){const e=new Date,t=this.config.language||"en",o=this.config.timeZone;this.updateTime(e,o),0!==e.getSeconds()&&""!==this._currentDate||this.updateDate(e,t,o),this.host.requestUpdate()}updateTime(e,t){var o,i,a,n,r,s,l,c,d,h,u;const p="hidden"===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.second),g=!0===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.hour12);let m,v,f;if(t){const o=new Intl.DateTimeFormat("en-US",{timeZone:t,hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(e);m=parseInt((null===(a=o.find(e=>"hour"===e.type))||void 0===a?void 0:a.value)||"0",10),v=parseInt((null===(n=o.find(e=>"minute"===e.type))||void 0===n?void 0:n.value)||"0",10),f=parseInt((null===(r=o.find(e=>"second"===e.type))||void 0===r?void 0:r.value)||"0",10)}else m=e.getHours(),v=e.getMinutes(),f=e.getSeconds();if(p&&(this._seconds=""),g){const e=m>=12;m%=12,m=m||12;const t=null!==(l=null===(s=this.config.timeFormat)||void 0===s?void 0:s.amPmDisplay)&&void 0!==l?l:!1===(null===(c=this.config.timeFormat)||void 0===c?void 0:c.showAmPm)?"hidden":"full";this._ampm="hidden"===t?"":"narrow"===t?e?"p":"a":e?"PM":"AM"}else this._ampm="";const y="numeric"!==(null===(d=this.config.timeFormat)||void 0===d?void 0:d.hour);this._hours=y?m.toString().padStart(2,"0"):m.toString();const b="numeric"!==(null===(h=this.config.timeFormat)||void 0===h?void 0:h.minute);if(this._minutes=b?v.toString().padStart(2,"0"):v.toString(),!p){const e="numeric"!==(null===(u=this.config.timeFormat)||void 0===u?void 0:u.second);this._seconds=e?f.toString().padStart(2,"0"):f.toString()}}updateDate(e,t,o){this._currentDate=et(e,t,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},o)}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var Yr=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Xr=class extends de{constructor(){super(),this.showClock=!0,this.showDate=!0,this.logger=ke("clock-component"),this.clockController=new Jr(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(e){if(super.updated(e),e.has("timeFormat")||e.has("dateFormat")||e.has("language")||e.has("timeZone")||e.has("size")||e.has("clockSize")||e.has("dateSize")||e.has("clockTopMargin")){if(this.logger.debug("Clock properties changed, updating ClockController"),e.has("timeFormat")){const t=e.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.timeFormat)}`)}if(e.has("dateFormat")){const t=e.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.dateFormat)}`)}if(e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("clockSize")){const t=e.get("clockSize");this.logger.debug(`ClockSize changed: ${t} -> ${this.clockSize}`)}if(e.has("dateSize")){const t=e.get("dateSize");this.logger.debug(`DateSize changed: ${t} -> ${this.dateSize}`)}if(e.has("clockTopMargin")){const t=e.get("clockTopMargin");this.logger.debug(`ClockTopMargin changed: ${t} -> ${this.clockTopMargin}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}getClockSize(){return gt(this.size,this.clockSize,"clockSize")}getDateSize(){return gt(this.size,this.dateSize,"dateSize")}getClockTopMargin(){var e;return this.size===ut.Custom&&null!==(e=this.clockTopMargin)&&void 0!==e?e:"0rem"}getColonBlinkClass(){var e,t;return"fast"===(null===(e=this.timeFormat)||void 0===e?void 0:e.colonBlink)?"blink-fast":"slow"===(null===(t=this.timeFormat)||void 0===t?void 0:t.colonBlink)?"blink-slow":"static"}render(){var e,t;const o=this.getSeconds(),i=void 0!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second)&&"hidden"!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second),a=this.getClockSize(),n=this.getDateSize();return U`
            ${this.showClock?U`
                <div class="clock" style="color: ${this.fontColor}; font-size: ${a}; margin-top: ${this.getClockTopMargin()};">
                    <span class="hours-minutes" style="color: ${this.fontColor};"><span class="hours">${this.getHours()}</span><span class="colon ${this.getColonBlinkClass()}">:</span><span class="minutes">${this.getMinutes()}</span></span>
                    ${i?U`
                        <div class="seconds-container">
                            <span class="seconds" style="color: ${this.fontColor};">${o}</span>
                            ${this.getAmPm()?U`<span class="ampm" style="color: ${this.fontColor};">${this.getAmPm()}</span>`:""}
                        </div>
                    `:this.getAmPm()?U`
                        <div class="seconds-container">
                            <span class="ampm ampm-only" style="color: ${this.fontColor};">${this.getAmPm()}</span>
                        </div>
                    `:""}
                </div>
            `:""}
            ${this.showDate?U`
                <div class="date ${this.showClock?"":"standalone"}"
                     style="color: ${this.fontColor}; font-size: ${n};">${this.getCurrentDate()}</div>
            `:""}
        `}};function Qr(e,t){var o;return e||(null===(o=null==t?void 0:t.locale)||void 0===o?void 0:o.language)||(null==t?void 0:t.language)||"en"}function es(e,t){var o,i;if(void 0!==e)return Boolean(e);const a=null===(o=null==t?void 0:t.locale)||void 0===o?void 0:o.time_format;if("12"===a)return!0;if("24"===a)return!1;const n="system"===a?void 0:Qr(void 0,t);try{return null!==(i=new Intl.DateTimeFormat(n,{hour:"numeric"}).resolvedOptions().hour12)&&void 0!==i&&i}catch(e){return!1}}Xr.styles=n`
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

        .colon.blink-fast {
            animation: colon-blink 1s step-end infinite;
        }

        .colon.blink-slow {
            animation: colon-blink 2s step-end infinite;
        }

        @keyframes colon-blink {
            0%, 49.999% {
                opacity: 1;
            }
            50%, 100% {
                opacity: 0;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .colon.blink-fast,
            .colon.blink-slow {
                animation: none;
            }
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
            /* Keep the line box proportional to the configured date size.
               A fixed 5rem line-height left several rem of invisible height
               around small custom dates, outside the control of widgetGap. */
            line-height: 1;
        }

        /* In v2 date followed time inside this same component, so the small
           top margin separated the two lines. Zone layout renders date as its
           own widget and already supplies widgetGap; do not count both. */
        .date.standalone {
            margin-top: 0;
        }
    `,Yr([me({type:Object})],Xr.prototype,"timeFormat",void 0),Yr([me({type:Object})],Xr.prototype,"dateFormat",void 0),Yr([me({type:String})],Xr.prototype,"fontColor",void 0),Yr([me({type:String})],Xr.prototype,"language",void 0),Yr([me({type:String})],Xr.prototype,"timeZone",void 0),Yr([me({type:String})],Xr.prototype,"size",void 0),Yr([me({type:String})],Xr.prototype,"clockSize",void 0),Yr([me({type:String})],Xr.prototype,"dateSize",void 0),Yr([me({type:String})],Xr.prototype,"clockTopMargin",void 0),Yr([me({type:Boolean})],Xr.prototype,"showClock",void 0),Yr([me({type:Boolean})],Xr.prototype,"showDate",void 0),Xr=Yr([ue("ha-clock")],Xr);var ts=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};class os extends de{constructor(){super(...arguments),this.appearance={}}get priority(){var e,t;return null!==(t=null===(e=this.config)||void 0===e?void 0:e.priority)&&void 0!==t?t:0}get isActive(){return!0}activate(){}deactivate(){}get fontColor(){var e,t,o,i,a;return vr(null!==(a=null!==(o=null===(t=null===(e=this.config)||void 0===e?void 0:e.style)||void 0===t?void 0:t.color)&&void 0!==o?o:null===(i=this.appearance)||void 0===i?void 0:i.fontColor)&&void 0!==a?a:"#FFFFFF")}updated(e){super.updated(e),this.config&&(e.has("config")||e.has("hass")||e.has("appearance")||e.has("zoneId")||e.has("zoneAlignment")||e.has("zoneDirection"))&&(this.applyWidgetState(),this.applyStyleOverrides())}applyStyleOverrides(){var e,t,o,i,a,n,r,s,l,c,d,h,u,p,g,m;const v=null===(e=this.config)||void 0===e?void 0:e.style,f=sr(null===(t=this.config)||void 0===t?void 0:t.type),y=!["clock","date","action-bar","sensors","weather","calendar"].includes(null===(o=this.config)||void 0===o?void 0:o.type),b=function(e,t,o="auto"){var i;if("content"===o)return;const a=Number(t);return Number.isFinite(a)&&a>0?a:"fill"===o?e&&null!==(i=rr[e])&&void 0!==i?i:1:e?rr[e]:void 0}(null===(i=this.config)||void 0===i?void 0:i.type,null==v?void 0:v.grow,null==v?void 0:v.widthMode),w="row"===this.zoneDirection&&void 0!==b,_=!w&&function(e,t="auto",o,i){return"row"===o?"content"===function(e,t="auto"){return"auto"!==t?t:e&&rr[e]?"fill":"content"}(e,t):"sensors"===e&&("center"===i||!0===(null==i?void 0:i.endsWith("-center")))}(null===(a=this.config)||void 0===a?void 0:a.type,null==v?void 0:v.widthMode,this.zoneDirection,this.zoneId);this.toggleAttribute("data-content-width",_),this.style.margin=null!==(n=null==v?void 0:v.margin)&&void 0!==n?n:"",this.style.maxWidth=_?"100%":f&&null!==(r=null==v?void 0:v.maxWidth)&&void 0!==r?r:"",this.style.maxHeight=y&&null!==(s=null==v?void 0:v.maxHeight)&&void 0!==s?s:"",this.style.overflow=y&&(null==v?void 0:v.maxHeight)?"auto":"",this.style.fontSize=null!==(l=null==v?void 0:v.fontSize)&&void 0!==l?l:"",this.style.fontFamily=null!==(h=null!==(c=null==v?void 0:v.fontFamily)&&void 0!==c?c:null===(d=this.appearance)||void 0===d?void 0:d.fontFamily)&&void 0!==h?h:"",this.style.color=null!==(u=null==v?void 0:v.color)&&void 0!==u?u:"",this.style.textShadow=null!==(m=null!==(p=null==v?void 0:v.textShadow)&&void 0!==p?p:null===(g=this.appearance)||void 0===g?void 0:g.textShadow)&&void 0!==m?m:"",this.style.flex=w?`${b} 1 0%`:_?"0 1 auto":"",this.style.width=w?"0px":_?"auto":"",this.style.minWidth=w||_?"0px":""}}ts([me({type:Object})],os.prototype,"hass",void 0),ts([me({type:Object})],os.prototype,"config",void 0),ts([me({type:Object})],os.prototype,"appearance",void 0),ts([me({attribute:!1})],os.prototype,"zoneId",void 0),ts([me({attribute:!1})],os.prototype,"zoneAlignment",void 0),ts([me({attribute:!1})],os.prototype,"zoneDirection",void 0);let is=class extends os{constructor(){super(...arguments),this.clock=document.createElement("ha-clock")}applyWidgetState(){var e,t,o,i,a,n,r,s,l;const c=null!==(e=this.config.clockSize)&&void 0!==e?e:null===(t=this.config.style)||void 0===t?void 0:t.fontSize;this.clock.showDate=!1,this.clock.timeFormat=function(e,t){const o={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:es(null==e?void 0:e.hour12,t)};return e&&(Object.assign(o,e,{hour12:o.hour12}),void 0===e.second&&(o.second=void 0)),o}(this.config.timeFormat,this.hass),this.clock.language=Qr(null===(o=this.appearance)||void 0===o?void 0:o.language,this.hass),this.clock.timeZone=null!==(a=null===(i=this.appearance)||void 0===i?void 0:i.timeZone)&&void 0!==a?a:null===(r=null===(n=this.hass)||void 0===n?void 0:n.config)||void 0===r?void 0:r.time_zone,this.clock.fontColor=this.fontColor,this.clock.size=c?ut.Custom:null!==(l=null===(s=this.appearance)||void 0===s?void 0:s.size)&&void 0!==l?l:ut.Medium,this.clock.clockSize=c}render(){return U`${this.clock}`}};is.styles=n`
        :host {
            display: block;
        }
    `,is=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("wcc-clock-widget")],is);let as=class extends os{constructor(){super(...arguments),this.clock=document.createElement("ha-clock")}applyWidgetState(){var e,t,o,i,a,n,r,s,l;const c=null!==(e=this.config.dateSize)&&void 0!==e?e:null===(t=this.config.style)||void 0===t?void 0:t.fontSize;this.clock.showClock=!1,this.clock.dateFormat=function(e){const t={weekday:"long",year:"numeric",month:"long",day:"numeric"};return e&&(Object.assign(t,e),void 0===e.year&&(t.year=void 0)),t}(this.config.dateFormat),this.clock.language=Qr(null===(o=this.appearance)||void 0===o?void 0:o.language,this.hass),this.clock.timeZone=null!==(a=null===(i=this.appearance)||void 0===i?void 0:i.timeZone)&&void 0!==a?a:null===(r=null===(n=this.hass)||void 0===n?void 0:n.config)||void 0===r?void 0:r.time_zone,this.clock.fontColor=this.fontColor,this.clock.size=c?ut.Custom:null!==(l=null===(s=this.appearance)||void 0===s?void 0:s.size)&&void 0!==l?l:ut.Medium,this.clock.dateSize=c}render(){return U`${this.clock}`}};as.styles=n`
        :host {
            display: block;
        }
    `,as=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("wcc-date-widget")],as);class ns extends tt{constructor(e,t={}){super(e,"sensor-controller"),this._sensorValues=[],this.config={},this.config=t}onHostConnected(){}onHostDisconnected(){}updateConfig(e){this.logger.debug("Updating SensorController config:",e),this.config={...this.config,...e},this.hass&&this.updateSensorValues()}updateHass(e){this.hass=e,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=this.config.sensors.map(e=>this.processSensor(e)),this.host.requestUpdate()):this._sensorValues=[]}processSensor(e){var t,o,i,a;const n=e.entity,r=null===(t=this.hass)||void 0===t?void 0:t.states[n];if(!n||!r)return{entity:n,label:e.label,icon:e.icon,value:"unavailable",color:this.defaultColor(e)};const s=r.entity_id?r:{...r,entity_id:n};return{entity:n,label:null!==(o=e.label)&&void 0!==o?o:null===(i=r.attributes)||void 0===i?void 0:i.friendly_name,icon:null!==(a=e.icon)&&void 0!==a?a:Tt(s),value:this.formatState(e,r),color:this.resolveColor(e,r.state)}}defaultColor(e){var t;return(null===(t=e.color)||void 0===t?void 0:t.trim())||void 0}resolveColor(e,t){var o,i;const a=this.defaultColor(e);if(null==t)return a;const n=String(t).trim();if(!n)return a;for(const t of null!==(o=e.colorRules)&&void 0!==o?o:[]){const e=null===(i=t.color)||void 0===i?void 0:i.trim();if(e&&this.matchesColorRule(n,t.operator,t.value))return e}return a}matchesColorRule(e,t,o){if("number"==typeof o){const i=Number(e);return!(!Number.isFinite(i)||!Number.isFinite(o))&&this.matchesNumericColorRule(i,t,o)}if("string"!=typeof o)return!1;const i=o.trim();if(!i)return!1;if("="===t)return e===i;if("!="===t)return e!==i;const a=Number(e),n=Number(i);return!(!Number.isFinite(a)||!Number.isFinite(n))&&this.matchesNumericColorRule(a,t,n)}matchesNumericColorRule(e,t,o){switch(t){case"<":return e<o;case"<=":return e<=o;case">":return e>o;case">=":return e>=o;case"=":return e===o;case"!=":return e!==o;default:return!1}}formatState(e,t){var o,i;const a=null===(o=this.hass)||void 0===o?void 0:o.formatEntityState;if(void 0===e.precision&&"function"==typeof a)try{return a.call(this.hass,t)}catch(e){this.logger.warn("formatEntityState failed, using fallback formatting",e)}let n=t.state;const r=this.getDisplayPrecision(e,t);return void 0===r||null===n||""===n||isNaN(Number(n))||(n=this.formatNumericValue(Number(n),r)),(null===(i=t.attributes)||void 0===i?void 0:i.unit_of_measurement)&&(n+=` ${t.attributes.unit_of_measurement}`),n}getDisplayPrecision(e,t){var o,i,a,n,r;if(void 0!==e.precision)return e.precision;const s=null===(a=null===(i=null===(o=this.hass)||void 0===o?void 0:o.entities)||void 0===i?void 0:i[e.entity])||void 0===a?void 0:a.display_precision;return void 0!==s?s:void 0!==(null===(n=null==t?void 0:t.attributes)||void 0===n?void 0:n.display_precision)?t.attributes.display_precision:void 0!==(null===(r=null==t?void 0:t.attributes)||void 0===r?void 0:r.suggested_display_precision)?t.attributes.suggested_display_precision:void 0}formatNumericValue(e,t){try{let o=((e,t,o)=>{const i=t?(e=>{switch(e.number_format){case bt.comma_decimal:return["en-US","en"];case bt.decimal_comma:return["de","es","it"];case bt.space_comma:return["fr","sv","cs"];case bt.system:return;default:return e.language}})(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==bt.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(i,_t(e,o)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,_t(e,o)).format(Number(e))}return"string"==typeof e?e:`${((e,t=2)=>Math.round(e*Math.pow(10,t))/Math.pow(10,t))(e,null==o?void 0:o.maximumFractionDigits).toString()}${"currency"===(null==o?void 0:o.style)?` ${o.currency}`:""}`})(e,this.hass.locale,{minimumFractionDigits:t,maximumFractionDigits:t});return t>0&&!o.includes(".")&&!o.includes(",")?e.toFixed(t):o}catch(o){return e.toFixed(t)}}get sensorValues(){return this._sensorValues}}var rs=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let ss=class extends de{constructor(){super(),this.showIcons=!0,this.showSeparator=!0,this.orientation="vertical",this.alignment="left",this.logger=ke("sensor-component"),this.sensorController=new ns(this,{sensors:this.sensors})}get controller(){return this.sensorController}getLabelSize(){return gt(this.size,this.labelSize,"labelSize")}getValueSize(){return gt(this.size,this.valueSize,"valueSize")}updated(e){if(super.updated(e),e.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),e.has("hass")&&this.hass&&this.sensorController.updateHass(this.hass),e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}_openMoreInfo(e){e&&kt(this,"hass-more-info",{entityId:e})}render(){var e,t,o,i;const a=this.sensorController.sensorValues;if(0===a.length)return U``;const n=this.getLabelSize(),r=this.getValueSize(),s=(null===(e=this.itemGap)||void 0===e?void 0:e.trim())||"16px",l=(null===(t=this.iconSize)||void 0===t?void 0:t.trim())||"clamp(1.8rem, 6cqw, 2.25rem)",c=(null===(o=this.separatorColor)||void 0===o?void 0:o.trim())||"currentColor",d=Math.min(1,Math.max(0,null!==(i=this.separatorOpacity)&&void 0!==i?i:.28));return this.logger.debug(`Rendering sensors - LabelSize: ${n}, ValueSize: ${r}`),U`
            <div class="sensor-container ${this.orientation} align-${this.alignment}
                        ${this.showIcons?"show-icons":""}
                        ${"horizontal"===this.orientation&&this.showSeparator?"show-separators":""}"
                 style="color: ${this.fontColor};
                        --sensor-count: ${a.length};
                        --sensor-item-gap: ${s};
                        --sensor-icon-size: ${l};
                        --sensor-separator-color: ${c};
                        --sensor-separator-opacity: ${d};">
                ${a.map(e=>U`
                    <div class="sensor-item"
                         style=${e.color?`--sensor-color: ${e.color};`:""}
                         role="button"
                         tabindex="0"
                         @click=${()=>this._openMoreInfo(e.entity)}
                         @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._openMoreInfo(e.entity))}}>
                        <div class="sensor-content">
                            ${this.showIcons?U`
                                <span class="sensor-icon-slot" aria-hidden="true">
                                    ${e.icon?U`<ha-icon class="sensor-icon" .icon=${e.icon}></ha-icon>`:""}
                                </span>
                            `:""}
                            <div class="sensor-copy">
                                ${e.label?U`
                                        <div class="sensor-label" style="font-size: ${n};">
                                            ${e.label}
                                        </div>`:""}
                                <div class="sensor-value" style="font-size: ${r};">
                                    ${e.value}
                                </div>
                            </div>
                        </div>
                    </div>
                `)}
            </div>
        `}};ss.styles=n`
        :host {
            display: block;
            width: var(--sensor-component-width, 100%);
            max-height: 100%;
            container-type: var(--sensor-container-type, inline-size);
        }

        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own items. */
        .sensor-container {
            display: flex;
            width: var(--sensor-component-width, 100%);
            box-sizing: border-box;
            max-height: 100%;
            gap: var(--sensor-item-gap, 16px);
            --sensor-icon-copy-gap: clamp(4px, 1cqw, 10px);
        }

        .sensor-item {
            flex: 0 0 auto;
            min-width: 0;
            max-width: 100%;
            cursor: pointer;
            color: var(--sensor-color, inherit);
        }

        .sensor-container.horizontal {
            display: grid;
            grid-template-columns: repeat(
                var(--sensor-count),
                minmax(max-content, 1fr)
            );
            column-gap: var(--sensor-item-gap, 16px);
            align-items: stretch;
            overflow-x: auto;
            overflow-y: hidden;
        }

        .sensor-container.vertical {
            flex-direction: column;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .sensor-container.horizontal .sensor-item,
        .sensor-container.show-icons .sensor-item {
            display: flex;
            align-items: center;
        }

        .sensor-container.horizontal .sensor-item {
            position: relative;
            min-width: max-content;
            justify-content: center;
        }

        .sensor-content {
            min-width: 0;
            max-width: 100%;
        }

        .sensor-container.show-icons .sensor-content {
            display: flex;
            align-items: center;
            gap: var(--sensor-icon-copy-gap);
        }

        .sensor-container.horizontal .sensor-content {
            display: grid;
            grid-template-columns: max-content;
            align-items: center;
            width: max-content;
            max-width: none;
        }

        .sensor-container.horizontal.show-icons .sensor-content {
            grid-template-columns:
                var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem))
                max-content;
        }

        .sensor-container.horizontal.show-icons .sensor-copy {
            grid-column: 2;
        }

        .sensor-copy {
            min-width: 0;
        }

        .sensor-icon-slot {
            display: grid;
            place-items: center;
            width: var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem));
            height: var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem));
        }

        .sensor-icon {
            --mdc-icon-size: var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem));
            opacity: 0.9;
            color: var(--sensor-color, currentColor);
        }

        .sensor-container.horizontal.show-separators .sensor-item:not(:first-child)::before {
            content: '';
            position: absolute;
            top: 4px;
            bottom: 4px;
            left: calc(0px - var(--sensor-item-gap, 16px));
            width: var(--sensor-item-gap, 16px);
            min-height: 3rem;
            background: linear-gradient(
                to right,
                transparent calc(50% - 0.5px),
                var(--sensor-separator-color, currentColor) calc(50% - 0.5px),
                var(--sensor-separator-color, currentColor) calc(50% + 0.5px),
                transparent calc(50% + 0.5px)
            );
            opacity: var(--sensor-separator-opacity, 0.28);
            pointer-events: none;
        }

        .sensor-container.horizontal.align-left .sensor-item { justify-content: flex-start; }
        .sensor-container.horizontal.align-center .sensor-item { justify-content: center; }
        .sensor-container.horizontal.align-right .sensor-item { justify-content: flex-end; }
        .sensor-container.vertical.align-left { align-items: flex-start; }
        .sensor-container.vertical.align-center { align-items: center; }
        .sensor-container.vertical.align-right { align-items: flex-end; }

        .sensor-container.align-left .sensor-item { text-align: left; }
        .sensor-container.align-center .sensor-item { text-align: center; }
        .sensor-container.align-right .sensor-item { text-align: right; }

        .sensor-label {
            font-size: 1.0rem;
            font-weight: 300;
            opacity: 0.8;
            color: var(--sensor-color, currentColor);
        }

        .sensor-value {
            font-size: 1.5rem;
            font-weight: 400;
            color: var(--sensor-color, var(--sensor-value-color, #ffffff));
            white-space: nowrap;
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
    `,rs([me({type:Array})],ss.prototype,"sensors",void 0),rs([me({type:String})],ss.prototype,"fontColor",void 0),rs([me({type:Object})],ss.prototype,"hass",void 0),rs([me({type:String})],ss.prototype,"size",void 0),rs([me({type:String})],ss.prototype,"labelSize",void 0),rs([me({type:String})],ss.prototype,"valueSize",void 0),rs([me({type:String})],ss.prototype,"itemGap",void 0),rs([me({type:Boolean})],ss.prototype,"showIcons",void 0),rs([me({type:String})],ss.prototype,"iconSize",void 0),rs([me({type:Boolean})],ss.prototype,"showSeparator",void 0),rs([me({type:String})],ss.prototype,"separatorColor",void 0),rs([me({type:Number})],ss.prototype,"separatorOpacity",void 0),rs([me({type:String})],ss.prototype,"orientation",void 0),rs([me({type:String})],ss.prototype,"alignment",void 0),ss=rs([ue("ha-sensors")],ss);let ls=class extends os{constructor(){super(...arguments),this.sensors=document.createElement("ha-sensors")}applyWidgetState(){var e,t,o;const i=!(!this.config.labelSize&&!this.config.valueSize);this.sensors.sensors=null!==(e=this.config.sensors)&&void 0!==e?e:[],this.sensors.fontColor=this.fontColor,this.sensors.size=i?ut.Custom:null!==(o=null===(t=this.appearance)||void 0===t?void 0:t.size)&&void 0!==o?o:ut.Medium,this.sensors.labelSize=this.config.labelSize,this.sensors.valueSize=this.config.valueSize,this.sensors.itemGap=this.config.itemGap,this.sensors.showIcons=!1!==this.config.showIcons,this.sensors.iconSize=this.config.iconSize,this.sensors.showSeparator=!1!==this.config.showSeparator,this.sensors.separatorColor=this.config.separatorColor,this.sensors.separatorOpacity=this.config.separatorOpacity,this.sensors.orientation=lr(this.config.orientation,this.zoneId),this.sensors.alignment=cr(this.config.alignment,this.zoneId,this.zoneAlignment),this.hass&&(this.sensors.hass=this.hass)}render(){return U`${this.sensors}`}};ls.styles=n`
        :host {
            display: block;
            width: 100%;
            max-height: 100%;
        }

        /* A percentage-sized child has no intrinsic flex width. Let the sensor
           content establish it when the row widget uses compact sizing. */
        :host([data-content-width]) ha-sensors {
            --sensor-component-width: max-content;
            --sensor-container-type: normal;
            width: max-content;
            max-width: 100%;
        }
    `,ls=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("wcc-sensors-widget")],ls);class cs{static getInstance(){return cs.instance||(cs.instance=new cs),cs.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&ze.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const ds=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,o=e.longitude||14.4378,i=e.units||"metric",a=e.language||"en";try{const n=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${o}&units=${i}&lang=${a}&appid=${e.apiKey}`;ze.debug("[OpenWeatherMap] "+n);const r=await fetch(n);if(!r.ok)throw new Error(`OpenWeatherMap API error: ${r.statusText}`);const s=await r.json();if(!s.list||!s.list.length)throw new Error("No forecast data available");const l=s.list[0],c=l.weather[0].description,d={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon,e.iconSet),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},h=new Map;return s.list.forEach(e=>{var t;const o=new Date(1e3*e.dt).toISOString().split("T")[0];h.has(o)||h.set(o,[]),null===(t=h.get(o))||void 0===t||t.push(e)}),{current:d,daily:Array.from(h.entries()).map(([t,o])=>{const i=o.map(e=>e.main.temp),a=Math.min(...i),n=Math.max(...i),r=o[Math.floor(o.length/2)]||o[0],s=o.filter(e=>void 0!==e.pop).map(e=>e.pop),l=s.length>0?s.reduce((e,t)=>e+t,0)/s.length*100:0;return{date:new Date(t),temperatureMin:a,temperatureMax:n,condition:r.weather[0].description,icon:this.getIconUrl(r.weather[0].icon,e.iconSet),precipitation:l,humidity:r.main.humidity,windSpeed:r.wind.speed}}),temperatureUnit:"imperial"===e.units?"°F":"°C"}}catch(e){throw ze.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"en"}}getIconUrl(e,t){return"basmilius"===t?this.getAnimatedIconUrl(e):"metno"===t?this.getMetNoIconUrl(e):`https://openweathermap.org/img/wn/${e}@2x.png`}getAnimatedIconUrl(e){let t="clear-day";switch(e){case"01d":t="clear-day";break;case"01n":t="clear-night";break;case"02d":t="partly-cloudy-day";break;case"02n":t="partly-cloudy-night";break;case"03d":case"03n":case"04d":case"04n":t="cloudy";break;case"09d":case"09n":t="rain";break;case"10d":t="partly-cloudy-day-rain";break;case"10n":t="partly-cloudy-night-rain";break;case"11d":case"11n":t="thunderstorms";break;case"13d":case"13n":t="snow";break;case"50d":case"50n":t="fog"}return`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${t}.svg`}getMetNoIconUrl(e){let t="clearsky_day";switch(e){case"01d":t="clearsky_day";break;case"01n":t="clearsky_night";break;case"02d":t="fair_day";break;case"02n":t="fair_night";break;case"03d":case"03n":case"04d":case"04n":t="cloudy";break;case"09d":case"09n":t="heavyrain";break;case"10d":case"10n":t="rain";break;case"11d":case"11n":t="rainshowersandthunder_day";break;case"13d":case"13n":t="snow";break;case"50d":case"50n":t="fog"}return`https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${t}.svg`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){let t;switch(ze.debug(`[OpenWeatherMap] Mapping weather condition: ${e}`),e.toLowerCase()){case"clear":case"clear sky":t=Ee.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":t=Ee.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":t=Ee.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":t=Ee.Rain;break;case"tornado":case"windy":case"all":default:t=Ee.All;break;case"snow":case"light snow":t=Ee.Snow}return ze.debug(`[OpenWeatherMap] Mapped to Weather enum: ${t}`),t}},{PI:hs,sin:us,cos:ps,tan:gs,asin:ms,atan2:vs,acos:fs,sqrt:ys,abs:bs,round:ws}=Math,_s=hs/180;function xs(e,t,o){return(vs(us(e),ps(e)*us(t)-gs(o)*ps(t))/_s+540)%360}function $s(e){return e<0&&(e=0),2967e-7/gs(e+.00312536/(e+.08901179))}new Int32Array([0,0,1,0,6288774,-20905355,2,0,-1,0,1274027,-3699111,2,0,0,0,658314,-2955968,0,0,2,0,213618,-569925,0,1,0,0,-185116,48888,0,0,0,2,-114332,-3149,2,0,-2,0,58793,246158,2,-1,-1,0,57066,-152138,2,0,1,0,53322,-170733,2,-1,0,0,45758,-204586,0,1,-1,0,-40923,-129620,1,0,0,0,-34720,108743,0,1,1,0,-30383,104755,2,0,0,-2,15327,10321,0,0,1,2,-12528,0,0,0,1,-2,10980,79661,4,0,-1,0,10675,-34782,0,0,3,0,10034,-23210,4,0,-2,0,8548,-21636,2,1,-1,0,-7888,24208,2,1,0,0,-6766,30824,1,0,-1,0,-5163,-8379,1,1,0,0,4987,-16675,2,-1,1,0,4036,-12831,2,0,2,0,3994,-10445,4,0,0,0,3861,-11650,2,0,-3,0,3665,14403,0,1,-2,0,-2689,-7003,2,0,-1,2,-2602,0,2,-1,-2,0,2390,10056,1,0,1,0,-2348,6322,2,-2,0,0,2236,-9884,0,1,2,0,-2120,5751,0,2,0,0,-2069,0,2,-2,-1,0,2048,-4950,2,0,1,-2,-1773,4130,2,0,0,2,-1595,0,4,-1,-1,0,1215,-3958,0,0,2,2,-1110,0,3,0,-1,0,-892,3258,2,1,1,0,-810,2616,4,-1,-2,0,759,-1897,0,2,-1,0,-713,-2117,2,2,-1,0,-700,2354,2,1,-2,0,691,0,2,-1,0,-2,596,0,4,0,1,0,549,-1423,0,0,4,0,537,-1117,4,-1,0,0,520,-1571,1,0,-2,0,-487,-1739,2,1,0,-2,-399,0,0,0,2,-2,-381,-4421,1,1,1,0,351,0,3,0,-2,0,-340,0,4,0,-3,0,330,0,2,-1,2,0,327,0,0,2,1,0,-323,1165,1,1,-1,0,299,0,2,0,3,0,294,0,2,0,-1,-2,0,8752]),new Int32Array([0,0,0,1,5128122,0,0,1,1,280602,0,0,1,-1,277693,2,0,0,-1,173237,2,0,-1,1,55413,2,0,-1,-1,46271,2,0,0,1,32573,0,0,2,1,17198,2,0,1,-1,9266,0,0,2,-1,8822,2,-1,0,-1,8216,2,0,-2,-1,4324,2,0,1,1,4200,2,1,0,-1,-3359,2,-1,-1,1,2463,2,-1,0,1,2211,2,-1,-1,-1,2065,0,1,-1,-1,-1870,4,0,-1,-1,1828,0,1,0,1,-1794,0,0,0,3,-1749,0,1,-1,1,-1565,1,0,0,1,-1491,0,1,1,1,-1475,0,1,1,-1,-1410,0,1,0,-1,-1344,1,0,0,-1,-1335,0,0,3,1,1107,4,0,0,-1,1021,4,0,-1,1,833,0,0,1,-3,777,4,0,-2,1,671,2,0,0,-3,607,2,0,2,-1,596,2,-1,1,-1,491,2,0,-2,1,-451,0,0,3,-1,439,2,0,2,1,422,2,0,-3,-1,421,2,1,-1,1,-366,2,1,0,1,-351,4,0,0,1,331,2,-1,1,1,315,2,-2,0,-1,302,0,0,1,3,-283,2,1,1,-1,-229,1,1,0,-1,223,1,1,0,1,223,0,1,-2,-1,-220,2,1,-1,-1,-220,1,0,1,1,-185,2,-1,-2,-1,181,0,1,2,1,-177,4,0,-2,-1,176,4,-1,-1,-1,166,1,0,1,-1,-164,4,0,1,-1,132,1,0,-1,-1,-119,4,-1,0,-1,115,2,-2,0,1,107]);const ks=new class{constructor(){this.id="homeassistant",this.name="Home Assistant",this.description="Weather data from a Home Assistant entity"}setHass(e){this.hass=e}async fetchWeatherAsync(e){var t,o;if(!this.hass)throw new Error("Home Assistant instance not set");const i=e.entityId;if(!i)throw new Error("Home Assistant weather entity ID is required");const a=this.hass.states[i];if(!a)throw new Error(`Entity ${i} not found`);const n=a.attributes,r=this.buildCurrent(a,e),s=this.resolveForecastTypes(e,a),l=await this.fetchForecastAsync(i,s);return{current:r,daily:this.mapForecastItems(l.forecast,e,a,l.forecastType),entityId:i,temperatureUnit:n.temperature_unit||(null===(o=null===(t=this.hass.config)||void 0===t?void 0:t.unit_system)||void 0===o?void 0:o.temperature),forecastType:l.forecastType}}getCurrentWeather(e){var t;const o=e.entityId?null===(t=this.hass)||void 0===t?void 0:t.states[e.entityId]:void 0;if(o)return this.buildCurrent(o,e)}async subscribeForecastAsync(e,t){var o,i;const a=e.entityId,n=null===(o=this.hass)||void 0===o?void 0:o.connection;if(!a||!(null==n?void 0:n.subscribeMessage))return null;const r=null===(i=this.hass)||void 0===i?void 0:i.states[a],s=this.resolveForecastTypes(e,r);for(const o of s)try{const i=await n.subscribeMessage(i=>{var n;if((null==i?void 0:i.forecast)&&Array.isArray(i.forecast)){const r=null===(n=this.hass)||void 0===n?void 0:n.states[a];t(this.mapForecastItems(i.forecast,e,r,o),o)}},{type:"weather/subscribe_forecast",entity_id:a,forecast_type:o});return ze.debug(`[HA Weather] Subscribed to ${o} forecast updates for ${a}`),i}catch(e){ze.debug(`[HA Weather] ${o} forecast subscription failed for ${a}:`,e)}return ze.warn(`[HA Weather] weather/subscribe_forecast unavailable for ${a}`),null}resolveForecastTypes(e,t){var o,i;if(e.forecastType&&"auto"!==e.forecastType)return[e.forecastType];const a=Number(null!==(i=null===(o=null==t?void 0:t.attributes)||void 0===o?void 0:o.supported_features)&&void 0!==i?i:0),n=[];return 1&a&&n.push("daily"),2&a&&n.push("hourly"),4&a&&n.push("twice_daily"),n.length>0?n:["daily","hourly","twice_daily"]}async fetchForecastAsync(e,t){var o,i,a;let n;for(const a of t)try{const t=await this.hass.callWS({type:"call_service",domain:"weather",service:"get_forecasts",service_data:{type:a},target:{entity_id:e},return_response:!0}),n=null===(i=null===(o=null==t?void 0:t.response)||void 0===o?void 0:o[e])||void 0===i?void 0:i.forecast;if(Array.isArray(n))return{forecast:n,forecastType:a}}catch(t){n=t,ze.debug(`[HA Weather] ${a} forecast fetch failed for ${e}:`,t)}return n&&ze.error(`[HA Weather] Error fetching forecast for ${e}:`,n),{forecast:[],forecastType:null!==(a=t[0])&&void 0!==a?a:"daily"}}buildCurrent(e,t){const o=e.attributes,i=e.state;return{temperature:o.temperature,condition:this.mapConditionToKey(i),conditionText:this.localizeCondition(e),conditionUnified:this.mapWeatherCondition(i),icon:this.getIconUrl(i,t.iconSet,this.isNight(new Date,t)),humidity:o.humidity,windSpeed:o.wind_speed,pressure:o.pressure,feelsLike:o.apparent_temperature}}mapForecastItems(e,t,o,i){return e.map(e=>({date:new Date(e.datetime),temperatureMin:void 0!==e.templow?e.templow:e.temperature,temperatureMax:e.temperature,condition:this.mapConditionToKey(e.condition),conditionText:o?this.localizeCondition(o,e.condition):void 0,icon:this.getIconUrl(e.condition,t.iconSet,"boolean"==typeof e.is_daytime?!e.is_daytime:"hourly"===i&&this.isNight(new Date(e.datetime),t)),precipitation:e.precipitation,humidity:e.humidity,windSpeed:e.wind_speed}))}isNight(e,t){var o,i,a,n,r,s;const l=null!==(o=t.latitude)&&void 0!==o?o:null===(a=null===(i=this.hass)||void 0===i?void 0:i.config)||void 0===a?void 0:a.latitude,c=null!==(n=t.longitude)&&void 0!==n?n:null===(s=null===(r=this.hass)||void 0===r?void 0:r.config)||void 0===s?void 0:s.longitude;return!(!Number.isFinite(e.getTime())||"number"!=typeof l||!Number.isFinite(l)||Math.abs(l)>90||"number"!=typeof c||!Number.isFinite(c)||Math.abs(c)>180)&&function(e,t,o){const i=_s*-o,a=_s*t,n=function(e){return e.valueOf()/864e5-.5+2440588-2451545}(e),r=function(e){const t=e/36525,o=_s*(280.46646+t*(36000.76983+3032e-7*t)),i=_s*(357.52911+t*(35999.05029-1537e-7*t)),a=us(i),n=ps(i),r=_s*(125.04-1934.136*t),s=o+_s*((1.914602-t*(.004817+14e-6*t))*a+2*(.019993-101e-6*t)*a*n+289e-6*a*(3-4*a*a))-_s*(.00569+.00478*us(r)),l=_s*(23.439291-t*(.0130042+t*(16e-8-504e-9*t)))+.00256*_s*ps(r);return{ra:vs(ps(l)*us(s),ps(s)),dec:ms(us(l)*us(s))}}(function(e){return e+function(e){const t=2e3+e/365.2425;let o;return t<1920?(o=t-1900,o*(1.494119+o*(o*(.0061966-197e-6*o)-.0598939))-2.79):t<1941?(o=t-1920,21.2+o*(.84493+o*(.0020936*o-.0761))):t<1961?(o=t-1950,29.07+o*(.407+o*(-1/233+o/2547))):t<1986?(o=t-1975,45.45+o*(1.067+o*(-1/260-o/718))):t<2005?(o=t-2e3,63.86+o*(.3345+o*(o*(.0017275+o*(651814e-9+2373599e-11*o))-.060374))):t<2050?(o=t-2e3,62.92+o*(.32217+.005589*o)):(o=(t-1820)/100,32*o*o-20-.5628*(2150-t))}(e)/86400}(n)),s=function(e,t){return _s*(280.46061837+360.98564736629*e)-t}(n,i)-r.ra,l=function(e,t,o){return ms(us(t)*us(o)+ps(t)*ps(o)*ps(e))}(s,a,r.dec);return{azimuth:xs(s,a,r.dec),altitude:(l+$s(l))/_s}}(e,l,c).altitude<0}localizeCondition(e,t){var o;const i=null===(o=this.hass)||void 0===o?void 0:o.formatEntityState;if("function"==typeof i)try{return void 0!==t?i.call(this.hass,e,t):i.call(this.hass,e)}catch(e){return void ze.warn("[HA Weather] formatEntityState failed:",e)}}getDefaultConfig(){return{entityId:"",forecastType:"auto"}}mapConditionToKey(e){const t=null==e?void 0:e.toLowerCase();switch(t){case"sunny":case"clear-night":return"clear_sky";case"cloudy":return"overcast_clouds";case"partlycloudy":return"scattered_clouds";case"rainy":return"rain";case"pouring":return"heavy_intensity_rain";case"lightning":case"lightning-rainy":return"thunderstorm";case"snowy":case"snowy-rainy":return"snow";case"fog":return"mist";default:return t}}mapWeatherCondition(e){switch(null==e?void 0:e.toLowerCase()){case"clear-night":case"sunny":return Ee.ClearSky;case"cloudy":case"partlycloudy":return Ee.Clouds;case"rainy":case"pouring":case"lightning":case"lightning-rainy":return Ee.Rain;case"snowy":case"snowy-rainy":return Ee.Snow;case"fog":case"hail":return Ee.Mist;default:return Ee.All}}getIconUrl(e,t,o=!1){const i=null==e?void 0:e.toLowerCase();if("basmilius"===t)return this.getAnimatedIconUrl(i,o);if("openweathermap"===t)return this.getOpenWeatherMapIconUrl(i,o);let a="clearsky_day";switch(i){case"sunny":a="clearsky_day";break;case"clear-night":a="clearsky_night";break;case"cloudy":a="cloudy";break;case"partlycloudy":a=o?"fair_night":"fair_day";break;case"rainy":a="rain";break;case"pouring":a="heavyrain";break;case"lightning":case"lightning-rainy":a="rainshowersandthunder_day";break;case"snowy":a="snow";break;case"snowy-rainy":a="sleet";break;case"fog":a="fog"}return`https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${a}.svg`}getOpenWeatherMapIconUrl(e,t=!1){let o="01d";switch(e){case"sunny":o="01d";break;case"clear-night":o="01n";break;case"cloudy":o="03d";break;case"partlycloudy":o=t?"02n":"02d";break;case"rainy":o="10d";break;case"pouring":o="09d";break;case"lightning":case"lightning-rainy":o="11d";break;case"snowy":case"snowy-rainy":o="13d";break;case"fog":o="50d"}return`https://openweathermap.org/img/wn/${o}@2x.png`}getAnimatedIconUrl(e,t=!1){let o="clear-day";switch(e){case"sunny":o="clear-day";break;case"clear-night":o="clear-night";break;case"cloudy":o="cloudy";break;case"partlycloudy":o=t?"partly-cloudy-night":"partly-cloudy-day";break;case"rainy":o="rain";break;case"pouring":o="extreme-rain";break;case"lightning":case"lightning-rainy":o="thunderstorms-rain";break;case"snowy":o="snow";break;case"snowy-rainy":o="sleet";break;case"fog":o="fog";break;case"hail":o="hail";break;case"windy":o="wind"}return`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${o}.svg`}},Ss=cs.getInstance();function zs(e){return Ss.getProvider(e)}Ss.register(ds),Ss.register(ks);class Cs extends tt{constructor(e,t={}){super(e,"weather-controller"),this._weatherLoading=!1,this._weatherRefreshPending=!1,this._weatherError=!1,this._weatherErrorMessage="",this._messenger=ot.getInstance(),this._forceUpdateWeatherHandler=e=>this.fetchWeatherDataAsync(),this.config={},this.config=t}onHostConnected(){this._messenger.subscribe(nt,this._forceUpdateWeatherHandler),this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this._messenger.unsubscribe(nt,this._forceUpdateWeatherHandler),this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),this.teardownForecastSubscription()}teardownForecastSubscription(){if(this._forecastUnsubscribe){try{this._forecastUnsubscribe()}catch(e){this.logger.debug("Error unsubscribing from forecast updates:",e)}this._forecastUnsubscribe=void 0}this._subscribedForecastKey=void 0}async updateConfigAsync(e,t){this.logger.debug("Updating WeatherController config:",e);const o=this._hass;this._hass=t;const i=this.config.showWeather,a=this.config.weatherProvider,n=this.config.weatherUpdateInterval,r=this.dataSourceSignature(this.config);this.config={...this.config,...e};const s=r!==this.dataSourceSignature(this.config);n!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),this.config.showWeather&&(!i&&this.config.showWeather||!o&&this._hass&&!this._weatherData||a!==this.config.weatherProvider||s)?await this.fetchWeatherDataAsync():this.config.showWeather?this.refreshCurrentFromEntity():ot.getInstance().publish(new at(Ee.All)),this.host.requestUpdate()}dataSourceSignature(e){return JSON.stringify({provider:e.weatherProvider,weatherConfig:e.weatherConfig,iconSet:e.weatherIconSet})}refreshCurrentFromEntity(){var e,t;if(!this._hass||!this._weatherData)return;const o=zs(this.config.weatherProvider||"openweathermap");if(!(null==o?void 0:o.getCurrentWeather))return;const i=this.buildProviderConfig(o),a=i.entityId;if(!a)return;const n=this._hass.states[a];if(!n||n===this._lastEntityState)return;this._lastEntityState=n,null===(e=o.setHass)||void 0===e||e.call(o,this._hass);const r=o.getCurrentWeather(i);r&&(this.logger.debug(`Weather entity ${a} changed, refreshing current conditions`),this._weatherData={...this._weatherData,current:r},this._messenger.publish(new at(null!==(t=r.conditionUnified)&&void 0!==t?t:Ee.All)))}async setupForecastSubscriptionAsync(e,t){var o;if(!e.subscribeForecastAsync)return void this.teardownForecastSubscription();const i=t.entityId,a=i?`${i}:${String(null!==(o=t.forecastType)&&void 0!==o?o:"auto")}`:void 0;if(!i||a===this._subscribedForecastKey)return;this.teardownForecastSubscription();const n=await e.subscribeForecastAsync(t,(e,t)=>{this._weatherData&&(this.logger.debug(`Received pushed forecast update (${e.length} periods)`),this._weatherData={...this._weatherData,daily:e,forecastType:null!=t?t:this._weatherData.forecastType},this.host.requestUpdate())});n&&(this._forecastUnsubscribe=n,this._subscribedForecastKey=a)}buildProviderConfig(e){var t;let o=e.getDefaultConfig();return this.config.weatherConfig&&(o={...o,...this.config.weatherConfig},this.config.weatherConfig.units&&(o.units=this.config.weatherConfig.units)),this.config.weatherIconSet?o.iconSet=this.config.weatherIconSet:(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.iconSet)&&(o.iconSet=this.config.weatherConfig.iconSet),o}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting weather update interval to ${e} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(e){this.logger.error("Error in weather update interval:",e)}})()},t)}async fetchWeatherDataAsync(){var e,t;if(this.config.showWeather)if(this._weatherLoading)this._weatherRefreshPending=!0;else{this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const o=this.config.weatherProvider||"openweathermap",i=zs(o);if(!i)throw new Error(`Weather provider '${o}' not found`);if(i.setHass)if(this._hass)i.setHass(this._hass);else if("homeassistant"===i.id)return void this.logger.debug("Home Assistant instance not available yet for HA weather provider, skipping fetch");const a=this.buildProviderConfig(i);this._weatherData=await i.fetchWeatherAsync(a),this._weatherData&&ot.getInstance().publish(new at(null!==(t=null===(e=this._weatherData.current)||void 0===e?void 0:e.conditionUnified)&&void 0!==t?t:Ee.All));const n=a.entityId;n&&this._hass&&(this._lastEntityState=this._hass.states[n]),await this.setupForecastSubscriptionAsync(i,a),this.logger.info(`Fetched weather data from ${i.name}:`,this._weatherData)}catch(e){this._weatherError=!0,this._weatherErrorMessage=e instanceof Error?e.message:String(e),this.logger.error("Error fetching weather data:",e)}finally{this._weatherLoading=!1,this.host.requestUpdate(),this._weatherRefreshPending&&(this._weatherRefreshPending=!1,this.fetchWeatherDataAsync())}}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}}var Is=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Es=class extends de{constructor(){super(...arguments),this.condition="",this.source="",this.label="",this.animated=!0}renderDefs(){return V`
            <defs>
                <linearGradient id="sun" x1="18" y1="15" x2="44" y2="47" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFE06A"/>
                    <stop offset="1" stop-color="#FFAE18"/>
                </linearGradient>
                <linearGradient id="moon" x1="18" y1="13" x2="44" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFFFFF"/>
                    <stop offset="1" stop-color="#B8C9E3"/>
                </linearGradient>
                <linearGradient id="cloud" x1="19" y1="13" x2="42" y2="47" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFFFFF"/>
                    <stop offset="0.55" stop-color="#EAF1F8"/>
                    <stop offset="1" stop-color="#BCC9D6"/>
                </linearGradient>
                <linearGradient id="cloud-dark" x1="17" y1="12" x2="44" y2="47" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D5DEE9"/>
                    <stop offset="1" stop-color="#77889D"/>
                </linearGradient>
                <linearGradient id="rain" x1="0" y1="43" x2="0" y2="62" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#53D8FF"/>
                    <stop offset="1" stop-color="#138CF2"/>
                </linearGradient>
                <linearGradient id="snow" x1="0" y1="43" x2="0" y2="61" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFFFFF"/>
                    <stop offset="1" stop-color="#BDEBFF"/>
                </linearGradient>
                <filter id="shadow" x="-25%" y="-25%" width="150%" height="165%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#06101C" flood-opacity="0.38"/>
                </filter>
                <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <mask id="crescent">
                    <rect width="64" height="64" fill="black"/>
                    <circle cx="30" cy="29" r="15" fill="white"/>
                    <circle cx="37" cy="23" r="15" fill="black"/>
                </mask>
            </defs>
        `}renderSun(e=32,t=31,o=1){return V`
            <g transform="translate(${e} ${t}) scale(${o}) translate(-32 -31)">
                <g class="sun-rays" stroke="#FFC12E" stroke-width="3" stroke-linecap="round">
                    <path d="M32 5v7M32 50v7M6 31h7M51 31h7"/>
                    <path d="m13.6 12.6 5 5M45.4 44.4l5 5M13.6 49.4l5-5M45.4 17.6l5-5"/>
                </g>
                <circle class="sun-core" cx="32" cy="31" r="12" fill="url(#sun)" filter="url(#glow)"/>
            </g>
        `}renderMoon(e=30,t=29,o=1){return V`
            <g transform="translate(${e-30} ${t-29}) scale(${o})">
                <circle class="moon" cx="30" cy="29" r="17" fill="url(#moon)" mask="url(#crescent)" filter="url(#shadow)"/>
                <circle class="star" cx="46" cy="16" r="1.8" fill="#FFF4B8"/>
                <circle class="star delay-1" cx="49" cy="28" r="1.2" fill="#FFFFFF"/>
                <circle class="star delay-2" cx="39" cy="9" r="1.1" fill="#FFFFFF"/>
            </g>
        `}renderCloud(e=!1){return V`
            <g class="cloud-drift" filter="url(#shadow)">
                <path
                    d="M16.2 43C10 43 5 38.6 5 33.1c0-5 4-9.2 9.2-9.8C16.5 16.7 22.2 12 29.2 12c8.7 0 15.8 6.6 16.4 15 1.1-.4 2.3-.6 3.5-.6 5.8 0 10.4 4.2 10.4 9.3S54.9 45 49.1 45H16.2z"
                    fill="${e?"url(#cloud-dark)":"url(#cloud)"}"
                />
                <path d="M14 27c2.1-2.3 5-3.7 8.2-3.7 1.6-4.4 5.7-7.5 10.6-7.5 4.6 0 8.6 2.8 10.4 6.8-2.1-6.2-7.5-10.6-14-10.6-7 0-12.7 4.7-15 11.3-5.2.6-9.2 4.8-9.2 9.8 0 .7.1 1.3.2 1.9.6-3.2 4-6.3 8.8-8z" fill="#FFFFFF" opacity="${e?"0.16":"0.42"}"/>
            </g>
        `}renderDrops(e=!1){return V`
            <g stroke="url(#rain)" stroke-width="${e?3.4:2.8}" stroke-linecap="round">
                <path class="rain-drop" d="m18 46-4 9"/>
                <path class="rain-drop delay-1" d="m31 46-4 11"/>
                <path class="rain-drop delay-2" d="m44 46-4 9"/>
                ${e?V`<path class="rain-drop delay-3" d="m55 45-4 11"/>`:V``}
            </g>
        `}renderSnowflakes(){return V`
            <g stroke="url(#snow)" stroke-width="1.8" stroke-linecap="round">
                <g transform="translate(18 52)">
                    <g class="snow-flake">
                        <path d="M-4 0h8M0-4v8M-2.8-2.8l5.6 5.6M2.8-2.8l-5.6 5.6"/>
                    </g>
                </g>
                <g transform="translate(33 55)">
                    <g class="snow-flake delay-1">
                        <path d="M-3.5 0h7M0-3.5v7M-2.5-2.5l5 5M2.5-2.5l-5 5"/>
                    </g>
                </g>
                <g transform="translate(49 51)">
                    <g class="snow-flake delay-2">
                        <path d="M-4 0h8M0-4v8M-2.8-2.8l5.6 5.6M2.8-2.8l-5.6 5.6"/>
                    </g>
                </g>
            </g>
        `}renderGlyph(e){switch(e){case"clear-day":return V`${this.renderSun()}`;case"clear-night":return V`${this.renderMoon()}`;case"partly-cloudy-day":return V`
                    <g transform="translate(-7 -8) scale(.78)">${this.renderSun()}</g>
                    <g transform="translate(7 9) scale(.88)">${this.renderCloud()}</g>
                `;case"partly-cloudy-night":return V`
                    <g transform="translate(-7 -7) scale(.8)">${this.renderMoon()}</g>
                    <g transform="translate(7 9) scale(.88)">${this.renderCloud()}</g>
                `;case"cloudy":return V`
                    <g transform="translate(-8 -4) scale(.82)" opacity=".62">${this.renderCloud(!0)}</g>
                    <g transform="translate(6 7) scale(.9)">${this.renderCloud()}</g>
                `;case"rain":return V`${this.renderCloud()}${this.renderDrops()}`;case"pouring":return V`${this.renderCloud(!0)}${this.renderDrops(!0)}`;case"thunderstorm":return V`
                    ${this.renderCloud(!0)}
                    <path class="lightning" d="M35 42h-8l-3 10h7l-2 10 13-16h-8z" fill="url(#sun)" filter="url(#glow)"/>
                    <path class="rain-drop delay-1" d="m49 46-4 10" stroke="url(#rain)" stroke-width="2.7" stroke-linecap="round"/>
                `;case"snow":return V`${this.renderCloud()}${this.renderSnowflakes()}`;case"sleet":return V`
                    ${this.renderCloud(!0)}
                    <g stroke="url(#rain)" stroke-width="2.6" stroke-linecap="round">
                        <path class="rain-drop" d="m17 46-4 9"/>
                        <path class="rain-drop delay-1" d="m47 46-4 9"/>
                    </g>
                    <g transform="translate(1 0)">${this.renderSnowflakes()}</g>
                `;case"fog":return V`
                    <g transform="translate(3 -7) scale(.9)" opacity=".82">${this.renderCloud()}</g>
                    <g fill="none" stroke="#C9D6E2" stroke-width="3" stroke-linecap="round">
                        <path class="fog-line" d="M10 43h35"/>
                        <path class="fog-line delay-1" d="M18 50h36"/>
                        <path class="fog-line delay-2" d="M9 57h33"/>
                    </g>
                `;case"hail":return V`
                    ${this.renderCloud(!0)}
                    <g fill="url(#snow)" stroke="#91CDE8" stroke-width=".8">
                        <circle class="hail-stone" cx="18" cy="51" r="3"/>
                        <circle class="hail-stone delay-1" cx="33" cy="55" r="3"/>
                        <circle class="hail-stone delay-2" cx="49" cy="50" r="3"/>
                    </g>
                `;case"windy":return V`
                    <g transform="translate(10 -7) scale(.72)" opacity=".7">${this.renderCloud()}</g>
                    <g fill="none" stroke="#DCEAF5" stroke-width="3" stroke-linecap="round">
                        <path class="wind-line" d="M7 35h35c7 0 7-8 1-8-3 0-4 2-4 3"/>
                        <path class="wind-line delay-1" d="M12 44h39c7 0 7 8 1 8-3 0-4-2-4-3"/>
                        <path class="wind-line delay-2" d="M7 53h26"/>
                    </g>
                `;case"exceptional":return V`
                    ${this.renderCloud(!0)}
                    <g class="alert" filter="url(#glow)">
                        <path d="M32 40 19 61h26z" fill="#FFB52D"/>
                        <path d="M32 47v7" stroke="#35220A" stroke-width="3" stroke-linecap="round"/>
                        <circle cx="32" cy="57" r="1.7" fill="#35220A"/>
                    </g>
                `}}render(){const e=function(e,t){var o;const i=`${null!=e?e:""} ${null!=t?t:""}`.toLowerCase(),a=/clear-night|partly-cloudy-night|_night|-night|0[1-2]n(?:\D|$)/.test(i),n=null===(o=i.match(/(?:^|\/)(01|02|03|04|09|10|11|13|50)[dn](?:@|\D|$)/))||void 0===o?void 0:o[1];if(/exceptional|tornado|hurricane|cyclone/.test(i))return"exceptional";if(/lightning|thunder/.test(i))return"thunderstorm";if(/snowy-rainy|sleet|freezing.rain|rain.and.snow/.test(i))return"sleet";if(/pouring|heavy.intensity.rain|extreme-rain|heavyrain/.test(i))return"pouring";if(/hail|ice.pellet/.test(i))return"hail";if(/snow|flurr/.test(i))return"snow";if(/rain|drizzle|shower/.test(i))return"rain";if(/fog|mist|haze|smoke|dust/.test(i))return"fog";if(/wind|squall/.test(i))return"windy";switch(n){case"02":return a?"partly-cloudy-night":"partly-cloudy-day";case"03":case"04":return"cloudy";case"09":return"pouring";case"10":return"rain";case"11":return"thunderstorm";case"13":return"snow";case"50":return"fog";case"01":return a?"clear-night":"clear-day"}return/partlycloudy|partly.cloudy|scattered.cloud|few.cloud|fair_/.test(i)?a?"partly-cloudy-night":"partly-cloudy-day":/cloud|overcast|broken.cloud/.test(i)?"cloudy":a?"clear-night":"clear-day"}(this.condition,this.source);return V`
            <svg
                viewBox="0 0 64 64"
                role="img"
                aria-label="${this.label||this.condition||e}"
                focusable="false"
            >
                ${this.renderDefs()}
                ${this.renderGlyph(e)}
            </svg>
        `}};Es.styles=n`
        :host {
            display: inline-block;
            width: 64px;
            height: 64px;
            line-height: 0;
            vertical-align: middle;
        }

        svg {
            display: block;
            width: 100%;
            height: 100%;
            overflow: visible;
        }

        .sun-rays,
        .sun-core,
        .moon,
        .star,
        .cloud-drift,
        .rain-drop,
        .snow-flake,
        .fog-line,
        .wind-line,
        .lightning,
        .hail-stone,
        .alert {
            transform-box: fill-box;
            transform-origin: center;
        }

        :host([animated]) .sun-rays {
            animation: sun-spin 18s linear infinite;
        }

        :host([animated]) .sun-core {
            animation: sun-pulse 3.4s ease-in-out infinite;
        }

        :host([animated]) .moon {
            animation: moon-float 4.8s ease-in-out infinite;
        }

        :host([animated]) .star {
            animation: star-twinkle 2.8s ease-in-out infinite;
        }

        :host([animated]) .star.delay-1 {
            animation-delay: -0.9s;
        }

        :host([animated]) .star.delay-2 {
            animation-delay: -1.8s;
        }

        :host([animated]) .cloud-drift {
            animation: cloud-drift 5.5s ease-in-out infinite;
        }

        :host([animated]) .rain-drop {
            animation: rain-fall 1.15s linear infinite;
        }

        :host([animated]) .rain-drop.delay-1 {
            animation-delay: -0.38s;
        }

        :host([animated]) .rain-drop.delay-2 {
            animation-delay: -0.76s;
        }

        :host([animated]) .rain-drop.delay-3 {
            animation-delay: -0.95s;
        }

        :host([animated]) .snow-flake {
            animation: snow-fall 2.6s ease-in-out infinite;
        }

        :host([animated]) .snow-flake.delay-1 {
            animation-delay: -0.85s;
        }

        :host([animated]) .snow-flake.delay-2 {
            animation-delay: -1.7s;
        }

        :host([animated]) .lightning {
            animation: lightning-flash 3.8s ease-in-out infinite;
        }

        :host([animated]) .fog-line {
            animation: fog-flow 4.4s ease-in-out infinite;
        }

        :host([animated]) .fog-line.delay-1 {
            animation-delay: -1.45s;
        }

        :host([animated]) .fog-line.delay-2 {
            animation-delay: -2.9s;
        }

        :host([animated]) .wind-line {
            animation: wind-flow 2.8s ease-in-out infinite;
        }

        :host([animated]) .wind-line.delay-1 {
            animation-delay: -0.9s;
        }

        :host([animated]) .wind-line.delay-2 {
            animation-delay: -1.8s;
        }

        :host([animated]) .hail-stone {
            animation: hail-fall 1.5s ease-in infinite;
        }

        :host([animated]) .hail-stone.delay-1 {
            animation-delay: -0.5s;
        }

        :host([animated]) .hail-stone.delay-2 {
            animation-delay: -1s;
        }

        :host([animated]) .alert {
            animation: alert-pulse 2.2s ease-in-out infinite;
        }

        @keyframes sun-spin {
            to { transform: rotate(360deg); }
        }

        @keyframes sun-pulse {
            0%, 100% { transform: scale(0.96); filter: brightness(0.98); }
            50% { transform: scale(1.04); filter: brightness(1.08); }
        }

        @keyframes moon-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-1.5px); }
        }

        @keyframes star-twinkle {
            0%, 100% { opacity: 0.45; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes cloud-drift {
            0%, 100% { transform: translateX(-0.8px); }
            50% { transform: translateX(0.8px); }
        }

        @keyframes rain-fall {
            0% { opacity: 0; transform: translateY(-3px); }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; transform: translateY(6px); }
        }

        @keyframes snow-fall {
            0% { opacity: 0; transform: translate(-1px, -3px) rotate(0deg); }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; transform: translate(2px, 5px) rotate(90deg); }
        }

        @keyframes lightning-flash {
            0%, 9%, 13%, 100% { opacity: 0.78; filter: brightness(1); }
            10%, 12% { opacity: 1; filter: brightness(1.55) drop-shadow(0 0 5px #ffd44f); }
        }

        @keyframes fog-flow {
            0%, 100% { opacity: 0.55; transform: translateX(-2px); }
            50% { opacity: 0.95; transform: translateX(2px); }
        }

        @keyframes wind-flow {
            0%, 100% { opacity: 0.45; transform: translateX(-2px); }
            50% { opacity: 1; transform: translateX(2px); }
        }

        @keyframes hail-fall {
            0% { opacity: 0; transform: translateY(-3px); }
            25%, 80% { opacity: 1; }
            100% { opacity: 0; transform: translateY(5px); }
        }

        @keyframes alert-pulse {
            0%, 100% { transform: scale(0.96); filter: brightness(0.95); }
            50% { transform: scale(1.04); filter: brightness(1.15); }
        }

        @media (prefers-reduced-motion: reduce) {
            :host([animated]) * {
                animation: none !important;
            }
        }
    `,Is([me({type:String})],Es.prototype,"condition",void 0),Is([me({type:String})],Es.prototype,"source",void 0),Is([me({type:String})],Es.prototype,"label",void 0),Is([me({type:Boolean,reflect:!0})],Es.prototype,"animated",void 0),Es=Is([ue("wall-clock-weather-icon")],Es);var As=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Ds=class extends de{constructor(){super(),this.orientation="vertical",this.logger=ke("weather-component"),this.weatherController=new Cs(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval,weatherIconSet:this.weatherIconSet})}get controller(){return this.weatherController}updated(e){if(super.updated(e),e.has("hass")||e.has("showWeather")||e.has("weatherProvider")||e.has("weatherConfig")||e.has("weatherDisplayMode")||e.has("weatherForecastDays")||e.has("weatherTitle")||e.has("weatherShowTitle")||e.has("weatherUpdateInterval")||e.has("weatherIconSet")){this.logger.debug("Weather properties or hass changed, updating WeatherController");const e={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval,weatherIconSet:this.weatherIconSet};this.weatherController.updateConfigAsync(e,this.hass)}if(e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}conditionDisplayText(e,t){return t||this.translateWeatherCondition(e)}translateWeatherCondition(e){const t=this.language||"en",o=Ke(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,"");return o&&""!==o?o:e}formatForecastDate(e,t){const o=this.language||"en";return"hourly"===t?new Intl.DateTimeFormat(o,{hour:"2-digit",minute:"2-digit"}).format(e):"twice_daily"===t?new Intl.DateTimeFormat(o,{weekday:"short",hour:"2-digit"}).format(e):et(e,o,{weekday:"short"})}get weatherData(){const e=this.weatherController.weatherData;return e&&e.current&&e.current.conditionUnified&&ot.getInstance().publish(new at(e.current.conditionUnified)),e}getLabelSize(){return gt(this.size,this.labelSize,"labelSize")}getValueSize(){return gt(this.size,this.valueSize,"valueSize")}getForecastTempWidth(){return gt(this.size,void 0,"forecastTempWidth")}_handleWeatherClick(e){e&&this.hass&&kt(this,"hass-more-info",{entityId:e})}renderWeatherIcon(e,t,o,i){return"wall-clock"===this.weatherIconSet?U`
                <wall-clock-weather-icon
                    class="${e}"
                    .condition=${t}
                    .source=${o}
                    .label=${i}
                    .animated=${!1!==this.weatherIconAnimation}
                ></wall-clock-weather-icon>
            `:U`<img class="${e}" src="${o}" alt="${i}">`}render(){const e=this.weatherController.weatherData;if(this.weatherController.hasError)return U`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!e)return U`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">${Je("runtime.loading_weather",this.language,"Loading weather data…")}</div>
                </div>`;const t=this.weatherDisplayMode||"both",o=this.weatherForecastDays||3,i=this.weatherTitle||Je("common.title",this.language,"Weather"),a="horizontal"===this.orientation,n=Je("forecast.title",this.language,"Forecast"),r="current"===t||"both"===t,s=Math.min(o,e.daily.length),l=this.getLabelSize(),c=this.getValueSize(),d=this.getForecastTempWidth();return U`
            <div class="weather-container ${this.orientation} ${"hourly"===e.forecastType?"hourly":""} ${e.entityId?"clickable":""}"
                 style="color: ${this.fontColor}; --first-forecast-column-center: ${50/Math.max(s,1)}%;"
                 @click="${()=>this._handleWeatherClick(e.entityId)}">
                ${!1===this.weatherShowTitle||a&&r?"":U`
                    <div class="weather-title" style="color: ${this.fontColor}; font-size: ${l};">
                        ${a?n:i}
                    </div>
                `}

                ${r?U`
                        <div class="weather-current ${a&&"both"===t?"with-forecast":""}">
                            <div class="weather-temp-container">
                                ${this.renderWeatherIcon("weather-icon",e.current.condition,e.current.icon,this.conditionDisplayText(e.current.condition,e.current.conditionText))}
                                <div class="weather-temp"
                                     style="font-size: ${a?`min(${c}, clamp(1.8rem, 10cqw, 3rem))`:c};">${Math.round(e.current.temperature)}${e.temperatureUnit||"°"}</div>
                                ${a?U`
                                    <div class="weather-current-copy">
                                        ${!1!==this.weatherShowTitle?U`
                                            <div class="weather-title"
                                                 style="color: ${this.fontColor}; font-size: clamp(0.75rem, 3cqw, 1rem);">
                                                ${n}
                                            </div>
                                        `:""}
                                        <div class="weather-condition"
                                             style="font-size: clamp(0.9rem, 3.5cqw, 1.15rem);">
                                            ${this.conditionDisplayText(e.current.condition,e.current.conditionText)}
                                        </div>
                                    </div>
                                `:""}
                            </div>
                            ${a?"":U`
                                <div class="weather-condition" style="font-size: ${l};">
                                    ${this.conditionDisplayText(e.current.condition,e.current.conditionText)}
                                </div>
                            `}
                        </div>
                    `:""}

                ${"forecast"===t||"both"===t?U`
                        <div class="weather-forecast">
                            ${e.daily.slice(0,s).map(t=>U`
                                <div class="forecast-day">
                                    <div class="forecast-date"
                                         style="font-size: ${a?`min(${l}, clamp(0.82rem, 4cqw, 1.4rem))`:l};">${this.formatForecastDate(t.date,e.forecastType)}</div>
                                    ${this.renderWeatherIcon("forecast-icon",t.condition,t.icon,this.conditionDisplayText(t.condition,t.conditionText))}
                                    <div class="forecast-temp"
                                         style="font-size: ${a?`min(${l}, clamp(0.82rem, 4cqw, 1.4rem))`:l}; width: ${d};">
                                        <span>${Math.round(t.temperatureMin)}°</span>
                                        <span class="forecast-separator"> - </span>
                                        <span>${Math.round(t.temperatureMax)}°</span>
                                    </div>
                                </div>
                            `)}
                        </div>
                    `:""}
            </div>
        `}};Ds.styles=n`
        :host {
            display: block;
            max-width: 100%;
            container-type: inline-size;
        }

        .weather-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            z-index: 3;
            max-width: 100%;
            max-height: 100%;
            overflow-y: auto;
        }

        .weather-container.clickable {
            cursor: pointer;
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

        .weather-current-copy {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            min-width: 0;
            margin-left: 12px;
        }

        .weather-current-copy .weather-title,
        .weather-current-copy .weather-condition {
            line-height: 1.25;
            white-space: nowrap;
        }

        .weather-icon {
            width: 60px; /* Medium size (default) */
            height: 60px;
            margin-right: 8px;
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

        .forecast-separator {
            opacity: 0.65;
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

        .weather-container.horizontal {
            align-items: flex-start;
            width: 100%;
            overflow: hidden;
        }

        .weather-container.horizontal .weather-title {
            text-align: left;
        }

        .weather-container.horizontal .weather-current {
            flex: 0 0 auto;
            align-items: flex-start;
            margin-bottom: clamp(8px, 2cqw, 14px);
        }

        .weather-container.horizontal .weather-current.with-forecast {
            width: 100%;
        }

        .weather-container.horizontal .weather-current.with-forecast .weather-temp-container {
            margin-left: calc(
                var(--first-forecast-column-center, 16.667%)
                - clamp(20px, 6cqw, 30px)
            );
            max-width: calc(
                100%
                - var(--first-forecast-column-center, 16.667%)
                + clamp(20px, 6cqw, 30px)
            );
        }

        .weather-container.horizontal .weather-temp-container {
            justify-content: flex-start;
            min-width: 0;
        }

        .weather-container.horizontal .weather-icon {
            width: clamp(40px, 12cqw, 60px);
            height: clamp(40px, 12cqw, 60px);
        }

        .weather-container.horizontal .weather-forecast {
            flex: 1 1 auto;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: clamp(3px, 1.2cqw, 18px);
            width: 100%;
            min-width: 0;
            overflow: hidden;
            padding-bottom: 4px;
        }

        .weather-container.horizontal .forecast-day {
            flex: 1 1 0;
            flex-direction: column;
            justify-content: center;
            width: 0;
            min-width: 0;
        }

        .weather-container.horizontal .forecast-date {
            width: auto;
            margin-right: 0;
            text-align: center;
        }

        .weather-container.horizontal .forecast-icon {
            width: clamp(28px, 8cqw, 44px);
            height: clamp(28px, 8cqw, 44px);
            margin: 0;
        }

        .weather-container.horizontal .forecast-temp {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: auto !important;
            text-align: center;
            white-space: nowrap;
            line-height: 1.25;
        }

        .weather-container.horizontal .forecast-separator {
            display: none;
        }

        .weather-container.hourly .forecast-temp span:first-child,
        .weather-container.hourly .forecast-separator {
            display: none;
        }

        .weather-error {
            color: #f44336;
            font-size: 1rem;
        }
    `,As([me({type:Object})],Ds.prototype,"hass",void 0),As([me({type:Boolean})],Ds.prototype,"showWeather",void 0),As([me({type:String})],Ds.prototype,"weatherProvider",void 0),As([me({type:Object})],Ds.prototype,"weatherConfig",void 0),As([me({type:String})],Ds.prototype,"weatherDisplayMode",void 0),As([me({type:Number})],Ds.prototype,"weatherForecastDays",void 0),As([me({type:String})],Ds.prototype,"weatherTitle",void 0),As([me({type:Boolean})],Ds.prototype,"weatherShowTitle",void 0),As([me({type:Number})],Ds.prototype,"weatherUpdateInterval",void 0),As([me({type:String})],Ds.prototype,"weatherIconSet",void 0),As([me({type:Boolean})],Ds.prototype,"weatherIconAnimation",void 0),As([me({type:String})],Ds.prototype,"fontColor",void 0),As([me({type:String})],Ds.prototype,"language",void 0),As([me({type:String})],Ds.prototype,"size",void 0),As([me({type:String})],Ds.prototype,"labelSize",void 0),As([me({type:String})],Ds.prototype,"valueSize",void 0),As([me({type:String})],Ds.prototype,"orientation",void 0),Ds=As([ue("ha-weather")],Ds);let Ps=class extends os{constructor(){super(...arguments),this.weather=document.createElement("ha-weather")}applyWidgetState(){var e,t,o,i,a;const n=lr(this.config.orientation,this.zoneId),r=!(!this.config.labelSize&&!this.config.valueSize);this.weather.showWeather=!1!==this.config.enabled,this.weather.weatherProvider=this.config.provider,this.weather.weatherConfig=this.config.providerConfig,this.weather.weatherDisplayMode=this.config.displayMode,this.weather.weatherForecastDays=this.config.forecastDays,this.weather.weatherTitle=this.config.title,this.weather.weatherShowTitle=this.config.showTitle,this.weather.weatherUpdateInterval=this.config.updateInterval,this.weather.weatherIconSet=null!==(e=this.config.iconSet)&&void 0!==e?e:null===(t=this.config.providerConfig)||void 0===t?void 0:t.iconSet,this.weather.weatherIconAnimation=!1!==this.config.animateIcons,this.weather.fontColor=this.fontColor,this.weather.language=Qr(null===(o=this.appearance)||void 0===o?void 0:o.language,this.hass),this.weather.size=r?ut.Custom:null!==(a=null===(i=this.appearance)||void 0===i?void 0:i.size)&&void 0!==a?a:ut.Medium,this.weather.labelSize=this.config.labelSize,this.weather.valueSize=this.config.valueSize,this.weather.orientation=n,this.setAttribute("data-orientation",n),this.hass&&(this.weather.hass=this.hass)}render(){return U`${this.weather}`}};Ps.styles=n`
        :host {
            display: block;
            width: 100%;
            max-width: 100%;
            max-height: 100%;
        }

        :host([data-orientation='horizontal']) {
            max-width: 100%;
        }
    `,Ps=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("wcc-weather-widget")],Ps);class Ts extends tt{constructor(e,t={}){super(e,"transportation-controller"),this.onShowTransportation=()=>{this.handleTransportationClick()},this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this._isActive=!1,this.activationRevision=0,this.config={},this.config=t}onHostConnected(){ot.getInstance().subscribe(st,this.onShowTransportation)}onHostDisconnected(){this.activationRevision++,this.clearTimers(),this._transportationDataLoaded=!1,this.lastHassStateKey=void 0,ot.getInstance().unsubscribe(st,this.onShowTransportation)}updateConfig(e){this.logger.debug("Updating TransportationController config:",e),this.activationRevision++,this.config={...this.config,...e},this.clearTimers(),this._transportationDataLoaded=!1,this.lastHassStateKey=void 0,this.host.requestUpdate()}updateHass(e){var t;this.hass=e;const o=this.config.transportation;if(!o)return;const i=ln(o.provider||"idsjmk");if(!i)return;if(null===(t=i.setHass)||void 0===t||t.call(i,e),!i.usesHassStateUpdates||!i.getHassStateKey)return;const a=i.getHassStateKey(o.providerConfig||{}),n=void 0!==this.lastHassStateKey&&a!==this.lastHassStateKey;this.lastHassStateKey=a,n&&this._isActive&&this._transportationDataLoaded&&this.fetchTransportationDataAsync()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.transportation.enabled)return;const e=ln(this.config.transportation.provider||"idsjmk");if(null==e?void 0:e.usesHassStateUpdates)return void this.logger.debug(`Skipping card polling interval for ${e.name}; HA state updates are used`);let t=this.config.transportation.updateInterval||60;t=Math.max(t,60);const o=1100*t;this.logger.debug(`Setting transportation update interval to ${t} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){this.logger.error("Error in transportation update interval:",e)}})()},o)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0),this.setInactive()}async fetchTransportationDataAsync(){var e;if(this.config.transportation&&!1!==this.config.transportation.enabled){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const o=ln(t.provider);if(!o)throw new Error(`Transportation provider '${t.provider}' not found`);this.hass&&(null===(e=o.setHass)||void 0===e||e.call(o,this.hass));const i=(t.stops||[]).map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),a={...t.providerConfig||{}};void 0!==t.maxDepartures&&(a.maxDepartures=t.maxDepartures),this._transportationData=await o.fetchTransportationAsync(a,i),o.usesHassStateUpdates&&o.getHassStateKey&&(this.lastHassStateKey=o.getHassStateKey(a)),this._lastTransportationUpdate=new Date,this.logger.info(`Fetched transportation data from ${o.name}:`,this._transportationData)}catch(e){this.logger.warn("Error fetching transportation data:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}this.host.requestUpdate()}}async handleTransportationClick(){var e,t,o;this.logger.debug("Transportation button clicked, loading data on demand");const i=++this.activationRevision;this.setActive();try{const o=this.config.transportation;if(!o)throw new Error("Transportation is not configured");const i=ln(o.provider||"idsjmk");if(!i)throw new Error(`Transportation provider '${o.provider}' not found`);this.hass&&(null===(e=i.setHass)||void 0===e||e.call(i,this.hass)),await(null===(t=i.activateAsync)||void 0===t?void 0:t.call(i,o.providerConfig||{})),await this.fetchTransportationDataAsync()}catch(e){this.logger.warn("Error activating transportation provider:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}if(i===this.activationRevision&&this._isActive){if(this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(o=this.config.transportation)||void 0===o?void 0:o.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));let t=60*e*1e3;this._transportationData.error&&(t=1e4),this.logger.info(`Setting transportation auto-hide timeout to ${e} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.info(`Auto-hiding transportation departures after ${e} minutes`),this.dismissTransportation()},t)}this.host.requestUpdate()}}dismissTransportation(){this.activationRevision++,this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get isActive(){return this._isActive}get lastTransportationUpdate(){return this._lastTransportationUpdate}get isTransportationEnabled(){return void 0!==this.config.transportation&&!1!==this.config.transportation.enabled}setInactive(){this._isActive&&(this.logger.info("Transportation set to inactive, clearing timers and sending message to bottom bar to hide departures"),this._isActive=!1,ct.getInstance().setActive("transportation",!1),ot.getInstance().publish(new rt))}setActive(){this._isActive||(this.logger.info("Transportation set to active, sending message to bottom bar to show departures"),this._isActive=!0,ct.getInstance().setActive("transportation",!0),ot.getInstance().publish(new rt))}}function Os(e){var t;const o=new Map;for(const i of e){const e=String(null!==(t=i.groupId)&&void 0!==t?t:`${i.stopName}-${i.postId}`),a=o.get(e);a?a.departures.push(i):o.set(e,{id:e,stopName:i.stopName,departures:[i]})}return[...o.values()]}var Ns=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Fs=class extends de{constructor(){super(...arguments),this.open=!1,this.data={departures:[],loading:!1}}updated(e){var t;super.updated(e),e.has("open")&&(this.open&&this.dialog&&!this.dialog.open?this.dialog.showModal():!this.open&&(null===(t=this.dialog)||void 0===t?void 0:t.open)&&this.dialog.close())}isSoon(e){const t=String(e.timeMark).match(/-?\d+/);if(!t)return!1;const o=Number(t[0]);return o>=0&&o<=5}requestClose(){var e;null===(e=this.dialog)||void 0===e||e.close()}handleCancel(e){e.preventDefault(),this.requestClose()}handleBackdropClick(e){e.target===this.dialog&&this.requestClose()}handleClosed(){this.dispatchEvent(new CustomEvent("wcc-transportation-dialog-close",{bubbles:!0,composed:!0}))}renderBody(){return this.data.loading?U`
                <div class="status">
                    ${Je("runtime.loading_transportation",this.language||this.hass,"Loading transportation data…")}
                </div>
            `:this.data.error?U`<div class="status error">${this.data.error}</div>`:this.data.departures.length?U`
            <div class="stop-grid">
                ${Os(this.data.departures).map(e=>U`
                    <section class="stop-card">
                        <h3 class="stop-name">${e.stopName}</h3>
                        <div class="departure-list">
                            ${e.departures.map(e=>U`
                                <div class="departure-row ${this.isSoon(e)?"soon":""}">
                                    <div class="line">${e.lineName}</div>
                                    <div class="destination" title=${e.finalStop}>
                                        ${e.finalStop}
                                    </div>
                                    <div class="time">${e.timeMark}</div>
                                    ${e.isLowFloor?U`
                                        <div
                                                class="accessible"
                                                title=${Je("runtime.wheelchair_accessible",this.language||this.hass,"Wheelchair accessible")}>
                                            <ha-icon icon="mdi:wheelchair-accessibility"></ha-icon>
                                        </div>
                                    `:U`<span></span>`}
                                </div>
                            `)}
                        </div>
                    </section>
                `)}
            </div>
        `:U`
                <div class="status">
                    ${Je("runtime.no_departures",this.language||this.hass,"No departures available.")}
                </div>
            `}render(){const e=Je("runtime.transportation_title",this.language||this.hass,"Transit departures");return U`
            <dialog
                    aria-label=${e}
                    @cancel=${this.handleCancel}
                    @close=${this.handleClosed}
                    @click=${this.handleBackdropClick}>
                <header class="header">
                    <ha-icon icon="mdi:bus-clock"></ha-icon>
                    <h2 class="title">${e}</h2>
                    <button
                            class="close"
                            type="button"
                            aria-label=${Je("ui.close",this.language||this.hass,"Close")}
                            @click=${this.requestClose}>
                        <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                </header>
                <div class="body">${this.renderBody()}</div>
            </dialog>
        `}};Fs.styles=n`
        dialog {
            width: min(800px, calc(100vw - 32px));
            max-width: none;
            max-height: min(760px, calc(100vh - 32px));
            padding: 0;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
            border-radius: 22px;
            box-sizing: border-box;
            overflow: hidden;
            background: var(--card-background-color, #171a18);
            color: var(--primary-text-color, #f5f5f5);
            box-shadow: 0 22px 72px rgba(0, 0, 0, 0.64);
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.68);
            backdrop-filter: blur(3px);
        }

        .header {
            display: grid;
            grid-template-columns: 28px minmax(0, 1fr) 40px;
            gap: 10px;
            align-items: center;
            min-height: 72px;
            padding: 0 24px 0 30px;
            border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
        }

        .header ha-icon {
            --mdc-icon-size: 25px;
            color: #f0ae3d;
        }

        .title {
            margin: 0;
            color: var(--primary-text-color, #f5f5f5);
            font-size: 1.35rem;
            font-weight: 700;
            line-height: 1.25;
        }

        .close {
            display: grid;
            place-items: center;
            width: 36px;
            height: 36px;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.09);
            color: var(--primary-text-color, #f5f5f5);
            cursor: pointer;
        }

        .close:hover,
        .close:focus-visible {
            background: rgba(255, 255, 255, 0.16);
            outline: none;
        }

        .close ha-icon {
            --mdc-icon-size: 21px;
            color: inherit;
        }

        .body {
            max-height: calc(100vh - 106px);
            padding: 20px 30px 30px;
            box-sizing: border-box;
            overflow: auto;
        }

        .stop-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
        }

        .stop-card {
            min-width: 0;
            padding: 16px 18px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.11));
            border-radius: 15px;
            background: color-mix(
                in srgb,
                var(--card-background-color, #171a18) 90%,
                var(--primary-text-color, #fff) 10%
            );
        }

        .stop-name {
            margin: 0 0 12px;
            color: var(--primary-text-color, #f5f5f5);
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.3;
            overflow-wrap: anywhere;
        }

        .departure-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .departure-row {
            display: grid;
            grid-template-columns: 40px minmax(0, 1fr) auto 22px;
            gap: 12px;
            align-items: center;
            min-width: 0;
        }

        .line {
            display: grid;
            place-items: center;
            min-width: 40px;
            min-height: 28px;
            padding: 1px 6px;
            border-radius: 8px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.11);
            color: var(--primary-text-color, #f5f5f5);
            font-size: 0.95rem;
            font-weight: 750;
        }

        .departure-row.soon .line {
            background: #efb044;
            color: #202020;
        }

        .destination {
            min-width: 0;
            overflow: hidden;
            color: var(--primary-text-color, #f5f5f5);
            font-size: 0.92rem;
            line-height: 1.25;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .time {
            color: var(--primary-text-color, #f5f5f5);
            font-size: 1rem;
            font-weight: 750;
            white-space: nowrap;
        }

        .departure-row.soon .time {
            color: #efb044;
        }

        .accessible {
            display: grid;
            place-items: center;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            background: #2d82d8;
            color: #fff;
        }

        .accessible ha-icon {
            --mdc-icon-size: 15px;
        }

        .status {
            display: grid;
            place-items: center;
            min-height: 190px;
            padding: 24px;
            color: var(--secondary-text-color, #aaa);
            box-sizing: border-box;
            font-size: 1.05rem;
            text-align: center;
        }

        .status.error {
            color: var(--error-color, #f44336);
        }

        @media (max-width: 680px) {
            dialog {
                width: calc(100vw - 16px);
                max-height: calc(100vh - 16px);
                border-radius: 16px;
            }

            .header {
                min-height: 64px;
                padding: 0 14px 0 18px;
            }

            .body {
                padding: 14px;
            }

            .stop-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .stop-card {
                padding: 14px;
            }

            .departure-row {
                grid-template-columns: 38px minmax(0, 1fr) auto 20px;
                gap: 9px;
            }
        }
    `,Ns([me({type:Boolean})],Fs.prototype,"open",void 0),Ns([me({type:Object})],Fs.prototype,"data",void 0),Ns([me({type:String})],Fs.prototype,"language",void 0),Ns([me({type:Object})],Fs.prototype,"hass",void 0),Ns([ye("dialog")],Fs.prototype,"dialog",void 0),Fs=Ns([ue("wcc-transportation-dialog")],Fs);var Ms=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Rs=class extends Qi{get priority(){return 10}get isActive(){return this.controller.isActive}constructor(){super(),this.logger=ke("transportation-component"),this.closeTransportation=()=>{this.transportationController.dismissTransportation()},this.transportationController=new Ts(this,{transportation:this.transportation})}get controller(){return this.transportationController}updated(e){super.updated(e),e.has("transportation")&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation})),e.has("hass")&&this.hass&&this.transportationController.updateHass(this.hass)}render(){var e;if(!this.transportation||!1===this.transportation.enabled)return U``;const t=this.transportationController.transportationData,o=this.transportationController.transportationDataLoaded,i=null!==(e=this.transportation.displayMode)&&void 0!==e?e:"inline",a=this.controller.isActive;return"modal"===i?U`
                <wcc-transportation-dialog
                        .open=${a}
                        .data=${o?t:{...t,loading:!0}}
                        .language=${this.language}
                        .hass=${this.hass}
                        @wcc-transportation-dialog-close=${this.closeTransportation}>
                </wcc-transportation-dialog>
            `:a?U`
            ${o?U`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    ${this.renderTransportationContent(t)}
                                </div>`:U`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    <div class="transportation-loading">${Je("runtime.loading_transportation",this.language||this.hass,"Loading transportation data…")}</div>
                                </div>`}
        `:U``}renderTransportationContent(e){return e.loading?U`
                <div class="transportation-loading">${Je("runtime.loading_transportation",this.language||this.hass,"Loading transportation data…")}</div>`:e.error?U`
                <div class="transportation-error">${e.error}</div>`:e.departures&&0!==e.departures.length?U`
            <div class="transportation-departures">
                ${Os(e.departures).map(e=>U`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.fontColor};">
                                ${e.stopName}
                            </h3>
                            <div class="stop-departures">
                                ${e.departures.map(e=>U`
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
                                        ${e.isLowFloor?U`
                                            <div class="departure-lowfloor">♿</div>`:""}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `)}
            </div>
        `:U`
                <div class="transportation-loading">${Je("runtime.no_departures",this.language||this.hass,"No departures available.")}</div>`}};Rs.styles=n`
        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own content. */
        .transportation-container {
            width: 100%;
            box-sizing: border-box;
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
    `,Ms([me({type:Object})],Rs.prototype,"transportation",void 0),Ms([me({type:String})],Rs.prototype,"fontColor",void 0),Ms([me({type:String})],Rs.prototype,"language",void 0),Ms([me({type:Object})],Rs.prototype,"hass",void 0),Rs=Ms([ue("ha-transportation")],Rs);let js=class extends os{constructor(){super(...arguments),this.transportation=document.createElement("ha-transportation")}get isActive(){return this.transportation.isActive}activate(){this.transportation.activate()}deactivate(){this.transportation.deactivate()}applyWidgetState(){var e;this.appliedConfig!==this.config&&(this.transportation.transportation=function(e){const{type:t,id:o,priority:i,style:a,visibility:n,...r}=e;return r}(this.config),this.appliedConfig=this.config),this.transportation.fontColor!==this.fontColor&&(this.transportation.fontColor=this.fontColor);const t=Qr(null===(e=this.appearance)||void 0===e?void 0:e.language,this.hass);this.transportation.language!==t&&(this.transportation.language=t),this.hass&&this.transportation.hass!==this.hass&&(this.transportation.hass=this.hass)}render(){return U`${this.transportation}`}};js.styles=n`
        :host {
            display: block;
            width: 100%;
        }
    `,js=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("wcc-transportation-widget")],js);let Ls=class extends os{constructor(){super(...arguments),this.actionBar=document.createElement("ha-action-bar")}get isActive(){return this.actionBar.isActive}activate(){this.actionBar.activate()}deactivate(){this.actionBar.deactivate()}applyWidgetState(){var e,t,o,i,a,n;this.appliedConfig===this.config&&this.appliedZoneId===this.zoneId&&this.appliedZoneAlignment===this.zoneAlignment&&this.appliedZoneDirection===this.zoneDirection||(this.actionBar.config={enabled:null===(e=this.config.enabled)||void 0===e||e,actions:null!==(t=this.config.actions)&&void 0!==t?t:[],alignment:cr(this.config.alignment,this.zoneId,this.zoneAlignment),orientation:lr(this.config.orientation,this.zoneId),columns:(a=this.config.columns,n=this.zoneDirection,null!=a?a:"row"===n?2:void 0),backgroundOpacity:this.config.backgroundOpacity,showButtonBackground:this.config.showButtonBackground,buttonGap:this.config.buttonGap,padding:this.config.padding,titleSize:this.config.titleSize},this.actionBar.iconSize=this.config.iconSize,this.appliedConfig=this.config,this.appliedZoneId=this.zoneId,this.appliedZoneAlignment=this.zoneAlignment,this.appliedZoneDirection=this.zoneDirection),this.actionBar.fontColor!==this.fontColor&&(this.actionBar.fontColor=this.fontColor);const r=this.config.iconSize?ut.Custom:null!==(i=null===(o=this.appearance)||void 0===o?void 0:o.size)&&void 0!==i?i:ut.Medium;this.actionBar.size!==r&&(this.actionBar.size=r),this.hass&&this.actionBar.hass!==this.hass&&(this.actionBar.hass=this.hass)}render(){return U`${this.actionBar}`}};Ls.styles=n`
        :host {
            display: block;
            width: 100%;
        }
    `,Ls=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("wcc-action-bar-widget")],Ls);class Hs extends tt{constructor(e){super(e,"calendar-controller"),this.config={},this.connected=!1,this.configSignature="",this.requestSequence=0,this._events=[],this._loading=!1}get events(){return this._events}get loading(){return this._loading}get error(){return this._error}onHostConnected(){this.connected=!0,this.setupInterval(),this.fetchEvents()}onHostDisconnected(){this.connected=!1,this.requestSequence+=1,this.clearInterval()}updateConfig(e,t){var o,i,a;const n=!this.hass&&Boolean(t);this.hass=t,this.config=e;const r=JSON.stringify({entities:null!==(o=e.entities)&&void 0!==o?o:[],daysAhead:null!==(i=e.daysAhead)&&void 0!==i?i:7,updateInterval:null!==(a=e.updateInterval)&&void 0!==a?a:300,timeZone:e.timeZone,requestWindow:e.requestWindow});(r!==this.configSignature||n)&&(r!==this.configSignature&&(e.requestWindow&&(this._events=[]),this.configSignature=r,this.setupInterval()),this.connected&&this.fetchEvents())}async refresh(){await this.fetchEvents()}setupInterval(){if(this.clearInterval(),!this.connected)return;const e=Math.max(60,Number(this.config.updateInterval)||300);this.intervalId=window.setInterval(()=>{this.fetchEvents()},1e3*e)}clearInterval(){void 0!==this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}async fetchEvents(){var e,t,o;const i=++this.requestSequence,a=this.config.timeZone,n=this.hass,r=(null!==(e=this.config.entities)&&void 0!==e?e:[]).filter(e=>Boolean(e.entity)).map(e=>{var t,o,i;return{...e,label:(null===(t=e.label)||void 0===t?void 0:t.trim())||String(null!==(i=null===(o=null==n?void 0:n.states[e.entity])||void 0===o?void 0:o.attributes.friendly_name)&&void 0!==i?i:e.entity)}});if(!n||0===r.length)return this._events=[],this._loading=!1,this._error=void 0,this.host.requestUpdate(),void ot.getInstance().publish(new rt);this._loading=!0,this._error=void 0,this.host.requestUpdate(),ot.getInstance().publish(new rt);const s=null!==(t=this.config.requestWindow)&&void 0!==t?t:function(e,t){const o=Fr(t,7,1,31);return{start:new Date(e.getTime()-864e5).toISOString(),end:new Date(e.getTime()+24*(o+1)*60*60*1e3).toISOString()}}(new Date,null!==(o=this.config.daysAhead)&&void 0!==o?o:7),l=`start=${encodeURIComponent(s.start)}&end=${encodeURIComponent(s.end)}`,c=await Promise.all(r.map(async e=>{try{return{source:e,events:await n.callApi("GET",`calendars/${encodeURIComponent(e.entity)}?${l}`)}}catch(t){return{source:e,error:t}}}));if(i!==this.requestSequence||!this.connected)return;const d=c.filter(e=>void 0!==e.events);d.length>0&&(this._events=d.flatMap(e=>{var t;return(null!==(t=e.events)&&void 0!==t?t:[]).map(t=>function(e,t,o){var i,a,n,r;const s=jr(e.start),l=jr(e.end);if(!s||!l)return;const c=Boolean(e.start.date&&!e.start.dateTime),d=c&&e.start.date?e.start.date:Mr(s,o),h=c&&e.end.date?e.end.date:Mr(l,o);return{entity:t.entity,sourceLabel:(null===(i=t.label)||void 0===i?void 0:i.trim())||t.entity,color:t.color||"#4fc3f7",summary:(null===(a=e.summary)||void 0===a?void 0:a.trim())||"Untitled event",description:(null===(n=e.description)||void 0===n?void 0:n.trim())||void 0,location:(null===(r=e.location)||void 0===r?void 0:r.trim())||void 0,start:s,end:l,allDay:c,startDayKey:d,endDayKey:h}}(t,e.source,a)).filter(e=>void 0!==e)}));const h=c.filter(e=>void 0!==e.error);this._error=h.length>0?`${h.length} of ${c.length} calendars could not be loaded.`:void 0,this._loading=!1,this.host.requestUpdate(),ot.getInstance().publish(new rt)}}var Bs=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Ws=class extends de{constructor(){super(...arguments),this.open=!1,this.language="en",this.hour12=!1}updated(e){var t;super.updated(e),(e.has("open")||e.has("event"))&&(this.open&&this.event&&this.dialog&&!this.dialog.open?this.dialog.showModal():this.open&&this.event||!(null===(t=this.dialog)||void 0===t?void 0:t.open)||this.dialog.close())}formatDate(e){return new Intl.DateTimeFormat(this.language,{weekday:"long",year:"numeric",month:"long",day:"numeric",timeZone:this.timeZone}).format(e)}formatTime(e){return new Intl.DateTimeFormat(this.language,{hour:"numeric",minute:"2-digit",hour12:this.hour12,timeZone:this.timeZone}).format(e)}formatDayKey(e){const[t,o,i]=e.split("-").map(Number);return new Intl.DateTimeFormat(this.language,{weekday:"long",year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(t,o-1,i,12)))}dateTimeText(e){if(e.allDay){const t=this.formatDayKey(e.startDayKey),o=this.formatDayKey(Rr(e.endDayKey,-1)),i=Je("editor.calendar.all_day",this.language,"All day");return t===o?`${t} · ${i}`:`${t} – ${o} · ${i}`}const t=this.formatDate(e.start),o=this.formatDate(e.end);return t===o?`${t} · ${this.formatTime(e.start)} – ${this.formatTime(e.end)}`:`${t}, ${this.formatTime(e.start)} – ${o}, ${this.formatTime(e.end)}`}requestClose(){var e;null===(e=this.dialog)||void 0===e||e.close()}handleCancel(e){e.preventDefault(),this.requestClose()}handleBackdropClick(e){e.target===this.dialog&&this.requestClose()}handleClosed(){this.dispatchEvent(new CustomEvent("wcc-calendar-dialog-close",{bubbles:!0,composed:!0}))}render(){var e,t;const o=this.event;return U`
            <dialog
                    style=${`--event-color:${null!==(e=null==o?void 0:o.color)&&void 0!==e?e:"#4fc3f7"}`}
                    aria-label=${null!==(t=null==o?void 0:o.summary)&&void 0!==t?t:Je("editor.calendar.event",this.language,"Calendar event")}
                    @cancel=${this.handleCancel}
                    @close=${this.handleClosed}
                    @click=${this.handleBackdropClick}>
                ${o?U`
                    <div class="header">
                        <span class="accent"></span>
                        <h2 class="title">${o.summary}</h2>
                        <button class="close" type="button" aria-label=${Je("ui.close",this.language,"Close")} @click=${this.requestClose}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    <div class="body">
                        <div class="detail">
                            <ha-icon icon="mdi:clock-outline"></ha-icon>
                            <div class="detail-content">
                                <div class="label">${Je("editor.calendar.when",this.language,"When")}</div>
                                ${this.dateTimeText(o)}
                            </div>
                        </div>
                        <div class="detail">
                            <ha-icon icon="mdi:calendar-outline"></ha-icon>
                            <div class="detail-content">
                                <div class="label">${Je("editor.calendar.calendar_name",this.language,"Calendar")}</div>
                                ${o.sourceLabel}
                            </div>
                        </div>
                        ${o.location?U`
                            <div class="detail">
                                <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                                <div class="detail-content">
                                    <div class="label">${Je("editor.calendar.location",this.language,"Location")}</div>
                                    ${o.location}
                                </div>
                            </div>
                        `:""}
                        ${o.description?U`
                            <div class="description detail-content">
                                <div class="label">${Je("editor.calendar.description",this.language,"Description")}</div>
                                ${o.description}
                            </div>
                        `:""}
                    </div>
                `:""}
            </dialog>
        `}};Ws.styles=n`
        dialog {
            width: min(520px, calc(100vw - 32px));
            max-width: none;
            max-height: min(720px, calc(100vh - 32px));
            padding: 0;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.2));
            border-radius: 18px;
            box-sizing: border-box;
            overflow: hidden;
            background: var(--card-background-color, #1c1c1c);
            color: var(--primary-text-color, #fff);
            box-shadow: 0 18px 60px rgba(0, 0, 0, 0.58);
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.62);
            backdrop-filter: blur(2px);
        }

        .header {
            display: grid;
            grid-template-columns: 5px minmax(0, 1fr) 42px;
            align-items: stretch;
            min-height: 62px;
            border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.14));
        }

        .accent {
            background: var(--event-color, var(--primary-color, #03a9f4));
        }

        .title {
            align-self: center;
            min-width: 0;
            margin: 0;
            padding: 13px 14px;
            overflow-wrap: anywhere;
            color: var(--event-color, var(--primary-text-color, #fff));
            font-size: 1.18rem;
            font-weight: 650;
            line-height: 1.3;
        }

        .close {
            display: grid;
            place-items: center;
            align-self: center;
            width: 36px;
            height: 36px;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: transparent;
            color: var(--secondary-text-color, #aaa);
            cursor: pointer;
        }

        .close:hover,
        .close:focus-visible {
            background: rgba(127, 127, 127, 0.18);
            color: var(--primary-text-color, #fff);
            outline: none;
        }

        .body {
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-height: calc(100vh - 126px);
            padding: 18px 20px 22px;
            box-sizing: border-box;
            overflow: auto;
        }

        .detail {
            display: grid;
            grid-template-columns: 24px minmax(0, 1fr);
            gap: 10px;
            align-items: start;
            min-width: 0;
        }

        .detail ha-icon {
            --mdc-icon-size: 21px;
            margin-top: 1px;
            color: var(--event-color, var(--primary-color, #03a9f4));
        }

        .detail-content {
            min-width: 0;
            line-height: 1.45;
            overflow-wrap: anywhere;
        }

        .label {
            margin-bottom: 2px;
            color: var(--secondary-text-color, #aaa);
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }

        .description {
            padding-top: 14px;
            border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.14));
            white-space: pre-wrap;
        }

        @media (max-width: 520px) {
            dialog {
                width: calc(100vw - 16px);
                max-height: calc(100vh - 16px);
                border-radius: 14px;
            }

            .body {
                padding: 16px;
            }
        }
    `,Bs([me({type:Object})],Ws.prototype,"event",void 0),Bs([me({type:Boolean})],Ws.prototype,"open",void 0),Bs([me({type:String})],Ws.prototype,"language",void 0),Bs([me({type:String})],Ws.prototype,"timeZone",void 0),Bs([me({type:Boolean})],Ws.prototype,"hour12",void 0),Bs([ye("dialog")],Ws.prototype,"dialog",void 0),Ws=Bs([ue("wcc-calendar-event-dialog")],Ws);var Us=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Vs=class extends de{constructor(){super(...arguments),this.config={},this.fontColor="#fff",this.language="en",this.hour12=!1,this.controller=new Hs(this)}get isActive(){return!this.config.hideWhenEmpty||this.controller.loading||this.agenda.visibleCount>0}get agenda(){return function(e,t={}){var o;const i=null!==(o=t.now)&&void 0!==o?o:new Date,a=Mr(i,t.timeZone),n="today"===t.displayMode?1:Fr(t.daysAhead,7,1,31),r=Rr(a,n-1),s=Fr(t.maxEvents,8,1,100),l=!1!==t.showAllDay,c=!1!==t.hidePastTodayEvents,d=e=>e.startDayKey<a?a:e.startDayKey,h=e.filter(e=>l||!e.allDay).filter(e=>{const t=d(e);return!(t<a||t>r||c&&t===a&&!e.allDay&&e.end.getTime()<=i.getTime()||e.allDay&&e.endDayKey<=a)}).sort((e,t)=>{const o=d(e).localeCompare(d(t));return 0!==o?o:Lr(e,t)}),u=h.slice(0,s),p=new Map;return u.forEach(e=>{var t;const o=d(e),i=null!==(t=p.get(o))&&void 0!==t?t:[];i.push(e),p.set(o,i)}),{groups:Array.from(p.entries()).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>({dayKey:e,events:t.sort(Lr)})),visibleCount:u.length,hiddenCount:Math.max(0,h.length-u.length)}}(this.controller.events,{timeZone:this.timeZone,daysAhead:this.config.daysAhead,maxEvents:this.config.maxEvents,displayMode:this.config.displayMode,showAllDay:this.config.showAllDay,hidePastTodayEvents:this.config.hidePastTodayEvents})}updated(e){var t;if(super.updated(e),(e.has("config")||e.has("hass")||e.has("timeZone"))&&this.controller.updateConfig({...this.config,timeZone:this.timeZone},this.hass),e.has("fontColor")&&this.style.setProperty("--wcc-calendar-color",this.fontColor),e.has("config")){const e=null===(t=this.config.eventBackgroundColor)||void 0===t?void 0:t.trim();e&&/^#[0-9a-fA-F]{6}$/.test(e)?this.style.setProperty("--wcc-calendar-event-background",e):this.style.removeProperty("--wcc-calendar-event-background");const o=Number(this.config.eventBackgroundOpacity),i=Number.isFinite(o)?Math.min(1,Math.max(0,o)):.76;this.style.setProperty("--wcc-calendar-event-opacity",`${Math.round(100*i)}%`),[["--wcc-calendar-date-size",this.config.calendarDateSize],["--wcc-calendar-title-size",this.config.eventTitleSize],["--wcc-calendar-detail-size",this.config.eventDetailSize]].forEach(([e,t])=>{(null==t?void 0:t.trim())?this.style.setProperty(e,t.trim()):this.style.removeProperty(e)})}}dayLabel(e){const t=Mr(new Date,this.timeZone),o=e===t?0:e===Rr(t,1)?1:void 0;if(void 0!==o)try{const e=new Intl.RelativeTimeFormat(this.language,{numeric:"auto"}).format(o,"day");return e.charAt(0).toUpperCase()+e.slice(1)}catch(e){return 0===o?Je("forecast.today",this.language,"Today"):Je("forecast.tomorrow",this.language,"Tomorrow")}const[i,a,n]=e.split("-").map(Number);return new Intl.DateTimeFormat(this.language,{weekday:"long",month:"long",day:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(i,a-1,n,12)))}dayParts(e){const[t,o,i]=e.split("-").map(Number),a=new Date(Date.UTC(t,o-1,i,12)),n=e=>new Intl.DateTimeFormat(this.language,{...e,timeZone:"UTC"}).format(a).replace(".","");return{weekday:n({weekday:"short"}),day:String(i).padStart(2,"0"),month:n({month:"short"})}}eventTime(e){if(e.allDay){const t=Je("editor.calendar.all_day",this.language,"All day"),o=Rr(e.endDayKey,-1);if(o===e.startDayKey)return t;const i=e.startDayKey.slice(0,4)!==o.slice(0,4);return`${this.formatShortDayKey(e.startDayKey,i)} – ${this.formatShortDayKey(o,i)} · ${t}`}const t=new Intl.DateTimeFormat(this.language,{hour:"numeric",minute:"2-digit",hour12:this.hour12,timeZone:this.timeZone});if(e.startDayKey===e.endDayKey)return`${t.format(e.start)} – ${t.format(e.end)}`;const o=e.startDayKey.slice(0,4)!==e.endDayKey.slice(0,4),i=new Intl.DateTimeFormat(this.language,{day:"numeric",month:"numeric",year:o?"numeric":void 0,timeZone:this.timeZone});return`${i.format(e.start)} ${t.format(e.start)} – ${i.format(e.end)} ${t.format(e.end)}`}formatShortDayKey(e,t){const[o,i,a]=e.split("-").map(Number);return new Intl.DateTimeFormat(this.language,{day:"numeric",month:"numeric",year:t?"numeric":void 0,timeZone:"UTC"}).format(new Date(Date.UTC(o,i-1,a,12)))}eventSpansMultipleDays(e){const t=e.allDay?Rr(e.endDayKey,-1):e.endDayKey;return e.startDayKey!==t}openEvent(e){this.selectedEvent=e}renderEvent(e){return U`
            <button
                    class="event"
                    style=${`--event-color:${e.color}`}
                    type="button"
                    @click=${()=>this.openEvent(e)}>
                <span class="event-body">
                    <span class="event-summary">${e.summary}</span>
                    <span class="event-detail">
                        <ha-icon icon=${this.eventSpansMultipleDays(e)?"mdi:calendar-range":"mdi:clock-outline"}></ha-icon>
                        <span class="event-detail-text">${this.eventTime(e)}</span>
                    </span>
                    ${!1!==this.config.showLocation&&e.location?U`
                        <span class="event-detail">
                            <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                            <span class="event-detail-text">${e.location}</span>
                        </span>
                    `:""}
                    ${this.config.showDescription&&e.description?U`<span class="event-description">${e.description}</span>`:""}
                </span>
            </button>
        `}render(){const e=this.agenda;return this.controller.loading&&0===this.controller.events.length?U`<div class="status loading">${Je("editor.calendar.loading",this.language,"Loading calendar…")}</div>`:0===e.visibleCount&&this.config.hideWhenEmpty?U``:U`
            <div class="agenda">
                ${e.groups.map(e=>{const t=this.dayParts(e.dayKey);return U`
                    <section class="day-group">
                        <div class="day-date" title=${this.dayLabel(e.dayKey)}>
                            <span class="day-weekday">${t.weekday}</span>
                            <span class="day-number">${t.day}</span>
                            <span class="day-month">${t.month}</span>
                        </div>
                        <div class="events">${e.events.map(e=>this.renderEvent(e))}</div>
                    </section>
                `})}
                ${0===e.visibleCount?U`<div class="status">${Je("editor.calendar.no_events",this.language,"No upcoming events.")}</div>`:""}
                ${this.controller.error?U`<div class="status error">${this.controller.error}</div>`:""}
            </div>
            <wcc-calendar-event-dialog
                    .event=${this.selectedEvent}
                    .open=${void 0!==this.selectedEvent}
                    .language=${this.language}
                    .timeZone=${this.timeZone}
                    .hour12=${this.hour12}
                    @wcc-calendar-dialog-close=${()=>{this.selectedEvent=void 0}}>
            </wcc-calendar-event-dialog>
        `}};Vs.styles=n`
        :host {
            display: block;
            width: 100%;
            min-width: 0;
            color: var(--wcc-calendar-color, #fff);
        }

        .agenda {
            display: grid;
            grid-template-columns: 50px fit-content(30rem);
            column-gap: 6px;
            row-gap: 14px;
            width: 100%;
            min-width: 0;
            padding: 14px 0;
            box-sizing: border-box;
        }

        .day-group {
            display: contents;
        }

        .day-date {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: start;
            width: 100%;
            padding-top: 3px;
            color: currentColor;
            font-size: var(--wcc-calendar-date-size, 1em);
            line-height: 1;
            text-align: center;
            text-transform: uppercase;
        }

        .day-weekday {
            font-size: 0.78em;
            font-weight: 700;
            opacity: 0.86;
        }

        .day-number {
            margin: 2px 0 1px;
            font-size: 2em;
            font-weight: 450;
            letter-spacing: -0.04em;
        }

        .day-month {
            font-size: 0.69em;
            font-weight: 700;
            letter-spacing: 0.04em;
            opacity: 0.78;
        }

        .events {
            display: flex;
            flex-direction: column;
            gap: 7px;
            width: 100%;
            min-width: 0;
            max-width: 100%;
        }

        .event {
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            padding: 8px 10px 8px 12px;
            border: 0;
            border-left: 3px solid var(--event-color);
            border-radius: 0 8px 8px 0;
            box-sizing: border-box;
            background: color-mix(
                in srgb,
                var(--wcc-calendar-event-background, var(--card-background-color, #202020))
                var(--wcc-calendar-event-opacity, 76%),
                transparent
            );
            color: inherit;
            font: inherit;
            text-align: left;
            cursor: pointer;
            overflow: hidden;
        }

        .event-body {
            display: block;
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
        }

        .event-summary {
            display: block;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            color: var(--event-color);
            font-size: var(--wcc-calendar-title-size, 1em);
            font-weight: 650;
            line-height: 1.35;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .event-detail,
        .event-description {
            display: flex;
            align-items: center;
            gap: 5px;
            min-width: 0;
            margin-top: 3px;
            color: var(--wcc-calendar-color, #fff);
            font-size: var(--wcc-calendar-detail-size, 0.82em);
            font-weight: 400;
            line-height: 1.35;
            opacity: 0.76;
        }

        .event-detail ha-icon {
            --mdc-icon-size: 15px;
            flex: 0 0 auto;
        }

        .event-detail-text {
            display: block;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .event-description {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        .status {
            grid-column: 1 / -1;
            padding: 10px 12px;
            border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
            border-radius: 7px;
            background: color-mix(in srgb, var(--card-background-color, #111) 65%, transparent);
            color: currentColor;
            font-size: 0.82em;
            opacity: 0.78;
        }

        .error {
            border-color: color-mix(in srgb, var(--error-color, #db4437) 55%, transparent);
        }

        .loading {
            padding-inline: 0;
            border: 0;
            background: transparent;
        }

        @media (max-width: 520px) {
            .agenda {
                grid-template-columns: 46px fit-content(30rem);
                column-gap: 5px;
                padding: 12px 0;
            }
        }
    `,Us([me({type:Object})],Vs.prototype,"hass",void 0),Us([me({type:Object})],Vs.prototype,"config",void 0),Us([me({type:String})],Vs.prototype,"fontColor",void 0),Us([me({type:String})],Vs.prototype,"language",void 0),Us([me({type:String})],Vs.prototype,"timeZone",void 0),Us([me({type:Boolean})],Vs.prototype,"hour12",void 0),Us([ve()],Vs.prototype,"selectedEvent",void 0),Vs=Us([ue("wcc-calendar-agenda")],Vs);let Zs=class extends os{constructor(){super(...arguments),this.calendar=document.createElement("wcc-calendar-agenda")}get isActive(){return this.calendar.isActive}applyWidgetState(){var e,t,o,i,a;this.calendar.config=this.config,this.calendar.fontColor=this.fontColor,this.calendar.language=Qr(null===(e=this.appearance)||void 0===e?void 0:e.language,this.hass),this.calendar.timeZone=null!==(o=null===(t=this.appearance)||void 0===t?void 0:t.timeZone)&&void 0!==o?o:null===(a=null===(i=this.hass)||void 0===i?void 0:i.config)||void 0===a?void 0:a.time_zone,this.calendar.hour12=es(void 0,this.hass),this.hass&&(this.calendar.hass=this.hass)}render(){return U`${this.calendar}`}};Zs.styles=n`
        :host {
            display: block;
            width: fit-content;
            max-width: 100%;
            min-width: 0;
        }
    `,Zs=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("wcc-calendar-widget")],Zs);var qs=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Ks=class extends os{constructor(){super(...arguments),this.controller=new Hs(this),this.displayedMonth=""}get language(){var e;return Qr(null===(e=this.appearance)||void 0===e?void 0:e.language,this.hass)}get timeZone(){var e,t,o,i;return null!==(t=null===(e=this.appearance)||void 0===e?void 0:e.timeZone)&&void 0!==t?t:null===(i=null===(o=this.hass)||void 0===o?void 0:o.config)||void 0===i?void 0:i.time_zone}get month(){return this.displayedMonth||Mr(new Date,this.timeZone).slice(0,7)}get rolling(){var e;return"four-weeks"===(null===(e=this.config)||void 0===e?void 0:e.viewMode)}get days(){var e;const t=function(e,t){var o,i;if(Number.isInteger(t)&&t>=0&&t<=6)return t;try{const t=new Intl.Locale(e),a=null!==(i=null===(o=t.getWeekInfo)||void 0===o?void 0:o.call(t))&&void 0!==i?i:t.weekInfo;if(a)return a.firstDay%7;const n=t.maximize().region;return["US","CA","JP","PH","TW","TH","MX","BR","IL"].includes(n)?0:1}catch(e){return 1}}(this.language,null===(e=this.config)||void 0===e?void 0:e.firstDayOfWeek);return this.rolling?function(e,t,o){const i=Mr(e,o),a=Rr(i,-(new Date(`${i}T12:00:00Z`).getUTCDay()-t+7)%7);return Array.from({length:28},(e,t)=>Rr(a,t))}(new Date,t,this.timeZone):function(e,t){const o=`${e}-01`,i=Rr(o,-(new Date(`${o}T12:00:00Z`).getUTCDay()-t+7)%7),a=Rr(`${Br(e,1)}-01`,-1),n=[];for(let e=i;e<=a||n.length%7!=0;e=Rr(e,1))n.push(e);return n}(this.month,t)}t(e,t){return Je("month."+e,this.language,t)}connectedCallback(){super.connectedCallback(),this.clockTimer=window.setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){window.clearInterval(this.clockTimer),super.disconnectedCallback()}applyWidgetState(){this.syncController()}syncController(){var e;this.config&&this.controller.updateConfig({...this.config,timeZone:this.timeZone,requestWindow:(e=this.days,{start:`${Rr(e[0],-1)}T00:00:00Z`,end:`${Rr(e[e.length-1],2)}T00:00:00Z`})},this.hass)}updated(e){var t,o,i;super.updated(e),this.syncController(),this.selectedDay&&!(null===(t=this.dayDialog)||void 0===t?void 0:t.open)&&(null===(o=this.dayDialog)||void 0===o||o.showModal()),!this.selectedDay&&(null===(i=this.dayDialog)||void 0===i?void 0:i.open)&&this.dayDialog.close()}navigate(e){this.selectedDay=void 0,this.selectedEvent=void 0,this.displayedMonth=Br(this.month,e)}dateLabel(e,t){return new Intl.DateTimeFormat(this.language,{...t,timeZone:"UTC"}).format(new Date(e+"T12:00:00Z"))}eventLabel(e,t){return e.allDay?e.summary:(e.startDayKey<t?"↳":new Intl.DateTimeFormat(this.language,{hour:"numeric",minute:"2-digit",timeZone:this.timeZone,hour12:es(void 0,this.hass)}).format(e.start))+" "+e.summary}renderEvent(e,t,o){const i=!0===this.config.grayOutPastEvents&&function(e,t,o){return e.allDay?e.endDayKey<=Mr(t,o):e.end.getTime()<=t.getTime()}(e,o,this.timeZone);return U`<button class="event ${i?"past":""}" style=${"--event-color:"+e.color} title=${e.summary}
            @click=${()=>{this.selectedDay=void 0,this.selectedEvent=e}}><span class="event-text">${this.eventLabel(e,t)}</span></button>`}render(){var e;if(!this.config)return U``;const t=this.days,o=new Date,i=Mr(o,this.timeZone),a=Math.max(1,Math.min(10,Math.trunc(Number(this.config.eventsPerDay)||3))),n=Math.max(70,Math.min(400,Number(this.config.cellMinHeight)||110)),r=Math.max(0,Math.min(1,null!==(e=this.config.eventBackgroundOpacity)&&void 0!==e?e:.2)),s=Hr(this.config.backgroundOpacity),l=e=>function(e,t,o,i=!0){return e.filter(e=>{if(!i&&e.allDay)return!1;const a=e.allDay?Rr(e.endDayKey,-1):Mr(new Date(Math.max(e.start.getTime(),e.end.getTime()-1)),o);return e.startDayKey<=t&&a>=t}).sort((e,t)=>Number(t.allDay)-Number(e.allDay)||e.start.getTime()-t.start.getTime()||e.summary.localeCompare(t.summary))}(this.controller.events,e,this.timeZone,!1!==this.config.showAllDay),c=!1!==this.config.showTitle,d=!this.rolling&&!1!==this.config.showNavigation,h=this.rolling?this.dateLabel(t[0],{day:"numeric",month:"short",year:"numeric"})+" – "+this.dateLabel(t[27],{day:"numeric",month:"short",year:"numeric"}):this.dateLabel(this.month+"-01",{month:"long",year:"numeric"});return U`<section class="month ${!0===this.config.wrapEventTitles?"wrap-events":""} ${!1===this.config.showGridLines?"no-grid-lines":""}" style=${"--month-color:"+this.fontColor+";--calendar-background-opacity:"+s+";--cell-height:"+n+"px;--grid-color:"+(this.config.gridColor||"#88888866")+";--event-size:"+(this.config.eventTitleSize||".8em")+";--date-size:"+(this.config.calendarDateSize||"1em")+";--event-opacity:"+100*r+"%;"}>
            ${c||d?U`<header>
                ${c?U`<h2>${h}</h2>`:""}
                ${d?U`
                <button aria-label=${this.t("previous","Previous month")} @click=${()=>this.navigate(-1)}>‹</button>
                <button @click=${()=>{this.displayedMonth="",this.selectedDay=void 0,this.selectedEvent=void 0}}>${this.t("today","Today")}</button>
                <button aria-label=${this.t("next","Next month")} @click=${()=>this.navigate(1)}>›</button>
                `:""}
            </header>`:""}
            ${this.controller.loading?U`<div class="status" role="status">${this.t("loading","Loading calendar…")}</div>`:""}
            ${this.controller.error?U`<div class="status" role="status">${this.t("error","Some calendars could not be loaded.")}</div>`:""}
            <div class="scroll"><div class="grid">
                ${t.slice(0,7).map(e=>U`<div class="weekday">${this.dateLabel(e,{weekday:"short"})}</div>`)}
                ${t.map(e=>{const n=l(e);return U`<div class="day ${e===i?"today":""} ${this.rolling||e.startsWith(this.month)?"":"outside"}" data-date=${e}>
                    <span class="number" aria-current=${e===i?"date":"false"}>${Number(e.slice(-2))}</span>
                    ${this.rolling&&(e===t[0]||e.endsWith("-01"))?U`<span class="month-label">${this.dateLabel(e,{month:"short"})}</span>`:""}
                    ${n.slice(0,a).map(t=>this.renderEvent(t,e,o))}
                    ${n.length>a?U`<button class="more" @click=${()=>{this.selectedDay=e}}>+${n.length-a} ${this.t("more","more")}</button>`:""}
                </div>`})}
            </div></div>
        </section>
        <dialog @close=${()=>{this.selectedDay=void 0}} @cancel=${()=>{this.selectedDay=void 0}}>
            <button class="close" aria-label=${this.t("close","Close")} @click=${()=>{this.selectedDay=void 0}}>×</button>
            <h3>${this.selectedDay?this.dateLabel(this.selectedDay,{weekday:"long",day:"numeric",month:"long"}):""}</h3>
            <div class="day-events">${this.selectedDay?l(this.selectedDay).map(e=>this.renderEvent(e,this.selectedDay,o)):""}</div>
        </dialog>
        <wcc-calendar-event-dialog .event=${this.selectedEvent} .open=${!!this.selectedEvent} .language=${this.language} .timeZone=${this.timeZone}
            .hour12=${es(void 0,this.hass)} @wcc-calendar-dialog-close=${()=>{this.selectedEvent=void 0}}></wcc-calendar-event-dialog>`}};Ks.styles=n`
        :host {display:block;width:100%;min-width:0;}
        .month {color:var(--month-color);width:100%;background:rgba(18,20,24,var(--wcc-calendar-local-background-opacity,var(--calendar-background-opacity,0)));}
        header {display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-bottom:12px;}
        h2 {font-size:1.35em;margin:0;flex:1;font-weight:500;}
        button {font:inherit;color:inherit;cursor:pointer;}
        header button {background:transparent;border:1px solid currentColor;border-radius:6px;min-height:32px;padding:3px 10px;}
        button:focus-visible {outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px;}
        .scroll {overflow-x:auto;}
        .grid {display:grid;grid-template-columns:repeat(7,minmax(0,1fr));min-width:490px;}
        .weekday {text-align:center;padding:8px 2px;font-size:.85em;border-bottom:1px solid var(--grid-color);}
        .day {min-width:0;min-height:var(--cell-height,110px);padding:5px;box-sizing:border-box;border-bottom:1px solid var(--grid-color);border-right:1px solid var(--grid-color);}
        .day:nth-child(7n + 1) {border-left:1px solid var(--grid-color);}
        .no-grid-lines .weekday, .no-grid-lines .day {border-color:transparent;}
        .outside .number {opacity:.45;}
        .number {display:inline-grid;place-items:center;min-width:1.7em;height:1.7em;font-size:var(--date-size,1em);margin-bottom:4px;border-radius:50%;}
        .today .number {background:var(--primary-color,#1976d2);color:var(--text-primary-color,#fff);}
        .event {display:block;width:100%;text-align:left;font-size:var(--event-size,.8em);line-height:1.35;padding:3px 4px;margin:2px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:0;border-left:3px solid var(--event-color);border-radius:3px;background:color-mix(in srgb,var(--event-color) var(--event-opacity,20%),transparent);}
        .more {font-size:.75em;border:0;background:transparent;padding:4px;}
        .event.past {filter:grayscale(1);color:#888;}
        .event-text {display:block;overflow:hidden;text-overflow:ellipsis;}
        .wrap-events .event-text {display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:normal;overflow-wrap:anywhere;}
        .status {font-size:.8em;padding:6px 0;}
        dialog {box-sizing:border-box;width:min(580px,calc(100vw - 32px));max-height:80vh;overflow:auto;border:1px solid var(--divider-color,#888);border-radius:12px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#212121);padding:24px;font-size:max(16px,1em);}
        dialog::backdrop {background:#0008;}
        dialog h3 {margin:0 48px 24px 0;min-height:40px;display:flex;align-items:center;font-size:1.15em;}
        dialog .day-events {display:grid;gap:8px;clear:both;}
        dialog .event {box-sizing:border-box;min-height:44px;margin:0;padding:11px 14px;font-size:1em;line-height:1.5;white-space:normal;border-radius:6px;}
        dialog .event-text {overflow-wrap:anywhere;}
        dialog .close {float:right;background:transparent;border:0;min-width:40px;min-height:40px;}
    `,qs([ve()],Ks.prototype,"displayedMonth",void 0),qs([ve()],Ks.prototype,"selectedDay",void 0),qs([ve()],Ks.prototype,"selectedEvent",void 0),qs([ye("dialog")],Ks.prototype,"dayDialog",void 0),Ks=qs([ue("wcc-calendar-month")],Ks);let Gs=class extends Rt{render(){var e,t,o,i,a;if(!this.config)return U``;const n=this.config,r=(e,t,o,i)=>U`
            <ha-row-selector .hass=${this.hass} .selector=${o} .value=${i}
                .label=${this.t("month."+e,t)} .propertyName=${e}
                @value-changed=${this._handleFormValueChanged}></ha-row-selector>`,s="all"===this.section||"content"===this.section,l="all"===this.section||"appearance"===this.section;return U`
            ${s?U`<calendar-editor .hass=${this.hass} .config=${this.config} .sourcesOnly=${!0} .section=${"content"} .editorSessionKey=${this.editorSessionKey}></calendar-editor>
                ${r("viewMode","Calendar view",{select:{options:[{value:"month",label:this.t("month.viewMonth","Month")},{value:"four-weeks",label:this.t("month.viewFourWeeks","Four weeks from the current week")}],mode:"dropdown"}},n.viewMode||"month")}
                ${r("firstDayOfWeek","First day of week",{select:{options:[{value:"auto",label:this.t("ui.auto","Auto")},...Array.from({length:7},(e,t)=>{var o,i;return{value:String(t),label:new Intl.DateTimeFormat((null===(i=null===(o=this.hass)||void 0===o?void 0:o.locale)||void 0===i?void 0:i.language)||"en",{weekday:"long",timeZone:"UTC"}).format(new Date(Date.UTC(2026,0,4+t)))}})],mode:"dropdown"}},void 0===n.firstDayOfWeek?"auto":String(n.firstDayOfWeek))}
                ${r("eventsPerDay","Events per day",{number:{min:1,max:10,mode:"box"}},null!==(e=n.eventsPerDay)&&void 0!==e?e:3)}
                ${r("showAllDay","Show all-day events",{boolean:{}},!1!==n.showAllDay)}
            `:""}
            ${l?U`
                ${r("showTitle","Show calendar heading",{boolean:{}},!1!==n.showTitle)}
                ${"four-weeks"!==n.viewMode?r("showNavigation","Show month navigation",{boolean:{}},!1!==n.showNavigation):""}
                ${r("showGridLines","Show grid lines",{boolean:{}},!1!==n.showGridLines)}
                ${r("backgroundOpacity","Calendar background opacity",{number:{min:0,max:1,step:.05,mode:"slider"}},null!==(t=n.backgroundOpacity)&&void 0!==t?t:0)}
                ${r("cellMinHeight","Minimum day height (px)",{number:{min:70,max:400,mode:"box"}},null!==(o=n.cellMinHeight)&&void 0!==o?o:110)}
                ${r("calendarDateSize","Date text size",{text:{}},n.calendarDateSize||"1em")}
                ${r("eventTitleSize","Event text size",{text:{}},n.eventTitleSize||".8em")}
                ${r("wrapEventTitles","Wrap event text to two lines",{boolean:{}},!0===n.wrapEventTitles)}
                ${r("grayOutPastEvents","Gray out past events",{boolean:{}},!0===n.grayOutPastEvents)}
                ${r("gridColor","Grid color",{color_hex:{}},n.gridColor||"#888888")}
                ${r("eventBackgroundOpacity","Event background opacity",{number:{min:0,max:1,step:.05,mode:"slider"}},null!==(i=n.eventBackgroundOpacity)&&void 0!==i?i:.2)}
            `:""}
            ${"all"===this.section||"behavior"===this.section?r("updateInterval","Refresh interval (seconds)",{number:{min:60,max:86400,mode:"box"}},null!==(a=n.updateInterval)&&void 0!==a?a:300):""}
        `}_handleFormValueChanged(e){"firstDayOfWeek"===e.detail.propertyName&&(e.detail.value="auto"===e.detail.value?void 0:Number(e.detail.value)),super._handleFormValueChanged(e)}};Gs=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("calendar-month-editor")],Gs);const Js=new Set(["custom:wall-clock-card","wall-clock-card"]);function Ys(e,t=new Set){if(!e||"object"!=typeof e)return!1;if(t.has(e))return!1;if(t.add(e),Array.isArray(e))return e.some(e=>Ys(e,t));const o=e;return!("string"!=typeof o.type||!Js.has(o.type.trim().toLowerCase()))||Object.values(o).some(e=>Ys(e,t))}var Xs=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};let Qs=class extends os{constructor(){super(...arguments),this.loading=!1,this.buildRevision=0,this.logger=ke("ha-card-widget")}applyWidgetState(){this.toggleAttribute("transparent",!0===this.config.transparent),this.cardElement&&this.hass&&(this.cardElement.hass=this.hass),this.appliedCardConfig!==this.config.card&&(this.appliedCardConfig=this.config.card,this.rebuildCard())}updated(e){super.updated(e),e.has("hass")&&this.cardElement&&this.hass&&(this.cardElement.hass=this.hass)}text(e,t){return Je(e,this.hass,t)}async rebuildCard(){const e=++this.buildRevision,t=this.config.card;if(this.cardElement=void 0,this.error=void 0,this.loading=!1,!(null==t?void 0:t.type))return void(this.loading=!1);if(Ys(t))return this.loading=!1,void(this.error=this.text("editor.ha_card.recursion_error","wall-clock-card cannot be embedded inside itself."));const o=window.loadCardHelpers;if(o){this.loading=!0;try{const i=await o(),a=await Promise.resolve(i.createCardElement(t));if(e!==this.buildRevision)return;a.style.display="block",a.style.width="100%",this.hass&&(a.hass=this.hass),a.addEventListener("ll-rebuild",e=>{e.stopPropagation(),a===this.cardElement&&this.rebuildCard()},{once:!0}),this.cardElement=a}catch(t){if(e!==this.buildRevision)return;const o=t instanceof Error?t.message:String(t);this.logger.error(`Unable to create embedded card: ${o}`),this.error=o}finally{e===this.buildRevision&&(this.loading=!1)}}else this.error=this.text("editor.ha_card.helpers_error","Home Assistant card helpers are unavailable.")}render(){var e;return this.error?U`<div class="status error">${this.error}</div>`:this.loading?U`<div class="status">${this.text("editor.ha_card.loading","Loading Home Assistant card…")}</div>`:(null===(e=this.config.card)||void 0===e?void 0:e.type)?this.cardElement?U`<div class="card">${this.cardElement}</div>`:q:U`<div class="status">${this.text("editor.ha_card.empty","Choose a Home Assistant card in the widget editor.")}</div>`}};Qs.styles=n`
        :host {
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
        }

        :host([transparent]) {
            --ha-card-background: transparent;
            --ha-card-border-color: transparent;
            --ha-card-border-width: 0;
            --ha-card-box-shadow: none;
        }

        .card,
        .card > * {
            display: block;
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
        }

        .status {
            padding: 12px 14px;
            border: 1px dashed color-mix(in srgb, currentColor 35%, transparent);
            border-radius: var(--ha-card-border-radius, 12px);
            background: color-mix(in srgb, var(--card-background-color, #111) 68%, transparent);
            color: inherit;
            font-size: 0.85rem;
            line-height: 1.4;
        }

        .error {
            border-color: color-mix(in srgb, var(--error-color, #db4437) 65%, transparent);
            color: var(--error-color, #db4437);
        }
    `,Xs([ve()],Qs.prototype,"cardElement",void 0),Xs([ve()],Qs.prototype,"loading",void 0),Xs([ve()],Qs.prototype,"error",void 0),Qs=Xs([ue("wcc-ha-card-widget")],Qs);let el=class extends os{get resolvedOrientation(){return this.config.orientation&&"auto"!==this.config.orientation?this.config.orientation:"row"===this.zoneDirection?"vertical":"horizontal"}applyWidgetState(){this.setAttribute("data-orientation",this.resolvedOrientation)}render(){var e,t,o,i;const a=this.resolvedOrientation,n=Math.min(1,Math.max(0,Number(null!==(e=this.config.opacity)&&void 0!==e?e:.35))),r=(null===(t=this.config.color)||void 0===t?void 0:t.trim())||"#ffffff",s=(null===(o=this.config.thickness)||void 0===o?void 0:o.trim())||"1px",l=(null===(i=this.config.length)||void 0===i?void 0:i.trim())||"100%";return U`
            <div class="separator ${a}"
                 role="separator"
                 aria-orientation=${a}
                 style="
                     --separator-color: ${r};
                     --separator-opacity: ${n};
                     --separator-thickness: ${s};
                     --separator-length: ${l};
                 ">
            </div>
        `}};el.styles=n`
        :host {
            display: block;
            flex: 0 0 auto;
            min-width: 0;
            min-height: 0;
            pointer-events: none;
        }

        :host([data-orientation='horizontal']) {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding-inline:
                var(--wcc-separator-inline-start-inset, 0)
                var(--wcc-separator-inline-end-inset, 0);
        }

        :host([data-orientation='vertical']) {
            width: auto;
            height: 100%;
            box-sizing: border-box;
            padding-block:
                var(--wcc-separator-block-start-inset, 0)
                var(--wcc-separator-block-end-inset, 0);
        }

        .separator {
            display: block;
            box-sizing: border-box;
            border-radius: 999px;
            background: var(--separator-color, #ffffff);
            opacity: var(--separator-opacity, 0.35);
        }

        .separator.horizontal {
            width: min(var(--separator-length, 100%), 100%);
            height: var(--separator-thickness, 1px);
            margin-inline: auto;
        }

        .separator.vertical {
            width: var(--separator-thickness, 1px);
            height: min(var(--separator-length, 100%), 100%);
            margin-block: auto;
        }
    `,el=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r}([ue("wcc-separator-widget")],el);var tl=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};const ol=["alarm-panel","area","button","calendar","conditional","entities","entity","entity-filter","gauge","glance","grid","history-graph","horizontal-stack","humidifier","iframe","light","logbook","map","markdown","media-control","picture","picture-elements","picture-entity","picture-glance","plant-status","sensor","shopping-list","statistic","statistics-graph","thermostat","tile","todo-list","vertical-stack","weather-forecast"];let il=class extends Rt{constructor(){super(...arguments),this.choosing=!1,this.jsonValue="",this.editorOpen=!1,this.directEditorLoading=!1,this.directEditorUnavailable=!1,this.lovelace={views:[]},this.directEditorRevision=0,this.onDirectConfigChanged=e=>{e.stopPropagation();const t=e.detail;if((null==t?void 0:t.error)||!(null==t?void 0:t.config))return;const o=t.config;JSON.stringify(o)!==JSON.stringify(this.draftCard)&&(this.directEditorSignature=JSON.stringify(o),this.setDraftCard(o))}}updated(e){var t;if(super.updated(e),e.has("config")){const e=this.widgetConfig.card?JSON.stringify(this.widgetConfig.card,null,2):"";this.jsonValue!==e&&(this.jsonValue=e)}if(this.editorOpen&&(e.has("draftCard")||e.has("editorOpen"))){const e=this.draftCard;(null===(t=null==e?void 0:e.type)||void 0===t?void 0:t.startsWith("custom:"))?this.ensureDirectEditor(e):this.clearDirectEditor()}(e.has("config")||e.has("hass")||e.has("choosing")||e.has("editorOpen")||e.has("draftCard"))&&this.syncNativeElements()}get widgetConfig(){return this.config}get editorDirty(){return JSON.stringify(this.draftCard)!==JSON.stringify(this.widgetConfig.card)}get cardTypeOptions(){var e;return[...ol.map(e=>({value:e,label:this.hass.localize(`ui.panel.lovelace.editor.card.${e}.name`)||this.humanize(e)})),...(null!==(e=window.customCards)&&void 0!==e?e:[]).filter(e=>e.type&&!["wall-clock-card","custom:wall-clock-card"].includes(e.type)).map(e=>({value:e.type.startsWith("custom:")?e.type:`custom:${e.type}`,label:e.name||this.humanize(e.type)}))].filter((e,t,o)=>o.findIndex(t=>t.value===e.value)===t).sort((e,t)=>e.label.localeCompare(t.label,this.hass.language))}humanize(e){return e.replace(/^custom:/,"").replace(/[-_]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}emit(e){kt(this,"config-changed",{config:e})}updateCard(e){Ys(e)?this.validationError=this.t("editor.ha_card.recursion_error","wall-clock-card cannot be embedded inside itself."):(this.validationError=void 0,this.choosing=!1,this.emit({...this.widgetConfig,card:{...e}}))}changeType(e){var t;const o=null==e?void 0:e.trim();o&&o!==(null===(t=this.widgetConfig.card)||void 0===t?void 0:t.type)&&this.updateCard(function(e){const t=e.trim();switch(t){case"entities":case"glance":case"history-graph":case"statistics-graph":return{type:t,entities:[]};case"grid":return{type:t,cards:[],columns:2};case"horizontal-stack":case"vertical-stack":return{type:t,cards:[]};case"markdown":return{type:t,content:""};default:return{type:t}}}(o))}updateTransparent(e){const t={...this.widgetConfig};e?t.transparent=!0:delete t.transparent,this.emit(t)}onPickerConfigChanged(e){var t,o;if(e.stopPropagation(),(null===(t=e.detail)||void 0===t?void 0:t.error)||!(null===(o=e.detail)||void 0===o?void 0:o.config))return;const i=e.detail.config;JSON.stringify(i)!==JSON.stringify(this.widgetConfig.card)&&this.updateCard(i)}onDialogConfigChanged(e){var t;e.stopPropagation(),(null===(t=e.detail)||void 0===t?void 0:t.config)&&(e.detail.error?this.validationError=String(e.detail.error):this.setDraftCard(e.detail.config))}setDraftCard(e){Ys(e)?this.validationError=this.t("editor.ha_card.recursion_error","wall-clock-card cannot be embedded inside itself."):(this.validationError=void 0,this.draftCard={...e})}openEditor(){this.widgetConfig.card&&(this.validationError=void 0,this.draftCard=JSON.parse(JSON.stringify(this.widgetConfig.card)),this.jsonValue=JSON.stringify(this.draftCard,null,2),this.editorOpen=!0)}closeEditor(){this.editorOpen=!1}dialogClosed(){this.clearDirectEditor(),this.draftCard=void 0,this.validationError=void 0}saveEditor(){this.draftCard&&!this.validationError&&this.editorDirty&&(this.updateCard(this.draftCard),this.editorOpen=!1)}onJsonChanged(e){this.jsonValue=e.target.value;try{const e=JSON.parse(this.jsonValue);if(!e||"object"!=typeof e||"string"!=typeof e.type||!e.type.trim())return void(this.validationError=this.t("editor.ha_card.json_type_error","The card configuration must contain a type."));if(JSON.stringify(e)===JSON.stringify(this.draftCard))return void(this.validationError=void 0);this.setDraftCard(e)}catch(e){this.validationError=this.t("editor.ha_card.json_error","The card configuration is not valid JSON.")}}syncNativeElements(){const e=this.renderRoot.querySelector("hui-card-element-editor");e&&(e.hass=this.hass,e.lovelace=this.lovelace,e.inDialog=!0,e.value=this.draftCard);const t=this.renderRoot.querySelector("hui-card-picker");t&&(t.hass=this.hass,t.lovelace=this.lovelace)}clearDirectEditor(){var e;(this.directEditor||this.directEditorLoading||this.directEditorType)&&(this.directEditorRevision++,null===(e=this.directEditor)||void 0===e||e.removeEventListener("config-changed",this.onDirectConfigChanged),this.directEditor=void 0,this.directEditorLoading=!1,this.directEditorUnavailable=!1,this.directEditorType=void 0,this.directEditorSignature=void 0)}async ensureDirectEditor(e){var t;const o=e.type,i=JSON.stringify(e);if(this.directEditor&&this.directEditorType===o)return void(this.directEditorSignature!==i&&(this.directEditor.setConfig(e),this.directEditorSignature=i));if(this.directEditorLoading&&this.directEditorType===o)return;this.clearDirectEditor();const a=++this.directEditorRevision;this.directEditorType=o,this.directEditorLoading=!0;try{const i=window.loadCardHelpers;if(!i)throw new Error("Home Assistant card helpers are unavailable.");const n=await i(),r=await Promise.resolve(n.createCardElement(e));await customElements.whenDefined(r.localName);const s=customElements.get(r.localName);if(!(null==s?void 0:s.getConfigElement))throw new Error(`No visual editor is available for ${o}.`);const l=await Promise.resolve(s.getConfigElement());if(a!==this.directEditorRevision||!this.editorOpen||(null===(t=this.draftCard)||void 0===t?void 0:t.type)!==o)return;const c=this.draftCard;if(!c)return;l.hass=this.hass,l.lovelace=this.lovelace,l.setConfig(c),l.addEventListener("config-changed",this.onDirectConfigChanged),this.directEditorSignature=JSON.stringify(c),this.directEditor=l,this.directEditorUnavailable=!1}catch(e){if(a!==this.directEditorRevision)return;this.directEditorUnavailable=!0}finally{a===this.directEditorRevision&&(this.directEditorLoading=!1)}}renderEditorDialog(e){var t;const o=this.draftCard;if(!o)return q;const i=!0===(null===(t=o.type)||void 0===t?void 0:t.startsWith("custom:")),a=this.hass.localize("ui.common.cancel")||"Cancel",n=this.hass.localize("ui.common.save")||"Save";return U`
            <ha-dialog
                    .open=${this.editorOpen}
                    @closed=${this.dialogClosed}
                    @keydown=${e=>e.stopPropagation()}>
                <span slot="headerTitle">${this.t("editor.ha_card.dialog_title","Edit Home Assistant card")}</span>

                <div class="dialog-content">
                    ${this.validationError?U`<div class="error">${this.validationError}</div>`:q}

                    ${i&&this.directEditor?U`
                        <div class="native-editor direct-editor">${this.directEditor}</div>
                    `:i&&!this.directEditorUnavailable?U`
                        <p class="hint">${this.t("editor.ha_card.loading","Loading Home Assistant card…")}</p>
                    `:e?U`
                        <hui-card-element-editor
                                class="native-editor"
                                @config-changed=${this.onDialogConfigChanged}>
                        </hui-card-element-editor>
                    `:U`
                        <p class="hint">${this.t("editor.ha_card.native_editor_unavailable","The native Home Assistant card editor is unavailable in this view. Edit the complete card configuration below.")}</p>
                        <div class="json-field">
                            <label for="card-json">${this.t("editor.ha_card.json_config","Card configuration (JSON)")}</label>
                            <textarea id="card-json"
                                      .value=${this.jsonValue}
                                      spellcheck="false"
                                      @input=${this.onJsonChanged}></textarea>
                        </div>
                    `}
                </div>

                <ha-dialog-footer slot="footer">
                    <ha-button slot="secondaryAction" appearance="plain" @click=${this.closeEditor}>
                        ${a}
                    </ha-button>
                    <ha-button slot="primaryAction" ?disabled=${!!this.validationError||!this.editorDirty} @click=${this.saveEditor}>
                        ${n}
                    </ha-button>
                </ha-dialog-footer>
            </ha-dialog>
        `}render(){var e;if(!this.hass||!this.config)return q;const t=this.widgetConfig.card,o=!!customElements.get("hui-card-picker"),i=!!customElements.get("hui-card-element-editor"),a="all"===this.section||"content"===this.section,n="all"===this.section||"appearance"===this.section;return U`
            <div class="content">
                ${a?U`
                <p class="hint">${this.t("editor.ha_card.description","Embed a built-in or installed custom Home Assistant dashboard card.")}</p>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this.cardTypeOptions,custom_value:!0,mode:"dropdown"}}}
                        .value=${null!==(e=null==t?void 0:t.type)&&void 0!==e?e:""}
                        .label=${this.t("editor.ha_card.card_type","Card type")}
                        .helper=${this.t("editor.ha_card.card_type_help","Choose a card or enter its type, for example custom:mushroom-template-card.")}
                        .labelPosition=${aa.Top}
                        @value-changed=${e=>this.changeType(e.detail.value)}>
                </ha-row-selector>

                ${o?U`
                    <button type="button" @click=${()=>this.choosing=!this.choosing}>
                        <ha-icon .icon=${this.choosing?"mdi:close":"mdi:view-dashboard-edit-outline"}></ha-icon>
                        ${this.choosing?this.t("ui.close","Close"):this.t(t?"editor.ha_card.change_card":"editor.ha_card.choose_card",t?"Choose another card":"Choose card")}
                    </button>
                `:q}

                ${this.validationError&&!this.editorOpen?U`<div class="error">${this.validationError}</div>`:q}

                ${this.choosing&&o?U`
                    <hui-card-picker
                            class="native-picker"
                            @config-changed=${this.onPickerConfigChanged}>
                    </hui-card-picker>
                `:q}

                ${t&&!this.choosing?U`
                    <button type="button" @click=${this.openEditor}>
                        <ha-icon icon="mdi:pencil-box-outline"></ha-icon>
                        ${this.t("editor.ha_card.edit_card","Edit card in Home Assistant editor")}
                    </button>
                `:q}
                `:q}

                ${n?U`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!0===this.widgetConfig.transparent}
                        .label=${this.t("editor.ha_card.transparent","Transparent card background")}
                        .helper=${this.t("editor.ha_card.transparent_help","Removes the standard HA card surface where the embedded card supports theme variables.")}
                        .labelPosition=${aa.Top}
                        @value-changed=${e=>this.updateTransparent(e.detail.value)}>
                </ha-row-selector>
                `:q}
            </div>

            ${a?this.renderEditorDialog(i):q}
        `}};il.styles=n`
        :host { display: block; }

        .content {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 12px;
        }

        .hint {
            margin: 0;
            color: var(--secondary-text-color, #aaa);
            font-size: 0.82rem;
            line-height: 1.45;
        }

        .error {
            padding: 10px 12px;
            border: 1px solid var(--error-color, #db4437);
            border-radius: 8px;
            color: var(--error-color, #db4437);
            font-size: 0.82rem;
        }

        .native-editor,
        .native-picker {
            display: block;
            min-width: 0;
            padding-top: 4px;
            border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        }

        .native-picker {
            min-height: 360px;
            max-height: min(65vh, 720px);
            overflow: auto;
        }

        ha-dialog {
            --dialog-z-index: 7;
            --dialog-content-padding: 8px;
        }

        .dialog-content {
            width: min(920px, calc(100vw - 56px));
            max-width: 100%;
            max-height: calc(100vh - 190px);
            overflow: auto;
            padding: 4px 10px 12px;
            box-sizing: border-box;
        }

        .dialog-content .native-editor {
            padding-top: 0;
            border-top: 0;
        }

        @media (max-width: 600px) {
            .dialog-content {
                width: calc(100vw - 24px);
                padding-inline: 2px;
            }
        }

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            min-height: 42px;
            width: 100%;
            padding: 0 12px;
            border: 1px solid var(--primary-color, #03a9f4);
            border-radius: 8px;
            background: color-mix(in srgb, var(--primary-color, #03a9f4) 16%, transparent);
            color: var(--primary-color, #03a9f4);
            font: inherit;
            font-size: 0.84rem;
            font-weight: 650;
            cursor: pointer;
        }

        button:hover,
        button:focus-visible {
            background: color-mix(in srgb, var(--primary-color, #03a9f4) 27%, transparent);
            outline: none;
        }

        button ha-icon { --mdc-icon-size: 18px; }

        .json-field {
            display: flex;
            flex-direction: column;
            gap: 7px;
        }

        .json-field label {
            color: var(--primary-text-color, #fff);
            font-size: 0.82rem;
            font-weight: 600;
        }

        textarea {
            min-height: 220px;
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.22));
            border-radius: 8px;
            outline: none;
            box-sizing: border-box;
            resize: vertical;
            background: var(--code-editor-background-color, var(--secondary-background-color, #222));
            color: var(--primary-text-color, #fff);
            font: 0.8rem/1.5 var(--code-font-family, ui-monospace, SFMono-Regular, Consolas, monospace);
        }

        textarea:focus {
            border-color: var(--primary-color, #03a9f4);
        }
    `,tl([ve()],il.prototype,"choosing",void 0),tl([ve()],il.prototype,"validationError",void 0),tl([ve()],il.prototype,"jsonValue",void 0),tl([ve()],il.prototype,"editorOpen",void 0),tl([ve()],il.prototype,"draftCard",void 0),tl([ve()],il.prototype,"directEditor",void 0),tl([ve()],il.prototype,"directEditorLoading",void 0),tl([ve()],il.prototype,"directEditorUnavailable",void 0),il=tl([ue("ha-card-widget-editor")],il),nr.getInstance().registerAll([{widgetId:"clock",name:"Clock",description:"The current time",icon:"mdi:clock-outline",elementTag:"wcc-clock-widget",editorTag:"time-format-editor",defaultConfig:()=>({type:"clock"})},{widgetId:"date",name:"Date",description:"The current date",icon:"mdi:calendar-outline",elementTag:"wcc-date-widget",editorTag:"date-format-editor",defaultConfig:()=>({type:"date"})},{widgetId:"sensors",name:"Sensors",description:"Values of Home Assistant sensors",icon:"mdi:thermometer",elementTag:"wcc-sensors-widget",editorTag:"sensors-editor",defaultConfig:()=>({type:"sensors",sensors:[]})},{widgetId:"weather",name:"Weather",description:"Current weather and forecast",icon:"mdi:weather-partly-cloudy",elementTag:"wcc-weather-widget",editorTag:"weather-editor",defaultConfig:()=>({type:"weather",provider:"homeassistant",displayMode:"current"})},{widgetId:"transportation",name:"Transportation",description:"Public transport departures",icon:"mdi:bus",elementTag:"wcc-transportation-widget",editorTag:"transportation-editor",singleton:!0,defaultConfig:()=>({type:"transportation",provider:"",displayMode:"inline",stops:[]})},{widgetId:"action-bar",name:"Action bar",description:"Buttons triggering actions",icon:"mdi:gesture-tap-button",elementTag:"wcc-action-bar-widget",editorTag:"action-bar-editor",defaultConfig:()=>({type:"action-bar",enabled:!0,actions:[]})},{widgetId:"calendar-month",name:"Monthly overview",icon:"mdi:calendar-month",elementTag:"wcc-calendar-month",editorTag:"calendar-month-editor",defaultConfig:()=>({type:"calendar-month",entities:[],eventsPerDay:3,cellMinHeight:110})},{widgetId:"calendar",name:"Calendar",description:"Upcoming Home Assistant calendar events",icon:"mdi:calendar-month-outline",elementTag:"wcc-calendar-widget",editorTag:"calendar-editor",defaultConfig:()=>({type:"calendar",entities:[],displayMode:"agenda",daysAhead:7,maxEvents:8,showAllDay:!0,showLocation:!0,showDescription:!1,hidePastTodayEvents:!0,hideWhenEmpty:!1,updateInterval:300,eventBackgroundColor:"#202020",eventBackgroundOpacity:.76})},{widgetId:"ha-card",name:"Home Assistant card",description:"A built-in or installed custom Lovelace card",icon:"mdi:view-dashboard-outline",elementTag:"wcc-ha-card-widget",editorTag:"ha-card-widget-editor",defaultConfig:()=>({type:"ha-card"})},{widgetId:"separator",name:"Separator",description:"A configurable line between widgets",icon:"mdi:minus",elementTag:"wcc-separator-widget",editorTag:"separator-editor",defaultConfig:()=>({type:"separator",orientation:"auto",color:"#ffffff",opacity:.35,thickness:"1px",length:"100%"})}]);var al=function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,o,r):a(t,o))||r);return n>3&&r&&Object.defineProperty(t,o,r),r};const nl=new Map;let rl=class extends de{t(e,t){return Je(e,this.hass,t)}constructor(){super(),this.config={},this.preview=!1,this.selectedWidget=null,this.selectedZone=null,this.designerPreview=!1,this.designerOpen=!1,this.designerRequiresExplicitOpen=!1,this.layoutSaveStatus="idle",this.layoutSaveRevision=0,this.layoutSavedRevision=0,this.inlineEditSessionActive=!1,this.layoutTextEditPending=!1,this.haEditOverlayStyleSnapshots=[],this.designerStackStyleSnapshots=[],this.parentSortableSnapshots=[],this.configV3={layout:{zones:{}}},this.backgroundImageComponent=document.createElement("ha-background-image"),this.layoutElement=document.createElement("wcc-layout"),this.fontColorController=new yr(this,()=>this.syncLayoutElement()),this.onWindowResize=()=>this.updateFitHeight(),this.onDesignerFocusIn=e=>{e.composedPath().some(e=>this.isTextEditingTarget(e))&&(this.layoutTextEditPending=!0)},this.onDesignerPointerDown=e=>{e.composedPath().some(e=>this.isTextEditingTarget(e))&&(this.layoutTextEditPending=!0)},this.stopFullscreenInteractionAtCard=e=>{this.hasAttribute("designer-fullscreen")&&e.stopPropagation()},this.onCardFocusOut=()=>{setTimeout(()=>{!this.isActiveElementInsideThisCard()&&this.layoutSaveRevision>this.layoutSavedRevision&&this.flushLayoutAutosave("focusout")},0)},ze.info("%c WALL-CLOCK-CARD %c 3.12.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;")}connectedCallback(){super.connectedCallback(),this.preview||(this.removeAttribute("designer-fullscreen"),this.style.removeProperty("--wcc-designer-top")),this.isInEditPreview()&&(this.setAttribute("dialog-preview",""),this.setupPreviewScaling()),this.preview&&!this.hasAttribute("dialog-preview")&&this.hass&&!this.inlineEditSessionActive&&this.beginInlineEditing(),window.addEventListener("resize",this.onWindowResize),this.renderRoot.addEventListener("focusin",this.onDesignerFocusIn,{capture:!0}),this.renderRoot.addEventListener("pointerdown",this.onDesignerPointerDown,{capture:!0}),this.addEventListener("focusout",this.onCardFocusOut),this.addEventListener("pointerdown",this.stopFullscreenInteractionAtCard),this.addEventListener("mousedown",this.stopFullscreenInteractionAtCard),this.addEventListener("touchstart",this.stopFullscreenInteractionAtCard),this.fitObserver=new ResizeObserver(()=>this.updateFitHeight()),this.fitObserver.observe(this),this.initBackgroundImageComponent(),this.syncLayoutElement(),this.initConnectCallbackAsync()}disconnectedCallback(){var e,t;this.clearLayoutAutosaveTimer(),this.removeAttribute("designer-fullscreen"),this.style.removeProperty("--wcc-designer-top"),this.restoreHaEditMenu(),this.restoreParentSortables(),this.restoreDesignerStack(),this.designerOpen=!1,this.inlineEditSessionActive&&(this.inlineEditSessionActive=!1,this.flushLayoutAutosave("commit")),super.disconnectedCallback(),null===(e=this.previewObserver)||void 0===e||e.disconnect(),this.previewObserver=void 0,null===(t=this.fitObserver)||void 0===t||t.disconnect(),this.fitObserver=void 0,window.removeEventListener("resize",this.onWindowResize),this.renderRoot.removeEventListener("focusin",this.onDesignerFocusIn,{capture:!0}),this.renderRoot.removeEventListener("pointerdown",this.onDesignerPointerDown,{capture:!0}),this.removeEventListener("focusout",this.onCardFocusOut),this.removeEventListener("pointerdown",this.stopFullscreenInteractionAtCard),this.removeEventListener("mousedown",this.stopFullscreenInteractionAtCard),this.removeEventListener("touchstart",this.stopFullscreenInteractionAtCard),this.restoreHaEditOverlay()}updateFitHeight(){if(this.hasAttribute("dialog-preview"))return;if(this.hasAttribute("designer-fullscreen"))return void(this.style.maxHeight="");const e=Math.max(0,this.getBoundingClientRect().top),t=this.dashboardEditFooterHeight(),o=window.innerHeight-e-t;if(o<=0)return;const i=parseFloat(this.style.maxHeight);(isNaN(i)||Math.abs(i-o)>1)&&(this.style.maxHeight=`${o}px`)}dashboardEditFooterHeight(){if(!this.preview||this.hasAttribute("dialog-preview"))return 0;const e=parseFloat(getComputedStyle(this).getPropertyValue("--wcc-dashboard-edit-footer-height"));return Number.isFinite(e)?Math.max(0,e):64}setupPreviewScaling(){this.previewObserver||(this.previewObserver=new ResizeObserver(()=>this.updatePreviewScale()),this.previewObserver.observe(this),this.updatePreviewScale())}updatePreviewScale(){const e=window.innerWidth,t=window.innerHeight,o=this.clientWidth/e;o<=0||!e||!t||(this.style.setProperty("--wcc-preview-width",`${e}px`),this.style.setProperty("--wcc-preview-height",`${t}px`),this.style.setProperty("--wcc-preview-scale",String(o)),this.style.aspectRatio=`${e} / ${t}`)}isInEditPreview(){let e=this;for(;e;){const t=e.getRootNode();if(!(t instanceof ShadowRoot))return!1;const o=t.host.localName;if("hui-dialog-edit-card"===o||"hui-card-preview"===o||"hui-dialog-pick-card"===o)return!0;e=t.host}return!1}async initConnectCallbackAsync(){await this.backgroundImageComponent.controller.ready,this.configureCardLogger();try{await async function(){ze.debug("Loading all translations");const e=Ye().map(e=>async function(e){try{Ve[e]?(Ze[e]=Ve[e],ze.debug(`Loaded translations for ${e}`)):ze.warn(`No embedded translations found for ${e}`)}catch(t){ze.error(`Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),ze.debug("Loaded translations for all languages")}catch(e){ze.error("Error loading translations:",e)}this.publishWeatherFallbackIfNeeded()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}getGridOptions(){return{columns:"full",rows:6,min_rows:4}}static getStubConfig(){return xn({})}setConfig(e){if(!e||"object"!=typeof e)throw new Error("Invalid configuration");this.applyConfig(e)}applyConfig(e){this.config=e;const t=xn(e),o=nr.getInstance().getAllWidgets().filter(e=>e.singleton).map(e=>e.widgetId);this.configV3={...t,layout:An(t.layout,o)},this.syncFontColorController(),this.initBackgroundImageComponent(),this.syncLayoutElement(),this.backgroundImageComponent.controller.ready.then(()=>{this.publishWeatherFallbackIfNeeded()})}computeAppearance(){var e,t,o,i,a;const n=null!==(e=this.configV3.appearance)&&void 0!==e?e:{};return{fontColor:this.fontColorController.color,fontFamily:n.fontFamily,textShadow:n.textShadow,language:n.language,timeZone:null!==(t=n.timeZone)&&void 0!==t?t:null===(i=null===(o=this.hass)||void 0===o?void 0:o.config)||void 0===i?void 0:i.time_zone,size:null!==(a=n.size)&&void 0!==a?a:ut.Medium}}syncFontColorController(){var e;this.fontColorController.update(null===(e=this.configV3.appearance)||void 0===e?void 0:e.fontColor,this.hass,this.config)}syncLayoutElement(){var e;const t=this.computeAppearance();this.layoutElement.layout=this.configV3.layout,this.layoutElement.appearance=t,this.style.fontFamily=null!==(e=t.fontFamily)&&void 0!==e?e:"",this.hass&&(this.layoutElement.hass=this.hass)}publishWeatherFallbackIfNeeded(){const e=this.configV3.layout.zones;Object.values(e).some(e=>{var t;return null===(t=null==e?void 0:e.widgets)||void 0===t?void 0:t.some(e=>"weather"===e.type)})||ot.getInstance().publish(new at(Ee.All))}configureCardLogger(){!function(e){const t=_e.level;_e={...we,...e},t!==_e.level&&console.log(`[LOGGER] Log level changed from ${be[t]} to ${be[_e.level]}`)}({level:Se(this.configV3.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}initBackgroundImageComponent(){var e,t,o,i,a;const n=null!==(e=this.configV3.background)&&void 0!==e?e:{},r=function(e){return{...e.config,imageSourceId:e.source||"none",backgroundImages:e.images}}(n);this.backgroundImageComponent.backgroundOpacity=null!==(t=n.opacity)&&void 0!==t?t:.3,this.backgroundImageComponent.objectFit=n.objectFit||"cover",this.backgroundImageComponent.backgroundBlur=null!==(o=n.blur)&&void 0!==o?o:0,this.backgroundImageComponent.backgroundGrayscale=null!==(i=n.grayscale)&&void 0!==i?i:0,this.backgroundImageComponent.config={imageSourceConfig:r,backgroundRotationInterval:null!==(a=n.rotationInterval)&&void 0!==a?a:90,objectFit:n.objectFit||"cover"},this.backgroundImageComponent.hass=this.hass,ze.debug("Background image component initialized")}isPanelPlacement(){var e,t,o;let i=this;for(;i;){if("hui-panel-view"===i.localName)return!0;if(i.parentElement){i=i.parentElement;continue}const e=i.getRootNode();i=e instanceof ShadowRoot?e.host:null}const a=this.findHuiRoot(),n=null==a?void 0:a.___curView,r=void 0===n||null===(o=null===(t=null===(e=null==a?void 0:a.lovelace)||void 0===e?void 0:e.config)||void 0===t?void 0:t.views)||void 0===o?void 0:o[n];return"panel"===(null==r?void 0:r.type)||!0===(null==r?void 0:r.panel)}beginInlineEditing(){const e=!this.isPanelPlacement();this.removeAttribute("designer-fullscreen"),this.style.removeProperty("--wcc-designer-top"),this.designerRequiresExplicitOpen=e,this.designerOpen=!e,this.selectedWidget=null,this.selectedZone=null,this.designerPreview=!1,this.inlineEditSessionActive=!0,this.restoreDesignerContext(),e?(this.suppressHaEditOverlay(),this.updateComplete.then(()=>{requestAnimationFrame(()=>{this.inlineEditSessionActive&&this.designerRequiresExplicitOpen&&this.suppressHaEditOverlay()})})):this.restoreHaEditOverlay(),this.layoutSavePromise||this.layoutSaveBaseline&&this.layoutSaveRevision>this.layoutSavedRevision||(this.layoutSaveBaseline=this.config,this.layoutSaveRevision=0,this.layoutSavedRevision=0,this.layoutSavePromise=void 0,this.layoutSavePath=void 0,this.layoutTextEditPending=!1,this.clearLayoutAutosaveTimer(),this.layoutSaveStatus="idle",this.layoutSaveError=void 0)}finishInlineEditing(){this.clearLayoutAutosaveTimer(),this.restoreHaEditMenu(),this.restoreHaEditOverlay(),this.removeAttribute("designer-fullscreen"),this.style.removeProperty("--wcc-designer-top"),this.restoreParentSortables(),this.restoreDesignerStack(),this.closeInplaceInspector(),this.designerPreview=!1,this.designerOpen=!1,this.designerRequiresExplicitOpen=!1,this.inlineEditSessionActive=!1,this.clearRetainedDesignerContext(),this.flushLayoutAutosave("commit").then(e=>{e&&!this.inlineEditSessionActive?(this.layoutSaveBaseline=void 0,this.layoutSavePath=void 0):e||this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Wall Clock: the last layout change could not be saved."},bubbles:!0,composed:!0}))})}findHaCardEditMode(){let e=this;for(;e;){if("hui-card-edit-mode"===e.localName)return e;if(e.parentElement){e=e.parentElement;continue}const t=e.getRootNode();e=t instanceof ShadowRoot?t.host:null}}suppressHaEditOverlay(){var e;if(this.haEditOverlayStyleSnapshots.length||this.haEditWrapperInertSnapshot)return;const t=null===(e=this.findHaCardEditMode())||void 0===e?void 0:e.shadowRoot;if(!t)return;const o=t.querySelector(".card-wrapper");o&&(this.haEditWrapperInertSnapshot={element:o,inert:o.inert},o.inert=!1);const i=[[t.querySelector(".card-overlay"),"pointer-events","none"],[t.querySelector(".card-overlay"),"opacity","1"],[t.querySelector(".control"),"display","none"],[t.querySelector(".more"),"pointer-events","auto"]];for(const[e,t,o]of i)e&&(this.haEditOverlayStyleSnapshots.push({element:e,property:t,value:e.style.getPropertyValue(t),priority:e.style.getPropertyPriority(t)}),e.style.setProperty(t,o,"important"))}restoreHaEditOverlay(){this.restoreHaEditMenu(),this.haEditWrapperInertSnapshot&&(this.haEditWrapperInertSnapshot.element.inert=this.haEditWrapperInertSnapshot.inert,this.haEditWrapperInertSnapshot=void 0);for(const e of this.haEditOverlayStyleSnapshots)e.value?e.element.style.setProperty(e.property,e.value,e.priority):e.element.style.removeProperty(e.property);this.haEditOverlayStyleSnapshots=[]}hideHaEditMenu(){var e,t;if(this.haEditMenuDisplaySnapshot)return;const o=null===(t=null===(e=this.findHaCardEditMode())||void 0===e?void 0:e.shadowRoot)||void 0===t?void 0:t.querySelector(".more");o&&(this.haEditMenuDisplaySnapshot={element:o,property:"display",value:o.style.getPropertyValue("display"),priority:o.style.getPropertyPriority("display")},o.style.setProperty("display","none","important"))}restoreHaEditMenu(){const e=this.haEditMenuDisplaySnapshot;e&&(e.value?e.element.style.setProperty(e.property,e.value,e.priority):e.element.style.removeProperty(e.property),this.haEditMenuDisplaySnapshot=void 0)}promoteDesignerStack(){if(this.designerStackStyleSnapshots.length)return;let e=this;for(;e;){const t=e instanceof HTMLElement?e:void 0;if(t&&("hui-card-edit-mode"===t.localName||"hui-section-edit-mode"===t.localName||t.classList.contains("card")||t.classList.contains("section")))for(const[e,o]of[["position","relative"],["z-index","2147483000"]])this.designerStackStyleSnapshots.push({element:t,property:e,value:t.style.getPropertyValue(e),priority:t.style.getPropertyPriority(e)}),t.style.setProperty(e,o,"important");if(e.parentElement){e=e.parentElement;continue}const o=e.getRootNode();e=o instanceof ShadowRoot?o.host:null}}restoreDesignerStack(){for(const e of this.designerStackStyleSnapshots)e.value?e.element.style.setProperty(e.property,e.value,e.priority):e.element.style.removeProperty(e.property);this.designerStackStyleSnapshots=[]}disableParentSortables(){if(this.parentSortableSnapshots.length)return;let e=this;for(;e;){if("ha-sortable"===e.localName){const t=e;this.parentSortableSnapshots.push({element:t,disabled:t.disabled}),t.disabled=!0}if(e.parentElement){e=e.parentElement;continue}const t=e.getRootNode();e=t instanceof ShadowRoot?t.host:null}}restoreParentSortables(){for(const e of this.parentSortableSnapshots)e.element.disabled=e.disabled;this.parentSortableSnapshots=[]}openFullscreenDesigner(e){var t;if(null==e||e.stopPropagation(),!this.designerRequiresExplicitOpen)return;const o=this.findHuiRoot(),i=null===(t=null==o?void 0:o.shadowRoot)||void 0===t?void 0:t.querySelector(".header"),a=null==i?void 0:i.getBoundingClientRect().bottom;a&&Number.isFinite(a)?this.style.setProperty("--wcc-designer-top",`${Math.ceil(a)}px`):this.style.removeProperty("--wcc-designer-top"),this.promoteDesignerStack(),this.disableParentSortables(),this.hideHaEditMenu(),this.style.maxHeight="",this.setAttribute("designer-fullscreen",""),this.designerOpen=!0}closeFullscreenDesigner(e){null==e||e.stopPropagation(),this.clearLayoutAutosaveTimer(),this.closeInplaceInspector(),this.designerPreview=!1,this.removeAttribute("designer-fullscreen"),this.style.removeProperty("--wcc-designer-top"),this.restoreHaEditMenu(),this.restoreParentSortables(),this.restoreDesignerStack(),this.designerOpen=!1,this.clearRetainedDesignerContext(),this.flushLayoutAutosave("commit"),this.updateComplete.then(()=>this.updateFitHeight())}applyInplaceConfig(e){this.applyConfig(e),this.markLayoutDirty()}markLayoutDirty(){this.inlineEditSessionActive&&(this.layoutSaveRevision++,this.layoutSaveStatus="pending",this.layoutSaveError=void 0,this.scheduleLayoutAutosave())}scheduleLayoutAutosave(e=700){this.clearLayoutAutosaveTimer(),this.layoutAutosaveTimer=setTimeout(()=>{this.layoutAutosaveTimer=void 0,this.flushLayoutAutosave()},e)}clearLayoutAutosaveTimer(){void 0!==this.layoutAutosaveTimer&&(clearTimeout(this.layoutAutosaveTimer),this.layoutAutosaveTimer=void 0)}async flushLayoutAutosave(e="timer"){if(this.clearLayoutAutosaveTimer(),!this.layoutSaveBaseline||this.layoutSaveRevision<=this.layoutSavedRevision)return!0;if(function(e,t){return"commit"!==e&&(!!t.explicitDesignerOpen||"timer"===e&&t.textEditPending)}(e,{textEditPending:this.layoutTextEditPending,explicitDesignerOpen:this.designerRequiresExplicitOpen&&this.designerOpen}))return this.layoutSaveStatus="pending",!0;if(this.layoutSavePromise)return!!await this.layoutSavePromise&&this.flushLayoutAutosave(e);const t=this.layoutSaveBaseline,o=JSON.parse(JSON.stringify(this.configV3)),i=this.layoutSaveRevision;this.layoutSaveStatus="saving",this.layoutSaveError=void 0;const a=this.saveConfigToLovelace(t,o);this.layoutSavePromise=a;const n=await a;return this.layoutSavePromise===a&&(this.layoutSavePromise=void 0),n?(this.layoutSaveBaseline=o,this.layoutSavedRevision=i,this.layoutSaveRevision>i?(this.layoutSaveStatus="pending",this.flushLayoutAutosave(e)):(this.layoutSaveStatus="saved",this.layoutTextEditPending=!1,!0)):(this.layoutSaveStatus="error",this.layoutSaveError="Save failed — click to retry",ze.warn("Could not persist the layout (dashboard save API not found)"),!1)}isTextEditingTarget(e){return e instanceof HTMLTextAreaElement||(e instanceof HTMLInputElement?!new Set(["button","checkbox","color","file","hidden","image","radio","range","reset","submit"]).has(e.type.toLowerCase()):e instanceof HTMLElement&&(e.isContentEditable||"textbox"===e.getAttribute("role")))}isActiveElementInsideThisCard(){var e,t;let o=document.activeElement;for(;o;){if(o===this)return!0;o=null!==(t=null===(e=o.shadowRoot)||void 0===e?void 0:e.activeElement)&&void 0!==t?t:null}return!1}onInplaceLayoutChanged(e){var t;e.stopPropagation();const o=e.detail.layout,i=e.detail.focusWidgetId,a=null!=i?i:null===(t=this.selectedWidget)||void 0===t?void 0:t.widgetId;if(a){const e=Pn(o,a);this.selectedWidget=e?{zone:e.zone,index:e.index,widgetId:a}:null,i&&(this.selectedZone=null)}else this.selectedWidget&&(this.selectedWidget=null);this.retainDesignerContext();const n={...this.configV3,layout:o};this.applyInplaceConfig(n)}onInplaceWidgetSelected(e){var t,o,i;const a=e.detail;this.selectedZone=null;const n=a.widgetId?(null===(t=this.selectedWidget)||void 0===t?void 0:t.widgetId)===a.widgetId:(null===(o=this.selectedWidget)||void 0===o?void 0:o.zone)===a.zone&&(null===(i=this.selectedWidget)||void 0===i?void 0:i.index)===a.index;this.selectedWidget=n?null:a,this.retainDesignerContext()}onInplaceZoneSelected(e){const t=e.detail.zone;this.selectedWidget=null,this.selectedZone=this.selectedZone===t?null:t,this.retainDesignerContext()}onInplaceWidgetConfigChanged(e){e.stopPropagation();const{zone:t,index:o,widget:i}=e.detail,a=function(e,t,o,i){const a=In(e),n=a.zones[t];return!n||o<0||o>=n.widgets.length||(n.widgets[o]={...In(i),type:n.widgets[o].type,id:n.widgets[o].id}),a}(this.configV3.layout,t,o,i);this.applyInplaceConfig({...this.configV3,layout:a})}onInplaceZoneSettingsChanged(e){e.stopPropagation();const{zone:t,settings:o}=e.detail,i=function(e,t,o){var i;const a=In(e),n=null!==(i=a.zones[t])&&void 0!==i?i:{widgets:[]},r=n;for(const[e,t]of Object.entries(o))void 0===t||""===t?delete r[e]:r[e]=t;const s=Object.keys(r).some(e=>"widgets"!==e);return n.widgets.length>0||s?a.zones[t]=n:delete a.zones[t],a}(this.configV3.layout,t,o);this.applyInplaceConfig({...this.configV3,layout:i})}onInplaceCardConfigChanged(e){e.stopPropagation(),this.applyInplaceConfig(e.detail.config)}openCardSettings(){this.designerPreview=!1,this.selectedWidget=null,this.selectedZone=null,this.retainDesignerContext()}closeInplaceInspector(){this.selectedWidget=null,this.selectedZone=null}resolveDesignerSessionKey(){var e;if(this.designerSessionKey)return this.designerSessionKey;const t=this.findHuiRoot(),o=null===(e=null==t?void 0:t.lovelace)||void 0===e?void 0:e.config,i=o?qr(o,this.config):void 0;return(null==i?void 0:i.length)?(this.designerSessionKey=`${window.location.pathname}:${JSON.stringify(i)}`,this.designerSessionKey):void 0}retainDesignerContext(){const e=this.resolveDesignerSessionKey();e&&nl.set(e,{selectedWidget:this.selectedWidget?{...this.selectedWidget}:null,selectedZone:this.selectedZone})}restoreDesignerContext(){var e;const t=this.resolveDesignerSessionKey();if(!t)return;const o=nl.get(t);if(o){if(o.selectedWidget){const t=o.selectedWidget,i=t.widgetId?Pn(this.configV3.layout,t.widgetId):(null===(e=this.configV3.layout.zones[t.zone])||void 0===e?void 0:e.widgets[t.index])?{zone:t.zone,index:t.index}:void 0;if(i)return this.selectedWidget={zone:i.zone,index:i.index,widgetId:t.widgetId},void(this.selectedZone=null)}this.selectedWidget=null,this.selectedZone=o.selectedZone}}clearRetainedDesignerContext(){const e=this.designerSessionKey;var t;e&&(nl.delete(e),(t=e)&&Ot.delete(t)),this.designerSessionKey=void 0}async saveConfigToLovelace(e,t){try{const o=this.findHuiRoot(),i=null==o?void 0:o.lovelace;if(!(null==i?void 0:i.saveConfig)||!i.config)return!1;const a=i.config;let n=this.layoutSavePath;if(n||(n=qr(a,e)),!(null==n?void 0:n.length))return ze.warn("Refusing layout save: the exact card instance was not found"),!1;const r=Kr(a,n);if(r!==e&&JSON.stringify(r)!==JSON.stringify(e))return ze.warn("Refusing layout save: the dashboard changed at the card path"),!1;const s=function(e,t,o){if(!t.length)return;const i=JSON.parse(JSON.stringify(e)),a=Kr(i,t.slice(0,-1));return a&&"object"==typeof a?(a[t[t.length-1]]=o,i):void 0}(a,n,t);return!!s&&(await i.saveConfig(s),function(e,t,o,i){if(!t.length)return!1;const a=Kr(e,t);if(!Gr(a,o)&&!Gr(a,i))return!1;const n=Kr(e,t.slice(0,-1));if(!n||"object"!=typeof n)return!1;try{return n[t[t.length-1]]=i,!0}catch(e){return!1}}(a,n,e,t)||ze.debug("Live config synchronization skipped (read-only or already replaced)"),this.layoutSavePath=n,!0)}catch(e){return ze.warn("Saving layout to Lovelace failed:",e),!1}}findHuiRoot(){var e,t,o,i,a,n;const r=null===(n=null===(a=null===(i=null===(o=null===(t=null===(e=document.querySelector("home-assistant"))||void 0===e?void 0:e.shadowRoot)||void 0===t?void 0:t.querySelector("home-assistant-main"))||void 0===o?void 0:o.shadowRoot)||void 0===i?void 0:i.querySelector("ha-panel-lovelace"))||void 0===a?void 0:a.shadowRoot)||void 0===n?void 0:n.querySelector("hui-root");if(r)return r;const s=[document];let l=0;for(;s.length&&l<5e3;){const e=s.shift(),t=e.querySelector("hui-root");if(t)return t;for(const t of e.querySelectorAll("*"))l++,t.shadowRoot&&s.push(t.shadowRoot)}}updated(e){if(e.has("preview")||e.has("hass")){const e=this.preview&&!this.hasAttribute("dialog-preview")&&!!this.hass;e&&!this.inlineEditSessionActive?this.beginInlineEditing():!e&&this.inlineEditSessionActive&&this.finishInlineEditing(),e||(this.removeAttribute("designer-fullscreen"),this.style.removeProperty("--wcc-designer-top"),this.designerOpen=!1)}e.has("hass")&&(this.hass&&(this.backgroundImageComponent.hass=this.hass),this.syncFontColorController(),this.syncLayoutElement()),e.has("config")&&this.config&&this.configureCardLogger(),(e.has("config")||e.has("preview"))&&this.updateFitHeight()}static get styles(){return n`
            :host {
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
                /* Ceiling for containers that give no definite height (kiosk /
                   masonry views): without it the in-flow zone content — a large
                   clock plus a multi-row forecast — grows the card past the
                   viewport and the whole page scrolls. The flex chain below
                   makes the grid adapt within this box instead. No-op when the
                   parent already constrains the height (panel / sections). */
                max-height: 100vh;
                max-height: 100dvh;
                color: var(--primary-text-color, #fff);
                font-family: var(--paper-font-common-base_-_font-family, "Roboto", sans-serif);
                position: relative;
                overflow: hidden;
                border-radius: var(--ha-card-border-radius, 4px);
                box-sizing: border-box;
            }

            /* Standard card placements use the three-column designer in a
               promoted viewport layer after an explicit user action. Keep it over the
               available viewport below HA's header. The mode is latched when
               editing starts, preventing layout flicker. */
            :host([designer-fullscreen]) {
                position: fixed;
                top: var(--wcc-designer-top, var(--header-height, 56px));
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
                width: auto;
                height: auto;
                max-height: none;
                border-radius: 0;
                isolation: isolate;
                background: var(
                    --ha-card-background,
                    var(--card-background-color, #1c1c1c)
                );
                box-shadow: 0 12px 48px rgba(0, 0, 0, 0.55);
            }

            :host([designer-fullscreen]) ha-card {
                border-radius: 0;
            }

            ha-card {
                display: flex;
                flex-direction: column;
                flex: 1 1 auto;
                min-height: 0;
                width: 100%;
                overflow: hidden;
                position: relative;
            }

            ha-card.transparent-background {
                background: transparent;
                border: none;
                box-shadow: none;
            }

            /* The zone grid is the single in-flow child of ha-card; flex-fill it
               so its height is definite and its rows redistribute to fit. */
            wcc-layout {
                flex: 1 1 auto;
                min-height: 0;
            }

            /* Edit-dialog preview only (never dashboard edit mode): render the
               card at the viewport resolution and scale it down to the pane
               width — a faithful miniature with real dashboard proportions.
               Values come from updatePreviewScale(). */
            :host([dialog-preview]) {
                display: block;
                height: auto;
                max-height: none;
            }

            :host([dialog-preview]) ha-card {
                width: var(--wcc-preview-width, 1280px);
                height: var(--wcc-preview-height, 720px);
                transform: scale(var(--wcc-preview-scale, 0.3));
                transform-origin: top left;
            }

            /* Permanent three-column designer in HA dashboard edit mode. */
            .designer-toolbar {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                height: 44px;
                padding: 0 12px;
                box-sizing: border-box;
                border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                background: var(--card-background-color, #fff);
                color: var(--primary-text-color, #212121);
            }

            .designer-heading {
                display: flex;
                align-items: baseline;
                gap: 14px;
                min-width: 0;
            }

            .designer-heading strong {
                flex-shrink: 0;
                color: var(--primary-color, #4f8cff);
                font-size: 0.86rem;
            }

            .designer-heading span {
                overflow: hidden;
                color: var(--secondary-text-color, #666);
                font-size: 0.73rem;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .designer-card-settings {
                display: inline-flex;
                align-items: center;
                flex-shrink: 0;
                gap: 7px;
                min-height: 32px;
                padding: 0 12px;
                border: 1px solid transparent;
                border-radius: 7px;
                background: transparent;
                color: var(--secondary-text-color, #666);
                font: inherit;
                font-size: 0.8rem;
                font-weight: 700;
                cursor: pointer;
            }

            .designer-card-settings ha-icon {
                --mdc-icon-size: 17px;
            }

            .designer-card-settings:hover,
            .designer-card-settings:focus-visible {
                color: var(--primary-text-color, #212121);
                outline: none;
            }

            .designer-card-settings.active {
                border-color: var(--primary-color, #3b82f6);
                color: var(--primary-text-color, #212121);
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent);
            }

            .designer-toolbar-actions {
                display: flex;
                align-items: center;
                flex-shrink: 0;
                gap: 8px;
            }

            .designer-modes {
                display: flex;
                flex-shrink: 0;
                gap: 5px;
                padding: 3px;
                border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                border-radius: 8px;
                background: var(--secondary-background-color, #f2f2f2);
            }

            .designer-mode {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                min-height: 34px;
                padding: 0 14px;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #666);
                font: inherit;
                font-size: 0.82rem;
                font-weight: 600;
                cursor: pointer;
            }

            .designer-mode ha-icon {
                --mdc-icon-size: 18px;
            }

            .designer-mode:hover,
            .designer-mode:focus-visible {
                color: var(--primary-text-color, #212121);
                outline: none;
            }

            .designer-mode.active {
                background: var(--card-background-color, #fff);
                color: var(--primary-text-color, #212121);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.32);
            }

            .designer-done,
            .designer-launch {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 7px;
                border: 0;
                background: var(--primary-color, #03a9f4);
                color: var(--text-primary-color, #fff);
                font: inherit;
                font-size: 0.82rem;
                font-weight: 700;
                cursor: pointer;
            }

            .designer-done {
                min-height: 34px;
                padding: 0 15px;
                border-radius: 7px;
            }

            .designer-launch {
                position: absolute;
                top: 10px;
                /* Leave room for HA's edit-mode overflow control. */
                right: 44px;
                z-index: 7;
                min-height: 36px;
                padding: 0 14px;
                border-radius: 18px;
                box-shadow: 0 3px 12px rgba(0, 0, 0, 0.42);
            }

            .designer-launch ha-icon {
                --mdc-icon-size: 18px;
            }

            .designer-done:hover,
            .designer-done:focus-visible,
            .designer-launch:hover,
            .designer-launch:focus-visible {
                filter: brightness(1.12);
                outline: 2px solid var(--primary-color, #03a9f4);
                outline-offset: 1px;
            }

            wcc-zone-overlay.inplace {
                position: absolute;
                top: 44px;
                left: 0;
                right: 400px;
                bottom: 28px;
                height: auto;
                z-index: 6;
            }

            wcc-layout-inspector.inplace-inspector {
                position: absolute;
                top: 44px;
                right: 0;
                bottom: 28px;
                height: auto;
                z-index: 8;
                width: 400px;
                overflow: hidden;
                border-left: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
            }

            .designer-statusbar {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                height: 28px;
                padding: 0 12px;
                box-sizing: border-box;
                border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                background: var(--card-background-color, #fff);
                color: var(--secondary-text-color, #666);
                font-size: 0.68rem;
            }

            .layout-save-status {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                min-width: 0;
                padding: 0;
                border: 0;
                background: transparent;
                color: inherit;
                font: inherit;
                pointer-events: none;
            }

            .layout-save-status ha-icon {
                --mdc-icon-size: 14px;
                color: var(--primary-color, #4f8cff);
            }

            .layout-save-status.saved ha-icon,
            .layout-save-status.idle ha-icon {
                color: var(--success-color, #2e7d32);
            }

            .layout-save-status.pending ha-icon {
                color: var(--warning-color, #9c6500);
            }

            .layout-save-status.error {
                color: var(--error-color, #ef5350);
                pointer-events: auto;
                cursor: pointer;
            }

            .layout-save-status.error ha-icon {
                color: inherit;
            }

            .designer-status-hint {
                overflow: hidden;
                text-align: right;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            @media (max-width: 1050px) {
                wcc-zone-overlay.inplace {
                    right: 340px;
                }

                wcc-layout-inspector.inplace-inspector {
                    width: 340px;
                }
            }

            @media (max-width: 760px) {
                .designer-heading span,
                .designer-status-hint {
                    display: none;
                }

                wcc-zone-overlay.inplace {
                    right: 0;
                }

                wcc-layout-inspector.inplace-inspector {
                    top: auto;
                    left: 8px;
                    right: 8px;
                    bottom: 36px;
                    width: auto;
                    height: min(52%, 560px);
                    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
                    border-radius: 12px 12px 0 0;
                    box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.42);
                }
            }
        `}render(){var e,t,o;const i=this.preview&&!this.hasAttribute("dialog-preview")&&!!this.hass,a=i&&this.designerOpen,n={idle:{icon:"mdi:check-circle-outline",label:this.t("ui.saved","Saved")},pending:{icon:"mdi:alert-outline",label:this.t("designer.unsaved","Unsaved changes")},saving:{icon:"mdi:content-save-sync-outline",label:this.t("designer.saving","Saving…")},saved:{icon:"mdi:check-circle",label:this.t("ui.saved","Saved")},error:{icon:"mdi:alert-circle-outline",label:null!==(e=this.layoutSaveError)&&void 0!==e?e:this.t("designer.save_failed","Save failed — click to retry")}}[this.layoutSaveStatus];return U`
            <ha-card class=${!0===(null===(t=this.configV3.background)||void 0===t?void 0:t.transparent)?"transparent-background":""}
                     style="color: ${vr(null!==(o=this.computeAppearance().fontColor)&&void 0!==o?o:"#FFFFFF")};">
                ${this.backgroundImageComponent}
                ${this.layoutElement}
                ${i&&this.designerRequiresExplicitOpen&&!this.designerOpen?U`
                    <button class="designer-launch"
                            type="button"
                            @click=${e=>this.openFullscreenDesigner(e)}>
                        <ha-icon icon="mdi:tune-variant"></ha-icon>
                        ${this.t("designer.configure_card","Configure card")}
                    </button>
                `:""}
                ${a?U`
                    <div class="designer-toolbar">
                        <div class="designer-heading">
                            <button class="designer-card-settings ${this.selectedWidget||this.selectedZone?"":"active"}"
                                    type="button"
                                    aria-pressed=${this.selectedWidget||this.selectedZone?"false":"true"}
                                    @click=${this.openCardSettings}>
                                <ha-icon icon="mdi:theme-light-dark"></ha-icon>
                                ${this.t("designer.card_settings","Card settings")}
                            </button>
                            <span>${this.t("designer.drag_hint","Drag a widget by its handle · click it to select and configure it")}</span>
                        </div>
                        <div class="designer-toolbar-actions">
                            <div class="designer-modes" role="group" aria-label=${this.t("designer.mode","Editor mode")}>
                                <button class="designer-mode ${this.designerPreview?"":"active"}"
                                        type="button"
                                        aria-pressed=${this.designerPreview?"false":"true"}
                                        @click=${()=>{this.designerPreview=!1}}>
                                    <ha-icon icon="mdi:layers-outline"></ha-icon>
                                    ${this.t("designer.designer","Designer")}
                                </button>
                                <button class="designer-mode ${this.designerPreview?"active":""}"
                                        type="button"
                                        aria-pressed=${this.designerPreview?"true":"false"}
                                        @click=${()=>{this.designerPreview=!0}}>
                                    <ha-icon icon="mdi:eye-outline"></ha-icon>
                                    ${this.t("designer.preview","Preview")}
                                </button>
                            </div>
                            ${this.hasAttribute("designer-fullscreen")?U`
                                <button class="designer-done"
                                        type="button"
                                        @click=${e=>this.closeFullscreenDesigner(e)}>
                                    ${this.t("ui.done","Done")}
                                </button>
                            `:""}
                        </div>
                    </div>
                    ${this.designerPreview?"":U`
                        <wcc-zone-overlay class="inplace"
                                .hass=${this.hass}
                                .layout=${this.configV3.layout}
                                .selectedWidget=${this.selectedWidget}
                                .selectedZone=${this.selectedZone}
                                selectable
                                @layout-changed=${this.onInplaceLayoutChanged}
                                @wcc-widget-selected=${this.onInplaceWidgetSelected}
                                @wcc-zone-selected=${this.onInplaceZoneSelected}
                        ></wcc-zone-overlay>
                        <wcc-layout-inspector class="inplace-inspector"
                                .hass=${this.hass}
                                .config=${this.configV3}
                                .layout=${this.configV3.layout}
                                .editorSessionKey=${this.designerSessionKey}
                                .selectedWidget=${this.selectedWidget}
                                .selectedZone=${this.selectedZone}
                                @wcc-widget-config-changed=${this.onInplaceWidgetConfigChanged}
                                @wcc-zone-settings-changed=${this.onInplaceZoneSettingsChanged}
                                @wcc-card-config-changed=${this.onInplaceCardConfigChanged}
                        ></wcc-layout-inspector>
                    `}
                    <div class="designer-statusbar">
                        <button class="layout-save-status ${this.layoutSaveStatus}"
                                ?disabled=${"error"!==this.layoutSaveStatus}
                                title=${"error"===this.layoutSaveStatus?this.t("designer.retry_save","Retry save"):n.label}
                                @click=${()=>{this.flushLayoutAutosave("commit")}}>
                            <ha-icon .icon=${n.icon}></ha-icon>
                            ${n.label}
                        </button>
                        <span class="designer-status-hint">
                            ${this.hasAttribute("designer-fullscreen")?this.t("designer.autosave_hint_local","Changes are prepared continuously · save and close this editor with Done"):this.t("designer.autosave_hint","Changes are prepared continuously · save and finish the dashboard with Done")}
                        </span>
                    </div>
                `:""}
            </ha-card>
        `}};al([me({type:Object})],rl.prototype,"hass",void 0),al([me({type:Object})],rl.prototype,"config",void 0),al([me({attribute:!1})],rl.prototype,"preview",void 0),al([ve()],rl.prototype,"selectedWidget",void 0),al([ve()],rl.prototype,"selectedZone",void 0),al([ve()],rl.prototype,"designerPreview",void 0),al([ve()],rl.prototype,"designerOpen",void 0),al([ve()],rl.prototype,"designerRequiresExplicitOpen",void 0),al([ve()],rl.prototype,"layoutSaveStatus",void 0),al([ve()],rl.prototype,"layoutSaveError",void 0),rl=al([ue("wall-clock-card")],rl),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
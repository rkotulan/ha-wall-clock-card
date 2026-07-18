/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;class n{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}}const s=e=>new n("string"==typeof e?e:e+"",void 0,i),a=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(o,e,i)},r=(i,o)=>{if(t)i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=t.cssText,i.appendChild(o)}},l=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return s(t)})(e):e,{is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:g,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",y=m.reactiveElementPolyfillSupport,w=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},_=(e,t)=>!c(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&h(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const s=o?.call(this);n?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...g(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=o;const s=n.fromAttribute(t,e.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const o=this.constructor,n=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??_)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==n||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}var S;C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[w("elementProperties")]=new Map,C[w("finalized")]=new Map,y?.({ReactiveElement:C}),(m.reactiveElementVersions??=[]).push("2.1.1");const k=window,x=k.trustedTypes,I=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",z=`lit$${(Math.random()+"").slice(9)}$`,O="?"+z,D=`<${O}>`,F=document,N=()=>F.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,E=Array.isArray,T="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,U=/>/g,B=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,H=/"/g,L=/^(?:script|style|textarea|title)$/i,W=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=W(1),J=(W(2),Symbol.for("lit-noChange")),K=Symbol.for("lit-nothing"),Z=new WeakMap,q=F.createTreeWalker(F,129,null,!1);function G(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==I?I.createHTML(t):t}class Y{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,s=0;const a=e.length-1,r=this.parts,[l,c]=((e,t)=>{const i=e.length-1,o=[];let n,s=2===t?"<svg>":"",a=M;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===M?"!--"===l[1]?a=R:void 0!==l[1]?a=U:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=B):void 0!==l[3]&&(a=B):a===B?">"===l[0]?(a=null!=n?n:M,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?B:'"'===l[3]?H:j):a===H||a===j?a=B:a===R||a===U?a=M:(a=B,n=void 0);const d=a===B&&e[t+1].startsWith("/>")?" ":"";s+=a===M?i+D:c>=0?(o.push(r),i.slice(0,c)+A+i.slice(c)+z+d):i+z+(-2===c?(o.push(void 0),t):d)}return[G(e,s+(e[i]||"<?>")+(2===t?"</svg>":"")),o]})(e,t);if(this.el=Y.createElement(l,i),q.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=q.nextNode())&&r.length<a;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(A)||t.startsWith(z)){const i=c[s++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+A).split(z),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?ie:"?"===t[1]?ne:"@"===t[1]?se:te})}else r.push({type:6,index:n})}for(const t of e)o.removeAttribute(t)}if(L.test(o.tagName)){const e=o.textContent.split(z),t=e.length-1;if(t>0){o.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],N()),q.nextNode(),r.push({type:2,index:++n});o.append(e[t],N())}}}else if(8===o.nodeType)if(o.data===O)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(z,e+1));)r.push({type:7,index:n}),e+=z.length-1}n++}}static createElement(e,t){const i=F.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,o){var n,s,a,r;if(t===J)return t;let l=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const c=P(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,o)),void 0!==o?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(t=Q(e,l._$AS(e,t.values),l,o)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:F).importNode(i,!0);q.currentNode=n;let s=q.nextNode(),a=0,r=0,l=o[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new ee(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new ae(s,this,e)),this._$AV.push(t),l=o[++r]}a!==(null==l?void 0:l.index)&&(s=q.nextNode(),a++)}return q.currentNode=F,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{constructor(e,t,i,o){var n;this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),P(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==J&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>E(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==K&&P(this._$AH)?this._$AA.nextSibling.data=e:this.$(F.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,n="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=Y.createElement(G(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new X(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new Y(e)),t}T(e){E(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new ee(this.k(N()),this.k(N()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class te{constructor(e,t,i,o,n){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const n=this.strings;let s=!1;if(void 0===n)e=Q(this,e,t,0),s=!P(e)||e!==this._$AH&&e!==J,s&&(this._$AH=e);else{const o=e;let a,r;for(e=n[0],a=0;a<n.length-1;a++)r=Q(this,o[i+a],t,a),r===J&&(r=this._$AH[a]),s||(s=!P(r)||r!==this._$AH[a]),r===K?e=K:e!==K&&(e+=(null!=r?r:"")+n[a+1]),this._$AH[a]=r}s&&!o&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}const oe=x?x.emptyScript:"";class ne extends te{constructor(){super(...arguments),this.type=4}j(e){e&&e!==K?this.element.setAttribute(this.name,oe):this.element.removeAttribute(this.name)}}class se extends te{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Q(this,e,t,0))&&void 0!==i?i:K)===J)return;const o=this._$AH,n=e===K&&o!==K||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==K&&(o===K||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const re=k.litHtmlPolyfillSupport;null==re||re(Y,ee),(null!==(S=k.litHtmlVersions)&&void 0!==S?S:k.litHtmlVersions=[]).push("2.8.0");const le=globalThis;class ce extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let a=s._$litPart$;if(void 0===a){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=a=new ee(t.insertBefore(N(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const he=le.litElementPolyfillSupport;he?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.1");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ge={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_},ue=(e=ge,t,i)=>{const{kind:o,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,n,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];t.call(this,i),this.requestUpdate(o,n,e)}}throw Error("Unsupported decorator location: "+o)};function pe(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}var me;!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR",e[e.NONE=4]="NONE"}(me||(me={}));const fe={level:me.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let ve={...fe};const ye=[];function we(e){const t=ve.level;ve={...fe,...e},t!==ve.level&&console.log(`[LOGGER] Log level changed from ${me[t]} to ${me[ve.level]}`)}function be(e,t,i,...o){var n;if(e<ve.level)return;const s=function(e,t,i){const{prefix:o,enableTimestamps:n,enableSourceTracking:s}=ve;let a="";return n&&(a+=`[${(new Date).toISOString()}] `),a+=`[${me[e]}] `,o&&(a+=`[${o}] `),t&&s&&(a+=`[${t}] `),a+=i,a}(e,t,i);if(ve.logToConsole)switch(e){case me.DEBUG:console.debug(s,...o);break;case me.INFO:console.log(s,...o);break;case me.WARN:console.warn(s,...o);break;case me.ERROR:console.error(s,...o)}if(ve.logToStorage){let e=s;if(o.length>0)try{e+=" "+o.map(e=>"object"==typeof e?JSON.stringify(e):String(e)).join(" ")}catch(t){e+=" [Arguments could not be stringified]"}ye.push(e);const t=null!==(n=ve.maxStoredLogs)&&void 0!==n?n:100;ye.length>t&&ye.splice(0,ye.length-t)}}function _e(e){return{debug:(t,...i)=>be(me.DEBUG,e,t,...i),info:(t,...i)=>be(me.INFO,e,t,...i),warn:(t,...i)=>be(me.WARN,e,t,...i),error:(t,...i)=>be(me.ERROR,e,t,...i),withSource:e=>_e(e)}}function $e(e){switch(e.toLowerCase()){case"debug":return me.DEBUG;case"info":return me.INFO;case"warn":default:return me.WARN;case"error":return me.ERROR;case"none":return me.NONE}}const Ce=_e("wall-clock");class Se{static getInstance(){return Se.instance||(Se.instance=new Se),Se.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&Ce.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}registerAll(e){e.forEach(e=>this.register(e))}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}var ke,xe;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(ke||(ke={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(xe||(xe={}));const Ie=[xe.All,xe.ClearSky,xe.Clouds,xe.Rain,xe.Snow,xe.Mist],Ae=[ke.Unspecified,ke.SunriseSunset,ke.Day,ke.Night];function ze(e,t){if(!e)return;const i=e.toLowerCase();for(const e of t)if(i.includes(e.toLowerCase().replace(" ","-")))return e}class Oe{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return _e(`${this.id}-source`)}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}async fetchImagesAsync(e,t,i){return this.getLogger().debug(`Fetching images with weather: ${t}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(e,t,i)}async getNextImageUrlAsync(e,t,i){var o;this.getLogger().debug(`GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=t,this.lastTimeOfDay=i);const n=`${t}_${i}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(n)||0===(null===(o=this.imageUrlCache.get(n))||void 0===o?void 0:o.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const o=[...await this.fetchImagesAsync(e,t,i)];this.shuffleArray(o),this.imageUrlCache.set(n,o),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${o.length} images for weather: ${t}, timeOfDay: ${i}`)}const s=this.imageUrlCache.get(n)||[];if(0===s.length)return this.getLogger().warn(`No images available for weather: ${t}, timeOfDay: ${i}`),"";const a=s[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%s.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${a}`),a}filterImagesByWeatherAndTime(e,t,i){if(this.getLogger().debug(`Current time of day: ${i}`),this.getLogger().debug(`Current weather condition: ${t}`),0===e.length)return[];let o=[];return o=e.filter(e=>(e.weather===t||e.weather===xe.All||t===xe.All)&&e.timeOfDay===i),0===o.length&&(o=e.filter(e=>(e.weather===t||e.weather===xe.All||t===xe.All)&&e.timeOfDay===ke.Unspecified)),0===o.length&&(o=e.filter(e=>e.timeOfDay===i)),0===o.length&&(o=e.filter(e=>e.timeOfDay===ke.Unspecified)),o.length>0?(this.getLogger().debug(`Found ${o.length} images matching current conditions`),o.map(e=>e.url)):(this.getLogger().info("No matching images found, returning all images"),e.map(e=>e.url))}convertUrlsToBackgroundImages(e){return this.getLogger().debug(`Converting ${e.length} URLs to BackgroundImage objects`),e.map(e=>({url:e,weather:ze(e,Ie)||xe.All,timeOfDay:ze(e,Ae)||ke.Unspecified}))}}const De=new class extends Oe{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=_e("local-source")}async fetchImagesInternalAsync(e,t,i){return e.backgroundImages&&e.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${e.backgroundImages.length} images`),this.logger.debug(`First image URL: ${e.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(e.backgroundImages,t,i)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Fe=new class extends Oe{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=_e("picsum-source")}async fetchImagesInternalAsync(e,t,i){const o=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${o}`),[o]}getDefaultConfig(){return{}}},Ne=new class extends Oe{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=_e("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(e,t,i){const o=e.count||5;let n=e.category||"";const s=e.apiKey||"";return this.logger.debug(`Current weather: ${t}, time of day: ${i}`),this.logger.debug(`Using category with weather and time: ${n}`),s?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(s,n,o,t,i,e)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(e,t,i,o,n,s){const a=[],r=(null==s?void 0:s.contentFilter)||"high";let l="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(l=e[0]),e.length>1&&(l+=` ${e.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${e.join(", ")}`)}const c=o.toLowerCase();l+=` ${c}`,"sunrise-sunset"===n?l+=" sunrise sunset dawn dusk":"day"===n?l+=" daylight midday day":"night"===n&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${n}`);try{let t="https://api.unsplash.com/photos/random?";const o=new URLSearchParams({client_id:e,count:i.toString(),orientation:"landscape",content_filter:r});l&&o.append("query",l);const n=new URLSearchParams(o);n.delete("client_id"),n.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${n.toString()}`),t+=o.toString();const s=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${s}`);const c=await fetch(t);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();this.logger.debug(`API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";a.push(t)}),this.logger.debug(`Fetched ${a.length} images from Unsplash API`)}catch(e){throw this.logger.error("Error fetching from Unsplash API:",e),e}return a}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Pe=new class extends Oe{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=_e("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}setHass(e){this.hass=e}async checkEntityAsync(e){try{if(!this.hass)return void this.logger.warn("Could not get Home Assistant instance");const t=this.hass.states[e];if(!t)return void this.logger.warn(`Entity ${e} not found`);this.updateCacheFromEntity(t),this.entityId=e,this.logger.debug(`Checked entity ${e}`)}catch(e){this.logger.error("Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)&&t.every(e=>"string"==typeof e)?(this.cachedImages=this.convertUrlsToBackgroundImages(t),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${t.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(e,t,i){const o=e.entity;if(!o)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(o);const n=Date.now();if(this.cachedImages.length>0&&n-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t,i);try{if(!this.hass)return this.logger.warn("Could not get Home Assistant instance"),[];const e=this.hass.states[o];return e?(this.updateCacheFromEntity(e),this.filterImagesByWeatherAndTime(this.cachedImages,t,i)):(this.logger.warn(`Sensor ${o} not found`),[])}catch(e){return this.logger.error("Error fetching images from sensor:",e),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Ee=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=_e("null-source")}async fetchImagesAsync(e,t,i){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(e,t,i){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Te={local:De,picsum:Fe,unsplash:Ne,sensor:Pe};class Me{constructor(e){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=_e("background-image-manager"),this.hass=e}setHass(e){var t,i;this.hass=e,null===(i=null===(t=this.imageSource)||void 0===t?void 0:t.setHass)||void 0===i||i.call(t,e)}initialize(e={}){var t,i;const o=e.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${o}`),"none"===o)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var n;if(this.imageSourceId=o||"picsum",this.imageSource=(n=this.imageSourceId,Te[n]||Ee),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;null===(i=(t=this.imageSource).setHass)||void 0===i||i.call(t,this.hass);const s=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...s,...e},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(e,t){var i;if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${e}, time of day: ${t}`);let o=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,e,t);if(o&&o.startsWith("media-source://"))try{if(null===(i=this.hass)||void 0===i?void 0:i.callWS){const e=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:o});o=e&&e.url?e.url:o}else this.logger.warn("Home Assistant instance not available to resolve media-source URL; using original URL")}catch(e){this.logger.error("Failed to resolve media-source URL",e)}return o?(this.logger.debug(`Got image URL: ${o}`),o):(this.logger.warn("No image URL returned from source"),"")}catch(e){return this.logger.error("Error getting next image URL:",e),""}}getImageSourceId(){return this.imageSourceId}}Se.getInstance().registerAll([Fe,De,Ne,Pe]);const Re=[{code:"bg",label:"Bulgarian (Български)",locale:"bg-BG",translations:JSON.parse('{"common":{"title":"Времето","description":"Текущо време и прогноза","settings":"Настройки на времето"},"conditions":{"all":"Всички метеорологични условия","clouds":"Облачно","clear_sky":"Ясно","few_clouds":"Частична облачност","scattered_clouds":"Разкъсана облачност","broken_clouds":"Значителна облачност","overcast_clouds":"Плътна облачност","shower_rain":"Превалявания от дъжд","rain":"Дъжд","thunderstorm":"Гръмотевична буря","snow":"Сняг","light_snow":"Слаб сняг","mist":"Мъгла","light_rain":"Слаб дъжд","moderate_rain":"Умерен дъжд","heavy_intensity_rain":"Силен дъжд","sunny":"Слънчево","clear_night":"Ясна нощ","partlycloudy":"Предимно облачно","cloudy":"Облачно","rainy":"Дъждовно","snowy":"Снежно","fog":"Мъгла","hail":"Градушка","windy":"Ветровито"},"forecast":{"title":"Прогноза","today":"Днес","tomorrow":"Утре","next_days":"Следващите дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","light_snow":"Slabé sněžení","mist":"Mlha","light_rain":"Slabý déšť","moderate_rain":"Mírný déšť","heavy_intensity_rain":"Silný déšť","sunny":"Slunečno","clear_night":"Jasná noc","partlycloudy":"Polojasno","cloudy":"Oblačno","rainy":"Deštivo","snowy":"Sněžení","fog":"Mlha","hail":"Krupobití","windy":"Větrno"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","light_snow":"Let sne","mist":"Tåge","light_rain":"Let regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn","sunny":"Solrigt","clear_night":"Klar nat","partlycloudy":"Delvist skyet","cloudy":"Overskyet","rainy":"Regnfuldt","snowy":"Snevejr","fog":"Tåge","hail":"Hagl","windy":"Blæsende"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","light_snow":"Leichter Schneefall","mist":"Nebel","light_rain":"Leichter Regen","moderate_rain":"Mäßiger Regen","heavy_intensity_rain":"Starker Regen","sunny":"Sonnig","clear_night":"Klare Nacht","partlycloudy":"Teilweise bewölkt","cloudy":"Bewölkt","rainy":"Regnerisch","snowy":"Verschneit","fog":"Nebel","hail":"Hagel","windy":"Windig"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","light_snow":"Ελαφριά χιονόπτωση","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή","moderate_rain":"Μέτρια βροχή","heavy_intensity_rain":"Έντονη βροχή","sunny":"Ηλιοφάνεια","clear_night":"Αίθριος νυχτερινός ουρανός","partlycloudy":"Μερικώς συννεφιασμένος","cloudy":"Συννεφιά","rainy":"Βροχερός","snowy":"Χιονισμένος","fog":"Ομίχλη","hail":"Χαλάζι","windy":"Ανεμώδης"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","light_snow":"Light snow","mist":"Mist","light_rain":"Light rain","moderate_rain":"Moderate rain","heavy_intensity_rain":"Heavy rain","sunny":"Sunny","clear_night":"Clear night","partlycloudy":"Partly cloudy","cloudy":"Cloudy","rainy":"Rainy","snowy":"Snowy","fog":"Fog","hail":"Hail","windy":"Windy"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","light_snow":"Nieve ligera","mist":"Niebla","light_rain":"Lluvia ligera","moderate_rain":"Lluvia moderada","heavy_intensity_rain":"Lluvia intensa","sunny":"Soleado","clear_night":"Noche despejada","partlycloudy":"Parcialmente nublado","cloudy":"Nublado","rainy":"Lluvioso","snowy":"Nevado","fog":"Niebla","hail":"Granizo","windy":"Ventoso"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","light_snow":"Kevyt lumisade","mist":"Sumu","light_rain":"Kevyt sade","moderate_rain":"Kohtalainen sade","heavy_intensity_rain":"Voimakas sade","sunny":"Aurinkoinen","clear_night":"Selkeä yö","partlycloudy":"Puolipilvinen","cloudy":"Pilvinen","rainy":"Sateinen","snowy":"Luminen","fog":"Sumu","hail":"Rae","windy":"Tuulinen"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","light_snow":"Légère neige","mist":"Brouillard","light_rain":"Pluie légère","moderate_rain":"Pluie modérée","heavy_intensity_rain":"Pluie forte","sunny":"Ensoleillé","clear_night":"Nuit claire","partlycloudy":"Partiellement nuageux","cloudy":"Nuageux","rainy":"Pluvieux","snowy":"Neigeux","fog":"Brouillard","hail":"Grêle","windy":"Venteux"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","light_snow":"Gyenge havazás","mist":"Köd","light_rain":"Gyenge eső","moderate_rain":"Mérsékelt eső","heavy_intensity_rain":"Erős eső","sunny":"Napos","clear_night":"Tiszta éjszaka","partlycloudy":"Részben felhős","cloudy":"Felhős","rainy":"Esős","snowy":"Havas","fog":"Köd","hail":"Jégeső","windy":"Szeles"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","light_snow":"Neve leggera","mist":"Nebbia","light_rain":"Pioggia leggera","moderate_rain":"Pioggia moderata","heavy_intensity_rain":"Pioggia intensa","sunny":"Soleggiato","clear_night":"Notte serena","partlycloudy":"Parzialmente nuvoloso","cloudy":"Nuvoloso","rainy":"Piovoso","snowy":"Nevoso","fog":"Nebbia","hail":"Grandine","windy":"Ventoso"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","light_snow":"Lichte sneeuw","mist":"Mist","light_rain":"Lichte regen","moderate_rain":"Matige regen","heavy_intensity_rain":"Zware regen","sunny":"Zonnig","clear_night":"Heldere nacht","partlycloudy":"Half bewolkt","cloudy":"Bewolkt","rainy":"Regenachtig","snowy":"Sneeuwachtig","fog":"Mist","hail":"Hagel","windy":"Winderig"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","light_snow":"Lett snø","mist":"Tåke","light_rain":"Lett regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn","sunny":"Solfylt","clear_night":"Klar natt","partlycloudy":"Delvis skyet","cloudy":"Overskyet","rainy":"Regnfullt","snowy":"Snøfylt","fog":"Tåke","hail":"Hagl","windy":"Vindfullt"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","light_snow":"Lekki śnieg","mist":"Mgła","light_rain":"Lekki deszcz","moderate_rain":"Umiarkowany deszcz","heavy_intensity_rain":"Intensywny deszcz","sunny":"Słonecznie","clear_night":"Pogodna noc","partlycloudy":"Częściowe zachmurzenie","cloudy":"Pochmurno","rainy":"Deszczowo","snowy":"Śnieżnie","fog":"Mgła","hail":"Grad","windy":"Wietrznie"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","light_snow":"Neve leve","mist":"Névoa","light_rain":"Chuva fraca","moderate_rain":"Chuva moderada","heavy_intensity_rain":"Chuva forte","sunny":"Ensolarado","clear_night":"Noite limpa","partlycloudy":"Parcialmente nublado","cloudy":"Nublado","rainy":"Chuvoso","snowy":"Nevado","fog":"Nevoeiro","hail":"Granizo","windy":"Ventoso"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","light_snow":"Ninsoare ușoară","mist":"Ceață","light_rain":"Ploaie ușoară","moderate_rain":"Ploaie moderată","heavy_intensity_rain":"Ploaie puternică","sunny":"Însorit","clear_night":"Noapte senină","partlycloudy":"Parțial înnorat","cloudy":"Înnorat","rainy":"Ploios","snowy":"Înzăpezit","fog":"Ceață","hail":"Grindină","windy":"Vântos"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","light_snow":"Небольшой снег","mist":"Туман","light_rain":"Небольшой дождь","moderate_rain":"Умеренный дождь","heavy_intensity_rain":"Сильный дождь","sunny":"Солнечно","clear_night":"Ясная ночь","partlycloudy":"Переменная облачность","cloudy":"Облачно","rainy":"Дождливо","snowy":"Снежно","fog":"Туман","hail":"Град","windy":"Ветрено"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","light_snow":"Slabé sneženie","mist":"Hmla","light_rain":"Slabý dážď","moderate_rain":"Mierny dážď","heavy_intensity_rain":"Silný dážď","sunny":"Slnečno","clear_night":"Jasná noc","partlycloudy":"Polojasno","cloudy":"Oblačno","rainy":"Daždivo","snowy":"Sneženie","fog":"Hmla","hail":"Krupobitie","windy":"Veterno"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","light_snow":"Lätt snöfall","mist":"Dimma","light_rain":"Lätt regn","moderate_rain":"Måttligt regn","heavy_intensity_rain":"Kraftigt regn","sunny":"Soligt","clear_night":"Klar natt","partlycloudy":"Halvklart","cloudy":"Molnigt","rainy":"Regnigt","snowy":"Snöigt","fog":"Dimma","hail":"Hagel","windy":"Blåsigt"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Ue=Object.fromEntries(Re.map(e=>[e.code,e.translations]));let Be={};function je(){return Re.map(e=>e.code)}function He(e){const t=Re.find(t=>t.code===e);return(null==t?void 0:t.locale)||"en-US"}function Le(e,t,i={},o){const n={...i};if(n.custom)return function(e,t,i,o){const n=He(t),s={EEEE:"weekday",EEE:"weekday",MMMM:"month",MMM:"month",MM:"month",M:"month",dd:"day",d:"day",yyyy:"year",yy:"year",HH:"hour",H:"hour",mm:"minute",m:"minute",ss:"second",s:"second"},a={EEEE:new Intl.DateTimeFormat(n,{weekday:"long",timeZone:o}),EEE:new Intl.DateTimeFormat(n,{weekday:"short",timeZone:o}),MMMM:new Intl.DateTimeFormat(n,{month:"long",timeZone:o}),MMM:new Intl.DateTimeFormat(n,{month:"short",timeZone:o}),MM:new Intl.DateTimeFormat(n,{month:"2-digit",timeZone:o}),M:new Intl.DateTimeFormat(n,{month:"numeric",timeZone:o}),dd:new Intl.DateTimeFormat(n,{day:"2-digit",timeZone:o}),d:new Intl.DateTimeFormat(n,{day:"numeric",timeZone:o}),yyyy:new Intl.DateTimeFormat(n,{year:"numeric",timeZone:o}),yy:new Intl.DateTimeFormat(n,{year:"2-digit",timeZone:o}),HH:new Intl.DateTimeFormat(n,{hour:"2-digit",hour12:!1,timeZone:o}),H:new Intl.DateTimeFormat(n,{hour:"numeric",hour12:!1,timeZone:o}),mm:new Intl.DateTimeFormat(n,{minute:"2-digit",timeZone:o}),m:new Intl.DateTimeFormat(n,{minute:"numeric",timeZone:o}),ss:new Intl.DateTimeFormat(n,{second:"2-digit",timeZone:o}),s:new Intl.DateTimeFormat(n,{second:"numeric",timeZone:o})};return i.replace(/EEEE|EEE|MMMM|MMM|MM|M|dd|d|yyyy|yy|HH|H|mm|m|ss|s/g,t=>{var i;const o=s[t];return(null===(i=a[t].formatToParts(e).find(e=>e.type===o))||void 0===i?void 0:i.value)||""})}(e,t,n.custom,o);if(o&&(n.timeZone=o),"hidden"===n.weekday&&(n.weekday=void 0),"hidden"===n.year&&(n.year=void 0),"hidden"===n.month&&(n.month=void 0),"hidden"===n.day&&(n.day=void 0),void 0===n.weekday&&void 0===n.year&&void 0===n.month&&void 0===n.day)return"";const s=He(t);if("short"===n.month){const t=new Intl.DateTimeFormat(s,{month:"short",timeZone:o}).format(e),i={...n};delete i.month;let a=e.toLocaleDateString(s,i);return"2-digit"===n.day?(a=a.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${t}`),a.includes(t)||(a=`${a} ${t}`)):a=e.toLocaleDateString(s,n),a}return e.toLocaleDateString(s,n)}class We{constructor(e,t){this._readyResolve=null,this.host=e,this.logger=_e(t),e.addController(this),this.ready=new Promise(e=>{this._readyResolve=e})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(e=>{this._readyResolve=e}),this.onHostDisconnected()}}function Ve(e,t){const i=e;return i.shadowRoot?Array.from(i.shadowRoot.querySelectorAll(t)):[]}class Je{constructor(){this.subscribers=new Map}static getInstance(){return Je.instance||(Je.instance=new Je),Je.instance}subscribe(e,t){this.subscribers.has(e)||this.subscribers.set(e,[]),this.subscribers.get(e).push(t)}unsubscribe(e,t){const i=this.subscribers.get(e);i&&this.subscribers.set(e,i.filter(e=>e!==t))}publish(e){const t=e.constructor;(this.subscribers.get(t)||[]).forEach(t=>t(e))}}class Ke{constructor(e){this.weather=e}}class Ze{constructor(){}}class qe{constructor(){}}class Ge{constructor(){}}class Ye{constructor(){}}var Qe,Xe,et;!function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(Qe||(Qe={})),function(e){e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night",e.Unspecified="unspecified"}(Xe||(Xe={})),function(e){e.Large="large",e.Medium="medium",e.Small="small",e.Custom="custom"}(et||(et={}));const tt={clockSize:{large:"18rem",medium:"16rem",small:"14rem"},dateSize:{large:"6rem",medium:"6rem",small:"4rem"},labelSize:{large:"1.8rem",medium:"1.2rem",small:"1.0rem"},valueSize:{large:"3rem",medium:"2rem",small:"1.5rem"},iconSize:{large:"84px",medium:"72px",small:"60px"},buttonSize:{large:"168px",medium:"144px",small:"120px"},forecastTempWidth:{large:"120px",medium:"80px",small:"70px"}};function it(e,t,i){if(e===et.Custom&&t)return t;const o=tt[i];return e===et.Large?o.large:e===et.Small?o.small:o.medium}class ot extends We{constructor(e,t={}){super(e,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=t}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(e){this.logger.debug("Updating ClockController config:",e),this.config={...this.config,...e};const t=new Date,i=this.config.language||"en",o=this.config.timeZone;this.updateTime(t,o),this.updateDate(t,i,o),this.host.requestUpdate()}update(){const e=new Date,t=this.config.language||"en",i=this.config.timeZone;this.updateTime(e,i),0!==e.getSeconds()&&""!==this._currentDate||this.updateDate(e,t,i),this.host.requestUpdate()}updateTime(e,t){var i,o,n,s,a,r,l,c;const h="hidden"===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.second),d=!0===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.hour12);let g,u,p;if(t){const i=new Intl.DateTimeFormat("en-US",{timeZone:t,hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(e);g=parseInt((null===(n=i.find(e=>"hour"===e.type))||void 0===n?void 0:n.value)||"0",10),u=parseInt((null===(s=i.find(e=>"minute"===e.type))||void 0===s?void 0:s.value)||"0",10),p=parseInt((null===(a=i.find(e=>"second"===e.type))||void 0===a?void 0:a.value)||"0",10)}else g=e.getHours(),u=e.getMinutes(),p=e.getSeconds();if(h&&(this._seconds=""),d){const e=g>=12;g%=12,g=g||12,this._ampm=e?"PM":"AM"}else this._ampm="";const m="numeric"!==(null===(r=this.config.timeFormat)||void 0===r?void 0:r.hour);this._hours=m?g.toString().padStart(2,"0"):g.toString();const f="numeric"!==(null===(l=this.config.timeFormat)||void 0===l?void 0:l.minute);if(this._minutes=f?u.toString().padStart(2,"0"):u.toString(),!h){const e="numeric"!==(null===(c=this.config.timeFormat)||void 0===c?void 0:c.second);this._seconds=e?p.toString().padStart(2,"0"):p.toString()}}updateDate(e,t,i){let o=Le(e,t,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},i);o=o.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=o}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var nt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let st=class extends ce{constructor(){super(),this.logger=_e("clock-component"),this.clockController=new ot(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(e){if(super.updated(e),e.has("timeFormat")||e.has("dateFormat")||e.has("language")||e.has("timeZone")||e.has("size")||e.has("clockSize")||e.has("dateSize")||e.has("clockTopMargin")){if(this.logger.debug("Clock properties changed, updating ClockController"),e.has("timeFormat")){const t=e.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.timeFormat)}`)}if(e.has("dateFormat")){const t=e.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.dateFormat)}`)}if(e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("clockSize")){const t=e.get("clockSize");this.logger.debug(`ClockSize changed: ${t} -> ${this.clockSize}`)}if(e.has("dateSize")){const t=e.get("dateSize");this.logger.debug(`DateSize changed: ${t} -> ${this.dateSize}`)}if(e.has("clockTopMargin")){const t=e.get("clockTopMargin");this.logger.debug(`ClockTopMargin changed: ${t} -> ${this.clockTopMargin}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}getClockSize(){return it(this.size,this.clockSize,"clockSize")}getDateSize(){return it(this.size,this.dateSize,"dateSize")}getClockTopMargin(){var e;return this.size===et.Custom&&null!==(e=this.clockTopMargin)&&void 0!==e?e:"0rem"}render(){var e,t;const i=this.getSeconds(),o=void 0!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second)&&"hidden"!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second),n=this.getClockSize(),s=this.getDateSize();return V`
            <div class="clock" style="color: ${this.fontColor}; font-size: ${n}; margin-top: ${this.getClockTopMargin()};">
                <span class="hours-minutes" style="color: ${this.fontColor};">${this.getHours()}:${this.getMinutes()}</span>
                ${o?V`
                    <div class="seconds-container">
                        <span class="seconds" style="color: ${this.fontColor};">${i}</span>
                        ${this.getAmPm()?V`<span class="ampm" style="color: ${this.fontColor};">${this.getAmPm()}</span>`:""}
                    </div>
                `:this.getAmPm()?V`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: ${this.fontColor};">${this.getAmPm()}</span>
                    </div>
                `:""}
            </div>
            <div class="date" style="color: ${this.fontColor}; font-size: ${s};">${this.getCurrentDate()}</div>
        `}};var at,rt,lt;function ct(){return(ct=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e}).apply(this,arguments)}st.styles=a`
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
    `,nt([pe({type:Object})],st.prototype,"timeFormat",void 0),nt([pe({type:Object})],st.prototype,"dateFormat",void 0),nt([pe({type:String})],st.prototype,"fontColor",void 0),nt([pe({type:String})],st.prototype,"language",void 0),nt([pe({type:String})],st.prototype,"timeZone",void 0),nt([pe({type:String})],st.prototype,"size",void 0),nt([pe({type:String})],st.prototype,"clockSize",void 0),nt([pe({type:String})],st.prototype,"dateSize",void 0),nt([pe({type:String})],st.prototype,"clockTopMargin",void 0),st=nt([de("ha-clock")],st),(lt=at||(at={})).language="language",lt.system="system",lt.comma_decimal="comma_decimal",lt.decimal_comma="decimal_comma",lt.space_comma="space_comma",lt.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(rt||(rt={}));var ht=function(e,t){var i=ct({maximumFractionDigits:2},t);if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var o=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=o,i.maximumFractionDigits=o}return i},dt=["closed","locked","off"],gt=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(e,t,i,o){o=o||{},i=null==i?{}:i;var n=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,e.dispatchEvent(n),n});new Set(["call-service","divider","section","weblink","cast","select"]);var ut=function(e){gt(window,"haptic",e)},pt=function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),gt(window,"location-changed",{replace:i})},mt=function(e,t,i,o){var n;"double_tap"===o&&i.double_tap_action?n=i.double_tap_action:"hold"===o&&i.hold_action?n=i.hold_action:"tap"===o&&i.tap_action&&(n=i.tap_action),function(e,t,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(ut("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&gt(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&pt(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var o,n=function(e){return e.substr(0,e.indexOf("."))}(t),s="group"===n?"homeassistant":n;switch(n){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}e.callService(s,o,{entity_id:t})})(e,t,dt.includes(e.states[t].state))}(t,i.entity),ut("success"));break;case"call-service":if(!o.service)return void ut("failure");var n=o.service.split(".",2);t.callService(n[0],n[1],o.service_data,o.target),ut("success");break;case"fire-dom-event":gt(e,"ll-custom",o)}}(e,t,i,n)};function ft(e){return void 0!==e&&"none"!==e.action}class vt extends We{constructor(e,t={}){super(e,"sensor-controller"),this._sensorValues=[],this.config={},this.config=t}onHostConnected(){}onHostDisconnected(){}updateConfig(e){this.logger.debug("Updating SensorController config:",e),this.config={...this.config,...e},this.hass&&this.updateSensorValues()}updateHass(e){this.hass=e,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=this.config.sensors.map(e=>this.processSensor(e)),this.host.requestUpdate()):this._sensorValues=[]}processSensor(e){var t,i,o;const n=e.entity,s=null===(t=this.hass)||void 0===t?void 0:t.states[n];return n&&s?{entity:n,label:null!==(i=e.label)&&void 0!==i?i:null===(o=s.attributes)||void 0===o?void 0:o.friendly_name,value:this.formatState(e,s)}:{entity:n,label:e.label,value:"unavailable"}}formatState(e,t){var i,o;const n=null===(i=this.hass)||void 0===i?void 0:i.formatEntityState;if(void 0===e.precision&&"function"==typeof n)try{return n.call(this.hass,t)}catch(e){this.logger.warn("formatEntityState failed, using fallback formatting",e)}let s=t.state;const a=this.getDisplayPrecision(e,t);return void 0===a||null===s||""===s||isNaN(Number(s))||(s=this.formatNumericValue(Number(s),a)),(null===(o=t.attributes)||void 0===o?void 0:o.unit_of_measurement)&&(s+=` ${t.attributes.unit_of_measurement}`),s}getDisplayPrecision(e,t){var i,o,n,s,a;if(void 0!==e.precision)return e.precision;const r=null===(n=null===(o=null===(i=this.hass)||void 0===i?void 0:i.entities)||void 0===o?void 0:o[e.entity])||void 0===n?void 0:n.display_precision;return void 0!==r?r:void 0!==(null===(s=null==t?void 0:t.attributes)||void 0===s?void 0:s.display_precision)?t.attributes.display_precision:void 0!==(null===(a=null==t?void 0:t.attributes)||void 0===a?void 0:a.suggested_display_precision)?t.attributes.suggested_display_precision:void 0}formatNumericValue(e,t){try{let i=function(e,t,i){var o=t?function(e){switch(e.number_format){case at.comma_decimal:return["en-US","en"];case at.decimal_comma:return["de","es","it"];case at.space_comma:return["fr","sv","cs"];case at.system:return;default:return e.language}}(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==at.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(o,ht(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,ht(e,i)).format(Number(e))}return"string"==typeof e?e:function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)}(e,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")}(e,this.hass.locale,{minimumFractionDigits:t,maximumFractionDigits:t});return t>0&&!i.includes(".")&&!i.includes(",")?e.toFixed(t):i}catch(i){return e.toFixed(t)}}get sensorValues(){return this._sensorValues}}var yt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let wt=class extends ce{constructor(){super(),this.logger=_e("sensor-component"),this.sensorController=new vt(this,{sensors:this.sensors})}get controller(){return this.sensorController}getLabelSize(){return it(this.size,this.labelSize,"labelSize")}getValueSize(){return it(this.size,this.valueSize,"valueSize")}updated(e){if(super.updated(e),e.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),e.has("hass")&&this.hass&&this.sensorController.updateHass(this.hass),e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}_openMoreInfo(e){e&&gt(this,"hass-more-info",{entityId:e})}render(){const e=this.sensorController.sensorValues;if(0===e.length)return V``;const t=this.getLabelSize(),i=this.getValueSize();return this.logger.debug(`Rendering sensors - LabelSize: ${t}, ValueSize: ${i}`),V`
            <div class="sensor-container" style="color: ${this.fontColor};">
                ${e.map(e=>V`
                    <div class="sensor-item"
                         role="button"
                         tabindex="0"
                         @click=${()=>this._openMoreInfo(e.entity)}
                         @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._openMoreInfo(e.entity))}}>
                        ${e.label?V`
                                <div class="sensor-label" style="color: ${this.fontColor}; font-size: ${t};">
                                    ${e.label}
                                </div>`:""}
                        <div class="sensor-value" style="color: ${this.fontColor}; font-size: ${i};">
                            ${e.value}
                        </div>
                    </div>
                `)}
            </div>
        `}};wt.styles=a`
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
            cursor: pointer;
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
    `,yt([pe({type:Array})],wt.prototype,"sensors",void 0),yt([pe({type:String})],wt.prototype,"fontColor",void 0),yt([pe({type:Object})],wt.prototype,"hass",void 0),yt([pe({type:String})],wt.prototype,"size",void 0),yt([pe({type:String})],wt.prototype,"labelSize",void 0),yt([pe({type:String})],wt.prototype,"valueSize",void 0),wt=yt([de("ha-sensors")],wt);class bt extends We{constructor(e,t={}){super(e,"background-image-controller"),this.backgroundImageManager=new Me,this.currentWeather=xe.All,this.messenger=Je.getInstance(),this._currentImageUrl="",this._previousImageUrl="",this._fetchingImageUrls=!1,this.onWeather=e=>{this.logger.info("New message for weather:",e.weather),this.updateWeather(e.weather)},this.onFetchNextImage=e=>{this.logger.info("Fetch next image requested"),this.setupImageRotation(),this.fetchNewImageAsync(this.currentWeather)},this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:1e3,fill:"forwards"},this.config=t}updateHass(e){this.hass=e,this.backgroundImageManager.setHass(e)}onHostConnected(){this.messenger.subscribe(Ke,this.onWeather),this.messenger.subscribe(Ye,this.onFetchNextImage),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){this.messenger.unsubscribe(Ke,this.onWeather),this.messenger.unsubscribe(Ye,this.onFetchNextImage),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(e){const t={...this.config};this.config={...this.config,...e},Ce.info("Update the BackgroundImageController with new configuration");const i=this.isInitialized;t.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{i&&this.fetchNewImageAsync(this.currentWeather).catch(e=>this.logger.error("Error fetching image after reinitialization:",e))}).catch(e=>this.logger.error("Error during BackgroundImageManager initialization:",e)):t.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:e,...t}=this.config.imageSourceConfig||{},i=t.imageSourceId?t:{imageSourceId:"picsum"};this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${i.imageSourceId||"default"}`);const o=this.backgroundImageManager.initialize(i);if(o&&this.backgroundImageManager.setHass(this.hass),!o)return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(e){this.logger.error("Error fetching image URLs:",e)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const e=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${e/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(e){this.logger.error("Error in image rotation interval:",e)}})()},e)}async fetchNewImageAsync(e){try{let t=e,i=function(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?ke.SunriseSunset:e>=9&&e<17?ke.Day:e>=21||e<5?ke.Night:ke.Unspecified}();const o=await this.backgroundImageManager.getNextImageUrlAsync(t,i);if(o){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`);const e=new Image;e.onload=async()=>{this.logger.debug(`New image loaded successfully: ${o}`),this._currentImageUrl?this._previousImageUrl=this._currentImageUrl:this._previousImageUrl="",this._currentImageUrl=o,this.host.requestUpdate(),await this.host.updateComplete,await this.fireAnimate()},e.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`)},e.src=o}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(e){this.logger.error("Error fetching new dynamic image:",e)}}async fireAnimate(){const e=Ve(this.host,".background-image");0!==e.length&&(1===e.length?e[0].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"}):(e[0].animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),e[1].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})),this._previousImageUrl="")}updateWeather(e){this.isInitialized?this.currentWeather!==e&&(this.logger.info(`Updating weather condition to: ${e}`),this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after weather update:",e))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after initialization:",e))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}}var _t=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let $t=class extends ce{constructor(){super(),this.backgroundOpacity=.5,this.objectFit="cover",this.logger=_e("background-image-component"),this.backgroundImageController=new bt(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(e){var t;super.updated(e),e.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(t=this.config)&&void 0!==t?t:{})),e.has("hass")&&this.backgroundImageController.updateHass(this.hass)}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}render(){const e=this.currentImageUrl,t=this.previousImageUrl,i=this.objectFit||"cover";return V`
            <div class="background-container">
                ${e?V`
                        ${t?V`
                                <!-- Previous image that will fade out -->
                                <img class="background-image fade-out" src="${t}" style="object-fit: ${i};">
                            `:""}
                        <!-- Current image that will fade in -->
                        <img class="background-image fade-in" src="${e}" style="object-fit: ${i};">
                        <div class="background-overlay" style="opacity: ${void 0!==this.backgroundOpacity?this.backgroundOpacity:.5};"></div>
                    `:""}
            </div>
        `}};$t.styles=a`
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
    `,_t([pe({type:Number})],$t.prototype,"backgroundOpacity",void 0),_t([pe({type:String})],$t.prototype,"objectFit",void 0),_t([pe({type:Object})],$t.prototype,"config",void 0),_t([pe({type:Object})],$t.prototype,"hass",void 0),$t=_t([de("ha-background-image")],$t);class Ct{static getInstance(){return Ct.instance||(Ct.instance=new Ct),Ct.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&Ce.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const St=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,i=e.longitude||14.4378,o=e.units||"metric",n=e.language||"en";try{const s=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${i}&units=${o}&lang=${n}&appid=${e.apiKey}`;Ce.debug("[OpenWeatherMap] "+s);const a=await fetch(s);if(!a.ok)throw new Error(`OpenWeatherMap API error: ${a.statusText}`);const r=await a.json();if(!r.list||!r.list.length)throw new Error("No forecast data available");const l=r.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon,e.iconSet),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},d=new Map;return r.list.forEach(e=>{var t;const i=new Date(1e3*e.dt).toISOString().split("T")[0];d.has(i)||d.set(i,[]),null===(t=d.get(i))||void 0===t||t.push(e)}),{current:h,daily:Array.from(d.entries()).map(([t,i])=>{const o=i.map(e=>e.main.temp),n=Math.min(...o),s=Math.max(...o),a=i[Math.floor(i.length/2)]||i[0],r=i.filter(e=>void 0!==e.pop).map(e=>e.pop),l=r.length>0?r.reduce((e,t)=>e+t,0)/r.length*100:0;return{date:new Date(t),temperatureMin:n,temperatureMax:s,condition:a.weather[0].description,icon:this.getIconUrl(a.weather[0].icon,e.iconSet),precipitation:l,humidity:a.main.humidity,windSpeed:a.wind.speed}}),temperatureUnit:"imperial"===e.units?"°F":"°C"}}catch(e){throw Ce.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"en"}}getIconUrl(e,t){return"basmilius"===t?this.getAnimatedIconUrl(e):"metno"===t?this.getMetNoIconUrl(e):`https://openweathermap.org/img/wn/${e}@2x.png`}getAnimatedIconUrl(e){let t="clear-day";switch(e){case"01d":t="clear-day";break;case"01n":t="clear-night";break;case"02d":t="partly-cloudy-day";break;case"02n":t="partly-cloudy-night";break;case"03d":case"03n":case"04d":case"04n":t="cloudy";break;case"09d":case"09n":t="rain";break;case"10d":t="partly-cloudy-day-rain";break;case"10n":t="partly-cloudy-night-rain";break;case"11d":case"11n":t="thunderstorms";break;case"13d":case"13n":t="snow";break;case"50d":case"50n":t="fog"}return`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${t}.svg`}getMetNoIconUrl(e){let t="clearsky_day";switch(e){case"01d":t="clearsky_day";break;case"01n":t="clearsky_night";break;case"02d":t="fair_day";break;case"02n":t="fair_night";break;case"03d":case"03n":case"04d":case"04n":t="cloudy";break;case"09d":case"09n":t="heavyrain";break;case"10d":case"10n":t="rain";break;case"11d":case"11n":t="rainshowersandthunder_day";break;case"13d":case"13n":t="snow";break;case"50d":case"50n":t="fog"}return`https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${t}.svg`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){let t;switch(Ce.debug(`[OpenWeatherMap] Mapping weather condition: ${e}`),e.toLowerCase()){case"clear":case"clear sky":t=xe.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":t=xe.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":t=xe.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":t=xe.Rain;break;case"tornado":case"windy":case"all":default:t=xe.All;break;case"snow":case"light snow":t=xe.Snow}return Ce.debug(`[OpenWeatherMap] Mapped to Weather enum: ${t}`),t}},kt=new class{constructor(){this.id="homeassistant",this.name="Home Assistant",this.description="Weather data from a Home Assistant entity"}setHass(e){this.hass=e}async fetchWeatherAsync(e){var t,i,o;if(!this.hass)throw new Error("Home Assistant instance not set");const n=e.entityId;if(!n)throw new Error("Home Assistant weather entity ID is required");const s=this.hass.states[n];if(!s)throw new Error(`Entity ${n} not found`);const a=s.attributes,r=this.buildCurrent(s,e);let l=[];try{const i=null===(t=(await this.hass.callWS({type:"call_service",domain:"weather",service:"get_forecasts",service_data:{type:"daily"},target:{entity_id:n},return_response:!0})).response[n])||void 0===t?void 0:t.forecast;i&&Array.isArray(i)&&(l=this.mapForecastItems(i,e,s))}catch(e){Ce.error(`[HA Weather] Error fetching forecast for ${n}:`,e)}return{current:r,daily:l,entityId:n,temperatureUnit:a.temperature_unit||(null===(o=null===(i=this.hass.config)||void 0===i?void 0:i.unit_system)||void 0===o?void 0:o.temperature)}}getCurrentWeather(e){var t;const i=e.entityId?null===(t=this.hass)||void 0===t?void 0:t.states[e.entityId]:void 0;if(i)return this.buildCurrent(i,e)}async subscribeForecastAsync(e,t){var i;const o=e.entityId,n=null===(i=this.hass)||void 0===i?void 0:i.connection;if(!o||!(null==n?void 0:n.subscribeMessage))return null;try{const i=await n.subscribeMessage(i=>{var n;if((null==i?void 0:i.forecast)&&Array.isArray(i.forecast)){const s=null===(n=this.hass)||void 0===n?void 0:n.states[o];t(this.mapForecastItems(i.forecast,e,s))}},{type:"weather/subscribe_forecast",entity_id:o,forecast_type:"daily"});return Ce.debug(`[HA Weather] Subscribed to forecast updates for ${o}`),i}catch(e){return Ce.warn(`[HA Weather] weather/subscribe_forecast unavailable for ${o}:`,e),null}}buildCurrent(e,t){const i=e.attributes,o=e.state;return{temperature:i.temperature,condition:this.mapConditionToKey(o),conditionText:this.localizeCondition(e),conditionUnified:this.mapWeatherCondition(o),icon:this.getIconUrl(o,t.iconSet),humidity:i.humidity,windSpeed:i.wind_speed,pressure:i.pressure,feelsLike:i.apparent_temperature}}mapForecastItems(e,t,i){return e.map(e=>({date:new Date(e.datetime),temperatureMin:void 0!==e.templow?e.templow:e.temperature,temperatureMax:e.temperature,condition:this.mapConditionToKey(e.condition),conditionText:i?this.localizeCondition(i,e.condition):void 0,icon:this.getIconUrl(e.condition,t.iconSet),precipitation:e.precipitation,humidity:e.humidity,windSpeed:e.wind_speed}))}localizeCondition(e,t){var i;const o=null===(i=this.hass)||void 0===i?void 0:i.formatEntityState;if("function"==typeof o)try{return void 0!==t?o.call(this.hass,e,t):o.call(this.hass,e)}catch(e){return void Ce.warn("[HA Weather] formatEntityState failed:",e)}}getDefaultConfig(){return{entityId:""}}mapConditionToKey(e){const t=null==e?void 0:e.toLowerCase();switch(t){case"sunny":case"clear-night":return"clear_sky";case"cloudy":return"overcast_clouds";case"partlycloudy":return"scattered_clouds";case"rainy":return"rain";case"pouring":return"heavy_intensity_rain";case"lightning":case"lightning-rainy":return"thunderstorm";case"snowy":case"snowy-rainy":return"snow";case"fog":return"mist";default:return t}}mapWeatherCondition(e){switch(null==e?void 0:e.toLowerCase()){case"clear-night":case"sunny":return xe.ClearSky;case"cloudy":case"partlycloudy":return xe.Clouds;case"rainy":case"pouring":case"lightning":case"lightning-rainy":return xe.Rain;case"snowy":case"snowy-rainy":return xe.Snow;case"fog":case"hail":return xe.Mist;default:return xe.All}}getIconUrl(e,t){const i=null==e?void 0:e.toLowerCase();if("basmilius"===t)return this.getAnimatedIconUrl(i);if("openweathermap"===t)return this.getOpenWeatherMapIconUrl(i);let o="clearsky_day";switch(i){case"sunny":o="clearsky_day";break;case"clear-night":o="clearsky_night";break;case"cloudy":o="cloudy";break;case"partlycloudy":o="fair_day";break;case"rainy":o="rain";break;case"pouring":o="heavyrain";break;case"lightning":case"lightning-rainy":o="rainshowersandthunder_day";break;case"snowy":o="snow";break;case"snowy-rainy":o="sleet";break;case"fog":o="fog"}return`https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${o}.svg`}getOpenWeatherMapIconUrl(e){let t="01d";switch(e){case"sunny":t="01d";break;case"clear-night":t="01n";break;case"cloudy":t="03d";break;case"partlycloudy":t="02d";break;case"rainy":t="10d";break;case"pouring":t="09d";break;case"lightning":case"lightning-rainy":t="11d";break;case"snowy":case"snowy-rainy":t="13d";break;case"fog":t="50d"}return`https://openweathermap.org/img/wn/${t}@2x.png`}getAnimatedIconUrl(e){let t="clear-day";switch(e){case"sunny":t="clear-day";break;case"clear-night":t="clear-night";break;case"cloudy":t="cloudy";break;case"partlycloudy":t="partly-cloudy-day";break;case"rainy":t="rain";break;case"pouring":t="extreme-rain";break;case"lightning":case"lightning-rainy":t="thunderstorms-rain";break;case"snowy":t="snow";break;case"snowy-rainy":t="sleet";break;case"fog":t="fog";break;case"hail":t="hail";break;case"windy":t="wind"}return`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${t}.svg`}},xt=Ct.getInstance();function It(e){return xt.getProvider(e)}xt.register(St),xt.register(kt);class At extends We{constructor(e,t={}){super(e,"weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this._messenger=Je.getInstance(),this._forceUpdateWeatherHandler=e=>this.fetchWeatherDataAsync(),this.config={},this.config=t}onHostConnected(){this._messenger.subscribe(Ze,this._forceUpdateWeatherHandler),this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this._messenger.unsubscribe(Ze,this._forceUpdateWeatherHandler),this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),this.teardownForecastSubscription()}teardownForecastSubscription(){if(this._forecastUnsubscribe){try{this._forecastUnsubscribe()}catch(e){this.logger.debug("Error unsubscribing from forecast updates:",e)}this._forecastUnsubscribe=void 0,this._subscribedEntityId=void 0}}async updateConfigAsync(e,t){this.logger.debug("Updating WeatherController config:",e);const i=this._hass;this._hass=t;const o=this.config.showWeather,n=this.config.weatherProvider,s=this.config.weatherUpdateInterval;this.config={...this.config,...e},s!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),this.config.showWeather&&(!o&&this.config.showWeather||!i&&this._hass&&!this._weatherData||n!==this.config.weatherProvider)?await this.fetchWeatherDataAsync():this.config.showWeather?this.refreshCurrentFromEntity():Je.getInstance().publish(new Ke(xe.All)),this.host.requestUpdate()}refreshCurrentFromEntity(){var e,t;if(!this._hass||!this._weatherData)return;const i=It(this.config.weatherProvider||"openweathermap");if(!(null==i?void 0:i.getCurrentWeather))return;const o=this.buildProviderConfig(i),n=o.entityId;if(!n)return;const s=this._hass.states[n];if(!s||s===this._lastEntityState)return;this._lastEntityState=s,null===(e=i.setHass)||void 0===e||e.call(i,this._hass);const a=i.getCurrentWeather(o);a&&(this.logger.debug(`Weather entity ${n} changed, refreshing current conditions`),this._weatherData={...this._weatherData,current:a},this._messenger.publish(new Ke(null!==(t=a.conditionUnified)&&void 0!==t?t:xe.All)))}async setupForecastSubscriptionAsync(e,t){if(!e.subscribeForecastAsync)return void this.teardownForecastSubscription();const i=t.entityId;if(!i||i===this._subscribedEntityId)return;this.teardownForecastSubscription();const o=await e.subscribeForecastAsync(t,e=>{this._weatherData&&(this.logger.debug(`Received pushed forecast update (${e.length} days)`),this._weatherData={...this._weatherData,daily:e},this.host.requestUpdate())});o&&(this._forecastUnsubscribe=o,this._subscribedEntityId=i)}buildProviderConfig(e){var t;let i=e.getDefaultConfig();return this.config.weatherConfig&&(i={...i,...this.config.weatherConfig},this.config.weatherConfig.units&&(i.units=this.config.weatherConfig.units)),this.config.weatherIconSet?i.iconSet=this.config.weatherIconSet:(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.iconSet)&&(i.iconSet=this.config.weatherConfig.iconSet),i}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting weather update interval to ${e} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(e){this.logger.error("Error in weather update interval:",e)}})()},t)}async fetchWeatherDataAsync(){var e,t;if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const i=this.config.weatherProvider||"openweathermap",o=It(i);if(!o)throw new Error(`Weather provider '${i}' not found`);if(o.setHass)if(this._hass)o.setHass(this._hass);else if("homeassistant"===o.id)return void this.logger.debug("Home Assistant instance not available yet for HA weather provider, skipping fetch");const n=this.buildProviderConfig(o);this._weatherData=await o.fetchWeatherAsync(n),this._weatherData&&Je.getInstance().publish(new Ke(null!==(t=null===(e=this._weatherData.current)||void 0===e?void 0:e.conditionUnified)&&void 0!==t?t:xe.All));const s=n.entityId;s&&this._hass&&(this._lastEntityState=this._hass.states[s]),await this.setupForecastSubscriptionAsync(o,n),this.logger.info(`Fetched weather data from ${o.name}:`,this._weatherData)}catch(e){this._weatherError=!0,this._weatherErrorMessage=e instanceof Error?e.message:String(e),this.logger.error("Error fetching weather data:",e)}finally{this._weatherLoading=!1,this.host.requestUpdate()}}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}}var zt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ot=class extends ce{constructor(){super(),this.logger=_e("weather-component"),this.weatherController=new At(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval,weatherIconSet:this.weatherIconSet})}get controller(){return this.weatherController}updated(e){if(super.updated(e),e.has("hass")||e.has("showWeather")||e.has("weatherProvider")||e.has("weatherConfig")||e.has("weatherDisplayMode")||e.has("weatherForecastDays")||e.has("weatherTitle")||e.has("weatherUpdateInterval")||e.has("weatherIconSet")){this.logger.debug("Weather properties or hass changed, updating WeatherController");const e={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval,weatherIconSet:this.weatherIconSet};this.weatherController.updateConfigAsync(e,this.hass)}if(e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}conditionDisplayText(e,t){return t||this.translateWeatherCondition(e)}translateWeatherCondition(e){const t=this.language||"en",i=function(e,t,i=e){if(!je().includes(t))return null!==i?i:e;let o=Be[t];if(!o){if(!Ue[t])return Ce.warn(`No embedded translations found for ${t}`),null!==i?i:e;Be[t]=Ue[t],o=Be[t],Ce.debug(`Loaded translations for ${t} on-demand`)}const n=function(e,t){if(void 0!==e[t])return e[t];const i=t.split(".");let o=e;for(const e of i){if(null==o||"object"!=typeof o)return;o=o[e]}return o}(o,e);return"string"==typeof n?Ce.debug(`Translation found for key "${e}" in language "${t}": "${n}"`):Ce.debug(`No translation found for key "${e}" in language "${t}", using default: "${null!==i?i:e}"`),"string"==typeof n?n:null!==i?i:e}(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,"");return i&&""!==i?i:e}formatForecastDate(e){return Le(e,this.language||"en",{weekday:"short"})}get weatherData(){const e=this.weatherController.weatherData;return e&&e.current&&e.current.conditionUnified&&Je.getInstance().publish(new Ke(e.current.conditionUnified)),e}getLabelSize(){return it(this.size,this.labelSize,"labelSize")}getValueSize(){return it(this.size,this.valueSize,"valueSize")}getForecastTempWidth(){return it(this.size,void 0,"forecastTempWidth")}_handleWeatherClick(e){e&&this.hass&&gt(this,"hass-more-info",{entityId:e})}render(){const e=this.weatherController.weatherData;if(this.weatherController.hasError)return V`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!e)return V`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;const t=this.weatherDisplayMode||"both",i=this.weatherForecastDays||3,o=this.weatherTitle||"Weather",n=Math.min(i,e.daily.length),s=this.getLabelSize(),a=this.getValueSize(),r=this.getForecastTempWidth();return V`
            <div class="weather-container ${e.entityId?"clickable":""}" 
                 style="color: ${this.fontColor};"
                 @click="${()=>this._handleWeatherClick(e.entityId)}">
                <div class="weather-title" style="color: ${this.fontColor}; font-size: ${s};">${o}</div>

                ${"current"===t||"both"===t?V`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${e.current.icon}"
                                     alt="${this.conditionDisplayText(e.current.condition,e.current.conditionText)}">
                                <div class="weather-temp" style="font-size: ${a};">${Math.round(e.current.temperature)}${e.temperatureUnit||"°"}</div>
                            </div>
                            <div class="weather-condition" style="font-size: ${s};">
                                ${this.conditionDisplayText(e.current.condition,e.current.conditionText)}
                            </div>
                        </div>
                    `:""}

                ${"forecast"===t||"both"===t?V`
                        <div class="weather-forecast">
                            ${e.daily.slice(0,n).map(e=>V`
                                <div class="forecast-day">
                                    <div class="forecast-date" style="font-size: ${s};">${this.formatForecastDate(e.date)}</div>
                                    <img class="forecast-icon" src="${e.icon}" alt="${this.conditionDisplayText(e.condition,e.conditionText)}">
                                    <div class="forecast-temp" style="font-size: ${s}; width: ${r};">
                                        ${Math.round(e.temperatureMin)}°<span class="forecast-separator"> - </span>${Math.round(e.temperatureMax)}°
                                    </div>
                                </div>
                            `)}
                        </div>
                    `:""}
            </div>
        `}};Ot.styles=a`
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

        .weather-error {
            color: #f44336;
            font-size: 1rem;
        }
    `,zt([pe({type:Object})],Ot.prototype,"hass",void 0),zt([pe({type:Boolean})],Ot.prototype,"showWeather",void 0),zt([pe({type:String})],Ot.prototype,"weatherProvider",void 0),zt([pe({type:Object})],Ot.prototype,"weatherConfig",void 0),zt([pe({type:String})],Ot.prototype,"weatherDisplayMode",void 0),zt([pe({type:Number})],Ot.prototype,"weatherForecastDays",void 0),zt([pe({type:String})],Ot.prototype,"weatherTitle",void 0),zt([pe({type:Number})],Ot.prototype,"weatherUpdateInterval",void 0),zt([pe({type:String})],Ot.prototype,"weatherIconSet",void 0),zt([pe({type:String})],Ot.prototype,"fontColor",void 0),zt([pe({type:String})],Ot.prototype,"language",void 0),zt([pe({type:String})],Ot.prototype,"size",void 0),zt([pe({type:String})],Ot.prototype,"labelSize",void 0),zt([pe({type:String})],Ot.prototype,"valueSize",void 0),Ot=zt([de("ha-weather")],Ot);class Dt{static getInstance(){return Dt.instance||(Dt.instance=new Dt),Dt.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&Ce.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const Ft=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(e,t){try{if(0===t.length)throw new Error("No stops configured");const i={};for(const e of t){const t=String(e.stopId);i[t]||(i[t]=[]),i[t].push(e)}const o=[];for(const t of Object.keys(i)){const n=i[t],s=n.map(e=>e.postId),a=`https://transportation-proxy.datario.app/proxy/departures?stopid=${t}`,r=await fetch(a,{headers:{"X-Api-Key":"2f8a0c7b2e9a44a4b8aa9a6b4a3d1e2f"}});if(!r.ok)throw new Error(`Failed to fetch transportation data: ${r.status} ${r.statusText}`);const l=await r.json();if(l.Error)throw new Error(`API error: ${l.Error}`);for(const i of s){const s=l.PostList.find(e=>e.PostID===i);if(!s){Ce.warn(`No platform found with postId ${i} for stopId ${t}`);continue}const a=s.Name,r=n.find(e=>e.postId===i);if(!r)continue;const c=r.name||a,h=e.maxDepartures||2,d=s.Departures.slice(0,Math.min(h,5)).map(e=>({lineId:e.LineId||e.Line,lineName:e.Line||e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:c,postId:i}));o.push(...d)}}return{departures:o,loading:!1}}catch(e){return Ce.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}},Nt=Dt.getInstance();Nt.register(Ft);class Pt extends We{constructor(e,t={}){super(e,"transportation-controller"),this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this._isActive=!1,this.config={},this.config=t}onHostConnected(){Je.getInstance().subscribe(Ge,()=>this.handleTransportationClick())}onHostDisconnected(){this.clearTimers(),this._transportationDataLoaded=!1,Je.getInstance().unsubscribe(Ge,()=>this.handleTransportationClick())}updateConfig(e){this.logger.debug("Updating TransportationController config:",e),this.config={...this.config,...e},this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.transportation.enabled)return;let e=this.config.transportation.updateInterval||60;e=Math.max(e,60);const t=1100*e;this.logger.debug(`Setting transportation update interval to ${e} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){this.logger.error("Error in transportation update interval:",e)}})()},t)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0),this.setInactive()}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.transportation.enabled){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const i=(e=t.provider,Nt.getProvider(e));if(!i)throw new Error(`Transportation provider '${t.provider}' not found`);const o=t.stops.map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),n=t.providerConfig||{};void 0!==t.maxDepartures&&(n.maxDepartures=t.maxDepartures),this._transportationData=await i.fetchTransportationAsync(n,o),this._lastTransportationUpdate=new Date,this.logger.info(`Fetched transportation data from ${i.name}:`,this._transportationData)}catch(e){this.logger.warn("Error fetching transportation data:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}var e;this.host.requestUpdate()}}async handleTransportationClick(){var e;if(this.logger.debug("Transportation button clicked, loading data on demand"),this.setActive(),await this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(e=this.config.transportation)||void 0===e?void 0:e.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));let t=60*e*1e3;this._transportationData.error&&(t=1e4),this.logger.info(`Setting transportation auto-hide timeout to ${e} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.info(`Auto-hiding transportation departures after ${e} minutes`),this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()},t)}this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get isActive(){return this._isActive}get lastTransportationUpdate(){return this._lastTransportationUpdate}get isTransportationEnabled(){return void 0!==this.config.transportation&&!1!==this.config.transportation.enabled}setInactive(){this.logger.info("Transportation set to inactive, clearing timers and sending message to bottom bar to hide departures"),this._isActive=!1,Je.getInstance().publish(new qe)}setActive(){this.logger.info("Transportation set to active, sending message to bottom bar to show departures"),this._isActive=!0,Je.getInstance().publish(new qe)}}class Et extends ce{activate(){}deactivate(){}}class Tt extends We{static get styles(){return a`
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
        `}constructor(e){super(e,"bottom-bar-manager"),this.components=[],this.activeComponent=null,this.previousActiveComponent=null,this.messenger=Je.getInstance(),this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:500,fill:"forwards"},this.onRequestUpdateMessage=e=>{this.updateActiveComponent()}}registerComponent(e){this.logger.info(`Registering component ${e.className} with priority ${e.priority}`),this.components.push(e),this.components.sort((e,t)=>t.priority-e.priority),this.updateActiveComponent(),this.host.requestUpdate()}updateActiveComponent(){var e;const t=this.components.find(e=>e.isActive)||null;this.activeComponent!==t&&(this.logger.debug(`Changing active component from ${(null===(e=this.activeComponent)||void 0===e?void 0:e.constructor.name)||"none"} to ${(null==t?void 0:t.constructor.name)||"none"}`),this.previousActiveComponent=this.activeComponent,this.activeComponent&&this.activeComponent.deactivate(),this.activeComponent=t,this.activeComponent&&this.activeComponent.activate(),this.previousActiveComponent&&this.activeComponent&&(this.host.requestUpdate(),this.host.updateComplete.then(()=>{this.animateComponentChange()})))}animateComponentChange(){if(!this.activeComponent||!this.previousActiveComponent)return;const e=Ve(this.host,".bottom-bar-item.active")[0],t=Ve(this.host,".bottom-bar-item.previous")[0];e&&t?(t.animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),e.animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})):this.logger.warn("Could not find elements for animation")}get currentComponent(){return this.activeComponent}render(){return V`
            <div class="bottom-bar-container">
                ${this.components.map(e=>{const t=e==this.currentComponent,i=e==this.previousActiveComponent;return V`
                        <div class="bottom-bar-item ${t?"active":""} ${i?"previous":""}">
                            ${e}
                        </div>
                    `})}
            </div>
        `}onHostConnected(){this.logger.debug("Bottom bar manager connected"),this.messenger.subscribe(qe,this.onRequestUpdateMessage),this.updateActiveComponent()}onHostDisconnected(){this.logger.debug("Bottom bar manager disconnected"),this.messenger.unsubscribe(qe,this.onRequestUpdateMessage)}}var Mt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Rt=class extends Et{get priority(){return 10}get isActive(){return this.controller.isActive}constructor(){super(),this.logger=_e("transportation-component"),this.transportationController=new Pt(this,{transportation:this.transportation})}get controller(){return this.transportationController}updated(e){super.updated(e),e.has("transportation")&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation}))}render(){if(!this.transportation||!0!==this.transportation.enabled)return V``;const e=this.transportationController.transportationData,t=this.transportationController.transportationDataLoaded;return V`
            ${this.controller.isActive?t?V`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    ${this.renderTransportationContent(e)}
                                </div>`:V`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    <div class="transportation-loading">Loading transportation data...</div>
                                </div>`:V``}
        `}renderTransportationContent(e){if(e.loading)return V`
                <div class="transportation-loading">Loading transportation data...</div>`;if(e.error)return V`
                <div class="transportation-error">${e.error}</div>`;if(!e.departures||0===e.departures.length)return V`
                <div class="transportation-loading">No departures available.</div>`;const t={};for(const i of e.departures){const e=`${i.stopName}-${i.postId}`;t[e]||(t[e]=[]),t[e].push(i)}return V`
            <div class="transportation-departures">
                ${Object.entries(t).map(([e,t])=>{const i=t[0].stopName;return V`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.fontColor};">
                                ${i}
                            </h3>
                            <div class="stop-departures">
                                ${t.map(e=>V`
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
                                        ${e.isLowFloor?V`
                                            <div class="departure-lowfloor">♿</div>`:""}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `})}
            </div>
        `}};var Ut;Rt.styles=a`
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
    `,Mt([pe({type:Object})],Rt.prototype,"transportation",void 0),Mt([pe({type:String})],Rt.prototype,"fontColor",void 0),Mt([pe({type:Object})],Rt.prototype,"hass",void 0),Rt=Mt([de("ha-transportation")],Rt),function(e){e.Left="left",e.Center="center",e.Right="right"}(Ut||(Ut={}));class Bt{constructor(){this.handlers=new Map}static getInstance(){return Bt.instance||(Bt.instance=new Bt),Bt.instance}registerHandler(e,t){this.handlers.set(e,t)}getHandler(e){return this.handlers.get(e)}}class jt extends We{constructor(e,t={}){super(e,"action-bar-controller"),this.config={},this.config=t,this.registry=Bt.getInstance()}onHostConnected(){this.logger.debug("Action bar controller connected")}onHostDisconnected(){this.logger.debug("Action bar controller disconnected")}updateConfig(e){this.logger.debug("Updating ActionBarController config:",e),this.config={...this.config,...e},this.host.requestUpdate()}get actionBarConfig(){return this.config.actionBar}get isActionBarEnabled(){var e;return!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}registerActionHandler(e,t){this.logger.debug(`Registering handler for action type: ${e}`),this.registry.registerHandler(e,t)}getActionHandler(e){return this.registry.getHandler(e)}}class Ht{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const Lt=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends Ht{constructor(e){if(super(e),6!==e.type)throw new Error("actionHandler must be attached to an element")}render(e){return J}update(e,[t]){return this.attach(e.element,t||{}),J}attach(e,t){if(e._actionHandlerOptions=t,e._actionHandlerAttached)return;let i;e._actionHandlerAttached=!0;let o,n=!1;const s=t=>{gt(e,"action",{action:t})},a=()=>{void 0!==i&&(window.clearTimeout(i),i=void 0)};e.addEventListener("pointerdown",()=>{var t;n=!1,(null===(t=e._actionHandlerOptions)||void 0===t?void 0:t.hasHold)&&(a(),i=window.setTimeout(()=>{n=!0,s("hold")},500))}),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),e.addEventListener("pointerleave",a),e.addEventListener("click",()=>{var t;n?n=!1:(null===(t=e._actionHandlerOptions)||void 0===t?void 0:t.hasDoubleClick)?void 0!==o?(window.clearTimeout(o),o=void 0,s("double_tap")):o=window.setTimeout(()=>{o=void 0,s("tap")},250):s("tap")}),e.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),s("tap"))})}});class Wt{constructor(){this.plugins=new Map,this.actionRegistry=Bt.getInstance()}static getInstance(){return Wt.instance||(Wt.instance=new Wt),Wt.instance}registerPlugin(e){const t=e.actionId;this.plugins.set(t,e)}registerPluginWithHandler(e){this.registerPlugin(e),this.actionRegistry.registerHandler(e.actionId,e.handler)}getAllPlugins(){return Array.from(this.plugins.values())}getPlugin(e){return this.plugins.get(e)}getAllActionIds(){return Array.from(this.plugins.keys())}}function Vt(e){Wt.getInstance().registerPluginWithHandler(e)}var Jt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Kt=class extends Et{get priority(){return 5}get isActive(){var e;return!0===(null===(e=this.config)||void 0===e?void 0:e.enabled)&&this.config.actions&&this.config.actions.length>0}constructor(){super(),this.logger=_e("action-bar-component"),this.actionBarController=new jt(this,{actionBar:this.config})}get controller(){return this.actionBarController}getIconSize(){return it(this.size,this.iconSize,"iconSize")}getButtonSize(){return function(e,t){if(e===et.Custom&&t){const e=parseInt(t);return isNaN(e)?tt.buttonSize.medium:2*e+"px"}return it(e,void 0,"buttonSize")}(this.size,this.iconSize)}updated(e){super.updated(e),e.has("config")&&(this.logger.debug("Config properties changed, updating ActionBarController"),this.actionBarController.updateConfig({actionBar:this.config}),Je.getInstance().publish(new qe)),e.has("hass")&&this.hass&&this.requestUpdate()}getJustifyContent(){if(!this.config||!this.config.alignment)return"center";switch(this.config.alignment){case Ut.Left:return"flex-start";case Ut.Right:return"flex-end";case Ut.Center:default:return"center"}}render(){if(!this.config||!1===this.config.enabled||!this.config.actions||0===this.config.actions.length)return V``;const e=this.getJustifyContent(),t=this.getButtonSize(),i=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.3;return this.logger.debug(`Rendering action bar - ButtonSize: ${t}`),V`
            <div class="action-bar-container" 
                style="color: ${this.fontColor}; 
                       justify-content: ${e}; 
                       background-color: rgba(0, 0, 0, ${i});
                       --action-button-size: ${t};">
                ${this.config.actions.map(e=>this.renderActionButton(e))}
            </div>
        `}renderActionButton(e){const t=Wt.getInstance().getPlugin(e.actionId);let i=e.active||!1,o=e.icon;t&&"getIconForState"in t&&this.hass&&(o=t.getIconForState(e,this.hass)),t&&"getActiveState"in t&&(i=t.getActiveState());const n=i?"active":"",s=i&&e.activeColor?`--active-icon-color: ${e.activeColor};`:"";return V`
            <div class="action-button ${n}"
                 style="${s}"
                 role="button"
                 tabindex="0"
                 aria-label="${e.title}"
                 ${Lt({hasHold:ft(e.hold_action),hasDoubleClick:ft(e.double_tap_action)})}
                 @action=${t=>{var i;return this._handleAction(e,(null===(i=t.detail)||void 0===i?void 0:i.action)||"tap")}}>
                ${o&&o.startsWith("mdi:")?V`<ha-icon icon="${o}" 
                                   style="${i&&e.activeColor?`color: ${e.activeColor};`:""} 
                                          width: ${this.getIconSize()}; 
                                          height: ${this.getIconSize()}; 
                                          --mdc-icon-size: ${this.getIconSize()};">
                           </ha-icon>`:V`<svg viewBox="0 0 24 24"
                               style="${i&&e.activeColor?`fill: ${e.activeColor};`:""} 
                                      width: ${this.getIconSize()}; 
                                      height: ${this.getIconSize()};">
                        <path d="${o}"></path>
                      </svg>`}
                <div class="action-title">${e.title}</div>
            </div>
        `}_handleAction(e,t){this.hass?(this.logger.debug(`Action ${t}:`,e),function(e,t,i,o="tap"){let n="hold"===o?e.hold_action:"double_tap"===o?e.double_tap_action:e.tap_action;var s;if(n&&(!(s=n)||"object"!=typeof s||Array.isArray(s)||"string"!=typeof s.action)&&(console.warn(`Ignoring invalid ${o} action config (expected an object with an "action" key):`,n),n=void 0),n){const s={...e},a=n.entity||n.entity_id||e.entity_id;return!s.entity&&a&&(s.entity=a),void mt(i||document.body,t,s,o)}if("tap"!==o)return;const a=Bt.getInstance().getHandler(e.actionId);a?a(e,t,i):console.warn(`No handler registered for action type: ${e.actionId}`)}(e,this.hass,this,t)):this.logger.error("Home Assistant instance not available")}};Kt.styles=a`
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
            font-size: 18px;
            font-weight: 400;
            text-align: center;
        }
    `,Jt([pe({type:Object})],Kt.prototype,"config",void 0),Jt([pe({type:String})],Kt.prototype,"fontColor",void 0),Jt([pe({type:Object})],Kt.prototype,"hass",void 0),Jt([pe({type:String})],Kt.prototype,"size",void 0),Jt([pe({type:String})],Kt.prototype,"iconSize",void 0),Kt=Jt([de("ha-action-bar")],Kt);const Zt="action-navigate",qt=(e,t,i)=>{const{path:o,target:n}=e;"_blank"!==n?pt(i||document.body,o):window.open(o,"_blank")};var Gt,Yt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};class Qt extends ce{updated(e){super.updated(e)}handleInputChange(e,t){t.stopPropagation(),t.preventDefault();const i=t.target;i&&this.actionChanged(this.index,e,i.value||"")}handleValueChange(e,t){t.stopPropagation(),t.preventDefault(),this.actionChanged(this.index,e,t.detail.value)}}Yt([pe({type:Object})],Qt.prototype,"hass",void 0),Yt([pe({type:Object})],Qt.prototype,"actionConfig",void 0),Yt([pe({type:Number})],Qt.prototype,"index",void 0),Yt([pe({type:Function})],Qt.prototype,"actionChanged",void 0),function(e){e.Left="left",e.Top="top",e.Hidden="hidden"}(Gt||(Gt={}));let Xt=class extends Qt{get navigationAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"text"}}}
                    .value=${this.navigationAction.path||""}
                    .label= ${"Navigation Path"}
                    .labelPosition=${Gt.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${e=>this.handleValueChange("path",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"_self",label:"Current Tab"},{value:"_blank",label:"New Tab"}],mode:"dropdown"}}}
                    .value=${this.navigationAction.target||"_self"}
                    .label= ${"Open In"}
                    .labelPosition=${Gt.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${e=>this.handleValueChange("target",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.navigationAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the navigation action is active"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Xt=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("navigation-editor-plugin")],Xt);const ei="action-ha",ti=(e,t,i)=>{mt(i||document.body,t,{entity:e.entity,tap_action:e.tap_action},"tap")};let ii=class extends Qt{get haAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.haAction.entity||""}
                    .required=${!1}
                    .label=${"Entity"}
                    .helper=${"Entity used by the more-info and toggle actions"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.tap_action}
                    .label=${"Tap Action"}
                    .helper=${"Standard Home Assistant action to run on tap"}
                    .labelPosition=${Gt.Top}
                    @value-changed=${e=>this.handleValueChange("tap_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.hold_action}
                    .required=${!1}
                    .label=${"Hold Action"}
                    .helper=${"Standard Home Assistant action to run on hold"}
                    .labelPosition=${Gt.Top}
                    @value-changed=${e=>this.handleValueChange("hold_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.double_tap_action}
                    .required=${!1}
                    .label=${"Double Tap Action"}
                    .helper=${"Standard Home Assistant action to run on double tap"}
                    .labelPosition=${Gt.Top}
                    @value-changed=${e=>this.handleValueChange("double_tap_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.haAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the action is active"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};ii=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("ha-action-editor-plugin")],ii);const oi="call-service",ni=(e,t,i)=>{const{service:o,service_data:n,confirmation:s,confirmation_text:a}=e;mt(i||document.body,t,{tap_action:{action:"call-service",service:o,service_data:n,confirmation:s?{text:a||`Are you sure you want to call ${o}?`}:void 0}},"tap")};var si=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let ai=class extends Qt{constructor(){super(...arguments),this._services=[]}get serviceCallAction(){return this.actionConfig}firstUpdated(){this._loadServices()}_loadServices(){if(!this.hass)return;const e=this.hass.services;if(!e)return;const t=[];Object.keys(e).forEach(i=>{Object.keys(e[i]).forEach(e=>{t.push({value:`${i}.${e}`,label:`${i}.${e}`})})}),t.sort((e,t)=>e.label.localeCompare(t.label)),this._services=t}render(){return V`

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:this._services,mode:"dropdown",custom_value:!0}}}
                    .value=${this.serviceCallAction.service||""}
                    .label=${"Service"}
                    .helper= ${"Select a service or enter a custom one (domain.service)"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("service",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{multiline:!1,type:"text"}}}
                    label="Service Data (JSON)"
                    .value=${this.serviceCallAction.service_data?JSON.stringify(this.serviceCallAction.service_data):"{}"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>{if(e.stopPropagation(),e.preventDefault(),e.target)try{const t=JSON.parse(e.detail.value||"{}");this.actionChanged(this.index,"service_data",t)}catch(e){}}}
            ></ha-row-selector>

            <div class="helper-text">Example: {"entity_id": "light.living_room"} for light.toggle service</div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.serviceCallAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the service call action is active"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};ai.styles=a`
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
    `,si([pe({state:!0,attribute:!1})],ai.prototype,"_services",void 0),ai=si([de("service-call-editor-plugin")],ai);const ri="light-toggle",li=(e,t)=>{const{entity_id:i}=e;i?t.states[i]?t.callService("light","toggle",{entity_id:i}):console.warn(`Entity ${i} not found`):console.warn("No entity_id specified for light toggle action")};let ci=class extends Qt{get lightToggleAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"light"}}}
                    .value=${this.lightToggleAction.entity_id||""}
                    .label=${"Light Entity"}
                    .helper=${"Select a light entity to toggle"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for light on state"}}}
                    .value=${this.lightToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when light is on"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.lightToggleAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the light is on (active state)"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};ci.styles=a`
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
    `,ci=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("light-toggle-editor-plugin")],ci);const hi="switch-toggle",di=(e,t)=>{const{entity_id:i}=e;i?t.states[i]?t.callService("switch","toggle",{entity_id:i}):console.warn(`Entity ${i} not found`):console.warn("No entity_id specified for switch toggle action")};let gi=class extends Qt{get switchToggleAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"switch"}}}
                    .value=${this.switchToggleAction.entity_id||""}
                    .label=${"Switch Entity"}
                    .helper=${"Select a switch entity to toggle"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for switch on state"}}}
                    .value=${this.switchToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when switch is on"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.switchToggleAction.activeColor||"#4CAF50"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the switch is on (active state)"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};gi.styles=a`
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
    `,gi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("switch-toggle-editor-plugin")],gi);const ui=_e("weather-update-plugin"),pi="weather-update",mi=(e,t)=>{ui.info("Weather update clicked"),Je.getInstance().publish(new Ze)};class fi{constructor(){this.actionId=pi,this.name="Update Weather",this.description="Trigger an immediate weather update",this.icon="mdi:weather-partly-cloudy",this.handler=mi,this.editorTag="weather-update-editor-plugin"}defaultActionConfig(){return{actionId:pi,title:"Update Weather",icon:this.icon}}register(){Vt(this)}}function vi(){(new fi).register()}let yi=class extends Qt{get weatherUpdateAction(){return this.actionConfig}render(){return V`
            <div class="helper-text">
                This action will trigger an immediate weather update when clicked.
                No additional configuration is needed.
            </div>
        `}};yi.styles=a`
        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,yi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("weather-update-editor-plugin")],yi),vi();const wi="transportation",bi=_e("transportation-plugin"),_i=(e,t)=>{bi.info("Transportation clicked"),Je.getInstance().publish(new Ge)};class $i{constructor(){this.actionId=wi,this.name="Transportation",this.description="Show transportation information",this.icon="mdi:bus-clock",this.handler=_i,this.editorTag=""}defaultActionConfig(){return{actionId:wi,title:"Transportation",icon:this.icon}}register(){Vt(this)}}function Ci(){(new $i).register()}Ci();const Si="background-next",ki=_e("background-next-plugin"),xi=(e,t)=>{ki.info("Background next clicked"),Je.getInstance().publish(new Ye)};class Ii{constructor(){this.actionId=Si,this.name="Next Background",this.description="Show next background image",this.icon="mdi:image-refresh",this.handler=xi,this.editorTag=""}defaultActionConfig(){return{actionId:Si,title:"Next Background",icon:this.icon}}register(){Vt(this)}}function Ai(){(new Ii).register()}Ai();const zi="action-more-info",Oi=_e("more-info-plugin"),Di=(e,t,i)=>{const{entity_id:o}=e;if(!o)return void Oi.warn("No entity_id specified for more-info action");const n=t.states[o];if(n){Oi.info(`Opening more-info for entity ${o} (${n.entity_id})`);try{const e={entityId:o,view:"info"};gt(i||document.body,"hass-more-info",e)}catch(e){Oi.warn("Error using fireEvent method:",e)}}else Oi.warn(`Entity ${o} not found`)};let Fi=class extends Qt{get moreInfoAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.moreInfoAction.entity_id||""}
                    .label=${"Entity"}
                    .helper=${"Select an entity to show more info for"}
                    .labelPosition=${Gt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>
        `}};Fi.styles=a`
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
    `,Fi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("more-info-editor-plugin")],Fi),(new class{constructor(){this.actionId=Zt,this.name="Navigate to Page",this.description="Navigate to a different page in Home Assistant",this.icon="mdi:arrow-right",this.handler=qt,this.editorTag="navigation-editor-plugin"}defaultActionConfig(){return{actionId:Zt,title:"Navigate",icon:this.icon,path:"/"}}register(){Vt(this)}}).register(),(new class{constructor(){this.actionId=ei,this.name="Home Assistant Action",this.description="Run a standard Home Assistant action (navigate, call service, more info, url, toggle)",this.icon="mdi:gesture-tap",this.handler=ti,this.editorTag="ha-action-editor-plugin"}defaultActionConfig(){return{actionId:ei,title:"Action",icon:this.icon,tap_action:{action:"navigate",navigation_path:"/config"}}}register(){Vt(this)}}).register(),(new class{constructor(){this.actionId=oi,this.name="Call Service",this.description="Call a Home Assistant service",this.icon="mdi:lightbulb",this.handler=ni,this.editorTag="service-call-editor-plugin"}defaultActionConfig(){return{actionId:oi,service:"light.toggle",service_data:{entity_id:"light.living_room"},title:"Toggle Light",icon:this.icon}}register(){Vt(this)}}).register(),(new class{constructor(){this.actionId=ri,this.name="Toggle Light",this.description="Toggle a light on or off",this.icon="mdi:lightbulb",this.handler=li,this.editorTag="light-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:i}=e;if(!i)return e.icon||this.icon;const o=t.states[i];return o?(this._lastActiveState="on"===o.state,this._lastActiveState?e.icon_on||"mdi:lightbulb-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:ri,entity_id:"",title:"Toggle Light",icon:this.icon,icon_on:"mdi:lightbulb-on"}}register(){Vt(this)}}).register(),(new class{constructor(){this.actionId=hi,this.name="Toggle Switch",this.description="Toggle a switch on or off",this.icon="mdi:toggle-switch-variant-off",this.handler=di,this.editorTag="switch-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:i}=e;if(!i)return e.icon||this.icon;const o=t.states[i];return o?(this._lastActiveState="on"===o.state,this._lastActiveState?e.icon_on||"mdi:toggle-switch-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:hi,entity_id:"",title:"Toggle Switch",icon:this.icon,icon_on:"mdi:toggle-switch-variant"}}register(){Vt(this)}}).register(),vi(),Ci(),Ai(),(new class{constructor(){this.actionId=zi,this.name="Entity More Info",this.description="Open the default modal window of an entity",this.icon="mdi:information-outline",this.handler=Di,this.editorTag="more-info-editor-plugin"}defaultActionConfig(){return{actionId:zi,title:"More Info",icon:this.icon,entity_id:""}}register(){Vt(this)}}).register();var Ni=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};class Pi extends ce{updated(e){super.updated(e)}_handleFormValueChanged(e){if(e.stopPropagation(),!this.config)return;const t=JSON.parse(JSON.stringify(this.config));this.setPropertyByPath(t,e.detail.propertyName,e.detail.value),gt(this,"config-changed",{config:t})}setPropertyByPath(e,t,i){if(!t)return e;const o=t.split(".");let n=e;for(let e=0;e<o.length-1;e++){const t=o[e];if(t.includes("[")&&t.includes("]")){const e=t.substring(0,t.indexOf("[")),i=parseInt(t.substring(t.indexOf("[")+1,t.indexOf("]")),10);n[e]||(n[e]=[]),n[e][i]||(n[e][i]={}),n=n[e][i]}else n[t]||(n[t]={}),n=n[t]}return n[o[o.length-1]]=i,e}}Ni([pe({type:Object})],Pi.prototype,"hass",void 0),Ni([pe({type:Object})],Pi.prototype,"config",void 0);var Ei=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ti=class extends Pi{constructor(){super(...arguments),this._actions=[],this._editorComponentCache=new Map}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadActions()}_loadActions(){var e;(null===(e=this.config)||void 0===e?void 0:e.actionBar)&&this.config.actionBar.actions&&this.config.actionBar.actions.length>0?this._actions=[...this.config.actionBar.actions]:this._actions=[]}_getActionTypeOptions(){return Wt.getInstance().getAllPlugins().map(e=>({value:e.actionId,label:e.name}))}_getEditorTagName(e){const t=Wt.getInstance().getPlugin(e);return t&&t.editorTag?t.editorTag:null}_createEditorTagComponent(e,t){const i=this._getEditorTagName(e.actionId);if(!i)return"";const o=`${e.actionId}-${t}`;if(this._editorComponentCache.has(o)){const t=this._editorComponentCache.get(o);return this.hass&&(t.hass=this.hass),t.actionConfig=e,t}try{const n=document.createElement(i);return this.hass&&(n.hass=this.hass),n.actionConfig=e,n.index=t,n.actionChanged=this._actionChanged.bind(this),this._editorComponentCache.set(o,n),n}catch(e){return console.error(`Error creating editor component ${i}:`,e),""}}_addAction(){const e=this._getActionTypeOptions(),t=e.length>0?e[0].value:Zt;let i;const o=Wt.getInstance().getPlugin(t);if(i=o&&o.defaultActionConfig?o.defaultActionConfig():{actionId:t,title:"Action",icon:"mdi:flash"},this._editorComponentCache.clear(),this._actions=[...this._actions,i],this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],e.actionBar.enabled=!0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionUp(e){if(e<=0||e>=this._actions.length)return;this._editorComponentCache.clear();const t=[...this._actions],i=t[e];if(t[e]=t[e-1],t[e-1]=i,this._actions=t,this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionDown(e){if(e<0||e>=this._actions.length-1)return;this._editorComponentCache.clear();const t=[...this._actions],i=t[e];if(t[e]=t[e+1],t[e+1]=i,this._actions=t,this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeAction(e){if(this._editorComponentCache.clear(),this._actions=this._actions.filter((t,i)=>i!==e),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],0===this._actions.length&&(e.actionBar&&(e.actionBar.enabled=!1),e.actionBar=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_actionChanged(e,t,i){if("actionId"===t){const t=this._actions[e];if(t){const i=`${t.actionId}-${e}`;this._editorComponentCache.delete(i)}}if(this._actions=this._actions.map((o,n)=>n===e?{...o,[t]:i}:o),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
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
        `}render(){var e,t,i,o;return this.hass&&this.config?V`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}
                        .label= ${"Enable Action Bar"}
                        propertyName="actionBar.enabled"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${!0===(null===(t=this.config.actionBar)||void 0===t?void 0:t.enabled)?V`
                    <div class="info-text">
                        Configure action buttons that will appear at the bottom of the card.
                        Action bar and transportation cannot be displayed simultaneously - action bar takes
                        precedence.
                    </div>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:[{value:Ut.Left,label:"Left"},{value:Ut.Center,label:"Center"},{value:Ut.Right,label:"Right"}],mode:"dropdown"}}}
                            .value=${(null===(i=this.config.actionBar)||void 0===i?void 0:i.alignment)||Ut.Center}
                            .label= ${"Button Alignment"}
                            .helper= ${"Align buttons to the left, center, or right"}
                            .labelPosition=${Gt.Top}
                            propertyName="actionBar.alignment"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                            .value=${void 0!==(null===(o=this.config.actionBar)||void 0===o?void 0:o.backgroundOpacity)?this.config.actionBar.backgroundOpacity:.3}
                            .label= ${"Background Opacity"}
                            .helper= ${"Adjust the transparency of the action bar background (0 = fully transparent, 1 = fully opaque)"}
                            .labelPosition=${Gt.Top}
                            propertyName="actionBar.backgroundOpacity"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <div class="section-subheader">Actions</div>

                    ${this._actions.map((e,t)=>V`
                        ${t>0?V`<hr style="width: 100%; border: none; border-top: 1px solid var(--divider-color, rgba(0,0,0,0.8)); margin: 8px 0 16px 0;">`:""}

                        <ha-row-selector
                                style="flex: 2;"
                                .hass=${this.hass}
                                .selector=${{select:{options:this._getActionTypeOptions(),mode:"dropdown"}}}
                                .value=${e.actionId}
                                .label= ${"Action Type"}
                                .labelPosition=${Gt.Hidden}
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
                                .labelPosition=${Gt.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const i=e.detail.value;this._actionChanged(t,"title",i||"")}}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{icon:{placeholder:"mdi:clock"}}}
                                .value=${e.icon||""}
                                .label=${"Icon"}
                                .helper= ${"Icon for the action button"}
                                .labelPosition=${Gt.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const i=e.detail.value;this._actionChanged(t,"icon",i||"")}}
                        ></ha-row-selector>

                        <!-- Editor components are now dynamically created by the factory pattern -->
                        ${this._createEditorTagComponent(e,t)}
                    `)}

                    <mwc-button @click=${this._addAction}>Add Action</mwc-button>
                `:""}
            </div>
        `:V``}};Ei([pe({type:Array})],Ti.prototype,"_actions",void 0),Ti=Ei([de("action-bar-editor")],Ti);var Mi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ri=class extends Pi{constructor(){super(...arguments),this._backgroundImages=[],this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._objectFitOptions=[{value:"fill",label:"Fill"},{value:"contain",label:"Contain"},{value:"cover",label:"Cover"},{value:"none",label:"None"},{value:"scale-down",label:"Scale Down"}]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadBackgroundImages()}_loadBackgroundImages(){var e;(null===(e=this.config)||void 0===e?void 0:e.backgroundImages)&&this.config.backgroundImages.length>0?this._backgroundImages=[...this.config.backgroundImages]:this._backgroundImages=[]}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:xe.All,timeOfDay:ke.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,i)=>i!==e),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this.config){const e=JSON.parse(JSON.stringify(this.config));e.backgroundImages=[...this._backgroundImages],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
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
        `}render(){return this.hass&&this.config?V`
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

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._objectFitOptions,mode:"dropdown"}}}
                        .value=${this.config.objectFit||"cover"}
                        .label= ${"Background Image Fit (object-fit)"}
                        propertyName="objectFit"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                
                ${"local"===this.config.imageSource?this._renderLocalImagesSection():""}
                ${"unsplash"===this.config.imageSource?this._renderUnsplashSection():""}
                ${"sensor"===this.config.imageSource?this._renderSensorImagesSection():""}
            </div>
        `:V``}_renderLocalImagesSection(){return V`
            <div class="info-text">
                Configure local image URLs. Images will be automatically categorized by weather
                condition and time of day based on their file paths.
                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day
                (sunrise-sunset, day, night) in your file paths.
            </div>

            <div class="section-subheader">Background Images</div>

            ${this._backgroundImages.map((e,t)=>V`
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
        `}_renderUnsplashSection(){var e,t,i,o;return V`
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
        `}_renderSensorImagesSection(){var e;return V`
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
        `}};Mi([pe({type:Array})],Ri.prototype,"_backgroundImages",void 0),Ri=Mi([de("background-editor")],Ri);let Ui=class extends Pi{constructor(){super(...arguments),this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]}}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n,s,a;return this.hass&&this.config?V`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${(null===(e=this.config.dateFormat)||void 0===e?void 0:e.custom)||""}
                        .label= ${"Custom Date Format"}
                        .helper= ${"e.g. yyyy-MM-dd or EEEE, MMMM d, yyyy. If filled, it overrides the settings below."}
                        propertyName="dateFormat.custom"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._dateFormatOptions.weekday,mode:"dropdown"}}}
                        .value=${(null===(t=this.config.dateFormat)||void 0===t?void 0:t.weekday)||"long"}
                        .label= ${"Weekday Display"}
                        propertyName="dateFormat.weekday"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._dateFormatOptions.month,mode:"dropdown"}}}
                        .value=${(null===(i=this.config.dateFormat)||void 0===i?void 0:i.month)||"long"}
                        .label= ${"Month Display"}
                        propertyName="dateFormat.month"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._dateFormatOptions.day,mode:"dropdown"}}}
                        .value=${void 0===(null===(o=this.config.dateFormat)||void 0===o?void 0:o.day)?"undefined":null===(n=this.config.dateFormat)||void 0===n?void 0:n.day}
                        .label= ${"Day Display"}
                        propertyName="dateFormat.day"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._dateFormatOptions.year,mode:"dropdown"}}}
                        .value=${void 0===(null===(s=this.config.dateFormat)||void 0===s?void 0:s.year)?"undefined":null===(a=this.config.dateFormat)||void 0===a?void 0:a.year}
                        .label= ${"Year Display"}
                        propertyName="dateFormat.year"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `:V``}};Ui=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("date-format-editor")],Ui);let Bi=class extends Pi{constructor(){super(...arguments),this._timeFormatOptions={hour12:[{value:"true",label:"12-hour"},{value:"false",label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]}}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n;return this.hass&&this.config?V`
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
        `:V``}};Bi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("time-format-editor")],Bi);var ji=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Hi=class extends Pi{constructor(){super(...arguments),this._sensors=[]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadSensors()}_loadSensors(){var e;(null===(e=this.config)||void 0===e?void 0:e.sensors)&&this.config.sensors.length>0?this._sensors=[...this.config.sensors]:this._sensors=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,i)=>i!==e),this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
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
        `}render(){return this.hass&&this.config?V`
            <div class="content">
                ${this._sensors.map((e,t)=>V`
                    <div class="sensor-row">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${e.label||""}
                                .label=${"Label"}
                                .labelPosition=${Gt.Top}
                                propertyName="sensors.${t}.label"
                                @value-changed=${this._handleFormValueChanged}
                                style="flex: 0 0 30%; margin-right: 8px; overflow: hidden;"
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{entity:{filter:{domain:["sensor","binary_sensor","input_text","input_number","input_datetime","sun","weather"]}}}}
                                .value=${e.entity||""}
                                .label=${"Entity"}
                                .labelPosition=${Gt.Top}
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
        `:V``}};ji([pe({type:Array})],Hi.prototype,"_sensors",void 0),Hi=ji([de("sensors-editor")],Hi);var Li=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Wi=class extends Pi{constructor(){super(...arguments),this._stops=[]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadStops()}_loadStops(){var e;(null===(e=this.config)||void 0===e?void 0:e.transportation)&&this.config.transportation.stops&&this.config.transportation.stops.length>0?this._stops=[...this.config.transportation.stops]:this._stops=[]}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeStop(e){if(this._stops=this._stops.filter((t,i)=>i!==e),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_stopChanged(e,t,i){if(this._stops=this._stops.map((o,n)=>n===e?{...o,[t]:i}:o),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_getTransportationProviderOptions(){return[...Nt.getAllProviders().map(e=>({value:e.id,label:e.name}))]}static get styles(){return a`
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
        `}render(){var e,t,i,o,n;return this.hass&&this.config&&(null===(e=this.config.transportation)||void 0===e?void 0:e.enabled)?V`
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

                ${this._stops.map((e,t)=>V`
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
        `:V``}};Li([pe({type:Array})],Wi.prototype,"_stops",void 0),Wi=Li([de("transportation-editor")],Wi);let Vi=class extends Pi{constructor(){super(...arguments),this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"homeassistant",label:"Home Assistant Entity"},{value:"openweathermap",label:"OpenWeatherMap"}],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}],this._weatherIconSetOptions=[{value:"metno",label:"Met.no (SVG)"},{value:"openweathermap",label:"OpenWeatherMap (PNG)"},{value:"basmilius",label:"Bas Milius (Animated)"}]}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n;return this.hass&&this.config?V`
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

                ${this.config.showWeather?V`
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

                    ${"homeassistant"===this.config.weatherProvider?V`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{entity:{domain:"weather"}}}
                                .value=${(null===(e=this.config.weatherConfig)||void 0===e?void 0:e.entityId)||""}
                                .label=${"Weather Entity"}
                                propertyName="weatherConfig.entityId"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    `:""}


                    ${"openweathermap"===this.config.weatherProvider?V`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.apiKey)||""}
                                .label= ${"API Key"}
                                .helper= ${"OpenWeatherMap API Key"}
                                propertyName="weatherConfig.apiKey"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    `:""}

                    ${"openweathermap"===this.config.weatherProvider?V`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:-90,max:90,step:1e-4,mode:"box"}}}
                                .value=${(null===(i=this.config.weatherConfig)||void 0===i?void 0:i.latitude)||50.0755}
                                .label=${"Latitude"}
                                propertyName="weatherConfig.latitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:-180,max:180,step:1e-4,mode:"box"}}}
                                .value=${(null===(o=this.config.weatherConfig)||void 0===o?void 0:o.longitude)||14.4378}
                                .label=${"Longitude"}
                                propertyName="weatherConfig.longitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._unitsOptions,mode:"dropdown"}}}
                                .value=${(null===(n=this.config.weatherConfig)||void 0===n?void 0:n.units)||"metric"}
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

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:this._weatherIconSetOptions,mode:"dropdown"}}}
                            .value=${this.config.weatherIconSet||("homeassistant"===this.config.weatherProvider?"metno":"openweathermap")}
                            .label= ${"Weather Icon Set"}
                            propertyName="weatherIconSet"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>


                    ${"forecast"===this.config.weatherDisplayMode||"both"===this.config.weatherDisplayMode?V`
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
        `:V``}};Vi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}([de("weather-editor")],Vi);var Ji=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Ki=class extends ce{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._actions=[],this._languageOptions=[]}connectedCallback(){super.connectedCallback(),this._languageOptions=Re.map(e=>({value:e.code,label:e.label}))}updated(e){super.updated(e)}setConfig(e){var t,i,o,n,s,a;const r=e,l=r.imageSource||"none";let c={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};r.timeFormat&&(c={...c,...r.timeFormat},void 0===r.timeFormat.second&&(c.second=void 0)),this._config={...r,timeFormat:c,dateFormat:r.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==r.backgroundOpacity?r.backgroundOpacity:.3,imageSource:l,imageConfig:r.imageConfig||{},backgroundRotationInterval:r.backgroundRotationInterval||90,sensors:r.sensors||[],fontColor:r.fontColor||"#FFFFFF",size:r.size||et.Medium,customSizes:r.customSizes?{clockSize:null!==(t=r.customSizes.clockSize)&&void 0!==t?t:"16rem",dateSize:null!==(i=r.customSizes.dateSize)&&void 0!==i?i:"6rem",labelSize:null!==(o=r.customSizes.labelSize)&&void 0!==o?o:"1.5rem",valueSize:null!==(n=r.customSizes.valueSize)&&void 0!==n?n:"3rem",actionBarIconSize:null!==(s=r.customSizes.actionBarIconSize)&&void 0!==s?s:"72px",clockTopMargin:null!==(a=r.customSizes.clockTopMargin)&&void 0!==a?a:"0rem"}:{clockSize:"16rem",dateSize:"6rem",labelSize:"1.5rem",valueSize:"3rem",actionBarIconSize:"72px",clockTopMargin:"0rem"},showWeather:void 0!==r.showWeather&&r.showWeather,weatherProvider:r.weatherProvider||"openweathermap",weatherConfig:r.weatherConfig||{},weatherDisplayMode:r.weatherDisplayMode||"both",weatherForecastDays:r.weatherForecastDays||3,transportation:r.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops(),this._loadActions()}_loadSensors(){var e;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadActions(){var e;(null===(e=this._config)||void 0===e?void 0:e.actionBar)&&this._config.actionBar.actions&&this._config.actionBar.actions.length>0?this._actions=[...this._config.actionBar.actions]:this._actions=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_handleFormValueChanged(e){if(e.stopPropagation(),!this._config)return;const t=function(e,t,i){const o=JSON.parse(JSON.stringify(e)),n=t.split(".");let s=o;for(let e=0;e<n.length-1;e++){const t=n[e];void 0===s[t]&&(s[t]={}),s=s[t]}return s[n[n.length-1]]=i,o}(this._config,e.detail.propertyName,e.detail.value);this._config=t,gt(this,"config-changed",{config:t})}static get styles(){return a`
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
        `}render(){var e,t,i,o,n,s,a;return this.hass&&this._config?V`
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
                                .selector=${{select:{options:[{value:et.Large,label:"Large"},{value:et.Medium,label:"Medium"},{value:et.Small,label:"Small"},{value:et.Custom,label:"Custom"}],mode:"dropdown"}}}
                                .value=${this._config.size||et.Medium}
                                .label= ${"Size"}
                                propertyName="size"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${this._config.size===et.Custom?V`
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
                                    .value=${(null===(t=this._config.customSizes)||void 0===t?void 0:t.clockTopMargin)||"0rem"}
                                    .label= ${"Clock Top Margin (e.g., 0rem)"}
                                    propertyName="customSizes.clockTopMargin"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(i=this._config.customSizes)||void 0===i?void 0:i.dateSize)||"6rem"}
                                    .label= ${"Date Size (e.g., 6rem)"}
                                    propertyName="customSizes.dateSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(o=this._config.customSizes)||void 0===o?void 0:o.labelSize)||"1.5rem"}
                                    .label= ${"Label Size (e.g., 1.5rem)"}
                                    propertyName="customSizes.labelSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(n=this._config.customSizes)||void 0===n?void 0:n.valueSize)||"3rem"}
                                    .label= ${"Value Size (e.g., 3rem)"}
                                    propertyName="customSizes.valueSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${(null===(s=this._config.customSizes)||void 0===s?void 0:s.actionBarIconSize)||"72px"}
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
                        @config-changed=${e=>{this._config=e.detail.config,gt(this,"config-changed",{config:this._config})}}
                    ></time-format-editor>
                </ha-expansion-panel>

                <!-- Date Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Date Format</h3>
                    <date-format-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,gt(this,"config-changed",{config:this._config})}}
                    ></date-format-editor>
                </ha-expansion-panel>

                <!-- Background Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <background-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,this._loadBackgroundImages(),gt(this,"config-changed",{config:this._config})}}
                    ></background-editor>
                </ha-expansion-panel>

                <!-- Sensors Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Sensors</h3>
                    <sensors-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,this._loadSensors(),gt(this,"config-changed",{config:this._config})}}
                    ></sensors-editor>
                </ha-expansion-panel>

                <!-- Weather Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Weather Forecast</h3>
                    <weather-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,gt(this,"config-changed",{config:this._config})}}
                    ></weather-editor>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===(null===(a=this._config.transportation)||void 0===a?void 0:a.enabled)?V`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <transportation-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,this._loadStops(),gt(this,"config-changed",{config:this._config})}}
                        ></transportation-editor>
                    </ha-expansion-panel>
                `:""}

                <!-- Action Bar Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Action Bar</h3>
                    <action-bar-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,this._loadActions(),gt(this,"config-changed",{config:this._config})}}
                    ></action-bar-editor>
                </ha-expansion-panel>
            </div>
        `:V``}};Ji([pe({type:Object})],Ki.prototype,"hass",void 0),Ji([pe({type:Object})],Ki.prototype,"_config",void 0),Ji([pe({type:Array})],Ki.prototype,"_sensors",void 0),Ji([pe({type:Array})],Ki.prototype,"_backgroundImages",void 0),Ji([pe({type:Array})],Ki.prototype,"_stops",void 0),Ji([pe({type:Array})],Ki.prototype,"_actions",void 0),Ki=Ji([de("wall-clock-card-editor")],Ki);var Zi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let qi=class extends ce{constructor(){super(...arguments),this.disabled=!1,this.required=!0}render(){return V`
            <ha-textfield
                    type="color"
                    .value=${this.value||""}
                    .label=${this.label}
                    .helper=${this.helper}
                    .disabled=${this.disabled}
                    .required=${this.required}
                    @change=${this._valueChanged}
            ></ha-textfield>
        `}_valueChanged(e){const t=e.target.value;t&&!/^#[0-9a-fA-F]{6}$/.test(t)||gt(this,"value-changed",{value:t})}};qi.styles=a`
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
    `,Zi([pe({attribute:!1})],qi.prototype,"hass",void 0),Zi([pe({attribute:!1})],qi.prototype,"selector",void 0),Zi([pe()],qi.prototype,"value",void 0),Zi([pe()],qi.prototype,"label",void 0),Zi([pe()],qi.prototype,"helper",void 0),Zi([pe({type:Boolean,reflect:!0})],qi.prototype,"disabled",void 0),Zi([pe({type:Boolean})],qi.prototype,"required",void 0),qi=Zi([de("ha-selector-color_hex")],qi);var Gi=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let Yi=class extends ce{constructor(){super(...arguments),this.disabled=!1,this.required=!0,this.labelPosition=Gt.Left}render(){return V`
            <div class="row ${this.labelPosition.toLowerCase()}">
                ${this.label&&this.labelPosition!==Gt.Hidden?V`
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
                    ${this.actionButtons?this.actionButtons.map((e,t)=>V`
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
        `}_handleDynamicActionClick(e,t,i){e.stopPropagation(),gt(this,i||`action-click-${t}`,{})}_valueChanged(e){e.stopPropagation();let t=e.detail.value;this.transformData&&(t=this.transformData(t)),gt(this,"value-changed",{value:t,propertyName:this.propertyName})}};function Qi(e,t){var i;return e||(null===(i=null==t?void 0:t.locale)||void 0===i?void 0:i.language)||(null==t?void 0:t.language)||"en"}function Xi(e,t){var i,o;if(void 0!==e)return Boolean(e);const n=null===(i=null==t?void 0:t.locale)||void 0===i?void 0:i.time_format;if("12"===n)return!0;if("24"===n)return!1;const s="system"===n?void 0:Qi(void 0,t);try{return null!==(o=new Intl.DateTimeFormat(s,{hour:"numeric"}).resolvedOptions().hour12)&&void 0!==o&&o}catch(e){return!1}}Yi.styles=a`
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
    `,Gi([pe({attribute:!1})],Yi.prototype,"hass",void 0),Gi([pe({attribute:!1})],Yi.prototype,"selector",void 0),Gi([pe()],Yi.prototype,"value",void 0),Gi([pe()],Yi.prototype,"label",void 0),Gi([pe()],Yi.prototype,"helper",void 0),Gi([pe({type:Boolean,reflect:!0})],Yi.prototype,"disabled",void 0),Gi([pe({type:Boolean})],Yi.prototype,"required",void 0),Gi([pe()],Yi.prototype,"propertyName",void 0),Gi([pe({attribute:!1})],Yi.prototype,"transformData",void 0),Gi([pe({attribute:!1})],Yi.prototype,"labelPosition",void 0),Gi([pe({attribute:!1})],Yi.prototype,"actionButtons",void 0),Yi=Gi([de("ha-row-selector")],Yi);var eo=function(e,t,i,o){var n,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(a=(s<3?n(a):s>3?n(t,i,a):n(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let to=class extends ce{constructor(){var e;super(),this.config={},this.consecutiveFailures=0,this.isRetrying=!1,this.clockComponent=document.createElement("ha-clock"),this.sensorComponent=document.createElement("ha-sensors"),this.weatherComponent=document.createElement("ha-weather"),this.backgroundImageComponent=document.createElement("ha-background-image"),this.transportationComponent=document.createElement("ha-transportation"),this.actionBarComponent=document.createElement("ha-action-bar"),Ce.info("%c WALL-CLOCK-CARD %c 2.5.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language,this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.clockComponent.size=this.config.size,this.config.customSizes&&(this.clockComponent.clockSize=this.config.customSizes.clockSize,this.clockComponent.dateSize=this.config.customSizes.dateSize,this.clockComponent.clockTopMargin=this.config.customSizes.clockTopMargin),this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.sensorComponent.size=this.config.size,this.config.customSizes&&(this.sensorComponent.labelSize=this.config.customSizes.labelSize,this.sensorComponent.valueSize=this.config.customSizes.valueSize),this.hass&&(this.sensorComponent.hass=this.hass,this.weatherComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.weatherIconSet=this.config.weatherIconSet||(null===(e=this.config.weatherConfig)||void 0===e?void 0:e.iconSet),this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=this.config.language,this.weatherComponent.size=this.config.size,this.config.customSizes&&(this.weatherComponent.labelSize=this.config.customSizes.labelSize,this.weatherComponent.valueSize=this.config.customSizes.valueSize),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.fontColor=this.config.fontColor,this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.actionBarComponent.size=this.config.size,this.config.customSizes&&(this.actionBarComponent.iconSize=this.config.customSizes.actionBarIconSize),this.bottomBarManager=new Tt(this),this.bottomBarManager.registerComponent(this.transportationComponent),this.bottomBarManager.registerComponent(this.actionBarComponent)}connectedCallback(){var e;super.connectedCallback(),this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=Qi(this.config.language,this.hass),this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.clockComponent.size=this.config.size,this.config.customSizes&&(this.clockComponent.clockSize=this.config.customSizes.clockSize,this.clockComponent.dateSize=this.config.customSizes.dateSize,this.clockComponent.clockTopMargin=this.config.customSizes.clockTopMargin),this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.sensorComponent.size=this.config.size,this.config.customSizes&&(this.sensorComponent.labelSize=this.config.customSizes.labelSize,this.sensorComponent.valueSize=this.config.customSizes.valueSize),this.hass&&(this.sensorComponent.hass=this.hass,this.weatherComponent.hass=this.hass,this.transportationComponent.hass=this.hass,this.actionBarComponent.hass=this.hass,this.backgroundImageComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.weatherIconSet=this.config.weatherIconSet||(null===(e=this.config.weatherConfig)||void 0===e?void 0:e.iconSet),this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=Qi(this.config.language,this.hass),this.weatherComponent.size=this.config.size,this.config.customSizes&&(this.weatherComponent.labelSize=this.config.customSizes.labelSize,this.weatherComponent.valueSize=this.config.customSizes.valueSize),this.config.actionBar||(this.config.actionBar={actions:[]}),this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.actionBarComponent.size=this.config.size,this.config.customSizes&&(this.actionBarComponent.iconSize=this.config.customSizes.actionBarIconSize),this.initConnectCallbackAsync()}async initConnectCallbackAsync(){await this.weatherComponent.controller.ready,await this.backgroundImageComponent.controller.ready,await this.clockComponent.controller.ready,await this.sensorComponent.controller.ready,await this.transportationComponent.controller.ready,await this.actionBarComponent.controller.ready,this.transportationComponent.fontColor=this.config.fontColor,this.transportationComponent.transportation=this.config.transportation,we({level:$e(this.config.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1});try{await async function(){Ce.debug("Loading all translations");const e=je().map(e=>async function(e){try{Ue[e]?(Be[e]=Ue[e],Ce.debug(`Loaded translations for ${e}`)):Ce.warn(`No embedded translations found for ${e}`)}catch(t){Ce.error(`Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),Ce.debug("Loaded translations for all languages")}catch(e){Ce.error("Error loading translations:",e)}this.config.showWeather||Je.getInstance().publish(new Ke(xe.All))}initBackgroundImageComponent(){var e,t,i,o,n;const s={imageSourceId:this.config.imageSource||"picsum",backgroundImages:this.config.backgroundImages,entity:null===(e=this.config.imageConfig)||void 0===e?void 0:e.entity,apiKey:null===(t=this.config.imageConfig)||void 0===t?void 0:t.apiKey,contentFilter:null===(i=this.config.imageConfig)||void 0===i?void 0:i.contentFilter,category:null===(o=this.config.imageConfig)||void 0===o?void 0:o.category,count:null===(n=this.config.imageConfig)||void 0===n?void 0:n.count};this.backgroundImageComponent.backgroundOpacity=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5,this.backgroundImageComponent.objectFit=this.config.objectFit||"cover",this.backgroundImageComponent.config={imageSourceConfig:s,backgroundRotationInterval:this.config.backgroundRotationInterval,objectFit:this.config.objectFit||"cover"},this.backgroundImageComponent.hass=this.hass,Ce.debug("Background image component initialized")}disconnectedCallback(){super.disconnectedCallback()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}getGridOptions(){return{columns:"full",rows:6,min_rows:4}}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e||"object"!=typeof e)throw new Error("Invalid configuration");this.applyConfig(e)}applyConfig(e){var t,i,o,n;const s=e.imageSource||"none";let a={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:Xi(null===(t=e.timeFormat)||void 0===t?void 0:t.hour12,this.hass)};e.timeFormat&&(a={...a,...e.timeFormat,hour12:a.hour12},void 0===e.timeFormat.second&&(a.second=void 0));let r={weekday:"long",year:"numeric",month:"long",day:"numeric"};e.dateFormat&&(r={...r,...e.dateFormat},void 0===e.dateFormat.year&&(r.year=void 0));let l=e.timeZone;!l&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(l=this.hass.config.time_zone);const c={actions:[],...e.actionBar,enabled:null!==(o=null===(i=e.actionBar)||void 0===i?void 0:i.enabled)&&void 0!==o?o:!0===e.enableActionBar};this.config={...e,actionBar:c,timeFormat:a,dateFormat:r,backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:s,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,objectFit:e.objectFit||"cover",sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",timeZone:l,size:e.size||et.Medium,customSizes:e.customSizes||{}},this.initBackgroundImageComponent(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=Qi(this.config.language,this.hass),this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.clockComponent.size=this.config.size,this.config.customSizes&&(this.clockComponent.clockSize=this.config.customSizes.clockSize,this.clockComponent.dateSize=this.config.customSizes.dateSize,this.clockComponent.clockTopMargin=this.config.customSizes.clockTopMargin),this.sensorComponent.sensors=this.config.sensors,this.sensorComponent.fontColor=this.config.fontColor,this.sensorComponent.size=this.config.size,this.config.customSizes&&(this.sensorComponent.labelSize=this.config.customSizes.labelSize,this.sensorComponent.valueSize=this.config.customSizes.valueSize),this.hass&&(this.sensorComponent.hass=this.hass,this.weatherComponent.hass=this.hass,this.transportationComponent.hass=this.hass,this.actionBarComponent.hass=this.hass,this.backgroundImageComponent.hass=this.hass),this.weatherComponent.showWeather=this.config.showWeather,this.weatherComponent.weatherProvider=this.config.weatherProvider,this.weatherComponent.weatherConfig=this.config.weatherConfig,this.weatherComponent.weatherDisplayMode=this.config.weatherDisplayMode,this.weatherComponent.weatherForecastDays=this.config.weatherForecastDays,this.weatherComponent.weatherTitle=this.config.weatherTitle,this.weatherComponent.weatherUpdateInterval=this.config.weatherUpdateInterval,this.weatherComponent.weatherIconSet=this.config.weatherIconSet||(null===(n=this.config.weatherConfig)||void 0===n?void 0:n.iconSet),this.weatherComponent.fontColor=this.config.fontColor,this.weatherComponent.language=Qi(this.config.language,this.hass),this.weatherComponent.size=this.config.size,this.config.customSizes&&(this.weatherComponent.labelSize=this.config.customSizes.labelSize,this.weatherComponent.valueSize=this.config.customSizes.valueSize),this.transportationComponent.transportation=this.config.transportation,this.transportationComponent.fontColor=this.config.fontColor,this.actionBarComponent.config=this.config.actionBar,this.actionBarComponent.fontColor=this.config.fontColor,this.actionBarComponent.size=this.config.size,this.config.customSizes&&(this.actionBarComponent.iconSize=this.config.customSizes.actionBarIconSize),this.config.showWeather||this.backgroundImageComponent.controller.ready.then(()=>{Je.getInstance().publish(new Ke(xe.All))})}updated(e){if(e.has("hass")&&this.hass&&(this.sensorComponent.hass=this.hass,this.weatherComponent.hass=this.hass,this.transportationComponent.hass=this.hass,this.actionBarComponent.hass=this.hass,this.backgroundImageComponent.hass=this.hass),e.has("config")&&this.config){const e=this.config.logLevel||"info",t=$e(e);Ce.debug(`Updating log level to ${e} (${me[t]})`),we({level:t,prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}}static get styles(){return a`
            /* Include ClockComponent styles */
            ${s(st.styles)}
            /* Include SensorComponent styles */
            ${s(wt.styles)}
            /* Include BackgroundImageComponent styles */
            ${s($t.styles)}
            /* Include WeatherComponent styles */
            ${s(Ot.styles)}
            /* Include TransportationComponent styles */
            ${s(Rt.styles)}
            /* Include ActionBarComponent styles */
            ${s(Kt.styles)}
            /* Include BottomBarManager styles */
            ${s(Tt.styles)}
            :host {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                // background-color: var(--card-background-color, var(--primary-background-color, #111));
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

        `}render(){let e="";return null!==this.bottomBarManager.currentComponent&&(e="margin-top: -140px;"),V`
            <ha-card style="color: ${this.config.fontColor};">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather?V`<div style="position: absolute; top: 16px; right: 16px; max-width: 40%; max-height: 60%; z-index: 3; padding-left: 8px;">
                            ${this.weatherComponent}
                        </div>`:""}
                <div style="${e}">
                    ${this.clockComponent}
                </div>
                ${this.bottomBarManager.render()}
            </ha-card>
        `}};eo([pe({type:Object})],to.prototype,"hass",void 0),eo([pe({type:Object})],to.prototype,"config",void 0),eo([pe({type:Number})],to.prototype,"consecutiveFailures",void 0),eo([pe({type:Boolean})],to.prototype,"isRetrying",void 0),to=eo([de("wall-clock-card")],to),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
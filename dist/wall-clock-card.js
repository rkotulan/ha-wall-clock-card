/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;class n{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}}const a=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(o,e,i)},r=(i,o)=>{if(t)i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=t.cssText,i.appendChild(o)}},s=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,p=globalThis,f=p.trustedTypes,m=f?f.emptyScript:"",v=p.reactiveElementPolyfillSupport,y=(e,t)=>e,w={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&c(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const a=o?.call(this);n?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:w;this._$Em=o;const a=n.fromAttribute(t,e.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const o=this.constructor,n=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??b)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==n||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}var S;$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=new Map,$[y("finalized")]=new Map,v?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.1");const C=window,x=C.trustedTypes,k=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,I="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,z="?"+A,E=`<${z}>`,D=document,O=()=>D.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,N=e=>T(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),F="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,L=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,W=/"/g,B=/^(?:script|style|textarea|title)$/i,H=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=H(1),Z=(H(2),Symbol.for("lit-noChange")),J=Symbol.for("lit-nothing"),q=new WeakMap,K=D.createTreeWalker(D,129,null,!1);function G(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,o=[];let n,a=2===t?"<svg>":"",r=M;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===M?"!--"===l[1]?r=R:void 0!==l[1]?r=j:void 0!==l[2]?(B.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=L):void 0!==l[3]&&(r=L):r===L?">"===l[0]?(r=null!=n?n:M,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?L:'"'===l[3]?W:U):r===W||r===U?r=L:r===R||r===j?r=M:(r=L,n=void 0);const h=r===L&&e[t+1].startsWith("/>")?" ":"";a+=r===M?i+E:c>=0?(o.push(s),i.slice(0,c)+I+i.slice(c)+A+h):i+A+(-2===c?(o.push(void 0),t):h)}return[G(e,a+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class X{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,a=0;const r=e.length-1,s=this.parts,[l,c]=Y(e,t);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=K.nextNode())&&s.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(I)||t.startsWith(A)){const i=c[a++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+I).split(A),t=/([.?@])?(.*)/.exec(i);s.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?oe:"?"===t[1]?ae:"@"===t[1]?re:ie})}else s.push({type:6,index:n})}for(const t of e)o.removeAttribute(t)}if(B.test(o.tagName)){const e=o.textContent.split(A),t=e.length-1;if(t>0){o.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],O()),K.nextNode(),s.push({type:2,index:++n});o.append(e[t],O())}}}else if(8===o.nodeType)if(o.data===z)s.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(A,e+1));)s.push({type:7,index:n}),e+=A.length-1}n++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,o){var n,a,r,s;if(t===Z)return t;let l=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const c=P(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(a=null==l?void 0:l._$AO)||void 0===a||a.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,o)),void 0!==o?(null!==(r=(s=i)._$Co)&&void 0!==r?r:s._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(t=Q(e,l._$AS(e,t.values),l,o)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:D).importNode(i,!0);K.currentNode=n;let a=K.nextNode(),r=0,s=0,l=o[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new te(a,a.nextSibling,this,e):1===l.type?t=new l.ctor(a,l.name,l.strings,this,e):6===l.type&&(t=new se(a,this,e)),this._$AV.push(t),l=o[++s]}r!==(null==l?void 0:l.index)&&(a=K.nextNode(),r++)}return K.currentNode=D,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{constructor(e,t,i,o){var n;this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),P(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==Z&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):N(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==J&&P(this._$AH)?this._$AA.nextSibling.data=e:this.$(D.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,n="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=X.createElement(G(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new ee(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new X(e)),t}T(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new te(this.k(O()),this.k(O()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class ie{constructor(e,t,i,o,n){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const n=this.strings;let a=!1;if(void 0===n)e=Q(this,e,t,0),a=!P(e)||e!==this._$AH&&e!==Z,a&&(this._$AH=e);else{const o=e;let r,s;for(e=n[0],r=0;r<n.length-1;r++)s=Q(this,o[i+r],t,r),s===Z&&(s=this._$AH[r]),a||(a=!P(s)||s!==this._$AH[r]),s===J?e=J:e!==J&&(e+=(null!=s?s:"")+n[r+1]),this._$AH[r]=s}a&&!o&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class oe extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}const ne=x?x.emptyScript:"";class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){e&&e!==J?this.element.setAttribute(this.name,ne):this.element.removeAttribute(this.name)}}class re extends ie{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Q(this,e,t,0))&&void 0!==i?i:J)===Z)return;const o=this._$AH,n=e===J&&o!==J||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==J&&(o===J||n);n&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const le={O:I,P:A,A:z,C:1,M:Y,L:ee,R:N,D:Q,I:te,V:ie,H:ae,N:re,U:oe,F:se},ce=C.litHtmlPolyfillSupport;null==ce||ce(X,te),(null!==(S=C.litHtmlVersions)&&void 0!==S?S:C.litHtmlVersions=[]).push("2.8.0");const de=globalThis;class he extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,n;const a=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let r=a._$litPart$;if(void 0===r){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;a._$litPart$=r=new te(t.insertBefore(O(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}he._$litElement$=!0,he.finalized=!0,de.litElementHydrateSupport?.({LitElement:he});const ue=de.litElementPolyfillSupport;ue?.({LitElement:he}),(de.litElementVersions??=[]).push("4.2.1");const ge=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},fe=(e=pe,t,i)=>{const{kind:o,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,n,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];t.call(this,i),this.requestUpdate(o,n,e)}}throw Error("Unsupported decorator location: "+o)};function me(e){return(t,i)=>"object"==typeof i?fe(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ve(e){return me({...e,state:!0,attribute:!1})}var ye;!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR",e[e.NONE=4]="NONE"}(ye||(ye={}));const we={level:ye.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let be={...we};const _e=[];function $e(e,t,i,...o){var n;if(e<be.level)return;const a=function(e,t,i){const{prefix:o,enableTimestamps:n,enableSourceTracking:a}=be;let r="";return n&&(r+=`[${(new Date).toISOString()}] `),r+=`[${ye[e]}] `,o&&(r+=`[${o}] `),t&&a&&(r+=`[${t}] `),r+=i,r}(e,t,i);if(be.logToConsole)switch(e){case ye.DEBUG:console.debug(a,...o);break;case ye.INFO:console.log(a,...o);break;case ye.WARN:console.warn(a,...o);break;case ye.ERROR:console.error(a,...o)}if(be.logToStorage){let e=a;if(o.length>0)try{e+=" "+o.map(e=>"object"==typeof e?JSON.stringify(e):String(e)).join(" ")}catch(t){e+=" [Arguments could not be stringified]"}_e.push(e);const t=null!==(n=be.maxStoredLogs)&&void 0!==n?n:100;_e.length>t&&_e.splice(0,_e.length-t)}}function Se(e){return{debug:(t,...i)=>$e(ye.DEBUG,e,t,...i),info:(t,...i)=>$e(ye.INFO,e,t,...i),warn:(t,...i)=>$e(ye.WARN,e,t,...i),error:(t,...i)=>$e(ye.ERROR,e,t,...i),withSource:e=>Se(e)}}function Ce(e){switch(e.toLowerCase()){case"debug":return ye.DEBUG;case"info":return ye.INFO;case"warn":default:return ye.WARN;case"error":return ye.ERROR;case"none":return ye.NONE}}const xe=Se("wall-clock");class ke{static getInstance(){return ke.instance||(ke.instance=new ke),ke.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&xe.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}registerAll(e){e.forEach(e=>this.register(e))}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}var Ie,Ae;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(Ie||(Ie={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(Ae||(Ae={}));const ze=[Ae.All,Ae.ClearSky,Ae.Clouds,Ae.Rain,Ae.Snow,Ae.Mist],Ee=[Ie.Unspecified,Ie.SunriseSunset,Ie.Day,Ie.Night];function De(e,t){if(!e)return;const i=e.toLowerCase();for(const e of t)if(i.includes(e.toLowerCase().replace(" ","-")))return e}class Oe{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return Se(`${this.id}-source`)}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}async fetchImagesAsync(e,t,i){return this.getLogger().debug(`Fetching images with weather: ${t}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(e,t,i)}async getNextImageUrlAsync(e,t,i){var o;this.getLogger().debug(`GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=t,this.lastTimeOfDay=i);const n=`${t}_${i}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(n)||0===(null===(o=this.imageUrlCache.get(n))||void 0===o?void 0:o.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const o=[...await this.fetchImagesAsync(e,t,i)];this.shuffleArray(o),this.imageUrlCache.set(n,o),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${o.length} images for weather: ${t}, timeOfDay: ${i}`)}const a=this.imageUrlCache.get(n)||[];if(0===a.length)return this.getLogger().warn(`No images available for weather: ${t}, timeOfDay: ${i}`),"";const r=a[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%a.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${r}`),r}filterImagesByWeatherAndTime(e,t,i){if(this.getLogger().debug(`Current time of day: ${i}`),this.getLogger().debug(`Current weather condition: ${t}`),0===e.length)return[];let o=[];return o=e.filter(e=>(e.weather===t||e.weather===Ae.All||t===Ae.All)&&e.timeOfDay===i),0===o.length&&(o=e.filter(e=>(e.weather===t||e.weather===Ae.All||t===Ae.All)&&e.timeOfDay===Ie.Unspecified)),0===o.length&&(o=e.filter(e=>e.timeOfDay===i)),0===o.length&&(o=e.filter(e=>e.timeOfDay===Ie.Unspecified)),o.length>0?(this.getLogger().debug(`Found ${o.length} images matching current conditions`),o.map(e=>e.url)):(this.getLogger().info("No matching images found, returning all images"),e.map(e=>e.url))}convertUrlsToBackgroundImages(e){return this.getLogger().debug(`Converting ${e.length} URLs to BackgroundImage objects`),e.map(e=>({url:e,weather:De(e,ze)||Ae.All,timeOfDay:De(e,Ee)||Ie.Unspecified}))}}const Pe=new class extends Oe{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=Se("local-source")}async fetchImagesInternalAsync(e,t,i){return e.backgroundImages&&e.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${e.backgroundImages.length} images`),this.logger.debug(`First image URL: ${e.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(e.backgroundImages,t,i)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Te=new class extends Oe{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=Se("picsum-source")}async fetchImagesInternalAsync(e,t,i){const o=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${o}`),[o]}getDefaultConfig(){return{}}},Ne=new class extends Oe{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=Se("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(e,t,i){const o=e.count||5;let n=e.category||"";const a=e.apiKey||"";return this.logger.debug(`Current weather: ${t}, time of day: ${i}`),this.logger.debug(`Using category with weather and time: ${n}`),a?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(a,n,o,t,i,e)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(e,t,i,o,n,a){const r=[],s=(null==a?void 0:a.contentFilter)||"high";let l="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(l=e[0]),e.length>1&&(l+=` ${e.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${e.join(", ")}`)}const c=o.toLowerCase();l+=` ${c}`,"sunrise-sunset"===n?l+=" sunrise sunset dawn dusk":"day"===n?l+=" daylight midday day":"night"===n&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${n}`);try{let t="https://api.unsplash.com/photos/random?";const o=new URLSearchParams({client_id:e,count:i.toString(),orientation:"landscape",content_filter:s});l&&o.append("query",l);const n=new URLSearchParams(o);n.delete("client_id"),n.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${n.toString()}`),t+=o.toString();const a=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${a}`);const c=await fetch(t);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const d=await c.json();this.logger.debug(`API response received with ${Array.isArray(d)?d.length:0} images`),Array.isArray(d)&&d.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";r.push(t)}),this.logger.debug(`Fetched ${r.length} images from Unsplash API`)}catch(e){throw this.logger.error("Error fetching from Unsplash API:",e),e}return r}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Fe=new class extends Oe{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=Se("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}setHass(e){this.hass=e}async checkEntityAsync(e){try{if(!this.hass)return void this.logger.warn("Could not get Home Assistant instance");const t=this.hass.states[e];if(!t)return void this.logger.warn(`Entity ${e} not found`);this.updateCacheFromEntity(t),this.entityId=e,this.logger.debug(`Checked entity ${e}`)}catch(e){this.logger.error("Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)&&t.every(e=>"string"==typeof e)?(this.cachedImages=this.convertUrlsToBackgroundImages(t),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${t.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(e,t,i){const o=e.entity;if(!o)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(o);const n=Date.now();if(this.cachedImages.length>0&&n-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t,i);try{if(!this.hass)return this.logger.warn("Could not get Home Assistant instance"),[];const e=this.hass.states[o];return e?(this.updateCacheFromEntity(e),this.filterImagesByWeatherAndTime(this.cachedImages,t,i)):(this.logger.warn(`Sensor ${o} not found`),[])}catch(e){return this.logger.error("Error fetching images from sensor:",e),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Me=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=Se("null-source")}async fetchImagesAsync(e,t,i){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(e,t,i){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Re={local:Pe,picsum:Te,unsplash:Ne,sensor:Fe};class je{constructor(e){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=Se("background-image-manager"),this.hass=e}setHass(e){var t,i;this.hass=e,null===(i=null===(t=this.imageSource)||void 0===t?void 0:t.setHass)||void 0===i||i.call(t,e)}initialize(e={}){var t,i;const o=e.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${o}`),"none"===o)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var n;if(this.imageSourceId=o||"picsum",this.imageSource=(n=this.imageSourceId,Re[n]||Me),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;null===(i=(t=this.imageSource).setHass)||void 0===i||i.call(t,this.hass);const a=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...a,...e},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(e,t){var i;if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${e}, time of day: ${t}`);let o=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,e,t);if(o&&o.startsWith("media-source://"))try{if(null===(i=this.hass)||void 0===i?void 0:i.callWS){const e=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:o});o=e&&e.url?e.url:o}else this.logger.warn("Home Assistant instance not available to resolve media-source URL; using original URL")}catch(e){this.logger.error("Failed to resolve media-source URL",e)}return o?(this.logger.debug(`Got image URL: ${o}`),o):(this.logger.warn("No image URL returned from source"),"")}catch(e){return this.logger.error("Error getting next image URL:",e),""}}getImageSourceId(){return this.imageSourceId}}ke.getInstance().registerAll([Te,Pe,Ne,Fe]);const Le=[{code:"bg",label:"Bulgarian (Български)",locale:"bg-BG",translations:JSON.parse('{"common":{"title":"Времето","description":"Текущо време и прогноза","settings":"Настройки на времето"},"conditions":{"all":"Всички метеорологични условия","clouds":"Облачно","clear_sky":"Ясно","few_clouds":"Частична облачност","scattered_clouds":"Разкъсана облачност","broken_clouds":"Значителна облачност","overcast_clouds":"Плътна облачност","shower_rain":"Превалявания от дъжд","rain":"Дъжд","thunderstorm":"Гръмотевична буря","snow":"Сняг","light_snow":"Слаб сняг","mist":"Мъгла","light_rain":"Слаб дъжд","moderate_rain":"Умерен дъжд","heavy_intensity_rain":"Силен дъжд","sunny":"Слънчево","clear_night":"Ясна нощ","partlycloudy":"Предимно облачно","cloudy":"Облачно","rainy":"Дъждовно","snowy":"Снежно","fog":"Мъгла","hail":"Градушка","windy":"Ветровито"},"forecast":{"title":"Прогноза","today":"Днес","tomorrow":"Утре","next_days":"Следващите дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","light_snow":"Slabé sněžení","mist":"Mlha","light_rain":"Slabý déšť","moderate_rain":"Mírný déšť","heavy_intensity_rain":"Silný déšť","sunny":"Slunečno","clear_night":"Jasná noc","partlycloudy":"Polojasno","cloudy":"Oblačno","rainy":"Deštivo","snowy":"Sněžení","fog":"Mlha","hail":"Krupobití","windy":"Větrno"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","light_snow":"Let sne","mist":"Tåge","light_rain":"Let regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn","sunny":"Solrigt","clear_night":"Klar nat","partlycloudy":"Delvist skyet","cloudy":"Overskyet","rainy":"Regnfuldt","snowy":"Snevejr","fog":"Tåge","hail":"Hagl","windy":"Blæsende"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","light_snow":"Leichter Schneefall","mist":"Nebel","light_rain":"Leichter Regen","moderate_rain":"Mäßiger Regen","heavy_intensity_rain":"Starker Regen","sunny":"Sonnig","clear_night":"Klare Nacht","partlycloudy":"Teilweise bewölkt","cloudy":"Bewölkt","rainy":"Regnerisch","snowy":"Verschneit","fog":"Nebel","hail":"Hagel","windy":"Windig"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","light_snow":"Ελαφριά χιονόπτωση","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή","moderate_rain":"Μέτρια βροχή","heavy_intensity_rain":"Έντονη βροχή","sunny":"Ηλιοφάνεια","clear_night":"Αίθριος νυχτερινός ουρανός","partlycloudy":"Μερικώς συννεφιασμένος","cloudy":"Συννεφιά","rainy":"Βροχερός","snowy":"Χιονισμένος","fog":"Ομίχλη","hail":"Χαλάζι","windy":"Ανεμώδης"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","light_snow":"Light snow","mist":"Mist","light_rain":"Light rain","moderate_rain":"Moderate rain","heavy_intensity_rain":"Heavy rain","sunny":"Sunny","clear_night":"Clear night","partlycloudy":"Partly cloudy","cloudy":"Cloudy","rainy":"Rainy","snowy":"Snowy","fog":"Fog","hail":"Hail","windy":"Windy"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","light_snow":"Nieve ligera","mist":"Niebla","light_rain":"Lluvia ligera","moderate_rain":"Lluvia moderada","heavy_intensity_rain":"Lluvia intensa","sunny":"Soleado","clear_night":"Noche despejada","partlycloudy":"Parcialmente nublado","cloudy":"Nublado","rainy":"Lluvioso","snowy":"Nevado","fog":"Niebla","hail":"Granizo","windy":"Ventoso"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","light_snow":"Kevyt lumisade","mist":"Sumu","light_rain":"Kevyt sade","moderate_rain":"Kohtalainen sade","heavy_intensity_rain":"Voimakas sade","sunny":"Aurinkoinen","clear_night":"Selkeä yö","partlycloudy":"Puolipilvinen","cloudy":"Pilvinen","rainy":"Sateinen","snowy":"Luminen","fog":"Sumu","hail":"Rae","windy":"Tuulinen"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","light_snow":"Légère neige","mist":"Brouillard","light_rain":"Pluie légère","moderate_rain":"Pluie modérée","heavy_intensity_rain":"Pluie forte","sunny":"Ensoleillé","clear_night":"Nuit claire","partlycloudy":"Partiellement nuageux","cloudy":"Nuageux","rainy":"Pluvieux","snowy":"Neigeux","fog":"Brouillard","hail":"Grêle","windy":"Venteux"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","light_snow":"Gyenge havazás","mist":"Köd","light_rain":"Gyenge eső","moderate_rain":"Mérsékelt eső","heavy_intensity_rain":"Erős eső","sunny":"Napos","clear_night":"Tiszta éjszaka","partlycloudy":"Részben felhős","cloudy":"Felhős","rainy":"Esős","snowy":"Havas","fog":"Köd","hail":"Jégeső","windy":"Szeles"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","light_snow":"Neve leggera","mist":"Nebbia","light_rain":"Pioggia leggera","moderate_rain":"Pioggia moderata","heavy_intensity_rain":"Pioggia intensa","sunny":"Soleggiato","clear_night":"Notte serena","partlycloudy":"Parzialmente nuvoloso","cloudy":"Nuvoloso","rainy":"Piovoso","snowy":"Nevoso","fog":"Nebbia","hail":"Grandine","windy":"Ventoso"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","light_snow":"Lichte sneeuw","mist":"Mist","light_rain":"Lichte regen","moderate_rain":"Matige regen","heavy_intensity_rain":"Zware regen","sunny":"Zonnig","clear_night":"Heldere nacht","partlycloudy":"Half bewolkt","cloudy":"Bewolkt","rainy":"Regenachtig","snowy":"Sneeuwachtig","fog":"Mist","hail":"Hagel","windy":"Winderig"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","light_snow":"Lett snø","mist":"Tåke","light_rain":"Lett regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn","sunny":"Solfylt","clear_night":"Klar natt","partlycloudy":"Delvis skyet","cloudy":"Overskyet","rainy":"Regnfullt","snowy":"Snøfylt","fog":"Tåke","hail":"Hagl","windy":"Vindfullt"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","light_snow":"Lekki śnieg","mist":"Mgła","light_rain":"Lekki deszcz","moderate_rain":"Umiarkowany deszcz","heavy_intensity_rain":"Intensywny deszcz","sunny":"Słonecznie","clear_night":"Pogodna noc","partlycloudy":"Częściowe zachmurzenie","cloudy":"Pochmurno","rainy":"Deszczowo","snowy":"Śnieżnie","fog":"Mgła","hail":"Grad","windy":"Wietrznie"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","light_snow":"Neve leve","mist":"Névoa","light_rain":"Chuva fraca","moderate_rain":"Chuva moderada","heavy_intensity_rain":"Chuva forte","sunny":"Ensolarado","clear_night":"Noite limpa","partlycloudy":"Parcialmente nublado","cloudy":"Nublado","rainy":"Chuvoso","snowy":"Nevado","fog":"Nevoeiro","hail":"Granizo","windy":"Ventoso"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","light_snow":"Ninsoare ușoară","mist":"Ceață","light_rain":"Ploaie ușoară","moderate_rain":"Ploaie moderată","heavy_intensity_rain":"Ploaie puternică","sunny":"Însorit","clear_night":"Noapte senină","partlycloudy":"Parțial înnorat","cloudy":"Înnorat","rainy":"Ploios","snowy":"Înzăpezit","fog":"Ceață","hail":"Grindină","windy":"Vântos"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","light_snow":"Небольшой снег","mist":"Туман","light_rain":"Небольшой дождь","moderate_rain":"Умеренный дождь","heavy_intensity_rain":"Сильный дождь","sunny":"Солнечно","clear_night":"Ясная ночь","partlycloudy":"Переменная облачность","cloudy":"Облачно","rainy":"Дождливо","snowy":"Снежно","fog":"Туман","hail":"Град","windy":"Ветрено"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","light_snow":"Slabé sneženie","mist":"Hmla","light_rain":"Slabý dážď","moderate_rain":"Mierny dážď","heavy_intensity_rain":"Silný dážď","sunny":"Slnečno","clear_night":"Jasná noc","partlycloudy":"Polojasno","cloudy":"Oblačno","rainy":"Daždivo","snowy":"Sneženie","fog":"Hmla","hail":"Krupobitie","windy":"Veterno"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","light_snow":"Lätt snöfall","mist":"Dimma","light_rain":"Lätt regn","moderate_rain":"Måttligt regn","heavy_intensity_rain":"Kraftigt regn","sunny":"Soligt","clear_night":"Klar natt","partlycloudy":"Halvklart","cloudy":"Molnigt","rainy":"Regnigt","snowy":"Snöigt","fog":"Dimma","hail":"Hagel","windy":"Blåsigt"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Ue=Object.fromEntries(Le.map(e=>[e.code,e.translations]));let We={};function Be(){return Le.map(e=>e.code)}function He(e){const t=Le.find(t=>t.code===e);return(null==t?void 0:t.locale)||"en-US"}function Ve(e,t,i={},o){const n={...i};if(n.custom)return function(e,t,i,o){const n=He(t),a={EEEE:"weekday",EEE:"weekday",MMMM:"month",MMM:"month",MM:"month",M:"month",dd:"day",d:"day",yyyy:"year",yy:"year",HH:"hour",H:"hour",mm:"minute",m:"minute",ss:"second",s:"second"},r={EEEE:new Intl.DateTimeFormat(n,{weekday:"long",timeZone:o}),EEE:new Intl.DateTimeFormat(n,{weekday:"short",timeZone:o}),MMMM:new Intl.DateTimeFormat(n,{month:"long",timeZone:o}),MMM:new Intl.DateTimeFormat(n,{month:"short",timeZone:o}),MM:new Intl.DateTimeFormat(n,{month:"2-digit",timeZone:o}),M:new Intl.DateTimeFormat(n,{month:"numeric",timeZone:o}),dd:new Intl.DateTimeFormat(n,{day:"2-digit",timeZone:o}),d:new Intl.DateTimeFormat(n,{day:"numeric",timeZone:o}),yyyy:new Intl.DateTimeFormat(n,{year:"numeric",timeZone:o}),yy:new Intl.DateTimeFormat(n,{year:"2-digit",timeZone:o}),HH:new Intl.DateTimeFormat(n,{hour:"2-digit",hour12:!1,timeZone:o}),H:new Intl.DateTimeFormat(n,{hour:"numeric",hour12:!1,timeZone:o}),mm:new Intl.DateTimeFormat(n,{minute:"2-digit",timeZone:o}),m:new Intl.DateTimeFormat(n,{minute:"numeric",timeZone:o}),ss:new Intl.DateTimeFormat(n,{second:"2-digit",timeZone:o}),s:new Intl.DateTimeFormat(n,{second:"numeric",timeZone:o})};return i.replace(/EEEE|EEE|MMMM|MMM|MM|M|dd|d|yyyy|yy|HH|H|mm|m|ss|s/g,t=>{var i;const o=a[t];return(null===(i=r[t].formatToParts(e).find(e=>e.type===o))||void 0===i?void 0:i.value)||""})}(e,t,n.custom,o);if(o&&(n.timeZone=o),"hidden"===n.weekday&&(n.weekday=void 0),"hidden"===n.year&&(n.year=void 0),"hidden"===n.month&&(n.month=void 0),"hidden"===n.day&&(n.day=void 0),void 0===n.weekday&&void 0===n.year&&void 0===n.month&&void 0===n.day)return"";const a=He(t);if("short"===n.month){const t=new Intl.DateTimeFormat(a,{month:"short",timeZone:o}).format(e),i={...n};delete i.month;let r=e.toLocaleDateString(a,i);return"2-digit"===n.day?(r=r.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${t}`),r.includes(t)||(r=`${r} ${t}`)):r=e.toLocaleDateString(a,n),r}return e.toLocaleDateString(a,n)}class Ze{constructor(e,t){this._readyResolve=null,this.host=e,this.logger=Se(t),e.addController(this),this.ready=new Promise(e=>{this._readyResolve=e})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(e=>{this._readyResolve=e}),this.onHostDisconnected()}}class Je{constructor(){this.subscribers=new Map}static getInstance(){return Je.instance||(Je.instance=new Je),Je.instance}subscribe(e,t){this.subscribers.has(e)||this.subscribers.set(e,[]),this.subscribers.get(e).push(t)}unsubscribe(e,t){const i=this.subscribers.get(e);i&&this.subscribers.set(e,i.filter(e=>e!==t))}publish(e){const t=e.constructor;(this.subscribers.get(t)||[]).forEach(t=>t(e))}}class qe{constructor(e){this.weather=e}}class Ke{constructor(){}}class Ge{constructor(){}}class Ye{constructor(){}}class Xe{constructor(){}}var Qe,et,tt;!function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(Qe||(Qe={})),function(e){e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night",e.Unspecified="unspecified"}(et||(et={})),function(e){e.Large="large",e.Medium="medium",e.Small="small",e.Custom="custom"}(tt||(tt={}));const it={clockSize:{large:"18rem",medium:"16rem",small:"14rem"},dateSize:{large:"6rem",medium:"6rem",small:"4rem"},labelSize:{large:"1.8rem",medium:"1.2rem",small:"1.0rem"},valueSize:{large:"3rem",medium:"2rem",small:"1.5rem"},iconSize:{large:"84px",medium:"72px",small:"60px"},buttonSize:{large:"168px",medium:"144px",small:"120px"},forecastTempWidth:{large:"120px",medium:"80px",small:"70px"}};function ot(e,t,i){if(e===tt.Custom&&t)return t;const o=it[i];return e===tt.Large?o.large:e===tt.Small?o.small:o.medium}class nt extends Ze{constructor(e,t={}){super(e,"background-image-controller"),this.backgroundImageManager=new je,this.currentWeather=Ae.All,this.messenger=Je.getInstance(),this._currentImageUrl="",this._previousImageUrl="",this._fetchingImageUrls=!1,this.onWeather=e=>{this.logger.info("New message for weather:",e.weather),this.updateWeather(e.weather)},this.onFetchNextImage=e=>{this.logger.info("Fetch next image requested"),this.setupImageRotation(),this.fetchNewImageAsync(this.currentWeather)},this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:1e3,fill:"forwards"},this.config=t}updateHass(e){this.hass=e,this.backgroundImageManager.setHass(e)}onHostConnected(){this.messenger.subscribe(qe,this.onWeather),this.messenger.subscribe(Xe,this.onFetchNextImage),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){this.messenger.unsubscribe(qe,this.onWeather),this.messenger.unsubscribe(Xe,this.onFetchNextImage),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(e){const t={...this.config};this.config={...this.config,...e},xe.info("Update the BackgroundImageController with new configuration");const i=this.isInitialized;t.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{i&&this.fetchNewImageAsync(this.currentWeather).catch(e=>this.logger.error("Error fetching image after reinitialization:",e))}).catch(e=>this.logger.error("Error during BackgroundImageManager initialization:",e)):t.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:e,...t}=this.config.imageSourceConfig||{},i=t.imageSourceId?t:{imageSourceId:"picsum"};this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${i.imageSourceId||"default"}`);const o=this.backgroundImageManager.initialize(i);if(o&&this.backgroundImageManager.setHass(this.hass),!o)return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(e){this.logger.error("Error fetching image URLs:",e)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const e=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${e/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(e){this.logger.error("Error in image rotation interval:",e)}})()},e)}async fetchNewImageAsync(e){try{let t=e,i=function(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?Ie.SunriseSunset:e>=9&&e<17?Ie.Day:e>=21||e<5?Ie.Night:Ie.Unspecified}();const o=await this.backgroundImageManager.getNextImageUrlAsync(t,i);if(o){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`);const e=new Image;e.onload=async()=>{this.logger.debug(`New image loaded successfully: ${o}`),this._currentImageUrl?this._previousImageUrl=this._currentImageUrl:this._previousImageUrl="",this._currentImageUrl=o,this.host.requestUpdate(),await this.host.updateComplete,await this.fireAnimate()},e.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`)},e.src=o}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(e){this.logger.error("Error fetching new dynamic image:",e)}}async fireAnimate(){const e=function(e){const t=e;return t.shadowRoot?Array.from(t.shadowRoot.querySelectorAll(".background-image")):[]}(this.host);0!==e.length&&(1===e.length?e[0].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"}):(e[0].animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),e[1].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})),this._previousImageUrl="")}updateWeather(e){this.isInitialized?this.currentWeather!==e&&(this.logger.info(`Updating weather condition to: ${e}`),this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after weather update:",e))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after initialization:",e))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}}var at=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let rt=class extends he{constructor(){super(),this.backgroundOpacity=.5,this.objectFit="cover",this.logger=Se("background-image-component"),this.backgroundImageController=new nt(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(e){var t;super.updated(e),e.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(t=this.config)&&void 0!==t?t:{})),e.has("hass")&&this.backgroundImageController.updateHass(this.hass)}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}render(){const e=this.currentImageUrl,t=this.previousImageUrl,i=this.objectFit||"cover";return V`
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
        `}};var st,lt,ct;function dt(){return(dt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e}).apply(this,arguments)}rt.styles=a`
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
    `,at([me({type:Number})],rt.prototype,"backgroundOpacity",void 0),at([me({type:String})],rt.prototype,"objectFit",void 0),at([me({type:Object})],rt.prototype,"config",void 0),at([me({type:Object})],rt.prototype,"hass",void 0),rt=at([ge("ha-background-image")],rt),(ct=st||(st={})).language="language",ct.system="system",ct.comma_decimal="comma_decimal",ct.decimal_comma="decimal_comma",ct.space_comma="space_comma",ct.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(lt||(lt={}));var ht=function(e,t){var i=dt({maximumFractionDigits:2},t);if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var o=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=o,i.maximumFractionDigits=o}return i},ut=["closed","locked","off"],gt=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(e,t,i,o){o=o||{},i=null==i?{}:i;var n=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,e.dispatchEvent(n),n});new Set(["call-service","divider","section","weblink","cast","select"]);var pt=function(e){gt(window,"haptic",e)},ft=function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),gt(window,"location-changed",{replace:i})},mt=function(e,t,i,o){var n;"double_tap"===o&&i.double_tap_action?n=i.double_tap_action:"hold"===o&&i.hold_action?n=i.hold_action:"tap"===o&&i.tap_action&&(n=i.tap_action),function(e,t,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(pt("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&gt(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&ft(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var o,n=function(e){return e.substr(0,e.indexOf("."))}(t),a="group"===n?"homeassistant":n;switch(n){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}e.callService(a,o,{entity_id:t})})(e,t,ut.includes(e.states[t].state))}(t,i.entity),pt("success"));break;case"call-service":if(!o.service)return void pt("failure");var n=o.service.split(".",2);t.callService(n[0],n[1],o.service_data,o.target),pt("success");break;case"fire-dom-event":gt(e,"ll-custom",o)}}(e,t,i,n)};function vt(e){return void 0!==e&&"none"!==e.action}var yt,wt=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};class bt extends he{updated(e){super.updated(e)}_handleFormValueChanged(e){if(e.stopPropagation(),!this.config)return;const t=JSON.parse(JSON.stringify(this.config));this.setPropertyByPath(t,e.detail.propertyName,e.detail.value),gt(this,"config-changed",{config:t})}setPropertyByPath(e,t,i){if(!t)return e;const o=t.split(".");let n=e;for(let e=0;e<o.length-1;e++){const t=o[e];if(t.includes("[")&&t.includes("]")){const e=t.substring(0,t.indexOf("[")),i=parseInt(t.substring(t.indexOf("[")+1,t.indexOf("]")),10);n[e]||(n[e]=[]),n[e][i]||(n[e][i]={}),n=n[e][i]}else n[t]||(n[t]={}),n=n[t]}return n[o[o.length-1]]=i,e}}wt([me({type:Object})],bt.prototype,"hass",void 0),wt([me({type:Object})],bt.prototype,"config",void 0),function(e){e.Left="left",e.Center="center",e.Right="right"}(yt||(yt={}));class _t{constructor(){this.handlers=new Map}static getInstance(){return _t.instance||(_t.instance=new _t),_t.instance}registerHandler(e,t){this.handlers.set(e,t)}getHandler(e){return this.handlers.get(e)}}class $t extends Ze{constructor(e,t={}){super(e,"action-bar-controller"),this.config={},this.config=t,this.registry=_t.getInstance()}onHostConnected(){this.logger.debug("Action bar controller connected")}onHostDisconnected(){this.logger.debug("Action bar controller disconnected")}updateConfig(e){this.logger.debug("Updating ActionBarController config:",e),this.config={...this.config,...e},this.host.requestUpdate()}get actionBarConfig(){return this.config.actionBar}get isActionBarEnabled(){var e;return!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}registerActionHandler(e,t){this.logger.debug(`Registering handler for action type: ${e}`),this.registry.registerHandler(e,t)}getActionHandler(e){return this.registry.getHandler(e)}}const St=e=>(...t)=>({_$litDirective$:e,values:t});class Ct{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const xt=St(class extends Ct{constructor(e){if(super(e),6!==e.type)throw new Error("actionHandler must be attached to an element")}render(e){return Z}update(e,[t]){return this.attach(e.element,t||{}),Z}attach(e,t){if(e._actionHandlerOptions=t,e._actionHandlerAttached)return;let i;e._actionHandlerAttached=!0;let o,n=!1;const a=t=>{gt(e,"action",{action:t})},r=()=>{void 0!==i&&(window.clearTimeout(i),i=void 0)};e.addEventListener("pointerdown",()=>{var t;n=!1,(null===(t=e._actionHandlerOptions)||void 0===t?void 0:t.hasHold)&&(r(),i=window.setTimeout(()=>{n=!0,a("hold")},500))}),e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r),e.addEventListener("pointerleave",r),e.addEventListener("click",()=>{var t;n?n=!1:(null===(t=e._actionHandlerOptions)||void 0===t?void 0:t.hasDoubleClick)?void 0!==o?(window.clearTimeout(o),o=void 0,a("double_tap")):o=window.setTimeout(()=>{o=void 0,a("tap")},250):a("tap")}),e.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),a("tap"))})}});class kt{constructor(){this.plugins=new Map,this.actionRegistry=_t.getInstance()}static getInstance(){return kt.instance||(kt.instance=new kt),kt.instance}registerPlugin(e){const t=e.actionId;this.plugins.set(t,e)}registerPluginWithHandler(e){this.registerPlugin(e),this.actionRegistry.registerHandler(e.actionId,e.handler)}getAllPlugins(){return Array.from(this.plugins.values())}getPlugin(e){return this.plugins.get(e)}getAllActionIds(){return Array.from(this.plugins.keys())}}function It(e){kt.getInstance().registerPluginWithHandler(e)}class At extends he{activate(){}deactivate(){}}var zt=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Et=class extends At{get priority(){return 5}get isActive(){var e;return!0===(null===(e=this.config)||void 0===e?void 0:e.enabled)&&this.config.actions&&this.config.actions.length>0}constructor(){super(),this.logger=Se("action-bar-component"),this.actionBarController=new $t(this,{actionBar:this.config})}get controller(){return this.actionBarController}getIconSize(){return ot(this.size,this.iconSize,"iconSize")}getButtonSize(){return function(e,t){if(e===tt.Custom&&t){const e=parseInt(t);return isNaN(e)?it.buttonSize.medium:2*e+"px"}return ot(e,void 0,"buttonSize")}(this.size,this.iconSize)}updated(e){super.updated(e),e.has("config")&&(this.logger.debug("Config properties changed, updating ActionBarController"),this.actionBarController.updateConfig({actionBar:this.config}),Je.getInstance().publish(new Ge)),e.has("hass")&&this.hass&&this.requestUpdate()}getJustifyContent(){if(!this.config||!this.config.alignment)return"center";switch(this.config.alignment){case yt.Left:return"flex-start";case yt.Right:return"flex-end";case yt.Center:default:return"center"}}render(){if(!this.config||!1===this.config.enabled||!this.config.actions||0===this.config.actions.length)return V``;const e=this.getJustifyContent(),t=this.getButtonSize(),i=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.3;return this.logger.debug(`Rendering action bar - ButtonSize: ${t}`),V`
            <div class="action-bar-container" 
                style="color: ${this.fontColor}; 
                       justify-content: ${e}; 
                       background-color: rgba(0, 0, 0, ${i});
                       --action-button-size: ${t};">
                ${this.config.actions.map(e=>this.renderActionButton(e))}
            </div>
        `}renderActionButton(e){const t=kt.getInstance().getPlugin(e.actionId);let i=e.active||!1,o=e.icon;t&&"getIconForState"in t&&this.hass&&(o=t.getIconForState(e,this.hass)),t&&"getActiveState"in t&&(i=t.getActiveState());const n=i?"active":"",a=i&&e.activeColor?`--active-icon-color: ${e.activeColor};`:"";return V`
            <div class="action-button ${n}"
                 style="${a}"
                 role="button"
                 tabindex="0"
                 aria-label="${e.title}"
                 ${xt({hasHold:vt(e.hold_action),hasDoubleClick:vt(e.double_tap_action)})}
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
        `}_handleAction(e,t){this.hass?(this.logger.debug(`Action ${t}:`,e),function(e,t,i,o="tap"){let n="hold"===o?e.hold_action:"double_tap"===o?e.double_tap_action:e.tap_action;var a;if(n&&(!(a=n)||"object"!=typeof a||Array.isArray(a)||"string"!=typeof a.action)&&(console.warn(`Ignoring invalid ${o} action config (expected an object with an "action" key):`,n),n=void 0),n){const a={...e},r=n.entity||n.entity_id||e.entity_id;return!a.entity&&r&&(a.entity=r),void mt(i||document.body,t,a,o)}if("tap"!==o)return;const r=_t.getInstance().getHandler(e.actionId);r?r(e,t,i):console.warn(`No handler registered for action type: ${e.actionId}`)}(e,this.hass,this,t)):this.logger.error("Home Assistant instance not available")}};Et.styles=a`
        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own content. */
        .action-bar-container {
            width: 100%;
            box-sizing: border-box;
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
    `,zt([me({type:Object})],Et.prototype,"config",void 0),zt([me({type:String})],Et.prototype,"fontColor",void 0),zt([me({type:Object})],Et.prototype,"hass",void 0),zt([me({type:String})],Et.prototype,"size",void 0),zt([me({type:String})],Et.prototype,"iconSize",void 0),Et=zt([ge("ha-action-bar")],Et);const Dt="action-navigate",Ot=(e,t,i)=>{const{path:o,target:n}=e;"_blank"!==n?ft(i||document.body,o):window.open(o,"_blank")};var Pt,Tt=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};class Nt extends he{updated(e){super.updated(e)}handleInputChange(e,t){t.stopPropagation(),t.preventDefault();const i=t.target;i&&this.actionChanged(this.index,e,i.value||"")}handleValueChange(e,t){t.stopPropagation(),t.preventDefault(),this.actionChanged(this.index,e,t.detail.value)}}Tt([me({type:Object})],Nt.prototype,"hass",void 0),Tt([me({type:Object})],Nt.prototype,"actionConfig",void 0),Tt([me({type:Number})],Nt.prototype,"index",void 0),Tt([me({type:Function})],Nt.prototype,"actionChanged",void 0),function(e){e.Left="left",e.Top="top",e.Hidden="hidden"}(Pt||(Pt={}));let Ft=class extends Nt{get navigationAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"text"}}}
                    .value=${this.navigationAction.path||""}
                    .label= ${"Navigation Path"}
                    .labelPosition=${Pt.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${e=>this.handleValueChange("path",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"_self",label:"Current Tab"},{value:"_blank",label:"New Tab"}],mode:"dropdown"}}}
                    .value=${this.navigationAction.target||"_self"}
                    .label= ${"Open In"}
                    .labelPosition=${Pt.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${e=>this.handleValueChange("target",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.navigationAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the navigation action is active"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Ft=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("navigation-editor-plugin")],Ft);const Mt="action-ha",Rt=(e,t,i)=>{mt(i||document.body,t,{entity:e.entity,tap_action:e.tap_action},"tap")};let jt=class extends Nt{get haAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.haAction.entity||""}
                    .required=${!1}
                    .label=${"Entity"}
                    .helper=${"Entity used by the more-info and toggle actions"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.tap_action}
                    .label=${"Tap Action"}
                    .helper=${"Standard Home Assistant action to run on tap"}
                    .labelPosition=${Pt.Top}
                    @value-changed=${e=>this.handleValueChange("tap_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.hold_action}
                    .required=${!1}
                    .label=${"Hold Action"}
                    .helper=${"Standard Home Assistant action to run on hold"}
                    .labelPosition=${Pt.Top}
                    @value-changed=${e=>this.handleValueChange("hold_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.double_tap_action}
                    .required=${!1}
                    .label=${"Double Tap Action"}
                    .helper=${"Standard Home Assistant action to run on double tap"}
                    .labelPosition=${Pt.Top}
                    @value-changed=${e=>this.handleValueChange("double_tap_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.haAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the action is active"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};jt=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("ha-action-editor-plugin")],jt);const Lt="call-service",Ut=(e,t,i)=>{const{service:o,service_data:n,target:a,confirmation:r,confirmation_text:s}=e;mt(i||document.body,t,{tap_action:{action:"call-service",service:o,service_data:n,target:a,confirmation:r?{text:s||`Are you sure you want to call ${o}?`}:void 0}},"tap")};let Wt=class extends Nt{get serviceCallAction(){return this.actionConfig}get uiActionValue(){const{service:e,service_data:t,target:i}=this.serviceCallAction;return{action:"perform-action",perform_action:e||"",data:t,target:i}}_serviceChanged(e){var t,i,o;e.stopPropagation(),e.preventDefault();const n=e.detail.value||{};this.actionChanged(this.index,"service",null!==(i=null!==(t=n.perform_action)&&void 0!==t?t:n.service)&&void 0!==i?i:""),this.actionChanged(this.index,"service_data",null!==(o=n.data)&&void 0!==o?o:n.service_data),this.actionChanged(this.index,"target",n.target)}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{actions:["perform-action"],default_action:"perform-action"}}}
                    .value=${this.uiActionValue}
                    .label=${"Service"}
                    .helper=${"Service to call, including data and target"}
                    .labelPosition=${Pt.Top}
                    @value-changed=${e=>this._serviceChanged(e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{boolean:{}}}
                    .value=${this.serviceCallAction.confirmation||!1}
                    .label=${"Ask for confirmation"}
                    .helper=${"Show a confirmation dialog before calling the service"}
                    .labelPosition=${Pt.Left}
                    @value-changed=${e=>this.handleValueChange("confirmation",e)}
            ></ha-row-selector>

            ${this.serviceCallAction.confirmation?V`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{type:"text"}}}
                        .value=${this.serviceCallAction.confirmation_text||""}
                        .required=${!1}
                        .label=${"Confirmation Text"}
                        .helper=${"Custom text for the confirmation dialog"}
                        .labelPosition=${Pt.Hidden}
                        @value-changed=${e=>this.handleValueChange("confirmation_text",e)}
                ></ha-row-selector>
            `:""}

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.serviceCallAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the service call action is active"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Wt=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("service-call-editor-plugin")],Wt);const Bt="light-toggle",Ht=(e,t)=>{const{entity_id:i}=e;i?t.states[i]?t.callService("light","toggle",{entity_id:i}):console.warn(`Entity ${i} not found`):console.warn("No entity_id specified for light toggle action")};let Vt=class extends Nt{get lightToggleAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"light"}}}
                    .value=${this.lightToggleAction.entity_id||""}
                    .label=${"Light Entity"}
                    .helper=${"Select a light entity to toggle"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for light on state"}}}
                    .value=${this.lightToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when light is on"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.lightToggleAction.activeColor||"#ffeb3b"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the light is on (active state)"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};Vt.styles=a`
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
    `,Vt=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("light-toggle-editor-plugin")],Vt);const Zt="switch-toggle",Jt=(e,t)=>{const{entity_id:i}=e;i?t.states[i]?t.callService("switch","toggle",{entity_id:i}):console.warn(`Entity ${i} not found`):console.warn("No entity_id specified for switch toggle action")};let qt=class extends Nt{get switchToggleAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"switch"}}}
                    .value=${this.switchToggleAction.entity_id||""}
                    .label=${"Switch Entity"}
                    .helper=${"Select a switch entity to toggle"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for switch on state"}}}
                    .value=${this.switchToggleAction.icon_on||""}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when switch is on"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.switchToggleAction.activeColor||"#4CAF50"}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the switch is on (active state)"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};qt.styles=a`
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
    `,qt=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("switch-toggle-editor-plugin")],qt);const Kt=Se("weather-update-plugin"),Gt="weather-update",Yt=(e,t)=>{Kt.info("Weather update clicked"),Je.getInstance().publish(new Ke)};class Xt{constructor(){this.actionId=Gt,this.name="Update Weather",this.description="Trigger an immediate weather update",this.icon="mdi:weather-partly-cloudy",this.handler=Yt,this.editorTag="weather-update-editor-plugin"}defaultActionConfig(){return{actionId:Gt,title:"Update Weather",icon:this.icon}}register(){It(this)}}function Qt(){(new Xt).register()}let ei=class extends Nt{get weatherUpdateAction(){return this.actionConfig}render(){return V`
            <div class="helper-text">
                This action will trigger an immediate weather update when clicked.
                No additional configuration is needed.
            </div>
        `}};ei.styles=a`
        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,ei=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("weather-update-editor-plugin")],ei),Qt();const ti="transportation",ii=Se("transportation-plugin"),oi=(e,t)=>{ii.info("Transportation clicked"),Je.getInstance().publish(new Ye)};class ni{constructor(){this.actionId=ti,this.name="Transportation",this.description="Show transportation information",this.icon="mdi:bus-clock",this.handler=oi,this.editorTag=""}defaultActionConfig(){return{actionId:ti,title:"Transportation",icon:this.icon}}register(){It(this)}}function ai(){(new ni).register()}ai();const ri="background-next",si=Se("background-next-plugin"),li=(e,t)=>{si.info("Background next clicked"),Je.getInstance().publish(new Xe)};class ci{constructor(){this.actionId=ri,this.name="Next Background",this.description="Show next background image",this.icon="mdi:image-refresh",this.handler=li,this.editorTag=""}defaultActionConfig(){return{actionId:ri,title:"Next Background",icon:this.icon}}register(){It(this)}}function di(){(new ci).register()}di();const hi="action-more-info",ui=Se("more-info-plugin"),gi=(e,t,i)=>{const{entity_id:o}=e;if(!o)return void ui.warn("No entity_id specified for more-info action");const n=t.states[o];if(n){ui.info(`Opening more-info for entity ${o} (${n.entity_id})`);try{const e={entityId:o,view:"info"};gt(i||document.body,"hass-more-info",e)}catch(e){ui.warn("Error using fireEvent method:",e)}}else ui.warn(`Entity ${o} not found`)};let pi=class extends Nt{get moreInfoAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.moreInfoAction.entity_id||""}
                    .label=${"Entity"}
                    .helper=${"Select an entity to show more info for"}
                    .labelPosition=${Pt.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>
        `}};pi.styles=a`
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
    `,pi=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("more-info-editor-plugin")],pi),(new class{constructor(){this.actionId=Dt,this.name="Navigate to Page",this.description="Navigate to a different page in Home Assistant",this.icon="mdi:arrow-right",this.handler=Ot,this.editorTag="navigation-editor-plugin"}defaultActionConfig(){return{actionId:Dt,title:"Navigate",icon:this.icon,path:"/"}}register(){It(this)}}).register(),(new class{constructor(){this.actionId=Mt,this.name="Home Assistant Action",this.description="Run a standard Home Assistant action (navigate, call service, more info, url, toggle)",this.icon="mdi:gesture-tap",this.handler=Rt,this.editorTag="ha-action-editor-plugin"}defaultActionConfig(){return{actionId:Mt,title:"Action",icon:this.icon,tap_action:{action:"navigate",navigation_path:"/config"}}}register(){It(this)}}).register(),(new class{constructor(){this.actionId=Lt,this.name="Call Service",this.description="Call a Home Assistant service",this.icon="mdi:lightbulb",this.handler=Ut,this.editorTag="service-call-editor-plugin"}defaultActionConfig(){return{actionId:Lt,service:"light.toggle",service_data:{entity_id:"light.living_room"},title:"Toggle Light",icon:this.icon}}register(){It(this)}}).register(),(new class{constructor(){this.actionId=Bt,this.name="Toggle Light",this.description="Toggle a light on or off",this.icon="mdi:lightbulb",this.handler=Ht,this.editorTag="light-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:i}=e;if(!i)return e.icon||this.icon;const o=t.states[i];return o?(this._lastActiveState="on"===o.state,this._lastActiveState?e.icon_on||"mdi:lightbulb-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:Bt,entity_id:"",title:"Toggle Light",icon:this.icon,icon_on:"mdi:lightbulb-on"}}register(){It(this)}}).register(),(new class{constructor(){this.actionId=Zt,this.name="Toggle Switch",this.description="Toggle a switch on or off",this.icon="mdi:toggle-switch-variant-off",this.handler=Jt,this.editorTag="switch-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:i}=e;if(!i)return e.icon||this.icon;const o=t.states[i];return o?(this._lastActiveState="on"===o.state,this._lastActiveState?e.icon_on||"mdi:toggle-switch-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:Zt,entity_id:"",title:"Toggle Switch",icon:this.icon,icon_on:"mdi:toggle-switch-variant"}}register(){It(this)}}).register(),Qt(),ai(),di(),(new class{constructor(){this.actionId=hi,this.name="Entity More Info",this.description="Open the default modal window of an entity",this.icon="mdi:information-outline",this.handler=gi,this.editorTag="more-info-editor-plugin"}defaultActionConfig(){return{actionId:hi,title:"More Info",icon:this.icon,entity_id:""}}register(){It(this)}}).register();var fi=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let mi=class extends bt{constructor(){super(...arguments),this._actions=[],this._editorComponentCache=new Map}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadActions()}_loadActions(){var e;(null===(e=this.config)||void 0===e?void 0:e.actionBar)&&this.config.actionBar.actions&&this.config.actionBar.actions.length>0?this._actions=[...this.config.actionBar.actions]:this._actions=[]}_getActionTypeOptions(){return kt.getInstance().getAllPlugins().map(e=>({value:e.actionId,label:e.name}))}_getEditorTagName(e){const t=kt.getInstance().getPlugin(e);return t&&t.editorTag?t.editorTag:null}_createEditorTagComponent(e,t){const i=this._getEditorTagName(e.actionId);if(!i)return"";const o=`${e.actionId}-${t}`;if(this._editorComponentCache.has(o)){const t=this._editorComponentCache.get(o);return this.hass&&(t.hass=this.hass),t.actionConfig=e,t}try{const n=document.createElement(i);return this.hass&&(n.hass=this.hass),n.actionConfig=e,n.index=t,n.actionChanged=this._actionChanged.bind(this),this._editorComponentCache.set(o,n),n}catch(e){return console.error(`Error creating editor component ${i}:`,e),""}}_addAction(){const e=this._getActionTypeOptions(),t=e.length>0?e[0].value:Dt;let i;const o=kt.getInstance().getPlugin(t);if(i=o&&o.defaultActionConfig?o.defaultActionConfig():{actionId:t,title:"Action",icon:"mdi:flash"},this._editorComponentCache.clear(),this._actions=[...this._actions,i],this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],e.actionBar.enabled=!0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionUp(e){if(e<=0||e>=this._actions.length)return;this._editorComponentCache.clear();const t=[...this._actions],i=t[e];if(t[e]=t[e-1],t[e-1]=i,this._actions=t,this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionDown(e){if(e<0||e>=this._actions.length-1)return;this._editorComponentCache.clear();const t=[...this._actions],i=t[e];if(t[e]=t[e+1],t[e+1]=i,this._actions=t,this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeAction(e){if(this._editorComponentCache.clear(),this._actions=this._actions.filter((t,i)=>i!==e),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],0===this._actions.length&&(e.actionBar&&(e.actionBar.enabled=!1),e.actionBar=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_actionChanged(e,t,i){if("actionId"===t){const t=this._actions[e];if(t){const i=`${t.actionId}-${e}`;this._editorComponentCache.delete(i)}}if(this._actions=this._actions.map((o,n)=>n===e?{...o,[t]:i}:o),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
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
                            .selector=${{select:{options:[{value:yt.Left,label:"Left"},{value:yt.Center,label:"Center"},{value:yt.Right,label:"Right"}],mode:"dropdown"}}}
                            .value=${(null===(i=this.config.actionBar)||void 0===i?void 0:i.alignment)||yt.Center}
                            .label= ${"Button Alignment"}
                            .helper= ${"Align buttons to the left, center, or right"}
                            .labelPosition=${Pt.Top}
                            propertyName="actionBar.alignment"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                            .value=${void 0!==(null===(o=this.config.actionBar)||void 0===o?void 0:o.backgroundOpacity)?this.config.actionBar.backgroundOpacity:.3}
                            .label= ${"Background Opacity"}
                            .helper= ${"Adjust the transparency of the action bar background (0 = fully transparent, 1 = fully opaque)"}
                            .labelPosition=${Pt.Top}
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
                                .labelPosition=${Pt.Hidden}
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
                                .labelPosition=${Pt.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const i=e.detail.value;this._actionChanged(t,"title",i||"")}}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{icon:{placeholder:"mdi:clock"}}}
                                .value=${e.icon||""}
                                .label=${"Icon"}
                                .helper= ${"Icon for the action button"}
                                .labelPosition=${Pt.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const i=e.detail.value;this._actionChanged(t,"icon",i||"")}}
                        ></ha-row-selector>

                        <!-- Editor components are now dynamically created by the factory pattern -->
                        ${this._createEditorTagComponent(e,t)}
                    `)}

                    <mwc-button @click=${this._addAction}>Add Action</mwc-button>
                `:""}
            </div>
        `:V``}};fi([me({type:Array})],mi.prototype,"_actions",void 0),mi=fi([ge("action-bar-editor")],mi);var vi=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let yi=class extends bt{constructor(){super(...arguments),this._backgroundImages=[],this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._objectFitOptions=[{value:"fill",label:"Fill"},{value:"contain",label:"Contain"},{value:"cover",label:"Cover"},{value:"none",label:"None"},{value:"scale-down",label:"Scale Down"}]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadBackgroundImages()}_loadBackgroundImages(){var e;(null===(e=this.config)||void 0===e?void 0:e.backgroundImages)&&this.config.backgroundImages.length>0?this._backgroundImages=[...this.config.backgroundImages]:this._backgroundImages=[]}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:Ae.All,timeOfDay:Ie.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,i)=>i!==e),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this.config){const e=JSON.parse(JSON.stringify(this.config));e.backgroundImages=[...this._backgroundImages],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
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
                                .selector=${{select:{options:Object.values(Ae).map(e=>({value:e,label:e}))}}}
                                .value=${e.weather}
                                .label= ${"Weather Condition"}
                                propertyName="backgroundImages.${t}.weather"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                    <div class="image-time">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:Object.values(Ie).map(e=>({value:e,label:e}))}}}
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
        `}};vi([me({type:Array})],yi.prototype,"_backgroundImages",void 0),yi=vi([ge("background-editor")],yi);let wi=class extends bt{constructor(){super(...arguments),this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]}}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n,a,r;return this.hass&&this.config?V`
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
                        .value=${void 0===(null===(a=this.config.dateFormat)||void 0===a?void 0:a.year)?"undefined":null===(r=this.config.dateFormat)||void 0===r?void 0:r.year}
                        .label= ${"Year Display"}
                        propertyName="dateFormat.year"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `:V``}};wi=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("date-format-editor")],wi);let bi=class extends bt{constructor(){super(...arguments),this._timeFormatOptions={hour12:[{value:"true",label:"12-hour"},{value:"false",label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]}}static get styles(){return a`
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
        `:V``}};bi=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("time-format-editor")],bi);var _i=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let $i=class extends bt{constructor(){super(...arguments),this._sensors=[]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadSensors()}_loadSensors(){var e;(null===(e=this.config)||void 0===e?void 0:e.sensors)&&this.config.sensors.length>0?this._sensors=[...this.config.sensors]:this._sensors=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,i)=>i!==e),this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
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
                                .labelPosition=${Pt.Top}
                                propertyName="sensors.${t}.label"
                                @value-changed=${this._handleFormValueChanged}
                                style="flex: 0 0 30%; margin-right: 8px; overflow: hidden;"
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{entity:{filter:{domain:["sensor","binary_sensor","input_text","input_number","input_datetime","sun","weather"]}}}}
                                .value=${e.entity||""}
                                .label=${"Entity"}
                                .labelPosition=${Pt.Top}
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
        `:V``}};_i([me({type:Array})],$i.prototype,"_sensors",void 0),$i=_i([ge("sensors-editor")],$i);class Si{static getInstance(){return Si.instance||(Si.instance=new Si),Si.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&xe.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const Ci=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(e,t){try{if(0===t.length)throw new Error("No stops configured");const i={};for(const e of t){const t=String(e.stopId);i[t]||(i[t]=[]),i[t].push(e)}const o=[];for(const t of Object.keys(i)){const n=i[t],a=n.map(e=>e.postId),r=`https://transportation-proxy.datario.app/proxy/departures?stopid=${t}`,s=await fetch(r,{headers:{"X-Api-Key":"2f8a0c7b2e9a44a4b8aa9a6b4a3d1e2f"}});if(!s.ok)throw new Error(`Failed to fetch transportation data: ${s.status} ${s.statusText}`);const l=await s.json();if(l.Error)throw new Error(`API error: ${l.Error}`);for(const i of a){const a=l.PostList.find(e=>e.PostID===i);if(!a){xe.warn(`No platform found with postId ${i} for stopId ${t}`);continue}const r=a.Name,s=n.find(e=>e.postId===i);if(!s)continue;const c=s.name||r,d=e.maxDepartures||2,h=a.Departures.slice(0,Math.min(d,5)).map(e=>({lineId:e.LineId||e.Line,lineName:e.Line||e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:c,postId:i}));o.push(...h)}}return{departures:o,loading:!1}}catch(e){return xe.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}},xi=Si.getInstance();xi.register(Ci);var ki=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Ii=class extends bt{constructor(){super(...arguments),this._stops=[]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadStops()}_loadStops(){var e;(null===(e=this.config)||void 0===e?void 0:e.transportation)&&this.config.transportation.stops&&this.config.transportation.stops.length>0?this._stops=[...this.config.transportation.stops]:this._stops=[]}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeStop(e){if(this._stops=this._stops.filter((t,i)=>i!==e),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_stopChanged(e,t,i){if(this._stops=this._stops.map((o,n)=>n===e?{...o,[t]:i}:o),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_getTransportationProviderOptions(){return[...xi.getAllProviders().map(e=>({value:e.id,label:e.name}))]}static get styles(){return a`
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
        `:V``}};ki([me({type:Array})],Ii.prototype,"_stops",void 0),Ii=ki([ge("transportation-editor")],Ii);let Ai=class extends bt{constructor(){super(...arguments),this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"homeassistant",label:"Home Assistant Entity"},{value:"openweathermap",label:"OpenWeatherMap"}],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}],this._weatherIconSetOptions=[{value:"metno",label:"Met.no (SVG)"},{value:"openweathermap",label:"OpenWeatherMap (PNG)"},{value:"basmilius",label:"Bas Milius (Animated)"}]}static get styles(){return a`
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
        `:V``}};Ai=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("weather-editor")],Ai);const zi=["top-left","top-center","top-right","middle-left","center","middle-right","bottom-left","bottom-center","bottom-right"],Ei={compact:{padding:"8px",zoneGap:"8px",widgetGap:"4px"},normal:{padding:"16px",zoneGap:"16px",widgetGap:"8px"},spacious:{padding:"32px",zoneGap:"24px",widgetGap:"16px"}},Di=Se("migrate-config");function Oi(e){const t={};for(const[i,o]of Object.entries(e))void 0!==o&&(t[i]=o);return t}const Pi=["timeFormat","dateFormat","sensors","showWeather","weatherProvider","weatherConfig","weatherDisplayMode","weatherForecastDays","weatherTitle","weatherUpdateInterval","weatherIconSet","transportation","actionBar","enableActionBar","imageSource","imageConfig","backgroundImages","backgroundOpacity","backgroundRotationInterval","objectFit","fontColor","language","timeZone","size","customSizes"];function Ti(e){var t,i,o,n,a,r,s,l,c,d,h,u;if(function(e){var t;return!!(null===(t=e.layout)||void 0===t?void 0:t.zones)}(e))return e;const g={},p=(e,t,i)=>{const o=g[e];o?o.widgets.push(t):g[e]={...i,widgets:[t]}};p("center",Ni({type:"clock",id:"clock",timeFormat:e.timeFormat,clockSize:null===(t=e.customSizes)||void 0===t?void 0:t.clockSize})),p("center",Ni({type:"date",id:"date",dateFormat:e.dateFormat,dateSize:null===(i=e.customSizes)||void 0===i?void 0:i.dateSize})),(null===(o=e.customSizes)||void 0===o?void 0:o.clockTopMargin)&&Di.info(`customSizes.clockTopMargin ('${e.customSizes.clockTopMargin}') is obsolete in the zone layout and was dropped`),e.sensors&&e.sensors.length>0&&p("top-left",Ni({type:"sensors",id:"sensors",sensors:e.sensors,labelSize:null===(n=e.customSizes)||void 0===n?void 0:n.labelSize,valueSize:null===(a=e.customSizes)||void 0===a?void 0:a.valueSize})),e.showWeather&&p("top-right",Ni({type:"weather",id:"weather",provider:e.weatherProvider,providerConfig:e.weatherConfig,displayMode:e.weatherDisplayMode,forecastDays:e.weatherForecastDays,title:e.weatherTitle,updateInterval:e.weatherUpdateInterval,iconSet:null!==(r=e.weatherIconSet)&&void 0!==r?r:null===(s=e.weatherConfig)||void 0===s?void 0:s.iconSet,labelSize:null===(l=e.customSizes)||void 0===l?void 0:l.labelSize,valueSize:null===(c=e.customSizes)||void 0===c?void 0:c.valueSize})),e.transportation&&p("bottom-center",Ni({type:"transportation",id:"transportation",...e.transportation,priority:10}),{mode:"exclusive"}),(null!==(h=null===(d=e.actionBar)||void 0===d?void 0:d.enabled)&&void 0!==h?h:!0===e.enableActionBar)&&p("bottom-center",Ni({type:"action-bar",id:"action-bar",actions:[],...e.actionBar,enabled:!0,iconSize:null===(u=e.customSizes)||void 0===u?void 0:u.actionBarIconSize,priority:5}),{mode:"exclusive"});const f=Oi({source:e.imageSource,config:e.imageConfig,images:e.backgroundImages,opacity:e.backgroundOpacity,rotationInterval:e.backgroundRotationInterval,objectFit:e.objectFit}),m=Oi({fontColor:e.fontColor,language:e.language,timeZone:e.timeZone,size:e.size}),v={};for(const[t,i]of Object.entries(e))Pi.includes(t)||void 0===i||(v[t]=i);const y={...v,layout:{zones:g}};return Object.keys(f).length>0&&(y.background=f),Object.keys(m).length>0&&(y.appearance=m),y}function Ni(e){return Oi(e)}const Fi=/^(0|-?\d+(\.\d+)?(px|rem|em|%|vh|vw))$/;function Mi(e,t){const i=e.trim().split(/\s+/);return i.length>=1&&i.length<=t&&i.every(e=>Fi.test(e))}function Ri(e){const t=null==e?void 0:e.spacing,i="string"==typeof t&&t in Ei?t:"normal";"string"!=typeof t||t in Ei||Di.warn(`Unknown spacing preset '${t}', falling back to 'normal'`);const o={...Ei[i]};if(t&&"object"==typeof t){const e=[["padding",4],["zoneGap",1],["widgetGap",1]];for(const[i,n]of e){const e=t[i];void 0!==e&&("string"==typeof e&&Mi(e,n)?o[i]=e:Di.warn(`Invalid spacing.${i} value '${e}', falling back to '${o[i]}'`))}}return o}class ji{constructor(){this.widgets=new Map,this.logger=Se("widget-registry")}static getInstance(){return ji.instance||(ji.instance=new ji),ji.instance}register(e){this.widgets.set(e.widgetId,e)}registerAll(e){e.forEach(e=>this.register(e))}getWidget(e){return this.widgets.get(e)}getAllWidgets(){return Array.from(this.widgets.values())}createElement(e){const t=this.widgets.get(e.type);if(!t)return void this.logger.warn(`Unknown widget type '${e.type}', ignoring`);const i=document.createElement(t.elementTag);return i.config=e,i}}function Li(e){return JSON.parse(JSON.stringify(e))}function Ui(e,t){const i=function(e){var t;const i=new Set;for(const o of Object.values(e.zones))null===(t=null==o?void 0:o.widgets)||void 0===t||t.forEach(e=>{e.id&&i.add(e.id)});return i}(e);if(!i.has(t))return t;let o=2;for(;i.has(`${t}-${o}`);)o++;return`${t}-${o}`}function Wi(e,t,i,o){var n;const a=Li(e),r={...Li(i),id:Ui(e,i.type)},s=null!==(n=a.zones[t])&&void 0!==n?n:{widgets:[]},l=void 0===o?s.widgets.length:Math.max(0,Math.min(o,s.widgets.length));return s.widgets.splice(l,0,r),a.zones[t]=s,a}function Bi(e,t){const i=Li(e);return void 0===t?delete i.spacing:i.spacing=t,i}function Hi(e,t,i,o){var n;for(const a of Object.values(e.layout.zones))null===(n=null==a?void 0:a.widgets)||void 0===n||n.forEach(e=>{e.type===t&&(void 0===o||""===o?delete e[i]:e[i]=o)})}function Vi(e){const t={type:e.type};return void 0!==e.id&&(t.id=e.id),void 0!==e.priority&&(t.priority=e.priority),void 0!==e.style&&(t.style=e.style),void 0!==e.visibility&&(t.visibility=e.visibility),t}function Zi(e){return Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e))}function Ji(e,t,i){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var i=t.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function qi(){return qi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i)({}).hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e},qi.apply(null,arguments)}function Ki(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,o)}return i}function Gi(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?Ki(Object(i),!0).forEach(function(t){Ji(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Ki(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}function Yi(e){return Yi="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Yi(e)}function Xi(e){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(e)}var Qi=Xi(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),eo=Xi(/Edge/i),to=Xi(/firefox/i),io=Xi(/safari/i)&&!Xi(/chrome/i)&&!Xi(/android/i),oo=Xi(/iP(ad|od|hone)/i),no=Xi(/chrome/i)&&Xi(/android/i),ao={capture:!1,passive:!1};function ro(e,t,i){e.addEventListener(t,i,!Qi&&ao)}function so(e,t,i){e.removeEventListener(t,i,!Qi&&ao)}function lo(e,t){if(t){if(">"===t[0]&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch(e){return!1}return!1}}function co(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function ho(e,t,i,o){if(e){i=i||document;do{if(null!=t&&(">"===t[0]?e.parentNode===i&&lo(e,t):lo(e,t))||o&&e===i)return e;if(e===i)break}while(e=co(e))}return null}var uo,go=/\s+/g;function po(e,t,i){if(e&&t)if(e.classList)e.classList[i?"add":"remove"](t);else{var o=(" "+e.className+" ").replace(go," ").replace(" "+t+" "," ");e.className=(o+(i?" "+t:"")).replace(go," ")}}function fo(e,t,i){var o=e&&e.style;if(o){if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(i=e.currentStyle),void 0===t?i:i[t];t in o||-1!==t.indexOf("webkit")||(t="-webkit-"+t),o[t]=i+("string"==typeof i?"":"px")}}function mo(e,t){var i="";if("string"==typeof e)i=e;else do{var o=fo(e,"transform");o&&"none"!==o&&(i=o+" "+i)}while(!t&&(e=e.parentNode));var n=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return n&&new n(i)}function vo(e,t,i){if(e){var o=e.getElementsByTagName(t),n=0,a=o.length;if(i)for(;n<a;n++)i(o[n],n);return o}return[]}function yo(){return document.scrollingElement||document.documentElement}function wo(e,t,i,o,n){if(e.getBoundingClientRect||e===window){var a,r,s,l,c,d,h;if(e!==window&&e.parentNode&&e!==yo()?(r=(a=e.getBoundingClientRect()).top,s=a.left,l=a.bottom,c=a.right,d=a.height,h=a.width):(r=0,s=0,l=window.innerHeight,c=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(t||i)&&e!==window&&(n=n||e.parentNode,!Qi))do{if(n&&n.getBoundingClientRect&&("none"!==fo(n,"transform")||i&&"static"!==fo(n,"position"))){var u=n.getBoundingClientRect();r-=u.top+parseInt(fo(n,"border-top-width")),s-=u.left+parseInt(fo(n,"border-left-width")),l=r+a.height,c=s+a.width;break}}while(n=n.parentNode);if(o&&e!==window){var g=mo(n||e),p=g&&g.a,f=g&&g.d;g&&(l=(r/=f)+(d/=f),c=(s/=p)+(h/=p))}return{top:r,left:s,bottom:l,right:c,width:h,height:d}}}function bo(e,t,i){for(var o=xo(e,!0),n=wo(e)[t];o;){var a=wo(o)[i];if(!("top"===i||"left"===i?n>=a:n<=a))return o;if(o===yo())break;o=xo(o,!1)}return!1}function _o(e,t,i,o){for(var n=0,a=0,r=e.children;a<r.length;){if("none"!==r[a].style.display&&r[a]!==zn.ghost&&(o||r[a]!==zn.dragged)&&ho(r[a],i.draggable,e,!1)){if(n===t)return r[a];n++}a++}return null}function $o(e,t){for(var i=e.lastElementChild;i&&(i===zn.ghost||"none"===fo(i,"display")||t&&!lo(i,t));)i=i.previousElementSibling;return i||null}function So(e,t){var i=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)"TEMPLATE"===e.nodeName.toUpperCase()||e===zn.clone||t&&!lo(e,t)||i++;return i}function Co(e){var t=0,i=0,o=yo();if(e)do{var n=mo(e),a=n.a,r=n.d;t+=e.scrollLeft*a,i+=e.scrollTop*r}while(e!==o&&(e=e.parentNode));return[t,i]}function xo(e,t){if(!e||!e.getBoundingClientRect)return yo();var i=e,o=!1;do{if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var n=fo(i);if(i.clientWidth<i.scrollWidth&&("auto"==n.overflowX||"scroll"==n.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==n.overflowY||"scroll"==n.overflowY)){if(!i.getBoundingClientRect||i===document.body)return yo();if(o||t)return i;o=!0}}}while(i=i.parentNode);return yo()}function ko(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}function Io(e,t){return function(){if(!uo){var i=arguments;1===i.length?e.call(this,i[0]):e.apply(this,i),uo=setTimeout(function(){uo=void 0},t)}}}function Ao(e,t,i){e.scrollLeft+=t,e.scrollTop+=i}function zo(e){var t=window.Polymer,i=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):i?i(e).clone(!0)[0]:e.cloneNode(!0)}function Eo(e,t,i){var o={};return Array.from(e.children).forEach(function(n){var a,r,s,l;if(ho(n,t.draggable,e,!1)&&!n.animated&&n!==i){var c=wo(n);o.left=Math.min(null!==(a=o.left)&&void 0!==a?a:1/0,c.left),o.top=Math.min(null!==(r=o.top)&&void 0!==r?r:1/0,c.top),o.right=Math.max(null!==(s=o.right)&&void 0!==s?s:-1/0,c.right),o.bottom=Math.max(null!==(l=o.bottom)&&void 0!==l?l:-1/0,c.bottom)}}),o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}var Do="Sortable"+(new Date).getTime();var Oo=[],Po={initializeByDefault:!0},To={mount:function(e){for(var t in Po)Po.hasOwnProperty(t)&&!(t in e)&&(e[t]=Po[t]);Oo.forEach(function(t){if(t.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),Oo.push(e)},pluginEvent:function(e,t,i){var o=this;this.eventCanceled=!1,i.cancel=function(){o.eventCanceled=!0};var n=e+"Global";Oo.forEach(function(o){t[o.pluginName]&&(t[o.pluginName][n]&&t[o.pluginName][n](Gi({sortable:t},i)),t.options[o.pluginName]&&t[o.pluginName][e]&&t[o.pluginName][e](Gi({sortable:t},i)))})},initializePlugins:function(e,t,i,o){for(var n in Oo.forEach(function(o){var n=o.pluginName;if(e.options[n]||o.initializeByDefault){var a=new o(e,t,e.options);a.sortable=e,a.options=e.options,e[n]=a,qi(i,a.defaults)}}),e.options)if(e.options.hasOwnProperty(n)){var a=this.modifyOption(e,n,e.options[n]);void 0!==a&&(e.options[n]=a)}},getEventProperties:function(e,t){var i={};return Oo.forEach(function(o){"function"==typeof o.eventProperties&&qi(i,o.eventProperties.call(t[o.pluginName],e))}),i},modifyOption:function(e,t,i){var o;return Oo.forEach(function(n){e[n.pluginName]&&n.optionListeners&&"function"==typeof n.optionListeners[t]&&(o=n.optionListeners[t].call(e[n.pluginName],i))}),o}};var No=["evt"],Fo=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.evt,n=function(e,t){if(null==e)return{};var i,o,n=function(e,t){if(null==e)return{};var i={};for(var o in e)if({}.hasOwnProperty.call(e,o)){if(-1!==t.indexOf(o))continue;i[o]=e[o]}return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)i=a[o],-1===t.indexOf(i)&&{}.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}(i,No);To.pluginEvent.bind(zn)(e,t,Gi({dragEl:Ro,parentEl:jo,ghostEl:Lo,rootEl:Uo,nextEl:Wo,lastDownEl:Bo,cloneEl:Ho,cloneHidden:Vo,dragStarted:an,putSortable:Yo,activeSortable:zn.active,originalEvent:o,oldIndex:Zo,oldDraggableIndex:qo,newIndex:Jo,newDraggableIndex:Ko,hideGhostForTarget:xn,unhideGhostForTarget:kn,cloneNowHidden:function(){Vo=!0},cloneNowShown:function(){Vo=!1},dispatchSortableEvent:function(e){Mo({sortable:t,name:e,originalEvent:o})}},n))};function Mo(e){!function(e){var t=e.sortable,i=e.rootEl,o=e.name,n=e.targetEl,a=e.cloneEl,r=e.toEl,s=e.fromEl,l=e.oldIndex,c=e.newIndex,d=e.oldDraggableIndex,h=e.newDraggableIndex,u=e.originalEvent,g=e.putSortable,p=e.extraEventProperties;if(t=t||i&&i[Do]){var f,m=t.options,v="on"+o.charAt(0).toUpperCase()+o.substr(1);!window.CustomEvent||Qi||eo?(f=document.createEvent("Event")).initEvent(o,!0,!0):f=new CustomEvent(o,{bubbles:!0,cancelable:!0}),f.to=r||i,f.from=s||i,f.item=n||i,f.clone=a,f.oldIndex=l,f.newIndex=c,f.oldDraggableIndex=d,f.newDraggableIndex=h,f.originalEvent=u,f.pullMode=g?g.lastPutMode:void 0;var y=Gi(Gi({},p),To.getEventProperties(o,t));for(var w in y)f[w]=y[w];i&&i.dispatchEvent(f),m[v]&&m[v].call(t,f)}}(Gi({putSortable:Yo,cloneEl:Ho,targetEl:Ro,rootEl:Uo,oldIndex:Zo,oldDraggableIndex:qo,newIndex:Jo,newDraggableIndex:Ko},e))}var Ro,jo,Lo,Uo,Wo,Bo,Ho,Vo,Zo,Jo,qo,Ko,Go,Yo,Xo,Qo,en,tn,on,nn,an,rn,sn,ln,cn,dn=!1,hn=!1,un=[],gn=!1,pn=!1,fn=[],mn=!1,vn=[],yn="undefined"!=typeof document,wn=oo,bn=eo||Qi?"cssFloat":"float",_n=yn&&!no&&!oo&&"draggable"in document.createElement("div"),$n=function(){if(yn){if(Qi)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto","auto"===e.style.pointerEvents}}(),Sn=function(e,t){var i=fo(e),o=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),n=_o(e,0,t),a=_o(e,1,t),r=n&&fo(n),s=a&&fo(a),l=r&&parseInt(r.marginLeft)+parseInt(r.marginRight)+wo(n).width,c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+wo(a).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(n&&r.float&&"none"!==r.float){var d="left"===r.float?"left":"right";return!a||"both"!==s.clear&&s.clear!==d?"horizontal":"vertical"}return n&&("block"===r.display||"flex"===r.display||"table"===r.display||"grid"===r.display||l>=o&&"none"===i[bn]||a&&"none"===i[bn]&&l+c>o)?"vertical":"horizontal"},Cn=function(e){function t(e,i){return function(o,n,a,r){var s=o.options.group.name&&n.options.group.name&&o.options.group.name===n.options.group.name;if(null==e&&(i||s))return!0;if(null==e||!1===e)return!1;if(i&&"clone"===e)return e;if("function"==typeof e)return t(e(o,n,a,r),i)(o,n,a,r);var l=(i?o:n).options.group.name;return!0===e||"string"==typeof e&&e===l||e.join&&e.indexOf(l)>-1}}var i={},o=e.group;o&&"object"==Yi(o)||(o={name:o}),i.name=o.name,i.checkPull=t(o.pull,!0),i.checkPut=t(o.put),i.revertClone=o.revertClone,e.group=i},xn=function(){!$n&&Lo&&fo(Lo,"display","none")},kn=function(){!$n&&Lo&&fo(Lo,"display","")};yn&&!no&&document.addEventListener("click",function(e){if(hn)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),hn=!1,!1},!0);var In=function(e){if(Ro){var t=function(e,t){var i;return un.some(function(o){var n=o[Do].options.emptyInsertThreshold;if(n&&!$o(o)){var a=wo(o),r=e>=a.left-n&&e<=a.right+n,s=t>=a.top-n&&t<=a.bottom+n;return r&&s?i=o:void 0}}),i}((e=e.touches?e.touches[0]:e).clientX,e.clientY);if(t){var i={};for(var o in e)e.hasOwnProperty(o)&&(i[o]=e[o]);i.target=i.rootEl=t,i.preventDefault=void 0,i.stopPropagation=void 0,t[Do]._onDragOver(i)}}},An=function(e){Ro&&Ro.parentNode[Do]._isOutsideThisEl(e.target)};function zn(e,t){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=qi({},t),e[Do]=this;var i,o,n={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Sn(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==zn.supportPointer&&"PointerEvent"in window&&(!io||oo),emptyInsertThreshold:5};for(var a in To.initializePlugins(this,e,n),n)!(a in t)&&(t[a]=n[a]);for(var r in Cn(t),this)"_"===r.charAt(0)&&"function"==typeof this[r]&&(this[r]=this[r].bind(this));this.nativeDraggable=!t.forceFallback&&_n,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?ro(e,"pointerdown",this._onTapStart):(ro(e,"mousedown",this._onTapStart),ro(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(ro(e,"dragover",this),ro(e,"dragenter",this)),un.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),qi(this,(o=[],{captureAnimationState:function(){o=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(e){if("none"!==fo(e,"display")&&e!==zn.ghost){o.push({target:e,rect:wo(e)});var t=Gi({},o[o.length-1].rect);if(e.thisAnimationDuration){var i=mo(e,!0);i&&(t.top-=i.f,t.left-=i.e)}e.fromRect=t}})},addAnimationState:function(e){o.push(e)},removeAnimationState:function(e){o.splice(function(e,t){for(var i in e)if(e.hasOwnProperty(i))for(var o in t)if(t.hasOwnProperty(o)&&t[o]===e[i][o])return Number(i);return-1}(o,{target:e}),1)},animateAll:function(e){var t=this;if(!this.options.animation)return clearTimeout(i),void("function"==typeof e&&e());var n=!1,a=0;o.forEach(function(e){var i=0,o=e.target,r=o.fromRect,s=wo(o),l=o.prevFromRect,c=o.prevToRect,d=e.rect,h=mo(o,!0);h&&(s.top-=h.f,s.left-=h.e),o.toRect=s,o.thisAnimationDuration&&ko(l,s)&&!ko(r,s)&&(d.top-s.top)/(d.left-s.left)===(r.top-s.top)/(r.left-s.left)&&(i=function(e,t,i,o){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-i.top,2)+Math.pow(t.left-i.left,2))*o.animation}(d,l,c,t.options)),ko(s,r)||(o.prevFromRect=r,o.prevToRect=s,i||(i=t.options.animation),t.animate(o,d,s,i)),i&&(n=!0,a=Math.max(a,i),clearTimeout(o.animationResetTimer),o.animationResetTimer=setTimeout(function(){o.animationTime=0,o.prevFromRect=null,o.fromRect=null,o.prevToRect=null,o.thisAnimationDuration=null},i),o.thisAnimationDuration=i)}),clearTimeout(i),n?i=setTimeout(function(){"function"==typeof e&&e()},a):"function"==typeof e&&e(),o=[]},animate:function(e,t,i,o){if(o){fo(e,"transition",""),fo(e,"transform","");var n=mo(this.el),a=n&&n.a,r=n&&n.d,s=(t.left-i.left)/(a||1),l=(t.top-i.top)/(r||1);e.animatingX=!!s,e.animatingY=!!l,fo(e,"transform","translate3d("+s+"px,"+l+"px,0)"),this.forRepaintDummy=function(e){return e.offsetWidth}(e),fo(e,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),fo(e,"transform","translate3d(0,0,0)"),"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=setTimeout(function(){fo(e,"transition",""),fo(e,"transform",""),e.animated=!1,e.animatingX=!1,e.animatingY=!1},o)}}}))}function En(e,t,i,o,n,a,r,s){var l,c,d=e[Do],h=d.options.onMove;return!window.CustomEvent||Qi||eo?(l=document.createEvent("Event")).initEvent("move",!0,!0):l=new CustomEvent("move",{bubbles:!0,cancelable:!0}),l.to=t,l.from=e,l.dragged=i,l.draggedRect=o,l.related=n||t,l.relatedRect=a||wo(t),l.willInsertAfter=s,l.originalEvent=r,e.dispatchEvent(l),h&&(c=h.call(d,l,r)),c}function Dn(e){e.draggable=!1}function On(){mn=!1}function Pn(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,i=t.length,o=0;i--;)o+=t.charCodeAt(i);return o.toString(36)}function Tn(e){return setTimeout(e,0)}function Nn(e){return clearTimeout(e)}zn.prototype={constructor:zn,_isOutsideThisEl:function(e){this.el.contains(e)||e===this.el||(rn=null)},_getDirection:function(e,t){return"function"==typeof this.options.direction?this.options.direction.call(this,e,t,Ro):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,i=this.el,o=this.options,n=o.preventOnFilter,a=e.type,r=e.touches&&e.touches[0]||e.pointerType&&"touch"===e.pointerType&&e,s=(r||e).target,l=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||s,c=o.filter;if(function(e){vn.length=0;for(var t=e.getElementsByTagName("input"),i=t.length;i--;){var o=t[i];o.checked&&vn.push(o)}}(i),!Ro&&!(/mousedown|pointerdown/.test(a)&&0!==e.button||o.disabled)&&!l.isContentEditable&&(this.nativeDraggable||!io||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=ho(s,o.draggable,i,!1))&&s.animated||Bo===s)){if(Zo=So(s),qo=So(s,o.draggable),"function"==typeof c){if(c.call(this,e,s,this))return Mo({sortable:t,rootEl:l,name:"filter",targetEl:s,toEl:i,fromEl:i}),Fo("filter",t,{evt:e}),void(n&&e.preventDefault())}else if(c&&(c=c.split(",").some(function(o){if(o=ho(l,o.trim(),i,!1))return Mo({sortable:t,rootEl:o,name:"filter",targetEl:s,fromEl:i,toEl:i}),Fo("filter",t,{evt:e}),!0})))return void(n&&e.preventDefault());o.handle&&!ho(l,o.handle,i,!1)||this._prepareDragStart(e,r,s)}}},_prepareDragStart:function(e,t,i){var o,n=this,a=n.el,r=n.options,s=a.ownerDocument;if(i&&!Ro&&i.parentNode===a){var l=wo(i);if(Uo=a,jo=(Ro=i).parentNode,Wo=Ro.nextSibling,Bo=i,Go=r.group,zn.dragged=Ro,Xo={target:Ro,clientX:(t||e).clientX,clientY:(t||e).clientY},on=Xo.clientX-l.left,nn=Xo.clientY-l.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,Ro.style["will-change"]="all",o=function(){Fo("delayEnded",n,{evt:e}),zn.eventCanceled?n._onDrop():(n._disableDelayedDragEvents(),!to&&n.nativeDraggable&&(Ro.draggable=!0),n._triggerDragStart(e,t),Mo({sortable:n,name:"choose",originalEvent:e}),po(Ro,r.chosenClass,!0))},r.ignore.split(",").forEach(function(e){vo(Ro,e.trim(),Dn)}),ro(s,"dragover",In),ro(s,"mousemove",In),ro(s,"touchmove",In),r.supportPointer?(ro(s,"pointerup",n._onDrop),!this.nativeDraggable&&ro(s,"pointercancel",n._onDrop)):(ro(s,"mouseup",n._onDrop),ro(s,"touchend",n._onDrop),ro(s,"touchcancel",n._onDrop)),to&&this.nativeDraggable&&(this.options.touchStartThreshold=4,Ro.draggable=!0),Fo("delayStart",this,{evt:e}),!r.delay||r.delayOnTouchOnly&&!t||this.nativeDraggable&&(eo||Qi))o();else{if(zn.eventCanceled)return void this._onDrop();r.supportPointer?(ro(s,"pointerup",n._disableDelayedDrag),ro(s,"pointercancel",n._disableDelayedDrag)):(ro(s,"mouseup",n._disableDelayedDrag),ro(s,"touchend",n._disableDelayedDrag),ro(s,"touchcancel",n._disableDelayedDrag)),ro(s,"mousemove",n._delayedDragTouchMoveHandler),ro(s,"touchmove",n._delayedDragTouchMoveHandler),r.supportPointer&&ro(s,"pointermove",n._delayedDragTouchMoveHandler),n._dragStartTimer=setTimeout(o,r.delay)}}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){Ro&&Dn(Ro),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;so(e,"mouseup",this._disableDelayedDrag),so(e,"touchend",this._disableDelayedDrag),so(e,"touchcancel",this._disableDelayedDrag),so(e,"pointerup",this._disableDelayedDrag),so(e,"pointercancel",this._disableDelayedDrag),so(e,"mousemove",this._delayedDragTouchMoveHandler),so(e,"touchmove",this._delayedDragTouchMoveHandler),so(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||"touch"==e.pointerType&&e,!this.nativeDraggable||t?this.options.supportPointer?ro(document,"pointermove",this._onTouchMove):ro(document,t?"touchmove":"mousemove",this._onTouchMove):(ro(Ro,"dragend",this),ro(Uo,"dragstart",this._onDragStart));try{document.selection?Tn(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch(e){}},_dragStarted:function(e,t){if(dn=!1,Uo&&Ro){Fo("dragStarted",this,{evt:t}),this.nativeDraggable&&ro(document,"dragover",An);var i=this.options;!e&&po(Ro,i.dragClass,!1),po(Ro,i.ghostClass,!0),zn.active=this,e&&this._appendGhost(),Mo({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(Qo){this._lastX=Qo.clientX,this._lastY=Qo.clientY,xn();for(var e=document.elementFromPoint(Qo.clientX,Qo.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(Qo.clientX,Qo.clientY))!==t;)t=e;if(Ro.parentNode[Do]._isOutsideThisEl(e),t)do{if(t[Do]&&t[Do]._onDragOver({clientX:Qo.clientX,clientY:Qo.clientY,target:e,rootEl:t})&&!this.options.dragoverBubble)break;e=t}while(t=co(t));kn()}},_onTouchMove:function(e){if(Xo){var t=this.options,i=t.fallbackTolerance,o=t.fallbackOffset,n=e.touches?e.touches[0]:e,a=Lo&&mo(Lo,!0),r=Lo&&a&&a.a,s=Lo&&a&&a.d,l=wn&&cn&&Co(cn),c=(n.clientX-Xo.clientX+o.x)/(r||1)+(l?l[0]-fn[0]:0)/(r||1),d=(n.clientY-Xo.clientY+o.y)/(s||1)+(l?l[1]-fn[1]:0)/(s||1);if(!zn.active&&!dn){if(i&&Math.max(Math.abs(n.clientX-this._lastX),Math.abs(n.clientY-this._lastY))<i)return;this._onDragStart(e,!0)}if(Lo){a?(a.e+=c-(en||0),a.f+=d-(tn||0)):a={a:1,b:0,c:0,d:1,e:c,f:d};var h="matrix(".concat(a.a,",").concat(a.b,",").concat(a.c,",").concat(a.d,",").concat(a.e,",").concat(a.f,")");fo(Lo,"webkitTransform",h),fo(Lo,"mozTransform",h),fo(Lo,"msTransform",h),fo(Lo,"transform",h),en=c,tn=d,Qo=n}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!Lo){var e=this.options.fallbackOnBody?document.body:Uo,t=wo(Ro,!0,wn,!0,e),i=this.options;if(wn){for(cn=e;"static"===fo(cn,"position")&&"none"===fo(cn,"transform")&&cn!==document;)cn=cn.parentNode;cn!==document.body&&cn!==document.documentElement?(cn===document&&(cn=yo()),t.top+=cn.scrollTop,t.left+=cn.scrollLeft):cn=yo(),fn=Co(cn)}po(Lo=Ro.cloneNode(!0),i.ghostClass,!1),po(Lo,i.fallbackClass,!0),po(Lo,i.dragClass,!0),fo(Lo,"transition",""),fo(Lo,"transform",""),fo(Lo,"box-sizing","border-box"),fo(Lo,"margin",0),fo(Lo,"top",t.top),fo(Lo,"left",t.left),fo(Lo,"width",t.width),fo(Lo,"height",t.height),fo(Lo,"opacity","0.8"),fo(Lo,"position",wn?"absolute":"fixed"),fo(Lo,"zIndex","100000"),fo(Lo,"pointerEvents","none"),zn.ghost=Lo,e.appendChild(Lo),fo(Lo,"transform-origin",on/parseInt(Lo.style.width)*100+"% "+nn/parseInt(Lo.style.height)*100+"%")}},_onDragStart:function(e,t){var i=this,o=e.dataTransfer,n=i.options;Fo("dragStart",this,{evt:e}),zn.eventCanceled?this._onDrop():(Fo("setupClone",this),zn.eventCanceled||((Ho=zo(Ro)).removeAttribute("id"),Ho.draggable=!1,Ho.style["will-change"]="",this._hideClone(),po(Ho,this.options.chosenClass,!1),zn.clone=Ho),i.cloneId=Tn(function(){Fo("clone",i),zn.eventCanceled||(i.options.removeCloneOnHide||Uo.insertBefore(Ho,Ro),i._hideClone(),Mo({sortable:i,name:"clone"}))}),!t&&po(Ro,n.dragClass,!0),t?(hn=!0,i._loopId=setInterval(i._emulateDragOver,50)):(so(document,"mouseup",i._onDrop),so(document,"touchend",i._onDrop),so(document,"touchcancel",i._onDrop),o&&(o.effectAllowed="move",n.setData&&n.setData.call(i,o,Ro)),ro(document,"drop",i),fo(Ro,"transform","translateZ(0)")),dn=!0,i._dragStartId=Tn(i._dragStarted.bind(i,t,e)),ro(document,"selectstart",i),an=!0,window.getSelection().removeAllRanges(),io&&fo(document.body,"user-select","none"))},_onDragOver:function(e){var t,i,o,n,a=this.el,r=e.target,s=this.options,l=s.group,c=zn.active,d=Go===l,h=s.sort,u=Yo||c,g=this,p=!1;if(!mn){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),r=ho(r,s.draggable,a,!0),z("dragOver"),zn.eventCanceled)return p;if(Ro.contains(e.target)||r.animated&&r.animatingX&&r.animatingY||g._ignoreWhileAnimating===r)return D(!1);if(hn=!1,c&&!s.disabled&&(d?h||(o=jo!==Uo):Yo===this||(this.lastPutMode=Go.checkPull(this,c,Ro,e))&&l.checkPut(this,c,Ro,e))){if(n="vertical"===this._getDirection(e,r),t=wo(Ro),z("dragOverValid"),zn.eventCanceled)return p;if(o)return jo=Uo,E(),this._hideClone(),z("revert"),zn.eventCanceled||(Wo?Uo.insertBefore(Ro,Wo):Uo.appendChild(Ro)),D(!0);var f=$o(a,s.draggable);if(!f||function(e,t,i){var o=wo($o(i.el,i.options.draggable)),n=Eo(i.el,i.options,Lo);return t?e.clientX>n.right+10||e.clientY>o.bottom&&e.clientX>o.left:e.clientY>n.bottom+10||e.clientX>o.right&&e.clientY>o.top}(e,n,this)&&!f.animated){if(f===Ro)return D(!1);if(f&&a===e.target&&(r=f),r&&(i=wo(r)),!1!==En(Uo,a,Ro,t,r,i,e,!!r))return E(),f&&f.nextSibling?a.insertBefore(Ro,f.nextSibling):a.appendChild(Ro),jo=a,O(),D(!0)}else if(f&&function(e,t,i){var o=wo(_o(i.el,0,i.options,!0)),n=Eo(i.el,i.options,Lo);return t?e.clientX<n.left-10||e.clientY<o.top&&e.clientX<o.right:e.clientY<n.top-10||e.clientY<o.bottom&&e.clientX<o.left}(e,n,this)){var m=_o(a,0,s,!0);if(m===Ro)return D(!1);if(i=wo(r=m),!1!==En(Uo,a,Ro,t,r,i,e,!1))return E(),a.insertBefore(Ro,m),jo=a,O(),D(!0)}else if(r.parentNode===a){i=wo(r);var v,y,w,b=Ro.parentNode!==a,_=!function(e,t,i){var o=i?e.left:e.top,n=i?e.right:e.bottom,a=i?e.width:e.height,r=i?t.left:t.top,s=i?t.right:t.bottom,l=i?t.width:t.height;return o===r||n===s||o+a/2===r+l/2}(Ro.animated&&Ro.toRect||t,r.animated&&r.toRect||i,n),$=n?"top":"left",S=bo(r,"top","top")||bo(Ro,"top","top"),C=S?S.scrollTop:void 0;if(rn!==r&&(y=i[$],gn=!1,pn=!_&&s.invertSwap||b),v=function(e,t,i,o,n,a,r,s){var l=o?e.clientY:e.clientX,c=o?i.height:i.width,d=o?i.top:i.left,h=o?i.bottom:i.right,u=!1;if(!r)if(s&&ln<c*n){if(!gn&&(1===sn?l>d+c*a/2:l<h-c*a/2)&&(gn=!0),gn)u=!0;else if(1===sn?l<d+ln:l>h-ln)return-sn}else if(l>d+c*(1-n)/2&&l<h-c*(1-n)/2)return function(e){return So(Ro)<So(e)?1:-1}(t);return(u=u||r)&&(l<d+c*a/2||l>h-c*a/2)?l>d+c/2?1:-1:0}(e,r,i,n,_?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,pn,rn===r),0!==v){var x=So(Ro);do{x-=v,w=jo.children[x]}while(w&&("none"===fo(w,"display")||w===Lo))}if(0===v||w===r)return D(!1);rn=r,sn=v;var k=r.nextElementSibling,I=!1,A=En(Uo,a,Ro,t,r,i,e,I=1===v);if(!1!==A)return 1!==A&&-1!==A||(I=1===A),mn=!0,setTimeout(On,30),E(),I&&!k?a.appendChild(Ro):r.parentNode.insertBefore(Ro,I?k:r),S&&Ao(S,0,C-S.scrollTop),jo=Ro.parentNode,void 0===y||pn||(ln=Math.abs(y-wo(r)[$])),O(),D(!0)}if(a.contains(Ro))return D(!1)}return!1}function z(s,l){Fo(s,g,Gi({evt:e,isOwner:d,axis:n?"vertical":"horizontal",revert:o,dragRect:t,targetRect:i,canSort:h,fromSortable:u,target:r,completed:D,onMove:function(i,o){return En(Uo,a,Ro,t,i,wo(i),e,o)},changed:O},l))}function E(){z("dragOverAnimationCapture"),g.captureAnimationState(),g!==u&&u.captureAnimationState()}function D(t){return z("dragOverCompleted",{insertion:t}),t&&(d?c._hideClone():c._showClone(g),g!==u&&(po(Ro,Yo?Yo.options.ghostClass:c.options.ghostClass,!1),po(Ro,s.ghostClass,!0)),Yo!==g&&g!==zn.active?Yo=g:g===zn.active&&Yo&&(Yo=null),u===g&&(g._ignoreWhileAnimating=r),g.animateAll(function(){z("dragOverAnimationComplete"),g._ignoreWhileAnimating=null}),g!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(r===Ro&&!Ro.animated||r===a&&!r.animated)&&(rn=null),s.dragoverBubble||e.rootEl||r===document||(Ro.parentNode[Do]._isOutsideThisEl(e.target),!t&&In(e)),!s.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),p=!0}function O(){Jo=So(Ro),Ko=So(Ro,s.draggable),Mo({sortable:g,name:"change",toEl:a,newIndex:Jo,newDraggableIndex:Ko,originalEvent:e})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){so(document,"mousemove",this._onTouchMove),so(document,"touchmove",this._onTouchMove),so(document,"pointermove",this._onTouchMove),so(document,"dragover",In),so(document,"mousemove",In),so(document,"touchmove",In)},_offUpEvents:function(){var e=this.el.ownerDocument;so(e,"mouseup",this._onDrop),so(e,"touchend",this._onDrop),so(e,"pointerup",this._onDrop),so(e,"pointercancel",this._onDrop),so(e,"touchcancel",this._onDrop),so(document,"selectstart",this)},_onDrop:function(e){var t=this.el,i=this.options;Jo=So(Ro),Ko=So(Ro,i.draggable),Fo("drop",this,{evt:e}),jo=Ro&&Ro.parentNode,Jo=So(Ro),Ko=So(Ro,i.draggable),zn.eventCanceled||(dn=!1,pn=!1,gn=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Nn(this.cloneId),Nn(this._dragStartId),this.nativeDraggable&&(so(document,"drop",this),so(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),io&&fo(document.body,"user-select",""),fo(Ro,"transform",""),e&&(an&&(e.cancelable&&e.preventDefault(),!i.dropBubble&&e.stopPropagation()),Lo&&Lo.parentNode&&Lo.parentNode.removeChild(Lo),(Uo===jo||Yo&&"clone"!==Yo.lastPutMode)&&Ho&&Ho.parentNode&&Ho.parentNode.removeChild(Ho),Ro&&(this.nativeDraggable&&so(Ro,"dragend",this),Dn(Ro),Ro.style["will-change"]="",an&&!dn&&po(Ro,Yo?Yo.options.ghostClass:this.options.ghostClass,!1),po(Ro,this.options.chosenClass,!1),Mo({sortable:this,name:"unchoose",toEl:jo,newIndex:null,newDraggableIndex:null,originalEvent:e}),Uo!==jo?(Jo>=0&&(Mo({rootEl:jo,name:"add",toEl:jo,fromEl:Uo,originalEvent:e}),Mo({sortable:this,name:"remove",toEl:jo,originalEvent:e}),Mo({rootEl:jo,name:"sort",toEl:jo,fromEl:Uo,originalEvent:e}),Mo({sortable:this,name:"sort",toEl:jo,originalEvent:e})),Yo&&Yo.save()):Jo!==Zo&&Jo>=0&&(Mo({sortable:this,name:"update",toEl:jo,originalEvent:e}),Mo({sortable:this,name:"sort",toEl:jo,originalEvent:e})),zn.active&&(null!=Jo&&-1!==Jo||(Jo=Zo,Ko=qo),Mo({sortable:this,name:"end",toEl:jo,originalEvent:e}),this.save())))),this._nulling()},_nulling:function(){Fo("nulling",this),Uo=Ro=jo=Lo=Wo=Ho=Bo=Vo=Xo=Qo=an=Jo=Ko=Zo=qo=rn=sn=Yo=Go=zn.dragged=zn.ghost=zn.clone=zn.active=null;var e=this.el;vn.forEach(function(t){e.contains(t)&&(t.checked=!0)}),vn.length=en=tn=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":Ro&&(this._onDragOver(e),function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}(e));break;case"selectstart":e.preventDefault()}},toArray:function(){for(var e,t=[],i=this.el.children,o=0,n=i.length,a=this.options;o<n;o++)ho(e=i[o],a.draggable,this.el,!1)&&t.push(e.getAttribute(a.dataIdAttr)||Pn(e));return t},sort:function(e,t){var i={},o=this.el;this.toArray().forEach(function(e,t){var n=o.children[t];ho(n,this.options.draggable,o,!1)&&(i[e]=n)},this),t&&this.captureAnimationState(),e.forEach(function(e){i[e]&&(o.removeChild(i[e]),o.appendChild(i[e]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return ho(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var i=this.options;if(void 0===t)return i[e];var o=To.modifyOption(this,e,t);i[e]=void 0!==o?o:t,"group"===e&&Cn(i)},destroy:function(){Fo("destroy",this);var e=this.el;e[Do]=null,so(e,"mousedown",this._onTapStart),so(e,"touchstart",this._onTapStart),so(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(so(e,"dragover",this),so(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),un.splice(un.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!Vo){if(Fo("hideClone",this),zn.eventCanceled)return;fo(Ho,"display","none"),this.options.removeCloneOnHide&&Ho.parentNode&&Ho.parentNode.removeChild(Ho),Vo=!0}},_showClone:function(e){if("clone"===e.lastPutMode){if(Vo){if(Fo("showClone",this),zn.eventCanceled)return;Ro.parentNode!=Uo||this.options.group.revertClone?Wo?Uo.insertBefore(Ho,Wo):Uo.appendChild(Ho):Uo.insertBefore(Ho,Ro),this.options.group.revertClone&&this.animate(Ro,Ho),fo(Ho,"display",""),Vo=!1}}else this._hideClone()}},yn&&ro(document,"touchmove",function(e){(zn.active||dn)&&e.cancelable&&e.preventDefault()}),zn.utils={on:ro,off:so,css:fo,find:vo,is:function(e,t){return!!ho(e,t,e,!1)},extend:function(e,t){if(e&&t)for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e},throttle:Io,closest:ho,toggleClass:po,clone:zo,index:So,nextTick:Tn,cancelNextTick:Nn,detectDirection:Sn,getChild:_o,expando:Do},zn.get=function(e){return e[Do]},zn.mount=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t[0].constructor===Array&&(t=t[0]),t.forEach(function(e){if(!e.prototype||!e.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));e.utils&&(zn.utils=Gi(Gi({},zn.utils),e.utils)),To.mount(e)})},zn.create=function(e,t){return new zn(e,t)},zn.version="1.15.7";var Fn,Mn,Rn,jn,Ln,Un,Wn=[],Bn=!1;function Hn(){Wn.forEach(function(e){clearInterval(e.pid)}),Wn=[]}function Vn(){clearInterval(Un)}var Zn=Io(function(e,t,i,o){if(t.scroll){var n,a=(e.touches?e.touches[0]:e).clientX,r=(e.touches?e.touches[0]:e).clientY,s=t.scrollSensitivity,l=t.scrollSpeed,c=yo(),d=!1;Mn!==i&&(Mn=i,Hn(),Fn=t.scroll,n=t.scrollFn,!0===Fn&&(Fn=xo(i,!0)));var h=0,u=Fn;do{var g=u,p=wo(g),f=p.top,m=p.bottom,v=p.left,y=p.right,w=p.width,b=p.height,_=void 0,$=void 0,S=g.scrollWidth,C=g.scrollHeight,x=fo(g),k=g.scrollLeft,I=g.scrollTop;g===c?(_=w<S&&("auto"===x.overflowX||"scroll"===x.overflowX||"visible"===x.overflowX),$=b<C&&("auto"===x.overflowY||"scroll"===x.overflowY||"visible"===x.overflowY)):(_=w<S&&("auto"===x.overflowX||"scroll"===x.overflowX),$=b<C&&("auto"===x.overflowY||"scroll"===x.overflowY));var A=_&&(Math.abs(y-a)<=s&&k+w<S)-(Math.abs(v-a)<=s&&!!k),z=$&&(Math.abs(m-r)<=s&&I+b<C)-(Math.abs(f-r)<=s&&!!I);if(!Wn[h])for(var E=0;E<=h;E++)Wn[E]||(Wn[E]={});Wn[h].vx==A&&Wn[h].vy==z&&Wn[h].el===g||(Wn[h].el=g,Wn[h].vx=A,Wn[h].vy=z,clearInterval(Wn[h].pid),0==A&&0==z||(d=!0,Wn[h].pid=setInterval(function(){o&&0===this.layer&&zn.active._onTouchMove(Ln);var t=Wn[this.layer].vy?Wn[this.layer].vy*l:0,i=Wn[this.layer].vx?Wn[this.layer].vx*l:0;"function"==typeof n&&"continue"!==n.call(zn.dragged.parentNode[Do],i,t,e,Ln,Wn[this.layer].el)||Ao(Wn[this.layer].el,i,t)}.bind({layer:h}),24))),h++}while(t.bubbleScroll&&u!==c&&(u=xo(u,!1)));Bn=d}},30),Jn=function(e){var t=e.originalEvent,i=e.putSortable,o=e.dragEl,n=e.activeSortable,a=e.dispatchSortableEvent,r=e.hideGhostForTarget,s=e.unhideGhostForTarget;if(t){var l=i||n;r();var c=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,d=document.elementFromPoint(c.clientX,c.clientY);s(),l&&!l.el.contains(d)&&(a("spill"),this.onSpill({dragEl:o,putSortable:i}))}};function qn(){}function Kn(){}qn.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,i=e.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var o=_o(this.sortable.el,this.startIndex,this.options);o?this.sortable.el.insertBefore(t,o):this.sortable.el.appendChild(t),this.sortable.animateAll(),i&&i.animateAll()},drop:Jn},qi(qn,{pluginName:"revertOnSpill"}),Kn.prototype={onSpill:function(e){var t=e.dragEl,i=e.putSortable||this.sortable;i.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),i.animateAll()},drop:Jn},qi(Kn,{pluginName:"removeOnSpill"}),zn.mount(new function(){function e(){for(var e in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}return e.prototype={dragStarted:function(e){var t=e.originalEvent;this.sortable.nativeDraggable?ro(document,"dragover",this._handleAutoScroll):this.options.supportPointer?ro(document,"pointermove",this._handleFallbackAutoScroll):t.touches?ro(document,"touchmove",this._handleFallbackAutoScroll):ro(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(e){var t=e.originalEvent;this.options.dragOverBubble||t.rootEl||this._handleAutoScroll(t)},drop:function(){this.sortable.nativeDraggable?so(document,"dragover",this._handleAutoScroll):(so(document,"pointermove",this._handleFallbackAutoScroll),so(document,"touchmove",this._handleFallbackAutoScroll),so(document,"mousemove",this._handleFallbackAutoScroll)),Vn(),Hn(),clearTimeout(uo),uo=void 0},nulling:function(){Ln=Mn=Fn=Bn=Un=Rn=jn=null,Wn.length=0},_handleFallbackAutoScroll:function(e){this._handleAutoScroll(e,!0)},_handleAutoScroll:function(e,t){var i=this,o=(e.touches?e.touches[0]:e).clientX,n=(e.touches?e.touches[0]:e).clientY,a=document.elementFromPoint(o,n);if(Ln=e,t||this.options.forceAutoScrollFallback||eo||Qi||io){Zn(e,this.options,a,t);var r=xo(a,!0);!Bn||Un&&o===Rn&&n===jn||(Un&&Vn(),Un=setInterval(function(){var a=xo(document.elementFromPoint(o,n),!0);a!==r&&(r=a,Hn()),Zn(e,i.options,a,t)},10),Rn=o,jn=n)}else{if(!this.options.bubbleScroll||xo(a,!0)===yo())return void Hn();Zn(e,this.options,xo(a,!1),!1)}}},qi(e,{pluginName:"scroll",initializeByDefault:!0})}),zn.mount(Kn,qn);const Gn=zn;var Yn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};const Xn={"top-left":"Top left","top-center":"Top center","top-right":"Top right","middle-left":"Left",center:"Center","middle-right":"Right","bottom-left":"Bottom left","bottom-center":"Bottom center","bottom-right":"Bottom right"};let Qn=class extends he{constructor(){super(...arguments),this.layout={zones:{}},this.selectedWidget=null,this.selectedZone=null,this.selectable=!1,this.sortables=[]}static get styles(){return a`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }

            .zone-grid {
                display: grid;
                grid-template-columns: 1fr 1.2fr 1fr;
                grid-template-rows: 1fr 1.2fr 1fr;
                gap: 6px;
                flex: 1;
                min-height: 0;
                padding: 6px;
            }

            .zone-cell {
                border: 1px dashed rgba(255, 255, 255, 0.35);
                border-radius: 8px;
                padding: 4px 6px 6px;
                min-width: 0;
                min-height: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .zone-cell:hover {
                border-color: rgba(255, 255, 255, 0.7);
                background-color: rgba(0, 0, 0, 0.15);
            }

            .zone-cell.selected {
                border-color: var(--primary-color, #03a9f4);
                border-style: solid;
            }

            .zone-label {
                font-size: 0.7rem;
                color: #fff;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
                opacity: 0.75;
                cursor: pointer;
                margin-bottom: 4px;
                user-select: none;
            }

            .zone-label:hover {
                opacity: 1;
            }

            .zone-list {
                display: flex;
                flex-direction: column;
                gap: 4px;
                flex: 1;
                min-height: 24px;
            }

            .chip {
                display: flex;
                align-items: center;
                gap: 6px;
                border-radius: 6px;
                padding: 2px 4px 2px 8px;
                font-size: 0.85rem;
                background-color: rgba(0, 0, 0, 0.65);
                color: #fff;
                cursor: grab;
                user-select: none;
                min-width: 0;
            }

            .chip span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
            }

            .chip ha-icon {
                --mdc-icon-size: 16px;
                flex-shrink: 0;
            }

            .chip ha-icon-button {
                --mdc-icon-button-size: 24px;
                --mdc-icon-size: 14px;
                flex-shrink: 0;
            }

            .chip.selected {
                outline: 2px solid var(--primary-color, #03a9f4);
            }

            .chip.sortable-ghost {
                opacity: 0.4;
            }

            .palette {
                display: flex;
                align-items: center;
                gap: 6px;
                flex-wrap: wrap;
                padding: 6px 8px;
                background-color: rgba(0, 0, 0, 0.55);
            }

            .palette-title {
                font-size: 0.75rem;
                color: #fff;
                opacity: 0.75;
                margin-right: 4px;
            }

            .palette .chip {
                border: 1px solid rgba(255, 255, 255, 0.4);
                background-color: rgba(0, 0, 0, 0.4);
                padding: 3px 10px;
            }
        `}disconnectedCallback(){super.disconnectedCallback(),this.destroySortables()}updated(e){super.updated(e),(e.has("layout")||0===this.sortables.length)&&this.rebuildSortables()}emitLayout(e){this.dispatchEvent(new CustomEvent("layout-changed",{detail:{layout:e},bubbles:!0,composed:!0}))}emitSelection(e,t){this.selectable&&this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}destroySortables(){this.sortables.forEach(e=>e.destroy()),this.sortables=[]}rebuildSortables(){var e,t;this.destroySortables(),null===(e=this.shadowRoot)||void 0===e||e.querySelectorAll(".zone-list").forEach(e=>{this.sortables.push(new Gn(e,{group:"wcc-widgets",animation:150,draggable:".chip",onEnd:e=>this.handleDragEnd(e)}))});const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".palette");i&&this.sortables.push(new Gn(i,{group:{name:"wcc-widgets",pull:"clone",put:!1},sort:!1,animation:150,draggable:".chip",onEnd:e=>this.handlePaletteDrop(e)}))}revertDragDom(e){var t,i;const o=e.from,n=null!==(i=o.children[null!==(t=e.oldIndex)&&void 0!==t?t:0])&&void 0!==i?i:null;e.item.parentElement===o&&e.oldIndex===e.newIndex||o.insertBefore(e.item,n)}handleDragEnd(e){const t=e.from.dataset.zone,i=e.to.dataset.zone;this.revertDragDom(e),t&&i&&null!=e.oldIndex&&null!=e.newIndex&&(t===i&&e.oldIndex===e.newIndex||this.emitLayout(function(e,t,i,o,n){var a;const r=Li(e),s=r.zones[t];if(!s||i<0||i>=s.widgets.length)return r;const[l]=s.widgets.splice(i,1),c=t===o?s:null!==(a=r.zones[o])&&void 0!==a?a:{widgets:[]},d=Math.max(0,Math.min(n,c.widgets.length));return c.widgets.splice(d,0,l),r.zones[o]=c,t!==o&&0===s.widgets.length&&delete r.zones[t],r}(this.layout,t,e.oldIndex,i,e.newIndex)))}handlePaletteDrop(e){var t;const i=e.to.dataset.zone,o=e.item.dataset.widgetType;if(e.item.parentElement!==e.from&&e.item.remove(),!i||!o)return;const n=ji.getInstance().getWidget(o);n&&this.emitLayout(Wi(this.layout,i,n.defaultConfig(),null!==(t=e.newIndex)&&void 0!==t?t:void 0))}addFromPaletteClick(e){var t;const i=ji.getInstance().getWidget(e);i&&this.emitLayout(Wi(this.layout,null!==(t=this.selectedZone)&&void 0!==t?t:"center",i.defaultConfig()))}renderChip(e,t,i){var o,n,a,r;const s=ji.getInstance().getWidget(t.type),l=(null===(o=this.selectedWidget)||void 0===o?void 0:o.zone)===e&&(null===(n=this.selectedWidget)||void 0===n?void 0:n.index)===i;return V`
            <div class="chip ${l?"selected":""}"
                 data-zone=${e} data-index=${i}
                 @click=${()=>this.emitSelection("wcc-widget-selected",{zone:e,index:i})}>
                <ha-icon .icon=${null!==(a=null==s?void 0:s.icon)&&void 0!==a?a:"mdi:puzzle"}></ha-icon>
                <span>${null!==(r=null==s?void 0:s.name)&&void 0!==r?r:t.type}</span>
                <ha-icon-button
                        .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                        title="Remove"
                        @click=${t=>{t.stopPropagation(),this.emitLayout(function(e,t,i){const o=Li(e),n=o.zones[t];return!n||i<0||i>=n.widgets.length||(n.widgets.splice(i,1),0===n.widgets.length&&delete o.zones[t]),o}(this.layout,e,i))}}
                ></ha-icon-button>
            </div>
        `}renderZoneCell(e){var t;const i=this.layout.zones[e];return V`
            <div class="zone-cell ${this.selectedZone===e?"selected":""}">
                <span class="zone-label" @click=${()=>this.emitSelection("wcc-zone-selected",{zone:e})}>
                    ${Xn[e]}${"exclusive"===(null==i?void 0:i.mode)?" ⇄":""}
                </span>
                <div class="zone-list" data-zone=${e}>
                    ${(null!==(t=null==i?void 0:i.widgets)&&void 0!==t?t:[]).map((t,i)=>this.renderChip(e,t,i))}
                </div>
            </div>
        `}render(){return V`
            <div class="zone-grid">
                ${zi.map(e=>this.renderZoneCell(e))}
            </div>
            <div class="palette">
                <span class="palette-title">Widgets — drag into a zone, or click to add to ${this.selectedZone?Xn[this.selectedZone]:"Center"}</span>
                ${ji.getInstance().getAllWidgets().map(e=>{var t;return V`
                    <div class="chip" data-widget-type=${e.widgetId}
                         title=${null!==(t=e.description)&&void 0!==t?t:""}
                         @click=${()=>this.addFromPaletteClick(e.widgetId)}>
                        <ha-icon .icon=${e.icon}></ha-icon>
                        <span>${e.name}</span>
                    </div>
                `})}
            </div>
        `}};Yn([me({attribute:!1})],Qn.prototype,"layout",void 0),Yn([me({attribute:!1})],Qn.prototype,"selectedWidget",void 0),Yn([me({attribute:!1})],Qn.prototype,"selectedZone",void 0),Yn([me({type:Boolean})],Qn.prototype,"selectable",void 0),Qn=Yn([ge("wcc-zone-overlay")],Qn);var ea=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let ta=class extends he{constructor(){super(...arguments),this.config={},this.selectedWidget=null,this.selectedZone=null,this.widgetEditorCache=new Map,this.previewCardConfigJson=""}get v3(){return Ti(this.config)}get layout(){return this.v3.layout}static get styles(){return a`
            .content {
                padding: 12px;
            }

            .hint {
                font-size: 0.85rem;
                opacity: 0.7;
                margin: 0 0 12px;
            }

            /* WYSIWYG canvas: the live card renders underneath, the zone overlay
               lies transparently on top — editing happens "on the card". */
            .wysiwyg {
                position: relative;
                margin-bottom: 12px;
                border-radius: 8px;
                overflow: hidden;
            }

            .wysiwyg .canvas-card {
                display: block;
                width: 100%;
                pointer-events: none;
            }

            .wysiwyg wcc-zone-overlay {
                position: absolute;
                inset: 0;
            }

            .detail {
                border-top: 1px solid var(--divider-color, #666);
                padding-top: 8px;
                margin-top: 4px;
            }

            .detail-title {
                font-weight: 500;
                margin-bottom: 4px;
            }

            ha-row-selector {
                display: block;
                width: 100%;
            }
        `}emitLayout(e){this.emitConfig({...this.v3,layout:e})}emitConfig(e){gt(this,"config-changed",{config:e})}get spacingPresetValue(){const e=this.layout.spacing;return void 0===e?"normal":"string"==typeof e?e:"custom"}handleSpacingPresetChanged(e){"custom"===e?this.emitLayout(Bi(this.layout,{...Ri(this.layout)})):"normal"===e?this.emitLayout(Bi(this.layout,void 0)):this.emitLayout(Bi(this.layout,e))}handleSpacingValueChanged(e,t){const i="object"==typeof this.layout.spacing?this.layout.spacing:{};this.emitLayout(Bi(this.layout,{...i,[e]:t}))}getWidgetEditorElement(e){let t=this.widgetEditorCache.get(e);return t||(t=document.createElement(e),t.addEventListener("config-changed",e=>{e.stopPropagation(),this.handleWidgetEditorChanged(e.detail.config)}),this.widgetEditorCache.set(e,t)),t}handleWidgetEditorChanged(e){var t;const i=this.selectedWidget,o=i&&(null===(t=this.layout.zones[i.zone])||void 0===t?void 0:t.widgets[i.index]);if(!i||!o)return;const n=function(e,t){var i,o,n,a,r;switch(e.type){case"clock":return Zi({...Vi(e),clockSize:e.clockSize,timeFormat:t.timeFormat});case"date":return Zi({...Vi(e),dateSize:e.dateSize,dateFormat:t.dateFormat});case"sensors":return Zi({...Vi(e),labelSize:e.labelSize,valueSize:e.valueSize,sensors:null!==(i=t.sensors)&&void 0!==i?i:[]});case"weather":return Zi({...Vi(e),labelSize:e.labelSize,valueSize:e.valueSize,provider:t.weatherProvider,providerConfig:t.weatherConfig,displayMode:t.weatherDisplayMode,forecastDays:t.weatherForecastDays,title:t.weatherTitle,updateInterval:t.weatherUpdateInterval,iconSet:t.weatherIconSet});case"transportation":{const i=null!==(o=t.transportation)&&void 0!==o?o:{},{enabled:n,...a}=i;return{...Vi(e),...a}}case"action-bar":{const i=null!==(n=t.actionBar)&&void 0!==n?n:{};return Zi({...Vi(e),iconSize:e.iconSize,enabled:null===(a=i.enabled)||void 0===a||a,actions:null!==(r=i.actions)&&void 0!==r?r:[],alignment:i.alignment,backgroundOpacity:i.backgroundOpacity})}default:return{...t,...Vi(e)}}}(o,e);this.emitLayout(function(e,t,i,o){const n=Li(e),a=n.zones[t];return!a||i<0||i>=a.widgets.length||(a.widgets[i]={...Li(o),type:a.widgets[i].type,id:a.widgets[i].id}),n}(this.layout,i.zone,i.index,n))}getPreviewCard(){var e,t;if(!customElements.get("wall-clock-card"))return;this.previewCard||(this.previewCard=document.createElement("wall-clock-card"),this.previewCard.classList.add("canvas-card")),this.previewCard.hass=this.hass;const i=JSON.stringify(this.v3);return i!==this.previewCardConfigJson&&(this.previewCardConfigJson=i,null===(t=(e=this.previewCard).setConfig)||void 0===t||t.call(e,JSON.parse(i))),this.previewCard}renderSpacing(){const e=Ri(this.layout);return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"compact",label:"Compact"},{value:"normal",label:"Normal"},{value:"spacious",label:"Spacious"},{value:"custom",label:"Custom"}],mode:"dropdown"}}}
                    .value=${this.spacingPresetValue}
                    .label=${"Spacing"}
                    @value-changed=${e=>this.handleSpacingPresetChanged(e.detail.value)}
            ></ha-row-selector>
            ${"custom"===this.spacingPresetValue?V`
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text:{}}} .value=${e.padding}
                        .label=${"Card padding — 1-4 values: top right bottom left (e.g., 16px or 8px 16px 24px 16px)"}
                        @value-changed=${e=>this.handleSpacingValueChanged("padding",e.detail.value)}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text:{}}} .value=${e.zoneGap}
                        .label=${"Zone gap (e.g., 16px)"}
                        @value-changed=${e=>this.handleSpacingValueChanged("zoneGap",e.detail.value)}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text:{}}} .value=${e.widgetGap}
                        .label=${"Widget gap (e.g., 8px)"}
                        @value-changed=${e=>this.handleSpacingValueChanged("widgetGap",e.detail.value)}
                ></ha-row-selector>
            `:""}
        `}renderZoneDetail(e){var t,i,o,n;const a=this.layout.zones[e];if(!a)return V``;const r=t=>this.emitLayout(function(e,t,i){const o=Li(e),n=o.zones[t];if(!n)return o;const a=n;for(const[e,t]of Object.entries(i))void 0===t||""===t?delete a[e]:a[e]=t;return o}(this.layout,e,t));return V`
            <div class="detail">
                <div class="detail-title">Zone: ${Xn[e]}</div>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:[{value:"stack",label:"Stack (show all widgets)"},{value:"exclusive",label:"Exclusive (highest-priority active widget)"}],mode:"dropdown"}}}
                        .value=${null!==(t=a.mode)&&void 0!==t?t:"stack"}
                        .label=${"Mode"}
                        @value-changed=${e=>r({mode:"stack"===e.detail.value?void 0:e.detail.value})}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:[{value:"column",label:"Column"},{value:"row",label:"Row"}],mode:"dropdown"}}}
                        .value=${null!==(i=a.direction)&&void 0!==i?i:"column"}
                        .label=${"Direction"}
                        @value-changed=${e=>r({direction:"column"===e.detail.value?void 0:e.detail.value})}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text:{}}} .value=${null!==(o=a.gap)&&void 0!==o?o:""}
                        .label=${"Widget gap override (e.g., 4px)"}
                        @value-changed=${e=>r({gap:e.detail.value})}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text:{}}} .value=${null!==(n=a.padding)&&void 0!==n?n:""}
                        .label=${"Zone padding (e.g., 0 16px)"}
                        @value-changed=${e=>r({padding:e.detail.value})}
                ></ha-row-selector>
            </div>
        `}renderWidgetDetail(e){var t,i;const o=null===(t=this.layout.zones[e.zone])||void 0===t?void 0:t.widgets[e.index];if(!o)return V``;const n=ji.getInstance().getWidget(o.type);if(!(null==n?void 0:n.editorTag))return V`
                <div class="detail">
                    <div class="detail-title">${null!==(i=null==n?void 0:n.name)&&void 0!==i?i:o.type}</div>
                    <p class="hint">This widget has no settings.</p>
                </div>
            `;const a=this.getWidgetEditorElement(n.editorTag);return a.hass=this.hass,a.config=function(e){var t,i,o;switch(e.type){case"clock":return Zi({timeFormat:e.timeFormat});case"date":return Zi({dateFormat:e.dateFormat});case"sensors":return Zi({sensors:null!==(t=e.sensors)&&void 0!==t?t:[]});case"weather":return Zi({showWeather:!0,weatherProvider:e.provider,weatherConfig:e.providerConfig,weatherDisplayMode:e.displayMode,weatherForecastDays:e.forecastDays,weatherTitle:e.title,weatherUpdateInterval:e.updateInterval,weatherIconSet:e.iconSet});case"transportation":{const{type:t,id:i,priority:o,style:n,visibility:a,...r}=e;return{transportation:{enabled:!0,...r}}}case"action-bar":return{actionBar:Zi({enabled:null===(i=e.enabled)||void 0===i||i,actions:null!==(o=e.actions)&&void 0!==o?o:[],alignment:e.alignment,backgroundOpacity:e.backgroundOpacity})};default:return e}}(o),V`
            <div class="detail">
                <div class="detail-title">${n.name} <span style="opacity:0.5">(${Xn[e.zone]})</span></div>
                ${a}
            </div>
        `}render(){return this.hass?V`
            <div class="content">
                ${this.config.layout?"":V`
                    <p class="hint">This card still uses the legacy configuration. The first layout
                        change converts it to the new zone format automatically.</p>
                `}
                ${this.renderSpacing()}
                <div class="wysiwyg">
                    ${this.getPreviewCard()}
                    <wcc-zone-overlay
                            .layout=${this.layout}
                            .selectedWidget=${this.selectedWidget}
                            .selectedZone=${this.selectedZone}
                            selectable
                            @layout-changed=${e=>{e.stopPropagation(),this.selectedWidget=null,this.emitLayout(e.detail.layout)}}
                            @wcc-widget-selected=${e=>{var t,i;this.selectedZone=null;const{zone:o,index:n}=e.detail;this.selectedWidget=(null===(t=this.selectedWidget)||void 0===t?void 0:t.zone)===o&&(null===(i=this.selectedWidget)||void 0===i?void 0:i.index)===n?null:{zone:o,index:n}}}
                            @wcc-zone-selected=${e=>{this.selectedWidget=null,this.selectedZone=this.selectedZone===e.detail.zone?null:e.detail.zone}}
                    ></wcc-zone-overlay>
                </div>
                ${this.selectedZone?this.renderZoneDetail(this.selectedZone):""}
                ${this.selectedWidget?this.renderWidgetDetail(this.selectedWidget):""}
            </div>
        `:V``}};ea([me({type:Object})],ta.prototype,"hass",void 0),ea([me({type:Object})],ta.prototype,"config",void 0),ea([ve()],ta.prototype,"selectedWidget",void 0),ea([ve()],ta.prototype,"selectedZone",void 0),ta=ea([ge("layout-editor")],ta);var ia=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let oa=class extends he{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._actions=[],this._languageOptions=[]}connectedCallback(){super.connectedCallback(),this._languageOptions=Le.map(e=>({value:e.code,label:e.label}))}updated(e){super.updated(e)}firstUpdated(e){super.firstUpdated(e),this._openDialogEnlarged()}_openDialogEnlarged(){var e;try{let t=this;for(;t;){const i=t.getRootNode();if(!(i instanceof ShadowRoot))return;const o=i.host;if("hui-dialog-edit-card"===o.localName)return"boolean"==typeof o.large?o.large=!0:"boolean"==typeof o._large&&(o._large=!0),null===(e=o.requestUpdate)||void 0===e||e.call(o),void requestAnimationFrame(()=>{var e;const t=null===(e=o.shadowRoot)||void 0===e?void 0:e.querySelector(".element-preview");t&&(t.style.flex="1 1 0",t.style.maxWidth="none")});t=o}}catch(e){}}setConfig(e){var t,i,o,n,a,r;const s=e;if(s.layout)return void(this._config=s);const l=s.imageSource||"none";let c={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};s.timeFormat&&(c={...c,...s.timeFormat},void 0===s.timeFormat.second&&(c.second=void 0)),this._config={...s,timeFormat:c,dateFormat:s.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==s.backgroundOpacity?s.backgroundOpacity:.3,imageSource:l,imageConfig:s.imageConfig||{},backgroundRotationInterval:s.backgroundRotationInterval||90,sensors:s.sensors||[],fontColor:s.fontColor||"#FFFFFF",size:s.size||tt.Medium,customSizes:s.customSizes?{clockSize:null!==(t=s.customSizes.clockSize)&&void 0!==t?t:"16rem",dateSize:null!==(i=s.customSizes.dateSize)&&void 0!==i?i:"6rem",labelSize:null!==(o=s.customSizes.labelSize)&&void 0!==o?o:"1.5rem",valueSize:null!==(n=s.customSizes.valueSize)&&void 0!==n?n:"3rem",actionBarIconSize:null!==(a=s.customSizes.actionBarIconSize)&&void 0!==a?a:"72px",clockTopMargin:null!==(r=s.customSizes.clockTopMargin)&&void 0!==r?r:"0rem"}:{clockSize:"16rem",dateSize:"6rem",labelSize:"1.5rem",valueSize:"3rem",actionBarIconSize:"72px",clockTopMargin:"0rem"},showWeather:void 0!==s.showWeather&&s.showWeather,weatherProvider:s.weatherProvider||"openweathermap",weatherConfig:s.weatherConfig||{},weatherDisplayMode:s.weatherDisplayMode||"both",weatherForecastDays:s.weatherForecastDays||3,transportation:s.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops(),this._loadActions()}_loadSensors(){var e;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadActions(){var e;(null===(e=this._config)||void 0===e?void 0:e.actionBar)&&this._config.actionBar.actions&&this._config.actionBar.actions.length>0?this._actions=[...this._config.actionBar.actions]:this._actions=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}get _isV3(){var e;return!!(null===(e=this._config)||void 0===e?void 0:e.layout)}_generalValue(e){var t,i;return this._isV3?null===(t=this._config.appearance)||void 0===t?void 0:t[e]:null===(i=this._config)||void 0===i?void 0:i[e]}_sizeValue(e,t,i,o){var n,a,r,s,l;if(this._isV3){const e="sensors"===t?this._widgetSizeValue("weather",i):void 0;return null!==(a=null!==(n=this._widgetSizeValue(t,i))&&void 0!==n?n:e)&&void 0!==a?a:o}return null!==(l=(null!==(s=null===(r=this._config)||void 0===r?void 0:r.customSizes)&&void 0!==s?s:{})[e])&&void 0!==l?l:o}_widgetSizeValue(e,t){var i,o,n;const a=null!==(o=null===(i=this._config.layout)||void 0===i?void 0:i.zones)&&void 0!==o?o:{};for(const i of Object.values(a))for(const o of null!==(n=null==i?void 0:i.widgets)&&void 0!==n?n:[])if(o.type===e&&void 0!==o[t])return o[t]}_handleFormValueChanged(e){if(e.stopPropagation(),!this._config)return;if(this._isV3){const t=function(e,t,i){const o=Li(e);switch(t){case"fontColor":case"language":case"size":return o.appearance={...o.appearance,[t]:i},o;case"logLevel":return o.logLevel=i,o;case"customSizes.clockSize":return Hi(o,"clock","clockSize",i),o;case"customSizes.dateSize":return Hi(o,"date","dateSize",i),o;case"customSizes.labelSize":return Hi(o,"sensors","labelSize",i),Hi(o,"weather","labelSize",i),o;case"customSizes.valueSize":return Hi(o,"sensors","valueSize",i),Hi(o,"weather","valueSize",i),o;case"customSizes.actionBarIconSize":return Hi(o,"action-bar","iconSize",i),o;default:return o}}(this._config,e.detail.propertyName,e.detail.value);return this._config=t,void gt(this,"config-changed",{config:this._config})}const t=function(e,t,i){const o=JSON.parse(JSON.stringify(e)),n=t.split(".");let a=o;for(let e=0;e<n.length-1;e++){const t=n[e];void 0===a[t]&&(a[t]={}),a=a[t]}return a[n[n.length-1]]=i,o}(this._config,e.detail.propertyName,e.detail.value);this._config=t,gt(this,"config-changed",{config:t})}static get styles(){return a`
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
        `}render(){var e,t;return this.hass&&this._config?V`
            <div class="form-container">
                <!-- Layout Section (zones + widgets + drag & drop) -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Layout</h3>
                    <layout-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,gt(this,"config-changed",{config:this._config})}}
                    ></layout-editor>
                </ha-expansion-panel>

                <!-- General Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">General</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{color_hex:""}}
                                .value=${this._generalValue("fontColor")}
                                .label= ${"Font Color"}
                                propertyName="fontColor"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._languageOptions,mode:"dropdown"}}}
                                .value=${this._generalValue("language")||"en"}
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
                                .selector=${{select:{options:[{value:tt.Large,label:"Large"},{value:tt.Medium,label:"Medium"},{value:tt.Small,label:"Small"},{value:tt.Custom,label:"Custom"}],mode:"dropdown"}}}
                                .value=${this._generalValue("size")||tt.Medium}
                                .label= ${"Size"}
                                propertyName="size"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${(this._generalValue("size")||tt.Medium)===tt.Custom?V`
                            <h4>Custom Sizes</h4>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("clockSize","clock","clockSize","16rem")}
                                    .label= ${"Clock Size (e.g., 16rem)"}
                                    propertyName="customSizes.clockSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${this._isV3?"":V`
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{}}}
                                        .value=${(null===(e=this._config.customSizes)||void 0===e?void 0:e.clockTopMargin)||"0rem"}
                                        .label= ${"Clock Top Margin (e.g., 0rem)"}
                                        propertyName="customSizes.clockTopMargin"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            `}

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("dateSize","date","dateSize","6rem")}
                                    .label= ${"Date Size (e.g., 6rem)"}
                                    propertyName="customSizes.dateSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("labelSize","sensors","labelSize","1.5rem")}
                                    .label= ${"Label Size (e.g., 1.5rem)"}
                                    propertyName="customSizes.labelSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("valueSize","sensors","valueSize","3rem")}
                                    .label= ${"Value Size (e.g., 3rem)"}
                                    propertyName="customSizes.valueSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("actionBarIconSize","action-bar","iconSize","72px")}
                                    .label= ${"Action Bar Icon Size (e.g., 72px)"}
                                    propertyName="customSizes.actionBarIconSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Background Section (v3: adapted to background.* keys) -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <background-editor
                        .hass=${this.hass}
                        .config=${this._isV3?function(e){var t;const i=null!==(t=e.background)&&void 0!==t?t:{};return Zi({imageSource:i.source,imageConfig:i.config,backgroundImages:i.images,backgroundOpacity:i.opacity,backgroundRotationInterval:i.rotationInterval,objectFit:i.objectFit})}(this._config):this._config}
                        @config-changed=${e=>{var t;this._isV3?this._config={...this._config,background:(t=e.detail.config,Zi({source:t.imageSource,config:t.imageConfig,images:t.backgroundImages,opacity:t.backgroundOpacity,rotationInterval:t.backgroundRotationInterval,objectFit:t.objectFit}))}:(this._config=e.detail.config,this._loadBackgroundImages()),gt(this,"config-changed",{config:this._config})}}
                    ></background-editor>
                </ha-expansion-panel>

                ${this._isV3?"":V`
                    <!-- Legacy sections: for zone layouts these settings are edited
                         per widget in the Layout section above -->

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
                    ${!0===(null===(t=this._config.transportation)||void 0===t?void 0:t.enabled)?V`
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
                `}
            </div>
        `:V``}};ia([me({type:Object})],oa.prototype,"hass",void 0),ia([me({type:Object})],oa.prototype,"_config",void 0),ia([me({type:Array})],oa.prototype,"_sensors",void 0),ia([me({type:Array})],oa.prototype,"_backgroundImages",void 0),ia([me({type:Array})],oa.prototype,"_stops",void 0),ia([me({type:Array})],oa.prototype,"_actions",void 0),oa=ia([ge("wall-clock-card-editor")],oa);var na=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let aa=class extends he{constructor(){super(...arguments),this.disabled=!1,this.required=!0}render(){return V`
            <ha-textfield
                    type="color"
                    .value=${this.value||""}
                    .label=${this.label}
                    .helper=${this.helper}
                    .disabled=${this.disabled}
                    .required=${this.required}
                    @change=${this._valueChanged}
            ></ha-textfield>
        `}_valueChanged(e){const t=e.target.value;t&&!/^#[0-9a-fA-F]{6}$/.test(t)||gt(this,"value-changed",{value:t})}};aa.styles=a`
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
    `,na([me({attribute:!1})],aa.prototype,"hass",void 0),na([me({attribute:!1})],aa.prototype,"selector",void 0),na([me()],aa.prototype,"value",void 0),na([me()],aa.prototype,"label",void 0),na([me()],aa.prototype,"helper",void 0),na([me({type:Boolean,reflect:!0})],aa.prototype,"disabled",void 0),na([me({type:Boolean})],aa.prototype,"required",void 0),aa=na([ge("ha-selector-color_hex")],aa);var ra=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let sa=class extends he{constructor(){super(...arguments),this.disabled=!1,this.required=!0,this.labelPosition=Pt.Left}render(){return V`
            <div class="row ${this.labelPosition.toLowerCase()}">
                ${this.label&&this.labelPosition!==Pt.Hidden?V`
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
        `}_handleDynamicActionClick(e,t,i){e.stopPropagation(),gt(this,i||`action-click-${t}`,{})}_valueChanged(e){e.stopPropagation();let t=e.detail.value;this.transformData&&(t=this.transformData(t)),gt(this,"value-changed",{value:t,propertyName:this.propertyName})}};sa.styles=a`
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
    `,ra([me({attribute:!1})],sa.prototype,"hass",void 0),ra([me({attribute:!1})],sa.prototype,"selector",void 0),ra([me()],sa.prototype,"value",void 0),ra([me()],sa.prototype,"label",void 0),ra([me()],sa.prototype,"helper",void 0),ra([me({type:Boolean,reflect:!0})],sa.prototype,"disabled",void 0),ra([me({type:Boolean})],sa.prototype,"required",void 0),ra([me()],sa.prototype,"propertyName",void 0),ra([me({attribute:!1})],sa.prototype,"transformData",void 0),ra([me({attribute:!1})],sa.prototype,"labelPosition",void 0),ra([me({attribute:!1})],sa.prototype,"actionButtons",void 0),sa=ra([ge("ha-row-selector")],sa);const{I:la}=le,ca=()=>document.createComment(""),da=(e,t,i)=>{var o;const n=e._$AA.parentNode,a=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=n.insertBefore(ca(),a),o=n.insertBefore(ca(),a);i=new la(t,o,e,e.options)}else{const t=i._$AB.nextSibling,r=i._$AM,s=r!==e;if(s){let t;null===(o=i._$AQ)||void 0===o||o.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==r._$AU&&i._$AP(t)}if(t!==a||s){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;n.insertBefore(e,a),e=t}}}return i},ha=(e,t,i=e)=>(e._$AI(t,i),e),ua={},ga=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const o=e._$AB.nextSibling;for(;i!==o;){const e=i.nextSibling;i.remove(),i=e}},pa=(e,t,i)=>{const o=new Map;for(let n=t;n<=i;n++)o.set(e[n],n);return o},fa=St(class extends Ct{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}ct(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);const n=[],a=[];let r=0;for(const t of e)n[r]=o?o(t,r):r,a[r]=i(t,r),r++;return{values:a,keys:n}}render(e,t,i){return this.ct(e,t,i).values}update(e,[t,i,o]){var n;const a=(e=>e._$AH)(e),{values:r,keys:s}=this.ct(t,i,o);if(!Array.isArray(a))return this.ut=s,r;const l=null!==(n=this.ut)&&void 0!==n?n:this.ut=[],c=[];let d,h,u=0,g=a.length-1,p=0,f=r.length-1;for(;u<=g&&p<=f;)if(null===a[u])u++;else if(null===a[g])g--;else if(l[u]===s[p])c[p]=ha(a[u],r[p]),u++,p++;else if(l[g]===s[f])c[f]=ha(a[g],r[f]),g--,f--;else if(l[u]===s[f])c[f]=ha(a[u],r[f]),da(e,c[f+1],a[u]),u++,f--;else if(l[g]===s[p])c[p]=ha(a[g],r[p]),da(e,a[u],a[g]),g--,p++;else if(void 0===d&&(d=pa(s,p,f),h=pa(l,u,g)),d.has(l[u]))if(d.has(l[g])){const t=h.get(s[p]),i=void 0!==t?a[t]:null;if(null===i){const t=da(e,a[u]);ha(t,r[p]),c[p]=t}else c[p]=ha(i,r[p]),da(e,a[u],i),a[t]=null;p++}else ga(a[g]),g--;else ga(a[u]),u++;for(;p<=f;){const t=da(e,c[f+1]);ha(t,r[p]),c[p++]=t}for(;u<=g;){const e=a[u++];null!==e&&ga(e)}return this.ut=s,((e,t=ua)=>{e._$AH=t})(e,c),Z}});var ma=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let va=class extends he{constructor(){super(...arguments),this.widgets=[],this.activeWidget=null,this.previousWidget=null,this.messenger=Je.getInstance(),this.logger=Se("wcc-zone"),this.animationOptions={duration:500,fill:"forwards"},this.onRequestUpdate=e=>{this.updateActiveWidget()}}connectedCallback(){super.connectedCallback(),this.messenger.subscribe(Ge,this.onRequestUpdate),this.updateActiveWidget()}disconnectedCallback(){super.disconnectedCallback(),this.messenger.unsubscribe(Ge,this.onRequestUpdate)}updated(e){super.updated(e),(e.has("widgets")||e.has("zoneConfig"))&&this.updateActiveWidget()}get isExclusive(){var e;return"exclusive"===(null===(e=this.zoneConfig)||void 0===e?void 0:e.mode)}updateActiveWidget(){var e,t,i,o;if(!this.isExclusive)return;const n=[...this.widgets].sort((e,t)=>t.priority-e.priority),a=null!==(e=n.find(e=>e.isActive))&&void 0!==e?e:null;a!==this.activeWidget&&(this.logger.debug(`Exclusive zone ${this.zoneId}: switching to ${null!==(i=null===(t=null==a?void 0:a.config)||void 0===t?void 0:t.type)&&void 0!==i?i:"none"}`),this.previousWidget=this.activeWidget,null===(o=this.activeWidget)||void 0===o||o.deactivate(),this.activeWidget=a,null==a||a.activate(),this.previousWidget&&this.activeWidget&&this.updateComplete.then(()=>this.animateTransition()))}animateTransition(){var e,t;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".item.active"),o=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".item.previous");i&&o&&(o.animate([{opacity:1},{opacity:0}],{...this.animationOptions,easing:"ease-out"}),i.animate([{opacity:0},{opacity:1}],{...this.animationOptions,easing:"ease-in"}))}render(){const e=this.zoneConfig,t=(null==e?void 0:e.gap)?`--zone-gap: ${e.gap};`:"",i=(null==e?void 0:e.padding)?`padding: ${e.padding};`:"",o=(null==e?void 0:e.align)?{start:"flex-start",center:"center",end:"flex-end"}[e.align]:(null==(n=this.zoneId)?void 0:n.endsWith("-left"))?"flex-start":(null==n?void 0:n.endsWith("-right"))?"flex-end":"center";var n;if(this.isExclusive)return V`
                <div class="exclusive" style="${i}">
                    ${this.widgets.map(e=>V`
                        <div class="item
                                    ${e===this.activeWidget?"active":""}
                                    ${e===this.previousWidget?"previous":""}">
                            ${e}
                        </div>
                    `)}
                </div>
            `;const a="row"===(null==e?void 0:e.direction)?"row":"column";return V`
            <div class="stack ${a}" style="${t} ${i} ${"column"===a?`align-items: ${o};`:`justify-content: ${o};`}">
                ${this.widgets}
            </div>
        `}};va.styles=a`
        :host {
            display: block;
            min-width: 0;
            min-height: 0;
        }

        .stack {
            display: flex;
            width: 100%;
            height: 100%;
            gap: var(--zone-gap, var(--wcc-widget-gap, 8px));
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
    `,ma([me({attribute:!1})],va.prototype,"zoneId",void 0),ma([me({attribute:!1})],va.prototype,"zoneConfig",void 0),ma([me({attribute:!1})],va.prototype,"widgets",void 0),ma([ve()],va.prototype,"activeWidget",void 0),va=ma([ge("wcc-zone")],va);var ya=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let wa=class extends he{constructor(){super(...arguments),this.appearance={},this.zoneEntries=[],this.widgetCache=new Map,this.logger=Se("wcc-layout")}willUpdate(e){e.has("layout")&&this.rebuildZones(),(e.has("hass")||e.has("appearance"))&&this.forwardToWidgets()}rebuildZones(){var e,t,i;const o=ji.getInstance(),n=new Map;this.zoneEntries=[];for(const a of zi){const r=null===(t=null===(e=this.layout)||void 0===e?void 0:e.zones)||void 0===t?void 0:t[a];if(!(null===(i=null==r?void 0:r.widgets)||void 0===i?void 0:i.length))continue;const s=[];r.widgets.forEach((e,t)=>{var i,r;const l=`${a}:${null!==(i=e.id)&&void 0!==i?i:`${t}:${e.type}`}`;let c=this.widgetCache.get(l);if(c&&(null===(r=c.config)||void 0===r?void 0:r.type)===e.type)c.config=e;else if(c=o.createElement(e),!c)return;c.appearance=this.appearance,this.hass&&(c.hass=this.hass),n.set(l,c),s.push(c)}),s.length&&this.zoneEntries.push({zoneId:a,config:r,widgets:s})}this.widgetCache=n,this.logger.debug(`Rebuilt zones: ${this.zoneEntries.map(e=>e.zoneId).join(", ")||"none"}`)}forwardToWidgets(){for(const e of this.widgetCache.values())e.appearance=this.appearance,this.hass&&(e.hass=this.hass)}hasWidget(e){return this.zoneEntries.some(t=>t.widgets.some(t=>{var i;return(null===(i=t.config)||void 0===i?void 0:i.type)===e}))}hasZone(e){return this.zoneEntries.some(t=>t.zoneId===e)}zonePlacement(e){const[t]="center"===e?["middle"]:e.split("-"),i="top"===t?"start":"bottom"===t?"end":"center";if("bottom-center"===e&&!this.hasZone("bottom-left")&&!this.hasZone("bottom-right"))return"grid-row: 3; grid-column: 1 / -1; align-self: end; justify-self: stretch;";if("top-center"===e&&!this.hasZone("top-left")&&!this.hasZone("top-right"))return"grid-row: 1; grid-column: 1 / -1; align-self: start; justify-self: stretch;";const o=e.endsWith("-left")?"start":e.endsWith("-right")?"end":"top-center"===e||"bottom-center"===e?"stretch":"center";return`grid-area: ${e}; align-self: ${i}; justify-self: ${o};`}render(){const e=Ri(this.layout);return V`
            <div class="grid"
                 style="--wcc-padding: ${e.padding}; --wcc-zone-gap: ${e.zoneGap}; --wcc-widget-gap: ${e.widgetGap};">
                ${fa(this.zoneEntries,e=>e.zoneId,e=>V`
                    <wcc-zone style="${this.zonePlacement(e.zoneId)}"
                              .zoneId=${e.zoneId}
                              .zoneConfig=${e.config}
                              .widgets=${e.widgets}></wcc-zone>
                `)}
            </div>
        `}};wa.styles=a`
        :host {
            display: block;
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
            height: 100%;
            box-sizing: border-box;
        }
    `,ya([me({attribute:!1})],wa.prototype,"layout",void 0),ya([me({attribute:!1})],wa.prototype,"hass",void 0),ya([me({attribute:!1})],wa.prototype,"appearance",void 0),wa=ya([ge("wcc-layout")],wa);class ba extends Ze{constructor(e,t={}){super(e,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=t}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(e){this.logger.debug("Updating ClockController config:",e),this.config={...this.config,...e};const t=new Date,i=this.config.language||"en",o=this.config.timeZone;this.updateTime(t,o),this.updateDate(t,i,o),this.host.requestUpdate()}update(){const e=new Date,t=this.config.language||"en",i=this.config.timeZone;this.updateTime(e,i),0!==e.getSeconds()&&""!==this._currentDate||this.updateDate(e,t,i),this.host.requestUpdate()}updateTime(e,t){var i,o,n,a,r,s,l,c;const d="hidden"===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.second),h=!0===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.hour12);let u,g,p;if(t){const i=new Intl.DateTimeFormat("en-US",{timeZone:t,hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(e);u=parseInt((null===(n=i.find(e=>"hour"===e.type))||void 0===n?void 0:n.value)||"0",10),g=parseInt((null===(a=i.find(e=>"minute"===e.type))||void 0===a?void 0:a.value)||"0",10),p=parseInt((null===(r=i.find(e=>"second"===e.type))||void 0===r?void 0:r.value)||"0",10)}else u=e.getHours(),g=e.getMinutes(),p=e.getSeconds();if(d&&(this._seconds=""),h){const e=u>=12;u%=12,u=u||12,this._ampm=e?"PM":"AM"}else this._ampm="";const f="numeric"!==(null===(s=this.config.timeFormat)||void 0===s?void 0:s.hour);this._hours=f?u.toString().padStart(2,"0"):u.toString();const m="numeric"!==(null===(l=this.config.timeFormat)||void 0===l?void 0:l.minute);if(this._minutes=m?g.toString().padStart(2,"0"):g.toString(),!d){const e="numeric"!==(null===(c=this.config.timeFormat)||void 0===c?void 0:c.second);this._seconds=e?p.toString().padStart(2,"0"):p.toString()}}updateDate(e,t,i){let o=Ve(e,t,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},i);o=o.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=o}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var _a=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let $a=class extends he{constructor(){super(),this.showClock=!0,this.showDate=!0,this.logger=Se("clock-component"),this.clockController=new ba(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(e){if(super.updated(e),e.has("timeFormat")||e.has("dateFormat")||e.has("language")||e.has("timeZone")||e.has("size")||e.has("clockSize")||e.has("dateSize")||e.has("clockTopMargin")){if(this.logger.debug("Clock properties changed, updating ClockController"),e.has("timeFormat")){const t=e.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.timeFormat)}`)}if(e.has("dateFormat")){const t=e.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.dateFormat)}`)}if(e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("clockSize")){const t=e.get("clockSize");this.logger.debug(`ClockSize changed: ${t} -> ${this.clockSize}`)}if(e.has("dateSize")){const t=e.get("dateSize");this.logger.debug(`DateSize changed: ${t} -> ${this.dateSize}`)}if(e.has("clockTopMargin")){const t=e.get("clockTopMargin");this.logger.debug(`ClockTopMargin changed: ${t} -> ${this.clockTopMargin}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}getClockSize(){return ot(this.size,this.clockSize,"clockSize")}getDateSize(){return ot(this.size,this.dateSize,"dateSize")}getClockTopMargin(){var e;return this.size===tt.Custom&&null!==(e=this.clockTopMargin)&&void 0!==e?e:"0rem"}render(){var e,t;const i=this.getSeconds(),o=void 0!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second)&&"hidden"!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second),n=this.getClockSize(),a=this.getDateSize();return V`
            ${this.showClock?V`
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
            `:""}
            ${this.showDate?V`
                <div class="date" style="color: ${this.fontColor}; font-size: ${a};">${this.getCurrentDate()}</div>
            `:""}
        `}};function Sa(e,t){var i;return e||(null===(i=null==t?void 0:t.locale)||void 0===i?void 0:i.language)||(null==t?void 0:t.language)||"en"}function Ca(e,t){var i,o;if(void 0!==e)return Boolean(e);const n=null===(i=null==t?void 0:t.locale)||void 0===i?void 0:i.time_format;if("12"===n)return!0;if("24"===n)return!1;const a="system"===n?void 0:Sa(void 0,t);try{return null!==(o=new Intl.DateTimeFormat(a,{hour:"numeric"}).resolvedOptions().hour12)&&void 0!==o&&o}catch(e){return!1}}$a.styles=a`
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
    `,_a([me({type:Object})],$a.prototype,"timeFormat",void 0),_a([me({type:Object})],$a.prototype,"dateFormat",void 0),_a([me({type:String})],$a.prototype,"fontColor",void 0),_a([me({type:String})],$a.prototype,"language",void 0),_a([me({type:String})],$a.prototype,"timeZone",void 0),_a([me({type:String})],$a.prototype,"size",void 0),_a([me({type:String})],$a.prototype,"clockSize",void 0),_a([me({type:String})],$a.prototype,"dateSize",void 0),_a([me({type:String})],$a.prototype,"clockTopMargin",void 0),_a([me({type:Boolean})],$a.prototype,"showClock",void 0),_a([me({type:Boolean})],$a.prototype,"showDate",void 0),$a=_a([ge("ha-clock")],$a);var xa=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};class ka extends he{constructor(){super(...arguments),this.appearance={}}get priority(){var e,t;return null!==(t=null===(e=this.config)||void 0===e?void 0:e.priority)&&void 0!==t?t:0}get isActive(){return!0}activate(){}deactivate(){}get fontColor(){var e,t,i,o,n;return null!==(n=null!==(i=null===(t=null===(e=this.config)||void 0===e?void 0:e.style)||void 0===t?void 0:t.color)&&void 0!==i?i:null===(o=this.appearance)||void 0===o?void 0:o.fontColor)&&void 0!==n?n:"#FFFFFF"}updated(e){super.updated(e),this.config&&(e.has("config")||e.has("hass")||e.has("appearance"))&&(this.applyWidgetState(),this.applyStyleOverrides())}applyStyleOverrides(){var e,t,i,o,n;const a=null===(e=this.config)||void 0===e?void 0:e.style;this.style.margin=null!==(t=null==a?void 0:a.margin)&&void 0!==t?t:"",this.style.maxWidth=null!==(i=null==a?void 0:a.maxWidth)&&void 0!==i?i:"",this.style.maxHeight=null!==(o=null==a?void 0:a.maxHeight)&&void 0!==o?o:"",this.style.fontSize=null!==(n=null==a?void 0:a.fontSize)&&void 0!==n?n:""}}xa([me({type:Object})],ka.prototype,"hass",void 0),xa([me({type:Object})],ka.prototype,"config",void 0),xa([me({type:Object})],ka.prototype,"appearance",void 0);let Ia=class extends ka{constructor(){super(...arguments),this.clock=document.createElement("ha-clock")}applyWidgetState(){var e,t,i,o,n,a,r;this.clock.showDate=!1,this.clock.timeFormat=function(e,t){const i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:Ca(null==e?void 0:e.hour12,t)};return e&&(Object.assign(i,e,{hour12:i.hour12}),void 0===e.second&&(i.second=void 0)),i}(this.config.timeFormat,this.hass),this.clock.language=Sa(null===(e=this.appearance)||void 0===e?void 0:e.language,this.hass),this.clock.timeZone=null!==(i=null===(t=this.appearance)||void 0===t?void 0:t.timeZone)&&void 0!==i?i:null===(n=null===(o=this.hass)||void 0===o?void 0:o.config)||void 0===n?void 0:n.time_zone,this.clock.fontColor=this.fontColor,this.clock.size=null!==(r=null===(a=this.appearance)||void 0===a?void 0:a.size)&&void 0!==r?r:tt.Medium,this.clock.clockSize=this.config.clockSize}render(){return V`${this.clock}`}};Ia.styles=a`
        :host {
            display: block;
        }
    `,Ia=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("wcc-clock-widget")],Ia);let Aa=class extends ka{constructor(){super(...arguments),this.clock=document.createElement("ha-clock")}applyWidgetState(){var e,t,i,o,n,a,r;this.clock.showClock=!1,this.clock.dateFormat=function(e){const t={weekday:"long",year:"numeric",month:"long",day:"numeric"};return e&&(Object.assign(t,e),void 0===e.year&&(t.year=void 0)),t}(this.config.dateFormat),this.clock.language=Sa(null===(e=this.appearance)||void 0===e?void 0:e.language,this.hass),this.clock.timeZone=null!==(i=null===(t=this.appearance)||void 0===t?void 0:t.timeZone)&&void 0!==i?i:null===(n=null===(o=this.hass)||void 0===o?void 0:o.config)||void 0===n?void 0:n.time_zone,this.clock.fontColor=this.fontColor,this.clock.size=null!==(r=null===(a=this.appearance)||void 0===a?void 0:a.size)&&void 0!==r?r:tt.Medium,this.clock.dateSize=this.config.dateSize}render(){return V`${this.clock}`}};Aa.styles=a`
        :host {
            display: block;
        }
    `,Aa=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("wcc-date-widget")],Aa);class za extends Ze{constructor(e,t={}){super(e,"sensor-controller"),this._sensorValues=[],this.config={},this.config=t}onHostConnected(){}onHostDisconnected(){}updateConfig(e){this.logger.debug("Updating SensorController config:",e),this.config={...this.config,...e},this.hass&&this.updateSensorValues()}updateHass(e){this.hass=e,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=this.config.sensors.map(e=>this.processSensor(e)),this.host.requestUpdate()):this._sensorValues=[]}processSensor(e){var t,i,o;const n=e.entity,a=null===(t=this.hass)||void 0===t?void 0:t.states[n];return n&&a?{entity:n,label:null!==(i=e.label)&&void 0!==i?i:null===(o=a.attributes)||void 0===o?void 0:o.friendly_name,value:this.formatState(e,a)}:{entity:n,label:e.label,value:"unavailable"}}formatState(e,t){var i,o;const n=null===(i=this.hass)||void 0===i?void 0:i.formatEntityState;if(void 0===e.precision&&"function"==typeof n)try{return n.call(this.hass,t)}catch(e){this.logger.warn("formatEntityState failed, using fallback formatting",e)}let a=t.state;const r=this.getDisplayPrecision(e,t);return void 0===r||null===a||""===a||isNaN(Number(a))||(a=this.formatNumericValue(Number(a),r)),(null===(o=t.attributes)||void 0===o?void 0:o.unit_of_measurement)&&(a+=` ${t.attributes.unit_of_measurement}`),a}getDisplayPrecision(e,t){var i,o,n,a,r;if(void 0!==e.precision)return e.precision;const s=null===(n=null===(o=null===(i=this.hass)||void 0===i?void 0:i.entities)||void 0===o?void 0:o[e.entity])||void 0===n?void 0:n.display_precision;return void 0!==s?s:void 0!==(null===(a=null==t?void 0:t.attributes)||void 0===a?void 0:a.display_precision)?t.attributes.display_precision:void 0!==(null===(r=null==t?void 0:t.attributes)||void 0===r?void 0:r.suggested_display_precision)?t.attributes.suggested_display_precision:void 0}formatNumericValue(e,t){try{let i=function(e,t,i){var o=t?function(e){switch(e.number_format){case st.comma_decimal:return["en-US","en"];case st.decimal_comma:return["de","es","it"];case st.space_comma:return["fr","sv","cs"];case st.system:return;default:return e.language}}(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==st.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(o,ht(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,ht(e,i)).format(Number(e))}return"string"==typeof e?e:function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)}(e,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")}(e,this.hass.locale,{minimumFractionDigits:t,maximumFractionDigits:t});return t>0&&!i.includes(".")&&!i.includes(",")?e.toFixed(t):i}catch(i){return e.toFixed(t)}}get sensorValues(){return this._sensorValues}}var Ea=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Da=class extends he{constructor(){super(),this.logger=Se("sensor-component"),this.sensorController=new za(this,{sensors:this.sensors})}get controller(){return this.sensorController}getLabelSize(){return ot(this.size,this.labelSize,"labelSize")}getValueSize(){return ot(this.size,this.valueSize,"valueSize")}updated(e){if(super.updated(e),e.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),e.has("hass")&&this.hass&&this.sensorController.updateHass(this.hass),e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}_openMoreInfo(e){e&&gt(this,"hass-more-info",{entityId:e})}render(){const e=this.sensorController.sensorValues;if(0===e.length)return V``;const t=this.getLabelSize(),i=this.getValueSize();return this.logger.debug(`Rendering sensors - LabelSize: ${t}, ValueSize: ${i}`),V`
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
        `}};Da.styles=a`
        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own items. */
        .sensor-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            max-height: 100%;
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
    `,Ea([me({type:Array})],Da.prototype,"sensors",void 0),Ea([me({type:String})],Da.prototype,"fontColor",void 0),Ea([me({type:Object})],Da.prototype,"hass",void 0),Ea([me({type:String})],Da.prototype,"size",void 0),Ea([me({type:String})],Da.prototype,"labelSize",void 0),Ea([me({type:String})],Da.prototype,"valueSize",void 0),Da=Ea([ge("ha-sensors")],Da);let Oa=class extends ka{constructor(){super(...arguments),this.sensors=document.createElement("ha-sensors")}applyWidgetState(){var e,t,i;this.sensors.sensors=null!==(e=this.config.sensors)&&void 0!==e?e:[],this.sensors.fontColor=this.fontColor,this.sensors.size=null!==(i=null===(t=this.appearance)||void 0===t?void 0:t.size)&&void 0!==i?i:tt.Medium,this.sensors.labelSize=this.config.labelSize,this.sensors.valueSize=this.config.valueSize,this.hass&&(this.sensors.hass=this.hass)}render(){return V`${this.sensors}`}};Oa.styles=a`
        :host {
            display: block;
            max-height: 100%;
        }
    `,Oa=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("wcc-sensors-widget")],Oa);class Pa{static getInstance(){return Pa.instance||(Pa.instance=new Pa),Pa.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&xe.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const Ta=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,i=e.longitude||14.4378,o=e.units||"metric",n=e.language||"en";try{const a=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${i}&units=${o}&lang=${n}&appid=${e.apiKey}`;xe.debug("[OpenWeatherMap] "+a);const r=await fetch(a);if(!r.ok)throw new Error(`OpenWeatherMap API error: ${r.statusText}`);const s=await r.json();if(!s.list||!s.list.length)throw new Error("No forecast data available");const l=s.list[0],c=l.weather[0].description,d={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon,e.iconSet),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},h=new Map;return s.list.forEach(e=>{var t;const i=new Date(1e3*e.dt).toISOString().split("T")[0];h.has(i)||h.set(i,[]),null===(t=h.get(i))||void 0===t||t.push(e)}),{current:d,daily:Array.from(h.entries()).map(([t,i])=>{const o=i.map(e=>e.main.temp),n=Math.min(...o),a=Math.max(...o),r=i[Math.floor(i.length/2)]||i[0],s=i.filter(e=>void 0!==e.pop).map(e=>e.pop),l=s.length>0?s.reduce((e,t)=>e+t,0)/s.length*100:0;return{date:new Date(t),temperatureMin:n,temperatureMax:a,condition:r.weather[0].description,icon:this.getIconUrl(r.weather[0].icon,e.iconSet),precipitation:l,humidity:r.main.humidity,windSpeed:r.wind.speed}}),temperatureUnit:"imperial"===e.units?"°F":"°C"}}catch(e){throw xe.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"en"}}getIconUrl(e,t){return"basmilius"===t?this.getAnimatedIconUrl(e):"metno"===t?this.getMetNoIconUrl(e):`https://openweathermap.org/img/wn/${e}@2x.png`}getAnimatedIconUrl(e){let t="clear-day";switch(e){case"01d":t="clear-day";break;case"01n":t="clear-night";break;case"02d":t="partly-cloudy-day";break;case"02n":t="partly-cloudy-night";break;case"03d":case"03n":case"04d":case"04n":t="cloudy";break;case"09d":case"09n":t="rain";break;case"10d":t="partly-cloudy-day-rain";break;case"10n":t="partly-cloudy-night-rain";break;case"11d":case"11n":t="thunderstorms";break;case"13d":case"13n":t="snow";break;case"50d":case"50n":t="fog"}return`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${t}.svg`}getMetNoIconUrl(e){let t="clearsky_day";switch(e){case"01d":t="clearsky_day";break;case"01n":t="clearsky_night";break;case"02d":t="fair_day";break;case"02n":t="fair_night";break;case"03d":case"03n":case"04d":case"04n":t="cloudy";break;case"09d":case"09n":t="heavyrain";break;case"10d":case"10n":t="rain";break;case"11d":case"11n":t="rainshowersandthunder_day";break;case"13d":case"13n":t="snow";break;case"50d":case"50n":t="fog"}return`https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${t}.svg`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){let t;switch(xe.debug(`[OpenWeatherMap] Mapping weather condition: ${e}`),e.toLowerCase()){case"clear":case"clear sky":t=Ae.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":t=Ae.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":t=Ae.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":t=Ae.Rain;break;case"tornado":case"windy":case"all":default:t=Ae.All;break;case"snow":case"light snow":t=Ae.Snow}return xe.debug(`[OpenWeatherMap] Mapped to Weather enum: ${t}`),t}},Na=new class{constructor(){this.id="homeassistant",this.name="Home Assistant",this.description="Weather data from a Home Assistant entity"}setHass(e){this.hass=e}async fetchWeatherAsync(e){var t,i,o;if(!this.hass)throw new Error("Home Assistant instance not set");const n=e.entityId;if(!n)throw new Error("Home Assistant weather entity ID is required");const a=this.hass.states[n];if(!a)throw new Error(`Entity ${n} not found`);const r=a.attributes,s=this.buildCurrent(a,e);let l=[];try{const i=null===(t=(await this.hass.callWS({type:"call_service",domain:"weather",service:"get_forecasts",service_data:{type:"daily"},target:{entity_id:n},return_response:!0})).response[n])||void 0===t?void 0:t.forecast;i&&Array.isArray(i)&&(l=this.mapForecastItems(i,e,a))}catch(e){xe.error(`[HA Weather] Error fetching forecast for ${n}:`,e)}return{current:s,daily:l,entityId:n,temperatureUnit:r.temperature_unit||(null===(o=null===(i=this.hass.config)||void 0===i?void 0:i.unit_system)||void 0===o?void 0:o.temperature)}}getCurrentWeather(e){var t;const i=e.entityId?null===(t=this.hass)||void 0===t?void 0:t.states[e.entityId]:void 0;if(i)return this.buildCurrent(i,e)}async subscribeForecastAsync(e,t){var i;const o=e.entityId,n=null===(i=this.hass)||void 0===i?void 0:i.connection;if(!o||!(null==n?void 0:n.subscribeMessage))return null;try{const i=await n.subscribeMessage(i=>{var n;if((null==i?void 0:i.forecast)&&Array.isArray(i.forecast)){const a=null===(n=this.hass)||void 0===n?void 0:n.states[o];t(this.mapForecastItems(i.forecast,e,a))}},{type:"weather/subscribe_forecast",entity_id:o,forecast_type:"daily"});return xe.debug(`[HA Weather] Subscribed to forecast updates for ${o}`),i}catch(e){return xe.warn(`[HA Weather] weather/subscribe_forecast unavailable for ${o}:`,e),null}}buildCurrent(e,t){const i=e.attributes,o=e.state;return{temperature:i.temperature,condition:this.mapConditionToKey(o),conditionText:this.localizeCondition(e),conditionUnified:this.mapWeatherCondition(o),icon:this.getIconUrl(o,t.iconSet),humidity:i.humidity,windSpeed:i.wind_speed,pressure:i.pressure,feelsLike:i.apparent_temperature}}mapForecastItems(e,t,i){return e.map(e=>({date:new Date(e.datetime),temperatureMin:void 0!==e.templow?e.templow:e.temperature,temperatureMax:e.temperature,condition:this.mapConditionToKey(e.condition),conditionText:i?this.localizeCondition(i,e.condition):void 0,icon:this.getIconUrl(e.condition,t.iconSet),precipitation:e.precipitation,humidity:e.humidity,windSpeed:e.wind_speed}))}localizeCondition(e,t){var i;const o=null===(i=this.hass)||void 0===i?void 0:i.formatEntityState;if("function"==typeof o)try{return void 0!==t?o.call(this.hass,e,t):o.call(this.hass,e)}catch(e){return void xe.warn("[HA Weather] formatEntityState failed:",e)}}getDefaultConfig(){return{entityId:""}}mapConditionToKey(e){const t=null==e?void 0:e.toLowerCase();switch(t){case"sunny":case"clear-night":return"clear_sky";case"cloudy":return"overcast_clouds";case"partlycloudy":return"scattered_clouds";case"rainy":return"rain";case"pouring":return"heavy_intensity_rain";case"lightning":case"lightning-rainy":return"thunderstorm";case"snowy":case"snowy-rainy":return"snow";case"fog":return"mist";default:return t}}mapWeatherCondition(e){switch(null==e?void 0:e.toLowerCase()){case"clear-night":case"sunny":return Ae.ClearSky;case"cloudy":case"partlycloudy":return Ae.Clouds;case"rainy":case"pouring":case"lightning":case"lightning-rainy":return Ae.Rain;case"snowy":case"snowy-rainy":return Ae.Snow;case"fog":case"hail":return Ae.Mist;default:return Ae.All}}getIconUrl(e,t){const i=null==e?void 0:e.toLowerCase();if("basmilius"===t)return this.getAnimatedIconUrl(i);if("openweathermap"===t)return this.getOpenWeatherMapIconUrl(i);let o="clearsky_day";switch(i){case"sunny":o="clearsky_day";break;case"clear-night":o="clearsky_night";break;case"cloudy":o="cloudy";break;case"partlycloudy":o="fair_day";break;case"rainy":o="rain";break;case"pouring":o="heavyrain";break;case"lightning":case"lightning-rainy":o="rainshowersandthunder_day";break;case"snowy":o="snow";break;case"snowy-rainy":o="sleet";break;case"fog":o="fog"}return`https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${o}.svg`}getOpenWeatherMapIconUrl(e){let t="01d";switch(e){case"sunny":t="01d";break;case"clear-night":t="01n";break;case"cloudy":t="03d";break;case"partlycloudy":t="02d";break;case"rainy":t="10d";break;case"pouring":t="09d";break;case"lightning":case"lightning-rainy":t="11d";break;case"snowy":case"snowy-rainy":t="13d";break;case"fog":t="50d"}return`https://openweathermap.org/img/wn/${t}@2x.png`}getAnimatedIconUrl(e){let t="clear-day";switch(e){case"sunny":t="clear-day";break;case"clear-night":t="clear-night";break;case"cloudy":t="cloudy";break;case"partlycloudy":t="partly-cloudy-day";break;case"rainy":t="rain";break;case"pouring":t="extreme-rain";break;case"lightning":case"lightning-rainy":t="thunderstorms-rain";break;case"snowy":t="snow";break;case"snowy-rainy":t="sleet";break;case"fog":t="fog";break;case"hail":t="hail";break;case"windy":t="wind"}return`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${t}.svg`}},Fa=Pa.getInstance();function Ma(e){return Fa.getProvider(e)}Fa.register(Ta),Fa.register(Na);class Ra extends Ze{constructor(e,t={}){super(e,"weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this._messenger=Je.getInstance(),this._forceUpdateWeatherHandler=e=>this.fetchWeatherDataAsync(),this.config={},this.config=t}onHostConnected(){this._messenger.subscribe(Ke,this._forceUpdateWeatherHandler),this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this._messenger.unsubscribe(Ke,this._forceUpdateWeatherHandler),this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),this.teardownForecastSubscription()}teardownForecastSubscription(){if(this._forecastUnsubscribe){try{this._forecastUnsubscribe()}catch(e){this.logger.debug("Error unsubscribing from forecast updates:",e)}this._forecastUnsubscribe=void 0,this._subscribedEntityId=void 0}}async updateConfigAsync(e,t){this.logger.debug("Updating WeatherController config:",e);const i=this._hass;this._hass=t;const o=this.config.showWeather,n=this.config.weatherProvider,a=this.config.weatherUpdateInterval;this.config={...this.config,...e},a!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),this.config.showWeather&&(!o&&this.config.showWeather||!i&&this._hass&&!this._weatherData||n!==this.config.weatherProvider)?await this.fetchWeatherDataAsync():this.config.showWeather?this.refreshCurrentFromEntity():Je.getInstance().publish(new qe(Ae.All)),this.host.requestUpdate()}refreshCurrentFromEntity(){var e,t;if(!this._hass||!this._weatherData)return;const i=Ma(this.config.weatherProvider||"openweathermap");if(!(null==i?void 0:i.getCurrentWeather))return;const o=this.buildProviderConfig(i),n=o.entityId;if(!n)return;const a=this._hass.states[n];if(!a||a===this._lastEntityState)return;this._lastEntityState=a,null===(e=i.setHass)||void 0===e||e.call(i,this._hass);const r=i.getCurrentWeather(o);r&&(this.logger.debug(`Weather entity ${n} changed, refreshing current conditions`),this._weatherData={...this._weatherData,current:r},this._messenger.publish(new qe(null!==(t=r.conditionUnified)&&void 0!==t?t:Ae.All)))}async setupForecastSubscriptionAsync(e,t){if(!e.subscribeForecastAsync)return void this.teardownForecastSubscription();const i=t.entityId;if(!i||i===this._subscribedEntityId)return;this.teardownForecastSubscription();const o=await e.subscribeForecastAsync(t,e=>{this._weatherData&&(this.logger.debug(`Received pushed forecast update (${e.length} days)`),this._weatherData={...this._weatherData,daily:e},this.host.requestUpdate())});o&&(this._forecastUnsubscribe=o,this._subscribedEntityId=i)}buildProviderConfig(e){var t;let i=e.getDefaultConfig();return this.config.weatherConfig&&(i={...i,...this.config.weatherConfig},this.config.weatherConfig.units&&(i.units=this.config.weatherConfig.units)),this.config.weatherIconSet?i.iconSet=this.config.weatherIconSet:(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.iconSet)&&(i.iconSet=this.config.weatherConfig.iconSet),i}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting weather update interval to ${e} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(e){this.logger.error("Error in weather update interval:",e)}})()},t)}async fetchWeatherDataAsync(){var e,t;if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const i=this.config.weatherProvider||"openweathermap",o=Ma(i);if(!o)throw new Error(`Weather provider '${i}' not found`);if(o.setHass)if(this._hass)o.setHass(this._hass);else if("homeassistant"===o.id)return void this.logger.debug("Home Assistant instance not available yet for HA weather provider, skipping fetch");const n=this.buildProviderConfig(o);this._weatherData=await o.fetchWeatherAsync(n),this._weatherData&&Je.getInstance().publish(new qe(null!==(t=null===(e=this._weatherData.current)||void 0===e?void 0:e.conditionUnified)&&void 0!==t?t:Ae.All));const a=n.entityId;a&&this._hass&&(this._lastEntityState=this._hass.states[a]),await this.setupForecastSubscriptionAsync(o,n),this.logger.info(`Fetched weather data from ${o.name}:`,this._weatherData)}catch(e){this._weatherError=!0,this._weatherErrorMessage=e instanceof Error?e.message:String(e),this.logger.error("Error fetching weather data:",e)}finally{this._weatherLoading=!1,this.host.requestUpdate()}}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}}var ja=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let La=class extends he{constructor(){super(),this.logger=Se("weather-component"),this.weatherController=new Ra(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval,weatherIconSet:this.weatherIconSet})}get controller(){return this.weatherController}updated(e){if(super.updated(e),e.has("hass")||e.has("showWeather")||e.has("weatherProvider")||e.has("weatherConfig")||e.has("weatherDisplayMode")||e.has("weatherForecastDays")||e.has("weatherTitle")||e.has("weatherUpdateInterval")||e.has("weatherIconSet")){this.logger.debug("Weather properties or hass changed, updating WeatherController");const e={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval,weatherIconSet:this.weatherIconSet};this.weatherController.updateConfigAsync(e,this.hass)}if(e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}conditionDisplayText(e,t){return t||this.translateWeatherCondition(e)}translateWeatherCondition(e){const t=this.language||"en",i=function(e,t,i=e){if(!Be().includes(t))return null!==i?i:e;let o=We[t];if(!o){if(!Ue[t])return xe.warn(`No embedded translations found for ${t}`),null!==i?i:e;We[t]=Ue[t],o=We[t],xe.debug(`Loaded translations for ${t} on-demand`)}const n=function(e,t){if(void 0!==e[t])return e[t];const i=t.split(".");let o=e;for(const e of i){if(null==o||"object"!=typeof o)return;o=o[e]}return o}(o,e);return"string"==typeof n?xe.debug(`Translation found for key "${e}" in language "${t}": "${n}"`):xe.debug(`No translation found for key "${e}" in language "${t}", using default: "${null!==i?i:e}"`),"string"==typeof n?n:null!==i?i:e}(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,"");return i&&""!==i?i:e}formatForecastDate(e){return Ve(e,this.language||"en",{weekday:"short"})}get weatherData(){const e=this.weatherController.weatherData;return e&&e.current&&e.current.conditionUnified&&Je.getInstance().publish(new qe(e.current.conditionUnified)),e}getLabelSize(){return ot(this.size,this.labelSize,"labelSize")}getValueSize(){return ot(this.size,this.valueSize,"valueSize")}getForecastTempWidth(){return ot(this.size,void 0,"forecastTempWidth")}_handleWeatherClick(e){e&&this.hass&&gt(this,"hass-more-info",{entityId:e})}render(){const e=this.weatherController.weatherData;if(this.weatherController.hasError)return V`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!e)return V`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;const t=this.weatherDisplayMode||"both",i=this.weatherForecastDays||3,o=this.weatherTitle||"Weather",n=Math.min(i,e.daily.length),a=this.getLabelSize(),r=this.getValueSize(),s=this.getForecastTempWidth();return V`
            <div class="weather-container ${e.entityId?"clickable":""}" 
                 style="color: ${this.fontColor};"
                 @click="${()=>this._handleWeatherClick(e.entityId)}">
                <div class="weather-title" style="color: ${this.fontColor}; font-size: ${a};">${o}</div>

                ${"current"===t||"both"===t?V`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${e.current.icon}"
                                     alt="${this.conditionDisplayText(e.current.condition,e.current.conditionText)}">
                                <div class="weather-temp" style="font-size: ${r};">${Math.round(e.current.temperature)}${e.temperatureUnit||"°"}</div>
                            </div>
                            <div class="weather-condition" style="font-size: ${a};">
                                ${this.conditionDisplayText(e.current.condition,e.current.conditionText)}
                            </div>
                        </div>
                    `:""}

                ${"forecast"===t||"both"===t?V`
                        <div class="weather-forecast">
                            ${e.daily.slice(0,n).map(e=>V`
                                <div class="forecast-day">
                                    <div class="forecast-date" style="font-size: ${a};">${this.formatForecastDate(e.date)}</div>
                                    <img class="forecast-icon" src="${e.icon}" alt="${this.conditionDisplayText(e.condition,e.conditionText)}">
                                    <div class="forecast-temp" style="font-size: ${a}; width: ${s};">
                                        ${Math.round(e.temperatureMin)}°<span class="forecast-separator"> - </span>${Math.round(e.temperatureMax)}°
                                    </div>
                                </div>
                            `)}
                        </div>
                    `:""}
            </div>
        `}};La.styles=a`
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
    `,ja([me({type:Object})],La.prototype,"hass",void 0),ja([me({type:Boolean})],La.prototype,"showWeather",void 0),ja([me({type:String})],La.prototype,"weatherProvider",void 0),ja([me({type:Object})],La.prototype,"weatherConfig",void 0),ja([me({type:String})],La.prototype,"weatherDisplayMode",void 0),ja([me({type:Number})],La.prototype,"weatherForecastDays",void 0),ja([me({type:String})],La.prototype,"weatherTitle",void 0),ja([me({type:Number})],La.prototype,"weatherUpdateInterval",void 0),ja([me({type:String})],La.prototype,"weatherIconSet",void 0),ja([me({type:String})],La.prototype,"fontColor",void 0),ja([me({type:String})],La.prototype,"language",void 0),ja([me({type:String})],La.prototype,"size",void 0),ja([me({type:String})],La.prototype,"labelSize",void 0),ja([me({type:String})],La.prototype,"valueSize",void 0),La=ja([ge("ha-weather")],La);let Ua=class extends ka{constructor(){super(...arguments),this.weather=document.createElement("ha-weather")}applyWidgetState(){var e,t,i,o,n;this.weather.showWeather=!0,this.weather.weatherProvider=this.config.provider,this.weather.weatherConfig=this.config.providerConfig,this.weather.weatherDisplayMode=this.config.displayMode,this.weather.weatherForecastDays=this.config.forecastDays,this.weather.weatherTitle=this.config.title,this.weather.weatherUpdateInterval=this.config.updateInterval,this.weather.weatherIconSet=null!==(e=this.config.iconSet)&&void 0!==e?e:null===(t=this.config.providerConfig)||void 0===t?void 0:t.iconSet,this.weather.fontColor=this.fontColor,this.weather.language=Sa(null===(i=this.appearance)||void 0===i?void 0:i.language,this.hass),this.weather.size=null!==(n=null===(o=this.appearance)||void 0===o?void 0:o.size)&&void 0!==n?n:tt.Medium,this.weather.labelSize=this.config.labelSize,this.weather.valueSize=this.config.valueSize,this.hass&&(this.weather.hass=this.hass)}render(){return V`${this.weather}`}};Ua.styles=a`
        :host {
            display: block;
            max-height: 100%;
        }
    `,Ua=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("wcc-weather-widget")],Ua);class Wa extends Ze{constructor(e,t={}){super(e,"transportation-controller"),this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this._isActive=!1,this.config={},this.config=t}onHostConnected(){Je.getInstance().subscribe(Ye,()=>this.handleTransportationClick())}onHostDisconnected(){this.clearTimers(),this._transportationDataLoaded=!1,Je.getInstance().unsubscribe(Ye,()=>this.handleTransportationClick())}updateConfig(e){this.logger.debug("Updating TransportationController config:",e),this.config={...this.config,...e},this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.transportation.enabled)return;let e=this.config.transportation.updateInterval||60;e=Math.max(e,60);const t=1100*e;this.logger.debug(`Setting transportation update interval to ${e} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){this.logger.error("Error in transportation update interval:",e)}})()},t)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0),this.setInactive()}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.transportation.enabled){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const i=(e=t.provider,xi.getProvider(e));if(!i)throw new Error(`Transportation provider '${t.provider}' not found`);const o=t.stops.map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),n=t.providerConfig||{};void 0!==t.maxDepartures&&(n.maxDepartures=t.maxDepartures),this._transportationData=await i.fetchTransportationAsync(n,o),this._lastTransportationUpdate=new Date,this.logger.info(`Fetched transportation data from ${i.name}:`,this._transportationData)}catch(e){this.logger.warn("Error fetching transportation data:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}var e;this.host.requestUpdate()}}async handleTransportationClick(){var e;if(this.logger.debug("Transportation button clicked, loading data on demand"),this.setActive(),await this.fetchTransportationDataAsync(),this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(e=this.config.transportation)||void 0===e?void 0:e.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));let t=60*e*1e3;this._transportationData.error&&(t=1e4),this.logger.info(`Setting transportation auto-hide timeout to ${e} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.info(`Auto-hiding transportation departures after ${e} minutes`),this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()},t)}this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get isActive(){return this._isActive}get lastTransportationUpdate(){return this._lastTransportationUpdate}get isTransportationEnabled(){return void 0!==this.config.transportation&&!1!==this.config.transportation.enabled}setInactive(){this.logger.info("Transportation set to inactive, clearing timers and sending message to bottom bar to hide departures"),this._isActive=!1,Je.getInstance().publish(new Ge)}setActive(){this.logger.info("Transportation set to active, sending message to bottom bar to show departures"),this._isActive=!0,Je.getInstance().publish(new Ge)}}var Ba=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Ha=class extends At{get priority(){return 10}get isActive(){return this.controller.isActive}constructor(){super(),this.logger=Se("transportation-component"),this.transportationController=new Wa(this,{transportation:this.transportation})}get controller(){return this.transportationController}updated(e){super.updated(e),e.has("transportation")&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation}))}render(){if(!this.transportation||!0!==this.transportation.enabled)return V``;const e=this.transportationController.transportationData,t=this.transportationController.transportationDataLoaded;return V`
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
        `}};Ha.styles=a`
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
    `,Ba([me({type:Object})],Ha.prototype,"transportation",void 0),Ba([me({type:String})],Ha.prototype,"fontColor",void 0),Ba([me({type:Object})],Ha.prototype,"hass",void 0),Ha=Ba([ge("ha-transportation")],Ha);let Va=class extends ka{constructor(){super(...arguments),this.transportation=document.createElement("ha-transportation")}get isActive(){return this.transportation.isActive}activate(){this.transportation.activate()}deactivate(){this.transportation.deactivate()}applyWidgetState(){this.transportation.transportation=function(e){const{type:t,id:i,priority:o,style:n,visibility:a,...r}=e;return r}(this.config),this.transportation.fontColor=this.fontColor,this.hass&&(this.transportation.hass=this.hass)}render(){return V`${this.transportation}`}};Va.styles=a`
        :host {
            display: block;
            width: 100%;
        }
    `,Va=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("wcc-transportation-widget")],Va);let Za=class extends ka{constructor(){super(...arguments),this.actionBar=document.createElement("ha-action-bar")}get isActive(){return this.actionBar.isActive}activate(){this.actionBar.activate()}deactivate(){this.actionBar.deactivate()}applyWidgetState(){var e,t,i,o;this.actionBar.config={enabled:null===(e=this.config.enabled)||void 0===e||e,actions:null!==(t=this.config.actions)&&void 0!==t?t:[],alignment:this.config.alignment,backgroundOpacity:this.config.backgroundOpacity},this.actionBar.fontColor=this.fontColor,this.actionBar.size=null!==(o=null===(i=this.appearance)||void 0===i?void 0:i.size)&&void 0!==o?o:tt.Medium,this.actionBar.iconSize=this.config.iconSize,this.hass&&(this.actionBar.hass=this.hass)}render(){return V`${this.actionBar}`}};Za.styles=a`
        :host {
            display: block;
            width: 100%;
        }
    `,Za=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([ge("wcc-action-bar-widget")],Za),ji.getInstance().registerAll([{widgetId:"clock",name:"Clock",description:"The current time",icon:"mdi:clock-outline",elementTag:"wcc-clock-widget",editorTag:"time-format-editor",defaultConfig:()=>({type:"clock"})},{widgetId:"date",name:"Date",description:"The current date",icon:"mdi:calendar-outline",elementTag:"wcc-date-widget",editorTag:"date-format-editor",defaultConfig:()=>({type:"date"})},{widgetId:"sensors",name:"Sensors",description:"Values of Home Assistant sensors",icon:"mdi:thermometer",elementTag:"wcc-sensors-widget",editorTag:"sensors-editor",defaultConfig:()=>({type:"sensors",sensors:[]})},{widgetId:"weather",name:"Weather",description:"Current weather and forecast",icon:"mdi:weather-partly-cloudy",elementTag:"wcc-weather-widget",editorTag:"weather-editor",defaultConfig:()=>({type:"weather",provider:"homeassistant",displayMode:"current"})},{widgetId:"transportation",name:"Transportation",description:"Public transport departures",icon:"mdi:bus",elementTag:"wcc-transportation-widget",editorTag:"transportation-editor",defaultConfig:()=>({type:"transportation",provider:"",stops:[]})},{widgetId:"action-bar",name:"Action bar",description:"Buttons triggering actions",icon:"mdi:gesture-tap-button",elementTag:"wcc-action-bar-widget",editorTag:"action-bar-editor",defaultConfig:()=>({type:"action-bar",enabled:!0,actions:[]})}]);var Ja=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let qa=class extends he{constructor(){super(),this.config={},this.preview=!1,this.layoutEditing=!1,this.configV3={layout:{zones:{}}},this.backgroundImageComponent=document.createElement("ha-background-image"),this.layoutElement=document.createElement("wcc-layout"),xe.info("%c WALL-CLOCK-CARD %c 3.0.0-beta1 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;")}connectedCallback(){super.connectedCallback(),this.isInEditPreview()&&(this.setAttribute("dialog-preview",""),this.setupPreviewScaling()),this.initBackgroundImageComponent(),this.syncLayoutElement(),this.initConnectCallbackAsync()}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this.previewObserver)||void 0===e||e.disconnect(),this.previewObserver=void 0}setupPreviewScaling(){this.previewObserver||(this.previewObserver=new ResizeObserver(()=>this.updatePreviewScale()),this.previewObserver.observe(this),this.updatePreviewScale())}updatePreviewScale(){const e=window.innerWidth,t=window.innerHeight,i=this.clientWidth/e;i<=0||!e||!t||(this.style.setProperty("--wcc-preview-width",`${e}px`),this.style.setProperty("--wcc-preview-height",`${t}px`),this.style.setProperty("--wcc-preview-scale",String(i)),this.style.aspectRatio=`${e} / ${t}`)}isInEditPreview(){let e=this;for(;e;){const t=e.getRootNode();if(!(t instanceof ShadowRoot))return!1;const i=t.host.localName;if("hui-dialog-edit-card"===i||"hui-card-preview"===i||"hui-dialog-pick-card"===i)return!0;e=t.host}return!1}async initConnectCallbackAsync(){await this.backgroundImageComponent.controller.ready,this.configureCardLogger();try{await async function(){xe.debug("Loading all translations");const e=Be().map(e=>async function(e){try{Ue[e]?(We[e]=Ue[e],xe.debug(`Loaded translations for ${e}`)):xe.warn(`No embedded translations found for ${e}`)}catch(t){xe.error(`Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),xe.debug("Loaded translations for all languages")}catch(e){xe.error("Error loading translations:",e)}this.publishWeatherFallbackIfNeeded()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}getGridOptions(){return{columns:"full",rows:6,min_rows:4}}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e||"object"!=typeof e)throw new Error("Invalid configuration");this.applyConfig(e)}applyConfig(e){this.config=e,this.configV3=Ti(e),this.initBackgroundImageComponent(),this.syncLayoutElement(),this.backgroundImageComponent.controller.ready.then(()=>{this.publishWeatherFallbackIfNeeded()})}computeAppearance(){var e,t,i,o,n,a;const r=null!==(e=this.configV3.appearance)&&void 0!==e?e:{};return{fontColor:null!==(t=r.fontColor)&&void 0!==t?t:"#FFFFFF",language:r.language,timeZone:null!==(i=r.timeZone)&&void 0!==i?i:null===(n=null===(o=this.hass)||void 0===o?void 0:o.config)||void 0===n?void 0:n.time_zone,size:null!==(a=r.size)&&void 0!==a?a:tt.Medium}}syncLayoutElement(){this.layoutElement.layout=this.configV3.layout,this.layoutElement.appearance=this.computeAppearance(),this.hass&&(this.layoutElement.hass=this.hass)}publishWeatherFallbackIfNeeded(){const e=this.configV3.layout.zones;Object.values(e).some(e=>{var t;return null===(t=null==e?void 0:e.widgets)||void 0===t?void 0:t.some(e=>"weather"===e.type)})||Je.getInstance().publish(new qe(Ae.All))}configureCardLogger(){!function(e){const t=be.level;be={...we,...e},t!==be.level&&console.log(`[LOGGER] Log level changed from ${ye[t]} to ${ye[be.level]}`)}({level:Ce(this.configV3.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}initBackgroundImageComponent(){var e,t,i,o,n,a,r,s;const l=null!==(e=this.configV3.background)&&void 0!==e?e:{},c={imageSourceId:l.source||"none",backgroundImages:l.images,entity:null===(t=l.config)||void 0===t?void 0:t.entity,apiKey:null===(i=l.config)||void 0===i?void 0:i.apiKey,contentFilter:null===(o=l.config)||void 0===o?void 0:o.contentFilter,category:null===(n=l.config)||void 0===n?void 0:n.category,count:null===(a=l.config)||void 0===a?void 0:a.count};this.backgroundImageComponent.backgroundOpacity=null!==(r=l.opacity)&&void 0!==r?r:.3,this.backgroundImageComponent.objectFit=l.objectFit||"cover",this.backgroundImageComponent.config={imageSourceConfig:c,backgroundRotationInterval:null!==(s=l.rotationInterval)&&void 0!==s?s:90,objectFit:l.objectFit||"cover"},this.backgroundImageComponent.hass=this.hass,xe.debug("Background image component initialized")}startLayoutEditing(){this.editBackup=this.config,this.layoutEditing=!0}onInplaceLayoutChanged(e){e.stopPropagation();const t={...this.configV3,layout:e.detail.layout};this.applyConfig(t)}cancelLayoutEditing(){this.layoutEditing=!1,this.editBackup&&this.applyConfig(this.editBackup),this.editBackup=void 0}async saveLayoutEditing(){this.layoutEditing=!1;const e=this.editBackup;this.editBackup=void 0,e&&(await this.saveConfigToLovelace(e,this.configV3)||xe.warn("Could not persist the layout (dashboard save API not found) — the change is only visible until reload"))}async saveConfigToLovelace(e,t){try{const i=this.findHuiRoot(),o=null==i?void 0:i.lovelace;if(!(null==o?void 0:o.saveConfig)||!o.config)return!1;const n=JSON.stringify(e),a=JSON.parse(JSON.stringify(o.config));let r=!1;const s=e=>{if(r||!e||"object"!=typeof e)return;if(Array.isArray(e))return void e.forEach(s);const i=e;if(Array.isArray(i.cards)){const e=i.cards;for(let i=0;i<e.length;i++)if(JSON.stringify(e[i])===n)return e[i]=t,void(r=!0)}Object.values(i).forEach(s)};return s(a.views),!!r&&(await o.saveConfig(a),!0)}catch(e){return xe.warn("Saving layout to Lovelace failed:",e),!1}}findHuiRoot(){var e,t,i,o,n,a;const r=null===(a=null===(n=null===(o=null===(i=null===(t=null===(e=document.querySelector("home-assistant"))||void 0===e?void 0:e.shadowRoot)||void 0===t?void 0:t.querySelector("home-assistant-main"))||void 0===i?void 0:i.shadowRoot)||void 0===o?void 0:o.querySelector("ha-panel-lovelace"))||void 0===n?void 0:n.shadowRoot)||void 0===a?void 0:a.querySelector("hui-root");if(r)return r;const s=[document];let l=0;for(;s.length&&l<5e3;){const e=s.shift(),t=e.querySelector("hui-root");if(t)return t;for(const t of e.querySelectorAll("*"))l++,t.shadowRoot&&s.push(t.shadowRoot)}}updated(e){e.has("preview")&&!this.preview&&this.layoutEditing&&this.cancelLayoutEditing(),e.has("hass")&&this.hass&&(this.backgroundImageComponent.hass=this.hass,this.syncLayoutElement()),e.has("config")&&this.config&&this.configureCardLogger()}static get styles(){return a`
            :host {
                display: block;
                height: 100%;
                width: 100%;
                color: var(--primary-text-color, #fff);
                font-family: var(--paper-font-common-base_-_font-family, "Roboto", sans-serif);
                position: relative;
                overflow: hidden;
                border-radius: var(--ha-card-border-radius, 4px);
                box-sizing: border-box;
            }

            ha-card {
                width: 100%;
                height: 100%;
                overflow: hidden;
                position: relative;
            }

            /* Edit-dialog preview only (never dashboard edit mode): render the
               card at the viewport resolution and scale it down to the pane
               width — a faithful miniature with real dashboard proportions.
               Values come from updatePreviewScale(). */
            :host([dialog-preview]) {
                height: auto;
            }

            :host([dialog-preview]) ha-card {
                width: var(--wcc-preview-width, 1280px);
                height: var(--wcc-preview-height, 720px);
                transform: scale(var(--wcc-preview-scale, 0.3));
                transform-origin: top left;
            }

            /* In-place layout editing (dashboard edit mode) */
            .layout-edit-toggle {
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 6;
                display: flex;
                align-items: center;
                gap: 6px;
                background-color: rgba(0, 0, 0, 0.6);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 16px;
                padding: 4px 14px;
                font: inherit;
                font-size: 0.85rem;
                cursor: pointer;
            }

            .layout-edit-toggle:hover {
                background-color: rgba(0, 0, 0, 0.8);
            }

            .layout-edit-toggle ha-icon {
                --mdc-icon-size: 16px;
            }

            wcc-zone-overlay.inplace {
                position: absolute;
                inset: 0;
                z-index: 6;
            }

            .layout-edit-actions {
                position: absolute;
                top: 8px;
                right: 8px;
                z-index: 7;
                display: flex;
                gap: 8px;
            }

            .layout-edit-actions button {
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 16px;
                padding: 4px 14px;
                font: inherit;
                font-size: 0.85rem;
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.6);
                color: #fff;
            }

            .layout-edit-actions button.primary {
                background-color: var(--primary-color, #03a9f4);
                border-color: var(--primary-color, #03a9f4);
                color: #fff;
            }
        `}render(){const e=this.preview&&!this.hasAttribute("dialog-preview")&&!!this.hass;return V`
            <ha-card style="color: ${this.computeAppearance().fontColor};">
                ${this.backgroundImageComponent}
                ${this.layoutElement}
                ${e&&!this.layoutEditing?V`
                    <button class="layout-edit-toggle" @click=${this.startLayoutEditing}>
                        <ha-icon icon="mdi:view-grid-plus-outline"></ha-icon>
                        Edit layout
                    </button>
                `:""}
                ${this.layoutEditing?V`
                    <wcc-zone-overlay class="inplace"
                            .layout=${this.configV3.layout}
                            @layout-changed=${this.onInplaceLayoutChanged}
                    ></wcc-zone-overlay>
                    <div class="layout-edit-actions">
                        <button class="primary" @click=${this.saveLayoutEditing}>Save</button>
                        <button @click=${this.cancelLayoutEditing}>Cancel</button>
                    </div>
                `:""}
            </ha-card>
        `}};Ja([me({type:Object})],qa.prototype,"hass",void 0),Ja([me({type:Object})],qa.prototype,"config",void 0),Ja([me({attribute:!1})],qa.prototype,"preview",void 0),Ja([ve()],qa.prototype,"layoutEditing",void 0),qa=Ja([ge("wall-clock-card")],qa),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
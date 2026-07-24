/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;class n{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}}const a=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(o,e,i)},r=(i,o)=>{if(t)i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=t.cssText,i.appendChild(o)}},s=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,m=g.trustedTypes,v=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&c(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const a=o?.call(this);n?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=o;const a=n.fromAttribute(t,e.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const o=this.constructor,n=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??w)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==n||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}var $;x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,f?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.1");const k=window,S=k.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",I=`lit$${(Math.random()+"").slice(9)}$`,A="?"+I,E=`<${A}>`,D=document,P=()=>D.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,N=e=>T(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),F="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,j=/>/g,L=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,W=/"/g,B=/^(?:script|style|textarea|title)$/i,U=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=U(1),Z=(U(2),Symbol.for("lit-noChange")),K=Symbol.for("lit-nothing"),q=new WeakMap,J=D.createTreeWalker(D,129,null,!1);function G(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,o=[];let n,a=2===t?"<svg>":"",r=R;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===R?"!--"===l[1]?r=M:void 0!==l[1]?r=j:void 0!==l[2]?(B.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=L):void 0!==l[3]&&(r=L):r===L?">"===l[0]?(r=null!=n?n:R,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?L:'"'===l[3]?W:H):r===W||r===H?r=L:r===M||r===j?r=R:(r=L,n=void 0);const h=r===L&&e[t+1].startsWith("/>")?" ":"";a+=r===R?i+E:c>=0?(o.push(s),i.slice(0,c)+z+i.slice(c)+I+h):i+I+(-2===c?(o.push(void 0),t):h)}return[G(e,a+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class X{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,a=0;const r=e.length-1,s=this.parts,[l,c]=Y(e,t);if(this.el=X.createElement(l,i),J.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=J.nextNode())&&s.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(z)||t.startsWith(I)){const i=c[a++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+z).split(I),t=/([.?@])?(.*)/.exec(i);s.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?oe:"?"===t[1]?ae:"@"===t[1]?re:ie})}else s.push({type:6,index:n})}for(const t of e)o.removeAttribute(t)}if(B.test(o.tagName)){const e=o.textContent.split(I),t=e.length-1;if(t>0){o.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],P()),J.nextNode(),s.push({type:2,index:++n});o.append(e[t],P())}}}else if(8===o.nodeType)if(o.data===A)s.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(I,e+1));)s.push({type:7,index:n}),e+=I.length-1}n++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,o){var n,a,r,s;if(t===Z)return t;let l=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const c=O(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(a=null==l?void 0:l._$AO)||void 0===a||a.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,o)),void 0!==o?(null!==(r=(s=i)._$Co)&&void 0!==r?r:s._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(t=Q(e,l._$AS(e,t.values),l,o)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:D).importNode(i,!0);J.currentNode=n;let a=J.nextNode(),r=0,s=0,l=o[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new te(a,a.nextSibling,this,e):1===l.type?t=new l.ctor(a,l.name,l.strings,this,e):6===l.type&&(t=new se(a,this,e)),this._$AV.push(t),l=o[++s]}r!==(null==l?void 0:l.index)&&(a=J.nextNode(),r++)}return J.currentNode=D,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{constructor(e,t,i,o){var n;this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==Z&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):N(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==K&&O(this._$AH)?this._$AA.nextSibling.data=e:this.$(D.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,n="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=X.createElement(G(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new ee(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new X(e)),t}T(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new te(this.k(P()),this.k(P()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class ie{constructor(e,t,i,o,n){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const n=this.strings;let a=!1;if(void 0===n)e=Q(this,e,t,0),a=!O(e)||e!==this._$AH&&e!==Z,a&&(this._$AH=e);else{const o=e;let r,s;for(e=n[0],r=0;r<n.length-1;r++)s=Q(this,o[i+r],t,r),s===Z&&(s=this._$AH[r]),a||(a=!O(s)||s!==this._$AH[r]),s===K?e=K:e!==K&&(e+=(null!=s?s:"")+n[r+1]),this._$AH[r]=s}a&&!o&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class oe extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}const ne=S?S.emptyScript:"";class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){e&&e!==K?this.element.setAttribute(this.name,ne):this.element.removeAttribute(this.name)}}class re extends ie{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Q(this,e,t,0))&&void 0!==i?i:K)===Z)return;const o=this._$AH,n=e===K&&o!==K||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==K&&(o===K||n);n&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const le={O:z,P:I,A,C:1,M:Y,L:ee,R:N,D:Q,I:te,V:ie,H:ae,N:re,U:oe,F:se},ce=k.litHtmlPolyfillSupport;null==ce||ce(X,te),(null!==($=k.litHtmlVersions)&&void 0!==$?$:k.litHtmlVersions=[]).push("2.8.0");const de=globalThis;class he extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,n;const a=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let r=a._$litPart$;if(void 0===r){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;a._$litPart$=r=new te(t.insertBefore(P(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}he._$litElement$=!0,he.finalized=!0,de.litElementHydrateSupport?.({LitElement:he});const ue=de.litElementPolyfillSupport;ue?.({LitElement:he}),(de.litElementVersions??=[]).push("4.2.1");const pe=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ge={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},me=(e=ge,t,i)=>{const{kind:o,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,n,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];t.call(this,i),this.requestUpdate(o,n,e)}}throw Error("Unsupported decorator location: "+o)};function ve(e){return(t,i)=>"object"==typeof i?me(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function fe(e){return ve({...e,state:!0,attribute:!1})}const ye=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);function be(e,t){return(i,o,n)=>{const a=t=>t.renderRoot?.querySelector(e)??null;if(t){const{get:e,set:t}="object"==typeof o?i:n??(()=>{const e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return ye(i,o,{get(){let i=e.call(this);return void 0===i&&(i=a(this),(null!==i||this.hasUpdated)&&t.call(this,i)),i}})}return ye(i,o,{get(){return a(this)}})}}var we;!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR",e[e.NONE=4]="NONE"}(we||(we={}));const _e={level:we.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let xe={..._e};const $e=[];function ke(e,t,i,...o){var n;if(e<xe.level)return;const a=function(e,t,i){const{prefix:o,enableTimestamps:n,enableSourceTracking:a}=xe;let r="";return n&&(r+=`[${(new Date).toISOString()}] `),r+=`[${we[e]}] `,o&&(r+=`[${o}] `),t&&a&&(r+=`[${t}] `),r+=i,r}(e,t,i);if(xe.logToConsole)switch(e){case we.DEBUG:console.debug(a,...o);break;case we.INFO:console.log(a,...o);break;case we.WARN:console.warn(a,...o);break;case we.ERROR:console.error(a,...o)}if(xe.logToStorage){let e=a;if(o.length>0)try{e+=" "+o.map(e=>"object"==typeof e?JSON.stringify(e):String(e)).join(" ")}catch(t){e+=" [Arguments could not be stringified]"}$e.push(e);const t=null!==(n=xe.maxStoredLogs)&&void 0!==n?n:100;$e.length>t&&$e.splice(0,$e.length-t)}}function Se(e){return{debug:(t,...i)=>ke(we.DEBUG,e,t,...i),info:(t,...i)=>ke(we.INFO,e,t,...i),warn:(t,...i)=>ke(we.WARN,e,t,...i),error:(t,...i)=>ke(we.ERROR,e,t,...i),withSource:e=>Se(e)}}function Ce(e){switch(e.toLowerCase()){case"debug":return we.DEBUG;case"info":return we.INFO;case"warn":default:return we.WARN;case"error":return we.ERROR;case"none":return we.NONE}}const ze=Se("wall-clock");class Ie{static getInstance(){return Ie.instance||(Ie.instance=new Ie),Ie.instance}constructor(){this.sources=new Map}register(e){this.sources.has(e.id)&&ze.warn(`Image source with ID ${e.id} is already registered. Overwriting.`),this.sources.set(e.id,e)}registerAll(e){e.forEach(e=>this.register(e))}getSource(e){return this.sources.get(e)}getAllSources(){return Array.from(this.sources.values())}hasSource(e){return this.sources.has(e)}}var Ae,Ee;!function(e){e.Unspecified="unspecified",e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night"}(Ae||(Ae={})),function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(Ee||(Ee={}));const De=[Ee.All,Ee.ClearSky,Ee.Clouds,Ee.Rain,Ee.Snow,Ee.Mist],Pe=[Ae.Unspecified,Ae.SunriseSunset,Ae.Day,Ae.Night];function Oe(e,t){if(!e)return;const i=e.toLowerCase();for(const e of t)if(i.includes(e.toLowerCase().replace(" ","-")))return e}class Te{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0,this.cacheFullyCycled=!1}getLogger(){return Se(`${this.id}-source`)}shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}async fetchImagesAsync(e,t,i){return this.getLogger().debug(`Fetching images with weather: ${t}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(e,t,i)}async getNextImageUrlAsync(e,t,i){var o;this.getLogger().debug(`GetNextImageUrl called with weather: ${t}, timeOfDay: ${i}`),this.lastWeather===t&&this.lastTimeOfDay===i||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.cacheFullyCycled=!1,this.lastWeather=t,this.lastTimeOfDay=i);const n=`${t}_${i}`;if(this.cacheFullyCycled||!this.imageUrlCache.has(n)||0===(null===(o=this.imageUrlCache.get(n))||void 0===o?void 0:o.length)){this.getLogger().debug((this.cacheFullyCycled?"Cache fully cycled":"No cached images")+", fetching new images");const o=[...await this.fetchImagesAsync(e,t,i)];this.shuffleArray(o),this.imageUrlCache.set(n,o),this.currentIndex=0,this.cacheFullyCycled=!1,this.getLogger().info(`Cached ${o.length} images for weather: ${t}, timeOfDay: ${i}`)}const a=this.imageUrlCache.get(n)||[];if(0===a.length)return this.getLogger().warn(`No images available for weather: ${t}, timeOfDay: ${i}`),"";const r=a[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%a.length,0===this.currentIndex&&(this.cacheFullyCycled=!0,this.getLogger().info("Cache fully cycled, will fetch new images on next call")),this.getLogger().info(`Returning image for weather: ${t}, timeOfDay: ${i}, URL: ${r}`),r}filterImagesByWeatherAndTime(e,t,i){if(this.getLogger().debug(`Current time of day: ${i}`),this.getLogger().debug(`Current weather condition: ${t}`),0===e.length)return[];let o=[];return o=e.filter(e=>(e.weather===t||e.weather===Ee.All||t===Ee.All)&&e.timeOfDay===i),0===o.length&&(o=e.filter(e=>(e.weather===t||e.weather===Ee.All||t===Ee.All)&&e.timeOfDay===Ae.Unspecified)),0===o.length&&(o=e.filter(e=>e.timeOfDay===i)),0===o.length&&(o=e.filter(e=>e.timeOfDay===Ae.Unspecified)),o.length>0?(this.getLogger().debug(`Found ${o.length} images matching current conditions`),o.map(e=>e.url)):(this.getLogger().info("No matching images found, returning all images"),e.map(e=>e.url))}convertUrlsToBackgroundImages(e){return this.getLogger().debug(`Converting ${e.length} URLs to BackgroundImage objects`),e.map(e=>({url:e,weather:Oe(e,De)||Ee.All,timeOfDay:Oe(e,Pe)||Ae.Unspecified}))}}const Ne=new class extends Te{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=Se("local-source")}async fetchImagesInternalAsync(e,t,i){return e.backgroundImages&&e.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${e.backgroundImages.length} images`),this.logger.debug(`First image URL: ${e.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(e.backgroundImages,t,i)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Fe=new class extends Te{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=Se("picsum-source")}async fetchImagesInternalAsync(e,t,i){const o=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${o}`),[o]}getDefaultConfig(){return{}}},Re=new class extends Te{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=Se("unsplash-source"),this.categories=["nature","water","architecture","city","landscape","animals","food","travel","people","technology","abstract","space","interior","flowers","dark","light","minimal","colorful","black","white","red","blue","green","yellow","orange","purple","pink","brown","gray","black-and-white"]}async fetchImagesInternalAsync(e,t,i){const o=e.count||5;let n=e.category||"";const a=e.apiKey||"";return this.logger.debug(`Current weather: ${t}, time of day: ${i}`),this.logger.debug(`Using category with weather and time: ${n}`),a?(this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(a,n,o,t,i,e)):(this.logger.error("Unsplash API key is required"),[])}async fetchImagesFromApiAsync(e,t,i,o,n,a){const r=[],s=(null==a?void 0:a.contentFilter)||"high";let l="";if(t){const e=t.split(",").map(e=>e.trim().toLowerCase());e.length>0&&(l=e[0]),e.length>1&&(l+=` ${e.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${e.join(", ")}`)}const c=o.toLowerCase();l+=` ${c}`,"sunrise-sunset"===n?l+=" sunrise sunset dawn dusk":"day"===n?l+=" daylight midday day":"night"===n&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${n}`);try{let t="https://api.unsplash.com/photos/random?";const o=new URLSearchParams({client_id:e,count:i.toString(),orientation:"landscape",content_filter:s});l&&o.append("query",l);const n=new URLSearchParams(o);n.delete("client_id"),n.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${n.toString()}`),t+=o.toString();const a=t.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.info(`Making API request to: ${a}`);const c=await fetch(t);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const d=await c.json();this.logger.debug(`API response received with ${Array.isArray(d)?d.length:0} images`),Array.isArray(d)&&d.forEach(e=>{const t=e.urls.raw+"&w=1920&h=1080&fit=crop";r.push(t)}),this.logger.debug(`Fetched ${r.length} images from Unsplash API`)}catch(e){throw this.logger.error("Error fetching from Unsplash API:",e),e}return r}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",contentFilter:"high"}}getCategories(){return[...this.categories]}},Me=new class extends Te{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=Se("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}setHass(e){this.hass=e}async checkEntityAsync(e){try{if(!this.hass)return void this.logger.warn("Could not get Home Assistant instance");const t=this.hass.states[e];if(!t)return void this.logger.warn(`Entity ${e} not found`);this.updateCacheFromEntity(t),this.entityId=e,this.logger.debug(`Checked entity ${e}`)}catch(e){this.logger.error("Error checking entity:",e)}}updateCacheFromEntity(e){const t=e.attributes.files;t&&Array.isArray(t)&&t.every(e=>"string"==typeof e)?(this.cachedImages=this.convertUrlsToBackgroundImages(t),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${t.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(e,t,i){const o=e.entity;if(!o)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(o);const n=Date.now();if(this.cachedImages.length>0&&n-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,t,i);try{if(!this.hass)return this.logger.warn("Could not get Home Assistant instance"),[];const e=this.hass.states[o];return e?(this.updateCacheFromEntity(e),this.filterImagesByWeatherAndTime(this.cachedImages,t,i)):(this.logger.warn(`Sensor ${o} not found`),[])}catch(e){return this.logger.error("Error fetching images from sensor:",e),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},je=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=Se("null-source")}async fetchImagesAsync(e,t,i){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(e,t,i){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Le={local:Ne,picsum:Fe,unsplash:Re,sensor:Me};class He{constructor(e){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=Se("background-image-manager"),this.hass=e}setHass(e){var t,i;this.hass=e,null===(i=null===(t=this.imageSource)||void 0===t?void 0:t.setHass)||void 0===i||i.call(t,e)}initialize(e={}){var t,i;const o=e.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${o}`),"none"===o)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var n;if(this.imageSourceId=o||"picsum",this.imageSource=(n=this.imageSourceId,Le[n]||je),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;null===(i=(t=this.imageSource).setHass)||void 0===i||i.call(t,this.hass);const a=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...a,...e},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(e,t){var i;if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${e}, time of day: ${t}`);let o=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,e,t);if(o&&o.startsWith("media-source://"))try{if(null===(i=this.hass)||void 0===i?void 0:i.callWS){const e=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:o});o=e&&e.url?e.url:o}else this.logger.warn("Home Assistant instance not available to resolve media-source URL; using original URL")}catch(e){this.logger.error("Failed to resolve media-source URL",e)}return o?(this.logger.debug(`Got image URL: ${o}`),o):(this.logger.warn("No image URL returned from source"),"")}catch(e){return this.logger.error("Error getting next image URL:",e),""}}getImageSourceId(){return this.imageSourceId}}Ie.getInstance().registerAll([Fe,Ne,Re,Me]);const We=[{code:"bg",label:"Bulgarian (Български)",locale:"bg-BG",translations:JSON.parse('{"common":{"title":"Времето","description":"Текущо време и прогноза","settings":"Настройки на времето"},"conditions":{"all":"Всички метеорологични условия","clouds":"Облачно","clear_sky":"Ясно","few_clouds":"Частична облачност","scattered_clouds":"Разкъсана облачност","broken_clouds":"Значителна облачност","overcast_clouds":"Плътна облачност","shower_rain":"Превалявания от дъжд","rain":"Дъжд","thunderstorm":"Гръмотевична буря","snow":"Сняг","light_snow":"Слаб сняг","mist":"Мъгла","light_rain":"Слаб дъжд","moderate_rain":"Умерен дъжд","heavy_intensity_rain":"Силен дъжд","sunny":"Слънчево","clear_night":"Ясна нощ","partlycloudy":"Предимно облачно","cloudy":"Облачно","rainy":"Дъждовно","snowy":"Снежно","fog":"Мъгла","hail":"Градушка","windy":"Ветровито"},"forecast":{"title":"Прогноза","today":"Днес","tomorrow":"Утре","next_days":"Следващите дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zataženo","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","light_snow":"Slabé sněžení","mist":"Mlha","light_rain":"Slabý déšť","moderate_rain":"Mírný déšť","heavy_intensity_rain":"Silný déšť","sunny":"Slunečno","clear_night":"Jasná noc","partlycloudy":"Polojasno","cloudy":"Oblačno","rainy":"Deštivo","snowy":"Sněžení","fog":"Mlha","hail":"Krupobití","windy":"Větrno"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}},"ui":{"add":"Přidat","add_all":"Přidat vše","remove":"Odebrat","expand":"Rozbalit","collapse":"Sbalit","left":"Vlevo","center":"Na střed","right":"Vpravo","auto":"Automaticky (podle zóny)","zone_default":"Podle zóny","horizontal":"Vodorovně","vertical":"Svisle","none":"Žádné","content":"Obsah","appearance":"Vzhled","behavior":"Chování","settings":"Nastavení","saved":"Uloženo","done":"Hotovo","close":"Zavřít"},"designer":{"edit_board":"Upravit board","drag_hint":"Přetáhněte widget za úchyt · kliknutím jej vyberete a nastavíte","designer":"Designer","configure_card":"Nastavit kartu","card_settings":"Nastavení karty","card_settings_unavailable":"Nastavení karty není dostupné.","use_designer_title":"Nastavte kartu v Designeru","use_designer_help":"Zavřete tento dialog. V režimu úprav dashboardu otevřete kartu tlačítkem Nastavit kartu a použijte Nastavení karty nebo vyberte widget.","mode":"Režim editoru","preview":"Náhled","widgets":"Widgety","search":"Hledat…","information":"Informace","time":"Čas","controls":"Ovládání","other":"Ostatní","drag_here":"+ Přetáhněte sem widget","drag_to_move":"Přetáhnout","edit_widget":"Upravit {name}","remove_widget":"Odebrat {name}","singleton":"Widget {name} lze přidat pouze jednou","unsaved":"Neuložené změny","saving":"Ukládám…","save_failed":"Uložení selhalo — klikněte pro opakování","retry_save":"Opakovat uložení","autosave_hint":"Změny se připravují průběžně · uložíte je a dashboard dokončíte tlačítkem Hotovo","autosave_hint_local":"Změny se připravují průběžně · uložíte je a editor zavřete tlačítkem Hotovo"},"zones":{"top_left":"Vlevo nahoře","top_center":"Uprostřed nahoře","top_right":"Vpravo nahoře","middle_left":"Vlevo","center":"Uprostřed","middle_right":"Vpravo","bottom_left":"Vlevo dole","bottom_center":"Uprostřed dole","bottom_right":"Vpravo dole"},"general":{"title":"Obecné","font_color":"Barva písma","custom_color":"Vlastní barva","font_family":"Rodina písma","font_family_help":"CSS rodina nebo seznam písem; font musí být již načtený","language":"Jazyk","log_level":"Úroveň logování","size":"Velikost","large":"Velká","medium":"Střední","small":"Malá","custom_sizes":"Vlastní velikosti","clock_top_margin":"Horní okraj hodin (např. 0rem)","spacing":"Rozestupy","background":"Pozadí","time_format":"Formát času","date_format":"Formát data"},"runtime":{"loading_weather":"Načítám data počasí…","loading_transportation":"Načítám data dopravy…","no_departures":"Nejsou dostupné žádné odjezdy.","transportation_title":"Odjezdy MHD","wheelchair_accessible":"Bezbariérový spoj"},"inspector":{"widget_settings":"Nastavení widgetu","appearance_layout":"Vzhled a rozložení","no_content":"Tento widget nemá žádné nastavení obsahu.","no_behavior":"Tento widget nemá žádné další nastavení chování.","select_hint":"Vyberte widget nebo zónu, kterou chcete upravit.","layout_designer":"Designer rozložení","zone":"Zóna: {name}","edit_zone":"Upravit zónu {name}","layout_settings":"Nastavení rozložení","add_widget_first":"Před změnou nastavení přidejte do této zóny widget.","color":"Vlastní barva","display_priority":"Priorita zobrazení","priority_help":"V exkluzivní zóně se zobrazí aktivní widget s vyšší hodnotou","zone_alignment":"Zarovnání zóny","zone_alignment_help":"Použije se na všechny widgety v této zóně","zone_default":"Výchozí pro zónu ({alignment})","mode":"Režim","stack":"Skládat (zobrazit všechny widgety)","exclusive":"Exkluzivní (aktivní widget s nejvyšší prioritou)","direction":"Směr","column":"Sloupec","row":"Řádek","horizontal_alignment":"Vodorovné zarovnání","widget_gap":"Vlastní mezera mezi widgety (např. 4px)","zone_padding":"Odsazení zóny (např. 0 16px)","vertical_offset":"Svislý posun zóny (např. -8vh)","vertical_offset_help":"Záporná hodnota posune celou zónu nahoru, kladná dolů.","clock_size":"Velikost hodin (např. 16rem)","date_size":"Velikost data (např. 6rem)","label_size":"Velikost popisku (např. 1.2rem)","value_size":"Velikost hodnoty (např. 2rem)","icon_size":"Velikost ikony (tlačítko je 2× větší, např. 72px)","calendar_date_size":"Velikost bloku data (např. 1rem)","event_title_size":"Velikost názvu události (např. 1rem)","event_detail_size":"Velikost detailu události (např. 0.82rem)","font_size":"Velikost písma (např. 2rem)","font_family":"Vlastní rodina písma","font_family_help":"CSS rodina nebo seznam písem; prázdné použije font karty","max_width":"Maximální šířka (např. 420px)","max_height":"Maximální výška (např. 50vh)","unsupported_width":"Maximální šířka není podporována — hodnotu odstraňte","unsupported_height":"Maximální výška není podporována — hodnotu odstraňte","margin":"Okraj (CSS zkrácený zápis)"},"layout":{"format":"Formát rozložení","format_help":"Mění geometrii plochy; widgety si zachovají své zóny a nastavení.","format_grid":"Mřížka 3 × 3","format_vertical_2_1":"Svislé 2/3 + 1/3","format_vertical_1_2":"Svislé 1/3 + 2/3","format_horizontal_2_1":"Vodorovné 2/3 + 1/3","format_horizontal_1_2":"Vodorovné 1/3 + 2/3","visual_preset":"Vizuální preset","preset_none":"Bez vizuálního presetu","preset_glass":"Skleněný informační panel","preset_help":"Preset mění pouze vzhled rozložení, nikdy entity, akce ani umístění widgetů."},"spacing":{"preset":"Předvolba rozestupů","compact":"Kompaktní","normal":"Normální","spacious":"Prostorné","custom":"Vlastní","card_padding":"Odsazení karty","card_padding_help":"1–4 hodnoty: nahoře, vpravo, dole, vlevo. Příklad: 60px 60px 60px 16px.","zone_gap":"Mezera mezi zónami","zone_gap_help":"Jedna hodnota, například 24px.","widget_gap":"Mezera mezi widgety","widget_gap_help":"Jedna hodnota, například 16px.","invalid_padding":"Použijte 1–4 CSS délky, například 60px 60px 60px 16px.","invalid_length":"Použijte jednu CSS délku, například 16px.","legacy_hint":"První změna rozestupů převede starší konfiguraci na formát zón."},"widgets":{"sensors":"Senzory","weather":"Počasí","calendar":"Kalendář","transportation":"Doprava","clock":"Hodiny","date":"Datum","action_bar":"Panel akcí","ha_card":"Karta Home Assistantu","separator":"Oddělovač"},"editor":{"format":{"hour_format":"Formát hodin","hour_display":"Zobrazení hodin","minute_display":"Zobrazení minut","second_display":"Zobrazení sekund","hour_12":"12hodinový","hour_24":"24hodinový","show_am_pm":"Zobrazit AM/PM","show_am_pm_help":"Ponechá 12hodinový formát a pouze skryje nebo zobrazí označení období","numeric":"Číslo","two_digit":"Dvě číslice","hidden":"Skryté","custom_date":"Vlastní formát data","custom_date_help":"Například yyyy-MM-dd nebo EEEE, MMMM d, yyyy. Vyplněná hodnota přepíše nastavení níže.","weekday_display":"Zobrazení dne v týdnu","month_display":"Zobrazení měsíce","day_display":"Zobrazení dne","year_display":"Zobrazení roku","long_monday":"Dlouhý (pondělí)","short_mon":"Krátký (po)","narrow_m":"Úzký (P)","long_january":"Dlouhý (leden)","short_jan":"Krátký (led)","narrow_j":"Úzký (L)","numeric_1":"Číslo (1)","two_digit_01":"Dvě číslice (01)","numeric_2025":"Číslo (2025)","two_digit_25":"Dvě číslice (25)"},"weather":{"show":"Zobrazit počasí","show_help":"Zobrazí aktuální počasí a předpověď","title":"Název počasí","provider":"Poskytovatel počasí","provider_none":"Žádný (vypnout počasí)","provider_ha":"Entita Home Assistantu","entity":"Entita počasí","api_key":"API klíč","api_key_help":"API klíč OpenWeatherMap","latitude":"Zeměpisná šířka","longitude":"Zeměpisná délka","units":"Jednotky","metric":"Metrické (°C, m/s)","imperial":"Imperiální (°F, mph)","display_mode":"Režim zobrazení","current":"Pouze aktuální počasí","forecast":"Pouze předpověď","both":"Aktuální počasí a předpověď","icon_set":"Sada ikon počasí","forecast_days":"Počet dní předpovědi","days":"Počet dní: {count}","update_interval":"Interval aktualizace","update_help":"Interval v minutách (minimum 1)","orientation":"Orientace předpovědi","orientation_help":"Automaticky použije řádek ve středních zónách a sloupec v bočních zónách."},"sensors":{"empty":"Nejsou nastaveny žádné senzory.","sensor":"Senzor {number}","label":"Popisek","entity":"Entita","icon":"Ikona","icon_help":"Prázdná hodnota použije ikonu entity z Home Assistantu.","add":"Přidat senzor","remove":"Odebrat senzor","expand":"Rozbalit senzor","collapse":"Sbalit senzor","orientation":"Orientace položek","orientation_help":"Automaticky použije řádek ve středních zónách a sloupec v bočních zónách.","alignment":"Zarovnání položek","alignment_help":"Použije zarovnání zóny, nebo jej nastavte jen pro tento widget.","item_gap":"Mezera mezi senzory","item_gap_help":"CSS délka mezi senzory (výchozí: 16px)","show_icons":"Zobrazit ikony senzorů","show_icons_help":"Zobrazí nebo skryje ikonu vedle každého senzoru.","icon_size":"Velikost ikony senzoru","icon_size_help":"CSS délka (výchozí je responsivní velikost, maximálně 36px).","show_separator":"Zobrazit separátor senzorů","show_separator_help":"Zobrazí nebo skryje čáru mezi senzory ve vodorovném režimu.","separator_color":"Barva separátoru","separator_color_help":"Prázdná hodnota použije barvu textu widgetu.","separator_opacity":"Průhlednost separátoru","separator_opacity_help":"Nastaví průhlednost separátoru."},"transportation":{"provider":"Poskytovatel dopravy","max_departures":"Maximum odjezdů na zastávku","departures":"Počet odjezdů: {count}","display_mode":"Zobrazení odjezdů","display_inline":"V ploše karty","display_modal":"V modálním okně","display_mode_help":"Určuje, kde se odjezdy otevřou po stisknutí akce Doprava","auto_hide":"Automaticky skrýt po","auto_hide_help":"Čas v minutách (1–10)","update_interval":"Interval aktualizace","update_help":"Interval v minutách (minimum 1)","stops":"Zastávky","stop":"Zastávka {number}","stop_id":"ID zastávky","post_id":"ID stanoviště","stop_name":"Název zastávky (volitelné)","add_stop":"Přidat zastávku","remove_stop":"Odebrat zastávku","expand_stop":"Rozbalit zastávku","collapse_stop":"Sbalit zastávku","documentation":"Dokumentace nastavení dopravy","refresh_buttons":"Entity tlačítek aktualizace","refresh_button":"Entita tlačítka aktualizace","refresh_button_help":"Při otevření odjezdů se aktivuje tato zastávka","departure_entities":"Entity senzorů odjezdů","departure_entities_help":"Vyberte senzory v pořadí zobrazení"},"actions":{"enable":"Povolit panel akcí","description":"Nastavte tlačítka akcí zobrazená v tomto widgetu.","orientation":"Orientace tlačítek","orientation_help":"Automaticky použije řádek ve středních zónách a sloupec v bočních zónách.","alignment":"Zarovnání tlačítek","alignment_help":"Zarovná tlačítka vlevo, na střed nebo vpravo","opacity":"Průhlednost podkladu","opacity_help":"Nastaví průhlednost podkladu panelu akcí","button_background":"Kruhové pozadí tlačítek","button_background_help":"Zobrazí nebo skryje průhledný kruh za každou akcí","button_gap":"Mezera mezi tlačítky","button_gap_help":"CSS délka mezi tlačítky (výchozí: 16px)","panel_padding":"Vnitřní odsazení panelu","panel_padding_help":"CSS odsazení uvnitř panelu akcí (výchozí: 16px)","title":"Akce","empty":"Nejsou nastaveny žádné akce.","action":"Akce {number}","type":"Typ akce","select_type":"Vyberte typ akce","button_title":"Název","title_help":"Název tlačítka akce","icon":"Ikona","icon_help":"Ikona tlačítka akce","add":"Přidat akci","remove":"Odebrat akci","expand":"Rozbalit akci","collapse":"Sbalit akci","move_up":"Posunout akci nahoru","move_down":"Posunout akci dolů","types":{"weather_update":"Aktualizovat počasí","transportation":"Doprava","light_toggle":"Přepnout světlo","action_navigate":"Přejít na stránku","background_next":"Další pozadí","action_ha":"Akce Home Assistantu","call_service":"Zavolat službu","switch_toggle":"Přepnout přepínač","action_more_info":"Detail entity"}},"action_plugin":{"entity":"Entita","entity_more_info_help":"Entita použitá pro detail a přepnutí","tap_action":"Akce při klepnutí","tap_help":"Standardní akce Home Assistantu spuštěná klepnutím","hold_action":"Akce při podržení","hold_help":"Standardní akce Home Assistantu spuštěná podržením","double_action":"Akce při dvojitém klepnutí","double_help":"Standardní akce Home Assistantu spuštěná dvojitým klepnutím","active_color":"Aktivní barva","active_color_help":"Barva použitá, když je akce aktivní","light_entity":"Entita světla","light_help":"Vyberte světlo, které se má přepínat","switch_entity":"Entita přepínače","switch_help":"Vyberte přepínač, který se má ovládat","icon_on":"Ikona zapnutého stavu","light_icon_help":"Ikona zobrazená při zapnutém světle","switch_icon_help":"Ikona zobrazená při zapnutém přepínači","light_color_help":"Barva při zapnutém světle","switch_color_help":"Barva při zapnutém přepínači","more_info_help":"Vyberte entitu, jejíž detail se má zobrazit","navigation_path":"Cesta navigace","navigation_help":"Cesta nebo URL, která se má otevřít","open_in":"Otevřít v","current_tab":"Aktuální kartě","new_tab":"Nové kartě","service":"Služba","service_help":"Volaná služba včetně dat a cíle","confirmation":"Vyžadovat potvrzení","confirmation_help":"Před voláním služby zobrazí potvrzovací dialog","confirmation_text":"Text potvrzení","confirmation_text_help":"Vlastní text potvrzovacího dialogu","weather_update_help":"Tato akce okamžitě aktualizuje počasí. Není potřeba žádné další nastavení."},"background":{"source":"Zdroj obrázků","opacity":"Průhlednost pozadí","rotation":"Interval změny (sekundy)","fit":"Přizpůsobení obrázku pozadí","images":"Obrázky pozadí","image":"Obrázek pozadí {number}","url":"URL obrázku","weather":"Podmínka počasí","time":"Část dne","add":"Přidat obrázek pozadí","remove":"Odebrat obrázek pozadí","expand":"Rozbalit obrázek pozadí","collapse":"Sbalit obrázek pozadí","source_none":"Žádné obrázky pozadí","source_picsum":"Fotografie Picsum","source_local":"Místní obrázky","source_sensor":"Obrázky ze senzoru","fit_fill":"Vyplnit","fit_contain":"Přizpůsobit celé","fit_cover":"Pokrýt","fit_scale_down":"Zmenšit","local_help":"Nastavte URL místních obrázků a jejich podmínky počasí a denní doby.","unsplash_help":"Nastavte zdroj Unsplash. Je vyžadován API klíč.","category":"Kategorie","photo_count":"Počet fotografií","api_help":"Bez platného API klíče nebude zdroj Unsplash fungovat.","api_key":"API klíč","content_filter":"Filtr obsahu","sensor_entity":"Entita senzoru","sensor_help":"Vyberte senzor, jehož atribut files obsahuje pole URL obrázků.","sensor_files_help":"Senzor musí poskytovat atribut files s URL obrázků."},"calendar":{"calendars":"Kalendáře","calendar":"Kalendář {number}","entity":"Entita kalendáře","empty":"Přidejte jednu nebo více entit kalendáře Home Assistantu.","label":"Popisek (volitelné)","event_color":"Barva událostí","add":"Přidat kalendář","add_all":"Přidat vše","remove":"Odebrat kalendář","expand":"Rozbalit kalendář","collapse":"Sbalit kalendář","display":"Zobrazení","display_mode":"Režim zobrazení","agenda":"Agenda","today_only":"Pouze dnes","days_ahead":"Počet dní dopředu","maximum_events":"Maximální počet událostí","show_all_day":"Zobrazit celodenní události","show_location":"Zobrazit místo","show_description":"Zobrazit popis","hide_past":"Skrýt dnešní uplynulé události","hide_empty":"Skrýt bez událostí","update_interval":"Interval aktualizace","update_help":"Minuty (minimum 1)","event_background":"Podklad událostí","event_background_color":"Barva podkladu událostí","event_background_opacity":"Průhlednost podkladu událostí","all_day":"Celý den","loading":"Načítám kalendář…","no_events":"Žádné nadcházející události.","when":"Termín","calendar_name":"Kalendář","location":"Místo","description":"Popis","event":"Událost kalendáře"},"separator":{"orientation":"Orientace","orientation_help":"Automaticky se řídí směrem hostitelské zóny.","color":"Barva oddělovače","opacity":"Průhlednost","thickness":"Tloušťka","thickness_help":"CSS délka, například 1px nebo 0.15rem.","length":"Délka","length_help":"CSS délka nebo procenta, například 100% nebo 240px."},"ha_card":{"description":"Vloží vestavěnou nebo nainstalovanou vlastní kartu dashboardu Home Assistantu.","card_type":"Typ karty","card_type_help":"Vyberte kartu nebo zadejte její typ, například custom:mushroom-template-card.","choose_card":"Vybrat kartu","change_card":"Vybrat jinou kartu","edit_card":"Upravit kartu v editoru Home Assistantu","dialog_title":"Nastavení vložené karty","transparent":"Průhledné pozadí karty","transparent_help":"Odstraní standardní podklad HA, pokud vložená karta podporuje proměnné motivu.","empty":"Vyberte kartu Home Assistantu v editoru widgetu.","loading":"Načítám kartu Home Assistantu…","recursion_error":"Kartu wall-clock-card nelze vložit samu do sebe.","helpers_error":"Pomocné funkce karet Home Assistantu nejsou dostupné.","native_editor_unavailable":"Nativní editor karet Home Assistantu není v tomto zobrazení dostupný. Úplnou konfiguraci karty upravte níže.","json_config":"Konfigurace karty (JSON)","json_error":"Konfigurace karty není platný JSON.","json_type_error":"Konfigurace karty musí obsahovat typ."}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","overcast_clouds":"Overskyet himmel","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","light_snow":"Let sne","mist":"Tåge","light_rain":"Let regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn","sunny":"Solrigt","clear_night":"Klar nat","partlycloudy":"Delvist skyet","cloudy":"Overskyet","rainy":"Regnfuldt","snowy":"Snevejr","fog":"Tåge","hail":"Hagl","windy":"Blæsende"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","overcast_clouds":"Bedeckter Himmel","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","light_snow":"Leichter Schneefall","mist":"Nebel","light_rain":"Leichter Regen","moderate_rain":"Mäßiger Regen","heavy_intensity_rain":"Starker Regen","sunny":"Sonnig","clear_night":"Klare Nacht","partlycloudy":"Teilweise bewölkt","cloudy":"Bewölkt","rainy":"Regnerisch","snowy":"Verschneit","fog":"Nebel","hail":"Hagel","windy":"Windig"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","overcast_clouds":"Πλήρης συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","light_snow":"Ελαφριά χιονόπτωση","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή","moderate_rain":"Μέτρια βροχή","heavy_intensity_rain":"Έντονη βροχή","sunny":"Ηλιοφάνεια","clear_night":"Αίθριος νυχτερινός ουρανός","partlycloudy":"Μερικώς συννεφιασμένος","cloudy":"Συννεφιά","rainy":"Βροχερός","snowy":"Χιονισμένος","fog":"Ομίχλη","hail":"Χαλάζι","windy":"Ανεμώδης"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","overcast_clouds":"Overcast clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","light_snow":"Light snow","mist":"Mist","light_rain":"Light rain","moderate_rain":"Moderate rain","heavy_intensity_rain":"Heavy rain","sunny":"Sunny","clear_night":"Clear night","partlycloudy":"Partly cloudy","cloudy":"Cloudy","rainy":"Rainy","snowy":"Snowy","fog":"Fog","hail":"Hail","windy":"Windy"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}},"ui":{"add":"Add","add_all":"Add all","remove":"Remove","expand":"Expand","collapse":"Collapse","left":"Left","center":"Center","right":"Right","auto":"Auto (by zone)","zone_default":"Zone default","horizontal":"Horizontal","vertical":"Vertical","none":"None","content":"Content","appearance":"Appearance","behavior":"Behavior","settings":"Settings","saved":"Saved","done":"Done","close":"Close"},"designer":{"edit_board":"Edit board","drag_hint":"Drag a widget by its handle · click it to select and configure it","designer":"Designer","configure_card":"Configure card","card_settings":"Card settings","card_settings_unavailable":"Card settings are not available.","use_designer_title":"Configure this card in Designer","use_designer_help":"Close this dialog. In dashboard edit mode, open the card with Configure card and use Card settings or select a widget.","mode":"Editor mode","preview":"Preview","widgets":"Widgets","search":"Search…","information":"Information","time":"Time","controls":"Controls","other":"Other","drag_here":"+ Drag a widget here","drag_to_move":"Drag to move","edit_widget":"Edit {name}","remove_widget":"Remove {name}","singleton":"{name} can only be added once","unsaved":"Unsaved changes","saving":"Saving…","save_failed":"Save failed — click to retry","retry_save":"Retry save","autosave_hint":"Changes are prepared continuously · save and finish the dashboard with Done","autosave_hint_local":"Changes are prepared continuously · save and close this editor with Done"},"zones":{"top_left":"Top left","top_center":"Top center","top_right":"Top right","middle_left":"Left","center":"Center","middle_right":"Right","bottom_left":"Bottom left","bottom_center":"Bottom center","bottom_right":"Bottom right"},"general":{"title":"General","font_color":"Font color","custom_color":"Custom color","font_family":"Font family","font_family_help":"CSS font family or stack; the font must already be loaded","language":"Language","log_level":"Log level","size":"Size","large":"Large","medium":"Medium","small":"Small","custom_sizes":"Custom sizes","clock_top_margin":"Clock top margin (e.g., 0rem)","spacing":"Spacing","background":"Background","time_format":"Time format","date_format":"Date format"},"runtime":{"loading_weather":"Loading weather data…","loading_transportation":"Loading transportation data…","no_departures":"No departures available.","transportation_title":"Transit departures","wheelchair_accessible":"Wheelchair accessible"},"inspector":{"widget_settings":"Widget settings","appearance_layout":"Appearance and layout","no_content":"This widget has no content settings.","no_behavior":"This widget has no additional behavior settings.","select_hint":"Select a widget or zone to configure it.","layout_designer":"Layout designer","zone":"Zone: {name}","edit_zone":"Edit zone {name}","layout_settings":"Layout settings","add_widget_first":"Add a widget to this zone before changing its settings.","color":"Color override","display_priority":"Display priority","priority_help":"Higher active value wins in this exclusive zone","zone_alignment":"Zone alignment","zone_alignment_help":"Applies to every widget in this zone","zone_default":"Zone default ({alignment})","mode":"Mode","stack":"Stack (show all widgets)","exclusive":"Exclusive (highest-priority active widget)","direction":"Direction","column":"Column","row":"Row","horizontal_alignment":"Horizontal alignment","widget_gap":"Widget gap override (e.g., 4px)","zone_padding":"Zone padding (e.g., 0 16px)","vertical_offset":"Vertical offset (e.g., -8vh)","vertical_offset_help":"Negative values move the complete zone up; positive values move it down.","clock_size":"Clock size (e.g., 16rem)","date_size":"Date size (e.g., 6rem)","label_size":"Label size (e.g., 1.2rem)","value_size":"Value size (e.g., 2rem)","icon_size":"Icon size (button is 2×, e.g., 72px)","calendar_date_size":"Date block size (e.g., 1rem)","event_title_size":"Event title size (e.g., 1rem)","event_detail_size":"Event detail size (e.g., 0.82rem)","font_size":"Font size (e.g., 2rem)","font_family":"Font family override","font_family_help":"CSS font family or stack; empty uses the card font","max_width":"Maximum width (e.g., 420px)","max_height":"Maximum height (e.g., 50vh)","unsupported_width":"Maximum width (unsupported — clear this value)","unsupported_height":"Maximum height (unsupported — clear this value)","margin":"Margin (CSS shorthand)"},"layout":{"format":"Layout format","format_help":"Changes the canvas geometry; widgets keep their current zones and settings.","format_grid":"Grid 3 × 3","format_vertical_2_1":"Vertical 2/3 + 1/3","format_vertical_1_2":"Vertical 1/3 + 2/3","format_horizontal_2_1":"Horizontal 2/3 + 1/3","format_horizontal_1_2":"Horizontal 1/3 + 2/3","visual_preset":"Visual preset","preset_none":"No visual preset","preset_glass":"Glass information panel","preset_help":"Presets only style the layout and never change entities, actions, or widget placement."},"spacing":{"preset":"Spacing preset","compact":"Compact","normal":"Normal","spacious":"Spacious","custom":"Custom","card_padding":"Card padding","card_padding_help":"1–4 values: top, right, bottom, left. Example: 60px 60px 60px 16px.","zone_gap":"Zone gap","zone_gap_help":"One value, for example: 24px.","widget_gap":"Widget gap","widget_gap_help":"One value, for example: 16px.","invalid_padding":"Use 1–4 CSS lengths, for example: 60px 60px 60px 16px.","invalid_length":"Use one CSS length, for example: 16px.","legacy_hint":"The first spacing change converts this legacy configuration to the zone format."},"widgets":{"sensors":"Sensors","weather":"Weather","calendar":"Calendar","transportation":"Transportation","clock":"Clock","date":"Date","action_bar":"Action bar","ha_card":"Home Assistant card","separator":"Separator"},"editor":{"format":{"hour_format":"Hour format","hour_display":"Hour display","minute_display":"Minute display","second_display":"Second display","hour_12":"12-hour","hour_24":"24-hour","show_am_pm":"Show AM/PM","show_am_pm_help":"Keep 12-hour time while hiding or showing the period","numeric":"Numeric","two_digit":"2-digit","hidden":"Hidden","custom_date":"Custom date format","custom_date_help":"For example yyyy-MM-dd or EEEE, MMMM d, yyyy. When filled, it overrides the settings below.","weekday_display":"Weekday display","month_display":"Month display","day_display":"Day display","year_display":"Year display","long_monday":"Long (Monday)","short_mon":"Short (Mon)","narrow_m":"Narrow (M)","long_january":"Long (January)","short_jan":"Short (Jan)","narrow_j":"Narrow (J)","numeric_1":"Numeric (1)","two_digit_01":"2-digit (01)","numeric_2025":"Numeric (2025)","two_digit_25":"2-digit (25)"},"weather":{"show":"Show weather","show_help":"Display current weather and forecast","title":"Weather title","provider":"Weather provider","provider_none":"None (disable weather)","provider_ha":"Home Assistant entity","entity":"Weather entity","api_key":"API key","api_key_help":"OpenWeatherMap API key","latitude":"Latitude","longitude":"Longitude","units":"Units","metric":"Metric (°C, m/s)","imperial":"Imperial (°F, mph)","display_mode":"Display mode","current":"Current weather only","forecast":"Forecast only","both":"Current and forecast","icon_set":"Weather icon set","forecast_days":"Forecast days","days":"{count} days","update_interval":"Update interval","update_help":"Update interval in minutes (minimum 1)","orientation":"Forecast orientation","orientation_help":"Auto uses a row in center zones and a column in side zones."},"sensors":{"empty":"No sensors configured.","sensor":"Sensor {number}","label":"Label","entity":"Entity","icon":"Icon","icon_help":"Leave empty to use the Home Assistant entity icon.","add":"Add sensor","remove":"Remove sensor","expand":"Expand sensor","collapse":"Collapse sensor","orientation":"Item orientation","orientation_help":"Auto uses a row in center zones and a column in side zones.","alignment":"Item alignment","alignment_help":"Use the zone alignment or override it for this widget.","item_gap":"Sensor item gap","item_gap_help":"CSS length between sensors (default: 16px)","show_icons":"Show sensor icons","show_icons_help":"Show or hide the icon next to each sensor.","icon_size":"Sensor icon size","icon_size_help":"CSS length (default is responsive, maximum 36px).","show_separator":"Show sensor separator","show_separator_help":"Show or hide the line between sensors in horizontal mode.","separator_color":"Separator color","separator_color_help":"Empty uses the widget text color.","separator_opacity":"Separator opacity","separator_opacity_help":"Adjust the separator transparency."},"transportation":{"provider":"Transportation provider","max_departures":"Maximum departures per stop","departures":"{count} departures","display_mode":"Departure display","display_inline":"In card layout","display_modal":"Modal dialog","display_mode_help":"Choose where departures open after pressing the transportation action","auto_hide":"Auto-hide timeout","auto_hide_help":"Auto-hide timeout in minutes (1–10)","update_interval":"Update interval","update_help":"Update interval in minutes (minimum 1)","stops":"Stops","stop":"Stop {number}","stop_id":"Stop ID","post_id":"Post ID","stop_name":"Stop name (optional)","add_stop":"Add stop","remove_stop":"Remove stop","expand_stop":"Expand stop","collapse_stop":"Collapse stop","documentation":"Transportation configuration documentation","refresh_buttons":"Refresh button entities","refresh_button":"Refresh button entity","refresh_button_help":"This stop is activated when departures are opened","departure_entities":"Departure sensor entities","departure_entities_help":"Select the sensors in display order"},"actions":{"enable":"Enable action bar","description":"Configure action buttons displayed in this widget.","orientation":"Button orientation","orientation_help":"Auto uses a row in center zones and a column in side zones.","alignment":"Button alignment","alignment_help":"Align buttons to the left, center, or right","opacity":"Background opacity","opacity_help":"Adjust the action bar background transparency","button_background":"Circular button background","button_background_help":"Show or hide the translucent circle behind each action","button_gap":"Button gap","button_gap_help":"CSS length between buttons (default: 16px)","panel_padding":"Panel padding","panel_padding_help":"CSS padding inside the action bar (default: 16px)","title":"Actions","empty":"No actions configured yet.","action":"Action {number}","type":"Action type","select_type":"Select action type","button_title":"Title","title_help":"Title for the action button","icon":"Icon","icon_help":"Icon for the action button","add":"Add action","remove":"Remove action","expand":"Expand action","collapse":"Collapse action","move_up":"Move action up","move_down":"Move action down","types":{"weather_update":"Update weather","transportation":"Transportation","light_toggle":"Toggle light","action_navigate":"Navigate to page","background_next":"Next background","action_ha":"Home Assistant action","call_service":"Call service","switch_toggle":"Toggle switch","action_more_info":"Entity details"}},"action_plugin":{"entity":"Entity","entity_more_info_help":"Entity used by the more-info and toggle actions","tap_action":"Tap action","tap_help":"Standard Home Assistant action to run on tap","hold_action":"Hold action","hold_help":"Standard Home Assistant action to run on hold","double_action":"Double tap action","double_help":"Standard Home Assistant action to run on double tap","active_color":"Active color","active_color_help":"Color to use when the action is active","light_entity":"Light entity","light_help":"Select a light entity to toggle","switch_entity":"Switch entity","switch_help":"Select a switch entity to toggle","icon_on":"Icon (on state)","light_icon_help":"Icon to show when the light is on","switch_icon_help":"Icon to show when the switch is on","light_color_help":"Color to use when the light is on","switch_color_help":"Color to use when the switch is on","more_info_help":"Select an entity to show more information for","navigation_path":"Navigation path","navigation_help":"Path or URL to open","open_in":"Open in","current_tab":"Current tab","new_tab":"New tab","service":"Service","service_help":"Service to call, including data and target","confirmation":"Ask for confirmation","confirmation_help":"Show a confirmation dialog before calling the service","confirmation_text":"Confirmation text","confirmation_text_help":"Custom text for the confirmation dialog","weather_update_help":"This action triggers an immediate weather update. No additional configuration is needed."},"background":{"source":"Image source","opacity":"Background opacity","rotation":"Rotation interval (seconds)","fit":"Background image fit","images":"Background images","image":"Background image {number}","url":"Image URL","weather":"Weather condition","time":"Time of day","add":"Add background image","remove":"Remove background image","expand":"Expand background image","collapse":"Collapse background image","source_none":"None (no background images)","source_picsum":"Picsum photos","source_local":"Local images","source_sensor":"Sensor images","fit_fill":"Fill","fit_contain":"Contain","fit_cover":"Cover","fit_scale_down":"Scale down","local_help":"Configure local image URLs. Weather and time-of-day conditions can be selected for each image.","unsplash_help":"Configure Unsplash image source settings. An API key is required.","category":"Category","photo_count":"Number of photos","api_help":"Without a valid API key, the Unsplash image source will not work.","api_key":"API key","content_filter":"Content filter","sensor_entity":"Sensor entity","sensor_help":"Select a sensor whose files attribute contains an array of image URLs.","sensor_files_help":"The sensor must expose a files attribute containing image URLs."},"calendar":{"calendars":"Calendars","calendar":"Calendar {number}","entity":"Calendar entity","empty":"Add one or more Home Assistant calendar entities.","label":"Label (optional)","event_color":"Event color","add":"Add calendar","add_all":"Add all","remove":"Remove calendar","expand":"Expand calendar","collapse":"Collapse calendar","display":"Display","display_mode":"Display mode","agenda":"Agenda","today_only":"Today only","days_ahead":"Days ahead","maximum_events":"Maximum events","show_all_day":"Show all-day events","show_location":"Show location","show_description":"Show description","hide_past":"Hide past events today","hide_empty":"Hide when empty","update_interval":"Update interval","update_help":"Minutes (minimum 1)","event_background":"Event background","event_background_color":"Event background color","event_background_opacity":"Event background opacity","all_day":"All day","loading":"Loading calendar…","no_events":"No upcoming events.","when":"When","calendar_name":"Calendar","location":"Location","description":"Description","event":"Calendar event"},"separator":{"orientation":"Orientation","orientation_help":"Auto follows the direction of the hosting zone.","color":"Separator color","opacity":"Opacity","thickness":"Thickness","thickness_help":"CSS length, for example 1px or 0.15rem.","length":"Length","length_help":"CSS length or percentage, for example 100% or 240px."},"ha_card":{"description":"Embed a built-in or installed custom Home Assistant dashboard card.","card_type":"Card type","card_type_help":"Choose a card or enter its type, for example custom:mushroom-template-card.","choose_card":"Choose card","change_card":"Choose another card","edit_card":"Edit card in Home Assistant editor","dialog_title":"Embedded card settings","transparent":"Transparent card background","transparent_help":"Removes the standard HA card surface where the embedded card supports theme variables.","empty":"Choose a Home Assistant card in the widget editor.","loading":"Loading Home Assistant card…","recursion_error":"wall-clock-card cannot be embedded inside itself.","helpers_error":"Home Assistant card helpers are unavailable.","native_editor_unavailable":"The native Home Assistant card editor is unavailable in this view. Edit the complete card configuration below.","json_config":"Card configuration (JSON)","json_error":"The card configuration is not valid JSON.","json_type_error":"The card configuration must contain a type."}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","overcast_clouds":"Cielo nublado","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","light_snow":"Nieve ligera","mist":"Niebla","light_rain":"Lluvia ligera","moderate_rain":"Lluvia moderada","heavy_intensity_rain":"Lluvia intensa","sunny":"Soleado","clear_night":"Noche despejada","partlycloudy":"Parcialmente nublado","cloudy":"Nublado","rainy":"Lluvioso","snowy":"Nevado","fog":"Niebla","hail":"Granizo","windy":"Ventoso"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","overcast_clouds":"Täysin pilvinen","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","light_snow":"Kevyt lumisade","mist":"Sumu","light_rain":"Kevyt sade","moderate_rain":"Kohtalainen sade","heavy_intensity_rain":"Voimakas sade","sunny":"Aurinkoinen","clear_night":"Selkeä yö","partlycloudy":"Puolipilvinen","cloudy":"Pilvinen","rainy":"Sateinen","snowy":"Luminen","fog":"Sumu","hail":"Rae","windy":"Tuulinen"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","overcast_clouds":"Ciel couvert","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","light_snow":"Légère neige","mist":"Brouillard","light_rain":"Pluie légère","moderate_rain":"Pluie modérée","heavy_intensity_rain":"Pluie forte","sunny":"Ensoleillé","clear_night":"Nuit claire","partlycloudy":"Partiellement nuageux","cloudy":"Nuageux","rainy":"Pluvieux","snowy":"Neigeux","fog":"Brouillard","hail":"Grêle","windy":"Venteux"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","overcast_clouds":"Borult égbolt","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","light_snow":"Gyenge havazás","mist":"Köd","light_rain":"Gyenge eső","moderate_rain":"Mérsékelt eső","heavy_intensity_rain":"Erős eső","sunny":"Napos","clear_night":"Tiszta éjszaka","partlycloudy":"Részben felhős","cloudy":"Felhős","rainy":"Esős","snowy":"Havas","fog":"Köd","hail":"Jégeső","windy":"Szeles"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","overcast_clouds":"Cielo coperto","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","light_snow":"Neve leggera","mist":"Nebbia","light_rain":"Pioggia leggera","moderate_rain":"Pioggia moderata","heavy_intensity_rain":"Pioggia intensa","sunny":"Soleggiato","clear_night":"Notte serena","partlycloudy":"Parzialmente nuvoloso","cloudy":"Nuvoloso","rainy":"Piovoso","snowy":"Nevoso","fog":"Nebbia","hail":"Grandine","windy":"Ventoso"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","overcast_clouds":"Zwaar bewolkt","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","light_snow":"Lichte sneeuw","mist":"Mist","light_rain":"Lichte regen","moderate_rain":"Matige regen","heavy_intensity_rain":"Zware regen","sunny":"Zonnig","clear_night":"Heldere nacht","partlycloudy":"Half bewolkt","cloudy":"Bewolkt","rainy":"Regenachtig","snowy":"Sneeuwachtig","fog":"Mist","hail":"Hagel","windy":"Winderig"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","overcast_clouds":"Helt overskyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","light_snow":"Lett snø","mist":"Tåke","light_rain":"Lett regn","moderate_rain":"Moderat regn","heavy_intensity_rain":"Kraftig regn","sunny":"Solfylt","clear_night":"Klar natt","partlycloudy":"Delvis skyet","cloudy":"Overskyet","rainy":"Regnfullt","snowy":"Snøfylt","fog":"Tåke","hail":"Hagl","windy":"Vindfullt"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","overcast_clouds":"Całkowite zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","light_snow":"Lekki śnieg","mist":"Mgła","light_rain":"Lekki deszcz","moderate_rain":"Umiarkowany deszcz","heavy_intensity_rain":"Intensywny deszcz","sunny":"Słonecznie","clear_night":"Pogodna noc","partlycloudy":"Częściowe zachmurzenie","cloudy":"Pochmurno","rainy":"Deszczowo","snowy":"Śnieżnie","fog":"Mgła","hail":"Grad","windy":"Wietrznie"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","overcast_clouds":"Céu encoberto","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","light_snow":"Neve leve","mist":"Névoa","light_rain":"Chuva fraca","moderate_rain":"Chuva moderada","heavy_intensity_rain":"Chuva forte","sunny":"Ensolarado","clear_night":"Noite limpa","partlycloudy":"Parcialmente nublado","cloudy":"Nublado","rainy":"Chuvoso","snowy":"Nevado","fog":"Nevoeiro","hail":"Granizo","windy":"Ventoso"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","overcast_clouds":"Cer acoperit","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","light_snow":"Ninsoare ușoară","mist":"Ceață","light_rain":"Ploaie ușoară","moderate_rain":"Ploaie moderată","heavy_intensity_rain":"Ploaie puternică","sunny":"Însorit","clear_night":"Noapte senină","partlycloudy":"Parțial înnorat","cloudy":"Înnorat","rainy":"Ploios","snowy":"Înzăpezit","fog":"Ceață","hail":"Grindină","windy":"Vântos"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","overcast_clouds":"Пасмурно","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","light_snow":"Небольшой снег","mist":"Туман","light_rain":"Небольшой дождь","moderate_rain":"Умеренный дождь","heavy_intensity_rain":"Сильный дождь","sunny":"Солнечно","clear_night":"Ясная ночь","partlycloudy":"Переменная облачность","cloudy":"Облачно","rainy":"Дождливо","snowy":"Снежно","fog":"Туман","hail":"Град","windy":"Ветрено"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","overcast_clouds":"Zamračené","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","light_snow":"Slabé sneženie","mist":"Hmla","light_rain":"Slabý dážď","moderate_rain":"Mierny dážď","heavy_intensity_rain":"Silný dážď","sunny":"Slnečno","clear_night":"Jasná noc","partlycloudy":"Polojasno","cloudy":"Oblačno","rainy":"Daždivo","snowy":"Sneženie","fog":"Hmla","hail":"Krupobitie","windy":"Veterno"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","overcast_clouds":"Mulet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","light_snow":"Lätt snöfall","mist":"Dimma","light_rain":"Lätt regn","moderate_rain":"Måttligt regn","heavy_intensity_rain":"Kraftigt regn","sunny":"Soligt","clear_night":"Klar natt","partlycloudy":"Halvklart","cloudy":"Molnigt","rainy":"Regnigt","snowy":"Snöigt","fog":"Dimma","hail":"Hagel","windy":"Blåsigt"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Be=Object.fromEntries(We.map(e=>[e.code,e.translations]));let Ue={};function Ve(e,t){if(void 0!==e[t])return e[t];const i=t.split(".");let o=e;for(const e of i){if(null==o||"object"!=typeof o)return;o=o[e]}return o}function Ze(e,t,i=e){const o=Ke(t);let n=Ue[o];n||(Be[o]?(Ue[o]=Be[o],n=Ue[o],ze.debug(`Loaded translations for ${o} on-demand`)):n=Be.en);const a=Ve(n,e),r="en"===o?a:Ve(Be.en,e);return"string"==typeof a?ze.debug(`Translation found for key "${e}" in language "${o}": "${a}"`):ze.debug(`No translation found for key "${e}" in language "${o}", using English/default fallback`),"string"==typeof a?a:"string"==typeof r?r:null!==i?i:e}function Ke(e){const t=(e||"en").toLowerCase().split(/[-_]/)[0];return"cz"===t?"cs":"nb"===t||"nn"===t?"no":Je().includes(t)?t:"en"}function qe(e,t,i=e,o={}){var n;return Ze(e,"string"==typeof t?t:(null===(n=null==t?void 0:t.locale)||void 0===n?void 0:n.language)||(null==t?void 0:t.language)||"en",i).replace(/\{([^}]+)\}/g,(e,t)=>Object.prototype.hasOwnProperty.call(o,t)?String(o[t]):e)}function Je(){return We.map(e=>e.code)}function Ge(){return We.map(e=>({value:e.code,label:e.label}))}function Ye(e){const t=We.find(t=>t.code===Ke(e));return(null==t?void 0:t.locale)||"en-US"}function Xe(e,t,i={},o){const{showAmPm:n,...a}=i;if(a.custom)return function(e,t,i,o){const n=Ye(t),a={EEEE:"weekday",EEE:"weekday",MMMM:"month",MMM:"month",MM:"month",M:"month",dd:"day",d:"day",yyyy:"year",yy:"year",HH:"hour",H:"hour",mm:"minute",m:"minute",ss:"second",s:"second"},r={EEEE:new Intl.DateTimeFormat(n,{weekday:"long",timeZone:o}),EEE:new Intl.DateTimeFormat(n,{weekday:"short",timeZone:o}),MMMM:new Intl.DateTimeFormat(n,{month:"long",timeZone:o}),MMM:new Intl.DateTimeFormat(n,{month:"short",timeZone:o}),MM:new Intl.DateTimeFormat(n,{month:"2-digit",timeZone:o}),M:new Intl.DateTimeFormat(n,{month:"numeric",timeZone:o}),dd:new Intl.DateTimeFormat(n,{day:"2-digit",timeZone:o}),d:new Intl.DateTimeFormat(n,{day:"numeric",timeZone:o}),yyyy:new Intl.DateTimeFormat(n,{year:"numeric",timeZone:o}),yy:new Intl.DateTimeFormat(n,{year:"2-digit",timeZone:o}),HH:new Intl.DateTimeFormat(n,{hour:"2-digit",hour12:!1,timeZone:o}),H:new Intl.DateTimeFormat(n,{hour:"numeric",hour12:!1,timeZone:o}),mm:new Intl.DateTimeFormat(n,{minute:"2-digit",timeZone:o}),m:new Intl.DateTimeFormat(n,{minute:"numeric",timeZone:o}),ss:new Intl.DateTimeFormat(n,{second:"2-digit",timeZone:o}),s:new Intl.DateTimeFormat(n,{second:"numeric",timeZone:o})};return i.replace(/EEEE|EEE|MMMM|MMM|MM|M|dd|d|yyyy|yy|HH|H|mm|m|ss|s/g,t=>{var i;const o=a[t];return(null===(i=r[t].formatToParts(e).find(e=>e.type===o))||void 0===i?void 0:i.value)||""})}(e,t,a.custom,o);if(o&&(a.timeZone=o),"hidden"===a.weekday&&(a.weekday=void 0),"hidden"===a.year&&(a.year=void 0),"hidden"===a.month&&(a.month=void 0),"hidden"===a.day&&(a.day=void 0),void 0===a.weekday&&void 0===a.year&&void 0===a.month&&void 0===a.day)return"";const r=Ye(t);if("short"===a.month){const t=new Intl.DateTimeFormat(r,{month:"short",timeZone:o}).format(e),i={...a};delete i.month;let n=e.toLocaleDateString(r,i);return"2-digit"===a.day?(n=n.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${t}`),n.includes(t)||(n=`${n} ${t}`)):n=e.toLocaleDateString(r,a),n}return e.toLocaleDateString(r,a)}class Qe{constructor(e,t){this._readyResolve=null,this.host=e,this.logger=Se(t),e.addController(this),this.ready=new Promise(e=>{this._readyResolve=e})}hostConnected(){this.logger.debug("Host connected"),this._readyResolve&&(this._readyResolve(),this._readyResolve=null),this.onHostConnected()}hostDisconnected(){this.logger.debug("Host disconnected"),this.ready=new Promise(e=>{this._readyResolve=e}),this.onHostDisconnected()}}class et{constructor(){this.subscribers=new Map}static getInstance(){return et.instance||(et.instance=new et),et.instance}subscribe(e,t){this.subscribers.has(e)||this.subscribers.set(e,[]),this.subscribers.get(e).push(t)}unsubscribe(e,t){const i=this.subscribers.get(e);i&&this.subscribers.set(e,i.filter(e=>e!==t))}publish(e){const t=e.constructor;(this.subscribers.get(t)||[]).forEach(t=>t(e))}}class tt{constructor(e,t){this.componentName=e,this.state=t}}class it{constructor(e){this.weather=e}}class ot{constructor(){}}class nt{constructor(){}}class at{constructor(){}}class rt{constructor(){}}class st{constructor(){this.states=new Map}static getInstance(){return st.instance||(st.instance=new st),st.instance}isActive(e){return!0===this.states.get(e)}setActive(e,t){this.isActive(e)!==t&&(this.states.set(e,t),et.getInstance().publish(new tt(e,t)))}}var lt,ct,dt;!function(e){e.All="all",e.ClearSky="clear sky",e.Clouds="clouds",e.Rain="rain",e.Snow="snow",e.Mist="mist"}(lt||(lt={})),function(e){e.SunriseSunset="sunrise-sunset",e.Day="day",e.Night="night",e.Unspecified="unspecified"}(ct||(ct={})),function(e){e.Large="large",e.Medium="medium",e.Small="small",e.Custom="custom"}(dt||(dt={}));const ht={clockSize:{large:"18rem",medium:"16rem",small:"14rem"},dateSize:{large:"6rem",medium:"6rem",small:"4rem"},labelSize:{large:"1.8rem",medium:"1.2rem",small:"1.0rem"},valueSize:{large:"3rem",medium:"2rem",small:"1.5rem"},iconSize:{large:"84px",medium:"72px",small:"60px"},buttonSize:{large:"168px",medium:"144px",small:"120px"},forecastTempWidth:{large:"120px",medium:"80px",small:"70px"}};function ut(e,t,i){if(e===dt.Custom&&t)return t;const o=ht[i];return e===dt.Large?o.large:e===dt.Small?o.small:o.medium}class pt extends Qe{constructor(e,t={}){super(e,"background-image-controller"),this.backgroundImageManager=new He,this.currentWeather=Ee.All,this.messenger=et.getInstance(),this._currentImageUrl="",this._previousImageUrl="",this._fetchingImageUrls=!1,this.onWeather=e=>{this.logger.info("New message for weather:",e.weather),this.updateWeather(e.weather)},this.onFetchNextImage=e=>{this.logger.info("Fetch next image requested"),this.setupImageRotation(),this.fetchNewImageAsync(this.currentWeather)},this.fadeInKeyframes=[{opacity:0},{opacity:1}],this.fadeOutKeyframes=[{opacity:1},{opacity:0}],this.animationOptions={duration:1e3,fill:"forwards"},this.config=t}updateHass(e){this.hass=e,this.backgroundImageManager.setHass(e)}onHostConnected(){this.messenger.subscribe(it,this.onWeather),this.messenger.subscribe(rt,this.onFetchNextImage),this.config.imageSourceConfig&&this.initializeManagerAsync()}onHostDisconnected(){this.messenger.unsubscribe(it,this.onWeather),this.messenger.unsubscribe(rt,this.onFetchNextImage),this.imageRotationTimer&&(clearInterval(this.imageRotationTimer),this.imageRotationTimer=void 0)}updateConfig(e){const t={...this.config};this.config={...this.config,...e},ze.info("Update the BackgroundImageController with new configuration");const i=this.isInitialized;t.imageSourceConfig!==this.config.imageSourceConfig?this.initializeManagerAsync().then(()=>{i&&this.fetchNewImageAsync(this.currentWeather).catch(e=>this.logger.error("Error fetching image after reinitialization:",e))}).catch(e=>this.logger.error("Error during BackgroundImageManager initialization:",e)):t.backgroundRotationInterval!==this.config.backgroundRotationInterval&&this.backgroundImageManager&&this.setupImageRotation()}async initializeManagerAsync(){if(!this._fetchingImageUrls){this._fetchingImageUrls=!0;try{const{backgroundRotationInterval:e,...t}=this.config.imageSourceConfig||{},i=t.imageSourceId?t:{imageSourceId:"picsum"};this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${i.imageSourceId||"default"}`);const o=this.backgroundImageManager.initialize(i);if(o&&this.backgroundImageManager.setHass(this.hass),!o)return void this.logger.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation()}catch(e){this.logger.error("Error fetching image URLs:",e)}finally{this._fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const e=1e3*(this.config.backgroundRotationInterval||90);this.logger.info(`Setting up image rotation with interval: ${e/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync(this.currentWeather)}catch(e){this.logger.error("Error in image rotation interval:",e)}})()},e)}async fetchNewImageAsync(e){try{let t=e,i=function(){const e=(new Date).getHours();return e>=5&&e<9||e>=17&&e<21?Ae.SunriseSunset:e>=9&&e<17?Ae.Day:e>=21||e<5?Ae.Night:Ae.Unspecified}();const o=await this.backgroundImageManager.getNextImageUrlAsync(t,i);if(o){this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`);const e=new Image;e.onload=async()=>{this.logger.debug(`New image loaded successfully: ${o}`),this._currentImageUrl?this._previousImageUrl=this._currentImageUrl:this._previousImageUrl="",this._currentImageUrl=o,this.host.requestUpdate(),await this.host.updateComplete,await this.fireAnimate()},e.onerror=()=>{this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`)},e.src=o}else this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(e){this.logger.error("Error fetching new dynamic image:",e)}}async fireAnimate(){const e=function(e){const t=e;return t.shadowRoot?Array.from(t.shadowRoot.querySelectorAll(".background-image")):[]}(this.host);0!==e.length&&(1===e.length?e[0].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"}):(e[0].animate(this.fadeOutKeyframes,{...this.animationOptions,easing:"ease-out"}),e[1].animate(this.fadeInKeyframes,{...this.animationOptions,easing:"ease-in"})),this._previousImageUrl="")}updateWeather(e){this.isInitialized?this.currentWeather!==e&&(this.logger.info(`Updating weather condition to: ${e}`),this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after weather update:",e))):(this.logger.info("BackgroundImageController is not initialized yet, run init before updating weather"),this.initializeManagerAsync().then(()=>{this.currentWeather=e,this.fetchNewImageAsync(e).catch(e=>this.logger.error("Error fetching image after initialization:",e))}))}get isInitialized(){return""!==this._currentImageUrl&&void 0!==this.imageRotationTimer}get currentImageUrl(){return this._currentImageUrl}get previousImageUrl(){return this._previousImageUrl}}var gt=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let mt=class extends he{constructor(){super(),this.backgroundOpacity=.5,this.objectFit="cover",this.logger=Se("background-image-component"),this.backgroundImageController=new pt(this,{})}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}get controller(){return this.backgroundImageController}updated(e){var t;super.updated(e),e.has("config")&&(this.logger.debug("Property config changed, updating BackgroundImageController"),this.backgroundImageController.updateConfig(null!==(t=this.config)&&void 0!==t?t:{})),e.has("hass")&&this.backgroundImageController.updateHass(this.hass)}get currentImageUrl(){return this.backgroundImageController.currentImageUrl}get previousImageUrl(){return this.backgroundImageController.previousImageUrl}render(){const e=this.currentImageUrl,t=this.previousImageUrl,i=this.objectFit||"cover";return V`
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
        `}};var vt,ft,yt;function bt(){return(bt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e}).apply(this,arguments)}function wt(e){return e.substr(0,e.indexOf("."))}mt.styles=a`
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
    `,gt([ve({type:Number})],mt.prototype,"backgroundOpacity",void 0),gt([ve({type:String})],mt.prototype,"objectFit",void 0),gt([ve({type:Object})],mt.prototype,"config",void 0),gt([ve({type:Object})],mt.prototype,"hass",void 0),mt=gt([pe("ha-background-image")],mt),(yt=vt||(vt={})).language="language",yt.system="system",yt.comma_decimal="comma_decimal",yt.decimal_comma="decimal_comma",yt.space_comma="space_comma",yt.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ft||(ft={}));var _t=function(e,t){var i=bt({maximumFractionDigits:2},t);if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var o=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=o,i.maximumFractionDigits=o}return i},xt=["closed","locked","off"],$t=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(e,t,i,o){o=o||{},i=null==i?{}:i;var n=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,e.dispatchEvent(n),n}),kt=(new Set(["call-service","divider","section","weblink","cast","select"]),{alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"});function St(e,t){if(e in kt)return kt[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"mdi:bookmark"}}var Ct=function(e){$t(window,"haptic",e)},zt=function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),$t(window,"location-changed",{replace:i})},It=function(e,t,i,o){var n;"double_tap"===o&&i.double_tap_action?n=i.double_tap_action:"hold"===o&&i.hold_action?n=i.hold_action:"tap"===o&&i.tap_action&&(n=i.tap_action),function(e,t,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(Ct("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&$t(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&zt(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var o,n=wt(t),a="group"===n?"homeassistant":n;switch(n){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}e.callService(a,o,{entity_id:t})})(e,t,xt.includes(e.states[t].state))}(t,i.entity),Ct("success"));break;case"call-service":if(!o.service)return void Ct("failure");var n=o.service.split(".",2);t.callService(n[0],n[1],o.service_data,o.target),Ct("success");break;case"fire-dom-event":$t(e,"ll-custom",o)}}(e,t,i,n)};function At(e){return void 0!==e&&"none"!==e.action}var Et={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},Dt={binary_sensor:function(e,t){var i="off"===e;switch(null==t?void 0:t.attributes.device_class){case"battery":return i?"mdi:battery":"mdi:battery-outline";case"battery_charging":return i?"mdi:battery":"mdi:battery-charging";case"cold":return i?"mdi:thermometer":"mdi:snowflake";case"connectivity":return i?"mdi:server-network-off":"mdi:server-network";case"door":return i?"mdi:door-closed":"mdi:door-open";case"garage_door":return i?"mdi:garage":"mdi:garage-open";case"power":case"plug":return i?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return i?"mdi:check-circle":"mdi:alert-circle";case"smoke":return i?"mdi:check-circle":"mdi:smoke";case"heat":return i?"mdi:thermometer":"mdi:fire";case"light":return i?"mdi:brightness-5":"mdi:brightness-7";case"lock":return i?"mdi:lock":"mdi:lock-open";case"moisture":return i?"mdi:water-off":"mdi:water";case"motion":return i?"mdi:walk":"mdi:run";case"occupancy":case"presence":return i?"mdi:home-outline":"mdi:home";case"opening":return i?"mdi:square":"mdi:square-outline";case"running":return i?"mdi:stop":"mdi:play";case"sound":return i?"mdi:music-note-off":"mdi:music-note";case"update":return i?"mdi:package":"mdi:package-up";case"vibration":return i?"mdi:crop-portrait":"mdi:vibrate";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"mdi:garage-open":"mdi:garage";case"door":return t?"mdi:door-open":"mdi:door-closed";case"shutter":return t?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return t?"mdi:blinds-open":"mdi:blinds";case"window":return t?"mdi:window-open":"mdi:window-closed";default:return St("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Et)return Et[t];if("battery"===t){var i=Number(e.state);if(isNaN(i))return"mdi:battery-unknown";var o=10*Math.round(i/10);return o>=100?"mdi:battery":o<=0?"mdi:battery-alert":"hass:battery-"+o}var n=e.attributes.unit_of_measurement;return"°C"===n||"°F"===n?"mdi:thermometer":St("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?St("input_datetime"):"mdi:calendar":"mdi:clock"}},Pt=function(e){if(!e)return"mdi:bookmark";if(e.attributes.icon)return e.attributes.icon;var t=wt(e.entity_id);return t in Dt?Dt[t](e):St(t,e.state)},Ot=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};class Tt extends he{t(e,t,i={}){return qe(e,this.hass,null!=t?t:e,i)}updated(e){super.updated(e)}_handleFormValueChanged(e){if(e.stopPropagation(),!this.config)return;const t=JSON.parse(JSON.stringify(this.config));this.setPropertyByPath(t,e.detail.propertyName,e.detail.value),$t(this,"config-changed",{config:t})}setPropertyByPath(e,t,i){if(!t)return e;const o=t.split(".");let n=e;for(let e=0;e<o.length-1;e++){const t=o[e];if(t.includes("[")&&t.includes("]")){const e=t.substring(0,t.indexOf("[")),i=parseInt(t.substring(t.indexOf("[")+1,t.indexOf("]")),10);n[e]||(n[e]=[]),n[e][i]||(n[e][i]={}),n=n[e][i]}else n[t]||(n[t]={}),n=n[t]}return n[o[o.length-1]]=i,e}}function Nt(e,t,i){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var i=t.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function Ft(){return Ft=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i)({}).hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e},Ft.apply(null,arguments)}function Rt(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,o)}return i}function Mt(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?Rt(Object(i),!0).forEach(function(t){Nt(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Rt(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}function jt(e){return jt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},jt(e)}function Lt(e){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(e)}Ot([ve({type:Object})],Tt.prototype,"hass",void 0),Ot([ve({type:Object})],Tt.prototype,"config",void 0);var Ht=Lt(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Wt=Lt(/Edge/i),Bt=Lt(/firefox/i),Ut=Lt(/safari/i)&&!Lt(/chrome/i)&&!Lt(/android/i),Vt=Lt(/iP(ad|od|hone)/i),Zt=Lt(/chrome/i)&&Lt(/android/i),Kt={capture:!1,passive:!1};function qt(e,t,i){e.addEventListener(t,i,!Ht&&Kt)}function Jt(e,t,i){e.removeEventListener(t,i,!Ht&&Kt)}function Gt(e,t){if(t){if(">"===t[0]&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch(e){return!1}return!1}}function Yt(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function Xt(e,t,i,o){if(e){i=i||document;do{if(null!=t&&(">"===t[0]?e.parentNode===i&&Gt(e,t):Gt(e,t))||o&&e===i)return e;if(e===i)break}while(e=Yt(e))}return null}var Qt,ei=/\s+/g;function ti(e,t,i){if(e&&t)if(e.classList)e.classList[i?"add":"remove"](t);else{var o=(" "+e.className+" ").replace(ei," ").replace(" "+t+" "," ");e.className=(o+(i?" "+t:"")).replace(ei," ")}}function ii(e,t,i){var o=e&&e.style;if(o){if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(i=e.currentStyle),void 0===t?i:i[t];t in o||-1!==t.indexOf("webkit")||(t="-webkit-"+t),o[t]=i+("string"==typeof i?"":"px")}}function oi(e,t){var i="";if("string"==typeof e)i=e;else do{var o=ii(e,"transform");o&&"none"!==o&&(i=o+" "+i)}while(!t&&(e=e.parentNode));var n=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return n&&new n(i)}function ni(e,t,i){if(e){var o=e.getElementsByTagName(t),n=0,a=o.length;if(i)for(;n<a;n++)i(o[n],n);return o}return[]}function ai(){return document.scrollingElement||document.documentElement}function ri(e,t,i,o,n){if(e.getBoundingClientRect||e===window){var a,r,s,l,c,d,h;if(e!==window&&e.parentNode&&e!==ai()?(r=(a=e.getBoundingClientRect()).top,s=a.left,l=a.bottom,c=a.right,d=a.height,h=a.width):(r=0,s=0,l=window.innerHeight,c=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(t||i)&&e!==window&&(n=n||e.parentNode,!Ht))do{if(n&&n.getBoundingClientRect&&("none"!==ii(n,"transform")||i&&"static"!==ii(n,"position"))){var u=n.getBoundingClientRect();r-=u.top+parseInt(ii(n,"border-top-width")),s-=u.left+parseInt(ii(n,"border-left-width")),l=r+a.height,c=s+a.width;break}}while(n=n.parentNode);if(o&&e!==window){var p=oi(n||e),g=p&&p.a,m=p&&p.d;p&&(l=(r/=m)+(d/=m),c=(s/=g)+(h/=g))}return{top:r,left:s,bottom:l,right:c,width:h,height:d}}}function si(e,t,i){for(var o=ui(e,!0),n=ri(e)[t];o;){var a=ri(o)[i];if(!("top"===i||"left"===i?n>=a:n<=a))return o;if(o===ai())break;o=ui(o,!1)}return!1}function li(e,t,i,o){for(var n=0,a=0,r=e.children;a<r.length;){if("none"!==r[a].style.display&&r[a]!==vo.ghost&&(o||r[a]!==vo.dragged)&&Xt(r[a],i.draggable,e,!1)){if(n===t)return r[a];n++}a++}return null}function ci(e,t){for(var i=e.lastElementChild;i&&(i===vo.ghost||"none"===ii(i,"display")||t&&!Gt(i,t));)i=i.previousElementSibling;return i||null}function di(e,t){var i=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)"TEMPLATE"===e.nodeName.toUpperCase()||e===vo.clone||t&&!Gt(e,t)||i++;return i}function hi(e){var t=0,i=0,o=ai();if(e)do{var n=oi(e),a=n.a,r=n.d;t+=e.scrollLeft*a,i+=e.scrollTop*r}while(e!==o&&(e=e.parentNode));return[t,i]}function ui(e,t){if(!e||!e.getBoundingClientRect)return ai();var i=e,o=!1;do{if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var n=ii(i);if(i.clientWidth<i.scrollWidth&&("auto"==n.overflowX||"scroll"==n.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==n.overflowY||"scroll"==n.overflowY)){if(!i.getBoundingClientRect||i===document.body)return ai();if(o||t)return i;o=!0}}}while(i=i.parentNode);return ai()}function pi(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}function gi(e,t){return function(){if(!Qt){var i=arguments;1===i.length?e.call(this,i[0]):e.apply(this,i),Qt=setTimeout(function(){Qt=void 0},t)}}}function mi(e,t,i){e.scrollLeft+=t,e.scrollTop+=i}function vi(e){var t=window.Polymer,i=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):i?i(e).clone(!0)[0]:e.cloneNode(!0)}function fi(e,t,i){var o={};return Array.from(e.children).forEach(function(n){var a,r,s,l;if(Xt(n,t.draggable,e,!1)&&!n.animated&&n!==i){var c=ri(n);o.left=Math.min(null!==(a=o.left)&&void 0!==a?a:1/0,c.left),o.top=Math.min(null!==(r=o.top)&&void 0!==r?r:1/0,c.top),o.right=Math.max(null!==(s=o.right)&&void 0!==s?s:-1/0,c.right),o.bottom=Math.max(null!==(l=o.bottom)&&void 0!==l?l:-1/0,c.bottom)}}),o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}var yi="Sortable"+(new Date).getTime();var bi=[],wi={initializeByDefault:!0},_i={mount:function(e){for(var t in wi)wi.hasOwnProperty(t)&&!(t in e)&&(e[t]=wi[t]);bi.forEach(function(t){if(t.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),bi.push(e)},pluginEvent:function(e,t,i){var o=this;this.eventCanceled=!1,i.cancel=function(){o.eventCanceled=!0};var n=e+"Global";bi.forEach(function(o){t[o.pluginName]&&(t[o.pluginName][n]&&t[o.pluginName][n](Mt({sortable:t},i)),t.options[o.pluginName]&&t[o.pluginName][e]&&t[o.pluginName][e](Mt({sortable:t},i)))})},initializePlugins:function(e,t,i,o){for(var n in bi.forEach(function(o){var n=o.pluginName;if(e.options[n]||o.initializeByDefault){var a=new o(e,t,e.options);a.sortable=e,a.options=e.options,e[n]=a,Ft(i,a.defaults)}}),e.options)if(e.options.hasOwnProperty(n)){var a=this.modifyOption(e,n,e.options[n]);void 0!==a&&(e.options[n]=a)}},getEventProperties:function(e,t){var i={};return bi.forEach(function(o){"function"==typeof o.eventProperties&&Ft(i,o.eventProperties.call(t[o.pluginName],e))}),i},modifyOption:function(e,t,i){var o;return bi.forEach(function(n){e[n.pluginName]&&n.optionListeners&&"function"==typeof n.optionListeners[t]&&(o=n.optionListeners[t].call(e[n.pluginName],i))}),o}};var xi=["evt"],$i=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.evt,n=function(e,t){if(null==e)return{};var i,o,n=function(e,t){if(null==e)return{};var i={};for(var o in e)if({}.hasOwnProperty.call(e,o)){if(-1!==t.indexOf(o))continue;i[o]=e[o]}return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)i=a[o],-1===t.indexOf(i)&&{}.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}(i,xi);_i.pluginEvent.bind(vo)(e,t,Mt({dragEl:Si,parentEl:Ci,ghostEl:zi,rootEl:Ii,nextEl:Ai,lastDownEl:Ei,cloneEl:Di,cloneHidden:Pi,dragStarted:Vi,putSortable:Mi,activeSortable:vo.active,originalEvent:o,oldIndex:Oi,oldDraggableIndex:Ni,newIndex:Ti,newDraggableIndex:Fi,hideGhostForTarget:uo,unhideGhostForTarget:po,cloneNowHidden:function(){Pi=!0},cloneNowShown:function(){Pi=!1},dispatchSortableEvent:function(e){ki({sortable:t,name:e,originalEvent:o})}},n))};function ki(e){!function(e){var t=e.sortable,i=e.rootEl,o=e.name,n=e.targetEl,a=e.cloneEl,r=e.toEl,s=e.fromEl,l=e.oldIndex,c=e.newIndex,d=e.oldDraggableIndex,h=e.newDraggableIndex,u=e.originalEvent,p=e.putSortable,g=e.extraEventProperties;if(t=t||i&&i[yi]){var m,v=t.options,f="on"+o.charAt(0).toUpperCase()+o.substr(1);!window.CustomEvent||Ht||Wt?(m=document.createEvent("Event")).initEvent(o,!0,!0):m=new CustomEvent(o,{bubbles:!0,cancelable:!0}),m.to=r||i,m.from=s||i,m.item=n||i,m.clone=a,m.oldIndex=l,m.newIndex=c,m.oldDraggableIndex=d,m.newDraggableIndex=h,m.originalEvent=u,m.pullMode=p?p.lastPutMode:void 0;var y=Mt(Mt({},g),_i.getEventProperties(o,t));for(var b in y)m[b]=y[b];i&&i.dispatchEvent(m),v[f]&&v[f].call(t,m)}}(Mt({putSortable:Mi,cloneEl:Di,targetEl:Si,rootEl:Ii,oldIndex:Oi,oldDraggableIndex:Ni,newIndex:Ti,newDraggableIndex:Fi},e))}var Si,Ci,zi,Ii,Ai,Ei,Di,Pi,Oi,Ti,Ni,Fi,Ri,Mi,ji,Li,Hi,Wi,Bi,Ui,Vi,Zi,Ki,qi,Ji,Gi=!1,Yi=!1,Xi=[],Qi=!1,eo=!1,to=[],io=!1,oo=[],no="undefined"!=typeof document,ao=Vt,ro=Wt||Ht?"cssFloat":"float",so=no&&!Zt&&!Vt&&"draggable"in document.createElement("div"),lo=function(){if(no){if(Ht)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto","auto"===e.style.pointerEvents}}(),co=function(e,t){var i=ii(e),o=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),n=li(e,0,t),a=li(e,1,t),r=n&&ii(n),s=a&&ii(a),l=r&&parseInt(r.marginLeft)+parseInt(r.marginRight)+ri(n).width,c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+ri(a).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(n&&r.float&&"none"!==r.float){var d="left"===r.float?"left":"right";return!a||"both"!==s.clear&&s.clear!==d?"horizontal":"vertical"}return n&&("block"===r.display||"flex"===r.display||"table"===r.display||"grid"===r.display||l>=o&&"none"===i[ro]||a&&"none"===i[ro]&&l+c>o)?"vertical":"horizontal"},ho=function(e){function t(e,i){return function(o,n,a,r){var s=o.options.group.name&&n.options.group.name&&o.options.group.name===n.options.group.name;if(null==e&&(i||s))return!0;if(null==e||!1===e)return!1;if(i&&"clone"===e)return e;if("function"==typeof e)return t(e(o,n,a,r),i)(o,n,a,r);var l=(i?o:n).options.group.name;return!0===e||"string"==typeof e&&e===l||e.join&&e.indexOf(l)>-1}}var i={},o=e.group;o&&"object"==jt(o)||(o={name:o}),i.name=o.name,i.checkPull=t(o.pull,!0),i.checkPut=t(o.put),i.revertClone=o.revertClone,e.group=i},uo=function(){!lo&&zi&&ii(zi,"display","none")},po=function(){!lo&&zi&&ii(zi,"display","")};no&&!Zt&&document.addEventListener("click",function(e){if(Yi)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),Yi=!1,!1},!0);var go=function(e){if(Si){var t=function(e,t){var i;return Xi.some(function(o){var n=o[yi].options.emptyInsertThreshold;if(n&&!ci(o)){var a=ri(o),r=e>=a.left-n&&e<=a.right+n,s=t>=a.top-n&&t<=a.bottom+n;return r&&s?i=o:void 0}}),i}((e=e.touches?e.touches[0]:e).clientX,e.clientY);if(t){var i={};for(var o in e)e.hasOwnProperty(o)&&(i[o]=e[o]);i.target=i.rootEl=t,i.preventDefault=void 0,i.stopPropagation=void 0,t[yi]._onDragOver(i)}}},mo=function(e){Si&&Si.parentNode[yi]._isOutsideThisEl(e.target)};function vo(e,t){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=Ft({},t),e[yi]=this;var i,o,n={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return co(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==vo.supportPointer&&"PointerEvent"in window&&(!Ut||Vt),emptyInsertThreshold:5};for(var a in _i.initializePlugins(this,e,n),n)!(a in t)&&(t[a]=n[a]);for(var r in ho(t),this)"_"===r.charAt(0)&&"function"==typeof this[r]&&(this[r]=this[r].bind(this));this.nativeDraggable=!t.forceFallback&&so,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?qt(e,"pointerdown",this._onTapStart):(qt(e,"mousedown",this._onTapStart),qt(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(qt(e,"dragover",this),qt(e,"dragenter",this)),Xi.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),Ft(this,(o=[],{captureAnimationState:function(){o=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(e){if("none"!==ii(e,"display")&&e!==vo.ghost){o.push({target:e,rect:ri(e)});var t=Mt({},o[o.length-1].rect);if(e.thisAnimationDuration){var i=oi(e,!0);i&&(t.top-=i.f,t.left-=i.e)}e.fromRect=t}})},addAnimationState:function(e){o.push(e)},removeAnimationState:function(e){o.splice(function(e,t){for(var i in e)if(e.hasOwnProperty(i))for(var o in t)if(t.hasOwnProperty(o)&&t[o]===e[i][o])return Number(i);return-1}(o,{target:e}),1)},animateAll:function(e){var t=this;if(!this.options.animation)return clearTimeout(i),void("function"==typeof e&&e());var n=!1,a=0;o.forEach(function(e){var i=0,o=e.target,r=o.fromRect,s=ri(o),l=o.prevFromRect,c=o.prevToRect,d=e.rect,h=oi(o,!0);h&&(s.top-=h.f,s.left-=h.e),o.toRect=s,o.thisAnimationDuration&&pi(l,s)&&!pi(r,s)&&(d.top-s.top)/(d.left-s.left)===(r.top-s.top)/(r.left-s.left)&&(i=function(e,t,i,o){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-i.top,2)+Math.pow(t.left-i.left,2))*o.animation}(d,l,c,t.options)),pi(s,r)||(o.prevFromRect=r,o.prevToRect=s,i||(i=t.options.animation),t.animate(o,d,s,i)),i&&(n=!0,a=Math.max(a,i),clearTimeout(o.animationResetTimer),o.animationResetTimer=setTimeout(function(){o.animationTime=0,o.prevFromRect=null,o.fromRect=null,o.prevToRect=null,o.thisAnimationDuration=null},i),o.thisAnimationDuration=i)}),clearTimeout(i),n?i=setTimeout(function(){"function"==typeof e&&e()},a):"function"==typeof e&&e(),o=[]},animate:function(e,t,i,o){if(o){ii(e,"transition",""),ii(e,"transform","");var n=oi(this.el),a=n&&n.a,r=n&&n.d,s=(t.left-i.left)/(a||1),l=(t.top-i.top)/(r||1);e.animatingX=!!s,e.animatingY=!!l,ii(e,"transform","translate3d("+s+"px,"+l+"px,0)"),this.forRepaintDummy=function(e){return e.offsetWidth}(e),ii(e,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),ii(e,"transform","translate3d(0,0,0)"),"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=setTimeout(function(){ii(e,"transition",""),ii(e,"transform",""),e.animated=!1,e.animatingX=!1,e.animatingY=!1},o)}}}))}function fo(e,t,i,o,n,a,r,s){var l,c,d=e[yi],h=d.options.onMove;return!window.CustomEvent||Ht||Wt?(l=document.createEvent("Event")).initEvent("move",!0,!0):l=new CustomEvent("move",{bubbles:!0,cancelable:!0}),l.to=t,l.from=e,l.dragged=i,l.draggedRect=o,l.related=n||t,l.relatedRect=a||ri(t),l.willInsertAfter=s,l.originalEvent=r,e.dispatchEvent(l),h&&(c=h.call(d,l,r)),c}function yo(e){e.draggable=!1}function bo(){io=!1}function wo(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,i=t.length,o=0;i--;)o+=t.charCodeAt(i);return o.toString(36)}function _o(e){return setTimeout(e,0)}function xo(e){return clearTimeout(e)}vo.prototype={constructor:vo,_isOutsideThisEl:function(e){this.el.contains(e)||e===this.el||(Zi=null)},_getDirection:function(e,t){return"function"==typeof this.options.direction?this.options.direction.call(this,e,t,Si):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,i=this.el,o=this.options,n=o.preventOnFilter,a=e.type,r=e.touches&&e.touches[0]||e.pointerType&&"touch"===e.pointerType&&e,s=(r||e).target,l=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||s,c=o.filter;if(function(e){oo.length=0;for(var t=e.getElementsByTagName("input"),i=t.length;i--;){var o=t[i];o.checked&&oo.push(o)}}(i),!Si&&!(/mousedown|pointerdown/.test(a)&&0!==e.button||o.disabled)&&!l.isContentEditable&&(this.nativeDraggable||!Ut||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=Xt(s,o.draggable,i,!1))&&s.animated||Ei===s)){if(Oi=di(s),Ni=di(s,o.draggable),"function"==typeof c){if(c.call(this,e,s,this))return ki({sortable:t,rootEl:l,name:"filter",targetEl:s,toEl:i,fromEl:i}),$i("filter",t,{evt:e}),void(n&&e.preventDefault())}else if(c&&(c=c.split(",").some(function(o){if(o=Xt(l,o.trim(),i,!1))return ki({sortable:t,rootEl:o,name:"filter",targetEl:s,fromEl:i,toEl:i}),$i("filter",t,{evt:e}),!0})))return void(n&&e.preventDefault());o.handle&&!Xt(l,o.handle,i,!1)||this._prepareDragStart(e,r,s)}}},_prepareDragStart:function(e,t,i){var o,n=this,a=n.el,r=n.options,s=a.ownerDocument;if(i&&!Si&&i.parentNode===a){var l=ri(i);if(Ii=a,Ci=(Si=i).parentNode,Ai=Si.nextSibling,Ei=i,Ri=r.group,vo.dragged=Si,ji={target:Si,clientX:(t||e).clientX,clientY:(t||e).clientY},Bi=ji.clientX-l.left,Ui=ji.clientY-l.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,Si.style["will-change"]="all",o=function(){$i("delayEnded",n,{evt:e}),vo.eventCanceled?n._onDrop():(n._disableDelayedDragEvents(),!Bt&&n.nativeDraggable&&(Si.draggable=!0),n._triggerDragStart(e,t),ki({sortable:n,name:"choose",originalEvent:e}),ti(Si,r.chosenClass,!0))},r.ignore.split(",").forEach(function(e){ni(Si,e.trim(),yo)}),qt(s,"dragover",go),qt(s,"mousemove",go),qt(s,"touchmove",go),r.supportPointer?(qt(s,"pointerup",n._onDrop),!this.nativeDraggable&&qt(s,"pointercancel",n._onDrop)):(qt(s,"mouseup",n._onDrop),qt(s,"touchend",n._onDrop),qt(s,"touchcancel",n._onDrop)),Bt&&this.nativeDraggable&&(this.options.touchStartThreshold=4,Si.draggable=!0),$i("delayStart",this,{evt:e}),!r.delay||r.delayOnTouchOnly&&!t||this.nativeDraggable&&(Wt||Ht))o();else{if(vo.eventCanceled)return void this._onDrop();r.supportPointer?(qt(s,"pointerup",n._disableDelayedDrag),qt(s,"pointercancel",n._disableDelayedDrag)):(qt(s,"mouseup",n._disableDelayedDrag),qt(s,"touchend",n._disableDelayedDrag),qt(s,"touchcancel",n._disableDelayedDrag)),qt(s,"mousemove",n._delayedDragTouchMoveHandler),qt(s,"touchmove",n._delayedDragTouchMoveHandler),r.supportPointer&&qt(s,"pointermove",n._delayedDragTouchMoveHandler),n._dragStartTimer=setTimeout(o,r.delay)}}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){Si&&yo(Si),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;Jt(e,"mouseup",this._disableDelayedDrag),Jt(e,"touchend",this._disableDelayedDrag),Jt(e,"touchcancel",this._disableDelayedDrag),Jt(e,"pointerup",this._disableDelayedDrag),Jt(e,"pointercancel",this._disableDelayedDrag),Jt(e,"mousemove",this._delayedDragTouchMoveHandler),Jt(e,"touchmove",this._delayedDragTouchMoveHandler),Jt(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||"touch"==e.pointerType&&e,!this.nativeDraggable||t?this.options.supportPointer?qt(document,"pointermove",this._onTouchMove):qt(document,t?"touchmove":"mousemove",this._onTouchMove):(qt(Si,"dragend",this),qt(Ii,"dragstart",this._onDragStart));try{document.selection?_o(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch(e){}},_dragStarted:function(e,t){if(Gi=!1,Ii&&Si){$i("dragStarted",this,{evt:t}),this.nativeDraggable&&qt(document,"dragover",mo);var i=this.options;!e&&ti(Si,i.dragClass,!1),ti(Si,i.ghostClass,!0),vo.active=this,e&&this._appendGhost(),ki({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(Li){this._lastX=Li.clientX,this._lastY=Li.clientY,uo();for(var e=document.elementFromPoint(Li.clientX,Li.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(Li.clientX,Li.clientY))!==t;)t=e;if(Si.parentNode[yi]._isOutsideThisEl(e),t)do{if(t[yi]&&t[yi]._onDragOver({clientX:Li.clientX,clientY:Li.clientY,target:e,rootEl:t})&&!this.options.dragoverBubble)break;e=t}while(t=Yt(t));po()}},_onTouchMove:function(e){if(ji){var t=this.options,i=t.fallbackTolerance,o=t.fallbackOffset,n=e.touches?e.touches[0]:e,a=zi&&oi(zi,!0),r=zi&&a&&a.a,s=zi&&a&&a.d,l=ao&&Ji&&hi(Ji),c=(n.clientX-ji.clientX+o.x)/(r||1)+(l?l[0]-to[0]:0)/(r||1),d=(n.clientY-ji.clientY+o.y)/(s||1)+(l?l[1]-to[1]:0)/(s||1);if(!vo.active&&!Gi){if(i&&Math.max(Math.abs(n.clientX-this._lastX),Math.abs(n.clientY-this._lastY))<i)return;this._onDragStart(e,!0)}if(zi){a?(a.e+=c-(Hi||0),a.f+=d-(Wi||0)):a={a:1,b:0,c:0,d:1,e:c,f:d};var h="matrix(".concat(a.a,",").concat(a.b,",").concat(a.c,",").concat(a.d,",").concat(a.e,",").concat(a.f,")");ii(zi,"webkitTransform",h),ii(zi,"mozTransform",h),ii(zi,"msTransform",h),ii(zi,"transform",h),Hi=c,Wi=d,Li=n}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!zi){var e=this.options.fallbackOnBody?document.body:Ii,t=ri(Si,!0,ao,!0,e),i=this.options;if(ao){for(Ji=e;"static"===ii(Ji,"position")&&"none"===ii(Ji,"transform")&&Ji!==document;)Ji=Ji.parentNode;Ji!==document.body&&Ji!==document.documentElement?(Ji===document&&(Ji=ai()),t.top+=Ji.scrollTop,t.left+=Ji.scrollLeft):Ji=ai(),to=hi(Ji)}ti(zi=Si.cloneNode(!0),i.ghostClass,!1),ti(zi,i.fallbackClass,!0),ti(zi,i.dragClass,!0),ii(zi,"transition",""),ii(zi,"transform",""),ii(zi,"box-sizing","border-box"),ii(zi,"margin",0),ii(zi,"top",t.top),ii(zi,"left",t.left),ii(zi,"width",t.width),ii(zi,"height",t.height),ii(zi,"opacity","0.8"),ii(zi,"position",ao?"absolute":"fixed"),ii(zi,"zIndex","100000"),ii(zi,"pointerEvents","none"),vo.ghost=zi,e.appendChild(zi),ii(zi,"transform-origin",Bi/parseInt(zi.style.width)*100+"% "+Ui/parseInt(zi.style.height)*100+"%")}},_onDragStart:function(e,t){var i=this,o=e.dataTransfer,n=i.options;$i("dragStart",this,{evt:e}),vo.eventCanceled?this._onDrop():($i("setupClone",this),vo.eventCanceled||((Di=vi(Si)).removeAttribute("id"),Di.draggable=!1,Di.style["will-change"]="",this._hideClone(),ti(Di,this.options.chosenClass,!1),vo.clone=Di),i.cloneId=_o(function(){$i("clone",i),vo.eventCanceled||(i.options.removeCloneOnHide||Ii.insertBefore(Di,Si),i._hideClone(),ki({sortable:i,name:"clone"}))}),!t&&ti(Si,n.dragClass,!0),t?(Yi=!0,i._loopId=setInterval(i._emulateDragOver,50)):(Jt(document,"mouseup",i._onDrop),Jt(document,"touchend",i._onDrop),Jt(document,"touchcancel",i._onDrop),o&&(o.effectAllowed="move",n.setData&&n.setData.call(i,o,Si)),qt(document,"drop",i),ii(Si,"transform","translateZ(0)")),Gi=!0,i._dragStartId=_o(i._dragStarted.bind(i,t,e)),qt(document,"selectstart",i),Vi=!0,window.getSelection().removeAllRanges(),Ut&&ii(document.body,"user-select","none"))},_onDragOver:function(e){var t,i,o,n,a=this.el,r=e.target,s=this.options,l=s.group,c=vo.active,d=Ri===l,h=s.sort,u=Mi||c,p=this,g=!1;if(!io){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),r=Xt(r,s.draggable,a,!0),A("dragOver"),vo.eventCanceled)return g;if(Si.contains(e.target)||r.animated&&r.animatingX&&r.animatingY||p._ignoreWhileAnimating===r)return D(!1);if(Yi=!1,c&&!s.disabled&&(d?h||(o=Ci!==Ii):Mi===this||(this.lastPutMode=Ri.checkPull(this,c,Si,e))&&l.checkPut(this,c,Si,e))){if(n="vertical"===this._getDirection(e,r),t=ri(Si),A("dragOverValid"),vo.eventCanceled)return g;if(o)return Ci=Ii,E(),this._hideClone(),A("revert"),vo.eventCanceled||(Ai?Ii.insertBefore(Si,Ai):Ii.appendChild(Si)),D(!0);var m=ci(a,s.draggable);if(!m||function(e,t,i){var o=ri(ci(i.el,i.options.draggable)),n=fi(i.el,i.options,zi);return t?e.clientX>n.right+10||e.clientY>o.bottom&&e.clientX>o.left:e.clientY>n.bottom+10||e.clientX>o.right&&e.clientY>o.top}(e,n,this)&&!m.animated){if(m===Si)return D(!1);if(m&&a===e.target&&(r=m),r&&(i=ri(r)),!1!==fo(Ii,a,Si,t,r,i,e,!!r))return E(),m&&m.nextSibling?a.insertBefore(Si,m.nextSibling):a.appendChild(Si),Ci=a,P(),D(!0)}else if(m&&function(e,t,i){var o=ri(li(i.el,0,i.options,!0)),n=fi(i.el,i.options,zi);return t?e.clientX<n.left-10||e.clientY<o.top&&e.clientX<o.right:e.clientY<n.top-10||e.clientY<o.bottom&&e.clientX<o.left}(e,n,this)){var v=li(a,0,s,!0);if(v===Si)return D(!1);if(i=ri(r=v),!1!==fo(Ii,a,Si,t,r,i,e,!1))return E(),a.insertBefore(Si,v),Ci=a,P(),D(!0)}else if(r.parentNode===a){i=ri(r);var f,y,b,w=Si.parentNode!==a,_=!function(e,t,i){var o=i?e.left:e.top,n=i?e.right:e.bottom,a=i?e.width:e.height,r=i?t.left:t.top,s=i?t.right:t.bottom,l=i?t.width:t.height;return o===r||n===s||o+a/2===r+l/2}(Si.animated&&Si.toRect||t,r.animated&&r.toRect||i,n),x=n?"top":"left",$=si(r,"top","top")||si(Si,"top","top"),k=$?$.scrollTop:void 0;if(Zi!==r&&(y=i[x],Qi=!1,eo=!_&&s.invertSwap||w),f=function(e,t,i,o,n,a,r,s){var l=o?e.clientY:e.clientX,c=o?i.height:i.width,d=o?i.top:i.left,h=o?i.bottom:i.right,u=!1;if(!r)if(s&&qi<c*n){if(!Qi&&(1===Ki?l>d+c*a/2:l<h-c*a/2)&&(Qi=!0),Qi)u=!0;else if(1===Ki?l<d+qi:l>h-qi)return-Ki}else if(l>d+c*(1-n)/2&&l<h-c*(1-n)/2)return function(e){return di(Si)<di(e)?1:-1}(t);return(u=u||r)&&(l<d+c*a/2||l>h-c*a/2)?l>d+c/2?1:-1:0}(e,r,i,n,_?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,eo,Zi===r),0!==f){var S=di(Si);do{S-=f,b=Ci.children[S]}while(b&&("none"===ii(b,"display")||b===zi))}if(0===f||b===r)return D(!1);Zi=r,Ki=f;var C=r.nextElementSibling,z=!1,I=fo(Ii,a,Si,t,r,i,e,z=1===f);if(!1!==I)return 1!==I&&-1!==I||(z=1===I),io=!0,setTimeout(bo,30),E(),z&&!C?a.appendChild(Si):r.parentNode.insertBefore(Si,z?C:r),$&&mi($,0,k-$.scrollTop),Ci=Si.parentNode,void 0===y||eo||(qi=Math.abs(y-ri(r)[x])),P(),D(!0)}if(a.contains(Si))return D(!1)}return!1}function A(s,l){$i(s,p,Mt({evt:e,isOwner:d,axis:n?"vertical":"horizontal",revert:o,dragRect:t,targetRect:i,canSort:h,fromSortable:u,target:r,completed:D,onMove:function(i,o){return fo(Ii,a,Si,t,i,ri(i),e,o)},changed:P},l))}function E(){A("dragOverAnimationCapture"),p.captureAnimationState(),p!==u&&u.captureAnimationState()}function D(t){return A("dragOverCompleted",{insertion:t}),t&&(d?c._hideClone():c._showClone(p),p!==u&&(ti(Si,Mi?Mi.options.ghostClass:c.options.ghostClass,!1),ti(Si,s.ghostClass,!0)),Mi!==p&&p!==vo.active?Mi=p:p===vo.active&&Mi&&(Mi=null),u===p&&(p._ignoreWhileAnimating=r),p.animateAll(function(){A("dragOverAnimationComplete"),p._ignoreWhileAnimating=null}),p!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(r===Si&&!Si.animated||r===a&&!r.animated)&&(Zi=null),s.dragoverBubble||e.rootEl||r===document||(Si.parentNode[yi]._isOutsideThisEl(e.target),!t&&go(e)),!s.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),g=!0}function P(){Ti=di(Si),Fi=di(Si,s.draggable),ki({sortable:p,name:"change",toEl:a,newIndex:Ti,newDraggableIndex:Fi,originalEvent:e})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){Jt(document,"mousemove",this._onTouchMove),Jt(document,"touchmove",this._onTouchMove),Jt(document,"pointermove",this._onTouchMove),Jt(document,"dragover",go),Jt(document,"mousemove",go),Jt(document,"touchmove",go)},_offUpEvents:function(){var e=this.el.ownerDocument;Jt(e,"mouseup",this._onDrop),Jt(e,"touchend",this._onDrop),Jt(e,"pointerup",this._onDrop),Jt(e,"pointercancel",this._onDrop),Jt(e,"touchcancel",this._onDrop),Jt(document,"selectstart",this)},_onDrop:function(e){var t=this.el,i=this.options;Ti=di(Si),Fi=di(Si,i.draggable),$i("drop",this,{evt:e}),Ci=Si&&Si.parentNode,Ti=di(Si),Fi=di(Si,i.draggable),vo.eventCanceled||(Gi=!1,eo=!1,Qi=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),xo(this.cloneId),xo(this._dragStartId),this.nativeDraggable&&(Jt(document,"drop",this),Jt(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),Ut&&ii(document.body,"user-select",""),ii(Si,"transform",""),e&&(Vi&&(e.cancelable&&e.preventDefault(),!i.dropBubble&&e.stopPropagation()),zi&&zi.parentNode&&zi.parentNode.removeChild(zi),(Ii===Ci||Mi&&"clone"!==Mi.lastPutMode)&&Di&&Di.parentNode&&Di.parentNode.removeChild(Di),Si&&(this.nativeDraggable&&Jt(Si,"dragend",this),yo(Si),Si.style["will-change"]="",Vi&&!Gi&&ti(Si,Mi?Mi.options.ghostClass:this.options.ghostClass,!1),ti(Si,this.options.chosenClass,!1),ki({sortable:this,name:"unchoose",toEl:Ci,newIndex:null,newDraggableIndex:null,originalEvent:e}),Ii!==Ci?(Ti>=0&&(ki({rootEl:Ci,name:"add",toEl:Ci,fromEl:Ii,originalEvent:e}),ki({sortable:this,name:"remove",toEl:Ci,originalEvent:e}),ki({rootEl:Ci,name:"sort",toEl:Ci,fromEl:Ii,originalEvent:e}),ki({sortable:this,name:"sort",toEl:Ci,originalEvent:e})),Mi&&Mi.save()):Ti!==Oi&&Ti>=0&&(ki({sortable:this,name:"update",toEl:Ci,originalEvent:e}),ki({sortable:this,name:"sort",toEl:Ci,originalEvent:e})),vo.active&&(null!=Ti&&-1!==Ti||(Ti=Oi,Fi=Ni),ki({sortable:this,name:"end",toEl:Ci,originalEvent:e}),this.save())))),this._nulling()},_nulling:function(){$i("nulling",this),Ii=Si=Ci=zi=Ai=Di=Ei=Pi=ji=Li=Vi=Ti=Fi=Oi=Ni=Zi=Ki=Mi=Ri=vo.dragged=vo.ghost=vo.clone=vo.active=null;var e=this.el;oo.forEach(function(t){e.contains(t)&&(t.checked=!0)}),oo.length=Hi=Wi=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":Si&&(this._onDragOver(e),function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}(e));break;case"selectstart":e.preventDefault()}},toArray:function(){for(var e,t=[],i=this.el.children,o=0,n=i.length,a=this.options;o<n;o++)Xt(e=i[o],a.draggable,this.el,!1)&&t.push(e.getAttribute(a.dataIdAttr)||wo(e));return t},sort:function(e,t){var i={},o=this.el;this.toArray().forEach(function(e,t){var n=o.children[t];Xt(n,this.options.draggable,o,!1)&&(i[e]=n)},this),t&&this.captureAnimationState(),e.forEach(function(e){i[e]&&(o.removeChild(i[e]),o.appendChild(i[e]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return Xt(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var i=this.options;if(void 0===t)return i[e];var o=_i.modifyOption(this,e,t);i[e]=void 0!==o?o:t,"group"===e&&ho(i)},destroy:function(){$i("destroy",this);var e=this.el;e[yi]=null,Jt(e,"mousedown",this._onTapStart),Jt(e,"touchstart",this._onTapStart),Jt(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(Jt(e,"dragover",this),Jt(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Xi.splice(Xi.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!Pi){if($i("hideClone",this),vo.eventCanceled)return;ii(Di,"display","none"),this.options.removeCloneOnHide&&Di.parentNode&&Di.parentNode.removeChild(Di),Pi=!0}},_showClone:function(e){if("clone"===e.lastPutMode){if(Pi){if($i("showClone",this),vo.eventCanceled)return;Si.parentNode!=Ii||this.options.group.revertClone?Ai?Ii.insertBefore(Di,Ai):Ii.appendChild(Di):Ii.insertBefore(Di,Si),this.options.group.revertClone&&this.animate(Si,Di),ii(Di,"display",""),Pi=!1}}else this._hideClone()}},no&&qt(document,"touchmove",function(e){(vo.active||Gi)&&e.cancelable&&e.preventDefault()}),vo.utils={on:qt,off:Jt,css:ii,find:ni,is:function(e,t){return!!Xt(e,t,e,!1)},extend:function(e,t){if(e&&t)for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e},throttle:gi,closest:Xt,toggleClass:ti,clone:vi,index:di,nextTick:_o,cancelNextTick:xo,detectDirection:co,getChild:li,expando:yi},vo.get=function(e){return e[yi]},vo.mount=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t[0].constructor===Array&&(t=t[0]),t.forEach(function(e){if(!e.prototype||!e.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));e.utils&&(vo.utils=Mt(Mt({},vo.utils),e.utils)),_i.mount(e)})},vo.create=function(e,t){return new vo(e,t)},vo.version="1.15.7";var $o,ko,So,Co,zo,Io,Ao=[],Eo=!1;function Do(){Ao.forEach(function(e){clearInterval(e.pid)}),Ao=[]}function Po(){clearInterval(Io)}var Oo=gi(function(e,t,i,o){if(t.scroll){var n,a=(e.touches?e.touches[0]:e).clientX,r=(e.touches?e.touches[0]:e).clientY,s=t.scrollSensitivity,l=t.scrollSpeed,c=ai(),d=!1;ko!==i&&(ko=i,Do(),$o=t.scroll,n=t.scrollFn,!0===$o&&($o=ui(i,!0)));var h=0,u=$o;do{var p=u,g=ri(p),m=g.top,v=g.bottom,f=g.left,y=g.right,b=g.width,w=g.height,_=void 0,x=void 0,$=p.scrollWidth,k=p.scrollHeight,S=ii(p),C=p.scrollLeft,z=p.scrollTop;p===c?(_=b<$&&("auto"===S.overflowX||"scroll"===S.overflowX||"visible"===S.overflowX),x=w<k&&("auto"===S.overflowY||"scroll"===S.overflowY||"visible"===S.overflowY)):(_=b<$&&("auto"===S.overflowX||"scroll"===S.overflowX),x=w<k&&("auto"===S.overflowY||"scroll"===S.overflowY));var I=_&&(Math.abs(y-a)<=s&&C+b<$)-(Math.abs(f-a)<=s&&!!C),A=x&&(Math.abs(v-r)<=s&&z+w<k)-(Math.abs(m-r)<=s&&!!z);if(!Ao[h])for(var E=0;E<=h;E++)Ao[E]||(Ao[E]={});Ao[h].vx==I&&Ao[h].vy==A&&Ao[h].el===p||(Ao[h].el=p,Ao[h].vx=I,Ao[h].vy=A,clearInterval(Ao[h].pid),0==I&&0==A||(d=!0,Ao[h].pid=setInterval(function(){o&&0===this.layer&&vo.active._onTouchMove(zo);var t=Ao[this.layer].vy?Ao[this.layer].vy*l:0,i=Ao[this.layer].vx?Ao[this.layer].vx*l:0;"function"==typeof n&&"continue"!==n.call(vo.dragged.parentNode[yi],i,t,e,zo,Ao[this.layer].el)||mi(Ao[this.layer].el,i,t)}.bind({layer:h}),24))),h++}while(t.bubbleScroll&&u!==c&&(u=ui(u,!1)));Eo=d}},30),To=function(e){var t=e.originalEvent,i=e.putSortable,o=e.dragEl,n=e.activeSortable,a=e.dispatchSortableEvent,r=e.hideGhostForTarget,s=e.unhideGhostForTarget;if(t){var l=i||n;r();var c=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,d=document.elementFromPoint(c.clientX,c.clientY);s(),l&&!l.el.contains(d)&&(a("spill"),this.onSpill({dragEl:o,putSortable:i}))}};function No(){}function Fo(){}No.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,i=e.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var o=li(this.sortable.el,this.startIndex,this.options);o?this.sortable.el.insertBefore(t,o):this.sortable.el.appendChild(t),this.sortable.animateAll(),i&&i.animateAll()},drop:To},Ft(No,{pluginName:"revertOnSpill"}),Fo.prototype={onSpill:function(e){var t=e.dragEl,i=e.putSortable||this.sortable;i.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),i.animateAll()},drop:To},Ft(Fo,{pluginName:"removeOnSpill"}),vo.mount(new function(){function e(){for(var e in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}return e.prototype={dragStarted:function(e){var t=e.originalEvent;this.sortable.nativeDraggable?qt(document,"dragover",this._handleAutoScroll):this.options.supportPointer?qt(document,"pointermove",this._handleFallbackAutoScroll):t.touches?qt(document,"touchmove",this._handleFallbackAutoScroll):qt(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(e){var t=e.originalEvent;this.options.dragOverBubble||t.rootEl||this._handleAutoScroll(t)},drop:function(){this.sortable.nativeDraggable?Jt(document,"dragover",this._handleAutoScroll):(Jt(document,"pointermove",this._handleFallbackAutoScroll),Jt(document,"touchmove",this._handleFallbackAutoScroll),Jt(document,"mousemove",this._handleFallbackAutoScroll)),Po(),Do(),clearTimeout(Qt),Qt=void 0},nulling:function(){zo=ko=$o=Eo=Io=So=Co=null,Ao.length=0},_handleFallbackAutoScroll:function(e){this._handleAutoScroll(e,!0)},_handleAutoScroll:function(e,t){var i=this,o=(e.touches?e.touches[0]:e).clientX,n=(e.touches?e.touches[0]:e).clientY,a=document.elementFromPoint(o,n);if(zo=e,t||this.options.forceAutoScrollFallback||Wt||Ht||Ut){Oo(e,this.options,a,t);var r=ui(a,!0);!Eo||Io&&o===So&&n===Co||(Io&&Po(),Io=setInterval(function(){var a=ui(document.elementFromPoint(o,n),!0);a!==r&&(r=a,Do()),Oo(e,i.options,a,t)},10),So=o,Co=n)}else{if(!this.options.bubbleScroll||ui(a,!0)===ai())return void Do();Oo(e,this.options,ui(a,!1),!1)}}},Ft(e,{pluginName:"scroll",initializeByDefault:!0})}),vo.mount(Fo,No);const Ro=vo;function Mo(e,t,i){if(t===i||t<0||i<0||t>=e.length||i>=e.length)return[...e];const o=[...e],[n]=o.splice(t,1);return o.splice(i,0,n),o}function jo(e,t,i){return null===e?null:e===t?i:t<e&&e<=i?e-1:i<=e&&e<t?e+1:e}class Lo{constructor(e,t){this.host=e,this.options=t,this.setupRevision=0}schedule(){const e=++this.setupRevision;this.host.updateComplete.then(()=>{requestAnimationFrame(()=>{var t;if(e!==this.setupRevision||!this.host.isConnected)return;const i=null===(t=this.host.shadowRoot)||void 0===t?void 0:t.querySelector(this.options.containerSelector);i===this.element&&this.sortable||this.rebuild(null!=i?i:void 0)})})}disconnect(){this.setupRevision+=1,this.destroy()}destroy(){var e;null===(e=this.sortable)||void 0===e||e.destroy(),this.sortable=void 0,this.element=void 0,this.dragOrigin=void 0}rebuild(e){var t,i,o;this.destroy(),e&&(this.sortable=new Ro(e,{animation:150,draggable:null!==(t=this.options.draggable)&&void 0!==t?t:".sortable-item",handle:null!==(i=this.options.handle)&&void 0!==i?i:".sortable-drag-handle",ghostClass:null!==(o=this.options.ghostClass)&&void 0!==o?o:"sortable-list-ghost",onStart:e=>{this.dragOrigin={parent:e.from,next:e.item.nextSibling}},onEnd:e=>this.handleEnd(e)}),this.element=e)}handleEnd(e){const t=this.dragOrigin;this.dragOrigin=void 0,t&&t.parent.insertBefore(e.item,t.next),null!=e.oldIndex&&null!=e.newIndex&&e.oldIndex!==e.newIndex&&this.options.onMove(e.oldIndex,e.newIndex)}}var Ho;!function(e){e.Auto="auto",e.Left="left",e.Center="center",e.Right="right"}(Ho||(Ho={}));class Wo{constructor(){this.handlers=new Map}static getInstance(){return Wo.instance||(Wo.instance=new Wo),Wo.instance}registerHandler(e,t){this.handlers.set(e,t)}getHandler(e){return this.handlers.get(e)}}class Bo extends Qe{constructor(e,t={}){super(e,"action-bar-controller"),this.config={},this.config=t,this.registry=Wo.getInstance()}onHostConnected(){this.logger.debug("Action bar controller connected")}onHostDisconnected(){this.logger.debug("Action bar controller disconnected")}updateConfig(e){this.logger.debug("Updating ActionBarController config:",e),this.config={...this.config,...e},this.host.requestUpdate()}get actionBarConfig(){return this.config.actionBar}get isActionBarEnabled(){var e;return!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}registerActionHandler(e,t){this.logger.debug(`Registering handler for action type: ${e}`),this.registry.registerHandler(e,t)}getActionHandler(e){return this.registry.getHandler(e)}}const Uo=e=>(...t)=>({_$litDirective$:e,values:t});class Vo{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const Zo=Uo(class extends Vo{constructor(e){if(super(e),6!==e.type)throw new Error("actionHandler must be attached to an element")}render(e){return Z}update(e,[t]){return this.attach(e.element,t||{}),Z}attach(e,t){if(e._actionHandlerOptions=t,e._actionHandlerAttached)return;let i;e._actionHandlerAttached=!0;let o,n=!1;const a=t=>{$t(e,"action",{action:t})},r=()=>{void 0!==i&&(window.clearTimeout(i),i=void 0)};e.addEventListener("pointerdown",()=>{var t;n=!1,(null===(t=e._actionHandlerOptions)||void 0===t?void 0:t.hasHold)&&(r(),i=window.setTimeout(()=>{n=!0,a("hold")},500))}),e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r),e.addEventListener("pointerleave",r),e.addEventListener("click",()=>{var t;n?n=!1:(null===(t=e._actionHandlerOptions)||void 0===t?void 0:t.hasDoubleClick)?void 0!==o?(window.clearTimeout(o),o=void 0,a("double_tap")):o=window.setTimeout(()=>{o=void 0,a("tap")},250):a("tap")}),e.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),a("tap"))})}});class Ko{constructor(){this.plugins=new Map,this.actionRegistry=Wo.getInstance()}static getInstance(){return Ko.instance||(Ko.instance=new Ko),Ko.instance}registerPlugin(e){const t=e.actionId;this.plugins.set(t,e)}registerPluginWithHandler(e){this.registerPlugin(e),this.actionRegistry.registerHandler(e.actionId,e.handler)}getAllPlugins(){return Array.from(this.plugins.values())}getPlugin(e){return this.plugins.get(e)}getAllActionIds(){return Array.from(this.plugins.keys())}}function qo(e){Ko.getInstance().registerPluginWithHandler(e)}class Jo extends he{activate(){}deactivate(){}}var Go=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Yo=class extends Jo{get priority(){return 5}get isActive(){var e,t;return!this.transportationActive&&!0===(null===(e=this.config)||void 0===e?void 0:e.enabled)&&!!(null===(t=this.config.actions)||void 0===t?void 0:t.length)}constructor(){super(),this.transportationActive=!1,this.logger=Se("action-bar-component"),this.onActiveComponentChanged=e=>{"transportation"===e.componentName&&this.transportationActive!==e.state&&(this.transportationActive=e.state)},this.actionBarController=new Bo(this,{actionBar:this.config})}connectedCallback(){super.connectedCallback(),this.transportationActive=st.getInstance().isActive("transportation"),et.getInstance().subscribe(tt,this.onActiveComponentChanged)}disconnectedCallback(){et.getInstance().unsubscribe(tt,this.onActiveComponentChanged),super.disconnectedCallback()}get controller(){return this.actionBarController}getIconSize(){return ut(this.size,this.iconSize,"iconSize")}getButtonSize(){return function(e,t){if(e===dt.Custom&&t){const e=parseInt(t);return isNaN(e)?ht.buttonSize.medium:2*e+"px"}return ut(e,void 0,"buttonSize")}(this.size,this.iconSize)}updated(e){super.updated(e),e.has("config")&&(this.logger.debug("Config properties changed, updating ActionBarController"),this.actionBarController.updateConfig({actionBar:this.config}),et.getInstance().publish(new nt)),e.has("hass")&&this.hass&&this.requestUpdate()}getFlexAlignment(){if(!this.config||!this.config.alignment)return"center";switch(this.config.alignment){case Ho.Left:return"flex-start";case Ho.Right:return"flex-end";case Ho.Center:default:return"center"}}render(){var e,t,i;if(this.transportationActive||!this.config||!1===this.config.enabled||!this.config.actions||0===this.config.actions.length)return V``;const o=null!==(e=this.config.orientation)&&void 0!==e?e:"horizontal",n=this.getFlexAlignment(),a="vertical"===o?"justify-content: center; align-items: center;":`justify-content: ${n}; align-items: center;`,r=this.config.alignment&&this.config.alignment!==Ho.Auto?this.config.alignment:Ho.Center,s=this.getButtonSize(),l=void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.3,c=(null===(t=this.config.buttonGap)||void 0===t?void 0:t.trim())||"16px",d=!1===this.config.showButtonBackground?"flat-buttons":"",h=(null===(i=this.config.padding)||void 0===i?void 0:i.trim())||(d?"16px 16px 4px":"16px");return this.logger.debug(`Rendering action bar - ButtonSize: ${s}`),V`
            <div class="action-bar-container ${o} align-${r} ${d}"
                style="color: ${this.fontColor}; 
                       ${a}
                       background-color: rgba(0, 0, 0, ${l});
                       --action-button-size: ${s};
                       --action-button-gap: ${c};
                       --action-bar-padding: ${h};">
                ${this.config.actions.map(e=>this.renderActionButton(e))}
            </div>
        `}renderActionButton(e){const t=Ko.getInstance().getPlugin(e.actionId);let i=e.active||!1,o=e.icon;t&&"getIconForState"in t&&this.hass&&(o=t.getIconForState(e,this.hass)),t&&"getActiveState"in t&&(i=t.getActiveState());const n=i?"active":"",a=i&&e.activeColor?`--active-icon-color: ${e.activeColor};`:"";return V`
            <div class="action-button ${n}"
                 style="${a}"
                 role="button"
                 tabindex="0"
                 aria-label="${e.title}"
                 ${Zo({hasHold:At(e.hold_action),hasDoubleClick:At(e.double_tap_action)})}
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
        `}_handleAction(e,t){this.hass?(this.logger.debug(`Action ${t}:`,e),function(e,t,i,o="tap"){let n="hold"===o?e.hold_action:"double_tap"===o?e.double_tap_action:e.tap_action;var a;if(n&&(!(a=n)||"object"!=typeof a||Array.isArray(a)||"string"!=typeof a.action)&&(console.warn(`Ignoring invalid ${o} action config (expected an object with an "action" key):`,n),n=void 0),n){const a={...e},r=n.entity||n.entity_id||e.entity_id;return!a.entity&&r&&(a.entity=r),void It(i||document.body,t,a,o)}if("tap"!==o)return;const r=Wo.getInstance().getHandler(e.actionId);r?r(e,t,i):console.warn(`No handler registered for action type: ${e.actionId}`)}(e,this.hass,this,t)):this.logger.error("Home Assistant instance not available")}};Yo.styles=a`
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
            font-size: 18px;
            font-weight: 400;
            text-align: center;
        }
    `,Go([ve({type:Object})],Yo.prototype,"config",void 0),Go([ve({type:String})],Yo.prototype,"fontColor",void 0),Go([ve({type:Object})],Yo.prototype,"hass",void 0),Go([ve({type:String})],Yo.prototype,"size",void 0),Go([ve({type:String})],Yo.prototype,"iconSize",void 0),Go([fe()],Yo.prototype,"transportationActive",void 0),Yo=Go([pe("ha-action-bar")],Yo);const Xo="action-navigate",Qo=(e,t,i)=>{const{path:o,target:n}=e;"_blank"!==n?zt(i||document.body,o):window.open(o,"_blank")};var en,tn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};class on extends he{t(e,t){return qe(e,this.hass,t)}updated(e){super.updated(e)}handleInputChange(e,t){t.stopPropagation(),t.preventDefault();const i=t.target;i&&this.actionChanged(this.index,e,i.value||"")}handleValueChange(e,t){t.stopPropagation(),t.preventDefault(),this.actionChanged(this.index,e,t.detail.value)}}tn([ve({type:Object})],on.prototype,"hass",void 0),tn([ve({type:Object})],on.prototype,"actionConfig",void 0),tn([ve({type:Number})],on.prototype,"index",void 0),tn([ve({type:Function})],on.prototype,"actionChanged",void 0),function(e){e.Left="left",e.Top="top",e.Hidden="hidden"}(en||(en={}));let nn=class extends on{get navigationAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{type:"text"}}}
                    .value=${this.navigationAction.path||""}
                    .label=${this.t("editor.action_plugin.navigation_path","Navigation path")}
                    .labelPosition=${en.Hidden}
                    .helper=${this.t("editor.action_plugin.navigation_help","Path or URL to open")}
                    @value-changed=${e=>this.handleValueChange("path",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"_self",label:this.t("editor.action_plugin.current_tab","Current tab")},{value:"_blank",label:this.t("editor.action_plugin.new_tab","New tab")}],mode:"dropdown"}}}
                    .value=${this.navigationAction.target||"_self"}
                    .label=${this.t("editor.action_plugin.open_in","Open in")}
                    .labelPosition=${en.Hidden}
                    .helper=${this.t("editor.action_plugin.navigation_help","Path or URL to open")}
                    @value-changed=${e=>this.handleValueChange("target",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.navigationAction.activeColor||"#ffeb3b"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.active_color_help","Color to use when the action is active")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};nn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("navigation-editor-plugin")],nn);const an="action-ha",rn=(e,t,i)=>{It(i||document.body,t,{entity:e.entity,tap_action:e.tap_action},"tap")};let sn=class extends on{get haAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.haAction.entity||""}
                    .required=${!1}
                    .label=${this.t("editor.action_plugin.entity","Entity")}
                    .helper=${this.t("editor.action_plugin.entity_more_info_help","Entity used by the more-info and toggle actions")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.tap_action}
                    .label=${this.t("editor.action_plugin.tap_action","Tap action")}
                    .helper=${this.t("editor.action_plugin.tap_help","Standard Home Assistant action to run on tap")}
                    .labelPosition=${en.Top}
                    @value-changed=${e=>this.handleValueChange("tap_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.hold_action}
                    .required=${!1}
                    .label=${this.t("editor.action_plugin.hold_action","Hold action")}
                    .helper=${this.t("editor.action_plugin.hold_help","Standard Home Assistant action to run on hold")}
                    .labelPosition=${en.Top}
                    @value-changed=${e=>this.handleValueChange("hold_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{}}}
                    .value=${this.haAction.double_tap_action}
                    .required=${!1}
                    .label=${this.t("editor.action_plugin.double_action","Double tap action")}
                    .helper=${this.t("editor.action_plugin.double_help","Standard Home Assistant action to run on double tap")}
                    .labelPosition=${en.Top}
                    @value-changed=${e=>this.handleValueChange("double_tap_action",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.haAction.activeColor||"#ffeb3b"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.active_color_help","Color to use when the action is active")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};sn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("ha-action-editor-plugin")],sn);const ln="call-service",cn=(e,t,i)=>{const{service:o,service_data:n,target:a,confirmation:r,confirmation_text:s}=e;It(i||document.body,t,{tap_action:{action:"call-service",service:o,service_data:n,target:a,confirmation:r?{text:s||`Are you sure you want to call ${o}?`}:void 0}},"tap")};let dn=class extends on{get serviceCallAction(){return this.actionConfig}get uiActionValue(){const{service:e,service_data:t,target:i}=this.serviceCallAction;return{action:"perform-action",perform_action:e||"",data:t,target:i}}_serviceChanged(e){var t,i,o;e.stopPropagation(),e.preventDefault();const n=e.detail.value||{};this.actionChanged(this.index,"service",null!==(i=null!==(t=n.perform_action)&&void 0!==t?t:n.service)&&void 0!==i?i:""),this.actionChanged(this.index,"service_data",null!==(o=n.data)&&void 0!==o?o:n.service_data),this.actionChanged(this.index,"target",n.target)}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ui_action:{actions:["perform-action"],default_action:"perform-action"}}}
                    .value=${this.uiActionValue}
                    .label=${this.t("editor.action_plugin.service","Service")}
                    .helper=${this.t("editor.action_plugin.service_help","Service to call, including data and target")}
                    .labelPosition=${en.Top}
                    @value-changed=${e=>this._serviceChanged(e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{boolean:{}}}
                    .value=${this.serviceCallAction.confirmation||!1}
                    .label=${this.t("editor.action_plugin.confirmation","Ask for confirmation")}
                    .helper=${this.t("editor.action_plugin.confirmation_help","Show a confirmation dialog before calling the service")}
                    .labelPosition=${en.Left}
                    @value-changed=${e=>this.handleValueChange("confirmation",e)}
            ></ha-row-selector>

            ${this.serviceCallAction.confirmation?V`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{type:"text"}}}
                        .value=${this.serviceCallAction.confirmation_text||""}
                        .required=${!1}
                        .label=${this.t("editor.action_plugin.confirmation_text","Confirmation text")}
                        .helper=${this.t("editor.action_plugin.confirmation_text_help","Custom text for the confirmation dialog")}
                        .labelPosition=${en.Hidden}
                        @value-changed=${e=>this.handleValueChange("confirmation_text",e)}
                ></ha-row-selector>
            `:""}

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.serviceCallAction.activeColor||"#ffeb3b"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.active_color_help","Color to use when the action is active")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};dn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("service-call-editor-plugin")],dn);const hn="light-toggle",un=(e,t)=>{const{entity_id:i}=e;i?t.states[i]?t.callService("light","toggle",{entity_id:i}):console.warn(`Entity ${i} not found`):console.warn("No entity_id specified for light toggle action")};let pn=class extends on{get lightToggleAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"light"}}}
                    .value=${this.lightToggleAction.entity_id||""}
                    .label=${this.t("editor.action_plugin.light_entity","Light entity")}
                    .helper=${this.t("editor.action_plugin.light_help","Select a light entity to toggle")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for light on state"}}}
                    .value=${this.lightToggleAction.icon_on||""}
                    .label=${this.t("editor.action_plugin.icon_on","Icon (on state)")}
                    .helper=${this.t("editor.action_plugin.light_icon_help","Icon to show when the light is on")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.lightToggleAction.activeColor||"#ffeb3b"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.light_color_help","Color to use when the light is on")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};pn.styles=a`
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
    `,pn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("light-toggle-editor-plugin")],pn);const gn="switch-toggle",mn=(e,t)=>{const{entity_id:i}=e;i?t.states[i]?t.callService("switch","toggle",{entity_id:i}):console.warn(`Entity ${i} not found`):console.warn("No entity_id specified for switch toggle action")};let vn=class extends on{get switchToggleAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"switch"}}}
                    .value=${this.switchToggleAction.entity_id||""}
                    .label=${this.t("editor.action_plugin.switch_entity","Switch entity")}
                    .helper=${this.t("editor.action_plugin.switch_help","Select a switch entity to toggle")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:"Icon for switch on state"}}}
                    .value=${this.switchToggleAction.icon_on||""}
                    .label=${this.t("editor.action_plugin.icon_on","Icon (on state)")}
                    .helper=${this.t("editor.action_plugin.switch_icon_help","Icon to show when the switch is on")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("icon_on",e)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{color_hex:""}}
                    .value=${this.switchToggleAction.activeColor||"#4CAF50"}
                    .label=${this.t("editor.action_plugin.active_color","Active color")}
                    .helper=${this.t("editor.action_plugin.switch_color_help","Color to use when the switch is on")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("activeColor",e)}
            ></ha-row-selector>
        `}};vn.styles=a`
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
    `,vn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("switch-toggle-editor-plugin")],vn);const fn=Se("weather-update-plugin"),yn="weather-update",bn=(e,t)=>{fn.info("Weather update clicked"),et.getInstance().publish(new ot)};class wn{constructor(){this.actionId=yn,this.name="Update Weather",this.description="Trigger an immediate weather update",this.icon="mdi:weather-partly-cloudy",this.handler=bn,this.editorTag="weather-update-editor-plugin"}defaultActionConfig(){return{actionId:yn,title:"Update Weather",icon:this.icon}}register(){qo(this)}}function _n(){(new wn).register()}let xn=class extends on{get weatherUpdateAction(){return this.actionConfig}render(){return V`
            <div class="helper-text">
                ${this.t("editor.action_plugin.weather_update_help","This action triggers an immediate weather update. No additional configuration is needed.")}
            </div>
        `}};xn.styles=a`
        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `,xn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("weather-update-editor-plugin")],xn),_n();const $n="transportation",kn=Se("transportation-plugin"),Sn=(e,t)=>{kn.info("Transportation clicked"),et.getInstance().publish(new at)};class Cn{constructor(){this.actionId=$n,this.name="Transportation",this.description="Show transportation information",this.icon="mdi:bus-clock",this.handler=Sn,this.editorTag=""}defaultActionConfig(){return{actionId:$n,title:"Transportation",icon:this.icon}}register(){qo(this)}}function zn(){(new Cn).register()}zn();const In="background-next",An=Se("background-next-plugin"),En=(e,t)=>{An.info("Background next clicked"),et.getInstance().publish(new rt)};class Dn{constructor(){this.actionId=In,this.name="Next Background",this.description="Show next background image",this.icon="mdi:image-refresh",this.handler=En,this.editorTag=""}defaultActionConfig(){return{actionId:In,title:"Next Background",icon:this.icon}}register(){qo(this)}}function Pn(){(new Dn).register()}Pn();const On="action-more-info",Tn=Se("more-info-plugin"),Nn=(e,t,i)=>{const{entity_id:o}=e;if(!o)return void Tn.warn("No entity_id specified for more-info action");const n=t.states[o];if(n){Tn.info(`Opening more-info for entity ${o} (${n.entity_id})`);try{const e={entityId:o,view:"info"};$t(i||document.body,"hass-more-info",e)}catch(e){Tn.warn("Error using fireEvent method:",e)}}else Tn.warn(`Entity ${o} not found`)};let Fn=class extends on{get moreInfoAction(){return this.actionConfig}render(){return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{entity:{}}}
                    .value=${this.moreInfoAction.entity_id||""}
                    .label=${this.t("editor.action_plugin.entity","Entity")}
                    .helper=${this.t("editor.action_plugin.more_info_help","Select an entity to show more information for")}
                    .labelPosition=${en.Hidden}
                    @value-changed=${e=>this.handleValueChange("entity_id",e)}
            ></ha-row-selector>
        `}};Fn.styles=a`
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
    `,Fn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("more-info-editor-plugin")],Fn),(new class{constructor(){this.actionId=Xo,this.name="Navigate to Page",this.description="Navigate to a different page in Home Assistant",this.icon="mdi:arrow-right",this.handler=Qo,this.editorTag="navigation-editor-plugin"}defaultActionConfig(){return{actionId:Xo,title:"Navigate",icon:this.icon,path:"/"}}register(){qo(this)}}).register(),(new class{constructor(){this.actionId=an,this.name="Home Assistant Action",this.description="Run a standard Home Assistant action (navigate, call service, more info, url, toggle)",this.icon="mdi:gesture-tap",this.handler=rn,this.editorTag="ha-action-editor-plugin"}defaultActionConfig(){return{actionId:an,title:"Action",icon:this.icon,tap_action:{action:"navigate",navigation_path:"/config"}}}register(){qo(this)}}).register(),(new class{constructor(){this.actionId=ln,this.name="Call Service",this.description="Call a Home Assistant service",this.icon="mdi:lightbulb",this.handler=cn,this.editorTag="service-call-editor-plugin"}defaultActionConfig(){return{actionId:ln,service:"light.toggle",service_data:{entity_id:"light.living_room"},title:"Toggle Light",icon:this.icon}}register(){qo(this)}}).register(),(new class{constructor(){this.actionId=hn,this.name="Toggle Light",this.description="Toggle a light on or off",this.icon="mdi:lightbulb",this.handler=un,this.editorTag="light-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:i}=e;if(!i)return e.icon||this.icon;const o=t.states[i];return o?(this._lastActiveState="on"===o.state,this._lastActiveState?e.icon_on||"mdi:lightbulb-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:hn,entity_id:"",title:"Toggle Light",icon:this.icon,icon_on:"mdi:lightbulb-on"}}register(){qo(this)}}).register(),(new class{constructor(){this.actionId=gn,this.name="Toggle Switch",this.description="Toggle a switch on or off",this.icon="mdi:toggle-switch-variant-off",this.handler=mn,this.editorTag="switch-toggle-editor-plugin",this._lastActiveState=!1}getIconForState(e,t){const{entity_id:i}=e;if(!i)return e.icon||this.icon;const o=t.states[i];return o?(this._lastActiveState="on"===o.state,this._lastActiveState?e.icon_on||"mdi:toggle-switch-on":e.icon||this.icon):e.icon||this.icon}getActiveState(){return this._lastActiveState}defaultActionConfig(){return{actionId:gn,entity_id:"",title:"Toggle Switch",icon:this.icon,icon_on:"mdi:toggle-switch-variant"}}register(){qo(this)}}).register(),_n(),zn(),Pn(),(new class{constructor(){this.actionId=On,this.name="Entity More Info",this.description="Open the default modal window of an entity",this.icon="mdi:information-outline",this.handler=Nn,this.editorTag="more-info-editor-plugin"}defaultActionConfig(){return{actionId:On,title:"More Info",icon:this.icon,entity_id:""}}register(){qo(this)}}).register();var Rn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Mn=class extends Tt{constructor(){super(...arguments),this._actions=[],this._expandedActionIndex=0,this.sortableList=new Lo(this,{containerSelector:".action-list",draggable:".action-item",handle:".action-drag-handle",ghostClass:"action-item-ghost",onMove:(e,t)=>this._moveAction(e,t)}),this._editorComponentCache=new Map}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadActions(),this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}_loadActions(){var e;if(!(null===(e=this.config)||void 0===e?void 0:e.actionBar))return this._actions=[],void(this._expandedActionIndex=null);this.config.actionBar.actions&&this.config.actionBar.actions.length>0?this._actions=[...this.config.actionBar.actions]:this._actions=[],0===this._actions.length?this._expandedActionIndex=null:null!==this._expandedActionIndex&&(this._expandedActionIndex=Math.min(this._expandedActionIndex,this._actions.length-1))}_getActionTypeOptions(){return Ko.getInstance().getAllPlugins().map(e=>({value:e.actionId,label:this.t(`editor.actions.types.${e.actionId.replace(/-/g,"_")}`,e.name)}))}_getEditorTagName(e){const t=Ko.getInstance().getPlugin(e);return t&&t.editorTag?t.editorTag:null}_createEditorTagComponent(e,t){const i=this._getEditorTagName(e.actionId);if(!i)return"";const o=`${e.actionId}-${t}`;if(this._editorComponentCache.has(o)){const t=this._editorComponentCache.get(o);return this.hass&&(t.hass=this.hass),t.actionConfig=e,t}try{const n=document.createElement(i);return this.hass&&(n.hass=this.hass),n.actionConfig=e,n.index=t,n.actionChanged=this._actionChanged.bind(this),this._editorComponentCache.set(o,n),n}catch(e){return console.error(`Error creating editor component ${i}:`,e),""}}_addAction(){const e=this._getActionTypeOptions(),t=e.length>0?e[0].value:Xo;let i;const o=Ko.getInstance().getPlugin(t);if(i=o&&o.defaultActionConfig?o.defaultActionConfig():{actionId:t,title:"Action",icon:"mdi:flash"},this._editorComponentCache.clear(),this._expandedActionIndex=this._actions.length,this._actions=[...this._actions,i],this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],e.actionBar.enabled=!0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionUp(e){if(e<=0||e>=this._actions.length)return;this._editorComponentCache.clear();const t=[...this._actions],i=t[e];if(t[e]=t[e-1],t[e-1]=i,this._actions=t,this._expandedActionIndex===e?this._expandedActionIndex=e-1:this._expandedActionIndex===e-1&&(this._expandedActionIndex=e),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_moveActionDown(e){if(e<0||e>=this._actions.length-1)return;this._editorComponentCache.clear();const t=[...this._actions],i=t[e];if(t[e]=t[e+1],t[e+1]=i,this._actions=t,this._expandedActionIndex===e?this._expandedActionIndex=e+1:this._expandedActionIndex===e+1&&(this._expandedActionIndex=e),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeAction(e){if(this._editorComponentCache.clear(),this._actions=this._actions.filter((t,i)=>i!==e),0===this._actions.length?this._expandedActionIndex=null:this._expandedActionIndex===e?this._expandedActionIndex=Math.min(e,this._actions.length-1):null!==this._expandedActionIndex&&this._expandedActionIndex>e&&(this._expandedActionIndex-=1),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],0===this._actions.length&&(e.actionBar&&(e.actionBar.enabled=!1),e.actionBar=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_toggleAction(e){this._expandedActionIndex=this._expandedActionIndex===e?null:e}_moveAction(e,t){if(this._editorComponentCache.clear(),this._expandedActionIndex=jo(this._expandedActionIndex,e,t),this._actions=Mo(this._actions,e,t),!this.config)return;const i=JSON.parse(JSON.stringify(this.config));i.actionBar||(i.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),i.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}_actionChanged(e,t,i){if("actionId"===t){const t=this._actions[e];if(t){const i=`${t.actionId}-${e}`;this._editorComponentCache.delete(i)}}if(this._actions=this._actions.map((o,n)=>n===e?{...o,[t]:i}:o),this.config){const e=JSON.parse(JSON.stringify(this.config));e.actionBar||(e.actionBar={enabled:!0,actions:[],backgroundOpacity:.3}),e.actionBar.actions||(e.actionBar.actions=[]),e.actionBar.actions=[...this._actions],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
            .content {
                padding: 12px;
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
        `}render(){var e,t;return this.hass&&this.config?V`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!0===(null===(e=this.config.actionBar)||void 0===e?void 0:e.enabled)}
                        .label=${this.t("editor.actions.enable","Enable action bar")}
                        propertyName="actionBar.enabled"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${!0===(null===(t=this.config.actionBar)||void 0===t?void 0:t.enabled)?V`
                    <div class="info-text">
                        ${this.t("editor.actions.description","Configure action buttons displayed in this widget.")}
                    </div>

                    <div class="section-subheader">${this.t("editor.actions.title","Actions")}</div>

                    ${0===this._actions.length?V`
                        <div class="empty-actions">${this.t("editor.actions.empty","No actions configured yet.")}</div>
                    `:""}
                    <div class="action-list">
                    ${this._actions.map((e,t)=>{const i=this._expandedActionIndex===t,o=Ko.getInstance().getPlugin(e.actionId),n=o?this.t(`editor.actions.types.${e.actionId.replace(/-/g,"_")}`,o.name):void 0,a=e.title||n||this.t("editor.actions.action","Action {number}",{number:t+1});return V`
                        <div class="action-item ${i?"":"collapsed"}">
                        <div class="action-header">
                            <span class="action-drag-handle"
                                  title=${this.t("designer.drag_to_move","Drag to move")}
                                  aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                <ha-icon icon="mdi:drag"></ha-icon>
                            </span>
                            <button class="action-toggle" type="button"
                                    aria-expanded=${i}
                                    @click=${()=>this._toggleAction(t)}>
                                <span class="action-item-title">${a}</span>
                            </button>
                            <button class="action-icon-button remove" type="button"
                                    title=${this.t("editor.actions.remove","Remove action")}
                                    aria-label=${this.t("editor.actions.remove","Remove action")}
                                    @click=${()=>this._removeAction(t)}>
                                <ha-icon icon="mdi:delete-outline"></ha-icon>
                            </button>
                            <button class="action-icon-button" type="button"
                                    title=${i?this.t("editor.actions.collapse","Collapse action"):this.t("editor.actions.expand","Expand action")}
                                    aria-label=${i?this.t("editor.actions.collapse","Collapse action"):this.t("editor.actions.expand","Expand action")}
                                    @click=${()=>this._toggleAction(t)}>
                                <ha-icon icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </button>
                        </div>
                        ${i?V`<div class="action-body">
                        <ha-row-selector
                                style="flex: 2;"
                                .hass=${this.hass}
                                .selector=${{select:{options:this._getActionTypeOptions(),mode:"dropdown"}}}
                                .value=${e.actionId}
                                .label=${this.t("editor.actions.type","Action type")}
                                .labelPosition=${en.Hidden}
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
                                .labelPosition=${en.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const i=e.detail.value;this._actionChanged(t,"title",i||"")}}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{icon:{placeholder:"mdi:clock"}}}
                                .value=${e.icon||""}
                                .label=${this.t("editor.actions.icon","Icon")}
                                .helper=${this.t("editor.actions.icon_help","Icon for the action button")}
                                .labelPosition=${en.Hidden}
                                @value-changed=${e=>{e.stopPropagation(),e.preventDefault();const i=e.detail.value;this._actionChanged(t,"icon",i||"")}}
                        ></ha-row-selector>

                        <!-- Editor components are now dynamically created by the factory pattern -->
                        ${this._createEditorTagComponent(e,t)}
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
        `:V``}};Rn([ve({type:Array})],Mn.prototype,"_actions",void 0),Rn([fe()],Mn.prototype,"_expandedActionIndex",void 0),Mn=Rn([pe("action-bar-editor")],Mn);var jn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Ln=class extends Tt{constructor(){super(...arguments),this._backgroundImages=[],this._expandedImageIndex=0,this.sortableList=new Lo(this,{containerSelector:".image-list",draggable:".image-card",handle:".image-drag-handle",ghostClass:"image-card-ghost",onMove:(e,t)=>this._moveBackgroundImage(e,t)})}_imageSourceOptions(){return[{value:"none",label:this.t("editor.background.source_none","None (no background images)")},{value:"picsum",label:this.t("editor.background.source_picsum","Picsum photos")},{value:"local",label:this.t("editor.background.source_local","Local images")},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:this.t("editor.background.source_sensor","Sensor images")}]}_objectFitOptions(){return[{value:"fill",label:this.t("editor.background.fit_fill","Fill")},{value:"contain",label:this.t("editor.background.fit_contain","Contain")},{value:"cover",label:this.t("editor.background.fit_cover","Cover")},{value:"none",label:this.t("ui.none","None")},{value:"scale-down",label:this.t("editor.background.fit_scale_down","Scale down")}]}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadBackgroundImages(),this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}_loadBackgroundImages(){var e;(null===(e=this.config)||void 0===e?void 0:e.backgroundImages)&&this.config.backgroundImages.length>0?this._backgroundImages=[...this.config.backgroundImages]:this._backgroundImages=[],0===this._backgroundImages.length?this._expandedImageIndex=null:null!==this._expandedImageIndex&&(this._expandedImageIndex=Math.min(this._expandedImageIndex,this._backgroundImages.length-1))}_addBackgroundImage(){this._expandedImageIndex=this._backgroundImages.length,this._backgroundImages=[...this._backgroundImages,{url:"",weather:Ee.All,timeOfDay:Ae.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(e){this._backgroundImages=this._backgroundImages.filter((t,i)=>i!==e),0===this._backgroundImages.length?this._expandedImageIndex=null:this._expandedImageIndex===e?this._expandedImageIndex=Math.min(e,this._backgroundImages.length-1):null!==this._expandedImageIndex&&this._expandedImageIndex>e&&(this._expandedImageIndex-=1),this._updateBackgroundImagesConfig()}_toggleImage(e){this._expandedImageIndex=this._expandedImageIndex===e?null:e}_moveBackgroundImage(e,t){this._expandedImageIndex=jo(this._expandedImageIndex,e,t),this._backgroundImages=Mo(this._backgroundImages,e,t),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this.config){const e=JSON.parse(JSON.stringify(this.config));e.backgroundImages=[...this._backgroundImages],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}static get styles(){return a`
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
        `}render(){return this.hass&&this.config?V`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._imageSourceOptions(),mode:"dropdown"}}}
                        .value=${this.config.imageSource||"none"}
                        .label=${this.t("editor.background.source","Image source")}
                        propertyName="imageSource"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
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
                        .selector=${{number:{min:30,max:300,step:10,mode:"slider",slider_ticks:!0}}}
                        .value=${this.config.backgroundRotationInterval||90}
                        .label=${this.t("editor.background.rotation","Rotation interval (seconds)")}
                        propertyName="backgroundRotationInterval"
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
                
                ${"local"===this.config.imageSource?this._renderLocalImagesSection():""}
                ${"unsplash"===this.config.imageSource?this._renderUnsplashSection():""}
                ${"sensor"===this.config.imageSource?this._renderSensorImagesSection():""}
            </div>
        `:V``}_renderLocalImagesSection(){return V`
            <div class="info-text">
                ${this.t("editor.background.local_help","Configure local image URLs. Weather and time-of-day conditions can be selected for each image.")}
            </div>

            <div class="section-subheader">${this.t("editor.background.images","Background images")}</div>

            <div class="image-list">
            ${this._backgroundImages.map((e,t)=>{const i=this._expandedImageIndex===t,o=e.url||this.t("editor.background.image","Background image {number}",{number:t+1});return V`
                <div class="image-card ${i?"":"collapsed"}">
                    <div class="image-header">
                        <span class="image-drag-handle"
                              title=${this.t("designer.drag_to_move","Drag to move")}
                              aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                            <ha-icon icon="mdi:drag"></ha-icon>
                        </span>
                        <button class="image-toggle" type="button"
                                aria-expanded=${i}
                                @click=${()=>this._toggleImage(t)}>
                            <span class="image-title">${o}</span>
                        </button>
                        <button class="image-icon-button remove" type="button"
                                title=${this.t("editor.background.remove","Remove background image")}
                                aria-label=${this.t("editor.background.remove","Remove background image")}
                                @click=${()=>this._removeBackgroundImage(t)}>
                            <ha-icon icon="mdi:delete-outline"></ha-icon>
                        </button>
                        <button class="image-icon-button" type="button"
                                title=${i?this.t("editor.background.collapse","Collapse background image"):this.t("editor.background.expand","Expand background image")}
                                aria-label=${i?this.t("editor.background.collapse","Collapse background image"):this.t("editor.background.expand","Expand background image")}
                                @click=${()=>this._toggleImage(t)}>
                            <ha-icon icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                        </button>
                    </div>
                    ${i?V`<div class="image-body">
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
                                .selector=${{select:{options:Object.values(Ee).map(e=>({value:e,label:e}))}}}
                                .value=${e.weather}
                                .label=${this.t("editor.background.weather","Weather condition")}
                                propertyName="backgroundImages.${t}.weather"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:Object.values(Ae).map(e=>({value:e,label:e}))}}}
                                .value=${e.timeOfDay}
                                .label=${this.t("editor.background.time","Time of day")}
                                propertyName="backgroundImages.${t}.timeOfDay"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>`:""}
                </div>
            `})}
            </div>

            <mwc-button @click=${this._addBackgroundImage}>${this.t("editor.background.add","Add background image")}</mwc-button>
        `}_renderUnsplashSection(){var e,t,i,o;return V`
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
                    .value=${(null===(i=this.config.imageConfig)||void 0===i?void 0:i.apiKey)||""}
                    .label=${this.t("editor.background.api_key","API key")}
                    propertyName="imageConfig.apiKey"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"low",label:"Low"},{value:"high",label:"High"}],mode:"dropdown"}}}
                    .value=${(null===(o=this.config.imageConfig)||void 0===o?void 0:o.contentFilter)||"high"}
                    .label=${this.t("editor.background.content_filter","Content filter")}
                    propertyName="imageConfig.contentFilter"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>
        `}_renderSensorImagesSection(){var e;return V`
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
        `}};jn([ve({type:Array})],Ln.prototype,"_backgroundImages",void 0),jn([fe()],Ln.prototype,"_expandedImageIndex",void 0),Ln=jn([pe("background-editor")],Ln);var Hn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Wn=class extends Tt{constructor(){super(...arguments),this.sources=[],this.addingAll=!1,this.expandedSourceIndex=0,this.sortableList=new Lo(this,{containerSelector:".source-list",draggable:".source-card",handle:".source-drag-handle",ghostClass:"source-card-ghost",onMove:(e,t)=>this.moveSource(e,t)})}updated(e){var t;if(super.updated(e),e.has("config")){const e=this.config;this.sources=(null!==(t=e.entities)&&void 0!==t?t:[]).map(e=>({...e})),null!==this.expandedSourceIndex&&this.expandedSourceIndex>=this.sources.length&&(this.expandedSourceIndex=this.sources.length>0?this.sources.length-1:null)}this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}emitSources(e){this.sources=e,$t(this,"config-changed",{config:{...this.config,entities:e.map(e=>({...e}))}})}addSource(){this.expandedSourceIndex=this.sources.length,this.emitSources([...this.sources,{entity:"",color:"#4fc3f7"}])}removeSource(e){this.expandedSourceIndex===e?this.expandedSourceIndex=null:null!==this.expandedSourceIndex&&this.expandedSourceIndex>e&&this.expandedSourceIndex--,this.emitSources(this.sources.filter((t,i)=>i!==e))}toggleSource(e){this.expandedSourceIndex=this.expandedSourceIndex===e?null:e}moveSource(e,t){this.expandedSourceIndex=jo(this.expandedSourceIndex,e,t),this.emitSources(Mo(this.sources,e,t))}updateSource(e,t,i){this.emitSources(this.sources.map((o,n)=>n===e?{...o,[t]:i}:o))}async addAllCalendars(){if(this.hass&&!this.addingAll){this.addingAll=!0;try{let e=[];try{e=await this.hass.callApi("GET","calendars")}catch(t){e=Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("calendar.")).map(e=>{var t;return{entity_id:e.entity_id,name:String(null!==(t=e.attributes.friendly_name)&&void 0!==t?t:e.entity_id)}})}const t=new Set(this.sources.map(e=>e.entity)),i=["#4fc3f7","#ff6b6b","#66bb6a","#ffca28","#ab47bc","#26a69a"],o=e.filter(e=>e.entity_id&&!t.has(e.entity_id)).map((e,t)=>({entity:e.entity_id,label:e.name||void 0,color:i[(this.sources.length+t)%i.length]}));o.length>0&&(0===this.sources.length&&(this.expandedSourceIndex=0),this.emitSources([...this.sources,...o]))}finally{this.addingAll=!1}}}render(){var e,t,i,o,n,a,r;if(!this.hass||!this.config)return V``;const s=this.config;return V`
            <div class="content">
                <div class="section-title">${this.t("editor.calendar.calendars","Calendars")}</div>
                ${0===this.sources.length?V`<div class="empty">${this.t("editor.calendar.empty","Add one or more Home Assistant calendar entities.")}</div>`:""}
                <div class="source-list">
                    ${this.sources.map((e,t)=>{var i,o;const n=this.expandedSourceIndex===t;return V`
                        <div class="source-card ${n?"expanded":"collapsed"}">
                            <div class="source-header">
                                <span class="source-drag-handle"
                                      title=${this.t("designer.drag_to_move","Drag to move")}
                                      aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                    <ha-icon icon="mdi:drag"></ha-icon>
                                </span>
                                <button class="source-toggle"
                                        type="button"
                                        aria-expanded=${n?"true":"false"}
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
                                        title=${n?this.t("editor.calendar.collapse","Collapse calendar"):this.t("editor.calendar.expand","Expand calendar")}
                                        aria-label=${n?this.t("editor.calendar.collapse","Collapse calendar"):this.t("editor.calendar.expand","Expand calendar")}
                                        aria-expanded=${n?"true":"false"}
                                        @click=${()=>this.toggleSource(t)}>
                                    <ha-icon .icon=${n?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                                </button>
                            </div>
                            ${n?V`<div class="source-body">
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{entity:{filter:{domain:"calendar"}}}}
                                    .value=${e.entity}
                                    .label=${this.t("editor.calendar.entity","Calendar entity")}
                                    .labelPosition=${en.Top}
                                    @value-changed=${e=>this.updateSource(t,"entity",e.detail.value)}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{type:"text"}}}
                                    .value=${null!==(i=e.label)&&void 0!==i?i:""}
                                    .label=${this.t("editor.calendar.label","Label (optional)")}
                                    .labelPosition=${en.Top}
                                    @value-changed=${e=>this.updateSource(t,"label",e.detail.value)}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{color_hex:""}}
                                    .value=${null!==(o=e.color)&&void 0!==o?o:"#4fc3f7"}
                                    .label=${this.t("editor.calendar.event_color","Event color")}
                                    .labelPosition=${en.Top}
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

                <div class="section-title">${this.t("editor.calendar.display","Display")}</div>
                <div class="options">
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:[{value:"agenda",label:this.t("editor.calendar.agenda","Agenda")},{value:"today",label:this.t("editor.calendar.today_only","Today only")}],mode:"dropdown"}}}
                            .value=${null!==(e=s.displayMode)&&void 0!==e?e:"agenda"}
                            .label=${this.t("editor.calendar.display_mode","Display mode")}
                            propertyName="displayMode"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    ${"today"!==s.displayMode?V`
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
                            .value=${null!==(i=s.maxEvents)&&void 0!==i?i:8}
                            .label=${this.t("editor.calendar.maximum_events","Maximum events")}
                            propertyName="maxEvents"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
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
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{number:{min:1,max:1440,step:1,mode:"box"}}}
                            .value=${Math.max(1,Math.round((null!==(o=s.updateInterval)&&void 0!==o?o:300)/60))}
                            .label=${this.t("editor.calendar.update_interval","Update interval")}
                            .helper=${this.t("editor.calendar.update_help","Minutes (minimum 1)")}
                            .transformData=${e=>60*e}
                            propertyName="updateInterval"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                </div>

                <div class="section-title">${this.t("editor.calendar.event_background","Event appearance")}</div>
                <div class="options">
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{color_hex:""}}
                            .value=${null!==(n=s.eventBackgroundColor)&&void 0!==n?n:"#202020"}
                            .label=${this.t("editor.calendar.event_background_color","Background color")}
                            propertyName="eventBackgroundColor"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                            .value=${null!==(a=s.eventBackgroundOpacity)&&void 0!==a?a:.76}
                            .label=${this.t("editor.calendar.event_background_opacity","Background opacity")}
                            .helper=${`${Math.round(100*(null!==(r=s.eventBackgroundOpacity)&&void 0!==r?r:.76))}%`}
                            propertyName="eventBackgroundOpacity"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                </div>
            </div>
        `}};Wn.styles=a`
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
    `,Hn([fe()],Wn.prototype,"sources",void 0),Hn([fe()],Wn.prototype,"addingAll",void 0),Hn([fe()],Wn.prototype,"expandedSourceIndex",void 0),Wn=Hn([pe("calendar-editor")],Wn);let Bn=class extends Tt{_dateFormatOptions(){return{weekday:[{value:"long",label:this.t("editor.format.long_monday","Long (Monday)")},{value:"short",label:this.t("editor.format.short_mon","Short (Mon)")},{value:"narrow",label:this.t("editor.format.narrow_m","Narrow (M)")},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}],month:[{value:"long",label:this.t("editor.format.long_january","Long (January)")},{value:"short",label:this.t("editor.format.short_jan","Short (Jan)")},{value:"narrow",label:this.t("editor.format.narrow_j","Narrow (J)")},{value:"numeric",label:this.t("editor.format.numeric_1","Numeric (1)")},{value:"2-digit",label:this.t("editor.format.two_digit_01","2-digit (01)")},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}],day:[{value:"numeric",label:this.t("editor.format.numeric_1","Numeric (1)")},{value:"2-digit",label:this.t("editor.format.two_digit_01","2-digit (01)")},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}],year:[{value:"numeric",label:this.t("editor.format.numeric_2025","Numeric (2025)")},{value:"2-digit",label:this.t("editor.format.two_digit_25","2-digit (25)")},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}]}}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n,a,r;if(!this.hass||!this.config)return V``;const s=this._dateFormatOptions();return V`
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
                        .value=${(null===(i=this.config.dateFormat)||void 0===i?void 0:i.month)||"long"}
                        .label=${this.t("editor.format.month_display","Month display")}
                        propertyName="dateFormat.month"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.day,mode:"dropdown"}}}
                        .value=${void 0===(null===(o=this.config.dateFormat)||void 0===o?void 0:o.day)?"undefined":null===(n=this.config.dateFormat)||void 0===n?void 0:n.day}
                        .label=${this.t("editor.format.day_display","Day display")}
                        propertyName="dateFormat.day"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.year,mode:"dropdown"}}}
                        .value=${void 0===(null===(a=this.config.dateFormat)||void 0===a?void 0:a.year)?"undefined":null===(r=this.config.dateFormat)||void 0===r?void 0:r.year}
                        .label=${this.t("editor.format.year_display","Year display")}
                        propertyName="dateFormat.year"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `}};Bn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("date-format-editor")],Bn);let Un=class extends Tt{_timeFormatOptions(){const e=this.t("editor.format.numeric","Numeric"),t=this.t("editor.format.two_digit","2-digit");return{hour12:[{value:"true",label:this.t("editor.format.hour_12","12-hour")},{value:"false",label:this.t("editor.format.hour_24","24-hour")}],hour:[{value:"numeric",label:e},{value:"2-digit",label:t}],minute:[{value:"numeric",label:e},{value:"2-digit",label:t}],second:[{value:"numeric",label:e},{value:"2-digit",label:t},{value:"hidden",label:this.t("editor.format.hidden","Hidden")}]}}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n,a,r;if(!this.hass||!this.config)return V``;const s=this._timeFormatOptions();return V`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.hour12,mode:"dropdown"}}}
                        .value=${(null===(e=this.config.timeFormat)||void 0===e?void 0:e.hour12)?"true":"false"}
                        .label=${this.t("editor.format.hour_format","Hour format")}
                        propertyName="timeFormat.hour12"
                        .transformData=${e=>"true"===e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${(null===(t=this.config.timeFormat)||void 0===t?void 0:t.hour12)?V`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean:{}}}
                            .value=${!1!==(null===(i=this.config.timeFormat)||void 0===i?void 0:i.showAmPm)}
                            .label=${this.t("editor.format.show_am_pm","Show AM/PM")}
                            .helper=${this.t("editor.format.show_am_pm_help","Keep 12-hour time while hiding or showing the period")}
                            propertyName="timeFormat.showAmPm"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>
                `:""}

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.hour,mode:"dropdown"}}}
                        .value=${(null===(o=this.config.timeFormat)||void 0===o?void 0:o.hour)||"2-digit"}
                        .label=${this.t("editor.format.hour_display","Hour display")}
                        propertyName="timeFormat.hour"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.minute,mode:"dropdown"}}}
                        .value=${(null===(n=this.config.timeFormat)||void 0===n?void 0:n.minute)||"2-digit"}
                        .label=${this.t("editor.format.minute_display","Minute display")}
                        propertyName="timeFormat.minute"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:s.second,mode:"dropdown"}}}
                        .value=${void 0===(null===(a=this.config.timeFormat)||void 0===a?void 0:a.second)?"undefined":null===(r=this.config.timeFormat)||void 0===r?void 0:r.second}
                        .label=${this.t("editor.format.second_display","Second display")}
                        propertyName="timeFormat.second"
                        .transformData=${e=>"undefined"===e?"hidden":e}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `}};Un=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("time-format-editor")],Un);var Vn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Zn=class extends Tt{constructor(){super(...arguments),this._sensors=[],this._expandedSensorIndex=0,this.sortableList=new Lo(this,{containerSelector:".sensor-list",draggable:".sensor-card",handle:".sensor-drag-handle",ghostClass:"sensor-card-ghost",onMove:(e,t)=>this._moveSensor(e,t)})}updated(e){super.updated(e),e.has("config")&&this.config&&this._loadSensors(),this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}_loadSensors(){var e;(null===(e=this.config)||void 0===e?void 0:e.sensors)&&this.config.sensors.length>0?this._sensors=[...this.config.sensors]:this._sensors=[],0===this._sensors.length?this._expandedSensorIndex=null:null!==this._expandedSensorIndex&&(this._expandedSensorIndex=Math.min(this._expandedSensorIndex,this._sensors.length-1))}_addSensor(){if(this._expandedSensorIndex=this._sensors.length,this._sensors=[...this._sensors,{entity:"",label:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeSensor(e){if(this._sensors=this._sensors.filter((t,i)=>i!==e),0===this._sensors.length?this._expandedSensorIndex=null:this._expandedSensorIndex===e?this._expandedSensorIndex=Math.min(e,this._sensors.length-1):null!==this._expandedSensorIndex&&this._expandedSensorIndex>e&&(this._expandedSensorIndex-=1),this.config){const e=JSON.parse(JSON.stringify(this.config));e.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_toggleSensor(e){this._expandedSensorIndex=this._expandedSensorIndex===e?null:e}_moveSensor(e,t){if(this._expandedSensorIndex=jo(this._expandedSensorIndex,e,t),this._sensors=Mo(this._sensors,e,t),!this.config)return;const i=JSON.parse(JSON.stringify(this.config));i.sensors=[...this._sensors],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}static get styles(){return a`
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
        `}render(){return this.hass&&this.config?V`
            <div class="content">
                ${0===this._sensors.length?V`
                    <div class="empty-sensors">${this.t("editor.sensors.empty","No sensors configured.")}</div>
                `:""}
                <div class="sensor-list">
                ${this._sensors.map((e,t)=>{const i=this._expandedSensorIndex===t,o=e.label||e.entity||this.t("editor.sensors.sensor","Sensor {number}",{number:t+1});return V`
                    <div class="sensor-card ${i?"":"collapsed"}">
                        <div class="sensor-header">
                            <span class="sensor-drag-handle"
                                  title=${this.t("designer.drag_to_move","Drag to move")}
                                  aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                <ha-icon icon="mdi:drag"></ha-icon>
                            </span>
                            <button class="sensor-toggle" type="button"
                                    aria-expanded=${i}
                                    @click=${()=>this._toggleSensor(t)}>
                                <span class="sensor-title">${o}</span>
                            </button>
                            <button class="sensor-icon-button remove" type="button"
                                    title=${this.t("editor.sensors.remove","Remove sensor")}
                                    aria-label=${this.t("editor.sensors.remove","Remove sensor")}
                                    @click=${()=>this._removeSensor(t)}>
                                <ha-icon icon="mdi:delete-outline"></ha-icon>
                            </button>
                            <button class="sensor-icon-button" type="button"
                                    title=${i?this.t("editor.sensors.collapse","Collapse sensor"):this.t("editor.sensors.expand","Expand sensor")}
                                    aria-label=${i?this.t("editor.sensors.collapse","Collapse sensor"):this.t("editor.sensors.expand","Expand sensor")}
                                    @click=${()=>this._toggleSensor(t)}>
                                <ha-icon icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </button>
                        </div>
                        ${i?V`<div class="sensor-body">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${e.label||""}
                                .label=${this.t("editor.sensors.label","Label")}
                                .labelPosition=${en.Top}
                                propertyName="sensors.${t}.label"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{entity:{filter:{domain:["sensor","binary_sensor","input_text","input_number","input_datetime","sun","weather"]}}}}
                                .value=${e.entity||""}
                                .label=${this.t("editor.sensors.entity","Entity")}
                                .labelPosition=${en.Top}
                                propertyName="sensors.${t}.entity"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{icon:{}}}
                                .value=${e.icon||""}
                                .label=${this.t("editor.sensors.icon","Icon")}
                                .helper=${this.t("editor.sensors.icon_help","Empty uses the Home Assistant entity icon")}
                                .labelPosition=${en.Top}
                                propertyName="sensors.${t}.icon"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        </div>`:""}
                    </div>
                `})}
                </div>

                <button class="add-sensor" type="button" @click=${this._addSensor}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                    ${this.t("editor.sensors.add","Add sensor")}
                </button>
            </div>
        `:V``}};Vn([ve({type:Array})],Zn.prototype,"_sensors",void 0),Vn([fe()],Zn.prototype,"_expandedSensorIndex",void 0),Zn=Vn([pe("sensors-editor")],Zn);class Kn{static getInstance(){return Kn.instance||(Kn.instance=new Kn),Kn.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&ze.warn(`Transportation provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const qn=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(e,t){try{if(0===t.length)throw new Error("No stops configured");const i={};for(const e of t){const t=String(e.stopId);i[t]||(i[t]=[]),i[t].push(e)}const o=[];for(const t of Object.keys(i)){const n=i[t],a=n.map(e=>e.postId),r=`https://transportation-proxy.datario.app/proxy/departures?stopid=${t}`,s=await fetch(r,{headers:{"X-Api-Key":"2f8a0c7b2e9a44a4b8aa9a6b4a3d1e2f"}});if(!s.ok)throw new Error(`Failed to fetch transportation data: ${s.status} ${s.statusText}`);const l=await s.json();if(l.Error)throw new Error(`API error: ${l.Error}`);for(const i of a){const a=l.PostList.find(e=>e.PostID===i);if(!a){ze.warn(`No platform found with postId ${i} for stopId ${t}`);continue}const r=a.Name,s=n.find(e=>e.postId===i);if(!s)continue;const c=s.name||r,d=e.maxDepartures||2,h=a.Departures.slice(0,Math.min(d,5)).map(e=>({lineId:e.LineId||e.Line,lineName:e.Line||e.LineName,finalStop:e.FinalStop,isLowFloor:e.IsLowFloor,timeMark:e.TimeMark,stopName:c,postId:i}));o.push(...h)}}return{departures:o,loading:!1}}catch(e){return ze.error("Error fetching transportation data:",e),{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getDefaultConfig(){return{}}},Jn=new class{constructor(){this.id="homeassistant",this.name="Home Assistant entities",this.description="Departure sensors and an on-demand refresh button from Home Assistant",this.usesHassStateUpdates=!0}setHass(e){this.hass=e}async activateAsync(e){const t=this.requireHass(),i=this.getButtonEntityIds(e);if(0===i.length)throw new Error("At least one Home Assistant refresh button entity is required");for(const e of i)if(!t.states[e])throw new Error(`Entity ${e} not found`);await t.callService("button","press",{entity_id:1===i.length?i[0]:i})}async fetchTransportationAsync(e,t){var i;try{const t=this.requireHass(),o=this.getConfiguredProfiles(e);if(0===o.flatMap(e=>this.getProfileEntityIds(e)).length)throw new Error("At least one Home Assistant departure sensor is required");const n=[];for(const[e,a]of o.entries())for(const o of this.getProfileEntityIds(a)){const r=t.states[o];if(!r)throw new Error(`Entity ${o} not found`);if("unknown"===r.state||"unavailable"===r.state)continue;const s=r.attributes,l=s.line,c=s.destination;if(void 0===l||!c)continue;const d=String((null===(i=a.name)||void 0===i?void 0:i.trim())||s.stop_name||r.attributes.friendly_name||o),h=this.optionalIdentifier(s.post_id);n.push({lineId:String(l),lineName:String(l),finalStop:String(c),isLowFloor:!0===s.is_low_floor,timeMark:this.formatState(t,r),stopName:d,postId:h,groupId:`homeassistant-profile-${e}`,entityId:o,departureAt:s.departure_at,hasAirConditioning:!0===s.has_air_conditioning,occupancy:s.occupancy,occupancyPercent:s.occupancy_percent,vehicleId:s.vehicle_id})}return{departures:n,loading:!1}}catch(e){return{departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}}getHassStateKey(e){return this.hass?this.getEntityIds(e).map(e=>{var t;const i=null===(t=this.hass)||void 0===t?void 0:t.states[e];return i?`${e}:${i.state}:${i.last_updated}:${JSON.stringify(i.attributes)}`:`${e}:missing`}).join("|"):""}getDefaultConfig(){return{profiles:[]}}requireHass(){if(!this.hass)throw new Error("Home Assistant instance not set");return this.hass}getEntityIds(e){return this.getConfiguredProfiles(e).flatMap(e=>this.getProfileEntityIds(e))}getButtonEntityIds(e){var t,i;const o=(null===(t=e.profiles)||void 0===t?void 0:t.length)?e.profiles.map(e=>e.refreshButtonEntity||""):(null===(i=e.refreshButtonEntities)||void 0===i?void 0:i.length)?e.refreshButtonEntities:[e.refreshButtonEntity||""];return[...new Set(o.map(e=>e.trim()).filter(Boolean))]}getConfiguredProfiles(e){var t;return(null===(t=e.profiles)||void 0===t?void 0:t.length)?e.profiles:[{departureEntities:e.departureEntities||[]}]}getProfileEntityIds(e){return(e.departureEntities||[]).map(e=>e.trim()).filter(Boolean)}formatState(e,t){const i=e.formatEntityState;if("function"==typeof i)try{return String(i.call(e,t))}catch(e){}const o=t.attributes.unit_of_measurement;return`${t.state}${o?` ${o}`:""}`}optionalIdentifier(e){return"string"==typeof e||"number"==typeof e?e:void 0}},Gn=Kn.getInstance();function Yn(e){return Gn.getProvider(e)}Gn.register(qn),Gn.register(Jn);var Xn=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Qn=null,ea=null,ta=class extends Tt{constructor(){super(...arguments),this._stops=[],this._expandedStopIndex=Qn,this._haProfiles=[],this._expandedHaProfileIndex=ea,this.sortableList=new Lo(this,{containerSelector:".stop-list",draggable:".stop-card",handle:".stop-drag-handle",ghostClass:"stop-card-ghost",onMove:(e,t)=>{var i,o;"ha-profiles"===(null===(o=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector(".stop-list"))||void 0===o?void 0:o.dataset.kind)?this._moveHaProfile(e,t):this._moveStop(e,t)}})}updated(e){super.updated(e),e.has("config")&&this.config&&(this._loadStops(),this._loadHaProfiles()),this.sortableList.schedule()}disconnectedCallback(){this.sortableList.disconnect(),super.disconnectedCallback()}_loadHaProfiles(){var e,t;const i=null===(e=this.config)||void 0===e?void 0:e.transportation,o=null==i?void 0:i.providerConfig,n=null==o?void 0:o.profiles;if(null==n?void 0:n.length)this._haProfiles=n.map(e=>({...e,departureEntities:[...e.departureEntities||[]]}));else{const e=(null===(t=null==o?void 0:o.refreshButtonEntities)||void 0===t?void 0:t.length)?o.refreshButtonEntities:(null==o?void 0:o.refreshButtonEntity)?[o.refreshButtonEntity]:[],i=[...(null==o?void 0:o.departureEntities)||[]];if(e.length<=1)this._haProfiles=e.length||i.length?[{refreshButtonEntity:e[0],departureEntities:i}]:[];else{const t=Math.ceil(i.length/e.length);this._haProfiles=e.map((e,o)=>({refreshButtonEntity:e,departureEntities:t?i.slice(o*t,(o+1)*t):[]}))}}0===this._haProfiles.length?this._expandedHaProfileIndex=null:null!==this._expandedHaProfileIndex&&(this._expandedHaProfileIndex=Math.min(this._expandedHaProfileIndex,this._haProfiles.length-1)),ea=this._expandedHaProfileIndex}_saveHaProfiles(){var e,t;if(!(null===(e=this.config)||void 0===e?void 0:e.transportation))return;const i=JSON.parse(JSON.stringify(this.config));(t=i.transportation).providerConfig||(t.providerConfig={}),i.transportation.providerConfig.profiles=this._haProfiles.map(e=>{const{maxDepartures:t,...i}=e;return{...i,departureEntities:[...e.departureEntities||[]]}}),delete i.transportation.providerConfig.refreshButtonEntity,delete i.transportation.providerConfig.refreshButtonEntities,delete i.transportation.providerConfig.departureEntities,delete i.transportation.maxDepartures,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}_addHaProfile(){this._expandedHaProfileIndex=this._haProfiles.length,ea=this._expandedHaProfileIndex,this._haProfiles=[...this._haProfiles,{name:"",refreshButtonEntity:"",departureEntities:[]}],this._saveHaProfiles()}_removeHaProfile(e){this._haProfiles=this._haProfiles.filter((t,i)=>i!==e),0===this._haProfiles.length||this._expandedHaProfileIndex===e?this._expandedHaProfileIndex=null:null!==this._expandedHaProfileIndex&&this._expandedHaProfileIndex>e&&(this._expandedHaProfileIndex-=1),ea=this._expandedHaProfileIndex,this._saveHaProfiles()}_haProfileChanged(e,t,i){this._haProfiles=this._haProfiles.map((o,n)=>n===e?{...o,[t]:i}:o),this._saveHaProfiles()}_toggleHaProfile(e){this._expandedHaProfileIndex=this._expandedHaProfileIndex===e?null:e,ea=this._expandedHaProfileIndex}_moveHaProfile(e,t){this._expandedHaProfileIndex=jo(this._expandedHaProfileIndex,e,t),ea=this._expandedHaProfileIndex,this._haProfiles=Mo(this._haProfiles,e,t),this._saveHaProfiles()}_haProfileLabel(e,t){var i,o,n;const a=null===(i=e.name)||void 0===i?void 0:i.trim();if(a)return a;const r=e.refreshButtonEntity?null===(n=null===(o=this.hass)||void 0===o?void 0:o.states[e.refreshButtonEntity])||void 0===n?void 0:n.attributes.friendly_name:void 0;if(r){const e=String(r).replace(/\s+(Aktualizovat odjezdy|Refresh departures)$/iu,"").trim();if(e)return e}return this.t("editor.transportation.stop","Stop {number}",{number:t+1})}_entityLabel(e){var t,i;return function(e,t){return String(t||e).trim().replace(/\s+(Aktualizovat odjezdy|Refresh departures)$/iu," — $1").replace(/\s+(Odjezd \d+|Departure \d+)$/iu," — $1")}(e,null===(i=null===(t=this.hass)||void 0===t?void 0:t.states[e])||void 0===i?void 0:i.attributes.friendly_name)}_loadStops(){var e;if(!(null===(e=this.config)||void 0===e?void 0:e.transportation))return this._stops=[],this._expandedStopIndex=null,void(Qn=null);this.config.transportation.stops&&this.config.transportation.stops.length>0?this._stops=[...this.config.transportation.stops]:this._stops=[],0===this._stops.length?this._expandedStopIndex=null:null!==this._expandedStopIndex&&(this._expandedStopIndex=Math.min(this._expandedStopIndex,this._stops.length-1)),Qn=this._expandedStopIndex}_addStop(){if(this._expandedStopIndex=this._stops.length,Qn=this._expandedStopIndex,this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this.config){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_removeStop(e){if(this._stops=this._stops.filter((t,i)=>i!==e),0===this._stops.length||this._expandedStopIndex===e?this._expandedStopIndex=null:null!==this._expandedStopIndex&&this._expandedStopIndex>e&&(this._expandedStopIndex-=1),Qn=this._expandedStopIndex,this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],0===this._stops.length&&(e.transportation=void 0),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_stopChanged(e,t,i){if(this._stops=this._stops.map((o,n)=>n===e?{...o,[t]:i}:o),this.config&&this.config.transportation){const e=JSON.parse(JSON.stringify(this.config));e.transportation||(e.transportation={stops:[],maxDepartures:2}),e.transportation.stops||(e.transportation.stops=[]),e.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}}_toggleStop(e){this._expandedStopIndex=this._expandedStopIndex===e?null:e,Qn=this._expandedStopIndex}_moveStop(e,t){var i;if(this._expandedStopIndex=jo(this._expandedStopIndex,e,t),Qn=this._expandedStopIndex,this._stops=Mo(this._stops,e,t),!(null===(i=this.config)||void 0===i?void 0:i.transportation))return;const o=JSON.parse(JSON.stringify(this.config));o.transportation.stops=[...this._stops],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o}}))}_normalizeStopId(e){const t=String(null!=e?e:"").trim();if(t)return/^-?\d+$/.test(t)?Number(t):t}_getTransportationProviderOptions(){return[...Gn.getAllProviders().map(e=>({value:e.id,label:e.name}))]}static get styles(){return a`
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
        `}render(){var e,t,i,o,n,a;if(!this.hass||!this.config)return V``;if(!(null===(e=this.config.transportation)||void 0===e?void 0:e.enabled))return V``;const r="homeassistant"===this.config.transportation.provider;return V`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this._getTransportationProviderOptions(),mode:"dropdown"}}}
                        .value=${(null===(t=this.config.transportation)||void 0===t?void 0:t.provider)||"idsjmk"}
                        .label=${this.t("editor.transportation.provider","Transportation provider")}
                        propertyName="transportation.provider"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:[{value:"inline",label:this.t("editor.transportation.display_inline","In card layout")},{value:"modal",label:this.t("editor.transportation.display_modal","Modal dialog")}],mode:"dropdown"}}}
                        .value=${null!==(i=this.config.transportation.displayMode)&&void 0!==i?i:"inline"}
                        .label=${this.t("editor.transportation.display_mode","Departure display")}
                        .helper=${this.t("editor.transportation.display_mode_help","Choose where departures open after pressing the transportation action")}
                        propertyName="transportation.displayMode"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${r?V`
                    <div class="section-subheader">${this.t("editor.transportation.stops","Stops")}</div>

                    <div class="stop-list" data-kind="ha-profiles">
                    ${this._haProfiles.map((e,t)=>{const i=this._expandedHaProfileIndex===t;return V`
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
                                    <strong>${this._haProfileLabel(e,t)}</strong>
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
                            ${i?V`<div class="stop-body">
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text:{}}}
                                        .value=${e.name||""}
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

                ${r?"":V`<ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,max:5,step:1,mode:"slider"}}}
                        .value=${(null===(o=this.config.transportation)||void 0===o?void 0:o.maxDepartures)||2}
                        .label=${this.t("editor.transportation.max_departures","Maximum departures per stop")}
                        .helper=${this.t("editor.transportation.departures","{count} departures",{count:(null===(n=this.config.transportation)||void 0===n?void 0:n.maxDepartures)||2})}
                        propertyName="transportation.maxDepartures"
                        @value-changed=${e=>{this._handleFormValueChanged(e),this._loadStops()}}
                ></ha-row-selector>`}

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,max:10,step:1,mode:"box"}}}
                        .value=${(null===(a=this.config.transportation)||void 0===a?void 0:a.autoHideTimeout)||5}
                        .label=${this.t("editor.transportation.auto_hide","Auto-hide timeout")}
                        .helper=${this.t("editor.transportation.auto_hide_help","Auto-hide timeout in minutes (1–10)")}
                        propertyName="transportation.autoHideTimeout"
                        .transformData=${e=>Math.max(Math.min(e||5,10),1)}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${r?"":V`<ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number:{min:1,step:1,mode:"box"}}}
                        .value=${Math.floor((this.config.transportation.updateInterval||60)/60)}
                        .label=${this.t("editor.transportation.update_interval","Update interval")}
                        .helper=${this.t("editor.transportation.update_help","Update interval in minutes (minimum 1)")}
                        propertyName="transportation.updateInterval"
                        .transformData=${e=>60*Math.max(e||1,1)}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>`}

                ${r?"":V`
                <div class="section-subheader">${this.t("editor.transportation.stops","Stops")}</div>

                <div class="stop-list" data-kind="direct-stops">
                ${this._stops.map((e,t)=>{var i,o,n;const a=this._expandedStopIndex===t;return V`
                    <div class="stop-card ${a?"":"collapsed"}">
                        <div class="stop-header">
                            <span class="stop-drag-handle"
                                  title=${this.t("designer.drag_to_move","Drag to move")}
                                  aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                <ha-icon icon="mdi:drag"></ha-icon>
                            </span>
                            <button class="stop-toggle" type="button"
                                    aria-expanded=${a}
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
                                    title=${a?this.t("editor.transportation.collapse_stop","Collapse stop"):this.t("editor.transportation.expand_stop","Expand stop")}
                                    aria-label=${a?this.t("editor.transportation.collapse_stop","Collapse stop"):this.t("editor.transportation.expand_stop","Expand stop")}
                                    @click=${()=>this._toggleStop(t)}>
                                <ha-icon icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </button>
                        </div>
                        ${a?V`<div class="stop-body">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${String(null!==(i=e.stopId)&&void 0!==i?i:"")}
                                .label=${this.t("editor.transportation.stop_id","Stop ID")}
                                @value-changed=${e=>this._stopChanged(t,"stopId",this._normalizeStopId(e.detail.value))}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${String(null!==(o=e.postId)&&void 0!==o?o:"")}
                                .label=${this.t("editor.transportation.post_id","Post ID")}
                                @value-changed=${e=>this._stopChanged(t,"postId",this._normalizeStopId(e.detail.value))}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${null!==(n=e.name)&&void 0!==n?n:""}
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
                `}

                <div class="info-text">
                    <a
                        href="https://github.com/rkotulan/ha-wall-clock-card/blob/main/docs/transportation.md"
                        target="_blank">${this.t("editor.transportation.documentation","Transportation configuration documentation")}</a>
                </div>
            </div>
        `}};Xn([ve({type:Array})],ta.prototype,"_stops",void 0),Xn([fe()],ta.prototype,"_expandedStopIndex",void 0),Xn([fe()],ta.prototype,"_haProfiles",void 0),Xn([fe()],ta.prototype,"_expandedHaProfileIndex",void 0),ta=Xn([pe("transportation-editor")],ta);let ia=class extends Tt{constructor(){super(...arguments),this._weatherIconSetOptions=[{value:"metno",label:"Met.no (SVG)"},{value:"openweathermap",label:"OpenWeatherMap (PNG)"},{value:"basmilius",label:"Bas Milius (Animated)"}]}_weatherProviderOptions(){return[{value:"none",label:this.t("editor.weather.provider_none","None (disable weather)")},{value:"homeassistant",label:this.t("editor.weather.provider_ha","Home Assistant entity")},{value:"openweathermap",label:"OpenWeatherMap"}]}_unitsOptions(){return[{value:"metric",label:this.t("editor.weather.metric","Metric (°C, m/s)")},{value:"imperial",label:this.t("editor.weather.imperial","Imperial (°F, mph)")}]}_weatherDisplayModeOptions(){return[{value:"current",label:this.t("editor.weather.current","Current weather only")},{value:"forecast",label:this.t("editor.weather.forecast","Forecast only")},{value:"both",label:this.t("editor.weather.both","Current and forecast")}]}static get styles(){return a`
            .content {
                padding: 12px;
            }
        `}render(){var e,t,i,o,n;return this.hass&&this.config?V`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${this.config.showWeather||!1}
                        .label=${this.t("editor.weather.show","Show weather")}
                        .helper=${this.t("editor.weather.show_help","Display current weather and forecast")}
                        propertyName="showWeather"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${this.config.showWeather?V`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{text:{type:"text"}}}
                            .value=${this.config.weatherTitle||this.t("common.title","Weather")}
                            .label=${this.t("editor.weather.title","Weather title")}
                            propertyName="weatherTitle"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:this._weatherProviderOptions(),mode:"dropdown"}}}
                            .value=${this.config.weatherProvider||"openweathermap"}
                            .label=${this.t("editor.weather.provider","Weather provider")}
                            propertyName="weatherProvider"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    ${"homeassistant"===this.config.weatherProvider?V`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{entity:{domain:"weather"}}}
                                .value=${(null===(e=this.config.weatherConfig)||void 0===e?void 0:e.entityId)||""}
                                .label=${this.t("editor.weather.entity","Weather entity")}
                                propertyName="weatherConfig.entityId"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    `:""}


                    ${"openweathermap"===this.config.weatherProvider?V`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text:{type:"text"}}}
                                .value=${(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.apiKey)||""}
                                .label=${this.t("editor.weather.api_key","API key")}
                                .helper=${this.t("editor.weather.api_key_help","OpenWeatherMap API key")}
                                propertyName="weatherConfig.apiKey"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    `:""}

                    ${"openweathermap"===this.config.weatherProvider?V`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:-90,max:90,step:1e-4,mode:"box"}}}
                                .value=${(null===(i=this.config.weatherConfig)||void 0===i?void 0:i.latitude)||50.0755}
                                .label=${this.t("editor.weather.latitude","Latitude")}
                                propertyName="weatherConfig.latitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:-180,max:180,step:1e-4,mode:"box"}}}
                                .value=${(null===(o=this.config.weatherConfig)||void 0===o?void 0:o.longitude)||14.4378}
                                .label=${this.t("editor.weather.longitude","Longitude")}
                                propertyName="weatherConfig.longitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select:{options:this._unitsOptions(),mode:"dropdown"}}}
                                .value=${(null===(n=this.config.weatherConfig)||void 0===n?void 0:n.units)||"metric"}
                                .label=${this.t("editor.weather.units","Units")}
                                propertyName="weatherConfig.units"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    `:""}

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:this._weatherDisplayModeOptions(),mode:"dropdown"}}}
                            .value=${this.config.weatherDisplayMode||"both"}
                            .label=${this.t("editor.weather.display_mode","Display mode")}
                            propertyName="weatherDisplayMode"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select:{options:this._weatherIconSetOptions,mode:"dropdown"}}}
                            .value=${this.config.weatherIconSet||("homeassistant"===this.config.weatherProvider?"metno":"openweathermap")}
                            .label=${this.t("editor.weather.icon_set","Weather icon set")}
                            propertyName="weatherIconSet"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>


                    ${"forecast"===this.config.weatherDisplayMode||"both"===this.config.weatherDisplayMode?V`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:1,max:7,step:1,mode:"slider"}}}
                                .value=${this.config.weatherForecastDays||3}
                                .label=${this.t("editor.weather.forecast_days","Forecast days")}
                                .helper=${this.t("editor.weather.days","{count} days",{count:this.config.weatherForecastDays||3})}
                                propertyName="weatherForecastDays"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number:{min:1,step:1,mode:"box"}}}
                                .value=${Math.floor((this.config.weatherUpdateInterval||1800)/60)}
                                .label=${this.t("editor.weather.update_interval","Update interval")}
                                .helper=${this.t("editor.weather.update_help","Update interval in minutes (minimum 1)")}
                                propertyName="weatherUpdateInterval"
                                .transformData=${e=>60*e}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    `:""}
                `:""}
            </div>
        `:V``}};ia=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("weather-editor")],ia);let oa=class extends Tt{render(){var e,t,i,o,n;return this.hass&&this.config?V`
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
                        .value=${null!==(i=this.config.opacity)&&void 0!==i?i:.35}
                        .label=${this.t("editor.separator.opacity","Opacity")}
                        propertyName="opacity"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(o=this.config.thickness)&&void 0!==o?o:"1px"}
                        .label=${this.t("editor.separator.thickness","Thickness")}
                        .helper=${this.t("editor.separator.thickness_help","CSS length, for example 1px or 0.15rem.")}
                        propertyName="thickness"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(n=this.config.length)&&void 0!==n?n:"100%"}
                        .label=${this.t("editor.separator.length","Length")}
                        .helper=${this.t("editor.separator.length_help","CSS length or percentage, for example 100% or 240px.")}
                        propertyName="length"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>
            </div>
        `:V``}};oa.styles=a`
        .content {
            padding: 12px;
        }
    `,oa=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("separator-editor")],oa);const na=["top-left","top-center","top-right","middle-left","center","middle-right","bottom-left","bottom-center","bottom-right"],aa=["grid-3x3","vertical-2-1","vertical-1-2","horizontal-2-1","horizontal-1-2"],ra=["none","glass"];function sa(e){return(null==e?void 0:e.endsWith("-left"))?"start":(null==e?void 0:e.endsWith("-right"))?"end":"center"}const la={compact:{padding:"8px",zoneGap:"8px",widgetGap:"4px"},normal:{padding:"16px",zoneGap:"16px",widgetGap:"8px"},spacious:{padding:"32px",zoneGap:"24px",widgetGap:"16px"}},ca=Se("migrate-config");function da(e){const t={};for(const[i,o]of Object.entries(e))void 0!==o&&(t[i]=o);return t}const ha=["timeFormat","dateFormat","sensors","showWeather","weatherProvider","weatherConfig","weatherDisplayMode","weatherForecastDays","weatherTitle","weatherUpdateInterval","weatherIconSet","transportation","actionBar","enableActionBar","imageSource","imageConfig","backgroundImages","backgroundOpacity","backgroundRotationInterval","objectFit","fontColor","fontFamily","language","timeZone","size","customSizes"];function ua(e){var t,i,o,n,a,r,s,l,c,d,h,u;if(function(e){var t;return!!(null===(t=e.layout)||void 0===t?void 0:t.zones)}(e))return e;const p={},g=(e,t,i)=>{const o=p[e];o?o.widgets.push(t):p[e]={...i,widgets:[t]}};g("center",pa({type:"clock",id:"clock",timeFormat:e.timeFormat,clockSize:null===(t=e.customSizes)||void 0===t?void 0:t.clockSize})),g("center",pa({type:"date",id:"date",dateFormat:e.dateFormat,dateSize:null===(i=e.customSizes)||void 0===i?void 0:i.dateSize})),(null===(o=e.customSizes)||void 0===o?void 0:o.clockTopMargin)&&ca.info(`customSizes.clockTopMargin ('${e.customSizes.clockTopMargin}') is obsolete in the zone layout and was dropped`),e.sensors&&e.sensors.length>0&&g("top-left",pa({type:"sensors",id:"sensors",sensors:e.sensors,labelSize:null===(n=e.customSizes)||void 0===n?void 0:n.labelSize,valueSize:null===(a=e.customSizes)||void 0===a?void 0:a.valueSize})),e.showWeather&&g("top-right",pa({type:"weather",id:"weather",provider:e.weatherProvider,providerConfig:e.weatherConfig,displayMode:e.weatherDisplayMode,forecastDays:e.weatherForecastDays,title:e.weatherTitle,updateInterval:e.weatherUpdateInterval,iconSet:null!==(r=e.weatherIconSet)&&void 0!==r?r:null===(s=e.weatherConfig)||void 0===s?void 0:s.iconSet,labelSize:null===(l=e.customSizes)||void 0===l?void 0:l.labelSize,valueSize:null===(c=e.customSizes)||void 0===c?void 0:c.valueSize})),e.transportation&&g("bottom-center",pa({type:"transportation",id:"transportation",...e.transportation,priority:10}),{mode:"exclusive"}),(null!==(h=null===(d=e.actionBar)||void 0===d?void 0:d.enabled)&&void 0!==h?h:!0===e.enableActionBar)&&g("bottom-center",pa({type:"action-bar",id:"action-bar",actions:[],...e.actionBar,enabled:!0,iconSize:null===(u=e.customSizes)||void 0===u?void 0:u.actionBarIconSize,priority:5}),{mode:"exclusive"});const m=da({source:e.imageSource,config:e.imageConfig,images:e.backgroundImages,opacity:e.backgroundOpacity,rotationInterval:e.backgroundRotationInterval,objectFit:e.objectFit}),v=da({fontColor:e.fontColor,fontFamily:e.fontFamily,language:e.language,timeZone:e.timeZone,size:e.size}),f={};for(const[t,i]of Object.entries(e))ha.includes(t)||void 0===i||(f[t]=i);const y={...f,layout:{zones:p}};return Object.keys(m).length>0&&(y.background=m),Object.keys(v).length>0&&(y.appearance=v),y}function pa(e){return da(e)}const ga=/^(0|-?\d+(\.\d+)?(px|rem|em|%|vh|vw))$/;function ma(e,t){return function(e,t){const i=e.trim().split(/\s+/);return i.length>=1&&i.length<=t&&i.every(e=>ga.test(e))}(t,"padding"===e?4:1)}function va(e){const t=null==e?void 0:e.spacing,i="string"==typeof t&&t in la?t:"normal";"string"!=typeof t||t in la||ca.warn(`Unknown spacing preset '${t}', falling back to 'normal'`);const o={...la[i]};if(t&&"object"==typeof t){const e=["padding","zoneGap","widgetGap"];for(const i of e){const e=t[i];void 0!==e&&("string"==typeof e&&ma(i,e)?o[i]=e:ca.warn(`Invalid spacing.${i} value '${e}', falling back to '${o[i]}'`))}}return o}function fa(e){return JSON.parse(JSON.stringify(e))}function ya(e,t){return Object.values(e.zones).some(e=>{var i;return null===(i=null==e?void 0:e.widgets)||void 0===i?void 0:i.some(e=>e.type===t)})}function ba(e,t){const i=new Set(t),o=new Map;for(const[t,n]of Object.entries(e.zones))null==n||n.widgets.forEach((e,n)=>{if(!i.has(e.type))return;const a=e.id===e.type,r=o.get(e.type);(!r||a&&!r.canonical)&&o.set(e.type,{zone:t,index:n,canonical:a})});const n=fa(e);for(const[t,a]of Object.entries(e.zones)){if(!a)continue;const e=n.zones[t];e&&(e.widgets=a.widgets.filter((e,n)=>{if(!i.has(e.type))return!0;const a=o.get(e.type);return(null==a?void 0:a.zone)===t&&a.index===n}).map(e=>fa(e)),0===e.widgets.length&&delete n.zones[t])}return n}function wa(e,t){const i=function(e){var t;const i=new Set;for(const o of Object.values(e.zones))null===(t=null==o?void 0:o.widgets)||void 0===t||t.forEach(e=>{e.id&&i.add(e.id)});return i}(e);if(!i.has(t))return t;let o=2;for(;i.has(`${t}-${o}`);)o++;return`${t}-${o}`}function _a(e,t){var i;for(const[o,n]of Object.entries(e.zones)){const e=null!==(i=null==n?void 0:n.widgets.findIndex(e=>e.id===t))&&void 0!==i?i:-1;if(e>=0&&n)return{zone:o,index:e,widget:n.widgets[e]}}}function xa(e,t,i,o){var n;const a=fa(e),r={...fa(i),id:wa(e,i.type)},s=null!==(n=a.zones[t])&&void 0!==n?n:{widgets:[]},l=void 0===o?s.widgets.length:Math.max(0,Math.min(o,s.widgets.length));return s.widgets.splice(l,0,r),a.zones[t]=s,a}function $a(e,t){const i=fa(e);return void 0===t?delete i.spacing:i.spacing=t,i}function ka(e,t){const i=fa(e);return"none"===t?delete i.preset:i.preset=t,i}function Sa(e,t,i,o){var n;for(const a of Object.values(e.layout.zones))null===(n=null==a?void 0:a.widgets)||void 0===n||n.forEach(e=>{e.type===t&&(void 0===o||""===o?delete e[i]:e[i]=o)})}function Ca(e,t,i){const o=fa(e);switch(t){case"fontColor":case"fontFamily":case"language":case"size":return o.appearance={...o.appearance,[t]:i},o;case"logLevel":return o.logLevel=i,o;case"customSizes.clockSize":return Sa(o,"clock","clockSize",i),o;case"customSizes.dateSize":return Sa(o,"date","dateSize",i),o;case"customSizes.labelSize":return Sa(o,"sensors","labelSize",i),Sa(o,"weather","labelSize",i),o;case"customSizes.valueSize":return Sa(o,"sensors","valueSize",i),Sa(o,"weather","valueSize",i),o;case"customSizes.actionBarIconSize":return Sa(o,"action-bar","iconSize",i),o;default:return o}}function za(e){const t=null==e?void 0:e.format;return t&&aa.includes(t)?t:"grid-3x3"}function Ia(e){const t=null==e?void 0:e.preset;return t&&ra.includes(t)?t:"none"}function Aa(e,t){const{row:i,column:o}=function(e){if("center"===e)return{row:"middle",column:"center"};const[t,i]=e.split("-");return{row:t,column:i}}(t),n="top"===i?"start":"bottom"===i?"end":"center";return"vertical-2-1"===e?{row:"top"===i?1:"middle"===i?2:3,column:"right"===o?2:1,alignSelf:n}:"vertical-1-2"===e?{row:"top"===i?1:"middle"===i?2:3,column:"left"===o?1:2,alignSelf:n}:"horizontal-2-1"===e?{row:"bottom"===i?2:1,column:"left"===o?1:"center"===o?2:3,alignSelf:n}:"horizontal-1-2"===e?{row:"top"===i?1:2,column:"left"===o?1:"center"===o?2:3,alignSelf:n}:{row:"top"===i?1:"middle"===i?2:3,column:"left"===o?1:"center"===o?2:3,alignSelf:n}}function Ea(e){switch(e){case"vertical-2-1":return"right";case"vertical-1-2":return"left";case"horizontal-2-1":return"bottom";case"horizontal-1-2":return"top";default:return}}var Da=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Pa=class extends he{constructor(){super(...arguments),this.config={},this.inspector=!1,this.spacingDraft={},this.spacingErrors={}}t(e,t){return qe(e,this.hass,t)}get v3(){return ua(this.config)}get layout(){return this.v3.layout}static get styles(){return a`
            .content {
                padding: 12px;
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
        `}emitLayout(e){$t(this,"config-changed",{config:{...this.v3,layout:e}})}get spacingPresetValue(){const e=this.layout.spacing;return void 0===e?"normal":"string"==typeof e?e:"custom"}handleSpacingPresetChanged(e){this.spacingDraft={},this.spacingErrors={},"custom"===e?this.emitLayout($a(this.layout,{...va(this.layout)})):"normal"===e?this.emitLayout($a(this.layout,void 0)):this.emitLayout($a(this.layout,e))}handleFormatChanged(e){const t=e;let i=function(e,t){const i=fa(e);return"grid-3x3"===t?delete i.format:i.format=t,i}(this.layout,t);"grid-3x3"===t&&(i=ka(i,"none")),this.emitLayout(i)}handleVisualPresetChanged(e){this.emitLayout(ka(this.layout,e))}renderFormat(){var e;const t=za(this.layout);return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"grid-3x3",label:this.t("layout.format_grid","Grid 3 × 3")},{value:"vertical-2-1",label:this.t("layout.format_vertical_2_1","Vertical 2/3 + 1/3")},{value:"vertical-1-2",label:this.t("layout.format_vertical_1_2","Vertical 1/3 + 2/3")},{value:"horizontal-2-1",label:this.t("layout.format_horizontal_2_1","Horizontal 2/3 + 1/3")},{value:"horizontal-1-2",label:this.t("layout.format_horizontal_1_2","Horizontal 1/3 + 2/3")}],mode:"dropdown"}}}
                    .value=${t}
                    .label=${this.t("layout.format","Layout format")}
                    .labelPosition=${this.inspector?en.Top:en.Left}
                    @value-changed=${e=>this.handleFormatChanged(e.detail.value)}
            ></ha-row-selector>
            <div class="field-help">
                ${this.t("layout.format_help","Changes the canvas geometry; widgets keep their current zones and settings.")}
            </div>
            ${"grid-3x3"!==t?V`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:[{value:"none",label:this.t("layout.preset_none","No visual preset")},{value:"glass",label:this.t("layout.preset_glass","Glass information panel")}],mode:"dropdown"}}}
                        .value=${null!==(e=this.layout.preset)&&void 0!==e?e:"none"}
                        .label=${this.t("layout.visual_preset","Visual preset")}
                        .labelPosition=${this.inspector?en.Top:en.Left}
                        @value-changed=${e=>this.handleVisualPresetChanged(e.detail.value)}
                ></ha-row-selector>
                <div class="field-help">
                    ${this.t("layout.preset_help","Presets only style the layout and never change entities, actions, or widget placement.")}
                </div>
            `:""}
        `}handleSpacingDraftChanged(e,t){if(this.spacingDraft={...this.spacingDraft,[e]:t},this.spacingErrors[e]){const t={...this.spacingErrors};delete t[e],this.spacingErrors=t}}commitSpacingValue(e){const t=this.spacingDraft[e];if(void 0===t)return;const i=t.trim().replace(/\s+/g," ");if(""!==i&&!ma(e,i))return void(this.spacingErrors={...this.spacingErrors,[e]:"padding"===e?this.t("spacing.invalid_padding","Use 1–4 CSS lengths, for example: 60px 60px 60px 16px."):this.t("spacing.invalid_length","Use one CSS length, for example: 16px.")});const o={...this.spacingDraft};delete o[e],this.spacingDraft=o;const n={...this.spacingErrors};delete n[e],this.spacingErrors=n;const a={..."object"==typeof this.layout.spacing?this.layout.spacing:{}};""===i?delete a[e]:a[e]=i,this.emitLayout($a(this.layout,a))}renderSpacingField(e,t,i,o){var n;return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text:{}}}
                    .value=${null!==(n=this.spacingDraft[e])&&void 0!==n?n:o[e]}
                    .label=${t}
                    .labelPosition=${this.inspector?en.Top:en.Left}
                    @value-changed=${t=>this.handleSpacingDraftChanged(e,t.detail.value)}
                    @focusout=${()=>this.commitSpacingValue(e)}
                    @keydown=${t=>{"Enter"===t.key&&this.commitSpacingValue(e)}}
            ></ha-row-selector>
            ${this.spacingErrors[e]?V`<div class="field-error">${this.spacingErrors[e]}</div>`:V`<div class="field-help">${i}</div>`}
        `}renderSpacing(){const e=va(this.layout);return V`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select:{options:[{value:"compact",label:this.t("spacing.compact","Compact")},{value:"normal",label:this.t("spacing.normal","Normal")},{value:"spacious",label:this.t("spacing.spacious","Spacious")},{value:"custom",label:this.t("spacing.custom","Custom")}],mode:"dropdown"}}}
                    .value=${this.spacingPresetValue}
                    .label=${this.t("spacing.preset","Spacing preset")}
                    .labelPosition=${this.inspector?en.Top:en.Left}
                    @value-changed=${e=>this.handleSpacingPresetChanged(e.detail.value)}
            ></ha-row-selector>
            ${"custom"===this.spacingPresetValue?V`
                ${this.renderSpacingField("padding",this.t("spacing.card_padding","Card padding"),this.t("spacing.card_padding_help","1–4 values: top, right, bottom, left. Example: 60px 60px 60px 16px."),e)}
                ${this.renderSpacingField("zoneGap",this.t("spacing.zone_gap","Zone gap"),this.t("spacing.zone_gap_help","One value, for example: 24px."),e)}
                ${this.renderSpacingField("widgetGap",this.t("spacing.widget_gap","Widget gap"),this.t("spacing.widget_gap_help","One value, for example: 16px."),e)}
            `:""}
        `}render(){return this.hass?V`
            <div class="content">
                ${this.config.layout?"":V`
                    <p class="hint">${this.t("spacing.legacy_hint","The first spacing change converts this legacy configuration to the zone format.")}</p>
                `}
                ${this.renderFormat()}
                ${this.renderSpacing()}
            </div>
        `:V``}};function Oa(e){const t={type:e.type};return void 0!==e.id&&(t.id=e.id),void 0!==e.priority&&(t.priority=e.priority),void 0!==e.style&&(t.style=e.style),void 0!==e.visibility&&(t.visibility=e.visibility),t}function Ta(e){return Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e))}function Na(e){var t;const i=null!==(t=e.background)&&void 0!==t?t:{};return Ta({imageSource:i.source,imageConfig:i.config,backgroundImages:i.images,backgroundOpacity:i.opacity,backgroundRotationInterval:i.rotationInterval,objectFit:i.objectFit})}function Fa(e){return Ta({source:e.imageSource,config:e.imageConfig,images:e.backgroundImages,opacity:e.backgroundOpacity,rotationInterval:e.backgroundRotationInterval,objectFit:e.objectFit})}Da([ve({type:Object})],Pa.prototype,"hass",void 0),Da([ve({type:Object})],Pa.prototype,"config",void 0),Da([ve({type:Boolean})],Pa.prototype,"inspector",void 0),Da([fe()],Pa.prototype,"spacingDraft",void 0),Da([fe()],Pa.prototype,"spacingErrors",void 0),Pa=Da([pe("layout-editor")],Pa);var Ra=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Ma=class extends he{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._actions=[],this._languageOptions=[]}t(e,t){return qe(e,this.hass,t)}connectedCallback(){super.connectedCallback(),this._languageOptions=Ge()}setConfig(e){var t,i,o,n,a,r;const s=e;if(s.layout)return void(this._config=s);const l=s.imageSource||"none";let c={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};s.timeFormat&&(c={...c,...s.timeFormat},void 0===s.timeFormat.second&&(c.second=void 0)),this._config={...s,timeFormat:c,dateFormat:s.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==s.backgroundOpacity?s.backgroundOpacity:.3,imageSource:l,imageConfig:s.imageConfig||{},backgroundRotationInterval:s.backgroundRotationInterval||90,sensors:s.sensors||[],fontColor:s.fontColor||"#FFFFFF",size:s.size||dt.Medium,customSizes:s.customSizes?{clockSize:null!==(t=s.customSizes.clockSize)&&void 0!==t?t:"16rem",dateSize:null!==(i=s.customSizes.dateSize)&&void 0!==i?i:"6rem",labelSize:null!==(o=s.customSizes.labelSize)&&void 0!==o?o:"1.5rem",valueSize:null!==(n=s.customSizes.valueSize)&&void 0!==n?n:"3rem",actionBarIconSize:null!==(a=s.customSizes.actionBarIconSize)&&void 0!==a?a:"72px",clockTopMargin:null!==(r=s.customSizes.clockTopMargin)&&void 0!==r?r:"0rem"}:{clockSize:"16rem",dateSize:"6rem",labelSize:"1.5rem",valueSize:"3rem",actionBarIconSize:"72px",clockTopMargin:"0rem"},showWeather:void 0!==s.showWeather&&s.showWeather,weatherProvider:s.weatherProvider||"openweathermap",weatherConfig:s.weatherConfig||{},weatherDisplayMode:s.weatherDisplayMode||"both",weatherForecastDays:s.weatherForecastDays||3,transportation:s.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops(),this._loadActions()}_loadSensors(){var e;(null===(e=this._config)||void 0===e?void 0:e.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var e;(null===(e=this._config)||void 0===e?void 0:e.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadActions(){var e;(null===(e=this._config)||void 0===e?void 0:e.actionBar)&&this._config.actionBar.actions&&this._config.actionBar.actions.length>0?this._actions=[...this._config.actionBar.actions]:this._actions=[]}_loadBackgroundImages(){var e;(null===(e=this._config)||void 0===e?void 0:e.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}get _isV3(){var e;return!!(null===(e=this._config)||void 0===e?void 0:e.layout)}_generalValue(e){var t,i;return this._isV3?null===(t=this._config.appearance)||void 0===t?void 0:t[e]:null===(i=this._config)||void 0===i?void 0:i[e]}_sizeValue(e,t,i,o){var n,a,r,s,l;if(this._isV3){const e="sensors"===t?this._widgetSizeValue("weather",i):void 0;return null!==(a=null!==(n=this._widgetSizeValue(t,i))&&void 0!==n?n:e)&&void 0!==a?a:o}return null!==(l=(null!==(s=null===(r=this._config)||void 0===r?void 0:r.customSizes)&&void 0!==s?s:{})[e])&&void 0!==l?l:o}_widgetSizeValue(e,t){var i,o,n;const a=null!==(o=null===(i=this._config.layout)||void 0===i?void 0:i.zones)&&void 0!==o?o:{};for(const i of Object.values(a))for(const o of null!==(n=null==i?void 0:i.widgets)&&void 0!==n?n:[])if(o.type===e&&void 0!==o[t])return o[t]}_handleFormValueChanged(e){if(e.stopPropagation(),!this._config)return;if(this._isV3){const t=Ca(this._config,e.detail.propertyName,e.detail.value);return this._config=t,void $t(this,"config-changed",{config:this._config})}const t=function(e,t,i){const o=JSON.parse(JSON.stringify(e)),n=t.split(".");let a=o;for(let e=0;e<n.length-1;e++){const t=n[e];void 0===a[t]&&(a[t]={}),a=a[t]}return a[n[n.length-1]]=i,o}(this._config,e.detail.propertyName,e.detail.value);this._config=t,$t(this,"config-changed",{config:t})}static get styles(){return a`
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
        `}render(){return this.hass&&this._config?this._isV3?V`
            <div class="designer-notice">
                <span class="designer-notice-icon"><ha-icon icon="mdi:layers-edit"></ha-icon></span>
                <div>
                    <strong>${this.t("designer.use_designer_title","Configure this card in Designer")}</strong>
                    <p>${this.t("designer.use_designer_help","Close this dialog. In dashboard edit mode, open the card with Configure card and use Card settings or select a widget.")}</p>
                </div>
            </div>
        `:this.renderLegacyEditor():V``}renderLegacyEditor(){var e,t,i,o;return this.hass&&this._config?V`
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
                                .selector=${{select:{options:this._languageOptions,mode:"dropdown"}}}
                                .value=${Ke(String(this._generalValue("language")||(null===(t=this.hass.locale)||void 0===t?void 0:t.language)||this.hass.language||"en"))}
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
                                .selector=${{select:{options:[{value:dt.Large,label:this.t("general.large","Large")},{value:dt.Medium,label:this.t("general.medium","Medium")},{value:dt.Small,label:this.t("general.small","Small")},{value:dt.Custom,label:this.t("spacing.custom","Custom")}],mode:"dropdown"}}}
                                .value=${this._generalValue("size")||dt.Medium}
                                .label=${this.t("general.size","Size")}
                                propertyName="size"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${(this._generalValue("size")||dt.Medium)===dt.Custom?V`
                            <h4>${this.t("general.custom_sizes","Custom sizes")}</h4>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text:{}}}
                                    .value=${this._sizeValue("clockSize","clock","clockSize","16rem")}
                                    .label=${this.t("inspector.clock_size","Clock size (e.g., 16rem)")}
                                    propertyName="customSizes.clockSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${this._isV3?"":V`
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
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Spacing Section (widget placement/configuration is edited in-place) -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">${this.t("general.spacing","Spacing")}</h3>
                    <layout-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${e=>{this._config=e.detail.config,$t(this,"config-changed",{config:this._config})}}
                    ></layout-editor>
                </ha-expansion-panel>

                <!-- Background Section (v3: adapted to background.* keys) -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">${this.t("general.background","Background")}</h3>
                    <background-editor
                        .hass=${this.hass}
                        .config=${this._isV3?Na(this._config):this._config}
                        @config-changed=${e=>{this._isV3?this._config={...this._config,background:Fa(e.detail.config)}:(this._config=e.detail.config,this._loadBackgroundImages()),$t(this,"config-changed",{config:this._config})}}
                    ></background-editor>
                </ha-expansion-panel>

                ${this._isV3?"":V`
                    <!-- Legacy sections: for zone layouts these settings are edited
                         per widget in the Layout section above -->

                    <!-- Time Format Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("general.time_format","Time format")}</h3>
                        <time-format-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,$t(this,"config-changed",{config:this._config})}}
                        ></time-format-editor>
                    </ha-expansion-panel>

                    <!-- Date Format Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("general.date_format","Date format")}</h3>
                        <date-format-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,$t(this,"config-changed",{config:this._config})}}
                        ></date-format-editor>
                    </ha-expansion-panel>

                    <!-- Sensors Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("widgets.sensors","Sensors")}</h3>
                        <sensors-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,this._loadSensors(),$t(this,"config-changed",{config:this._config})}}
                        ></sensors-editor>
                    </ha-expansion-panel>

                    <!-- Weather Settings Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("widgets.weather","Weather")}</h3>
                        <weather-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,$t(this,"config-changed",{config:this._config})}}
                        ></weather-editor>
                    </ha-expansion-panel>

                    <!-- Transportation Settings Section -->
                    ${!0===(null===(o=this._config.transportation)||void 0===o?void 0:o.enabled)?V`
                        <ha-expansion-panel outlined>
                            <h3 slot="header">${this.t("widgets.transportation","Transportation")}</h3>
                            <transportation-editor
                                .hass=${this.hass}
                                .config=${this._config}
                                @config-changed=${e=>{this._config=e.detail.config,this._loadStops(),$t(this,"config-changed",{config:this._config})}}
                            ></transportation-editor>
                        </ha-expansion-panel>
                    `:""}

                    <!-- Action Bar Settings Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">${this.t("widgets.action_bar","Action bar")}</h3>
                        <action-bar-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${e=>{this._config=e.detail.config,this._loadActions(),$t(this,"config-changed",{config:this._config})}}
                        ></action-bar-editor>
                    </ha-expansion-panel>
                `}
            </div>
        `:V``}};Ra([ve({type:Object})],Ma.prototype,"hass",void 0),Ra([ve({type:Object})],Ma.prototype,"_config",void 0),Ra([ve({type:Array})],Ma.prototype,"_sensors",void 0),Ra([ve({type:Array})],Ma.prototype,"_backgroundImages",void 0),Ra([ve({type:Array})],Ma.prototype,"_stops",void 0),Ra([ve({type:Array})],Ma.prototype,"_actions",void 0),Ma=Ra([pe("wall-clock-card-editor")],Ma);class ja{constructor(){this.widgets=new Map,this.logger=Se("widget-registry")}static getInstance(){return ja.instance||(ja.instance=new ja),ja.instance}register(e){this.widgets.set(e.widgetId,e)}registerAll(e){e.forEach(e=>this.register(e))}getWidget(e){return this.widgets.get(e)}getAllWidgets(){return Array.from(this.widgets.values())}createElement(e){const t=this.widgets.get(e.type);if(!t)return void this.logger.warn(`Unknown widget type '${e.type}', ignoring`);const i=document.createElement(t.elementTag);return i.config=e,i}}function La(e){return!["sensors","calendar"].includes(null!=e?e:"")}function Ha(e,t){return e&&"auto"!==e?e:"center"===t||(null==t?void 0:t.endsWith("-center"))?"horizontal":"vertical"}function Wa(e,t,i){if(e&&"auto"!==e)return e;const o=null!=i?i:sa(t);return"start"===o?"left":"end"===o?"right":"center"}var Ba=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};const Ua={"top-left":"Top left","top-center":"Top center","top-right":"Top right","middle-left":"Left",center:"Center","middle-right":"Right","bottom-left":"Bottom left","bottom-center":"Bottom center","bottom-right":"Bottom right"},Va=[{labelKey:"designer.information",fallback:"Information",widgetIds:["sensors","weather","calendar","transportation"]},{labelKey:"designer.time",fallback:"Time",widgetIds:["clock","date"]},{labelKey:"designer.controls",fallback:"Controls",widgetIds:["action-bar"]}];let Za=class extends he{constructor(){super(...arguments),this.layout={zones:{}},this.selectedWidget=null,this.selectedZone=null,this.selectable=!1,this.paletteQuery="",this.sortables=[],this.sortableElements=[],this.sortableSetupRevision=0}t(e,t,i={}){return qe(e,this.hass,t,i)}zoneLabel(e){return this.t(`zones.${e.replace(/-/g,"_")}`,Ua[e])}widgetName(e,t){var i;return this.t(`widgets.${t.replace(/-/g,"_")}`,null!==(i=null==e?void 0:e.name)&&void 0!==i?i:t)}static get styles(){return a`
            :host {
                display: grid;
                grid-template-columns: 188px minmax(0, 1fr);
                height: 100%;
                min-width: 0;
                min-height: 0;
                box-sizing: border-box;
                background:
                    radial-gradient(circle at 28% 15%, rgba(61, 69, 110, 0.24), transparent 46%),
                    linear-gradient(135deg, #191923, #211b21);
                color: #f2f3f7;
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

            .zone-grid::before {
                content: '';
                position: absolute;
                z-index: 0;
                pointer-events: none;
                background: rgba(79, 140, 255, 0.08);
            }

            .zone-grid.format-grid-3x3::before {
                display: none;
            }

            .zone-grid.format-vertical-2-1::before,
            .zone-grid.format-vertical-1-2::before {
                top: 0;
                bottom: 0;
                width: 33.333333%;
            }

            .zone-grid.format-vertical-2-1::before {
                right: 0;
                border-left: 2px solid rgba(135, 181, 255, 0.46);
            }

            .zone-grid.format-vertical-1-2::before {
                left: 0;
                border-right: 2px solid rgba(135, 181, 255, 0.46);
            }

            .zone-grid.format-horizontal-2-1::before,
            .zone-grid.format-horizontal-1-2::before {
                left: 0;
                right: 0;
                height: 33.333333%;
            }

            .zone-grid.format-horizontal-2-1::before {
                bottom: 0;
                border-top: 2px solid rgba(135, 181, 255, 0.46);
            }

            .zone-grid.format-horizontal-1-2::before {
                top: 0;
                border-bottom: 2px solid rgba(135, 181, 255, 0.46);
            }

            .zone-grid.preset-glass::before {
                background:
                    linear-gradient(135deg, rgba(11, 15, 23, 0.56), rgba(57, 49, 53, 0.38));
                box-shadow: 0 0 32px rgba(0, 0, 0, 0.22);
            }

            .zone-cell {
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: column;
                min-width: 0;
                min-height: 0;
                padding: 20px 8px 8px;
                border: 1px dashed rgba(190, 194, 220, 0.25);
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.012);
                overflow: visible;
                cursor: pointer;
                transition: border-color 120ms ease, background-color 120ms ease;
            }

            .zone-cell:hover {
                border-color: rgba(135, 181, 255, 0.55);
                background-color: rgba(64, 105, 180, 0.06);
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
                background: #111116;
                color: #aeb3c5;
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
                color: #fff;
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
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                padding: 2px 4px;
                font-size: 0.85rem;
                background-color: rgba(9, 9, 13, 0.82);
                color: #f4f5f8;
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
                color: #e4c75a;
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
                background-color: rgba(255, 255, 255, 0.14);
                opacity: 1;
                outline: none;
            }

            .chip.selected {
                border-color: var(--primary-color, #3b82f6);
                outline: 1px solid var(--primary-color, #3b82f6);
                background: color-mix(in srgb, var(--primary-color, #3b82f6) 28%, #11131a);
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
                border-right: 1px solid rgba(255, 255, 255, 0.09);
                background: rgba(12, 12, 17, 0.94);
                overflow-x: hidden;
                overflow-y: auto;
            }

            .palette-title {
                margin: 0 4px 2px;
                color: #8f94a6;
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
                color: #7f8496;
                transform: translateY(-50%);
                pointer-events: none;
            }

            .palette-search input {
                width: 100%;
                height: 34px;
                padding: 0 10px 0 34px;
                box-sizing: border-box;
                border: 1px solid rgba(255, 255, 255, 0.13);
                border-radius: 8px;
                outline: none;
                background: #0d0e13;
                color: #f2f3f7;
                font: inherit;
                font-size: 0.8rem;
            }

            .palette-search input:focus {
                border-color: var(--primary-color, #3b82f6);
            }

            .palette-category {
                margin: 8px 4px 0;
                color: #696f81;
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
                background: rgba(255, 255, 255, 0.045);
                cursor: pointer;
            }

            .palette .chip:hover {
                border-color: rgba(104, 161, 255, 0.45);
                background: rgba(67, 111, 190, 0.12);
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
                color: #5f6473;
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
                color: #777b8c;
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
        `}disconnectedCallback(){super.disconnectedCallback(),this.sortableSetupRevision++,this.destroySortables()}updated(e){super.updated(e),this.scheduleSortableSetup(e.has("layout"))}emitLayout(e,t){this.dispatchEvent(new CustomEvent("layout-changed",{detail:{layout:e,focusWidgetId:t},bubbles:!0,composed:!0}))}emitSelection(e,t){this.selectable&&this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}selectZoneFromCell(e,t){if(!e.composedPath().some(e=>e instanceof Element&&e.classList.contains("chip"))){if(e instanceof KeyboardEvent){if("Enter"!==e.key&&" "!==e.key)return;e.preventDefault()}this.emitSelection("wcc-zone-selected",{zone:t})}}destroySortables(){this.sortables.forEach(e=>e.destroy()),this.sortables=[],this.sortableElements=[]}scheduleSortableSetup(e){const t=++this.sortableSetupRevision;this.updateComplete.then(()=>{requestAnimationFrame(()=>{if(t!==this.sortableSetupRevision||!this.isConnected)return;const i=this.currentSortableElements(),o=i.length===this.sortableElements.length&&i.every((e,t)=>e===this.sortableElements[t]);!e&&o&&0!==this.sortables.length||this.rebuildSortables(i)})})}currentSortableElements(){var e,t,i;const o=Array.from(null!==(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll(".zone-list"))&&void 0!==t?t:[]),n=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector(".palette");return n?[...o,n]:o}rebuildSortables(e=this.currentSortableElements()){this.destroySortables();const t=e.find(e=>e.classList.contains("palette"));e.filter(e=>e.classList.contains("zone-list")).forEach(e=>{this.sortables.push(new Ro(e,{group:"wcc-widgets",animation:150,draggable:".chip:not(.unavailable)",handle:".drag-handle",filter:".chip-edit, .chip-action",preventOnFilter:!0,onStart:e=>{this.captureDragOrigin(e)},onEnd:e=>{this.handleDragEnd(e)}}))}),t&&this.sortables.push(new Ro(t,{group:{name:"wcc-widgets",pull:"clone",put:!1},sort:!1,animation:150,draggable:".chip:not(.unavailable)",handle:".drag-handle",onStart:e=>{this.captureDragOrigin(e)},onEnd:e=>{this.handlePaletteDrop(e)}})),this.sortableElements=e}captureDragOrigin(e){this.dragOrigin={parent:e.from,next:e.item.nextSibling}}revertDragDom(e){const t=this.dragOrigin;this.dragOrigin=void 0,t&&t.parent.insertBefore(e.item,t.next)}handleDragEnd(e){const t=e.from.dataset.zone,i=e.to.dataset.zone;this.revertDragDom(e),t&&i&&null!=e.oldIndex&&null!=e.newIndex&&(t===i&&e.oldIndex===e.newIndex||this.emitLayout(function(e,t,i,o,n){var a;const r=fa(e),s=r.zones[t];if(!s||i<0||i>=s.widgets.length)return r;const[l]=s.widgets.splice(i,1),c=t===o?s:null!==(a=r.zones[o])&&void 0!==a?a:{widgets:[]},d=Math.max(0,Math.min(n,c.widgets.length));return c.widgets.splice(d,0,l),r.zones[o]=c,t!==o&&0===s.widgets.length&&delete r.zones[t],r}(this.layout,t,e.oldIndex,i,e.newIndex)))}handlePaletteDrop(e){var t,i;const o=e.to.dataset.zone,n=e.item.dataset.widgetType;if(null===(t=e.clone)||void 0===t||t.remove(),this.revertDragDom(e),!o||!n)return;const a=ja.getInstance().getWidget(n);if(!a||a.singleton&&ya(this.layout,n))return;const r=wa(this.layout,n);this.emitLayout(xa(this.layout,o,a.defaultConfig(),null!==(i=e.newIndex)&&void 0!==i?i:void 0),r)}addFromPaletteClick(e){var t;const i=ja.getInstance().getWidget(e);if(!i||i.singleton&&ya(this.layout,e))return;const o=null!==(t=this.selectedZone)&&void 0!==t?t:"center",n=wa(this.layout,e);this.emitLayout(xa(this.layout,o,i.defaultConfig()),n)}paletteGroups(){const e=this.paletteQuery.trim().toLocaleLowerCase(),t=ja.getInstance().getAllWidgets(),i=new Set(Va.flatMap(e=>e.widgetIds));return[...Va.map(e=>({label:this.t(e.labelKey,e.fallback),plugins:e.widgetIds.map(e=>t.find(t=>t.widgetId===e)).filter(e=>void 0!==e)})),{label:this.t("designer.other","Other"),plugins:t.filter(e=>!i.has(e.widgetId))}].map(t=>({...t,plugins:t.plugins.filter(t=>!e||t.name.toLocaleLowerCase().includes(e)||t.widgetId.toLocaleLowerCase().includes(e))})).filter(e=>e.plugins.length>0)}renderChip(e,t,i){var o,n,a,r;const s=ja.getInstance().getWidget(t.type),l=t.id?(null===(o=this.selectedWidget)||void 0===o?void 0:o.widgetId)===t.id:(null===(n=this.selectedWidget)||void 0===n?void 0:n.zone)===e&&(null===(a=this.selectedWidget)||void 0===a?void 0:a.index)===i,c=this.widgetName(s,t.type);return V`
            <div class="chip ${l?"selected":""}"
                 data-zone=${e} data-index=${i}>
                <span class="drag-handle" title=${this.t("designer.drag_to_move","Drag to move")} aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                    <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </span>
                <button class="chip-edit"
                        title=${this.t("designer.edit_widget","Edit {name}",{name:c})}
                        @click=${()=>this.emitSelection("wcc-widget-selected",{zone:e,index:i,widgetId:t.id})}>
                    <ha-icon .icon=${null!==(r=null==s?void 0:s.icon)&&void 0!==r?r:"mdi:puzzle"}></ha-icon>
                    <span>${c}</span>
                    <ha-icon icon="mdi:cog-outline"></ha-icon>
                </button>
                <button class="chip-action" title=${this.t("ui.remove","Remove")} aria-label=${this.t("designer.remove_widget","Remove {name}",{name:c})}
                        @click=${()=>this.emitLayout(function(e,t,i){const o=fa(e),n=o.zones[t];return!n||i<0||i>=n.widgets.length||(n.widgets.splice(i,1),0===n.widgets.length&&delete o.zones[t]),o}(this.layout,e,i))}>
                    <ha-icon icon="mdi:delete-outline"></ha-icon>
                </button>
            </div>
        `}renderZoneCell(e){var t;const i=this.layout.zones[e],o=null!==(t=null==i?void 0:i.widgets)&&void 0!==t?t:[];return V`
            <div class="zone-cell ${this.selectedZone===e?"selected":""}"
                    role="button"
                    tabindex="0"
                    aria-label=${this.t("inspector.edit_zone","Edit zone {name}",{name:this.zoneLabel(e)})}
                    @click=${t=>this.selectZoneFromCell(t,e)}
                    @keydown=${t=>this.selectZoneFromCell(t,e)}>
                <span class="zone-label">
                    ${this.zoneLabel(e)}${"exclusive"===(null==i?void 0:i.mode)?" ↔":""}
                </span>
                <div class="zone-list" data-zone=${e}>
                    ${o.map((t,i)=>this.renderChip(e,t,i))}
                    ${0===o.length?V`<span class="empty-zone">${this.t("designer.drag_here","+ Drag a widget here")}</span>`:""}
                </div>
            </div>
        `}render(){const e=za(this.layout),t=Ia(this.layout);return V`
            <div class="zone-grid format-${e} preset-${t}">
                ${na.map(e=>this.renderZoneCell(e))}
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
                ${this.paletteGroups().map(e=>V`
                    <div class="palette-category">${e.label}</div>
                    ${e.plugins.map(e=>{var t;const i=!!e.singleton&&ya(this.layout,e.widgetId),o=this.widgetName(e,e.widgetId);return V`
                        <div class="chip ${i?"unavailable":""}"
                             data-widget-type=${e.widgetId}
                             aria-disabled=${i?"true":"false"}
                             title=${i?this.t("designer.singleton","{name} can only be added once",{name:o}):null!==(t=e.description)&&void 0!==t?t:""}
                             @click=${()=>this.addFromPaletteClick(e.widgetId)}>
                            <ha-icon .icon=${e.icon}></ha-icon>
                            <span class="palette-name">${o}</span>
                            <span class="drag-handle" title=${this.t("designer.drag_to_move","Drag to move")} aria-label=${this.t("designer.drag_to_move","Drag to move")}>
                                <ha-icon icon="mdi:drag-vertical"></ha-icon>
                            </span>
                        </div>
                    `})}
                `)}
            </div>
        `}};Ba([ve({attribute:!1})],Za.prototype,"hass",void 0),Ba([ve({attribute:!1})],Za.prototype,"layout",void 0),Ba([ve({attribute:!1})],Za.prototype,"selectedWidget",void 0),Ba([ve({attribute:!1})],Za.prototype,"selectedZone",void 0),Ba([ve({type:Boolean})],Za.prototype,"selectable",void 0),Ba([fe()],Za.prototype,"paletteQuery",void 0),Za=Ba([pe("wcc-zone-overlay")],Za);var Ka=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let qa="general";const Ja=new Map;let Ga=class extends he{constructor(){super(...arguments),this.layout={zones:{}},this.selectedWidget=null,this.selectedZone=null,this.activeTab="content",this.activeCardTab=qa,this.editorCache=new Map,this.languageOptions=Ge(),this.fontColors=["#fff7bb","#ffffff","#ffe59a","#79c4ff","#8be0aa","#e6a6df"]}t(e,t,i={}){return qe(e,this.hass,t,i)}zoneLabel(e){return this.t(`zones.${e.replace(/-/g,"_")}`,Ua[e])}static get styles(){return a`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                height: 100%;
                min-width: 0;
                min-height: 0;
                color: var(--primary-text-color, #fff);
                background: #111217;
            }

            .header {
                display: flex;
                align-items: center;
                gap: 12px;
                min-height: 60px;
                padding: 0 16px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.09);
                background: #101116;
            }

            .header-icon {
                display: grid;
                place-items: center;
                width: 36px;
                height: 36px;
                border-radius: 9px;
                background: var(--primary-color, #2878d8);
                color: #fff;
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
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                background: #111217;
            }

            .tab {
                min-height: 38px;
                padding: 0 6px;
                border: 0;
                border-bottom: 2px solid transparent;
                background: transparent;
                color: #9297a8;
                font: inherit;
                font-size: 0.78rem;
                cursor: pointer;
            }

            .tab:hover,
            .tab:focus-visible {
                color: #fff;
                outline: none;
            }

            .tab.active {
                border-bottom-color: var(--primary-color, #3b82f6);
                color: #fff;
                background: linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent 72%);
            }

            .body {
                flex: 1;
                min-height: 0;
                /* Keep the final control fully scrollable above the designer
                   status bar, especially when an expanded list item is tall. */
                padding: 12px 12px 64px;
                box-sizing: border-box;
                scroll-padding-bottom: 64px;
                background: #111217;
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
                color: var(--secondary-text-color, #aaa);
            }

            .section-card {
                padding: 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.028);
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
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
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
                background: #111217;
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
                color: var(--secondary-text-color, #a8adbd);
                font-size: 0.76rem;
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
                color: #8c91a1;
                cursor: pointer;
            }

            .color-choice:hover,
            .color-choice:focus-visible,
            .color-custom:hover,
            .color-custom:focus-within {
                outline: 1px solid rgba(255, 255, 255, 0.42);
                outline-offset: 2px;
            }

            .color-choice.selected,
            .color-custom.selected {
                border-color: #111217;
                outline: 2px solid var(--color-choice, var(--primary-color, #3b82f6));
                outline-offset: 1px;
            }

            .color-custom {
                border: 1px dashed rgba(255, 255, 255, 0.24);
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
                color: #858a9b;
                text-align: center;
                line-height: 1.5;
            }
        `}updated(e){var t;super.updated(e),(e.has("selectedWidget")||e.has("selectedZone"))&&(this.activeTab=this.selectedWidget&&null!==(t=Ja.get(this.widgetSelectionKey(this.selectedWidget)))&&void 0!==t?t:"content")}widgetSelectionKey(e){var t;return null!==(t=e.widgetId)&&void 0!==t?t:`${e.zone}:${e.index}`}selectWidgetTab(e){this.activeTab=e,this.selectedWidget&&Ja.set(this.widgetSelectionKey(this.selectedWidget),e)}resolveWidget(){var e;const t=this.selectedWidget;if(!t)return;if(t.widgetId){const e=_a(this.layout,t.widgetId);if(e)return e}const i=null===(e=this.layout.zones[t.zone])||void 0===e?void 0:e.widgets[t.index];return i?{zone:t.zone,index:t.index,widget:i}:void 0}getEditor(e){let t=this.editorCache.get(e);return t||(t=document.createElement(e),t.addEventListener("config-changed",e=>{e.stopPropagation();const t=this.resolveWidget();if(!t)return;const i=e.detail.config;this.emitWidget(t.zone,t.index,function(e,t){var i,o,n,a,r,s,l,c,d,h,u;switch(e.type){case"clock":return Ta({...Oa(e),clockSize:e.clockSize,timeFormat:t.timeFormat});case"date":return Ta({...Oa(e),dateSize:e.dateSize,dateFormat:t.dateFormat});case"sensors":return Ta({...Oa(e),labelSize:e.labelSize,valueSize:e.valueSize,iconSize:null!==(i=t.iconSize)&&void 0!==i?i:e.iconSize,sensors:null!==(o=t.sensors)&&void 0!==o?o:[],orientation:t.orientation,alignment:t.alignment,itemGap:t.itemGap,showIcons:null!==(n=t.showIcons)&&void 0!==n?n:e.showIcons,showSeparator:null!==(a=t.showSeparator)&&void 0!==a?a:e.showSeparator,separatorColor:null!==(r=t.separatorColor)&&void 0!==r?r:e.separatorColor,separatorOpacity:null!==(s=t.separatorOpacity)&&void 0!==s?s:e.separatorOpacity});case"weather":return Ta({...Oa(e),enabled:!1!==t.showWeather&&"none"!==t.weatherProvider&&void 0,labelSize:e.labelSize,valueSize:e.valueSize,provider:t.weatherProvider,providerConfig:t.weatherConfig,displayMode:t.weatherDisplayMode,forecastDays:t.weatherForecastDays,title:t.weatherTitle,updateInterval:t.weatherUpdateInterval,iconSet:t.weatherIconSet,orientation:e.orientation});case"transportation":{if(!t.transportation)return{...e,stops:[]};const i=t.transportation,{enabled:o,...n}=i;return{...Oa(e),...n,stops:null!==(l=n.stops)&&void 0!==l?l:[]}}case"action-bar":{const i=null!==(c=t.actionBar)&&void 0!==c?c:{};return Ta({...Oa(e),iconSize:e.iconSize,enabled:null===(d=i.enabled)||void 0===d||d,actions:null!==(h=i.actions)&&void 0!==h?h:[],alignment:i.alignment,orientation:i.orientation,backgroundOpacity:i.backgroundOpacity,showButtonBackground:null!==(u=i.showButtonBackground)&&void 0!==u?u:e.showButtonBackground,buttonGap:i.buttonGap,padding:i.padding})}default:return{...t,...Oa(e)}}}(t.widget,i))}),this.editorCache.set(e,t)),t}emitWidget(e,t,i){this.dispatchEvent(new CustomEvent("wcc-widget-config-changed",{detail:{zone:e,index:t,widget:i},bubbles:!0,composed:!0}))}updateWidgetField(e,t){const i=this.resolveWidget();if(!i)return;const o={...i.widget};void 0===t||""===t?delete o[e]:o[e]=t,this.emitWidget(i.zone,i.index,o)}updateWidgetSize(e,t){var i;const o=this.resolveWidget();if(!o)return;const n={...o.widget};if(""===t?delete n[e]:n[e]=t,void 0!==(null===(i=n.style)||void 0===i?void 0:i.fontSize)){const e={...n.style};delete e.fontSize,0===Object.keys(e).length?delete n.style:n.style=e}this.emitWidget(o.zone,o.index,n)}updateStyle(e,t){var i;const o=this.resolveWidget();if(!o)return;const n={...null!==(i=o.widget.style)&&void 0!==i?i:{}};""===t?delete n[e]:n[e]=t;const a={...o.widget};0===Object.keys(n).length?delete a.style:a.style=n,this.emitWidget(o.zone,o.index,a)}updateZone(e,t=this.selectedZone){t&&this.dispatchEvent(new CustomEvent("wcc-zone-settings-changed",{detail:{zone:t,settings:e},bubbles:!0,composed:!0}))}emitCardConfig(e){this.dispatchEvent(new CustomEvent("wcc-card-config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}updateGeneralSetting(e,t){this.config&&this.emitCardConfig(Ca(this.config,e,t))}supportedStyleKeys(e){var t,i;const o=La(e.type),n=!["clock","date","action-bar","sensors","weather","calendar"].includes(e.type),a=[];return(o||void 0!==(null===(t=e.style)||void 0===t?void 0:t.maxWidth))&&a.push("maxWidth"),(n||void 0!==(null===(i=e.style)||void 0===i?void 0:i.maxHeight))&&a.push("maxHeight"),a.push("margin"),a}renderZoneAlignment(e){var t;const i=null===(t=this.layout.zones[e])||void 0===t?void 0:t.align,o=sa(e),n={start:this.t("ui.left","Left"),center:this.t("ui.center","Center"),end:this.t("ui.right","Right")}[o];return V`
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select:{options:[{value:"auto",label:this.t("inspector.zone_default","Zone default ({alignment})",{alignment:n})},{value:"start",label:this.t("ui.left","Left")},{value:"center",label:this.t("ui.center","Center")},{value:"end",label:this.t("ui.right","Right")}],mode:"dropdown"}}}
                    .value=${null!=i?i:"auto"}
                    .label=${this.t("inspector.zone_alignment","Zone alignment")}
                    .helper=${this.t("inspector.zone_alignment_help","Applies to every widget in this zone")}
                    @value-changed=${t=>this.updateZone({align:"auto"===t.detail.value?void 0:t.detail.value},e)}>
            </ha-row-selector>
        `}renderHeader(e,t,i){return V`
            <div class="header">
                <span class="header-icon"><ha-icon .icon=${e}></ha-icon></span>
                <div class="title"><strong>${t}</strong><span>${i}</span></div>
            </div>
        `}renderTabs(){const e=[{id:"content",label:this.t("ui.content","Content")},{id:"appearance",label:this.t("ui.appearance","Appearance")},{id:"behavior",label:this.t("ui.behavior","Behavior")}];return V`
            <div class="tabs" role="tablist" aria-label=${this.t("inspector.widget_settings","Widget settings")}>
                ${e.map(e=>V`
                    <button
                            class="tab ${this.activeTab===e.id?"active":""}"
                            role="tab"
                            aria-selected=${this.activeTab===e.id?"true":"false"}
                            @click=${()=>this.selectWidgetTab(e.id)}>
                        ${e.label}
                    </button>
                `)}
            </div>
        `}renderWidgetPresentationFields(e){var t,i,o,n,a,r,s,l,c;if("sensors"!==e.type&&"weather"!==e.type&&"action-bar"!==e.type)return V``;const d="action-bar"===e.type?"actions":e.type,h="sensors"===e.type?"Item":"weather"===e.type?"Forecast":"Button";return V`
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select:{options:[{value:"auto",label:this.t("ui.auto","Auto (by zone)")},{value:"horizontal",label:this.t("ui.horizontal","Horizontal")},{value:"vertical",label:this.t("ui.vertical","Vertical")}],mode:"dropdown"}}}
                    .value=${null!==(t=e.orientation)&&void 0!==t?t:"auto"}
                    .label=${this.t(`editor.${d}.orientation`,`${h} orientation`)}
                    .helper=${this.t(`editor.${d}.orientation_help`,"Auto uses a row in center zones and a column in side zones.")}
                    @value-changed=${e=>this.updateWidgetField("orientation","auto"===e.detail.value?void 0:e.detail.value)}>
            </ha-row-selector>
            ${"weather"!==e.type?V`
                <ha-row-selector .hass=${this.hass}
                        .selector=${{select:{options:[{value:"auto",label:this.t("ui.zone_default","Zone default")},{value:"left",label:this.t("ui.left","Left")},{value:"center",label:this.t("ui.center","Center")},{value:"right",label:this.t("ui.right","Right")}],mode:"dropdown"}}}
                        .value=${null!==(i=e.alignment)&&void 0!==i?i:"auto"}
                        .label=${this.t(`editor.${d}.alignment`,`${h} alignment`)}
                        .helper=${this.t(`editor.${d}.alignment_help`,"Use the zone alignment or override it for this widget.")}
                        @value-changed=${e=>this.updateWidgetField("alignment","auto"===e.detail.value?void 0:e.detail.value)}>
                </ha-row-selector>
            `:""}
            ${"sensors"===e.type?V`
                <ha-row-selector .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!1!==e.showIcons}
                        .label=${this.t("editor.sensors.show_icons","Show sensor icons")}
                        .helper=${this.t("editor.sensors.show_icons_help","Show or hide the icon next to each sensor")}
                        @value-changed=${e=>this.updateWidgetField("showIcons",!1!==e.detail.value&&void 0)}>
                </ha-row-selector>
                ${!1!==e.showIcons?V`
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{text:{}}}
                            .value=${null!==(o=e.iconSize)&&void 0!==o?o:""}
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
                ${!1!==e.showSeparator?V`
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{color_hex:""}}
                            .value=${null!==(n=e.separatorColor)&&void 0!==n?n:""}
                            .label=${this.t("editor.sensors.separator_color","Separator color")}
                            .helper=${this.t("editor.sensors.separator_color_help","Empty uses the widget text color")}
                            @value-changed=${e=>{var t;return this.updateWidgetField("separatorColor",(null===(t=e.detail.value)||void 0===t?void 0:t.trim())||void 0)}}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                            .value=${null!==(a=e.separatorOpacity)&&void 0!==a?a:.28}
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
            ${"action-bar"===e.type?V`
                <ha-row-selector .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!1!==e.showButtonBackground}
                        .label=${this.t("editor.actions.button_background","Circular button background")}
                        .helper=${this.t("editor.actions.button_background_help","Show or hide the translucent circle behind each action")}
                        @value-changed=${e=>this.updateWidgetField("showButtonBackground",!1!==e.detail.value&&void 0)}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(s=e.buttonGap)&&void 0!==s?s:""}
                        .label=${this.t("editor.actions.button_gap","Button gap")}
                        .helper=${this.t("editor.actions.button_gap_help","CSS length between buttons (default: 16px)")}
                        @value-changed=${e=>{var t;return this.updateWidgetField("buttonGap",(null===(t=e.detail.value)||void 0===t?void 0:t.trim())||void 0)}}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text:{}}}
                        .value=${null!==(l=e.padding)&&void 0!==l?l:""}
                        .label=${this.t("editor.actions.panel_padding","Panel padding")}
                        .helper=${this.t("editor.actions.panel_padding_help","CSS padding shorthand (default: 16px)")}
                        @value-changed=${e=>{var t;return this.updateWidgetField("padding",(null===(t=e.detail.value)||void 0===t?void 0:t.trim())||void 0)}}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{number:{min:0,max:1,step:.05,mode:"slider"}}}
                        .value=${null!==(c=e.backgroundOpacity)&&void 0!==c?c:.3}
                        .label=${this.t("editor.actions.opacity","Background opacity")}
                        .helper=${this.t("editor.actions.opacity_help","Adjust the action bar background transparency")}
                        @value-changed=${e=>this.updateWidgetField("backgroundOpacity",e.detail.value)}>
                </ha-row-selector>
            `:""}
        `}renderWidget(){var e,t,i,o,n,a,r;const s=this.resolveWidget();if(!s)return V``;const{zone:l,widget:c}=s,d=ja.getInstance().getWidget(c.type),h=this.t(`widgets.${c.type.replace(/-/g,"_")}`,null!==(e=null==d?void 0:d.name)&&void 0!==e?e:c.type);let u=V`
            <p class="hint">${this.t("inspector.no_content","This widget has no content settings.")}</p>
        `;if(null==d?void 0:d.editorTag){const e=this.getEditor(d.editorTag);e.hass=this.hass,e.config=function(e){var t,i,o;switch(e.type){case"clock":return Ta({timeFormat:e.timeFormat});case"date":return Ta({dateFormat:e.dateFormat});case"sensors":return Ta({sensors:null!==(t=e.sensors)&&void 0!==t?t:[],orientation:e.orientation,alignment:e.alignment,itemGap:e.itemGap,showIcons:e.showIcons,iconSize:e.iconSize,showSeparator:e.showSeparator,separatorColor:e.separatorColor,separatorOpacity:e.separatorOpacity});case"weather":return Ta({showWeather:!1!==e.enabled,weatherProvider:e.provider,weatherConfig:e.providerConfig,weatherDisplayMode:e.displayMode,weatherForecastDays:e.forecastDays,weatherTitle:e.title,weatherUpdateInterval:e.updateInterval,weatherIconSet:e.iconSet});case"transportation":{const{type:t,id:i,priority:o,style:n,visibility:a,...r}=e;return{transportation:{enabled:!0,...r}}}case"action-bar":return{actionBar:Ta({enabled:null===(i=e.enabled)||void 0===i||i,actions:null!==(o=e.actions)&&void 0!==o?o:[],alignment:e.alignment,orientation:e.orientation,backgroundOpacity:e.backgroundOpacity,showButtonBackground:e.showButtonBackground,buttonGap:e.buttonGap,padding:e.padding})};default:return e}}(c),u=e}const p=null!==(t=c.style)&&void 0!==t?t:{},g="exclusive"===(null===(i=this.layout.zones[l])||void 0===i?void 0:i.mode);return V`
            ${this.renderHeader(null!==(o=null==d?void 0:d.icon)&&void 0!==o?o:"mdi:puzzle",h,this.zoneLabel(l))}
            ${this.renderTabs()}
            <div class="body">
                ${"content"===this.activeTab?V`
                    <section class="section-card">
                        <div class="section-title">${this.t("inspector.widget_settings","Widget settings")}</div>
                        <div class="feature-editor">${u}</div>
                    </section>
                `:""}
                ${"appearance"===this.activeTab?V`
                    <section class="section-card">
                    <div class="section-title">${this.t("inspector.appearance_layout","Appearance and layout")}</div>
                    <div class="settings-list">
                        ${this.renderWidgetPresentationFields(c)}
                        <ha-row-selector .hass=${this.hass} .selector=${{color_hex:""}}
                                .value=${null!==(n=p.color)&&void 0!==n?n:""} .label=${this.t("inspector.color","Color override")}
                                @value-changed=${e=>this.updateStyle("color",e.detail.value)}>
                        </ha-row-selector>
                        <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                                .value=${null!==(a=p.fontFamily)&&void 0!==a?a:""}
                                .label=${this.t("inspector.font_family","Font family override")}
                                .helper=${this.t("inspector.font_family_help","CSS font family or stack; empty uses the card font")}
                                @value-changed=${e=>this.updateStyle("fontFamily",e.detail.value)}>
                        </ha-row-selector>
                        ${this.renderWidgetSizeFields(c,p)}
                        ${"clock"===c.type||"date"===c.type?this.renderZoneAlignment(l):""}
                        ${this.supportedStyleKeys(c).map(e=>{var t;return V`
                            <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                                    .value=${null!==(t=p[e])&&void 0!==t?t:""} .label=${this.styleLabel(e,c)}
                                    @value-changed=${t=>this.updateStyle(e,t.detail.value)}>
                            </ha-row-selector>
                        `})}
                    </div>
                    </section>
                `:""}
                ${"behavior"===this.activeTab?V`
                    <section class="section-card">
                        <div class="section-title">${this.t("ui.behavior","Behavior")}</div>
                        <div class="settings-list">
                        ${g?V`
                            <ha-row-selector .hass=${this.hass} .selector=${{number:{mode:"box"}}}
                                    .value=${null!==(r=c.priority)&&void 0!==r?r:0} .label=${this.t("inspector.display_priority","Display priority")}
                                    .helper=${this.t("inspector.priority_help","Higher active value wins in this exclusive zone")}
                                    @value-changed=${e=>this.updateWidgetField("priority",0===e.detail.value?void 0:e.detail.value)}>
                            </ha-row-selector>
                        `:V`<p class="hint">${this.t("inspector.no_behavior","This widget has no additional behavior settings.")}</p>`}
                        </div>
                    </section>
                `:""}
            </div>
        `}renderWidgetSizeFields(e,t){var i;const o=(t,i,o)=>{var n,a;return V`
            <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                    .value=${null!==(a=null!==(n=e[t])&&void 0!==n?n:o)&&void 0!==a?a:""}
                    .label=${i}
                    @value-changed=${e=>this.updateWidgetSize(t,e.detail.value)}>
            </ha-row-selector>
        `};switch(e.type){case"clock":return o("clockSize",this.t("inspector.clock_size","Clock size (e.g., 16rem)"),t.fontSize);case"date":return o("dateSize",this.t("inspector.date_size","Date size (e.g., 6rem)"),t.fontSize);case"sensors":case"weather":return V`
                    ${o("labelSize",this.t("inspector.label_size","Label size (e.g., 1.2rem)"))}
                    ${o("valueSize",this.t("inspector.value_size","Value size (e.g., 2rem)"))}
                `;case"action-bar":return o("iconSize",this.t("inspector.icon_size","Icon size (button is 2×, e.g., 72px)"));case"calendar":return V`
                    ${o("calendarDateSize",this.t("inspector.calendar_date_size","Date block size (e.g., 1rem)"))}
                    ${o("eventTitleSize",this.t("inspector.event_title_size","Event title size (e.g., 1rem)"))}
                    ${o("eventDetailSize",this.t("inspector.event_detail_size","Event detail size (e.g., 0.82rem)"))}
                `;case"transportation":return V``;default:return V`
                    <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                            .value=${null!==(i=t.fontSize)&&void 0!==i?i:""} .label=${this.styleLabel("fontSize")}
                            @value-changed=${e=>this.updateStyle("fontSize",e.detail.value)}>
                    </ha-row-selector>
                `}}styleLabel(e,t){if(t){if("maxWidth"===e&&!La(t.type))return this.t("inspector.unsupported_width","Maximum width (unsupported — clear this value)");if("maxHeight"===e&&["clock","date","action-bar","sensors","weather","calendar"].includes(t.type))return this.t("inspector.unsupported_height","Maximum height (unsupported — clear this value)")}return{color:this.t("inspector.color","Color override"),fontSize:this.t("inspector.font_size","Font size (e.g., 2rem)"),fontFamily:this.t("inspector.font_family","Font family override"),maxWidth:this.t("inspector.max_width","Maximum width (e.g., 420px)"),maxHeight:this.t("inspector.max_height","Maximum height (e.g., 50vh)"),margin:this.t("inspector.margin","Margin (CSS shorthand)")}[e]}renderZone(){var e,t,i,o,n,a;const r=this.selectedZone,s=r?this.layout.zones[r]:void 0;return r?V`
            ${this.renderHeader("mdi:view-grid-outline",this.t("inspector.zone","Zone: {name}",{name:this.zoneLabel(r)}),this.t("inspector.layout_settings","Layout settings"))}
            <div class="body">
                <section class="section-card settings-list">
                ${s?V`
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
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{select:{options:[{value:"auto",label:this.t("inspector.zone_default","Zone default ({alignment})",{alignment:{start:this.t("ui.left","Left"),center:this.t("ui.center","Center"),end:this.t("ui.right","Right")}[sa(r)]})},{value:"start",label:this.t("ui.left","Left")},{value:"center",label:this.t("ui.center","Center")},{value:"end",label:this.t("ui.right","Right")}],mode:"dropdown"}}}
                            .value=${null!==(i=s.align)&&void 0!==i?i:"auto"} .label=${this.t("inspector.horizontal_alignment","Horizontal alignment")}
                            @value-changed=${e=>this.updateZone({align:"auto"===e.detail.value?void 0:e.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                            .value=${null!==(o=s.gap)&&void 0!==o?o:""} .label=${this.t("inspector.widget_gap","Widget gap override (e.g., 4px)")}
                            @value-changed=${e=>this.updateZone({gap:e.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                            .value=${null!==(n=s.padding)&&void 0!==n?n:""} .label=${this.t("inspector.zone_padding","Zone padding (e.g., 0 16px)")}
                            @value-changed=${e=>this.updateZone({padding:e.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass} .selector=${{text:{}}}
                            .value=${null!==(a=s.offsetY)&&void 0!==a?a:""} .label=${this.t("inspector.vertical_offset","Vertical offset (e.g., -8vh)")}
                            .helper=${this.t("inspector.vertical_offset_help","Negative values move the complete zone up; positive values move it down.")}
                            @value-changed=${e=>this.updateZone({offsetY:e.detail.value})}>
                    </ha-row-selector>
                `:V`<p class="hint">${this.t("inspector.add_widget_first","Add a widget to this zone before changing its settings.")}</p>`}
                </section>
            </div>
        `:V``}renderCardTabs(){const e=[{id:"general",label:this.t("general.title","General")},{id:"spacing",label:this.t("general.spacing","Spacing")},{id:"background",label:this.t("general.background","Background")}];return V`
            <div class="tabs" role="tablist" aria-label=${this.t("designer.card_settings","Card settings")}>
                ${e.map(e=>V`
                    <button
                            class="tab ${this.activeCardTab===e.id?"active":""}"
                            role="tab"
                            aria-selected=${this.activeCardTab===e.id?"true":"false"}
                            @click=${()=>{qa=e.id,this.activeCardTab=e.id}}>
                        ${e.label}
                    </button>
                `)}
            </div>
        `}renderFontColor(){var e,t,i;const o=null!==(i=null===(t=null===(e=this.config)||void 0===e?void 0:e.appearance)||void 0===t?void 0:t.fontColor)&&void 0!==i?i:"#FFFFFF",n=o.toLowerCase(),a=this.fontColors.some(e=>e.toLowerCase()===n),r=/^#[0-9a-f]{6}$/i.test(o)?o:"#ffffff";return V`
            <div class="font-color-field">
                <span class="field-label">${this.t("general.font_color","Font color")}</span>
                <div class="color-palette">
                    ${this.fontColors.map(e=>V`
                        <button class="color-choice ${e.toLowerCase()===n?"selected":""}"
                                type="button"
                                style=${`--color-choice: ${e}`}
                                title=${e}
                                aria-label=${`${this.t("general.font_color","Font color")} ${e}`}
                                @click=${()=>this.updateGeneralSetting("fontColor",e)}>
                        </button>
                    `)}
                    <label class="color-custom ${a?"":"selected"}"
                            style=${`--custom-color: ${a?"transparent":r}; --color-choice: ${r}`}
                            title=${this.t("general.custom_color","Custom color")}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        <input type="color" .value=${r}
                                aria-label=${this.t("general.custom_color","Custom color")}
                                @change=${e=>this.updateGeneralSetting("fontColor",e.target.value)}>
                    </label>
                </div>
            </div>
        `}renderCardGeneral(){var e,t,i,o,n,a,r,s,l;const c=null!==(t=null===(e=this.config)||void 0===e?void 0:e.appearance)&&void 0!==t?t:{},d=Ke(String(c.language||(null===(o=null===(i=this.hass)||void 0===i?void 0:i.locale)||void 0===o?void 0:o.language)||(null===(n=this.hass)||void 0===n?void 0:n.language)||"en"));return V`
            ${this.renderFontColor()}
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select:{options:this.languageOptions,mode:"dropdown"}}}
                    .value=${d}
                    .label=${this.t("general.language","Language")}
                    .labelPosition=${en.Top}
                    @value-changed=${e=>this.updateGeneralSetting("language",e.detail.value)}>
            </ha-row-selector>
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select:{options:[{value:"debug",label:"Debug"},{value:"info",label:"Info"},{value:"warn",label:"Warning"},{value:"error",label:"Error"},{value:"none",label:this.t("ui.none","None")}],mode:"dropdown"}}}
                    .value=${null!==(r=null===(a=this.config)||void 0===a?void 0:a.logLevel)&&void 0!==r?r:"info"}
                    .label=${this.t("general.log_level","Log level")}
                    .labelPosition=${en.Top}
                    @value-changed=${e=>this.updateGeneralSetting("logLevel",e.detail.value)}>
            </ha-row-selector>
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select:{options:[{value:dt.Large,label:this.t("general.large","Large")},{value:dt.Medium,label:this.t("general.medium","Medium")},{value:dt.Small,label:this.t("general.small","Small")},{value:dt.Custom,label:this.t("spacing.custom","Custom")}],mode:"dropdown"}}}
                    .value=${null!==(s=c.size)&&void 0!==s?s:dt.Medium}
                    .label=${this.t("general.size","Size")}
                    .labelPosition=${en.Top}
                    @value-changed=${e=>this.updateGeneralSetting("size",e.detail.value)}>
            </ha-row-selector>
            <ha-row-selector .hass=${this.hass}
                    .selector=${{text:{}}}
                    .value=${null!==(l=c.fontFamily)&&void 0!==l?l:""}
                    .label=${this.t("general.font_family","Font family")}
                    .helper=${this.t("general.font_family_help","CSS font family or stack; the font must already be loaded")}
                    .labelPosition=${en.Top}
                    @value-changed=${e=>this.updateGeneralSetting("fontFamily",e.detail.value)}>
            </ha-row-selector>
        `}renderCardSettings(){return this.config?V`
            ${this.renderHeader("mdi:theme-light-dark","Wall Clock",this.t("designer.card_settings","Card settings"))}
            ${this.renderCardTabs()}
            <div class="card-settings-body">
                ${"general"===this.activeCardTab?this.renderCardGeneral():""}
                ${"spacing"===this.activeCardTab?V`
                    <layout-editor
                            .hass=${this.hass}
                            .config=${this.config}
                            inspector
                            @config-changed=${e=>{e.stopPropagation(),this.emitCardConfig(e.detail.config)}}>
                    </layout-editor>
                `:""}
                ${"background"===this.activeCardTab?V`
                    <background-editor
                            .hass=${this.hass}
                            .config=${Na(this.config)}
                            @config-changed=${e=>{e.stopPropagation(),this.emitCardConfig({...this.config,background:Fa(e.detail.config)})}}>
                    </background-editor>
                `:""}
            </div>
        `:V`
                ${this.renderHeader("mdi:theme-light-dark","Wall Clock",this.t("designer.card_settings","Card settings"))}
                <div class="empty-inspector">${this.t("designer.card_settings_unavailable","Card settings are not available.")}</div>
            `}render(){return this.selectedWidget?this.renderWidget():this.selectedZone?this.renderZone():this.renderCardSettings()}};Ka([ve({attribute:!1})],Ga.prototype,"hass",void 0),Ka([ve({attribute:!1})],Ga.prototype,"config",void 0),Ka([ve({attribute:!1})],Ga.prototype,"layout",void 0),Ka([ve({attribute:!1})],Ga.prototype,"selectedWidget",void 0),Ka([ve({attribute:!1})],Ga.prototype,"selectedZone",void 0),Ka([fe()],Ga.prototype,"activeTab",void 0),Ka([fe()],Ga.prototype,"activeCardTab",void 0),Ga=Ka([pe("wcc-layout-inspector")],Ga);var Ya=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Xa=class extends he{constructor(){super(...arguments),this.disabled=!1,this.required=!0}render(){const e=this.validColor(this.value)?this.value:"#ffffff";return V`
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
        `}validColor(e){return Boolean(e&&/^#[0-9a-fA-F]{6}$/.test(e))}_valueChanged(e){const t=e.target.value;t&&!this.validColor(t)||$t(this,"value-changed",{value:t})}};Xa.styles=a`
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
    `,Ya([ve({attribute:!1})],Xa.prototype,"hass",void 0),Ya([ve({attribute:!1})],Xa.prototype,"selector",void 0),Ya([ve()],Xa.prototype,"value",void 0),Ya([ve()],Xa.prototype,"label",void 0),Ya([ve()],Xa.prototype,"helper",void 0),Ya([ve({type:Boolean,reflect:!0})],Xa.prototype,"disabled",void 0),Ya([ve({type:Boolean})],Xa.prototype,"required",void 0),Xa=Ya([pe("ha-selector-color_hex")],Xa);var Qa=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let er=class extends he{constructor(){super(...arguments),this.lastEmittedValue=Symbol("initial-value"),this.hasNumberDraft=!1,this.numberDraft="",this.nativeInputListener=e=>this._nativeInputChanged(e),this.fieldCommitListener=()=>this._commitNestedFieldValue(),this.disabled=!1,this.required=!0,this.labelPosition=en.Top}connectedCallback(){super.connectedCallback(),this.addEventListener("input",this.nativeInputListener,{capture:!0}),this.addEventListener("focusout",this.fieldCommitListener,{capture:!0})}disconnectedCallback(){this.removeEventListener("input",this.nativeInputListener,{capture:!0}),this.removeEventListener("focusout",this.fieldCommitListener,{capture:!0}),super.disconnectedCallback()}get isBooleanSelector(){return!!this.selector&&Object.prototype.hasOwnProperty.call(this.selector,"boolean")}get isNumberBoxSelector(){return!!this.selector&&"number"in this.selector&&!!this.selector.number&&"slider"!==this.selector.number.mode}get selectorValue(){var e;return this.isNumberBoxSelector&&this.hasNumberDraft?this.numberDraft:null!==(e=this.value)&&void 0!==e?e:""}render(){return V`
            <div class="row ${this.labelPosition.toLowerCase()} ${this.isBooleanSelector?"boolean":""}">
                ${this.label&&this.labelPosition!==en.Hidden?V`
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
                ${this.isBooleanSelector&&this.helper?V`
                    <div class="boolean-helper">${this.helper}</div>
                `:""}
            </div>
        `}_handleDynamicActionClick(e,t,i){e.stopPropagation(),$t(this,i||`action-click-${t}`,{})}_valueChanged(e){e.stopPropagation();const t=e.detail.value;if(this.isNumberBoxSelector&&this._isEmptyNumberValue(t))return this.numberDraft="",void(this.hasNumberDraft=!0);this.isNumberBoxSelector&&(this.hasNumberDraft=!1),this._emitValue(t)}_nativeInputChanged(e){if(!(this.selector&&Object.prototype.hasOwnProperty.call(this.selector,"text")||this.isNumberBoxSelector))return;const t=e.composedPath().find(e=>"string"==typeof(null==e?void 0:e.value));if(t){if(this.isNumberBoxSelector){if(""===t.value)return this.numberDraft="",void(this.hasNumberDraft=!0);const e=Number(t.value);return void(Number.isFinite(e)&&(this.hasNumberDraft=!1,this._emitValue(e)))}this._emitValue(t.value)}}_commitNestedFieldValue(){if(this.isNumberBoxSelector)return void(this.hasNumberDraft&&(this.hasNumberDraft=!1));if(!this.selector||!Object.prototype.hasOwnProperty.call(this.selector,"text"))return;const e=[this.renderRoot];for(;e.length;){const t=e.shift();for(const i of Array.from(t.querySelectorAll("*"))){if(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement)return void this._emitValue(i.value);i.shadowRoot&&e.push(i.shadowRoot)}}}_isEmptyNumberValue(e){return""===e||null==e||"number"==typeof e&&Number.isNaN(e)}_emitValue(e){let t=e;this.transformData&&(t=this.transformData(t)),Object.is(this.lastEmittedValue,t)||(this.lastEmittedValue=t,$t(this,"value-changed",{value:t,propertyName:this.propertyName}))}updated(e){e.has("value")&&(this.lastEmittedValue=this.value)}};er.styles=a`
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
    `,Qa([fe()],er.prototype,"hasNumberDraft",void 0),Qa([fe()],er.prototype,"numberDraft",void 0),Qa([ve({attribute:!1})],er.prototype,"hass",void 0),Qa([ve({attribute:!1})],er.prototype,"selector",void 0),Qa([ve({attribute:!1})],er.prototype,"value",void 0),Qa([ve()],er.prototype,"label",void 0),Qa([ve()],er.prototype,"helper",void 0),Qa([ve({type:Boolean,reflect:!0})],er.prototype,"disabled",void 0),Qa([ve({type:Boolean})],er.prototype,"required",void 0),Qa([ve()],er.prototype,"propertyName",void 0),Qa([ve({attribute:!1})],er.prototype,"transformData",void 0),Qa([ve({attribute:!1})],er.prototype,"labelPosition",void 0),Qa([ve({attribute:!1})],er.prototype,"actionButtons",void 0),er=Qa([pe("ha-row-selector")],er);const{I:tr}=le,ir=()=>document.createComment(""),or=(e,t,i)=>{var o;const n=e._$AA.parentNode,a=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=n.insertBefore(ir(),a),o=n.insertBefore(ir(),a);i=new tr(t,o,e,e.options)}else{const t=i._$AB.nextSibling,r=i._$AM,s=r!==e;if(s){let t;null===(o=i._$AQ)||void 0===o||o.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==r._$AU&&i._$AP(t)}if(t!==a||s){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;n.insertBefore(e,a),e=t}}}return i},nr=(e,t,i=e)=>(e._$AI(t,i),e),ar={},rr=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const o=e._$AB.nextSibling;for(;i!==o;){const e=i.nextSibling;i.remove(),i=e}},sr=(e,t,i)=>{const o=new Map;for(let n=t;n<=i;n++)o.set(e[n],n);return o},lr=Uo(class extends Vo{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}ct(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);const n=[],a=[];let r=0;for(const t of e)n[r]=o?o(t,r):r,a[r]=i(t,r),r++;return{values:a,keys:n}}render(e,t,i){return this.ct(e,t,i).values}update(e,[t,i,o]){var n;const a=(e=>e._$AH)(e),{values:r,keys:s}=this.ct(t,i,o);if(!Array.isArray(a))return this.ut=s,r;const l=null!==(n=this.ut)&&void 0!==n?n:this.ut=[],c=[];let d,h,u=0,p=a.length-1,g=0,m=r.length-1;for(;u<=p&&g<=m;)if(null===a[u])u++;else if(null===a[p])p--;else if(l[u]===s[g])c[g]=nr(a[u],r[g]),u++,g++;else if(l[p]===s[m])c[m]=nr(a[p],r[m]),p--,m--;else if(l[u]===s[m])c[m]=nr(a[u],r[m]),or(e,c[m+1],a[u]),u++,m--;else if(l[p]===s[g])c[g]=nr(a[p],r[g]),or(e,a[u],a[p]),p--,g++;else if(void 0===d&&(d=sr(s,g,m),h=sr(l,u,p)),d.has(l[u]))if(d.has(l[p])){const t=h.get(s[g]),i=void 0!==t?a[t]:null;if(null===i){const t=or(e,a[u]);nr(t,r[g]),c[g]=t}else c[g]=nr(i,r[g]),or(e,a[u],i),a[t]=null;g++}else rr(a[p]),p--;else rr(a[u]),u++;for(;g<=m;){const t=or(e,c[m+1]);nr(t,r[g]),c[g++]=t}for(;u<=p;){const e=a[u++];null!==e&&rr(e)}return this.ut=s,((e,t=ar)=>{e._$AH=t})(e,c),Z}});var cr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let dr=class extends he{constructor(){super(...arguments),this.widgets=[],this.activeWidget=null,this.previousWidget=null,this.transitionRevision=0,this.transitionAnimations=[],this.messenger=et.getInstance(),this.logger=Se("wcc-zone"),this.animationOptions={duration:500,fill:"forwards"},this.onRequestUpdate=e=>{this.updateActiveWidget()}}connectedCallback(){super.connectedCallback(),this.messenger.subscribe(nt,this.onRequestUpdate),this.updateActiveWidget()}disconnectedCallback(){super.disconnectedCallback(),this.messenger.unsubscribe(nt,this.onRequestUpdate),this.cancelTransition()}updated(e){super.updated(e),(e.has("widgets")||e.has("zoneConfig"))&&this.updateActiveWidget()}get isExclusive(){var e;return"exclusive"===(null===(e=this.zoneConfig)||void 0===e?void 0:e.mode)}updateActiveWidget(){var e,t,i;if(!this.isExclusive)return;const o=[...this.widgets].sort((e,t)=>t.priority-e.priority),n=null!==(e=o.find(e=>e.isActive))&&void 0!==e?e:null;if(n===this.activeWidget)return;this.logger.debug(`Exclusive zone ${this.zoneId}: switching to ${null!==(i=null===(t=null==n?void 0:n.config)||void 0===t?void 0:t.type)&&void 0!==i?i:"none"}`),this.cancelTransition();const a=this.activeWidget;if(this.activeWidget=n,this.previousWidget=a,null==a||a.deactivate(),null==n||n.activate(),a&&n){const e=this.transitionRevision;this.updateComplete.then(()=>this.animateTransition(e))}else this.previousWidget=null}cancelTransition(){this.transitionRevision++;for(const e of this.transitionAnimations)e.cancel();this.transitionAnimations=[]}async animateTransition(e){var t,i;if(e!==this.transitionRevision)return;const o=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".item.active"),n=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector(".item.previous");if(!o||!n)return this.previousWidget=null,void this.requestUpdate();const a=[n.animate([{opacity:1},{opacity:0}],{...this.animationOptions,easing:"ease-out"}),o.animate([{opacity:0},{opacity:1}],{...this.animationOptions,easing:"ease-in"})];this.transitionAnimations=a;try{await Promise.all(a.map(e=>e.finished))}catch(e){return}if(e===this.transitionRevision&&(this.previousWidget=null,this.requestUpdate(),await this.updateComplete,e===this.transitionRevision)){for(const e of a)e.cancel();this.transitionAnimations=[]}}render(){var e;const t=this.zoneConfig,i=(null==t?void 0:t.gap)?`--zone-gap: ${t.gap};`:"",o=(null==t?void 0:t.padding)?`padding: ${t.padding};`:"",n=(null==t?void 0:t.offsetY)?`--zone-offset-y: ${t.offsetY};`:"",a={start:"flex-start",center:"center",end:"flex-end"}[null!==(e=null==t?void 0:t.align)&&void 0!==e?e:sa(this.zoneId)];if(this.isExclusive)return V`
                <div class="exclusive" style="${o} ${n}">
                    ${this.widgets.map(e=>V`
                        <div class="item
                                    ${e===this.activeWidget?"active":""}
                                    ${e===this.previousWidget?"previous":""}">
                            ${e}
                        </div>
                    `)}
                </div>
            `;const r="row"===(null==t?void 0:t.direction)?"row":"column";return V`
            <div class="stack ${r}" style="${i} ${o} ${n} ${"column"===r?`align-items: ${a};`:`justify-content: ${a};`}">
                ${this.widgets}
            </div>
        `}};dr.styles=a`
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
    `,cr([ve({attribute:!1})],dr.prototype,"zoneId",void 0),cr([ve({attribute:!1})],dr.prototype,"zoneConfig",void 0),cr([ve({attribute:!1})],dr.prototype,"widgets",void 0),cr([fe()],dr.prototype,"activeWidget",void 0),dr=cr([pe("wcc-zone")],dr);var hr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let ur=class extends he{constructor(){super(...arguments),this.appearance={},this.zoneEntries=[],this.widgetCache=new Map,this.logger=Se("wcc-layout")}willUpdate(e){e.has("layout")&&this.rebuildZones(),(e.has("hass")||e.has("appearance"))&&this.forwardToWidgets()}rebuildZones(){var e,t,i;const o=ja.getInstance(),n=new Map;this.zoneEntries=[];for(const a of na){const r=null===(t=null===(e=this.layout)||void 0===e?void 0:e.zones)||void 0===t?void 0:t[a];if(!(null===(i=null==r?void 0:r.widgets)||void 0===i?void 0:i.length))continue;const s=[];r.widgets.forEach((e,t)=>{var i,l,c,d;const h=`${a}:${null!==(i=e.id)&&void 0!==i?i:`${t}:${e.type}`}`;let u=this.widgetCache.get(h);if(u&&(null===(l=u.config)||void 0===l?void 0:l.type)===e.type)u.config=e;else if(u=o.createElement(e),!u)return;u.zoneId=a,u.zoneAlignment=null!==(c=r.align)&&void 0!==c?c:sa(a),u.zoneDirection=null!==(d=r.direction)&&void 0!==d?d:"column",u.appearance=this.appearance,this.hass&&(u.hass=this.hass),n.set(h,u),s.push(u)}),s.length&&this.zoneEntries.push({zoneId:a,config:r,widgets:s})}this.widgetCache=n,this.logger.debug(`Rebuilt zones: ${this.zoneEntries.map(e=>e.zoneId).join(", ")||"none"}`)}forwardToWidgets(){for(const e of this.widgetCache.values())e.appearance=this.appearance,this.hass&&(e.hass=this.hass)}hasWidget(e){return this.zoneEntries.some(t=>t.widgets.some(t=>{var i;return(null===(i=t.config)||void 0===i?void 0:i.type)===e}))}hasZone(e){return this.zoneEntries.some(t=>t.zoneId===e)}zonePlacement(e){const t=za(this.layout);if("grid-3x3"!==t){const i=Aa(t,e);return`grid-row: ${i.row}; grid-column: ${i.column}; align-self: ${i.alignSelf}; justify-self: stretch; z-index: 1;`}const[i]="center"===e?["middle"]:e.split("-"),o="top"===i?"start":"bottom"===i?"end":"center";return"bottom-center"!==e||this.hasZone("bottom-left")||this.hasZone("bottom-right")?"top-center"!==e||this.hasZone("top-left")||this.hasZone("top-right")?`grid-area: ${e}; align-self: ${o}; justify-self: stretch;`:"grid-row: 1; grid-column: 1 / -1; align-self: start; justify-self: stretch;":"grid-row: 3; grid-column: 1 / -1; align-self: end; justify-self: stretch;"}separatorInsetStyle(e,t,i){switch(function(e,t){const i=Ea(e);if(!i)return;const o=Aa(e,t);return"left"===i&&1===o.column||"right"===i&&2===o.column||"top"===i&&1===o.row||"bottom"===i&&2===o.row?i:void 0}(e,t)){case"left":return`--wcc-separator-inline-end-inset: ${i.left};`;case"right":return`--wcc-separator-inline-start-inset: ${i.right};`;case"top":return`--wcc-separator-block-end-inset: ${i.top};`;case"bottom":return`--wcc-separator-block-start-inset: ${i.bottom};`;default:return""}}render(){const e=va(this.layout),t=function(e){const t=e.trim().split(/\s+/),[i,o=i,n=i,a=o]=t;return 2===t.length?{top:i,right:o,bottom:i,left:o}:3===t.length?{top:i,right:o,bottom:n,left:o}:{top:i,right:o,bottom:n,left:a}}(e.padding),i=za(this.layout),o=Ia(this.layout),n=function(e){switch(e){case"vertical-2-1":return{columns:"minmax(0, 2fr) minmax(0, 1fr)",rows:"minmax(0, 1fr) auto minmax(0, 1fr)"};case"vertical-1-2":return{columns:"minmax(0, 1fr) minmax(0, 2fr)",rows:"minmax(0, 1fr) auto minmax(0, 1fr)"};case"horizontal-2-1":return{columns:"minmax(0, 1fr) auto minmax(0, 1fr)",rows:"minmax(0, 2fr) minmax(0, 1fr)"};case"horizontal-1-2":return{columns:"minmax(0, 1fr) auto minmax(0, 1fr)",rows:"minmax(0, 1fr) minmax(0, 2fr)"};default:return{columns:"minmax(0, 1fr) auto minmax(0, 1fr)",rows:"minmax(0, 1fr) auto minmax(0, 1fr)"}}}(i),a="glass"===o?Ea(i):void 0;return V`
            ${a?V`<div class="format-surface glass ${a}"></div>`:""}
            <div class="grid"
                 data-format=${i}
                 style="--wcc-padding: ${e.padding}; --wcc-zone-gap: ${e.zoneGap}; --wcc-widget-gap: ${e.widgetGap};
                        grid-template-columns: ${n.columns}; grid-template-rows: ${n.rows};
                        grid-template-areas: ${"grid-3x3"===i?"'top-left top-center top-right' 'middle-left center middle-right' 'bottom-left bottom-center bottom-right'":"none"};">
                ${lr(this.zoneEntries,e=>e.zoneId,e=>V`
                    <wcc-zone style="${this.zonePlacement(e.zoneId)}
                                     ${this.separatorInsetStyle(i,e.zoneId,t)}"
                              .zoneId=${e.zoneId}
                              .zoneConfig=${e.config}
                              .widgets=${e.widgets}></wcc-zone>
                `)}
            </div>
        `}};function pr(e,t,i=[]){if(e===t)return i;if(e&&"object"==typeof e)if(Array.isArray(e))for(let o=0;o<e.length;o++){const n=pr(e[o],t,[...i,o]);if(n)return n}else for(const[o,n]of Object.entries(e)){const e=pr(n,t,[...i,o]);if(e)return e}}function gr(e,t){return t.reduce((e,t)=>{if(e&&"object"==typeof e)return e[t]},e)}function mr(e,t){return e===t||JSON.stringify(e)===JSON.stringify(t)}ur.styles=a`
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
            position: absolute;
            z-index: 0;
            pointer-events: none;
        }

        .format-surface.left,
        .format-surface.right {
            top: 0;
            bottom: 0;
            width: 33.333333%;
        }

        .format-surface.left {
            left: 0;
            border-right: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.right {
            right: 0;
            border-left: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.top,
        .format-surface.bottom {
            left: 0;
            right: 0;
            height: 33.333333%;
        }

        .format-surface.top {
            top: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.bottom {
            bottom: 0;
            border-top: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.glass {
            background:
                linear-gradient(135deg, rgba(9, 13, 18, 0.72), rgba(20, 18, 19, 0.62));
            box-shadow: 0 0 48px rgba(0, 0, 0, 0.18);
            backdrop-filter: blur(24px) saturate(1.1);
            -webkit-backdrop-filter: blur(24px) saturate(1.1);
        }
    `,hr([ve({attribute:!1})],ur.prototype,"layout",void 0),hr([ve({attribute:!1})],ur.prototype,"hass",void 0),hr([ve({attribute:!1})],ur.prototype,"appearance",void 0),ur=hr([pe("wcc-layout")],ur);class vr extends Qe{constructor(e,t={}){super(e,"clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.config=t}onHostConnected(){this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}onHostDisconnected(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(e){this.logger.debug("Updating ClockController config:",e),this.config={...this.config,...e};const t=new Date,i=this.config.language||"en",o=this.config.timeZone;this.updateTime(t,o),this.updateDate(t,i,o),this.host.requestUpdate()}update(){const e=new Date,t=this.config.language||"en",i=this.config.timeZone;this.updateTime(e,i),0!==e.getSeconds()&&""!==this._currentDate||this.updateDate(e,t,i),this.host.requestUpdate()}updateTime(e,t){var i,o,n,a,r,s,l,c,d;const h="hidden"===(null===(i=this.config.timeFormat)||void 0===i?void 0:i.second),u=!0===(null===(o=this.config.timeFormat)||void 0===o?void 0:o.hour12);let p,g,m;if(t){const i=new Intl.DateTimeFormat("en-US",{timeZone:t,hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).formatToParts(e);p=parseInt((null===(n=i.find(e=>"hour"===e.type))||void 0===n?void 0:n.value)||"0",10),g=parseInt((null===(a=i.find(e=>"minute"===e.type))||void 0===a?void 0:a.value)||"0",10),m=parseInt((null===(r=i.find(e=>"second"===e.type))||void 0===r?void 0:r.value)||"0",10)}else p=e.getHours(),g=e.getMinutes(),m=e.getSeconds();if(h&&(this._seconds=""),u){const e=p>=12;p%=12,p=p||12,this._ampm=!1===(null===(s=this.config.timeFormat)||void 0===s?void 0:s.showAmPm)?"":e?"PM":"AM"}else this._ampm="";const v="numeric"!==(null===(l=this.config.timeFormat)||void 0===l?void 0:l.hour);this._hours=v?p.toString().padStart(2,"0"):p.toString();const f="numeric"!==(null===(c=this.config.timeFormat)||void 0===c?void 0:c.minute);if(this._minutes=f?g.toString().padStart(2,"0"):g.toString(),!h){const e="numeric"!==(null===(d=this.config.timeFormat)||void 0===d?void 0:d.second);this._seconds=e?m.toString().padStart(2,"0"):m.toString()}}updateDate(e,t,i){let o=Xe(e,t,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},i);o=o.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=o}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var fr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let yr=class extends he{constructor(){super(),this.showClock=!0,this.showDate=!0,this.logger=Se("clock-component"),this.clockController=new vr(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}get controller(){return this.clockController}updated(e){if(super.updated(e),e.has("timeFormat")||e.has("dateFormat")||e.has("language")||e.has("timeZone")||e.has("size")||e.has("clockSize")||e.has("dateSize")||e.has("clockTopMargin")){if(this.logger.debug("Clock properties changed, updating ClockController"),e.has("timeFormat")){const t=e.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.timeFormat)}`)}if(e.has("dateFormat")){const t=e.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(t)} -> ${JSON.stringify(this.dateFormat)}`)}if(e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("clockSize")){const t=e.get("clockSize");this.logger.debug(`ClockSize changed: ${t} -> ${this.clockSize}`)}if(e.has("dateSize")){const t=e.get("dateSize");this.logger.debug(`DateSize changed: ${t} -> ${this.dateSize}`)}if(e.has("clockTopMargin")){const t=e.get("clockTopMargin");this.logger.debug(`ClockTopMargin changed: ${t} -> ${this.clockTopMargin}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}getClockSize(){return ut(this.size,this.clockSize,"clockSize")}getDateSize(){return ut(this.size,this.dateSize,"dateSize")}getClockTopMargin(){var e;return this.size===dt.Custom&&null!==(e=this.clockTopMargin)&&void 0!==e?e:"0rem"}render(){var e,t;const i=this.getSeconds(),o=void 0!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second)&&"hidden"!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second),n=this.getClockSize(),a=this.getDateSize();return V`
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
                <div class="date ${this.showClock?"":"standalone"}"
                     style="color: ${this.fontColor}; font-size: ${a};">${this.getCurrentDate()}</div>
            `:""}
        `}};function br(e,t){var i;return e||(null===(i=null==t?void 0:t.locale)||void 0===i?void 0:i.language)||(null==t?void 0:t.language)||"en"}function wr(e,t){var i,o;if(void 0!==e)return Boolean(e);const n=null===(i=null==t?void 0:t.locale)||void 0===i?void 0:i.time_format;if("12"===n)return!0;if("24"===n)return!1;const a="system"===n?void 0:br(void 0,t);try{return null!==(o=new Intl.DateTimeFormat(a,{hour:"numeric"}).resolvedOptions().hour12)&&void 0!==o&&o}catch(e){return!1}}yr.styles=a`
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
    `,fr([ve({type:Object})],yr.prototype,"timeFormat",void 0),fr([ve({type:Object})],yr.prototype,"dateFormat",void 0),fr([ve({type:String})],yr.prototype,"fontColor",void 0),fr([ve({type:String})],yr.prototype,"language",void 0),fr([ve({type:String})],yr.prototype,"timeZone",void 0),fr([ve({type:String})],yr.prototype,"size",void 0),fr([ve({type:String})],yr.prototype,"clockSize",void 0),fr([ve({type:String})],yr.prototype,"dateSize",void 0),fr([ve({type:String})],yr.prototype,"clockTopMargin",void 0),fr([ve({type:Boolean})],yr.prototype,"showClock",void 0),fr([ve({type:Boolean})],yr.prototype,"showDate",void 0),yr=fr([pe("ha-clock")],yr);var _r=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};class xr extends he{constructor(){super(...arguments),this.appearance={}}get priority(){var e,t;return null!==(t=null===(e=this.config)||void 0===e?void 0:e.priority)&&void 0!==t?t:0}get isActive(){return!0}activate(){}deactivate(){}get fontColor(){var e,t,i,o,n;return null!==(n=null!==(i=null===(t=null===(e=this.config)||void 0===e?void 0:e.style)||void 0===t?void 0:t.color)&&void 0!==i?i:null===(o=this.appearance)||void 0===o?void 0:o.fontColor)&&void 0!==n?n:"#FFFFFF"}updated(e){super.updated(e),this.config&&(e.has("config")||e.has("hass")||e.has("appearance")||e.has("zoneId")||e.has("zoneAlignment")||e.has("zoneDirection"))&&(this.applyWidgetState(),this.applyStyleOverrides())}applyStyleOverrides(){var e,t,i,o,n,a,r,s,l,c,d;const h=null===(e=this.config)||void 0===e?void 0:e.style,u=La(null===(t=this.config)||void 0===t?void 0:t.type),p=!["clock","date","action-bar","sensors","weather","calendar"].includes(null===(i=this.config)||void 0===i?void 0:i.type);this.style.margin=null!==(o=null==h?void 0:h.margin)&&void 0!==o?o:"",this.style.maxWidth=u&&null!==(n=null==h?void 0:h.maxWidth)&&void 0!==n?n:"",this.style.maxHeight=p&&null!==(a=null==h?void 0:h.maxHeight)&&void 0!==a?a:"",this.style.overflow=p&&(null==h?void 0:h.maxHeight)?"auto":"",this.style.fontSize=null!==(r=null==h?void 0:h.fontSize)&&void 0!==r?r:"",this.style.fontFamily=null!==(c=null!==(s=null==h?void 0:h.fontFamily)&&void 0!==s?s:null===(l=this.appearance)||void 0===l?void 0:l.fontFamily)&&void 0!==c?c:"",this.style.color=null!==(d=null==h?void 0:h.color)&&void 0!==d?d:""}}_r([ve({type:Object})],xr.prototype,"hass",void 0),_r([ve({type:Object})],xr.prototype,"config",void 0),_r([ve({type:Object})],xr.prototype,"appearance",void 0),_r([ve({attribute:!1})],xr.prototype,"zoneId",void 0),_r([ve({attribute:!1})],xr.prototype,"zoneAlignment",void 0),_r([ve({attribute:!1})],xr.prototype,"zoneDirection",void 0);let $r=class extends xr{constructor(){super(...arguments),this.clock=document.createElement("ha-clock")}applyWidgetState(){var e,t,i,o,n,a,r,s,l;const c=null!==(e=this.config.clockSize)&&void 0!==e?e:null===(t=this.config.style)||void 0===t?void 0:t.fontSize;this.clock.showDate=!1,this.clock.timeFormat=function(e,t){const i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:wr(null==e?void 0:e.hour12,t)};return e&&(Object.assign(i,e,{hour12:i.hour12}),void 0===e.second&&(i.second=void 0)),i}(this.config.timeFormat,this.hass),this.clock.language=br(null===(i=this.appearance)||void 0===i?void 0:i.language,this.hass),this.clock.timeZone=null!==(n=null===(o=this.appearance)||void 0===o?void 0:o.timeZone)&&void 0!==n?n:null===(r=null===(a=this.hass)||void 0===a?void 0:a.config)||void 0===r?void 0:r.time_zone,this.clock.fontColor=this.fontColor,this.clock.size=c?dt.Custom:null!==(l=null===(s=this.appearance)||void 0===s?void 0:s.size)&&void 0!==l?l:dt.Medium,this.clock.clockSize=c}render(){return V`${this.clock}`}};$r.styles=a`
        :host {
            display: block;
        }
    `,$r=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("wcc-clock-widget")],$r);let kr=class extends xr{constructor(){super(...arguments),this.clock=document.createElement("ha-clock")}applyWidgetState(){var e,t,i,o,n,a,r,s,l;const c=null!==(e=this.config.dateSize)&&void 0!==e?e:null===(t=this.config.style)||void 0===t?void 0:t.fontSize;this.clock.showClock=!1,this.clock.dateFormat=function(e){const t={weekday:"long",year:"numeric",month:"long",day:"numeric"};return e&&(Object.assign(t,e),void 0===e.year&&(t.year=void 0)),t}(this.config.dateFormat),this.clock.language=br(null===(i=this.appearance)||void 0===i?void 0:i.language,this.hass),this.clock.timeZone=null!==(n=null===(o=this.appearance)||void 0===o?void 0:o.timeZone)&&void 0!==n?n:null===(r=null===(a=this.hass)||void 0===a?void 0:a.config)||void 0===r?void 0:r.time_zone,this.clock.fontColor=this.fontColor,this.clock.size=c?dt.Custom:null!==(l=null===(s=this.appearance)||void 0===s?void 0:s.size)&&void 0!==l?l:dt.Medium,this.clock.dateSize=c}render(){return V`${this.clock}`}};kr.styles=a`
        :host {
            display: block;
        }
    `,kr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("wcc-date-widget")],kr);class Sr extends Qe{constructor(e,t={}){super(e,"sensor-controller"),this._sensorValues=[],this.config={},this.config=t}onHostConnected(){}onHostDisconnected(){}updateConfig(e){this.logger.debug("Updating SensorController config:",e),this.config={...this.config,...e},this.hass&&this.updateSensorValues()}updateHass(e){this.hass=e,this.updateSensorValues()}updateSensorValues(){this.hass&&this.config.sensors&&0!==this.config.sensors.length?(this._sensorValues=this.config.sensors.map(e=>this.processSensor(e)),this.host.requestUpdate()):this._sensorValues=[]}processSensor(e){var t,i,o,n;const a=e.entity,r=null===(t=this.hass)||void 0===t?void 0:t.states[a];if(!a||!r)return{entity:a,label:e.label,icon:e.icon,value:"unavailable"};const s=r.entity_id?r:{...r,entity_id:a};return{entity:a,label:null!==(i=e.label)&&void 0!==i?i:null===(o=r.attributes)||void 0===o?void 0:o.friendly_name,icon:null!==(n=e.icon)&&void 0!==n?n:Pt(s),value:this.formatState(e,r)}}formatState(e,t){var i,o;const n=null===(i=this.hass)||void 0===i?void 0:i.formatEntityState;if(void 0===e.precision&&"function"==typeof n)try{return n.call(this.hass,t)}catch(e){this.logger.warn("formatEntityState failed, using fallback formatting",e)}let a=t.state;const r=this.getDisplayPrecision(e,t);return void 0===r||null===a||""===a||isNaN(Number(a))||(a=this.formatNumericValue(Number(a),r)),(null===(o=t.attributes)||void 0===o?void 0:o.unit_of_measurement)&&(a+=` ${t.attributes.unit_of_measurement}`),a}getDisplayPrecision(e,t){var i,o,n,a,r;if(void 0!==e.precision)return e.precision;const s=null===(n=null===(o=null===(i=this.hass)||void 0===i?void 0:i.entities)||void 0===o?void 0:o[e.entity])||void 0===n?void 0:n.display_precision;return void 0!==s?s:void 0!==(null===(a=null==t?void 0:t.attributes)||void 0===a?void 0:a.display_precision)?t.attributes.display_precision:void 0!==(null===(r=null==t?void 0:t.attributes)||void 0===r?void 0:r.suggested_display_precision)?t.attributes.suggested_display_precision:void 0}formatNumericValue(e,t){try{let i=function(e,t,i){var o=t?function(e){switch(e.number_format){case vt.comma_decimal:return["en-US","en"];case vt.decimal_comma:return["de","es","it"];case vt.space_comma:return["fr","sv","cs"];case vt.system:return;default:return e.language}}(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==vt.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(o,_t(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,_t(e,i)).format(Number(e))}return"string"==typeof e?e:function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)}(e,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")}(e,this.hass.locale,{minimumFractionDigits:t,maximumFractionDigits:t});return t>0&&!i.includes(".")&&!i.includes(",")?e.toFixed(t):i}catch(i){return e.toFixed(t)}}get sensorValues(){return this._sensorValues}}var Cr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let zr=class extends he{constructor(){super(),this.showIcons=!0,this.showSeparator=!0,this.orientation="vertical",this.alignment="left",this.logger=Se("sensor-component"),this.sensorController=new Sr(this,{sensors:this.sensors})}get controller(){return this.sensorController}getLabelSize(){return ut(this.size,this.labelSize,"labelSize")}getValueSize(){return ut(this.size,this.valueSize,"valueSize")}updated(e){if(super.updated(e),e.has("sensors")&&(this.logger.debug("Sensors changed, updating SensorController"),this.sensorController.updateConfig({sensors:this.sensors})),e.has("hass")&&this.hass&&this.sensorController.updateHass(this.hass),e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}_openMoreInfo(e){e&&$t(this,"hass-more-info",{entityId:e})}render(){var e,t,i,o;const n=this.sensorController.sensorValues;if(0===n.length)return V``;const a=this.getLabelSize(),r=this.getValueSize(),s=(null===(e=this.itemGap)||void 0===e?void 0:e.trim())||"16px",l=(null===(t=this.iconSize)||void 0===t?void 0:t.trim())||"clamp(1.8rem, 6cqw, 2.25rem)",c=(null===(i=this.separatorColor)||void 0===i?void 0:i.trim())||"currentColor",d=Math.min(1,Math.max(0,null!==(o=this.separatorOpacity)&&void 0!==o?o:.28));return this.logger.debug(`Rendering sensors - LabelSize: ${a}, ValueSize: ${r}`),V`
            <div class="sensor-container ${this.orientation} align-${this.alignment} ${this.showIcons?"show-icons":""}"
                 style="color: ${this.fontColor};
                        --sensor-item-gap: ${s};
                        --sensor-icon-size: ${l};
                        --sensor-separator-color: ${c};
                        --sensor-separator-opacity: ${d};">
                ${n.map((e,t)=>V`
                    ${"horizontal"===this.orientation&&this.showSeparator&&t>0?V`<span class="sensor-divider" aria-hidden="true"></span>`:""}
                    <div class="sensor-item"
                         role="button"
                         tabindex="0"
                         @click=${()=>this._openMoreInfo(e.entity)}
                         @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._openMoreInfo(e.entity))}}>
                        <div class="sensor-content">
                            ${this.showIcons&&e.icon?V`<ha-icon class="sensor-icon" .icon=${e.icon}></ha-icon>`:""}
                            <div class="sensor-copy">
                                ${e.label?V`
                                        <div class="sensor-label" style="color: ${this.fontColor}; font-size: ${a};">
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
        `}};zr.styles=a`
        :host {
            display: block;
            width: 100%;
            max-height: 100%;
            container-type: inline-size;
        }

        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own items. */
        .sensor-container {
            display: flex;
            width: 100%;
            box-sizing: border-box;
            max-height: 100%;
            gap: var(--sensor-item-gap, 16px);
            --sensor-icon-copy-gap: clamp(4px, 1cqw, 10px);
            --sensor-text-column-width: 7.5rem;
        }

        .sensor-item {
            flex: 0 0 auto;
            min-width: 0;
            max-width: 100%;
            cursor: pointer;
        }

        .sensor-container.horizontal {
            flex-direction: row;
            align-items: stretch;
            gap: 0;
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
            flex: 1 1 0;
            justify-content: center;
        }

        .sensor-container.horizontal.show-icons .sensor-item {
            flex-basis: min(
                100%,
                calc(
                    var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem))
                    + var(--sensor-text-column-width)
                    + var(--sensor-icon-copy-gap)
                )
            );
            flex-shrink: 0;
        }

        .sensor-container.horizontal:not(.show-icons) .sensor-item {
            flex-basis: min(100%, var(--sensor-text-column-width));
            flex-shrink: 0;
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
            grid-template-columns: minmax(0, 1fr);
            align-items: center;
            width: min(100%, var(--sensor-text-column-width));
        }

        .sensor-container.horizontal.show-icons .sensor-content {
            grid-template-columns:
                var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem))
                var(--sensor-text-column-width);
            width: min(
                100%,
                calc(
                    var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem))
                    + var(--sensor-text-column-width)
                    + var(--sensor-icon-copy-gap)
                )
            );
        }

        .sensor-container.horizontal.show-icons .sensor-copy {
            grid-column: 2;
        }

        .sensor-copy {
            min-width: 0;
        }

        .sensor-icon {
            flex: 0 0 auto;
            --mdc-icon-size: var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem));
            opacity: 0.9;
        }

        .sensor-divider {
            align-self: stretch;
            flex: 0 0 1px;
            width: 1px;
            min-height: 3rem;
            margin: 4px 0;
            background: var(--sensor-separator-color, currentColor);
            border-radius: 999px;
            opacity: var(--sensor-separator-opacity, 0.28);
            pointer-events: none;
        }

        .sensor-container.horizontal.align-left { justify-content: flex-start; }
        .sensor-container.horizontal.align-center { justify-content: center; }
        .sensor-container.horizontal.align-right { justify-content: flex-end; }
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
        }

        .sensor-value {
            font-size: 1.5rem;
            font-weight: 400;
            color: var(--sensor-value-color, #ffffff);
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
    `,Cr([ve({type:Array})],zr.prototype,"sensors",void 0),Cr([ve({type:String})],zr.prototype,"fontColor",void 0),Cr([ve({type:Object})],zr.prototype,"hass",void 0),Cr([ve({type:String})],zr.prototype,"size",void 0),Cr([ve({type:String})],zr.prototype,"labelSize",void 0),Cr([ve({type:String})],zr.prototype,"valueSize",void 0),Cr([ve({type:String})],zr.prototype,"itemGap",void 0),Cr([ve({type:Boolean})],zr.prototype,"showIcons",void 0),Cr([ve({type:String})],zr.prototype,"iconSize",void 0),Cr([ve({type:Boolean})],zr.prototype,"showSeparator",void 0),Cr([ve({type:String})],zr.prototype,"separatorColor",void 0),Cr([ve({type:Number})],zr.prototype,"separatorOpacity",void 0),Cr([ve({type:String})],zr.prototype,"orientation",void 0),Cr([ve({type:String})],zr.prototype,"alignment",void 0),zr=Cr([pe("ha-sensors")],zr);let Ir=class extends xr{constructor(){super(...arguments),this.sensors=document.createElement("ha-sensors")}applyWidgetState(){var e,t,i;const o=!(!this.config.labelSize&&!this.config.valueSize);this.sensors.sensors=null!==(e=this.config.sensors)&&void 0!==e?e:[],this.sensors.fontColor=this.fontColor,this.sensors.size=o?dt.Custom:null!==(i=null===(t=this.appearance)||void 0===t?void 0:t.size)&&void 0!==i?i:dt.Medium,this.sensors.labelSize=this.config.labelSize,this.sensors.valueSize=this.config.valueSize,this.sensors.itemGap=this.config.itemGap,this.sensors.showIcons=!1!==this.config.showIcons,this.sensors.iconSize=this.config.iconSize,this.sensors.showSeparator=!1!==this.config.showSeparator,this.sensors.separatorColor=this.config.separatorColor,this.sensors.separatorOpacity=this.config.separatorOpacity,this.sensors.orientation=Ha(this.config.orientation,this.zoneId),this.sensors.alignment=Wa(this.config.alignment,this.zoneId,this.zoneAlignment),this.hass&&(this.sensors.hass=this.hass)}render(){return V`${this.sensors}`}};Ir.styles=a`
        :host {
            display: block;
            width: 100%;
            max-height: 100%;
        }
    `,Ir=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("wcc-sensors-widget")],Ir);class Ar{static getInstance(){return Ar.instance||(Ar.instance=new Ar),Ar.instance}constructor(){this.providers=new Map}register(e){this.providers.has(e.id)&&ze.warn(`Weather provider with ID ${e.id} is already registered. Overwriting.`),this.providers.set(e.id,e)}getProvider(e){return this.providers.get(e)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(e){return this.providers.has(e)}}const Er=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(e){if(!e.apiKey)throw new Error("OpenWeatherMap API key is required");const t=e.latitude||50.0755,i=e.longitude||14.4378,o=e.units||"metric",n=e.language||"en";try{const a=`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${i}&units=${o}&lang=${n}&appid=${e.apiKey}`;ze.debug("[OpenWeatherMap] "+a);const r=await fetch(a);if(!r.ok)throw new Error(`OpenWeatherMap API error: ${r.statusText}`);const s=await r.json();if(!s.list||!s.list.length)throw new Error("No forecast data available");const l=s.list[0],c=l.weather[0].description,d={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon,e.iconSet),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},h=new Map;return s.list.forEach(e=>{var t;const i=new Date(1e3*e.dt).toISOString().split("T")[0];h.has(i)||h.set(i,[]),null===(t=h.get(i))||void 0===t||t.push(e)}),{current:d,daily:Array.from(h.entries()).map(([t,i])=>{const o=i.map(e=>e.main.temp),n=Math.min(...o),a=Math.max(...o),r=i[Math.floor(i.length/2)]||i[0],s=i.filter(e=>void 0!==e.pop).map(e=>e.pop),l=s.length>0?s.reduce((e,t)=>e+t,0)/s.length*100:0;return{date:new Date(t),temperatureMin:n,temperatureMax:a,condition:r.weather[0].description,icon:this.getIconUrl(r.weather[0].icon,e.iconSet),precipitation:l,humidity:r.main.humidity,windSpeed:r.wind.speed}}),temperatureUnit:"imperial"===e.units?"°F":"°C"}}catch(e){throw ze.error("Error fetching weather data from OpenWeatherMap:",e),e}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"en"}}getIconUrl(e,t){return"basmilius"===t?this.getAnimatedIconUrl(e):"metno"===t?this.getMetNoIconUrl(e):`https://openweathermap.org/img/wn/${e}@2x.png`}getAnimatedIconUrl(e){let t="clear-day";switch(e){case"01d":t="clear-day";break;case"01n":t="clear-night";break;case"02d":t="partly-cloudy-day";break;case"02n":t="partly-cloudy-night";break;case"03d":case"03n":case"04d":case"04n":t="cloudy";break;case"09d":case"09n":t="rain";break;case"10d":t="partly-cloudy-day-rain";break;case"10n":t="partly-cloudy-night-rain";break;case"11d":case"11n":t="thunderstorms";break;case"13d":case"13n":t="snow";break;case"50d":case"50n":t="fog"}return`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${t}.svg`}getMetNoIconUrl(e){let t="clearsky_day";switch(e){case"01d":t="clearsky_day";break;case"01n":t="clearsky_night";break;case"02d":t="fair_day";break;case"02n":t="fair_night";break;case"03d":case"03n":case"04d":case"04n":t="cloudy";break;case"09d":case"09n":t="heavyrain";break;case"10d":case"10n":t="rain";break;case"11d":case"11n":t="rainshowersandthunder_day";break;case"13d":case"13n":t="snow";break;case"50d":case"50n":t="fog"}return`https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${t}.svg`}getWindDirection(e){return["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]}mapWeatherCondition(e){let t;switch(ze.debug(`[OpenWeatherMap] Mapping weather condition: ${e}`),e.toLowerCase()){case"clear":case"clear sky":t=Ee.ClearSky;break;case"few clouds":case"scattered clouds":case"overcast clouds":case"broken clouds":case"clouds":t=Ee.Clouds;break;case"fog":case"haze":case"dust":case"smoke":case"mist":t=Ee.Mist;break;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":t=Ee.Rain;break;case"tornado":case"windy":case"all":default:t=Ee.All;break;case"snow":case"light snow":t=Ee.Snow}return ze.debug(`[OpenWeatherMap] Mapped to Weather enum: ${t}`),t}},Dr=new class{constructor(){this.id="homeassistant",this.name="Home Assistant",this.description="Weather data from a Home Assistant entity"}setHass(e){this.hass=e}async fetchWeatherAsync(e){var t,i,o;if(!this.hass)throw new Error("Home Assistant instance not set");const n=e.entityId;if(!n)throw new Error("Home Assistant weather entity ID is required");const a=this.hass.states[n];if(!a)throw new Error(`Entity ${n} not found`);const r=a.attributes,s=this.buildCurrent(a,e);let l=[];try{const i=null===(t=(await this.hass.callWS({type:"call_service",domain:"weather",service:"get_forecasts",service_data:{type:"daily"},target:{entity_id:n},return_response:!0})).response[n])||void 0===t?void 0:t.forecast;i&&Array.isArray(i)&&(l=this.mapForecastItems(i,e,a))}catch(e){ze.error(`[HA Weather] Error fetching forecast for ${n}:`,e)}return{current:s,daily:l,entityId:n,temperatureUnit:r.temperature_unit||(null===(o=null===(i=this.hass.config)||void 0===i?void 0:i.unit_system)||void 0===o?void 0:o.temperature)}}getCurrentWeather(e){var t;const i=e.entityId?null===(t=this.hass)||void 0===t?void 0:t.states[e.entityId]:void 0;if(i)return this.buildCurrent(i,e)}async subscribeForecastAsync(e,t){var i;const o=e.entityId,n=null===(i=this.hass)||void 0===i?void 0:i.connection;if(!o||!(null==n?void 0:n.subscribeMessage))return null;try{const i=await n.subscribeMessage(i=>{var n;if((null==i?void 0:i.forecast)&&Array.isArray(i.forecast)){const a=null===(n=this.hass)||void 0===n?void 0:n.states[o];t(this.mapForecastItems(i.forecast,e,a))}},{type:"weather/subscribe_forecast",entity_id:o,forecast_type:"daily"});return ze.debug(`[HA Weather] Subscribed to forecast updates for ${o}`),i}catch(e){return ze.warn(`[HA Weather] weather/subscribe_forecast unavailable for ${o}:`,e),null}}buildCurrent(e,t){const i=e.attributes,o=e.state;return{temperature:i.temperature,condition:this.mapConditionToKey(o),conditionText:this.localizeCondition(e),conditionUnified:this.mapWeatherCondition(o),icon:this.getIconUrl(o,t.iconSet),humidity:i.humidity,windSpeed:i.wind_speed,pressure:i.pressure,feelsLike:i.apparent_temperature}}mapForecastItems(e,t,i){return e.map(e=>({date:new Date(e.datetime),temperatureMin:void 0!==e.templow?e.templow:e.temperature,temperatureMax:e.temperature,condition:this.mapConditionToKey(e.condition),conditionText:i?this.localizeCondition(i,e.condition):void 0,icon:this.getIconUrl(e.condition,t.iconSet),precipitation:e.precipitation,humidity:e.humidity,windSpeed:e.wind_speed}))}localizeCondition(e,t){var i;const o=null===(i=this.hass)||void 0===i?void 0:i.formatEntityState;if("function"==typeof o)try{return void 0!==t?o.call(this.hass,e,t):o.call(this.hass,e)}catch(e){return void ze.warn("[HA Weather] formatEntityState failed:",e)}}getDefaultConfig(){return{entityId:""}}mapConditionToKey(e){const t=null==e?void 0:e.toLowerCase();switch(t){case"sunny":case"clear-night":return"clear_sky";case"cloudy":return"overcast_clouds";case"partlycloudy":return"scattered_clouds";case"rainy":return"rain";case"pouring":return"heavy_intensity_rain";case"lightning":case"lightning-rainy":return"thunderstorm";case"snowy":case"snowy-rainy":return"snow";case"fog":return"mist";default:return t}}mapWeatherCondition(e){switch(null==e?void 0:e.toLowerCase()){case"clear-night":case"sunny":return Ee.ClearSky;case"cloudy":case"partlycloudy":return Ee.Clouds;case"rainy":case"pouring":case"lightning":case"lightning-rainy":return Ee.Rain;case"snowy":case"snowy-rainy":return Ee.Snow;case"fog":case"hail":return Ee.Mist;default:return Ee.All}}getIconUrl(e,t){const i=null==e?void 0:e.toLowerCase();if("basmilius"===t)return this.getAnimatedIconUrl(i);if("openweathermap"===t)return this.getOpenWeatherMapIconUrl(i);let o="clearsky_day";switch(i){case"sunny":o="clearsky_day";break;case"clear-night":o="clearsky_night";break;case"cloudy":o="cloudy";break;case"partlycloudy":o="fair_day";break;case"rainy":o="rain";break;case"pouring":o="heavyrain";break;case"lightning":case"lightning-rainy":o="rainshowersandthunder_day";break;case"snowy":o="snow";break;case"snowy-rainy":o="sleet";break;case"fog":o="fog"}return`https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${o}.svg`}getOpenWeatherMapIconUrl(e){let t="01d";switch(e){case"sunny":t="01d";break;case"clear-night":t="01n";break;case"cloudy":t="03d";break;case"partlycloudy":t="02d";break;case"rainy":t="10d";break;case"pouring":t="09d";break;case"lightning":case"lightning-rainy":t="11d";break;case"snowy":case"snowy-rainy":t="13d";break;case"fog":t="50d"}return`https://openweathermap.org/img/wn/${t}@2x.png`}getAnimatedIconUrl(e){let t="clear-day";switch(e){case"sunny":t="clear-day";break;case"clear-night":t="clear-night";break;case"cloudy":t="cloudy";break;case"partlycloudy":t="partly-cloudy-day";break;case"rainy":t="rain";break;case"pouring":t="extreme-rain";break;case"lightning":case"lightning-rainy":t="thunderstorms-rain";break;case"snowy":t="snow";break;case"snowy-rainy":t="sleet";break;case"fog":t="fog";break;case"hail":t="hail";break;case"windy":t="wind"}return`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${t}.svg`}},Pr=Ar.getInstance();function Or(e){return Pr.getProvider(e)}Pr.register(Er),Pr.register(Dr);class Tr extends Qe{constructor(e,t={}){super(e,"weather-controller"),this._weatherLoading=!1,this._weatherError=!1,this._weatherErrorMessage="",this._messenger=et.getInstance(),this._forceUpdateWeatherHandler=e=>this.fetchWeatherDataAsync(),this.config={},this.config=t}onHostConnected(){this._messenger.subscribe(ot,this._forceUpdateWeatherHandler),this.config.showWeather&&(this.setupUpdateInterval(),this.fetchWeatherDataAsync())}onHostDisconnected(){this._messenger.unsubscribe(ot,this._forceUpdateWeatherHandler),this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),this.teardownForecastSubscription()}teardownForecastSubscription(){if(this._forecastUnsubscribe){try{this._forecastUnsubscribe()}catch(e){this.logger.debug("Error unsubscribing from forecast updates:",e)}this._forecastUnsubscribe=void 0,this._subscribedEntityId=void 0}}async updateConfigAsync(e,t){this.logger.debug("Updating WeatherController config:",e);const i=this._hass;this._hass=t;const o=this.config.showWeather,n=this.config.weatherProvider,a=this.config.weatherUpdateInterval;this.config={...this.config,...e},a!==this.config.weatherUpdateInterval&&this.setupUpdateInterval(),this.config.showWeather&&(!o&&this.config.showWeather||!i&&this._hass&&!this._weatherData||n!==this.config.weatherProvider)?await this.fetchWeatherDataAsync():this.config.showWeather?this.refreshCurrentFromEntity():et.getInstance().publish(new it(Ee.All)),this.host.requestUpdate()}refreshCurrentFromEntity(){var e,t;if(!this._hass||!this._weatherData)return;const i=Or(this.config.weatherProvider||"openweathermap");if(!(null==i?void 0:i.getCurrentWeather))return;const o=this.buildProviderConfig(i),n=o.entityId;if(!n)return;const a=this._hass.states[n];if(!a||a===this._lastEntityState)return;this._lastEntityState=a,null===(e=i.setHass)||void 0===e||e.call(i,this._hass);const r=i.getCurrentWeather(o);r&&(this.logger.debug(`Weather entity ${n} changed, refreshing current conditions`),this._weatherData={...this._weatherData,current:r},this._messenger.publish(new it(null!==(t=r.conditionUnified)&&void 0!==t?t:Ee.All)))}async setupForecastSubscriptionAsync(e,t){if(!e.subscribeForecastAsync)return void this.teardownForecastSubscription();const i=t.entityId;if(!i||i===this._subscribedEntityId)return;this.teardownForecastSubscription();const o=await e.subscribeForecastAsync(t,e=>{this._weatherData&&(this.logger.debug(`Received pushed forecast update (${e.length} days)`),this._weatherData={...this._weatherData,daily:e},this.host.requestUpdate())});o&&(this._forecastUnsubscribe=o,this._subscribedEntityId=i)}buildProviderConfig(e){var t;let i=e.getDefaultConfig();return this.config.weatherConfig&&(i={...i,...this.config.weatherConfig},this.config.weatherConfig.units&&(i.units=this.config.weatherConfig.units)),this.config.weatherIconSet?i.iconSet=this.config.weatherIconSet:(null===(t=this.config.weatherConfig)||void 0===t?void 0:t.iconSet)&&(i.iconSet=this.config.weatherConfig.iconSet),i}setupUpdateInterval(){if(this.updateTimer&&(window.clearInterval(this.updateTimer),this.updateTimer=void 0),!this.config.showWeather)return;let e=this.config.weatherUpdateInterval||1800;e=Math.max(e,60);const t=1e3*e;this.logger.debug(`Setting weather update interval to ${e} seconds`),this.updateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(e){this.logger.error("Error in weather update interval:",e)}})()},t)}async fetchWeatherDataAsync(){var e,t;if(!this._weatherLoading&&this.config.showWeather){this.logger.debug("Begin fetch weather data"),this._weatherLoading=!0,this._weatherError=!1,this._weatherErrorMessage="";try{const i=this.config.weatherProvider||"openweathermap",o=Or(i);if(!o)throw new Error(`Weather provider '${i}' not found`);if(o.setHass)if(this._hass)o.setHass(this._hass);else if("homeassistant"===o.id)return void this.logger.debug("Home Assistant instance not available yet for HA weather provider, skipping fetch");const n=this.buildProviderConfig(o);this._weatherData=await o.fetchWeatherAsync(n),this._weatherData&&et.getInstance().publish(new it(null!==(t=null===(e=this._weatherData.current)||void 0===e?void 0:e.conditionUnified)&&void 0!==t?t:Ee.All));const a=n.entityId;a&&this._hass&&(this._lastEntityState=this._hass.states[a]),await this.setupForecastSubscriptionAsync(o,n),this.logger.info(`Fetched weather data from ${o.name}:`,this._weatherData)}catch(e){this._weatherError=!0,this._weatherErrorMessage=e instanceof Error?e.message:String(e),this.logger.error("Error fetching weather data:",e)}finally{this._weatherLoading=!1,this.host.requestUpdate()}}}get weatherData(){return this._weatherData}get isLoading(){return this._weatherLoading}get hasError(){return this._weatherError}get errorMessage(){return this._weatherErrorMessage}}var Nr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Fr=class extends he{constructor(){super(),this.orientation="vertical",this.logger=Se("weather-component"),this.weatherController=new Tr(this,{showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval,weatherIconSet:this.weatherIconSet})}get controller(){return this.weatherController}updated(e){if(super.updated(e),e.has("hass")||e.has("showWeather")||e.has("weatherProvider")||e.has("weatherConfig")||e.has("weatherDisplayMode")||e.has("weatherForecastDays")||e.has("weatherTitle")||e.has("weatherUpdateInterval")||e.has("weatherIconSet")){this.logger.debug("Weather properties or hass changed, updating WeatherController");const e={showWeather:this.showWeather,weatherProvider:this.weatherProvider,weatherConfig:this.weatherConfig,weatherDisplayMode:this.weatherDisplayMode,weatherForecastDays:this.weatherForecastDays,weatherTitle:this.weatherTitle,weatherUpdateInterval:this.weatherUpdateInterval,weatherIconSet:this.weatherIconSet};this.weatherController.updateConfigAsync(e,this.hass)}if(e.has("size")||e.has("labelSize")||e.has("valueSize")){if(this.logger.debug("Size properties changed"),e.has("size")){const t=e.get("size");this.logger.debug(`Size changed: ${t} -> ${this.size}`)}if(e.has("labelSize")){const t=e.get("labelSize");this.logger.debug(`LabelSize changed: ${t} -> ${this.labelSize}`)}if(e.has("valueSize")){const t=e.get("valueSize");this.logger.debug(`ValueSize changed: ${t} -> ${this.valueSize}`)}this.requestUpdate()}}conditionDisplayText(e,t){return t||this.translateWeatherCondition(e)}translateWeatherCondition(e){const t=this.language||"en",i=Ze(`conditions.${e.toLowerCase().replace(/ /g,"_")}`,t,"");return i&&""!==i?i:e}formatForecastDate(e){return Xe(e,this.language||"en",{weekday:"short"})}get weatherData(){const e=this.weatherController.weatherData;return e&&e.current&&e.current.conditionUnified&&et.getInstance().publish(new it(e.current.conditionUnified)),e}getLabelSize(){return ut(this.size,this.labelSize,"labelSize")}getValueSize(){return ut(this.size,this.valueSize,"valueSize")}getForecastTempWidth(){return ut(this.size,void 0,"forecastTempWidth")}_handleWeatherClick(e){e&&this.hass&&$t(this,"hass-more-info",{entityId:e})}render(){const e=this.weatherController.weatherData;if(this.weatherController.hasError)return V`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;if(this.weatherController.isLoading||!e)return V`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">${qe("runtime.loading_weather",this.language,"Loading weather data…")}</div>
                </div>`;const t=this.weatherDisplayMode||"both",i=this.weatherForecastDays||3,o=this.weatherTitle||qe("common.title",this.language,"Weather"),n="horizontal"===this.orientation,a=qe("forecast.title",this.language,"Forecast"),r="current"===t||"both"===t,s=Math.min(i,e.daily.length),l=this.getLabelSize(),c=this.getValueSize(),d=this.getForecastTempWidth();return V`
            <div class="weather-container ${this.orientation} ${e.entityId?"clickable":""}"
                 style="color: ${this.fontColor};"
                 @click="${()=>this._handleWeatherClick(e.entityId)}">
                ${n&&r?"":V`
                    <div class="weather-title" style="color: ${this.fontColor}; font-size: ${l};">
                        ${n?a:o}
                    </div>
                `}

                ${r?V`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${e.current.icon}"
                                     alt="${this.conditionDisplayText(e.current.condition,e.current.conditionText)}">
                                <div class="weather-temp"
                                     style="font-size: ${n?`min(${c}, clamp(1.8rem, 10cqw, 3rem))`:c};">${Math.round(e.current.temperature)}${e.temperatureUnit||"°"}</div>
                                ${n?V`
                                    <div class="weather-current-copy">
                                        <div class="weather-title"
                                             style="color: ${this.fontColor}; font-size: clamp(0.9rem, 3.5cqw, 1.15rem);">
                                            ${a}
                                        </div>
                                        <div class="weather-condition"
                                             style="font-size: clamp(0.75rem, 3cqw, 1rem);">
                                            ${this.conditionDisplayText(e.current.condition,e.current.conditionText)}
                                        </div>
                                    </div>
                                `:""}
                            </div>
                            ${n?"":V`
                                <div class="weather-condition" style="font-size: ${l};">
                                    ${this.conditionDisplayText(e.current.condition,e.current.conditionText)}
                                </div>
                            `}
                        </div>
                    `:""}

                ${"forecast"===t||"both"===t?V`
                        <div class="weather-forecast">
                            ${e.daily.slice(0,s).map(e=>V`
                                <div class="forecast-day">
                                    <div class="forecast-date"
                                         style="font-size: ${n?`min(${l}, clamp(0.82rem, 4cqw, 1.4rem))`:l};">${this.formatForecastDate(e.date)}</div>
                                    <img class="forecast-icon" src="${e.icon}" alt="${this.conditionDisplayText(e.condition,e.conditionText)}">
                                    <div class="forecast-temp"
                                         style="font-size: ${n?`min(${l}, clamp(0.82rem, 4cqw, 1.4rem))`:l}; width: ${d};">
                                        <span>${Math.round(e.temperatureMin)}°</span>
                                        <span class="forecast-separator"> - </span>
                                        <span>${Math.round(e.temperatureMax)}°</span>
                                    </div>
                                </div>
                            `)}
                        </div>
                    `:""}
            </div>
        `}};Fr.styles=a`
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

        .weather-container.horizontal .weather-temp-container {
            justify-content: flex-start;
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

        .weather-error {
            color: #f44336;
            font-size: 1rem;
        }
    `,Nr([ve({type:Object})],Fr.prototype,"hass",void 0),Nr([ve({type:Boolean})],Fr.prototype,"showWeather",void 0),Nr([ve({type:String})],Fr.prototype,"weatherProvider",void 0),Nr([ve({type:Object})],Fr.prototype,"weatherConfig",void 0),Nr([ve({type:String})],Fr.prototype,"weatherDisplayMode",void 0),Nr([ve({type:Number})],Fr.prototype,"weatherForecastDays",void 0),Nr([ve({type:String})],Fr.prototype,"weatherTitle",void 0),Nr([ve({type:Number})],Fr.prototype,"weatherUpdateInterval",void 0),Nr([ve({type:String})],Fr.prototype,"weatherIconSet",void 0),Nr([ve({type:String})],Fr.prototype,"fontColor",void 0),Nr([ve({type:String})],Fr.prototype,"language",void 0),Nr([ve({type:String})],Fr.prototype,"size",void 0),Nr([ve({type:String})],Fr.prototype,"labelSize",void 0),Nr([ve({type:String})],Fr.prototype,"valueSize",void 0),Nr([ve({type:String})],Fr.prototype,"orientation",void 0),Fr=Nr([pe("ha-weather")],Fr);let Rr=class extends xr{constructor(){super(...arguments),this.weather=document.createElement("ha-weather")}applyWidgetState(){var e,t,i,o,n;const a=Ha(this.config.orientation,this.zoneId),r=!(!this.config.labelSize&&!this.config.valueSize);this.weather.showWeather=!1!==this.config.enabled,this.weather.weatherProvider=this.config.provider,this.weather.weatherConfig=this.config.providerConfig,this.weather.weatherDisplayMode=this.config.displayMode,this.weather.weatherForecastDays=this.config.forecastDays,this.weather.weatherTitle=this.config.title,this.weather.weatherUpdateInterval=this.config.updateInterval,this.weather.weatherIconSet=null!==(e=this.config.iconSet)&&void 0!==e?e:null===(t=this.config.providerConfig)||void 0===t?void 0:t.iconSet,this.weather.fontColor=this.fontColor,this.weather.language=br(null===(i=this.appearance)||void 0===i?void 0:i.language,this.hass),this.weather.size=r?dt.Custom:null!==(n=null===(o=this.appearance)||void 0===o?void 0:o.size)&&void 0!==n?n:dt.Medium,this.weather.labelSize=this.config.labelSize,this.weather.valueSize=this.config.valueSize,this.weather.orientation=a,this.setAttribute("data-orientation",a),this.hass&&(this.weather.hass=this.hass)}render(){return V`${this.weather}`}};Rr.styles=a`
        :host {
            display: block;
            max-height: 100%;
            min-width: 0;
        }

        :host([data-orientation='horizontal']) {
            width: 100%;
            max-width: 100%;
        }
    `,Rr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("wcc-weather-widget")],Rr);class Mr extends Qe{constructor(e,t={}){super(e,"transportation-controller"),this.onShowTransportation=()=>{this.handleTransportationClick()},this._transportationData={departures:[],loading:!1},this._transportationDataLoaded=!1,this._isActive=!1,this.config={},this.config=t}onHostConnected(){et.getInstance().subscribe(at,this.onShowTransportation)}onHostDisconnected(){this.clearTimers(),this._transportationDataLoaded=!1,this.lastHassStateKey=void 0,et.getInstance().unsubscribe(at,this.onShowTransportation)}updateConfig(e){this.logger.debug("Updating TransportationController config:",e),this.config={...this.config,...e},this.clearTimers(),this._transportationDataLoaded=!1,this.lastHassStateKey=void 0,this.host.requestUpdate()}updateHass(e){var t;this.hass=e;const i=this.config.transportation;if(!i)return;const o=Yn(i.provider||"idsjmk");if(!o)return;if(null===(t=o.setHass)||void 0===t||t.call(o,e),!o.usesHassStateUpdates||!o.getHassStateKey)return;const n=o.getHassStateKey(i.providerConfig||{}),a=void 0!==this.lastHassStateKey&&n!==this.lastHassStateKey;this.lastHassStateKey=n,a&&this._isActive&&this._transportationDataLoaded&&this.fetchTransportationDataAsync()}setupUpdateInterval(){if(!this.config.transportation||!1===this.config.transportation.enabled)return;const e=Yn(this.config.transportation.provider||"idsjmk");if(null==e?void 0:e.usesHassStateUpdates)return void this.logger.debug(`Skipping card polling interval for ${e.name}; HA state updates are used`);let t=this.config.transportation.updateInterval||60;t=Math.max(t,60);const i=1100*t;this.logger.debug(`Setting transportation update interval to ${t} seconds`),this.intervalId=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(e){this.logger.error("Error in transportation update interval:",e)}})()},i)}clearTimers(){this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0),this.autoHideTimerId&&(window.clearTimeout(this.autoHideTimerId),this.autoHideTimerId=void 0),this.setInactive()}async fetchTransportationDataAsync(){var e;if(this.config.transportation&&!1!==this.config.transportation.enabled){this._transportationData={...this._transportationData,loading:!0,error:void 0},this.host.requestUpdate();try{const t=this.config.transportation;t.provider||(t.provider="idsjmk");const i=Yn(t.provider);if(!i)throw new Error(`Transportation provider '${t.provider}' not found`);this.hass&&(null===(e=i.setHass)||void 0===e||e.call(i,this.hass));const o=(t.stops||[]).map(e=>({stopId:e.stopId,postId:e.postId,name:e.name})),n={...t.providerConfig||{}};void 0!==t.maxDepartures&&(n.maxDepartures=t.maxDepartures),this._transportationData=await i.fetchTransportationAsync(n,o),i.usesHassStateUpdates&&i.getHassStateKey&&(this.lastHassStateKey=i.getHassStateKey(n)),this._lastTransportationUpdate=new Date,this.logger.info(`Fetched transportation data from ${i.name}:`,this._transportationData)}catch(e){this.logger.warn("Error fetching transportation data:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}this.host.requestUpdate()}}async handleTransportationClick(){var e,t,i;this.logger.debug("Transportation button clicked, loading data on demand"),this.setActive();try{const i=this.config.transportation;if(!i)throw new Error("Transportation is not configured");const o=Yn(i.provider||"idsjmk");if(!o)throw new Error(`Transportation provider '${i.provider}' not found`);this.hass&&(null===(e=o.setHass)||void 0===e||e.call(o,this.hass)),await(null===(t=o.activateAsync)||void 0===t?void 0:t.call(o,i.providerConfig||{})),await this.fetchTransportationDataAsync()}catch(e){this.logger.warn("Error activating transportation provider:",e),this._transportationData={departures:[],error:e instanceof Error?e.message:String(e),loading:!1}}if(this._transportationDataLoaded=!0,this.setupUpdateInterval(),null===(i=this.config.transportation)||void 0===i?void 0:i.autoHideTimeout){this.autoHideTimerId&&clearTimeout(this.autoHideTimerId);let e=this.config.transportation.autoHideTimeout||5;e=Math.max(1,Math.min(10,e));let t=60*e*1e3;this._transportationData.error&&(t=1e4),this.logger.info(`Setting transportation auto-hide timeout to ${e} minutes`),this.autoHideTimerId=window.setTimeout(()=>{this.logger.info(`Auto-hiding transportation departures after ${e} minutes`),this.dismissTransportation()},t)}this.host.requestUpdate()}dismissTransportation(){this.clearTimers(),this._transportationDataLoaded=!1,this.host.requestUpdate()}get transportationData(){return this._transportationData}get transportationDataLoaded(){return this._transportationDataLoaded}get isActive(){return this._isActive}get lastTransportationUpdate(){return this._lastTransportationUpdate}get isTransportationEnabled(){return void 0!==this.config.transportation&&!1!==this.config.transportation.enabled}setInactive(){this._isActive&&(this.logger.info("Transportation set to inactive, clearing timers and sending message to bottom bar to hide departures"),this._isActive=!1,st.getInstance().setActive("transportation",!1),et.getInstance().publish(new nt))}setActive(){this._isActive||(this.logger.info("Transportation set to active, sending message to bottom bar to show departures"),this._isActive=!0,st.getInstance().setActive("transportation",!0),et.getInstance().publish(new nt))}}function jr(e){var t;const i=new Map;for(const o of e){const e=String(null!==(t=o.groupId)&&void 0!==t?t:`${o.stopName}-${o.postId}`),n=i.get(e);n?n.departures.push(o):i.set(e,{id:e,stopName:o.stopName,departures:[o]})}return[...i.values()]}var Lr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Hr=class extends he{constructor(){super(...arguments),this.open=!1,this.data={departures:[],loading:!1}}updated(e){var t;super.updated(e),e.has("open")&&(this.open&&this.dialog&&!this.dialog.open?this.dialog.showModal():!this.open&&(null===(t=this.dialog)||void 0===t?void 0:t.open)&&this.dialog.close())}isSoon(e){const t=String(e.timeMark).match(/-?\d+/);if(!t)return!1;const i=Number(t[0]);return i>=0&&i<=5}requestClose(){var e;null===(e=this.dialog)||void 0===e||e.close()}handleCancel(e){e.preventDefault(),this.requestClose()}handleBackdropClick(e){e.target===this.dialog&&this.requestClose()}handleClosed(){this.dispatchEvent(new CustomEvent("wcc-transportation-dialog-close",{bubbles:!0,composed:!0}))}renderBody(){return this.data.loading?V`
                <div class="status">
                    ${qe("runtime.loading_transportation",this.language||this.hass,"Loading transportation data…")}
                </div>
            `:this.data.error?V`<div class="status error">${this.data.error}</div>`:this.data.departures.length?V`
            <div class="stop-grid">
                ${jr(this.data.departures).map(e=>V`
                    <section class="stop-card">
                        <h3 class="stop-name">${e.stopName}</h3>
                        <div class="departure-list">
                            ${e.departures.map(e=>V`
                                <div class="departure-row ${this.isSoon(e)?"soon":""}">
                                    <div class="line">${e.lineName}</div>
                                    <div class="destination" title=${e.finalStop}>
                                        ${e.finalStop}
                                    </div>
                                    <div class="time">${e.timeMark}</div>
                                    ${e.isLowFloor?V`
                                        <div
                                                class="accessible"
                                                title=${qe("runtime.wheelchair_accessible",this.language||this.hass,"Wheelchair accessible")}>
                                            <ha-icon icon="mdi:wheelchair-accessibility"></ha-icon>
                                        </div>
                                    `:V`<span></span>`}
                                </div>
                            `)}
                        </div>
                    </section>
                `)}
            </div>
        `:V`
                <div class="status">
                    ${qe("runtime.no_departures",this.language||this.hass,"No departures available.")}
                </div>
            `}render(){const e=qe("runtime.transportation_title",this.language||this.hass,"Transit departures");return V`
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
                            aria-label=${qe("ui.close",this.language||this.hass,"Close")}
                            @click=${this.requestClose}>
                        <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                </header>
                <div class="body">${this.renderBody()}</div>
            </dialog>
        `}};Hr.styles=a`
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
    `,Lr([ve({type:Boolean})],Hr.prototype,"open",void 0),Lr([ve({type:Object})],Hr.prototype,"data",void 0),Lr([ve({type:String})],Hr.prototype,"language",void 0),Lr([ve({type:Object})],Hr.prototype,"hass",void 0),Lr([be("dialog")],Hr.prototype,"dialog",void 0),Hr=Lr([pe("wcc-transportation-dialog")],Hr);var Wr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Br=class extends Jo{get priority(){return 10}get isActive(){return this.controller.isActive}constructor(){super(),this.logger=Se("transportation-component"),this.closeTransportation=()=>{this.transportationController.dismissTransportation()},this.transportationController=new Mr(this,{transportation:this.transportation})}get controller(){return this.transportationController}updated(e){super.updated(e),e.has("transportation")&&(this.logger.debug("Transportation properties changed, updating TransportationController"),this.transportationController.updateConfig({transportation:this.transportation})),e.has("hass")&&this.hass&&this.transportationController.updateHass(this.hass)}render(){var e;if(!this.transportation||!1===this.transportation.enabled)return V``;const t=this.transportationController.transportationData,i=this.transportationController.transportationDataLoaded,o=null!==(e=this.transportation.displayMode)&&void 0!==e?e:"inline";return this.controller.isActive?"modal"===o?V`
                <wcc-transportation-dialog
                        .open=${!0}
                        .data=${i?t:{...t,loading:!0}}
                        .language=${this.language}
                        .hass=${this.hass}
                        @wcc-transportation-dialog-close=${this.closeTransportation}>
                </wcc-transportation-dialog>
            `:V`
            ${i?V`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    ${this.renderTransportationContent(t)}
                                </div>`:V`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    <div class="transportation-loading">${qe("runtime.loading_transportation",this.language||this.hass,"Loading transportation data…")}</div>
                                </div>`}
        `:V``}renderTransportationContent(e){return e.loading?V`
                <div class="transportation-loading">${qe("runtime.loading_transportation",this.language||this.hass,"Loading transportation data…")}</div>`:e.error?V`
                <div class="transportation-error">${e.error}</div>`:e.departures&&0!==e.departures.length?V`
            <div class="transportation-departures">
                ${jr(e.departures).map(e=>V`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.fontColor};">
                                ${e.stopName}
                            </h3>
                            <div class="stop-departures">
                                ${e.departures.map(e=>V`
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
                    `)}
            </div>
        `:V`
                <div class="transportation-loading">${qe("runtime.no_departures",this.language||this.hass,"No departures available.")}</div>`}};Br.styles=a`
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
    `,Wr([ve({type:Object})],Br.prototype,"transportation",void 0),Wr([ve({type:String})],Br.prototype,"fontColor",void 0),Wr([ve({type:String})],Br.prototype,"language",void 0),Wr([ve({type:Object})],Br.prototype,"hass",void 0),Br=Wr([pe("ha-transportation")],Br);let Ur=class extends xr{constructor(){super(...arguments),this.transportation=document.createElement("ha-transportation")}get isActive(){return this.transportation.isActive}activate(){this.transportation.activate()}deactivate(){this.transportation.deactivate()}applyWidgetState(){var e;this.appliedConfig!==this.config&&(this.transportation.transportation=function(e){const{type:t,id:i,priority:o,style:n,visibility:a,...r}=e;return r}(this.config),this.appliedConfig=this.config),this.transportation.fontColor!==this.fontColor&&(this.transportation.fontColor=this.fontColor);const t=br(null===(e=this.appearance)||void 0===e?void 0:e.language,this.hass);this.transportation.language!==t&&(this.transportation.language=t),this.hass&&this.transportation.hass!==this.hass&&(this.transportation.hass=this.hass)}render(){return V`${this.transportation}`}};Ur.styles=a`
        :host {
            display: block;
            width: 100%;
        }
    `,Ur=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("wcc-transportation-widget")],Ur);let Vr=class extends xr{constructor(){super(...arguments),this.actionBar=document.createElement("ha-action-bar")}get isActive(){return this.actionBar.isActive}activate(){this.actionBar.activate()}deactivate(){this.actionBar.deactivate()}applyWidgetState(){var e,t,i,o;this.appliedConfig===this.config&&this.appliedZoneId===this.zoneId&&this.appliedZoneAlignment===this.zoneAlignment||(this.actionBar.config={enabled:null===(e=this.config.enabled)||void 0===e||e,actions:null!==(t=this.config.actions)&&void 0!==t?t:[],alignment:Wa(this.config.alignment,this.zoneId,this.zoneAlignment),orientation:Ha(this.config.orientation,this.zoneId),backgroundOpacity:this.config.backgroundOpacity,showButtonBackground:this.config.showButtonBackground,buttonGap:this.config.buttonGap,padding:this.config.padding},this.actionBar.iconSize=this.config.iconSize,this.appliedConfig=this.config,this.appliedZoneId=this.zoneId,this.appliedZoneAlignment=this.zoneAlignment),this.actionBar.fontColor!==this.fontColor&&(this.actionBar.fontColor=this.fontColor);const n=this.config.iconSize?dt.Custom:null!==(o=null===(i=this.appearance)||void 0===i?void 0:i.size)&&void 0!==o?o:dt.Medium;this.actionBar.size!==n&&(this.actionBar.size=n),this.hass&&this.actionBar.hass!==this.hass&&(this.actionBar.hass=this.hass)}render(){return V`${this.actionBar}`}};function Zr(e,t,i,o){return void 0!==e&&Number.isFinite(e)?Math.min(o,Math.max(i,Math.trunc(e))):t}function Kr(e,t){try{const i=new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(e),o=e=>{var t,o;return null!==(o=null===(t=i.find(t=>t.type===e))||void 0===t?void 0:t.value)&&void 0!==o?o:""};return`${o("year")}-${o("month")}-${o("day")}`}catch(t){return e.toISOString().slice(0,10)}}function qr(e,t){const[i,o,n]=e.split("-").map(Number);return new Date(Date.UTC(i,o-1,n+t)).toISOString().slice(0,10)}function Jr(e){var t;const i=null!==(t=e.dateTime)&&void 0!==t?t:e.date?`${e.date}T00:00:00Z`:void 0;if(!i)return;const o=new Date(i);return Number.isNaN(o.getTime())?void 0:o}function Gr(e,t){if(e.allDay!==t.allDay)return e.allDay?-1:1;const i=e.start.getTime()-t.start.getTime();return 0!==i?i:e.summary.localeCompare(t.summary)}Vr.styles=a`
        :host {
            display: block;
            width: 100%;
        }
    `,Vr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("wcc-action-bar-widget")],Vr);class Yr extends Qe{constructor(e){super(e,"calendar-controller"),this.config={},this.connected=!1,this.configSignature="",this.requestSequence=0,this._events=[],this._loading=!1}get events(){return this._events}get loading(){return this._loading}get error(){return this._error}onHostConnected(){this.connected=!0,this.setupInterval(),this.fetchEvents()}onHostDisconnected(){this.connected=!1,this.requestSequence+=1,this.clearInterval()}updateConfig(e,t){var i,o,n;const a=!this.hass&&Boolean(t);this.hass=t,this.config=e;const r=JSON.stringify({entities:null!==(i=e.entities)&&void 0!==i?i:[],daysAhead:null!==(o=e.daysAhead)&&void 0!==o?o:7,updateInterval:null!==(n=e.updateInterval)&&void 0!==n?n:300,timeZone:e.timeZone});(r!==this.configSignature||a)&&(r!==this.configSignature&&(this.configSignature=r,this.setupInterval()),this.connected&&this.fetchEvents())}async refresh(){await this.fetchEvents()}setupInterval(){if(this.clearInterval(),!this.connected)return;const e=Math.max(60,Number(this.config.updateInterval)||300);this.intervalId=window.setInterval(()=>{this.fetchEvents()},1e3*e)}clearInterval(){void 0!==this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}async fetchEvents(){var e,t;const i=this.hass,o=(null!==(e=this.config.entities)&&void 0!==e?e:[]).filter(e=>Boolean(e.entity)).map(e=>{var t,o,n;return{...e,label:(null===(t=e.label)||void 0===t?void 0:t.trim())||String(null!==(n=null===(o=null==i?void 0:i.states[e.entity])||void 0===o?void 0:o.attributes.friendly_name)&&void 0!==n?n:e.entity)}});if(!i||0===o.length)return this._events=[],this._loading=!1,this._error=void 0,this.host.requestUpdate(),void et.getInstance().publish(new nt);const n=++this.requestSequence;this._loading=!0,this._error=void 0,this.host.requestUpdate(),et.getInstance().publish(new nt);const a=function(e,t){const i=Zr(t,7,1,31);return{start:new Date(e.getTime()-864e5).toISOString(),end:new Date(e.getTime()+24*(i+1)*60*60*1e3).toISOString()}}(new Date,null!==(t=this.config.daysAhead)&&void 0!==t?t:7),r=`start=${encodeURIComponent(a.start)}&end=${encodeURIComponent(a.end)}`,s=await Promise.all(o.map(async e=>{try{return{source:e,events:await i.callApi("GET",`calendars/${encodeURIComponent(e.entity)}?${r}`)}}catch(t){return{source:e,error:t}}}));if(n!==this.requestSequence||!this.connected)return;const l=s.filter(e=>void 0!==e.events);l.length>0&&(this._events=l.flatMap(e=>{var t;return(null!==(t=e.events)&&void 0!==t?t:[]).map(t=>function(e,t,i){var o,n,a,r;const s=Jr(e.start),l=Jr(e.end);if(!s||!l)return;const c=Boolean(e.start.date&&!e.start.dateTime),d=c&&e.start.date?e.start.date:Kr(s,i),h=c&&e.end.date?e.end.date:Kr(l,i);return{entity:t.entity,sourceLabel:(null===(o=t.label)||void 0===o?void 0:o.trim())||t.entity,color:t.color||"#4fc3f7",summary:(null===(n=e.summary)||void 0===n?void 0:n.trim())||"Untitled event",description:(null===(a=e.description)||void 0===a?void 0:a.trim())||void 0,location:(null===(r=e.location)||void 0===r?void 0:r.trim())||void 0,start:s,end:l,allDay:c,startDayKey:d,endDayKey:h}}(t,e.source,this.config.timeZone)).filter(e=>void 0!==e)}));const c=s.filter(e=>void 0!==e.error);this._error=c.length>0?`${c.length} of ${s.length} calendars could not be loaded.`:void 0,this._loading=!1,this.host.requestUpdate(),et.getInstance().publish(new nt)}}var Xr=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let Qr=class extends he{constructor(){super(...arguments),this.open=!1,this.language="en",this.hour12=!1}updated(e){var t;super.updated(e),(e.has("open")||e.has("event"))&&(this.open&&this.event&&this.dialog&&!this.dialog.open?this.dialog.showModal():this.open&&this.event||!(null===(t=this.dialog)||void 0===t?void 0:t.open)||this.dialog.close())}formatDate(e){return new Intl.DateTimeFormat(this.language,{weekday:"long",year:"numeric",month:"long",day:"numeric",timeZone:this.timeZone}).format(e)}formatTime(e){return new Intl.DateTimeFormat(this.language,{hour:"numeric",minute:"2-digit",hour12:this.hour12,timeZone:this.timeZone}).format(e)}formatDayKey(e){const[t,i,o]=e.split("-").map(Number);return new Intl.DateTimeFormat(this.language,{weekday:"long",year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(t,i-1,o,12)))}dateTimeText(e){if(e.allDay){const t=this.formatDayKey(e.startDayKey),i=this.formatDayKey(qr(e.endDayKey,-1)),o=qe("editor.calendar.all_day",this.language,"All day");return t===i?`${t} · ${o}`:`${t} – ${i} · ${o}`}const t=this.formatDate(e.start),i=this.formatDate(e.end);return t===i?`${t} · ${this.formatTime(e.start)} – ${this.formatTime(e.end)}`:`${t}, ${this.formatTime(e.start)} – ${i}, ${this.formatTime(e.end)}`}requestClose(){var e;null===(e=this.dialog)||void 0===e||e.close()}handleCancel(e){e.preventDefault(),this.requestClose()}handleBackdropClick(e){e.target===this.dialog&&this.requestClose()}handleClosed(){this.dispatchEvent(new CustomEvent("wcc-calendar-dialog-close",{bubbles:!0,composed:!0}))}render(){var e,t;const i=this.event;return V`
            <dialog
                    style=${`--event-color:${null!==(e=null==i?void 0:i.color)&&void 0!==e?e:"#4fc3f7"}`}
                    aria-label=${null!==(t=null==i?void 0:i.summary)&&void 0!==t?t:qe("editor.calendar.event",this.language,"Calendar event")}
                    @cancel=${this.handleCancel}
                    @close=${this.handleClosed}
                    @click=${this.handleBackdropClick}>
                ${i?V`
                    <div class="header">
                        <span class="accent"></span>
                        <h2 class="title">${i.summary}</h2>
                        <button class="close" type="button" aria-label=${qe("ui.close",this.language,"Close")} @click=${this.requestClose}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    <div class="body">
                        <div class="detail">
                            <ha-icon icon="mdi:clock-outline"></ha-icon>
                            <div class="detail-content">
                                <div class="label">${qe("editor.calendar.when",this.language,"When")}</div>
                                ${this.dateTimeText(i)}
                            </div>
                        </div>
                        <div class="detail">
                            <ha-icon icon="mdi:calendar-outline"></ha-icon>
                            <div class="detail-content">
                                <div class="label">${qe("editor.calendar.calendar_name",this.language,"Calendar")}</div>
                                ${i.sourceLabel}
                            </div>
                        </div>
                        ${i.location?V`
                            <div class="detail">
                                <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                                <div class="detail-content">
                                    <div class="label">${qe("editor.calendar.location",this.language,"Location")}</div>
                                    ${i.location}
                                </div>
                            </div>
                        `:""}
                        ${i.description?V`
                            <div class="description detail-content">
                                <div class="label">${qe("editor.calendar.description",this.language,"Description")}</div>
                                ${i.description}
                            </div>
                        `:""}
                    </div>
                `:""}
            </dialog>
        `}};Qr.styles=a`
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
    `,Xr([ve({type:Object})],Qr.prototype,"event",void 0),Xr([ve({type:Boolean})],Qr.prototype,"open",void 0),Xr([ve({type:String})],Qr.prototype,"language",void 0),Xr([ve({type:String})],Qr.prototype,"timeZone",void 0),Xr([ve({type:Boolean})],Qr.prototype,"hour12",void 0),Xr([be("dialog")],Qr.prototype,"dialog",void 0),Qr=Xr([pe("wcc-calendar-event-dialog")],Qr);var es=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let ts=class extends he{constructor(){super(...arguments),this.config={},this.fontColor="#fff",this.language="en",this.hour12=!1,this.controller=new Yr(this)}get isActive(){return!this.config.hideWhenEmpty||this.controller.loading||this.agenda.visibleCount>0}get agenda(){return function(e,t={}){var i;const o=null!==(i=t.now)&&void 0!==i?i:new Date,n=Kr(o,t.timeZone),a="today"===t.displayMode?1:Zr(t.daysAhead,7,1,31),r=qr(n,a-1),s=Zr(t.maxEvents,8,1,100),l=!1!==t.showAllDay,c=!1!==t.hidePastTodayEvents,d=e=>e.startDayKey<n?n:e.startDayKey,h=e.filter(e=>l||!e.allDay).filter(e=>{const t=d(e);return!(t<n||t>r||c&&t===n&&!e.allDay&&e.end.getTime()<=o.getTime()||e.allDay&&e.endDayKey<=n)}).sort((e,t)=>{const i=d(e).localeCompare(d(t));return 0!==i?i:Gr(e,t)}),u=h.slice(0,s),p=new Map;return u.forEach(e=>{var t;const i=d(e),o=null!==(t=p.get(i))&&void 0!==t?t:[];o.push(e),p.set(i,o)}),{groups:Array.from(p.entries()).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>({dayKey:e,events:t.sort(Gr)})),visibleCount:u.length,hiddenCount:Math.max(0,h.length-u.length)}}(this.controller.events,{timeZone:this.timeZone,daysAhead:this.config.daysAhead,maxEvents:this.config.maxEvents,displayMode:this.config.displayMode,showAllDay:this.config.showAllDay,hidePastTodayEvents:this.config.hidePastTodayEvents})}updated(e){var t;if(super.updated(e),(e.has("config")||e.has("hass")||e.has("timeZone"))&&this.controller.updateConfig({...this.config,timeZone:this.timeZone},this.hass),e.has("fontColor")&&this.style.setProperty("--wcc-calendar-color",this.fontColor),e.has("config")){const e=null===(t=this.config.eventBackgroundColor)||void 0===t?void 0:t.trim();e&&/^#[0-9a-fA-F]{6}$/.test(e)?this.style.setProperty("--wcc-calendar-event-background",e):this.style.removeProperty("--wcc-calendar-event-background");const i=Number(this.config.eventBackgroundOpacity),o=Number.isFinite(i)?Math.min(1,Math.max(0,i)):.76;this.style.setProperty("--wcc-calendar-event-opacity",`${Math.round(100*o)}%`),[["--wcc-calendar-date-size",this.config.calendarDateSize],["--wcc-calendar-title-size",this.config.eventTitleSize],["--wcc-calendar-detail-size",this.config.eventDetailSize]].forEach(([e,t])=>{(null==t?void 0:t.trim())?this.style.setProperty(e,t.trim()):this.style.removeProperty(e)})}}dayLabel(e){const t=Kr(new Date,this.timeZone),i=e===t?0:e===qr(t,1)?1:void 0;if(void 0!==i)try{const e=new Intl.RelativeTimeFormat(this.language,{numeric:"auto"}).format(i,"day");return e.charAt(0).toUpperCase()+e.slice(1)}catch(e){return 0===i?qe("forecast.today",this.language,"Today"):qe("forecast.tomorrow",this.language,"Tomorrow")}const[o,n,a]=e.split("-").map(Number);return new Intl.DateTimeFormat(this.language,{weekday:"long",month:"long",day:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(o,n-1,a,12)))}dayParts(e){const[t,i,o]=e.split("-").map(Number),n=new Date(Date.UTC(t,i-1,o,12)),a=e=>new Intl.DateTimeFormat(this.language,{...e,timeZone:"UTC"}).format(n).replace(".","");return{weekday:a({weekday:"short"}),day:String(o).padStart(2,"0"),month:a({month:"short"})}}eventTime(e){if(e.allDay){const t=qe("editor.calendar.all_day",this.language,"All day"),i=qr(e.endDayKey,-1);if(i===e.startDayKey)return t;const o=e.startDayKey.slice(0,4)!==i.slice(0,4);return`${this.formatShortDayKey(e.startDayKey,o)} – ${this.formatShortDayKey(i,o)} · ${t}`}const t=new Intl.DateTimeFormat(this.language,{hour:"numeric",minute:"2-digit",hour12:this.hour12,timeZone:this.timeZone});if(e.startDayKey===e.endDayKey)return`${t.format(e.start)} – ${t.format(e.end)}`;const i=e.startDayKey.slice(0,4)!==e.endDayKey.slice(0,4),o=new Intl.DateTimeFormat(this.language,{day:"numeric",month:"numeric",year:i?"numeric":void 0,timeZone:this.timeZone});return`${o.format(e.start)} ${t.format(e.start)} – ${o.format(e.end)} ${t.format(e.end)}`}formatShortDayKey(e,t){const[i,o,n]=e.split("-").map(Number);return new Intl.DateTimeFormat(this.language,{day:"numeric",month:"numeric",year:t?"numeric":void 0,timeZone:"UTC"}).format(new Date(Date.UTC(i,o-1,n,12)))}eventSpansMultipleDays(e){const t=e.allDay?qr(e.endDayKey,-1):e.endDayKey;return e.startDayKey!==t}openEvent(e){this.selectedEvent=e}renderEvent(e){return V`
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
                    ${!1!==this.config.showLocation&&e.location?V`
                        <span class="event-detail">
                            <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                            <span class="event-detail-text">${e.location}</span>
                        </span>
                    `:""}
                    ${this.config.showDescription&&e.description?V`<span class="event-description">${e.description}</span>`:""}
                </span>
            </button>
        `}render(){const e=this.agenda;return this.controller.loading&&0===this.controller.events.length?V`<div class="status loading">${qe("editor.calendar.loading",this.language,"Loading calendar…")}</div>`:0===e.visibleCount&&this.config.hideWhenEmpty?V``:V`
            <div class="agenda">
                ${e.groups.map(e=>{const t=this.dayParts(e.dayKey);return V`
                    <section class="day-group">
                        <div class="day-date" title=${this.dayLabel(e.dayKey)}>
                            <span class="day-weekday">${t.weekday}</span>
                            <span class="day-number">${t.day}</span>
                            <span class="day-month">${t.month}</span>
                        </div>
                        <div class="events">${e.events.map(e=>this.renderEvent(e))}</div>
                    </section>
                `})}
                ${0===e.visibleCount?V`<div class="status">${qe("editor.calendar.no_events",this.language,"No upcoming events.")}</div>`:""}
                ${this.controller.error?V`<div class="status error">${this.controller.error}</div>`:""}
            </div>
            <wcc-calendar-event-dialog
                    .event=${this.selectedEvent}
                    .open=${void 0!==this.selectedEvent}
                    .language=${this.language}
                    .timeZone=${this.timeZone}
                    .hour12=${this.hour12}
                    @wcc-calendar-dialog-close=${()=>{this.selectedEvent=void 0}}>
            </wcc-calendar-event-dialog>
        `}};ts.styles=a`
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
    `,es([ve({type:Object})],ts.prototype,"hass",void 0),es([ve({type:Object})],ts.prototype,"config",void 0),es([ve({type:String})],ts.prototype,"fontColor",void 0),es([ve({type:String})],ts.prototype,"language",void 0),es([ve({type:String})],ts.prototype,"timeZone",void 0),es([ve({type:Boolean})],ts.prototype,"hour12",void 0),es([fe()],ts.prototype,"selectedEvent",void 0),ts=es([pe("wcc-calendar-agenda")],ts);let is=class extends xr{constructor(){super(...arguments),this.calendar=document.createElement("wcc-calendar-agenda")}get isActive(){return this.calendar.isActive}applyWidgetState(){var e,t,i,o,n;this.calendar.config=this.config,this.calendar.fontColor=this.fontColor,this.calendar.language=br(null===(e=this.appearance)||void 0===e?void 0:e.language,this.hass),this.calendar.timeZone=null!==(i=null===(t=this.appearance)||void 0===t?void 0:t.timeZone)&&void 0!==i?i:null===(n=null===(o=this.hass)||void 0===o?void 0:o.config)||void 0===n?void 0:n.time_zone,this.calendar.hour12=wr(void 0,this.hass),this.hass&&(this.calendar.hass=this.hass)}render(){return V`${this.calendar}`}};is.styles=a`
        :host {
            display: block;
            width: fit-content;
            max-width: 100%;
            min-width: 0;
        }
    `,is=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("wcc-calendar-widget")],is);const os=new Set(["custom:wall-clock-card","wall-clock-card"]);function ns(e,t=new Set){if(!e||"object"!=typeof e)return!1;if(t.has(e))return!1;if(t.add(e),Array.isArray(e))return e.some(e=>ns(e,t));const i=e;return!("string"!=typeof i.type||!os.has(i.type.trim().toLowerCase()))||Object.values(i).some(e=>ns(e,t))}var as=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let rs=class extends xr{constructor(){super(...arguments),this.loading=!1,this.buildRevision=0,this.logger=Se("ha-card-widget")}applyWidgetState(){this.toggleAttribute("transparent",!0===this.config.transparent),this.cardElement&&this.hass&&(this.cardElement.hass=this.hass),this.appliedCardConfig!==this.config.card&&(this.appliedCardConfig=this.config.card,this.rebuildCard())}updated(e){super.updated(e),e.has("hass")&&this.cardElement&&this.hass&&(this.cardElement.hass=this.hass)}text(e,t){return qe(e,this.hass,t)}async rebuildCard(){const e=++this.buildRevision,t=this.config.card;if(this.cardElement=void 0,this.error=void 0,this.loading=!1,!(null==t?void 0:t.type))return void(this.loading=!1);if(ns(t))return this.loading=!1,void(this.error=this.text("editor.ha_card.recursion_error","wall-clock-card cannot be embedded inside itself."));const i=window.loadCardHelpers;if(i){this.loading=!0;try{const o=await i(),n=await Promise.resolve(o.createCardElement(t));if(e!==this.buildRevision)return;n.style.display="block",n.style.width="100%",this.hass&&(n.hass=this.hass),n.addEventListener("ll-rebuild",e=>{e.stopPropagation(),n===this.cardElement&&this.rebuildCard()},{once:!0}),this.cardElement=n}catch(t){if(e!==this.buildRevision)return;const i=t instanceof Error?t.message:String(t);this.logger.error(`Unable to create embedded card: ${i}`),this.error=i}finally{e===this.buildRevision&&(this.loading=!1)}}else this.error=this.text("editor.ha_card.helpers_error","Home Assistant card helpers are unavailable.")}render(){var e;return this.error?V`<div class="status error">${this.error}</div>`:this.loading?V`<div class="status">${this.text("editor.ha_card.loading","Loading Home Assistant card…")}</div>`:(null===(e=this.config.card)||void 0===e?void 0:e.type)?this.cardElement?V`<div class="card">${this.cardElement}</div>`:K:V`<div class="status">${this.text("editor.ha_card.empty","Choose a Home Assistant card in the widget editor.")}</div>`}};rs.styles=a`
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
    `,as([fe()],rs.prototype,"cardElement",void 0),as([fe()],rs.prototype,"loading",void 0),as([fe()],rs.prototype,"error",void 0),rs=as([pe("wcc-ha-card-widget")],rs);let ss=class extends xr{get resolvedOrientation(){return this.config.orientation&&"auto"!==this.config.orientation?this.config.orientation:"row"===this.zoneDirection?"vertical":"horizontal"}applyWidgetState(){this.setAttribute("data-orientation",this.resolvedOrientation)}render(){var e,t,i,o;const n=this.resolvedOrientation,a=Math.min(1,Math.max(0,Number(null!==(e=this.config.opacity)&&void 0!==e?e:.35))),r=(null===(t=this.config.color)||void 0===t?void 0:t.trim())||"#ffffff",s=(null===(i=this.config.thickness)||void 0===i?void 0:i.trim())||"1px",l=(null===(o=this.config.length)||void 0===o?void 0:o.trim())||"100%";return V`
            <div class="separator ${n}"
                 role="separator"
                 aria-orientation=${n}
                 style="
                     --separator-color: ${r};
                     --separator-opacity: ${a};
                     --separator-thickness: ${s};
                     --separator-length: ${l};
                 ">
            </div>
        `}};ss.styles=a`
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
    `,ss=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([pe("wcc-separator-widget")],ss);var ls=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};const cs=["alarm-panel","area","button","calendar","conditional","entities","entity","entity-filter","gauge","glance","grid","history-graph","horizontal-stack","humidifier","iframe","light","logbook","map","markdown","media-control","picture","picture-elements","picture-entity","picture-glance","plant-status","sensor","shopping-list","statistic","statistics-graph","thermostat","tile","todo-list","vertical-stack","weather-forecast"];let ds=class extends Tt{constructor(){super(...arguments),this.choosing=!1,this.jsonValue="",this.editorOpen=!1,this.directEditorLoading=!1,this.directEditorUnavailable=!1,this.lovelace={views:[]},this.directEditorRevision=0,this.onDirectConfigChanged=e=>{e.stopPropagation();const t=e.detail;if((null==t?void 0:t.error)||!(null==t?void 0:t.config))return;const i=t.config;JSON.stringify(i)!==JSON.stringify(this.draftCard)&&(this.directEditorSignature=JSON.stringify(i),this.setDraftCard(i))}}updated(e){var t;if(super.updated(e),e.has("config")){const e=this.widgetConfig.card?JSON.stringify(this.widgetConfig.card,null,2):"";this.jsonValue!==e&&(this.jsonValue=e)}if(this.editorOpen&&(e.has("draftCard")||e.has("editorOpen"))){const e=this.draftCard;(null===(t=null==e?void 0:e.type)||void 0===t?void 0:t.startsWith("custom:"))?this.ensureDirectEditor(e):this.clearDirectEditor()}(e.has("config")||e.has("hass")||e.has("choosing")||e.has("editorOpen")||e.has("draftCard"))&&this.syncNativeElements()}get widgetConfig(){return this.config}get editorDirty(){return JSON.stringify(this.draftCard)!==JSON.stringify(this.widgetConfig.card)}get cardTypeOptions(){var e;return[...cs.map(e=>({value:e,label:this.hass.localize(`ui.panel.lovelace.editor.card.${e}.name`)||this.humanize(e)})),...(null!==(e=window.customCards)&&void 0!==e?e:[]).filter(e=>e.type&&!["wall-clock-card","custom:wall-clock-card"].includes(e.type)).map(e=>({value:e.type.startsWith("custom:")?e.type:`custom:${e.type}`,label:e.name||this.humanize(e.type)}))].filter((e,t,i)=>i.findIndex(t=>t.value===e.value)===t).sort((e,t)=>e.label.localeCompare(t.label,this.hass.language))}humanize(e){return e.replace(/^custom:/,"").replace(/[-_]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}emit(e){$t(this,"config-changed",{config:e})}updateCard(e){ns(e)?this.validationError=this.t("editor.ha_card.recursion_error","wall-clock-card cannot be embedded inside itself."):(this.validationError=void 0,this.choosing=!1,this.emit({...this.widgetConfig,card:{...e}}))}changeType(e){var t;const i=null==e?void 0:e.trim();i&&i!==(null===(t=this.widgetConfig.card)||void 0===t?void 0:t.type)&&this.updateCard(function(e){const t=e.trim();switch(t){case"entities":case"glance":case"history-graph":case"statistics-graph":return{type:t,entities:[]};case"grid":return{type:t,cards:[],columns:2};case"horizontal-stack":case"vertical-stack":return{type:t,cards:[]};case"markdown":return{type:t,content:""};default:return{type:t}}}(i))}updateTransparent(e){const t={...this.widgetConfig};e?t.transparent=!0:delete t.transparent,this.emit(t)}onPickerConfigChanged(e){var t,i;if(e.stopPropagation(),(null===(t=e.detail)||void 0===t?void 0:t.error)||!(null===(i=e.detail)||void 0===i?void 0:i.config))return;const o=e.detail.config;JSON.stringify(o)!==JSON.stringify(this.widgetConfig.card)&&this.updateCard(o)}onDialogConfigChanged(e){var t;e.stopPropagation(),(null===(t=e.detail)||void 0===t?void 0:t.config)&&(e.detail.error?this.validationError=String(e.detail.error):this.setDraftCard(e.detail.config))}setDraftCard(e){ns(e)?this.validationError=this.t("editor.ha_card.recursion_error","wall-clock-card cannot be embedded inside itself."):(this.validationError=void 0,this.draftCard={...e})}openEditor(){this.widgetConfig.card&&(this.validationError=void 0,this.draftCard=JSON.parse(JSON.stringify(this.widgetConfig.card)),this.jsonValue=JSON.stringify(this.draftCard,null,2),this.editorOpen=!0)}closeEditor(){this.editorOpen=!1}dialogClosed(){this.clearDirectEditor(),this.draftCard=void 0,this.validationError=void 0}saveEditor(){this.draftCard&&!this.validationError&&this.editorDirty&&(this.updateCard(this.draftCard),this.editorOpen=!1)}onJsonChanged(e){this.jsonValue=e.target.value;try{const e=JSON.parse(this.jsonValue);if(!e||"object"!=typeof e||"string"!=typeof e.type||!e.type.trim())return void(this.validationError=this.t("editor.ha_card.json_type_error","The card configuration must contain a type."));if(JSON.stringify(e)===JSON.stringify(this.draftCard))return void(this.validationError=void 0);this.setDraftCard(e)}catch(e){this.validationError=this.t("editor.ha_card.json_error","The card configuration is not valid JSON.")}}syncNativeElements(){const e=this.renderRoot.querySelector("hui-card-element-editor");e&&(e.hass=this.hass,e.lovelace=this.lovelace,e.inDialog=!0,e.value=this.draftCard);const t=this.renderRoot.querySelector("hui-card-picker");t&&(t.hass=this.hass,t.lovelace=this.lovelace)}clearDirectEditor(){var e;(this.directEditor||this.directEditorLoading||this.directEditorType)&&(this.directEditorRevision++,null===(e=this.directEditor)||void 0===e||e.removeEventListener("config-changed",this.onDirectConfigChanged),this.directEditor=void 0,this.directEditorLoading=!1,this.directEditorUnavailable=!1,this.directEditorType=void 0,this.directEditorSignature=void 0)}async ensureDirectEditor(e){var t;const i=e.type,o=JSON.stringify(e);if(this.directEditor&&this.directEditorType===i)return void(this.directEditorSignature!==o&&(this.directEditor.setConfig(e),this.directEditorSignature=o));if(this.directEditorLoading&&this.directEditorType===i)return;this.clearDirectEditor();const n=++this.directEditorRevision;this.directEditorType=i,this.directEditorLoading=!0;try{const o=window.loadCardHelpers;if(!o)throw new Error("Home Assistant card helpers are unavailable.");const a=await o(),r=await Promise.resolve(a.createCardElement(e));await customElements.whenDefined(r.localName);const s=customElements.get(r.localName);if(!(null==s?void 0:s.getConfigElement))throw new Error(`No visual editor is available for ${i}.`);const l=await Promise.resolve(s.getConfigElement());if(n!==this.directEditorRevision||!this.editorOpen||(null===(t=this.draftCard)||void 0===t?void 0:t.type)!==i)return;const c=this.draftCard;if(!c)return;l.hass=this.hass,l.lovelace=this.lovelace,l.setConfig(c),l.addEventListener("config-changed",this.onDirectConfigChanged),this.directEditorSignature=JSON.stringify(c),this.directEditor=l,this.directEditorUnavailable=!1}catch(e){if(n!==this.directEditorRevision)return;this.directEditorUnavailable=!0}finally{n===this.directEditorRevision&&(this.directEditorLoading=!1)}}renderEditorDialog(e){var t;const i=this.draftCard;if(!i)return K;const o=!0===(null===(t=i.type)||void 0===t?void 0:t.startsWith("custom:")),n=this.hass.localize("ui.common.cancel")||"Cancel",a=this.hass.localize("ui.common.save")||"Save";return V`
            <ha-dialog
                    .open=${this.editorOpen}
                    @closed=${this.dialogClosed}
                    @keydown=${e=>e.stopPropagation()}>
                <span slot="headerTitle">${this.t("editor.ha_card.dialog_title","Edit Home Assistant card")}</span>

                <div class="dialog-content">
                    ${this.validationError?V`<div class="error">${this.validationError}</div>`:K}

                    ${o&&this.directEditor?V`
                        <div class="native-editor direct-editor">${this.directEditor}</div>
                    `:o&&!this.directEditorUnavailable?V`
                        <p class="hint">${this.t("editor.ha_card.loading","Loading Home Assistant card…")}</p>
                    `:e?V`
                        <hui-card-element-editor
                                class="native-editor"
                                @config-changed=${this.onDialogConfigChanged}>
                        </hui-card-element-editor>
                    `:V`
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
                        ${n}
                    </ha-button>
                    <ha-button slot="primaryAction" ?disabled=${!!this.validationError||!this.editorDirty} @click=${this.saveEditor}>
                        ${a}
                    </ha-button>
                </ha-dialog-footer>
            </ha-dialog>
        `}render(){var e;if(!this.hass||!this.config)return K;const t=this.widgetConfig.card,i=!!customElements.get("hui-card-picker"),o=!!customElements.get("hui-card-element-editor");return V`
            <div class="content">
                <p class="hint">${this.t("editor.ha_card.description","Embed a built-in or installed custom Home Assistant dashboard card.")}</p>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select:{options:this.cardTypeOptions,custom_value:!0,mode:"dropdown"}}}
                        .value=${null!==(e=null==t?void 0:t.type)&&void 0!==e?e:""}
                        .label=${this.t("editor.ha_card.card_type","Card type")}
                        .helper=${this.t("editor.ha_card.card_type_help","Choose a card or enter its type, for example custom:mushroom-template-card.")}
                        .labelPosition=${en.Top}
                        @value-changed=${e=>this.changeType(e.detail.value)}>
                </ha-row-selector>

                ${i?V`
                    <button type="button" @click=${()=>this.choosing=!this.choosing}>
                        <ha-icon .icon=${this.choosing?"mdi:close":"mdi:view-dashboard-edit-outline"}></ha-icon>
                        ${this.choosing?this.t("ui.close","Close"):this.t(t?"editor.ha_card.change_card":"editor.ha_card.choose_card",t?"Choose another card":"Choose card")}
                    </button>
                `:K}

                ${this.validationError&&!this.editorOpen?V`<div class="error">${this.validationError}</div>`:K}

                ${this.choosing&&i?V`
                    <hui-card-picker
                            class="native-picker"
                            @config-changed=${this.onPickerConfigChanged}>
                    </hui-card-picker>
                `:K}

                ${t&&!this.choosing?V`
                    <button type="button" @click=${this.openEditor}>
                        <ha-icon icon="mdi:pencil-box-outline"></ha-icon>
                        ${this.t("editor.ha_card.edit_card","Edit card in Home Assistant editor")}
                    </button>
                `:K}

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean:{}}}
                        .value=${!0===this.widgetConfig.transparent}
                        .label=${this.t("editor.ha_card.transparent","Transparent card background")}
                        .helper=${this.t("editor.ha_card.transparent_help","Removes the standard HA card surface where the embedded card supports theme variables.")}
                        .labelPosition=${en.Top}
                        @value-changed=${e=>this.updateTransparent(e.detail.value)}>
                </ha-row-selector>
            </div>

            ${this.renderEditorDialog(o)}
        `}};ds.styles=a`
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
    `,ls([fe()],ds.prototype,"choosing",void 0),ls([fe()],ds.prototype,"validationError",void 0),ls([fe()],ds.prototype,"jsonValue",void 0),ls([fe()],ds.prototype,"editorOpen",void 0),ls([fe()],ds.prototype,"draftCard",void 0),ls([fe()],ds.prototype,"directEditor",void 0),ls([fe()],ds.prototype,"directEditorLoading",void 0),ls([fe()],ds.prototype,"directEditorUnavailable",void 0),ds=ls([pe("ha-card-widget-editor")],ds),ja.getInstance().registerAll([{widgetId:"clock",name:"Clock",description:"The current time",icon:"mdi:clock-outline",elementTag:"wcc-clock-widget",editorTag:"time-format-editor",defaultConfig:()=>({type:"clock"})},{widgetId:"date",name:"Date",description:"The current date",icon:"mdi:calendar-outline",elementTag:"wcc-date-widget",editorTag:"date-format-editor",defaultConfig:()=>({type:"date"})},{widgetId:"sensors",name:"Sensors",description:"Values of Home Assistant sensors",icon:"mdi:thermometer",elementTag:"wcc-sensors-widget",editorTag:"sensors-editor",defaultConfig:()=>({type:"sensors",sensors:[]})},{widgetId:"weather",name:"Weather",description:"Current weather and forecast",icon:"mdi:weather-partly-cloudy",elementTag:"wcc-weather-widget",editorTag:"weather-editor",defaultConfig:()=>({type:"weather",provider:"homeassistant",displayMode:"current"})},{widgetId:"transportation",name:"Transportation",description:"Public transport departures",icon:"mdi:bus",elementTag:"wcc-transportation-widget",editorTag:"transportation-editor",singleton:!0,defaultConfig:()=>({type:"transportation",provider:"",displayMode:"inline",stops:[]})},{widgetId:"action-bar",name:"Action bar",description:"Buttons triggering actions",icon:"mdi:gesture-tap-button",elementTag:"wcc-action-bar-widget",editorTag:"action-bar-editor",defaultConfig:()=>({type:"action-bar",enabled:!0,actions:[]})},{widgetId:"calendar",name:"Calendar",description:"Upcoming Home Assistant calendar events",icon:"mdi:calendar-month-outline",elementTag:"wcc-calendar-widget",editorTag:"calendar-editor",defaultConfig:()=>({type:"calendar",entities:[],displayMode:"agenda",daysAhead:7,maxEvents:8,showAllDay:!0,showLocation:!0,showDescription:!1,hidePastTodayEvents:!0,hideWhenEmpty:!1,updateInterval:300,eventBackgroundColor:"#202020",eventBackgroundOpacity:.76})},{widgetId:"ha-card",name:"Home Assistant card",description:"A built-in or installed custom Lovelace card",icon:"mdi:view-dashboard-outline",elementTag:"wcc-ha-card-widget",editorTag:"ha-card-widget-editor",defaultConfig:()=>({type:"ha-card"})},{widgetId:"separator",name:"Separator",description:"A configurable line between widgets",icon:"mdi:minus",elementTag:"wcc-separator-widget",editorTag:"separator-editor",defaultConfig:()=>({type:"separator",orientation:"auto",color:"#ffffff",opacity:.35,thickness:"1px",length:"100%"})}]);var hs=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};const us=new Map;let ps=class extends he{t(e,t){return qe(e,this.hass,t)}constructor(){super(),this.config={},this.preview=!1,this.selectedWidget=null,this.selectedZone=null,this.designerPreview=!1,this.designerOpen=!1,this.designerRequiresExplicitOpen=!1,this.layoutSaveStatus="idle",this.layoutSaveRevision=0,this.layoutSavedRevision=0,this.inlineEditSessionActive=!1,this.layoutTextEditPending=!1,this.configV3={layout:{zones:{}}},this.backgroundImageComponent=document.createElement("ha-background-image"),this.layoutElement=document.createElement("wcc-layout"),this.onWindowResize=()=>this.updateFitHeight(),this.onDesignerFocusIn=e=>{e.composedPath().some(e=>this.isTextEditingTarget(e))&&(this.layoutTextEditPending=!0)},this.onDesignerPointerDown=e=>{e.composedPath().some(e=>this.isTextEditingTarget(e))&&(this.layoutTextEditPending=!0)},this.onCardFocusOut=()=>{setTimeout(()=>{!this.isActiveElementInsideThisCard()&&this.layoutSaveRevision>this.layoutSavedRevision&&this.flushLayoutAutosave(!0)},0)},ze.info("%c WALL-CLOCK-CARD %c 3.1.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;")}connectedCallback(){super.connectedCallback(),this.preview||this.removeAttribute("designer-fullscreen"),this.isInEditPreview()&&(this.setAttribute("dialog-preview",""),this.setupPreviewScaling()),this.preview&&!this.hasAttribute("dialog-preview")&&this.hass&&!this.inlineEditSessionActive&&this.beginInlineEditing(),window.addEventListener("resize",this.onWindowResize),this.renderRoot.addEventListener("focusin",this.onDesignerFocusIn,{capture:!0}),this.renderRoot.addEventListener("pointerdown",this.onDesignerPointerDown,{capture:!0}),this.addEventListener("focusout",this.onCardFocusOut),this.fitObserver=new ResizeObserver(()=>this.updateFitHeight()),this.fitObserver.observe(this),this.initBackgroundImageComponent(),this.syncLayoutElement(),this.initConnectCallbackAsync()}disconnectedCallback(){var e,t;this.clearLayoutAutosaveTimer(),this.removeAttribute("designer-fullscreen"),this.designerOpen=!1,this.inlineEditSessionActive&&(this.inlineEditSessionActive=!1,this.flushLayoutAutosave(!0)),super.disconnectedCallback(),null===(e=this.previewObserver)||void 0===e||e.disconnect(),this.previewObserver=void 0,null===(t=this.fitObserver)||void 0===t||t.disconnect(),this.fitObserver=void 0,window.removeEventListener("resize",this.onWindowResize),this.renderRoot.removeEventListener("focusin",this.onDesignerFocusIn,{capture:!0}),this.renderRoot.removeEventListener("pointerdown",this.onDesignerPointerDown,{capture:!0}),this.removeEventListener("focusout",this.onCardFocusOut)}updateFitHeight(){if(this.hasAttribute("dialog-preview"))return;if(this.hasAttribute("designer-fullscreen"))return void(this.style.maxHeight="");const e=Math.max(0,this.getBoundingClientRect().top),t=this.dashboardEditFooterHeight(),i=window.innerHeight-e-t;if(i<=0)return;const o=parseFloat(this.style.maxHeight);(isNaN(o)||Math.abs(o-i)>1)&&(this.style.maxHeight=`${i}px`)}dashboardEditFooterHeight(){if(!this.preview||this.hasAttribute("dialog-preview"))return 0;const e=parseFloat(getComputedStyle(this).getPropertyValue("--wcc-dashboard-edit-footer-height"));return Number.isFinite(e)?Math.max(0,e):64}setupPreviewScaling(){this.previewObserver||(this.previewObserver=new ResizeObserver(()=>this.updatePreviewScale()),this.previewObserver.observe(this),this.updatePreviewScale())}updatePreviewScale(){const e=window.innerWidth,t=window.innerHeight,i=this.clientWidth/e;i<=0||!e||!t||(this.style.setProperty("--wcc-preview-width",`${e}px`),this.style.setProperty("--wcc-preview-height",`${t}px`),this.style.setProperty("--wcc-preview-scale",String(i)),this.style.aspectRatio=`${e} / ${t}`)}isInEditPreview(){let e=this;for(;e;){const t=e.getRootNode();if(!(t instanceof ShadowRoot))return!1;const i=t.host.localName;if("hui-dialog-edit-card"===i||"hui-card-preview"===i||"hui-dialog-pick-card"===i)return!0;e=t.host}return!1}async initConnectCallbackAsync(){await this.backgroundImageComponent.controller.ready,this.configureCardLogger();try{await async function(){ze.debug("Loading all translations");const e=Je().map(e=>async function(e){try{Be[e]?(Ue[e]=Be[e],ze.debug(`Loaded translations for ${e}`)):ze.warn(`No embedded translations found for ${e}`)}catch(t){ze.error(`Error loading translations for ${e}: ${t}`)}}(e));await Promise.all(e)}(),ze.debug("Loaded translations for all languages")}catch(e){ze.error("Error loading translations:",e)}this.publishWeatherFallbackIfNeeded()}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}getGridOptions(){return{columns:"full",rows:6,min_rows:4}}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(e){if(!e||"object"!=typeof e)throw new Error("Invalid configuration");this.applyConfig(e)}applyConfig(e){this.config=e;const t=ua(e),i=ja.getInstance().getAllWidgets().filter(e=>e.singleton).map(e=>e.widgetId);this.configV3={...t,layout:ba(t.layout,i)},this.initBackgroundImageComponent(),this.syncLayoutElement(),this.backgroundImageComponent.controller.ready.then(()=>{this.publishWeatherFallbackIfNeeded()})}computeAppearance(){var e,t,i,o,n,a;const r=null!==(e=this.configV3.appearance)&&void 0!==e?e:{};return{fontColor:null!==(t=r.fontColor)&&void 0!==t?t:"#FFFFFF",fontFamily:r.fontFamily,language:r.language,timeZone:null!==(i=r.timeZone)&&void 0!==i?i:null===(n=null===(o=this.hass)||void 0===o?void 0:o.config)||void 0===n?void 0:n.time_zone,size:null!==(a=r.size)&&void 0!==a?a:dt.Medium}}syncLayoutElement(){var e;const t=this.computeAppearance();this.layoutElement.layout=this.configV3.layout,this.layoutElement.appearance=t,this.style.fontFamily=null!==(e=t.fontFamily)&&void 0!==e?e:"",this.hass&&(this.layoutElement.hass=this.hass)}publishWeatherFallbackIfNeeded(){const e=this.configV3.layout.zones;Object.values(e).some(e=>{var t;return null===(t=null==e?void 0:e.widgets)||void 0===t?void 0:t.some(e=>"weather"===e.type)})||et.getInstance().publish(new it(Ee.All))}configureCardLogger(){!function(e){const t=xe.level;xe={..._e,...e},t!==xe.level&&console.log(`[LOGGER] Log level changed from ${we[t]} to ${we[xe.level]}`)}({level:Ce(this.configV3.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1})}initBackgroundImageComponent(){var e,t,i,o,n,a,r,s;const l=null!==(e=this.configV3.background)&&void 0!==e?e:{},c={imageSourceId:l.source||"none",backgroundImages:l.images,entity:null===(t=l.config)||void 0===t?void 0:t.entity,apiKey:null===(i=l.config)||void 0===i?void 0:i.apiKey,contentFilter:null===(o=l.config)||void 0===o?void 0:o.contentFilter,category:null===(n=l.config)||void 0===n?void 0:n.category,count:null===(a=l.config)||void 0===a?void 0:a.count};this.backgroundImageComponent.backgroundOpacity=null!==(r=l.opacity)&&void 0!==r?r:.3,this.backgroundImageComponent.objectFit=l.objectFit||"cover",this.backgroundImageComponent.config={imageSourceConfig:c,backgroundRotationInterval:null!==(s=l.rotationInterval)&&void 0!==s?s:90,objectFit:l.objectFit||"cover"},this.backgroundImageComponent.hass=this.hass,ze.debug("Background image component initialized")}isPanelPlacement(){var e,t,i;let o=this;for(;o;){if("hui-panel-view"===o.localName)return!0;if(o.parentElement){o=o.parentElement;continue}const e=o.getRootNode();o=e instanceof ShadowRoot?e.host:null}const n=this.findHuiRoot(),a=null==n?void 0:n.___curView,r=void 0===a||null===(i=null===(t=null===(e=null==n?void 0:n.lovelace)||void 0===e?void 0:e.config)||void 0===t?void 0:t.views)||void 0===i?void 0:i[a];return"panel"===(null==r?void 0:r.type)||!0===(null==r?void 0:r.panel)}beginInlineEditing(){const e=!this.isPanelPlacement();this.removeAttribute("designer-fullscreen"),this.designerRequiresExplicitOpen=e,this.designerOpen=!e,this.selectedWidget=null,this.selectedZone=null,this.designerPreview=!1,this.inlineEditSessionActive=!0,this.restoreDesignerContext(),this.layoutSavePromise||this.layoutSaveBaseline&&this.layoutSaveRevision>this.layoutSavedRevision||(this.layoutSaveBaseline=this.config,this.layoutSaveRevision=0,this.layoutSavedRevision=0,this.layoutSavePromise=void 0,this.layoutSavePath=void 0,this.layoutTextEditPending=!1,this.clearLayoutAutosaveTimer(),this.layoutSaveStatus="idle",this.layoutSaveError=void 0)}finishInlineEditing(){this.clearLayoutAutosaveTimer(),this.removeAttribute("designer-fullscreen"),this.closeInplaceInspector(),this.designerPreview=!1,this.designerOpen=!1,this.designerRequiresExplicitOpen=!1,this.inlineEditSessionActive=!1,this.clearRetainedDesignerContext(),this.flushLayoutAutosave(!0).then(e=>{e&&!this.inlineEditSessionActive?(this.layoutSaveBaseline=void 0,this.layoutSavePath=void 0):e||this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"Wall Clock: the last layout change could not be saved."},bubbles:!0,composed:!0}))})}openFullscreenDesigner(){this.designerRequiresExplicitOpen&&(this.style.maxHeight="",this.setAttribute("designer-fullscreen",""),this.designerOpen=!0)}closeFullscreenDesigner(){this.clearLayoutAutosaveTimer(),this.closeInplaceInspector(),this.designerPreview=!1,this.removeAttribute("designer-fullscreen"),this.designerOpen=!1,this.clearRetainedDesignerContext(),this.flushLayoutAutosave(!0),this.updateComplete.then(()=>this.updateFitHeight())}applyInplaceConfig(e){this.applyConfig(e),this.markLayoutDirty()}markLayoutDirty(){this.inlineEditSessionActive&&(this.layoutSaveRevision++,this.layoutSaveStatus="pending",this.layoutSaveError=void 0,this.scheduleLayoutAutosave())}scheduleLayoutAutosave(e=700){this.clearLayoutAutosaveTimer(),this.layoutAutosaveTimer=setTimeout(()=>{this.layoutAutosaveTimer=void 0,this.flushLayoutAutosave()},e)}clearLayoutAutosaveTimer(){void 0!==this.layoutAutosaveTimer&&(clearTimeout(this.layoutAutosaveTimer),this.layoutAutosaveTimer=void 0)}async flushLayoutAutosave(e=!1){if(this.clearLayoutAutosaveTimer(),!this.layoutSaveBaseline||this.layoutSaveRevision<=this.layoutSavedRevision)return!0;if(!e&&this.layoutTextEditPending)return this.layoutSaveStatus="pending",!0;if(this.layoutSavePromise)return!!await this.layoutSavePromise&&this.flushLayoutAutosave(e);const t=this.layoutSaveBaseline,i=JSON.parse(JSON.stringify(this.configV3)),o=this.layoutSaveRevision;this.layoutSaveStatus="saving",this.layoutSaveError=void 0;const n=this.saveConfigToLovelace(t,i);this.layoutSavePromise=n;const a=await n;return this.layoutSavePromise===n&&(this.layoutSavePromise=void 0),a?(this.layoutSaveBaseline=i,this.layoutSavedRevision=o,this.layoutSaveRevision>o?(this.layoutSaveStatus="pending",this.flushLayoutAutosave(e)):(this.layoutSaveStatus="saved",this.layoutTextEditPending=!1,!0)):(this.layoutSaveStatus="error",this.layoutSaveError="Save failed — click to retry",ze.warn("Could not persist the layout (dashboard save API not found)"),!1)}isTextEditingTarget(e){return e instanceof HTMLTextAreaElement||(e instanceof HTMLInputElement?!new Set(["button","checkbox","color","file","hidden","image","radio","range","reset","submit"]).has(e.type.toLowerCase()):e instanceof HTMLElement&&(e.isContentEditable||"textbox"===e.getAttribute("role")))}isActiveElementInsideThisCard(){var e,t;let i=document.activeElement;for(;i;){if(i===this)return!0;i=null!==(t=null===(e=i.shadowRoot)||void 0===e?void 0:e.activeElement)&&void 0!==t?t:null}return!1}onInplaceLayoutChanged(e){var t;e.stopPropagation();const i=e.detail.layout,o=e.detail.focusWidgetId,n=null!=o?o:null===(t=this.selectedWidget)||void 0===t?void 0:t.widgetId;if(n){const e=_a(i,n);this.selectedWidget=e?{zone:e.zone,index:e.index,widgetId:n}:null,o&&(this.selectedZone=null)}else this.selectedWidget&&(this.selectedWidget=null);this.retainDesignerContext();const a={...this.configV3,layout:i};this.applyInplaceConfig(a)}onInplaceWidgetSelected(e){var t,i,o;const n=e.detail;this.selectedZone=null;const a=n.widgetId?(null===(t=this.selectedWidget)||void 0===t?void 0:t.widgetId)===n.widgetId:(null===(i=this.selectedWidget)||void 0===i?void 0:i.zone)===n.zone&&(null===(o=this.selectedWidget)||void 0===o?void 0:o.index)===n.index;this.selectedWidget=a?null:n,this.retainDesignerContext()}onInplaceZoneSelected(e){const t=e.detail.zone;this.selectedWidget=null,this.selectedZone=this.selectedZone===t?null:t,this.retainDesignerContext()}onInplaceWidgetConfigChanged(e){e.stopPropagation();const{zone:t,index:i,widget:o}=e.detail,n=function(e,t,i,o){const n=fa(e),a=n.zones[t];return!a||i<0||i>=a.widgets.length||(a.widgets[i]={...fa(o),type:a.widgets[i].type,id:a.widgets[i].id}),n}(this.configV3.layout,t,i,o);this.applyInplaceConfig({...this.configV3,layout:n})}onInplaceZoneSettingsChanged(e){e.stopPropagation();const{zone:t,settings:i}=e.detail,o=function(e,t,i){const o=fa(e),n=o.zones[t];if(!n)return o;const a=n;for(const[e,t]of Object.entries(i))void 0===t||""===t?delete a[e]:a[e]=t;return o}(this.configV3.layout,t,i);this.applyInplaceConfig({...this.configV3,layout:o})}onInplaceCardConfigChanged(e){e.stopPropagation(),this.applyInplaceConfig(e.detail.config)}openCardSettings(){this.designerPreview=!1,this.selectedWidget=null,this.selectedZone=null,this.retainDesignerContext()}closeInplaceInspector(){this.selectedWidget=null,this.selectedZone=null}resolveDesignerSessionKey(){var e;if(this.designerSessionKey)return this.designerSessionKey;const t=this.findHuiRoot(),i=null===(e=null==t?void 0:t.lovelace)||void 0===e?void 0:e.config,o=i?pr(i,this.config):void 0;return(null==o?void 0:o.length)?(this.designerSessionKey=`${window.location.pathname}:${JSON.stringify(o)}`,this.designerSessionKey):void 0}retainDesignerContext(){const e=this.resolveDesignerSessionKey();e&&us.set(e,{selectedWidget:this.selectedWidget?{...this.selectedWidget}:null,selectedZone:this.selectedZone})}restoreDesignerContext(){var e;const t=this.resolveDesignerSessionKey();if(!t)return;const i=us.get(t);if(i){if(i.selectedWidget){const t=i.selectedWidget,o=t.widgetId?_a(this.configV3.layout,t.widgetId):(null===(e=this.configV3.layout.zones[t.zone])||void 0===e?void 0:e.widgets[t.index])?{zone:t.zone,index:t.index}:void 0;if(o)return this.selectedWidget={zone:o.zone,index:o.index,widgetId:t.widgetId},void(this.selectedZone=null)}this.selectedWidget=null,this.selectedZone=i.selectedZone}}clearRetainedDesignerContext(){const e=this.designerSessionKey;e&&us.delete(e),this.designerSessionKey=void 0}async saveConfigToLovelace(e,t){try{const i=this.findHuiRoot(),o=null==i?void 0:i.lovelace;if(!(null==o?void 0:o.saveConfig)||!o.config)return!1;const n=o.config;let a=this.layoutSavePath;if(a||(a=pr(n,e)),!(null==a?void 0:a.length))return ze.warn("Refusing layout save: the exact card instance was not found"),!1;const r=gr(n,a);if(r!==e&&JSON.stringify(r)!==JSON.stringify(e))return ze.warn("Refusing layout save: the dashboard changed at the card path"),!1;const s=function(e,t,i){if(!t.length)return;const o=JSON.parse(JSON.stringify(e)),n=gr(o,t.slice(0,-1));return n&&"object"==typeof n?(n[t[t.length-1]]=i,o):void 0}(n,a,t);return!!s&&(await o.saveConfig(s),function(e,t,i,o){if(!t.length)return!1;const n=gr(e,t);if(!mr(n,i)&&!mr(n,o))return!1;const a=gr(e,t.slice(0,-1));if(!a||"object"!=typeof a)return!1;try{return a[t[t.length-1]]=o,!0}catch(e){return!1}}(n,a,e,t)||ze.debug("Live config synchronization skipped (read-only or already replaced)"),this.layoutSavePath=a,!0)}catch(e){return ze.warn("Saving layout to Lovelace failed:",e),!1}}findHuiRoot(){var e,t,i,o,n,a;const r=null===(a=null===(n=null===(o=null===(i=null===(t=null===(e=document.querySelector("home-assistant"))||void 0===e?void 0:e.shadowRoot)||void 0===t?void 0:t.querySelector("home-assistant-main"))||void 0===i?void 0:i.shadowRoot)||void 0===o?void 0:o.querySelector("ha-panel-lovelace"))||void 0===n?void 0:n.shadowRoot)||void 0===a?void 0:a.querySelector("hui-root");if(r)return r;const s=[document];let l=0;for(;s.length&&l<5e3;){const e=s.shift(),t=e.querySelector("hui-root");if(t)return t;for(const t of e.querySelectorAll("*"))l++,t.shadowRoot&&s.push(t.shadowRoot)}}updated(e){if(e.has("preview")||e.has("hass")){const e=this.preview&&!this.hasAttribute("dialog-preview")&&!!this.hass;e&&!this.inlineEditSessionActive?this.beginInlineEditing():!e&&this.inlineEditSessionActive&&this.finishInlineEditing(),e||(this.removeAttribute("designer-fullscreen"),this.designerOpen=!1)}e.has("hass")&&this.hass&&(this.backgroundImageComponent.hass=this.hass,this.syncLayoutElement()),e.has("config")&&this.config&&this.configureCardLogger(),(e.has("config")||e.has("preview"))&&this.updateFitHeight()}static get styles(){return a`
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
                top: var(--header-height, 56px);
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
                width: auto;
                height: auto;
                max-height: none;
                border-radius: 0;
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
                border-bottom: 1px solid rgba(255, 255, 255, 0.09);
                background: #0d0e13;
                color: #f2f3f7;
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
                color: #777d90;
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
                color: #a0a5b5;
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
                color: #fff;
                outline: none;
            }

            .designer-card-settings.active {
                border-color: var(--primary-color, #3b82f6);
                color: #e9f2ff;
                background: rgba(59, 130, 246, 0.08);
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
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                background: #15161c;
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
                color: #777d90;
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
                color: #fff;
                outline: none;
            }

            .designer-mode.active {
                background: #242631;
                color: #f5f6fa;
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
                right: 10px;
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
                outline: 2px solid rgba(255, 255, 255, 0.5);
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
                border-left: 1px solid rgba(255, 255, 255, 0.09);
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
                border-top: 1px solid rgba(255, 255, 255, 0.09);
                background: #0d0e13;
                color: #747a8d;
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
                color: #69d7a0;
            }

            .layout-save-status.pending ha-icon {
                color: #fbc02d;
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
                    border: 1px solid rgba(255, 255, 255, 0.14);
                    border-radius: 12px 12px 0 0;
                    box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.42);
                }
            }
        `}render(){var e;const t=this.preview&&!this.hasAttribute("dialog-preview")&&!!this.hass,i=t&&this.designerOpen,o={idle:{icon:"mdi:check-circle-outline",label:this.t("ui.saved","Saved")},pending:{icon:"mdi:alert-outline",label:this.t("designer.unsaved","Unsaved changes")},saving:{icon:"mdi:content-save-sync-outline",label:this.t("designer.saving","Saving…")},saved:{icon:"mdi:check-circle",label:this.t("ui.saved","Saved")},error:{icon:"mdi:alert-circle-outline",label:null!==(e=this.layoutSaveError)&&void 0!==e?e:this.t("designer.save_failed","Save failed — click to retry")}}[this.layoutSaveStatus];return V`
            <ha-card style="color: ${this.computeAppearance().fontColor};">
                ${this.backgroundImageComponent}
                ${this.layoutElement}
                ${t&&this.designerRequiresExplicitOpen&&!this.designerOpen?V`
                    <button class="designer-launch" type="button" @click=${this.openFullscreenDesigner}>
                        <ha-icon icon="mdi:tune-variant"></ha-icon>
                        ${this.t("designer.configure_card","Configure card")}
                    </button>
                `:""}
                ${i?V`
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
                            ${this.hasAttribute("designer-fullscreen")?V`
                                <button class="designer-done" type="button" @click=${this.closeFullscreenDesigner}>
                                    ${this.t("ui.done","Done")}
                                </button>
                            `:""}
                        </div>
                    </div>
                    ${this.designerPreview?"":V`
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
                                title=${"error"===this.layoutSaveStatus?this.t("designer.retry_save","Retry save"):o.label}
                                @click=${()=>{this.flushLayoutAutosave(!0)}}>
                            <ha-icon .icon=${o.icon}></ha-icon>
                            ${o.label}
                        </button>
                        <span class="designer-status-hint">
                            ${this.hasAttribute("designer-fullscreen")?this.t("designer.autosave_hint_local","Changes are prepared continuously · save and close this editor with Done"):this.t("designer.autosave_hint","Changes are prepared continuously · save and finish the dashboard with Done")}
                        </span>
                    </div>
                `:""}
            </ha-card>
        `}};hs([ve({type:Object})],ps.prototype,"hass",void 0),hs([ve({type:Object})],ps.prototype,"config",void 0),hs([ve({attribute:!1})],ps.prototype,"preview",void 0),hs([fe()],ps.prototype,"selectedWidget",void 0),hs([fe()],ps.prototype,"selectedZone",void 0),hs([fe()],ps.prototype,"designerPreview",void 0),hs([fe()],ps.prototype,"designerOpen",void 0),hs([fe()],ps.prototype,"designerRequiresExplicitOpen",void 0),hs([fe()],ps.prototype,"layoutSaveStatus",void 0),hs([fe()],ps.prototype,"layoutSaveError",void 0),ps=hs([pe("wall-clock-card")],ps),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
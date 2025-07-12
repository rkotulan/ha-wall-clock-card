/*! For license information please see wall-clock-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const n=t=>new o("string"==typeof t?t:t+"",void 0,i),a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return n(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:g,getPrototypeOf:u}=Object,p=globalThis,m=p.trustedTypes,f=m?m.emptyScript:"",v=p.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??_)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[y("elementProperties")]=new Map,b[y("finalized")]=new Map,v?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push("2.1.1");const S=globalThis,k=S.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+C,O=`<${I}>`,E=document,P=()=>E.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,U="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,M=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,z=/"/g,H=/^(?:script|style|textarea|title)$/i,J=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),j=J(1),W=(J(2),J(3),Symbol.for("lit-noChange")),B=Symbol.for("lit-nothing"),V=new WeakMap,Z=E.createTreeWalker(E,129);function K(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=F;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===F?"!--"===l[1]?a=T:void 0!==l[1]?a=M:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=o??F,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?R:'"'===l[3]?z:L):a===z||a===L?a=R:a===T||a===M?a=F:(a=R,o=void 0);const d=a===R&&t[e+1].startsWith("/>")?" ":"";n+=a===F?i+O:c>=0?(s.push(r),i.slice(0,c)+x+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[l,c]=q(t,e);if(this.el=G.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Z.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(x)){const e=c[n++],i=s.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),Z.nextNode(),r.push({type:2,index:++o});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===I)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=N(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??E).importNode(e,!0);Z.currentNode=s;let o=Z.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new X(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new ot(o,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(o=Z.nextNode(),n++)}return Z.currentNode=E,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),N(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Y(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Y(this,s[i+a],e,a),r===W&&(r=this._$AH[a]),n||=!N(r)||r!==this._$AH[a],r===B?t=B:t!==B&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??B)===W)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=S.litHtmlPolyfillSupport;nt?.(G,X),(S.litHtmlVersions??=[]).push("3.3.1");const at=globalThis;class rt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(P(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}rt._$litElement$=!0,rt.finalized=!0,at.litElementHydrateSupport?.({LitElement:rt});const lt=at.litElementPolyfillSupport;lt?.({LitElement:rt}),(at.litElementVersions??=[]).push("4.2.1");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:_},dt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var ut;!function(t){t[t.DEBUG=0]="DEBUG",t[t.INFO=1]="INFO",t[t.WARN=2]="WARN",t[t.ERROR=3]="ERROR",t[t.NONE=4]="NONE"}(ut||(ut={}));const pt={level:ut.INFO,prefix:"",enableTimestamps:!1,enableSourceTracking:!1,logToConsole:!0,logToStorage:!1,maxStoredLogs:100};let mt={...pt};const ft=[];function vt(t,e,i,...s){var o;if(t<mt.level)return;const n=function(t,e,i){const{prefix:s,enableTimestamps:o,enableSourceTracking:n}=mt;let a="";return o&&(a+=`[${(new Date).toISOString()}] `),a+=`[${ut[t]}] `,s&&(a+=`[${s}] `),e&&n&&(a+=`[${e}] `),a+=i,a}(t,e,i);if(mt.logToConsole)switch(t){case ut.DEBUG:console.debug(n,...s);break;case ut.INFO:console.log(n,...s);break;case ut.WARN:console.warn(n,...s);break;case ut.ERROR:console.error(n,...s)}if(mt.logToStorage){let t=n;if(s.length>0)try{t+=" "+s.map(t=>"object"==typeof t?JSON.stringify(t):String(t)).join(" ")}catch(e){t+=" [Arguments could not be stringified]"}ft.push(t);const e=null!==(o=mt.maxStoredLogs)&&void 0!==o?o:100;ft.length>e&&ft.splice(0,ft.length-e)}}function yt(t){return{debug:(e,...i)=>vt(ut.DEBUG,t,e,...i),info:(e,...i)=>vt(ut.INFO,t,e,...i),warn:(e,...i)=>vt(ut.WARN,t,e,...i),error:(e,...i)=>vt(ut.ERROR,t,e,...i),withSource:t=>yt(t)}}const wt=yt("wall-clock");class _t{static getInstance(){return _t.instance||(_t.instance=new _t),_t.instance}constructor(){this.sources=new Map}register(t){this.sources.has(t.id)&&wt.warn(`Image source with ID ${t.id} is already registered. Overwriting.`),this.sources.set(t.id,t)}registerAll(t){t.forEach(t=>this.register(t))}getSource(t){return this.sources.get(t)}getAllSources(){return Array.from(this.sources.values())}hasSource(t){return this.sources.has(t)}}var $t,bt;!function(t){t.Unspecified="unspecified",t.SunriseSunset="sunrise-sunset",t.Day="day",t.Night="night"}($t||($t={})),function(t){t.All="all",t.ClearSky="clear sky",t.Clouds="clouds",t.Rain="rain",t.Snow="snow",t.Mist="mist"}(bt||(bt={}));const St=[bt.All,bt.ClearSky,bt.Clouds,bt.Rain,bt.Snow,bt.Mist],kt=[$t.Unspecified,$t.SunriseSunset,$t.Day,$t.Night];function At(){const t=(new Date).getHours();return t>=5&&t<9||t>=17&&t<21?$t.SunriseSunset:t>=9&&t<17?$t.Day:t>=21||t<5?$t.Night:$t.Unspecified}function xt(t,e){if(!t)return;const i=t.toLowerCase();for(const t of e)if(i.includes(t.toLowerCase().replace(" ","-")))return t}class Ct{constructor(){this.imageUrlCache=new Map,this.lastWeather=null,this.lastTimeOfDay=null,this.currentIndex=0}getLogger(){return yt(`${this.id}-source`)}shuffleArray(t){for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}}async fetchImagesAsync(t,e,i){return this.getLogger().debug(`Fetching images with weather: ${e}, timeOfDay: ${i}`),this.fetchImagesInternalAsync(t,e,i)}async getNextImageUrlAsync(t,e,i){var s;this.getLogger().debug(`GetNextImageUrl called with weather: ${e}, timeOfDay: ${i}`),this.lastWeather===e&&this.lastTimeOfDay===i||(this.getLogger().debug("Weather or timeOfDay changed, clearing cache"),this.imageUrlCache.clear(),this.currentIndex=0,this.lastWeather=e,this.lastTimeOfDay=i);const o=`${e}_${i}`;if(!this.imageUrlCache.has(o)||0===(null===(s=this.imageUrlCache.get(o))||void 0===s?void 0:s.length)){const s=[...await this.fetchImagesAsync(t,e,i)];this.shuffleArray(s),this.imageUrlCache.set(o,s),this.getLogger().debug(`Cached ${s.length} images for weather: ${e}, timeOfDay: ${i}`)}const n=this.imageUrlCache.get(o)||[];if(0===n.length)return this.getLogger().warn(`No images available for weather: ${e}, timeOfDay: ${i}`),"";const a=n[this.currentIndex];return this.currentIndex=(this.currentIndex+1)%n.length,this.getLogger().info(`Returning image for weather: ${e}, timeOfDay: ${i}, URL: ${a}`),a}filterImagesByWeatherAndTime(t,e,i){if(this.getLogger().debug(`Current time of day: ${i}`),this.getLogger().debug(`Current weather condition: ${e}`),0===t.length)return[];let s=[];return s=t.filter(t=>(t.weather===e||t.weather===bt.All)&&t.timeOfDay===i),0===s.length&&(s=t.filter(t=>(t.weather===e||t.weather===bt.All)&&t.timeOfDay===$t.Unspecified)),0===s.length&&(s=t.filter(t=>t.weather===bt.All&&t.timeOfDay===i)),0===s.length&&(s=t.filter(t=>t.weather===bt.All&&t.timeOfDay===$t.Unspecified)),s.length>0?(this.getLogger().debug(`Found ${s.length} images matching current conditions`),s.map(t=>t.url)):(this.getLogger().info("No matching images found, returning all images"),t.map(t=>t.url))}convertUrlsToBackgroundImages(t){return this.getLogger().debug(`Converting ${t.length} URLs to BackgroundImage objects`),t.map(t=>({url:t,weather:xt(t,St)||bt.All,timeOfDay:xt(t,kt)||$t.Unspecified}))}}const It=new class extends Ct{constructor(){super(...arguments),this.id="local",this.name="Local Images",this.description="Images from local paths or URLs specified in the configuration",this.logger=yt("local-source")}async fetchImagesInternalAsync(t,e,i){return t.backgroundImages&&t.backgroundImages.length>0?(this.logger.debug(`Using backgroundImages structure with ${t.backgroundImages.length} images`),this.logger.debug(`First image URL: ${t.backgroundImages[0].url}`),this.filterImagesByWeatherAndTime(t.backgroundImages,e,i)):(this.logger.debug("No images found in configuration"),[])}getDefaultConfig(){return{backgroundImages:[]}}},Ot=new class extends Ct{constructor(){super(...arguments),this.id="picsum",this.name="Picsum Photos",this.description="Random high-quality images from Picsum Photos",this.logger=yt("picsum-source")}async fetchImagesInternalAsync(t,e,i){const s=`https://picsum.photos/seed/${Date.now()}/1920/1080`;return this.logger.debug(`Generated Picsum image URL: ${s}`),[s]}getDefaultConfig(){return{}}},Et=new class extends Ct{constructor(){super(...arguments),this.id="unsplash",this.name="Unsplash",this.description="Beautiful, free photos from Unsplash collections",this.logger=yt("unsplash-source"),this.collections={nature:["3330448","4378039","1319040","3694365"],water:["3694365","1053828","2411979","981639"],architecture:["3348849","4468022","3348849","922312"],city:["3470372","1079798","2563","1110498"],landscape:["4466935","3694365","827743","2422483"],animals:["3106804","1242150","139386","162213"],food:["3687999","2059134","2489501","2252258"],travel:["3349809","3356576","2476111","1901880"],people:["3641869","4468022","181581","139941"],technology:["4587649","8761738","2059134","1263277"],abstract:["4587649","8761738","2059134","1263277"],space:["2022043","2159937","2506084","531563"],interior:["1118894","4466935","3330452","4468022"],flowers:["2411979","827743","1079798","3694365"],dark:["4466935","3694365","827743","2422483"],light:["4466935","3694365","827743","2422483"],minimal:["4466935","3694365","827743","2422483"],colorful:["4466935","3694365","827743","2422483"],black:["4466935","3694365","827743","2422483"],white:["4466935","3694365","827743","2422483"],red:["4466935","3694365","827743","2422483"],blue:["4466935","3694365","827743","2422483"],green:["4466935","3694365","827743","2422483"],yellow:["4466935","3694365","827743","2422483"],orange:["4466935","3694365","827743","2422483"],purple:["4466935","3694365","827743","2422483"],pink:["4466935","3694365","827743","2422483"],brown:["4466935","3694365","827743","2422483"],gray:["4466935","3694365","827743","2422483"],"black-and-white":["4466935","3694365","827743","2422483"]},this.defaultCollections=["3694365","1053828","4466935","3348849"]}async fetchImagesInternalAsync(t,e,i){const s=t.count||5;let o=t.category||"";const n=t.apiKey||"",a=[];if(this.logger.debug(`Current weather: ${e}, time of day: ${i}`),this.logger.debug(`Using category with weather and time: ${o}`),n)try{return this.logger.debug("Using official Unsplash API"),await this.fetchImagesFromApiAsync(n,o,s,e,i,t)}catch(t){this.logger.error("Error fetching images from Unsplash API:",t),this.logger.debug("Falling back to direct URL method")}this.logger.debug("Using direct URL method for Unsplash images");const r=o.split(",").map(t=>t.trim().toLowerCase());this.logger.debug(`Categories for direct URL method: ${r.join(", ")}`);let l=[];r.forEach(t=>{this.collections[t]&&(l=[...l,...this.collections[t]])}),0===l.length?(this.logger.debug("No matching collections found, using default collections"),l=this.defaultCollections):this.logger.debug(`Using collection IDs: ${l.join(", ")}`);for(let t=0;t<s;t++)try{const e=`https://source.unsplash.com/collection/${l[Math.floor(Math.random()*l.length)]}/1920x1080/?sig=${Date.now()+t}`;this.logger.debug(`Generated direct URL (${t+1}/${s}): ${e}`),a.push(e)}catch(e){this.logger.warn(`Failed to generate Unsplash image URL (attempt ${t+1}/${s})`,e)}return a}async fetchImagesFromApiAsync(t,e,i,s,o,n){const a=[],r=(null==n?void 0:n.contentFilter)||"high";let l="";if(e){const t=e.split(",").map(t=>t.trim().toLowerCase());t.length>0&&(l=t[0]),t.length>1&&(l+=` ${t.slice(1).join(" ")}`),this.logger.debug(`Using categories: ${t.join(", ")}`)}const c=s.toLowerCase();l+=` ${c}`,"sunrise-sunset"===o?l+=" sunrise sunset dawn dusk":"day"===o?l+=" daylight midday day":"night"===o&&(l+=" night dark stars moonlight"),this.logger.debug(`Enhanced query with weather data: ${l}`),this.logger.debug(`Weather condition: ${c}, Time of day: ${o}`);try{let e="https://api.unsplash.com/photos/random?";const s=new URLSearchParams({client_id:t,count:i.toString(),orientation:"landscape",content_filter:r});l&&s.append("query",l);const o=new URLSearchParams(s);o.delete("client_id"),o.append("client_id","***API_KEY_HIDDEN***"),this.logger.debug(`API parameters: ${o.toString()}`),e+=s.toString();const n=e.replace(/client_id=[^&]+/,"client_id=***API_KEY_HIDDEN***");this.logger.debug(`Making API request to: ${n}`);const c=await fetch(e);if(!c.ok)throw this.logger.error(`API error: ${c.status} ${c.statusText}`),new Error(`Unsplash API error: ${c.status} ${c.statusText}`);const h=await c.json();this.logger.debug(`API response received with ${Array.isArray(h)?h.length:0} images`),Array.isArray(h)&&h.forEach(t=>{const e=t.urls.raw+"&w=1920&h=1080&fit=crop";a.push(e)}),this.logger.debug(`Fetched ${a.length} images from Unsplash API`)}catch(t){throw this.logger.error("Error fetching from Unsplash API:",t),t}return a}getDefaultConfig(){return{count:5,category:"nature",apiKey:"",useApi:!0,contentFilter:"high"}}getCategories(){return Object.keys(this.collections)}},Pt=new class extends Ct{constructor(){super(...arguments),this.id="sensor",this.name="Sensor Images",this.description='Images from a Home Assistant sensor with a "files" attribute',this.logger=yt("sensor-source"),this.lastFetchTime=0,this.cachedImages=[],this.refreshInterval=6e5,this.entityId=null}async checkEntityAsync(t){try{const e=window.document.querySelector("home-assistant").hass;if(!e)return void this.logger.warn("Could not get Home Assistant instance");const i=e.states[t];if(!i)return void this.logger.warn(`Entity ${t} not found`);this.updateCacheFromEntity(i),this.entityId=t,this.logger.debug(`Checked entity ${t}`)}catch(t){this.logger.error("Error checking entity:",t)}}updateCacheFromEntity(t){const e=t.attributes.files;e&&Array.isArray(e)&&e.every(t=>"string"==typeof t)?(this.cachedImages=this.convertUrlsToBackgroundImages(e),this.lastFetchTime=Date.now(),this.imageUrlCache.clear(),this.logger.debug(`Updated cache with ${e.length} images from entity ${this.entityId}`)):this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`)}async fetchImagesInternalAsync(t,e,i){const s=t.entity;if(!s)return this.logger.warn("No entity ID provided for Sensor image source"),[];await this.checkEntityAsync(s);const o=Date.now();if(this.cachedImages.length>0&&o-this.lastFetchTime<this.refreshInterval)return this.logger.debug(`Using cached images (${this.cachedImages.length} images)`),this.filterImagesByWeatherAndTime(this.cachedImages,e,i);try{const t=window.document.querySelector("home-assistant").hass;if(!t)return this.logger.warn("Could not get Home Assistant instance"),[];const o=t.states[s];return o?(this.updateCacheFromEntity(o),this.filterImagesByWeatherAndTime(this.cachedImages,e,i)):(this.logger.warn(`Sensor ${s} not found`),[])}catch(t){return this.logger.error("Error fetching images from sensor:",t),[]}}getDefaultConfig(){return{entity:"",backgroundImages:[]}}},Nt=new class{constructor(){this.id="null",this.name="Null Source",this.description="A placeholder source that returns no images",this.logger=yt("null-source")}async fetchImagesAsync(t,e,i){return this.logger.debug("Returning empty image list"),[]}async getNextImageUrlAsync(t,e,i){return this.logger.debug("Returning empty image URL"),""}getDefaultConfig(){return{}}},Dt={local:It,picsum:Ot,unsplash:Et,sensor:Pt};class Ut{constructor(){this.imageSource=null,this.sourceConfig={},this.imageSourceId="picsum",this.logger=yt("background-image-manager")}initialize(t={}){const e=t.imageSourceId||"picsum";if(this.logger.debug(`Initializing with image source ID: ${e}`),"none"===e)return this.logger.debug("Image source is set to none, skipping initialization"),!1;var i;if(this.imageSourceId=e||"picsum",this.imageSource=(i=this.imageSourceId,Dt[i]||Nt),!this.imageSource)return this.logger.error(`Image source '${this.imageSourceId}' not found`),!1;const s=this.imageSource?this.imageSource.getDefaultConfig():{};return this.sourceConfig={...s,...t},this.logger.debug(`Initialized with image source: ${this.imageSourceId}`),!0}async getNextImageUrlAsync(t,e){if(!this.imageSource)return this.logger.error("No image source initialized"),"";try{this.logger.debug(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${t}, time of day: ${e}`);const i=await this.imageSource.getNextImageUrlAsync(this.sourceConfig,t,e);return i?(this.logger.debug(`Got image URL: ${i}`),i):(this.logger.warn("No image URL returned from source"),"")}catch(t){return this.logger.error("Error getting next image URL:",t),""}}getImageSourceId(){return this.imageSourceId}}_t.getInstance().registerAll([Ot,It,Et,Pt]);class Ft{static getInstance(){return Ft.instance||(Ft.instance=new Ft),Ft.instance}constructor(){this.providers=new Map}register(t){this.providers.has(t.id)&&wt.warn(`Weather provider with ID ${t.id} is already registered. Overwriting.`),this.providers.set(t.id,t)}getProvider(t){return this.providers.get(t)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(t){return this.providers.has(t)}}const Tt=new class{constructor(){this.id="openweathermap",this.name="OpenWeatherMap",this.description="Weather forecasts from OpenWeatherMap API"}async fetchWeatherAsync(t){if(!t.apiKey)throw new Error("OpenWeatherMap API key is required");const e=t.latitude||50.0755,i=t.longitude||14.4378,s=t.units||"metric",o=t.language||"cs";try{const n=`https://api.openweathermap.org/data/2.5/forecast?lat=${e}&lon=${i}&units=${s}&lang=${o}&appid=${t.apiKey}`;wt.debug("[OpenWeatherMap] "+n);const a=await fetch(n);if(!a.ok)throw new Error(`OpenWeatherMap API error: ${a.statusText}`);const r=await a.json();if(!r.list||!r.list.length)throw new Error("No forecast data available");const l=r.list[0],c=l.weather[0].description,h={temperature:l.main.temp,condition:c,conditionUnified:this.mapWeatherCondition(c),icon:this.getIconUrl(l.weather[0].icon),humidity:l.main.humidity,windSpeed:l.wind.speed,windDirection:this.getWindDirection(l.wind.deg),pressure:l.main.pressure,feelsLike:l.main.feels_like},d=new Map;return r.list.forEach(t=>{var e;const i=new Date(1e3*t.dt).toISOString().split("T")[0];d.has(i)||d.set(i,[]),null===(e=d.get(i))||void 0===e||e.push(t)}),{current:h,daily:Array.from(d.entries()).map(([t,e])=>{const i=e.map(t=>t.main.temp),s=Math.min(...i),o=Math.max(...i),n=e[Math.floor(e.length/2)]||e[0],a=e.filter(t=>void 0!==t.pop).map(t=>t.pop),r=a.length>0?a.reduce((t,e)=>t+e,0)/a.length*100:0;return{date:new Date(t),temperatureMin:s,temperatureMax:o,condition:n.weather[0].description,icon:this.getIconUrl(n.weather[0].icon),precipitation:r,humidity:n.main.humidity,windSpeed:n.wind.speed}})}}catch(t){throw wt.error("Error fetching weather data from OpenWeatherMap:",t),t}}getDefaultConfig(){return{apiKey:"",latitude:50.0755,longitude:14.4378,units:"metric",language:"cs"}}getIconUrl(t){return`https://openweathermap.org/img/wn/${t}@2x.png`}getWindDirection(t){return["N","NE","E","SE","S","SW","W","NW"][Math.round(t/45)%8]}mapWeatherCondition(t){switch(t.toLowerCase()){case"clear":case"clear sky":return bt.ClearSky;case"few clouds":case"scattered clouds":case"broken clouds":case"clouds":return bt.Clouds;case"fog":case"haze":case"dust":case"smoke":case"mist":return bt.Mist;case"drizzle":case"shower rain":case"thunderstorm":case"light rain":case"rain":return bt.Rain;case"tornado":case"windy":case"all":default:return bt.All;case"snow":return bt.Snow}}},Mt=Ft.getInstance();Mt.register(Tt);class Rt{static getInstance(){return Rt.instance||(Rt.instance=new Rt),Rt.instance}constructor(){this.providers=new Map}register(t){this.providers.has(t.id)&&wt.warn(`Transportation provider with ID ${t.id} is already registered. Overwriting.`),this.providers.set(t.id,t)}getProvider(t){return this.providers.get(t)}getAllProviders(){return Array.from(this.providers.values())}hasProvider(t){return this.providers.has(t)}}const Lt=new class{constructor(){this.id="idsjmk",this.name="DPMB (Brno)",this.description="Integrated Transport System of the South Moravian Region, Czech Republic"}async fetchTransportationAsync(t,e){try{if(0===e.length)throw new Error("No stops configured");const i={};for(const t of e){const e=String(t.stopId);i[e]||(i[e]=[]),i[e].push(t)}const s=[];for(const e of Object.keys(i)){const o=i[e],n=o.map(t=>t.postId),a=`https://dpmbinfo.dpmb.cz/api/departures?stopid=${e}`,r=`https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`,l=await fetch(r,{headers:{"User-Agent":"cz.dpmb.dpmbinfo/4.1.3 (Linux; U; Android 13; SM-A546B Build/UP1A.231005.007)"}});if(!l.ok)throw new Error(`Failed to fetch transportation data: ${l.status} ${l.statusText}`);const c=await l.json();if(c.Error)throw new Error(`API error: ${c.Error}`);for(const i of n){const n=c.PostList.find(t=>t.PostID===i);if(!n){wt.warn(`No platform found with postId ${i} for stopId ${e}`);continue}const a=n.Name,r=o.find(t=>t.postId===i);if(!r)continue;const l=r.name||a,h=t.maxDepartures||2,d=n.Departures.slice(0,Math.min(h,5)).map(t=>({lineId:t.LineId||t.Line,lineName:t.Line||t.LineName,finalStop:t.FinalStop,isLowFloor:t.IsLowFloor,timeMark:t.TimeMark,stopName:l,postId:i}));s.push(...d)}}return{departures:s,loading:!1}}catch(t){return wt.error("Error fetching transportation data:",t),{departures:[],error:t instanceof Error?t.message:String(t),loading:!1}}}getDefaultConfig(){return{}}},zt=Rt.getInstance();zt.register(Lt);const Ht=[{code:"cs",label:"Czech (Čeština)",locale:"cs-CZ",translations:JSON.parse('{"common":{"title":"Počasí","description":"Aktuální počasí a předpověď","settings":"Nastavení počasí"},"conditions":{"all":"Všechny povětrnostní podmínky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Málo oblačnosti","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","shower_rain":"Přeháňky","rain":"Déšť","thunderstorm":"Bouřka","snow":"Sněžení","mist":"Mlha","light_rain":"Slabý déšť"},"forecast":{"title":"Předpověď","today":"Dnes","tomorrow":"Zítra","next_days":"Další dny"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"da",label:"Danish (Dansk)",locale:"da-DK",translations:JSON.parse('{"common":{"title":"Vejr","description":"Aktuelle vejrforhold og prognose","settings":"Vejrindstillinger"},"conditions":{"all":"Alle vejrforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Let skyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvist skyet","shower_rain":"Byger","rain":"Regn","thunderstorm":"Tordenvejr","snow":"Sne","mist":"Tåge","light_rain":"Let regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"de",label:"German (Deutsch)",locale:"de-DE",translations:JSON.parse('{"common":{"title":"Wetter","description":"Aktuelle Wetterbedingungen und Vorhersage","settings":"Wettereinstellungen"},"conditions":{"all":"Alle Wetterbedingungen","clouds":"Bewölkt","clear_sky":"Klarer Himmel","few_clouds":"Wenige Wolken","scattered_clouds":"Aufgelockerte Bewölkung","broken_clouds":"Bewölkt","shower_rain":"Regenschauer","rain":"Regen","thunderstorm":"Gewitter","snow":"Schnee","mist":"Nebel","light_rain":"Leichter Regen"},"forecast":{"title":"Vorhersage","today":"Heute","tomorrow":"Morgen","next_days":"Nächste Tage"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"el",label:"Greek (Ελληνικά)",locale:"el-GR",translations:JSON.parse('{"common":{"title":"Καιρός","description":"Τρέχουσες καιρικές συνθήκες και πρόγνωση","settings":"Ρυθμίσεις καιρού"},"conditions":{"all":"Όλες οι καιρικές συνθήκες","clouds":"Συννεφιά","clear_sky":"Καθαρός ουρανός","few_clouds":"Λίγα σύννεφα","scattered_clouds":"Διάσπαρτα σύννεφα","broken_clouds":"Μερική συννεφιά","shower_rain":"Καταιγίδες","rain":"Βροχή","thunderstorm":"Καταιγίδα","snow":"Χιόνι","mist":"Ομίχλη","light_rain":"Ελαφριά βροχή"},"forecast":{"title":"Πρόγνωση","today":"Σήμερα","tomorrow":"Αύριο","next_days":"Επόμενες ημέρες"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"en",label:"English",locale:"en-US",translations:JSON.parse('{"common":{"title":"Weather","description":"Current weather and forecast","settings":"Weather settings"},"conditions":{"all":"All weather conditions","clouds":"Clouds","clear_sky":"Clear sky","few_clouds":"Few clouds","scattered_clouds":"Scattered clouds","broken_clouds":"Broken clouds","shower_rain":"Shower rain","rain":"Rain","thunderstorm":"Thunderstorm","snow":"Snow","mist":"Mist","light_rain":"Light rain"},"forecast":{"title":"Forecast","today":"Today","tomorrow":"Tomorrow","next_days":"Next days"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"es",label:"Spanish (Español)",locale:"es-ES",translations:JSON.parse('{"common":{"title":"Clima","description":"Condiciones climáticas actuales y pronóstico","settings":"Configuración del clima"},"conditions":{"all":"Todas las condiciones climáticas","clouds":"Nubes","clear_sky":"Cielo despejado","few_clouds":"Pocas nubes","scattered_clouds":"Nubes dispersas","broken_clouds":"Nubes rotas","shower_rain":"Lluvia intermitente","rain":"Lluvia","thunderstorm":"Tormenta","snow":"Nieve","mist":"Niebla","light_rain":"Lluvia ligera"},"forecast":{"title":"Pronóstico","today":"Hoy","tomorrow":"Mañana","next_days":"Próximos días"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fi",label:"Finnish (Suomi)",locale:"fi-FI",translations:JSON.parse('{"common":{"title":"Sää","description":"Nykyiset sääolosuhteet ja ennuste","settings":"Sääasetukset"},"conditions":{"all":"Kaikki sääolosuhteet","clouds":"Pilvinen","clear_sky":"Selkeä taivas","few_clouds":"Vähän pilviä","scattered_clouds":"Hajanaisia pilviä","broken_clouds":"Rikkonaisia pilviä","shower_rain":"Sadekuuroja","rain":"Sade","thunderstorm":"Ukkonen","snow":"Lumi","mist":"Sumu","light_rain":"Kevyt sade"},"forecast":{"title":"Ennuste","today":"Tänään","tomorrow":"Huomenna","next_days":"Seuraavat päivät"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"fr",label:"French (Français)",locale:"fr-FR",translations:JSON.parse('{"common":{"title":"Météo","description":"Conditions météorologiques actuelles et prévisions","settings":"Paramètres météo"},"conditions":{"all":"Toutes les conditions météorologiques","clouds":"Nuages","clear_sky":"Ciel dégagé","few_clouds":"Quelques nuages","scattered_clouds":"Nuages épars","broken_clouds":"Nuages fragmentés","shower_rain":"Averses","rain":"Pluie","thunderstorm":"Orage","snow":"Neige","mist":"Brouillard","light_rain":"Pluie légère"},"forecast":{"title":"Prévisions","today":"Aujourd\'hui","tomorrow":"Demain","next_days":"Jours suivants"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"hu",label:"Hungarian (Magyar)",locale:"hu-HU",translations:JSON.parse('{"common":{"title":"Időjárás","description":"Aktuális időjárási viszonyok és előrejelzés","settings":"Időjárás beállítások"},"conditions":{"all":"Minden időjárási körülmény","clouds":"Felhős","clear_sky":"Tiszta égbolt","few_clouds":"Kevés felhő","scattered_clouds":"Szórványos felhőzet","broken_clouds":"Szakadozott felhőzet","shower_rain":"Zápor","rain":"Eső","thunderstorm":"Zivatar","snow":"Hó","mist":"Köd","light_rain":"Gyenge eső"},"forecast":{"title":"Előrejelzés","today":"Ma","tomorrow":"Holnap","next_days":"Következő napok"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"it",label:"Italian (Italiano)",locale:"it-IT",translations:JSON.parse('{"common":{"title":"Meteo","description":"Condizioni meteorologiche attuali e previsioni","settings":"Impostazioni meteo"},"conditions":{"all":"Tutte le condizioni meteorologiche","clouds":"Nuvoloso","clear_sky":"Cielo sereno","few_clouds":"Poche nuvole","scattered_clouds":"Nuvole sparse","broken_clouds":"Nuvolosità variabile","shower_rain":"Rovesci di pioggia","rain":"Pioggia","thunderstorm":"Temporale","snow":"Neve","mist":"Nebbia","light_rain":"Pioggia leggera"},"forecast":{"title":"Previsioni","today":"Oggi","tomorrow":"Domani","next_days":"Prossimi giorni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"nl",label:"Dutch (Nederlands)",locale:"nl-NL",translations:JSON.parse('{"common":{"title":"Weer","description":"Huidige weersomstandigheden en voorspelling","settings":"Weerinstellingen"},"conditions":{"all":"Alle weersomstandigheden","clouds":"Bewolkt","clear_sky":"Heldere hemel","few_clouds":"Licht bewolkt","scattered_clouds":"Verspreide wolken","broken_clouds":"Gebroken bewolking","shower_rain":"Buien","rain":"Regen","thunderstorm":"Onweer","snow":"Sneeuw","mist":"Mist","light_rain":"Lichte regen"},"forecast":{"title":"Voorspelling","today":"Vandaag","tomorrow":"Morgen","next_days":"Volgende dagen"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"no",label:"Norwegian (Norsk)",locale:"no-NO",translations:JSON.parse('{"common":{"title":"Vær","description":"Gjeldende værforhold og prognose","settings":"Værinnstillinger"},"conditions":{"all":"Alle værforhold","clouds":"Overskyet","clear_sky":"Klar himmel","few_clouds":"Lettskyet","scattered_clouds":"Spredte skyer","broken_clouds":"Delvis skyet","shower_rain":"Regnbyger","rain":"Regn","thunderstorm":"Tordenvær","snow":"Snø","mist":"Tåke","light_rain":"Lett regn"},"forecast":{"title":"Prognose","today":"I dag","tomorrow":"I morgen","next_days":"Kommende dager"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pl",label:"Polish (Polski)",locale:"pl-PL",translations:JSON.parse('{"common":{"title":"Pogoda","description":"Aktualne warunki pogodowe i prognoza","settings":"Ustawienia pogody"},"conditions":{"all":"Wszystkie warunki pogodowe","clouds":"Zachmurzenie","clear_sky":"Czyste niebo","few_clouds":"Niewielkie zachmurzenie","scattered_clouds":"Rozproszone chmury","broken_clouds":"Zachmurzenie","shower_rain":"Przelotny deszcz","rain":"Deszcz","thunderstorm":"Burza","snow":"Śnieg","mist":"Mgła","light_rain":"Lekki deszcz"},"forecast":{"title":"Prognoza","today":"Dziś","tomorrow":"Jutro","next_days":"Następne dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"pt",label:"Portuguese (Português)",locale:"pt-PT",translations:JSON.parse('{"common":{"title":"Clima","description":"Condições meteorológicas atuais e previsão","settings":"Configurações do clima"},"conditions":{"all":"Todas as condições meteorológicas","clouds":"Nublado","clear_sky":"Céu limpo","few_clouds":"Poucas nuvens","scattered_clouds":"Nuvens dispersas","broken_clouds":"Nuvens fragmentadas","shower_rain":"Aguaceiros","rain":"Chuva","thunderstorm":"Trovoada","snow":"Neve","mist":"Névoa","light_rain":"Chuva fraca"},"forecast":{"title":"Previsão","today":"Hoje","tomorrow":"Amanhã","next_days":"Próximos dias"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ro",label:"Romanian (Română)",locale:"ro-RO",translations:JSON.parse('{"common":{"title":"Vremea","description":"Condiții meteorologice actuale și prognoză","settings":"Setări meteo"},"conditions":{"all":"Toate condițiile meteorologice","clouds":"Înnorat","clear_sky":"Cer senin","few_clouds":"Puțin înnorat","scattered_clouds":"Nori împrăștiați","broken_clouds":"Parțial înnorat","shower_rain":"Averse","rain":"Ploaie","thunderstorm":"Furtună","snow":"Ninsoare","mist":"Ceață","light_rain":"Ploaie ușoară"},"forecast":{"title":"Prognoză","today":"Astăzi","tomorrow":"Mâine","next_days":"Zilele următoare"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"ru",label:"Russian (Русский)",locale:"ru-RU",translations:JSON.parse('{"common":{"title":"Погода","description":"Текущие погодные условия и прогноз","settings":"Настройки погоды"},"conditions":{"all":"Все погодные условия","clouds":"Облачно","clear_sky":"Ясное небо","few_clouds":"Малооблачно","scattered_clouds":"Переменная облачность","broken_clouds":"Облачно с прояснениями","shower_rain":"Ливень","rain":"Дождь","thunderstorm":"Гроза","snow":"Снег","mist":"Туман","light_rain":"Небольшой дождь"},"forecast":{"title":"Прогноз","today":"Сегодня","tomorrow":"Завтра","next_days":"Следующие дни"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"м/с","mph":"миль/ч","kmh":"км/ч"}}}')},{code:"sk",label:"Slovak (Slovenčina)",locale:"sk-SK",translations:JSON.parse('{"common":{"title":"Počasie","description":"Aktuálne počasie a predpoveď","settings":"Nastavenia počasia"},"conditions":{"all":"Všetky poveternostné podmienky","clouds":"Oblačno","clear_sky":"Jasná obloha","few_clouds":"Malá oblačnosť","scattered_clouds":"Polojasno","broken_clouds":"Oblačno","shower_rain":"Prehánky","rain":"Dážď","thunderstorm":"Búrka","snow":"Sneženie","mist":"Hmla","light_rain":"Slabý dážď"},"forecast":{"title":"Predpoveď","today":"Dnes","tomorrow":"Zajtra","next_days":"Ďalšie dni"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')},{code:"sv",label:"Swedish (Svenska)",locale:"sv-SE",translations:JSON.parse('{"common":{"title":"Väder","description":"Aktuella väderförhållanden och prognos","settings":"Väderinställningar"},"conditions":{"all":"Alla väderförhållanden","clouds":"Molnigt","clear_sky":"Klar himmel","few_clouds":"Lätt molnighet","scattered_clouds":"Spridda moln","broken_clouds":"Växlande molnighet","shower_rain":"Regnskurar","rain":"Regn","thunderstorm":"Åska","snow":"Snö","mist":"Dimma","light_rain":"Lätt regn"},"forecast":{"title":"Prognos","today":"Idag","tomorrow":"Imorgon","next_days":"Kommande dagar"},"units":{"temperature":{"celsius":"°C","fahrenheit":"°F"},"wind":{"ms":"m/s","mph":"mph","kmh":"km/h"}}}')}],Jt=Object.fromEntries(Ht.map(t=>[t.code,t.translations]));let jt={};function Wt(){return Ht.map(t=>t.code)}function Bt(t){const e=Ht.find(e=>e.code===t);return(null==e?void 0:e.locale)||"en-US"}function Vt(t,e,i={},s){const o={...i};if(s&&(o.timeZone=s),"hidden"===o.weekday&&(o.weekday=void 0),"hidden"===o.year&&(o.year=void 0),"hidden"===o.month&&(o.month=void 0),"hidden"===o.day&&(o.day=void 0),void 0===o.weekday&&void 0===o.year&&void 0===o.month&&void 0===o.day)return"";const n=Bt(e);if("short"===o.month){const e=new Intl.DateTimeFormat(n,{month:"short",timeZone:s}).format(t),i={...o};delete i.month;let a=t.toLocaleDateString(n,i);return"2-digit"===o.day?(a=a.replace(/(\d+)[\.\/\-](\d+)\.?/,`$1. ${e}`),a.includes(e)||(a=`${a} ${e}`)):a=t.toLocaleDateString(n,o),a}return t.toLocaleDateString(n,o)}class Zt{constructor(t,e={}){this.logger=yt("clock-controller"),this._hours="",this._minutes="",this._seconds="",this._ampm="",this._currentDate="",this.config={},this.host=t,this.config=e,t.addController(this)}hostConnected(){this.logger.debug("ClockController host connected"),this.update(),this.intervalId=window.setInterval(()=>{this.update()},1e3)}hostDisconnected(){this.logger.debug("ClockController host disconnected"),this.intervalId&&(window.clearInterval(this.intervalId),this.intervalId=void 0)}updateConfig(t){this.logger.debug("Updating ClockController config:",t),this.config={...this.config,...t};const e=new Date,i=this.config.language||"cs",s=this.config.timeZone;this.updateTime(e,i,s),this.updateDate(e,i,s),this.host.requestUpdate()}update(){const t=new Date,e=this.config.language||"cs",i=this.config.timeZone;this.updateTime(t,e,i),0!==t.getSeconds()&&""!==this._currentDate||this.updateDate(t,e,i),this.host.requestUpdate()}updateTime(t,e,i){var s,o;let n,a,r;if(i){const o=void 0!==(null===(s=this.config.timeFormat)||void 0===s?void 0:s.hour12)&&this.config.timeFormat.hour12,l=function(t,e,i={},s){const o={...i};if(s&&(o.timeZone=s),"hidden"===o.weekday&&(o.weekday=void 0),"hidden"===o.year&&(o.year=void 0),"hidden"===o.month&&(o.month=void 0),"hidden"===o.day&&(o.day=void 0),"hidden"===o.hour&&(o.hour=void 0),"hidden"===o.minute&&(o.minute=void 0),"hidden"===o.second&&(o.second=void 0),void 0===o.weekday&&void 0===o.year&&void 0===o.month&&void 0===o.day&&void 0===o.hour&&void 0===o.minute&&void 0===o.second)return"";const n=Bt(e);return t.toLocaleString(n,o)}(t,e,{hour:"numeric",minute:"numeric",second:"numeric",hour12:o},i),c=l.split(":");if(o){const t=c[c.length-1];if(t.toLowerCase().includes("am")||t.toLowerCase().includes("pm")){const e=t.split(" ");r=parseInt(e[0],10),this._ampm=e[1].toUpperCase(),n=parseInt(c[0],10),a=parseInt(c[1],10)}else n=parseInt(c[0],10),a=parseInt(c[1],10),r=parseInt(c[2],10)}else n=parseInt(c[0],10),a=parseInt(c[1],10),r=parseInt(c[2],10)}else n=t.getHours(),a=t.getMinutes(),r=t.getSeconds();if(null===(o=this.config.timeFormat)||void 0===o?void 0:o.hour12){const t=n>=12;n%=12,n=n||12,this._ampm=t?"PM":"AM"}else this._ampm="";this._hours=n.toString().padStart(2,"0"),this._minutes=a.toString().padStart(2,"0"),this._seconds=r.toString().padStart(2,"0"),this.logger.debug(`Time updated - H:${this._hours} M:${this._minutes} S:${this._seconds}`)}updateDate(t,e,i){this.logger.debug(`Updating date with format: ${JSON.stringify(this.config.dateFormat)}, language: ${e}, timeZone: ${i||"default"}`);let s=Vt(t,e,this.config.dateFormat||{weekday:"long",month:"long",day:"numeric"},i);s=s.replace(/(\d+)(\s+)([A-Za-z])/,"$1,$2$3"),this._currentDate=s,this.logger.debug(`Date updated: ${this._currentDate}`)}get hours(){return this._hours}get minutes(){return this._minutes}get seconds(){return this._seconds}get ampm(){return this._ampm}get currentDate(){return this._currentDate}}var Kt=function(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let qt=class extends rt{constructor(){super(),this.logger=yt("clock-component"),this.clockController=new Zt(this,{timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}updated(t){if(super.updated(t),t.has("timeFormat")||t.has("dateFormat")||t.has("language")||t.has("timeZone")){if(this.logger.debug("Clock properties changed, updating ClockController"),t.has("timeFormat")){const e=t.get("timeFormat");this.logger.debug(`TimeFormat changed: ${JSON.stringify(e)} -> ${JSON.stringify(this.timeFormat)}`)}if(t.has("dateFormat")){const e=t.get("dateFormat");this.logger.debug(`DateFormat changed: ${JSON.stringify(e)} -> ${JSON.stringify(this.dateFormat)}`)}this.clockController.updateConfig({timeFormat:this.timeFormat,dateFormat:this.dateFormat,language:this.language,timeZone:this.timeZone})}}getHours(){return this.clockController.hours}getMinutes(){return this.clockController.minutes}getSeconds(){return this.clockController.seconds}getAmPm(){return this.clockController.ampm}getCurrentDate(){return this.clockController.currentDate}render(){var t,e;const i=this.getSeconds(),s=void 0!==(null===(t=this.timeFormat)||void 0===t?void 0:t.second)&&"hidden"!==(null===(e=this.timeFormat)||void 0===e?void 0:e.second);return this.logger.debug(`Rendering clock - Seconds: ${i}, Show seconds: ${s}, TimeFormat: ${JSON.stringify(this.timeFormat)}`),j`
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
        `}};qt.styles=a`
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
    `,Kt([gt({type:Object})],qt.prototype,"timeFormat",void 0),Kt([gt({type:Object})],qt.prototype,"dateFormat",void 0),Kt([gt({type:String})],qt.prototype,"fontColor",void 0),Kt([gt({type:String})],qt.prototype,"language",void 0),Kt([gt({type:String})],qt.prototype,"timeZone",void 0),qt=Kt([ct("ha-clock")],qt);const Gt=window,Yt=Gt.ShadowRoot&&(void 0===Gt.ShadyCSS||Gt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qt=Symbol(),Xt=new WeakMap;class te{constructor(t,e,i){if(this._$cssResult$=!0,i!==Qt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Yt&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=Xt.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Xt.set(e,t))}return t}toString(){return this.cssText}}const ee=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new te(i,t,Qt)},ie=Yt?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new te("string"==typeof t?t:t+"",void 0,Qt))(e)})(t):t;var se;const oe=window,ne=oe.trustedTypes,ae=ne?ne.emptyScript:"",re=oe.reactiveElementPolyfillSupport,le={toAttribute(t,e){switch(e){case Boolean:t=t?ae:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},ce=(t,e)=>e!==t&&(e==e||t==t),he={attribute:!0,type:String,converter:le,reflect:!1,hasChanged:ce},de="finalized";class ge extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=he){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||he}static finalize(){if(this.hasOwnProperty(de))return!1;this[de]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(ie(t))}else void 0!==t&&e.push(ie(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{Yt?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),s=Gt.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=he){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:le).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:le;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ce)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var ue;ge[de]=!0,ge.elementProperties=new Map,ge.elementStyles=[],ge.shadowRootOptions={mode:"open"},null==re||re({ReactiveElement:ge}),(null!==(se=oe.reactiveElementVersions)&&void 0!==se?se:oe.reactiveElementVersions=[]).push("1.6.3");const pe=window,me=pe.trustedTypes,fe=me?me.createPolicy("lit-html",{createHTML:t=>t}):void 0,ve="$lit$",ye=`lit$${(Math.random()+"").slice(9)}$`,we="?"+ye,_e=`<${we}>`,$e=document,be=()=>$e.createComment(""),Se=t=>null===t||"object"!=typeof t&&"function"!=typeof t,ke=Array.isArray,Ae="[ \t\n\f\r]",xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Ie=/>/g,Oe=RegExp(`>|${Ae}(?:([^\\s"'>=/]+)(${Ae}*=${Ae}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Ee=/'/g,Pe=/"/g,Ne=/^(?:script|style|textarea|title)$/i,De=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),Ue=De(1),Fe=(De(2),Symbol.for("lit-noChange")),Te=Symbol.for("lit-nothing"),Me=new WeakMap,Re=$e.createTreeWalker($e,129,null,!1);function Le(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==fe?fe.createHTML(e):e}class ze{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",a=xe;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===xe?"!--"===l[1]?a=Ce:void 0!==l[1]?a=Ie:void 0!==l[2]?(Ne.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=Oe):void 0!==l[3]&&(a=Oe):a===Oe?">"===l[0]?(a=null!=o?o:xe,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?Oe:'"'===l[3]?Pe:Ee):a===Pe||a===Ee?a=Oe:a===Ce||a===Ie?a=xe:(a=Oe,o=void 0);const d=a===Oe&&t[e+1].startsWith("/>")?" ":"";n+=a===xe?i+_e:c>=0?(s.push(r),i.slice(0,c)+ve+i.slice(c)+ye+d):i+ye+(-2===c?(s.push(void 0),e):d)}return[Le(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]})(t,e);if(this.el=ze.createElement(l,i),Re.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=Re.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(ve)||e.startsWith(ye)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+ve).split(ye),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Be:"?"===e[1]?Ze:"@"===e[1]?Ke:We})}else r.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(Ne.test(s.tagName)){const t=s.textContent.split(ye),e=t.length-1;if(e>0){s.textContent=me?me.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],be()),Re.nextNode(),r.push({type:2,index:++o});s.append(t[e],be())}}}else if(8===s.nodeType)if(s.data===we)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(ye,t+1));)r.push({type:7,index:o}),t+=ye.length-1}o++}}static createElement(t,e){const i=$e.createElement("template");return i.innerHTML=t,i}}function He(t,e,i=t,s){var o,n,a,r;if(e===Fe)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=Se(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=He(t,l._$AS(t,e.values),l,s)),e}class Je{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:$e).importNode(i,!0);Re.currentNode=o;let n=Re.nextNode(),a=0,r=0,l=s[0];for(;void 0!==l;){if(a===l.index){let e;2===l.type?e=new je(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new qe(n,this,t)),this._$AV.push(e),l=s[++r]}a!==(null==l?void 0:l.index)&&(n=Re.nextNode(),a++)}return Re.currentNode=$e,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class je{constructor(t,e,i,s){var o;this.type=2,this._$AH=Te,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=He(this,t,e),Se(t)?t===Te||null==t||""===t?(this._$AH!==Te&&this._$AR(),this._$AH=Te):t!==this._$AH&&t!==Fe&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>ke(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Te&&Se(this._$AH)?this._$AA.nextSibling.data=t:this.$($e.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=ze.createElement(Le(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new Je(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=Me.get(t.strings);return void 0===e&&Me.set(t.strings,e=new ze(t)),e}T(t){ke(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new je(this.k(be()),this.k(be()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class We{constructor(t,e,i,s,o){this.type=1,this._$AH=Te,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Te}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=He(this,t,e,0),n=!Se(t)||t!==this._$AH&&t!==Fe,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=He(this,s[i+a],e,a),r===Fe&&(r=this._$AH[a]),n||(n=!Se(r)||r!==this._$AH[a]),r===Te?t=Te:t!==Te&&(t+=(null!=r?r:"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===Te?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Be extends We{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Te?void 0:t}}const Ve=me?me.emptyScript:"";class Ze extends We{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Te?this.element.setAttribute(this.name,Ve):this.element.removeAttribute(this.name)}}class Ke extends We{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=He(this,t,e,0))&&void 0!==i?i:Te)===Fe)return;const s=this._$AH,o=t===Te&&s!==Te||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==Te&&(s===Te||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class qe{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){He(this,t)}}const Ge=pe.litHtmlPolyfillSupport;var Ye,Qe;null==Ge||Ge(ze,je),(null!==(ue=pe.litHtmlVersions)&&void 0!==ue?ue:pe.litHtmlVersions=[]).push("2.8.0");class Xe extends ge{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let a=n._$litPart$;if(void 0===a){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=a=new je(e.insertBefore(be(),t),t,void 0,null!=i?i:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Fe}}Xe.finalized=!0,Xe._$litElement$=!0,null===(Ye=globalThis.litElementHydrateSupport)||void 0===Ye||Ye.call(globalThis,{LitElement:Xe});const ti=globalThis.litElementPolyfillSupport;null==ti||ti({LitElement:Xe}),(null!==(Qe=globalThis.litElementVersions)&&void 0!==Qe?Qe:globalThis.litElementVersions=[]).push("3.3.3");const ei=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ii(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ei(t,e)}var si,oi,ni,ai;null===(si=window.HTMLSlotElement)||void 0===si||si.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information."),(ai=oi||(oi={})).language="language",ai.system="system",ai.comma_decimal="comma_decimal",ai.decimal_comma="decimal_comma",ai.space_comma="space_comma",ai.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ni||(ni={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var ri=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o};new Set(["call-service","divider","section","weblink","cast","select"]);var li=function(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ci=class extends Xe{constructor(){super(...arguments),this._sensors=[],this._backgroundImages=[],this._stops=[],this._timeFormatOptions={hour12:[{value:!0,label:"12-hour"},{value:!1,label:"24-hour"}],hour:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],minute:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"}],second:[{value:"numeric",label:"Numeric"},{value:"2-digit",label:"2-digit"},{value:"hidden",label:"Hidden"}]},this._dateFormatOptions={weekday:[{value:"long",label:"Long (Monday)"},{value:"short",label:"Short (Mon)"},{value:"narrow",label:"Narrow (M)"},{value:"hidden",label:"Hidden"}],month:[{value:"long",label:"Long (January)"},{value:"short",label:"Short (Jan)"},{value:"narrow",label:"Narrow (J)"},{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],day:[{value:"numeric",label:"Numeric (1)"},{value:"2-digit",label:"2-digit (01)"},{value:"hidden",label:"Hidden"}],year:[{value:"numeric",label:"Numeric (2025)"},{value:"2-digit",label:"2-digit (25)"},{value:"hidden",label:"Hidden"}]},this._imageSourceOptions=[{value:"none",label:"None (No Background Images)"},{value:"picsum",label:"Picsum Photos"},{value:"local",label:"Local Images"},{value:"unsplash",label:"Unsplash"},{value:"sensor",label:"Sensor Images"}],this._weatherProviderOptions=[{value:"none",label:"None (Disable Weather)"},{value:"openweathermap",label:"OpenWeatherMap"}],this._languageOptions=[],this._unitsOptions=[{value:"metric",label:"Metric (°C, m/s)"},{value:"imperial",label:"Imperial (°F, mph)"}],this._weatherDisplayModeOptions=[{value:"current",label:"Current Weather Only"},{value:"forecast",label:"Forecast Only"},{value:"both",label:"Current and Forecast"}]}connectedCallback(){super.connectedCallback(),this._languageOptions=Ht.map(t=>({value:t.code,label:t.label}))}_getTransportationProviderOptions(){return[...zt.getAllProviders().map(t=>({value:t.id,label:t.name}))]}setConfig(t){const e=t,i=e.imageSource||"none";let s={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};e.timeFormat&&(s={...s,...e.timeFormat},void 0===e.timeFormat.second&&(s.second=void 0)),this._config={...e,timeFormat:s,dateFormat:e.dateFormat||{weekday:"long",year:"numeric",month:"long",day:"numeric"},backgroundOpacity:void 0!==e.backgroundOpacity?e.backgroundOpacity:.3,imageSource:i,imageConfig:e.imageConfig||{},backgroundRotationInterval:e.backgroundRotationInterval||90,sensors:e.sensors||[],fontColor:e.fontColor||"#FFFFFF",showWeather:void 0!==e.showWeather&&e.showWeather,weatherProvider:e.weatherProvider||"openweathermap",weatherConfig:e.weatherConfig||{},weatherDisplayMode:e.weatherDisplayMode||"both",weatherForecastDays:e.weatherForecastDays||3,transportation:e.transportation||void 0},this._loadSensors(),this._loadBackgroundImages(),this._loadStops()}_loadSensors(){var t;(null===(t=this._config)||void 0===t?void 0:t.sensors)&&this._config.sensors.length>0?this._sensors=[...this._config.sensors]:this._sensors=[]}_loadStops(){var t;(null===(t=this._config)||void 0===t?void 0:t.transportation)&&this._config.transportation.stops&&this._config.transportation.stops.length>0?this._stops=[...this._config.transportation.stops]:this._stops=[]}_loadBackgroundImages(){var t;(null===(t=this._config)||void 0===t?void 0:t.backgroundImages)&&this._config.backgroundImages.length>0?this._backgroundImages=[...this._config.backgroundImages]:this._backgroundImages=[]}_addSensor(){if(this._sensors=[...this._sensors,{entity:"",label:""}],this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,ri(this,"config-changed",{config:t})}}_removeSensor(t){if(this._sensors=this._sensors.filter((e,i)=>i!==t),this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,ri(this,"config-changed",{config:t})}}_sensorChanged(t,e,i){if(this._sensors=this._sensors.map((s,o)=>o===t?{...s,[e]:i}:s),this._config){const t=JSON.parse(JSON.stringify(this._config));t.sensors=[...this._sensors],this._config=t,ri(this,"config-changed",{config:t})}}_addStop(){if(this._stops=[...this._stops,{stopId:1793,postId:3,name:""}],this._config){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],this._config=t,ri(this,"config-changed",{config:t})}}_removeStop(t){if(this._stops=this._stops.filter((e,i)=>i!==t),this._config&&this._config.transportation){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={provider:"idsjmk",stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],0===this._stops.length&&(t.transportation=void 0),this._config=t,ri(this,"config-changed",{config:t})}}_stopChanged(t,e,i){if(this._stops=this._stops.map((s,o)=>o===t?{...s,[e]:i}:s),this._config&&this._config.transportation){const t=JSON.parse(JSON.stringify(this._config));t.transportation||(t.transportation={stops:[],maxDepartures:2}),t.transportation.stops||(t.transportation.stops=[]),t.transportation.stops=[...this._stops],this._config=t,ri(this,"config-changed",{config:t})}}_addBackgroundImage(){this._backgroundImages=[...this._backgroundImages,{url:"",weather:bt.All,timeOfDay:$t.Unspecified}],this._updateBackgroundImagesConfig()}_removeBackgroundImage(t){this._backgroundImages=this._backgroundImages.filter((e,i)=>i!==t),this._updateBackgroundImagesConfig()}_updateBackgroundImage(t,e){this._backgroundImages=this._backgroundImages.map((i,s)=>{if(s===t){const t={...i,...e};if(e.url&&t.url){if(t.weather===bt.All){const e=xt(t.url,St);e&&(t.weather=e,wt.debug(`Auto-detected weather: ${t.weather} from URL: ${t.url}`))}if(t.timeOfDay===$t.Unspecified){const e=xt(t.url,kt);e&&(t.timeOfDay=e,wt.debug(`Auto-detected timeOfDay: ${t.timeOfDay} from URL: ${t.url}`))}}return t}return i}),this._updateBackgroundImagesConfig()}_updateBackgroundImagesConfig(){if(this._config){const t=JSON.parse(JSON.stringify(this._config));t.backgroundImages=[...this._backgroundImages],this._config=t,ri(this,"config-changed",{config:t})}}static get styles(){return ee`
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
        `}render(){var t,e,i,s,o,n,a,r,l,c,h,d,g,u,p,m,f,v,y,w,_,$,b,S,k;if(!this.hass||!this._config)return Ue``;const A=Object.keys(this.hass.states).sort();return Ue`
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
                                        @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.fontColor=e.value||"#FFFFFF",this._config=i,ri(this,"config-changed",{config:i})}}
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.language=e.value||"cs",this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._languageOptions.map(t=>Ue`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.logLevel=e.value||"warn",this._config=i,ri(this,"config-changed",{config:i})}}
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour12:"true"===e.value},this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.hour12.map(t=>Ue`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,hour:e.value},this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.hour.map(t=>Ue`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,minute:e.value},this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.minute.map(t=>Ue`
                                                <mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>`)}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Second Display</div>
                            <div class="value">
                                <ha-select
                                        label="Second Display"
                                        .value=${void 0===(null===(s=this._config.timeFormat)||void 0===s?void 0:s.second)?"undefined":null===(o=this._config.timeFormat)||void 0===o?void 0:o.second}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.timeFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.timeFormat={...i.timeFormat,second:"undefined"===e.value?"hidden":e.value},this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._timeFormatOptions.second.map(t=>Ue`
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
                                        .value=${(null===(n=this._config.dateFormat)||void 0===n?void 0:n.weekday)||"long"}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,weekday:"undefined"===e.value?"hidden":e.value},this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.weekday.map(t=>Ue`
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
                                        .value=${(null===(a=this._config.dateFormat)||void 0===a?void 0:a.month)||"long"}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,month:"undefined"===e.value?"hidden":e.value},this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.month.map(t=>Ue`
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
                                        .value=${void 0===(null===(r=this._config.dateFormat)||void 0===r?void 0:r.day)?"undefined":null===(l=this._config.dateFormat)||void 0===l?void 0:l.day}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,day:"undefined"===e.value?"hidden":e.value},this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.day.map(t=>Ue`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.dateFormat)return;const i=JSON.parse(JSON.stringify(this._config));i.dateFormat={...i.dateFormat,year:"undefined"===e.value?"hidden":e.value},this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._dateFormatOptions.year.map(t=>Ue`
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
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageSource=e.value,i.useOnlineImages="none"!==e.value&&"local"!==e.value,this._config=i,ri(this,"config-changed",{config:i})}}
                                >
                                    ${this._imageSourceOptions.map(t=>Ue`
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
                                        @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundOpacity="string"==typeof e.value?parseFloat(e.value):e.value,this._config=i,ri(this,"config-changed",{config:i})}}
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
                                        @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.backgroundRotationInterval="string"==typeof e.value?parseInt(e.value,10):e.value,this._config=i,ri(this,"config-changed",{config:i})}}
                                ></ha-slider>
                                <span>${this._config.backgroundRotationInterval||90} seconds</span>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                ${"local"===this._config.imageSource?Ue`
                    <!-- Background Images Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Local Background Images</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure local image URLs. Images will be automatically categorized by weather condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day (sunrise-sunset, day, night) in your file paths.
                            </div>

                            <div class="section-subheader">Background Images</div>

                            ${this._backgroundImages.map((t,e)=>Ue`
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
                                            ${Object.values(bt).map(t=>Ue`
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
                                            ${Object.values($t).map(t=>Ue`
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

                ${"unsplash"===this._config.imageSource?Ue`
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
                                            .value=${(null===(d=this._config.imageConfig)||void 0===d?void 0:d.category)||"nature"}
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.category=e.value||"nature",this._config=i,ri(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="info-text">
                                An API key is required for Unsplash to work properly.
                            </div>

                            ${Ue`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="API Key"
                                                .value=${(null===(g=this._config.imageConfig)||void 0===g?void 0:g.apiKey)||""}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.apiKey=e.value||"",this._config=i,ri(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${(null===(u=this._config.imageConfig)||void 0===u?void 0:u.contentFilter)||"high"}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.contentFilter=e.value||"high",this._config=i,ri(this,"config-changed",{config:i})}}
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

                ${"sensor"===this._config.imageSource?Ue`
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
                                        .value=${(null===(p=this._config.imageConfig)||void 0===p?void 0:p.entity)||""}
                                        @click=${t=>{t.stopPropagation()}}
                                        @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.imageConfig||(i.imageConfig={}),i.imageConfig.entity=e.value||"",this._config=i,ri(this,"config-changed",{config:i})}}
                                    >
                                        ${A.filter(t=>t.startsWith("sensor.")).map(t=>Ue`
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
                        ${this._sensors.map((t,e)=>Ue`
                            <div class="sensor-row">
                                <div class="sensor-entity">
                                    <ha-select
                                            label="Entity"
                                            .value=${t.entity||""}
                                            @click=${t=>{t.stopPropagation()}}
                                            @closed=${t=>{t.stopPropagation();const i=t.target;i&&this._sensorChanged(e,"entity",i.value||"")}}
                                    >
                                        ${A.map(t=>Ue`
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
                                        @change=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.showWeather=e.checked||!1,this._config=i,ri(this,"config-changed",{config:i})}}
                                ></ha-switch>
                                <span>Display weather forecast</span>
                            </div>
                        </div>

                        ${this._config.showWeather?Ue`
                            <div class="row">
                                <div class="label">Weather Title</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Title for weather section"
                                            .value=${this._config.weatherTitle||"Weather"}
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherTitle=e.value||"Weather",this._config=i,ri(this,"config-changed",{config:i})}}
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
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherProvider=e.value||"openweathermap",this._config=i,ri(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherProviderOptions.map(t=>Ue`
                                                    <mwc-list-item .value=${t.value}>${t.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"openweathermap"===this._config.weatherProvider?Ue`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="OpenWeatherMap API Key"
                                                .value=${(null===(m=this._config.weatherConfig)||void 0===m?void 0:m.apiKey)||""}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},apiKey:e.value||""},this._config=i,ri(this,"config-changed",{config:i})}}
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
                                                .value=${(null===(f=this._config.weatherConfig)||void 0===f?void 0:f.latitude)||50.0755}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},latitude:parseFloat(e.value||"50.0755")},this._config=i,ri(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <ha-textfield
                                                label="Longitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${(null===(v=this._config.weatherConfig)||void 0===v?void 0:v.longitude)||14.4378}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},longitude:parseFloat(e.value||"14.4378")},this._config=i,ri(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                    </div>
                                </div>

                            `:""}

                            ${"openweathermap"===this._config.weatherProvider?Ue`
                                <div class="row">
                                    <div class="label">Units</div>
                                    <div class="value">
                                        <ha-select
                                                label="Units"
                                                .value=${(null===(y=this._config.weatherConfig)||void 0===y?void 0:y.units)||"metric"}
                                                @click=${t=>{t.stopPropagation()}}
                                                @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherConfig={...i.weatherConfig||{},units:e.value||"metric"},this._config=i,ri(this,"config-changed",{config:i})}}
                                        >
                                            ${this._unitsOptions.map(t=>Ue`
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
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherDisplayMode=e.value||"both",this._config=i,ri(this,"config-changed",{config:i})}}
                                    >
                                        ${this._weatherDisplayModeOptions.map(t=>Ue`
                                                    <mwc-list-item .value=${t.value}>${t.label}
                                                    </mwc-list-item>`)}
                                    </ha-select>
                                </div>
                            </div>

                            ${"forecast"===this._config.weatherDisplayMode||"both"===this._config.weatherDisplayMode?Ue`
                                <div class="row">
                                    <div class="label">Forecast Days</div>
                                    <div class="value">
                                        <ha-slider
                                                min="1"
                                                max="7"
                                                step="1"
                                                pin
                                                .value=${this._config.weatherForecastDays||3}
                                                @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));i.weatherForecastDays="string"==typeof e.value?parseInt(e.value,10):e.value,this._config=i,ri(this,"config-changed",{config:i})}}
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
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof e.value?parseInt(e.value,10):e.value;s=Math.max(s||30,1);const o=60*s;i.weatherUpdateInterval=o,this._config=i,ri(this,"config-changed",{config:i})}}
                                        ></ha-textfield>
                                        <span>minutes</span>
                                    </div>
                                </div>
                            `:""}
                        `:""}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${!0===this._config.enableTransportation?Ue`
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
                                            @closed=${t=>{t.stopPropagation();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,provider:e.value||"idsjmk"},this._config=i,ri(this,"config-changed",{config:i})}}
                                    >
                                        ${this._getTransportationProviderOptions().map(t=>Ue`
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
                                            @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,maxDepartures:"string"==typeof e.value?parseInt(e.value,10):e.value},this._config=i,this._loadStops(),ri(this,"config-changed",{config:i})}}
                                    ></ha-slider>
                                    <span>${(null===($=this._config.transportation)||void 0===$?void 0:$.maxDepartures)||2} departures</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Show on Demand</div>
                                <div class="value">
                                    <ha-switch
                                            .checked=${!0===(null===(b=this._config.transportation)||void 0===b?void 0:b.onDemand)}
                                            @change=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));i.transportation={...i.transportation,onDemand:e.checked},this._config=i,ri(this,"config-changed",{config:i})}}
                                    ></ha-switch>
                                    <span>Only show departures when clicked</span>
                                </div>
                            </div>

                            ${!0===(null===(S=this._config.transportation)||void 0===S?void 0:S.onDemand)?Ue`
                                <div class="row">
                                    <div class="label">Auto-Hide Timeout</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Auto-hide timeout in minutes (1-10)"
                                                type="number"
                                                min="1"
                                                max="10"
                                                .value=${(null===(k=this._config.transportation)||void 0===k?void 0:k.autoHideTimeout)||5}
                                                @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof e.value?parseInt(e.value,10):e.value;s=Math.max(Math.min(s||5,10),1),i.transportation={...i.transportation,autoHideTimeout:s},this._config=i,ri(this,"config-changed",{config:i})}}
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
                                            @input=${t=>{t.stopPropagation(),t.preventDefault();const e=t.target;if(!e||!this._config||!this._config.transportation)return;const i=JSON.parse(JSON.stringify(this._config));let s="string"==typeof e.value?parseInt(e.value,10):e.value;s=Math.max(s||1,1);const o=60*s;i.transportationUpdateInterval=o,this._config=i,ri(this,"config-changed",{config:i})}}
                                    ></ha-textfield>
                                    <span>minutes</span>
                                </div>
                            </div>

                            <div class="section-subheader">Stops</div>

                            ${this._stops.map((t,e)=>Ue`
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
        `}};li([ii({type:Object})],ci.prototype,"hass",void 0),li([ii({type:Object})],ci.prototype,"_config",void 0),li([ii({type:Array})],ci.prototype,"_sensors",void 0),li([ii({type:Array})],ci.prototype,"_backgroundImages",void 0),li([ii({type:Array})],ci.prototype,"_stops",void 0),ci=li([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("wall-clock-card-editor")],ci);var hi=function(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let di=class extends rt{constructor(){super(),this.config={},this.currentImageUrl="",this.previousImageUrl="",this.isTransitioning=!1,this.sensorValues=[],this.consecutiveFailures=0,this.isRetrying=!1,this.weatherLoading=!1,this.weatherError=!1,this.weatherErrorMessage="",this.transportationData={departures:[],loading:!1},this.transportationDataLoaded=!1,this.fetchingImageUrls=!1,this.backgroundImageManager=new Ut,this.clockComponent=document.createElement("ha-clock"),wt.info("%c WALL-CLOCK-CARD %c 2.0.0 ","color: white; background: #3498db; font-weight: 700;","color: #3498db; background: white; font-weight: 700;"),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language,this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor}connectedCallback(){super.connectedCallback(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.initConnectCallbackAsync()}async initConnectCallbackAsync(){var t;var e;e={level:function(t){switch(t.toLowerCase()){case"debug":return ut.DEBUG;case"info":return ut.INFO;case"warn":default:return ut.WARN;case"error":return ut.ERROR;case"none":return ut.NONE}}(this.config.logLevel||"info"),prefix:"wall-clock",enableSourceTracking:!0,enableTimestamps:!0,logToConsole:!0,logToStorage:!1},mt={...pt,...e};try{await async function(){wt.debug("Loading all translations");const t=Wt().map(t=>async function(t){try{Jt[t]?(jt[t]=Jt[t],wt.debug(`Loaded translations for ${t}`)):wt.warn(`No embedded translations found for ${t}`)}catch(e){wt.error(`Error loading translations for ${t}: ${e}`)}}(t));await Promise.all(t)}(),wt.debug("Loaded translations for all languages")}catch(t){wt.error("Error loading translations:",t)}if(this.config.showWeather){await this.fetchWeatherDataAsync();let t=this.config.weatherUpdateInterval||1800;t=Math.max(t,60);const e=1e3*t;wt.debug(`Setting weather update interval to ${t} seconds`),this.weatherUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchWeatherDataAsync()}catch(t){wt.error("Error in weather update interval:",t)}})()},e)}if(await this.initBackgroundImageManagerAsync(),this.config.transportation)if(null===(t=this.config.transportation)||void 0===t?void 0:t.onDemand)wt.debug("Transportation on-demand loading is enabled. Data will be loaded when requested.");else{await this.fetchTransportationDataAsync(),this.transportationDataLoaded=!0;let t=this.config.transportationUpdateInterval||60;t=Math.max(t,60);const e=1e3*t;wt.info(`Setting transportation update interval to ${t} seconds`),this.transportationUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(t){wt.error("Error in transportation update interval:",t)}})()},e)}}async initBackgroundImageManagerAsync(){var t,e;if(!this.fetchingImageUrls){this.fetchingImageUrls=!0;try{let i=(null===(e=null===(t=this.weatherData)||void 0===t?void 0:t.current)||void 0===e?void 0:e.conditionUnified)||bt.All,s=At();wt.debug(`Current weather: ${i}, time of day: ${s}`);const o={...this.config.imageConfig||{},backgroundImages:this.config.backgroundImages,imageSourceId:this.config.imageSource};if(wt.debug(`Initializing BackgroundImageManager with imageSourceId: ${this.config.imageSource||"not set (will use default picsum)"}`),!this.backgroundImageManager.initialize(o))return void wt.warn("Failed to initialize BackgroundImageManager");this.setupImageRotation(),await this.fetchNewImageAsync()}catch(t){wt.error("Error fetching image URLs:",t)}finally{this.fetchingImageUrls=!1}}}setupImageRotation(){this.imageRotationTimer&&clearInterval(this.imageRotationTimer);const t=1e3*(this.config.backgroundRotationInterval||90);wt.info(`Setting up image rotation with interval: ${t/1e3} seconds`),this.imageRotationTimer=window.setInterval(()=>{(async()=>{try{await this.fetchNewImageAsync()}catch(t){wt.error(`Error in image rotation interval for ${this.config.imageSource}:`,t)}})()},t)}async fetchNewImageAsync(){var t,e;try{let i=(null===(e=null===(t=this.weatherData)||void 0===t?void 0:t.current)||void 0===e?void 0:e.conditionUnified)||bt.All,s=At();const o=await this.backgroundImageManager.getNextImageUrlAsync(i,s);if(o){wt.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`),wt.debug(`Loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`);const t=new Image;t.onload=()=>{wt.info(`New image loaded successfully: ${o}`),this.currentImageUrl&&(this.previousImageUrl=this.currentImageUrl,this.isTransitioning=!0,setTimeout(()=>{this.isTransitioning=!1,this.requestUpdate()},1e3)),this.currentImageUrl=o,this.requestUpdate()},t.onerror=()=>{wt.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${o}`)},t.src=o}else wt.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`)}catch(t){wt.error("Error fetching new dynamic image:",t)}}disconnectedCallback(){super.disconnectedCallback(),this.imageRotationTimer&&clearInterval(this.imageRotationTimer),this.weatherUpdateTimer&&clearInterval(this.weatherUpdateTimer),this.transportationUpdateTimer&&clearInterval(this.transportationUpdateTimer),this.transportationAutoHideTimer&&clearTimeout(this.transportationAutoHideTimer)}async fetchTransportationDataAsync(){if(this.config.transportation&&!1!==this.config.enableTransportation){this.transportationData={...this.transportationData,loading:!0,error:void 0};try{const e=this.config.transportation;e.provider||(e.provider="idsjmk");const i=(t=e.provider,zt.getProvider(t));if(!i)throw new Error(`Transportation provider '${e.provider}' not found`);const s=e.stops.map(t=>({stopId:t.stopId,postId:t.postId,name:t.name})),o=e.providerConfig||{};void 0!==e.maxDepartures&&(o.maxDepartures=e.maxDepartures),this.transportationData=await i.fetchTransportationAsync(o,s),this.lastTransportationUpdate=new Date,wt.debug(`Fetched transportation data from ${i.name}:`,this.transportationData)}catch(t){wt.error("Error fetching transportation data:",t),this.transportationData={departures:[],error:t instanceof Error?t.message:String(t),loading:!1}}var t}}async fetchWeatherDataAsync(){if(!this.weatherLoading&&this.config.showWeather){wt.debug("Begin fetch weather data"),this.weatherLoading=!0,this.weatherError=!1,this.weatherErrorMessage="";try{const e=this.config.weatherProvider||"openweathermap",i=(t=e,Mt.getProvider(t));if(!i)throw new Error(`Weather provider '${e}' not found`);let s=i.getDefaultConfig();this.config.weatherConfig&&(s={...s,...this.config.weatherConfig},this.config.weatherConfig.units&&(s.units=this.config.weatherConfig.units,wt.debug(`Using weather units: ${s.units}`))),this.weatherData=await i.fetchWeatherAsync(s),wt.info(`Fetched weather data from ${i.name}:`,this.weatherData)}catch(t){this.weatherError=!0,this.weatherErrorMessage=t instanceof Error?t.message:String(t),wt.error("Error fetching weather data:",t)}finally{this.weatherLoading=!1}var t}}static getConfigElement(){return document.createElement("wall-clock-card-editor")}getCardSize(){return 4}static getStubConfig(){return{timeFormat:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1},dateFormat:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.initAfterSetConfigAsync(t)}async initAfterSetConfigAsync(t){const e=t.imageSource||"none";let i={hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};t.timeFormat&&(i={...i,...t.timeFormat},void 0!==t.timeFormat.hour12&&(i.hour12=Boolean(t.timeFormat.hour12)),void 0===t.timeFormat.second&&(i.second=void 0));let s={weekday:"long",year:"numeric",month:"long",day:"numeric"};t.dateFormat&&(s={...s,...t.dateFormat},void 0===t.dateFormat.year&&(s.year=void 0));let o=t.timeZone;!o&&this.hass&&this.hass.config&&this.hass.config.time_zone&&(o=this.hass.config.time_zone),this.config={...t,timeFormat:i,dateFormat:s,backgroundOpacity:void 0!==t.backgroundOpacity?t.backgroundOpacity:.3,imageSource:e,imageConfig:t.imageConfig||{},backgroundRotationInterval:t.backgroundRotationInterval||90,sensors:t.sensors||[],fontColor:t.fontColor||"#FFFFFF",timeZone:o},this.currentImageUrl="",this.config.showWeather&&await this.fetchWeatherDataAsync(),await this.initBackgroundImageManagerAsync(),this.clockComponent.timeFormat=this.config.timeFormat,this.clockComponent.dateFormat=this.config.dateFormat,this.clockComponent.language=this.config.language||(this.hass?this.hass.language:null)||"cs",this.clockComponent.timeZone=this.config.timeZone,this.clockComponent.fontColor=this.config.fontColor,this.hass&&this.config.sensorEntity&&this.updateSensorValue()}updated(t){t.has("hass")&&this.config.sensors&&this.config.sensors.length>0&&this.updateSensorValue()}updateSensorValue(){this.hass&&(this.sensorValues=[],this.config.sensors&&this.config.sensors.length>0&&this.config.sensors.forEach(t=>{if(t.entity&&this.hass.states[t.entity]){const e=this.hass.states[t.entity];let i=e.state;e.attributes&&e.attributes.unit_of_measurement&&(i+=` ${e.attributes.unit_of_measurement}`),this.sensorValues.push({entity:t.entity,label:t.label,value:i})}else t.entity&&this.sensorValues.push({entity:t.entity,label:t.label,value:"unavailable"})}))}static get styles(){return a`
            /* Include ClockComponent styles */
            ${n(qt.styles)}
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

            .background-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: 0;
                border-radius: var(--ha-card-border-radius, 4px);
                transition: opacity 1s ease-in-out;
                opacity: 1; /* Default state: fully visible */
            }

            /* During transition, previous image starts visible and fades out */
            .transitioning .background-image.previous {
                opacity: 0; /* End state: fully transparent */
                z-index: 0.5; /* Between the background and the overlay */
            }

            /* New image starts invisible and fades in */
            .transitioning .background-image:not(.previous) {
                opacity: 0; /* Start state: fully transparent */
                animation: fadeIn 1s forwards; /* Use animation to ensure it ends at opacity 1 */
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .background-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #000000;
                z-index: 1;
                border-radius: var(--ha-card-border-radius, 4px);
            }



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
                font-size: 1.5rem;
                font-weight: 300;
                opacity: 0.8;
            }

            .sensor-value {
                font-size: 2.5rem;
                font-weight: 400;
            }

            /* Weather display styles */

            .weather-container {
                position: absolute;
                top: 16px;
                right: 16px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                z-index: 3;
                max-width: 40%;
                max-height: 60%;
                overflow-y: auto;
                padding-left: 8px;
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

                .stop-group {
                    margin-bottom: 16px;
                }
            }
        `}render(){var t;return j`
            <ha-card style="color: ${this.config.fontColor};" class="${this.isTransitioning?"transitioning":""}">
                ${this.currentImageUrl?j`
                            ${this.isTransitioning&&this.previousImageUrl?j`
                                    <img
                                            class="background-image previous"
                                            src="${this.previousImageUrl}"
                                            @error="${t=>wt.error("Error rendering previous background image:",this.previousImageUrl,t)}"
                                    >
                                `:""}
                            <img
                                    class="background-image"
                                    src="${this.currentImageUrl}"
                                    @load="${()=>wt.debug("Background image rendered successfully:",this.currentImageUrl)}"
                                    @error="${t=>wt.error("Error rendering background image:",this.currentImageUrl,t)}"
                            >
                            <div
                                    class="background-overlay"
                                    style="opacity: ${void 0!==this.config.backgroundOpacity?this.config.backgroundOpacity:.5};"
                            ></div>
                        `:""}
                ${this.sensorValues.length>0?j`
                            <div class="sensor-container" style="color: ${this.config.fontColor};">
                                ${this.sensorValues.map(t=>j`
                                    <div class="sensor-item">
                                        ${t.label?j`
                                                    <div class="sensor-label" style="color: ${this.config.fontColor};">
                                                        ${t.label}
                                                    </div>`:""}
                                        <div class="sensor-value" style="color: ${this.config.fontColor};">
                                            ${t.value}
                                        </div>
                                    </div>
                                `)}
                            </div>`:""}
                ${this.config.showWeather&&this.weatherData?j`
                            <div class="weather-container" style="color: ${this.config.fontColor};">
                                ${this.renderWeatherContent()}
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
        `}renderWeatherContent(){if(this.weatherError)return j`
                <div class="weather-error">${this.weatherErrorMessage}</div>`;if(!this.weatherData||!this.weatherData.current)return j`
                <div class="weather-loading">Loading weather data...</div>`;const t=this.config.weatherDisplayMode||"both",e=this.config.weatherForecastDays||3,i=this.config.weatherTitle||"Weather",s=Math.min(e,this.weatherData.daily.length);return j`
            <div class="weather-title" style="color: ${this.config.fontColor};">${i}</div>

            ${"current"===t||"both"===t?j`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${this.weatherData.current.icon}"
                                     alt="${this.weatherData.current.condition}">
                                <div class="weather-temp">${Math.round(this.weatherData.current.temperature)}°</div>
                            </div>
                            <div class="weather-condition">
                                ${this.translateWeatherCondition(this.weatherData.current.condition)}
                            </div>
                        </div>
                    `:""}

            ${"forecast"===t||"both"===t?j`
                        <div class="weather-forecast">
                            ${this.weatherData.daily.slice(0,s).map(t=>j`
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
        `}async _handleTransportationClickAsync(){var t;if(wt.debug("Transportation button clicked, loading data on demand"),await this.fetchTransportationDataAsync(),this.transportationDataLoaded=!0,this.config.transportationUpdateInterval){let t=this.config.transportationUpdateInterval||60;t=Math.max(t,60);const e=1e3*t;wt.debug(`Setting transportation update interval to ${t} seconds`),this.transportationUpdateTimer&&clearInterval(this.transportationUpdateTimer),this.transportationUpdateTimer=window.setInterval(()=>{(async()=>{try{await this.fetchTransportationDataAsync()}catch(t){wt.error("Error in transportation update interval:",t)}})()},e)}if(null===(t=this.config.transportation)||void 0===t?void 0:t.autoHideTimeout){this.transportationAutoHideTimer&&clearTimeout(this.transportationAutoHideTimer);let t=this.config.transportation.autoHideTimeout||5;t=Math.max(1,Math.min(10,t));const e=60*t*1e3;wt.debug(`Setting transportation auto-hide timeout to ${t} minutes`),this.transportationAutoHideTimer=window.setTimeout(()=>{wt.debug(`Auto-hiding transportation departures after ${t} minutes`),this.transportationDataLoaded=!1},e)}}translateWeatherCondition(t){const e=this.config.language||(this.hass?this.hass.language:null)||"cs",i=function(t,e,i=t){if(!Wt().includes(e))return null!==i?i:t;const s=jt[e];if(!s)return null!==i?i:t;const o=function(t,e){if(void 0!==t[e])return t[e];const i=e.split(".");let s=t;for(const t of i){if(null==s||"object"!=typeof s)return;s=s[t]}return s}(s,t);return"string"==typeof o?o:null!==i?i:t}(`conditions.${t.toLowerCase().replace(/ /g,"_")}`,e,null);return null!==i?i:t}formatForecastDate(t){return Vt(t,this.config.language||(this.hass?this.hass.language:null)||"cs",{weekday:"short"})}};hi([gt({type:Object})],di.prototype,"hass",void 0),hi([gt({type:Object})],di.prototype,"config",void 0),hi([gt({type:String})],di.prototype,"currentImageUrl",void 0),hi([gt({type:String})],di.prototype,"previousImageUrl",void 0),hi([gt({type:Boolean})],di.prototype,"isTransitioning",void 0),hi([gt({type:Array})],di.prototype,"sensorValues",void 0),hi([gt({type:Number})],di.prototype,"consecutiveFailures",void 0),hi([gt({type:Boolean})],di.prototype,"isRetrying",void 0),hi([gt({type:Object})],di.prototype,"weatherData",void 0),hi([gt({type:Boolean})],di.prototype,"weatherLoading",void 0),hi([gt({type:Boolean})],di.prototype,"weatherError",void 0),hi([gt({type:String})],di.prototype,"weatherErrorMessage",void 0),hi([gt({type:Object})],di.prototype,"transportationData",void 0),hi([gt({type:Date})],di.prototype,"lastTransportationUpdate",void 0),hi([gt({type:Boolean})],di.prototype,"transportationDataLoaded",void 0),di=hi([ct("wall-clock-card")],di),window.customCards=window.customCards||[],window.customCards.push({type:"wall-clock-card",name:"Wall Clock Card",description:"A card that displays a clock with seconds and the current date"})})();
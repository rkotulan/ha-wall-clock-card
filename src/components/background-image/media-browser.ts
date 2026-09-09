import {css, html, LitElement, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import type {HomeAssistant} from 'custom-card-helpers';
import {MediaItem, mediaImages} from '../../image-sources/media-source';
import {localize} from '../../utils/localize';

@customElement('wcc-media-browser')
export class WccMediaBrowser extends LitElement {
    @property({attribute: false}) hass?: HomeAssistant;
    @property() selected = '';
    @property() selectedTitle = '';
    @state() private current?: MediaItem;
    @state() private history: string[] = [];
    @state() private busy = false;
    @state() private error = false;
    private request = 0;
    private browseTarget = '';

    private t(key: string, fallback: string): string {
        return localize(`editor.background.${key}`, this.hass, fallback);
    }

    updated(changed: PropertyValues): void {
        if (this.hass && (changed.has('selected') || (!this.current && !this.error && !this.busy && changed.has('hass')))) {
            void this.browse(this.selected || '', false);
        }
    }

    disconnectedCallback(): void { this.request++; this.busy = false; super.disconnectedCallback(); }

    private async browse(id: string, push = true): Promise<void> {
        if (!this.hass) return;
        const request = ++this.request;
        this.browseTarget = id;
        this.busy = true;
        this.error = false;
        try {
            const result = await this.hass.callWS<MediaItem>({
                type: 'media_source/browse_media', ...(id ? {media_content_id: id} : {}),
            });
            if (request !== this.request) return;
            if (push && this.current) this.history = [...this.history, this.current.media_content_id];
            this.current = result;
        } catch {
            if (request === this.request) this.error = true;
        } finally { if (request === this.request) this.busy = false; }
    }

    private select(): void {
        if (!this.current || this.busy || this.error) return;
        this.dispatchEvent(new CustomEvent('media-selected', {
            detail: {id: this.current.media_content_id, title: this.current.title},
            bubbles: true, composed: true,
        }));
    }

    static styles = css`
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
    `;

    render() {
        const folders = this.current?.children?.filter(item => item.can_expand) ?? [];
        const count = this.current ? mediaImages(this.current).length : 0;
        return html`<div class="box">
            <p>${this.t('media_help', 'Choose an album or folder. Only its photos are used; subfolders and videos are skipped. Configure Immich in Home Assistant first.')}</p>
            ${this.selected ? html`<p>${this.t('media_selected', 'Selected')}: ${this.selectedTitle || this.selected}</p>` : ''}
            <div class="nav">
                <button type="button" ?disabled=${this.busy} @click=${() => { this.history = []; void this.browse('', false); }}>${this.t('media_root', 'All media')}</button>
                <button type="button" ?disabled=${this.busy || !this.history.length} @click=${() => {
                    const previous = this.history[this.history.length - 1];
                    this.history = this.history.slice(0, -1); void this.browse(previous, false);
                }}>${this.t('media_back', 'Back')}</button>
            </div>
            ${this.busy ? html`<p role="status">${this.t('media_loading', 'Loading media…')}</p>` : ''}
            ${this.error ? html`<p class="error" role="alert">${this.t('media_error', 'Could not load media. Check the integration and its permissions.')}</p>
                <button type="button" @click=${() => this.browse(this.browseTarget, false)}>${this.t('media_retry', 'Retry')}</button>` : ''}
            ${this.current && !this.busy && !this.error ? html`
                <h4>${this.current.title}</h4>
                <div class="folders">${folders.map(folder => html`<button type="button" @click=${() => this.browse(folder.media_content_id)}>📁 ${folder.title}</button>`)}</div>
                <p>${this.t('media_photo_count', 'Photos in this folder')}: ${count}</p>
                <button class="select" type="button" ?disabled=${count === 0} @click=${this.select}>${this.t('media_use', 'Use this album / folder')}</button>
            ` : ''}
        </div>`;
    }
}

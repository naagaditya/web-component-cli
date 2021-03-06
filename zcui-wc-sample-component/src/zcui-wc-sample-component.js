import { html, render } from '../../../../lib/lit-extended.js';
import { repeat } from '../../../../lib/repeat.js';

class ZcuiWcSampleComponent extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
  }

  get htmlTemplate() {
    return html`
      <style>
        <%- style %>
      </style>
      <%- html %>
    `;
  }

  createShadowDom() {
    this.attachShadow({ mode: 'open' });
    this.updateShadowDom();
  }

  updateShadowDom() {
    if (this.shadowRoot) {
      render(this.htmlTemplate, this.shadowRoot);
    }
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal != newVal) {
      this.setProps();
      this.updateShadowDom();
    }
  }

  setProps() {
    
  }

  connectedCallback() {
    this.createShadowDom();
  }
}

window.customElements.define('zcui-wc-sample-component', ZcuiWcSampleComponent);

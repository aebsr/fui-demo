
export default (async () => {
    const templates = await fetch('./fool/button/template.html');
    const textTemplate = await templates.text();
    let template, labelEl, buttonEl;

    class TmfButton extends HTMLElement {
        constructor() {
            super();
            
            const isLink = this.getAttribute('href'); 
            if (isLink) {
                template = new DOMParser()
                    .parseFromString(textTemplate, 'text/html')
                    .querySelector('#tmf-button-a');
            } else {
                template = new DOMParser()
                    .parseFromString(textTemplate, 'text/html')
                    .querySelector('#tmf-button');
            }

            labelEl = template.content.querySelector('.tmf-button_label')
            buttonEl = template.content.querySelector('.tmf-button')
        }

        connectedCallback() {
            labelEl.innerText = this.label;
            buttonEl.classList.add(`tmf-button_${this.kind}`);
            buttonEl.classList.add(`tmf-button_${this.small}`);
            this.appendChild(template.content.cloneNode(true));
        }

        attributeChangedCallback(attr, oldVal, newVal) {
            if(oldVal != newVal && oldVal != null) {
                template = this;
                this.innerHTML = '';
                this.appendChild(template.cloneNode(false));
            }
        }

        static get observedAttributes() {
            return ['label', 'kind', 'small']; 
        }

        get label() {            
            return this.getAttribute('label');
        }

        get kind() {            
            return this.getAttribute('kind');
        }

        get small() {            
            return this.hasAttribute('small') ? 'small' : null;
        }
    }

    customElements.define('tmf-button', TmfButton);
})();

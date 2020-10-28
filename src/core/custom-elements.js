import { WINDOW_VARIABLE, CONTEXT_ATTRIBUTE, STARTED_FETCH, FINISHED_FETCH, CUSTOM_ELEMENT_TAG } from "../shared/constants";

class RollCakeMicrofrontend extends HTMLElement {
    constructor() {
        super();

        // strictly internal
        this._context =  window[WINDOW_VARIABLE.MF_BROKER];
    }

    get name() {
        return this.getAttribute("name") || "";
    }

    connectedCallback() {
        requestAnimationFrame(() => {
            const buckets = this._context[CONTEXT_ATTRIBUTE.BUCKETS];
            if (!buckets)
                return
            const bucket = buckets.find(b => b.name === this.name);
            if (!bucket)
                return
            const frameElement = document.createElement('iframe');
            frameElement.sandbox.add("allow-same-origin");
            frameElement.sandbox.add("allow-scripts");
            frameElement.sandbox.add("allow-popups");
            frameElement.sandbox.add("allow-forms");
            frameElement.frameBorder = 0;
            this.appendChild(frameElement);
            const { contentWindow, contentDocument } = frameElement;
            if (!contentDocument || !contentWindow) 
                return;
            const containerHTMLDocument = document.implementation.createHTMLDocument();
            
            STARTED_FETCH.next();
            fetch(bucket.address, { mode: "cors", referrerPolicy: "origin-when-cross-origin"})
            .then(async (response) => {
                const containerHTML = await response.text();
    
                if (containerHTML) {
                    containerHTMLDocument.documentElement.innerHTML = containerHTML;
                    const containerBase = document.createElement("base");
                    containerBase.href = bucket.address;
                    containerHTMLDocument.head.insertAdjacentElement("afterbegin", containerBase);
                    if (contentWindow) {
                        Object.defineProperty(contentWindow, WINDOW_VARIABLE.MF_BROKER, { value: this._context });
                    }
                    if (contentDocument) {
                        contentDocument.write(containerHTMLDocument.documentElement.innerHTML);
                        contentDocument.close();
                    }
                }
                return;
            })
            .catch(() => {
                return;
            })
            .finally(() => {
                FINISHED_FETCH.next();
                return;
            });
        });
    }

    disconnectedCallback() {
    }
}

customElements.define(CUSTOM_ELEMENT_TAG.MICROFRONTEND, RollCakeMicrofrontend);
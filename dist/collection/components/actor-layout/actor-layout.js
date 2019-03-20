export class ActorLayout {
    constructor() {
        /**
         *  Add a notification slot at given position.
         *  <br>
         *  Can be used with alert-styled components like bootstrap's '.alert'.
         *  <br><br>
         *  Possible values:
         *  <br>
         *  <pre>'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'top-center', 'bottom-center'</pre>
         * */
        this.alerts = null;
        /**
         *  Add an overlay slot. Can be used to show modal dialogues.
         *  <br><br>
         *  Accepts: <pre>a css color value, i.e. #CCCCCC </pre>
         * */
        this.overlay = null;
        /**
         *  Add a sidebar slot.
         *  <br><br>
         *  Possible values: <pre>'fixed', 'default'</pre>
         * */
        this.sidebar = null;
        /**
         *  Add a header slot.
         *  <br><br>
         *  Possible values: <pre>'fixed', 'full', 'default'</pre>
         *  When header is 'full' it assumes 100% window width and moves sidebar under header
         * */
        this.header = null;
        /**
         *  Add a footer slot.
         *  <br><br>
         *  Possible values: <pre>'fixed', 'full', 'default'</pre>
         *  When footer is 'full' it assumes 100% window width and moves sidebar atop footer
         * */
        this.footer = null;
    }
    setStyle() {
        const { propIs } = this;
        const leftMargin = this._sidebar ? `${this._sidebar.offsetWidth}px` : '0';
        this._content.style.marginLeft = leftMargin;
        if (leftMargin !== '0')
            this._content.style.width = `calc(100% - ${leftMargin})`;
        else
            this._content.style.width = '100%';
        if (this.header && !propIs(this.header, 'full')) {
            this._header.style.marginLeft = leftMargin;
            this._header.style.width = `calc(100% - ${leftMargin})`;
        }
        else if (this.header) {
            this._header.style.marginLeft = '0';
            this._header.style.width = '100%';
        }
        if (this.footer && !propIs(this.footer, 'full')) {
            this._footer.style.marginLeft = leftMargin;
            this._footer.style.width = `calc(100% - ${leftMargin})`;
        }
        else if (this.footer) {
            this._footer.style.marginLeft = '0';
            this._footer.style.width = '100%';
        }
        const topMargin = this._header ? `${this._header.offsetHeight}px` : '0';
        this._content.style.marginTop = topMargin;
        if (this.header && propIs(this.header, 'full'))
            this._sidebar.style.top = topMargin;
        else if (this._sidebar)
            this._sidebar.style.top = '0';
        const bottomMargin = this._footer ? `${this._footer.offsetHeight}px` : '0';
        this._content.style.marginBottom = bottomMargin;
        if (this.footer && propIs(this.footer, 'full'))
            this._sidebar.style.bottom = bottomMargin;
        else if (this._sidebar)
            this._sidebar.style.bottom = '0';
        const overlay = this.root.querySelector('[slot="overlay"]');
        if (this.overlay && overlay && overlay.innerHTML.trim()) {
            this._overlay.style.display = 'flex';
            this._overlay.style.background = this.overlay;
            document.body.style.overflow = 'hidden';
        }
        else {
            if (this._overlay)
                this._overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    propIs(prop, option) {
        const options = prop.split(',').map((item) => item.trim());
        return options.indexOf(option) !== -1;
    }
    componentDidLoad() {
        clearInterval(this._interval);
        this._interval = setInterval(this.setStyle.bind(this), 0);
    }
    componentDidUnload() {
        clearInterval(this._interval);
    }
    componentDidUpdate() {
        this.setStyle();
    }
    render() {
        const { propIs } = this;
        return (h("section", { id: "root" },
            this.overlay && (h("section", { id: "actor-overlay", ref: (el) => this._overlay = el },
                h("slot", { name: "overlay" }))),
            this.sidebar && (h("aside", { id: "actor-sidebar", ref: (el) => this._sidebar = el, class: { 'fixed': propIs(this.sidebar, 'fixed'), 'under': propIs(this.header, 'full') } },
                h("slot", { name: "sidebar" }))),
            this.header && (h("header", { id: "actor-header", ref: (el) => this._header = el, class: { 'fixed': propIs(this.header, 'fixed'), 'full': propIs(this.header, 'full') } },
                h("slot", { name: "header" }))),
            h("main", { id: "actor-content", ref: (el) => this._content = el },
                h("slot", { name: "before-content" }),
                h("slot", null),
                h("slot", { name: "after-content" })),
            this.footer && (h("footer", { id: "actor-footer", ref: (el) => this._footer = el, class: { 'fixed': propIs(this.footer, 'fixed'), 'full': propIs(this.footer, 'full') } },
                h("slot", { name: "footer" }))),
            this.alerts && (h("section", { id: "actor-alerts", class: this.alerts },
                h("slot", { name: "alerts" })))));
    }
    static get is() { return "actor-layout"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "alerts": {
            "type": String,
            "attr": "alerts"
        },
        "footer": {
            "type": String,
            "attr": "footer"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "overlay": {
            "type": String,
            "attr": "overlay"
        },
        "root": {
            "elementRef": true
        },
        "sidebar": {
            "type": String,
            "attr": "sidebar"
        }
    }; }
    static get style() { return "/**style-placeholder:actor-layout:**/"; }
}

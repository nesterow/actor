import '../../stencil.core';
export declare class ActorLayout {
    root: HTMLElement;
    /**
     *  Add a notification slot at given position.
     *  <br>
     *  Can be used with alert-styled components like bootstrap's '.alert'.
     *  <br><br>
     *  Possible values:
     *  <br>
     *  <pre>'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'top-center', 'bottom-center'</pre>
     * */
    alerts: string;
    /**
     *  Add an overlay slot. Can be used to show modal dialogues.
     *  <br><br>
     *  Accepts: <pre>a css color value, i.e. #CCCCCC </pre>
     * */
    overlay: string;
    /**
     *  Add a sidebar slot.
     *  <br><br>
     *  Possible values: <pre>'fixed', 'default'</pre>
     * */
    sidebar: string;
    /**
     *  Add a header slot.
     *  <br><br>
     *  Possible values: <pre>'fixed', 'full', 'default'</pre>
     *  When header is 'full' it assumes 100% window width and moves sidebar under header
     * */
    header: string;
    /**
     *  Add a footer slot.
     *  <br><br>
     *  Possible values: <pre>'fixed', 'full', 'default'</pre>
     *  When footer is 'full' it assumes 100% window width and moves sidebar atop footer
     * */
    footer: string;
    private _interval;
    private _sidebar;
    private _header;
    private _content;
    private _footer;
    private _overlay;
    private setStyle;
    private propIs;
    componentDidLoad(): void;
    componentDidUnload(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}

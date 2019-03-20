import { Component, Prop, Element } from '@stencil/core';
import Timeout = NodeJS.Timeout;


@Component({
  tag: 'actor-layout',
  styleUrl: 'actor-layout.css',
  shadow: true
})
export class ActorLayout {

  @Element() root: HTMLElement;

  /**
   *  Add a notification slot at given position.
   *  <br>
   *  Can be used with alert-styled components like bootstrap's '.alert'.
   *  <br><br>
   *  Possible values:
   *  <br>
   *  <pre>'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'top-center', 'bottom-center'</pre>
   * */
  @Prop() alerts: string = null;

  /**
   *  Add an overlay slot. Can be used to show modal dialogues.
   *  <br><br>
   *  Accepts: <pre>a css color value, i.e. #CCCCCC </pre>
   * */
  @Prop() overlay: string = null;

  /**
   *  Add a sidebar slot.
   *  <br><br>
   *  Possible values: <pre>'fixed', 'default'</pre>
   * */
  @Prop() sidebar: string = null;

  /**
   *  Add a header slot.
   *  <br><br>
   *  Possible values: <pre>'fixed', 'full', 'default'</pre>
   *  When header is 'full' it assumes 100% window width and moves sidebar under header
   * */
  @Prop() header: string = null;


  /**
   *  Add a footer slot.
   *  <br><br>
   *  Possible values: <pre>'fixed', 'full', 'default'</pre>
   *  When footer is 'full' it assumes 100% window width and moves sidebar atop footer
   * */
  @Prop() footer: string = null;

  private _interval!: Timeout;
  private _sidebar!: HTMLElement;
  private _header!: HTMLElement;
  private _content!: HTMLElement;
  private _footer!: HTMLElement;
  private _overlay!: HTMLElement;



  private setStyle(){
    const { propIs }  = this;

    const leftMargin = this._sidebar ? `${this._sidebar.offsetWidth}px` : '0';
    this._content.style.marginLeft = leftMargin;

    if (leftMargin !== '0')
      this._content.style.width = `calc(100% - ${leftMargin})`;
    else
      this._content.style.width = '100%';


    if (this.header && !propIs(this.header, 'full'))
    {
      this._header.style.marginLeft = leftMargin;
      this._header.style.width = `calc(100% - ${leftMargin})`;
    }
    else if (this.header)
    {
      this._header.style.marginLeft = '0';
      this._header.style.width = '100%';
    }


    if (this.footer && !propIs(this.footer, 'full'))
    {
      this._footer.style.marginLeft = leftMargin;
      this._footer.style.width = `calc(100% - ${leftMargin})`;
    }
    else if (this.footer)
    {
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
    if (this.overlay && overlay && overlay.innerHTML.trim())
    {
      this._overlay.style.display = 'flex';
      this._overlay.style.background = this.overlay;
      document.body.style.overflow = 'hidden';
    }
    else
    {
      if(this._overlay) this._overlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

  }

  private propIs(prop: string, option: string): boolean{
    const options = prop.split(',').map((item: string)=> item.trim());
    return options.indexOf(option) !== -1;
  }

  componentDidLoad(){
    clearInterval(this._interval);
    this._interval = setInterval(this.setStyle.bind(this),0)
  }

  componentDidUnload(){
    clearInterval(this._interval);
  }

  componentDidUpdate(){
    this.setStyle();
  }

  render() {
    const { propIs }  = this;
    return (
      <section id="root">
        {
          this.overlay && (
            <section id="actor-overlay" ref={(el: HTMLElement)=> this._overlay = el}>
              <slot name="overlay"/>
            </section>
          )
        }

        {
          this.sidebar && (
            <aside id="actor-sidebar" ref={(el: HTMLElement)=> this._sidebar = el} class={{'fixed' : propIs(this.sidebar, 'fixed'), 'under':propIs(this.header, 'full')}}>
              <slot name="sidebar"/>
            </aside>
          )
        }

        {
          this.header && (
            <header id="actor-header" ref={(el: HTMLElement)=> this._header = el} class={{'fixed' : propIs(this.header, 'fixed'), 'full': propIs(this.header, 'full')}}>
              <slot name="header"/>
            </header>
          )
        }

        <main id="actor-content" ref={(el: HTMLElement)=> this._content = el}>
          <slot name="before-content"/>
          <slot/>
          <slot name="after-content"/>
        </main>

        {
          this.footer && (
            <footer id="actor-footer" ref={(el: HTMLElement)=> this._footer = el} class={{'fixed' : propIs(this.footer, 'fixed'), 'full': propIs(this.footer, 'full')}}>
              <slot name="footer"/>
            </footer>
          )
        }

        {
          this.alerts && (
            <section id="actor-alerts" class={this.alerts}>
              <slot name="alerts"/>
            </section>
          )
        }
      </section>
    );
  }
}

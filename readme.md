# 1. Layout Web Component
```html
<actor-layout id="layout" header="fixed" sidebar="fixed" overlay="#eee" alerts="top-right">
    <div slot="header">
        <!-- always atop-->
    </div>
    <div slot="sidebar">
        <!-- always aside-->
    </div>
    <div slot="footer">
        <!-- always bottom-->
    </div>
    <div slot="overlay">
        <!-- will overlay page content if there is markup here, it can be a modal or a page -->
    </div>
    <div slot="alerts">
        <!-- this content will be in corners showing meesages or toasts -->
    </div>
</actor-layout>
```

## Properties

| Property  | Attribute | Description                                                                                                                                                                                                                                                   | Type     | Default |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `alerts`  | `alerts`  | Add a notification slot at given position. <br> Can be used with alert-styled components like bootstrap's '.alert'. <br><br> Possible values: <br> <pre>'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'top-center', 'bottom-center'</pre> | `string` | `null`  |
| `footer`  | `footer`  | Add a footer slot. <br><br> Possible values: <pre>'fixed', 'full', 'default'</pre> When footer is 'full' it assumes 100% window width and moves sidebar atop footer                                                                                           | `string` | `null`  |
| `header`  | `header`  | Add a header slot. <br><br> Possible values: <pre>'fixed', 'full', 'default'</pre> When header is 'full' it assumes 100% window width and moves sidebar under header                                                                                          | `string` | `null`  |
| `overlay` | `overlay` | Add an overlay slot. Can be used to show modal dialogues. <br><br> Accepts: <pre>a css color value, i.e. #CCCCCC </pre>                                                                                                                                       | `string` | `null`  |
| `sidebar` | `sidebar` | Add a sidebar slot. <br><br> Possible values: <pre>'fixed', 'default'</pre>                                                                                                                                                                                   | `string` | `null`  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

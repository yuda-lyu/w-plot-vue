# w-plot-vue
A plot component for vue(vue2).

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![language](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://github.com/vuejs/vue) 
[![npm version](http://img.shields.io/npm/v/w-plot-vue.svg?style=flat)](https://npmjs.org/package/w-plot-vue) 
[![license](https://img.shields.io/npm/l/w-plot-vue.svg?style=flat)](https://npmjs.org/package/w-plot-vue) 
[![gzip file size](http://img.badgesize.io/yuda-lyu/w-plot-vue/master/dist/w-plot-vue.umd.js.svg?compression=gzip)](https://github.com/yuda-lyu/w-plot-vue)
[![npm download](https://img.shields.io/npm/dt/w-plot-vue.svg)](https://npmjs.org/package/w-plot-vue) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-plot-vue.svg)](https://www.jsdelivr.com/package/npm/w-plot-vue)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-plot-vue/global.html).

## Example
To view some examples for more understanding, visit examples:

> **all components:** [web](//yuda-lyu.github.io/w-plot-vue/examples/app.html) [[source code](https://github.com/yuda-lyu/w-plot-vue/blob/master/docs/examples/app.html)]

## Installation
### Using npm(ES6 module):
> **Note:** w-plot-vue is mainly dependent on `w-component-vue` and `wsemi`.

```alias
npm i w-plot-vue
```
Import all components:
```alias
//choose component
<w-plot
    ...
></w-plot>

//import
import WPlotVue from 'w-plot-vue'

//use
Vue.use(WPlotVue)
```
Import one component:
```alias
//choose component
<w-plot
    ...
></w-plot>

//import
import WPlot from 'w-plot-vue/src/components/WPlot.vue'

//component
Vue.component('w-plot',WPlot)
//or
export default {
    components: {
        WPlot,
        //or
        'w-plot': WPlot,
    },
    ...
}
```

### In a browser(UMD module):
> **Note:** umd file of `w-plot-vue` is mainly dependent on `vue`.

[Necessary] Add script for w-plot-vue.
```alias
<script src="https://cdn.jsdelivr.net/npm/w-plot-vue@1.0.1/dist/w-plot-vue.umd.js"></script>
```
Directly use:
```alias
//app and component
<div id="app">
    <w-plot
        ...
    ></w-plot>
</div>

//use
Vue.use(window['w-plot-vue'])

//new
new Vue({
    el: '#app',
    data: {
        ...
    }
})
```
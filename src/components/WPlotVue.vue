<script>
import WBar from './WBar.vue'
import WPie from './WPie.vue'
import WPlot2d from './WPlot2d.vue'
import WPlot3d from './WPlot3d.vue'
import WRose from './WRose.vue'
import WSetMulti from './WSetMulti.vue'
import WSetOne from './WSetOne.vue'

let WPlotVue = {
    install: function(Vue) {
        Vue.component('w-bar', WBar)
        Vue.component('w-pie', WPie)
        Vue.component('w-plot-2-d', WPlot2d)
        Vue.component('w-plot-3-d', WPlot3d)
        Vue.component('w-rose', WRose)
        Vue.component('w-set-multi', WSetMulti)
        Vue.component('w-set-one', WSetOne)
    }
}

export default WPlotVue
</script>


<script>
import WBar from './WBar.vue'
import WPie from './WPie.vue'
import WPlot from './WPlot.vue'
import WRose from './WRose.vue'
import WSetMulti from './WSetMulti.vue'
import WSetOne from './WSetOne.vue'

let WPlotVue = {
    install: function(Vue) {
        Vue.component('w-bar', WBar)
        Vue.component('w-pie', WPie)
        Vue.component('w-plot', WPlot)
        Vue.component('w-rose', WRose)
        Vue.component('w-set-multi', WSetMulti)
        Vue.component('w-set-one', WSetOne)
    }
}

export default WPlotVue
</script>


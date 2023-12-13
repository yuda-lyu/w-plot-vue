<script>
import WBar from './WBar.vue'
import WPie from './WPie.vue'
import WPlot from './WPlot.vue'
import WRose from './WRose.vue'

let WGeoVue = {
    install: function(Vue) {
        Vue.component('w-bar', WBar)
        Vue.component('w-pie', WPie)
        Vue.component('w-plot', WPlot)
        Vue.component('w-rose', WRose)
    }
}

export default WGeoVue
</script>


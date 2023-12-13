<template>
    <div
        style="display:inline-block;"
        v-if="hasOptPie"
    >

        <div :style="`width:${getWidth}px; max-width:${getWidth}px;`">
            <slot
                name="top"
                :opt="optPie"
            ></slot>
        </div>

        <WPlot
            :options="optPie"
        ></WPlot>

        <div :style="`width:${getWidth}px; max-width:${getWidth}px;`">
            <slot
                name="bottom"
                :opt="optPie"
            ></slot>
        </div>

    </div>
</template>

<script>
import get from 'lodash-es/get'
// import map from 'lodash-es/map'
// import cloneDeep from 'lodash-es/cloneDeep'
// import isestr from 'wsemi/src/isestr.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import WPlot from './WPlot.vue'
import genPieOpt from '../js/genPieOpt.mjs'


/**
 * @vue-prop {Object} [opt={}] 輸入設定物件，預設{}
 */
export default {
    components: {
        WPlot,
    },
    props: {
        opt: {
            type: Object,
            default: () => {},
        },
    },
    data: function() {
        return {
        }
    },
    computed: {

        hasOptPie: function() {
            //console.log('computed hasOptPie')

            let vo = this

            let b = iseobj(vo.optPie)

            return b
        },

        optPie: function() {
            // console.log('computed optPie')

            let vo = this

            let r = null
            try {
                let w = vo.getWidth()
                let h = vo.getHeight()
                let keys = get(vo, 'opt.keys', [])
                let rds = get(vo, 'opt.rds', [])
                r = genPieOpt(w, h, keys, rds, vo.opt)
            }
            catch (err) {
                console.log(err)
            }

            return r
        },

    },
    methods: {

        getWidth: function() {
            let vo = this
            let w = get(vo, 'opt.width', 0)
            return w
        },

        getHeight: function() {
            let vo = this
            let w = get(vo, 'opt.height', 0)
            return w
        },

    }
}
</script>

<style scoped>
</style>

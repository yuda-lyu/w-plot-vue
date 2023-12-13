<template>
    <div
        style="display:inline-block;"
        v-if="hasOptRose"
    >

        <div :style="`width:${getWidth}px; max-width:${getWidth}px;`">
            <slot
                name="top"
                :opt="optRose"
            ></slot>
        </div>

        <WPlot
            :options="optRose"
        ></WPlot>

        <div :style="`width:${getWidth}px; max-width:${getWidth}px;`">
            <slot
                name="bottom"
                :opt="optRose"
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
import genRoseOpt from '../js/genRoseOpt.mjs'


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

        hasOptRose: function() {
            //console.log('computed hasOptRose')

            let vo = this

            let b = iseobj(vo.optRose)

            return b
        },

        optRose: function() {
            // console.log('computed optRose')

            let vo = this

            let r = null
            try {
                let w = vo.getWidth()
                let h = vo.getHeight()
                let keys = get(vo, 'opt.keys', [])
                let rds = get(vo, 'opt.rds', [])
                r = genRoseOpt(w, h, keys, rds, vo.opt)
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

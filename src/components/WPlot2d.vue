<template>
    <div
        :style="`display:inline-block; width:${widthInp}px; min-width:${widthInp}px; height:${heightInp}px; overflow-y:hidden;`"
        v-if="options"
    >

        <WHighchartsVueDyn
            :options="options"
        ></WHighchartsVueDyn>

    </div>
</template>

<script>
import get from 'lodash-es/get.js'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import WHighchartsVueDyn from 'w-component-vue/src/components/WHighchartsVueDyn.vue'


/**
 * @vue-prop {Object} [options={}] 輸入設定物件，預設{}
 */
export default {
    components: {
        WHighchartsVueDyn,
    },
    props: {
        options: {
            type: Object,
            default: () => {},
        },
        width: {
            type: Number,
            default: 400,
        },
        height: {
            type: Number,
            default: 400,
        },
    },
    data: function() {
        return {
        }
    },
    computed: {

        widthInp: function() {
            //console.log('computed widthInp')

            let vo = this

            //w
            let w = vo.width
            let wOpt = get(vo, 'options.chart.width', '')
            if (isnum(wOpt)) {
                w = cdbl(wOpt)
            }

            return w
        },

        heightInp: function() {
            //console.log('computed heightInp')

            let vo = this

            //h
            let h = vo.height
            let hOpt = get(vo, 'options.chart.height', '')
            if (isnum(hOpt)) {
                h = cdbl(hOpt)
            }

            return h
        },

    },
    methods: {

    },
}
</script>

<style scoped>
</style>

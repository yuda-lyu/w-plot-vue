<template>
    <div
        style="display:inline-block;"
        v-if="hasOptBar"
    >

        <div :style="`width:${picWidth}px; max-width:${picWidth}px;`">
            <slot
                name="top"
                :opt="optBar"
            ></slot>
        </div>

        <div style="position:relative;">

            <WPlot2d
                :options="optBar"
            ></WPlot2d>

            <template v-if="useInnerLabels">
                <div
                    :style="`position:absolute; left:${locLeft}px; top:${tk.y}px; font-family:${hTickLableFontFamily}; font-size:${hTickLableFontSize}; color:${hTickLableColor};`"
                    :key="'ktk-'+ktk"
                    v-for="(tk,ktk) in hTickLabels"
                >
                    {{tk.name}}
                </div>
            </template>

        </div>

        <div :style="`width:${picWidth}px; max-width:${picWidth}px;`">
            <slot
                name="bottom"
                :opt="optBar"
            ></slot>
        </div>

    </div>
</template>

<script>
import get from 'lodash-es/get'
import map from 'lodash-es/map'
import size from 'lodash-es/size'
// import cloneDeep from 'lodash-es/cloneDeep'
// import isestr from 'wsemi/src/isestr.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import WPlot2d from './WPlot2d.vue'
import genBarOpt from '../js/genBarOpt.mjs'


/**
 * @vue-prop {Object} [opt={}] 輸入設定物件，預設{}
 */
export default {
    components: {
        WPlot2d,
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

        picWidth: function() {
            let vo = this
            let w = get(vo, 'opt.width', 0)
            return w
        },

        picHeight: function() {
            let vo = this
            let w = get(vo, 'opt.height', 0)
            return w
        },

        ks: function() {
            let vo = this
            let ks = get(vo, 'opt.keys', [])
            return ks
        },

        hasOptBar: function() {
            //console.log('computed hasOptBar')

            let vo = this

            let b = iseobj(vo.optBar)

            return b
        },

        optBar: function() {
            // console.log('computed optBar')

            let vo = this

            let r = null
            try {
                let rds = get(vo, 'opt.rds', [])
                r = genBarOpt(vo.picWidth, vo.picHeight, vo.ks, rds, vo.opt)
            }
            catch (err) {
                console.log(err)
            }

            return r
        },

        useInnerLabels: function() {
            let vo = this
            let b1 = get(vo, 'opt.direction', '') === 'horizontal'
            let b2 = get(vo, 'opt.barUseInnerLabelsForHorizontal', false)
            let b = b1 && b2
            return b
        },

        locLeft: function() {
            let vo = this
            let r = get(vo, 'optBar.chart.marginLeft', 0)
            return r
        },

        locTop: function() {
            let vo = this
            let r = get(vo, 'optBar.chart.marginTop', 0)
            return r
        },

        locBottom: function() {
            let vo = this
            let r = get(vo, 'optBar.chart.marginBottom', 0)
            return r
        },

        hTickLableFontFamily: function() {
            let vo = this
            let r = get(vo, 'optBar.xAxis.labels.style.fontFamily', '')
            return r
        },

        hTickLableFontSize: function() {
            let vo = this
            let r = get(vo, 'optBar.xAxis.labels.style.fontSize', '')
            return r
        },

        hTickLableColor: function() {
            let vo = this
            let r = get(vo, 'optBar.xAxis.labels.style.color', '')
            return r
        },

        hAxisMin: function() {
            let vo = this
            let r = get(vo, 'optBar.xAxis.min', 0)
            return r
        },

        // hAxisMax: function() {
        //     let vo = this
        //     let r = get(vo, 'optBar.xAxis.max', 0)
        //     return r
        // },

        hTickLabels: function() {
            let vo = this

            //h
            let h = vo.picHeight - vo.locTop - vo.locBottom
            h = Math.max(h, 0)
            // console.log('h', h)

            //n
            let n = size(vo.ks)
            // console.log('n', n)

            //rng
            let rng = n - vo.hAxisMin
            // console.log('rng', rng)

            //yd
            let yd = 0
            if (rng > 0) {
                yd = h / rng
            }
            // console.log('yd', yd)

            //tks
            let tks = map(vo.ks, (v, k) => {
                let y = vo.locTop + yd * (k - vo.hAxisMin)
                return {
                    name: v,
                    y,
                }
            })
            // console.log('tks', tks)

            return tks
        },

    },
    methods: {

    }
}
</script>

<style scoped>
</style>

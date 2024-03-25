<template>
    <div
        style="display:inline-block;"
        :changeTypeItems="changeTypeItems"
        :changeKeySelect="changeKeySelect"
    >

        <div style="padding-bottom:5px;">

            <div style="display:flex; align-items:flex-end;">

                <div :style="``">
                    <slot name="head"></slot>
                </div>

                <div style="display:flex; align-items:center;">

                    <div style="padding-right:10px; font-size:0.85rem; color:#666;">
                        {{textPlotType}}:
                    </div>

                    <WTextSelect
                        :style="`width:${widthSelect}px;`"
                        :paddingStyle="{v:3,h:10}"
                        :borderRadius="4"
                        :items="typeItems"
                        :value="typeSelect"
                        @input="updateTypeSelectAndEmitKeySelect"
                    ></WTextSelect>

                </div>

            </div>

        </div>

        <div
            name="tarp"
            v-if="hasOptTar"
        >

            <component
                :is="cmp"
                :opt="optTar"
            ></component>

        </div>

    </div>
</template>

<script>
import get from 'lodash-es/get.js'
import each from 'lodash-es/each.js'
import merge from 'lodash-es/merge.js'
import size from 'lodash-es/size.js'
import capitalize from 'lodash-es/capitalize.js'
import cloneDeep from 'lodash-es/cloneDeep.js'
import haskey from 'wsemi/src/haskey.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import WTextSelect from 'w-component-vue/src/components/WTextSelect.vue'
import WBar from './WBar.vue'
import WPie from './WPie.vue'
import WRose from './WRose.vue'


/**
 * @vue-prop {Object} [opt={}] 輸入設定物件，預設{}
 */
export default {
    components: {
        WTextSelect,
        WBar,
        WPie,
        WRose,
    },
    props: {
        mode: {
            type: String,
            default: 'multi',
        },
        opt: {
            type: Object,
            default: () => {},
        },
        textPlotType: {
            type: String,
            default: 'Plot type',
        },
        widthSelect: {
            type: Number,
            default: 260,
        },
        keySelect: {
            type: String,
            default: 'bar-v-normal',
        },
        kpSelectText: {
            type: Object,
            default: () => {},
        },
    },
    data: function() {
        return {

            typeItemsDefOne: [

                {
                    key: 'bar-v-normal',
                    type: 'bar',
                    text: 'Vertical bars',
                    optExt: {},
                },

                {
                    key: 'bar-h-normal',
                    type: 'bar',
                    text: 'Horizontal bars',
                    optExt: {
                        direction: 'horizontal',
                        marginLeft: 80,
                        legendPosition: 'bottomright',
                    },
                },
                {
                    key: 'bar-h-normal-dense',
                    type: 'bar',
                    text: 'Horizontal bars with dense',
                    optExt: {
                        direction: 'horizontal',
                        marginLeft: 80,
                        legendPosition: 'bottomright',
                        barUseInnerLabelsForHorizontal: true,
                    },
                },

                {
                    key: 'pie-normal',
                    type: 'pie',
                    text: 'Pies',
                    optExt: {},
                },

                {
                    key: 'rose-normal',
                    type: 'rose',
                    text: 'Roses',
                    optExt: {},
                },

            ],

            typeItemsDefMulti: [

                {
                    key: 'bar-v-normal',
                    type: 'bar',
                    text: 'Vertical bars',
                    optExt: {},
                },
                {
                    key: 'bar-v-stack-normal',
                    type: 'bar',
                    text: 'Vertical bars with normal stack',
                    optExt: {
                        barDisplay: 'stackNormal',
                    },
                },
                {
                    key: 'bar-v-stack-percent',
                    type: 'bar',
                    text: 'Vertical bars with percent stack',
                    optExt: {
                        barDisplay: 'stackPercent',
                    },
                },

                {
                    key: 'bar-h-normal',
                    type: 'bar',
                    text: 'Horizontal bars',
                    optExt: {
                        direction: 'horizontal',
                        marginLeft: 80,
                        legendPosition: 'bottomright',
                    },
                },
                {
                    key: 'bar-h-normal-dense',
                    type: 'bar',
                    text: 'Horizontal bars with dense',
                    optExt: {
                        direction: 'horizontal',
                        marginLeft: 80,
                        legendPosition: 'bottomright',
                        barUseInnerLabelsForHorizontal: true,
                        barGroupWidthRatio: 0.25,
                    },
                },
                {
                    key: 'bar-h-stack-normal',
                    type: 'bar',
                    text: 'Horizontal bars with normal stack',
                    optExt: {
                        direction: 'horizontal',
                        marginLeft: 80,
                        legendPosition: 'bottomright',
                        barDisplay: 'stackNormal',
                    },
                },
                {
                    key: 'bar-h-stack-percent',
                    type: 'bar',
                    text: 'Horizontal bars with percent stack',
                    optExt: {
                        direction: 'horizontal',
                        marginLeft: 80,
                        legendPosition: 'bottomright',
                        barDisplay: 'stackPercent',
                    },
                },

                {
                    key: 'rose-normal',
                    type: 'rose',
                    text: 'Roses',
                    optExt: {},
                },

            ],

            typeItems: [],

            keySelectTrans: null,
            typeSelect: null,

        }
    },
    computed: {

        typeItemsDef: function() {
            let vo = this
            if (vo.mode === 'one') {
                return vo.typeItemsDefOne
            }
            return vo.typeItemsDefMulti
        },

        changeTypeItems: function() {
            let vo = this

            //typeItems
            let typeItems = []
            if (!iseobj(vo.kpSelectText)) {
                typeItems = vo.typeItemsDef
            }
            else {
                each(vo.typeItemsDef, (v) => {
                    if (!haskey(vo.kpSelectText, v.key)) {
                        return true //跳出換下一個
                    }
                    let text = vo.kpSelectText[v.key]
                    typeItems.push({
                        ...v,
                        text,
                    })
                })
            }
            // console.log('kpSelectText', vo.kpSelectText)
            // console.log('typeItems', typeItems)

            //save
            vo.typeItems = typeItems

            return ''
        },

        changeKeySelect: function() {
            let vo = this

            //updateTypeSelectByKey
            vo.updateTypeSelectByKey(vo.keySelect)

            return ''
        },

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

        hasOptTar: function() {
            let vo = this
            let b = iseobj(vo.optTar)
            return b
        },

        cmp: function() {
            let vo = this
            let type = get(vo, 'typeSelect.type', '')
            type = capitalize(type)
            return `W${type}`
        },

        optTar: function() {
            // console.log('computed optTar')

            let vo = this

            //showLabels
            let showLabels = get(vo, 'opt.showLabels', true)
            let barShowLabels = showLabels
            let pieShowLabels = showLabels
            let roseShowLabels = showLabels

            //showLegend
            let showLegend = get(vo, 'opt.showLegend', false)

            //rds
            let rds = get(vo, 'opt.rds', [])

            //nrds
            let nrds = size(rds)

            //check
            if (nrds === 0) {
                console.log('no data, size(opt.rds)=0')
                return null
            }
            else if (vo.mode === 'one' && nrds > 1) {
                console.log('size(opt.rds)>1')
                rds = [rds[0]]
            }

            //opt
            let opt = null
            try {

                //opt
                opt = vo.opt
                opt = cloneDeep(opt)
                let optExt = get(vo, 'typeSelect.optExt', {})
                optExt = cloneDeep(optExt)
                let optSet = {
                    barShowLabels,
                    pieShowLabels,
                    roseShowLabels,
                    showLegend,
                }
                opt = merge(opt, optExt)
                opt = merge(opt, optSet)
                // console.log('opt', opt)

            }
            catch (err) {
                console.log(err)
            }

            return opt
        },

    },
    methods: {

        updateTypeSelectByKey: function(keySelect) {
            let vo = this

            //save keySelectTrans
            vo.keySelectTrans = keySelect

            //typeSelect
            let typeSelect = null
            each(vo.typeItems, (v) => {
                if (v.key === keySelect) {
                    typeSelect = v
                    return false //跳出
                }
            })

            //save
            vo.typeSelect = typeSelect
            // console.log('typeSelect', typeSelect)

        },

        updateTypeSelectAndEmitKeySelect: function(typeSelect) {
            let vo = this

            //save typeSelect
            vo.typeSelect = typeSelect
            // console.log('typeSelect', typeSelect)

            //keySelect
            let keySelect = get(typeSelect, 'key', '')
            // console.log('keySelect', keySelect)

            //updateTypeSelectByKey
            vo.updateTypeSelectByKey(keySelect)

            //emit
            vo.$emit('update:keySelect', keySelect)

        },

    },
}
</script>

<style scoped>
</style>

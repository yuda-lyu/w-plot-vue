<template>
    <div
        style=""
        :changeMenus="changeMenus"
    >


        <template v-if="!isNarrow">
            <a href="https://github.com/yuda-lyu/w-plot-vue" class="github-corner" style="position:fixed; top:0; right:0; border:0; z-index:10000;" aria-label="View source on GitHub" target="_blank" rel="noreferrer noopener">
                <svg width="80" height="80" viewBox="0 0 250 250" style="fill:rgba(0,0,0,0.25); color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg>
            </a>
        </template>


        <div style="background:#f5f5f5;">

            <div style="width:calc( 100vw - 20px ); overflow-x:auto;" v-if="cmpsL1 && cmpsL1.length>0">
                <WListHorizontal
                    :items="cmpsL1"
                    :itemActive.sync="cmpP1"
                    :itemBackgroundColor="'transparent'"
                    :itemBackgroundColorHover="'#eee'"
                    :itemBackgroundColorActive="'#eee'"
                    :keyText="'name'"
                    :paddingStyle="{v:12,h:20}"
                    @update:itemActive="(v)=>{indP3=0;indP2=0;indP1=getInd(v,cmpsL1)}"
                >
                    <template v-slot:item="props">
                        <div style="">
                            {{kebabCaseFix(props.item.name)}}
                        </div>
                    </template>
                </WListHorizontal>
                <div style="height:1px; background:#ddd;"></div>
            </div>


            <div style="width:calc( 100vw - 20px ); overflow-x:auto;" v-if="cmpsL2 && cmpsL2.length>0">
                <div style="height:3px; background:#fff;"></div>
                <WListHorizontal
                    :items="cmpsL2"
                    :itemActive.sync="cmpP2"
                    :itemBackgroundColor="'transparent'"
                    :itemBackgroundColorHover="'#eee'"
                    :itemBackgroundColorActive="'#eee'"
                    :keyText="'name'"
                    :paddingStyle="{v:12,h:20}"
                    @update:itemActive="(v)=>{indP3=0;indP2=getInd(v,cmpsL2)}"
                >
                    <template v-slot:item="props">
                        <div style="">
                            {{kebabCaseFix(props.item.name)}}
                        </div>
                    </template>
                </WListHorizontal>
                <div style="height:1px; background:#ddd;"></div>
            </div>

            <div style="width:calc( 100vw - 20px ); overflow-x:auto;" v-if="cmpsL3 && cmpsL3.length>0">
                <div style="height:3px; background:#fff;"></div>
                <WListHorizontal
                    :items="cmpsL3"
                    :itemActive.sync="cmpP3"
                    :itemBackgroundColor="'transparent'"
                    :itemBackgroundColorHover="'#eee'"
                    :itemBackgroundColorActive="'#eee'"
                    :keyText="'name'"
                    :paddingStyle="{v:12,h:20}"
                    @update:itemActive="(v)=>{indP3=getInd(v,cmpsL3)}"
                >
                    <template v-slot:item="props">
                        <div style="">
                            {{kebabCaseFix(props.item.name)}}
                        </div>
                    </template>
                </WListHorizontal>
                <div style="height:1px; background:#ddd;"></div>
            </div>

        </div>


        <div>

            <AppZoneWPlot2d v-if="cmpPick==='WPlot2d'"></AppZoneWPlot2d>

            <AppZoneWBar v-if="cmpPick==='WBar'"></AppZoneWBar>

            <AppZoneWPie v-if="cmpPick==='WPie'"></AppZoneWPie>

            <AppZoneWRose v-if="cmpPick==='WRose'"></AppZoneWRose>

            <AppZoneWSetOne v-if="cmpPick==='WSetOne'"></AppZoneWSetOne>

            <AppZoneWSetMulti v-if="cmpPick==='WSetMulti'"></AppZoneWSetMulti>

            <AppZoneWPlot3d v-if="cmpPick==='WPlot3d'"></AppZoneWPlot3d>

        </div>


    </div>
</template>

<script>
import get from 'lodash-es/get.js'
import kebabCase from 'lodash-es/kebabCase.js'
import each from 'lodash-es/each.js'
// import cloneDeep from 'lodash-es/cloneDeep.js'
import strright from 'wsemi/src/strright.mjs'
import strdelright from 'wsemi/src/strdelright.mjs'
import urlParse from 'wsemi/src/urlParse.mjs'
import WListHorizontal from 'w-component-vue/src/components/WListHorizontal.vue'
import AppZoneWPlot2d from './AppZoneWPlot2d.vue'
import AppZoneWBar from './AppZoneWBar.vue'
import AppZoneWPie from './AppZoneWPie.vue'
import AppZoneWRose from './AppZoneWRose.vue'
import AppZoneWSetOne from './AppZoneWSetOne.vue'
import AppZoneWSetMulti from './AppZoneWSetMulti.vue'
import AppZoneWPlot3d from './AppZoneWPlot3d.vue'


let kebabCaseFix = (c) => {
    let r = kebabCase(c)
    if (strright(r, 3) === '2-d') {
        r = strdelright(r, 3) + '2d'
    }
    else if (strright(r, 3) === '3-d') {
        r = strdelright(r, 3) + '3d'
    }
    return r
}


export default {
    components: {
        WListHorizontal,
        AppZoneWPlot2d,
        AppZoneWBar,
        AppZoneWPie,
        AppZoneWRose,
        AppZoneWSetOne,
        AppZoneWSetMulti,
        AppZoneWPlot3d,
    },
    data: function() {
        let cmps = [
            {
                name: '2d',
                cmps: [
                    {
                        name: 'basic',
                        cmps: [
                            { name: 'WPlot2d', },
                            { name: 'WBar', },
                            { name: 'WPie', },
                            { name: 'WRose', },
                        ],
                    },
                    {
                        name: 'set',
                        cmps: [
                            { name: 'WSetOne', },
                            { name: 'WSetMulti', },
                            // {
                            //     name: 'VTest',
                            //     cmps: [
                            //         { name: 'VTest1', },
                            //         { name: 'VTest2', },
                            //         { name: 'VTest3', },
                            //     ],
                            // },
                        ],
                    },
                ],
            },
            // {
            //     name: '3d',
            //     cmps: [
            //         { name: 'WPlot3d', },
            //     ],
            // },
        ]
        return {
            kebabCaseFix,

            cmpsL1: cmps,
            indP1: null,
            cmpP1: null,

            cmpsL2: null,
            indP2: null,
            cmpP2: null,

            cmpsL3: null,
            indP3: null,
            cmpP3: null,

            cmpsL4: null,

            cmpPick: '',

        }
    },
    mounted: function() {
        let vo = this

        //default
        vo.indP1 = 0
        vo.indP2 = 0
        vo.indP3 = 0

        //urlParse, http://localhost:8080/?cmp=w-set-multi
        let p = urlParse(location.href)
        // console.log('p', p)

        //viewPick
        vo.viewPick(get(p, 'cmp', ''))

    },
    computed: {

        changeMenus: function() {
            let vo = this
            vo.modifyMenus(vo.indP1, vo.indP2, vo.indP3)
            return ''
        },

        isNarrow: function() {
            return window.innerWidth < 1000
        },

    },
    methods: {

        modifyMenus: function() {
            let vo = this

            let cmpPick = ''

            setTimeout(() => {

                // console.log('call P1')
                vo.cmpP1 = get(vo.cmpsL1, vo.indP1, {})
                vo.cmpsL2 = get(vo.cmpP1, `cmps`, [])
                let _cmpPick = get(vo.cmpP1, `name`, '')
                if (_cmpPick) {
                    cmpPick = _cmpPick
                }
                // console.log('vo.cmpP1', cloneDeep(vo.cmpP1))
                // console.log('vo.cmpsL2', cloneDeep(vo.cmpsL2))

            }, 50)

            setTimeout(() => {

                // console.log('call P2')
                let cmps = get(vo.cmpP1, `cmps`, [])
                vo.cmpP2 = get(cmps, vo.indP2, {})
                vo.cmpsL3 = get(vo.cmpP2, `cmps`, [])
                let _cmpPick = get(vo.cmpP2, `name`, '')
                if (_cmpPick) {
                    cmpPick = _cmpPick
                }
                // console.log('vo.cmpP2', cloneDeep(vo.cmpP2))
                // console.log('vo.cmpsL3', cloneDeep(vo.cmpsL3))

            }, 100)

            setTimeout(() => {

                // console.log('call P3')
                let cmps = get(vo.cmpP2, `cmps`, [])
                vo.cmpP3 = get(cmps, vo.indP3, {})
                vo.cmpsL4 = get(vo.cmpP3, `cmps`, [])
                let _cmpPick = get(vo.cmpP3, `name`, '')
                if (_cmpPick) {
                    cmpPick = _cmpPick
                }
                // console.log('vo.cmpP3', cloneDeep(vo.cmpP3))
                // console.log('vo.cmpsL4', cloneDeep(vo.cmpsL4))

                //update
                vo.cmpPick = cmpPick
                // console.log('cmpPick', cmpPick)

            }, 150)

        },

        getInd: function(item, items) {
            // let vo = this
            let ind = -1
            each(items, (v, k) => {
                if (item.name === v.name) {
                    ind = k
                    return false //跳出
                }
            })
            return ind
        },

        viewPick: function(cmpPick) {
            let vo = this
            let _cmpPick = kebabCaseFix(cmpPick)
            let r = ''
            let rs = []
            let ls = []
            let pv = (ts) => {
                each(ts, (v, k) => {
                    ls.push(k)

                    //name, _name
                    let name = get(v, `name`, '')
                    let _name = kebabCaseFix(name)

                    //cmps
                    let cmps = get(v, `cmps`, [])

                    //push
                    let cls = ls.join('.')
                    let b = _name === _cmpPick
                    rs.push({
                        cls,
                        name,
                        b,
                    })

                    //save
                    if (b) {
                        r = JSON.parse(JSON.stringify(ls))
                    }

                    //遞迴pv
                    if (cmps.length > 0) {
                        pv(cmps)
                    }

                    ls.pop()
                })
            }
            pv(vo.cmpsL1)
            // console.log('rs', rs)
            // console.log('r', r)
            vo.indP1 = get(r, 0, 0)
            vo.indP2 = get(r, 1, 0)
            vo.indP3 = get(r, 2, 0)
        },

    },
}
</script>

<style>
.head1 {
    padding: 0px 0px 20px 0px;
    font-size: 2.5rem;
}
.bkh { /* 寬 */
    padding:20px;
}
@media screen and (max-width:800px){ /* 中 */
    .bkh {
        padding:10px;
    }
}
@media screen and (max-width:400px){ /* 窄 */
    .bkh {
        padding:5px;
    }
}
.bk { /* 寬 */
    display: inline-block;
    vertical-align: top;
    padding: 0px 80px 60px 0px;
}
@media screen and (max-width:1000px){ /* 中窄 */
    .bk {
        display: block;
        padding: 0px 0px 50px 0px;
    }
}
</style>

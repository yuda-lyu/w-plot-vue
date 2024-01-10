<template>
    <div class="bkh">


        <div class="head1"><span style="cursor:pointer;" title="open for copy link to view component" onclick="window.open('//yuda-lyu.github.io/w-plot-vue/examples/app.html?cmp='+this.innerText,'_blank')">w-set-multi</span></div>


        <div style="padding:0px;">


            <div class="bk">
                <demolink
                    :kbname="'w-set-multi'"
                    :casename="'default'"
                ></demolink>

                <w-set-multi
                    :opt="{
                        ...WSetMulti.opt2e,
                    }"
                ></w-set-multi>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-multi'"
                    :casename="'keySelect'"
                ></demolink>

                <div style="padding-bottom:5px; font-size:0.8rem;">
                    keySelect: {{WSetMulti.keySelect}}
                </div>

                <w-set-multi
                    :opt="{
                        ...WSetMulti.opt2e,
                    }"
                    :keySelect.sync="WSetMulti.keySelect"
                ></w-set-multi>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-multi'"
                    :casename="'textPlotType & kpSelectText & widthSelect'"
                ></demolink>

                <w-set-multi
                    :opt="{
                        ...WSetMulti.opt2e,
                    }"
                    :textPlotType="'繪圖類型'"
                    :kpSelectText="{
                        'bar-v-normal':'垂直直條圖',
                        'bar-v-stack-normal':'垂直堆疊直條圖',
                        'bar-v-stack-percent':'垂直堆疊佔比直條圖',
                        'bar-h-normal':'水平直條圖',
                        'bar-h-normal-dense':'水平直條圖(緊密)',
                        'bar-h-stack-normal':'水平堆疊直條圖',
                        'bar-h-stack-percent':'水平堆疊佔比直條圖',
                        'rose-normal':'玫瑰圖',
                    }"
                    :widthSelect="170"
                ></w-set-multi>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-multi'"
                    :casename="'hide labels'"
                ></demolink>

                <w-set-multi
                    :opt="{
                        ...WSetMulti.opt2e,
                        showLabels:false,
                    }"
                ></w-set-multi>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-multi'"
                    :casename="'hide legned'"
                ></demolink>

                <w-set-multi
                    :opt="{
                        ...WSetMulti.opt2e,
                        showLegend:false,
                    }"
                ></w-set-multi>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-multi'"
                    :casename="'slot head'"
                ></demolink>

                <w-set-multi
                    :opt="{
                        ...WSetMulti.opt2e,
                    }"
                >
                    <template v-slot:head>
                        <div style="padding-right:8px; font-size:1.3rem;">
                            🌿
                        </div>
                    </template>
                </w-set-multi>

            </div>


        </div>


    </div>
</template>

<script>
import demolink from './components/demolink.vue'
import WSetMulti from './components/WSetMulti.vue'

export default {
    components: {
        demolink,
        WSetMulti,
    },
    props: {
    },
    data: function() {
        let keys = ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia']
        let rds2e = [
            {
                name: 'Corn',
                data: {
                    USA: {
                        value: 406.292,
                        color: ['rgb(255, 205, 210)', 'rgb(229, 115, 115)'],
                    },
                    China: {
                        value: 260.000,
                        color: ['rgb(255, 185, 210)', 'rgb(229, 95, 115)'],
                    },
                    Brazil: {
                        value: 107.000,
                        color: ['rgb(255, 165, 210)', 'rgb(229, 75, 115)'],
                    },
                    EU: {
                        value: 68.300,
                        color: ['rgb(255, 145, 210)', 'rgb(229, 55, 115)'],
                    },
                    India: {
                        value: 27.500,
                        color: ['rgb(255, 125, 210)', 'rgb(229, 35, 115)'],
                    },
                    Russia: {
                        value: 14.500,
                        color: ['rgb(255, 105, 210)', 'rgb(229, 15, 115)'],
                    },
                },
            },
            {
                name: 'Wheat',
                data: {
                    USA: {
                        value: 51.086,
                        color: ['rgb(210, 205, 255)', 'rgb(115, 115, 229)'],
                    },
                    China: {
                        value: 136.000,
                        color: ['rgb(210, 185, 255)', 'rgb(115, 95, 229)'],
                    },
                    Brazil: {
                        value: 5.500,
                        color: ['rgb(210, 165, 255)', 'rgb(115, 75, 229)'],
                    },
                    EU: {
                        value: 141.000,
                        color: ['rgb(210, 145, 255)', 'rgb(115, 55, 229)'],
                    },
                    India: {
                        value: 107.180,
                        color: ['rgb(210, 125, 255)', 'rgb(115, 35, 229)'],
                    },
                    Russia: {
                        value: 77.000,
                        color: ['rgb(210, 105, 255)', 'rgb(115, 15, 229)'],
                    },
                },
            },
        ]
        return {
            'WSetMulti': {
                'keySelect': 'bar-v-normal',
                'opt2e': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds2e,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
            },
        }
    },
    methods: {
    }
}
</script>

<style scoped>
</style>

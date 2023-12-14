<template>
    <div>


        <div class="head1"><span style="cursor:pointer;" title="open for copy link to view component" onclick="window.open('//yuda-lyu.github.io/w-plot-vue/examples/app.html?cmp='+this.innerText,'_blank')">w-set-one</span></div>


        <div style="padding:0px;">


            <div class="bk">
                <demolink
                    :kbname="'w-set-one'"
                    :casename="'default'"
                ></demolink>

                <w-set-one
                    :opt="{
                        ...WSetOne.opt1c,
                    }"
                ></w-set-one>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-one'"
                    :casename="'keySelect'"
                ></demolink>

                <div style="padding-bottom:5px; font-size:0.8rem;">
                    keySelect: {{WSetOne.keySelect}}
                </div>

                <w-set-one
                    :opt="{
                        ...WSetOne.opt1c,
                    }"
                    :keySelect.sync="WSetOne.keySelect"
                ></w-set-one>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-one'"
                    :casename="'textPlotType & kpSelectText & widthSelect'"
                ></demolink>

                <w-set-one
                    :opt="{
                        ...WSetOne.opt1c,
                    }"
                    :textPlotType="'繪圖類型'"
                    :kpSelectText="{
                        'bar-v-normal':'垂直直條圖',
                        'bar-h-normal':'水平直條圖',
                        'bar-h-normal-dense':'水平直條圖(緊密)',
                        'pie-normal':'圓餅圖',
                        'rose-normal':'玫瑰圖',
                    }"
                    :widthSelect="160"
                ></w-set-one>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-one'"
                    :casename="'hide labels'"
                ></demolink>

                <w-set-one
                    :opt="{
                        ...WSetOne.opt1c,
                        showLabels:false,
                    }"
                ></w-set-one>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-one'"
                    :casename="'show legned'"
                ></demolink>

                <w-set-one
                    :opt="{
                        ...WSetOne.opt1c,
                        showLegend:true,
                    }"
                ></w-set-one>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-set-one'"
                    :casename="'slot head'"
                ></demolink>

                <w-set-one
                    :opt="{
                        ...WSetOne.opt1c,
                    }"
                >
                    <template v-slot:head>
                        <div style="padding-right:8px; font-size:1.3rem;">
                            🌿
                        </div>
                    </template>
                </w-set-one>

            </div>


        </div>


    </div>
</template>

<script>
import demolink from './components/demolink.vue'
import WSetOne from './components/WSetOne.vue'

export default {
    components: {
        demolink,
        WSetOne,
    },
    props: {
    },
    data: function() {
        let keys = ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia']
        let rds1c = [
            {
                name: 'Corn',
                data: {
                    USA: {
                        value: 406.292,
                        color: ['#EF9A9A', '#F44336'],
                    },
                    China: {
                        value: 260.000,
                        color: ['#F48FB1', '#E91E63'],
                    },
                    Brazil: {
                        value: 107.000,
                        color: ['#CE93D8', '#9C27B0'],
                    },
                    EU: {
                        value: 68.300,
                        color: ['#B39DDB', '#673AB7'],
                    },
                    India: {
                        value: 27.500,
                        color: ['#9FA8DA', '#3F51B5'],
                    },
                    Russia: {
                        value: 14.500,
                        color: ['#90CAF9', '#2196F3'],
                    },
                },
            },
        ]
        return {
            'WSetOne': {
                'keySelect': 'bar-v-normal',
                'opt1c': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds1c,
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

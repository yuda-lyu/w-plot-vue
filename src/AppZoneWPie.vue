<template>
    <div>


        <div class="head1"><span style="cursor:pointer;" title="open for copy link to view component" onclick="window.open('//yuda-lyu.github.io/w-plot-vue/examples/app.html?cmp='+this.innerText,'_blank')">w-pie</span></div>


        <div style="padding:0px;">


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set & marginLeft & marginRight & marginTop & marginBottom'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                        marginLeft: 50,
                        marginRight: 50,
                        marginTop: 50,
                        marginBottom: 50,
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set & pieThicknessRatio'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                        pieThicknessRatio:0.05,
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set & pieBorderRadius'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                        pieBorderRadius:0,
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set & pieBorderWidth & pieBorderRadius'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                        pieBorderWidth:0,
                        pieBorderRadius:0,
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set(color)'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1b,
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set(color, gradient)'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1c,
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set & pieKpColor'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                        pieKpColor:{
                            'USA':'#F44336',
                            'China':'#E91E63',
                            'Brazil':'#9C27B0',
                            'EU':'#673AB7',
                            'India':'#3F51B5',
                            'Russia':'#2196F3',
                        },
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set & pieKpColor(gradient)'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                        pieKpColor:{
                            'USA':['#EF9A9A','#F44336'],
                            'China':['#F48FB1','#E91E63'],
                            'Brazil':['#CE93D8','#9C27B0'],
                            'EU':['#B39DDB','#673AB7'],
                            'India':['#9FA8DA','#3F51B5'],
                            'Russia':['#90CAF9','#2196F3'],
                        },
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set & hide labels'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                        pieShowLabels:false,
                    }"
                ></w-pie>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-pie'"
                    :casename="'one-set & hide legned'"
                ></demolink>

                <w-pie
                    :opt="{
                        ...WPie.opt1a,
                        showLegend:false,
                    }"
                ></w-pie>

            </div>


        </div>


    </div>
</template>

<script>
import demolink from './components/demolink.vue'
import WPie from './components/WPie.vue'

export default {
    components: {
        demolink,
        WPie,
    },
    props: {
    },
    data: function() {
        let keys1 = ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia']
        let rds1a = [
            {
                name: 'Corn',
                data: { USA: 406.292, China: 260.000, Brazil: 107.000, EU: 68.300, India: 27.500, Russia: 14.500 },
            },
        ]
        let rds1b = [
            {
                name: 'Corn',
                data: {
                    USA: {
                        value: 406.292,
                        color: '#F44336',
                    },
                    China: {
                        value: 260.000,
                        color: '#E91E63',
                    },
                    Brazil: {
                        value: 107.000,
                        color: '#9C27B0',
                    },
                    EU: {
                        value: 68.300,
                        color: '#673AB7',
                    },
                    India: {
                        value: 27.500,
                        color: '#3F51B5',
                    },
                    Russia: {
                        value: 14.500,
                        color: '#2196F3',
                    },
                },
            },
        ]
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
            'WPie': {
                'opt1a': {
                    width: 400,
                    height: 400,
                    keys: keys1,
                    rds: rds1a,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
                'opt1b': {
                    width: 400,
                    height: 400,
                    keys: keys1,
                    rds: rds1b,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
                'opt1c': {
                    width: 400,
                    height: 400,
                    keys: keys1,
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

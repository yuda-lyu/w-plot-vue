<template>
    <div>


        <div class="head1"><span style="cursor:pointer;" title="open for copy link to view component" onclick="window.open('//yuda-lyu.github.io/w-plot-vue/examples/app.html?cmp='+this.innerText,'_blank')">w-rose</span></div>


        <div style="padding:0px;">


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set & marginLeft & marginRight & marginTop & marginBottom'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                        marginLeft: 50,
                        marginRight: 50,
                        marginTop: 50,
                        marginBottom: 50,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set & roseBorderWidth'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                        roseBorderWidth:0,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set & roseWidthRatio'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                        roseWidthRatio:0,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set & showLegend'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                        showLegend:true,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set & showLegend & legendPosition'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                        showLegend:true,
                        legendPosition:'topleft',
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set(color)'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1b,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set(color, gradient)'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1c,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set & roseKpColor'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                        roseKpColor:{
                            'USA':'#F44336',
                            'China':'#E91E63',
                            'Brazil':'#9C27B0',
                            'EU':'#673AB7',
                            'India':'#3F51B5',
                            'Russia':'#2196F3',
                        },
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set & roseKpColor(gradient)'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                        roseKpColor:{
                            'USA':['#EF9A9A','#F44336'],
                            'China':['#F48FB1','#E91E63'],
                            'Brazil':['#CE93D8','#9C27B0'],
                            'EU':['#B39DDB','#673AB7'],
                            'India':['#9FA8DA','#3F51B5'],
                            'Russia':['#90CAF9','#2196F3'],
                        },
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'one-set & roseShowLabels'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt1a,
                        roseShowLabels:true,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2a,
                        roseShowLabels:false,
                        showLegend:true,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set & roseBorderWidth'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2a,
                        roseShowLabels:false,
                        showLegend:true,
                        roseBorderWidth:0,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set & roseWidthRatio'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2a,
                        roseShowLabels:false,
                        showLegend:true,
                        roseWidthRatio:0,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set(series color)'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2b,
                        roseShowLabels:false,
                        showLegend:true,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set(series color, gradient)'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2c,
                        roseShowLabels:false,
                        showLegend:true,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set(color)'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2d,
                        roseShowLabels:false,
                        showLegend:true,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set(color, gradient)'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2e,
                        roseShowLabels:false,
                        showLegend:true,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set & roseKpColor'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2a,
                        roseShowLabels:false,
                        showLegend:true,
                        roseKpColor:{
                            '0.USA':'#FF8A80',
                            '1.USA':'#F44336',
                            '0.China':'#FF80AB',
                            '1.China':'#E91E63',
                            '0.Brazil':'#EA80FC',
                            '1.Brazil':'#9C27B0',
                            '0.EU':'#B388FF',
                            '1.EU':'#673AB7',
                            '0.India':'#8C9EFF',
                            '1.India':'#3F51B5',
                            '0.Russia':'#82B1FF',
                            '1.Russia':'#2196F3',
                        },
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set & roseKpColor(gradient)'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2a,
                        roseShowLabels:false,
                        showLegend:true,
                        roseKpColor:{
                            '0.USA':['rgb(255, 205, 210)', 'rgb(229, 115, 115)'],
                            '1.USA':['rgb(210, 205, 255)', 'rgb(115, 115, 229)'],
                            '0.China':['rgb(255, 185, 210)', 'rgb(229, 95, 115)'],
                            '1.China':['rgb(210, 185, 255)', 'rgb(115, 95, 229)'],
                            '0.Brazil':['rgb(255, 165, 210)', 'rgb(229, 75, 115)'],
                            '1.Brazil':['rgb(210, 165, 255)', 'rgb(115, 75, 229)'],
                            '0.EU':['rgb(255, 145, 210)', 'rgb(229, 55, 115)'],
                            '1.EU':['rgb(210, 145, 255)', 'rgb(115, 55, 229)'],
                            '0.India':['rgb(255, 125, 210)', 'rgb(229, 35, 115)'],
                            '1.India':['rgb(210, 125, 255)', 'rgb(115, 35, 229)'],
                            '0.Russia':['rgb(255, 105, 210)', 'rgb(229, 15, 115)'],
                            '1.Russia':['rgb(210, 105, 255)', 'rgb(115, 15, 229)'],
                        },
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set && show labels'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2a,
                        roseShowLabels:true,
                        showLegend:true,
                    }"
                ></w-rose>

            </div>


            <div class="bk">
                <demolink
                    :kbname="'w-rose'"
                    :casename="'multi-set && hide legned'"
                ></demolink>

                <w-rose
                    :opt="{
                        ...WRose.opt2a,
                        roseShowLabels:false,
                        showLegend:false,
                    }"
                ></w-rose>

            </div>


        </div>


    </div>
</template>

<script>
import demolink from './components/demolink.vue'
import WRose from './components/WRose.vue'

export default {
    components: {
        demolink,
        WRose,
    },
    props: {
    },
    data: function() {
        let keys = ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia']
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
        let rds2a = [
            {
                name: 'Corn',
                data: { USA: 406.292, China: 260.000, Brazil: 107.000, EU: 68.300, India: 27.500, Russia: 14.500 },
            },
            {
                name: 'Wheat',
                data: { USA: 51.086, China: 136.000, Brazil: 5.500, EU: 141.000, India: 107.180, Russia: 77.000 },
            },
        ]
        let rds2b = [
            {
                name: 'Corn',
                color: '#E91E63',
                data: { USA: 406.292, China: 260.000, Brazil: 107.000, EU: 68.300, India: 27.500, Russia: 14.500 },
            },
            {
                name: 'Wheat',
                color: '#9C27B0',
                data: { USA: 51.086, China: 136.000, Brazil: 5.500, EU: 141.000, India: 107.180, Russia: 77.000 },
            },
        ]
        let rds2c = [
            {
                name: 'Corn',
                color: ['rgb(243, 150, 199)', 'rgb(233, 30, 99)'],
                data: { USA: 406.292, China: 260.000, Brazil: 107.000, EU: 68.300, India: 27.500, Russia: 14.500 },
            },
            {
                name: 'Wheat',
                color: ['rgb(206, 159, 236)', 'rgb(156, 39, 176)'],
                data: { USA: 51.086, China: 136.000, Brazil: 5.500, EU: 141.000, India: 107.180, Russia: 77.000 },
            },
        ]
        let rds2d = [
            {
                name: 'Corn',
                data: {
                    USA: {
                        value: 406.292,
                        color: '#FF8A80',
                    },
                    China: {
                        value: 260.000,
                        color: '#FF80AB',
                    },
                    Brazil: {
                        value: 107.000,
                        color: '#EA80FC',
                    },
                    EU: {
                        value: 68.300,
                        color: '#B388FF',
                    },
                    India: {
                        value: 27.500,
                        color: '#8C9EFF',
                    },
                    Russia: {
                        value: 14.500,
                        color: '#82B1FF',
                    },
                },
            },
            {
                name: 'Wheat',
                data: {
                    USA: {
                        value: 51.086,
                        color: '#F44336',
                    },
                    China: {
                        value: 136.000,
                        color: '#E91E63',
                    },
                    Brazil: {
                        value: 5.500,
                        color: '#9C27B0',
                    },
                    EU: {
                        value: 141.000,
                        color: '#673AB7',
                    },
                    India: {
                        value: 107.180,
                        color: '#3F51B5',
                    },
                    Russia: {
                        value: 77.000,
                        color: '#2196F3',
                    },
                },
            },
        ]
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
            'WRose': {
                'opt1a': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds1a,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
                'opt1b': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds1b,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
                'opt1c': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds1c,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
                'opt2a': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds2a,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
                'opt2b': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds2b,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
                'opt2c': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds2c,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
                'opt2d': {
                    width: 400,
                    height: 400,
                    keys,
                    rds: rds2d,
                    xTitle: 'Countries',
                    yTitle: 'Weight (MT)',
                },
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

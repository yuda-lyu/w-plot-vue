<template>
    <div class="bkh">


        <div class="head1"><span style="cursor:pointer;" title="open for copy link to view component" onclick="window.open('//yuda-lyu.github.io/w-plot-vue/examples/app.html?cmp='+this.innerText,'_blank')">w-plot-2d</span></div>


        <div style="padding:0px;">


            <div class="bk">
                <demolink
                    :kbname="'w-plot-2d'"
                    :casename="'default'"
                ></demolink>

                <w-plot-2d
                    :options="WPlot2d.option1"
                ></w-plot-2d>

            </div>


        </div>


    </div>
</template>

<script>
import demolink from './components/demolink.vue'
import WPlot2d from './components/WPlot2d.vue'


export default {
    components: {
        demolink,
        WPlot2d,
    },
    props: {
    },
    data: function() {
        return {
            'WPlot2d': {
                'option1': {
                    title: {
                        text: 'AAPL Stock Price'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Price'
                        }
                    },
                    tooltip: {
                        headerFormat: '<div style="font-size:8pt;">{point.x:%Y/%m/%d %H:%M}</div><br/>',
                        pointFormat: ' Price: <b>{point.y}</b>'
                    },
                    series: [{
                        name: 'AAPL',
                        data: window.dataAAPL,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
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

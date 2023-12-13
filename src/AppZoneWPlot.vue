<template>
    <div>


        <div class="head1"><span style="cursor:pointer;" title="open for copy link to view component" onclick="window.open('//yuda-lyu.github.io/w-plot-vue/examples/app.html?cmp='+this.innerText,'_blank')">w-plot</span></div>


        <div style="padding:0px;">


            <div class="bk">
                <demolink
                    :kbname="'w-plot'"
                    :casename="'default'"
                ></demolink>

                <w-plot
                    :options="WPlot.option1"
                ></w-plot>

            </div>


        </div>


    </div>
</template>

<script>
import demolink from './components/demolink.vue'
import WPlot from './components/WPlot.vue'


export default {
    components: {
        demolink,
        WPlot,
    },
    props: {
    },
    data: function() {
        return {
            'WPlot': {
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

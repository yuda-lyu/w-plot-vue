<template>
    <div class="bkh">


        <div class="head1"><span style="cursor:pointer;" title="open for copy link to view component" onclick="window.open('//yuda-lyu.github.io/w-geo-vue/examples/app.html?cmp='+this.innerText,'_blank')">w-plot-3d</span></div>


        <div style="padding:0px;">


            <div class="bk">
                <demolink
                    :kbname="'w-plot-3d'"
                    :casename="'default'"
                ></demolink>

                <w-plot-3d
                    :options="WPlot3d.option1"
                ></w-plot-3d>

            </div>


        </div>


    </div>
</template>

<script>
import demolink from './components/demolink.vue'
import WPlot3d from './components/WPlot3d.vue'


export default {
    components: {
        demolink,
        WPlot3d,
    },
    props: {
    },
    data: function() {
        return {
            'WPlot3d': {
                'option1': {
                    width: 600,
                    height: 600,
                    items: [
                        // {
                        //     url:'./3d_block.stl',
                        //     name:'block',
                        //     color:'#fff', //{ h: 320, s: 0.2, l: 0.15 }
                        // },
                        // {
                        //     url:'./3D_Domain(ascii).stl',
                        //     name:'testerA',
                        //     color:'#fff', //{ h: 320, s: 0.2, l: 0.15 }
                        // },
                        {
                            url: './topo_surface.stl',
                            name: 'Surface',
                            color: '#d65c5c',
                            opacity: 0.9,
                        },
                        {
                            url: './A.stl',
                            name: 'A',
                            color: '#d6d65c',
                            opacity: 0.9,
                        },
                        {
                            url: './B.stl',
                            name: 'B',
                            color: '#5cd65c',
                            opacity: 0.9,
                        },
                        {
                            url: './C.stl',
                            name: 'C',
                            color: '#5cd6d6',
                            opacity: 0.9,
                        },
                        {
                            url: './D.stl',
                            name: 'D',
                            color: '#5c5cd6',
                            opacity: 0.9,
                        },
                        {
                            url: './E.stl',
                            name: 'E',
                            color: '#d65cd6',
                            opacity: 0.9,
                        },
                    ],
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

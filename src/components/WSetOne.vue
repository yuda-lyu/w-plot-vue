<template>
    <WSetMulti
        v-bind="{...$props,mode:'one'}"
        v-on="$listeners"
    >
        <template v-slot:head>
            <slot name="head"></slot>
        </template>
    </WSetMulti>
</template>

<script>
import WSetMulti from './WSetMulti.vue'


/**
 * @vue-prop {Object} [opt={}] 輸入設定物件，預設{}
 */
export default {
    components: {
        WSetMulti,
    },
    props: {
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
            default: 215,
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
        }
    },
    computed: {
    },
    methods: {
    },
}
</script>

<style scoped>
</style>

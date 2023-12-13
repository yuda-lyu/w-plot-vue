import get from 'lodash-es/get'


/**
 * 產生預設Highcharts設定物件
 *
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @returns {Object} 回傳物件
 */
function getDefOpt(opt = {}) {

    //useTooltip
    let useTooltip = get(opt, 'useTooltip', true)

    //useLegend
    let useLegend = get(opt, 'useLegend', true)

    let _opt = {

        credits: {
            enabled: false //不顯示highchart icon
        },

        navigation: {
            buttonOptions: {
                enabled: false //若有引用export.js時關閉匯出按鈕
            }
        },

        boost: {
            enabled: true,
            // useGPUTranslations: true,
        },

        plotOptions: {
            series: {
                animation: false, //關閉動畫
            },
        },

        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        tooltip: {
            useHTML: true,
            enabled: useTooltip,
        },

        legend: {
            useHTML: true,
            enabled: useLegend,
        },

    }

    return _opt
}


export default getDefOpt

import get from 'lodash-es/get.js'


/**
 * 產生預設Highcharts圖例物件
 *
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @returns {Object} 回傳物件
 */
function getDefLegend(opt = {}) {

    let legnedFontFamily = get(opt, 'legnedFontFamily', '微軟正黑體')
    let legnedFontSize = get(opt, 'legnedFontSize', '9pt')
    let legnedColor = get(opt, 'legnedColor', '#222')

    let legendBackgroundColor = get(opt, 'legendBackgroundColor', 'rgba(255,255,255,0.75)')
    let legnedBorderColor = get(opt, 'legnedBorderColor', '#aaa')

    let obj = {
        useHTML: true,
        enabled: true,
        shared: true,
        floating: true,
        layout: 'vertical',
        // align: 'right',
        // verticalAlign: 'top',
        // x: -5,
        // y: 5,
        backgroundColor: legendBackgroundColor,
        borderColor: legnedBorderColor,
        borderWidth: 1,
        itemStyle: {
            fontFamily: legnedFontFamily,
            fontSize: legnedFontSize,
            color: legnedColor,
        },
    }

    return obj
}


export default getDefLegend

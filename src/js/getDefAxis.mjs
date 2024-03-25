import get from 'lodash-es/get.js'
import dig from 'wsemi/src/dig.mjs'


/**
 * 產生預設Highcharts軸物件
 *
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @returns {Object} 回傳物件
 */
function getDefAxis(opt = {}) {
    //預設軸物件

    let softMax = get(opt, 'softMax')
    let vDig = get(opt, 'vDig')

    let titleFontFamily = get(opt, 'titleFontFamily', '微軟正黑體')
    let titleFontSize = get(opt, 'titleFontSize', '12pt')
    let titleColor = get(opt, 'titleColor', '#000')

    let labelFontFamily = get(opt, 'labelFontFamily', '微軟正黑體')
    let labelFontSize = get(opt, 'labelFontSize', '9pt')
    let labelColor = get(opt, 'labelColor', '#222')

    let obj = {

        crosshair: true,

        title: {
            useHTML: true,
            text: '',
            style: {
                fontFamily: titleFontFamily,
                fontSize: titleFontSize,
                color: titleColor,
            },
        },

        softMax,

        labels: {
            autoRotation: false,
            style: {
                fontFamily: labelFontFamily,
                fontSize: labelFontSize,
                color: labelColor,
            },
            formatter: function(hc) {
                if (vDig) {
                    return dig(hc.value, vDig)
                }
                return hc.value
            },
        },

        lineColor: '#666',
        lineWidth: 1,

        //tickInterval: 0.2,
        gridLineColor: '#eeeeee',
        gridLineWidth: 1,

        //minorTickInterval: 0.1,
        minorGridLineColor: '#eeeeee',
        minorGridLineWidth: 1,

        tickPosition: 'inside',
        tickColor: '#222222',
        tickWidth: 1,
        tickLength: 5,

        minorTickPosition: 'inside',
        minorTickColor: '#222222',
        minorTickWidth: 1,
        minorTickLength: 5,

        //opposite: false,

    }

    return obj
}


export default getDefAxis

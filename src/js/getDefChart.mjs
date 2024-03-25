import get from 'lodash-es/get.js'


/**
 * 產生預設Highcharts圖物件
 *
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @returns {Object} 回傳物件
 */
function getDefChart(opt = {}) {

    //marginLeftShift, marginRightShift, marginTopShift, marginBottomShift
    let marginLeftShift = get(opt, 'marginLeftShift', 60)
    let marginRightShift = get(opt, 'marginRightShift', 0)
    let marginTopShift = get(opt, 'marginTopShift', 10)
    let marginBottomShift = get(opt, 'marginBottomShift', 60)

    //spacingLeft
    let spacingLeft = get(opt, 'spacingLeft', 0)
    let spacingRight = get(opt, 'spacingRight', 0)
    let spacingTop = get(opt, 'spacingTop', 0)
    let spacingBottom = get(opt, 'spacingBottom', 0)

    //plotBorderColor
    let plotBorderColor = get(opt, 'plotBorderColor', '#666')

    //plotBorderWidth
    let plotBorderWidth = get(opt, 'plotBorderWidth', 1)

    //sp, 邊緣最少5px以上, 否則曲線圖標貼框時會被裁切
    let sp = get(opt, 'space', 5)

    let obj = {
        animation: false, //關閉動畫
        plotBorderColor,
        plotBorderWidth,
        marginLeft: sp + marginLeftShift,
        marginRight: sp + marginRightShift,
        marginTop: sp + marginTopShift,
        marginBottom: sp + marginBottomShift,
        spacingLeft,
        spacingRight,
        spacingTop,
        spacingBottom,
    }

    return obj
}


export default getDefChart

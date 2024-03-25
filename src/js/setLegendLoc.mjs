import get from 'lodash-es/get.js'
import cdbl from 'wsemi/src/cdbl.mjs'


/**
 * 使用繪圖設定物件針對Highcharts物件處理圖例位置
 *
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Object} [optPic={}] 輸入繪圖設定物件，預設{}
 * @returns {Object} 回傳物件
 */
function setLegendLoc(opt, optPic = {}) {

    let legendPosition = get(optPic, 'legendPosition', 'topright')

    let ml = get(opt, 'chart.marginLeft') || get(opt, 'chart.margin-left')
    ml = cdbl(ml)
    let mr = get(opt, 'chart.marginRight') || get(opt, 'chart.margin-right')
    mr = cdbl(mr)
    let mt = get(opt, 'chart.marginTop') || get(opt, 'chart.margin-top')
    mt = cdbl(mt)
    let mb = get(opt, 'chart.marginBottom') || get(opt, 'chart.margin-bottom')
    mb = cdbl(mb)
    // console.log('ml', ml)
    // console.log('mr', mr)
    // console.log('mt', mt)
    // console.log('mb', mb)

    //legendIgnoreMargin
    let legendIgnoreMargin = get(optPic, 'legendIgnoreMargin', false)

    if (legendIgnoreMargin) {
        ml = 0
        mr = 0
        mt = 0
        mb = 0
    }

    let sl = get(opt, 'chart.spacingLeft') || get(opt, 'chart.spacing-left')
    sl = cdbl(sl)
    let sr = get(opt, 'chart.spacingRight') || get(opt, 'chart.spacing-right')
    sr = cdbl(sr)
    let st = get(opt, 'chart.spacingTop') || get(opt, 'chart.spacing-top')
    st = cdbl(st)
    let sb = get(opt, 'chart.spacingBottom') || get(opt, 'chart.spacing-bottom')
    sb = cdbl(sb)
    // console.log('sl', sl)
    // console.log('sr', sr)
    // console.log('st', st)
    // console.log('sb', sb)

    //legendIgnoreSpacing
    let legendIgnoreSpacing = get(optPic, 'legendIgnoreSpacing', false)

    if (legendIgnoreSpacing) {
        sl = 0
        sr = 0
        st = 0
        sb = 0
    }

    let lg = get(opt, 'legend', {})
    opt.legend = lg //若無, 則先給予空物件, 避免後續無法直接鏈式給予值

    //legendPosition
    if (legendPosition === 'topleft') {
        opt.legend.align = 'left'
        opt.legend.verticalAlign = 'top'
        let dx = 5
        let dy = 5
        opt.legend.x = ml - sl + dx
        opt.legend.y = mt - st + dy
    }
    else if (legendPosition === 'bottomleft') {
        opt.legend.align = 'left'
        opt.legend.verticalAlign = 'bottom'
        let dx = 5
        let dy = -5
        opt.legend.x = ml - sl + dx
        opt.legend.y = -mb + sb + dy
    }
    else if (legendPosition === 'bottomright') {
        opt.legend.align = 'right'
        opt.legend.verticalAlign = 'bottom'
        let dx = -5
        let dy = -5
        opt.legend.x = -mr + sr + dx
        opt.legend.y = -mb + sb + dy
    }
    else { //legendPosition==='topright'
        opt.legend.align = 'right'
        opt.legend.verticalAlign = 'top'
        let dx = -5
        let dy = 5
        opt.legend.x = -mr + sr + dx
        opt.legend.y = mt - st + dy
    }
    // console.log('opt.legend', JSON.stringify(opt.legend))

    return opt
}


export default setLegendLoc

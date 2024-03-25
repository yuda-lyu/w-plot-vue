import get from 'lodash-es/get.js'
import map from 'lodash-es/map.js'
import each from 'lodash-es/each.js'
import size from 'lodash-es/size.js'
import merge from 'lodash-es/merge.js'
import isNumber from 'lodash-es/isNumber.js'
// import range from 'lodash-es/range.js'
// import cloneDeep from 'lodash-es/cloneDeep.js'
import haskey from 'wsemi/src/haskey.mjs'
// import isestr from 'wsemi/src/isestr.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import isearr from 'wsemi/src/isearr.mjs'
import getDefOpt from './getDefOpt.mjs'
import getDefChart from './getDefChart.mjs'
import getDefAxis from './getDefAxis.mjs'
import getDefLegend from './getDefLegend.mjs'
import setLegendLoc from './setLegendLoc.mjs'


function genBarOpt(width, height, keys, rds, optPlot = {}) {

    //marginLeft, marginRight, marginTop, marginBottom
    let marginLeft = get(optPlot, 'marginLeft', null)
    let marginRight = get(optPlot, 'marginRight', null)
    let marginTop = get(optPlot, 'marginTop', null)
    let marginBottom = get(optPlot, 'marginBottom', null)

    //direction
    let direction = get(optPlot, 'direction', 'vertical')
    if (direction !== 'vertical' && direction !== 'horizontal') {
        direction = 'vertical'
    }

    //xTitle
    let xTitle = get(optPlot, 'xTitle', '')

    //yTitle
    let yTitle = get(optPlot, 'yTitle', '')

    //barColor
    let barColor = get(optPlot, 'barColor', undefined)

    //barKpColor
    let barKpColor = get(optPlot, 'barKpColor', undefined)

    //barGroupWidthRatio
    let barGroupWidthRatio = get(optPlot, 'barGroupWidthRatio', 0.2)

    //barWidthRatio
    let barWidthRatio = get(optPlot, 'barWidthRatio', 0.2)

    // //barPointWidth
    // let barPointWidth = get(optPlot, 'barPointWidth', 13)

    //barBorderWidth
    let barBorderWidth = get(optPlot, 'barBorderWidth', 1)

    //barDisplay
    let barDisplay = get(optPlot, 'barDisplay', 'separate')
    if (barDisplay !== 'separate' && barDisplay !== 'stackNormal' && barDisplay !== 'stackPercent') {
        barDisplay = 'separate'
    }

    //barStacking
    let barStacking
    if (barDisplay === 'stackNormal') {
        barStacking = 'normal'
    }
    else if (barDisplay === 'stackPercent') {
        barStacking = 'percent'
    }

    //barBorderRadius
    let barBorderRadius = get(optPlot, 'barBorderRadius', 4)

    //barShowLabels
    let barShowLabels = get(optPlot, 'barShowLabels', true)

    //barUseInnerLabelsForHorizontal
    let barUseInnerLabelsForHorizontal = get(optPlot, 'barUseInnerLabelsForHorizontal', false)

    //showLegend
    let showLegend = get(optPlot, 'showLegend', false)

    //categories
    let categories = keys
    // console.log('categories', categories)

    //gvc
    let gvc = (color) => {
        if (isearr(color)) {
            let n = size(color)
            if (n === 1) {
                color = color[0]
            }
            else {
                let stops = map(color, (c, kc) => {
                    return [kc / (n - 1), c]
                })
                color = {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops,
                }
            }
        }
        return color
    }

    //ds
    let ds = []
    each(rds, (rd, krd) => {

        //name
        let name = get(rd, 'name', '')
        // console.log('name', name)

        //_color1
        let _color1 = barColor

        //_color2
        let _color2 = get(rd, 'color', undefined)

        //_data
        let _data = get(rd, 'data', {})

        //data
        let colorFirst = null
        let data = []
        each(keys, (k) => {

            //vo
            let vo = get(_data, k, null)

            //v
            let v = vo
            if (iseobj(v)) {
                if (!haskey(v, 'value')) {
                    throw new Error('bar data is an object but no value')
                }
                v = get(v, 'value', null)
            }
            // console.log(k, v)

            //_color3, _color4, _color5
            let _color3 = get(barKpColor, k, undefined)
            let _color4 = get(barKpColor, `${krd}.${k}`, undefined)
            let _color5 = get(vo, 'color', undefined)

            //color
            let color = gvc(_color1 || _color2 || _color3 || _color4 || _color5) //指定各bar顏色

            if (colorFirst === null) {
                colorFirst = color
            }

            //push
            data.push({
                name: k,
                y: v,
                color,
            })

        })
        // console.log('colorFirst', colorFirst)
        // console.log('data', data)

        //push
        ds.push({
            name,
            data,
            color: colorFirst,
        })

    })
    // console.log('ds', ds)

    //dopt
    let dopt = getDefOpt(optPlot)

    //dct
    let dct = getDefChart(optPlot)

    //dax
    let _dax1 = getDefAxis(optPlot)
    let _dax2 = {
        categories,
        // crosshair: true,
        // panningEnabled: false,
        // tickmarkPlacement: 'on',
        labels: {
            allowOverlap: true,
            // autoRotationLimit: 0,
            // rotation: 50,
        },
    }
    let dax = merge(_dax1, _dax2)
    dax.title.text = xTitle
    // dax.min = xmin
    // dax.max = xmax
    // if (!isestr(xtitle)) {
    //     dax.labels.formatter = function (hc) {
    //         return ''
    //     }
    // }
    // console.log('dax', dax)

    //day
    let _day1 = getDefAxis(optPlot)
    let _day2 = {
        // tickmarkPlacement: 'on',
    }
    let day = merge(_day1, _day2)
    day.title.text = yTitle
    day.min = 0 //從0開始
    // console.log('day', day)

    //dlg
    let dlg = getDefLegend(optPlot)
    // console.log('dlg', dlg)

    //optHc
    let optHc = {
        ...dopt,

        chart: {
            ...dct,
            type: direction === 'vertical' ? 'column' : 'bar',
            width,
            height,
        },

        xAxis: dax,

        yAxis: day,

        legend: dlg,

        series: ds,

    }

    // optHc.tooltip = {
    //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    // '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //     footerFormat: '</table>',
    //     shared: true,
    //     useHTML: true
    // }

    //margin
    if (true) {
        if (isNumber(marginLeft)) {
            optHc.chart.marginLeft = marginLeft
        }
        if (isNumber(marginRight)) {
            optHc.chart.marginRight = marginRight
        }
        if (isNumber(marginTop)) {
            optHc.chart.marginTop = marginTop
        }
        if (isNumber(marginBottom)) {
            optHc.chart.marginBottom = marginBottom
        }
        // console.log('optHc(margin)', optHc)
    }

    //stackPercent
    if (barDisplay === 'stackPercent') {
        if (direction === 'vertical') {
            optHc.chart.marginLeft += 11
        }
        optHc.yAxis.labels.formatter = (hc) => {
            return `${hc.value}%`
        }
    }

    //horizontal, 會影響marginLeft故放margin後面
    if (direction === 'horizontal' && barUseInnerLabelsForHorizontal) {
        optHc.chart.marginLeft = 40
        optHc.xAxis.title.margin = 21
        optHc.xAxis.labels.enabled = false
        // optHc.xAxis.startOnTick = true
        // optHc.xAxis.endOnTick = true
        optHc.xAxis.tickWidth = 0
        // optHc.xAxis.gridLineWidth = 0
        // optHc.xAxis.minorGridLineWidth = 0
        optHc.xAxis.min = -0.25
        // optHc.xAxis.max = size(categories) - 1 - 0.25
        optHc.xAxis.tickInterval = 1
        // optHc.xAxis.tickAmount = size(categories)
        // optHc.xAxis.tickPositions = range(-1, size(categories))
        // optHc.xAxis.tickPosition = 'outside'
        optHc.xAxis.plotLines = [ //因highcharts的tick是between, 且min設定-0.25, 故無法繪製位置-0.5的gridLine, 得另外補畫
            {
                color: optHc.xAxis.gridLineColor,
                width: optHc.xAxis.gridLineWidth,
                value: -0.5,
                // dashStyle: 'LongDash',
                // zIndex: 1,
            },
        ]
    }

    //column
    if (true) {
        optHc.plotOptions = {
            ...optHc.plotOptions,

            series: {
                groupPadding: barGroupWidthRatio,
                pointPadding: barWidthRatio,
                // pointWidth: barPointWidth,
                borderWidth: barBorderWidth,
                // crisp: false,
                // centerInCategory: false,
                grouping: true,
                borderRadius: barBorderRadius,
                // dataSorting: {
                //     enabled: true,
                // },
                stacking: barStacking, //undefined, "normal", "overlap", "percent", "stream"
                dataLabels: {
                    enabled: barShowLabels,
                    allowOverlap: true,
                    // align: 'center',
                },
            },

        }
        // console.log('optHc(column)', optHc)
    }

    //legend, 會使用margin故放最後
    if (true) {

        //setLegendLoc
        optHc = setLegendLoc(optHc, optPlot)

        //showLegend
        optHc.legend.enabled = showLegend

        // console.log('optHc(legend)', optHc)
    }

    return optHc
}


export default genBarOpt

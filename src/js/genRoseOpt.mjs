import get from 'lodash-es/get'
import map from 'lodash-es/map'
import each from 'lodash-es/each'
import size from 'lodash-es/size'
import merge from 'lodash-es/merge'
import isNumber from 'lodash-es/isNumber'
// import cloneDeep from 'lodash-es/cloneDeep'
import haskey from 'wsemi/src/haskey.mjs'
// import isestr from 'wsemi/src/isestr.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import isearr from 'wsemi/src/isearr.mjs'
import getDefOpt from './getDefOpt.mjs'
import getDefChart from './getDefChart.mjs'
import getDefAxis from './getDefAxis.mjs'
import getDefLegend from './getDefLegend.mjs'
import setLegendLoc from './setLegendLoc.mjs'


function genPieOpt(width, height, keys, rds, optPlot = {}) {

    //marginLeft, marginRight, marginTop, marginBottom
    let marginLeft = get(optPlot, 'marginLeft', null)
    let marginRight = get(optPlot, 'marginRight', null)
    let marginTop = get(optPlot, 'marginTop', null)
    let marginBottom = get(optPlot, 'marginBottom', null)

    //xLabelFontSize
    let xLabelFontSize = get(optPlot, 'xLabelFontSize', '10pt')

    //yTitle
    let yTitle = get(optPlot, 'yTitle', '')

    //yTitleFontSize
    let yTitleFontSize = get(optPlot, 'yTitleFontSize', '10pt')

    //yTitleColor
    let yTitleColor = get(optPlot, 'yTitleColor', '#444')

    //yLabelFontSize
    let yLabelFontSize = get(optPlot, 'yLabelFontSize', '8pt')

    //yLabelColor
    let yLabelColor = get(optPlot, 'yLabelColor', '#888')

    //roseKpColor
    let roseKpColor = get(optPlot, 'roseKpColor', undefined)

    //roseWidthRatio
    let roseWidthRatio = get(optPlot, 'roseWidthRatio', 0.25)

    //roseBorderWidth
    let roseBorderWidth = get(optPlot, 'roseBorderWidth', 1)

    //roseShowLabels
    let roseShowLabels = get(optPlot, 'roseShowLabels', false)

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
        let _color1 = null

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
                    throw new Error('rose data is an object but no value')
                }
                v = get(v, 'value', null)
            }
            // console.log(k, v)

            //_color3, _color4, _color5
            let _color3 = get(roseKpColor, k, undefined)
            let _color4 = get(roseKpColor, `${krd}.${k}`, undefined)
            let _color5 = get(vo, 'color', undefined)

            //color
            let color = gvc(_color1 || _color2 || _color3 || _color4 || _color5) //指定各rose顏色

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
    let dct = getDefChart({
        ...optPlot,
        space: 40,
        marginLeftShift: 0,
        marginRightShift: 0,
        marginTopShift: 0,
        marginBottomShift: 0,
        plotBorderColor: 'transparent',
    })
    // console.log('dct', dct)

    //dax
    let _dax1 = getDefAxis({
        ...optPlot,
        labelFontSize: xLabelFontSize,
    })
    let _dax2 = {
        categories,
        // crosshair: true,
        // panningEnabled: false,
        labels: {
            allowOverlap: true,
            // autoRotationLimit: 0,
            // rotation: 50,
        },
    }
    let dax = merge(_dax1, _dax2)
    // console.log('dax', dax)

    //day
    let _day1 = getDefAxis({
        ...optPlot,
        titleFontSize: yTitleFontSize,
        titleColor: yTitleColor,
        labelFontSize: yLabelFontSize,
        labelColor: yLabelColor,
    })
    let _day2 = {
        // reversedStacks: false,
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
            polar: true,
            type: 'column',
            width,
            height,
        },

        xAxis: dax,

        yAxis: day,

        legend: dlg,

        series: ds,

    }

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

    //rose
    if (true) {
        optHc.plotOptions = {
            ...optHc.plotOptions,

            series: {
                stacking: 'normal',
                groupPadding: 0,
                pointPadding: roseWidthRatio,
                // pointWidth: rosePointWidth,
                borderWidth: roseBorderWidth,
                dataLabels: {
                    enabled: roseShowLabels,
                    allowOverlap: true,
                    align: 'center',
                    // distance: 50,
                    // crop: false,
                    // inside: false,
                    // overflow: 'allow',
                    // position: 'left',
                    y: -10,
                    // format: `
                    //     <div style="width:50px;">
                    //         <div style="font-weight:bold;">{point.name}</div>
                    //         <div style="opacity:0.6;">{point.y}</div>
                    //     </div>
                    // `,
                },
            },

        }
        // console.log('optHc(rose)', optHc)
    }

    //legend
    if (true) {

        //setLegendLoc
        optHc = setLegendLoc(optHc, {
            ...optPlot,
            legendIgnoreMargin: true,
        })

        //showLegend
        optHc.legend.enabled = showLegend

        // console.log('optHc(legend)', optHc)
    }

    return optHc
}


export default genPieOpt

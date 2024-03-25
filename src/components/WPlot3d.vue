<template>
    <div
        :style="`display:inline-block; width:${widthInp}px; min-width:${widthInp}px; height:${heightInp}px; overflow-y:hidden;`"
        :changeOptions="changeOptions"
    >

        <div
            ref="panel"
            :style="`position:relative; width:${widthInp}px; height:${heightInp}px;`"
            v-domresize
            @domresize="updatePanel"
        ></div>

    </div>
</template>

<script>
import get from 'lodash-es/get.js'
import set from 'lodash-es/set.js'
import size from 'lodash-es/size.js'
import each from 'lodash-es/each.js'
import map from 'lodash-es/map.js'
import min from 'lodash-es/min.js'
import max from 'lodash-es/max.js'
import isNumber from 'lodash-es/isNumber.js'
import cloneDeep from 'lodash-es/cloneDeep.js'
import evem from 'wsemi/src/evem.mjs'
import waitFun from 'wsemi/src/waitFun.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import isbol from 'wsemi/src/isbol.mjs'
import isearr from 'wsemi/src/isearr.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import isEle from 'wsemi/src/isEle.mjs'
import isfun from 'wsemi/src/isfun.mjs'
import pmSeries from 'wsemi/src/pmSeries.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import oc from 'wsemi/src/color.mjs'
import domRemove from 'wsemi/src/domRemove.mjs'
import domResize from 'w-component-vue/src/js/domResize.mjs'
import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
// import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import CameraControls from 'camera-controls'


let toRad = Math.PI / 180
let toDeg = 180 / Math.PI


let colorToHex = (c) => {
    // console.log(colorToHex('#ffffff')) // => 16777215
    // console.log(colorToHex('#f26')) // => 16720486
    let h = oc.toHexString(c)
    h = h.replace('#', '')
    h = parseInt(h, 16)
    return h
}


let addStl = async(ev, url, opt = {}) => {

    //color
    let color = get(opt, 'color', null)
    if (!isestr(color)) {
        color = '#fff'
    }

    //opacity
    let opacity = get(opt, 'opacity', null)
    if (!isNumber(opacity)) {
        opacity = 1
    }

    //transparent
    let transparent = opacity < 1

    //loader
    let loader = new STLLoader()
    let geometry = await loader.loadAsync(url, (xhr) => {
        let prog = (xhr.loaded / xhr.total) * 100
        ev.emit('loading', prog)
    })
    // console.log('geometry',geometry)

    //material, MeshLambertMaterial, MeshPhysicalMaterial
    let material = new THREE.MeshLambertMaterial({

        // visible:false,

        color: colorToHex(color),
        // wireframe: true,

        depthTest: true,
        depthWrite: true,

        transparent,
        opacity,

        side: THREE.DoubleSide,

        // polygonOffset: true,
        // polygonOffsetFactor: 1, // positive value pushes polygon further away
        // polygonOffsetUnits: 1,

        // //for MeshPhysicalMaterial
        // clearcoat: 1.0,//物体表面清漆层或者说透明涂层的厚度
        // clearcoatRoughness: 0.1,//透明涂层表面的粗糙度
        // envMap: envTexture,
        // metalness: 0.25,
        // roughness: 0.1,
        // transmission: 0.99,

    })

    //mesh
    let mesh = new THREE.Mesh(geometry, material)
    // console.log('mesh', mesh)

    // // wireframe, 若要使用也需要座標平移
    // var geo = new THREE.WireframeGeometry( geometry ); // or WireframeGeometry
    // var mat = new THREE.LineBasicMaterial( { color: 0x000000 } );
    // var wireframe = new THREE.LineSegments( geo, mat );
    // mesh.add( wireframe )

    return mesh
}


let getCsrdFromMesh = (mesh) => {
    // console.log('mesh',mesh)
    let geometry = mesh.geometry
    // console.log('geometry',geometry)
    let cs = geometry.boundingSphere.center
    // console.log('cs',cloneDeep(cs))
    let rd = geometry.boundingSphere.radius
    // console.log('rd',rd)
    return {
        cs,
        rd,
    }
}


let BoxFromMesh = (mesh) => {
    let r = getCsrdFromMesh(mesh)
    let xmin = r.cs.x - r.rd
    let xmax = r.cs.x + r.rd
    let ymin = r.cs.y - r.rd
    let ymax = r.cs.y + r.rd
    let zmin = r.cs.z - r.rd
    let zmax = r.cs.z + r.rd
    return {
        xmin,
        xmax,
        ymin,
        ymax,
        zmin,
        zmax,
    }
}


let getBoxFromMeshs = (meshs) => {
    let bxs = map(meshs, (mesh) => {
        let bx = BoxFromMesh(mesh)
        // console.log('bx',bx)
        return bx
    })
    let xmin = min(map(bxs, 'xmin'))
    let xmax = max(map(bxs, 'xmax'))
    let ymin = min(map(bxs, 'ymin'))
    let ymax = max(map(bxs, 'ymax'))
    let zmin = min(map(bxs, 'zmin'))
    let zmax = max(map(bxs, 'zmax'))
    return {
        xmin,
        xmax,
        ymin,
        ymax,
        zmin,
        zmax,
    }
}


let getCsrdFromMeshs = (meshs) => {
    let bx = getBoxFromMeshs(meshs)
    // console.log('bx(all)',bx)
    let xrng = bx.xmax - bx.xmin
    let yrng = bx.ymax - bx.ymin
    let zrng = bx.zmax - bx.zmin
    let xc = (bx.xmax + bx.xmin) / 2
    let yc = (bx.ymax + bx.ymin) / 2
    let zc = (bx.zmax + bx.zmin) / 2
    let rd = max([xrng, yrng, zrng])
    return {
        cs: {
            x: xc,
            y: yc,
            z: zc,
        },
        rd,
    }
}


async function plot3d(items, opt = {}) {

    //如果是多个网格模型组成一个模型对象，分别去平移每个网格模型对应的几何体可能比较麻烦，对于这种情况也可以给该模型对象嵌套一个父对象，然后把该模型对象相对于父对象平移一定距离，然后旋转该模型的父对象，不旋转模型本身，可以看到该模型的旋转效果，视觉效果上旋转轴改变了。
    //http://www.yanhuangxueyuan.com/doc/Three.js/translateAxis.html

    //有使用labels時OrbitControls得使用rendererLabels.domElement掛載, 否則會失去監聽無法操作
    //https://blog.csdn.net/weixin_41111068/article/details/83650977

    //How to completely clean up a Three.js scene
    //https://discourse.threejs.org/t/when-to-dispose-how-to-completely-clean-up-a-three-js-scene/1549/10

    //In general, attributes are freed if you call dispose() on the respective geometry object. However, if attributes needs to be replaced, it could be indeed a source of a memory leak because there it’s not possible so far to selectively free a single buffer attribute.
    //https://discourse.threejs.org/t/disposal-of-buffers-colors-vectors-etc/13094

    //MeshPhysicalMaterial清漆层
    //https://www.mvrlink.com/threejs-meshphysicalmaterial-clearcoat-layer/

    //check
    if (!isearr(items)) {
        items = []
    }

    //domPanel
    let domPanel = get(opt, 'domPanel')
    if (!isEle(domPanel)) {
        domPanel = document.body
        // console.log('domPanel use document.body')
    }

    let gs = (ele) => {
        let w = 0
        if (isNumber(ele.innerWidth)) {
            w = ele.innerWidth
        }
        else if (isNumber(ele.clientWidth)) {
            w = ele.clientWidth
        }
        else {
            console.log('ele', ele)
            throw new Error(`can not get width from ele`)
        }
        let h = 0
        if (isNumber(ele.innerWidth)) {
            h = ele.innerHeight
        }
        else if (isNumber(ele.clientWidth)) {
            h = ele.clientHeight
        }
        else {
            console.log('ele', ele)
            throw new Error(`can not get height from ele`)
        }
        return { w, h }
    }

    //rendererWidth, rendererHeight
    let rwh = gs(domPanel)
    let rendererWidth = rwh.w
    let rendererHeight = rwh.h

    //backgroundColor
    let backgroundColor = get(opt, 'backgroundColor')
    if (!isestr(backgroundColor)) {
        backgroundColor = '#222'
    }

    //useHelperAxes
    let useHelperAxes = get(opt, 'useHelperAxes')
    if (!isbol(useHelperAxes)) {
        useHelperAxes = true
    }

    //helperAxesType
    let helperAxesType = get(opt, 'helperAxesType')
    if (!isnum(helperAxesType)) {
        helperAxesType = 5
    }
    helperAxesType = cdbl(helperAxesType)

    //useHelperGrid
    let useHelperGrid = get(opt, 'useHelperGrid')
    if (!isbol(useHelperGrid)) {
        useHelperGrid = true
    }

    //helperGridSize
    let helperGridSize = get(opt, 'helperGridSize')
    if (!isnum(helperGridSize)) {
        helperGridSize = 5
    }
    helperGridSize = cdbl(helperGridSize)

    //helperGridDivisions
    let helperGridDivisions = get(opt, 'helperGridDivisions')
    if (!isnum(helperGridDivisions)) {
        helperGridDivisions = 50
    }
    helperGridDivisions = cdbl(helperGridDivisions)

    //helperGridPosratZ
    let helperGridPosratZ = get(opt, 'helperGridPosratZ')
    if (!isnum(helperGridPosratZ)) {
        helperGridPosratZ = -1
    }
    helperGridPosratZ = cdbl(helperGridPosratZ)

    //useLightAmbient
    let useLightAmbient = get(opt, 'useLightAmbient')
    if (!isbol(useLightAmbient)) {
        useLightAmbient = true
    }

    //lightAmbientColor
    let lightAmbientColor = get(opt, 'lightAmbientColor')
    if (!isestr(lightAmbientColor)) {
        lightAmbientColor = '#999'
    }

    //useLightPoint
    let useLightPoint = get(opt, 'useLightPoint')
    if (!isbol(useLightPoint)) {
        useLightPoint = false
    }

    //lightPointPoss
    let lightPointPoss = get(opt, 'lightPointPoss')
    if (!isearr(lightPointPoss)) {
        lightPointPoss = [
            [5, 5, 5],
            [-5, 5, 5],
            [5, -5, 5],
        ]
    }

    //lightPointColor
    let lightPointColor = get(opt, 'lightPointColor')
    if (!isestr(lightPointColor)) {
        lightPointColor = '#fff'
    }

    //lightPointIntensity
    let lightPointIntensity = get(opt, 'lightPointIntensity')
    if (!isnum(lightPointIntensity)) {
        lightPointIntensity = 100
    }
    lightPointIntensity = cdbl(lightPointIntensity)

    //lightPointDistance
    let lightPointDistance = get(opt, 'lightPointDistance')
    if (!isnum(lightPointDistance)) {
        lightPointDistance = 0 //無限遠
    }
    lightPointDistance = cdbl(lightPointDistance)

    //lightPointDecay
    let lightPointDecay = get(opt, 'lightPointDecay')
    if (!isnum(lightPointDecay)) {
        lightPointDecay = 2
    }
    lightPointDecay = cdbl(lightPointDecay)

    //useLightDirection
    let useLightDirection = get(opt, 'useLightDirection')
    if (!isbol(useLightDirection)) {
        useLightDirection = true
    }

    //lightDirectionColor
    let lightDirectionColor = get(opt, 'lightDirectionColor')
    if (!isestr(lightDirectionColor)) {
        lightDirectionColor = '#fff'
    }

    //lightDirectionIntensity
    let lightDirectionIntensity = get(opt, 'lightDirectionIntensity')
    if (!isnum(lightDirectionIntensity)) {
        lightDirectionIntensity = 3
    }
    lightDirectionIntensity = cdbl(lightDirectionIntensity)

    //lightDirectionPos
    let lightDirectionPos = get(opt, 'lightDirectionPos')
    if (!isearr(lightDirectionPos)) {
        lightDirectionPos = [10, 10, 10]
    }

    //cameraType
    let cameraType = get(opt, 'cameraType')
    if (cameraType !== 'perspective' && cameraType !== 'orthographic') {
        cameraType = 'perspective'
    }

    //cameraFov
    let cameraFov = get(opt, 'cameraFov')
    if (!isnum(cameraFov)) {
        cameraFov = 30
    }
    cameraFov = cdbl(cameraFov)

    //cameraNear
    let cameraNear = get(opt, 'cameraNear')
    if (!isnum(cameraNear)) {
        cameraNear = 0.1
    }
    cameraNear = cdbl(cameraNear)

    //cameraFar
    let cameraFar = get(opt, 'cameraFar')
    if (!isnum(cameraFar)) {
        cameraFar = 1000
    }
    cameraFar = cdbl(cameraFar)

    //cameraOrthographicRatio
    let cameraOrthographicRatio = get(opt, 'cameraOrthographicRatio')
    if (!isnum(cameraOrthographicRatio)) {
        cameraOrthographicRatio = 0.5
    }
    cameraOrthographicRatio = cdbl(cameraOrthographicRatio)

    //cameraPos
    let cameraPos = get(opt, 'cameraPos')
    if (!isearr(cameraPos)) {
        cameraPos = [1, 1.3, 1]
    }

    //labelColor
    let labelColor = get(opt, 'labelColor')
    if (!isestr(labelColor)) {
        labelColor = '#fff'
    }

    //labelFontFamily
    let labelFontFamily = get(opt, 'labelFontFamily')
    if (!isestr(labelFontFamily)) {
        labelFontFamily = 'Microsoft JhengHei'
    }

    //labelFontSize
    let labelFontSize = get(opt, 'labelFontSize')
    if (!isestr(labelFontSize)) {
        labelFontSize = '0.8rem'
    }

    //useAutoRotate
    let useAutoRotate = get(opt, 'useAutoRotate')
    if (!isbol(useAutoRotate)) {
        useAutoRotate = false
    }

    //setUseAutoRotate
    let setUseAutoRotate = (b) => {
        useAutoRotate = b
    }

    //autoRotateDir
    let autoRotateDir = get(opt, 'autoRotateDir')
    if (autoRotateDir !== 'clockwise' && autoRotateDir !== 'counterclockwise') {
        autoRotateDir = 'counterclockwise'
    }

    //autoRotateDeg
    let autoRotateDeg = get(opt, 'autoRotateDeg')
    if (!isnum(autoRotateDeg)) {
        autoRotateDeg = 20
    }
    autoRotateDeg = cdbl(autoRotateDeg)

    //ev
    let ev = evem()

    //clock
    let clock = new THREE.Clock()
    // console.log('clock',clock)

    //scene
    let scene = new THREE.Scene()

    //backgroundColor
    scene.background = new THREE.Color(colorToHex(backgroundColor))

    //helperAxes
    let helperAxes = null
    if (useHelperAxes) {
        helperAxes = new THREE.AxesHelper(helperAxesType)
        scene.add(helperAxes)
    }

    //helperGrid
    let helperGrid = null
    if (useHelperGrid) {
        helperGrid = new THREE.GridHelper(helperGridSize, helperGridDivisions)
        helperGrid.geometry.rotateX(Math.PI * 0.5)
        helperGrid.geometry.translate(0, 0, helperGridPosratZ)
        scene.add(helperGrid)
    }

    // //fog
    // let fogColor='#aaa'
    // let fog = new THREE.Fog( colorToHex(fogColor) , 0, 3 )
    // scene.fog = fog

    //lightAmbient
    if (useLightAmbient) {
        let lightAmbient = new THREE.AmbientLight(colorToHex(lightAmbientColor))
        scene.add(lightAmbient)
    }

    //lightPoint
    if (useLightPoint) {
        each(lightPointPoss, (lp) => {
            let lightPoint = new THREE.PointLight(colorToHex(lightPointColor), lightPointIntensity, lightPointDistance, lightPointDecay)
            let x = get(lp, 0, 0)
            let y = get(lp, 1, 0)
            let z = get(lp, 2, 0)
            lightPoint.position.set([x, y, z])
            scene.add(lightPoint)
        })
    }

    //lightDirection
    if (useLightDirection) {
        let lightDirection = new THREE.DirectionalLight(colorToHex(lightDirectionColor), lightDirectionIntensity)
        let x = get(lightDirectionPos, 0, 0)
        let y = get(lightDirectionPos, 1, 0)
        let z = get(lightDirectionPos, 2, 0)
        lightDirection.position.set(x, y, z)
        // lightDirection.castShadow = true
        scene.add(lightDirection)
    }

    let gasp = (w, h) => {
        let r = 1
        if (h > 0) {
            r = w / h
        }
        return r
    }
    //cameraAspect
    let cameraAspect = gasp(rendererWidth, rendererHeight)

    //camera
    let camera
    if (cameraType === 'perspective') {
        camera = new THREE.PerspectiveCamera(
            cameraFov, //攝像機視錐體垂直視野角度
            cameraAspect, //攝像機視錐體長寬比
            cameraNear, //攝像機視錐體近端面
            cameraFar, //攝像機視錐體遠端面
        )
    }
    else if (cameraType === 'orthographic') {
        let s = cameraOrthographicRatio
        camera = new THREE.OrthographicCamera(
            -s * cameraAspect, // left: 攝像機視錐體左側面
            s * cameraAspect, // right: 攝像機視錐體右側面
            s, // top: 攝像機視錐體上側面
            -s, // bottom : 攝像機視錐體下側面
            cameraNear, //攝像機視錐體近端面
            cameraFar, //攝像機視錐體遠端面
        )
    }

    //camera位置
    if (true) {
        let x = get(cameraPos, 0, 0)
        let y = get(cameraPos, 1, 0)
        let z = get(cameraPos, 2, 0)
        camera.position.set(x, y, z) //旋轉物件面向世界空間中的一個點
    }

    //camera的z軸朝上
    camera.up.x = 0
    camera.up.y = 0
    camera.up.z = 1

    //renderer
    let renderer = new THREE.WebGLRenderer({
        antialias: true,
    })
    renderer.setSize(rendererWidth, rendererHeight)
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 2.2;
    // renderer.physicallyCorrectLights = true;
    // renderer.outputEncoding = THREE.sRGBEncoding;
    domPanel.appendChild(renderer.domElement)

    //rendererLabels
    let rendererLabels = new CSS2DRenderer()
    rendererLabels.setSize(rendererWidth, rendererHeight)
    rendererLabels.domElement.style.position = 'absolute'
    rendererLabels.domElement.style.top = '0px'
    rendererLabels.domElement.style.left = '0px'
    domPanel.appendChild(rendererLabels.domElement)

    // let updateSceneRotation = (alpha, theta)=>{
    //     let r=rotangToXyz(alpha, theta)
    //     console.log('rotangToXyz',r)
    //     // scene.rotation.x=r.x
    //     // scene.rotation.y=r.y
    //     // scene.rotation.z=r.z
    // }

    // //有使用labels時OrbitControls得使用rendererLabels.domElement掛載監聽事件, 因renderer.domElement已失去監聽無法操作
    // let renderArea = rendererLabels.domElement
    // let isDragging=false
    // let previousMousePosition = {
    //     x: 0,
    //     y: 0
    // }

    // renderArea.addEventListener('mousedown', (e) => {
    //     console.log('renderArea mousedown',e)
    //     isDragging = true
    // });

    // renderArea.addEventListener('mousemove', (e) => {
    //     // console.log('renderArea mousemove',e)

    //     //dt
    //     let dt = {
    //         x: e.offsetX-previousMousePosition.x,
    //         y: e.offsetY-previousMousePosition.y
    //     };

    //     if (isDragging) {
    //         console.log('renderArea mousemove',e,dt)
    //         // let deltaRotationQuaternion = new THREE.Quaternion().
    //         // setFromEuler(
    //         //     new THREE.Euler(toRad(dt.y * 1), toRad(dt.x * 1), 0, 'XYZ')
    //         // );
    //         // sphere.quaternion.multiplyQuaternions(deltaRotationQuaternion, sphere.quaternion);
    //         let radians=1
    //         alpha += radians*dt.x
    //         theta += radians*dt.y
    //         console.log('alpha',alpha,'theta',theta)
    //         updateSceneRotation(theta,alpha)
    //     }

    //     //update
    //     previousMousePosition = {
    //         x: e.offsetX,
    //         y: e.offsetY
    //     }

    // });

    // document.addEventListener('mouseup', (e) => {
    //     console.log('renderArea mouseup',e)
    //     isDragging = false;
    // });

    //OrbitControls
    // let controls = new OrbitControls(camera, rendererLabels.domElement)

    //CameraControls
    CameraControls.install({ THREE })
    let controls = new CameraControls(camera, rendererLabels.domElement)
    // console.log('controls.mouseButtons',controls.mouseButtons)

    //controls
    // // controls.target.set( 0, 0, -0.1 )
    // // controls.enableDamping = true
    // controls.enablePan=true //平移
    // controls.enableRotate=true //旋轉
    // controls.enableZoom=true //縮放
    // // controls.autoRotate=true //自動旋轉
    // // controls.screenSpacePanning=false
    // controls.zoomToCursor=true //針對滑鼠位置zoom
    controls.mouseButtons = { //PAN ROTATE DOLLY

        //鍵名大寫為OrbitControls使用
        // LEFT: THREE.MOUSE.PAN,
        // MIDDLE: THREE.MOUSE.DOLLY,
        // RIGHT: THREE.MOUSE.ROTATE,

        //鍵名小寫為CameraControls使用
        left: CameraControls.ACTION.ROTATE,
        middle: CameraControls.ACTION.DOLLY,
        right: CameraControls.ACTION.OFFSET,
        wheel: CameraControls.ACTION.ZOOM,

    }
    controls.touches = {

        //鍵名小寫為CameraControls使用
        one: CameraControls.ACTION.TOUCH_ROTATE,
        two: CameraControls.ACTION.TOUCH_DOLLY_OFFSET,
        three: CameraControls.ACTION.TOUCH_OFFSET,

    }

    //setViewAngle
    let setViewAngle = (az, polar) => {
        set(controls, 'azimuthAngle', az * toRad)
        set(controls, 'polarAngle', polar * toRad)
    }

    //getViewAngle
    let getViewAngle = () => {
        let az = get(controls, 'azimuthAngle')
        let polar = get(controls, 'polarAngle')
        return {
            azimuthAngle: az * toDeg,
            polarAngle: polar * toDeg,
        }
    }

    //dollyTo( distance, enableTransition )
    //zoomTo( zoom, enableTransition )

    //meshs
    let meshs = []
    await pmSeries(items, async(v) => {
        let mesh = await addStl(ev, v.url, {
            color: get(v, 'color', ''),
            opacity: get(v, 'opacity', 1),
        })
        mesh.name = v.name
        meshs.push(mesh)
    })
    console.log('meshs', meshs)

    //getMeshsInfor
    let getMeshsInfor = () => {
        let rs = map(meshs, (v) => {
            let r1 = get(v, 'material.color.r', 0)
            let g1 = get(v, 'material.color.g', 0)
            let b1 = get(v, 'material.color.b', 0)
            let c = { r: r1 * 255, g: g1 * 255, b: b1 * 255 }
            let color = oc.toRgbString(c)
            let opacity = get(v, 'material.opacity', 1)
            return {
                name: v.name,
                visible: v.visible,
                color,
                opacity,
            }
        })
        return rs
    }

    //setMeshVisible
    let setMeshVisible = (ind, visible) => {
        let mesh = get(meshs, ind)
        if (!iseobj(mesh)) {
            return null
        }
        try {
            meshs[ind].visible = visible
        }
        catch (err) {
            console.log(err)
        }
    }

    //setMeshColor
    let setMeshColor = (ind, color) => {
        let mesh = get(meshs, ind)
        if (!iseobj(mesh)) {
            return null
        }
        try {
            meshs[ind].material.color.setHex(colorToHex(color))
        }
        catch (err) {
            console.log(err)
        }
    }

    //group
    let group = new THREE.Group()
    each(meshs, (mesh) => {
        group.add(mesh)
    })
    scene.add(group)
    // console.log('group',group)

    //延遲等render後才能取得csrd
    setTimeout(() => {

        //csrd
        let csrd = getCsrdFromMeshs(meshs)
        // console.log('csrd',csrd)

        //cs, r
        let cs = csrd.cs
        let r = 1
        if (csrd.rd > 0) {
            r = 1 / csrd.rd
        }

        //translate, scale
        each(meshs, (mesh) => {
            // console.log('mesh',mesh)
            // console.log('mesh.geometry.boundingSphere.center',mesh.geometry.boundingSphere.center)

            let geometry = mesh.geometry
            geometry.translate(-cs.x, -cs.y, -cs.z)
            // console.log('cs',cs)
            geometry.scale(r, r, r)
            // console.log('cs',cs)

            //ele
            let ele = document.createElement('div')
            ele.className = 'label'
            ele.textContent = mesh.name
            // ele.style.marginTop = '0px'
            // ele.style.background = 'none'
            ele.style.color = labelColor
            ele.style.fontFamily = labelFontFamily
            ele.style.fontSize = labelFontSize

            //label
            let label = new CSS2DObject(ele)
            let c = mesh.geometry.boundingSphere.center
            label.position.set(c.x, c.y, c.z)
            // console.log('label',label)
            mesh.add(label)

            // console.log('mesh[0].getWorldPosition()',mesh[0].getWorldPosition())
        })

        // console.log('group.getWorldPosition()',group.getWorldPosition())
    }, 1)

    let render = () => {
        try {
            renderer.render(scene, camera)
            rendererLabels.render(scene, camera)
        }
        catch (err) {
            console.log(err)
        }
    }

    let resize = () => {
        // console.log('plot3d resize')

        //rendererWidth, rendererHeight, cameraAspect
        let rwh = gs(domPanel)
        rendererWidth = rwh.w
        rendererHeight = rwh.h
        cameraAspect = gasp(rendererWidth, rendererHeight)

        //update camera
        camera.aspect = cameraAspect
        camera.updateProjectionMatrix()

        //update renderer
        renderer.setSize(rendererWidth, rendererHeight)
        rendererLabels.setSize(rendererWidth, rendererHeight)

        //render
        render()

    }

    //render
    render()
    setTimeout(() => {
        render() //須再延遲渲染
    }, 100)

    //stop
    let stop = false
    let animate = () => {
        if (stop) {
            // console.log('animate stop')
            return
        }
        try {

            //delta
            let delta = clock.getDelta()
            // console.log('delta',delta)

            //hasControlsUpdated
            let hasControlsUpdated = controls.update(delta)
            // console.log('hasControlsUpdated',hasControlsUpdated)

            //useAutoRotate
            if (useAutoRotate) {
                let i = autoRotateDir === 'clockwise' ? 1 : -1
                // console.log('autoRotateDir', autoRotateDir, i)
                let az = i * autoRotateDeg * toRad * delta
                // console.log('az', az)
                controls.azimuthAngle += az
            }

            //requestAnimationFrame
            requestAnimationFrame(animate)

            //check
            if (hasControlsUpdated) {
                // console.log('hasControlsUpdated and render')
                render()
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    //animate
    animate()

    let disposeAll = () => {

        let cleanMaterial = (material) => { //已預先執行多種dispose, 此函數暫時用不到
        // console.log('dispose material')
            material.dispose()
            // dispose textures
            for (let key of Object.keys(material)) {
                let value = material[key]
                if (value && typeof value === 'object' && 'minFilter' in value) {
                // console.log('dispose texture')
                    value.dispose()
                }
            }
        }

        //stop
        stop = true

        //dispose & free group
        group.traverse(function(obj) {
            if (obj.isMesh) {
                obj.geometry.dispose()
                obj.material.dispose()
            }
        })
        scene.remove(group)
        group = null

        //dispose & free helperAxes
        if (useHelperAxes) {
            scene.remove(helperAxes)
            helperAxes.dispose()
            helperAxes = null
        }

        //dispose & free helperGrid
        if (useHelperGrid) {
            scene.remove(helperGrid)
            helperGrid.dispose()
            helperGrid = null
        }

        // //dispose & free lightAmbient
        // scene.remove(lightAmbient)
        // lightAmbient.dispose()
        // lightAmbient = null

        // //dispose & free lightPoint
        // scene.remove(lightPoint)
        // lightPoint.dispose()
        // lightPoint = null

        // //dispose & free lightDirection
        // scene.remove(lightDirection)
        // lightDirection.dispose()
        // lightDirection = null

        // labelDiv=document.querySelector('#labelDiv'); // same beginning
        // allLabelsToDelete=document.querySelectorAll('#labelDiv .label') // takes children of class "label" like in moon-earth example
        // forEach (elem in allLabelsToDelete ) {
        //     labelDiv.removeChild(elem)
        // }

        //dispose obj of scene
        scene.traverse(object => {
            // console.log('object', object)
            if (object.isLight) {
                // console.log('dispose light')
                object.dispose()
            }
            if (object.isMesh) {
                // console.log('dispose geometry')
                object.geometry.dispose()
                if (object.material.isMaterial) {
                    cleanMaterial(object.material)
                }
                else {
                    // an array of materials
                    for (let material of object.material) cleanMaterial(material)
                }
            }

        })

        //remove
        // console.log('renderer.domElement',renderer.domElement)
        // console.log('rendererLabels.domElement',rendererLabels.domElement)
        // document.body.remove(renderer.domElement)
        // document.body.remove(rendererLabels.domElement)
        // renderer.domElement.remove()
        // rendererLabels.domElement.remove()
        domRemove(renderer.domElement)
        domRemove(rendererLabels.domElement)

        //dispose & free renderer
        renderer.dispose()
        // rendererLabels.dispose()
        renderer = null
        rendererLabels = null

        //free clock
        // clock.dispose()
        clock = null

        //free controls
        // controls.dispose()
        controls = null

        //free camera
        // camera.dispose()
        camera = null

        //free scene
        // scene.dispose()
        scene = null

    }

    //save
    ev.render = render
    ev.resize = resize
    ev.dispose = disposeAll
    ev.setUseAutoRotate = setUseAutoRotate
    ev.getMeshsInfor = getMeshsInfor
    ev.setMeshVisible = setMeshVisible
    ev.setMeshColor = setMeshColor
    ev.setViewAngle = setViewAngle
    ev.getViewAngle = getViewAngle

    return ev
}


/**
 * @vue-prop {Object} [options={}] 輸入設定物件，預設{}
 */
export default {
    directives: {
        domresize: domResize(),
    },
    components: {
    },
    props: {
        options: {
            type: Object,
            default: () => {},
        },
        width: {
            type: Number,
            default: 400,
        },
        height: {
            type: Number,
            default: 400,
        },
    },
    data: function() {
        return {

            ev: null,

        }
    },
    beforeDestroy: function() {
        let vo = this
        vo.dispose()
    },
    computed: {

        changeOptions: function() {
            // console.log('changeOptions')

            let vo = this

            //plot
            vo.plot()

            return ''
        },

        widthInp: function() {
            //console.log('computed widthInp')

            let vo = this

            //w
            let w = vo.width
            let wOpt = get(vo, 'options.width', '')
            if (isnum(wOpt)) {
                w = cdbl(wOpt)
            }

            return w
        },

        heightInp: function() {
            //console.log('computed heightInp')

            let vo = this

            //h
            let h = vo.height
            let hOpt = get(vo, 'options.height', '')
            if (isnum(hOpt)) {
                h = cdbl(hOpt)
            }

            return h
        },

    },
    methods: {

        updatePanel: function(msg) {
            // console.log('methods updatePanel', msg)

            let vo = this

            //check
            if (vo.ev === null) {
                return
            }

            //resize
            let fun = get(vo, 'ev.resize')
            if (isfun(fun)) {

                //resize
                fun()

                //emit
                vo.$emit('resize', msg)

            }


        },

        plot: function() {
            // console.log('methods plot')

            let vo = this

            async function core() {

                //dispose
                vo.dispose()

                //waitFun
                await waitFun(() => {
                    return isEle(vo.$refs.panel)
                })
                // console.log('vo.$refs.panel', vo.$refs.panel)

                //items
                let items = get(vo, 'options.items', [])
                // console.log('items', items)

                //plot3d
                let opt = {
                    ...vo.options,
                    domPanel: vo.$refs.panel,
                }
                let ev = await plot3d(items, opt)

                //on
                ev.on('loading', (prog) => {
                    // console.log('loading', prog)
                    vo.$emit('loading', prog)
                })

                //save
                vo.ev = ev

                //test
                setTimeout(() => {
                    console.log('ev.getMeshsInfor()', ev.getMeshsInfor())
                }, 1000)
                // setTimeout(() => {
                //     ev.setUseAutoRotate(true)
                //     console.log('ev.setUseAutoRotate(true)')
                // }, 1500)
                // setTimeout(() => {
                //     ev.setMeshVisible(0, false)
                //     console.log('ev.setMeshVisible(0, false)')
                // }, 3000)
                // setTimeout(() => {
                //     ev.setMeshVisible(0, true)
                //     console.log('ev.setMeshVisible(0, true)')
                // }, 6000)
                // setTimeout(() => {
                //     ev.setViewAngle(0, 0) //x-y view
                //     // ev.setViewAngle(0, 90) //x-z view
                //     // ev.setViewAngle(90, 90) //y-z view
                //     console.log('ev.setViewAngle()')
                // }, 1000)
                // setInterval(() => {
                //     console.log(`ev.getViewAngle`, ev.getViewAngle())
                // }, 500)

                // console.log('init')
            }

            //core
            core()
                .catch((err) => {
                    console.log(err)
                })

        },

        dispose: function() {
            let vo = this

            //使用setTimeout讓記憶體脫勾, 避免被computed視為連動
            setTimeout(() => {

                //check
                if (vo.ev === null) {
                    return
                }

                //dispose
                let fun = get(vo, 'ev.dispose')
                if (isfun(fun)) {
                    vo.ev.dispose()
                    vo.ev = null
                    // console.log('dispose')
                }

            }, 1)

        },

    },
}
</script>

<style scoped>
</style>

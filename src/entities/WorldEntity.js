import * as ECS from '@nikolas.karinja/ecs'
import * as Elements from '../constants/elements.js'
import * as THREE from 'three'
import * as ThreeUtils from '../utils/three.js'

export class WorldEntity extends ECS.Entity {

    constructor () {

        super()

        this.Parent = Elements.World

        this.init()

    }

    init () {

        this.initRenderer()
        this.initScene()
        this.initCamera()
        this.resize()

    }

    initCamera () {

        const aspect = this.Parent.clientWidth / this.Parent.clientHeight

        this.Camera = new THREE.PerspectiveCamera( 60, aspect, 0.01, 2000 )
        this.Camera.position.set( 0.5, 0.5, 0.5 )
        this.Camera.lookAt( 0, 0, 0 )

        this.Scene.add( this.Camera )

    }

    initRenderer () {

        this.Renderer = ThreeUtils.buildRenderer( 'World', this.Parent )
        this.Renderer.outputEncoding = THREE.sRGBEncoding
        this.Renderer.gammaOutput    = 2.2
        this.Renderer.shadowMap.enabled = true

    }

    initScene () {

        this.Scene = new THREE.Scene()

    }

    resize () {

        const aspect = this.Parent.clientWidth / this.Parent.clientHeight

        this.Renderer.setSize( this.Parent.clientWidth, this.Parent.clientHeight )

        this.Camera.aspect = aspect
        this.Camera.updateProjectionMatrix()

    }

}
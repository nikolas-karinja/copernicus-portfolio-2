import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'

export class WorldControls extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.Camera   = this.Parent.Camera
        this.Renderer = this.Parent.Renderer
        this.Scene    = this.Parent.Scene

        this.Controls = new OrbitControls( this.Camera, this.Renderer.domElement )
        this.Controls.autoRotate    = true
        this.Controls.enableDamping = true
        this.Controls.enableZoom    = false

    }

    onUpdate () {

        this.Controls.update()

    }

}
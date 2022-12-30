import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'

export class WorldLights extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.shadowResolution = 1024 * 2
        this.shadowSpread     = 1

        this.Camera = this.Parent.Camera
        this.Scene  = this.Parent.Scene

        this.Light = new THREE.DirectionalLight( 0xffffff, 1 )
        this.Light.position.set( -0.25, 0.5, 1 )
        this.Light.position.multiplyScalar( 1 )

        this.Camera.add( this.Light );

        this.Light.castShadow = true

        this.Light.shadow.mapSize.width  = this.shadowResolution
        this.Light.shadow.mapSize.height = this.shadowResolution

        this.Light.shadow.camera.left   = -this.shadowSpread
        this.Light.shadow.camera.right  = this.shadowSpread
        this.Light.shadow.camera.top    = this.shadowSpread
        this.Light.shadow.camera.bottom = -this.shadowSpread

        this.Light.shadow.camera.far  = 2
        this.Light.shadow.camera.near = 0.01

    }

}
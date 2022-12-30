import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'

export class WorldLights extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.Camera = this.Parent.Camera
        this.Scene  = this.Parent.Scene

        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 )
            hemiLight.color.setHSL( 0.6, 0.75, 0.5 )
            hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 )
            hemiLight.position.set( 0, 500, 0 )

        this.Scene.add( hemiLight );

            var dirLight = new THREE.DirectionalLight( 0xffffff, 0.6 )
            dirLight.position.set( -1, 0.75, 1 )
            dirLight.position.multiplyScalar( 50 )
            dirLight.name = "dirlight"
            // dirLight.shadowCameraVisible = true;

        this.Camera.add( dirLight );

            // dirLight.castShadow = true;
            // dirLight.shadowMap.width = dirLight.shadowMapHeight = 1024*2;

            // var d = 300;

            // dirLight.shadowCameraLeft = -d;
            // dirLight.shadowCameraRight = d;
            // dirLight.shadowCameraTop = d;
            // dirLight.shadowCameraBottom = -d;

            // dirLight.shadowCameraFar = 3500;
            // dirLight.shadowBias = -0.0001;
            // dirLight.shadowDarkness = 0.35;

    }

}
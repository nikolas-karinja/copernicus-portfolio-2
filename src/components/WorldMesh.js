import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'
import * as TWEEN from '../libs/tween.js'

export class WorldMesh extends ECS.Component {

    constructor ( parent, scene ) {

        super( parent )

        this.meshDetail = 16

        this.Geometry = new THREE.IcosahedronGeometry( 0.3, this.meshDetail )
        this.Material = new THREE.MeshPhongMaterial( { flatShading: true, shininess: 0, vertexColors: true } )

        this.Mesh = new THREE.Mesh( this.Geometry, this.Material )
        this.Mesh.scale.set( 0, 0, 0 )
        this.Mesh.receiveShadow = true

        scene.add( this.Mesh )

        // do scale animation

        this.Tween = new TWEEN.Tween( this.Mesh.scale )
            .to( { x: 1, y: 1, z: 1 }, 1000 )
            .easing( TWEEN.Easing.Elastic.Out )
            .onComplete( () => TWEEN.remove( this.Tween ) )
            .start()

    }

    getMesh () {

        return this.Mesh

    }

}
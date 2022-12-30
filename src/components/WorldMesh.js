import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'
import { TextureLoader } from 'three'

export class WorldMesh extends ECS.Component {

    constructor ( parent, scene ) {

        super( parent )

        this.meshDetail = 15

        this.Geometry = new THREE.IcosahedronGeometry( 0.3, this.meshDetail )
        this.Material = new THREE.MeshPhongMaterial( { flatShading: true } )
        this.Mesh     = new THREE.Mesh( this.Geometry, this.Material )

        scene.add( this.Mesh )

    }

    getMesh () {

        return this.Mesh

    }

}
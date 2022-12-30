import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'

export class WorldWater extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.meshDetail = 5

        this.TerrainMesh = this.Parent.getComponent( 'WorldMesh' ).Mesh

        this.Geometry = new THREE.IcosahedronGeometry( 0.306, this.meshDetail )
        this.Material = new THREE.MeshPhongMaterial( { color: 0x00635d, transparent: true, opacity: 0.75 } )

        this.Mesh = new THREE.Mesh( this.Geometry, this.Material )
        this.Mesh.receiveShadow = true

        this.TerrainMesh.add( this.Mesh )

    }

}
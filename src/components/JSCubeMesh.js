import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'
import * as TWEEN from '../libs/tween.js'

export class JSCubeMesh extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.boxSize = 0.25

        this.Texture = new THREE.TextureLoader().load( '../../assets/img/logos/dimensional-icon-1024.png' )
        this.Texture.magFilter = THREE.NearestFilter
        this.Texture.minFilter = THREE.NearestFilter

        this.Geometry = new THREE.BoxGeometry( this.boxSize, this.boxSize, this.boxSize )
        this.Material = new THREE.MeshPhongMaterial( { map: this.Texture } )

        this.Mesh = new THREE.Mesh( this.Geometry, this.Material )
        this.Mesh.scale.set( 0, 0, 0 )
        this.Mesh.receiveShadow = true

        this.Parent.Scene.add( this.Mesh )

        // do scale animation

        this.Tween = new TWEEN.Tween( this.Mesh.scale )
            .to( { x: 1, y: 1, z: 1 }, 1000 )
            .easing( TWEEN.Easing.Quintic.Out )
            .onComplete( () => TWEEN.remove( this.Tween ) )
            .start()

    }

    getMesh () {

        return this.Mesh

    }

    onUpdate ( dT ) {

        this.Mesh.rotation.x += dT
        this.Mesh.rotation.z += dT

    }

}
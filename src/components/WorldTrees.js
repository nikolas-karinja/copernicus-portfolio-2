import * as AppUtils from '@nikolas.karinja/app-utils'
import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'
import * as TWEEN from '../libs/tween.js'
import * as BufferGeometryUtils from '../../node_modules/three/examples/jsm/utils/BufferGeometryUtils.js'

export class WorldTrees extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.maxTrees     = 250
        this.treesCounter = 0
        this.treeSize     = 1

        this.Trees      = {}
        this.WorldMesh  = this.Parent.getComponent( 'WorldMesh' ).Mesh
        this.WorldNoise = this.Parent.getComponent( 'WorldNoise' )

        this.Colors = {
            treeTrunk : 0x764114,
            
            Body: {
                'grassland' : [ 0x476b00, 0x5a8700, 0x9fbf00, 0xbfb200, 0xbf7f00 ],
                'jungle'    : [ 0x314a00, 0x9bb300 ],
                'snow'      : [ 0xffffff ],
            }
        }

        this.generateTrees()

    }

    addTree ( count ) {

        const i        = AppUtils.Array.getRandomValue( this.WorldNoise.landVertices )
        const posArray = this.WorldMesh.geometry.attributes.position.array

        if ( this.checkIndexBiome( i ) != 'desert' ) {

            const Tree = {
                position: new THREE.Vector3( posArray[ i ], posArray[ i + 1 ], posArray[ i + 2 ] ),
            }
    
            const keys   = Object.keys( this.Trees )
            const length = keys.length
    
            if ( length >= this.maxTrees ) delete this.Trees[ keys[ 0 ] ]
    
            const tSize  = THREE.MathUtils.randFloat( 0.015, 0.02 ) * this.treeSize
            const bSize  = tSize * THREE.MathUtils.randFloat( 0.5, 0.7 ) * this.treeSize
            const vn2    = this.WorldNoise.vertexNoise( Tree.position, 0.01 )
            
            let bColor = AppUtils.Array.getRandomValue( this.Colors.Body[ this.checkIndexBiome( i ) ] )
    
            const TreeObject = this.createTree( tSize, bSize, this.Colors.treeTrunk, bColor )
            TreeObject.position.copy( Tree.position )
            TreeObject.lookAt( 0, 0, 0 )
            TreeObject.scale.set( 0, 0, 0 )
    
            this.WorldMesh.add( TreeObject )

            new TWEEN.Tween( TreeObject.scale )
                .to( { x: 1, y: 1, z: 1 }, 1000 )
                .easing( TWEEN.Easing.Elastic.Out )
                .delay( 500 + ( count * 2 ) )
                .start()
            
        }

    }

    checkIndexBiome ( i ) {

        return this.WorldNoise.biomeVertices[ i / 3 ]

    }

    createRandomGeometry ( bgeo, d ) {

        for ( let i = 0; i < bgeo.attributes.position.array.length; i += 3 ) {

            bgeo.attributes.position.array[ i + 0 ] += THREE.MathUtils.randFloatSpread( 2 * d )
            bgeo.attributes.position.array[ i + 1 ] += THREE.MathUtils.randFloatSpread( 2 * d )
            bgeo.attributes.position.array[ i + 2 ] += THREE.MathUtils.randFloatSpread( 2 * d )

        }
      
        return bgeo

    }

    createTree ( tsize, bsize, tcolor, bcolor ) {

        const tradius  = tsize * 0.1
        const t1radius = tradius * 0.7
        const t1size   = tsize / 2
      
        const TMaterial = new THREE.MeshPhongMaterial( { color: tcolor, flatShading: true, shininess: 30 });
        const BMaterial = new THREE.MeshPhongMaterial( { color: bcolor, flatShading: true, shininess: 0, transparent: true, opacity: 0.9 } );
      
        const Tree = new THREE.Object3D()
      
        // trunk

        let TGeometry = new THREE.CylinderGeometry( tradius * 0.7, tradius, tsize, 5, 3, true )
        TGeometry.translate( 0, tsize / 2, 0 )
        TGeometry.rotateX( -Math.PI / 2 )
        TGeometry = this.createRandomGeometry( TGeometry, tradius * 0.2 );
      
        // body

        let BGeometry = new THREE.SphereGeometry( bsize, 4, 4 )
        BGeometry.translate( 0, tsize + bsize * 0.7, 0 )
        BGeometry.rotateX( -Math.PI / 2 )
        BGeometry = this.createRandomGeometry( BGeometry, bsize * 0.2 )
      
        if ( Math.random() > 0.5 ) {
          
            // trunk 1

            let T1Geometry = new THREE.CylinderGeometry( t1radius * 0.5, t1radius, t1size, 4, 2, true )
            T1Geometry.translate( 0, t1size / 2, 0 )
            T1Geometry.rotateZ( Math.PI / 3 + THREE.MathUtils.randFloat( 0, 0.2 ) )
            T1Geometry.rotateY( THREE.MathUtils.randFloatSpread( Math.PI / 2 ) )
            T1Geometry.translate( 0, tsize * THREE.MathUtils.randFloat( 0.2, 0.7 ), 0 )
            T1Geometry.rotateX( -Math.PI / 2 )
            T1Geometry = this.createRandomGeometry( T1Geometry, tradius * 0.1 )

            TGeometry = BufferGeometryUtils.mergeBufferGeometries( [ TGeometry, T1Geometry ] )
      
            // body 1

            const b1size = bsize * THREE.MathUtils.randFloat( 0.5, 0.8 )
            const t1bp   = this.getTrunkBodyPosition( T1Geometry, b1size )

            let B1Geometry = new THREE.SphereGeometry( b1size, 4, 4 )
            B1Geometry.translate( t1bp.x, t1bp.y, t1bp.z )
            B1Geometry = this.createRandomGeometry( B1Geometry, b1size * 0.2 )

            BGeometry = BufferGeometryUtils.mergeBufferGeometries( [ BGeometry, B1Geometry ] )

        }
      
        if ( Math.random() > 0.5 ) {

            // trunk 2

            let T2Geometry = new THREE.CylinderGeometry( t1radius * 0.5, t1radius, t1size, 4, 2, true );
            T2Geometry.translate( 0, t1size / 2, 0 )
            T2Geometry.rotateZ( -Math.PI / 3 + THREE.MathUtils.randFloat( 0, 0.2 ) )
            T2Geometry.rotateY( THREE.MathUtils.randFloatSpread( Math.PI / 2 ) )
            T2Geometry.translate( 0, tsize * THREE.MathUtils.randFloat( 0.2, 0.7 ), 0 )
            T2Geometry.rotateX( -Math.PI / 2 )
            T2Geometry = this.createRandomGeometry( T2Geometry, tradius * 0.1 )

            TGeometry = BufferGeometryUtils.mergeBufferGeometries( [ TGeometry, T2Geometry ] )
      
            // body 2

            const b2size = bsize * THREE.MathUtils.randFloat( 0.5, 0.8 )
            const t2bp   = this.getTrunkBodyPosition( T2Geometry, b2size )

            let B2Geometry = new THREE.SphereGeometry( b2size, 4, 4 )
            B2Geometry.translate( t2bp.x, t2bp.y, t2bp.z )
            B2Geometry = this.createRandomGeometry( B2Geometry, b2size * 0.2 )

            BGeometry = BufferGeometryUtils.mergeBufferGeometries( [ BGeometry, B2Geometry ] )

        }
      
        const TMesh = new THREE.Mesh( TGeometry, TMaterial )
        TMesh.castShadow = true

        Tree.add( TMesh )
      
        const BMesh = new THREE.Mesh( BGeometry, BMaterial )
        BMesh.castShadow = true

        Tree.add( BMesh )
      
        Tree.dispose = () => {

            TMesh.geometry.dispose()
            TMesh.material.dispose()

            BMesh.geometry.dispose()
            BMesh.material.dispose()

        }
      
        return Tree
    }

    generateTrees () {

        for ( let i = 0; i < this.maxTrees; i++ ) this.addTree( i )

    }
    
    getTrunkBodyPosition ( geo, bsize ) {

        const posArray    = geo.attributes.position.array
        const posArrayEnd = posArray.length - 1

        const V1 = new THREE.Vector3( posArray[ 0 ], posArray[ 1 ], posArray[ 2 ] )
        const V2 = new THREE.Vector3( posArray[ posArrayEnd - 2 ], posArray[ posArrayEnd - 1 ], posArray[ posArrayEnd ] )

        const DV = V1.clone().sub( V2 ).normalize().multiplyScalar( bsize * 0.5 )

        return V1.add( DV )

    }

}
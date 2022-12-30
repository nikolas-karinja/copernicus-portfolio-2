import * as ECS from '@nikolas.karinja/ecs'
import * as SimplexNoise from 'simplex-noise'
import * as THREE from 'three'

export class WorldNoise extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.landVertices = []
        this.meshDetail = this.Parent.getComponent( 'WorldMesh' ).meshDetail
        this.noise3D = SimplexNoise.createNoise3D()
        this.waterVertices = []

        this.Mesh = this.Parent.getComponent( 'WorldMesh' ).Mesh

        this.Settings = {
            noiseF             : 5,
            noiseD             : 0.25,
            noiseWaterTreshold : 0.5,
            noiseWaterLevel    : 0.2,
        }

        this.init()

    }

    vertexNoise ( v, f, i ) {

        let isWaterLevel = false

        const nv = new THREE.Vector3( v.x, v.y, v.z ).multiplyScalar( f ).addScalar( 0.00001 )

        let noise = ( this.noise3D( nv.x, nv.y, nv.z ) + 1 ) / 2

        if ( noise > this.Settings.noiseWaterTreshold ) {

            noise *= 0.05

        } else {

            noise = this.Settings.noiseWaterLevel

            isWaterLevel = true

        }

        return [ noise, isWaterLevel ] 

    }

    displaceVertex ( v, i ) {

        const noise = this.vertexNoise( v, this.Settings.noiseF, i / 3 ) 

        // check if veterx is water

        v.add( v.clone().normalize().multiplyScalar( noise[ 1 ] == true ? 0 : noise[ 0 ] * this.Settings.noiseD ) )

        if ( noise[ 1 ] == true ) this.waterVertices.push( v )
        else this.landVertices.push( v )

        this.Mesh.geometry.attributes.position.array[ i ] = v.x
        this.Mesh.geometry.attributes.position.array[ i + 1 ] = v.y
        this.Mesh.geometry.attributes.position.array[ i + 2 ] = v.z

    }

    init () {

        this.initPeaks()

    }

    initPeaks () {

        const PosAttr    = this.Mesh.geometry.attributes.position
        const NormalAttr = this.Mesh.geometry.attributes.normal

        for ( let i = 0; i < PosAttr.array.length; i += 3 ) {

            const fX = PosAttr.array[ i ]
            const fY = PosAttr.array[ i + 1 ]
            const fZ = PosAttr.array[ i + 2 ]

            const FlatVec = new THREE.Vector3( fX, fY, fZ )

            this.displaceVertex( FlatVec, i )

        }

        this.Mesh.geometry.attributes.position.needsUpdate = true

    }

    random ( mn , mx ) {

        return Math.random() * ( mx - mn ) + mn

    }

    scale ( num, in_min, in_max, out_min, out_max ) {

        return ( ( num - in_min ) * ( out_max - out_min ) ) / ( in_max - in_min ) + out_min

    }

}
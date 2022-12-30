import * as ECS from '@nikolas.karinja/ecs'
import * as SimplexNoise from 'simplex-noise'
import * as THREE from 'three'

export class WorldNoise extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.biomeVertices = []
        this.landVertices  = []
        this.meshDetail    = this.Parent.getComponent( 'WorldMesh' ).meshDetail
        this.noise3D       = SimplexNoise.createNoise3D()
        this.waterVertices = []

        this.Mesh = this.Parent.getComponent( 'WorldMesh' ).Mesh

        this.DesertNoise = SimplexNoise.createNoise3D()
        this.JungleNoise = SimplexNoise.createNoise3D()
        this.SnowNoise   = SimplexNoise.createNoise3D()

        this.Settings = {
            noiseF              : 5,
            noiseD              : 0.25,
            noiseDesertTreshold : 0.9,
            noiseJungleTreshold : 0.7,
            noiseSnowTreshold   : 0.5,
            noiseWaterTreshold  : 0.5,
            noiseWaterLevel     : 0.2,
            poleY               : 1.25
        }

        this.init()

    }

    vertexNoise ( v, f, i ) {

        let biomeType    = 'grassland'
        let isWaterLevel = false

        const nv = new THREE.Vector3( v.x, v.y, v.z ).multiplyScalar( f ).addScalar( 0.00001 )

        let noise = ( this.noise3D( nv.x, nv.y, nv.z ) + 1 ) / 2

        let desertNoise = ( this.noise3D( nv.x, nv.y, nv.z ) + 1 ) / 2
        let jungleNoise = ( this.noise3D( nv.x, nv.y, nv.z ) + 1 ) / 2
        let snowNoise   = ( this.noise3D( nv.x, nv.y, nv.z ) + 1 ) / 2

        if ( noise > this.Settings.noiseWaterTreshold ) {

            noise *= 0.05

        } else {

            noise = this.Settings.noiseWaterLevel

            isWaterLevel = true

        }

        if ( jungleNoise > this.Settings.noiseJungleTreshold ) biomeType = 'jungle'
        if ( desertNoise > this.Settings.noiseDesertTreshold ) biomeType = 'desert'
        if ( snowNoise > this.Settings.noiseSnowTreshold && ( nv.y > this.Settings.poleY || nv.y < -this.Settings.poleY ) ) biomeType = 'snow'

        return [ noise, isWaterLevel, biomeType ] 

    }

    displaceVertex ( v, i ) {

        const noise = this.vertexNoise( v, this.Settings.noiseF, i / 3 ) 

        // check if veterx is water

        v.add( v.clone().normalize().multiplyScalar( noise[ 1 ] == true ? 0 : noise[ 0 ] * this.Settings.noiseD ) )

        if ( noise[ 1 ] == true ) this.waterVertices.push( i )
        else this.landVertices.push( i )

        this.biomeVertices.push( noise[ 2 ] )

        this.Mesh.geometry.attributes.position.array[ i ] = v.x
        this.Mesh.geometry.attributes.position.array[ i + 1 ] = v.y
        this.Mesh.geometry.attributes.position.array[ i + 2 ] = v.z

    }

    init () {

        this.initPeaks()

    }

    initPeaks () {

        const PosAttr = this.Mesh.geometry.attributes.position

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
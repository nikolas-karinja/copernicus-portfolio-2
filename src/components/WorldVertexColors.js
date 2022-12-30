import * as ECS from '@nikolas.karinja/ecs'
import * as SimplexNoise from 'simplex-noise'
import * as THREE from 'three'

export class WorldVertexColors extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.biomeVertices = this.Parent.getComponent( 'WorldNoise' ).biomeVertices
        this.landVertices  = this.Parent.getComponent( 'WorldNoise' ).landVertices
        this.waterVertices = this.Parent.getComponent( 'WorldNoise' ).waterVertices

        this.Mesh = this.Parent.getComponent( 'WorldMesh' ).Mesh

        this.init()

    }

    checkBiome ( i, c ) {

        if ( this.biomeVertices[ i / 3 ] == 'desert' ) c = new THREE.Color( 0xdeb045 )
        else if ( this.biomeVertices[ i / 3 ] == 'jungle' ) c = new THREE.Color( 0x213b00 )
        else if ( this.biomeVertices[ i / 3 ] == 'snow' ) c = new THREE.Color( 0xffffff )

        return c

    }

    init () {

        this.initColorAttribute()

    }

    initColorAttribute () {

        const PosAttr = this.Mesh.geometry.attributes.position
        const colors = new Float32Array( PosAttr.array.length )

        for ( let i = 0; i < PosAttr.array.length; i += 9 ) {

            let Color = new THREE.Color( 0xff00ff )

            if ( 
                this.landVertices.includes( i ) &&
                this.landVertices.includes( i + 3 ) &&
                this.landVertices.includes( i + 6 )
            ) {

                Color = new THREE.Color( 0x386300 )

            } else if ( 
                this.waterVertices.includes( i ) &&
                this.waterVertices.includes( i + 3 ) &&
                this.waterVertices.includes( i + 6 )
            ) {

                Color = new THREE.Color( 0xfae09d )

            } else {

                Color = new THREE.Color( 0xfae09d )

            }

            let aColor = this.checkBiome( i, Color )
            let bColor = this.checkBiome( i + 3, Color )
            let cColor = this.checkBiome( i + 6, Color )

            colors[ i + 0 ] = aColor.r
            colors[ i + 3 ] = bColor.r
            colors[ i + 6 ] = cColor.r

            colors[ i + 1 ] = aColor.g
            colors[ i + 4 ] = bColor.g
            colors[ i + 7 ] = cColor.g

            colors[ i + 2 ] = aColor.b
            colors[ i + 5 ] = bColor.b
            colors[ i + 8 ] = cColor.b

        }

        this.Mesh.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) )

    }

}
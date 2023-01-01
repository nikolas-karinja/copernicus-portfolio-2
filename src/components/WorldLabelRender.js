import * as AppUtils from '@nikolas.karinja/app-utils'
import * as Database from '../constants/database.js'
import * as ECS from '@nikolas.karinja/ecs'
import * as Elements from '../constants/elements.js'
import * as THREE from 'three'
import * as TWEEN from '../libs/tween.js'
import { CSS2DObject, CSS2DRenderer } from '../../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js'

export class WorldLabelRenderer extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.cssObjects = []

        this.Element       = this.Parent.Parent
        this.WorldControls = this.getComponent( 'WorldControls' )
        this.WorldMesh     = this.Parent.getComponent( 'WorldMesh' )
        this.WorldNoise    = this.Parent.getComponent( 'WorldNoise' )

        console.log( Database.Data )

        this.labelData = Database.Data.WorldLinks.list

    }

    createLabel ( data ) {

        const posArray  = this.WorldMesh.Mesh.geometry.attributes.position.array
        const landIndex = AppUtils.Array.getRandomValue( this.WorldNoise.landVertices )

        // create element

        const Element = document.createElement( 'world-label' )
        Element.pageValue = data.value
        Element.TargetVec = new THREE.Vector3( posArray[ landIndex ], posArray[ landIndex + 1 ], posArray[ landIndex + 2 ])
        Element.innerHTML = data.name
        Element.style.setProperty( 'pointer-events', 'all' )

        // build events

        Element.addEventListener( 'pointerup', () => {

            this.WorldControls.Controls.autoRotate = false

            this.WorldControls.moveTarget( Element.TargetVec, true )

        } )

        // create Object3D

        const ThreeObject = new CSS2DObject( Element )
        ThreeObject.position.copy( Element.TargetVec )

        this.Parent.Scene.add( ThreeObject )

        // set camera initial position to first page

        if ( data.name == this.labelData[ 0 ].name ) this.WorldControls.setCameraPosition( Element.TargetVec )

    }

    generateLabels () {

        for ( let i of this.labelData ) this.createLabel( i )

    }

    initComponent () {

        this.initRenderer()
        this.generateLabels()

    }

    initRenderer () {

        this.Renderer = new CSS2DRenderer()
        this.Renderer.setSize( this.Element.clientWidth, this.Element.clientHeight )
        this.Renderer.domElement.id = 'label-renderer'
        this.Renderer.domElement.style.setProperty( 'transition', '1s ease' )
        this.Renderer.domElement.style.setProperty( 'pointer-events', 'none' )
        this.Renderer.domElement.style.setProperty( 'position', 'absolute' )
        this.Renderer.domElement.style.setProperty( 'left', '0px' )
        this.Renderer.domElement.style.setProperty( 'top', '0px' )

        this.Element.appendChild( this.Renderer.domElement )

    }

    onUpdate () {

        this.Renderer.render( this.Parent.Scene, this.Parent.Camera )

    }

    resize () {

        this.Renderer.setSize( this.Element.clientWidth, this.Element.clientHeight )

    }

}
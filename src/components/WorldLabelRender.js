import * as AppUtils from '@nikolas.karinja/app-utils'
import * as ECS from '@nikolas.karinja/ecs'
import * as Elements from '../constants/elements.js'
import * as THREE from 'three'
import * as TWEEN from '../libs/tween.js'
import { CSS2DObject, CSS2DRenderer } from '../../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js'

export class WorldLabelRenderer extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.cssObjects = []

        this.Element    = this.Parent.Parent
        this.WorldMesh  = this.Parent.getComponent( 'WorldMesh' ).Mesh
        this.WorldNoise = this.Parent.getComponent( 'WorldNoise' )

        this.labelData = [
            {
                name  : 'Experience',
                icon  : './assets/img/icons/experience-32.png',
                info  : 'Go here to see what I have done to advance my career and personal life.',
                type  : 'page',
                value : ''
            },
            {
                name : 'Projects'
            },
            {
                name : 'Demos'
            },
            {
                name : 'Me'
            }
        ]

    }

    createLabel ( data ) {

        const posArray  = this.WorldMesh.geometry.attributes.position.array
        const landIndex = AppUtils.Array.getRandomValue( this.WorldNoise.landVertices )

        const Element = document.createElement( 'world-label' )
        Element.innerHTML = data.name
        Element.style.setProperty( 'pointer-events', 'all' )

        const ThreeObject = new CSS2DObject( Element )
        ThreeObject.position.set( posArray[ landIndex ], posArray[ landIndex + 1 ], posArray[ landIndex + 2 ] )

        this.Parent.Scene.add( ThreeObject )

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
import * as ECS from '@nikolas.karinja/ecs'
import * as Elements from '../constants/elements.js'
import * as THREE from 'three'
import * as TWEEN from '../libs/tween.js'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'

export class WorldControls extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.outScale = 3
        this.moving   = false
        this.wdpTop   = 150

        this.Camera   = this.Parent.Camera
        this.Renderer = this.Parent.Renderer
        this.Scene    = this.Parent.Scene

        this.Controls = new OrbitControls( this.Camera, this.Renderer.domElement )
        this.Controls.autoRotate      = true
        this.Controls.autoRotateSpeed = 0.5
        this.Controls.dampingFactor   = 0.02
        this.Controls.enableDamping   = true
        this.Controls.enablePan       = false
        this.Controls.enableZoom      = false

        this.Raycaster   = new THREE.Raycaster()
        this.RayPosition = new THREE.Vector3()
        this.RayTarget   = new THREE.Vector3()

        this.RaySphere = new THREE.Sphere( new THREE.Vector3(), 0.306 )

        this.WorldRender = this.getComponent( 'WorldRender' )
        this.WorldWater  = this.getComponent( 'WorldWater' )

        this.Mesh = new THREE.Mesh( 
            new THREE.IcosahedronGeometry( 0.01, 0 ),
            new THREE.MeshBasicMaterial( { color: 'red', wireframe: true })
        )

        this.Scene.add( this.Mesh )

    }

    getRayDirection ( threeVec3 ) {

        return new THREE.Vector3().subVectors( this.RayTarget, threeVec3 ).normalize()

    }

    initComponent () {

        this.initDOMEvents()

    }

    initDOMEvents () {

        Elements.WorldPageDescExit.addEventListener( 'pointerup', () => {

            this.exitPageDesc()

        } )

    }

    onUpdate () {

        if ( !this.moving ) {

            this.Raycaster.set( this.Camera.position, this.getRayDirection( this.Camera.position ) )

            const Intersect = this.Raycaster.intersectObject( this.WorldWater.Mesh )

            if ( Intersect.length > 0 ) {

                this.RayPosition.copy( Intersect[ 0 ].point.multiplyScalar( this.outScale ) )

            }

            this.Controls.update()

        }

    }

    setCameraPosition ( threeVec3 ) {

        const EndVec = new THREE.Vector3().copy( threeVec3 ).multiplyScalar( this.outScale )

        this.Raycaster.set( EndVec, this.getRayDirection( EndVec ) )
        this.RayPosition.copy( EndVec )

        this.Camera.position.copy( EndVec )

    }

    setTarget ( threeVec3 ) {

        this.Controls.target.copy( threeVec3 )

    }

    moveTarget ( threeVec3, freeze = false ) {

        const EndVec = new THREE.Vector3().copy( threeVec3 ).multiplyScalar( this.outScale )

        const duration = EndVec.distanceTo( this.RayPosition ) * 1000

        const T1 = new TWEEN.Tween( this.RayPosition )
            .to( { x: EndVec.x, y: EndVec.y, z: EndVec.z }, duration )
            .easing( TWEEN.Easing.Elastic.Out )
            .onStart( () => {

                this.moving = true
                
                this.Controls.enableRotate = false

            } )
            .onUpdate( () => {

                this.Raycaster.set( this.RayPosition, this.getRayDirection( this.RayPosition ) )

                const Intersect = this.Raycaster.intersectObject( this.WorldWater.Mesh )

                if ( Intersect.length > 0 ) {

                    this.Camera.position.copy( Intersect[ 0 ].point.multiplyScalar( this.outScale ) )
                    this.Camera.lookAt( 0, 0, 0 )

                }

            } )
            .onComplete( () => {

                if ( !freeze ) {

                    this.moving = false

                    this.Controls.autoRotate = true

                } else {

                    this.setLabelPointerEvents( 'none' )

                    Elements.WorldPageDesc.style.setProperty( 'display', 'inline-block' )

                    this.WorldRender.isPaused = true

                    Elements.World.querySelector( 'canvas' ).style.setProperty( 'filter', 'blur(8px)' )
                    Elements.World.querySelector( 'div#label-renderer' ).style.setProperty( 'filter', 'blur(8px)' )
                    
                    const T2 = new TWEEN.Tween( this )
                        .to( { wdpTop: 50 }, 1000 )
                        .easing( TWEEN.Easing.Quintic.Out )
                        .onUpdate( () => Elements.WorldPageDesc.style.top = `${ this.wdpTop }vh` )
                        .start()

                }
                
                TWEEN.remove( T1 )
            
            } )
            .start()

    }

    setLabelPointerEvents ( value ) {

        for ( let e of Elements.World.querySelectorAll( 'div#label-renderer world-label' ) ) {

            e.style.setProperty( 'pointer-events', value )

        }

    }

    exitPageDesc () {

        this.setLabelPointerEvents( 'all' )

        this.WorldRender.isPaused = false

        this.Controls.autoRotate   = true
        this.Controls.enableRotate = true

        this.moving = false

        Elements.World.querySelector( 'canvas' ).style.setProperty( 'filter', 'none' )
        Elements.World.querySelector( 'div#label-renderer' ).style.setProperty( 'filter', 'none' )
                    
        const T2 = new TWEEN.Tween( this )
            .to( { wdpTop: 150 }, 1000 )
            .easing( TWEEN.Easing.Quintic.Out )
            .onUpdate( () => Elements.WorldPageDesc.style.top = `${ this.wdpTop }vh` )
            .onComplete( () => Elements.WorldPageDesc.style.setProperty( 'display', 'none' ) )
            .start()

    }

}
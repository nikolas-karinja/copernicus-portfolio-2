import * as ThreeC from '../constants/three.js'
import * as THREE from 'three'

export function buildRenderer ( name, parent ) {

    const Renderer = new THREE.WebGLRenderer()
    Renderer.setPixelRatio( window.devicePixelRatio )
    Renderer.setSize( parent.clientWidth, parent.clientHeight )

    parent.appendChild( Renderer.domElement )

    ThreeC.Renderers[ name ] = Renderer

    return ThreeC.Renderers[ name ]

}
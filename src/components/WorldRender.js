import * as ECS from '@nikolas.karinja/ecs'
import * as THREE from 'three'

export class WorldRender extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.Camera   = this.Parent.Camera
        this.Renderer = this.Parent.Renderer
        this.Scene    = this.Parent.Scene

    }

    onUpdate () {

        this.Renderer.render( this.Scene, this.Camera )

    }

}
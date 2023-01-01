import * as ECS from '@nikolas.karinja/ecs'

export class WorldRender extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.isPaused = false

        this.Camera   = this.Parent.Camera
        this.Renderer = this.Parent.Renderer
        this.Scene    = this.Parent.Scene

    }

    onUpdate () {

        if ( !this.isPaused ) this.Renderer.render( this.Scene, this.Camera )

    }

}
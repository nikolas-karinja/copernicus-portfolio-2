import * as ECS from '@nikolas.karinja/ecs'

export class JSCubeRender extends ECS.Component {

    constructor ( parent ) {

        super( parent )

        this.isPaused = false

    }

    onUpdate () {

        if ( !this.isPaused ) this.Parent.Renderer.render( this.Parent.Scene, this.Parent.Camera )

    }

}
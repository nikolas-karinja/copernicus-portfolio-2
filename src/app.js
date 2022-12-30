import * as AppUtils from '@nikolas.karinja/app-utils'
import * as ECS from '@nikolas.karinja/ecs'
import * as Elements from './constants/elements.js'
import * as ThreeC from './constants/three.js'
import { WorldEntity } from './entities/WorldEntity.js'

// components

import { WorldControls } from './components/WorldControls.js'
import { WorldLights } from './components/WorldLights.js'
import { WorldMesh } from './components/WorldMesh.js'
import { WorldNoise } from './components/WorldNoise.js'
import { WorldRender } from './components/WorldRender.js'

export class App extends AppUtils.Apps.BasicThreeApp {

    constructor ( settings ) {

        super( settings )

        this.ECSManager = new ECS.Manager()
        this.Elements   = Elements
        this.Three      = ThreeC

        this.init()

    }

    init () {

        this.initAssemblies()

        this.ECSManager.assemble( 'World', WorldEntity, {} )

    }

    initAssemblies () {

        this.ECSManager.createAssembly( 'World', ( entity ) => {

            entity.addComponent( WorldMesh, entity.Scene )
            entity.addComponent( WorldNoise )
            entity.addComponent( WorldRender )
            entity.addComponent( WorldControls )
            entity.addComponent( WorldLights )

        } )

    }

    onUpdate ( dT, eT, uA ) {

        this.ECSManager.update( dT, eT, uA )

    }

}
import * as AppUtils from '@nikolas.karinja/app-utils'
import * as Database from '/src/constants/database.js'
import * as ECS from '@nikolas.karinja/ecs'
import * as Elements from '/src/constants/elements.js'
import * as FileUtils from '/src/utils/files.js'
import * as ThreeC from '/src/constants/three.js'
import * as TWEEN from '/src/libs/tween.js'
import { JSCubeEntity } from '/src/entities/JSCubeEntity.js'

// components

import { JSCubeLights } from '/src/components/JSCubeLights.js'
import { JSCubeMesh } from '/src/components/JSCubeMesh.js'
import { JSCubeRender } from '/src/components/JSCubeRender.js'

AppUtils.Apps.startApp( class App extends AppUtils.Apps.BasicThreeApp {

    constructor ( settings ) {

        super( settings )

        this.ECSManager = new ECS.Manager()
        this.Elements   = Elements
        this.Three      = ThreeC

    }

    initAssemblies () {

        this.ECSManager.createAssembly( 'JSCube', ( entity ) => {

            entity.addComponent( JSCubeMesh )
            entity.addComponent( JSCubeRender )
            entity.addComponent( JSCubeLights )

            this.JSCube = entity

        } )

    }

    async initDatabase () {

        Database.Data.WorldLinks = await FileUtils.getDataFromJSON( '/src/db/world-links.json' )

    }

    initDOMEvents () {

        window.addEventListener( 'resize', () => this.resize() )

    }

    onUpdate ( dT, eT, uA ) {

        TWEEN.update( this.Time.frame )

        this.ECSManager.update( dT, eT, uA )

    }

    async onStart () {

        await this.initDatabase()
        this.initAssemblies()
        this.initDOMEvents()

        this.ECSManager.assemble( 'JSCube', JSCubeEntity, {} )

    }

    resize () {

        if ( this.JSCube ) this.JSCube.resize()

    }

} )

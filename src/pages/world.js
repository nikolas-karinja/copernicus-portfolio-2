import * as AppUtils from '@nikolas.karinja/app-utils'
import * as Database from '/src/constants/database.js'
import * as ECS from '@nikolas.karinja/ecs'
import * as Elements from '/src/constants/elements.js'
import * as FileUtils from '/src/utils/files.js'
import * as ThreeC from '/src/constants/three.js'
import * as TWEEN from '/src/libs/tween.js'
import { WorldEntity } from '/src/entities/WorldEntity.js'

// components

import { WorldControls } from '/src/components/WorldControls.js'
import { WorldLabelRenderer } from '/src/components/WorldLabelRender.js'
import { WorldLights } from '/src/components/WorldLights.js'
import { WorldMesh } from '/src/components/WorldMesh.js'
import { WorldNoise } from '/src/components/WorldNoise.js'
import { WorldRender } from '/src/components/WorldRender.js'
import { WorldTrees } from '/src/components/WorldTrees.js'
import { WorldVertexColors } from '/src/components/WorldVertexColors.js'
import { WorldWater } from '/src/components/WorldWater.js'

AppUtils.Apps.startApp( class App extends AppUtils.Apps.BasicThreeApp {

    constructor ( settings ) {

        super( settings )

        this.ECSManager = new ECS.Manager()
        this.Elements   = Elements
        this.Three      = ThreeC

    }

    initAssemblies () {

        this.ECSManager.createAssembly( 'World', ( entity ) => {

            entity.addComponent( WorldMesh, entity.Scene )
            entity.addComponent( WorldNoise )
            entity.addComponent( WorldRender )
            entity.addComponent( WorldWater )
            entity.addComponent( WorldControls )
            entity.addComponent( WorldLights )
            entity.addComponent( WorldVertexColors )
            entity.addComponent( WorldTrees )
            entity.addComponent( WorldLabelRenderer )

            this.World = entity

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

        this.ECSManager.assemble( 'World', WorldEntity, {} )

    }

    resize () {

        if ( this.World ) {

            this.World.resize()
            this.World.getComponent( 'WorldLabelRenderer' ).resize()

        }

    }

} )

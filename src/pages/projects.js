import * as FileUtils from '../utils/files.js'
import * as PageUtils from '../utils/pages.js'

async function createIndexButtons () {

    for ( let l of Data.languages ) {

        PageUtils.createIndexButton( l.icon, l.name, [ {
            event : 'pointerup',
            method : ( e ) => setProjectLanguage( e.target.title )
        } ] )

    }

}

async function setProjectLanguage ( name ) {

    for ( let l of Data.languages ) {

        if ( l.name == name ) {

            // document.body.querySelector( 'content' ).style.setProperty( 'background-image', `url( ${ l.background } )` )
            document.body.querySelector( 'content' ).innerHTML = ''

            document.body.querySelector( 'heading h1' ).style.setProperty( 'display', 'none' )
            document.body.querySelector( 'heading h1' ).innerHTML = l.name
            
            setTimeout( () => document.body.querySelector( 'heading h1' ).style.setProperty( 'display', 'block' ), 100 )

            if ( l.projects.length > 0 ) {

                document.body.querySelector( 'content' ).style.setProperty( 'line-height', 'inherit' )
                document.body.querySelector( 'content' ).style.setProperty( 'text-align', 'left' )

                for ( let p of l.projects ) PageUtils.createProjectElement( CodeElements, p )

            } else {

                document.body.querySelector( 'content' ).style.setProperty( 'line-height', 'calc( 100vh - 112px )' )
                document.body.querySelector( 'content' ).style.setProperty( 'text-align', 'center' )
                document.body.querySelector( 'content' ).innerHTML = 'No projects at the moment.'

            }

            break

        }

    }

}

//

const CodeElements = await FileUtils.getDataFromJSON( '../../src/db/code-elements.json' )
const Data         = await FileUtils.getDataFromJSON( '../../src/db/projects.json' )

await createIndexButtons()
await setProjectLanguage( Data.languages[ 0 ].name )
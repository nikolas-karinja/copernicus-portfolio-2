import * as FileUtils from '../utils/files.js'
import * as PageUtils from '../utils/pages.js'

async function createDemoElements () {

    let count = 0

    for ( let d of Data.demos ) {

        PageUtils.createDemoElement( CodeElements, d, count * 50 )

        count++

    }

}

//

const CodeElements = await FileUtils.getDataFromJSON( '/src/db/code-elements.json' )
const Data         = await FileUtils.getDataFromJSON( '/src/db/demos.json' )

await createDemoElements()
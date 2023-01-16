import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'

const names  = [ 'index', 'world', 'experience', 'projects', 'demos' ]
const config = []

const Plugins = {
    after: [ terser( { mangle: false } ) ],
    before: [ 
        nodeResolve(), 
        alias( {
            entries: [
                { find: 'three', replacement: 'node_modules/three/build/three.module.js' },
                { find: '@nikolas.karinja/app-utils', replacement: 'node_modules/@nikolas.karinja/app-utils/build/bundle.mjs' },
                { find: '@nikolas.karinja/ecs', replacement: 'node_modules/@nikolas.karinja/ecs/build/bundle.mjs' },
                { find: 'simplex-noise', replacement: 'node_modules/simplex-noise/dist/esm/simplex-noise.js' },
                { find: 'uuid', replacement: 'node_modules/uuid/dist/esm-browser/index.js' }
            ]
        } )
    ],
}

for ( let n of names ) {

    config.push( {
        input: `src/pages/${ n }.js`,
        output: [
            {
                file: `build/${ n }.js`,
                format: 'es',
                plugins: Plugins.after
            }
        ],
        plugins: Plugins.before
    } )

}

export default config
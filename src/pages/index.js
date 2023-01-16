import * as Elements from '../constants/elements.js'
import * as PageUtils from '../utils/pages.js'

for ( let b of Elements.NavBar.querySelectorAll( 'nav-btn' ) ) {

    b.addEventListener( 'pointerup', ( e ) => {

        for ( let bb of Elements.NavBar.querySelectorAll( 'nav-btn' ) ) {

            if ( bb.hasAttribute( 'selected' ) ) bb.removeAttribute( 'selected' )

        }

        e.target.setAttribute( 'selected', '' )

        PageUtils.setPage( e.target.innerHTML, e.target.id )

    } )

}

PageUtils.setPage( 'World', 'world' )

// javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
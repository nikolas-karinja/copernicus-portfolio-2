import * as Elements from '../constants/elements.js'

export function setPage ( title, htmlFileName ) {

    Elements.Title.innerHTML = `Nikolas Karinja - ${ title }`

    Elements.Content.setAttribute( 'src', `/assets/pages/${ htmlFileName }.html` )

    for ( let b of Elements.NavBar.querySelectorAll( 'nav-btn' ) ) {

        if ( b.hasAttribute( 'selected' ) ) b.removeAttribute( 'selected' )

        if ( b.id == htmlFileName ) b.setAttribute( 'selected', '' )
    
    }

    if ( htmlFileName == 'world' ) {

        Elements.Content.style.setProperty( 'height', 'calc( 100vh - 80px )' )

        Elements.NavBar.style.setProperty( 'height', '80px' )
        Elements.NavBar.style.setProperty( 'background', '#212121' )

    } else {

        Elements.Content.style.setProperty( 'height', 'calc( 100vh - 48px )' )

        Elements.NavBar.style.setProperty( 'height', '48px' )
        Elements.NavBar.style.setProperty( 'background', '#424242' )

    }

}
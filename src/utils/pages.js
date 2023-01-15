import * as Elements from '../constants/elements.js'

export function createIndexButton ( imageURL, label, events = [] ) {

    // create button element

    const Element = document.createElement( 'button' )
    Element.title = label

    // create img element as update src

    const ImgElement = document.createElement( 'img' )
    ImgElement.src = imageURL

    // create div element and update text

    const LabelElement = document.createElement( 'div' ) 
    LabelElement.innerHTML = label

    // append img and div elements to button

    Element.appendChild( ImgElement )
    Element.appendChild( LabelElement )

    // add event listeners

    for ( let i of events ) Element.addEventListener( i.event, i.method )

    // append button to index

    document.body.querySelector( 'index' ).appendChild( Element )

}

export function createProjectElement ( data, projectData ) {

    const Element = document.createElement( 'project' )
    Element.title = projectData.name

    const NameElement = document.createElement( 'h1' )
    NameElement.innerHTML = projectData.name

    const IconElement = document.createElement( 'img' )
    IconElement.src = projectData.icon

    const InfoElement = document.createElement( 'p' )
    InfoElement.innerHTML = projectData.info

    //

    const ElementsElement = document.createElement( 'div' )

    for ( let e of projectData.elements ) {

        const ImgElement = document.createElement( 'img' )
        ImgElement.src   = data.elements[ e ].icon
        ImgElement.title = data.elements[ e ].name

        ElementsElement.appendChild( ImgElement )

    }

    //

    const GithubElement = document.createElement( 'img' )
    GithubElement.setAttribute( 'github', '' )
    GithubElement.src   = '/assets/img/icons/github-logo.png'
    GithubElement.title = 'Go to GitHub repository'

    if ( !projectData.github ) {

        GithubElement.style.setProperty( 'opacity', '0.25' )
        GithubElement.title = 'Repository is either private or not available'

    }

    //

    Element.appendChild( IconElement )
    Element.appendChild( NameElement )
    Element.appendChild( InfoElement )
    Element.appendChild( ElementsElement )
    Element.appendChild( GithubElement )

    document.body.querySelector( 'content' ).appendChild( Element )

}

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
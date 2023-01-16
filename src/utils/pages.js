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

export function createProjectElement ( codeElements, projectData ) {

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
        ImgElement.src   = codeElements[ e ].icon
        ImgElement.title = codeElements[ e ].name

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

    } else {

        GithubElement.githubURL = projectData.github

        GithubElement.addEventListener( 'pointerup', ( e ) => window.open( e.target.githubURL ) )

    }

    //

    const ProgressElement = document.createElement( 'img' )
    ProgressElement.setAttribute( 'progress', '' )

    if ( !projectData.finished ) {

        ProgressElement.src   = '/assets/img/icons/wip.png'
        ProgressElement.title = 'Work in progress'

    } else {

        ProgressElement.src   = '/assets/img/icons/green-checkmark.png'
        ProgressElement.title = 'Finished'

    }

    //

    if ( projectData.npm ) {

        const NPMElement = document.createElement( 'img' )
        NPMElement.setAttribute( 'npm', '' )
        NPMElement.src    = '/assets/img/icons/npm-logo.png'
        NPMElement.title  = 'Go to NPM page'
        NPMElement.npmURL = projectData.npm

        NPMElement.addEventListener( 'pointerup', ( e ) => window.open( e.target.npmURL ) )

        Element.appendChild( NPMElement )

    }

    //

    Element.appendChild( IconElement )
    Element.appendChild( NameElement )
    Element.appendChild( InfoElement )
    Element.appendChild( ElementsElement )
    Element.appendChild( GithubElement )
    Element.appendChild( ProgressElement )

    document.body.querySelector( 'content' ).appendChild( Element )

}

export function createDemoElement ( codeElements, demoData, delay ) {

    const Element = document.createElement( 'demo' )
    Element.style.animationDelay = `${ 0.001 * delay }s`
    Element.title = demoData.name

    const NameElement = document.createElement( 'h1' )
    NameElement.innerHTML = demoData.name

    const IconElement = document.createElement( 'img' )
    IconElement.setAttribute( 'screenshot', '' )
    IconElement.src = demoData.screenshot

    const InfoElement = document.createElement( 'p' )
    InfoElement.innerHTML = demoData.info

    //

    const ElementsElement = document.createElement( 'div' )
    ElementsElement.setAttribute( 'elements', '' )

    for ( let e of demoData.elements ) {

        const ImgElement = document.createElement( 'img' )
        ImgElement.src   = codeElements[ e ].icon
        ImgElement.title = codeElements[ e ].name

        ElementsElement.appendChild( ImgElement )

    }

    //

    const GithubElement = document.createElement( 'div' )
    GithubElement.setAttribute( 'github', '' )
    GithubElement.title = 'Go to GitHub repository'

    if ( !demoData.github ) {

        GithubElement.style.setProperty( 'opacity', '0.25' )
        GithubElement.title = 'Repository is either private or not available'

    } else {

        GithubElement.githubURL = demoData.github
        GithubElement.addEventListener( 'pointerup', ( e ) => window.open( e.target.githubURL ) )

    }

    //

    const PlayElement = document.createElement( 'div' )
    PlayElement.setAttribute( 'play', '' )
    PlayElement.demoLink = demoData.link
    PlayElement.title    = 'Play the demo'
    PlayElement.addEventListener( 'pointerup', ( e ) => window.open( e.target.demoLink ) )

    //

    Element.appendChild( IconElement )
    Element.appendChild( NameElement )
    Element.appendChild( InfoElement )
    Element.appendChild( ElementsElement )
    Element.appendChild( GithubElement )
    Element.appendChild( PlayElement )

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
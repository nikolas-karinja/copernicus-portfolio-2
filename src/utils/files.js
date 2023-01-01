export async function getDataFromJSON ( url ) {

    const Response = await fetch( url )
    const Data     = await Response.json()

    return Data

}
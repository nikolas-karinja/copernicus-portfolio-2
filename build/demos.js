async function getDataFromJSON(url){const Response=await fetch(url);return await Response.json()}function createDemoElement(codeElements,demoData,delay){const Element=document.createElement("demo");Element.style.animationDelay=.001*delay+"s",Element.title=demoData.name;const NameElement=document.createElement("h1");NameElement.innerHTML=demoData.name;const IconElement=document.createElement("img");IconElement.setAttribute("screenshot",""),IconElement.src=demoData.screenshot;const InfoElement=document.createElement("p");InfoElement.innerHTML=demoData.info;const ElementsElement=document.createElement("div");ElementsElement.setAttribute("elements","");for(let e of demoData.elements){const ImgElement=document.createElement("img");ImgElement.src=codeElements[e].icon,ImgElement.title=codeElements[e].name,ElementsElement.appendChild(ImgElement)}const GithubElement=document.createElement("div");GithubElement.setAttribute("github",""),GithubElement.title="Go to GitHub repository",demoData.github?(GithubElement.githubURL=demoData.github,GithubElement.addEventListener("pointerup",(e=>window.open(e.target.githubURL)))):(GithubElement.style.setProperty("opacity","0.25"),GithubElement.title="Repository is either private or not available");const PlayElement=document.createElement("div");PlayElement.setAttribute("play",""),PlayElement.demoLink=demoData.link,PlayElement.title="Play the demo",PlayElement.addEventListener("pointerup",(e=>window.open(e.target.demoLink))),Element.appendChild(IconElement),Element.appendChild(NameElement),Element.appendChild(InfoElement),Element.appendChild(ElementsElement),Element.appendChild(GithubElement),Element.appendChild(PlayElement),document.body.querySelector("content").appendChild(Element)}parent.document.body.querySelector("iframe#content"),parent.document.body.querySelector("nav-bar"),parent.document.head.querySelector("title"),document.body.querySelector("page-desc"),document.body.querySelector("page-desc btn-holder button#exit"),document.body.querySelector("page-desc btn-holder button#go"),document.body.querySelector("page-desc page-icon"),document.body.querySelector("page-desc page-info"),document.body.querySelector("page-desc page-title");const CodeElements=await getDataFromJSON("../../src/db/code-elements.json"),Data=await getDataFromJSON("../../src/db/demos.json");await async function(){let count=0;for(let d of Data.demos)createDemoElement(CodeElements,d,50*count),count++}();
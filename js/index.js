const baseUrl="http://localhost:3000"
const resources="Projects"

let selectedProject;

document.addEventListener('DOMContentLoaded', fetchAnalysis)

function fetchAnalysis(){
    fetch(`${baseUrl}/${resources}`)
    .then(res=>res.json())
    .then(data=>displayImages(data))
    .catch(err=>console.log(err))
  
}

function displayImages(resources){
    resources.forEach(project => {
        selectedProject=project
        const analysisDisplay=document.querySelector('#imagesD')
        let img=document.createElement('img')
        let h3=document.createElement('h3')
        project.textContent=selectedProject.content
        h3.textContent=selectedProject.title
        img.src=selectedProject.cover
        img.alt=selectedProject.title
        img.addEventListener('click', ()=>displayContent())
        img.style.height="270px"
        img.style.width="240px"
        console.log(img)
        analysisDisplay.appendChild(img) 
        analysisDisplay.append(h3)   
    })
}


function displayContent(){
    const displayedContent=document.querySelector('#displayAnalysis')
    const btnDisplay=document.querySelector('#practice')
    const code=document.createElement('img')
    const btnContent="Practice"
    const btn=document.createElement('button')
    btn.textContent=btnContent
    btn.style.height="5vh"
    btn.style.width="200px"
    const explanation=document.createElement('img')
    console.log(selectedProject.content)
    code.src=selectedProject.image
    code.alt=selectedProject.title
    code.style.height="70vh"
    code.style.width="1000px"
    explanation.src=selectedProject.explanation
    explanation.alt=selectedProject.title
    explanation.style.height="70vh"
    explanation.style.width="700px"
    displayedContent.appendChild(code)
    displayedContent.appendChild(explanation)
    btnDisplay.appendChild(btn)
}


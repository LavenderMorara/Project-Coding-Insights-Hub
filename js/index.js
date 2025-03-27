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
        const analysisDisplay=document.querySelector('#analysis')
        let img=document.createElement('img');
        let h3=document.createElement('h3')
        h3.textContent=selectedProject.title
        img.src=selectedProject.image
        img.alt=selectedProject.title
        img.style.height="270px"
        img.style.width="240px"
        analysisDisplay.append(img) 
        analysisDisplay.appendChild(h3)    
    });
}

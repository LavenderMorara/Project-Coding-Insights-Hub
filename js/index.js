const baseUrl="http://localhost:3000"
const resources="Projects"

const analysisDisplay=document.querySelector('#analysis')
let selectedProject;

document.addEventListener('DOMContentLoaded', fetchAnalysis)

function fetchAnalysis(){
    fetch(`${baseUrl}/${resources}`)
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  
}

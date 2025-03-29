const projectsUrl="https://coding-insights-hub-projects-server.vercel.app"
const resources="Projects"

let selectedProject;

document.addEventListener('DOMContentLoaded', fetchAnalysis)

function fetchAnalysis(){
    fetch(`${projectsUrl}/${resources}`)
    .then(res=>res.json())
    .then(data=>displayImages(data))
    .catch(err=>console.log(err))
  
}

function displayImages(resources){
    resources.forEach(project => {
        selectedProject=project
        const analysisDisplay=document.querySelector('#analysis-display')
        div=document.createElement('div')
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
        div.appendChild(h3)
        div.appendChild(img)
        analysisDisplay.appendChild(div)    
    })
}


function displayContent(){
    console.log(selectedProject)
    const displayedContent=document.querySelector('#displayAnalysis')
    const code=document.createElement('img')    
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
    const SandBox=document.querySelector('#sandBox')
    const UserCode=document.querySelector('#userInput')
    const textArea=document.createElement('textarea')
    textArea.id="code"
    console.log(textArea)
    const runBtn=document.createElement("button")
    const runContent="Run"
    runBtn.textContent=runContent
    runBtn.id="RUN"
    runBtn.addEventListener('click',runCode)
    const Console=document.createElement('div')
    Console.id="console-output"
    const CodeBtn=document.createElement('button')
    CodeBtn.id="cdeWarBtn"
    CodeBtn.textContent="Code War?"
    UserCode.append(runBtn)
    UserCode.append(textArea)
    SandBox.append(UserCode)
    SandBox.append(Console)
    displayedContent.appendChild(code)
    displayedContent.appendChild(explanation)
}


function runCode() {
    const code = document.querySelector("#code").value;
    const consoleOutput = document.querySelector("#console-output");
    consoleOutput.innerHTML = "";

    let log = [];
    const oldLog = console.log;

    console.log = (...args) => {
        log.push(args.join(" "));
        oldLog.apply(console, args);
    };

    try {
        const result = new Function(code)();
        console.log = oldLog;

        if (log.length) {
            consoleOutput.innerHTML = log.join("<br>");
        } else if (result !== undefined) {
            consoleOutput.innerHTML = result;
        }
    } catch (error) {
        consoleOutput.innerHTML = `<span style='color: red;'>Error: ${error}</span>`;
    }

    console.log = oldLog;
}

const quizUrl="http://localhost:3000"
const recource2="Quizzes"
const fullQuizUrl=`${quizUrl}/${recource2}`


const practiceCodeWars=document.getElementById('quiz-nav')
practiceCodeWars.addEventListener('click',()=>fetchChallenges)

function fetchChallenges(){
    fetch(`${fullQuizUrl}`)
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}
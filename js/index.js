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
        const div=document.createElement('div')
        let img=document.createElement('img')
        let h3=document.createElement('h3')
        project.textContent=selectedProject.content
        h3.textContent=selectedProject.title
        img.src=selectedProject.cover
        img.alt=selectedProject.title
        img.addEventListener('click', 
            ()=>{displayContent()
            })
        img.style.height="270px"
        img.style.width="240px"
        // console.log(img)
        div.appendChild(h3)
        div.appendChild(img)
        analysisDisplay.appendChild(div)    
    })
}


function displayContent(){
    // console.log(selectedProject)
    const displayedContent=document.querySelector('#displayAnalysis')
    const code=document.createElement('img')    
    const explanation=document.createElement('img')
    // console.log(selectedProject.content)
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
    textArea.classList.add('code1')
    // console.log(textArea)
    const runBtn=document.createElement("button")
    const runContent="Run"
    runBtn.textContent=runContent
    runBtn.id="RUN"
    runBtn.addEventListener('click',runCode)
    const Console=document.createElement('div')
    Console.id="console-output"
    Console.classList.add('console-output1')
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
    const code = document.querySelector(".code1").value;
    const consoleOutput = document.querySelector(".console-output1");
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

const quizUrl="https://coding-insights-hub-quizzes-server.vercel.app"
const quizServerData="Quizzes"

let selectedQuiz;

const practiceCodeWars=document.getElementById('go-to-codeChallenges')
practiceCodeWars.addEventListener('click',fetchChallenges)

function fetchChallenges(){
    fetch(`${quizUrl}/${quizServerData}`)
    .then(res=>res.json())
    .then(data=>displayChallenges(data))
    .catch(err=>console.log(err))
}

function displayChallenges(quizServerData){
    const challengesDisplay=document.querySelector('#codingQuiz')
    quizServerData.forEach(quiz=>{
        selectedQuiz=quiz
        const div=document.createElement('div')
        const img=document.createElement('img')
        const h3=document.createElement('div')
        img.src=quiz.cover
        img.alt=quiz.title
        img.style.height="270px"
        img.style.width="240px"
        img.addEventListener('click',
            ()=>{displayChallengeDetails()
        })
        h3.textContent=selectedQuiz.title
        h3.style.width="230px"
        h3.style.height="65px"
        div.appendChild(h3)
        div.appendChild(img)
        challengesDisplay.appendChild(div)
    })
}

function displayChallengeDetails(){
    const challengeDetailsDisplay=document.querySelector('#Code-space')
    console.log(selectedQuiz)
    const img=document.createElement('img')
    const div1=document.createElement('div')
    const div2=document.createElement('div')
    const div3=document.createElement('div')
    const btn=document.createElement('button')
    const a=document.createElement('a')
    img.src=selectedQuiz.quiz
    img.alt=selectedQuiz.title
    div1.style.height="35vh"
    div1.style.width="95vh"
    div1.classList.add("challenge-divs")
    btn.textContent="Submit To Code Wars"
    a.href=selectedQuiz.link
    console.log(a)
    div3.style.height="58vh"
    const div4=document.createElement('div')
    const TextArea=document.createElement('textarea')
    const runBtn=document.createElement('button')
    const Console=document.createElement('div')
    Console.id="sandBox2"
    Console.classList.add('console-output1')
    runBtn.textContent="RUN"
    runBtn.id="add-color"
    TextArea.id="code-war-sandBox"
    TextArea.classList.add('code1')
    runBtn.addEventListener('click',runCode)
    div4.id="add-row-flex"
    div4.appendChild(runBtn)
    div4.appendChild(TextArea)
    div3.appendChild(div4)
    div3.id="Add-Css"
    console.log(div3)
    div3.appendChild(Console)
    btn.appendChild(a)
    div1.appendChild(img)
    div2.appendChild(btn)
    challengeDetailsDisplay.appendChild(div1)
    challengeDetailsDisplay.appendChild(div3)
    challengeDetailsDisplay.appendChild(div2)
    
}
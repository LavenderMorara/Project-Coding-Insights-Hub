const projectsUrl="https://projects-server-2.vercel.app"
const resources="Projects"
const usersUrl="https://coding-insights-hub-user-server.vercel.app/Users"

let selectedProject;

document.addEventListener('DOMContentLoaded',postSignUpAndGoToHome)
function postSignUpAndGoToHome(){
    const btn=document.querySelector('#signUpButton')
    btn.addEventListener('click', ()=>{
        location.hash = "#home";
       alert("User Successfully Registered")
    document.querySelectorAll("section").forEach(section => {
        section.style.display = section.id === "home" ? "block" : "none";
    });
});

   const form=document.querySelector('#signUpForm')
   form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = { email, password };

    fetch(usersUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(window.location.reload())
    .then(data => {
        console.log("User registered successfully:", data);
    })
    .catch(error => {
        console.error("Error:", error);

    });
});

}



document.addEventListener("DOMContentLoaded", function () {
    function showSection(sectionId) {
        document.querySelectorAll("section").forEach(section => {
            section.style.display = "none";
        });

        const activeSection = document.querySelector(sectionId);
        if (activeSection) {
            activeSection.style.display = "block";
        }
    }

    function updateActiveSection() {
        let sectionId = location.hash || "#signUp";
        showSection(sectionId);
    }

    document.querySelectorAll(".Nlink").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let sectionId = this.getAttribute("href");
            location.hash = sectionId;
            showSection(sectionId);
        });
    });

    updateActiveSection();
});


const insightsUrl="https://best-practices-server.vercel.app/insights"


function fetchInsights() {
    fetch(insightsUrl)
        .then(response => response.json())
        .then(data => displayInsights(data))
        .catch(error => console.error("Error fetching insights:", error));
}

function displayInsights(insights) {
    const insightsContainer = document.getElementById("insights");
    insightsContainer.innerHTML = "";

    insights.forEach(insight => {
        const div = document.createElement("div");
        div.classList.add("insight-item");
        div.textContent = insight.content;

        const br1 = document.createElement("br");
        const br2 = document.createElement("br");

        insightsContainer.appendChild(div);
        insightsContainer.appendChild(br1);
        insightsContainer.appendChild(br2);
    });
}

document.addEventListener("DOMContentLoaded", fetchInsights);


const AnalysisContent=document.getElementById('lavender')
AnalysisContent.addEventListener('click',fetchAnalysis)

function fetchAnalysis(){
    fetch(`${projectsUrl}/${resources}`)
    .then(res=>res.json())
    .then(data=>displayImages(data))
    .catch(err=>console.log(err))
  
}

document.addEventListener("DOMContentLoaded", displayImages);

function displayImages(resources){
    resources.forEach(project => {
        selectedProject=project
        const analysisDisplay=document.querySelector('#displayAnalysisList')
        const div=document.createElement('div')
        let img=document.createElement('img')
        let h3=document.createElement('h3')
        h3.textContent=project.title
        img.src=project.cover
        img.alt=project.title
        img.addEventListener('click', 
            ()=>{displayContent(project)
            })
        img.style.height="270px"
        img.style.width="240px"
        // console.log(img)
        div.appendChild(h3)
        div.appendChild(img)
        analysisDisplay.appendChild(div)    
    })
}


function displayContent(selectedProject){
     console.log(selectedProject)
    const displayedContent=document.querySelector('#displayAnalysis')
    displayedContent.innerHTML="";
    const code=document.createElement('img')    
    const explanation=document.createElement('img')
    const likeBtn=document.querySelector('#likebtn')
    likeBtn.addEventListener('click',()=>updateLikes(selectedProject))
    const Likes=document.querySelector('#likesCount')
    Likes.textContent=selectedProject.likes
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
    userCode.innerHTML="";
    UserCode.append(runBtn)
    UserCode.append(textArea)
    SandBox.innerHTML="";
    SandBox.append(UserCode)
    SandBox.append(Console)
    displayedContent.appendChild(code)
    displayedContent.appendChild(explanation)
}

function updateLikes(selectedProject){
    const LIKES=parseInt(selectedProject.likes,10)
    const Likes=document.querySelector('#likesCount')
    console.log(selectedProject.id)
    console.log(selectedProject.likes)
    const newLikes=LIKES+1
    fetch(`${projectsUrl}/${resources}/${selectedProject.id}`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({likes:newLikes})
    })
    .then(res=>res.json())
    .then(Likes.textContent=newLikes)
    .catch(err=>console.log(err))
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

document.addEventListener("DOMContentLoaded", fetchAnalysis);


const quizUrl="https://coding-insights-hub-quizzes-server.vercel.app"
const quizServerData="Quizzes"

let selectedQuiz;

const practiceCodeWars=document.getElementById('practice')
practiceCodeWars.addEventListener('click',fetchChallenges)


 document.addEventListener('DOMContentLoaded', fetchChallenges)
function fetchChallenges(){
    fetch(`${quizUrl}/${quizServerData}`)
    .then(res=>res.json())
    .then((data)=>displayChallenges(data))
    .catch(err=>console.log(err))
}

document.addEventListener('DOMContentLoaded',displayChallenges)

function displayChallenges(quizServerData){
    const challengesDisplay=document.querySelector('#coding')
    quizServerData.forEach(quiz=>{
        selectedQuiz=quiz
        const div=document.createElement('div')
        const img=document.createElement('img')
        const h3=document.createElement('div')
        img.src=quiz.cover
        img.alt=quiz.title
        img.style.height="270px"
        img.style.width="240px"
        img.addEventListener('click',()=>displayChallengeDetails(quiz))
        h3.textContent=quiz.title
        h3.style.width="230px"
        h3.style.height="65px"
        div.appendChild(h3)
        div.appendChild(img)
        challengesDisplay.appendChild(div)
    })
   
}

function displayChallengeDetails(selectedQuiz){
    const challengeDetailsDisplay=document.querySelector('#Code-space')
     challengeDetailsDisplay.innerHTML="";
    console.log(selectedQuiz)
    challengeDetailsDisplay.innerHTML="";
    const img=document.createElement('img')
    const div1=document.createElement('div')
    const div2=document.createElement('div')
    const div3=document.createElement('div')
    const a=document.createElement('a')
    img.src=selectedQuiz.quiz
    img.alt=selectedQuiz.title
    div1.style.height="50vh"
    div1.style.width="95vh"
    div1.classList.add("challenge-divs")
    a.textContent="Submit To Code Wars"
    a.href=selectedQuiz.link
    a.target = "_blank"
    console.log(a)
    a.style.fontSize="25px"
    div3.style.minHeight="58vh"
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
    div4.innerHTML=""
    div4.appendChild(runBtn)
    div4.appendChild(TextArea)
    div3.appendChild(div4)
    div3.id="Add-Css"
    console.log(div3)
    div3.innerHTML="";
    div3.appendChild(Console)
    div1.appendChild(img)
    div2.appendChild(a)
    challengeDetailsDisplay.appendChild(div1)
    challengeDetailsDisplay.appendChild(div3)
    challengeDetailsDisplay.appendChild(div2)
    
}


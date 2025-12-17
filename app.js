document.addEventListener("DOMContentLoaded",()=>{
    function showalert(message){
        document.getElementById("alert-message" ).innerText=message;
        document.getElementById("alert-modal").showModal();
    }
    function setlogginstate(islogedin){
        const navbar=document.getElementById("navbar");
        const banner=document.getElementById("banner-section");
        const learnsection=document.getElementById("learn");
        const faq=document.getElementById("faq")

        if(islogedin){
            navbar.classList.remove("hidden")
            banner.classList.add("hidden")
            learnsection.classList.remove("hidden")
            faq.classList.remove("hidden")
        }
        else{
            navbar.classList.add("hidden")
            banner.classList.remove("hidden")
            learnsection.classList.add("hidden")
            faq.classList.add("hidden")

        }
    }
        const loginbutton= document.getElementById("login-btn")
        loginbutton.addEventListener("click",()=>{
            const username="Admin";
            const password="123456";

           const enteredName = document.getElementById("username").value; 
           const enteredPassword = document.getElementById("password").value;
            if(username==enteredName  && password==enteredPassword){
                showalert("you are successfully login")
                setlogginstate(true);
            }
            else{
                showalert("you give the name or password wrong")
            }

        })
        const logout=document.getElementById("logout-btn");
        logout.addEventListener("click",()=>{
            setlogginstate(false)
        })

    
})

 function pronounceWord(word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-EN'; // English
      window.speechSynthesis.speak(utterance);
    }

function Loadvocabulary(){
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(data=>displayvocabulary(data.data))
}

function loadlesson(id){
    document.getElementById("placeholder_text").classList.add("hidden")
    document.getElementById("lesson_container").classList.remove("hidden")
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=> displaylesson(data.data))
}


function detailsload(id){
    console.log(id)
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaydetails(data.data))

}
function displaydetails(data){
    document.getElementById("worddetails").showModal();
    const detailscontainers=document.getElementById("details_container");
    let synonymsHtml = "";
    if(data.synonyms && data.synonyms.length>0){
        const synonymsbadge=data.synonyms.map(s=>{
            return `<span class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">${s}</span>`
        });
        synonymsHtml=synonymsbadge.join('');
    }
    else{
        synonymsHtml = `<p class="text-gray-500">None/নেই</p>`;

    }
    
    detailscontainers.innerHTML=`
   
<div class="m-4 p-2">
    <h4 class="text-lg font-bold">${data.word}(<i class="fa-solid fa-microphone-lines"></i>${data.pronunciation})</h4>
    <p class="mb2 follow">Meaning</p>
    <p>${data.meaning}</p>
    <p class="mb2 font-bold">Example</p>
    <p>${data.sentence}</p>
    <p class="mb2 font-bold">সমার্থক শব্দ গুলো</p>
    <div class="flex flex-wrap gap-2 mt-2">
               ${synonymsHtml}
      </div>
</div>
`

}
function displayvocabulary(vocabulary){
    const btn_container=document.getElementById("vocabularies_container")
    for(let v of vocabulary){
        console.log(v.level_no)
        const button_div=document.createElement("div");
        button_div.innerHTML=`
        <button onclick="loadlesson(${v.level_no})" id="btn-${v.level_no}" class="btn btn-outline btn-outline-[#422AD5] text-[#422AD5]"><img src="./assets/fa-book-open.png">lesson-${v.level_no}</button>
        `
        btn_container.appendChild(button_div)
    }

}

function displaylesson(lessons){
    const lesson_container=document.getElementById("lesson_container")
    // lesson_container.classList.add("bg-[#C6BDBD]", "rounded-lg", "max-w-7xl","mx-auto", "p-10", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5")
    lesson_container.innerHTML="";
    if(lessons.length==0){
        return lesson_container.innerHTML=`
         <div class="col-span-full flex flex-col justify-center items-center text-center">
    <img src="./assets/alert-error.png">
    <p class="text-[#62748E] text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h4 class="text-3xl font-bold mt-2">নেক্সট Lesson এ যান</h4>
   </div>`
    }
    for(let less of lessons){
        console.log(less)
        const card_container=document.createElement("div")
        card_container.classList.add("card", "bg-white", "p-8", "rounded-lg", "shadow-md");
        card_container.innerHTML=`
       
            <div class="text-center leading-8">
                <h3 class="text-xl font-bold">${less.word}</h3>
                <p class="font-bold">meaning/pronuncition</P>
                <p class="text-[#374957]">${less.meaning} /${less.pronunciation}</p>
                
            </div>
            <div class="icon flex justify-between">
                <button class="btn btn-xs bg-[#D4F2F2]" onclick="detailsload('${less.id}')"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn btn-xs bg-[#D4F2F2]" onclick="pronounceWord('${less.word}')" ><i class="fa-solid fa-volume-high"></i></button>
                

            </div>

       
        `
        lesson_container.appendChild(card_container)
    }
}
Loadvocabulary()
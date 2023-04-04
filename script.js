const container = document.querySelector('.container');
const myForm = document.querySelector('.my-form');
const header = document.querySelector('.header')
const normView = document.querySelector('.normal-view')
const inputView = document.querySelector('.input-section')

const pTitle = document.querySelector('.normal-view .title')
const pDes = document.querySelector('.normal-view .description')

const iTitle = document.querySelector('.input-section #title')
const iDes = document.querySelector('.input-section #description')

var questionIndex = 0;
pTitle.textContent = localStorage.getItem('title');
pDes.textContent = localStorage.getItem('description');


if(localStorage.getItem('title') == null || pTitle.textContent == ''){
    pTitle.textContent = 'Untitled Form';
}

window.addEventListener('click', (e)=>{
    if(e.target != header) {
        header.classList.remove('active');
        if(localStorage.getItem('title') == null || pTitle.textContent == '' || localStorage.getItem('title') == ''){
            pTitle.textContent = 'Untitled Form';
            pDes.textContent = localStorage.getItem('description');
        }
        else{
            pTitle.textContent = localStorage.getItem('title');
            pDes.textContent = localStorage.getItem('description');
        }
    }

    if(e.target == header
        || e.target == pTitle 
        || e.target == pDes 
        || e.target == iTitle 
        || e.target == iDes){
        header.classList.add('active');
        iTitle.value = localStorage.getItem('title');
        iDes.value = localStorage.getItem('description');
    }
  
})

iTitle.addEventListener('change', ()=>{
    pTitle.textContent = iTitle.value;
    if(iTitle.value == '' || iTitle.value == null) pTitle.textContent = 'Untitled Form';
    localStorage.setItem('title', iTitle.value);
})
iDes.addEventListener('change', ()=>{
    if(iDes.value != '')pDes.textContent = iDes.value;
    localStorage.setItem('description', iDes.value);
})

const previewbtn = document.querySelector('.preview');

previewbtn.addEventListener('click', ()=>{
    window.location.href = './preview.html';
})


const others = document.querySelector('.other-display');
const otherButton = document.querySelector('.other-button');


const addButton = document.querySelector('div.adding-button');
const just_text = document.querySelector('div.adding-button .just-text');

var check = true;

otherButton.addEventListener('click', ()=>{   
    document.getElementById("button-group").style.overflow  = 'visible';
    (others.style.display == 'none' || others.style.display == '')?others.style.display = 'flex':others.style.display = 'none';
});

just_text.addEventListener('click', ()=>{
    if(check){
        addButton.classList.add('active');
        check = false;
        document.getElementById("button-group").style.overflow  = 'hidden'; 
    }
    else {
        addButton.classList.remove('active');
        check = true;
        document.getElementById("button-group").style.overflow  = 'hidden';
    }
})

addButton.addEventListener('click', (e)=>{
    let arr = e.target.textContent;
    for(let i=0; i<arr.length; i++){
        if(arr[i] == '+'){
            if(check){
                addButton.classList.add('active');
                check = false;
                document.getElementById("button-group").style.overflow  = 'hidden';
            }
            else {
                addButton.classList.remove('active');
                others.style.display = 'none';
                check = true;
                document.getElementById("button-group").style.overflow  = 'hidden';
            }   
            break;
        }
    }
})

const questionArea = document.querySelector('.each-question');
const questionOption = document.querySelector('.add-question');

 let dataArr = [];

for(let key in localStorage) {
    if(localStorage.getItem(key) == null) continue;
    if(localStorage.getItem(key).includes('question') && localStorage.getItem(key).includes('type')){
        dataArr.push(JSON.parse(localStorage.getItem(key)));
        
    }
}

dataArr.reverse();

let heading = localStorage.getItem('title');
let description = localStorage.getItem('description');
localStorage.clear();
if(heading == 'null' || heading == null)header = 'Untitled Form';
localStorage.setItem('title', heading);
localStorage.setItem('description', description);


dataArr.forEach(element => {
    if(element.type == 'choice') {
        chooseQuestion(element.question, element.option1, element.option2);
        questionIndex++;
    }
    if(element.type == 'text') {
        textQuestion(element.question);
        questionIndex++;
    }
    if(element.type == 'date') {
        dateQuestion(element.question);
        questionIndex++;
    }
    if(element.type == 'rating') {
        rating(element.question);
        questionIndex++;
    }
});

makeItDraggable();

function makeItDraggable (){
    let draggedItem = null;
    questionArea.addEventListener('dragstart', function (e) {
        draggedItem = e.target;
        // Set the data transfer object
        e.dataTransfer.setData('text/plain', draggedItem);
    });

    // Add dragover event listener to the list
    questionArea.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    // Add drop event listener to the list
    questionArea.addEventListener('drop', function (e) {
        e.preventDefault();
        const parentElement = e.target.closest('.for-drag');
        parentElement.insertAdjacentElement('afterend',draggedItem);
    });
}

function chooseQuestion(quesitonTitle = 'Question', option1 = 'Option-1', option2 = 'Option-2'){
    const newQuestion = document.createElement('div');
    const index = questionIndex;
    let html = `
    <div id="question-${index}" class="question-div">
        <div class="place-change">
        <span id="copy-content-${index}" class="material-symbols-outlined iconSize">content_copy</span>
        <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
        <span class="material-symbols-outlined iconSize">arrow_downward</span>
        <span class="material-symbols-outlined iconSize">arrow_upward</span>
        </div>
        <div class="question-header">
            <div class="question-title">
                <span class="number-size"> ${index+1}. </span>
                <input value="${quesitonTitle}" id="input-head-${index}" type="text" placeholder="Enter the Question">
            </div>
        </div>
        <div class="question-body">
            <div class="question-options">
                <div class="option">
                    <input class="option-radio" type="radio">
                    <input value="${option1}" id = "input1-${index}" class="option-input" type="text" placeholder="Option-1">
                </div>
                <div class="option">
                    <input class="option-radio" type="radio">
                    <input value="${option2}" id = "input2-${index}" class="option-input" type="text" placeholder="Option-2">
                </div>
            </div>

            <div class="extra-option">
                <div class="option">
                <span> + add option </span>
                </div>
                <div class="option">
                    <span> add "other" option </span>
                </div>
            </div>

        </div>
        <div class="extra-functon">
            <div class="option">
                <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Multile answer
            </div>
            <div class="option">
                <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Required
            </div>
            <div class="option">
                <span class="material-symbols-outlined">more_horiz</span> 
            </div>
        </div>
    </div>
    `

    newQuestion.innerHTML = html;
    questionArea.appendChild(newQuestion);
    let data = {
        type: 'choice',
        question: quesitonTitle,
        option1: option1,
        option2: option2
    }
    localStorage.setItem(`question-${index}`, JSON.stringify(data));
    
    const currentDom = document.getElementById(`question-${index}`);
    const bodyDom =document.querySelector('body');


    window.addEventListener('click', (e) => {

        const clickHead = document.querySelector(`#head-${index}`);
        const clickOption = document.querySelector(`#option1-${index}`);
        const clickOption2 = document.querySelector(`#option2-${index}`);
        const clickText = document.querySelector(`#question-view-${index}`);
        const clickDiv = document.querySelector(`.click-div-${index}`);

        if(e.target == myForm || e.target == bodyDom){
            let quesiton = document.querySelector(`#input-head-${index}`).value;
            let option1 = document.querySelector(`#input1-${index}`).value;
            let option2 = document.querySelector(`#input2-${index}`).value;
            currentDom.classList.add('for-drag');
            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.add('question-div-clean');
            currentDom.setAttribute('draggable', 'true');
            classAdd.classList.remove('question-div');

            let defaultHtml = ` 
                <div class="question-header">
                    <div class="question-title">
                        <h3 id="head-${index}">${index+1}. <span id="question-view-${index}">${quesiton}</span></h3>
                    </div>  
                </div>
                <div class="question-body">
                    <div class="question-options">
                        <div id="option1-${index}" class="option" class="click-div-${index}">
                            <input class="option-radio" type="radio">
                            <p id="option-view1-${index}" class="click-div-${index}">${option1}</p>
                        </div>
                        <div id="option2-${index}" class="option">
                            <input class="option-radio" type="radio">
                            <p id="option-view2-${index}" class="click-div-${index}">${option2}</p>
                        </div>
                    </div>
                </div>
            `
            currentDom.innerHTML = defaultHtml;
            let data = {
                type: 'choice',
                question: quesiton,
                option1: option1,
                option2: option2
            }
            localStorage.setItem(`question-${index}`, JSON.stringify(data));

        }
        else if(e.target == currentDom || e.target == clickHead || e.target == clickOption || e.target == clickOption2 || e.target == clickText || e.target == clickDiv){
            let question = document.querySelector(`#question-view-${index}`).textContent;
            let option1 = document.querySelector(`#option-view1-${index}`).textContent;
            let option2 = document.querySelector(`#option-view2-${index}`).textContent;


            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.remove('question-div-clean');
            classAdd.classList.add('question-div');
            
            currentDom.setAttribute('draggable', 'false');
            currentDom.classList.remove('for-drag');

            currentDom.innerHTML= `
            <div class="place-change">
            <span id = "copy-content-${index}" class="material-symbols-outlined iconSize">content_copy</span>
            <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
            <span class="material-symbols-outlined iconSize">arrow_downward</span>
            <span class="material-symbols-outlined iconSize">arrow_upward</span>
            </div>
            <div class="question-header">
                <div class="question-title">
                    <span class="number-size"> ${index+1}. </span>
                    <input id="input-head-${index}" value="${question}" type="text" placeholder="Enter the Question">
                </div>
            </div>
            <div class="question-body">
                <div class="question-options">
                    <div class="option">
                        <input class="option-radio" type="radio">
                        <input id="input1-${index}" value="${option1}" class="option-input" type="text" placeholder="Option-1">
                    </div>
                    <div class="option">
                        <input class="option-radio" type="radio">
                        <input id="input2-${index}" value="${option2}" class="option-input" type="text" placeholder="Option-2">
                    </div>
                </div>
    
                <div class="extra-option">
                    <div class="option">
                    <span> + add option </span>
                    </div>
                    <div class="option">
                        <span> add "other" option </span>
                    </div>
                </div>
    
            </div>
            <div class="extra-functon">
                <div class="option">
                    <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Multile answer
                </div>
                <div class="option">
                    <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Required
                </div>
                <div class="option">
                    <span class="material-symbols-outlined">more_horiz</span> 
                </div>
            </div>
            ` 

                
            let data = {
                type: 'choice',
                question: quesiton,
                option1: option1,
                option2: option2
            }
            localStorage.setItem(`question-${index}`, JSON.stringify(data));
            
         }

         const copyContent = document.getElementById(`copy-content-${index}`);
         if(copyContent)copyContent.addEventListener('click', ()=>{
             const quesiton = document.querySelector(`#input-head-${index}`).value;
             const option1 = document.querySelector(`#input1-${index}`).value;
             const option2 = document.querySelector(`#input2-${index}`).value;
             chooseQuestion(quesiton, option1, option2);
         })

        const deleteDom = document.getElementById(`delete-${index}`);
        if(deleteDom)deleteDom.addEventListener('click', ()=>{
            const deleteFrom = document.getElementById(`question-${index}`);
            if(deleteFrom)deleteFrom.remove();
            localStorage.removeItem(`question-${index}`);
        })

    });
    
    questionIndex++;
}

questionOption.addEventListener('click', function(){
    chooseQuestion();
});


const questionText = document.querySelector('.add-text');

function textQuestion(quesitonTitle = 'Question'){
    const newQuestion = document.createElement('div');
    
    const index = questionIndex;
    let html = `
    <div id="question-${index}" class="question-div">
    <div class="place-change">
    <span id="copy-content-${index}" class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${index+1}. </span>
            <input value="${quesitonTitle}" id="input-head-${index}" type="text" placeholder="Enter the Question">
        </div>
    </div>

    <div class="question-body">
        <input class="text-input" type="text" placeholder="Enter your answer">
    </div>

        <div class="extra-functon">
            <div class="option">
                <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Long answer
            </div>
            <div class="option">
                <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Required
            </div>
            <div class="option">
                <span class="material-symbols-outlined">more_horiz</span> 
            </div>
        </div>
    </div>
    `

    newQuestion.innerHTML = html;
    questionArea.appendChild(newQuestion);
    let data = {
        type: 'text',
        question: quesitonTitle,
    }
    localStorage.setItem(`question-${index}`, JSON.stringify(data));

    const currentDom = document.getElementById(`question-${index}`);
    const bodyDom =document.querySelector('body');


    window.addEventListener('click', (e) => {
        
        const clickHead = document.querySelector(`#head-${index}`);
        const clickDiv = document.querySelector(`.click-div-${index}`);
        
        if(e.target == myForm || e.target == bodyDom){
            let question = document.querySelector(`#input-head-${index}`).value;
            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.add('question-div-clean');
            classAdd.classList.remove('question-div');

            currentDom.classList.add('for-drag');
            currentDom.setAttribute('draggable', 'true');
            
            let defaultHtml = ` 
            <div class="question-header">
                <div class="question-title">
                <h3 id="head-${index}">${index+1}. <span id="question-view-${index}" class="click-div-${index}">${question}</span></h3>
                </div>
            </div>
    
            <div class="question-body">
                <input class="text-input-view" type="text" placeholder="Enter your answer">
            </div>
            `
            currentDom.innerHTML = defaultHtml;
            let data = {
                type: 'text',
                question: question,
            }
            localStorage.setItem(`question-${index}`, JSON.stringify(data));

        }
        else if(e.target == currentDom || e.target == clickHead || e.target == clickDiv){
            let question = document.querySelector(`#question-view-${index}`).textContent;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.remove('question-div-clean');
            classAdd.classList.add('question-div');

            currentDom.classList.remove('for-drag');
            currentDom.setAttribute('draggable', 'false');

            currentDom.innerHTML= `
            <div class="place-change">
            <span id="copy-content-${index}" class="material-symbols-outlined iconSize">content_copy</span>
            <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
            <span class="material-symbols-outlined iconSize">arrow_downward</span>
            <span class="material-symbols-outlined iconSize">arrow_upward</span>
            </div>
            <div class="question-header">
                <div class="question-title">
                    <span class="number-size"> ${index+1}. </span>
                    <input id="input-head-${index}" value="${question}" type="text" placeholder="Enter the question">
                </div>
            </div>

            <div class="question-body">
                <input class="text-input" type="text" placeholder="Enter your answer">
            </div>

            <div class="extra-functon">
                <div class="option">
                    <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Multile answer
                </div>
                <div class="option">
                    <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Required
                </div>
                <div class="option">
                    <span class="material-symbols-outlined">more_horiz</span> 
                </div>
            </div>
            ` 

            let data = {
                type: 'text',
                question: question,
            }
            localStorage.setItem(`question-${index}`, JSON.stringify(data));
         }

        const copyContent = document.getElementById(`copy-content-${index}`);
        if(copyContent)copyContent.addEventListener('click', ()=>{
            const quesiton = document.querySelector(`#input-head-${index}`).value;
            textQuestion(quesiton);
        })

         const deleteDom = document.getElementById(`delete-${index}`);
         if(deleteDom)deleteDom.addEventListener('click', ()=>{
             const deleteFrom = document.getElementById(`question-${index}`);
             if(deleteFrom)deleteFrom.remove();
             localStorage.removeItem(`question-${index}`);
         })
    })

    questionIndex++;
}

questionText.addEventListener('click', function(){
    textQuestion();
});



const questionDate = document.querySelector('.add-date');

function dateQuestion(quesitonTitle = 'Question'){
    const index = questionIndex;
    const newQuestion = document.createElement('div');
    newQuestion.classList.add('for-drag');
    newQuestion.setAttribute('draggable', 'true');
    newQuestion.innerHTML = `
    <div id="question-${index}" class="question-div">
    <div class="place-change">
    <span id="copy-content-${index}"  class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${index+1}. </span>
            <input value="${quesitonTitle}" id="input-head-${index}" type="text" placeholder="Enter the Question">
        </div>
    </div>

    <div class="question-body">
        <input class="option-time" type="date" disabled placeholder="Enter your answer">
    </div>

    <div class="extra-functon">
        <div class="option">
            <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Required
        </div>
        <div class="option">
            <span class="material-symbols-outlined">more_horiz</span> 
        </div>
        </div>
    </div>
    `
    questionArea.appendChild(newQuestion);
    let data = {
        type: 'date',
        question: quesitonTitle,
    }
    localStorage.setItem(`question-${index}`, JSON.stringify(data));

    const currentDom = document.getElementById(`question-${index}`);
    const bodyDom =document.querySelector('body');


    window.addEventListener('click', (e) => {
        
        const clickHead = document.querySelector(`#head-${index}`);
        const clickDiv = document.querySelector(`.click-div-${index}`);
        
        
        if(e.target == myForm || e.target == bodyDom){
            let question = document.querySelector(`#input-head-${index}`).value;
            if(question == '') quesiton = `Not set Question`;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.add('question-div-clean');
            classAdd.classList.remove('question-div');

            currentDom.classList.add('for-drag');
            currentDom.setAttribute('draggable', 'true');

            let defaultHtml = ` 
            <div class="question-header">
                <div class="question-title">
                <h3 id="head-${index}">${index+1}. <span id="question-view-${index}" class="click-div-${index}">${question}</span></h3>
                </div>
            </div>
    
            <div class="question-body">
                <input class="option-time" type="date" disabled placeholder="Enter your answer">
            </div>
            `
            currentDom.innerHTML = defaultHtml;
            let data = {
                type: 'date',
                question: question,
            }
            localStorage.setItem(`question-${index}`, JSON.stringify(data));

        }
        else if(e.target == currentDom || e.target == clickHead || e.target == clickDiv){
            let question = document.querySelector(`#question-view-${index}`).textContent;
            if(question == 'Not set Question') question = ``;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.remove('question-div-clean');
            classAdd.classList.add('question-div');

            currentDom.classList.remove('for-drag');
            currentDom.setAttribute('draggable', 'false');

            currentDom.innerHTML= `
            <div class="place-change">
            <span id="copy-content-${index}" class="material-symbols-outlined iconSize">content_copy</span>
            <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
            <span class="material-symbols-outlined iconSize">arrow_downward</span>
            <span class="material-symbols-outlined iconSize">arrow_upward</span>
            </div>
            <div class="question-header">
                <div class="question-title">
                    <span class="number-size"> ${index+1}. </span>
                    <input id="input-head-${index}" value="${question}" type="text" placeholder="Enter the question">
                </div>
            </div>

            <div class="question-body">
                <input class="text-input" type="date" placeholder="Enter your answer">
            </div>

            <div class="extra-functon">
                <div class="option">
                    <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Multile answer
                </div>
                <div class="option">
                    <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Required
                </div>
                <div class="option">
                    <span class="material-symbols-outlined">more_horiz</span> 
                </div>
            </div>
            ` 
            let data = {
                type: 'date',
                question: question,
            }
            localStorage.setItem(`question-${index}`, JSON.stringify(data));
         }

        const copyContent = document.getElementById(`copy-content-${index}`);
        if(copyContent)copyContent.addEventListener('click', ()=>{
            const quesiton = document.querySelector(`#input-head-${index}`).value;
            textQuestion(quesiton);
            quesiton.stopPropagation();
        })

         const deleteDom = document.getElementById(`delete-${index}`);
         if(deleteDom)deleteDom.addEventListener('click', ()=>{
            const deleteFrom = document.getElementById(`question-${index}`);
            if(deleteFrom)deleteFrom.remove();
            localStorage.removeItem(`question-${index}`);
         })
    })

    questionIndex++;
}

questionDate.addEventListener('click', function(){
    dateQuestion();
});


const questionRating = document.querySelector('.add-rating');

questionRating.addEventListener('click', function(){
    rating()
});

function rating(quesitonTitle = 'Quesiton'){
    const newQuestion = document.createElement('div');
    const index = questionIndex;
    newQuestion.classList.add('for-drag');
    newQuestion.setAttribute('draggable', 'true');
    newQuestion.innerHTML = `
    <div id="question-${index}" class="question-div">
    <div class="place-change">
    <span id="copy-content-${index}" class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${index+1}. </span>
            <input value="${quesitonTitle}" id="input-head-${index}" type="text" placeholder="Enter the question">
        </div>
    </div>

    <div class="rating-body">
        <span class="material-symbols-outlined star">star</span>
        <span class="material-symbols-outlined star">star</span>
        <span class="material-symbols-outlined star">star</span>
        <span class="material-symbols-outlined star">star</span>
        <span class="material-symbols-outlined star">star</span>
    </div>

    <div class="rating-functon">
        <div class="drop-down">
            <span class="rating-function-text">Label :</span> 
            <select class="section-div" name="label" id="label">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="drop-down">
            <span class="rating-function-text">Symbol : </span>
            <select class="section-div" name="label" id="label">
            <option value="1">Star</option>
                    <option value="2">Heart</option>
                    <option value="3">Like</option>
                    <option value="4">Love</option>
                    <option value="4">Number</option>
                    <option value="4">Tropy</option>
                    <option value="4">Flag</option>
            </select>
        </div>

    </div>

    <div class="extra-functon">
        <div class="option">
        <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Required
        </div>
        <div class="option">
        <span class="material-symbols-outlined">more_horiz</span> 
        </div>
    </div>
</div>
    `
    questionArea.appendChild(newQuestion);
    let data = {
        type: 'rating',
        question: quesitonTitle,
    }
    localStorage.setItem(`question-${index}`, JSON.stringify(data));

    const currentDom = document.getElementById(`question-${index}`);
    const bodyDom =document.querySelector('body');


    window.addEventListener('click', (e) => {
        
        const clickHead = document.querySelector(`#head-${index}`);
        const clickDiv = document.querySelector(`.click-div-${index}`);
        
        
        if(e.target == myForm || e.target == bodyDom){
            let question = document.querySelector(`#input-head-${index}`).value;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.add('question-div-clean');
            classAdd.classList.remove('question-div');

            currentDom.classList.add('for-drag');
            currentDom.setAttribute('draggable', 'true');

            let defaultHtml = ` 
            <div class="question-header">
                <div class="question-title">
                <h3 id="head-${index}">${index+1}. <span id="question-view-${index}" class="click-div-${index}">${question}</span></h3>
                </div>
            </div>
    
            <div class="rating-body">
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
            </div>
            `
            currentDom.innerHTML = defaultHtml;
            let data = {
                type: 'rating',
                question: question,
            }
            localStorage.setItem(`question-${index}`, JSON.stringify(data));

        }
        else if(e.target == currentDom || e.target == clickHead || e.target == clickDiv){
            let question = document.querySelector(`#question-view-${index}`).textContent;
            if(question == 'Not set Question') question = ``;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.remove('question-div-clean');
            classAdd.classList.add('question-div');

            currentDom.classList.remove('for-drag');
            currentDom.setAttribute('draggable', 'false');

            currentDom.innerHTML= `
            <div class="place-change">
            <span id="copy-content-${index}" class="material-symbols-outlined iconSize">content_copy</span>
            <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
            <span class="material-symbols-outlined iconSize">arrow_downward</span>
            <span class="material-symbols-outlined iconSize">arrow_upward</span>
            </div>
            <div class="question-header">
                <div class="question-title">
                    <span class="number-size"> ${index+1}. </span>
                    <input id="input-head-${index}" value="${question}" type="text" placeholder="Enter the question">
                </div>
            </div>

            <div class="rating-body">
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
                <span class="material-symbols-outlined star">star</span>
            </div>

            <div class="rating-functon">
                <div class="drop-down">
                    <span class="rating-function-text">Label :</span> 
                    <select class="section-div" name="label" id="label">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="drop-down">
                    <span class="rating-function-text">Symbol : </span>
                    <select class="section-div" name="label" id="label">
                        <option value="1">Star</option>
                        <option value="2">Heart</option>
                        <option value="3">Like</option>
                        <option value="4">Love</option>
                        <option value="4">Number</option>
                        <option value="4">Tropy</option>
                        <option value="4">Flag</option>
                    </select>
                </div>
            </div>

            <div class="extra-functon">
                <div class="option">
                    <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Multile answer
                </div>
                <div class="option">
                    <span class="material-symbols-outlined extra-option-icon">toggle_off</span> Required
                </div>
                <div class="option">
                    <span class="material-symbols-outlined">more_horiz</span> 
                </div>
            </div>
            ` 
            let data = {
                type: 'rating',
                question: question,
            }
            localStorage.setItem(`question-${index}`, JSON.stringify(data));
         }

        const copyContent = document.getElementById(`copy-content-${index}`);
        if(copyContent)copyContent.addEventListener('click', ()=>{
            const quesiton = document.querySelector(`#input-head-${index}`).value;
            rating(quesiton);
        })

        const deleteDom = document.getElementById(`delete-${index}`);
        if(deleteDom)deleteDom.addEventListener('click', ()=>{
            const deleteFrom = document.getElementById(`question-${index}`);
            if(deleteFrom)deleteFrom.remove();
            localStorage.removeItem(`question-${index}`);
        })

        // const deleteDom = document.getElementById(`delete-${index}`);
        // deleteDom.addEventListener('click', ()=>{
        //     document.getElementById(`question-${index}`).remove();

        //     const allChild = questionArea.children;
        //     for(let i = 0; i < allChild.length; i++){
        //         const currentChild = allChild[i];
        //         if(currentChild.innerHTML.length > 10){
        //         console.log(currentChild)
        //         }
        //     }

        // })
    })

    questionIndex++;
}




const myForm = document.querySelector('.my-form');
const header = document.querySelector('.header')
const normView = document.querySelector('.normal-view')
const inputView = document.querySelector('.input-section')

const pTitle = document.querySelector('.normal-view .title')
const pDes = document.querySelector('.normal-view .description')

const iTitle = document.querySelector('.input-section #title')
const iDes = document.querySelector('.input-section #description')

var questionIndex = 0;

// console.log(pTitle, pDes, iTitle, iDes);

// console.log(header, normView, inputView);


window.addEventListener('click', (e)=>{
    if(e.target != header) {
        header.classList.remove('active')
        if(iTitle.value == ''){
            pTitle.textContent = 'Untitled Form'
        }
    }

    if(e.target == header || e.target == pTitle || e.target == pDes || e.target == iTitle || e.target == iDes){
        header.classList.add('active')
    }
})

iTitle.addEventListener('change', ()=>{
    pTitle.textContent = iTitle.value
})
iDes.addEventListener('change', ()=>{
    pDes.textContent = iDes.value
})




const addButton = document.querySelector('div.adding-button');
const just_text = document.querySelector('div.adding-button .just-text');

addButton.addEventListener('click', ()=>{
    addButton.classList.toggle('active');
    
})

const questionArea = document.querySelector('.each-question');
const questionOption = document.querySelector('.add-question');

questionOption.addEventListener('click', ()=>{
    const newQuestion = document.createElement('div');
    //newQuestion.classList.add('questionOption');
    newQuestion.innerHTML = `
    <div id="question-${questionIndex}" class="question-div">
    <div class="question-header">
        <div class="question-title">
            <span style="font-size:15;margin-top:5px;"> ${questionIndex+1}. </span>
            <input type="text" placeholder="Untitled Question ${questionIndex+1}">
            <img id ="delete-${questionIndex}" src="https://img.icons8.com/material-rounded/30/null/filled-trash.png"/>
        </div>
    </div>
    <div class="question-body">
        <div class="question-options">
            <div class="option">
                <input class="option-radio" type="radio">
                <input class="option-input" type="text" placeholder="Option-1">
            </div>
            <div class="option">
                <input class="option-radio" type="radio">
                <input class="option-input" type="text" placeholder="Option-2">
            </div>
            <div class="option">
                <input class="option-radio" type="radio">
                <input class="option-input" type="text" placeholder="Option-3">
            </div>
            <div class="option">
                <input class="option-radio" type="radio">
                <input class="option-input" type="text" placeholder="option-3">
            </div>
        </div>
    </div>
    </div>
    `
    questionArea.appendChild(newQuestion);
    const index = questionIndex;
    document.getElementById(`delete-${index}`).addEventListener('click', ()=>{
        document.getElementById(`question-${index}`).remove();
    })
    questionIndex++;
})


const questionText = document.querySelector('.add-text');

questionText.addEventListener('click', ()=>{
    const newQuestion = document.createElement('div');
    //newQuestion.classList.add('questionOption');
    newQuestion.innerHTML = `
    <div id="question-${questionIndex}" class="question-div">
    <div class="question-header">
        <div class="question-title">
       <span> ${questionIndex+1}. </span><input type="text" placeholder="Untitled Question ${questionIndex+1}">
            <img id ="delete-${questionIndex}" src="https://img.icons8.com/material-rounded/30/null/filled-trash.png"/>
        </div>
    </div>
    <div class="question-body">
        <div class="question-options">
            <div  style="padding-left:10px;" class="option">
                <textarea class="text-input" type="text" placeholder="Enter you ans here"></textarea>
            </div>
        </div>
    </div>
    </div>
    `
    questionArea.appendChild(newQuestion);
    const index = questionIndex;
    document.getElementById(`delete-${index}`).addEventListener('click', ()=>{
            document.getElementById(`question-${index}`).remove();
    });
    questionIndex++;
});

const questionDate = document.querySelector('.add-date');

questionDate.addEventListener('click', ()=>{
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `
    <div id="question-${questionIndex}" class="question-div">
    <div class="question-header">
        <div class="question-title">
         <span> ${questionIndex+1}. </span><input type="text" placeholder="Untitled Question ${questionIndex+1}">
            <img id ="delete-${questionIndex}" src="https://img.icons8.com/material-rounded/30/null/filled-trash.png"/>
        </div>
        <div class="question-body">
            <div class="question-options">
                <div style="padding-left:10px;" class="option">
                    <input class="option-time" type="date">
                </div>
            </div>
    </div>
    `
    questionArea.appendChild(newQuestion);
    const index = questionIndex;
    document.getElementById(`delete-${index}`).addEventListener('click', ()=>{
        document.getElementById(`question-${index}`).remove();
    })
    questionIndex++;
});


const imageWrapper = document.querySelector('.image-wrapper');

imageWrapper.addEventListener('click', () => {
  const dropdownMenu = imageWrapper.querySelector('.dropdown-menu');
  dropdownMenu.classList.toggle('show');
});
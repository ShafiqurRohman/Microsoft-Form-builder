
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
        header.classList.remove('active');
        if(iTitle.value == ''){
            pTitle.textContent = 'Untitled Form'
        }
    }

    if(e.target == header || e.target == pTitle || e.target == pDes || e.target == iTitle || e.target == iDes){
        header.classList.add('active')
    }
   // console.log(e.target.textContent)
})

iTitle.addEventListener('change', ()=>{
    pTitle.textContent = iTitle.value
})
iDes.addEventListener('change', ()=>{
    pDes.textContent = iDes.value
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

questionOption.addEventListener('click', ()=>{
    const newQuestion = document.createElement('div');
    //newQuestion.classList.add('questionOption');
    newQuestion.innerHTML = `
    <div id="question-${questionIndex}" class="question-div">
    <div class="place-change">
    <span class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${questionIndex}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${questionIndex+1}. </span>
            <input type="text" placeholder="Untitled Question ${questionIndex+1}">
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
    <div class="place-change">
    <span class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${questionIndex}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${questionIndex+1}. </span>
            <input type="text" placeholder="Untitled Question ${questionIndex+1}">
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
    <div class="place-change">
    <span class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${questionIndex}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${questionIndex+1}. </span>
            <input type="text" placeholder="Untitled Question ${questionIndex+1}">
        </div>
    </div>

    <div class="question-body">
        <input class="option-time" type="date" placeholder="Enter your answer">
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
    const index = questionIndex;
    document.getElementById(`delete-${index}`).addEventListener('click', ()=>{
        document.getElementById(`question-${index}`).remove();
    })
    questionIndex++;
});


const questionRating = document.querySelector('.add-rating');

questionRating.addEventListener('click', () => {
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `
    <div id="question-${questionIndex}" class="question-div">
    <div class="place-change">
    <span class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${questionIndex}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${questionIndex+1}. </span>
            <input type="text" placeholder="Untitled Question ${questionIndex+1}">
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
                <option value="4">4</option>
            </select>
        </div>
        <div class="drop-down">
            <span class="rating-function-text">Symbol : </span>
            <select class="section-div" name="label" id="label">
            <option value="1">Star</option>
            <option value="2">Heart</option>
            <option value="3">Like</option>
            <option value="4">Love</option>
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
    const index = questionIndex;
    document.getElementById(`delete-${index}`).addEventListener('click', ()=>{
        document.getElementById(`question-${index}`).remove();
    })
    questionIndex++;
});


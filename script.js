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

// console.log(pTitle, pDes, iTitle, iDes);

// console.log(header, normView, inputView);


window.addEventListener('click', (e)=>{
    if(e.target != header) {
        header.classList.remove('active');
        if(iTitle.value == ''){
            pTitle.textContent = 'Untitled Form'
        }
    }

    if(e.target == header
        || e.target == pTitle 
        || e.target == pDes 
        || e.target == iTitle 
        || e.target == iDes){
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
    const index = questionIndex;
    let html = `
    <div id="question-${index}" class="question-div">
        <div class="place-change">
        <span class="material-symbols-outlined iconSize">content_copy</span>
        <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
        <span class="material-symbols-outlined iconSize">arrow_downward</span>
        <span class="material-symbols-outlined iconSize">arrow_upward</span>
        </div>
        <div class="question-header">
            <div class="question-title">
                <span class="number-size"> ${index+1}. </span>
                <input id="input-head-${index}" type="text" placeholder="Enter the Question">
            </div>
        </div>
        <div class="question-body">
            <div class="question-options">
                <div class="option">
                    <input class="option-radio" type="radio">
                    <input id="input1-${index}" class="option-input" type="text" placeholder="Option-1">
                </div>
                <div class="option">
                    <input class="option-radio" type="radio">
                    <input id="input2-${index}" class="option-input" type="text" placeholder="Option-2">
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
    
    const currentDom = document.getElementById(`question-${index}`);
    const bodyDom =document.querySelector('body');


    window.addEventListener('click', (e) => {
        //console.log(e.target)
        const clickHead = document.querySelector(`#head-${index}`);
        const clickOption = document.querySelector(`#option1-${index}`);
        const clickOption2 = document.querySelector(`#option2-${index}`);
        const clickText = document.querySelector(`#question-view-${index}`);
        const clickDiv = document.querySelector(`.click-div-${index}`);
        //console.log(clickHead, clickOption)

        if(e.target == myForm || e.target == bodyDom){
            let quesiton = document.querySelector(`#input-head-${index}`).value;
            if(quesiton == '') quesiton = `Not set Question`;
            let option1 = document.querySelector(`#input1-${index}`).value;
            if(option1 == '') option1 = `Option-1`;
            let option2 = document.querySelector(`#input2-${index}`).value;
            if(option2 == '') option2 = `Option-2`;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.add('question-div-clean');
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

        }
        else if(e.target == currentDom || e.target == clickHead || e.target == clickOption || e.target == clickOption2 || e.target == clickText || e.target == clickDiv){
            let question = document.querySelector(`#question-view-${index}`).textContent;
            if(question == 'Not set Question') question = '';
            let option1 = document.querySelector(`#option-view1-${index}`).textContent;
            if(option1 == 'Option-1') option1 = '';
            let option2 = document.querySelector(`#option-view2-${index}`).textContent;
            if(option2 == 'Option-2') option2 = '';


            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.remove('question-div-clean');
            classAdd.classList.add('question-div');

            currentDom.innerHTML= `
            <div class="place-change">
            <span class="material-symbols-outlined iconSize">content_copy</span>
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
         }

        const deleteDom = document.getElementById(`delete-${index}`);
        if(deleteDom)deleteDom.addEventListener('click', ()=>{
            const deleteFrom = document.getElementById(`question-${index}`);
            if(deleteFrom)deleteFrom.remove();
        })

    });
    
    questionIndex++;
})


const questionText = document.querySelector('.add-text');

questionText.addEventListener('click', ()=>{
    const newQuestion = document.createElement('div');
    const index = questionIndex;
    let html = `
    <div id="question-${index}" class="question-div">
    <div class="place-change">
    <span class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${index+1}. </span>
            <input id="input-head-${index}" type="text" placeholder="Enter the Question">
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
    document.getElementById(`delete-${index}`).addEventListener('click', ()=>{
            document.getElementById(`question-${index}`).remove();
    });


    const currentDom = document.getElementById(`question-${index}`);
    const bodyDom =document.querySelector('body');


    window.addEventListener('click', (e) => {
        
        const clickHead = document.querySelector(`#head-${index}`);
        const clickDiv = document.querySelector(`.click-div-${index}`);
        
        if(e.target == myForm || e.target == bodyDom){
            let quesiton = document.querySelector(`#input-head-${index}`).value;
            if(quesiton == '') quesiton = `Not set Question`;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.add('question-div-clean');
            classAdd.classList.remove('question-div');
            
            let defaultHtml = ` 
            <div class="question-header">
                <div class="question-title">
                <h3 id="head-${index}">${index+1}. <span id="question-view-${index}" class="click-div-${index}">${quesiton}</span></h3>
                </div>
            </div>
    
            <div class="question-body">
                <input class="text-input-view" type="text" placeholder="Enter your answer">
            </div>
            `
            currentDom.innerHTML = defaultHtml;

        }
        else if(e.target == currentDom || e.target == clickHead || e.target == clickDiv){
            let question = document.querySelector(`#question-view-${index}`).textContent;
            if(question == 'Not set Question') question = ``;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.remove('question-div-clean');
            classAdd.classList.add('question-div');

            currentDom.innerHTML= `
            <div class="place-change">
            <span class="material-symbols-outlined iconSize">content_copy</span>
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
         }

         const deleteDom = document.getElementById(`delete-${index}`);
         if(deleteDom)deleteDom.addEventListener('click', ()=>{
             const deleteFrom = document.getElementById(`question-${index}`);
             if(deleteFrom)deleteFrom.remove();
         })
    })

    questionIndex++;
});



const questionDate = document.querySelector('.add-date');

questionDate.addEventListener('click', ()=>{
    const index = questionIndex;
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `
    <div id="question-${index}" class="question-div">
    <div class="place-change">
    <span class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${index+1}. </span>
            <input id="input-head-${index}" type="text" placeholder="Enter the Question">
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

    const currentDom = document.getElementById(`question-${index}`);
    const bodyDom =document.querySelector('body');


    window.addEventListener('click', (e) => {
        
        const clickHead = document.querySelector(`#head-${index}`);
        const clickDiv = document.querySelector(`.click-div-${index}`);
        
        
        if(e.target == myForm || e.target == bodyDom){
            let quesiton = document.querySelector(`#input-head-${index}`).value;
            if(quesiton == '') quesiton = `Not set Question`;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.add('question-div-clean');
            classAdd.classList.remove('question-div');

            let defaultHtml = ` 
            <div class="question-header">
                <div class="question-title">
                <h3 id="head-${index}">${index+1}. <span id="question-view-${index}" class="click-div-${index}">${quesiton}</span></h3>
                </div>
            </div>
    
            <div class="question-body">
                <input class="option-time" type="date" disabled placeholder="Enter your answer">
            </div>
            `
            currentDom.innerHTML = defaultHtml;

        }
        else if(e.target == currentDom || e.target == clickHead || e.target == clickDiv){
            let question = document.querySelector(`#question-view-${index}`).textContent;
            if(question == 'Not set Question') question = ``;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.remove('question-div-clean');
            classAdd.classList.add('question-div');

            currentDom.innerHTML= `
            <div class="place-change">
            <span class="material-symbols-outlined iconSize">content_copy</span>
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
         }

         const deleteDom = document.getElementById(`delete-${index}`);
         if(deleteDom)deleteDom.addEventListener('click', ()=>{
             const deleteFrom = document.getElementById(`question-${index}`);
             if(deleteFrom)deleteFrom.remove();
         })
    })

    questionIndex++;
});


const questionRating = document.querySelector('.add-rating');

questionRating.addEventListener('click', () => {
    const newQuestion = document.createElement('div');
    const index = questionIndex;
    newQuestion.innerHTML = `
    <div id="question-${index}" class="question-div">
    <div class="place-change">
    <span class="material-symbols-outlined iconSize">content_copy</span>
    <span id="delete-${index}"  class="material-symbols-outlined iconSize">delete</span>
    <span class="material-symbols-outlined iconSize">arrow_downward</span>
    <span class="material-symbols-outlined iconSize">arrow_upward</span>
    </div>
    <div class="question-header">
        <div class="question-title">
            <span class="number-size"> ${index+1}. </span>
            <input id="input-head-${index}" type="text" placeholder="Enter the question">
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


    const currentDom = document.getElementById(`question-${index}`);
    const bodyDom =document.querySelector('body');


    window.addEventListener('click', (e) => {
        
        const clickHead = document.querySelector(`#head-${index}`);
        const clickDiv = document.querySelector(`.click-div-${index}`);
        
        
        if(e.target == myForm || e.target == bodyDom){
            let quesiton = document.querySelector(`#input-head-${index}`).value;
            if(quesiton == '') quesiton = `Not set Question`;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.add('question-div-clean');
            classAdd.classList.remove('question-div');

            let defaultHtml = ` 
            <div class="question-header">
                <div class="question-title">
                <h3 id="head-${index}">${index+1}. <span id="question-view-${index}" class="click-div-${index}">${quesiton}</span></h3>
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

        }
        else if(e.target == currentDom || e.target == clickHead || e.target == clickDiv){
            let question = document.querySelector(`#question-view-${index}`).textContent;
            if(question == 'Not set Question') question = ``;

            let classAdd = document.querySelector(`#question-${index}`);
            classAdd.classList.remove('question-div-clean');
            classAdd.classList.add('question-div');

            currentDom.innerHTML= `
            <div class="place-change">
            <span class="material-symbols-outlined iconSize">content_copy</span>
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
         }

         const deleteDom = document.getElementById(`delete-${index}`);
        if(deleteDom)deleteDom.addEventListener('click', ()=>{
            const deleteFrom = document.getElementById(`question-${index}`);
            if(deleteFrom)deleteFrom.remove();
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
});


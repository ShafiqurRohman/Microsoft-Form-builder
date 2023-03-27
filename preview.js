const header = document.querySelector('.head');
const des = document.querySelector('.des');

header.textContent = localStorage.getItem('title');
if(header.textContent == '') header.textContent = 'Untitled header';
des.textContent = localStorage.getItem('description');

const questionArea = document.querySelector('.each-question');

let dataArr = [];

for(let key in localStorage) {
    if(localStorage.getItem(key) == null) continue;
    if(localStorage.getItem(key).includes('question') && localStorage.getItem(key).includes('type')){
        dataArr.push(JSON.parse(localStorage.getItem(key)));
        
    }
}

function createOption(option, index) {
    const {question : question, option1 : option1, option2 : option2} = option;
    
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `
    <div class="question-div-clean">
    <div class="question-header">
                    <div class="question-title">
                        <h3>${index}. ${question}</h3>
                    </div>  
                </div>
                <div class="question-body">
                    <div class="question-options">
                        <div class="option">
                            <input class="option-radio" type="radio">
                            <p>${option1}</p>
                        </div>
                        <div class="option">
                            <input class="option-radio" type="radio">
                            <p>${option2}</p>
                        </div>
                    </div>
                </div>
            </div>
`
    questionArea.appendChild(newQuestion);
}

function createDate(text, index) {
    const {question : question} = text;
    
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `
    <div class="question-div-clean">
    <div class="question-header">
                    <div class="question-title">
                        <h3>${index}. ${question}</h3>
                    </div>  
                </div>
                <div class="question-body-date">
                    <input class="option-time" type="date" placeholder="Enter your answer">
                </div>
            </div>
`
    questionArea.appendChild(newQuestion);
}

function createText(text, index) {
    const {question : question} = text;
    
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `
    <div class="question-div-clean">
        <div class="question-header">
            <div class="question-title">
                <h3>${index}. ${question}</h3>
            </div>  
        </div>
        <div class="question-body-text">
            <input class="text-input-view" type="text" placeholder="Enter your answer">
        </div>
    </div>
`
    questionArea.appendChild(newQuestion);

}

function createRatting(ratting, index) {
    const {question : question} = ratting;
    
    const newQuestion = document.createElement('div');
    newQuestion.innerHTML = `
    <div class="question-div-clean">
         <div class="question-header">
                <div class="question-title">
                    <h3>${index}. ${question}</h3>
                </div>
            </div>
    
        <div class="rating-body">
            <span class="material-symbols-outlined star">star</span>
            <span class="material-symbols-outlined star">star</span>
            <span class="material-symbols-outlined star">star</span>
            <span class="material-symbols-outlined star">star</span>
            <span class="material-symbols-outlined star">star</span>
        </div>
    </div>
`
    questionArea.appendChild(newQuestion);
}

dataArr.forEach(element => {
    if(element.type == 'choice') {
        createOption(element, dataArr.indexOf(element) + 1);
    }
    if(element.type == 'text') {
        createText(element, dataArr.indexOf(element) + 1);
    }
    if(element.type == 'date') {
        createDate(element, dataArr.indexOf(element) + 1);
    }
    if(element.type == 'rating') {
        createRatting(element, dataArr.indexOf(element) + 1);
    }
    
});
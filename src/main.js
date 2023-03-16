
let searchForm = document.querySelector('.search-form');
let Input = document.querySelector('.search-input');
let list = document.querySelector('.search-result');
let searchTemplate = document.querySelector('#search-template').content;
let searchItem = searchTemplate.querySelector('.search-item');
let inputBlock = document.querySelector('.input-wrapper');



function createElement(item) {
    const task = searchItem.cloneNode(true);
    let searchName = task.querySelector('.item-link');
    searchName.href = `https://github.com/${item.full_name}`;
    searchName.target="_blank";
    let searchDescription = task.querySelector('.item-description');
    let searchLanguage = task.querySelector('.item-language');
    searchName.textContent = item.name;
    searchDescription.textContent = item.description;
    searchLanguage.textContent = item.language;
    list.append(task);
}

function removeElements() {
    elements = list.querySelectorAll('.search-item');
    if (elements) {
        elements.forEach(item => item.remove());
    }
}

function createErrorMessage(text) {
    let errorMessage = document.createElement('span');
    errorMessage.textContent = text;
    errorMessage.classList.add('error-message');
    inputBlock.append(errorMessage);
}

function deleteErrorMessage() {
    let errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        if (errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }                   
}


async function searchUsers(searchValue) {
    deleteErrorMessage();      
    if (searchValue.length < 3) {
        createErrorMessage('Недостаточно символов для поиска')
        return false;
    }
        return await fetch(`https://api.github.com/search/repositories?q=${searchValue} in:name`)
        .then((res) => {
            if (res.ok)  {
                res.json().then(res => {
                    console.log(res);
                    let results = res.items;
                    console.log(results);
                    if (results.length === 0) {                      
                        createErrorMessage('Ничего не найдено, введите другое название');
                    }   else {
                        deleteErrorMessage();              
                        console.log(results.length);
                        results.slice(0,10).forEach(item => createElement(item));
                    }   
                })
            }
        });

    }

searchForm.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    removeElements();
    let searchInput = Input.value;
    searchUsers(searchInput);   
})

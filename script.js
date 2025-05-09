let myLibrary = [];

class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    };
};

function addBookToLibrary(title, author, pages, read) {
    let addingBook = new Book(title, author, pages, read);
    addingBook.title = title;
    addingBook.author = author;
    addingBook.pages = pages;
    addingBook.read = read;
    addingBook.id = crypto.randomUUID();
    myLibrary.push(addingBook);
    createCard(addingBook);
};

function getFormValue(event) {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.querySelector('input[name="read"]:checked');

    const currentTitle = title.value;
    const currentAuthor = author.value;
    const currentPages = pages.value;
    const currentRead = read.value;

    addBookToLibrary(currentTitle, currentAuthor, currentPages, currentRead);

    const form = document.querySelector('form');
    form.reset();

    event.preventDefault();
};

const addToList = document.querySelector('.add-to-list');
addToList.addEventListener('click', getFormValue);

const cardContainer = document.querySelector('.card-container');
cardContainer.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') == 'info') {
        updateBookInfo(e.target.parentNode.parentNode.parentNode.id);   
    } else if (e.target.getAttribute('class') == 'remove-book') {
        removeBookFromLibrary(e.target.parentNode.parentNode.parentNode.id);   
    } 
});

const read = document.querySelector('.read');
read.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') == 'toggleRead'){
        const id = e.target.id.slice(0, -1);
        toggleStatus(id);
    } 
});

function createCard(obj) {
    const card = document.createElement('div');
    card.setAttribute('id', `${obj.id}`)
    const title = document.createElement('h2');
    title.textContent = `${obj.title}`;
    const author = document.createElement('h3');
    author.textContent = `${obj.author}`;
    card.appendChild(author);
    card.appendChild(title);
    card.setAttribute('class', 'card');
    const cardContainer = document.querySelector('.card-container');
    
    const icons = document.createElement('div');
    icons.setAttribute('class', 'icons');
     
    const iconSvgTrash = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPathTrash = document.createElementNS('http://www.w3.org/2000/svg','path');
        
    iconSvgTrash.setAttribute('fill', 'brown');
    iconSvgTrash.setAttribute('viewBox', '0 0 24 24');
    iconSvgTrash.setAttribute('height', '2em');
    iconSvgTrash.setAttribute('class', 'remove-book');

    iconPathTrash.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z')
    iconPathTrash.setAttribute('class', 'remove-book')
    iconSvgTrash.appendChild(iconPathTrash);

    const iconSvgInfo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPathInfo = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSvgInfo.setAttribute('fill', 'brown');
    iconSvgInfo.setAttribute('viewBox', '0 0 24 24');
    iconSvgInfo.setAttribute('height', '2em');
    iconSvgInfo.setAttribute('class', 'info');

    iconPathInfo.setAttribute('d', 'M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
    iconPathInfo.setAttribute('class', 'info')
    iconSvgInfo.appendChild(iconPathInfo);

    icons.appendChild(iconSvgInfo);
    icons.appendChild(iconSvgTrash);
    card.appendChild(icons)

    cardContainer.appendChild(card);
};


function updateBookInfo(id) {
   
    const obj = myLibrary.filter(function(el) {
        return el.id == id;
        });
    const author = document.querySelector('.author');
    author.textContent = `Autore: "${obj[0].author}"`;
    
    const title = document.querySelector('.title');
    title.textContent = `Titolo: "${obj[0].title}"`;

    const pages = document.querySelector('.pages');
    pages.textContent = `Pagine: ${obj[0].pages}`;
    
    const read = document.querySelector('.read');
    read.textContent = `Stato: ${obj[0].read}`;

    const toggleRead = document.createElement('button');
    toggleRead.setAttribute('class', 'toggleRead');
    toggleRead.setAttribute('id', `${obj[0].id}t`);
    toggleRead.textContent = 'Cambia';

    read.appendChild(toggleRead);

};
    

function removeBookFromLibrary(id) {
    const currentIdIndex = myLibrary.indexOf(myLibrary.filter(function(el) {
        return el.id == id;
        })[0]);
    myLibrary.splice(currentIdIndex, 1);
    
    const cardContainer = document.querySelector('.card-container');
    const currentCard = document.getElementById(`${id}`);
    cardContainer.removeChild(currentCard);

    const author = document.querySelector('.author');
    author.textContent = ``;
    
    const title = document.querySelector('.title');
    title.textContent = ``;

    const pages = document.querySelector('.pages');
    pages.textContent = ``;
    
    const read = document.querySelector('.read');
    read.textContent = ``;
}; 

function toggleStatus(id) {
    const currentIdIndex = myLibrary.indexOf(myLibrary.filter(function(el) {
        return el.id == id;
        })[0]);
    const read = document.querySelector('.read');
    if (myLibrary[currentIdIndex].read == 'letto') {
        myLibrary[currentIdIndex].read = 'non letto'
        read.textContent = `Stato: ${myLibrary[currentIdIndex].read}`;
        
        const toggleRead = document.createElement('button');
    
        toggleRead.setAttribute('class', 'toggleRead');
        toggleRead.setAttribute('id', `${myLibrary[currentIdIndex].id}t`);
        toggleRead.textContent = 'Cambia';

        read.appendChild(toggleRead);
    } else {myLibrary[currentIdIndex].read = 'letto'
        read.textContent = `Stato: ${myLibrary[currentIdIndex].read}`;
        
        const toggleRead = document.createElement('button');
        
        toggleRead.setAttribute('class', 'toggleRead');
        toggleRead.setAttribute('id', `${myLibrary[currentIdIndex].id}t`);
        toggleRead.textContent = 'Cambia';

        read.appendChild(toggleRead);
    };
};
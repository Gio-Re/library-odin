const myLibrary = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
};

function addBookToLibrary(title, author, pages, read) {
    let addingBook = Object.create(Book.prototype);
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


function createCard(obj) {
    let card = document.createElement('div');
    card.setAttribute('id', `${obj.id}`)
    let title = document.createElement('h2');
    title.textContent = `${obj.title}`;
    let author = document.createElement('h3');
    author.textContent = `${obj.author}`;
    card.appendChild(author);
    card.appendChild(title);
    card.setAttribute('class', 'card');
    const cardContainer = document.querySelector('.card-container');
    cardContainer.appendChild(card);

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        /* const iconTitle = document.createAttribute('title'); */
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');
        
    iconSvg.setAttribute('fill', 'brown');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('height', '2.5em');

        /* iconTitle.textContent('trash-can')
        iconSvg.appendChild(iconTitle); */

    iconPath.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z')
    iconSvg.appendChild(iconPath);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.appendChild(iconSvg);

    card.appendChild(deleteBtn);
    refreshListener();
};

function refreshListener() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const cardId = card.getAttribute('id');
            const newArrCurrentObj = myLibrary.filter(function(el) {
                return el.id == cardId;
            });
            const info = document.querySelector('.info-container');
        
            const author = document.querySelector('.author');
            author.textContent = `Autore: "${newArrCurrentObj[0].author}"`;
            info.appendChild(author);        
        
            const title = document.querySelector('.title');
            title.textContent = `Titolo: "${newArrCurrentObj[0].title}"`;
            info.appendChild(title);
        
            const pages = document.querySelector('.pages');
            pages.textContent = `Pagine: ${newArrCurrentObj[0].pages}`;
            info.appendChild(pages);
        
            const read = document.querySelector('.read');
            read.textContent = `Stato: ${newArrCurrentObj[0].read}`;
            info.appendChild(read);
        });
    });
};
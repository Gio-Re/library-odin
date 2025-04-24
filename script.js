const myLibrary = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
    let addingBook = Object.create(Book.prototype);
    addingBook.title = title;
    addingBook.author = author;
    addingBook.pages = pages;
    addingBook.read = read;
    addingBook.id = crypto.randomUUID();
    myLibrary.push(addingBook);
}

addBookToLibrary('Titolo', 'Autore', 20, 'letto');
addBookToLibrary('Titolo2', 'Autore2', 202, 'non letto');

for (let item of myLibrary) {
    let card = document.createElement('div');
    card.setAttribute('id', `${item.id}`)
    let title = document.createElement('h2');
    title.textContent = `${item.title}`;
    let author = document.createElement('h3');
    author.textContent = `${item.author}`;
    card.appendChild(author);
    card.appendChild(title);
    card.setAttribute('class', 'card');
    let cardContainer = document.querySelector('.card-container');
    cardContainer.appendChild(card);
};

const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
    card.addEventListener('click', () => {
        const cardId = card.getAttribute('id');
        const newArrCurrentObj = myLibrary.filter(function(el) {
            return el.id == cardId;
        });
        const info = document.querySelector('.info-container');
        const author = document.querySelector('.author');
        author.textContent = `Autore: ${newArrCurrentObj[0].author}`;
        info.appendChild(author);        
        const title = document.querySelector('.title');
        title.textContent = `Titolo: ${newArrCurrentObj[0].title}`;
        info.appendChild(title);
        const pages = document.querySelector('.pages');
        pages.textContent = `Pagine: ${newArrCurrentObj[0].pages}`;
        info.appendChild(pages);
        const read = document.querySelector('.read');
        read.textContent = `Stato: ${newArrCurrentObj[0].read}`;
        info.appendChild(read);
    });
});

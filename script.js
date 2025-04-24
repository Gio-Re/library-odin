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

console.log(myLibrary);

for (let item of myLibrary) {
    let newpar = document.createElement('p');
    newpar.textContent = `${item.title}, ${item.author}, ${item.pages}, ${item.read}, ${item.id}`;
    document.body.appendChild(newpar);
}

let button = document.querySelector('button');
let input = document.querySelector('input');
let container = document.querySelector('.container')

let subject;

let pickRandomIndex = totalElements => {
  return Math.floor(Math.random() * totalElements);
};

let createNewElement = (tagName, text) => {
  let newElement = document.createElement(tagName);
  newElement.textContent = text;
  return newElement;
}

let appendBook = (title, author, imgUrl) => {
  let h3Title = createNewElement('h3', title);
  let h4Author = createNewElement('h4', author);
  let imgCover = createNewElement('img', '');
  imgCover.src = imgUrl;
  container.appendChild(h3Title);
  container.appendChild(h4Author);
  container.appendChild(imgCover);
}

let removeBook = () => {
  let h3Title = document.querySelector('.container h3');
  let h4Author = document.querySelector('.container h4');
  let imgCover = document.querySelector('.container img');
  container.removeChild(h3Title);
  container.removeChild(h4Author);
  container.removeChild(imgCover);
};

button.addEventListener('click', () => {
  subject = input.value;
  fetch(`http://openlibrary.org/subjects/${subject}.json`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (document.querySelector('.container h3')) {
      removeBook();
    }
    let randomIndex = pickRandomIndex(data.works.length);
    let randomBook = data.works[randomIndex];
    let bookSelection = {
      title: randomBook.title,
      author: randomBook.authors[0].name,
      cover: `http://covers.openlibrary.org/b/ID/${randomBook['cover_id']}-M.jpg`
    };
    appendBook(bookSelection.title, bookSelection.author, bookSelection.cover);
  })
  .catch(error => {
    console.log(error);
  });
});


'use strict'

import store from './store.js';
import api from './api.js'

// html generation functions
function generateInitialView(func) {
  let view = `<h1>Your Bookmarks</h1>
      <form>
        <input type="submit" name="new" value="new" id="js-new-item"/>
        <select id="filter-select" aria-label="Star Rating">
          <option value="1">1 star</option>
          <option value="2">2 star</option>
          <option value="3">3 star</option>
          <option value="4">4 star</option>
          <option value="5">5 star</option>
        </select>
        <input type="button" name="filter-submit" value="filter" id= "filter-submit">
      </form>
        <ul class="bookmark-list">
        ${func()}
        </ul>`

  return view;
}

function handleFilterChange() {
  $('main').on('click', '#filter-submit', function (event) {
    event.preventDefault();
    let filterValue = $('#filter-select').val();
    store.filter = parseInt(filterValue);
    render()
    console.log(store.filter)
  });
}

function generateBookmarkString() {
  let items = store.bookmarks.filter(item => item.rating >= store.filter)
  items = items.map((item) => generateBookmark(item));
  return items.join('');
}

const generateBookmark = function (item) {
  let itemTitle = ''
  if (item.expanded === true) {
    itemTitle = `<li class="bookmark-expanded js-bookmark" item-id="${item.id}">
            ${item.title}  <div type="button" id="delete-button" item-id=${item.id}><i class="fas fa-trash"></i></div> 
        
        <div class="expanded-header">
          <input type="button" value="visit site" id="visit-button" onclick="location.href = '${item.url}';"> 
          <div class="expanded-stars" aria-label="${item.rating} star rating">${generateRating(item.rating)}</div>
        </div>
        <p>${item.desc}</p></li> `
  } else {
    itemTitle = `<li class="bookmark-title js-bookmark" item-id="${item.id}">
      ${item.title}<div class="rating" >${generateRating(item.rating)}</div ></li >`
  }
  return itemTitle;
}

function generateRating(rating) {
  let stars = ''
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += `<i class="fas fa-star"></i>`
    } else { stars += `<i class="far fa-star"></i>` }
  } return stars;
}

function generateAddBookmark() {
  let view = `<h1>Your Bookmarks</h1>
          <form id="new-bookmark-form">
            <div>
              Add New Bookmark 
              <input name="url" type="text" placeholder="http://www.bestwebsite.com" id="new-bookmark-address" aria-label="Bookmark URL">
            </div>
            <div>
              <input name="title" type="text" placeholder="title here" id="new-bookmark-name">
              <select name="rating" id="cars">
                <option value="1 stars">1 star</option>
                <option value="2 stars">2 star</option>
                <option value="3 stars">3 star</option>
                <option value="4 stars">4 star</option>
                <option value="5 stars">5 star</option>
        </select>
            </div>
            <input name="desc" type="text" placeholder="add a description here (optional)" id="new-bookmark-description">
            <input type="submit" id="new-item-submit">
            <div class="error-container"></div>
          </form>`
  return view;
}

function generateErrorScreen() {
  let html = `${generateAddBookmark()}<div id="error-message">${store.error}</div>`;
  return html;
}


// event listeners

function handleExpand() {
  $('main').on('click', '.js-bookmark', event => {
    let id = getItemIdFromElement(event.currentTarget);
    let bookmark = store.findById(id);
    store.toggleExpand(bookmark);
    render()

  })
}

function handleAddingToggle() {
  $('main').on('click', '#js-new-item', event => {
    event.preventDefault();
    store.adding = true;
    render();

  })
}

function handleNewItemSubmit() {
  $('main').on('submit', '#new-bookmark-form', event => {
    event.preventDefault();
    let data = serializeJson(event.target)
    console.log(data)
    api.createBookmark(data)
      .then((newItem) => {
        console.log(newItem);
        store.addItem(newItem);
        store.adding = false;
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  })
}

function handleDeleteItem() {
  $('main').on('click', '#delete-button', event => {
    let id = getItemIdFromElement(event.target)
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      })
  })
}

// error functions
const generateError = function (message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};


// render
function render() {
  renderError();
  let html = ''
  if (store.adding === true) {
    html = generateAddBookmark()
  } else if (store.error != null) {
    html = generateErrorScreen()
  } else { html = generateInitialView(generateBookmarkString) }
  $('main').html(html)
  store.filter = 0
}



const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-bookmark')
    .attr('item-id');
};


function serializeJson(form) {
  let formData = new FormData(form);;
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}
export default {
  handleNewItemSubmit,
  handleAddingToggle,
  render,
  handleExpand,
  handleDeleteItem,
  handleCloseError,
  handleFilterChange,
  initialRender
}
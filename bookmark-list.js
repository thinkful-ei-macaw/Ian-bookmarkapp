'use strict'

import store from './store.js';
import api from './api.js'

// html generation functions
function generateInitialView() {
  let view = `<h1>Your Bookmarks</h1>
      <form>
        <input type="submit" name="new" value="new" id="js-new-item"/>
        <select id="cars">
          <option value="1 stars">1 star</option>
          <option value="2 stars">2 star</option>
          <option value="3 stars">3 star</option>
          <option value="4 stars">4 star</option>
          <option value="5 stars">5 star</option>
        </select>
      </form>
        <ul class="bookmark-list">
        ${generateBookmarkString()}
        </ul>`

  return view;
}

function generateBookmarkString() {
  const items = store.bookmarks.map((item) => generateBookmark(item));
  return items.join('');
}

const generateBookmark = function (item) {
  let itemTitle = ''
  if (item.expanded === false) {
    itemTitle = `<li class="bookmark-title js-bookmark" item-id="${item.id}">
      ${item.title}<div class="rating" >${generateRating(item.rating)}</div ></li >`
  } else {
    itemTitle = `<li class="bookmark-expanded js-bookmark" item-id="${item.id}">
            ${item.title}  <input type="button" value="🗑" id="delete-button" item-id=${item.id}> 
        </li> 
        <div class="expanded-header">
          <input type="button" value="visit site" id="visit-button"> 
          <div class="expanded-stars">${generateRating(item.rating)}</div>
        </div>
        <p>${item.description}</p>`
  }
  return itemTitle;
}

function generateRating(rating) {
  let stars = ''
  for (let i = 0; i < 5; i++) {
    if (i < 5 - rating) {
      stars += `<i class="far fa-star"></i>`
    } else { stars += `<i class="fas fa-star"></i>` }
  } return stars;
}

function generateAddBookmark() {
  let view = `<h1>Your Bookmarks</h1>
          <form id="new-bookmark-form">
            <div>
              Add New Bookmark 
              <input name="url" type="text" placeholder="http://www.bestwebsite.com" id="new-bookmark-address">
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
  $('main').on('click', '#new-item-submit', event => {
    event.preventDefault();
    let data = document.getElementById('new-bookmark-form')
    data = serializeJson(data)
    console.log(data)
    api.createBookmark(data)
      .then(res => res.json())
      .then((newItem) => {
        store.addItem(newItem);
        store.adding = false;
        render();
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
  })
}


// render
function render() {
  let html = ''
  if (store.adding === true) {
    html = generateAddBookmark()
  } else if (store.error != null) {
    html = generateErrorScreen()
  } else { html = generateInitialView() }
  $('main').html(html)
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
  handleDeleteItem
}
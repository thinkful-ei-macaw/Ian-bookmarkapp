'use strict'

import bookmarkList from './bookmark-list.js'
import api from './api.js';
import store from './store.js'
function main() {
  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarkList.render();
    });
  bookmarkList.handleNewItemSubmit();
  bookmarkList.handleAddingToggle();
  bookmarkList.render();
  bookmarkList.handleExpand();
  bookmarkList.handleDeleteItem();
  bookmarkList.handleFilterChange();
}



main()
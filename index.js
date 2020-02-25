'use strict'

import bookmarkList from './bookmark-list.js'
import api from './api.js';

function main() {
  api.getBookmarks()
    .then(res => res.text())
    .then(text => console.log(text));

  bookmarkList.handleNewItemSubmit();
  bookmarkList.handleAddingToggle();
  bookmarkList.render();
  bookmarkList.handleExpand();
}



main()
'use strict'

import bookmarkList from './bookmark-list.js'

function main() {
  bookmarkList.handleNewItemSubmit();
  bookmarkList.handleAddingToggle();
  bookmarkList.render();
  bookmarkList.handleExpand();
}

main()
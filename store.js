const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};
let bookmarks = []
let adding = false
let error = null
let filter = 0

function toggleExpand(bookmark) {
  bookmark.expanded = !bookmark.expanded;
}

function addItem(item) {
  bookmarks.push(item);

}

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};
export default {
  addItem,
  findById,
  bookmarks,
  adding,
  error,
  filter,
  toggleExpand,
  findAndDelete
}
const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};
let bookmarks = [
  {
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit',
    expanded: false
  },
  {
    id: '6ffw',
    title: 'Title 2',
    rating: 5,
    url: 'http://www.title2.com',
    description: 'dolorum tempore deserunt',
    expanded: true
  }
]
let adding = false
let error = null
let filter = 0

function toggleExpand(bookmark) {
  bookmark.expanded = !bookmark.expanded;
}
export default {
  findById,
  bookmarks,
  adding,
  error,
  filter,
  toggleExpand
}
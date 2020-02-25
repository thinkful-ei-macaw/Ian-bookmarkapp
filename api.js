const BASE_URL = 'GET https://thinkful-list-api.herokuapp.com/Ian/bookmarks'



function getBookmarks() {
  return fetch(`${BASE_URL}`)
}
export default {
  getBookmarks
}
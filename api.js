const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ian/bookmarks'



function getBookmarks() {
  return fetch(`${BASE_URL}`)
}

function createBookmark(arg) {
  console.log(arg);
  const newItem = arg;
  return fetch(`${BASE_URL}`, {
    "method": "POST",
    body: newItem,
    headers: {
      'content-type': 'application/json'
    }
  })
}

function deleteBookmark(id) {
  return fetch(BASE_URL + '/' + id, {
    method: 'DELETE'
  });
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark
}
import store from './store.js'

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ian/bookmarks'
/**
 * @param {string} url 
 * @param {object} options 
 * @returns {Promise} 
 */
const listApiFetch = function (...args) {
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        store.error = { code: res.status };
        if (!res.headers.get('content-type').includes('json')) {
          store.error.message = res.statusText;
          return Promise.reject(store.error);
        }
      }
      return res.json();
    })
    .then(data => {

      if (store.error) {
        store.error.message = data.message;
        return Promise.reject(store.error);
      }
      return data;
    });
};


function getBookmarks() {
  return listApiFetch(`${BASE_URL}`);
}

function createBookmark(arg) {
  console.log(arg);
  const newItem = arg;
  return listApiFetch(`${BASE_URL}`, {
    "method": "POST",
    body: newItem,
    headers: {
      'content-type': 'application/json'
    }
  })
}

function deleteBookmark(id) {
  return listApiFetch(BASE_URL + '/' + id, {
    method: 'DELETE'
  });
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark
}
import { clientCredentials } from '../client';

const getAllShowsBySignedInUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shows`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleShow = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shows/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteShow = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shows/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

const createShow = (show) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shows`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(show),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('TV Show not Created:', error);
      reject(error);
    });
});

const updateShow = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shows/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const markShowAsWatched = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shows/${id}/watched`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const markShowAsWatching = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shows/${id}/watching`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

export {
  getAllShowsBySignedInUser,
  getSingleShow,
  deleteShow,
  createShow,
  updateShow,
  markShowAsWatched,
  markShowAsWatching,
};

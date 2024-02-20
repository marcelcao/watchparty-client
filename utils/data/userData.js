import { clientCredentials } from '../client';

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllUsers,
  getSingleUser,
};

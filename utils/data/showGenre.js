import { clientCredentials } from '../client';

const getAllGenres = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/showgenres`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getAllGenres;

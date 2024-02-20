import { clientCredentials } from '../client';

const getAllAttendeesInAParty = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/partyattendees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getAllAttendeesInAParty;

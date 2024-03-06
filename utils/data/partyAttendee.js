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

const deletePartyAttendee = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/partyattendees/${id}`, {
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

export {
  getAllAttendeesInAParty,
  deletePartyAttendee,
};

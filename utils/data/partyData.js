import { clientCredentials } from '../client';

const getAllParties = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties`, {
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

const getSingleParty = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteParty = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties/${id}`, {
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

const createParty = (party) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(party),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Watch Party not Created:', error);
      reject(error);
    });
});

const updateParty = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties/${payload.id}`, {
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

const attendParty = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties/${id}/attend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const leaveParty = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties/${id}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then(resolve)
    .catch(reject);
});

const getPartyAttendees = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties/${id}/attendees`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllParties,
  getSingleParty,
  deleteParty,
  createParty,
  updateParty,
  attendParty,
  leaveParty,
  getPartyAttendees,
};

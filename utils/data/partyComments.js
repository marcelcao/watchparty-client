import { clientCredentials } from '../client';

const getPartyComments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/partycomments`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createCommentOnParty = (uid, id, comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties/${id}/post_comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Comment not Created:', error);
      reject(error);
    });
});

const updatePartyComment = (comment, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/partycomments/${comment}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(comment),
  })
    .then(resolve)
    .catch(reject);
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/partycomments/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deletePartyComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/partycomments/${comment}`, {
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

const getCommentsOnSingleParty = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/parties/${id}/view_comments`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getPartyComments,
  createCommentOnParty,
  updatePartyComment,
  getSingleComment,
  deletePartyComment,
  getCommentsOnSingleParty,
};

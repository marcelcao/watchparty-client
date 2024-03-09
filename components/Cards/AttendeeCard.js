/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { deletePartyAttendee } from '../../utils/data/partyAttendee';

export default function AttendeeCard({ obj, onUpdate, user }) {
  const removeAttendeeAsAdmin = (objId) => {
    if (window.confirm('Remove User?')) {
      deletePartyAttendee(objId).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="user-card">
        <Card.Body className="user-card-body">
          <img className="show-img" src={obj.user?.image_url} alt={obj.user?.username} style={{ width: '3rem', height: '3rem' }} />
          <Link href={`/profile/${obj.user?.username}`} passHref>
            <Card.Text className="card-link">{obj.user?.username}</Card.Text>
          </Link>
          {(user.id === obj.party?.organizer ? (<Button className="delete-button" variant="black" onClick={() => removeAttendeeAsAdmin(obj.id)}>X</Button>) : '')}
        </Card.Body>
      </Card>
    </>
  );
}

AttendeeCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      image_url: PropTypes.string,
    }),
    party: PropTypes.shape({
      id: PropTypes.number,
      organizer: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

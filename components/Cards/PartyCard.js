/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { attendParty, leaveParty } from '../../utils/data/partyData';

export default function PartyCard({ partyObj, onUpdate }) {
  const { user } = useAuth();

  const attend = () => {
    attendParty(partyObj.id, user.uid).then(() => onUpdate());
  };

  const leave = () => {
    leaveParty(partyObj.id, user.uid).then(() => onUpdate());
  };

  return (
    <>
      <Card className="party-card">
        <img className="show-img" src={partyObj.tv_show?.show_poster} alt={partyObj.party_name} style={{ width: '18rem', height: '25rem' }} />
        <Card.Body className="party-card-body">
          <Link href={`/parties/${partyObj.id}`} passHref>
            <Card.Text className="party-title">{partyObj.party_name}</Card.Text>
          </Link>
          <Card.Text className="party-subtext">By: @{partyObj.organizer?.username}</Card.Text>
          <Card.Text className="party-subtext">{partyObj.party_description}</Card.Text>
          {partyObj.attended ? (
            <Button
              className="submit-btn"
              onClick={leave}
            >Leave
            </Button>
          )
            : (
              <Button
                className="submit-btn"
                onClick={attend}
              >Attend
              </Button>
            )}
        </Card.Body>
      </Card>
    </>
  );
}

PartyCard.propTypes = {
  partyObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    party_name: PropTypes.string.isRequired,
    party_description: PropTypes.string.isRequired,
    tv_show: PropTypes.shape({
      id: PropTypes.number,
      show_poster: PropTypes.string,
    }),
    organizer: PropTypes.shape({
      username: PropTypes.string,
    }),
    attended: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

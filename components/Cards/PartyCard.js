/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { attendParty, leaveParty } from '../../utils/data/partyData';

export default function PartyCard({ partyObj }) {
  const { user } = useAuth();

  const attend = () => {
    attendParty(partyObj.id, user.uid).then();
  };

  const leave = () => {
    leaveParty(partyObj.id, user.uid).then();
  };

  return (
    <>
      <Card className="party-card">
        <Card.Body className="card-body">
          <img className="show-img" src={partyObj.tv_show?.show_poster} alt={partyObj.party_name} style={{ width: '7rem', height: '10rem' }} />
          <Link href={`/parties/${partyObj.id}`} passHref>
            <Card.Text>{partyObj.party_name}</Card.Text>
          </Link>
          {partyObj.attended ? (
            <Button
              onClick={leave}
            >Leave
            </Button>
          )
            : (
              <Button
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
    tv_show: PropTypes.shape({
      id: PropTypes.number,
      show_poster: PropTypes.string,
    }),
    attended: PropTypes.bool.isRequired,
  }).isRequired,
};

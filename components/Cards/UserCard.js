/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function UserCard({ userObj }) {
  return (
    <>
      <Card className="user-card">
        <Card.Body className="card-body">
          <img className="show-img" src={userObj.image_url} alt={userObj.username} style={{ width: '3rem', height: '3rem' }} />
          <Link href={`/profile/${userObj.username}`} passHref>
            <Card.Text className="card-name">{userObj.username}</Card.Text>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function UserCard({ userObj }) {
  return (
    <>
      <Card className="user-card">
        <Card.Body className="user-card-body">
          <img className="profile-img" src={userObj.image_url} alt={userObj.username} />
          <Link href={`/profile/${userObj.username}`} passHref>
            <Card.Text className="card-link">@{userObj.username}</Card.Text>
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

/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

export default function ShowCard({ showObj }) {
  return (
    <>
      <Card className="party-card">
        <Card.Body className="card-body">
          <img className="show-img" src={showObj.show_poster} alt={showObj.show_title} style={{ width: '7rem', height: '10rem' }} />
          <Link href={`/shows/${showObj.id}`} passHref>
            <Card.Text className="card-link">{showObj.show_title}</Card.Text>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

ShowCard.propTypes = {
  showObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    show_title: PropTypes.string.isRequired,
    show_poster: PropTypes.string.isRequired,
  }).isRequired,
};

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { deleteParty, getSingleParty } from '../../utils/data/partyData';
import PartyModal from '../../components/Modals/PartyModal';
import { useAuth } from '../../utils/context/authContext';

function SingleParty() {
  const [singleParty, setSingleParty] = useState({});

  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth([]);

  const deleteThisParty = () => {
    if (window.confirm('Delete Party')) {
      deleteParty(id).then(() => {
        router.push('/');
      });
    }
  };

  useEffect(() => {
    getSingleParty(id)
      .then((data) => setSingleParty(data));
  }, [id]);

  return (
    <article className="single-tv-show">
      <div className="show-body">
        <div className="show-img-container">
          <img className="show-img" src={singleParty.tv_show?.show_poster} alt={singleParty.tv_show?.show_title} style={{ width: '7rem', height: '10rem' }} />
          <div className="show-info-btns">
            {(singleParty.organizer?.id === user.id) ? (<PartyModal obj={singleParty} />) : '' }
            {(singleParty.organizer?.id === user.id) ? (
              <Button className="delete-party-btn" onClick={deleteThisParty}>
                Delete Party
              </Button>
            ) : ''}
          </div>
        </div>
        <div className="party-details-container">
          <h1>{singleParty.party_name}</h1>
          <h2>Organized by: @{singleParty.organizer?.username}</h2>
          <h3>{singleParty.date} at {singleParty.time}</h3>
          <p>{singleParty.party_description}</p>
          <h3>Discord Link:</h3>
          <p>{singleParty.discord_link}</p>
          <h3>Attendees:</h3>
        </div>
      </div>
    </article>
  );
}

export default SingleParty;

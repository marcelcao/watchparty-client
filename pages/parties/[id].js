/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { deleteParty, getPartyAttendees, getSingleParty } from '../../utils/data/partyData';
import PartyModal from '../../components/Modals/PartyModal';
import CommentForm from '../../components/PartyCommentForm';
// import CommentCard from '../../components/Cards/CommentCard';
import { useAuth } from '../../utils/context/authContext';
import { getCommentsOnSingleParty, deletePartyComment } from '../../utils/data/partyComments';

function SingleParty() {
  const [singleParty, setSingleParty] = useState({});
  const [partyAttendees, setPartyAttendees] = useState([]);
  const [comments, setComments] = useState([]);
  const [editComment, setEditComment] = useState(null);
  const [change, setChange] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth([]);

  const getAllPartyAttendees = () => {
    getPartyAttendees(id).then((data) => setPartyAttendees(data));
  };

  const deleteThisParty = () => {
    if (window.confirm('Delete Party')) {
      deleteParty(id).then(() => {
        router.push('/');
      });
    }
  };

  const fetchSingleParty = () => {
    getSingleParty(id).then((data) => setSingleParty(data));
  };

  const getAllComments = () => {
    getCommentsOnSingleParty(id).then((data) => setComments(data));
  };

  const deleteComment = (commentId) => {
    if (window.confirm('Do you want to delete this comment?')) {
      deletePartyComment(commentId).then(setChange((prevState) => !prevState));
    }
  };

  const handleEditComment = (commentId) => {
    setEditComment(commentId);
  };

  const cancelCommentEdit = () => {
    setEditComment(null);
  };

  useEffect(() => {
    getSingleParty(id)
      .then((data) => setSingleParty(data))
      .then(getAllPartyAttendees)
      .then(getAllComments);
  }, [id, change]);

  return (
    <article className="single-tv-show">
      <div className="show-body">
        <div className="show-img-container">
          <img className="show-img" src={singleParty.tv_show?.show_poster} alt={singleParty.tv_show?.show_title} style={{ width: '7rem', height: '10rem' }} />
          <div className="show-info-btns">
            {(singleParty.organizer?.id === user.id) ? (<PartyModal obj={singleParty} fetchSingleParty={fetchSingleParty} />) : '' }
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
          {partyAttendees.map((attendee) => (
            <div key={attendee.id}>
              <p>@{attendee.user?.username}</p>
            </div>
          ))}
        </div>
        <div>
          <CommentForm user={user} partyId={Number(id)} onSubmit={getAllComments} />
        </div>
        <div className="party-comments-container">
          {comments.map((com) => (
            editComment === com.id ? (
              <CommentForm key={com.id} obj={comments} cancelEdit={cancelCommentEdit} onSubmit={getAllComments} partyId={Number(id)} />
            ) : (
              <div key={com.id}>
                <p>Comment by: @{com.author?.username}</p>
                <p>Posted On: {com.posted_on}</p>
                <p>{com.comment}</p>
                <div>{(user.uid === com.author?.uid) ? (<Button className="delete-button" variant="black" onClick={() => deleteComment(com.id)}>Delete</Button>) : ''}</div>
                <div>{(user.uid === com.author?.uid) ? (<Button className="edit-button" variant="black" onClick={() => handleEditComment(com.id)}>Edit</Button>) : ''}</div>
              </div>
            )
          ))}
        </div>
      </div>
    </article>
  );
}

export default SingleParty;

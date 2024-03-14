/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import {
  deleteParty,
  getPartyAttendees,
  getSingleParty,
} from '../../utils/data/partyData';
import PartyModal from '../../components/Modals/PartyModal';
import CommentForm from '../../components/PartyCommentForm';
import { useAuth } from '../../utils/context/authContext';
import { getCommentsOnSingleParty, deletePartyComment } from '../../utils/data/partyComments';
import AttendeeCard from '../../components/Cards/AttendeeCard';

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
    if (window.confirm('Delete Party?')) {
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

  useEffect(() => {
    document.title = `${singleParty.party_name || 'Loading...'} - Watch Party`;
  }, [singleParty.party_name]);

  return (
    <article className="single-tv-show">
      <div className="party-body">
        <div className="party-img-container">
          <img className="party-img" src={singleParty.tv_show?.show_poster} alt={singleParty.tv_show?.show_title} />
        </div>
        {(singleParty.organizer?.id === user.id) ? (<PartyModal obj={singleParty} fetchSingleParty={fetchSingleParty} />) : '' }
        {(singleParty.organizer?.id === user.id) ? (
          <Button className="delete-party-btn" onClick={deleteThisParty}>
            Delete Party
          </Button>
        ) : ''}
        <div className="party-attendees">
          <h1>Attendees:</h1>
          {partyAttendees.map((attendee) => (
            <AttendeeCard key={attendee.id} obj={attendee} user={user} onUpdate={getAllPartyAttendees} />
          ))}
        </div>
      </div>
      <div className="party-details-container">
        <div className="party-name">
          <h1 id="party-name-header">{singleParty.party_name}</h1>
        </div>
        <div className="party-description">
          <section className="party-organizer">Organized by: @{singleParty.organizer?.username}</section>
          <section className="description-details">When: {singleParty.date} at {singleParty.time}</section>
          <section className="description-details">{singleParty.party_description}</section>
          <section>Discord Link: {singleParty.discord_link}</section>
        </div>
        <h1>Leave a Comment</h1>
        <CommentForm user={user} partyId={Number(id)} onSubmit={getAllComments} />
        <div className="party-comments-container">
          {comments.map((com) => (
            editComment === com.id ? (
              <CommentForm key={com.id} user={user} obj={com} cancelEdit={cancelCommentEdit} onSubmit={getAllComments} partyId={Number(id)} />
            ) : (
              <div key={com.id} className="comment-wrapper">
                <div className="user-delete-comment">
                  {(user.uid === com.author?.uid) ? (<Button className="delete-comment-btn" variant="black" onClick={() => deleteComment(com.id)}>X</Button>) : ''}
                </div>
                <div className="comment-body">
                  <img className="comment-img" src={com.author?.image_url} alt={com.author?.username} />
                  <div className="comment-details">
                    <Link href={`/profile/${com.author?.username}`} passHref>
                      <section className="comment-user-link">@{com.author?.username}</section>
                    </Link>
                    <p>{com.comment}</p>
                    <p>Posted On: {com.posted_on}</p>
                  </div>
                </div>
                <div className="user-edit-comment">
                  {(user.uid === com.author?.uid) ? (<Button className="edit-comment-btn" variant="black" onClick={() => handleEditComment(com.id)}>Edit</Button>) : ''}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </article>
  );
}

export default SingleParty;

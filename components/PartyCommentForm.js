import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createCommentOnParty, updatePartyComment } from '../utils/data/partyComments';

const initialState = {
  author: {},
  party: {},
  comment: '',
  postedOn: new Date().toISOString(),
};

const CommentForm = ({
  user, obj, partyId, onSubmit, cancelEdit,
}) => {
  const [currentComment, setCurrentComment] = useState(initialState);

  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setCurrentComment({
        id: obj.id,
        author: user?.uid,
        party: partyId,
        postedOn: obj.posted_on,
        comment: obj.comment,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.id) {
      const editComment = {
        id: obj.id,
        author: user?.uid,
        comment: currentComment.comment,
        postedOn: obj.posted_on,
        party: obj.party?.id,
      };
      updatePartyComment(editComment)
        .then(() => onSubmit())
        .then(() => cancelEdit());
    } else {
      const comment = {
        comment: currentComment.comment,
        party: partyId,
        author: user.uid,
      };
      createCommentOnParty(user.uid, partyId, comment).then(() => router.replace(`/parties/${partyId}`)).then(() => onSubmit());
      setCurrentComment(initialState);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="comment-form-cont">
        <div className="cancel-edit-comment">
          {obj.id ? (
            <div>
              <Button onClick={cancelEdit} className="cancel-comment">X</Button>
            </div>
          ) : ''}
        </div>
        <textarea
          name="comment"
          className="comment-input"
          placeholder="Add your comment here"
          required
          value={currentComment.comment}
          onChange={handleChange}
        />
        <div className="submit-btn-wrapper">
          <Button type="submit" className="submit-comment-btn">
            {obj.id ? 'Update' : 'Add'} Comment
          </Button>
        </div>
      </Form>
    </>
  );
};

CommentForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
    }),
    party: PropTypes.shape({
      id: PropTypes.number,
    }),
    posted_on: PropTypes.string,
  }),
  partyId: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func,
};

CommentForm.defaultProps = {
  obj: initialState,
  partyId: 0,
  cancelEdit: () => {},
};

export default CommentForm;

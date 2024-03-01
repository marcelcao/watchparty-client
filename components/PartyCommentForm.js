import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createCommentOnParty, updatePartyComment } from '../utils/data/partyComments';

const initialState = {
  author: {},
  party: 0,
  comment: '',
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
        author: user.uid,
        party: partyId,
        postedOn: obj.postedOn,
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
        author: obj.author,
        comment: currentComment.comment,
        postedOn: obj.postedOn,
        party: obj.party,
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
        <input type="text" name="comment" className="input" placeholder="Add your comment here" required value={currentComment.comment} onChange={handleChange} />
        {obj.id
          ? (
            <div>
              <Button onClick={cancelEdit}>X</Button>
            </div>
          )
          : ''}
        <Button type="submit" variant="dark">{obj.id ? 'Update' : 'Add'} Comment</Button>
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
    party: PropTypes.number,
    postedOn: PropTypes.string,
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
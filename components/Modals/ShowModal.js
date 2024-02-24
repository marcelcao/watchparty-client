import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { updateShow, createShow } from '../../utils/data/showData';
import getAllGenres from '../../utils/data/showGenre';

const initialState = {
  showTitle: '',
  showDescription: '',
  showPoster: '',
  showGenre: {},
  user: '',
};

function TVShowModal({ obj }) {
  const [show, setShow] = useState(false);
  const [currentShow, setCurrentShow] = useState(initialState);
  const [showGenre, setShowGenre] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useAuth();

  useEffect(() => {
    getAllGenres().then(setShowGenre);

    if (obj.id) {
      setCurrentShow({
        id: obj.id,
        showTitle: obj.show_title,
        showDescription: obj.show_description,
        showPoster: obj.show_poster,
        showGenre: obj.show_genre?.id,
        isWatching: obj.is_watching,
        user: user.uid,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentShow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const reload = () => window.location.reload();
    e.preventDefault();

    if (obj.id) {
      const update = {
        id: obj.id,
        showTitle: currentShow.showTitle,
        showDescription: currentShow.showDescription,
        showPoster: currentShow.showPoster,
        showGenre: Number(currentShow.showGenre),
        isWatching: currentShow.isWatching,
        user: user.uid,
      };
      updateShow(update, user.uid).then(() => {
        handleClose();
        reload();
      });
    } else {
      const tvShow = {
        showTitle: currentShow.showTitle,
        showDescription: currentShow.showDescription,
        showPoster: currentShow.showPoster,
        showGenre: Number(currentShow.showGenre),
        isWatching: currentShow.isWatching,
        user: user.uid,
      };
      createShow(tvShow, user.uid).then(() => {
        handleClose();
        reload();
      });
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="rout-modal">
        <p className="form-label">{obj.id ? 'Update TV Show' : '+'}</p>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton id="modal-head">
          <h2 className="form-head">{obj.id ? 'Update' : 'Add'} TV Show</h2>
        </Modal.Header>

        <Modal.Body id="modal-body">
          <Form onSubmit={handleClose}>

            <Form.Group className="mb-3" controlId="formShowTitle">
              <Form.Label className="form-label">Show Title</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="Show Title Here" name="showTitle" value={currentShow.showTitle} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formShowDescription">
              <Form.Label>Show Description</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="Show Description Here" name="showDescription" value={currentShow.showDescription} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formShowPoster">
              <Form.Label>Show Poster</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="Show Poster Here" name="showPoster" value={currentShow.showPoster} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Show Genre</Form.Label>
              <Form.Select
                name="showGenre"
                required
                value={currentShow.showGenre}
                onChange={handleChange}
              >
                <option value="">Select genre</option>
                {showGenre.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.genre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="modal-submit">
              <Button type="submit" className="submit-btn" onClick={handleSubmit}>{obj.id ? 'Update' : 'Add'} TV Show</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

TVShowModal.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    show_title: PropTypes.string,
    show_description: PropTypes.string,
    show_poster: PropTypes.string,
    show_genre: PropTypes.shape({
      id: PropTypes.number,
      genre: PropTypes.string,
    }),
    is_watching: PropTypes.bool,
  }),
};

TVShowModal.defaultProps = {
  obj: initialState,
};

export default TVShowModal;

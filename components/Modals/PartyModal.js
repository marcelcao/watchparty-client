import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { getAllShowsBySignedInUser } from '../../utils/data/showData';
import { updateParty, createParty } from '../../utils/data/partyData';

const initialState = {
  party_name: '',
  party_description: '',
  discord_link: '',
  tv_show: {},
  organizer: '',
  date: '',
  time: '',
};

function PartyModal({ obj }) {
  const [show, setShow] = useState(false);
  const [currentParty, setCurrentParty] = useState(initialState);
  const [tv, setTv] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useAuth();

  const getUserShows = () => {
    getAllShowsBySignedInUser(user.uid).then((data) => setTv(data));
  };

  useEffect(() => {
    getUserShows();

    if (obj.id) {
      setCurrentParty({
        id: obj.id,
        partyName: obj.party_name,
        partyDescription: obj.party_description,
        discordLink: obj.discord_link,
        organizer: user.uid,
        date: obj.date,
        time: obj.time,
        tvShow: obj.tv_show?.id,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentParty((prevState) => ({
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
        partyName: currentParty.partyName,
        partyDescription: currentParty.partyDescription,
        discordLink: currentParty.discordLink,
        organizer: user.uid,
        date: currentParty.date,
        time: currentParty.time,
        tvShow: Number(currentParty.tvShow),
      };
      updateParty(update, user.uid).then(() => {
        handleClose();
        reload();
      });
    } else {
      const newParty = {
        partyName: currentParty.partyName,
        partyDescription: currentParty.partyDescription,
        discordLink: currentParty.discordLink,
        organizer: user.uid,
        date: currentParty.date,
        time: currentParty.time,
        tvShow: Number(currentParty.tvShow),
      };
      createParty(newParty, user.uid).then(() => {
        handleClose();
        reload();
      });
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="party-modal">
        <p className="form-label">{obj.id ? 'Update Party' : '+'}</p>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton id="modal-head">
          <h2 className="form-head">{obj.id ? 'Update' : 'Create'} Party</h2>
        </Modal.Header>

        <Modal.Body id="modal-body">
          <Form onSubmit={handleClose}>
            <Form.Group className="mb-3" controlId="formPartyName">
              <Form.Label className="form-label">Party Name</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="Party Name Here" name="partyName" value={currentParty.partyName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPartyDescription">
              <Form.Label>Party Description</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="Party Description Here" name="partyDescription" value={currentParty.partyDescription} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscordLink">
              <Form.Label>Discord Link</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="Enter Discord Link Here" name="discordLink" value={currentParty.discordLink} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Party Date</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="ex. 2024-02-25" name="date" value={currentParty.date} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTime">
              <Form.Label>Party Time</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="ex.18:30" name="time" value={currentParty.time} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select From Your TV Shows</Form.Label>
              <Form.Select
                name="tvShow"
                required
                value={currentParty.tvShow}
                onChange={handleChange}
              >
                <option value="">Select Show</option>
                {tv.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.show_title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="modal-submit">
              <Button type="submit" className="submit-btn" onClick={handleSubmit}>{obj.id ? 'Update' : 'Create'} Party</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

PartyModal.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    party_name: PropTypes.string,
    party_description: PropTypes.string,
    discord_link: PropTypes.string,
    tv_show: PropTypes.shape({
      id: PropTypes.number,
      show_title: PropTypes.string,
    }),
    date: PropTypes.string,
    time: PropTypes.string,
  }),
};

PartyModal.defaultProps = {
  obj: initialState,
};

export default PartyModal;

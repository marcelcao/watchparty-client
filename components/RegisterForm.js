import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    image_url: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit} className="register-form">
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label className="register-form-title">First Name</Form.Label>
        <Form.Control as="textarea" name="firstName" required placeholder="Enter your first name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label className="register-form-title">Last Name</Form.Label>
        <Form.Control as="textarea" name="lastName" required placeholder="Enter your last name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label className="register-form-title">Username</Form.Label>
        <Form.Control as="textarea" name="username" required placeholder="Enter your username" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImageUrl">
        <Form.Label className="register-form-title">Profile Image URL</Form.Label>
        <Form.Control as="textarea" name="imageUrl" required placeholder="Image URL here" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImageUrl">
        <Form.Label className="register-form-title">Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="User Bio here" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <div className="register-btn-container">
        <Button className="register-form-btn" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

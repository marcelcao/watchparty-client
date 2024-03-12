import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function SearchBar({ onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value.toLowerCase());
  };

  return (
    <>
      <Form className="search">
        <div className="search-box">
          <input
            className="search-input"
            id="search"
            name="search"
            placeholder="search"
            onChange={handleChange}
            type="text"
          />
        </div>
      </Form>
    </>
  );
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

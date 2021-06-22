import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';

function Header({ title, onAdd, showAdd }) {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          onClick={onAdd}
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
        />
      )}
    </header>
  );
}

Header.defaultProps = {
  title: 'Task tracker',
};

Header.propTypes = {
  title: PropTypes.string.isRequired, // .isRequired is optional, if required
  onAdd: PropTypes.func,
  showAdd: PropTypes.bool,
};

// CSS in JS
// style={headingStyle}
// const headingStyle = { color: 'red', backgroundColor: 'green' };

export default Header;

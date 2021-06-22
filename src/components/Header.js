import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { showAddTaskState } from '../atoms';
import Button from './Button';

function Header({ title }) {
  const location = useLocation();
  const [showAddTask, setShowAddTask] = useRecoilState(showAddTaskState);

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          onClick={() => {
            setShowAddTask(!showAddTask);
          }}
          color={showAddTask ? 'red' : 'green'}
          text={showAddTask ? 'Close' : 'Add'}
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
};

// CSS in JS
// style={headingStyle}
// const headingStyle = { color: 'red', backgroundColor: 'green' };

export default Header;

import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
function Task({ task, onDelete, onToggle }) {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => {
        onToggle(task.id);
      }}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {
            onDelete(task.id);
          }}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    day: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
};

export default Task;

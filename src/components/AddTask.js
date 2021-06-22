import PropTypes from 'prop-types';
import { useState } from 'react';

function AddTask({ onAdd }) {
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      // TODO: add optional error component
      setTextError('Please add task');
      return;
    } else {
      setTextError('');
    }

    onAdd({
      text,
      day,
      reminder,
    });

    setText('');
    setDay('');
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        {textError && <small style={{ color: 'crimson' }}>{textError}</small>}
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={e => {
            setDay(e.target.value);
          }}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          onChange={e => {
            setReminder(e.target.checked);
          }}
        />
      </div>
      <button type="submit" className="btn btn-block">
        Save Task
      </button>
    </form>
  );
}

AddTask.propTypes = {
  onAdd: PropTypes.func,
};

export default AddTask;

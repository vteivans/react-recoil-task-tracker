import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import {
  fetchTasks,
  deleteTaskRemote,
  addTaskRemote,
  fetchTask,
  updateTaskRemote,
} from './helpers/tasks';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    getTasks();
  }, []);

  const addTask = async task => {
    const newTask = await addTaskRemote(task);
    setTasks([...tasks, newTask]);
  };

  const deleteTask = async id => {
    await deleteTaskRemote(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleReminder = async id => {
    const taskToUpdate = await fetchTask(id);
    const updatedTask = await updateTaskRemote({
      ...taskToUpdate,
      reminder: !taskToUpdate.reminder,
    });

    setTasks(tasks.map(task => (task.id !== id ? task : updatedTask)));
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Hello"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact={true}
          render={() => {
            return (
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No tasks'
                )}
              </>
            );
          }}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

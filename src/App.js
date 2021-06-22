import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import About from './about/About';
import { showAddTaskState, tasksState } from './atoms';
import Footer from './components/Footer';
import Header from './components/Header';
import AddTask from './tasks/AddTask';
import Tasks from './tasks/Tasks';
import {
  addTaskRemote,
  deleteTaskRemote,
  fetchTask,
  fetchTasks,
  updateTaskRemote,
} from './tasks/tasks-api';

function App() {
  const showAddTask = useRecoilValue(showAddTaskState);
  const [tasks, setTasks] = useRecoilState(tasksState);

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
        <Header title="Hello" />

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

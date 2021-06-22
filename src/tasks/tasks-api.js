export async function fetchTasks() {
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();
  return data;
}
export async function fetchTask(id) {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();
  return data;
}

export async function deleteTaskRemote(id) {
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
}

export async function addTaskRemote(task) {
  const res = await fetch(`http://localhost:5000/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await res.json();
  return data;
}
export async function updateTaskRemote(task) {
  const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await res.json();
  return data;
}

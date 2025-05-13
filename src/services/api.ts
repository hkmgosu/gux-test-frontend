const API_URL = 'http://localhost:3001'; // Cambia a tu URL del backend

export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`, {
  });
  if (!res.ok) throw new Error('Error fetching tasks');
  return res.json(); // array de tareas
};

export const createTask = async (task: { title: string }) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Error creating task');
  return res.json();
};

export const updateTask = async (taskId: string, task: { title?: string; completed?: boolean }) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Error updating task');
  return res.json();
};

export const deleteTask = async (taskId: string) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
    },
  });
  if (!res.ok) throw new Error('Error deleting task');
  return res.json();
};

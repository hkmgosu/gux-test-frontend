const API_URL = 'http://localhost:3001'; // Cambia a tu URL del backend

export const fetchTasks = async () => {
/*   return [
    {
      "id": 22,
      "titulo": "titulo 2",
      "descripcion": "desc 2",
      "estado": "pendiente",
      "fecha_creacion": "2025-05-13T12:39:44.887Z",
      "user_id": 5
  },
  {
      "id": 23,
      "titulo": "asdad",
      "descripcion": "",
      "estado": "pendiente",
      "fecha_creacion": "2025-05-13T12:49:35.936Z",
      "user_id": 5
  },
  {
      "id": 21,
      "titulo": "titulo 2",
      "descripcion": "desc 2",
      "estado": "completado",
      "fecha_creacion": "2025-05-13T12:39:44.363Z",
      "user_id": 5
  }
] */
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyaWNrIFF1aXJveiAyIiwic3ViIjo1LCJpYXQiOjE3NDcxMjQ3NDAsImV4cCI6MTc0NzEyODM0MH0.2cGrQ5AtNbl4Ig6jznI4U7mmO4UeDjI2oOK9NQIxE0c'
    },
  });
  if (!res.ok) throw new Error('Error fetching tasks');
  return res.json(); // array de tareas
};

export const createTask = async (task: { titulo: string , descripcion: string }) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyaWNrIFF1aXJveiAyIiwic3ViIjo1LCJpYXQiOjE3NDcxMjQ3NDAsImV4cCI6MTc0NzEyODM0MH0.2cGrQ5AtNbl4Ig6jznI4U7mmO4UeDjI2oOK9NQIxE0c'
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Error creating task');
  return res.json();
};

export const updateTask = async (taskId: number, task: { titulo?: string; descripcion?: string, estado?: string }) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyaWNrIFF1aXJveiAyIiwic3ViIjo1LCJpYXQiOjE3NDcxMjQ3NDAsImV4cCI6MTc0NzEyODM0MH0.2cGrQ5AtNbl4Ig6jznI4U7mmO4UeDjI2oOK9NQIxE0c'
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Error updating task');
  return res.json();
};

export const deleteTask = async (taskId: number) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyaWNrIFF1aXJveiAyIiwic3ViIjo1LCJpYXQiOjE3NDcxMjQ3NDAsImV4cCI6MTc0NzEyODM0MH0.2cGrQ5AtNbl4Ig6jznI4U7mmO4UeDjI2oOK9NQIxE0c'
    },
  });
  if (!res.ok) throw new Error('Error deleting task');
  return res.json();
};

import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then((data) => {
        setTasks(data);
        console.log(data)
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar tareas");
        setLoading(false);
      });
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const newTask = await createTask({ titulo: newTaskTitle, descripcion: '' });
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch {
      setError("Error al crear tarea");
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      console.log(task)
      const updated = await updateTask(task.id, {
        estado: "completado",
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch {
      setError("Error al actualizar tarea");
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch {
      setError("Error al eliminar tarea");
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Lista de Tareas</h1>
          <button className="text-red-500 hover:underline" onClick={() => { }}>
            Cerrar Sesión
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Nueva tarea"
            className="flex-1 px-3 py-2 border rounded"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddTask}
          >
            Añadir
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between mb-2 p-2 border rounded"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.estado === "completado"}
                  onChange={() => handleToggleComplete(task)}
                  className="mr-2"
                />
                <span
                  className={task.estado ? "line-through text-gray-500" : ""}
                >
                  {task.titulo}
                </span>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(task.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksPage;

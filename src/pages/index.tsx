import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";
import { useAuth } from "@/context/AuthContext";

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
}

const TasksPage = () => {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetchTasks(token)
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar tareas");
        setLoading(false);
      });
  }, [token]);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const newTask = await createTask(token!, {
        titulo: newTaskTitle,
        descripcion: newTaskDescription,
      });
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    } catch {
      setError("Error al crear tarea");
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updated = await updateTask(token!, task.id, {
        ...task,
        estado: task.estado === "pendiente" ? "completado" : "pendiente",
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch {
      setError("Error al actualizar tarea");
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(token!, taskId);
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
          <button className="text-red-500 hover:underline" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="grid grid-flow-col grid-rows-4 gap-4">
          <input
            type="text"
            placeholder="Nueva tarea"
            className="m-1 px-3 py-2 border rounded"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <input
            type="text"
            placeholder="Descripcion"
            className="m-1 px-3 py-2 border rounded"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
                  className={task.estado === "completado" ? "line-through text-gray-700" : ""}
                >
                  {task.titulo}
                </span>
                <p className={"ml-3 text-sm text-gray-500"}>{task.descripcion}</p>
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

const API_URL = "http://localhost:3001";

export const registerApi = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Error en Registro");
    const data = await res.json();
    return data; // { token: string }
};

export const loginApi = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Error en login");
    const data = await res.json();
    return data; // { token: string }
};

export const fetchTasks = async (token: string) => {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Error al buscar todas las tareas");
    return res.json(); // array de tareas
};

export const createTask = async (
    token: string,
    task: { titulo: string; descripcion: string }
) => {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error("Error al crear tarea.");
    return res.json();
};

export const updateTask = async (
    token: string,
    taskId: number,
    task: { titulo?: string; descripcion?: string; estado?: string }
) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error("Error al actualizar tarea.");
    return res.json();
};

export const deleteTask = async (token: string, taskId: number) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Error al borrar tarea.");
    return res.json();
};

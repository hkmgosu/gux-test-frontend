import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginApi } from "@/services/api";
import router from "next/router";

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginApi(username, password);
      login(data.access_token);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Error en login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="p-6 bg-white rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-xl font-bold">Iniciar Sesión</h2>
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">Usuario</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 mb-3 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-900 rounded hover:bg-blue-700"
          onClick={() => router.push('/register')}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

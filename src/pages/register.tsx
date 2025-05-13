import { useState } from "react";
import { useRouter } from "next/router";
import { registerApi } from "@/services/api"; // Asegúrate de tener esta función implementada

const RegisterPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            // Asumiendo que registerApi devuelve algo como { message } o similar
            await registerApi(username, password);
            setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
            // Opcional: redirigir a la página de login después de un tiempo
            setTimeout(() => {
                router.push("/login");
            }, 2000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Error en el registro. Por favor, intenta nuevamente.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="p-6 bg-white rounded shadow-md w-full max-w-sm"
                onSubmit={handleRegister}
            >
                <h2 className="mb-4 text-xl font-bold">Registrarse</h2>
                {error && <p className="mb-2 text-red-500">{error}</p>}
                {success && <p className="mb-2 text-green-500">{success}</p>}
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
                    className="w-full px-4 py-2 mb-3 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
                >
                    Registrarse
                </button>
                <button
                    type="button"
                    className="w-full px-4 py-2 font-semibold text-white bg-gray-600 rounded hover:bg-gray-700"
                    onClick={() => router.push('/login')}
                >
                    Ya tienes cuenta? Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;

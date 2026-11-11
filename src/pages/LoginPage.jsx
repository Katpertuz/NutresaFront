import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import Campo, { inputCls } from "../components/Campo.jsx";
import { hashear, leerUsuario, iniciarSesion } from "../utils/storage.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    const u = leerUsuario();
    if (!u) {
      setError("Aún no hay una cuenta registrada. Regístrate primero.");
      return;
    }
    setEnviando(true);
    const hash = await hashear(clave);
    setEnviando(false);
    if (u.correo.toLowerCase() !== correo.trim().toLowerCase() || u.constrasenia_hash !== hash) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    iniciarSesion();
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={enviar} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-4 text-sm font-semibold text-gray-500 transition hover:text-nutresa"
        >
          ← Volver al inicio
        </button>
        <Logo />
        <h2 className="mt-5 text-2xl font-extrabold text-gray-900">Iniciar sesión</h2>
        <p className="mb-6 mt-1 text-sm text-gray-500">Ingresa con tu correo y contraseña.</p>
        <div className="space-y-4">
          <Campo label="Correo corporativo">
            <input className={inputCls} type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="nombre@gruponutresa.com" required />
          </Campo>
          <Campo label="Contraseña">
            <input className={inputCls} type="password" value={clave} onChange={(e) => setClave(e.target.value)} required />
          </Campo>
        </div>
        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={enviando}
          className="mt-6 w-full rounded-lg bg-nutresa px-4 py-3 text-sm font-bold text-white shadow transition hover:brightness-90 disabled:opacity-60"
        >
          {enviando ? "Verificando…" : "Ingresar"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <button type="button" onClick={() => navigate("/registro")} className="font-bold text-nutresa">
            Regístrate
          </button>
        </p>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import Campo, { inputCls } from "../components/Campo.jsx";
import { ROLES, DEPARTAMENTOS } from "../data/videos.js";
import { uuid, hashear, guardarUsuario, iniciarSesion } from "../utils/storage.js";

export default function RegistroPage() {
  const navigate = useNavigate();
  // Estado mapeado a los campos del backend Java
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    correo: "",
    rol: "",
    departamento: "",
    constrasenia_hash: "",
  });
  const [confirmar, setConfirmar] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const noCoinciden = confirmar && confirmar !== form.constrasenia_hash;

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    if (form.constrasenia_hash.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (form.constrasenia_hash !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setEnviando(true);
    const hash = await hashear(form.constrasenia_hash);
    const registro = { ...form, id: uuid(), constrasenia_hash: hash };
    guardarUsuario(registro); // aquí se conectaría la API real
    iniciarSesion();
    setEnviando(false);
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-nutresa to-nutresa-dark p-8 text-white lg:w-5/12 lg:p-12">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-black/10" />
        <div className="relative">
          <Logo claro />
        </div>
        <div className="relative my-10 lg:my-0">
          <h1 className="text-3xl font-extrabold leading-tight lg:text-4xl">
            Aprende, conecta y crece con nuestra gente.
          </h1>
          <p className="mt-4 max-w-md text-green-100">
            Regístrate para acceder a la plataforma interna de videos corporativos de Grupo Nutresa.
          </p>
        </div>
        <p className="relative text-xs text-green-100">© Grupo Nutresa · Uso exclusivo de colaboradores</p>
      </aside>

      <main className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <form onSubmit={enviar} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-4 text-sm font-semibold text-gray-500 transition hover:text-nutresa"
          >
            ← Volver al inicio
          </button>
          <h2 className="text-2xl font-extrabold text-gray-900">Crear cuenta</h2>
          <p className="mb-6 mt-1 text-sm text-gray-500">Completa tus datos para ingresar a la plataforma.</p>

          <div className="space-y-4">
            <Campo label="Nombre completo">
              <input className={inputCls} name="nombre" value={form.nombre} onChange={cambiar} placeholder="Ej. María Pérez" required />
            </Campo>
            <Campo label="Correo corporativo">
              <input className={inputCls} type="email" name="correo" value={form.correo} onChange={cambiar} placeholder="nombre@gruponutresa.com" required />
            </Campo>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Campo label="Rol">
                <select className={inputCls} name="rol" value={form.rol} onChange={cambiar} required>
                  <option value="" disabled>Selecciona…</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </Campo>
              <Campo label="Departamento">
                <select className={inputCls} name="departamento" value={form.departamento} onChange={cambiar} required>
                  <option value="" disabled>Selecciona…</option>
                  {DEPARTAMENTOS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </Campo>
            </div>
            <Campo label="Contraseña">
              <input className={inputCls} type="password" name="constrasenia_hash" value={form.constrasenia_hash} onChange={cambiar} placeholder="Mínimo 8 caracteres" required />
            </Campo>
            <Campo label="Confirmar contraseña">
              <input
                className={inputCls + (noCoinciden ? " border-red-400" : "")}
                type="password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                placeholder="Repite tu contraseña"
                required
              />
              {noCoinciden && <span className="mt-1 block text-xs text-red-600">Las contraseñas no coinciden.</span>}
            </Campo>
          </div>

          {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="mt-6 w-full rounded-lg bg-nutresa px-4 py-3 text-sm font-bold text-white shadow transition hover:brightness-90 disabled:opacity-60"
          >
            {enviando ? "Registrando…" : "Registrarme"}
          </button>
        </form>
      </main>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";

const OPCIONES = [
  {
    titulo: "Registrarme",
    texto: "Crea tu cuenta de colaborador.",
    ruta: "/registro",
    icono: "M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM3 21a9 9 0 0 1 18 0M19 6v6M16 9h6",
  },
  {
    titulo: "Iniciar sesión",
    texto: "Ya tengo una cuenta registrada.",
    ruta: "/login",
    icono: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
  },
];

export default function Bienvenida() {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-nutresa to-nutresa-dark px-6 py-12">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-black/10" />
      <div className="relative flex flex-col items-center text-center">
        <Logo claro />
        <h1 className="mt-8 text-3xl font-extrabold text-white sm:text-4xl">Plataforma de Videos Corporativos</h1>
        <p className="mt-3 max-w-md text-green-100">Elige una opción para comenzar.</p>
        <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
          {OPCIONES.map((o) => (
            <button
              key={o.ruta}
              onClick={() => navigate(o.ruta)}
              className="group rounded-2xl bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-nutresa transition group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={o.icono} />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-gray-900">{o.titulo}</h2>
              <p className="mt-1 text-sm text-gray-500">{o.texto}</p>
              <span className="mt-4 inline-block text-sm font-bold text-nutresa">Continuar →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

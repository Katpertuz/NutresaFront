import Logo from "./Logo.jsx";

export default function Header({ usuario, onSalir }) {
  const inicial = (usuario.nombre || "?").trim().charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="h-1 bg-nutresa" />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">¡Bienvenido/a, {usuario.nombre}!</p>
            <p className="text-xs text-gray-500">
              {usuario.departamento} · {usuario.rol}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nutresa font-bold text-white">
            {inicial}
          </div>
          <button
            onClick={onSalir}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-nutresa hover:text-nutresa"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}

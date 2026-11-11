import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import VideoCard from "../components/VideoCard.jsx";
import { VIDEOS } from "../data/videos.js";
import { leerUsuario, haySesion, cerrarSesion } from "../utils/storage.js";

export default function HomePage() {
  const navigate = useNavigate();
  const [usuario] = useState(leerUsuario);

  if (!usuario || !haySesion()) return <Navigate to="/" replace />;

  const salir = () => {
    cerrarSesion();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header usuario={usuario} onSalir={salir} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Videos corporativos</h1>
          <p className="text-sm text-gray-500">Contenido seleccionado para el equipo de {usuario.departamento}.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </main>
    </div>
  );
}

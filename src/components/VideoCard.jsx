export default function VideoCard({ video }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={"relative flex aspect-video items-center justify-center bg-gradient-to-br " + video.gradiente}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-nutresa">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-0.5 text-xs font-semibold text-white">
          {video.duracion}
        </span>
      </div>
      <div className="p-4">
        <span className="inline-block rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-bold text-nutresa">
          {video.categoria}
        </span>
        <h3 className="mt-2 text-base font-bold text-gray-900">{video.titulo}</h3>
        <p className="mt-1 text-xs text-gray-500">Duración: {video.duracion} min</p>
      </div>
    </article>
  );
}

export default function Logo({ claro = false }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={
          "flex h-9 w-9 items-center justify-center rounded-lg font-black " +
          (claro ? "bg-white text-nutresa" : "bg-nutresa text-white")
        }
      >
        N
      </div>
      <span className={"text-lg font-extrabold tracking-tight " + (claro ? "text-white" : "text-gray-900")}>
        Grupo Nutresa
      </span>
    </div>
  );
}

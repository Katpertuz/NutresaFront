const KEY_USUARIO = "nutresa_usuario";
const KEY_SESION = "nutresa_sesion";

// Respaldo en memoria por si localStorage no está disponible
let memoria = null;
let sesionMem = false;

export function uuid() {
  try {
    if (crypto.randomUUID) return crypto.randomUUID();
  } catch (e) {}
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export async function hashear(texto) {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (e) {
    return btoa(unescape(encodeURIComponent(texto)));
  }
}

export function leerUsuario() {
  try {
    const raw = localStorage.getItem(KEY_USUARIO);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return memoria;
}

export function guardarUsuario(usuario) {
  memoria = usuario;
  try {
    localStorage.setItem(KEY_USUARIO, JSON.stringify(usuario));
  } catch (e) {}
}

export function iniciarSesion() {
  sesionMem = true;
  try {
    localStorage.setItem(KEY_SESION, "1");
  } catch (e) {}
}

export function cerrarSesion() {
  sesionMem = false;
  try {
    localStorage.removeItem(KEY_SESION);
  } catch (e) {}
}

export function haySesion() {
  try {
    if (localStorage.getItem(KEY_SESION) === "1") return true;
  } catch (e) {}
  return sesionMem;
}

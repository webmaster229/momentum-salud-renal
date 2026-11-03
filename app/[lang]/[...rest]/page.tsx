import { notFound } from "next/navigation";

// Sin esta ruta, una URL inexistente muestra el 404 genérico, sin menú y en inglés.
export default function CatchAll() {
  notFound();
}

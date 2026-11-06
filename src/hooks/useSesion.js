import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase.js";

export function useSesion() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // Verificar si el usuario tiene una sesión activa
  useEffect(() => {
    async function verificarSesion() {
      const { data: { session }, error } =
        await supabase.auth.getSession();

      if (error || !session) {
        navigate("/login", { replace: true });
        return;
      }

      const { data: usuarioData, error: errorUsuario } =
        await supabase.auth.getUser();

      if (errorUsuario || !usuarioData.user) {
        navigate("/login", { replace: true });
        return;
      }

      setUsuario(usuarioData.user);
    }

    verificarSesion();
  }, [navigate]);

  // Cerrar sesión
  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("No se pudo cerrar la sesión.");
      return;
    }

    navigate("/login");
  }

  return { cerrarSesion, usuario };
}

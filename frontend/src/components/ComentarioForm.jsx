import { useState } from 'react';

export default function ComentarioForm({ rutinaId, onNuevoComentario, token }) {
  const [texto, setTexto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarComentario = async (e) => {
    e.preventDefault();

    if (!texto.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/rutinas/${rutinaId}/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ texto })
      });

      const data = await res.json();

      if (res.ok) {
        onNuevoComentario(data.comentario);
        setTexto('');
        setMensaje('Comentario enviado');
      } else {
        setMensaje(data.msg || 'Error al comentar');
      }
    } catch (err) {
      console.error('Error al enviar comentario:', err);
      setMensaje('Error del servidor');
    }
  };

  return (
  <form className="form-container" onSubmit={enviarComentario}>
    <textarea
      className="input"
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      placeholder="Escribe tu comentario..."
      required
      rows={3}
    ></textarea>

    <button type="submit" className="btn">
      Comentar
    </button>

    {mensaje && <p className="text-muted">{mensaje}</p>}
  </form>
);

}

// Extrae el nombre del email (antes de @)
export const parseNameFromEmail = (email) => {
  if (!email.includes('@')) return email;
  return email.split('@')[0];
};

// En el futuro: otras funciones como detectar roles, validar tokens, etc.
export const isAdmin = (user) => {
  return user?.role === 'admin';
};

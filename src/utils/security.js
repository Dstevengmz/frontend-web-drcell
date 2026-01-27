// Utilidades de seguridad para el frontend

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Eliminar scripts y etiquetas peligrosas
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9+\s()-]{7,20}$/;
  return re.test(phone);
};

export const sanitizeFormData = (data) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

export const validateCodigoSeguimiento = (codigo) => {
  const re = /^REP-[A-Z0-9]{6,8}$/;
  return re.test(codigo?.toUpperCase());
};

// Rate limiting simple en cliente
const requestCounts = new Map();

export const checkRateLimit = (key, maxRequests = 10, windowMs = 60000) => {
  const now = Date.now();
  const userRequests = requestCounts.get(key) || [];
  
  // Filtrar requests antiguos
  const recentRequests = userRequests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(key, recentRequests);
  return true;
};

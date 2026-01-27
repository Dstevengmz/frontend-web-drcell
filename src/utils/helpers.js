export const getEstadoBadgeClass = (estado) => {
  const classes = {
    'En espera': 'badge-warning',
    'En revisión': 'badge-info',
    'Reparando': 'badge-primary',
    'Reparado': 'badge-success',
    'Entregado': 'badge-complete',
    'Cancelado': 'badge-danger',
  };
  return classes[estado] || 'badge-secondary';
};

export const formatCurrency = (amount) => {
  const value = parseFloat(amount);
  if (isNaN(value)) return '$ 0';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const ESTADOS_ORDEN = [
  'En espera',
  'En revisión',
  'Reparando',
  'Reparado',
  'Entregado',
  'Cancelado'
];

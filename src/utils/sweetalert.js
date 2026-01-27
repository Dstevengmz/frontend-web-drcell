import Swal from 'sweetalert2';

// Configuración base de SweetAlert2
const swalConfig = {
  customClass: {
    confirmButton: 'swal-confirm-btn',
    cancelButton: 'swal-cancel-btn',
  },
  buttonsStyling: false,
};

// Confirmación para eliminar
export const confirmDelete = (title = '¿Estás seguro?', text = 'Esta acción no se puede deshacer') => {
  return Swal.fire({
    ...swalConfig,
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  });
};

// Toast de éxito
export const showSuccess = (message = 'Operación exitosa') => {
  return Swal.fire({
    ...swalConfig,
    icon: 'success',
    title: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

// Toast de error
export const showError = (message = 'Ocurrió un error') => {
  return Swal.fire({
    ...swalConfig,
    icon: 'error',
    title: 'Error',
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });
};

// Alerta de información
export const showInfo = (title, text) => {
  return Swal.fire({
    ...swalConfig,
    icon: 'info',
    title,
    text,
  });
};

// Loading spinner
export const showLoading = (title = 'Procesando...') => {
  return Swal.fire({
    ...swalConfig,
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// Cerrar loading
export const closeLoading = () => {
  Swal.close();
};

// Confirmación genérica
export const confirmAction = (title, text, confirmText = 'Confirmar') => {
  return Swal.fire({
    ...swalConfig,
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar',
  });
};

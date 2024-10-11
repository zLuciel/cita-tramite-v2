import { useState } from 'react';

const usePdfValidator = (maxSizeMB = 10) => {
  const [error, setError] = useState('');

  const validatePdf = (file) => {
    if (!file) {
      setError('Por favor, selecciona un archivo.');
      return false;
    }

    // Validar tipo
    if (file.type !== 'application/pdf') {
      setError('El archivo debe ser un PDF.');
      return false;
    }

    // Validar tamaño
    const maxSize = maxSizeMB * 1024 * 1024; // Convertir a bytes
    if (file.size > maxSize) {
      setError(`El archivo es demasiado grande. El tamaño máximo permitido es de ${maxSizeMB}MB.`);
      return false;
    }

    setError(''); // Limpiar el error si es válido
    return true;
  };

  return { validatePdf, error };
};

export default usePdfValidator;


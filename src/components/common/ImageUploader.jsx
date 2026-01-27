import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './ImageUploader.css';

const ImageUploader = ({ currentImage, onImageSelect, label = 'Imagen' }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [dragging, setDragging] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten archivos de imagen');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('La imagen no debe superar 10MB');
      return;
    }

    try {
      setCompressing(true);
      
      // Opciones de compresión
      const options = {
        maxSizeMB: 1, // Tamaño máximo 1MB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: file.type
      };

      // Comprimir imagen
      const compressedFile = await imageCompression(file, options);
      
      setPreview(URL.createObjectURL(compressedFile));
      onImageSelect(compressedFile);
    } catch (error) {
      console.error('Error al comprimir imagen:', error);
      // Si falla la compresión, usar imagen original
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    } finally {
      setCompressing(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="image-uploader">
      <label className="upload-label">{label}</label>
      <div
        className={`upload-zone ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <button type="button" onClick={handleRemove} className="remove-btn">
              ✕ Quitar
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            {compressing ? (
              <>
                <div className="spinner"></div>
                <p>Comprimiendo imagen...</p>
              </>
            ) : (
              <>
                <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Arrastra una imagen o haz clic para seleccionar</p>
                <p className="upload-hint">PNG, JPG, WEBP hasta 10MB (se comprimirá automáticamente)</p>
              </>
            )}
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>
    </div>
  );
};

export default ImageUploader;

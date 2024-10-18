import { useState, useCallback, useEffect } from "react";
import { Upload } from "lucide-react";

// Hook personalizado para manejar el formulario
const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return {
    formData,
    handleInputChange,
    setFormData,
    resetForm,
  };
};

// Hook personalizado para manejar la imagen
const useImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    const validTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (!validTypes.includes(file.type)) {
      throw new Error(
        "Tipo de archivo no válido. Solo se permiten SVG, PNG, JPG o GIF."
      );
    }

    if (file.size > maxSize) {
      throw new Error("El archivo excede el tamaño máximo permitido de 3MB.");
    }
  };

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    setError(null);

    if (file) {
      try {
        validateFile(file);
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError(err.message);
        setImageFile(null);
        setImagePreview(null);
      }
    }
  }, []);

  const clearImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  }, []);

  return {
    imageFile,
    imagePreview,
    error,
    handleImageUpload,
    clearImage,
  };
};

// Hook personalizado para manejar el envío del formulario
const useFormSubmission = (formData, imageFile) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // Aquí simularíamos el envío al backend
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });
        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        // Simulación de envío
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Datos enviados:", formDataToSend);
      } catch (error) {
        setSubmitError(
          "Error al enviar el formulario. Por favor, intente nuevamente."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, imageFile]
  );

  return {
    isSubmitting,
    submitError,
    handleSubmit,
  };
};

export default function RefaccionariaForm() {
  const { formData, handleInputChange } = useFormData({
    name: "",
    date1: "",
    date2: "",
    date3: "",
    name2: "",
  });

  const {
    imageFile,
    imagePreview,
    error: imageError,
    handleImageUpload,
    clearImage,
  } = useImageUpload();

  const { isSubmitting, submitError, handleSubmit } = useFormSubmission(
    formData,
    imageFile
  );

  // Efecto para mostrar notificaciones de error
  useEffect(() => {
    if (imageError || submitError) {
      // Aquí podrías implementar un sistema de notificaciones
      console.error(imageError || submitError);
    }
  }, [imageError, submitError]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center">
          <span className="text-[#FF6B00] font-bold text-2xl">FAI</span>
          <span className="text-white font-bold text-2xl">REFAC</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#FF6B00]">HOME</span>
          <button className="bg-white rounded-full w-8 h-8"></button>
        </div>
      </header>

      <h1 className="text-4xl font-bold text-center mb-12">REFACCIONARÍA</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">YOUR NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/30 pb-2 focus:outline-none"
                placeholder="Enter Your Name"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">SELECT DATE</label>
              <input
                type="date"
                name="date1"
                value={formData.date1}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/30 pb-2 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">SELECT DATE</label>
                <input
                  type="date"
                  name="date2"
                  value={formData.date2}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/30 pb-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">SELECT DATE</label>
                <input
                  type="date"
                  name="date3"
                  value={formData.date3}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/30 pb-2 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">YOUR NAME</label>
              <input
                type="text"
                name="name2"
                value={formData.name2}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/30 pb-2 focus:outline-none"
                placeholder="Enter Your Name"
              />
            </div>
          </div>

          <div className="relative">
            <div className="w-full aspect-square bg-[#D9D9D9] rounded-lg flex flex-col items-center justify-center overflow-hidden">
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={24} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (max. 3MB)
                  </p>
                </>
              )}
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {imageError && (
              <p className="text-red-500 text-sm mt-2">{imageError}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-8 bg-[#FF6B00] text-white px-8 py-2 rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "ENVIANDO..." : "ACTUALIZAR"}
        </button>

        {submitError && (
          <p className="text-red-500 text-sm mt-2">{submitError}</p>
        )}
      </form>
    </div>
  );
}

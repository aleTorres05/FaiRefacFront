import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ClientForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setStatus({
        type: "error",
        message: "Por favor selecciona un archivo de imagen válido",
      });
      return;
    }

    if (selectedFile.size > 3 * 1024 * 1024) {
      setStatus({
        type: "error",
        message: "La imagen no debe superar los 3MB",
      });
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
    setStatus({ type: "", message: "" });
  };

  const removeFile = () => {
    setFile(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    if (file) {
      submitData.append("imagen", file);
    }

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "¡Registro completado con éxito!",
        });
        setFormData({ nombre: "", apellido: "", telefono: "" });
        setFile(null);
        setPreview("");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message || "Ha ocurrido un error al enviar el formulario",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">CLIENTE</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  NOMBRE
                </label>
                <Input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-gray-700 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  APELLIDO
                </label>
                <Input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-gray-700 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  TELÉFONO
                </label>
                <Input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-gray-700 focus:border-orange-500"
                />
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-gray-700"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              <input
                type="file"
                onChange={handleFileInput}
                accept="image/*"
                className="hidden"
              />

              {preview ? (
                <div className="relative w-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-500 mb-4" />
                  <p className="text-gray-400 mb-2">
                    Click para subir o arrastra tu imagen aquí
                  </p>
                  <p className="text-sm text-gray-500">
                    SVG, PNG, JPG o GIF (max. 3MB)
                  </p>
                </>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded"
          >
            ENVIAR
          </Button>
        </form>

        {status.message && (
          <Alert
            variant={status.type === "error" ? "destructive" : "default"}
            className="mt-4"
          >
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

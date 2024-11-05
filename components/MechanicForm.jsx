import { postMechanic } from "@/pages/api/mechanic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function MechanicForm({ isOpen, onClose }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(data) {
    await postMechanic(data);
    onClose();
    toast.success("Mecanico Agregado exitosamente");
    window.location.reload();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative mt-0 bg-[#161616] p-8 w-full md:w-3/4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <img
          src={
            "https://fairefac-assets.s3.us-east-2.amazonaws.com/Close-orange.png"
          }
          alt="Cerrar"
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
          onClick={onClose}
        />
        <h2 className="font-chakra font-bold text-center text-[24px] mb-4">
          AGREGAR MECÁNICO
        </h2>
        <div className="w-full flex justify-center">
          <form
            className="w-full max-w-lg text-c p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Información personal */}
            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">NOMBRE</label>
              <input
                type="text"
                name="firstName"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "Nombre es requerido",
                  },
                  minLength: 2,
                })}
              />
              {errors.firstName && (
                <span className="text-red-500">Nombre es obligatorio</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">
                APELLIDO
              </label>
              <input
                type="text"
                name="lastName"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Apellido es requerido",
                  },
                  minLength: 2,
                })}
              />
              {errors.lastName && (
                <span className="text-red-500">Apellido es obligatorio</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">
                NOMBRE DEL TALLER
              </label>
              <input
                type="text"
                name="workshopName"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("workshopName", {
                  required: {
                    value: true,
                    message: "Nombre del Taller es requerido",
                  },
                  minLength: 2,
                })}
              />
              {errors.workshopName && (
                <span className="text-red-500">
                  Nombre del Taller es obligatorio
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">
                NUMERO TELEFONICO
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Numero Telefonico es requerido",
                  },
                  minLength: 2,
                  maxLength: 10,
                  valueAsNumber: true,
                })}
              />
              {errors.phoneNumber && (
                <span className="text-red-500">
                  Numero Telefonico es obligatorio
                </span>
              )}
            </div>
            {/* Dirección */}
            <h3 className="text-lg font-bold font-chakra mb-2 md:mb-8">
              DIRECCIÓN
            </h3>

            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">CALLE</label>
              <input
                type="text"
                name="street"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("street", {
                  required: {
                    value: true,
                    message: "Calle es requerido",
                  },
                  minLength: 2,
                })}
              />
              {errors.street && (
                <span className="text-red-500">Calle es obligatorio</span>
              )}
            </div>

            <div className="flex flex-col md:flex-row mb-4">
              <div className="md:flex-1">
                <label className="block font-bold font-chakra mb-2">
                  NÚMERO EXTERIOR
                </label>
                <input
                  type="text"
                  name="extNum"
                  className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                  {...register("extNum", {
                    required: {
                      value: true,
                      message: "Numero Exterior es requerido",
                    },
                    minLength: 2,
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="md:flex-1">
                <label className="block font-bold font-chakra mb-2">
                  NÚMERO INTERIOR
                </label>
                <input
                  type="text"
                  name="intNum"
                  className="text-[#C2C2C2] outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                  {...register("intNum")}
                />
              </div>
            </div>
            {errors.extNum && (
              <span className="text-red-500">
                Numero Exterior es obligatorio
              </span>
            )}

            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">
                COLONIA
              </label>
              <input
                type="text"
                name="neighborhood"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("neighborhood", {
                  required: {
                    value: true,
                    message: "Colonia es requerido",
                  },
                  minLength: 2,
                })}
              />
              {errors.neighborhood && (
                <span className="text-red-500">Colonia es obligatorio</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">
                CÓDIGO POSTAL
              </label>
              <input
                type="text"
                name="zipCode"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("zipCode", {
                  required: {
                    value: true,
                    message: "Codigo Postal es requerido",
                  },
                  minLength: 2,
                })}
              />
              {errors.zipCode && (
                <span className="text-red-500">
                  Codigo Postal es obligatorio
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">CIUDAD</label>
              <input
                type="text"
                name="city"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("city", {
                  required: {
                    value: true,
                    message: "Ciudad es requerido",
                  },
                  minLength: 2,
                })}
              />
              {errors.city && (
                <span className="text-red-500">Ciudad es obligatorio</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-bold font-chakra mb-2">ESTADO</label>
              <input
                type="text"
                name="state"
                className="text-[#C2C2C2] w-full outline-none font-mulish text-[14px] font-normal leading-normal bg-transparent pb-3 border-b border-b-[#343434] border-b-1"
                {...register("state", {
                  required: {
                    value: true,
                    message: "Estado es requerido",
                  },
                  minLength: 2,
                })}
              />
              {errors.state && (
                <span className="text-red-500">Estado es obligatorio</span>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-black p-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#D16527] text-white p-2 rounded-md"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
